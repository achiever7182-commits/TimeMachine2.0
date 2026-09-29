import type { Severity, IncidentStage } from "./incident";
import type { IrisCitation, IrisConfidence } from "./iris";
import type { ResponseCandidate, ResponseRecommendation } from "./responseIntelligence";
import type { CounterfactualAction, PreventedEventDetail } from "./counterfactual";

export type ReportStatus = "DRAFT" | "FINAL" | "ARCHIVED";

export type ActionItemStatus = "OPEN" | "IN_PROGRESS" | "COMPLETED" | "DEFERRED";

export type ReportConfidence = IrisConfidence; // "HIGH" | "MEDIUM" | "LOW"

export type ReportCitation = IrisCitation;

export type RecommendationCategory =
  | "DETECTION"
  | "ENDPOINT"
  | "IDENTITY"
  | "NETWORK"
  | "DATA_PROTECTION"
  | "INCIDENT_RESPONSE";

export type RecommendationPriority = "HIGH" | "MEDIUM" | "LOW";

export interface ReportMetadata {
  reportId: string;
  incidentId: string;
  incidentTitle: string;
  organizationName: string;
  generatedAt: string;
  incidentStart: string;
  incidentEnd: string;
  currentInvestigationTime: string;
  status: ReportStatus;
  version: number;
}

export interface ExecutiveSummary {
  incidentType: string;
  initialAttackSignal: string;
  initialCompromise: string;
  lateralMovement: string;
  dataAccess: string;
  detection: string;
  overallImpact: string;
  responseOpportunity: string;
  counterfactualOutcome: string;
  fullNarrative: string;
}

export interface IncidentClassification {
  category: string;
  incidentType: string;
  initialAccessVector: string;
  primaryCompromisedIdentity: string;
  initialCompromisedEndpoint: string;
  lateralMovement: string;
  dataAccess: string;
  detectionMethod: string;
  finalSeverity: Severity;
  status: string;
  attackStage: IncidentStage;
  affectedSystems: number;
  affectedUsers: number;
  dataImpact: string;
  detectionStatus: string;
}

export interface ReportTimelineEvent {
  id: string;
  timestamp: string;
  minute: number;
  title: string;
  category: string;
  severity?: Severity;
  affectedAssetId?: string;
  affectedUserId?: string;
  asset?: string;
  user?: string;
  eventId?: string;
  significance: string;
  evidenceIds: string[];
  attackNodeReferences?: string[];
  perspective: "ACTUAL" | "KNOWN_AT_TIME" | "COUNTERFACTUAL";
  actualOccurrence: string;
  knownAtTime: string;
  description: string;
}

export type ReportTimeline = ReportTimelineEvent[];

export interface AffectedAssetSummary {
  id: string;
  assetId: string;
  name: string;
  type: string;
  owner: string;
  status: "HEALTHY" | "COMPROMISED" | "ISOLATED" | "CONTAINED";
  firstAffectedAt?: string;
  compromiseTimestamp?: string;
  roleInAttack: string;
  impact: string;
  criticality: "CRITICAL" | "HIGH" | "MEDIUM" | "LOW";
  dataExposure: string;
  confidence: ReportConfidence;
}
export type ReportAssetSummary = AffectedAssetSummary;

export interface AffectedUserSummary {
  id: string;
  userId: string;
  name: string;
  role: string;
  department: string;
  status: "ACTIVE" | "COMPROMISED" | "DISABLED";
  firstSuspiciousAt?: string;
  compromisedAt?: string;
  compromiseTimestamp?: string;
  securityImpact: string;
  relevantEvents: string[];
  evidenceIds: string[];
  confidence: ReportConfidence;
}
export type ReportUserSummary = AffectedUserSummary;

export interface ReportAttackPathSegment {
  source: string;
  destination: string;
  relationship: string;
  timestamp: string;
  evidenceId?: string;
  confidence: number;
}

export interface AttackPathSummary {
  entryPoint: string;
  compromisedUser: string;
  initialEndpoint: string;
  lateralMovement: string;
  internalServer: string;
  database: string;
  fileServer?: string;
  sensitiveResources: string[];
  finalImpact: string;
  hopsCount: number;
  compromisedNodesCount: number;
  criticalNodesReached: string[];
  downstreamReachableSystems: string[];
  traversalSequence: string[];
  segments: ReportAttackPathSegment[];
  description: string;
  confidence: ReportConfidence;
}
export type ReportAttackPath = AttackPathSummary;

export interface EvidenceSummary {
  id: string;
  evidenceId: string;
  timestamp: string;
  type: string;
  source: string;
  description: string;
  relatedEvent: string;
  relatedAsset?: string;
  relatedUser?: string;
  attackNode?: string;
  significance: string;
  confidence: ReportConfidence;
  content: string;
}
export type ReportEvidenceItem = EvidenceSummary;

export interface DetectionGapSummary {
  earliestSuspiciousActivity: string;
  earliestDetectableOpportunity: string;
  formalDetection: string;
  delayMinutes: number;
  detectionDelay: string;
  potentialDetectionOpportunity: string;
  signalsAvailableBeforeDetection: string[];
  missedSignals: string[];
  whatSocKnew: string;
  whatActuallyHappened: string;
  confidence: ReportConfidence;
}
export type ReportDetectionGap = DetectionGapSummary;

export interface KnownSecurityStateItem {
  timestamp: string;
  minute: number;
  actualState: string;
  knownSecurityState: string;
  gap: string;
  telemetryAvailable: string;
}

export interface KnownSecurityStateSummary {
  asOfMinute: number;
  asOfTime: string;
  knownSeverity: Severity;
  knownCompromisedAssetIds: string[];
  unobservedThreats: string[];
  visibilityMilestones: KnownSecurityStateItem[];
  confidence: ReportConfidence;
}

export interface ActualImpactSummary {
  finalRisk: Severity;
  compromisedAssetsCount: number;
  compromisedAssetIds: string[];
  criticalAssetsAffected: string[];
  dataResourcesAffected: string[];
  dataStoresAffected: number;
  affectedUsers: string[];
  attackStagesReached: IncidentStage[];
  sensitiveResourcesAccessed: string[];
  incidentDurationMinutes: number;
  detectionDelayMinutes: number;
  blastRadiusConfirmed: number;
}
export type ReportActualImpact = ActualImpactSummary;

export interface CounterfactualSummary {
  interventionTime: string;
  interventionMinute: number;
  recommendedAction: CounterfactualAction;
  preventedEvents: PreventedEventDetail[];
  preventedCompromises: string[];
  protectedAssets: string[];
  protectedCriticalAssets: string[];
  protectedDataExposureCount: number;
  riskReduction: "REDUCED" | "UNCHANGED" | "INCREASED";
  alternateFinalRisk: Severity;
  attackPathChanges: string;
  simulatedOutcome: string;
  causalExplanation: string;
  confidence: ReportConfidence;
}
export type ReportCounterfactualAnalysis = CounterfactualSummary;

export interface ResponseDecisionSummary {
  evaluatedActions: ResponseCandidate[];
  recommendedAction: CounterfactualAction;
  recommendationConfidence: ReportConfidence;
  alternativeActions: {
    label: string;
    risk: Severity;
    preventedCount: number;
    tradeoff: string;
  }[];
  alternativesConsidered: {
    label: string;
    risk: Severity;
    preventedCount: number;
    tradeoff: string;
  }[];
  rationale: string;
  decisionBasis: string;
  expectedImpactReduction: string;
  humanApprovalRequired: boolean;
  humanApprovalState: "APPROVED" | "PENDING" | "REJECTED";
  autoSimulateUsed: boolean;
  simulatedBranchCreated: boolean;
  simulatedOutcome: string;
}
export type ReportResponseAnalysis = ResponseDecisionSummary;

export interface RootCauseFinding {
  id: string;
  category: string;
  finding: string;
  evidence: string[];
  confidence: ReportConfidence;
  isObservedFact: boolean;
}

export interface RootCauseSummary {
  directCause: string;
  contributingFactors: string[];
  detectionGapSummary: string;
  responseGapSummary: string;
  structuredFindings: RootCauseFinding[];
}
export type ReportRootCause = RootCauseSummary;

export interface MissedSignal {
  id: string;
  timestamp: string;
  signal: string;
  whatDefendersCouldHaveObserved: string;
  relatedEvidence: string;
  relatedAsset: string;
  relatedUser: string;
  potentialResponseOpportunity: string;
  confidence: ReportConfidence;
}

export interface ReportWhatWeMissed {
  earliestSignal: string;
  earliestDetectableOpportunity: string;
  detectionDelay: string;
  telemetryExisted: string[];
  whatWasNotRecognized: string[];
  interventionOpportunity: string;
  missedSignalsList: MissedSignal[];
}

export interface LessonLearned {
  id: string;
  lessonId: string;
  category: "Detection" | "Endpoint" | "Lateral Movement" | "Response" | "Identity" | "Data" | "Network Monitoring" | "Data Protection" | "Investigation";
  title: string;
  lesson: string;
  description: string;
  observation: string;
  evidence: string[];
  impactIfApplied: string;
  confidence: ReportConfidence;
}
export type ReportLessonLearned = LessonLearned;

export interface Recommendation {
  id: string;
  recommendationId: string;
  priority: RecommendationPriority;
  category: RecommendationCategory;
  title: string;
  recommendation: string;
  description: string;
  reason: string;
  relatedFinding: string;
  relatedEvidence: string[];
  evidenceIds: string[];
  expectedBenefit: string;
  confidence: ReportConfidence;
}
export type ReportRecommendation = Recommendation;

export interface ActionItem {
  id: string;
  title: string;
  action: string;
  description: string;
  category: string;
  priority: RecommendationPriority;
  ownerRole: string;
  status: ActionItemStatus;
  sourceFinding: string;
  relatedFinding: string;
  expectedOutcome: string;
  rationale: string;
}
export type ReportActionItem = ActionItem;

export interface PostIncidentLearningMetrics {
  detectionDelayMinutes: number;
  actualCompromisedAssets: number;
  counterfactualCompromisedAssets: number;
  criticalAssetsAffected: number;
  counterfactualCriticalAssetsAffected: number;
  preventedEventsCount: number;
  potentialDataStoresExposed: number;
  counterfactualDataStoresExposed: number;
  responseEffectivenessScore: number;
}

export interface IncidentReport {
  id: string;
  incidentId: string;
  title: string;
  organization: string;
  generatedAt: string;
  incidentStart: string;
  firstDetectableOpportunity: string;
  confirmedCompromise: string;
  formalDetection: string;
  containmentTime: string;
  resolutionTime: string;
  executiveSummary: string;
  executiveSummaryDetails?: ExecutiveSummary;
  metadata: ReportMetadata;
  incidentClassification: IncidentClassification;
  severity: Severity;
  timeline: ReportTimelineEvent[];
  affectedAssets: AffectedAssetSummary[];
  affectedUsers: AffectedUserSummary[];
  attackPath: AttackPathSummary;
  evidence: EvidenceSummary[];
  knownSecurityState: KnownSecurityStateSummary;
  detectionGap: DetectionGapSummary;
  actualImpact: ActualImpactSummary;
  counterfactualAnalysis: CounterfactualSummary;
  responseAnalysis: ResponseDecisionSummary;
  rootCause: RootCauseSummary;
  whatWeMissed: ReportWhatWeMissed;
  lessonsLearned: LessonLearned[];
  recommendations: Recommendation[];
  actionItems: ActionItem[];
  learningMetrics: PostIncidentLearningMetrics;
  confidence: ReportConfidence;
  citations: ReportCitation[];
  reportStatus: ReportStatus;
  version: number;
  snapshotMinute: number;
}

export interface ReportSnapshot {
  snapshotId: string;
  incidentId: string;
  snapshotMinute: number;
  capturedAt: string;
  investigationTime: string;
  actualRisk: Severity;
  knownRisk: Severity;
  compromisedAssetsCount: number;
  report: IncidentReport;
}
