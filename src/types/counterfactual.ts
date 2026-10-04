import type { Severity, IncidentStage } from "./incident";
import type { DigitalTwinSnapshot } from "./digitalTwin";
import type { AttackGraphState } from "./attackGraph";

export type CounterfactualActionType =
  "DO_NOTHING" | "DISABLE_USER" | "ISOLATE_ENDPOINT" | "BLOCK_LATERAL_CONNECTION";

export interface CounterfactualAction {
  id: string;
  type: CounterfactualActionType;
  timestamp: string; // e.g. "10:04"
  minute: number; // e.g. 22
  targetId: string; // e.g. "LAPTOP-042", "alex.m", "LAPTOP-042->SERVER-03", "NONE"
  targetType: "USER" | "ENDPOINT" | "CONNECTION" | "NONE";
  label: string;
  description: string;
  parameters?: Record<string, unknown>;
}

export type CounterfactualBranchStatus = "CREATED" | "SIMULATING" | "COMPLETED" | "FAILED";

export interface PreventedEventDetail {
  eventId: string;
  originalTime: string;
  title: string;
  category: string;
  targetAsset: string;
  reason: string;
  causalTrigger: string;
}

export interface CounterfactualTimelineItem {
  id: string;
  time: string;
  minute: number;
  title: string;
  description: string;
  category: string;
  status: "ORIGINAL" | "RESPONSE_ACTION" | "PREVENTED" | "ALLOWED";
  affectedAssets: string[];
  preventedDetail?: PreventedEventDetail;
}

export interface CounterfactualComparison {
  baselineFinalRisk: Severity;
  counterfactualFinalRisk: Severity;
  riskChange: "REDUCED" | "UNCHANGED" | "INCREASED";

  baselineCompromisedAssets: string[];
  counterfactualCompromisedAssets: string[];
  preventedCompromises: string[];

  baselineCriticalAssets: string[];
  counterfactualCriticalAssets: string[];
  preventedCriticalImpact: string[];

  baselineDataResourcesAtRisk: number;
  counterfactualDataResourcesAtRisk: number;
  preventedDataExposure: number;

  baselineUsersAffected: number;
  counterfactualUsersAffected: number;
  preventedUserImpact: number;

  baselineAttackPath: string[];
  counterfactualAttackPath: string[];

  preventedEvents: PreventedEventDetail[];
  preventedCount: number;
}

export interface CounterfactualBranch {
  branchId: string;
  name: string;
  incidentId: string;
  baseTimestamp: string;
  baseMinute: number;
  baseSnapshot: DigitalTwinSnapshot;
  action: CounterfactualAction;
  simulatedTimeline: CounterfactualTimelineItem[];
  finalSnapshot: DigitalTwinSnapshot;
  attackGraph: AttackGraphState;
  comparison: CounterfactualComparison;
  status: CounterfactualBranchStatus;
  createdAt: string;
}
