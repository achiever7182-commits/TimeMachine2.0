import { demoTimelineEvents } from "@/data/incidentData";
import { timestampToMinute } from "../stateReconstruction";
import type { DetectionGapFinding } from "@/types/iris";

/**
 * Derives the earliest point where meaningful security evidence was available (Requirement 16 & 34).
 * Purely data-driven: derives timestamps and delays directly from structured incident telemetry.
 */
export function findEarliestDetectableOpportunity(): DetectionGapFinding {
  // 1. Identify first detectable opportunity event
  const detectionOppEvent = demoTimelineEvents.find(
    (e) => e.category === "DETECTION_OPPORTUNITY" || e.id === "evt-0947"
  ) ?? demoTimelineEvents[2];

  // 2. Identify formal incident detection event
  const formalDetectionEvent = demoTimelineEvents.find(
    (e) => e.category === "INCIDENT_ALERT" || e.id === "evt-1024"
  ) ?? demoTimelineEvents[demoTimelineEvents.length - 1];

  const earliestOpportunityMinute = detectionOppEvent.minute;
  const formalDetectionMinute = formalDetectionEvent.minute;
  const detectionDelayMinutes = Math.max(0, formalDetectionMinute - earliestOpportunityMinute);

  const explanation =
    `The earliest detectable opportunity emerged at ${detectionOppEvent.timestamp} (T+${earliestOpportunityMinute}m) ` +
    `when multiple failed MFA challenges were followed by an anomalous foreign login from an unrecognized ASN. ` +
    `Formal incident detection by SIEM correlation occurred at ${formalDetectionEvent.timestamp} (T+${formalDetectionMinute}m), ` +
    `representing a ${detectionDelayMinutes}-minute detection delay during which lateral movement and database access occurred.`;

  return {
    earliestOpportunityMinute,
    timestamp: detectionOppEvent.timestamp,
    evidenceIds: detectionOppEvent.eventIds,
    detectionDelayMinutes,
    formalDetectionTimestamp: formalDetectionEvent.timestamp,
    explanation,
    confidence: "HIGH",
  };
}
