/**
 * PHASE 1 — REAL SYSTEM FOUNDATION
 * Telemetry Architecture: In-Memory Event Store
 *
 * TelemetryStore is a purpose-built, time-ordered in-memory event database.
 * It supports:
 *   - O(1) insert and O(1) ID-based lookup
 *   - Indexed queries by minute, category, severity, asset, user, and rule
 *   - Streaming iteration across the full event log
 *   - Snapshot cloning for counterfactual branches (copy-on-write)
 *   - Alert storage and querying
 *   - Deduplication tombstone tracking
 *
 * The store is the authoritative data source for both the detection engine
 * and the IRIS copilot query interface.
 */

import type {
  AlertId,
  AlertQuery,
  AlertStatus,
  AssetId,
  CanonicalEvent,
  EventCategory,
  EventId,
  EventQuery,
  IngestionError,
  IsoTimestamp,
  PipelineStats,
  RuleId,
  TelemetryAlert,
  TelemetrySeverity,
  UserId,
} from "@/telemetry/schema/telemetryTypes";

// ─── Severity Comparison ──────────────────────────────────────────────────────

const SEVERITY_RANK: Record<TelemetrySeverity, number> = {
  INFO: 0,
  LOW: 1,
  MEDIUM: 2,
  HIGH: 3,
  CRITICAL: 4,
};

// ─── Deduplication Tombstone ──────────────────────────────────────────────────

interface DeduplicationRecord {
  duplicateLocalId: string;
  canonicalEventId: EventId;
  recordedAt: IsoTimestamp;
}

// ─── In-Memory Indexes ────────────────────────────────────────────────────────

interface StoreIndexes {
  /** minute → Set<EventId> */
  byMinute: Map<number, Set<EventId>>;
  /** category → Set<EventId> */
  byCategory: Map<EventCategory, Set<EventId>>;
  /** severity → Set<EventId> */
  bySeverity: Map<TelemetrySeverity, Set<EventId>>;
  /** assetId → Set<EventId> */
  byAsset: Map<AssetId, Set<EventId>>;
  /** userId → Set<EventId> */
  byUser: Map<UserId, Set<EventId>>;
  /** ruleId → Set<EventId> */
  byRule: Map<RuleId, Set<EventId>>;
  /** suspicious events */
  suspicious: Set<EventId>;
}

function createEmptyIndexes(): StoreIndexes {
  return {
    byMinute: new Map(),
    byCategory: new Map(),
    bySeverity: new Map(),
    byAsset: new Map(),
    byUser: new Map(),
    byRule: new Map(),
    suspicious: new Set(),
  };
}

function addToIndex<K>(index: Map<K, Set<EventId>>, key: K, id: EventId): void {
  if (!index.has(key)) index.set(key, new Set());
  index.get(key)!.add(id);
}

// ─── TelemetryStore ───────────────────────────────────────────────────────────

export class TelemetryStore {
  /** Primary event log in insertion order. */
  private readonly events = new Map<EventId, CanonicalEvent>();

  /** Alert log. */
  private readonly alerts = new Map<AlertId, TelemetryAlert>();

  /** Ordered list of event IDs (insertion order = chronological order). */
  private readonly eventOrder: EventId[] = [];

  /** Deduplication tombstones. */
  private readonly deduplicationLog: DeduplicationRecord[] = [];

  /** Composite indexes for fast query resolution. */
  private readonly indexes: StoreIndexes = createEmptyIndexes();

  /** Pipeline statistics counter. */
  private readonly stats: PipelineStats = {
    totalEventsIngested: 0,
    totalAlertsGenerated: 0,
    totalDeduplicated: 0,
    totalRejected: 0,
    eventsByCategory: {} as Record<EventCategory, number>,
    eventsBySeverity: {} as Record<TelemetrySeverity, number>,
    alertsByRuleId: {} as Record<RuleId, number>,
    alertsBySeverity: {} as Record<TelemetrySeverity, number>,
    firstEventAt: null,
    lastEventAt: null,
    pipelineStartedAt: new Date().toISOString(),
  };

  // ── Write Operations ────────────────────────────────────────────────────────

  /**
   * Inserts a canonical event into the store.
   * Returns an IngestionError if the event already exists, null on success.
   */
  insert(event: CanonicalEvent): IngestionError | null {
    if (this.events.has(event.id)) {
      return {
        eventId: event.id,
        phase: "STORAGE",
        reason: `Duplicate event ID: ${event.id}`,
        timestamp: new Date().toISOString(),
      };
    }

    // Primary storage
    this.events.set(event.id, event);
    this.eventOrder.push(event.id);

    // Update indexes
    addToIndex(this.indexes.byMinute, event.simulationMinute, event.id);
    addToIndex(this.indexes.byCategory, event.category, event.id);
    addToIndex(this.indexes.bySeverity, event.severity, event.id);
    for (const assetId of event.assetIds) {
      addToIndex(this.indexes.byAsset, assetId, event.id);
    }
    for (const userId of event.userIds) {
      addToIndex(this.indexes.byUser, userId, event.id);
    }
    if (event.isSuspicious) {
      this.indexes.suspicious.add(event.id);
    }

    // Update stats
    this.stats.totalEventsIngested++;
    this.stats.eventsByCategory[event.category] =
      (this.stats.eventsByCategory[event.category] ?? 0) + 1;
    this.stats.eventsBySeverity[event.severity] =
      (this.stats.eventsBySeverity[event.severity] ?? 0) + 1;
    if (!this.stats.firstEventAt) this.stats.firstEventAt = event.ingestedAt;
    this.stats.lastEventAt = event.ingestedAt;

    return null;
  }

  /**
   * Stores a TelemetryAlert generated by the detection engine.
   */
  insertAlert(alert: TelemetryAlert): void {
    this.alerts.set(alert.id, alert);
    this.stats.totalAlertsGenerated++;
    this.stats.alertsByRuleId[alert.ruleId] = (this.stats.alertsByRuleId[alert.ruleId] ?? 0) + 1;
    this.stats.alertsBySeverity[alert.severity] =
      (this.stats.alertsBySeverity[alert.severity] ?? 0) + 1;

    // Index triggering events by rule
    for (const evtId of alert.triggeringEventIds) {
      addToIndex(this.indexes.byRule, alert.ruleId, evtId);
    }
  }

  /**
   * Updates the status of an alert.
   */
  updateAlertStatus(alertId: AlertId, status: AlertStatus): void {
    const alert = this.alerts.get(alertId);
    if (alert) {
      this.alerts.set(alertId, {
        ...alert,
        status,
        updatedAt: new Date().toISOString(),
      });
    }
  }

  /**
   * Records that a duplicate event was detected and suppressed.
   */
  markDeduplicated(duplicateLocalId: string, canonicalEventId: EventId): void {
    this.deduplicationLog.push({
      duplicateLocalId,
      canonicalEventId,
      recordedAt: new Date().toISOString(),
    });
    this.stats.totalDeduplicated++;
  }

  /**
   * Stamps matched rule IDs onto an existing canonical event.
   */
  stampMatchedRules(eventId: EventId, ruleIds: RuleId[]): void {
    const event = this.events.get(eventId);
    if (!event) return;

    const updated: CanonicalEvent = {
      ...event,
      matchedRuleIds: [...new Set([...event.matchedRuleIds, ...ruleIds])],
    };
    this.events.set(eventId, updated);

    // Update rule index
    for (const ruleId of ruleIds) {
      addToIndex(this.indexes.byRule, ruleId, eventId);
    }
  }

  // ── Read Operations ─────────────────────────────────────────────────────────

  /**
   * Returns a canonical event by ID.
   */
  getById(id: EventId): CanonicalEvent | undefined {
    return this.events.get(id);
  }

  /**
   * Returns a TelemetryAlert by ID.
   */
  getAlertById(id: AlertId): TelemetryAlert | undefined {
    return this.alerts.get(id);
  }

  /**
   * Queries events against the composite indexes.
   * All filter criteria are applied with AND logic.
   */
  query(q: EventQuery): CanonicalEvent[] {
    let candidateIds: Set<EventId> | null = null;

    // Apply each filter via index intersection
    if (q.minuteRange !== undefined) {
      const rangeIds = new Set<EventId>();
      for (let m = q.minuteRange.from; m <= q.minuteRange.to; m++) {
        const minSet = this.indexes.byMinute.get(m);
        if (minSet) {
          for (const id of minSet) rangeIds.add(id);
        }
      }
      candidateIds = intersect(candidateIds, rangeIds);
    }

    if (q.categories && q.categories.length > 0) {
      const catIds = new Set<EventId>();
      for (const cat of q.categories) {
        const catSet = this.indexes.byCategory.get(cat);
        if (catSet) {
          for (const id of catSet) catIds.add(id);
        }
      }
      candidateIds = intersect(candidateIds, catIds);
    }

    if (q.assetIds && q.assetIds.length > 0) {
      const assetIds = new Set<EventId>();
      for (const assetId of q.assetIds) {
        const assetSet = this.indexes.byAsset.get(assetId);
        if (assetSet) {
          for (const id of assetSet) assetIds.add(id);
        }
      }
      candidateIds = intersect(candidateIds, assetIds);
    }

    if (q.userIds && q.userIds.length > 0) {
      const userIds = new Set<EventId>();
      for (const userId of q.userIds) {
        const userSet = this.indexes.byUser.get(userId);
        if (userSet) {
          for (const id of userSet) userIds.add(id);
        }
      }
      candidateIds = intersect(candidateIds, userIds);
    }

    if (q.ruleIds && q.ruleIds.length > 0) {
      const ruleIds = new Set<EventId>();
      for (const ruleId of q.ruleIds) {
        const ruleSet = this.indexes.byRule.get(ruleId);
        if (ruleSet) {
          for (const id of ruleSet) ruleIds.add(id);
        }
      }
      candidateIds = intersect(candidateIds, ruleIds);
    }

    if (q.suspiciousOnly) {
      candidateIds = intersect(candidateIds, this.indexes.suspicious);
    }

    // If no index was applied, start from the full event set
    const ids = candidateIds ?? new Set(this.eventOrder);

    // Resolve IDs → events, applying remaining filters
    let results: CanonicalEvent[] = [];
    for (const id of ids) {
      const event = this.events.get(id);
      if (!event) continue;

      // Post-index filters
      if (q.minSeverity !== undefined) {
        if (SEVERITY_RANK[event.severity] < SEVERITY_RANK[q.minSeverity]) continue;
      }

      results.push(event);
    }

    // Sort by simulation minute (preserving insertion order within same minute)
    results.sort((a, b) => {
      const mDiff = a.simulationMinute - b.simulationMinute;
      if (mDiff !== 0) return q.order === "DESC" ? -mDiff : mDiff;
      // Stable: preserve eventOrder relative order
      return q.order === "DESC"
        ? this.eventOrder.indexOf(b.id) - this.eventOrder.indexOf(a.id)
        : this.eventOrder.indexOf(a.id) - this.eventOrder.indexOf(b.id);
    });

    if (q.limit !== undefined) {
      results = results.slice(0, q.limit);
    }

    return results;
  }

  /**
   * Queries alerts.
   */
  queryAlerts(q: AlertQuery = {}): TelemetryAlert[] {
    let results = [...this.alerts.values()];

    if (q.statuses && q.statuses.length > 0) {
      results = results.filter((a) => q.statuses!.includes(a.status));
    }
    if (q.minSeverity) {
      results = results.filter((a) => SEVERITY_RANK[a.severity] >= SEVERITY_RANK[q.minSeverity!]);
    }
    if (q.ruleIds && q.ruleIds.length > 0) {
      results = results.filter((a) => q.ruleIds!.includes(a.ruleId));
    }
    if (q.assetIds && q.assetIds.length > 0) {
      results = results.filter((a) => a.affectedAssetIds.some((id) => q.assetIds!.includes(id)));
    }
    if (q.userIds && q.userIds.length > 0) {
      results = results.filter((a) => a.affectedUserIds.some((id) => q.userIds!.includes(id)));
    }
    if (q.minuteRange) {
      results = results.filter(
        (a) => a.simulationMinute >= q.minuteRange!.from && a.simulationMinute <= q.minuteRange!.to,
      );
    }

    results.sort((a, b) => a.simulationMinute - b.simulationMinute);

    if (q.limit !== undefined) {
      results = results.slice(0, q.limit);
    }

    return results;
  }

  /**
   * Returns all events in chronological order.
   */
  getAllEvents(): CanonicalEvent[] {
    return this.eventOrder.map((id) => this.events.get(id)!);
  }

  /**
   * Returns all events up to and including a simulation minute.
   */
  getEventsUpToMinute(minute: number): CanonicalEvent[] {
    return this.query({ minuteRange: { from: 0, to: minute } });
  }

  /**
   * Returns all alerts in chronological order.
   */
  getAllAlerts(): TelemetryAlert[] {
    return [...this.alerts.values()].sort((a, b) => a.simulationMinute - b.simulationMinute);
  }

  /**
   * Returns pipeline statistics.
   */
  getStats(): Readonly<PipelineStats> {
    return { ...this.stats };
  }

  /**
   * Returns the total number of stored events.
   */
  size(): number {
    return this.events.size;
  }

  /**
   * Returns the total number of stored alerts.
   */
  alertCount(): number {
    return this.alerts.size;
  }

  /**
   * Returns the total number of deduplication suppression records.
   */
  deduplicationCount(): number {
    return this.deduplicationLog.length;
  }

  /**
   * Creates a deep snapshot of the store for counterfactual branches.
   * The snapshot is an independent copy — mutations don't affect the original.
   */
  snapshot(): TelemetryStore {
    const clone = new TelemetryStore();
    for (const event of this.events.values()) {
      clone.insert({ ...event });
    }
    for (const alert of this.alerts.values()) {
      clone.insertAlert({ ...alert });
    }
    return clone;
  }

  /**
   * Clears all stored events, alerts, and indexes.
   * Used when resetting the simulation to T=0.
   */
  reset(): void {
    this.events.clear();
    this.alerts.clear();
    this.eventOrder.length = 0;
    this.deduplicationLog.length = 0;
    this.indexes.byMinute.clear();
    this.indexes.byCategory.clear();
    this.indexes.bySeverity.clear();
    this.indexes.byAsset.clear();
    this.indexes.byUser.clear();
    this.indexes.byRule.clear();
    this.indexes.suspicious.clear();

    // Reset stats
    this.stats.totalEventsIngested = 0;
    this.stats.totalAlertsGenerated = 0;
    this.stats.totalDeduplicated = 0;
    this.stats.totalRejected = 0;
    this.stats.eventsByCategory = {} as Record<EventCategory, number>;
    this.stats.eventsBySeverity = {} as Record<TelemetrySeverity, number>;
    this.stats.alertsByRuleId = {} as Record<RuleId, number>;
    this.stats.alertsBySeverity = {} as Record<TelemetrySeverity, number>;
    this.stats.firstEventAt = null;
    this.stats.lastEventAt = null;
    this.stats.pipelineStartedAt = new Date().toISOString();
  }
}

// ─── Utility: Set Intersection ────────────────────────────────────────────────

function intersect(existing: Set<EventId> | null, candidate: Set<EventId>): Set<EventId> {
  if (existing === null) return candidate;
  const result = new Set<EventId>();
  for (const id of candidate) {
    if (existing.has(id)) result.add(id);
  }
  return result;
}
