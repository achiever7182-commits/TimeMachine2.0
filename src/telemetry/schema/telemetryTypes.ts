/**
 * PHASE 1 — REAL SYSTEM FOUNDATION
 * Telemetry Architecture: Canonical Event Schema
 *
 * This module defines the canonical, strongly-typed schema for every telemetry
 * event that flows through the Incident Time Machine pipeline.
 *
 * Design principles:
 *  - Every raw event is normalized into a CanonicalEvent before storage.
 *  - Source-specific payload is preserved verbatim in `rawPayload`.
 *  - All timestamps are ISO-8601 UTC strings.
 *  - Zero `any` types — exhaustive discriminated unions throughout.
 */

// ─── Primitive Identifiers ────────────────────────────────────────────────────

/** Unique event identifier — e.g. "evt-a3f72d". */
export type EventId = string;

/** Unique asset identifier — e.g. "LAPTOP-042". */
export type AssetId = string;

/** Unique user identifier — e.g. "usr-alex-m". */
export type UserId = string;

/** Unique rule identifier — e.g. "RULE-AUTH-001". */
export type RuleId = string;

/** Unique alert identifier — e.g. "ALT-0001". */
export type AlertId = string;

/** ISO-8601 UTC timestamp string — e.g. "2026-09-29T09:42:15.000Z". */
export type IsoTimestamp = string;

// ─── Severity & Classification ────────────────────────────────────────────────

export type TelemetrySeverity = "INFO" | "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";

export type TelemetrySource =
  | "ENDPOINT_AGENT"
  | "AUTH_PROVIDER"
  | "NETWORK_SENSOR"
  | "DATABASE_AUDIT"
  | "FILE_MONITOR"
  | "CLOUD_TRAIL"
  | "UEBA_ENGINE"
  | "SIEM_CORRELATION";

// ─── Canonical Event Categories ───────────────────────────────────────────────

export type EventCategory =
  | "AUTHENTICATION"
  | "PROCESS_EXECUTION"
  | "NETWORK_CONNECTION"
  | "FILE_ACCESS"
  | "PRIVILEGE_CHANGE"
  | "DATABASE_ACTIVITY"
  | "ENDPOINT_ACTIVITY"
  | "CLOUD_ACTIVITY"
  | "ALERT"
  | "SYSTEM";

// ─── Source-Specific Raw Payloads (discriminated union) ───────────────────────

export interface AuthPayload {
  sourceType: "AUTH";
  userId: UserId;
  username: string;
  authMethod: "PASSWORD" | "MFA_PUSH" | "MFA_TOTP" | "SSO" | "CERTIFICATE";
  outcome: "SUCCESS" | "FAILURE" | "MFA_FATIGUE" | "LOCKED";
  sourceIp: string;
  destinationIp: string;
  asn?: string;
  userAgent?: string;
  country?: string;
  mfaChallenged: boolean;
  sessionId?: string;
}

export interface ProcessPayload {
  sourceType: "PROCESS";
  assetId: AssetId;
  hostname: string;
  processName: string;
  commandLine: string;
  parentProcess: string;
  pid: number;
  parentPid: number;
  userId: UserId;
  integrityLevel: "LOW" | "MEDIUM" | "HIGH" | "SYSTEM";
  sha256Hash?: string;
  isElevated: boolean;
  isSuspicious: boolean;
}

export interface NetworkPayload {
  sourceType: "NETWORK";
  sourceIp: string;
  destinationIp: string;
  sourcePort: number;
  destinationPort: number;
  protocol: "TCP" | "UDP" | "ICMP" | "DNS" | "HTTP" | "HTTPS" | "SMB" | "RDP" | "WINRM";
  direction: "INBOUND" | "OUTBOUND" | "LATERAL";
  bytesIn: number;
  bytesOut: number;
  duration: number;
  action: "ALLOW" | "BLOCK" | "MONITOR";
  assetId?: AssetId;
  dnsQuery?: string;
  dnsResponse?: string;
}

export interface FilePayload {
  sourceType: "FILE";
  assetId: AssetId;
  hostname: string;
  filePath: string;
  fileName: string;
  fileExtension: string;
  action: "READ" | "WRITE" | "DELETE" | "RENAME" | "MOVE" | "COPY" | "ENUMERATE";
  userId: UserId;
  sha256Hash?: string;
  sizeBytes?: number;
  isEncrypted?: boolean;
  isSensitive: boolean;
  sensitivityLabel?: string;
}

export interface DatabasePayload {
  sourceType: "DATABASE";
  assetId: AssetId;
  databaseName: string;
  tableName: string;
  queryType: "SELECT" | "INSERT" | "UPDATE" | "DELETE" | "DROP" | "CREATE" | "GRANT";
  rowsAffected: number;
  executionTimeMs: number;
  userId?: UserId;
  clientIp: string;
  isPrivileged: boolean;
  isBulkOperation: boolean;
  queryHash: string;
}

export interface EndpointPayload {
  sourceType: "ENDPOINT";
  assetId: AssetId;
  hostname: string;
  eventSubtype:
    | "LOGIN"
    | "LOGOUT"
    | "REMOTE_SESSION"
    | "POLICY_CHANGE"
    | "SERVICE_INSTALL"
    | "DRIVER_LOAD"
    | "REGISTRY_MODIFICATION"
    | "SCHEDULED_TASK";
  userId?: UserId;
  sourceIp?: string;
  sessionId?: string;
  details: Record<string, string | number | boolean>;
}

export interface AlertPayload {
  sourceType: "ALERT";
  alertId: AlertId;
  ruleId: RuleId;
  ruleName: string;
  triggeredBy: EventId[];
  severity: TelemetrySeverity;
  confidence: number;
  affectedAssets: AssetId[];
  affectedUsers: UserId[];
  mitreTactics: string[];
  mitreTechniques: string[];
  summary: string;
}

export type RawPayload =
  | AuthPayload
  | ProcessPayload
  | NetworkPayload
  | FilePayload
  | DatabasePayload
  | EndpointPayload
  | AlertPayload;

// ─── Canonical Telemetry Event ────────────────────────────────────────────────

/**
 * CanonicalEvent — the normalized, enriched representation of every telemetry
 * event after it passes through the ingestion pipeline.
 */
export interface CanonicalEvent {
  id: EventId;
  observedAt: IsoTimestamp;
  ingestedAt: IsoTimestamp;
  simulationMinute: number;
  category: EventCategory;
  severity: TelemetrySeverity;
  source: TelemetrySource;
  description: string;
  isSuspicious: boolean;
  confidence: number;
  assetIds: AssetId[];
  userIds: UserId[];
  rawPayload: RawPayload;
  tags: string[];
  matchedRuleIds: RuleId[];
  isDeduplicated: boolean;
  deduplicatedIntoId?: EventId;
}

// ─── Telemetry Alert ─────────────────────────────────────────────────────────

export type AlertStatus = "OPEN" | "ACKNOWLEDGED" | "SUPPRESSED" | "RESOLVED" | "ESCALATED";

export interface TelemetryAlert {
  id: AlertId;
  ruleId: RuleId;
  ruleName: string;
  description: string;
  severity: TelemetrySeverity;
  status: AlertStatus;
  createdAt: IsoTimestamp;
  updatedAt: IsoTimestamp;
  simulationMinute: number;
  triggeringEventIds: EventId[];
  affectedAssetIds: AssetId[];
  affectedUserIds: UserId[];
  confidence: number;
  mitreTactics: string[];
  mitreTechniques: string[];
  explanation: string;
  recommendedActions: string[];
}

// ─── Ingestion Pipeline Metadata ─────────────────────────────────────────────

export interface IngestionResult {
  accepted: number;
  rejected: number;
  deduplicated: number;
  enriched: number;
  alertsGenerated: number;
  processingTimeMs: number;
  errors: IngestionError[];
}

export interface IngestionError {
  eventId?: EventId;
  phase: "VALIDATION" | "NORMALIZATION" | "ENRICHMENT" | "STORAGE" | "DETECTION";
  reason: string;
  timestamp: IsoTimestamp;
}

// ─── Storage Query Parameters ─────────────────────────────────────────────────

export interface EventQuery {
  minuteRange?: { from: number; to: number };
  categories?: EventCategory[];
  minSeverity?: TelemetrySeverity;
  assetIds?: AssetId[];
  userIds?: UserId[];
  suspiciousOnly?: boolean;
  ruleIds?: RuleId[];
  limit?: number;
  order?: "ASC" | "DESC";
}

export interface AlertQuery {
  statuses?: AlertStatus[];
  minSeverity?: TelemetrySeverity;
  ruleIds?: RuleId[];
  assetIds?: AssetId[];
  userIds?: UserId[];
  minuteRange?: { from: number; to: number };
  limit?: number;
}

// ─── Pipeline Statistics ──────────────────────────────────────────────────────

export interface PipelineStats {
  totalEventsIngested: number;
  totalAlertsGenerated: number;
  totalDeduplicated: number;
  totalRejected: number;
  eventsByCategory: Record<EventCategory, number>;
  eventsBySeverity: Record<TelemetrySeverity, number>;
  alertsByRuleId: Record<RuleId, number>;
  alertsBySeverity: Record<TelemetrySeverity, number>;
  firstEventAt: IsoTimestamp | null;
  lastEventAt: IsoTimestamp | null;
  pipelineStartedAt: IsoTimestamp;
}
