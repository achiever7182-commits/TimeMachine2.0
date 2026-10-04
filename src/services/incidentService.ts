import {
  demoAttackNodes,
  demoBlastRadius,
  demoEvidence,
  demoIncident,
  demoMissedSignals,
  demoResponseActions,
  demoSimulationOptions,
  demoTimelineEvents,
} from "@/data/incidentData";
import { incidents } from "@/data/incidents";
import {
  getIncidentStateAtTime,
  minuteToTimestamp,
  timestampToMinute,
  type ReconstructedIncidentState,
} from "./stateReconstruction";
import type { Incident } from "@/types/incident";

export { getIncidentStateAtTime, minuteToTimestamp, timestampToMinute };

export function getDemoIncident(): Incident {
  return demoIncident;
}

export function getAllIncidents(): Incident[] {
  return incidents;
}

export function getIncidentById(id: string): Incident {
  return incidents.find((incident) => incident.id === id) ?? demoIncident;
}

export function getActiveIncident(): Incident {
  return demoIncident;
}

/**
 * Calculates dashboard metrics and status based on current reconstructed incident state or simulation minute.
 */
export function getDashboardSnapshot(minuteOrState: number | ReconstructedIncidentState) {
  const state: ReconstructedIncidentState =
    typeof minuteOrState === "number" ? getIncidentStateAtTime(minuteOrState) : minuteOrState;

  const isCritical = state.risk === "CRITICAL";
  const isElevated = state.risk === "HIGH" || state.risk === "MEDIUM";

  // Display human-readable stage label
  const stageLabels: Record<string, string> = {
    NORMAL: "Normal Operations",
    ATTACK_STARTED: "Initial Reconnaissance",
    SUSPICIOUS_ACTIVITY: "Suspicious Authentication",
    ACCOUNT_COMPROMISED: "Account Compromised",
    LATERAL_MOVEMENT: "Lateral Movement",
    DATA_ACCESS: "Database & File Access",
    INCIDENT_DETECTED: "Incident Formally Detected",
    INVESTIGATING: "Active Investigation",
    CONTAINED: "Simulated Containment",
    RESOLVED: "Incident Resolved",
  };

  const humanStage = stageLabels[state.stage] ?? state.stage;

  return {
    stage: humanStage,
    rawStage: state.stage,
    risk: state.risk,
    currentTime: state.timestamp,
    compromisedAssetsCount: state.compromisedAssetIds.length,
    kpis: [
      {
        label: "Active Incidents",
        value: state.stage === "NORMAL" ? "2" : "3",
        trend: state.stage === "NORMAL" ? "Standard baseline" : "+1 in demo (INC-2048)",
        description: "Open investigations",
      },
      {
        label: "Critical Incidents",
        value: isCritical ? "1" : "0",
        trend: isCritical
          ? "Escalated to Critical"
          : isElevated
            ? "Elevated / Monitoring"
            : "Nominal",
        description: "Requires containment approval",
      },
      {
        label: "Endpoints Monitored",
        value: "248",
        trend: "100% coverage",
        description: "EDR telemetry live",
      },
      {
        label: "Average Response Time",
        value: "6m 42s",
        trend: "18% faster",
        description: "Simulated mean time",
      },
    ],
  };
}

export function getTimelineState(minute: number) {
  const state = getIncidentStateAtTime(minute);
  return {
    current: state.activeEvent,
    happened: state.completedEvents,
    all: state.allEvents,
  };
}

export function getAttackNodesForMinute(minute: number) {
  const state = getIncidentStateAtTime(minute);
  return state.activeAttackNodes;
}

export const demoData = {
  incidents,
  timelineEvents: demoTimelineEvents,
  attackNodes: demoAttackNodes,
  blastRadius: demoBlastRadius,
  simulationOptions: demoSimulationOptions,
  responseActions: demoResponseActions,
  evidenceEvents: demoEvidence,
  missedSignals: demoMissedSignals,
};
