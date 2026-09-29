import {
  getActualDigitalTwinState,
  getKnownSecurityState,
  getSnapshotAtTime,
} from "./services/digitalTwinService";
import { compareSnapshots } from "./services/comparisonService";
import { timestampToMinute, minuteToTimestamp } from "./services/stateReconstruction";
import { demoTimelineEvents } from "./data/incidentData";

function assert(condition: boolean, message: string) {
  if (!condition) {
    console.error(`❌ ASSERTION FAILED: ${message}`);
    process.exit(1);
  }
  console.log(`✅ ${message}`);
}

console.log("=== RUNNING PHASE 2 DIGITAL TWIN + FORENSIC TIMELINE TEST SUITE ===\n");

// TEST A: At 09:42 - Digital Twin should contain healthy organization
console.log("--- TEST A: At 09:42, Digital Twin healthy organization ---");
const twin0942 = getActualDigitalTwinState("09:42");
assert(twin0942.minute === 0, "09:42 corresponds to minute 0");
assert(twin0942.assets.find(a => a.id === "LAPTOP-042")?.status !== "COMPROMISED", "LAPTOP-042 is not compromised at 09:42");
assert(twin0942.assets.find(a => a.id === "SERVER-03")?.status === "HEALTHY", "SERVER-03 is HEALTHY at 09:42");
assert(twin0942.assets.find(a => a.id === "DB-PROD-01")?.status === "HEALTHY", "DB-PROD-01 is HEALTHY at 09:42");
assert(twin0942.assets.find(a => a.id === "FILE-SRV-01")?.status === "HEALTHY", "FILE-SRV-01 is HEALTHY at 09:42");

// TEST B: At 09:47 - No server compromise, no database compromise, no file server compromise
console.log("\n--- TEST B: At 09:47, No server, DB, or file server compromise ---");
const twin0947 = getActualDigitalTwinState("09:47");
assert(twin0947.assets.find(a => a.id === "SERVER-03")?.status === "HEALTHY", "SERVER-03 is HEALTHY at 09:47");
assert(twin0947.assets.find(a => a.id === "DB-PROD-01")?.status === "HEALTHY", "DB-PROD-01 is HEALTHY at 09:47");
assert(twin0947.assets.find(a => a.id === "FILE-SRV-01")?.status === "HEALTHY", "FILE-SRV-01 is HEALTHY at 09:47");
assert(!twin0947.compromisedAssets.includes("SERVER-03"), "SERVER-03 is not in compromisedAssets at 09:47");

// TEST C: At 10:00 - alex.m compromised, LAPTOP-042 compromised
console.log("\n--- TEST C: At 10:00, alex.m and LAPTOP-042 compromised ---");
const twin1000 = getActualDigitalTwinState("10:00");
const alexUser = twin1000.users.find(u => u.username === "alex.m");
const laptopAsset = twin1000.assets.find(a => a.id === "LAPTOP-042");
assert(alexUser?.status === "COMPROMISED", "User alex.m is COMPROMISED at 10:00");
assert(laptopAsset?.status === "COMPROMISED", "LAPTOP-042 is COMPROMISED at 10:00");
assert(twin1000.compromisedAssets.includes("LAPTOP-042"), "LAPTOP-042 is in compromisedAssets at 10:00");

// TEST D: At 10:04 - Suspicious PowerShell process exists
console.log("\n--- TEST D: At 10:04, Suspicious PowerShell process exists ---");
const twin1004 = getActualDigitalTwinState("10:04");
const psProc = twin1004.processes.find(p => p.name === "powershell.exe");
assert(psProc !== undefined, "PowerShell process exists at 10:04");
assert(psProc?.status === "SUSPICIOUS", "PowerShell process status is SUSPICIOUS");
assert(psProc?.assetId === "LAPTOP-042", "PowerShell process is running on LAPTOP-042");

// TEST E: At 10:07 - SERVER-03 compromised, connection LAPTOP-042 -> SERVER-03 exists
console.log("\n--- TEST E: At 10:07, SERVER-03 compromised and connection exists ---");
const twin1007 = getActualDigitalTwinState("10:07");
assert(twin1007.assets.find(a => a.id === "SERVER-03")?.status === "COMPROMISED", "SERVER-03 is COMPROMISED at 10:07");
const lateralConn = twin1007.networkConnections.find(
  c => c.sourceId === "LAPTOP-042" && c.destinationId === "SERVER-03"
);
assert(lateralConn !== undefined, "Network connection LAPTOP-042 -> SERVER-03 exists at 10:07");
assert(lateralConn?.relationshipType === "LATERAL_MOVEMENT", "Connection relationship is LATERAL_MOVEMENT");

// Check connection does NOT exist before 10:07
const twinBefore1007 = getActualDigitalTwinState("10:06");
assert(
  !twinBefore1007.networkConnections.some(c => c.sourceId === "LAPTOP-042" && c.destinationId === "SERVER-03"),
  "Connection LAPTOP-042 -> SERVER-03 does NOT exist at 10:06"
);

// TEST F: At 10:12 - DB-PROD-01 compromised
console.log("\n--- TEST F: At 10:12, DB-PROD-01 compromised ---");
const twin1012 = getActualDigitalTwinState("10:12");
assert(twin1012.assets.find(a => a.id === "DB-PROD-01")?.status === "COMPROMISED", "DB-PROD-01 is COMPROMISED at 10:12");
const dbConn = twin1012.networkConnections.find(
  c => c.sourceId === "SERVER-03" && c.destinationId === "DB-PROD-01"
);
assert(dbConn !== undefined, "Connection SERVER-03 -> DB-PROD-01 exists at 10:12");
assert(twin1012.dataResources.find(d => d.id === "DATA-CUST-VAULT")?.isExposed === true, "DATA-CUST-VAULT is exposed at 10:12");

// TEST G: At 10:18 - FILE-SRV-01 affected
console.log("\n--- TEST G: At 10:18, FILE-SRV-01 affected ---");
const twin1018 = getActualDigitalTwinState("10:18");
assert(twin1018.assets.find(a => a.id === "FILE-SRV-01")?.status === "COMPROMISED", "FILE-SRV-01 is COMPROMISED at 10:18");
assert(twin1018.dataResources.find(d => d.id === "DATA-CONF-FILES")?.isExposed === true, "DATA-CONF-FILES is exposed at 10:18");

// TEST H: At 09:47 - Database evidence after 09:47 must NOT appear in knownSecurityStateAtTime
console.log("\n--- TEST H: At 09:47, Database evidence after 09:47 NOT in knownSecurityState ---");
const known0947 = getKnownSecurityState("09:47");
assert(
  !known0947.evidence.some(e => e.type === "DATABASE"),
  "No DATABASE evidence appears in knownSecurityState at 09:47"
);
assert(
  !known0947.evidence.some(e => timestampToMinute(e.timestamp) > 5),
  "No evidence timestamped after 09:47 appears in knownSecurityState at 09:47"
);

// TEST I: Rewind from 10:18 -> 09:47. All future state disappears.
console.log("\n--- TEST I: Rewind from 10:18 -> 09:47, all future state disappears ---");
const twinRewound = getActualDigitalTwinState("09:47");
assert(twinRewound.assets.find(a => a.id === "DB-PROD-01")?.status === "HEALTHY", "DB-PROD-01 returns to HEALTHY on rewind to 09:47");
assert(twinRewound.assets.find(a => a.id === "SERVER-03")?.status === "HEALTHY", "SERVER-03 returns to HEALTHY on rewind to 09:47");
assert(twinRewound.assets.find(a => a.id === "FILE-SRV-01")?.status === "HEALTHY", "FILE-SRV-01 returns to HEALTHY on rewind to 09:47");
assert(!twinRewound.networkConnections.some(c => c.sourceId === "SERVER-03"), "All connections from SERVER-03 disappear on rewind");
assert(!twinRewound.processes.some(p => p.name === "psql.exe" || p.name === "archive.exe"), "Future processes psql and archive disappear on rewind");

// TEST J: Move forward again to 10:18. State is reconstructed correctly.
console.log("\n--- TEST J: Move forward again to 10:18, state reconstructed correctly ---");
const twinForwardAgain = getActualDigitalTwinState("10:18");
assert(twinForwardAgain.assets.find(a => a.id === "DB-PROD-01")?.status === "COMPROMISED", "DB-PROD-01 compromised again on forward navigation");
assert(twinForwardAgain.assets.find(a => a.id === "FILE-SRV-01")?.status === "COMPROMISED", "FILE-SRV-01 compromised again on forward navigation");
assert(twinForwardAgain.networkConnections.some(c => c.destinationId === "DB-PROD-01"), "Connection to DB-PROD-01 restored on forward navigation");

// TEST K: Snapshot determinism: Calling getSnapshotAtTime(10:07) twice returns equivalent state.
console.log("\n--- TEST K: Snapshot determinism ---");
const snap1 = getSnapshotAtTime("10:07");
const snap2 = getSnapshotAtTime("10:07");
assert(JSON.stringify(snap1) === JSON.stringify(snap2), "getSnapshotAtTime(10:07) is strictly deterministic");

// TEST L: Snapshot comparison: Compare 09:47 and 10:07.
console.log("\n--- TEST L: Snapshot comparison 09:47 vs 10:07 ---");
const diff = compareSnapshots(twin0947, twin1007);
assert(diff.newCompromisedAssets.includes("SERVER-03"), "compareSnapshots detects new SERVER-03 compromise");
assert(diff.newCompromisedAssets.includes("LAPTOP-042"), "compareSnapshots detects new LAPTOP-042 compromise");
assert(diff.newConnections.some(c => c.destinationId === "SERVER-03"), "compareSnapshots detects new connection to SERVER-03");
assert(diff.stageChange?.from === "SUSPICIOUS_ACTIVITY" && diff.stageChange?.to === "LATERAL_MOVEMENT", "compareSnapshots detects stage change from SUSPICIOUS_ACTIVITY to LATERAL_MOVEMENT");
assert(diff.riskChange?.from === "MEDIUM" && diff.riskChange?.to === "HIGH", "compareSnapshots detects risk change from MEDIUM to HIGH");

// TEST M: Bookmark creation and jump simulation
console.log("\n--- TEST M: Bookmark jump simulation ---");
const testBookmark = { id: "test-bmk", timestamp: "09:47", minute: 5, name: "First Detection", createdAt: new Date().toISOString() };
const jumpedMinute = testBookmark.minute;
const twinAtBookmark = getActualDigitalTwinState(jumpedMinute);
assert(twinAtBookmark.timestamp === "09:47", "Jumping to bookmark sets time to 09:47");

// TEST N: Step forward / step back minute verification
console.log("\n--- TEST N: Step forward/back minute calculation ---");
const minBase = 18;
const minStepFwd = Math.min(42, minBase + 1);
const minStepBack = Math.max(0, minBase - 1);
assert(minStepFwd === 19 && minuteToTimestamp(minStepFwd) === "10:01", "Step forward from 10:00 reaches 10:01");
assert(minStepBack === 17 && minuteToTimestamp(minStepBack) === "09:59", "Step back from 10:00 reaches 09:59");

// TEST O: Next/previous event navigation verification
console.log("\n--- TEST O: Next / previous event navigation ---");
const currentMin = 5; // 09:47
const nextEvt = demoTimelineEvents.find(e => (e.minute ?? 0) > currentMin);
assert(nextEvt?.timestamp === "10:00", "Next event after 09:47 is 10:00 (Account Compromised)");
const prevEvents = demoTimelineEvents.filter(e => (e.minute ?? 0) < 18);
const prevEvt = prevEvents[prevEvents.length - 1];
assert(prevEvt?.timestamp === "10:04" || prevEvt?.timestamp === "09:47", "Previous event calculation identifies correct prior anchor");

console.log("\n🎉 ALL PHASE 2 TESTS (TEST A THROUGH TEST O) PASSED WITH ZERO ERRORS!");
