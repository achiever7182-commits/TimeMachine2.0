import type { Severity } from "./incident";
import type {
  CounterfactualAction,
  CounterfactualActionType,
  CounterfactualBranch,
  PreventedEventDetail,
} from "./counterfactual";
import type { IrisCitation, IrisConfidence } from "./iris";

export type ResponseMode = "MANUAL" | "IRIS_RECOMMEND" | "AUTO_SIMULATE";

export type ResponseDecisionStatus =
  "PROPOSED" | "APPROVED" | "REJECTED" | "SIMULATING" | "COMPLETED" | "FAILED";

export interface ResponseCandidate {
  id: string;
  action: CounterfactualAction;
  target: string;
  description: string;
  rationale: string;
  simulatedRisk: Severity;
  baselineRisk: Severity;
  riskReduction: "REDUCED" | "UNCHANGED" | "INCREASED";
  compromisedAssets: string[];
  preventedCompromises: string[];
  preventedEvents: PreventedEventDetail[];
  preventedCriticalImpact: string[];
  preventedDataExposure: number;
  confidence: IrisConfidence;
  simulationStatus: "PROPOSED" | "SIMULATING" | "COMPLETED" | "FAILED";
  branchId: string;
  score: number;
}

export interface ResponseRecommendation {
  id: string;
  recommendedAction: CounterfactualAction;
  target: string;
  confidence: IrisConfidence;
  rationale: string;
  evidence: IrisCitation[];
  alternatives: ResponseCandidate[];
  expectedImpact: string;
  decisionBasis: string;
  generatedAt: string;
  sourceMinute: number;
  candidateId: string;
  score: number;
}

export interface ResponseDecision {
  mode: ResponseMode;
  selectedAction: CounterfactualAction;
  target: string;
  status: ResponseDecisionStatus;
  approved: boolean;
  recommendationId?: string;
  timestamp: string;
  executedAt?: string;
  branchId?: string;
}
