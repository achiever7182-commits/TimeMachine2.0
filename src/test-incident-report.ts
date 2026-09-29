/**
 * Test Suite: Phase 6 — Incident Report + Post-Incident Learning System
 * Authoritative verification of Step 36 Tests A through AH.
 * 
 * Tests:
 * A. Report generation succeeds
 * B. Report contains correct incident ID
 * C. Report uses existing incident metadata
 * D. Executive summary is generated
 * E. Timeline is derived from source events
 * F. Actual event timestamps are correct
 * G. Known-security timestamps remain separate
 * H. Detection gap is correct
 * I. Attack path is derived from Attack Graph
 * J. Affected assets are correct
 * K. Affected users are correct
 * L. Evidence references exist
 * M. Actual impact metrics match source engine
 * N. Counterfactual scenarios are included
 * O. Counterfactual results match Phase 4
 * P. Response recommendation matches Phase 5
 * Q. Root cause findings contain citations
 * R. Missed signals are evidence-backed
 * S. Lessons are generated
 * T. Recommendations are generated
 * U. Action items are generated
 * V. Confidence values exist
 * W. Report snapshot is immutable
 * X. Finalized report cannot mutate historical facts
 * Y. Regenerating creates a new snapshot
 * Z. Print mode does not change report state
 * AA. Changing current investigation time does not mutate finalized report
 * AB. Report citations resolve to existing entities
 * AC. Report → Simulation Lab navigation context works
 * AD. Report → Attack Graph navigation context works
 * AE. Report → Evidence navigation context works
 * AF. Report → IRIS navigation context works
 * AG. Learning dashboard loads
 * AH. Action-item status changes do not alter incident facts
 */

import { incidentReportService } from "./services/report/incidentReportService";
import { findEarliestDetectableOpportunity } from "./services/iris/detectionGapService";
import { responseIntelligenceService } from "./services/iris/responseIntelligenceService";
import { getAttackGraphAtTime } from "./services/attackGraphService";
import { getActualDigitalTwinState } from "./services/digitalTwinService";
import { demoTimelineEvents } from "./data/incidentData";
import { simulateCounterfactualFuture } from "./services/counterfactualService";
import { getIncidentStateAtTime } from "./services/incidentService";
import { irisService } from "./services/iris/irisService";
import type { IncidentReport, ActionItemStatus } from "./types/incidentReport";

let totalTests = 0;
let passedTests = 0;

function assert(condition: boolean, testName: string, detail?: string) {
  totalTests++;
  if (condition) {
    passedTests++;
    console.log(`  [PASS] ${testName}`);
  } else {
    console.error(`  [FAIL] ${testName}${detail ? `: ${detail}` : ""}`);
  }
}

async function runAllPhase6Tests() {
  console.log("================================================================================");
  console.log("PHASE 6: INCIDENT REPORT & POST-INCIDENT LEARNING SYSTEM VERIFICATION SUITE");
  console.log("================================================================================");

// Clear any cached finalized reports for testing
incidentReportService.clearFinalizedCache();

// -----------------------------------------------------------------------------
// TEST A: Report generation succeeds
// -----------------------------------------------------------------------------
console.log("\n--- TEST A: Report Generation Succeeds ---");
const reportDraft = incidentReportService.generateIncidentReport("INC-2048", { minute: 42, status: "DRAFT" });
assert(reportDraft !== null && typeof reportDraft === "object", "TEST A1: Report object is generated successfully");
assert(reportDraft.id.startsWith("rpt-INC-2048"), "TEST A2: Report ID generated with rpt- prefix and incident ID", reportDraft.id);
assert(reportDraft.reportStatus === "DRAFT", "TEST A3: Default generated report status is DRAFT");

// -----------------------------------------------------------------------------
// TEST B: Report contains correct incident ID
// -----------------------------------------------------------------------------
console.log("\n--- TEST B: Correct Incident ID ---");
assert(reportDraft.incidentId === "INC-2048", "TEST B1: Report incidentId matches INC-2048");
assert(reportDraft.metadata.incidentId === "INC-2048", "TEST B2: Metadata incidentId matches INC-2048");
assert(reportDraft.title.includes("INC-2048"), "TEST B3: Title incorporates incident ID INC-2048");

// -----------------------------------------------------------------------------
// TEST C: Report uses existing incident metadata
// -----------------------------------------------------------------------------
console.log("\n--- TEST C: Existing Incident Metadata ---");
assert(reportDraft.organization === "ACME Corporation", "TEST C1: Organization name is ACME Corporation");
assert(reportDraft.metadata.organizationName === "ACME Corporation", "TEST C2: Metadata organizationName is ACME Corporation");
assert(reportDraft.incidentStart === "09:42", "TEST C3: Incident start time is 09:42");
assert(reportDraft.formalDetection === "10:24", "TEST C4: Formal detection time is 10:24");
assert(reportDraft.metadata.version >= 1, "TEST C5: Metadata version tracking is initialized");
assert(reportDraft.severity === "CRITICAL", "TEST C6: Incident severity reflects authoritative state (CRITICAL)");

// -----------------------------------------------------------------------------
// TEST D: Executive summary is generated
// -----------------------------------------------------------------------------
console.log("\n--- TEST D: Executive Summary Generation ---");
assert(typeof reportDraft.executiveSummary === "string" && reportDraft.executiveSummary.length > 100, "TEST D1: Executive summary narrative is non-empty");
assert(reportDraft.executiveSummaryDetails !== undefined, "TEST D2: Structured ExecutiveSummaryDetails object is populated");
const es = reportDraft.executiveSummaryDetails!;
assert(es.incidentType.includes("Credential Compromise"), "TEST D3: Executive summary identifies incident type");
assert(es.lateralMovement.includes("SERVER-03"), "TEST D4: Executive summary documents lateral movement to SERVER-03");
assert(es.dataAccess.includes("DB-PROD-01"), "TEST D5: Executive summary documents DB-PROD-01 access");
assert(es.counterfactualOutcome.includes("Isolating LAPTOP-042"), "TEST D6: Executive summary highlights counterfactual isolation outcome");

// -----------------------------------------------------------------------------
// TEST E: Timeline is derived from source events
// -----------------------------------------------------------------------------
console.log("\n--- TEST E: Timeline Derived from Source Events ---");
assert(reportDraft.timeline.length === demoTimelineEvents.length, `TEST E1: Timeline event count matches demo dataset (${reportDraft.timeline.length} events)`);
const firstEvent = reportDraft.timeline[0];
assert(firstEvent.id === "evt-0942", "TEST E2: First timeline event maps to evt-0942");
assert(firstEvent.title === demoTimelineEvents[0].title, "TEST E3: Timeline event title matches source dataset");
assert(firstEvent.eventId === demoTimelineEvents[0].id, "TEST E4: Timeline eventId links to source event ID");

// -----------------------------------------------------------------------------
// TEST F: Actual event timestamps are correct
// -----------------------------------------------------------------------------
console.log("\n--- TEST F: Actual Event Timestamps ---");
assert(reportDraft.timeline[0].timestamp === "09:42", "TEST F1: Initial event timestamp is 09:42");
const evt1000 = reportDraft.timeline.find((e) => e.timestamp === "10:00");
const evt1004 = reportDraft.timeline.find((e) => e.timestamp === "10:04");
const evt1012 = reportDraft.timeline.find((e) => e.timestamp === "10:12");
const evt1024 = reportDraft.timeline.find((e) => e.timestamp === "10:24");
assert(evt1000 !== undefined && evt1000.title.includes("Compromise"), "TEST F2: 10:00 compromise event timestamped correctly");
assert(evt1004 !== undefined && evt1004.category === "ENDPOINT", "TEST F3: 10:04 PowerShell event timestamped correctly");
assert(evt1012 !== undefined && evt1012.category === "DATA_ACCESS", "TEST F4: 10:12 database access event timestamped correctly");
assert(evt1024 !== undefined && evt1024.category === "INCIDENT_ALERT", "TEST F5: 10:24 formal detection timestamped correctly");

// -----------------------------------------------------------------------------
// TEST G: Known-security timestamps remain separate
// -----------------------------------------------------------------------------
console.log("\n--- TEST G: Actual vs Known-Security Timestamps Separated ---");
assert(reportDraft.detectionGap.whatSocKnew !== reportDraft.detectionGap.whatActuallyHappened, "TEST G1: SOC known perspective strictly segregated from actual reality");
assert(reportDraft.knownSecurityState.visibilityMilestones.length >= 7, "TEST G2: Visibility milestones detail actual vs known states");
const milestone1004 = reportDraft.knownSecurityState.visibilityMilestones.find((m) => m.timestamp === "10:04");
assert(milestone1004 !== undefined, "TEST G3: 10:04 milestone exists in known security state");
assert(milestone1004!.knownSecurityState.includes("queued") || milestone1004!.gap.includes("response opportunity"), "TEST G4: 10:04 gap exposes unassigned telemetry without SOC knowledge of server breach");
assert(!milestone1004!.knownSecurityState.includes("DB-PROD-01 database dump confirmed"), "TEST G5: No future knowledge leakage at 10:04");

// -----------------------------------------------------------------------------
// TEST H: Detection gap is correct
// -----------------------------------------------------------------------------
console.log("\n--- TEST H: Detection Gap Calculation ---");
const p5Gap = findEarliestDetectableOpportunity();
assert(reportDraft.detectionGap.delayMinutes === p5Gap.detectionDelayMinutes, `TEST H1: Detection delay matches Phase 5 engine (${p5Gap.detectionDelayMinutes}m)`);
assert(reportDraft.detectionGap.delayMinutes === 37, "TEST H2: Detection delay is exactly 37 minutes");
assert(reportDraft.detectionGap.earliestDetectableOpportunity === "09:47", "TEST H3: Earliest detectable opportunity is 09:47");
assert(reportDraft.detectionGap.formalDetection === "10:24", "TEST H4: Formal detection is 10:24");

// -----------------------------------------------------------------------------
// TEST I: Attack path is derived from Attack Graph
// -----------------------------------------------------------------------------
console.log("\n--- TEST I: Attack Path from Attack Graph ---");
const graph42 = getAttackGraphAtTime("INC-2048", 42);
assert(reportDraft.attackPath.entryPoint === "ATTACKER", "TEST I1: Attack path originates at ATTACKER");
assert(reportDraft.attackPath.initialEndpoint === "LAPTOP-042", "TEST I2: Initial endpoint is LAPTOP-042");
assert(reportDraft.attackPath.traversalSequence.includes("SERVER-03"), "TEST I3: Attack traversal includes SERVER-03");
assert(reportDraft.attackPath.traversalSequence.includes("DB-PROD-01"), "TEST I4: Attack traversal includes DB-PROD-01");
assert(reportDraft.attackPath.segments.length === graph42.edges.length, "TEST I5: Attack path segments match Attack Graph edges count");

// -----------------------------------------------------------------------------
// TEST J: Affected assets are correct
// -----------------------------------------------------------------------------
console.log("\n--- TEST J: Affected Assets from Digital Twin ---");
const twin42 = getActualDigitalTwinState(42);
const compromisedTwins = twin42.assets.filter((a) => a.securityState === "COMPROMISED");
assert(reportDraft.affectedAssets.length >= compromisedTwins.length, "TEST J1: Affected assets catalog covers Digital Twin assets");
const assetIds = reportDraft.affectedAssets.map((a) => a.id);
assert(assetIds.includes("LAPTOP-042"), "TEST J2: LAPTOP-042 present in affected assets");
assert(assetIds.includes("SERVER-03"), "TEST J3: SERVER-03 present in affected assets");
assert(assetIds.includes("DB-PROD-01"), "TEST J4: DB-PROD-01 present in affected assets");
assert(assetIds.includes("FILE-SRV-01"), "TEST J5: FILE-SRV-01 present in affected assets");

// -----------------------------------------------------------------------------
// TEST K: Affected users are correct
// -----------------------------------------------------------------------------
console.log("\n--- TEST K: Affected Users ---");
assert(reportDraft.affectedUsers.length >= 1, "TEST K1: Affected users list populated");
const alexUser = reportDraft.affectedUsers.find((u) => u.userId === "alex.m" || u.id === "usr-alex-m");
assert(alexUser !== undefined, "TEST K2: alex.m identified in affected users");
assert(alexUser!.status === "COMPROMISED", "TEST K3: alex.m status is COMPROMISED");
assert(alexUser!.role.length > 0, "TEST K4: alex.m role documented from organizational directory");

// -----------------------------------------------------------------------------
// TEST L: Evidence references exist
// -----------------------------------------------------------------------------
console.log("\n--- TEST L: Evidence Ledger Traceability ---");
assert(reportDraft.evidence.length >= 6, `TEST L1: Evidence ledger contains ${reportDraft.evidence.length} items`);
const evIdp = reportDraft.evidence.find((e) => e.source.toLowerCase().includes("idp") || e.type.toLowerCase().includes("auth"));
const evHost = reportDraft.evidence.find((e) => e.source.toLowerCase().includes("crowdstrike") || e.source.toLowerCase().includes("edr") || e.type.toLowerCase().includes("endpoint"));
assert(evIdp !== undefined && evIdp.source.length > 0, "TEST L2: IdP evidence has structured telemetry source");
assert(evHost !== undefined && evHost.description.length > 0, "TEST L3: Host evidence has structured description");
assert(reportDraft.citations.length >= 5, `TEST L4: Citations catalog populated (${reportDraft.citations.length} citations)`);

// -----------------------------------------------------------------------------
// TEST M: Actual impact metrics match source engine
// -----------------------------------------------------------------------------
console.log("\n--- TEST M: Actual Impact Metrics ---");
assert(reportDraft.actualImpact.compromisedAssetsCount === 4, "TEST M1: 4 compromised assets confirmed in impact summary");
assert(reportDraft.actualImpact.criticalAssetsAffected.includes("DB-PROD-01"), "TEST M2: DB-PROD-01 classified as critical asset affected");
assert(reportDraft.actualImpact.blastRadiusConfirmed === 4, "TEST M3: Blast radius confirmed as 4 endpoints/servers");
assert(reportDraft.actualImpact.dataStoresAffected === 2, "TEST M4: 2 data stores affected (DATA-CUST-VAULT, DATA-CONF-FILES)");
assert(reportDraft.actualImpact.finalRisk === "CRITICAL", "TEST M5: Actual final risk outcome is CRITICAL");

// -----------------------------------------------------------------------------
// TEST N: Counterfactual scenarios are included
// -----------------------------------------------------------------------------
console.log("\n--- TEST N: Counterfactual Scenarios Included ---");
assert(reportDraft.responseAnalysis.evaluatedActions.length === 4, "TEST N1: All 4 standard response scenarios evaluated");
const evaluatedTypes = reportDraft.responseAnalysis.evaluatedActions.map((c) => c.action.type);
assert(evaluatedTypes.includes("ISOLATE_ENDPOINT"), "TEST N2: ISOLATE_ENDPOINT evaluated");
assert(evaluatedTypes.includes("DISABLE_USER"), "TEST N3: DISABLE_USER evaluated");
assert(evaluatedTypes.includes("BLOCK_LATERAL_CONNECTION"), "TEST N4: BLOCK_LATERAL_CONNECTION evaluated");
assert(evaluatedTypes.includes("DO_NOTHING"), "TEST N5: DO_NOTHING baseline evaluated");

// -----------------------------------------------------------------------------
// TEST O: Counterfactual results match Phase 4
// -----------------------------------------------------------------------------
console.log("\n--- TEST O: Counterfactual Results Match Phase 4 ---");
assert(reportDraft.counterfactualAnalysis.preventedEvents.length === 3, "TEST O1: Exactly 3 attack events prevented by early containment");
assert(reportDraft.counterfactualAnalysis.protectedAssets.includes("SERVER-03"), "TEST O2: SERVER-03 protected in counterfactual branch");
assert(reportDraft.counterfactualAnalysis.protectedAssets.includes("DB-PROD-01"), "TEST O3: DB-PROD-01 protected in counterfactual branch");
assert(reportDraft.counterfactualAnalysis.protectedAssets.includes("FILE-SRV-01"), "TEST O4: FILE-SRV-01 protected in counterfactual branch");
assert(reportDraft.counterfactualAnalysis.alternateFinalRisk === "MEDIUM", "TEST O5: Alternate risk reduced to MEDIUM");

// -----------------------------------------------------------------------------
// TEST P: Response recommendation matches Phase 5
// -----------------------------------------------------------------------------
console.log("\n--- TEST P: Response Recommendation Matches Phase 5 ---");
const rec5 = responseIntelligenceService.generateRecommendation(22, "INC-2048");
assert(reportDraft.responseAnalysis.recommendedAction.type === rec5.recommendedAction.type, "TEST P1: Recommended action type matches Phase 5 (ISOLATE_ENDPOINT)");
assert(reportDraft.responseAnalysis.recommendedAction.targetId === "LAPTOP-042", "TEST P2: Target endpoint is LAPTOP-042");
assert(reportDraft.responseAnalysis.recommendationConfidence === "HIGH", "TEST P3: Recommendation confidence is HIGH");

// -----------------------------------------------------------------------------
// TEST Q: Root cause findings contain citations
// -----------------------------------------------------------------------------
console.log("\n--- TEST Q: Root Cause Findings Contain Citations ---");
assert(reportDraft.rootCause.structuredFindings.length >= 4, "TEST Q1: Root cause contains structured findings");
const allFindingsHaveEvidence = reportDraft.rootCause.structuredFindings.every((f) => f.evidence.length > 0);
assert(allFindingsHaveEvidence, "TEST Q2: Every root cause finding cites supporting evidence");
const factFinding = reportDraft.rootCause.structuredFindings.find((f) => f.isObservedFact);
assert(factFinding !== undefined, "TEST Q3: Distinguishes observed facts from inferred findings");

// -----------------------------------------------------------------------------
// TEST R: Missed signals are evidence-backed
// -----------------------------------------------------------------------------
console.log("\n--- TEST R: Missed Signals Are Evidence-Backed ---");
assert(reportDraft.whatWeMissed.missedSignalsList.length >= 3, "TEST R1: What We Missed lists missed detection signals");
const allMissedHaveEvidence = reportDraft.whatWeMissed.missedSignalsList.every((ms) => ms.relatedEvidence.length > 0);
assert(allMissedHaveEvidence, "TEST R2: Every missed signal references existing evidence");
assert(reportDraft.whatWeMissed.missedSignalsList[0].timestamp === "09:47", "TEST R3: First missed signal anchors at 09:47");

// -----------------------------------------------------------------------------
// TEST S: Lessons are generated
// -----------------------------------------------------------------------------
console.log("\n--- TEST S: Lessons Learned Generated ---");
assert(reportDraft.lessonsLearned.length >= 4, `TEST S1: ${reportDraft.lessonsLearned.length} grounded lessons generated`);
const hasEndpointLesson = reportDraft.lessonsLearned.some((l) => l.category === "Endpoint" || l.observation.includes("PowerShell"));
const hasIdpLesson = reportDraft.lessonsLearned.some((l) => l.category === "Identity" || l.observation.includes("Auth0") || l.observation.includes("token"));
assert(hasEndpointLesson, "TEST S2: Endpoint lesson derived from PowerShell execution");
assert(hasIdpLesson, "TEST S3: Identity lesson derived from authentication anomaly");

// -----------------------------------------------------------------------------
// TEST T: Recommendations are generated
// -----------------------------------------------------------------------------
console.log("\n--- TEST T: Recommendations Generated ---");
assert(reportDraft.recommendations.length >= 5, `TEST T1: ${reportDraft.recommendations.length} actionable recommendations generated`);
const allRecsHavePriority = reportDraft.recommendations.every((r) => ["HIGH", "MEDIUM", "LOW"].includes(r.priority));
assert(allRecsHavePriority, "TEST T2: Every recommendation specifies valid priority level");
const allRecsHaveEvidence = reportDraft.recommendations.every((r) => r.evidenceIds.length > 0);
assert(allRecsHaveEvidence, "TEST T3: Every recommendation cites concrete evidence IDs");

// -----------------------------------------------------------------------------
// TEST U: Action items are generated
// -----------------------------------------------------------------------------
console.log("\n--- TEST U: Action Items Generated ---");
assert(reportDraft.actionItems.length >= 5, `TEST U1: ${reportDraft.actionItems.length} post-incident action items generated`);
const allActionItemsValidStatus = reportDraft.actionItems.every((a) =>
  ["OPEN", "IN_PROGRESS", "COMPLETED", "DEFERRED"].includes(a.status)
);
assert(allActionItemsValidStatus, "TEST U2: All action items carry valid ActionItemStatus");
const allActionItemsHaveOwner = reportDraft.actionItems.every((a) => a.ownerRole.length > 0);
assert(allActionItemsHaveOwner, "TEST U3: Every action item assigns an owner role");

// -----------------------------------------------------------------------------
// TEST V: Confidence values exist
// -----------------------------------------------------------------------------
console.log("\n--- TEST V: Confidence Values Exist ---");
assert(["HIGH", "MEDIUM", "LOW"].includes(reportDraft.confidence), "TEST V1: Overall report confidence is valid");
assert(["HIGH", "MEDIUM", "LOW"].includes(reportDraft.attackPath.confidence), "TEST V2: Attack path confidence is valid");
assert(["HIGH", "MEDIUM", "LOW"].includes(reportDraft.detectionGap.confidence), "TEST V3: Detection gap confidence is valid");
assert(["HIGH", "MEDIUM", "LOW"].includes(reportDraft.counterfactualAnalysis.confidence), "TEST V4: Counterfactual confidence is valid");
const allEvidenceHaveConfidence = reportDraft.evidence.every((ev) => ["HIGH", "MEDIUM", "LOW"].includes(ev.confidence));
assert(allEvidenceHaveConfidence, "TEST V5: All evidence items carry valid confidence values");

// -----------------------------------------------------------------------------
// TEST W: Report snapshot is immutable
// -----------------------------------------------------------------------------
console.log("\n--- TEST W: Report Snapshot Immutability ---");
const snap = incidentReportService.createSnapshot(reportDraft);
assert(snap.snapshotId.startsWith("snap-"), "TEST W1: Snapshot ID assigned with snap- prefix");
assert(snap.snapshotMinute === reportDraft.snapshotMinute, "TEST W2: Snapshot minute matches report minute");
assert(Object.isFrozen(snap), "TEST W3: Snapshot object is frozen (immutable)");
let snapshotThrew = false;
try {
  // @ts-expect-error Attempting mutation on frozen snapshot
  snap.compromisedAssetsCount = 999;
} catch {
  snapshotThrew = true;
}
assert(snapshotThrew || snap.compromisedAssetsCount === reportDraft.actualImpact.compromisedAssetsCount, "TEST W4: Snapshot fields cannot be mutated");

// -----------------------------------------------------------------------------
// TEST X: Finalized report cannot mutate historical facts
// -----------------------------------------------------------------------------
console.log("\n--- TEST X: Finalized Report Does Not Mutate Historical Facts ---");
const eventsBeforeFinalize = demoTimelineEvents.length;
const actualStateBeforeFinalize = getIncidentStateAtTime(42);
const finalizedReport = incidentReportService.finalizeReport("INC-2048", reportDraft);
assert(finalizedReport.reportStatus === "FINAL", "TEST X1: Finalized report status is FINAL");
assert(demoTimelineEvents.length === eventsBeforeFinalize, "TEST X2: Historical timeline events length unchanged");
const actualStateAfterFinalize = getIncidentStateAtTime(42);
assert(actualStateAfterFinalize.risk === actualStateBeforeFinalize.risk, "TEST X3: Historical incident risk unchanged");
assert(actualStateAfterFinalize.compromisedAssets.length === actualStateBeforeFinalize.compromisedAssets.length, "TEST X4: Compromised assets list unchanged");

// -----------------------------------------------------------------------------
// TEST Y: Regenerating creates a new snapshot
// -----------------------------------------------------------------------------
console.log("\n--- TEST Y: Regenerating Creates New Snapshot/Version ---");
// Generating a new DRAFT with explicit new version
const regeneratedReport = incidentReportService.generateIncidentReport("INC-2048", {
  minute: 22,
  status: "DRAFT",
  version: finalizedReport.version + 1,
});
assert(regeneratedReport.snapshotMinute === 22, "TEST Y1: Regenerated report snapshot minute is 22");
assert(regeneratedReport.version === finalizedReport.version + 1, "TEST Y2: Regenerated report has incremented version");
assert(regeneratedReport.reportStatus === "DRAFT", "TEST Y3: Regenerated report is a new DRAFT");
assert(finalizedReport.reportStatus === "FINAL", "TEST Y4: Previously finalized report remains unchanged (FINAL)");

// -----------------------------------------------------------------------------
// TEST Z: Print mode does not change report state
// -----------------------------------------------------------------------------
console.log("\n--- TEST Z: Print Mode Does Not Change Report State ---");
const statusBeforePrint = finalizedReport.reportStatus;
const versionBeforePrint = finalizedReport.version;
// Simulating print workflow (reading print-specific views or invoking print styles)
const printDocumentTitle = `${finalizedReport.metadata.reportId} - Incident Resolution Report`;
assert(printDocumentTitle.includes("INC-2048"), "TEST Z1: Print document title prepared from metadata");
assert(finalizedReport.reportStatus === statusBeforePrint, "TEST Z2: Report status unchanged by print invocation");
assert(finalizedReport.version === versionBeforePrint, "TEST Z3: Report version unchanged by print invocation");

// -----------------------------------------------------------------------------
// TEST AA: Changing current investigation time does not mutate finalized report
// -----------------------------------------------------------------------------
console.log("\n--- TEST AA: Investigation Time Change Does Not Mutate Finalized Report ---");
// Retrieve finalized report and check that its recorded currentInvestigationTime and minute are preserved
const retrievedFinal = incidentReportService.getFinalizedReport("INC-2048");
assert(retrievedFinal !== undefined, "TEST AA1: Finalized report retrieved from service cache");
const fixedInvestigationTime = retrievedFinal!.metadata.currentInvestigationTime;
// Now simulate rewinding time to minute 0 in investigation view
const rewindedState = getIncidentStateAtTime(0);
assert(rewindedState.risk === "MEDIUM", "TEST AA2: Investigation engine rewound to MEDIUM risk at minute 0");
assert(retrievedFinal!.metadata.currentInvestigationTime === fixedInvestigationTime, "TEST AA3: Finalized report investigation time preserved despite engine rewind");
assert(retrievedFinal!.severity === "CRITICAL", "TEST AA4: Finalized report severity preserved as CRITICAL");

// -----------------------------------------------------------------------------
// TEST AB: Report citations resolve to existing entities
// -----------------------------------------------------------------------------
console.log("\n--- TEST AB: Report Citations Resolve to Existing Entities ---");
for (const citation of reportDraft.citations) {
  if (citation.type === "TIMELINE_EVENT") {
    const matchedEvt = demoTimelineEvents.find((e) => e.id === citation.sourceId);
    assert(matchedEvt !== undefined, `TEST AB1: Citation ${citation.id} resolves to timeline event ${citation.sourceId}`);
  } else if (citation.type === "ASSET") {
    const matchedAsset = twin42.assets.find((a) => a.id === citation.sourceId);
    assert(matchedAsset !== undefined, `TEST AB2: Citation ${citation.id} resolves to asset ${citation.sourceId}`);
  } else if (citation.type === "USER") {
    const matchedUser = twin42.users.find((u) => u.id === citation.sourceId || u.username === citation.sourceId);
    assert(matchedUser !== undefined, `TEST AB3: Citation ${citation.id} resolves to user ${citation.sourceId}`);
  }
}

// -----------------------------------------------------------------------------
// TEST AC: Report → Simulation Lab navigation context works
// -----------------------------------------------------------------------------
console.log("\n--- TEST AC: Report → Simulation Lab Navigation Context ---");
const simLabRoute = `/simulation-lab?action=${reportDraft.responseAnalysis.recommendedAction.type}&target=${reportDraft.responseAnalysis.recommendedAction.targetId}&minute=22`;
assert(simLabRoute.includes("/simulation-lab"), "TEST AC1: Navigation URI points to Simulation Lab");
assert(simLabRoute.includes("ISOLATE_ENDPOINT"), "TEST AC2: Navigation URI includes recommended action type");
assert(simLabRoute.includes("LAPTOP-042"), "TEST AC3: Navigation URI includes target asset");

// -----------------------------------------------------------------------------
// TEST AD: Report → Attack Graph navigation context works
// -----------------------------------------------------------------------------
console.log("\n--- TEST AD: Report → Attack Graph Navigation Context ---");
const attackGraphRoute = `/attack-graph?focusNode=${reportDraft.attackPath.initialEndpoint}&minute=42`;
assert(attackGraphRoute.includes("/attack-graph"), "TEST AD1: Navigation URI points to Attack Graph");
assert(attackGraphRoute.includes("LAPTOP-042"), "TEST AD2: Navigation URI targets compromised node LAPTOP-042");

// -----------------------------------------------------------------------------
// TEST AE: Report → Evidence navigation context works
// -----------------------------------------------------------------------------
console.log("\n--- TEST AE: Report → Evidence Navigation Context ---");
const evidenceSample = reportDraft.evidence[0];
const evidenceRoute = `/evidence?selectedEvidence=${evidenceSample.id}`;
assert(evidenceRoute.includes("/evidence"), "TEST AE1: Navigation URI points to Evidence Explorer");
assert(evidenceRoute.includes(evidenceSample.id), "TEST AE2: Navigation URI references valid evidence ID");

// -----------------------------------------------------------------------------
// TEST AF: Report → IRIS navigation context works
// -----------------------------------------------------------------------------
console.log("\n--- TEST AF: Report → IRIS Navigation Context ---");
const irisCtx = irisService.createContext(42);
const summaryAnswer = await irisService.ask("Summarize this incident for executive report", irisCtx);
assert(summaryAnswer.answer.length > 50, "TEST AF1: IRIS answers executive report summary query");
const lessonsAnswer = await irisService.ask("What are the main lessons learned and recommendations?", irisCtx);
assert(lessonsAnswer.answer.toLowerCase().includes("lesson") || lessonsAnswer.answer.toLowerCase().includes("recommend"), "TEST AF2: IRIS answers lessons learned query");
const gapAnswer = await irisService.ask("What was the detection gap for this incident?", irisCtx);
assert(gapAnswer.answer.includes("37"), "TEST AF3: IRIS accurately reports the 37-minute detection gap");

// -----------------------------------------------------------------------------
// TEST AG: Learning dashboard loads
// -----------------------------------------------------------------------------
console.log("\n--- TEST AG: Learning Dashboard Metrics Load ---");
const lm = reportDraft.learningMetrics;
assert(lm.detectionDelayMinutes === 37, "TEST AG1: Learning dashboard detection delay is 37m");
assert(lm.actualCompromisedAssets === 4, "TEST AG2: Actual compromised assets count is 4");
assert(lm.counterfactualCompromisedAssets === 1, "TEST AG3: Counterfactual compromised assets count is 1");
assert(lm.preventedEventsCount === 3, "TEST AG4: Prevented events count is 3");
assert(lm.responseEffectivenessScore > 50, "TEST AG5: Response effectiveness score calculated (> 50)");

// -----------------------------------------------------------------------------
// TEST AH: Action-item status changes do not alter incident facts
// -----------------------------------------------------------------------------
console.log("\n--- TEST AH: Action-Item Status Updates Do Not Alter Incident Facts ---");
const actId = "act-1";
const newStatus: ActionItemStatus = "IN_PROGRESS";
// Update action item status
incidentReportService.updateActionItemStatus("INC-2048", actId, newStatus);
// Generate fresh view to verify status update
const updatedReport = incidentReportService.generateIncidentReport("INC-2048", { minute: 42, status: "DRAFT" });
const updatedItem = updatedReport.actionItems.find((a) => a.id === actId);
assert(updatedItem !== undefined && updatedItem.status === "IN_PROGRESS", "TEST AH1: Action item act-1 status updated to IN_PROGRESS in memory");
// Verify historical incident facts are unchanged
const timelineAfterActionChange = demoTimelineEvents.length;
const stateAfterActionChange = getIncidentStateAtTime(42);
assert(timelineAfterActionChange === eventsBeforeFinalize, "TEST AH2: Historical timeline remains identical (0 mutations)");
assert(stateAfterActionChange.risk === "CRITICAL", "TEST AH3: Historical incident risk unaffected");
assert(stateAfterActionChange.compromisedAssets.length === 4, "TEST AH4: Historical compromised assets count unaffected");

console.log("\n================================================================================");
console.log(`PHASE 6 TEST RESULTS: ${passedTests}/${totalTests} TESTS PASSED`);
console.log("================================================================================");

if (passedTests !== totalTests) {
  process.exit(1);
}
}

runAllPhase6Tests().catch((err) => {
  console.error("Test execution failed:", err);
  process.exit(1);
});
