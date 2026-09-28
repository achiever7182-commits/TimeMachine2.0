import {
  attackNodes,
  blastRadius,
  evidenceEvents,
  incidents,
  missedSignals,
  responseActions,
  simulationOptions,
  timelineEvents,
} from "@/data/incidents";

export function getDashboardSnapshot(step: number) {
  const stages = [
    "Normal",
    "Suspicious Login",
    "Account Compromised",
    "Endpoint Compromised",
    "Lateral Movement",
    "Database Access",
    "Incident Detected",
  ];
  return {
    stage: stages[Math.min(step, stages.length - 1)],
    kpis: [
      { label: "Active Incidents", value: step > 0 ? "3" : "2", trend: "+1 in demo", description: "Open investigations" },
      { label: "Critical Incidents", value: step >= 6 ? "1" : "0", trend: step >= 6 ? "Escalated now" : "Monitoring", description: "Requires approval" },
      { label: "Endpoints Monitored", value: "248", trend: "100% coverage", description: "EDR telemetry live" },
      { label: "Average Response Time", value: "6m 42s", trend: "18% faster", description: "Simulated mean time" },
    ],
  };
}

export function getActiveIncident() {
  return incidents[0];
}

export function getIncidentById(id: string) {
  return incidents.find((incident) => incident.id === id) ?? incidents[0];
}

export function getTimelineState(minute: number) {
  const happened = timelineEvents.filter((event) => event.minute <= minute);
  const current = happened[happened.length - 1] ?? timelineEvents[0];
  return { current, happened, all: timelineEvents };
}

export function getAttackNodesForMinute(minute: number) {
  return attackNodes.map((node) => ({
    ...node,
    status: node.activateAt <= minute ? node.status : "Clean" as const,
    risk: node.activateAt <= minute ? node.risk : "Normal" as const,
  }));
}

export const demoData = {
  incidents,
  timelineEvents,
  attackNodes,
  blastRadius,
  simulationOptions,
  responseActions,
  evidenceEvents,
  missedSignals,
};
