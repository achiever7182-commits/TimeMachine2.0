/**
 * PHASE 1 — REAL SYSTEM FOUNDATION
 * Telemetry Architecture: Detection Engine
 *
 * Rule-based detection engine that evaluates each canonical event against a
 * registry of typed detection rules. Three rule kinds are supported:
 *
 *   ThresholdRule     — fires when N events of a kind occur within a time window
 *   SequenceRule      — fires when a specific ordered sequence of events is observed
 *   AnomalyRule       — fires when a scored anomaly exceeds a configured threshold
 *
 * Each rule produces zero or one TelemetryAlert when it fires. Alerts are stored
 * in the TelemetryStore and back-stamped onto the triggering canonical events.
 *
 * MITRE ATT&CK technique IDs are attached to each rule for IRIS copilot context.
 */

import type {
  AlertId,
  CanonicalEvent,
  EventCategory,
  EventId,
  RuleId,
  TelemetryAlert,
  TelemetrySeverity,
} from "@/telemetry/schema/telemetryTypes";
import type { TelemetryStore } from "@/telemetry/storage/telemetryStore";

// ─── Alert ID Generator ───────────────────────────────────────────────────────

let _alertCounter = 0;

function generateAlertId(): AlertId {
  _alertCounter += 1;
  return `ALT-${_alertCounter.toString().padStart(4, "0")}`;
}

// ─── Base Rule Interface ──────────────────────────────────────────────────────

interface BaseRule {
  id: RuleId;
  name: string;
  description: string;
  severity: TelemetrySeverity;
  mitreTactics: string[];
  mitreTechniques: string[];
  recommendedActions: string[];
  /** Whether this rule can fire multiple times (default: true). */
  multifire?: boolean;
  /** Minimum simulation minute before rule is active (default: 0). */
  activeFromMinute?: number;
}

// ─── Rule Kinds ───────────────────────────────────────────────────────────────

/**
 * ThresholdRule — fires when `threshold` events matching the filter criteria
 * are observed within `windowMinutes` of each other.
 */
export interface ThresholdRule extends BaseRule {
  kind: "THRESHOLD";
  /** Minimum number of matching events required to fire. */
  threshold: number;
  /** Rolling window size in simulation minutes. */
  windowMinutes: number;
  /** Which event categories to count. */
  categories: EventCategory[];
  /** Optional: must also match this tag. */
  requiredTag?: string;
  /** Optional: must match this source type in payload. */
  requiredSourceType?: string;
  /** Optional: must match isSuspicious = true. */
  suspiciousOnly?: boolean;
}

/**
 * SequenceRule — fires when events matching each step in the sequence are
 * observed in order (steps can span multiple minutes, but must maintain relative
 * order). Each step must occur at a higher or equal minute than the previous.
 */
export interface SequenceRule extends BaseRule {
  kind: "SEQUENCE";
  /** Ordered sequence of step matchers. */
  steps: SequenceStep[];
  /** Maximum simulation minutes allowed between first and last step. */
  maxSpanMinutes: number;
}

export interface SequenceStep {
  label: string;
  category: EventCategory;
  requiredTag?: string;
  requiredSourceType?: string;
}

/**
 * AnomalyRule — computes an anomaly score from the current event stream and
 * fires when it exceeds `scoreThreshold`.
 */
export interface AnomalyRule extends BaseRule {
  kind: "ANOMALY";
  scoreThreshold: number;
  /** Scoring function — pure, no side effects. */
  computeScore: (event: CanonicalEvent, store: TelemetryStore) => number;
  /** Human-readable explanation template. */
  explanationTemplate: (score: number) => string;
}

export type DetectionRule = ThresholdRule | SequenceRule | AnomalyRule;

// ─── Rule Registry ────────────────────────────────────────────────────────────

export const DETECTION_RULES: DetectionRule[] = [
  // ── AUTH-001: Multiple Failed Authentication Attempts ─────────────────────
  {
    id: "RULE-AUTH-001",
    kind: "THRESHOLD",
    name: "Multiple Failed Authentication Attempts",
    description:
      "Three or more authentication failures for the same user within a 5-minute window indicate a brute-force or fatigue attack.",
    severity: "HIGH",
    threshold: 2,
    windowMinutes: 5,
    categories: ["AUTHENTICATION"],
    requiredSourceType: "AUTH",
    mitreTactics: ["Credential Access"],
    mitreTechniques: [
      "T1110 - Brute Force",
      "T1621 - Multi-Factor Authentication Request Generation",
    ],
    recommendedActions: [
      "Verify login attempt with the affected user out-of-band",
      "Temporarily lock the account if additional failures occur",
      "Review source IP reputation",
    ],
  },

  // ── AUTH-002: Authentication from Malicious ASN ───────────────────────────
  {
    id: "RULE-AUTH-002",
    kind: "THRESHOLD",
    name: "Authentication from Malicious ASN",
    description:
      "A successful authentication was observed from an IP address belonging to a known malicious autonomous system number (ASN).",
    severity: "CRITICAL",
    threshold: 1,
    windowMinutes: 10,
    categories: ["AUTHENTICATION"],
    requiredTag: "threat-intel:malicious-asn",
    suspiciousOnly: false,
    mitreTactics: ["Initial Access"],
    mitreTechniques: ["T1078 - Valid Accounts", "T1133 - External Remote Services"],
    recommendedActions: [
      "Immediately force MFA re-challenge for the affected user",
      "Block source IP at perimeter firewall",
      "Notify the user to confirm login legitimacy",
    ],
  },

  // ── AUTH-003: MFA Fatigue Attack Detected ─────────────────────────────────
  {
    id: "RULE-AUTH-003",
    kind: "THRESHOLD",
    name: "MFA Fatigue Attack Detected",
    description:
      "MFA push notifications are being repeatedly sent to a user, consistent with a fatigue-based bypass attack.",
    severity: "HIGH",
    threshold: 1,
    windowMinutes: 5,
    categories: ["AUTHENTICATION"],
    requiredTag: "attack:mfa-fatigue",
    mitreTactics: ["Credential Access"],
    mitreTechniques: ["T1621 - Multi-Factor Authentication Request Generation"],
    recommendedActions: [
      "Alert the user via a separate communication channel (phone/SMS)",
      "Temporarily disable push-based MFA; switch to TOTP",
      "Revoke all active sessions for the affected user",
    ],
  },

  // ── PROC-001: Encoded Command Execution ───────────────────────────────────
  {
    id: "RULE-PROC-001",
    kind: "THRESHOLD",
    name: "Encoded Command Execution Detected",
    description:
      "A process was launched with base64-encoded or obfuscated command-line arguments, a common technique for evading detection.",
    severity: "HIGH",
    threshold: 1,
    windowMinutes: 1,
    categories: ["PROCESS_EXECUTION"],
    requiredTag: "process:encoded-command",
    mitreTactics: ["Defense Evasion", "Execution"],
    mitreTechniques: ["T1059.001 - PowerShell", "T1027 - Obfuscated Files or Information"],
    recommendedActions: [
      "Capture and decode the base64 payload for analysis",
      "Isolate the endpoint to prevent lateral movement",
      "Review parent process lineage",
    ],
  },

  // ── PROC-002: Remote Download Execution ───────────────────────────────────
  {
    id: "RULE-PROC-002",
    kind: "THRESHOLD",
    name: "Remote Code Download and Execution",
    description:
      "A process downloaded and executed code from a remote location using PowerShell or similar tooling (living-off-the-land).",
    severity: "CRITICAL",
    threshold: 1,
    windowMinutes: 1,
    categories: ["PROCESS_EXECUTION"],
    requiredTag: "process:remote-download",
    mitreTactics: ["Execution", "Command and Control"],
    mitreTechniques: ["T1059.001 - PowerShell", "T1105 - Ingress Tool Transfer"],
    recommendedActions: [
      "Block outbound PowerShell HTTP requests at proxy/firewall",
      "Isolate the affected endpoint immediately",
      "Inspect downloaded payload for C2 infrastructure",
    ],
  },

  // ── NET-001: Lateral Movement via SMB ─────────────────────────────────────
  {
    id: "RULE-NET-001",
    kind: "THRESHOLD",
    name: "Lateral Movement via SMB Detected",
    description:
      "An internal SMB connection was established from a workstation to a server segment, which is anomalous for normal business operations.",
    severity: "HIGH",
    threshold: 1,
    windowMinutes: 5,
    categories: ["NETWORK_CONNECTION"],
    requiredTag: "network:smb",
    mitreTactics: ["Lateral Movement"],
    mitreTechniques: ["T1021.002 - SMB/Windows Admin Shares", "T1570 - Lateral Tool Transfer"],
    recommendedActions: [
      "Block the SMB connection at the internal firewall",
      "Isolate the source workstation from the network",
      "Inspect the target server for unauthorized processes",
    ],
  },

  // ── NET-002: High-Volume Data Egress ──────────────────────────────────────
  {
    id: "RULE-NET-002",
    kind: "THRESHOLD",
    name: "High-Volume Internal Data Transfer",
    description:
      "An internal connection transferred an unusually large volume of data, consistent with data staging or collection before exfiltration.",
    severity: "HIGH",
    threshold: 1,
    windowMinutes: 10,
    categories: ["NETWORK_CONNECTION"],
    requiredTag: "network:high-volume-egress",
    mitreTactics: ["Collection", "Exfiltration"],
    mitreTechniques: ["T1074 - Data Staged", "T1030 - Data Transfer Size Limits"],
    recommendedActions: [
      "Inspect the destination for signs of data staging",
      "Block the connection at the network layer",
      "Alert on further large transfers from the same source",
    ],
  },

  // ── DATA-001: Bulk Database Query Surge ───────────────────────────────────
  {
    id: "RULE-DATA-001",
    kind: "THRESHOLD",
    name: "Bulk Database Query Surge",
    description:
      "A database query returned an abnormally large number of rows, consistent with bulk data collection or exfiltration.",
    severity: "CRITICAL",
    threshold: 1,
    windowMinutes: 5,
    categories: ["DATABASE_ACTIVITY"],
    requiredTag: "data:bulk-db-operation",
    mitreTactics: ["Collection"],
    mitreTechniques: ["T1213 - Data from Information Repositories"],
    recommendedActions: [
      "Immediately terminate the database session",
      "Audit all queries executed in the past 30 minutes",
      "Review database account permissions and revoke if compromised",
    ],
  },

  // ── DATA-002: Sensitive File Enumeration ──────────────────────────────────
  {
    id: "RULE-DATA-002",
    kind: "THRESHOLD",
    name: "Sensitive File Bulk Enumeration",
    description:
      "A large number of sensitive or classified files were enumerated in a short time window, consistent with data collection before staging.",
    severity: "CRITICAL",
    threshold: 1,
    windowMinutes: 5,
    categories: ["FILE_ACCESS"],
    requiredTag: "data:bulk-enumeration",
    mitreTactics: ["Collection"],
    mitreTechniques: ["T1083 - File and Directory Discovery", "T1074.001 - Local Data Staging"],
    recommendedActions: [
      "Revoke file share access for the involved user account",
      "Inspect the file server for compression or archive processes",
      "Trigger DLP scan on the file share",
    ],
  },

  // ── SEQ-001: Full Attack Chain (Credential → Endpoint → Lateral → Data) ───
  {
    id: "RULE-SEQ-001",
    kind: "SEQUENCE",
    name: "Full Attack Kill Chain — Credential Compromise to Data Access",
    description:
      "A complete multi-stage attack chain was observed: credential compromise, endpoint access, lateral movement, and data collection. This is a high-confidence breach indicator.",
    severity: "CRITICAL",
    maxSpanMinutes: 42,
    steps: [
      {
        label: "Credential Compromise",
        category: "AUTHENTICATION",
        requiredTag: "threat-intel:malicious-asn",
      },
      {
        label: "Endpoint Persistence",
        category: "ENDPOINT_ACTIVITY",
        requiredSourceType: "ENDPOINT",
      },
      {
        label: "Lateral Movement",
        category: "NETWORK_CONNECTION",
        requiredTag: "network:lateral-movement",
      },
      {
        label: "Data Collection",
        category: "DATABASE_ACTIVITY",
      },
    ],
    mitreTactics: ["Initial Access", "Lateral Movement", "Collection"],
    mitreTechniques: [
      "T1078 - Valid Accounts",
      "T1021.002 - SMB/Windows Admin Shares",
      "T1213 - Data from Information Repositories",
    ],
    recommendedActions: [
      "Declare a P1 incident and activate the incident response playbook",
      "Isolate all affected hosts from the network immediately",
      "Revoke all active sessions for compromised user accounts",
      "Engage forensics team to preserve evidence",
      "Notify legal and compliance teams",
    ],
  },

  // ── ANO-001: Composite Suspicion Score ────────────────────────────────────
  {
    id: "RULE-ANO-001",
    kind: "ANOMALY",
    name: "Composite Suspicion Score Threshold",
    description:
      "A composite anomaly score across multiple event signals has exceeded the threshold, indicating a coordinated multi-vector attack pattern.",
    severity: "CRITICAL",
    scoreThreshold: 0.75,
    mitreTactics: ["Initial Access", "Lateral Movement", "Exfiltration"],
    mitreTechniques: ["T1078 - Valid Accounts", "T1041 - Exfiltration Over C2 Channel"],
    recommendedActions: [
      "Escalate to Tier 2 SOC analyst immediately",
      "Activate SOAR playbook for credential compromise + lateral movement",
      "Initiate threat hunt across all endpoints in the affected subnet",
    ],
    computeScore: (event: CanonicalEvent, store: TelemetryStore): number => {
      const allEvents = store.getAllEvents();
      const currentMinute = event.simulationMinute;

      let score = 0;

      // Factor 1: Proportion of suspicious events (0–0.30)
      const suspiciousEvents = allEvents.filter((e) => e.isSuspicious);
      const suspiciousRatio = allEvents.length > 0 ? suspiciousEvents.length / allEvents.length : 0;
      score += suspiciousRatio * 0.3;

      // Factor 2: Number of distinct affected assets (0–0.25, saturates at 4 assets)
      const affectedAssets = new Set(allEvents.flatMap((e) => e.assetIds));
      score += Math.min(affectedAssets.size / 4, 1) * 0.25;

      // Factor 3: Presence of lateral movement tag (0 or 0.20)
      const hasLateral = allEvents.some((e) => e.tags.includes("network:lateral-movement"));
      if (hasLateral) score += 0.2;

      // Factor 4: CRITICAL severity events in the last 10 minutes (0–0.15)
      const recentCritical = allEvents.filter(
        (e) => e.severity === "CRITICAL" && e.simulationMinute >= currentMinute - 10,
      );
      score += Math.min(recentCritical.length / 3, 1) * 0.15;

      // Factor 5: Malicious ASN seen (0 or 0.10)
      const hasMaliciousAsn = allEvents.some((e) => e.tags.includes("threat-intel:malicious-asn"));
      if (hasMaliciousAsn) score += 0.1;

      return parseFloat(score.toFixed(4));
    },
    explanationTemplate: (score: number) =>
      `Composite anomaly score of ${(score * 100).toFixed(1)}% exceeded the 75% threshold. ` +
      "This score reflects a combination of: high suspicious-event ratio, multiple affected assets, " +
      "confirmed lateral movement, recent critical events, and malicious ASN presence.",
  },
];

// ─── Rule State Tracker ───────────────────────────────────────────────────────

interface RuleFireRecord {
  ruleId: RuleId;
  firedAtMinute: number;
  alertId: AlertId;
}

// ─── Detection Engine ─────────────────────────────────────────────────────────

export class DetectionEngine {
  private readonly rules: DetectionRule[];
  private readonly firedRecords: RuleFireRecord[] = [];

  constructor(rules: DetectionRule[] = DETECTION_RULES) {
    this.rules = rules;
  }

  /**
   * Evaluates a newly ingested canonical event against all registered rules.
   * Returns the list of new alerts generated (may be empty).
   * Alerts are also stored in the TelemetryStore.
   */
  evaluate(event: CanonicalEvent, store: TelemetryStore): TelemetryAlert[] {
    const newAlerts: TelemetryAlert[] = [];

    for (const rule of this.rules) {
      // Skip if rule hasn't become active yet
      if ((rule.activeFromMinute ?? 0) > event.simulationMinute) continue;

      // Check multifire suppression
      if (rule.multifire === false) {
        const alreadyFired = this.firedRecords.some((r) => r.ruleId === rule.id);
        if (alreadyFired) continue;
      }

      let alert: TelemetryAlert | null = null;

      switch (rule.kind) {
        case "THRESHOLD":
          alert = this.evaluateThreshold(rule, event, store);
          break;
        case "SEQUENCE":
          alert = this.evaluateSequence(rule, event, store);
          break;
        case "ANOMALY":
          alert = this.evaluateAnomaly(rule, event, store);
          break;
      }

      if (alert) {
        store.insertAlert(alert);
        this.firedRecords.push({
          ruleId: rule.id,
          firedAtMinute: event.simulationMinute,
          alertId: alert.id,
        });
        newAlerts.push(alert);
      }
    }

    return newAlerts;
  }

  /** Returns all alert firing records since engine start. */
  getFiredRecords(): Readonly<RuleFireRecord[]> {
    return this.firedRecords;
  }

  /** Resets engine state (for simulation rewind). */
  reset(): void {
    this.firedRecords.length = 0;
    _alertCounter = 0;
  }

  // ── Threshold Rule Evaluation ────────────────────────────────────────────

  private evaluateThreshold(
    rule: ThresholdRule,
    event: CanonicalEvent,
    store: TelemetryStore,
  ): TelemetryAlert | null {
    // The triggering event must match the rule's category filter
    if (!rule.categories.includes(event.category)) return null;
    if (rule.requiredTag && !event.tags.includes(rule.requiredTag)) return null;
    if (rule.requiredSourceType && event.rawPayload.sourceType !== rule.requiredSourceType)
      return null;
    if (rule.suspiciousOnly && !event.isSuspicious) return null;

    // Count matching events in the time window
    const windowFrom = Math.max(0, event.simulationMinute - rule.windowMinutes);
    const windowEvents = store.query({
      minuteRange: { from: windowFrom, to: event.simulationMinute },
      categories: rule.categories,
    });

    const matchingEvents = windowEvents.filter((e) => {
      if (rule.requiredTag && !e.tags.includes(rule.requiredTag)) return false;
      if (rule.requiredSourceType && e.rawPayload.sourceType !== rule.requiredSourceType)
        return false;
      if (rule.suspiciousOnly && !e.isSuspicious) return false;
      return true;
    });

    if (matchingEvents.length < rule.threshold) return null;

    // Check if this exact pattern already fired recently (within 10 minutes)
    const recentFire = this.firedRecords.find(
      (r) => r.ruleId === rule.id && event.simulationMinute - r.firedAtMinute <= 10,
    );
    if (recentFire) return null;

    return this.buildAlert(rule, event, matchingEvents);
  }

  // ── Sequence Rule Evaluation ─────────────────────────────────────────────

  private evaluateSequence(
    rule: SequenceRule,
    event: CanonicalEvent,
    store: TelemetryStore,
  ): TelemetryAlert | null {
    // Only attempt when enough time has elapsed for the full sequence to form
    if (event.simulationMinute < 2) return null;

    const allEvents = store.getEventsUpToMinute(event.simulationMinute);
    const matchedSteps: CanonicalEvent[] = [];
    let lastMinute = -1;

    for (const step of rule.steps) {
      const candidate = allEvents.find((e) => {
        if (e.simulationMinute < lastMinute) return false;
        if (e.category !== step.category) return false;
        if (step.requiredTag && !e.tags.includes(step.requiredTag)) return false;
        if (step.requiredSourceType && e.rawPayload.sourceType !== step.requiredSourceType)
          return false;
        // Not already used in a previous step
        if (matchedSteps.some((m) => m.id === e.id)) return false;
        return true;
      });

      if (!candidate) return null;
      matchedSteps.push(candidate);
      lastMinute = candidate.simulationMinute;
    }

    // Check span constraint
    const firstMinute = matchedSteps[0]!.simulationMinute;
    const lastMatchMinute = matchedSteps[matchedSteps.length - 1]!.simulationMinute;
    if (lastMatchMinute - firstMinute > rule.maxSpanMinutes) return null;

    // Already fired?
    const alreadyFired = this.firedRecords.some((r) => r.ruleId === rule.id);
    if (alreadyFired) return null;

    return this.buildAlert(rule, event, matchedSteps);
  }

  // ── Anomaly Rule Evaluation ──────────────────────────────────────────────

  private evaluateAnomaly(
    rule: AnomalyRule,
    event: CanonicalEvent,
    store: TelemetryStore,
  ): TelemetryAlert | null {
    // Only check on CRITICAL events to avoid excessive computation
    if (event.severity !== "CRITICAL" && event.severity !== "HIGH") return null;

    const score = rule.computeScore(event, store);
    if (score < rule.scoreThreshold) return null;

    // Suppress repeat anomaly alerts within 15 minutes
    const recentFire = this.firedRecords.find(
      (r) => r.ruleId === rule.id && event.simulationMinute - r.firedAtMinute <= 15,
    );
    if (recentFire) return null;

    const allSuspiciousEvents = store.query({ suspiciousOnly: true });
    const allAlertedAssets = [...new Set(allSuspiciousEvents.flatMap((e) => e.assetIds))];
    const allAlertedUsers = [...new Set(allSuspiciousEvents.flatMap((e) => e.userIds))];

    const now = new Date().toISOString();
    const alertId = generateAlertId();

    const alert: TelemetryAlert = {
      id: alertId,
      ruleId: rule.id,
      ruleName: rule.name,
      description: rule.description,
      severity: rule.severity,
      status: "OPEN",
      createdAt: now,
      updatedAt: now,
      simulationMinute: event.simulationMinute,
      triggeringEventIds: [event.id],
      affectedAssetIds: allAlertedAssets,
      affectedUserIds: allAlertedUsers,
      confidence: parseFloat(Math.min(0.99, score + 0.05).toFixed(3)),
      mitreTactics: rule.mitreTactics,
      mitreTechniques: rule.mitreTechniques,
      explanation: rule.explanationTemplate(score),
      recommendedActions: rule.recommendedActions,
    };

    return alert;
  }

  // ── Alert Builder ────────────────────────────────────────────────────────

  private buildAlert(
    rule: ThresholdRule | SequenceRule,
    triggeringEvent: CanonicalEvent,
    matchedEvents: CanonicalEvent[],
  ): TelemetryAlert {
    const now = new Date().toISOString();
    const alertId = generateAlertId();

    const affectedAssetIds = [...new Set(matchedEvents.flatMap((e) => e.assetIds))];
    const affectedUserIds = [...new Set(matchedEvents.flatMap((e) => e.userIds))];
    const triggeringEventIds: EventId[] = matchedEvents.map((e) => e.id);

    // Confidence = average of matched event confidences
    const avgConfidence =
      matchedEvents.reduce((sum, e) => sum + e.confidence, 0) / matchedEvents.length;

    return {
      id: alertId,
      ruleId: rule.id,
      ruleName: rule.name,
      description: rule.description,
      severity: rule.severity,
      status: "OPEN",
      createdAt: now,
      updatedAt: now,
      simulationMinute: triggeringEvent.simulationMinute,
      triggeringEventIds,
      affectedAssetIds,
      affectedUserIds,
      confidence: parseFloat(avgConfidence.toFixed(3)),
      mitreTactics: rule.mitreTactics,
      mitreTechniques: rule.mitreTechniques,
      explanation:
        `Rule "${rule.name}" fired at simulation minute ${triggeringEvent.simulationMinute}. ` +
        `${matchedEvents.length} matching event(s) triggered the rule. ` +
        `Affected assets: [${affectedAssetIds.join(", ")}]. ` +
        `Affected users: [${affectedUserIds.join(", ")}].`,
      recommendedActions: rule.recommendedActions,
    };
  }
}
