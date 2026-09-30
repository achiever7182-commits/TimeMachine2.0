import { getIncidentStateAtTime, minuteToTimestamp, timestampToMinute } from "./services/stateReconstruction";
import { calculateRisk } from "./services/riskEngine";
import { demoTimelineEvents } from "./data/incidentData";

function assert(condition: boolean, message: string) {
  if (!condition) {
    console.error(`❌ ASSERTION FAILED: ${message}`);
    process.exit(1);
  }
  console.log(`✅ ${message}`);
}

console.log("=== RUNNING PHASE 1 INCIDENT SIMULATION ENGINE VERIFICATION ===\n");

// TEST 1: Initial Pristine State (Reset / Pre-attack)
console.log("--- TEST 1: Reset / Normal initial state ---");
const stateInitial = getIncidentStateAtTime(0, { isInitialReset: true });
assert(stateInitial.timestamp === "09:42", "Initial timestamp is 09:42");
assert(stateInitial.stage === "NORMAL", "Initial stage is NORMAL");
assert(stateInitial.risk === "LOW", "Initial risk is LOW");
assert(stateInitial.compromisedAssetIds.length === 0, "No compromised assets at initial reset");
assert(stateInitial.completedEvents.length === 0, "No completed events at initial reset");

// TEST 2: Simulation Starts from 09:42
console.log("\n--- TEST 2: Start attack simulation at 09:42 ---");
const state0942 = getIncidentStateAtTime("09:42");
assert(state0942.minute === 0, "09:42 corresponds to minute 0");
assert(state0942.stage === "SUSPICIOUS_ACTIVITY", "Stage at 09:42 is SUSPICIOUS_ACTIVITY");
assert(state0942.risk === "MEDIUM", "Risk at 09:42 is MEDIUM");
assert(state0942.activeEvents.some(e => e.id === "evt-0942"), "Event 1 (Unusual Authentication) is active at 09:42");

// TEST 3: Reach 09:47 (Minute 5)
console.log("\n--- TEST 3: Reach 09:47 (First Detectable Opportunity) ---");
const state0947 = getIncidentStateAtTime("09:47");
assert(state0947.minute === 5, "09:47 corresponds to minute 5");
assert(state0947.stage === "SUSPICIOUS_ACTIVITY", "Stage at 09:47 is SUSPICIOUS_ACTIVITY");
assert(state0947.risk === "MEDIUM", "Risk at 09:47 is MEDIUM");
assert(state0947.activeEvents.some(e => e.id === "evt-0947"), "First detectable opportunity evt-0947 is active at 09:47");
assert(state0947.compromisedAssetIds.length === 0, "No assets compromised yet at 09:47");

// TEST 4: Reach 10:00 (Minute 18)
console.log("\n--- TEST 4: Reach 10:00 (Employee Account Compromised) ---");
const state1000 = getIncidentStateAtTime("10:00");
assert(state1000.minute === 18, "10:00 corresponds to minute 18");
assert(state1000.stage === "ACCOUNT_COMPROMISED", "Stage at 10:00 is ACCOUNT_COMPROMISED");
assert(state1000.risk === "HIGH", "Risk at 10:00 is HIGH");
assert(state1000.compromisedAssetIds.includes("LAPTOP-042"), "LAPTOP-042 is compromised at 10:00");
assert(state1000.compromisedUsers.some(u => u.username === "alex.m"), "alex.m is compromised at 10:00");

// TEST 5: Reach 10:07 (Minute 25)
console.log("\n--- TEST 5: Reach 10:07 (Internal Server Access) ---");
const state1007 = getIncidentStateAtTime("10:07");
assert(state1007.minute === 25, "10:07 corresponds to minute 25");
assert(state1007.stage === "LATERAL_MOVEMENT", "Stage at 10:07 is LATERAL_MOVEMENT");
assert(state1007.risk === "HIGH", "Risk at 10:07 is HIGH");
assert(state1007.compromisedAssetIds.includes("SERVER-03"), "SERVER-03 is affected/compromised at 10:07");
assert((state1007.activeAttackNodes.find(n => n.id === "SERVER-03")?.status as string) === "Compromised", "SERVER-03 attack node is Compromised at 10:07");

// TEST 6: Reach 10:12 (Minute 30)
console.log("\n--- TEST 6: Reach 10:12 (Database Access) ---");
const state1012 = getIncidentStateAtTime("10:12");
assert(state1012.minute === 30, "10:12 corresponds to minute 30");
assert(state1012.stage === "DATA_ACCESS", "Stage at 10:12 is DATA_ACCESS");
assert(state1012.risk === "CRITICAL", "Risk at 10:12 is CRITICAL");
assert(state1012.compromisedAssetIds.includes("DB-PROD-01"), "DB-PROD-01 is affected/compromised at 10:12");
assert((state1012.activeAttackNodes.find(n => n.id === "DB-PROD-01")?.status as string) === "Compromised", "DB-PROD-01 attack node is Compromised at 10:12");

// TEST 7 & 8: Reach 10:18 (Minute 36)
console.log("\n--- TEST 7 & 8: Reach 10:18 (Sensitive File Access Attempt) ---");
const state1018 = getIncidentStateAtTime("10:18");
assert(state1018.minute === 36, "10:18 corresponds to minute 36");
assert(state1018.stage === "DATA_ACCESS", "Stage at 10:18 is DATA_ACCESS");
assert(state1018.risk === "CRITICAL", "Risk at 10:18 is CRITICAL");
assert(state1018.compromisedAssetIds.includes("FILE-SRV-01"), "FILE-SRV-01 is affected at 10:18");

// TEST 9: REWIND from 10:18 to 09:47
console.log("\n--- TEST 9: Rewind from 10:18 back to 09:47 ---");
const stateRewound = getIncidentStateAtTime("09:47");
assert(stateRewound.minute === 5, "Rewound minute is 5 (09:47)");
assert(stateRewound.stage === "SUSPICIOUS_ACTIVITY", "Rewound stage returns to SUSPICIOUS_ACTIVITY");
assert(stateRewound.risk === "MEDIUM", "Rewound risk returns to MEDIUM");
assert(!stateRewound.compromisedAssetIds.includes("DB-PROD-01"), "Database access is removed / DB-PROD-01 is NOT compromised");
assert(!stateRewound.compromisedAssetIds.includes("SERVER-03"), "Server access is removed / SERVER-03 is NOT compromised");
assert(!stateRewound.compromisedAssetIds.includes("LAPTOP-042"), "Laptop compromise is removed / LAPTOP-042 is NOT compromised");
assert(stateRewound.assets.find(a => a.id === "SERVER-03")?.status === "HEALTHY", "SERVER-03 status is HEALTHY");
assert(stateRewound.assets.find(a => a.id === "DB-PROD-01")?.status === "HEALTHY", "DB-PROD-01 status is HEALTHY");
assert(stateRewound.assets.find(a => a.id === "LAPTOP-042")?.status === "HEALTHY", "LAPTOP-042 status is HEALTHY");
assert(stateRewound.activeAttackNodes.find(n => n.id === "SERVER-03")?.status === "Clean", "SERVER-03 attack node returns to Clean");
assert(stateRewound.activeAttackNodes.find(n => n.id === "DB-PROD-01")?.status === "Clean", "DB-PROD-01 attack node returns to Clean");

// Events after 09:47 must not be completed or active
assert(!stateRewound.completedEvents.some(e => (e.minute ?? 0) > 5), "No events after 09:47 are in completedEvents");
assert(!stateRewound.activeEvents.some(e => (e.minute ?? 0) > 5), "No events after 09:47 are in activeEvents");

// TEST 10: RESET
console.log("\n--- TEST 10: Reset back to pristine initial state ---");
const stateReset = getIncidentStateAtTime(0, { isInitialReset: true });
assert(stateReset.timestamp === "09:42", "Reset timestamp is 09:42");
assert(stateReset.stage === "NORMAL", "Reset stage is NORMAL");
assert(stateReset.risk === "LOW", "Reset risk is LOW");
assert(stateReset.compromisedAssetIds.length === 0, "Compromised assets count is 0");
assert(stateReset.completedEvents.length === 0, "Completed events count is 0");

console.log("\n🎉 ALL 10 TESTS PASSED SUCCESSFULLY! ENGINE VERIFICATION COMPLETE.");
