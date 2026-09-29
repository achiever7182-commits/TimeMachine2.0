import type { Severity, IncidentStage, TimelineEvent, EvidenceItem } from "./incident";
import type { DigitalTwinSnapshot } from "./digitalTwin";
import type { AttackGraphState } from "./attackGraph";
import type { CounterfactualBranch, CounterfactualComparison } from "./counterfactual";

export type IrisMessageRole = "USER" | "IRIS" | "SYSTEM";

export type IrisConfidence = "HIGH" | "MEDIUM" | "LOW";

export type IrisFindingType =
  | "TIMELINE"
  | "ASSET"
  | "USER"
  | "ATTACK_PATH"
  | "EVIDENCE"
  | "DETECTION_GAP"
  | "COUNTERFACTUAL"
  | "RISK"
  | "INVESTIGATION";

export type IrisCitationType =
  | "TIMELINE_EVENT"
  | "EVIDENCE"
  | "ASSET"
  | "USER"
  | "ATTACK_NODE"
  | "ATTACK_EDGE"
  | "COUNTERFACTUAL_EVENT"
  | "SNAPSHOT"
  | "RISK_STATE";

export interface IrisCitation {
  id: string;
  type: IrisCitationType;
  label: string;
  sourceId?: string;
  timestamp?: string;
  minute?: number;
}

export interface IrisFinding {
  id: string;
  type: IrisFindingType;
  title: string;
  summary: string;
  confidence: IrisConfidence;
  citations: IrisCitation[];
}

export interface IrisResponse {
  id: string;
  answer: string;
  findings: IrisFinding[];
  citations: IrisCitation[];
  suggestedQuestions: string[];
  generatedAt: string;
  intentCategory: IrisIntentCategory;
  worldPerspective: "ACTUAL" | "KNOWN_AT_TIME" | "COUNTERFACTUAL" | "MIXED";
}

export interface IrisMessage {
  id: string;
  role: IrisMessageRole;
  content: string;
  response?: IrisResponse;
  timestamp: string;
}

export type IrisIntentCategory =
  | "WHAT_HAPPENED"
  | "ATTACK_START"
  | "KNOWN_STATE"
  | "ATTACK_PATH"
  | "COMPROMISED_ASSETS"
  | "EVIDENCE"
  | "DETECTION_GAP"
  | "CURRENT_RISK"
  | "COUNTERFACTUAL"
  | "PREVENTED_EVENT"
  | "SCENARIO_COMPARISON"
  | "NEXT_INVESTIGATION"
  | "RESPONSE_RECOMMENDATION"
  | "RESPONSE_COMPARISON"
  | "RESPONSE_EXPLANATION"
  | "AUTO_SIMULATE_INTENT"
  | "LESSONS_LEARNED"
  | "REPORT_SUMMARY"
  | "INCIDENT_CLASSIFICATION"
  | "UNKNOWN";

export interface DetectionGapFinding {
  earliestOpportunityMinute: number;
  timestamp: string;
  evidenceIds: string[];
  detectionDelayMinutes: number;
  formalDetectionTimestamp: string;
  explanation: string;
  confidence: IrisConfidence;
}

/**
 * Read-Only investigation context snapshot provided to IRIS (Requirement 5 & 6)
 */
export interface IrisContext {
  incident: {
    id: string;
    title: string;
    stage: IncidentStage;
    currentMinute: number;
    currentTime: string;
    currentRisk: Severity;
  };
  actualState: DigitalTwinSnapshot;
  knownSecurityState: DigitalTwinSnapshot;
  attackGraph: AttackGraphState;
  timeline: TimelineEvent[];
  evidence: EvidenceItem[];
  counterfactualBranch: CounterfactualBranch | null;
  scenarioHistory: CounterfactualBranch[];
}

export interface IrisProvider {
  answer(question: string, context: IrisContext): Promise<IrisResponse>;
}
