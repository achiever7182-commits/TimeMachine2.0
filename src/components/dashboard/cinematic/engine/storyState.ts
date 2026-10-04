import type { TmNetworkTheme } from "../tokens";

export type ChapterId =
  | "hero"
  | "system_online"
  | "intrusion"
  | "attack"
  | "rewind"
  | "reconstruction"
  | "trace"
  | "response"
  | "simulation"
  | "defense"
  | "secured"
  | "finale";

export type ThreatLevel = "nominal" | "elevated" | "critical" | "contained" | "secure";

export interface StoryFrame {
  chapter: ChapterId;
  chapterProgress: number;
  globalProgress: number;
  timeDirection: 1 | -1;
  storyClockSec: number;
  threatLevel: ThreatLevel;
  networkTheme: TmNetworkTheme;
}

/**
 * Chapter boundary table (globalProgress 0..1).
 * Adjusted to Section 8.2 scroll map.
 */
const CHAPTERS: ReadonlyArray<{
  id: ChapterId;
  from: number;
  to: number;
  clockStart: number;
  clockEnd: number;
  theme: TmNetworkTheme;
  threat: ThreatLevel;
}> = [
  { id: "hero", from: 0.0, to: 0.07, clockStart: 0, clockEnd: 1, theme: "blue", threat: "nominal" },
  {
    id: "system_online",
    from: 0.07,
    to: 0.17,
    clockStart: 1,
    clockEnd: 20,
    theme: "blue",
    threat: "nominal",
  },
  {
    id: "intrusion",
    from: 0.17,
    to: 0.27,
    clockStart: 20,
    clockEnd: 180,
    theme: "amber",
    threat: "elevated",
  },
  {
    id: "attack",
    from: 0.27,
    to: 0.4,
    clockStart: 180,
    clockEnd: 1457,
    theme: "red",
    threat: "critical",
  },
  {
    id: "rewind",
    from: 0.4,
    to: 0.52,
    clockStart: 1457,
    clockEnd: 1,
    theme: "rewind",
    threat: "critical",
  },
  {
    id: "reconstruction",
    from: 0.52,
    to: 0.68,
    clockStart: 1,
    clockEnd: 300,
    theme: "blue",
    threat: "elevated",
  },
  {
    id: "trace",
    from: 0.68,
    to: 0.75,
    clockStart: 300,
    clockEnd: 600,
    theme: "blue",
    threat: "elevated",
  },
  {
    id: "response",
    from: 0.75,
    to: 0.84,
    clockStart: 600,
    clockEnd: 800,
    theme: "amber",
    threat: "elevated",
  },
  {
    id: "simulation",
    from: 0.84,
    to: 0.92,
    clockStart: 800,
    clockEnd: 1100,
    theme: "recovering",
    threat: "contained",
  },
  {
    id: "defense",
    from: 0.92,
    to: 0.97,
    clockStart: 1100,
    clockEnd: 1380,
    theme: "green",
    threat: "secure",
  },
  {
    id: "secured",
    from: 0.97,
    to: 0.99,
    clockStart: 1380,
    clockEnd: 1457,
    theme: "green",
    threat: "secure",
  },
  {
    id: "finale",
    from: 0.99,
    to: 1.0,
    clockStart: 1457,
    clockEnd: 1457,
    theme: "green",
    threat: "secure",
  },
];

export function chapterCount(): number {
  return CHAPTERS.length;
}

export function chapterIndex(id: ChapterId): number {
  return Math.max(
    0,
    CHAPTERS.findIndex((c) => c.id === id),
  );
}

export function chapterRange(id: ChapterId): { from: number; to: number } {
  const c = CHAPTERS.find((c) => c.id === id);
  return c ? { from: c.from, to: c.to } : { from: 0, to: 0 };
}

export function chapterIds(): ChapterId[] {
  return CHAPTERS.map((c) => c.id);
}

function clamp01(x: number): number {
  return x < 0 ? 0 : x > 1 ? 1 : x;
}

/**
 * frameFromScroll: pure function (single source of truth for color, clock, direction).
 * Reduced-motion: no jitter; still produces a deterministic frame so UI logic is identical.
 */
export function frameFromScroll(globalProgress: number, reduced: boolean): StoryFrame {
  const p = clamp01(globalProgress);
  const reducedSafe = Boolean(reduced);

  let idx = CHAPTERS.length - 1;
  for (let i = 0; i < CHAPTERS.length; i++) {
    const c = CHAPTERS[i]!;
    if (p >= c.from && p < c.to) {
      idx = i;
      break;
    }
    if (i === CHAPTERS.length - 1 && p >= c.from) {
      idx = i;
    }
  }
  const current = CHAPTERS[idx]!;
  const span = current.to - current.from;
  const local = span > 0 ? clamp01((p - current.from) / span) : 0;

  const localT = reducedSafe ? Math.round(local * 10) / 10 : local;

  const clockRange = current.clockEnd - current.clockStart;
  const storyClockSec = Math.max(0, Math.round(current.clockStart + clockRange * localT));

  const timeDirection: 1 | -1 = current.id === "rewind" ? -1 : 1;

  return {
    chapter: current.id,
    chapterProgress: localT,
    globalProgress: p,
    timeDirection,
    storyClockSec,
    threatLevel: current.threat,
    networkTheme: current.theme,
  };
}

export function formatTClock(totalSec: number, direction: 1 | -1 = 1): string {
  const s = Math.max(0, Math.floor(Math.abs(totalSec)));
  const hh = Math.floor(s / 3600);
  const mm = Math.floor((s % 3600) / 60);
  const ss = s % 60;
  const sign = direction === -1 ? "-" : "+";
  return `${sign}${String(hh).padStart(2, "0")}:${String(mm).padStart(2, "0")}:${String(ss).padStart(2, "0")}`;
}

export function threatFromLevel(lv: ThreatLevel): {
  alpha: number;
  kind: "threat" | "rewind" | "verify";
} {
  switch (lv) {
    case "critical":
      return { alpha: 0.22, kind: "threat" };
    case "elevated":
      return { alpha: 0.1, kind: "threat" };
    case "contained":
      return { alpha: 0.06, kind: "rewind" };
    case "secure":
      return { alpha: 0.14, kind: "verify" };
    case "nominal":
    default:
      return { alpha: 0, kind: "threat" };
  }
}

export { CHAPTERS };
