export const SIMULATION_SPEEDS = [0.5, 1, 2, 5, 10] as const;
export type SimulationSpeed = (typeof SIMULATION_SPEEDS)[number];

const STORAGE_KEYS = {
  SPEED: "itm_simulation_speed",
  DEMO_MODE: "itm_demo_mode",
  LAST_TIME: "itm_last_simulation_time",
  LAST_INCIDENT: "itm_last_incident_id",
};

export function getTickIntervalMs(speed: number): number {
  const safeSpeed = Math.max(0.1, speed || 1);
  return Math.round(1000 / safeSpeed);
}

export function saveSimulationSpeed(speed: number): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEYS.SPEED, String(speed));
  } catch {
    // ignore local storage restrictions
  }
}

export function loadSimulationSpeed(): number {
  if (typeof window === "undefined") return 1;
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.SPEED);
    if (!saved) return 1;
    const parsed = Number(saved);
    return SIMULATION_SPEEDS.includes(parsed as SimulationSpeed) ? parsed : 1;
  } catch {
    return 1;
  }
}

export function saveLastSimulationTime(timestamp: string): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEYS.LAST_TIME, timestamp);
  } catch {
    // ignore
  }
}

export function loadLastSimulationTime(): string | null {
  if (typeof window === "undefined") return null;
  try {
    return localStorage.getItem(STORAGE_KEYS.LAST_TIME);
  } catch {
    return null;
  }
}
