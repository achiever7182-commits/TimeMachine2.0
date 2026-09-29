export type Severity = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";

export type IncidentStatus = "ACTIVE" | "INVESTIGATING" | "CONTAINED" | "RESOLVED" | "SIMULATED";

export type IncidentStage =
  | "NORMAL"
  | "ATTACK_STARTED"
  | "SUSPICIOUS_ACTIVITY"
  | "ACCOUNT_COMPROMISED"
  | "LATERAL_MOVEMENT"
  | "DATA_ACCESS"
  | "INCIDENT_DETECTED"
  | "INVESTIGATING"
  | "CONTAINED"
  | "RESOLVED";

export type AssetType =
  | "USER"
  | "ENDPOINT"
  | "SERVER"
  | "DATABASE"
  | "NETWORK"
  | "CLOUD_RESOURCE"
  | "FILE_STORE";

export type AssetStatus = "HEALTHY" | "SUSPICIOUS" | "COMPROMISED" | "ISOLATED" | "UNKNOWN" | "Clean" | "Potential" | "Contained";

export type RiskLevel = "Normal" | "Elevated" | "High" | "Critical" | "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";

export type EventType =
  | "AUTHENTICATION"
  | "PROCESS_EXECUTION"
  | "NETWORK_CONNECTION"
  | "FILE_ACCESS"
  | "PRIVILEGE_CHANGE"
  | "CLOUD_ACTIVITY"
  | "ENDPOINT_ACTIVITY"
  | "DATABASE_ACTIVITY"
  | "ALERT";

export type EventLifecycleState = "UPCOMING" | "ACTIVE" | "COMPLETED";

export interface Asset {
  id: string;
  name: string;
  type: AssetType;
  hostname?: string;
  owner?: string;
  status: AssetStatus;
  criticality: Severity;
  department: string;
  ipAddress: string;
  tags: string[];
  firstSeen: string;
  lastSeen: string;
}

export interface User {
  id: string;
  username: string;
  displayName: string;
  department: string;
  role: string;
  privilegeLevel: "STANDARD" | "ADMIN" | "SERVICE" | string;
  status: "ACTIVE" | "SUSPENDED" | "COMPROMISED";
  associatedAssetIds: string[];
}

export interface Event {
  id: string;
  timestamp: string;
  type: EventType;
  source: string;
  severity: Severity;
  userId?: string;
  assetId?: string;
  sourceIp?: string;
  destinationIp?: string;
  description: string;
  evidenceIds: string[];
  relatedAssetIds: string[];
  confidence: number;
  metadata?: Record<string, unknown>;
}

export interface TimelineEvent {
  id: string;
  timestamp: string;
  title: string;
  description: string;
  category: string;
  severity: Severity;
  eventIds: string[];
  affectedAssetIds: string[];
  stage: IncidentStage;
  importance: Severity;
  // UI backwards compatibility properties
  time?: string;
  minute?: number;
  label?: string;
  state?: string;
  risk?: RiskLevel;
  assets?: string[];
  signal?: string;
}

export interface AttackNode {
  id: string;
  entityId: string;
  entityType: string;
  label: string;
  status: AssetStatus;
  firstCompromisedAt?: string;
  lastObservedAt?: string;
  // UI presentation properties
  icon?: string;
  hostname?: string;
  risk?: RiskLevel;
  timestamp?: string;
  relatedEvents?: number;
  activateAt?: number;
}

export interface AttackEdge {
  id: string;
  sourceNodeId: string;
  targetNodeId: string;
  timestamp: string;
  relationship: string;
  eventIds: string[];
  confidence: number;
}

export interface Evidence {
  id: string;
  timestamp: string;
  type: string;
  source: string;
  title: string;
  content: string;
  severity: Severity;
  eventId?: string;
  assetId?: string;
  hash?: string;
  metadata?: Record<string, unknown>;
  // UI compatibility
  time?: string;
  actor?: string;
  action?: string;
  target?: string;
  detail?: string;
}

export interface SimulationState {
  isRunning: boolean;
  isPaused: boolean;
  simulationSpeed: number; // 0.5, 1, 2, 5, 10
  currentTime: string;
  startTime: string;
  endTime: string;
  stage: IncidentStage;
  riskLevel: Severity;
  completedEventIds: string[];
  visibleEventIds: string[];
  activeAssetIds: string[];
  compromisedAssetIds: string[];
}

export interface Incident {
  id: string;
  title: string;
  description: string;
  severity: Severity;
  status: IncidentStatus;
  organizationId: string;
  detectedAt: string;
  createdAt: string;
  currentSimulationTime: string;
  startTime: string;
  endTime: string;
  affectedAssetIds: string[];
  eventIds: string[];
  rootCause: string;
  confidence: number;
  stage: IncidentStage;
  // UI backwards compatibility properties
  detectedAgo?: string;
  affectedAssets?: number;
  employeeAccount?: string;
  summary?: string;
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

export type EvidenceType = "AUTH" | "ENDPOINT" | "NETWORK" | "CLOUD" | "PROCESS";

export type EvidenceEvent = Evidence;
