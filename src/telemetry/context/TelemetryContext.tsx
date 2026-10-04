/**
 * PHASE 1 — REAL SYSTEM FOUNDATION
 * Telemetry Architecture: React Context & Hook
 *
 * Provides React components with access to the global TelemetryPipeline through
 * a Context + custom hook pattern.
 *
 * Usage:
 *   // Wrap your app (already done in __root.tsx):
 *   <TelemetryProvider>
 *     <App />
 *   </TelemetryProvider>
 *
 *   // In any component:
 *   const { events, alerts, stats, advanceTo, rewindTo } = useTelemetry();
 */

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import {
  globalTelemetryPipeline,
  type PipelineState,
} from "@/telemetry/pipeline/telemetryPipeline";
import type {
  AlertQuery,
  CanonicalEvent,
  EventQuery,
  IngestionResult,
  PipelineStats,
  TelemetryAlert,
} from "@/telemetry/schema/telemetryTypes";

// ─── Context Value ────────────────────────────────────────────────────────────

export interface TelemetryContextValue {
  /** Current pipeline state snapshot. */
  pipelineState: PipelineState;

  /** All events currently in the store. */
  events: CanonicalEvent[];

  /** All alerts currently in the store. */
  alerts: TelemetryAlert[];

  /** All open (unacknowledged) alerts. */
  openAlerts: TelemetryAlert[];

  /** Pipeline statistics. */
  stats: PipelineStats | null;

  /** Cumulative ingestion result since last reset. */
  cumulativeResult: IngestionResult | null;

  // ── Actions ──────────────────────────────────────────────────────────────

  /** Initializes the pipeline at minute 0. */
  initialize: () => void;

  /** Advances the pipeline by one minute. */
  advance: () => void;

  /** Advances the pipeline to a specific minute. */
  advanceTo: (minute: number) => void;

  /** Rewinds the pipeline to a specific minute (full state rebuild). */
  rewindTo: (minute: number) => void;

  /** Resets the pipeline completely to T=0. */
  reset: () => void;

  // ── Query Helpers ────────────────────────────────────────────────────────

  /** Queries events with optional filters. */
  queryEvents: (q?: EventQuery) => CanonicalEvent[];

  /** Queries alerts with optional filters. */
  queryAlerts: (q?: AlertQuery) => TelemetryAlert[];

  /** Returns events for a specific asset. */
  getEventsForAsset: (assetId: string) => CanonicalEvent[];

  /** Returns events for a specific user. */
  getEventsForUser: (userId: string) => CanonicalEvent[];

  /** Returns all suspicious events. */
  getSuspiciousEvents: () => CanonicalEvent[];
}

// ─── Context ──────────────────────────────────────────────────────────────────

const TelemetryContext = createContext<TelemetryContextValue | null>(null);

// ─── Provider ────────────────────────────────────────────────────────────────

export function TelemetryProvider({ children }: { children: React.ReactNode }) {
  const [pipelineState, setPipelineState] = useState<PipelineState>(
    globalTelemetryPipeline.getState(),
  );
  const [events, setEvents] = useState<CanonicalEvent[]>([]);
  const [alerts, setAlerts] = useState<TelemetryAlert[]>([]);
  const [stats, setStats] = useState<PipelineStats | null>(null);
  const [cumulativeResult, setCumulativeResult] = useState<IngestionResult | null>(null);

  // Sync state from pipeline after any mutation
  const syncState = useCallback(() => {
    setPipelineState(globalTelemetryPipeline.getState());
    setEvents(globalTelemetryPipeline.getAllEvents());
    setAlerts(globalTelemetryPipeline.getAllAlerts());
    setStats(globalTelemetryPipeline.getStats());
    setCumulativeResult(globalTelemetryPipeline.getCumulativeResult());
  }, []);

  // Initialize on mount
  useEffect(() => {
    if (!globalTelemetryPipeline.isReady()) {
      globalTelemetryPipeline.initialize();
    }
    syncState();
  }, [syncState]);

  const initialize = useCallback(() => {
    globalTelemetryPipeline.initialize();
    syncState();
  }, [syncState]);

  const advance = useCallback(() => {
    globalTelemetryPipeline.advance();
    syncState();
  }, [syncState]);

  const advanceTo = useCallback(
    (minute: number) => {
      globalTelemetryPipeline.advanceTo(minute);
      syncState();
    },
    [syncState],
  );

  const rewindTo = useCallback(
    (minute: number) => {
      globalTelemetryPipeline.rewindTo(minute);
      syncState();
    },
    [syncState],
  );

  const reset = useCallback(() => {
    globalTelemetryPipeline.reset();
    syncState();
  }, [syncState]);

  const queryEvents = useCallback((q?: EventQuery) => globalTelemetryPipeline.queryEvents(q), []);

  const queryAlerts = useCallback((q?: AlertQuery) => globalTelemetryPipeline.queryAlerts(q), []);

  const getEventsForAsset = useCallback(
    (assetId: string) => globalTelemetryPipeline.getEventsForAsset(assetId),
    [],
  );

  const getEventsForUser = useCallback(
    (userId: string) => globalTelemetryPipeline.getEventsForUser(userId),
    [],
  );

  const getSuspiciousEvents = useCallback(() => globalTelemetryPipeline.getSuspiciousEvents(), []);

  const openAlerts = useMemo(() => alerts.filter((a) => a.status === "OPEN"), [alerts]);

  const value: TelemetryContextValue = useMemo(
    () => ({
      pipelineState,
      events,
      alerts,
      openAlerts,
      stats,
      cumulativeResult,
      initialize,
      advance,
      advanceTo,
      rewindTo,
      reset,
      queryEvents,
      queryAlerts,
      getEventsForAsset,
      getEventsForUser,
      getSuspiciousEvents,
    }),
    [
      pipelineState,
      events,
      alerts,
      openAlerts,
      stats,
      cumulativeResult,
      initialize,
      advance,
      advanceTo,
      rewindTo,
      reset,
      queryEvents,
      queryAlerts,
      getEventsForAsset,
      getEventsForUser,
      getSuspiciousEvents,
    ],
  );

  return <TelemetryContext.Provider value={value}>{children}</TelemetryContext.Provider>;
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

/**
 * useTelemetry — access the real telemetry pipeline from any component.
 *
 * @example
 * const { events, alerts, openAlerts, advanceTo, getEventsForAsset } = useTelemetry();
 */
export function useTelemetry(): TelemetryContextValue {
  const ctx = useContext(TelemetryContext);
  if (!ctx) {
    throw new Error("useTelemetry must be used within a TelemetryProvider");
  }
  return ctx;
}
