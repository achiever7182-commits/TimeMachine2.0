import {
  demoAttackEdges,
  demoAttackNodes,
  demoBlastRadius,
  demoEvidence,
  demoIncident,
  demoMissedSignals,
  demoResponseActions,
  demoSimulationOptions,
  demoTimelineEvents,
} from "./incidentData";
import { demoAssets, demoOrganization, demoUsers } from "./organization";

export const incidents = [
  demoIncident,
  {
    id: "INC-2047",
    title: "Suspicious PowerShell Activity",
    severity: "HIGH" as const,
    status: "INVESTIGATING" as const,
    organizationId: "ORG-ACME",
    detectedAt: "10:05",
    createdAt: "2026-09-29T10:05:00Z",
    currentSimulationTime: "10:05",
    startTime: "10:04",
    endTime: "10:05",
    affectedAssetIds: ["LAPTOP-042"],
    eventIds: ["raw-1004-ps"],
    rootCause: "Encoded command execution on finance workstation",
    confidence: 0.88,
    stage: "ACCOUNT_COMPROMISED" as const,
    detectedAgo: "31 minutes ago",
    affectedAssets: 1,
    summary:
      "Endpoint automation executed an unusual encoded PowerShell command on a finance workstation.",
  },
  {
    id: "INC-2046",
    title: "Unusual Cloud Login",
    severity: "MEDIUM" as const,
    status: "SIMULATED" as const,
    organizationId: "ORG-ACME",
    detectedAt: "09:36",
    createdAt: "2026-09-29T09:36:00Z",
    currentSimulationTime: "09:36",
    startTime: "09:35",
    endTime: "09:36",
    affectedAssetIds: ["VPN-GW-01"],
    eventIds: ["raw-0942-auth"],
    rootCause: "Cloud login originated from an unfamiliar ASN",
    confidence: 0.75,
    stage: "SUSPICIOUS_ACTIVITY" as const,
    detectedAgo: "1 hour ago",
    affectedAssets: 1,
    summary: "Cloud login originated from an unfamiliar ASN with anomalous session duration.",
  },
];

export const timelineEvents = demoTimelineEvents;
export const attackNodes = demoAttackNodes;
export const attackEdges = demoAttackEdges;
export const blastRadius = demoBlastRadius;
export const simulationOptions = demoSimulationOptions;
export const responseActions = demoResponseActions;
export const evidenceEvents = demoEvidence;
export const missedSignals = demoMissedSignals;

export { demoOrganization, demoUsers, demoAssets };
