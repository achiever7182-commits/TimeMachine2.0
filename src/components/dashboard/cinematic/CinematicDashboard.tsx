import { lazy, Suspense, useCallback, useMemo, useRef } from "react";
import { AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useCinematicData } from "./data/useCinematicData";
import { StoryProvider, noopScrollTo, noopSkip, useBooleanStorage } from "./engine/StoryContext";
import type { StoryContextValue } from "./engine/StoryContext";
import { useBreakpoint, totalTrackVH } from "./engine/useBreakpoint";
import { useReducedMotionGate } from "./engine/useReducedMotionGate";
import { useStoryScroll } from "./engine/useStoryScroll";
import { chapterIds, type ChapterId } from "./engine/storyState";
import { SKIPPED_STORAGE_KEY, SOUND_STORAGE_KEY, CINEMATIC_CLASS } from "./tokens";
import { CyberNetwork } from "./network/CyberNetwork";
import { PersistentBackdrop } from "./parts/PersistentBackdrop";
import { ChapterRail } from "./parts/ChapterRail";
import { SkipControls } from "./parts/SkipControls";
import { IncidentOverlay } from "./parts/IncidentOverlay";

// Scenes are imported eagerly to keep mount simple; all are < 220 lines individually.
import { CinematicHero } from "./scenes/CinematicHero";
import { SystemOnlineScene } from "./scenes/SystemOnlineScene";
import { ThreatDetectionScene } from "./scenes/ThreatDetectionScene";
import { AttackProgressionScene } from "./scenes/AttackProgressionScene";
import { RewindScene } from "./scenes/RewindScene";
import { FirstMoveScene, AttackReconstructionScene } from "./scenes/FirstMoveScene";
import { InvestigationScene } from "./scenes/InvestigationScene";
import {
  ResponseScene,
  SimulationTransitionScene,
  DefenseSequenceScene,
} from "./scenes/ResponseScene";
import { SecureSystemScene, FinaleScene } from "./scenes/SecureSystemScene";

import "./cinematic.css";

/**
 * CinematicDashboard — the scroll-driven cinematic Command Center.
 *
 * Mount strategy (N1 additive, feature-flagged):
 *   - Mounted from DashboardView.tsx via ONE lazy dynamic import behind
 *     `import.meta.env.VITE_ENABLE_CINEMATIC_DASHBOARD === "true"`.
 *   - "Skip intro / Enter operational view" button always visible after hero;
 *     scrolls to end of track and calls `onExit` to show the existing SOC grid below.
 *
 * Architecture:
 *   <div.tm-track>        (1100vh tall — the scroll track)
 *     <div.tm-stage>      (sticky top-0, 100svh — the ONE persistent stage)
 *       <PersistentBackdrop />
 *       <CyberNetwork />  (ONE network that morphs)
 *       <SkipControls />
 *       <IncidentOverlay />
 *       <ChapterRail />
 *       <SceneLayer dispatcher />
 *     </div>
 *   </div>
 */
export interface CinematicDashboardProps {
  /** Called when the user clicks "Skip intro" or finale "ENTER OPERATIONAL VIEW". */
  onExit?: () => void;
  className?: string;
}

const CHAPTER_COMPONENTS: Record<ChapterId, () => React.ReactNode> = {
  hero: () => <CinematicHero />,
  system_online: () => <SystemOnlineScene />,
  intrusion: () => <ThreatDetectionScene />,
  attack: () => <AttackProgressionScene />,
  rewind: () => <RewindScene />,
  reconstruction: () => (
    <>
      <FirstMoveScene />
      <AttackReconstructionScene />
    </>
  ),
  trace: () => <InvestigationScene />,
  response: () => <ResponseScene />,
  simulation: () => <SimulationTransitionScene />,
  defense: () => <DefenseSequenceScene />,
  secured: () => <SecureSystemScene />,
  finale: () => <FinaleScene />,
};

function SceneDispatcher({ current }: { current: ChapterId }) {
  const Component = CHAPTER_COMPONENTS[current] ?? (() => null);
  return (
    <AnimatePresence mode="wait">
      <Component />
    </AnimatePresence>
  );
}

export function CinematicDashboard({ onExit, className }: CinematicDashboardProps) {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const breakpoint = useBreakpoint();
  const reduced = useReducedMotionGate();
  const cinematicData = useCinematicData();
  const totalVH = totalTrackVH(breakpoint);

  const { rawProgress, smoothProgress, frame, scrollToChapter, scrollToEnd } = useStoryScroll({
    trackRef,
    reduced,
  });

  const [skipped, setSkipped] = useBooleanStorage(SKIPPED_STORAGE_KEY, false);
  const [soundEnabled, setSoundEnabled] = useBooleanStorage(SOUND_STORAGE_KEY, false);

  const skip = useCallback(() => {
    setSkipped(true);
    scrollToEnd();
    // Wait briefly for the smooth scroll animation to begin, then yield to operational view.
    window.setTimeout(
      () => {
        onExit?.();
      },
      reduced ? 100 : 650,
    );
  }, [onExit, scrollToEnd, setSkipped, reduced]);

  const contextValue = useMemo<StoryContextValue>(
    () => ({
      frame,
      smoothProgress,
      rawProgress,
      breakpoint,
      reducedMotion: reduced,
      soundEnabled,
      setSoundEnabled,
      cinematicData,
      scrollToChapter,
      skip,
      skipped,
      trackRef,
    }),
    [
      frame,
      smoothProgress,
      rawProgress,
      breakpoint,
      reduced,
      soundEnabled,
      setSoundEnabled,
      cinematicData,
      scrollToChapter,
      skip,
      skipped,
    ],
  );

  if (skipped) {
    onExit?.();
    return null;
  }

  void chapterIds;

  return (
    <StoryProvider value={contextValue}>
      <section
        className={cn(CINEMATIC_CLASS, "relative w-full", className)}
        aria-label="Time Machine Cinematic Command Center"
      >
        <div
          ref={trackRef}
          className="tm-track"
          style={{ height: `${totalVH}vh` }}
          id="tm-cinematic-track"
        >
          <div className="tm-stage">
            <PersistentBackdrop />
            <CyberNetwork frame={frame} breakpoint={breakpoint} data={cinematicData} />
            <SkipControls />
            <IncidentOverlay />
            <ChapterRail />
            <SceneDispatcher current={frame.chapter} />
            <A11yTranscripts />
          </div>
        </div>
      </section>
    </StoryProvider>
  );
}

function A11yTranscripts() {
  // Visually-hidden prose, one line per chapter. Read by screen readers.
  return (
    <div className="tm-a11y-hidden" aria-live="polite">
      TIME MACHINE cinematic command center. Scroll down through twelve chapters: Welcome, System
      Online, Intrusion Detected, Attack in Progress, Rewind, First Move Identified, Trace,
      Countermeasures, System Fights Back, Defense Sequence, System Secured, and Finale. Use the
      chapter rail on the right, or press the Skip intro button at any time to leave the story and
      enter the operational dashboard view.
    </div>
  );
}

/**
 * Lazy Cinematic root used by DashboardView. Keeps dashboard route chunk small.
 * The caller checks the feature flag and only creates this lazy root if enabled.
 */
export const LazyCinematicDashboard = lazy(() =>
  Promise.resolve({
    default: CinematicDashboard,
  }),
);

export function CinematicMount(props: CinematicDashboardProps) {
  return (
    <Suspense fallback={null}>
      <CinematicDashboard {...props} />
    </Suspense>
  );
}

export { noopScrollTo, noopSkip };
