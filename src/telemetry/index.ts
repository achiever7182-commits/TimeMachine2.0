/**
 * PHASE 1 — REAL SYSTEM FOUNDATION
 * Telemetry Architecture: Public API Barrel
 *
 * Import from "@/telemetry" to access any part of the telemetry system.
 */

// Schema
export type {
  AlertId,
  AlertQuery,
  AlertStatus,
  AssetId,
  AuthPayload,
  CanonicalEvent,
  DatabasePayload,
  EndpointPayload,
  EventCategory,
  EventId,
  EventQuery,
  FilePayload,
  IngestionError,
  IngestionResult,
  IsoTimestamp,
  NetworkPayload,
  PipelineStats,
  ProcessPayload,
  RawPayload,
  RuleId,
  TelemetryAlert,
  TelemetrySeverity,
  TelemetrySource,
  UserId,
} from "./schema/telemetryTypes";

// Collectors
export {
  AuthCollector,
  CollectorRegistry,
  EndpointCollector,
  NetworkCollector,
} from "./collector/collectors";
export type { CollectorBatch, RawCollectorEvent } from "./collector/collectors";

// Ingestion
export { IngestionPipeline, maxSeverity, severityScore } from "./ingestion/ingestionPipeline";

// Storage
export { TelemetryStore } from "./storage/telemetryStore";

// Detection
export { DETECTION_RULES, DetectionEngine } from "./detection/detectionEngine";
export type {
  AnomalyRule,
  DetectionRule,
  SequenceRule,
  SequenceStep,
  ThresholdRule,
} from "./detection/detectionEngine";

// Pipeline
export { TelemetryPipeline, globalTelemetryPipeline } from "./pipeline/telemetryPipeline";
export type { PipelineState } from "./pipeline/telemetryPipeline";

// React Context & Hook
export { TelemetryProvider, useTelemetry } from "./context/TelemetryContext";
export type { TelemetryContextValue } from "./context/TelemetryContext";
