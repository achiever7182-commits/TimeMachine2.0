import type { BlastRadiusMetrics } from "./digitalTwin";
import type { Severity } from "./incident";

export type AttackGraphNodeType =
  | "USER"
  | "ENDPOINT"
  | "SERVER"
  | "DATABASE"
  | "FILE_SERVER"
  | "NETWORK_GATEWAY"
  | "DATA_RESOURCE"
  | "PROCESS"
  | "EXTERNAL_THREAT";

export type AttackGraphNodeStatus =
  | "HEALTHY"
  | "MONITORED"
  | "SUSPICIOUS"
  | "COMPROMISED"
  | "AFFECTED"
  | "ISOLATED"
  | "RECOVERED"
  | "UNKNOWN";

export type AttackRelationshipType =
  | "AUTHENTICATED_TO"
  | "CONNECTED_TO"
  | "EXECUTED_ON"
  | "ACCESSED"
  | "LATERALLY_MOVED_TO"
  | "QUERIED"
  | "ACCESSED_DATA"
  | "COMMUNICATED_WITH";

export interface AttackGraphNode {
  id: string;
  label: string;
  type: AttackGraphNodeType;
  status: AttackGraphNodeStatus;
  risk: Severity;
  criticality: Severity;
  firstSeen: string;
  compromiseTime?: string;
  owner: string;
  currentUser?: string;
  evidenceIds: string[];
  eventIds: string[];
  confidence: number;
  tier: number; // 0: External/Threat, 1: Identity, 2: Endpoint, 3: Server, 4: Database, 5: FileStore/Data
  x?: number;
  y?: number;
  metadata?: Record<string, unknown>;
}

export interface AttackGraphEdge {
  id: string;
  source: string;
  target: string;
  relationshipType: AttackRelationshipType;
  status: "ACTIVE" | "BLOCKED" | "POTENTIAL";
  firstSeen: string;
  lastSeen: string;
  eventIds: string[];
  evidenceIds: string[];
  confidence: number;
  techniqueCategory: string; // e.g. "T1078 Valid Accounts", "T1021.002 SMB/WinRM", "T1059 Command & Scripting"
  description: string;
}

export interface AttackPath {
  pathId: string;
  name: string;
  nodeIds: string[];
  edgeIds: string[];
  startTime: string;
  endTime: string;
  status: "ACTIVE" | "STOPPED" | "POTENTIAL";
  confidence: number;
  severity: Severity;
  summary: string;
}

export interface AttackGraphState {
  timestamp: string;
  minute: number;
  incidentId: string;
  nodes: AttackGraphNode[];
  edges: AttackGraphEdge[];
  entryPoint: AttackGraphNode | null;
  compromisedNodes: AttackGraphNode[];
  suspiciousNodes: AttackGraphNode[];
  affectedNodes: AttackGraphNode[];
  criticalNodes: AttackGraphNode[];
  activePath: AttackPath | null;
  attackPaths: AttackPath[];
  blastRadius: BlastRadiusMetrics;
  confidence: number;
}

export interface AttackGraphFilter {
  nodeType: AttackGraphNodeType | "ALL";
  status: AttackGraphNodeStatus | "ALL";
  relationship: AttackRelationshipType | "ALL";
  searchQuery: string;
}
