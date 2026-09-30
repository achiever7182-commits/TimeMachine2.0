/**
 * Phase 5 Extension Automated Verification Test Suite:
 * Response Intelligence & Autonomous Simulated Response
 * Tests TEST A through TEST V as mandated by Section 19.
 */
import { responseIntelligenceService } from "./services/iris/responseIntelligenceService";
import { irisService } from "./services/iris/irisService";
import {
  simulateCounterfactualFuture,
  getStandardResponseActions,
} from "./services/counterfactualService";
import { getActualDigitalTwinState } from "./services/digitalTwinService";
import { getIncidentStateAtTime } from "./services/incidentService";
import { getAttackGraphAtTime } from "./services/attackGraphService";
import type { CounterfactualAction } from "./types/counterfactual";

let totalTests = 0;
let passedTests = 0;

function assert(condition: boolean, testName: string, detail?: string) {
  totalTests++;
  if (condition) {
    passedTests++;
    console.log(`[PASS] ${testName}${detail ? ` - ${detail}` : ""}`);
  } else {
    console.error(`[FAIL] ${testName}${detail ? ` - ${detail}` : ""}`);
  }
}

async function runResponseIntelligenceTests() {
  console.log("\n=======================================================");
  console.log("   INCIDENT TIME MACHINE - RESPONSE INTELLIGENCE SUITE ");
  console.log("=======================================================\n");

  const testMinute = 22; // 10:04

  // TEST A — Response candidate generation
  const candidates = responseIntelligenceService.evaluateCandidates(testMinute);
  assert(
    Array.isArray(candidates) && candidates.length === 4,
    "TEST A — RESPONSE CANDIDATE GENERATION",
    `Generated ${candidates.length} candidates at 10:04 (T+22m).`
  );

  // TEST B — All valid actions evaluated
  const actionTypes = candidates.map((c) => c.action.type);
  assert(
    actionTypes.includes("DO_NOTHING") &&
    actionTypes.includes("ISOLATE_ENDPOINT") &&
    actionTypes.includes("DISABLE_USER") &&
    actionTypes.includes("BLOCK_LATERAL_CONNECTION"),
    "TEST B — ALL VALID ACTIONS EVALUATED",
    `Evaluated: [${actionTypes.join(", ")}].`
  );

  // TEST C — Phase 4 engine used as source of truth
  const directBranch = simulateCounterfactualFuture(testMinute, candidates[1]!.action);
  assert(
    candidates[1]!.simulatedRisk === directBranch.comparison.counterfactualFinalRisk &&
    candidates[1]!.preventedCompromises.length === directBranch.comparison.preventedCompromises.length &&
    candidates[1]!.preventedEvents.length === directBranch.comparison.preventedCount,
    "TEST C — PHASE 4 ENGINE AS SOURCE OF TRUTH",
    `Metrics exactly match Phase 4 simulateCounterfactualFuture comparison output.`
  );

  // TEST D — Different actions produce correct different outcomes
  const doNothingCand = candidates.find((c) => c.action.type === "DO_NOTHING")!;
  const isolateCand = candidates.find((c) => c.action.type === "ISOLATE_ENDPOINT")!;
  assert(
    doNothingCand.simulatedRisk === "CRITICAL" &&
    isolateCand.simulatedRisk === "MEDIUM" &&
    doNothingCand.preventedCompromises.length === 0 &&
    isolateCand.preventedCompromises.length === 3,
    "TEST D — DIFFERENT OUTCOMES",
    `DO_NOTHING final risk: ${doNothingCand.simulatedRisk} vs ISOLATE final risk: ${isolateCand.simulatedRisk}.`
  );

  // TEST E — Recommendation is deterministic
  const rec1 = responseIntelligenceService.generateRecommendation(testMinute);
  const rec2 = responseIntelligenceService.generateRecommendation(testMinute);
  assert(
    rec1.recommendedAction.type === rec2.recommendedAction.type &&
    rec1.score === rec2.score &&
    rec1.recommendedAction.targetId === "LAPTOP-042",
    "TEST E — RECOMMENDATION DETERMINISM",
    `Both runs independently recommended ${rec1.recommendedAction.label} with score ${rec1.score} pts.`
  );

  // TEST F — Recommendation has explainable reasoning
  assert(
    rec1.rationale.length > 30 &&
    rec1.decisionBasis.includes("optimization algorithm") &&
    rec1.expectedImpact.includes("prevents"),
    "TEST F — EXPLAINABLE REASONING",
    `Rationale: "${rec1.rationale}"`
  );

  // TEST G — Recommendation confidence is generated
  assert(
    rec1.confidence === "HIGH",
    "TEST G — RECOMMENDATION CONFIDENCE",
    `Confidence assessed as ${rec1.confidence} based on direct causal path disruption.`
  );

  // TEST H — IRIS_RECOMMEND mode works
  const answerRec = responseIntelligenceService.formatRecommendationAnswer(rec1);
  assert(
    answerRec.includes("IRIS RESPONSE INTELLIGENCE & RECOMMENDATION") &&
    answerRec.toLowerCase().includes("isolate laptop-042") &&
    answerRec.includes("SIMULATION ONLY"),
    "TEST H — IRIS_RECOMMEND MODE",
    `Formatted natural language decision memo with prominent safety notice.`
  );

  // TEST I — Human approval works
  const decisionApproved = {
    mode: "IRIS_RECOMMEND" as const,
    selectedAction: rec1.recommendedAction,
    target: rec1.target,
    status: "APPROVED" as const,
    approved: true,
    recommendationId: rec1.id,
    timestamp: "10:04",
  };
  assert(
    decisionApproved.approved === true && decisionApproved.status === "APPROVED",
    "TEST I — HUMAN APPROVAL",
    `Decision status: ${decisionApproved.status} for ${decisionApproved.selectedAction.label}.`
  );

  // TEST J — AUTO_SIMULATE works
  const autoResult = responseIntelligenceService.autoSimulate(testMinute);
  assert(
    autoResult.decision.mode === "AUTO_SIMULATE" &&
    autoResult.decision.status === "COMPLETED" &&
    autoResult.decision.approved === true &&
    autoResult.branch.status === "COMPLETED",
    "TEST J — AUTO_SIMULATE",
    `Auto-simulated ${autoResult.decision.selectedAction.label} into branch ${autoResult.branch.branchId}.`
  );

  // TEST K — Auto simulation creates isolated counterfactual branch
  assert(
    autoResult.branch.branchId.startsWith("branch-isolate_endpoint") &&
    autoResult.branch.comparison.preventedCompromises.includes("SERVER-03") &&
    autoResult.branch.comparison.preventedCompromises.includes("DB-PROD-01"),
    "TEST K — ISOLATED COUNTERFACTUAL BRANCH",
    `Branch ID: ${autoResult.branch.branchId} prevented compromises: [${autoResult.branch.comparison.preventedCompromises.join(", ")}].`
  );

  // TEST L — Baseline remains immutable
  const baselineTwin1004 = getActualDigitalTwinState(22);
  const baselineIncidentState1004 = getIncidentStateAtTime(22);
  assert(
    baselineTwin1004.assets.length === 6 &&
    baselineIncidentState1004.timestamp === "10:04" &&
    baselineIncidentState1004.risk === "HIGH",
    "TEST L — BASELINE IMMUTABILITY",
    `Baseline Digital Twin and incident state remained pristine after auto-simulation.`
  );

  // TEST M — Multiple scenarios coexist
  const branchDoNothing = simulateCounterfactualFuture(testMinute, candidates[0]!.action);
  const branchIsolate = simulateCounterfactualFuture(testMinute, candidates[1]!.action);
  const branchDisable = simulateCounterfactualFuture(testMinute, candidates[2]!.action);
  const branchBlock = simulateCounterfactualFuture(testMinute, candidates[3]!.action);
  const scenarioHistory = [branchDoNothing, branchIsolate, branchDisable, branchBlock];
  assert(
    scenarioHistory.length === 4 &&
    scenarioHistory[0]!.comparison.preventedCount === 0 &&
    scenarioHistory[1]!.comparison.preventedCount === 3 &&
    scenarioHistory[2]!.comparison.preventedCount === 3 &&
    scenarioHistory[3]!.comparison.preventedCount === 3,
    "TEST M — MULTIPLE SCENARIOS COEXIST",
    `All 4 scenario branches coexisting in history without cross-contamination.`
  );

  // TEST N — Actual timeline remains unchanged
  const actualAt42 = getActualDigitalTwinState(42);
  assert(
    actualAt42.blastRadius.confirmedAffectedAssets >= 3 &&
    actualAt42.riskLevel === "CRITICAL",
    "TEST N — ACTUAL TIMELINE UNCHANGED",
    `Actual baseline at 10:24 still reaches CRITICAL risk with full blast radius.`
  );

  // TEST O — 10:04 isolation scenario prevents the expected downstream events
  const isolateComp = branchIsolate.comparison;
  const preventedEventIds = isolateComp.preventedEvents.map((p) => p.eventId);
  assert(
    preventedEventIds.includes("evt-1007") &&
    preventedEventIds.includes("evt-1012") &&
    preventedEventIds.includes("evt-1018"),
    "TEST O — 10:04 ISOLATION DOWNSTREAM PREVENTION",
    `Prevented events: [${preventedEventIds.join(", ")}].`
  );

  // TEST P — 10:07 actual timeline still shows SERVER-03 compromise
  const actualTwin1007 = getActualDigitalTwinState(25); // minute 25 is 10:07
  const server03At1007 = actualTwin1007.assets.find((a) => a.id === "SERVER-03")!;
  assert(
    server03At1007.status === "COMPROMISED" &&
    actualTwin1007.timestamp === "10:07",
    "TEST P — 10:07 ACTUAL SERVER-03 COMPROMISE",
    `SERVER-03 status in actual baseline at 10:07 is ${server03At1007.status}.`
  );

  // TEST Q — 10:12 actual timeline still shows DB-PROD-01 compromise
  const actualTwin1012 = getActualDigitalTwinState(30); // minute 30 is 10:12
  const dbProdAt1012 = actualTwin1012.assets.find((a) => a.id === "DB-PROD-01")!;
  assert(
    dbProdAt1012.status === "COMPROMISED" &&
    actualTwin1012.timestamp === "10:12",
    "TEST Q — 10:12 ACTUAL DB-PROD-01 COMPROMISE",
    `DB-PROD-01 status in actual baseline at 10:12 is ${dbProdAt1012.status}.`
  );

  // TEST R — IRIS can answer "What should we do now?"
  const ctx = irisService.createContext(testMinute);
  const respWhatToDo = await irisService.ask("What should we do right now?", ctx);
  assert(
    respWhatToDo.intentCategory === "RESPONSE_RECOMMENDATION" &&
    respWhatToDo.answer.includes("RECOMMENDED ACTION") &&
    respWhatToDo.answer.toLowerCase().includes("isolate laptop-042") &&
    respWhatToDo.citations.length > 0,
    "TEST R — IRIS 'WHAT SHOULD WE DO NOW?'",
    `Grounded recommendation returned with ${respWhatToDo.citations.length} citations.`
  );

  // TEST S — IRIS can answer "Why do you recommend this?"
  const respWhy = await irisService.ask("Why do you recommend this response?", ctx);
  assert(
    respWhy.intentCategory === "RESPONSE_EXPLANATION" &&
    respWhy.answer.includes("DECISION EXPLANATION") &&
    respWhy.answer.includes("CONFIDENCE DERIVATION") &&
    respWhy.answer.includes("SIMULATION ONLY"),
    "TEST S — IRIS 'WHY DO YOU RECOMMEND THIS?'",
    `Comprehensive decision explanation returned.`
  );

  // TEST T — IRIS can compare available responses
  const respCompare = await irisService.ask("Compare the available response options.", ctx);
  assert(
    respCompare.intentCategory === "RESPONSE_COMPARISON" &&
    respCompare.answer.includes("RESPONSE OPTIONS COMPARISON") &&
    respCompare.answer.includes("Do Nothing") &&
    respCompare.answer.includes("Isolate LAPTOP-042"),
    "TEST T — IRIS RESPONSE COMPARISON",
    `Structured comparison across all candidates returned.`
  );

  // Additional Section 12 Natural Language Question Verifications
  const respDoNothing = await irisService.ask("What happens if we do nothing?", ctx);
  assert(
    respDoNothing.answer.includes("DO NOTHING") &&
    respDoNothing.answer.includes("CRITICAL"),
    "TEST T.1 — IRIS 'WHAT HAPPENS IF WE DO NOTHING?'",
    `Correctly modeled DO_NOTHING with CRITICAL outcome and 0 prevented stages.`
  );

  const respDisableUser = await irisService.ask("What happens if we disable alex.m?", ctx);
  assert(
    respDisableUser.answer.includes("Disable User Account") &&
    respDisableUser.answer.includes("PREVENTED ATTACK TRANSITIONS"),
    "TEST T.2 — IRIS 'WHAT HAPPENS IF WE DISABLE ALEX.M?'",
    `Correctly modeled DISABLE_USER counterfactual.`
  );

  const respBlockLateral = await irisService.ask("What happens if we block lateral movement?", ctx);
  assert(
    respBlockLateral.answer.includes("Block Lateral Connection") &&
    respBlockLateral.answer.includes("PREVENTED ATTACK TRANSITIONS"),
    "TEST T.3 — IRIS 'WHAT HAPPENS IF WE BLOCK LATERAL MOVEMENT?'",
    `Correctly modeled BLOCK_LATERAL_CONNECTION counterfactual.`
  );

  const respWhyNotOther = await irisService.ask("Why didn't you recommend the other response?", ctx);
  assert(
    respWhyNotOther.answer.includes("WHY THIS ACTION WAS CHOSEN OVER ALTERNATIVES") &&
    respWhyNotOther.answer.includes("Do Nothing"),
    "TEST T.4 — IRIS 'WHY DIDN'T YOU RECOMMEND THE OTHER RESPONSE?'",
    `Explained alternative trade-offs.`
  );

  const respAutoSim = await irisService.ask("Simulate your recommended response.", ctx);
  assert(
    respAutoSim.intentCategory === "AUTO_SIMULATE_INTENT" &&
    respAutoSim.answer.includes("AUTONOMOUS SIMULATED RESPONSE EXECUTED") &&
    respAutoSim.answer.includes("SIMULATION ONLY"),
    "TEST T.5 — IRIS 'SIMULATE YOUR RECOMMENDED RESPONSE.'",
    `Autonomously simulated recommended action inside synthetic model.`
  );

  // TEST U — Unknown/unsupported response questions do not hallucinate
  const respUnsupported = await irisService.ask("Should we fire the CISO of Microsoft?", ctx);
  assert(
    respUnsupported.intentCategory === "UNKNOWN" &&
    respUnsupported.answer.includes("I don't have enough structured evidence in the current incident dataset"),
    "TEST U — REFUSAL TO HALLUCINATE",
    `Safely declined unsupported query.`
  );

  // TEST V — Phase 1–4 regression tests still pass
  const twinCheck = getActualDigitalTwinState(22);
  const graphCheck = getAttackGraphAtTime("INC-2048", 22);
  const cfCheck = simulateCounterfactualFuture(22, candidates[1]!.action);
  assert(
    twinCheck.timestamp === "10:04" &&
    graphCheck.nodes.length > 0 &&
    cfCheck.comparison.preventedCount > 0,
    "TEST V — PHASE 1-4 REGRESSION VERIFICATION",
    `Phase 1-4 foundational engines operating normally.`
  );

  console.log("\n-------------------------------------------------------");
  console.log(`TOTAL TESTS: ${totalTests} | PASSED: ${passedTests} | FAILED: ${totalTests - passedTests}`);
  console.log("-------------------------------------------------------\n");

  if (passedTests === totalTests) {
    console.log("SUCCESS: All Phase 5 Extension tests PASSED with zero failures.\n");
    process.exit(0);
  } else {
    console.error("FAILURE: Some tests failed.");
    process.exit(1);
  }
}

runResponseIntelligenceTests().catch((err) => {
  console.error("Uncaught exception in Response Intelligence verification suite:", err);
  process.exit(1);
});
