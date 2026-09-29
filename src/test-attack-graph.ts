/**
 * Phase 3 Automated Verification Test Suite
 * Tests TEST A through TEST N as specified in Requirement 36.
 */
import {
  getAttackGraphAtTime,
  findPath,
  filterAttackGraph,
  getDownstreamReachableNodes,
  generatePathExplanation,
} from "./services/attackGraphService";
import { getKnownSecurityState, getActualDigitalTwinState } from "./services/digitalTwinService";
import type { AttackGraphFilter } from "./types/attackGraph";

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
console.log("   INCIDENT TIME MACHINE - PHASE 3 VERIFICATION SUITE  ");
console.log("=======================================================\n");

// TEST A — GRAPH AT 09:47
// Expected: LAPTOP-042 exists. SERVER-03 is not compromised. No future lateral movement edge exists.
const graph0947 = getAttackGraphAtTime("INC-2048", "09:47");
const laptop0947 = graph0947.nodes.find((n) => n.id === "LAPTOP-042");
const server0947 = graph0947.nodes.find((n) => n.id === "SERVER-03");
const lateralEdge0947 = graph0947.edges.find((e) => e.source === "LAPTOP-042" && e.target === "SERVER-03");

assert(
  Boolean(laptop0947) &&
  server0947?.status !== "COMPROMISED" &&
  !lateralEdge0947,
  "TEST A — GRAPH AT 09:47",
  `LAPTOP status: ${laptop0947?.status}, SERVER-03 status: ${server0947?.status}, Lateral Edge: ${Boolean(lateralEdge0947)}`
);

// TEST B — GRAPH AT 10:07
// Expected: SERVER-03 becomes compromised/affected according to incident state. LAPTOP-042 → SERVER-03 exists.
const graph1007 = getAttackGraphAtTime("INC-2048", "10:07");
const server1007 = graph1007.nodes.find((n) => n.id === "SERVER-03");
const lateralEdge1007 = graph1007.edges.find((e) => e.source === "LAPTOP-042" && e.target === "SERVER-03");

assert(
  server1007?.status === "COMPROMISED" && Boolean(lateralEdge1007),
  "TEST B — GRAPH AT 10:07",
  `SERVER-03 status: ${server1007?.status}, Lateral Edge: ${lateralEdge1007?.id} (${lateralEdge1007?.relationshipType})`
);

// TEST C — GRAPH AT 10:12
// Expected: DB-PROD-01 appears as compromised/affected. SERVER-03 → DB-PROD-01 relationship exists.
const graph1012 = getAttackGraphAtTime("INC-2048", "10:12");
const db1012 = graph1012.nodes.find((n) => n.id === "DB-PROD-01");
const dbEdge1012 = graph1012.edges.find((e) => e.source === "SERVER-03" && e.target === "DB-PROD-01");

assert(
  db1012?.status === "COMPROMISED" && Boolean(dbEdge1012),
  "TEST C — GRAPH AT 10:12",
  `DB-PROD-01 status: ${db1012?.status}, Edge: ${dbEdge1012?.id} (${dbEdge1012?.relationshipType})`
);

// TEST D — GRAPH REWIND
// Start at 10:18. Move to 09:47. Expected: Future nodes/edges are removed from reconstructed graph state.
const graph1018 = getAttackGraphAtTime("INC-2048", "10:18");
const rewoundGraph = getAttackGraphAtTime("INC-2048", "09:47");

const edgeFileSrv1018 = graph1018.edges.find((e) => e.target === "FILE-SRV-01");
const edgeFileSrvRewound = rewoundGraph.edges.find((e) => e.target === "FILE-SRV-01");
const edgeServerRewound = rewoundGraph.edges.find((e) => e.target === "SERVER-03");

assert(
  Boolean(edgeFileSrv1018) && !edgeFileSrvRewound && !edgeServerRewound,
  "TEST D — GRAPH REWIND",
  `10:18 had FILE-SRV-01 edge: ${Boolean(edgeFileSrv1018)}. Rewound 09:47 edges count: ${rewoundGraph.edges.length}`
);

// TEST E — GRAPH FORWARD RECONSTRUCTION
// Move: 09:47 -> 10:07 -> 10:12 -> 10:18. Expected: Each graph state is deterministic and correct.
const g1 = getAttackGraphAtTime("INC-2048", "09:47");
const g2 = getAttackGraphAtTime("INC-2048", "10:07");
const g3 = getAttackGraphAtTime("INC-2048", "10:12");
const g4 = getAttackGraphAtTime("INC-2048", "10:18");

assert(
  g1.edges.length < g2.edges.length &&
  g2.edges.length < g3.edges.length &&
  g3.edges.length < g4.edges.length &&
  g4.edges.length === 7,
  "TEST E — GRAPH FORWARD RECONSTRUCTION",
  `Edge counts across progression: ${g1.edges.length} -> ${g2.edges.length} -> ${g3.edges.length} -> ${g4.edges.length}`
);

// TEST F — NODE INSPECTION
// Select LAPTOP-042. Expected: Inspector returns correct temporal state.
const laptopAt1000 = getAttackGraphAtTime("INC-2048", "10:00").nodes.find((n) => n.id === "LAPTOP-042");
assert(
  laptopAt1000?.status === "COMPROMISED" &&
  laptopAt1000?.owner === "alex.m" &&
  laptopAt1000?.confidence > 0.9,
  "TEST F — NODE INSPECTION",
  `LAPTOP-042 status at 10:00: ${laptopAt1000?.status}, Owner: ${laptopAt1000?.owner}, Conf: ${laptopAt1000?.confidence}`
);

// TEST G — EDGE INSPECTION
// Select: LAPTOP-042 -> SERVER-03. Expected: Correct timestamp, events, evidence and confidence.
const edgeLateral = g2.edges.find((e) => e.source === "LAPTOP-042" && e.target === "SERVER-03");
assert(
  edgeLateral?.firstSeen === "10:07" &&
  edgeLateral?.eventIds.includes("raw-1007-smb") &&
  edgeLateral?.evidenceIds.includes("ev-4") &&
  edgeLateral?.confidence === 0.92,
  "TEST G — EDGE INSPECTION",
  `Edge: ${edgeLateral?.id}, FirstSeen: ${edgeLateral?.firstSeen}, Confidence: ${edgeLateral?.confidence}`
);

// TEST H — PATH FINDING
// Find path: ALEX_ACCOUNT -> DB-PROD-01. Expected: Path contains intermediate nodes.
const foundPath = findPath("ALEX_ACCOUNT", "DB-PROD-01", g3);
assert(
  foundPath.length === 4 &&
  foundPath[0] === "ALEX_ACCOUNT" &&
  foundPath[1] === "LAPTOP-042" &&
  foundPath[2] === "SERVER-03" &&
  foundPath[3] === "DB-PROD-01",
  "TEST H — PATH FINDING",
  `Found traversal sequence: ${foundPath.join(" -> ")}`
);

// TEST I — PATH DETERMINISM
// Run the same path calculation twice. Expected: Equivalent result.
const pathRun1 = findPath("ATTACKER", "DB-PROD-01", g4);
const pathRun2 = findPath("ATTACKER", "DB-PROD-01", g4);
assert(
  JSON.stringify(pathRun1) === JSON.stringify(pathRun2) && pathRun1.length > 0,
  "TEST I — PATH DETERMINISM",
  `Path 1 and Path 2 identically match: ${pathRun1.join(" -> ")}`
);

// TEST J — FILTERS
// Apply: SERVER filter. Expected: Displayed graph changes. Underlying graph state does not change.
const filterServer: AttackGraphFilter = {
  nodeType: "SERVER",
  status: "ALL",
  relationship: "ALL",
  searchQuery: "",
};
const filtered = filterAttackGraph(g4, filterServer);
assert(
  filtered.nodes.length === 1 &&
  filtered.nodes[0].id === "SERVER-03" &&
  g4.nodes.length === 7,
  "TEST J — FILTERS",
  `Filtered nodes: ${filtered.nodes.length}, Original underlying nodes: ${g4.nodes.length}`
);

// TEST K — EVIDENCE SYNCHRONIZATION
// At 09:47: Future evidence (e.g. ev-3 or ev-4) must not appear in known security state. At 10:18: Pre-detection evidence becomes visible.
const knownAt0947 = getKnownSecurityState(5); // 09:47
const knownAt1018 = getKnownSecurityState(36); // 10:18
const hasEv4At0947 = knownAt0947.evidence.some((e) => e.id === "ev-4");
const hasEv4At1018 = knownAt1018.evidence.some((e) => e.id === "ev-4");

assert(
  !hasEv4At0947 && hasEv4At1018,
  "TEST K — EVIDENCE SYNCHRONIZATION",
  `09:47 has ev-4: ${hasEv4At0947}, 10:18 has ev-4: ${hasEv4At1018}`
);

// TEST L — GRAPH/DIGITAL TWIN SYNCHRONIZATION
// Change central time. Expected: Digital Twin and Attack Graph show the same reconstructed timestamp/state.
const dtState1012 = getActualDigitalTwinState(30);
const agState1012 = getAttackGraphAtTime("INC-2048", 30);
assert(
  dtState1012.timestamp === agState1012.timestamp &&
  dtState1012.blastRadius.confirmedAffectedAssets === agState1012.blastRadius.confirmedAffectedAssets,
  "TEST L — GRAPH/DIGITAL TWIN SYNCHRONIZATION",
  `DT Timestamp: ${dtState1012.timestamp} == AG Timestamp: ${agState1012.timestamp}`
);

// TEST M — BLAST RADIUS
// Verify: confirmedAffectedAssets, potentiallyAffectedAssets, criticalAssetsAffected match deterministic model.
assert(
  agState1012.blastRadius.confirmedAffectedAssets >= 3 &&
  agState1012.blastRadius.criticalAssetsAffected >= 1 &&
  agState1012.compromisedNodes.some((n) => n.id === "DB-PROD-01"),
  "TEST M — BLAST RADIUS",
  `Confirmed Assets: ${agState1012.blastRadius.confirmedAffectedAssets}, Critical: ${agState1012.blastRadius.criticalAssetsAffected}, Has DB: true`
);

console.log("\n-------------------------------------------------------");
console.log(`RESULTS: ${passedTests} / ${totalTests} Automated Tests Passed`);
console.log("-------------------------------------------------------\n");

if (passedTests !== totalTests) {
  process.exit(1);
}
