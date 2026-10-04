import type {
  AssetType,
  AttackEdge,
  AttackNode,
  Evidence,
  IncidentStage,
  Severity,
  TimelineEvent,
} from "./incident";

export type AssetState =
  "HEALTHY" | "MONITORED" | "SUSPICIOUS" | "COMPROMISED" | "ISOLATED" | "RECOVERED";

export type UserStatus = "ACTIVE" | "INACTIVE" | "SUSPICIOUS" | "COMPROMISED" | "DISABLED";

export type DataClassification =
  "PUBLIC" | "INTERNAL" | "CONFIDENTIAL" | "RESTRICTED" | "HIGHLY_SENSITIVE";

export type TimelineZoom = "OVERVIEW" | "INCIDENT" | "FORENSIC";

export type TimelineCategory =
  "AUTHENTICATION" | "ENDPOINT" | "NETWORK" | "PROCESS" | "DATABASE" | "FILE" | "CLOUD" | "ALERT";

export interface UserTemporalState {
  id: string;
  username: string;
  displayName: string;
  department: string;
  role: string;
  privilegeLevel: "STANDARD" | "ADMIN" | "SERVICE" | string;
  status: UserStatus;
  currentSessions: string[];
  lastAuthentication?: string;
  authenticationSource?: string;
  associatedDeviceIds: string[];
  compromisedAt?: string;
}

export interface AssetTemporalState {
  id: string;
  name: string;
  type: AssetType;
  hostname: string;
  owner: string;
  status: AssetState;
  risk: Severity;
  criticality: Severity;
  ipAddress: string;
  firstSeen: string;
  lastSeen: string;
  compromiseTime?: string;
  isolationStatus: "CONNECTED" | "ISOLATED";
  activeProcessIds: string[];
  networkConnectionIds: string[];
  currentUser?: string;
  evidenceCount: number;
}

export interface NetworkConnection {
  id: string;
  sourceId: string;
  destinationId: string;
  relationshipType:
    | "INTERNAL_TRAFFIC"
    | "AUTHENTICATED_CONNECTION"
    | "LATERAL_MOVEMENT"
    | "DATABASE_QUERY"
    | "FILE_ACCESS"
    | "EXTERNAL_INGRESS";
  firstSeen: string;
  lastSeen: string;
  status: "ACTIVE" | "CLOSED" | "BLOCKED";
  eventIds: string[];
  confidence: number;
  protocol?: string;
  port?: number;
}

export interface ActiveSession {
  id: string;
  userId: string;
  username: string;
  sourceAssetId: string;
  destinationAssetId: string;
  startedAt: string;
  endedAt?: string;
  status: "ACTIVE" | "TERMINATED" | "REVOKED";
  privilege: string;
  authMethod: string;
}

export interface ProcessActivity {
  id: string;
  pid: number;
  name: string;
  parentProcess: string;
  assetId: string;
  userId: string;
  timestamp: string;
  status: "BENIGN" | "SUSPICIOUS" | "MALICIOUS";
  commandSummary: string;
  evidenceIds: string[];
}

export interface DataResource {
  id: string;
  name: string;
  type: "DATABASE_TABLE" | "FILE_SHARE" | "CUSTOMER_RECORDS" | "CREDENTIAL_VAULT";
  classification: DataClassification;
  owner: string;
  criticality: Severity;
  assetId: string;
  accessedAt?: string;
  accessedBy?: string;
  recordsCount?: number;
  isExposed: boolean;
}

export interface TimelineBookmark {
  id: string;
  timestamp: string;
  minute: number;
  name: string;
  description?: string;
  createdAt: string;
}

export interface BlastRadiusMetrics {
  confirmedAffectedAssets: number;
  potentiallyAffectedAssets: number;
  criticalAssetsAffected: number;
  usersAffected: number;
  dataResourcesAtRisk: number;
  details: { label: string; count: number; severity: Severity }[];
}

export interface DigitalTwinSnapshot {
  timestamp: string;
  minute: number;
  incidentStage: IncidentStage;
  riskLevel: Severity;
  users: UserTemporalState[];
  assets: AssetTemporalState[];
  networkConnections: NetworkConnection[];
  activeSessions: ActiveSession[];
  processes: ProcessActivity[];
  dataResources: DataResource[];
  attackNodes: AttackNode[];
  attackEdges: AttackEdge[];
  activeEvents: TimelineEvent[];
  completedEvents: TimelineEvent[];
  upcomingEvents: TimelineEvent[];
  evidence: Evidence[];
  affectedAssets: string[];
  compromisedAssets: string[];
  confidence: number;
  blastRadius: BlastRadiusMetrics;
}

export interface SnapshotDiff {
  timestampA: string;
  timestampB: string;
  stageChange: { from: IncidentStage; to: IncidentStage } | null;
  riskChange: { from: Severity; to: Severity } | null;
  newCompromisedAssets: string[];
  recoveredAssets: string[];
  newConnections: NetworkConnection[];
  newProcesses: ProcessActivity[];
  newSessions: ActiveSession[];
  newEvidence: Evidence[];
  newCompromisedUsers: string[];
}
