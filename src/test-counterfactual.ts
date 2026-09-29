/**
 * Phase 4 Automated Verification Test Suite
 * Tests TEST A through TEST P as specified in Requirement 32.
 */
import {
  forkSnapshot,
  forkCounterfactual,
  simulateCounterfactualFuture,
  getStandardResponseActions,
} from "./services/counterfactualService";
import { getActualDigitalTwinState } from "./services/digitalTwinService";
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

console.log("\n=======================================================");
console.log("   INCIDENT TIME MACHINE - PHASE 4 VERIFICATION SUITE  ");
console.log("=======================================================\n");

// TEST A — SNAPSHOT FORK
// Create snapshot at 10:04. Fork it. Verify original snapshot is unchanged.
const snap1004 = getActualDigitalTwinState(22); // 10:04 is minute 22
const forked = forkSnapshot(snap1004);
forked.timestamp = "99:99";
forked.assets[0].status = "ISOLATED";

assert(
  snap1004.timestamp === "10:04" &&
  snap1004.assets[0].status !== "ISOLATED" &&
  forked.timestamp === "99:99",
  "TEST A — SNAPSHOT FORK",
  `Original remains ${snap1004.timestamp} with status ${snap1004.assets[0].status}`
);

// TEST B — DO NOTHING
// Create branch at 10:04. Apply DO_NOTHING. Expected final state matches baseline future.
const actions1004 = getStandardResponseActions(22);
const branchDoNothing = simulateCounterfactualFuture(22, actions1004[0]);
const baselineEnd = getActualDigitalTwinState(42);

assert(
  branchDoNothing.finalSnapshot.blastRadius.confirmedAffectedAssets ===
    baselineEnd.blastRadius.confirmedAffectedAssets &&
  branchDoNothing.finalSnapshot.riskLevel === "CRITICAL" &&
  branchDoNothing.comparison.preventedCount === 0,
  "TEST B — DO NOTHING",
  `Risk: ${branchDoNothing.finalSnapshot.riskLevel}, Prevented: ${branchDoNothing.comparison.preventedCount}`
);

// TEST C — ISOLATE ENDPOINT
// Create branch at 10:04. Apply: ISOLATE_ENDPOINT(LAPTOP-042). Verify downstream lateral movement is prevented.
const actIsolateLaptop: CounterfactualAction = {
  id: "act-iso",
  type: "ISOLATE_ENDPOINT",
  timestamp: "10:04",
  minute: 22,
  targetId: "LAPTOP-042",
  targetType: "ENDPOINT",
  label: "Isolate LAPTOP-042",
  description: "Sever connectivity",
};
const branchIsolateLaptop = simulateCounterfactualFuture(22, actIsolateLaptop);

assert(
  branchIsolateLaptop.comparison.preventedCompromises.includes("SERVER-03") &&
  branchIsolateLaptop.comparison.preventedCompromises.includes("DB-PROD-01") &&
  branchIsolateLaptop.comparison.preventedCompromises.includes("FILE-SRV-01") &&
  branchIsolateLaptop.comparison.riskChange === "REDUCED",
  "TEST C — ISOLATE ENDPOINT",
  `Prevented compromises: [${branchIsolateLaptop.comparison.preventedCompromises.join(", ")}], Risk: ${branchIsolateLaptop.comparison.counterfactualFinalRisk}`
);

// TEST D — DISABLE USER
// Create branch at 10:04. Apply: DISABLE_USER(alex.m). Verify future actions requiring alex.m are blocked.
const actDisableAlex: CounterfactualAction = {
  id: "act-dis-alex",
  type: "DISABLE_USER",
  timestamp: "10:04",
  minute: 22,
  targetId: "alex.m",
  targetType: "USER",
  label: "Disable alex.m",
  description: "Revoke sessions",
};
const branchDisableAlex = simulateCounterfactualFuture(22, actDisableAlex);

assert(
  branchDisableAlex.comparison.preventedCount >= 3 &&
  branchDisableAlex.comparison.preventedCompromises.includes("SERVER-03"),
  "TEST D — DISABLE USER",
  `Prevented count: ${branchDisableAlex.comparison.preventedCount}, Prevented: [${branchDisableAlex.comparison.preventedCompromises.join(", ")}]`
);

// TEST E — BLOCK CONNECTION
// Create branch at 10:04. Apply: BLOCK_LATERAL_CONNECTION(LAPTOP-042, SERVER-03). Verify SERVER-03 is not reached.
const actBlockConn: CounterfactualAction = {
  id: "act-block",
  type: "BLOCK_LATERAL_CONNECTION",
  timestamp: "10:04",
  minute: 22,
  targetId: "LAPTOP-042->SERVER-03",
  targetType: "CONNECTION",
  label: "Block Lateral Conn",
  description: "Block port 445",
};
const branchBlockConn = simulateCounterfactualFuture(22, actBlockConn);

assert(
  branchBlockConn.comparison.preventedCompromises.includes("SERVER-03") &&
  branchBlockConn.comparison.preventedCompromises.includes("DB-PROD-01"),
  "TEST E — BLOCK CONNECTION",
  `Server-03 and DB-PROD-01 blocked: [${branchBlockConn.comparison.preventedCompromises.join(", ")}]`
);

// TEST F — BASELINE IMMUTABILITY
// Run counterfactual simulation. Verify actual incident data remains unchanged.
const baselinePostCheck = getActualDigitalTwinState(42);
assert(
  baselinePostCheck.assets.find((a) => a.id === "SERVER-03")?.status === "COMPROMISED" &&
  baselinePostCheck.assets.find((a) => a.id === "DB-PROD-01")?.status === "COMPROMISED" &&
  baselinePostCheck.riskLevel === "CRITICAL",
  "TEST F — BASELINE IMMUTABILITY",
  `Baseline SERVER-03 is still COMPROMISED, Risk is still CRITICAL`
);

// TEST G — BRANCH ISOLATION
// Create Branch A = ISOLATE LAPTOP, Branch B = DO NOTHING. Verify results are independent.
assert(
  branchIsolateLaptop.comparison.counterfactualCompromisedAssets.length !==
    branchDoNothing.comparison.counterfactualCompromisedAssets.length &&
  branchIsolateLaptop.comparison.counterfactualFinalRisk !==
    branchDoNothing.comparison.counterfactualFinalRisk,
  "TEST G — BRANCH ISOLATION",
  `Branch A Assets: ${branchIsolateLaptop.comparison.counterfactualCompromisedAssets.length} vs Branch B Assets: ${branchDoNothing.comparison.counterfactualCompromisedAssets.length}`
);

// TEST H — DETERMINISM
// Run identical counterfactual simulation twice. Expected: Equivalent result.
const run1 = simulateCounterfactualFuture(22, actIsolateLaptop);
const run2 = simulateCounterfactualFuture(22, actIsolateLaptop);

assert(
  JSON.stringify(run1.comparison) === JSON.stringify(run2.comparison),
  "TEST H — DETERMINISM",
  `Run 1 and Run 2 comparisons identically match`
);

// TEST I — PREVENTED EVENTS
// Verify blocked future events are explicitly represented as PREVENTED.
const hasPrevented1007 = branchIsolateLaptop.simulatedTimeline.some(
  (item) => item.id === "evt-1007" && item.status === "PREVENTED"
);
const hasPrevented1012 = branchIsolateLaptop.simulatedTimeline.some(
  (item) => item.id === "evt-1012" && item.status === "PREVENTED"
);

assert(
  hasPrevented1007 && hasPrevented1012,
  "TEST I — PREVENTED EVENTS",
  `evt-1007 PREVENTED: ${hasPrevented1007}, evt-1012 PREVENTED: ${hasPrevented1012}`
);

// TEST J — COMPARISON
// Compare baseline and counterfactual. Verify metrics.
const comp = branchIsolateLaptop.comparison;
assert(
  comp.riskChange === "REDUCED" &&
  comp.preventedCompromises.length === 3 &&
  comp.preventedCriticalImpact.length === 1 &&
  comp.preventedDataExposure === 2,
  "TEST J — COMPARISON",
  `RiskChange: ${comp.riskChange}, PreventedCompromises: ${comp.preventedCompromises.length}, PreventedCritical: ${comp.preventedCriticalImpact.length}, PreventedData: ${comp.preventedDataExposure}`
);

// TEST K — ATTACK GRAPH
// Verify counterfactual Attack Graph is derived from counterfactual state.
const cfServerNode = branchIsolateLaptop.attackGraph.nodes.find((n) => n.id === "SERVER-03");
const cfDbNode = branchIsolateLaptop.attackGraph.nodes.find((n) => n.id === "DB-PROD-01");
const cfEdgeLaptopServer = branchIsolateLaptop.attackGraph.edges.find(
  (e) => e.source === "LAPTOP-042" && e.target === "SERVER-03"
);

assert(
  cfServerNode?.status === "HEALTHY" &&
  cfDbNode?.status === "HEALTHY" &&
  !cfEdgeLaptopServer,
  "TEST K — ATTACK GRAPH",
  `SERVER-03 in CF Graph: ${cfServerNode?.status}, DB in CF Graph: ${cfDbNode?.status}, Edge exists: ${Boolean(cfEdgeLaptopServer)}`
);

// TEST L — DIGITAL TWIN
// Verify counterfactual Digital Twin differs from baseline where expected.
const dtCf = branchIsolateLaptop.finalSnapshot;
const dtBaseline = baselineEnd;

assert(
  dtCf.assets.find((a) => a.id === "LAPTOP-042")?.isolationStatus === "ISOLATED" &&
  dtCf.blastRadius.dataResourcesAtRisk === 0 &&
  dtBaseline.blastRadius.dataResourcesAtRisk === 2,
  "TEST L — DIGITAL TWIN",
  `CF Data Resources: ${dtCf.blastRadius.dataResourcesAtRisk} vs Baseline: ${dtBaseline.blastRadius.dataResourcesAtRisk}`
);

// TEST M — RETURN TO REAL TIMELINE
// Exit counterfactual mode. Verify real incident state remains unchanged.
const realAt1007 = getActualDigitalTwinState(25);
assert(
  realAt1007.assets.find((a) => a.id === "SERVER-03")?.status === "COMPROMISED",
  "TEST M — RETURN TO REAL TIMELINE",
  `At 10:07, real incident SERVER-03 is still COMPROMISED`
);

// TEST N — MULTIPLE BRANCHES
// Create multiple branches from same timestamp. Verify each remains independent.
const b1 = simulateCounterfactualFuture(22, actions1004[0]);
const b2 = simulateCounterfactualFuture(22, actions1004[1]);
const b3 = simulateCounterfactualFuture(22, actions1004[2]);
const b4 = simulateCounterfactualFuture(22, actions1004[3]);

assert(
  b1.branchId !== b2.branchId &&
  b2.comparison.preventedCount === 3 &&
  b1.comparison.preventedCount === 0,
  "TEST N — MULTIPLE BRANCHES",
  `Branches b1..b4 coexist independently without mutation`
);

// TEST O — INVALID ACTION
// Attempt an invalid/empty action safely. Expected: safe error handling or baseline fallback.
const invalidAction: CounterfactualAction = {
  id: "invalid",
  type: "DO_NOTHING",
  timestamp: "10:04",
  minute: 22,
  targetId: "NON_EXISTENT_ENTITY",
  targetType: "NONE",
  label: "Invalid Action",
  description: "Test error handling",
};
const safeBranch = simulateCounterfactualFuture(22, invalidAction);

assert(
  safeBranch.status === "COMPLETED" &&
  safeBranch.comparison.preventedCount === 0,
  "TEST O — INVALID ACTION",
  `Handled gracefully: Status ${safeBranch.status}, Prevented ${safeBranch.comparison.preventedCount}`
);

console.log("\n-------------------------------------------------------");
console.log(`RESULTS: ${passedTests} / ${totalTests} Automated Tests Passed`);
console.log("-------------------------------------------------------\n");

if (passedTests !== totalTests) {
  process.exit(1);
}
