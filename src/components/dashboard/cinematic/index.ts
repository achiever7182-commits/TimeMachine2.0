export { CinematicDashboard, CinematicMount, LazyCinematicDashboard } from "./CinematicDashboard";
export type { CinematicDashboardProps } from "./CinematicDashboard";
export type { DataProvenance, Provenanced, ProvenanceKind } from "./data/provenance";
export { labelFor, mergeProvenance } from "./data/provenance";
export { redact, redactCommand } from "./data/redact";
export type {
  CinematicData,
  CinematicFixture,
  AttackStep,
  AttackStageId,
  CNode,
  CEdge,
  CNodeKind,
  CNodeState,
  ResponseOption,
  VerificationCheck,
  NetworkLayouts,
  NetworkLayout,
  TelemetrySnapshot,
  CinematicIncidentSummary,
  CinematicInvestigationSummary,
} from "./data/types";
export { useCinematicData } from "./data/useCinematicData";
export type { ChapterId, StoryFrame, ThreatLevel } from "./engine/storyState";
export {
  CHAPTERS,
  chapterCount,
  chapterIds,
  chapterIndex,
  chapterRange,
  frameFromScroll,
  formatTClock,
  threatFromLevel,
} from "./engine/storyState";
export {
  useStory,
  useChapterRange,
  useChapterIds,
  useFrameFromMotion,
} from "./engine/StoryContext";
export type { StoryContextValue, ScrollToChapter, SkipCinematic } from "./engine/StoryContext";
export { useStoryScroll } from "./engine/useStoryScroll";
export { useStoryTicker } from "./engine/useStoryTicker";
export { useBreakpoint, totalTrackVH } from "./engine/useBreakpoint";
export { useReducedMotionGate } from "./engine/useReducedMotionGate";

export { HudFrame } from "./hud/HudFrame";
export { HudLabel } from "./hud/HudLabel";
export { StatusDot } from "./hud/StatusDot";
export type { StatusDotState } from "./hud/StatusDot";
export { ScanLines } from "./hud/ScanLines";
export { GridBackdrop } from "./hud/GridBackdrop";
export { SignalBars } from "./hud/SignalBars";
export type { SignalStrength } from "./hud/SignalBars";
export { Redacted } from "./hud/Redacted";
export { ProvenanceBadge } from "./hud/ProvenanceBadge";

export { CyberNetwork } from "./network/CyberNetwork";
export { useNetworkTheme } from "./network/CyberNetwork";
export {
  DrawNetwork,
  edgeClass,
  nodeGlyph,
  NODE_RADIUS_DESKTOP,
  NODE_RADIUS_MOBILE,
} from "./network/layouts";

export {
  tmPalette,
  tmChapterLabels,
  CINEMATIC_FLAG,
  SOUND_STORAGE_KEY,
  SKIPPED_STORAGE_KEY,
  CINEMATIC_CLASS,
} from "./tokens";
export type { TmNetworkTheme, TmNodeState } from "./tokens";

export {
  fixture,
  cinematicRng,
  fixtureAttackPathNodes,
  fixtureStepForStage,
} from "./data/fixtures/inc-2048";
