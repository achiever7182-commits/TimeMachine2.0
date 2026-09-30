import type { IncidentStage, Severity } from "@/types/incident";

/**
 * Deterministic calculation of organizational risk based on current incident stage.
 * Modular implementation to allow more advanced risk scoring algorithms in future phases.
 */
export function calculateRisk(stage: IncidentStage): Severity {
  switch (stage) {
    case "NORMAL":
      return "LOW";
    case "ATTACK_STARTED":
      return "LOW";
    case "SUSPICIOUS_ACTIVITY":
      return "MEDIUM";
    case "ACCOUNT_COMPROMISED":
      return "HIGH";
    case "LATERAL_MOVEMENT":
      return "HIGH";
    case "DATA_ACCESS":
      return "CRITICAL";
    case "INCIDENT_DETECTED":
      return "CRITICAL";
    case "INVESTIGATING":
      return "HIGH";
    case "CONTAINED":
      return "LOW";
    case "RESOLVED":
      return "LOW";
    default:
      return "LOW";
  }
}
