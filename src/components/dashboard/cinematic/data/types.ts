import type { DataProvenance, Provenanced } from "./provenance";

export type AttackStageId =
  | "initial_access"
  | "credential_access"
  | "execution"
  | "privilege_escalation"
  | "lateral_movement"
  | "collection"
  | "impact";

export interface AttackStep {
  id: string;
  stage: AttackStageId;
  tOffsetSec: number;
  hostname: string;
  ip: string;
  process?: string;
  parentProcess?: string;
  commandRedacted?: string;
  mitre?: string;
  eventCount: number;
  evidenceRefs: string[];
}

export type CNodeKind =
  "user" | "endpoint" | "server" | "database" | "identity" | "firewall" | "network" | "attacker";

export type CNodeState = "nominal" | "suspicious" | "compromised" | "contained" | "verified";

export interface CNode {
  id: string;
  kind: CNodeKind;
  label: string;
  x: number;
  y: number;
  state: CNodeState;
}

export interface CEdge {
  id: string;
  from: string;
  to: string;
  kind: "normal" | "attack" | "blocked";
}

export interface NetworkLayout {
  nodes: CNode[];
  edges: CEdge[];
  viewBox: string;
}

export type ResponseOptionSeverity = "low" | "medium" | "high";
export type ResponseTargetType = "USER" | "ENDPOINT" | "CONNECTION" | "NONE";

export interface ResponseOption {
  id: string;
  label: string;
  targetId: string;
  targetType: ResponseTargetType;
  description: string;
  estimatedImpactSec: number;
  riskReductionPct: number;
  severity: ResponseOptionSeverity;
}

export type VerificationStatus = "pending" | "running" | "pass" | "fail";

export interface VerificationCheck {
  id: string;
  label: string;
  status: VerificationStatus;
  completedAt?: string;
  note?: string;
}

export interface NetworkLayouts {
  desktop: NetworkLayout;
  tablet: NetworkLayout;
  mobile: NetworkLayout;
}

export interface TelemetrySnapshot {
  cpuPct: number;
  memPct: number;
  netMBps: number;
  processes: number;
  eventsPerSec: number;
}

export interface CinematicFixture {
  version: number;
  incidentId: string;
  generatedAt: string;
  seed: number;
  network: NetworkLayouts;
  attackSteps: AttackStep[];
  responseOptions: ResponseOption[];
  verification: VerificationCheck[];
  telemetryBaseline: TelemetrySnapshot;
  telemetryPeak: TelemetrySnapshot;
  reconstruction: {
    firstEventId: string;
    detectionOpportunitySec: number;
    missedSignalsCount: number;
    evidenceTotal: number;
    hostsAffected: number;
    processesInvolved: number;
    networkConnections: number;
  };
  tagline: string;
}

export type { DataProvenance, Provenanced };

export interface CinematicIncidentSummary {
  id: string;
  severity: "low" | "medium" | "high" | "critical";
  status: string;
  detectedAt: string;
  affectedAssets: number;
  events: number;
  mitreTechniques: number;
  evidence: number;
}

export interface CinematicInvestigationSummary {
  eventsCorrelated: number;
  hostsAffected: number;
  processesInvolved: number;
  networkConnections: number;
  evidenceItems: number;
}

export interface CinematicData {
  mode: "demo" | "live";
  telemetry: Provenanced<TelemetrySnapshot | null>;
  incident: Provenanced<CinematicIncidentSummary | null>;
  attackPath: Provenanced<AttackStep[]>;
  graph: Provenanced<{ nodes: CNode[]; edges: CEdge[] }>;
  investigation: Provenanced<CinematicInvestigationSummary | null>;
  responseOptions: ResponseOption[];
  simulation: { available: boolean; route: string | null };
  verification: Provenanced<VerificationCheck[]>;
  layouts: NetworkLayouts;
  tagline: string;
}
