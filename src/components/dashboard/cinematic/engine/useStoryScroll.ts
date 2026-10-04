import { useCallback, useEffect, useMemo, useRef, useState, type RefObject } from "react";
import { useScroll, useSpring, useMotionValueEvent, type MotionValue } from "framer-motion";
import { frameFromScroll, chapterIds, chapterRange, type ChapterId } from "./storyState";

interface UseStoryScrollOptions {
  trackRef: RefObject<HTMLDivElement>;
  reduced: boolean;
  /** Duration (ms) a user must be stopped near a chapter anchor (±tol) before soft snap. */
  snapIdleMs?: number;
  tol?: number;
}

interface UseStoryScrollResult {
  rawProgress: MotionValue<number>;
  smoothProgress: MotionValue<number>;
  /** Discrete StoryFrame. Re-renders only on chapter change. */
  frame: ReturnType<typeof frameFromScroll>;
  scrollToChapter: (id: ChapterId, opts?: { smooth?: boolean }) => void;
  scrollToEnd: () => void;
}

export function useStoryScroll({
  trackRef,
  reduced,
  snapIdleMs = 620,
  tol = 0.02,
}: UseStoryScrollOptions): UseStoryScrollResult {
  const { scrollYProgress: rawProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(rawProgress, {
    stiffness: reduced ? 400 : 120,
    damping: reduced ? 80 : 30,
    mass: reduced ? 0.1 : 0.4,
  });

  const [discreteProg, setDiscreteProg] = useState(0);
  const lastChapterRef = useRef<ChapterId | null>(null);
  const stoppedTimer = useRef<number | null>(null);

  useMotionValueEvent(rawProgress, "change", (v) => {
    const next = frameFromScroll(v as number, reduced).chapter;
    if (next !== lastChapterRef.current) {
      lastChapterRef.current = next;
      setDiscreteProg(v as number);
    }
    if (stoppedTimer.current !== null) {
      window.clearTimeout(stoppedTimer.current);
    }
    if (reduced) return;
    stoppedTimer.current = window.setTimeout(() => {
      const current = rawProgress.get() as number;
      const ids = chapterIds();
      for (const id of ids) {
        const { from, to } = chapterRange(id);
        const mid = (from + to) / 2;
        if (Math.abs(current - mid) <= tol) {
          scrollToProgress(mid, true);
          break;
        }
      }
    }, snapIdleMs);
  });

  useEffect(() => {
    return () => {
      if (stoppedTimer.current !== null) window.clearTimeout(stoppedTimer.current);
    };
  }, []);

  const scrollToProgress = useCallback(
    (targetProgress: number, smooth: boolean) => {
      const el = trackRef.current;
      if (!el) return;
      const scrollable = el.getBoundingClientRect();
      // Track's total scroll contribution is (trackHeight - viewportHeight)
      const totalScroll = Math.max(1, el.offsetHeight - window.innerHeight);
      const offset = el.offsetTop + totalScroll * targetProgress;
      window.scrollTo({
        top: offset - 0,
        behavior: smooth ? "smooth" : "auto",
      });
      void scrollable;
    },
    [trackRef],
  );

  const scrollToChapter = useCallback(
    (id: ChapterId, opts?: { smooth?: boolean }) => {
      const { from, to } = chapterRange(id);
      scrollToProgress((from + to) / 2, opts?.smooth ?? true);
    },
    [scrollToProgress],
  );

  const scrollToEnd = useCallback(() => {
    scrollToProgress(0.999, true);
  }, [scrollToProgress]);

  const frame = useMemo(() => frameFromScroll(discreteProg, reduced), [discreteProg, reduced]);

  return { rawProgress, smoothProgress, frame, scrollToChapter, scrollToEnd };
}
