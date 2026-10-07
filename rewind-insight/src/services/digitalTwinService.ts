import {
  initialSyntheticConnections,
  initialSyntheticProcesses,
  initialSyntheticSessions,
  syntheticDataResources,
} from "@/data/digitalTwinData";
import { demoAssets, demoUsers } from "@/data/organization";
import {
  getIncidentStateAtTime,
  minuteToTimestamp,
  timestampToMinute,
} from "./stateReconstruction";
import { calculateRisk } from "./riskEngine";
import type {
  ActiveSession,
  AssetTemporalState,
  BlastRadiusMetrics,
  DataResource,
  DigitalTwinSnapshot,
  NetworkConnection,
  ProcessActivity,
  UserTemporalState,
} from "@/types/digitalTwin";
import type { Severity } from "@/types/incident";

/**
 * Reconstructs the complete objective reality of the synthetic enterprise (ACME Corporation)
 * at any given minute (0 to 42) or timestamp (09:42 to 10:24).
 */
export function getActualDigitalTwinState(
  timestampOrMinute: string | number
): DigitalTwinSnapshot {
  const minute =
    typeof timestampOrMinute === "number"
      ? Math.max(0, Math.min(42, Math.floor(timestampOrMinute)))
      : timestampToMinute(timestampOrMinute);

  const timestamp = minuteToTimestamp(minute);
  const baseIncidentState = getIncidentStateAtTime(minute);

  // 1. Reconstruct Active Network Connections
  const activeConnections: NetworkConnection[] = initialSyntheticConnections.filter(
    (conn) => timestampToMinute(conn.firstSeen) <= minute
  );

  // 2. Reconstruct Active Sessions
  const activeSessions: ActiveSession[] = initialSyntheticSessions.filter(
    (sess) => timestampToMinute(sess.startedAt) <= minute
  );

  // 3. Reconstruct Active Processes
  const activeProcesses: ProcessActivity[] = initialSyntheticProcesses.filter(
    (proc) => timestampToMinute(proc.timestamp) <= minute
  );

  // 4. Reconstruct Data Resources & Exposure
  const dataResources: DataResource[] = syntheticDataResources.map((res) => {
    const isAccessed = Boolean(res.accessedAt && timestampToMinute(res.accessedAt) <= minute);
    return {
      ...res,
      isExposed: isAccessed,
      accessedAt: isAccessed ? res.accessedAt : undefined,
      accessedBy: isAccessed ? res.accessedBy : undefined,
    };
  });

  // 5. Reconstruct Users Temporal State
  const users: UserTemporalState[] = demoUsers.map((user) => {
    const isAlex = user.username === "alex.m";
    const userSessions = activeSessions
      .filter((s) => s.userId === user.id)
      .map((s) => s.id);

    let status = user.status as any;
    if (isAlex) {
      if (minute >= 18) {
        status = "COMPROMISED";
      } else if (minute >= 0) {
        status = "SUSPICIOUS";
      } else {
        status = "ACTIVE";
      }
    }

    return {
      id: user.id,
      username: user.username,
      displayName: user.displayName,
      department: user.department,
      role: user.role,
      privilegeLevel: user.privilegeLevel,
      status,
      currentSessions: userSessions,
      lastAuthentication: isAlex && minute >= 2 ? "09:44" : "08:15",
      authenticationSource: isAlex && minute >= 0 ? "185.220.101.5 (External)" : "Internal SSO",
      associatedDeviceIds: user.associatedAssetIds,
      compromisedAt: isAlex && minute >= 18 ? "10:00" : undefined,
    };
  });

  // 6. Reconstruct Assets Temporal State
  const assets: AssetTemporalState[] = demoAssets.map((asset) => {
    let status: AssetTemporalState["status"] = "HEALTHY";
    let risk: Severity = "LOW";
    let compromiseTime: string | undefined = undefined;

    if (asset.id === "LAPTOP-042") {
      if (minute >= 18) {
        status = "COMPROMISED";
        risk = "HIGH";
        compromiseTime = "10:00";
      } else if (minute >= 2) {
        status = "MONITORED";
        risk = "MEDIUM";
      }
    } else if (asset.id === "SERVER-03") {
      if (minute >= 25) {
        status = "COMPROMISED";
        risk = "HIGH";
        compromiseTime = "10:07";
      } else if (minute >= 18) {
        status = "MONITORED";
        risk = "LOW";
      }
    } else if (asset.id === "DB-PROD-01") {
      if (minute >= 30) {
        status = "COMPROMISED";
        risk = "CRITICAL";
        compromiseTime = "10:12";
      }
    } else if (asset.id === "FILE-SRV-01") {
      if (minute >= 36) {
        status = "COMPROMISED";
        risk = "CRITICAL";
        compromiseTime = "10:18";
      }
    } else if (asset.id === "VPN-GW-01") {
      if (minute >= 0) {
        status = "SUSPICIOUS";
        risk = "MEDIUM";
      }
    }

    const assetProcesses = activeProcesses
      .filter((p) => p.assetId === asset.id)
      .map((p) => p.id);

    const assetConnections = activeConnections
      .filter((c) => c.sourceId === asset.id || c.destinationId === asset.id)
      .map((c) => c.id);

    const assetEvidenceCount = baseIncidentState.availableEvidence.filter(
      (e) => e.assetId === asset.id
    ).length;

    return {
      id: asset.id,
      name: asset.name,
      type: asset.type,
      hostname: asset.hostname ?? asset.id,
      owner: asset.owner ?? "Corporate IT",
      status,
      risk,
      criticality: asset.criticality,
      ipAddress: asset.ipAddress,
      firstSeen: asset.firstSeen,
      lastSeen: `${timestamp}:00`,
      compromiseTime,
      isolationStatus: "CONNECTED",
      activeProcessIds: assetProcesses,
      networkConnectionIds: assetConnections,
      currentUser: asset.id === "LAPTOP-042" && minute >= 18 ? "alex.m" : undefined,
      evidenceCount: assetEvidenceCount,
    };
  });

  // 7. Blast Radius Calculation
  const confirmedAffected = assets.filter((a) => a.status === "COMPROMISED");
  const potentiallyAffected = assets.filter((a) => a.status === "SUSPICIOUS" || a.status === "MONITORED");
  const criticalAffected = assets.filter((a) => a.status === "COMPROMISED" && a.criticality === "CRITICAL");
  const usersAffected = users.filter((u) => u.status === "COMPROMISED").length;
  const dataResourcesAtRisk = dataResources.filter((d) => d.isExposed).length;

  const blastRadius: BlastRadiusMetrics = {
    confirmedAffectedAssets: confirmedAffected.length,
    potentiallyAffectedAssets: potentiallyAffected.length,
    criticalAssetsAffected: criticalAffected.length,
    usersAffected,
    dataResourcesAtRisk,
    details: [
      { label: "Compromised Identities", count: usersAffected, severity: usersAffected > 0 ? "HIGH" : "LOW" },
      { label: "Confirmed Assets", count: confirmedAffected.length, severity: confirmedAffected.length > 2 ? "CRITICAL" : confirmedAffected.length > 0 ? "HIGH" : "LOW" },
      { label: "Exposed Data Stores", count: dataResourcesAtRisk, severity: dataResourcesAtRisk > 0 ? "CRITICAL" : "LOW" },
      { label: "Active Attacker Sessions", count: activeSessions.length, severity: activeSessions.length > 2 ? "HIGH" : "LOW" },
    ],
  };

  return {
    timestamp,
    minute,
    incidentStage: baseIncidentState.stage,
    riskLevel: baseIncidentState.risk,
    users,
    assets,
    networkConnections: activeConnections,
    activeSessions,
    processes: activeProcesses,
    dataResources,
    attackNodes: baseIncidentState.activeAttackNodes,
    attackEdges: baseIncidentState.activeAttackEdges,
    activeEvents: baseIncidentState.activeEvents,
    completedEvents: baseIncidentState.completedEvents,
    upcomingEvents: baseIncidentState.upcomingEvents,
    evidence: baseIncidentState.availableEvidence,
    affectedAssets: baseIncidentState.affectedAssetIds,
    compromisedAssets: baseIncidentState.compromisedAssetIds,
    confidence: 0.94,
    blastRadius,
  };
}

/**
 * Reconstructs what the SOC / Security Operations Team KNEW at that specific timestamp (Requirement 17).
 * Prevents future undetected events (like lateral movement or db access before detection)
 * from being presented as known evidence to the analyst when rewinding.
 */
export function getKnownSecurityState(
  timestampOrMinute: string | number
): DigitalTwinSnapshot {
  const actualState = getActualDigitalTwinState(timestampOrMinute);
  const minute = actualState.minute;

  // The SOC alert threshold:
  // Before 10:24 (formal detection), the SOC only had piecemeal alerts (IdP anomaly at 09:47, PowerShell at 10:04).
  // Database access at 10:12 was silent until correlation at 10:24.
  const knownEvidence = actualState.evidence.filter((ev) => {
    const evMin = timestampToMinute(ev.timestamp);
    if (ev.type === "DATABASE" && minute < 42) {
      // Database query was not known until SIEM correlation at 10:24
      return false;
    }
    if (ev.type === "PROCESS" && ev.actor === "archive.exe" && minute < 42) {
      // File staging was not discovered until post-correlation triage
      return false;
    }
    return evMin <= minute;
  });

  const knownAssets = actualState.assets.map((asset) => {
    // If minute < 25, SERVER-03 compromise was unknown to SOC
    if (asset.id === "SERVER-03" && minute < 25) {
      return { ...asset, status: "HEALTHY" as const, risk: "LOW" as const };
    }
    // If minute < 42, DB-PROD-01 compromise was not confirmed in SOC view
    if (asset.id === "DB-PROD-01" && minute < 42) {
      return { ...asset, status: "HEALTHY" as const, risk: "LOW" as const };
    }
    // If minute < 42, FILE-SRV-01 was not confirmed
    if (asset.id === "FILE-SRV-01" && minute < 42) {
      return { ...asset, status: "HEALTHY" as const, risk: "LOW" as const };
    }
    return asset;
  });

  return {
    ...actualState,
    assets: knownAssets,
    evidence: knownEvidence,
    confidence: minute >= 42 ? 0.98 : minute >= 18 ? 0.72 : 0.45,
  };
}

/**
 * Returns a deterministic snapshot of the digital twin at timestamp (Requirement 22).
 * Calling getSnapshotAtTime with the same timestamp returns strictly equivalent data.
 */
export function getSnapshotAtTime(
  timestampOrMinute: string | number
): DigitalTwinSnapshot {
  return getActualDigitalTwinState(timestampOrMinute);
}
