export type Severity = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
export type IncidentStatus = "INVESTIGATING" | "CONTAINED" | "SIMULATED";
export type AssetStatus = "Clean" | "Suspicious" | "Compromised" | "Contained" | "Potential";
export type RiskLevel = "Normal" | "Elevated" | "High" | "Critical";
export type EvidenceType = "AUTH" | "ENDPOINT" | "NETWORK" | "CLOUD" | "PROCESS";

export interface Incident {
  id: string;
  title: string;
  severity: Severity;
  detectedAt: string;
  detectedAgo: string;
  affectedAssets: number;
  employeeAccount?: string;
  status: IncidentStatus;
  summary: string;
}

export interface TimelineEvent {
  id: string;
  time: string;
  minute: number;
  label: string;
  state: string;
  risk: RiskLevel;
  assets: string[];
  signal?: string;
}

export interface AttackNode {
  id: string;
  label: string;
  icon: string;
  status: AssetStatus;
  risk: RiskLevel;
  timestamp: string;
  hostname?: string;
  relatedEvents: number;
  activateAt: number;
}

export interface BlastRadiusNode {
  label: string;
  count: string;
  impact: "confirmed" | "potential";
}

export interface SimulationOption {
  id: string;
  label: string;
  subtitle: string;
  interruptNode?: string;
  riskReduction: string;
  businessImpact: string;
  attackProgression: string;
  evidencePreserved: string;
  timeline: Array<{ time: string; event: string }>;
  result: string[];
}

export interface ResponseAction {
  id: string;
  label: string;
  explanation: string;
  expectedEffect: string;
  risk: Severity;
  businessImpact: string;
}

export interface EvidenceEvent {
  id: string;
  time: string;
  type: EvidenceType;
  actor: string;
  action: string;
  target: string;
  severity: Severity;
  detail: string;
}
