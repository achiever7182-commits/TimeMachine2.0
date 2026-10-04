export const tmPalette = {
  bg0: "#03060B",
  bg1: "#050A12",
  bg2: "#07111C",
  line: "rgba(140, 180, 220, 0.14)",
  lineStrong: "rgba(140, 200, 255, 0.32)",
  text: "#E6EEF7",
  textDim: "#8FA3B8",
  textFaint: "#55687C",
  cyan: "#22D3EE",
  blue: "#3B82F6",
  red: "#FF3B4E",
  amber: "#FFB020",
  green: "#2EE6A6",
  glowCyan: "0 0 24px rgba(34, 211, 238, 0.18)",
  glowRed: "0 0 28px rgba(255, 59, 78, 0.22)",
  glowGreen: "0 0 24px rgba(46, 230, 166, 0.18)",
} as const;

export type TmNodeState = "nominal" | "suspicious" | "compromised" | "contained" | "verified";
export type TmNetworkTheme = "blue" | "amber" | "red" | "rewind" | "recovering" | "green";

export const tmNodeStateColor: Record<TmNodeState, string> = {
  nominal: tmPalette.cyan,
  suspicious: tmPalette.amber,
  compromised: tmPalette.red,
  contained: tmPalette.textFaint,
  verified: tmPalette.green,
};

export const tmThemeFg: Record<TmNetworkTheme, string> = {
  blue: tmPalette.cyan,
  amber: tmPalette.amber,
  red: tmPalette.red,
  rewind: tmPalette.blue,
  recovering: tmPalette.amber,
  green: tmPalette.green,
};

export const tmThemeBg: Record<TmNetworkTheme, string> = {
  blue: "rgba(34, 211, 238, 0.04)",
  amber: "rgba(255, 176, 32, 0.05)",
  red: "rgba(255, 59, 78, 0.06)",
  rewind: "rgba(59, 130, 246, 0.08)",
  recovering: "rgba(255, 176, 32, 0.05)",
  green: "rgba(46, 230, 166, 0.05)",
};

export const tmChapterLabels: Record<string, { index: string; title: string }> = {
  hero: { index: "00", title: "TIME MACHINE" },
  system_online: { index: "01", title: "SYSTEM ONLINE" },
  intrusion: { index: "02", title: "INTRUSION DETECTED" },
  attack: { index: "03", title: "ATTACK IN PROGRESS" },
  rewind: { index: "04", title: "REWIND" },
  reconstruction: { index: "05", title: "FIRST MOVE" },
  trace: { index: "06", title: "TRACE" },
  response: { index: "07", title: "COUNTERMEASURES" },
  simulation: { index: "08", title: "SYSTEM FIGHTS BACK" },
  defense: { index: "09", title: "DEFENSE SEQUENCE" },
  secured: { index: "10", title: "SYSTEM SECURED" },
  finale: { index: "11", title: "FINALE" },
};

export const CINEMATIC_FLAG = "VITE_ENABLE_CINEMATIC_DASHBOARD";
export const CINEMATIC_CLASS = "tm-cinema";
export const SOUND_STORAGE_KEY = "itm_cinematic_sound_enabled";
export const SKIPPED_STORAGE_KEY = "itm_cinematic_skipped_v1";
