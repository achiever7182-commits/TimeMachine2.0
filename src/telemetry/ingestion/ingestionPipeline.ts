/**
 * PHASE 1 — REAL SYSTEM FOUNDATION
 * Telemetry Architecture: Event Ingestion Pipeline
 *
 * The ingestion pipeline is a 5-stage processing chain that transforms raw
 * collector events into canonical, enriched, indexed telemetry events:
 *
 *   Stage 1 — VALIDATION    : Schema conformance checks
 *   Stage 2 — NORMALIZATION : Map to CanonicalEvent structure
 *   Stage 3 — DEDUPLICATION : Fingerprint-based duplicate suppression
 *   Stage 4 — ENRICHMENT    : Add context tags (geo, asset, threat intel)
 *   Stage 5 — ROUTING       : Dispatch to storage + detection engine
 *
 * The pipeline is fully synchronous and deterministic — the same input always
 * produces the same output. No network calls, no side effects beyond the
 * in-memory store.
 */

import type {
  CanonicalEvent,
  EventCategory,
  EventId,
  IngestionError,
  IngestionResult,
  IsoTimestamp,
  RuleId,
  TelemetrySeverity,
} from "@/telemetry/schema/telemetryTypes";
import type { RawCollectorEvent } from "@/telemetry/collector/collectors";
import { TelemetryStore } from "@/telemetry/storage/telemetryStore";
import { DetectionEngine } from "@/telemetry/detection/detectionEngine";

// ─── Severity Order ───────────────────────────────────────────────────────────

const SEVERITY_ORDER: TelemetrySeverity[] = ["INFO", "LOW", "MEDIUM", "HIGH", "CRITICAL"];

export function severityScore(s: TelemetrySeverity): number {
  return SEVERITY_ORDER.indexOf(s);
}

export function maxSeverity(a: TelemetrySeverity, b: TelemetrySeverity): TelemetrySeverity {
  return severityScore(a) >= severityScore(b) ? a : b;
}

// ─── ID Generation ────────────────────────────────────────────────────────────

let _idCounter = 0;

function generateEventId(): EventId {
  _idCounter += 1;
  return `cevt-${_idCounter.toString().padStart(6, "0")}`;
}

// ─── Fingerprinting (Deduplication) ──────────────────────────────────────────

/**
 * Generates a stable fingerprint for a raw event to detect duplicates.
 * Two events are considered duplicates if they share the same:
 *   - simulation minute
 *   - category
 *   - source payload type
 *   - primary subject (asset ID + user ID combination)
 *   - first 64 chars of description (allows minor wording variations)
 */
function fingerprint(event: RawCollectorEvent): string {
  const payloadType = event.payload.sourceType;
  const primaryAsset =
    "assetId" in event.payload ? ((event.payload as { assetId?: string }).assetId ?? "") : "";
  const primaryUser =
    "userId" in event.payload ? ((event.payload as { userId?: string }).userId ?? "") : "";
  const descSlice = event.description.slice(0, 64);
  return `${event.simulationMinute}|${event.category}|${payloadType}|${primaryAsset}|${primaryUser}|${descSlice}`;
}

// ─── Threat Intel Tags ────────────────────────────────────────────────────────

/** Known malicious ASNs (simulated threat intel feed). */
const MALICIOUS_ASNS = new Set(["AS9009", "AS49505", "AS206728"]);

/** Known suspicious process names. */
const SUSPICIOUS_PROCESSES = new Set([
  "powershell.exe",
  "cmd.exe",
  "wscript.exe",
  "cscript.exe",
  "mshta.exe",
  "regsvr32.exe",
  "certutil.exe",
  "archive.exe",
  "sqlcmd.exe",
]);

/** File extensions that indicate sensitive data. */
const SENSITIVE_EXTENSIONS = new Set([".xlsx", ".pdf", ".docx", ".csv", ".pst", ".kdb"]);

/** Internal IP ranges for ACME Corporation. */
const INTERNAL_RANGES = ["10.0.", "192.168.", "172.16."];

function isInternalIp(ip: string): boolean {
  return INTERNAL_RANGES.some((r) => ip.startsWith(r));
}

// ─── Enrichment Tags ──────────────────────────────────────────────────────────

function computeEnrichmentTags(event: RawCollectorEvent): string[] {
  const tags: string[] = [];
  const p = event.payload;

  // Severity tags
  if (event.severity === "CRITICAL") tags.push("severity:critical");
  if (event.severity === "HIGH") tags.push("severity:high");

  // Source type tags
  tags.push(`source-type:${p.sourceType.toLowerCase()}`);
  tags.push(`category:${event.category.toLowerCase().replace(/_/g, "-")}`);

  // Auth-specific enrichment
  if (p.sourceType === "AUTH") {
    if (p.asn && MALICIOUS_ASNS.has(p.asn)) tags.push("threat-intel:malicious-asn");
    if (p.outcome === "MFA_FATIGUE") tags.push("attack:mfa-fatigue");
    if (p.outcome === "FAILURE") tags.push("auth:failed");
    if (p.outcome === "SUCCESS") tags.push("auth:success");
    if (p.country && p.country !== "US") tags.push(`geo:country-${p.country.toLowerCase()}`);
    if (p.sourceIp && !isInternalIp(p.sourceIp)) tags.push("network:external-ip");
    if (p.mfaChallenged) tags.push("auth:mfa-challenged");
  }

  // Process-specific enrichment
  if (p.sourceType === "PROCESS") {
    if (SUSPICIOUS_PROCESSES.has(p.processName.toLowerCase())) {
      tags.push("process:suspicious-name");
    }
    if (p.isElevated) tags.push("process:elevated");
    if (p.isSuspicious) tags.push("process:flagged-suspicious");
    if (
      p.commandLine.toLowerCase().includes("-enc") ||
      p.commandLine.toLowerCase().includes("bypass")
    ) {
      tags.push("process:encoded-command");
    }
    if (
      p.commandLine.toLowerCase().includes("iex") ||
      p.commandLine.toLowerCase().includes("downloadstring")
    ) {
      tags.push("process:remote-download");
    }
    if (p.integrityLevel === "SYSTEM") tags.push("process:system-integrity");
  }

  // Network-specific enrichment
  if (p.sourceType === "NETWORK") {
    if (p.direction === "LATERAL") tags.push("network:lateral-movement");
    if (!isInternalIp(p.sourceIp)) tags.push("network:external-source");
    if (p.protocol === "SMB") tags.push("network:smb");
    if (p.protocol === "RDP" || p.protocol === "WINRM") tags.push("network:remote-admin");
    if (p.bytesOut > 1_000_000) tags.push("network:high-volume-egress");
    if (p.dnsQuery) tags.push("network:dns-resolution");
  }

  // File-specific enrichment
  if (p.sourceType === "FILE") {
    if (p.isSensitive) tags.push("data:sensitive-file");
    if (p.action === "ENUMERATE") tags.push("data:bulk-enumeration");
    if (p.fileExtension.split(",").some((ext) => SENSITIVE_EXTENSIONS.has(ext.trim()))) {
      tags.push("data:financial-document");
    }
    if (p.sensitivityLabel) tags.push(`data:label-${p.sensitivityLabel.toLowerCase()}`);
  }

  // Database-specific enrichment
  if (p.sourceType === "DATABASE") {
    if (p.isBulkOperation) tags.push("data:bulk-db-operation");
    if (p.isPrivileged) tags.push("data:privileged-db-access");
    if (p.rowsAffected > 10000) tags.push("data:large-result-set");
  }

  return tags;
}

// ─── Suspicion Assessment ─────────────────────────────────────────────────────

const SUSPICION_TAGS = new Set([
  "threat-intel:malicious-asn",
  "attack:mfa-fatigue",
  "process:encoded-command",
  "process:remote-download",
  "process:system-integrity",
  "network:lateral-movement",
  "data:bulk-enumeration",
  "data:bulk-db-operation",
]);

function assessSuspicion(tags: string[], rawEvent: RawCollectorEvent): boolean {
  if (tags.some((t) => SUSPICION_TAGS.has(t))) return true;
  if (rawEvent.severity === "CRITICAL") return true;
  if (rawEvent.payload.sourceType === "PROCESS" && rawEvent.payload.isSuspicious) return true;
  return false;
}

// ─── Stage 1: Validation ──────────────────────────────────────────────────────

function validateEvent(event: RawCollectorEvent): IngestionError | null {
  if (!event.localId || event.localId.trim() === "") {
    return {
      eventId: undefined,
      phase: "VALIDATION",
      reason: "Missing localId",
      timestamp: new Date().toISOString(),
    };
  }
  if (
    typeof event.simulationMinute !== "number" ||
    event.simulationMinute < 0 ||
    event.simulationMinute > 42
  ) {
    return {
      eventId: event.localId,
      phase: "VALIDATION",
      reason: `Invalid simulationMinute: ${event.simulationMinute}`,
      timestamp: new Date().toISOString(),
    };
  }
  if (!event.payload || !event.payload.sourceType) {
    return {
      eventId: event.localId,
      phase: "VALIDATION",
      reason: "Missing or invalid payload",
      timestamp: new Date().toISOString(),
    };
  }
  return null;
}

// ─── Stage 2: Normalization ───────────────────────────────────────────────────

function normalizeEvent(
  event: RawCollectorEvent,
  canonicalId: EventId,
  ingestedAt: IsoTimestamp,
  tags: string[],
  isSuspicious: boolean,
): CanonicalEvent {
  const p = event.payload;

  // Extract asset and user IDs from payload
  const assetIds: string[] = [];
  const userIds: string[] = [];

  if ("assetId" in p && p.assetId) assetIds.push(p.assetId);
  if ("userId" in p && p.userId) userIds.push(p.userId);

  return {
    id: canonicalId,
    observedAt: event.observedAt,
    ingestedAt,
    simulationMinute: event.simulationMinute,
    category: event.category,
    severity: event.severity,
    source: event.source,
    description: event.description,
    isSuspicious,
    confidence: computeConfidence(event, isSuspicious),
    assetIds,
    userIds,
    rawPayload: p,
    tags,
    matchedRuleIds: [],
    isDeduplicated: false,
  };
}

function computeConfidence(event: RawCollectorEvent, isSuspicious: boolean): number {
  // Base confidence varies by source type
  const baseMap: Record<string, number> = {
    AUTH: 0.88,
    PROCESS: 0.94,
    NETWORK: 0.91,
    FILE: 0.87,
    DATABASE: 0.95,
    ENDPOINT: 0.9,
    ALERT: 0.98,
  };
  let base = baseMap[event.payload.sourceType] ?? 0.8;
  // Boost for critical events
  if (event.severity === "CRITICAL") base = Math.min(1, base + 0.04);
  // Boost for suspicious events
  if (isSuspicious) base = Math.min(1, base + 0.02);
  return parseFloat(base.toFixed(3));
}

// ─── Ingestion Pipeline ───────────────────────────────────────────────────────

export class IngestionPipeline {
  private readonly store: TelemetryStore;
  private readonly detector: DetectionEngine;

  /** Fingerprint cache for deduplication. */
  private readonly fingerprintCache = new Map<string, EventId>();

  constructor(store: TelemetryStore, detector: DetectionEngine) {
    this.store = store;
    this.detector = detector;
  }

  /**
   * Ingests a batch of raw collector events through the full 5-stage pipeline.
   * Returns a detailed result describing what happened at each stage.
   */
  ingest(rawEvents: RawCollectorEvent[]): IngestionResult {
    const startMs = Date.now();
    const errors: IngestionError[] = [];
    const ingestedAt: IsoTimestamp = new Date().toISOString();

    let accepted = 0;
    let rejected = 0;
    let deduplicated = 0;
    let enriched = 0;
    let alertsGenerated = 0;

    for (const raw of rawEvents) {
      // ── Stage 1: Validation ────────────────────────────────────────────────
      const validationError = validateEvent(raw);
      if (validationError) {
        errors.push(validationError);
        rejected++;
        continue;
      }

      // ── Stage 3: Deduplication ─────────────────────────────────────────────
      const fp = fingerprint(raw);
      const existingId = this.fingerprintCache.get(fp);
      if (existingId) {
        deduplicated++;
        // Record the duplicate in the store as a deduplicated marker
        this.store.markDeduplicated(raw.localId, existingId);
        continue;
      }

      // ── Stage 4: Enrichment ────────────────────────────────────────────────
      const tags = computeEnrichmentTags(raw);
      const isSuspicious = assessSuspicion(tags, raw);
      enriched++;

      // ── Stage 2: Normalization ─────────────────────────────────────────────
      const canonicalId = generateEventId();
      const canonical = normalizeEvent(raw, canonicalId, ingestedAt, tags, isSuspicious);

      // Register fingerprint
      this.fingerprintCache.set(fp, canonicalId);

      // ── Stage 5a: Storage ──────────────────────────────────────────────────
      const storageError = this.store.insert(canonical);
      if (storageError) {
        errors.push({ ...storageError, eventId: canonicalId });
        rejected++;
        continue;
      }

      accepted++;

      // ── Stage 5b: Detection ────────────────────────────────────────────────
      const newAlerts = this.detector.evaluate(canonical, this.store);
      alertsGenerated += newAlerts.length;

      // Stamp matched rule IDs back onto the canonical event in the store
      if (newAlerts.length > 0) {
        const matchedIds: RuleId[] = newAlerts.map((a) => a.ruleId);
        this.store.stampMatchedRules(canonicalId, matchedIds);
      }
    }

    return {
      accepted,
      rejected,
      deduplicated,
      enriched,
      alertsGenerated,
      processingTimeMs: Date.now() - startMs,
      errors,
    };
  }

  /**
   * Resets the deduplication cache. Call this when rewinding the simulation.
   */
  resetDeduplicationCache(): void {
    this.fingerprintCache.clear();
  }
}
