import type { DigitalTwinSnapshot, SnapshotDiff } from "@/types/digitalTwin";

/**
 * Compares two snapshots of the digital twin at distinct points in time (Requirement 23).
 * Identifies transitions, new compromises, recovered assets, new network connections,
 * processes, sessions, and newly surfaced forensic evidence.
 */
export function compareSnapshots(
  snapshotA: DigitalTwinSnapshot,
  snapshotB: DigitalTwinSnapshot
): SnapshotDiff {
  // Stage change
  const stageChange =
    snapshotA.incidentStage !== snapshotB.incidentStage
      ? { from: snapshotA.incidentStage, to: snapshotB.incidentStage }
      : null;

  // Risk change
  const riskChange =
    snapshotA.riskLevel !== snapshotB.riskLevel
      ? { from: snapshotA.riskLevel, to: snapshotB.riskLevel }
      : null;

  // Asset compromises
  const compromisedA = new Set(
    snapshotA.assets
      .filter((a) => a.status === "COMPROMISED")
      .map((a) => a.id)
  );
  const compromisedB = new Set(
    snapshotB.assets
      .filter((a) => a.status === "COMPROMISED")
      .map((a) => a.id)
  );

  const newCompromisedAssets: string[] = [];
  for (const assetId of compromisedB) {
    if (!compromisedA.has(assetId)) {
      newCompromisedAssets.push(assetId);
    }
  }

  const recoveredAssets: string[] = [];
  for (const assetId of compromisedA) {
    if (!compromisedB.has(assetId)) {
      recoveredAssets.push(assetId);
    }
  }

  // Network Connections diff
  const connIdsA = new Set(snapshotA.networkConnections.map((c) => c.id));
  const newConnections = snapshotB.networkConnections.filter((c) => !connIdsA.has(c.id));

  // Processes diff
  const procIdsA = new Set(snapshotA.processes.map((p) => p.id));
  const newProcesses = snapshotB.processes.filter((p) => !procIdsA.has(p.id));

  // Sessions diff
  const sessIdsA = new Set(snapshotA.activeSessions.map((s) => s.id));
  const newSessions = snapshotB.activeSessions.filter((s) => !sessIdsA.has(s.id));

  // Evidence diff
  const evIdsA = new Set(snapshotA.evidence.map((e) => e.id));
  const newEvidence = snapshotB.evidence.filter((e) => !evIdsA.has(e.id));

  // Users diff
  const userCompA = new Set(
    snapshotA.users.filter((u) => u.status === "COMPROMISED").map((u) => u.id)
  );
  const newCompromisedUsers = snapshotB.users
    .filter((u) => u.status === "COMPROMISED" && !userCompA.has(u.id))
    .map((u) => u.username);

  return {
    timestampA: snapshotA.timestamp,
    timestampB: snapshotB.timestamp,
    stageChange,
    riskChange,
    newCompromisedAssets,
    recoveredAssets,
    newConnections,
    newProcesses,
    newSessions,
    newEvidence,
    newCompromisedUsers,
  };
}
