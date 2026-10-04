/**
 * PHASE 1 — REAL SYSTEM FOUNDATION
 * Telemetry Architecture: Pipeline Orchestrator
 *
 * TelemetryPipeline is the single entry point that wires together:
 *   CollectorRegistry → IngestionPipeline → TelemetryStore → DetectionEngine
 *
 * It exposes a clean API for:
 *   - Advancing the simulation minute-by-minute
 *   - Rewinding to any past minute (full state rebuild)
 *   - Querying events and alerts at any point in time
 *   - Retrieving pipeline statistics
 *
 * This class is designed to be instantiated once as a singleton and shared via
 * React context (TelemetryContext).
 */

import { CollectorRegistry } from "@/telemetry/collector/collectors";
import { DetectionEngine, DETECTION_RULES } from "@/telemetry/detection/detectionEngine";
import { IngestionPipeline } from "@/telemetry/ingestion/ingestionPipeline";
import { TelemetryStore } from "@/telemetry/storage/telemetryStore";
import type {
  AlertQuery,
  CanonicalEvent,
  EventQuery,
  IngestionResult,
  PipelineStats,
  TelemetryAlert,
} from "@/telemetry/schema/telemetryTypes";

// ─── Pipeline State ───────────────────────────────────────────────────────────

export interface PipelineState {
  currentMinute: number;
  isInitialized: boolean;
  lastIngestionResult: IngestionResult | null;
  totalEventsInStore: number;
  totalAlertsInStore: number;
}

// ─── Telemetry Pipeline ───────────────────────────────────────────────────────

export class TelemetryPipeline {
  private readonly store: TelemetryStore;
  private readonly detector: DetectionEngine;
  private readonly ingestion: IngestionPipeline;
  private readonly collectors: CollectorRegistry;

  private currentMinute: number = -1;
  private isInitialized: boolean = false;
  private lastIngestionResult: IngestionResult | null = null;

  /** Cumulative ingestion results across all advances. */
  private cumulativeResult: IngestionResult = {
    accepted: 0,
    rejected: 0,
    deduplicated: 0,
    enriched: 0,
    alertsGenerated: 0,
    processingTimeMs: 0,
    errors: [],
  };

  constructor() {
    this.store = new TelemetryStore();
    this.detector = new DetectionEngine(DETECTION_RULES);
    this.ingestion = new IngestionPipeline(this.store, this.detector);
    this.collectors = new CollectorRegistry();
  }

  // ── Lifecycle ─────────────────────────────────────────────────────────────

  /**
   * Initializes the pipeline at minute 0 (09:42).
   * This seeds the store with the very first events and primes the detection engine.
   */
  initialize(): IngestionResult {
    this.reset();
    const result = this.advanceTo(0);
    this.isInitialized = true;
    return result;
  }

  /**
   * Advances the simulation by one minute.
   * Returns the ingestion result for the new minute's events.
   */
  advance(): IngestionResult {
    return this.advanceTo(this.currentMinute + 1);
  }

  /**
   * Advances the pipeline to a specific simulation minute.
   * If the target minute is EARLIER than the current minute, performs a full
   * rewind (resets store, re-ingests all events up to the target minute).
   */
  advanceTo(targetMinute: number): IngestionResult {
    const bounded = Math.max(0, Math.min(42, targetMinute));

    if (bounded < this.currentMinute) {
      // Rewind: rebuild state from scratch
      return this.rewindTo(bounded);
    }

    let lastResult: IngestionResult = {
      accepted: 0,
      rejected: 0,
      deduplicated: 0,
      enriched: 0,
      alertsGenerated: 0,
      processingTimeMs: 0,
      errors: [],
    };

    // Forward: ingest events for all intermediate minutes up to target
    for (let m = this.currentMinute + 1; m <= bounded; m++) {
      const rawEvents = this.collectors.collectForMinute(m);
      lastResult = this.ingestion.ingest(rawEvents);
      this.accumulateResult(lastResult);
    }

    this.currentMinute = bounded;
    this.lastIngestionResult = lastResult;

    return lastResult;
  }

  /**
   * Rebuilds the pipeline state from minute 0 up to `targetMinute`.
   * This is the rewind operation — deterministic replay of the event stream.
   */
  rewindTo(targetMinute: number): IngestionResult {
    const bounded = Math.max(0, Math.min(42, targetMinute));

    // Reset all state
    this.store.reset();
    this.detector.reset();
    this.ingestion.resetDeduplicationCache();
    this.cumulativeResult = {
      accepted: 0,
      rejected: 0,
      deduplicated: 0,
      enriched: 0,
      alertsGenerated: 0,
      processingTimeMs: 0,
      errors: [],
    };

    // Replay from 0 to targetMinute
    let lastResult: IngestionResult = {
      accepted: 0,
      rejected: 0,
      deduplicated: 0,
      enriched: 0,
      alertsGenerated: 0,
      processingTimeMs: 0,
      errors: [],
    };

    for (let m = 0; m <= bounded; m++) {
      const rawEvents = this.collectors.collectForMinute(m);
      lastResult = this.ingestion.ingest(rawEvents);
      this.accumulateResult(lastResult);
    }

    this.currentMinute = bounded;
    this.lastIngestionResult = lastResult;

    return lastResult;
  }

  /**
   * Fully resets the pipeline to a pristine T=0 state.
   */
  reset(): void {
    this.store.reset();
    this.detector.reset();
    this.ingestion.resetDeduplicationCache();
    this.currentMinute = -1;
    this.isInitialized = false;
    this.lastIngestionResult = null;
    this.cumulativeResult = {
      accepted: 0,
      rejected: 0,
      deduplicated: 0,
      enriched: 0,
      alertsGenerated: 0,
      processingTimeMs: 0,
      errors: [],
    };
  }

  // ── Query API ─────────────────────────────────────────────────────────────

  /**
   * Queries events from the store.
   */
  queryEvents(q: EventQuery = {}): CanonicalEvent[] {
    return this.store.query(q);
  }

  /**
   * Queries alerts from the store.
   */
  queryAlerts(q: AlertQuery = {}): TelemetryAlert[] {
    return this.store.queryAlerts(q);
  }

  /**
   * Returns all events up to the current simulation minute.
   */
  getAllEvents(): CanonicalEvent[] {
    return this.store.getAllEvents();
  }

  /**
   * Returns all alerts up to the current simulation minute.
   */
  getAllAlerts(): TelemetryAlert[] {
    return this.store.getAllAlerts();
  }

  /**
   * Returns all OPEN alerts — alerts that have not been acknowledged or resolved.
   */
  getOpenAlerts(): TelemetryAlert[] {
    return this.store.queryAlerts({ statuses: ["OPEN"] });
  }

  /**
   * Returns all events associated with a specific asset.
   */
  getEventsForAsset(assetId: string): CanonicalEvent[] {
    return this.store.query({ assetIds: [assetId] });
  }

  /**
   * Returns all events associated with a specific user.
   */
  getEventsForUser(userId: string): CanonicalEvent[] {
    return this.store.query({ userIds: [userId] });
  }

  /**
   * Returns all suspicious events.
   */
  getSuspiciousEvents(): CanonicalEvent[] {
    return this.store.query({ suspiciousOnly: true });
  }

  // ── State Access ──────────────────────────────────────────────────────────

  /** Returns the current pipeline state snapshot. */
  getState(): PipelineState {
    return {
      currentMinute: this.currentMinute,
      isInitialized: this.isInitialized,
      lastIngestionResult: this.lastIngestionResult,
      totalEventsInStore: this.store.size(),
      totalAlertsInStore: this.store.alertCount(),
    };
  }

  /** Returns pipeline statistics from the store. */
  getStats(): PipelineStats {
    return this.store.getStats();
  }

  /** Returns the cumulative ingestion result since last reset. */
  getCumulativeResult(): IngestionResult {
    return { ...this.cumulativeResult };
  }

  /** Returns the current simulation minute. */
  getCurrentMinute(): number {
    return this.currentMinute;
  }

  /** Returns whether the pipeline has been initialized. */
  isReady(): boolean {
    return this.isInitialized && this.currentMinute >= 0;
  }

  /** Returns a direct reference to the underlying store (read-only use). */
  getStore(): TelemetryStore {
    return this.store;
  }

  /** Returns a direct reference to the detection engine (for inspection). */
  getDetectionEngine(): DetectionEngine {
    return this.detector;
  }

  /**
   * Creates an isolated snapshot of the store for counterfactual simulation.
   * The snapshot is a deep copy — safe to mutate without affecting this pipeline.
   */
  snapshotStore(): TelemetryStore {
    return this.store.snapshot();
  }

  // ── Internal Helpers ──────────────────────────────────────────────────────

  private accumulateResult(result: IngestionResult): void {
    this.cumulativeResult.accepted += result.accepted;
    this.cumulativeResult.rejected += result.rejected;
    this.cumulativeResult.deduplicated += result.deduplicated;
    this.cumulativeResult.enriched += result.enriched;
    this.cumulativeResult.alertsGenerated += result.alertsGenerated;
    this.cumulativeResult.processingTimeMs += result.processingTimeMs;
    this.cumulativeResult.errors.push(...result.errors);
  }
}

// ─── Singleton ────────────────────────────────────────────────────────────────

/**
 * The global TelemetryPipeline singleton.
 * Import this directly wherever pipeline access is needed outside of React.
 */
export const globalTelemetryPipeline = new TelemetryPipeline();
