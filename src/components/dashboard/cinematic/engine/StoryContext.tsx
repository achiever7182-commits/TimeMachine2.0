import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type { MotionValue } from "framer-motion";
import {
  chapterIds,
  chapterRange,
  frameFromScroll,
  type ChapterId,
  type StoryFrame,
} from "./storyState";
import type { CinematicData } from "../data/types";
import type { TmBreakpoint } from "./useBreakpoint";

export type ScrollToChapter = (id: ChapterId, opts?: { smooth?: boolean }) => void;
export type SkipCinematic = () => void;

export interface StoryContextValue {
  /** Latest discrete StoryFrame (updates only on chapter change OR when re-reading state). */
  frame: StoryFrame;
  /** Smooth interpolated global progress 0..1 as MotionValue — use for style bindings. */
  smoothProgress: MotionValue<number> | null;
  /** Raw unsprung global progress 0..1 as MotionValue — use for logic thresholds. */
  rawProgress: MotionValue<number> | null;
  breakpoint: TmBreakpoint;
  reducedMotion: boolean;
  soundEnabled: boolean;
  setSoundEnabled: (v: boolean) => void;
  cinematicData: CinematicData | null;
  scrollToChapter: ScrollToChapter;
  skip: SkipCinematic;
  skipped: boolean;
  trackRef: React.RefObject<HTMLDivElement> | null;
}

const StoryContext = createContext<StoryContextValue | undefined>(undefined);

export function StoryProvider(props: { value: StoryContextValue; children: ReactNode }) {
  return <StoryContext.Provider value={props.value}>{props.children}</StoryContext.Provider>;
}

export function useStory(): StoryContextValue {
  const ctx = useContext(StoryContext);
  if (!ctx)
    throw new Error("useStory must be used inside StoryProvider (under CinematicDashboard)");
  return ctx;
}

/**
 * Shared helpers (exported so scenes can read chapter ranges without importing tables).
 */
export function useChapterRange(id: ChapterId) {
  return useMemo(() => chapterRange(id), [id]);
}

export function useChapterIds() {
  return useMemo(() => chapterIds(), []);
}

/**
 * Reads `rawProgress` every time its underlying MotionValue emits a new discrete
 * chapter change — returns a stable StoryFrame. Avoids re-renders on every pixel scroll.
 */
export function useFrameFromMotion(raw: MotionValue<number> | null, reduced: boolean): StoryFrame {
  const [prog, setProg] = useState(0);
  const latest = useRef(0);
  const lastChapter = useRef<ChapterId | null>(null);

  useEffect(() => {
    if (!raw) return;
    const off = raw.on("change", (v) => {
      latest.current = v as number;
      const next = frameFromScroll(v as number, reduced).chapter;
      if (next !== lastChapter.current) {
        lastChapter.current = next;
        setProg(v as number);
      }
    });
    return off;
  }, [raw, reduced]);

  const initial = typeof window === "undefined" ? 0 : (raw?.getPrevious?.() ?? 0);
  const effective = prog === 0 && initial !== 0 ? initial : prog;
  return useMemo(() => frameFromScroll(effective, reduced), [effective, reduced]);
}

export const noopScrollTo: ScrollToChapter = () => {};
export const noopSkip: SkipCinematic = () => {};

export function useBooleanStorage(key: string, def: boolean): [boolean, (v: boolean) => void] {
  const [val, setVal] = useState<boolean>(() => {
    if (typeof window === "undefined") return def;
    try {
      const raw = window.localStorage.getItem(key);
      return raw === null ? def : raw === "1";
    } catch {
      return def;
    }
  });
  const set = useCallback(
    (v: boolean) => {
      setVal(v);
      try {
        window.localStorage.setItem(key, v ? "1" : "0");
      } catch {
        /* ignore */
      }
    },
    [key],
  );
  return [val, set];
}
