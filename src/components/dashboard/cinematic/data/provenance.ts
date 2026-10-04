export type DataProvenance = "live" | "demo" | "mixed" | "unavailable";

export interface Provenanced<T> {
  value: T;
  provenance: DataProvenance;
  source?: string;
  asOf?: string;
}

export type ProvenanceKind = "telemetry" | "incident" | "attack" | "investigation" | "response";

type LabelMap = Record<DataProvenance, Record<ProvenanceKind, string>>;

/**
 * Single source of truth for every provenance label the UI may show.
 *
 * CRITICAL HONESTY RULE (enforced at verification via grep):
 * The words LIVE, REAL-TIME, ACTIVE ATTACK, REAL ATTACKER, ACTIVE ATTACKER
 * may only originate from this function when provenance === 'live'.
 *
 * In 'demo' mode the attacker node label is always SIMULATED THREAT ACTOR
 * (never "ATTACKER" as a real entity).
 */
const LABELS: LabelMap = {
  live: {
    telemetry: "LIVE TELEMETRY",
    incident: "LIVE INCIDENT",
    attack: "ACTIVE ATTACK",
    investigation: "LIVE INVESTIGATION",
    response: "LIVE RESPONSE",
  },
  demo: {
    telemetry: "DEMO ENVIRONMENT",
    incident: "SIMULATED INCIDENT",
    attack: "SIMULATED ATTACK PATH",
    investigation: "SIMULATED FORENSICS",
    response: "SIMULATION ONLY",
  },
  mixed: {
    telemetry: "PARTIAL LIVE DATA",
    incident: "PARTIAL LIVE DATA",
    attack: "PARTIAL LIVE DATA",
    investigation: "PARTIAL LIVE DATA",
    response: "PARTIAL LIVE DATA",
  },
  unavailable: {
    telemetry: "NO DATA — DEMO FALLBACK ACTIVE",
    incident: "NO DATA — DEMO FALLBACK ACTIVE",
    attack: "NO DATA — DEMO FALLBACK ACTIVE",
    investigation: "NO DATA — DEMO FALLBACK ACTIVE",
    response: "NO DATA — DEMO FALLBACK ACTIVE",
  },
};

export function labelFor(provenance: DataProvenance, kind: ProvenanceKind): string {
  return LABELS[provenance][kind];
}

export function mergeProvenance(a: DataProvenance, b: DataProvenance): DataProvenance {
  if (a === b) return a;
  if (a === "unavailable") return b;
  if (b === "unavailable") return a;
  if (a === "live" && b === "demo") return "mixed";
  if (a === "demo" && b === "live") return "mixed";
  return "mixed";
}

export function demoNow(): string {
  return "2026-09-29T10:24:00.000Z";
}
