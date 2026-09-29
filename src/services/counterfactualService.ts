import {
  getActualDigitalTwinState,
} from "./digitalTwinService";
import {
  getAttackGraphAtTime,
} from "./attackGraphService";
import {
  minuteToTimestamp,
  timestampToMinute,
} from "./stateReconstruction";
import { demoTimelineEvents } from "@/data/incidentData";
import type {
  CounterfactualAction,
  CounterfactualActionType,
  CounterfactualBranch,
  CounterfactualComparison,
  CounterfactualTimelineItem,
  PreventedEventDetail,
} from "@/types/counterfactual";
import type {
  DigitalTwinSnapshot,
  AssetTemporalState,
  UserTemporalState,
  NetworkConnection,
  ActiveSession,
  ProcessActivity,
  DataResource,
  BlastRadiusMetrics,
} from "@/types/digitalTwin";
import type {
  AttackGraphEdge,
  AttackGraphNode,
  AttackGraphState,
  AttackPath,
} from "@/types/attackGraph";
import type { Severity, IncidentStage } from "@/types/incident";

/**
 * Deep copies a DigitalTwinSnapshot to guarantee complete branch immutability (Requirement 7 & 8).
 */
export function forkSnapshot(snapshot: DigitalTwinSnapshot): DigitalTwinSnapshot {
  return JSON.parse(JSON.stringify(snapshot));
}

/**
 * Creates an isolated counterfactual branch from a snapshot and an action (Requirement 8).
 */
export function forkCounterfactual(
  snapshot: DigitalTwinSnapshot,
  action: CounterfactualAction,
  incidentId = "INC-2048"
): CounterfactualBranch {
  return simulateCounterfactualFuture(snapshot.minute, action, incidentId);
}

/**
 * Replays future events and applies deterministic response action effect rules (Requirement 10 & 11).
 * Purely deterministic: given identical base timestamp and action, output is strictly equivalent.
 */
export function simulateCounterfactualFuture(
  baseMinute: number,
  action: CounterfactualAction,
  incidentId = "INC-2048"
): CounterfactualBranch {
  const baseTimestamp = minuteToTimestamp(baseMinute);
  const baseSnapshot = getActualDigitalTwinState(baseMinute);
  const forkedSnapshot = forkSnapshot(baseSnapshot);

  // Baseline future at end of incident (Minute 42 = 10:24)
  const baselineFinalSnapshot = getActualDigitalTwinState(42);
  const baselineFinalAttackGraph = getAttackGraphAtTime(incidentId, 42);

  // 1. Evaluate Prevented Events & Causal Chain
  const preventedEvents: PreventedEventDetail[] = [];
  const simulatedTimeline: CounterfactualTimelineItem[] = [];

  // Add historical events leading up to intervention
  for (const evt of demoTimelineEvents) {
    if (evt.minute <= baseMinute) {
      simulatedTimeline.push({
        id: evt.id,
        time: evt.timestamp,
        minute: evt.minute,
        title: evt.title,
        description: evt.description,
        category: evt.category,
        status: "ORIGINAL",
        affectedAssets: evt.affectedAssetIds,
      });
    }
  }

  // Insert Simulated Response Action into Branch Timeline
  if (action.type !== "DO_NOTHING") {
    simulatedTimeline.push({
      id: `action-${action.id}`,
      time: action.timestamp,
      minute: action.minute,
      title: `[RESPONSE ACTION] ${action.label}`,
      description: action.description,
      category: "INCIDENT_ALERT",
      status: "RESPONSE_ACTION",
      affectedAssets: action.targetId !== "NONE" ? [action.targetId] : [],
    });
  }

  // Flags representing alternate reality state
  let isLaptopIsolated = action.type === "ISOLATE_ENDPOINT" && action.targetId === "LAPTOP-042";
  let isAlexUserDisabled = action.type === "DISABLE_USER" && (action.targetId === "alex.m" || action.targetId === "usr-alex-m");
  let isLateralConnBlocked = action.type === "BLOCK_LATERAL_CONNECTION" &&
    (action.targetId.includes("SERVER-03") || action.targetId.includes("LAPTOP-042") || action.targetId === "conn-laptop-server");

  // Replay future events from (baseMinute .. 42]
  for (const evt of demoTimelineEvents) {
    if (evt.minute > baseMinute) {
      let isPrevented = false;
      let reason = "";
      let causalTrigger = "";

      if (evt.id === "evt-1007") {
        // Lateral movement to SERVER-03
        if (isLaptopIsolated) {
          isPrevented = true;
          reason = "LAPTOP-042 was isolated at " + action.timestamp + ", severing outbound network connectivity.";
          causalTrigger = "ISOLATE_ENDPOINT(LAPTOP-042)";
        } else if (isLateralConnBlocked) {
          isPrevented = true;
          reason = "Lateral network connection between LAPTOP-042 and SERVER-03 was blocked by boundary firewall rule.";
          causalTrigger = "BLOCK_LATERAL_CONNECTION";
        } else if (isAlexUserDisabled) {
          isPrevented = true;
          reason = "Compromised identity alex.m was disabled at " + action.timestamp + "; Kerberos ticket validation failed.";
          causalTrigger = "DISABLE_USER(alex.m)";
        }
      } else if (evt.id === "evt-1012") {
        // Database Access to DB-PROD-01
        // DB-PROD-01 is accessed FROM SERVER-03
        const server03Compromised = !isLaptopIsolated && !isLateralConnBlocked && !isAlexUserDisabled;
        if (!server03Compromised) {
          isPrevented = true;
          reason = "SERVER-03 was never compromised; attacker has no pivoting foothold to execute database queries.";
          causalTrigger = "CAUSAL_DEPENDENCY(SERVER-03 unreached)";
        }
      } else if (evt.id === "evt-1018") {
        // Sensitive File Access on FILE-SRV-01
        const server03Compromised = !isLaptopIsolated && !isLateralConnBlocked && !isAlexUserDisabled;
        if (!server03Compromised) {
          isPrevented = true;
          reason = "FILE-SRV-01 was never accessed because the upstream pivot host SERVER-03 was secured.";
          causalTrigger = "CAUSAL_DEPENDENCY(SERVER-03 unreached)";
        }
      }

      if (isPrevented) {
        const detail: PreventedEventDetail = {
          eventId: evt.id,
          originalTime: evt.timestamp,
          title: evt.title,
          category: evt.category,
          targetAsset: evt.affectedAssetIds[evt.affectedAssetIds.length - 1],
          reason,
          causalTrigger,
        };
        preventedEvents.push(detail);

        simulatedTimeline.push({
          id: evt.id,
          time: evt.timestamp,
          minute: evt.minute,
          title: `${evt.title} (PREVENTED)`,
          description: reason,
          category: evt.category,
          status: "PREVENTED",
          affectedAssets: evt.affectedAssetIds,
          preventedDetail: detail,
        });
      } else {
        simulatedTimeline.push({
          id: evt.id,
          time: evt.timestamp,
          minute: evt.minute,
          title: evt.title,
          description: evt.description,
          category: evt.category,
          status: "ALLOWED",
          affectedAssets: evt.affectedAssetIds,
        });
      }
    }
  }

  // 2. Reconstruct Counterfactual Digital Twin Final Snapshot (at Minute 42)
  const finalAssets: AssetTemporalState[] = baselineFinalSnapshot.assets.map((asset) => {
    // If laptop isolated
    if (asset.id === "LAPTOP-042") {
      if (isLaptopIsolated) {
        return {
          ...asset,
          status: "COMPROMISED", // historically compromised at 10:00, but isolated
          isolationStatus: "ISOLATED",
          risk: "LOW",
        };
      }
    }

    // Downstream targets prevented from compromise
    const isPreventedTarget = preventedEvents.some((p) => p.targetAsset === asset.id);
    if (isPreventedTarget) {
      return {
        ...asset,
        status: "HEALTHY",
        risk: "LOW",
        compromiseTime: undefined,
        activeProcessIds: [],
        networkConnectionIds: [],
      };
    }

    return { ...asset };
  });

  const finalUsers: UserTemporalState[] = baselineFinalSnapshot.users.map((user) => {
    if (user.username === "alex.m" && isAlexUserDisabled) {
      return {
        ...user,
        status: "DISABLED",
        currentSessions: [],
      };
    }
    return { ...user };
  });

  // Filter connections: if source/dest isolated or blocked
  const finalConnections: NetworkConnection[] = baselineFinalSnapshot.networkConnections.filter(
    (conn) => {
      if (isLaptopIsolated && (conn.sourceId === "LAPTOP-042" || conn.destinationId === "LAPTOP-042")) {
        return false;
      }
      if (isLateralConnBlocked && conn.sourceId === "LAPTOP-042" && conn.destinationId === "SERVER-03") {
        return false;
      }
      // If SERVER-03 was not compromised, drop its outbound connections to DB and File server
      const serverCompromised = finalAssets.find((a) => a.id === "SERVER-03")?.status === "COMPROMISED";
      if (!serverCompromised && conn.sourceId === "SERVER-03") {
        return false;
      }
      return true;
    }
  );

  // Filter processes
  const finalProcesses: ProcessActivity[] = baselineFinalSnapshot.processes.filter((proc) => {
    const asset = finalAssets.find((a) => a.id === proc.assetId);
    return asset?.status !== "HEALTHY";
  });

  // Filter exposed data resources
  const finalDataResources: DataResource[] = baselineFinalSnapshot.dataResources.map((res) => {
    const parentAsset = finalAssets.find((a) => a.id === res.assetId);
    const isExposed = parentAsset?.status === "COMPROMISED" || parentAsset?.status === "AFFECTED";
    return {
      ...res,
      isExposed,
      accessedAt: isExposed ? res.accessedAt : undefined,
    };
  });

  // Calculate final blast radius metrics
  const confirmedAffected = finalAssets.filter((a) => a.status === "COMPROMISED");
  const potentiallyAffected = finalAssets.filter((a) => a.status === "SUSPICIOUS" || a.status === "MONITORED");
  const criticalAffected = finalAssets.filter(
    (a) => a.status === "COMPROMISED" && a.criticality === "CRITICAL"
  );
  const usersAffected = finalUsers.filter((u) => u.status === "COMPROMISED").length;
  const dataResourcesAtRisk = finalDataResources.filter((d) => d.isExposed).length;

  let finalStage: IncidentStage = "CONTAINED";
  let finalRisk: Severity = "LOW";

  if (action.type === "DO_NOTHING") {
    finalStage = "INCIDENT_DETECTED";
    finalRisk = "CRITICAL";
  } else if (confirmedAffected.length >= 3 || criticalAffected.length > 0) {
    finalStage = "DATA_ACCESS";
    finalRisk = "CRITICAL";
  } else if (confirmedAffected.length === 2) {
    finalStage = "LATERAL_MOVEMENT";
    finalRisk = "HIGH";
  } else if (confirmedAffected.length === 1) {
    finalStage = "CONTAINED";
    finalRisk = "MEDIUM";
  } else {
    finalStage = "CONTAINED";
    finalRisk = "LOW";
  }

  const finalBlastRadius: BlastRadiusMetrics = {
    confirmedAffectedAssets: confirmedAffected.length,
    potentiallyAffectedAssets: potentiallyAffected.length,
    criticalAssetsAffected: criticalAffected.length,
    usersAffected,
    dataResourcesAtRisk,
    details: [
      { label: "Compromised Identities", count: usersAffected, severity: usersAffected > 0 ? "HIGH" : "LOW" },
      { label: "Confirmed Assets", count: confirmedAffected.length, severity: confirmedAffected.length > 0 ? "HIGH" : "LOW" },
      { label: "Exposed Data Stores", count: dataResourcesAtRisk, severity: dataResourcesAtRisk > 0 ? "CRITICAL" : "LOW" },
      { label: "Active Connections", count: finalConnections.length, severity: "LOW" },
    ],
  };

  const finalSnapshot: DigitalTwinSnapshot = {
    ...baselineFinalSnapshot,
    incidentStage: finalStage,
    riskLevel: finalRisk,
    assets: finalAssets,
    users: finalUsers,
    networkConnections: finalConnections,
    processes: finalProcesses,
    dataResources: finalDataResources,
    blastRadius: finalBlastRadius,
    affectedAssets: confirmedAffected.map((a) => a.id),
    compromisedAssets: confirmedAffected.map((a) => a.id),
  };

  // 3. Reconstruct Counterfactual Attack Graph
  const cfNodes: AttackGraphNode[] = baselineFinalAttackGraph.nodes.map((node) => {
    if (node.id === "LAPTOP-042" && isLaptopIsolated) {
      return { ...node, status: "ISOLATED", risk: "LOW" };
    }
    const isPrevented = preventedEvents.some((p) => p.targetAsset === node.id);
    if (isPrevented) {
      return { ...node, status: "HEALTHY", risk: "LOW", compromiseTime: undefined };
    }
    return { ...node };
  });

  const cfEdges: AttackGraphEdge[] = baselineFinalAttackGraph.edges.filter((edge) => {
    // If lateral movement is prevented
    if (edge.source === "LAPTOP-042" && edge.target === "SERVER-03") {
      return !isLaptopIsolated && !isLateralConnBlocked && !isAlexUserDisabled;
    }
    // If server never reached
    if (edge.source === "SERVER-03") {
      const serverCompromised = cfNodes.find((n) => n.id === "SERVER-03")?.status === "COMPROMISED";
      return serverCompromised;
    }
    return true;
  });

  // Active path in counterfactual
  const cfActiveNodeIds: string[] = ["ATTACKER", "ALEX_ACCOUNT"];
  if (!isAlexUserDisabled) cfActiveNodeIds.push("LAPTOP-042");
  if (!isLaptopIsolated && !isLateralConnBlocked && !isAlexUserDisabled) {
    cfActiveNodeIds.push("SERVER-03", "DB-PROD-01", "FILE-SRV-01");
  }

  const cfActiveEdgeIds = cfEdges
    .filter((e) => cfActiveNodeIds.includes(e.source) && cfActiveNodeIds.includes(e.target))
    .map((e) => e.id);

  const cfPrimaryPath: AttackPath = {
    pathId: "cf-path",
    name: "Counterfactual Attack Traversal",
    nodeIds: cfActiveNodeIds,
    edgeIds: cfActiveEdgeIds,
    startTime: "09:42",
    endTime: "10:24",
    status: isLaptopIsolated || isAlexUserDisabled || isLateralConnBlocked ? "STOPPED" : "ACTIVE",
    confidence: 0.96,
    severity: finalRisk,
    summary:
      preventedEvents.length > 0
        ? `Kill chain arrested at ${action.timestamp} by ${action.label}. ${preventedEvents.length} downstream attack transitions blocked.`
        : "Unmitigated credential traversal through ACME corporate environment.",
  };

  const cfAttackGraph: AttackGraphState = {
    timestamp: "10:24",
    minute: 42,
    incidentId,
    nodes: cfNodes,
    edges: cfEdges,
    entryPoint: cfNodes.find((n) => n.id === "ATTACKER") ?? null,
    compromisedNodes: cfNodes.filter((n) => n.status === "COMPROMISED"),
    suspiciousNodes: cfNodes.filter((n) => n.status === "SUSPICIOUS" || n.status === "MONITORED"),
    affectedNodes: cfNodes.filter((n) => n.status === "COMPROMISED" || n.status === "AFFECTED"),
    criticalNodes: cfNodes.filter(
      (n) => (n.status === "COMPROMISED" || n.status === "AFFECTED") && n.criticality === "CRITICAL"
    ),
    activePath: cfPrimaryPath,
    attackPaths: [cfPrimaryPath],
    blastRadius: finalBlastRadius,
    confidence: 0.95,
  };

  // 4. Calculate Measurable Impact Comparison
  const baselineCompromised = baselineFinalSnapshot.assets
    .filter((a) => a.status === "COMPROMISED")
    .map((a) => a.id);
  const cfCompromised = finalSnapshot.assets
    .filter((a) => a.status === "COMPROMISED")
    .map((a) => a.id);

  const preventedCompromises = baselineCompromised.filter((id) => !cfCompromised.includes(id));

  const baselineCritical = baselineFinalSnapshot.assets
    .filter((a) => a.status === "COMPROMISED" && a.criticality === "CRITICAL")
    .map((a) => a.id);
  const cfCritical = finalSnapshot.assets
    .filter((a) => a.status === "COMPROMISED" && a.criticality === "CRITICAL")
    .map((a) => a.id);

  const preventedCritical = baselineCritical.filter((id) => !cfCritical.includes(id));

  const baselineDataRisk = baselineFinalSnapshot.blastRadius.dataResourcesAtRisk;
  const cfDataRisk = finalBlastRadius.dataResourcesAtRisk;

  const baselineUsers = baselineFinalSnapshot.blastRadius.usersAffected;
  const cfUsers = finalBlastRadius.usersAffected;

  const riskChange: "REDUCED" | "UNCHANGED" | "INCREASED" =
    finalRisk === baselineFinalSnapshot.riskLevel
      ? "UNCHANGED"
      : finalRisk === "LOW" || (finalRisk === "MEDIUM" && baselineFinalSnapshot.riskLevel === "CRITICAL")
      ? "REDUCED"
      : "UNCHANGED";

  const comparison: CounterfactualComparison = {
    baselineFinalRisk: baselineFinalSnapshot.riskLevel,
    counterfactualFinalRisk: finalRisk,
    riskChange,
    baselineCompromisedAssets: baselineCompromised,
    counterfactualCompromisedAssets: cfCompromised,
    preventedCompromises,
    baselineCriticalAssets: baselineCritical,
    counterfactualCriticalAssets: cfCritical,
    preventedCriticalImpact: preventedCritical,
    baselineDataResourcesAtRisk: baselineDataRisk,
    counterfactualDataResourcesAtRisk: cfDataRisk,
    preventedDataExposure: Math.max(0, baselineDataRisk - cfDataRisk),
    baselineUsersAffected: baselineUsers,
    counterfactualUsersAffected: cfUsers,
    preventedUserImpact: Math.max(0, baselineUsers - cfUsers),
    baselineAttackPath: baselineFinalAttackGraph.activePath?.nodeIds ?? [],
    counterfactualAttackPath: cfActiveNodeIds,
    preventedEvents,
    preventedCount: preventedEvents.length,
  };

  return {
    branchId: `branch-${action.type.toLowerCase()}-${baseMinute}`,
    name: action.label,
    incidentId,
    baseTimestamp,
    baseMinute,
    baseSnapshot,
    action,
    simulatedTimeline,
    finalSnapshot,
    attackGraph: cfAttackGraph,
    comparison,
    status: "COMPLETED",
    createdAt: new Date().toISOString(),
  };
}

/**
 * Creates predefined standard response actions for the analyst at any timestamp.
 */
export function getStandardResponseActions(
  minute = 22 // 10:04 default
): CounterfactualAction[] {
  const timestamp = minuteToTimestamp(minute);
  return [
    {
      id: "act-do-nothing",
      type: "DO_NOTHING",
      timestamp,
      minute,
      targetId: "NONE",
      targetType: "NONE",
      label: "Option 0 — Do Nothing (Baseline)",
      description: "Allow the incident to proceed without active intervention. Observes unmitigated attack progression.",
    },
    {
      id: "act-isolate-laptop",
      type: "ISOLATE_ENDPOINT",
      timestamp,
      minute,
      targetId: "LAPTOP-042",
      targetType: "ENDPOINT",
      label: "Option A — Isolate LAPTOP-042",
      description: "Sever all inbound and outbound network connectivity for LAPTOP-042, stopping lateral movement attempts.",
    },
    {
      id: "act-disable-alex",
      type: "DISABLE_USER",
      timestamp,
      minute,
      targetId: "alex.m",
      targetType: "USER",
      label: "Option B — Disable User Account (alex.m)",
      description: "Revoke all Kerberos tickets, tokens, and active directory session rights for compromised user alex.m.",
    },
    {
      id: "act-block-lateral",
      type: "BLOCK_LATERAL_CONNECTION",
      timestamp,
      minute,
      targetId: "LAPTOP-042->SERVER-03",
      targetType: "CONNECTION",
      label: "Option C — Block Lateral Connection (LAPTOP-042 → SERVER-03)",
      description: "Enforce network firewall policy on port 445/5985 to drop all administrative traffic between workstation and server tiers.",
    },
  ];
}
