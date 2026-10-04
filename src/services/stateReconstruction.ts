import {
  demoAttackEdges,
  demoAttackNodes,
  demoEvidence,
  demoRawEvents,
  demoTimelineEvents,
} from "@/data/incidentData";
import { demoAssets, demoUsers } from "@/data/organization";
import { calculateRisk } from "@/services/riskEngine";
import type {
  Asset,
  AttackEdge,
  AttackNode,
  Evidence,
  IncidentStage,
  IncidentStatus,
  Severity,
  TimelineEvent,
  User,
} from "@/types/incident";

export interface ReconstructedIncidentState {
  timestamp: string;
  minute: number;
  stage: IncidentStage;
  risk: Severity;
  status: IncidentStatus;
  activeEvent: TimelineEvent | null;
  completedEvents: TimelineEvent[];
  activeEvents: TimelineEvent[];
  upcomingEvents: TimelineEvent[];
  allEvents: TimelineEvent[];
  compromisedAssetIds: string[];
  affectedAssetIds: string[];
  assets: Asset[];
  compromisedAssets: Asset[];
  activeAttackNodes: AttackNode[];
  activeAttackEdges: AttackEdge[];
  availableEvidence: Evidence[];
  currentUsers: User[];
  compromisedUsers: User[];
  currentSessions: {
    userId: string;
    assetId: string;
    establishedAt: string;
  }[];
}

/**
 * Converts HH:MM string to simulated minute offset from 09:42.
 */
export function timestampToMinute(timeStr: string): number {
  if (!timeStr || !timeStr.includes(":")) return 0;
  const parts = timeStr.split(":").map(Number);
  const hour = parts[0] ?? 9;
  const minute = parts[1] ?? 42;
  const baseMinutes = 9 * 60 + 42;
  const currentMinutes = hour * 60 + minute;
  return Math.max(0, Math.min(42, currentMinutes - baseMinutes));
}

/**
 * Converts simulated minute offset (0-42) to HH:MM format starting at 09:42.
 */
export function minuteToTimestamp(minute: number): string {
  const boundedMinute = Math.max(0, Math.min(42, Math.floor(minute)));
  const totalMinutes = 9 * 60 + 42 + boundedMinute;
  const h = Math.floor(totalMinutes / 60)
    .toString()
    .padStart(2, "0");
  const m = (totalMinutes % 60).toString().padStart(2, "0");
  return `${h}:${m}`;
}

/**
 * Primary state reconstruction function (Requirement 16 & 17).
 * Reconstructs the exact virtual state of the organization and incident at that moment in time.
 * If `isInitialReset` is true and minute === 0, returns the pristine NORMAL pre-attack state.
 */
export function getIncidentStateAtTime(
  timestampOrMinute: string | number,
  options?: { isInitialReset?: boolean; isContained?: boolean; isResolved?: boolean },
): ReconstructedIncidentState {
  const minute =
    typeof timestampOrMinute === "number"
      ? Math.max(0, Math.min(42, timestampOrMinute))
      : timestampToMinute(timestampOrMinute);

  const timestamp = minuteToTimestamp(minute);

  // Check pristine reset state
  if (options?.isInitialReset && minute === 0) {
    const assets = demoAssets.map((a) => ({ ...a, status: "HEALTHY" as const }));
    const users = demoUsers.map((u) => ({ ...u, status: "ACTIVE" as const }));
    return {
      timestamp: "09:42",
      minute: 0,
      stage: "NORMAL",
      risk: "LOW",
      status: "ACTIVE",
      activeEvent: null,
      completedEvents: [],
      activeEvents: [],
      upcomingEvents: [...demoTimelineEvents],
      allEvents: [...demoTimelineEvents],
      compromisedAssetIds: [],
      affectedAssetIds: [],
      assets,
      compromisedAssets: [],
      activeAttackNodes: demoAttackNodes.map((n) => ({
        ...n,
        status: "Clean" as const,
        risk: "Normal" as const,
      })),
      activeAttackEdges: [],
      availableEvidence: [],
      currentUsers: users,
      compromisedUsers: [],
      currentSessions: [],
    };
  }

  // Derive incident stage based on simulation minute
  let stage: IncidentStage = "NORMAL";
  let status: IncidentStatus = "ACTIVE";

  if (options?.isResolved) {
    stage = "RESOLVED";
    status = "RESOLVED";
  } else if (options?.isContained) {
    stage = "CONTAINED";
    status = "CONTAINED";
  } else if (minute >= 42) {
    // 10:24
    stage = "INCIDENT_DETECTED";
    status = "INVESTIGATING";
  } else if (minute >= 30) {
    // 10:12 - 10:23: Database access and file access attempts
    stage = "DATA_ACCESS";
    status = "ACTIVE";
  } else if (minute >= 25) {
    // 10:07 - 10:11: Lateral movement to internal server
    stage = "LATERAL_MOVEMENT";
    status = "ACTIVE";
  } else if (minute >= 18) {
    // 10:00 - 10:06: Employee account compromised and endpoint activity
    stage = "ACCOUNT_COMPROMISED";
    status = "ACTIVE";
  } else if (minute >= 0) {
    // 09:42 - 09:59: Suspicious activity (unusual auth, failed logins, detection opportunity)
    stage = "SUSPICIOUS_ACTIVITY";
    status = "ACTIVE";
  }

  const risk = calculateRisk(stage);

  // Classify events based on current time (Requirement 18: UPCOMING, ACTIVE, COMPLETED)
  const completedEvents: TimelineEvent[] = [];
  const activeEvents: TimelineEvent[] = [];
  const upcomingEvents: TimelineEvent[] = [];

  for (const event of demoTimelineEvents) {
    const eventMinute = event.minute ?? timestampToMinute(event.timestamp);
    if (eventMinute < minute) {
      completedEvents.push(event);
    } else if (eventMinute === minute) {
      activeEvents.push(event);
    } else {
      upcomingEvents.push(event);
    }
  }

  const activeEvent =
    activeEvents[0] ?? completedEvents[completedEvents.length - 1] ?? demoTimelineEvents[0];

  // Derive affected and compromised assets at this minute (Requirement 14)
  const compromisedAssetIds: string[] = [];
  const affectedAssetIds: string[] = [];

  // At 10:00 (minute 18): alex.m, LAPTOP-042
  if (minute >= 18) {
    compromisedAssetIds.push("LAPTOP-042");
    affectedAssetIds.push("LAPTOP-042");
  }

  // At 10:07 (minute 25): SERVER-03
  if (minute >= 25) {
    compromisedAssetIds.push("SERVER-03");
    if (!affectedAssetIds.includes("SERVER-03")) affectedAssetIds.push("SERVER-03");
  }

  // At 10:12 (minute 30): DB-PROD-01
  if (minute >= 30) {
    compromisedAssetIds.push("DB-PROD-01");
    if (!affectedAssetIds.includes("DB-PROD-01")) affectedAssetIds.push("DB-PROD-01");
  }

  // At 10:18 (minute 36): FILE-SRV-01
  if (minute >= 36) {
    compromisedAssetIds.push("FILE-SRV-01");
    if (!affectedAssetIds.includes("FILE-SRV-01")) affectedAssetIds.push("FILE-SRV-01");
  }

  // Map organization assets with updated status
  const assets: Asset[] = demoAssets.map((asset) => {
    if (compromisedAssetIds.includes(asset.id)) {
      return {
        ...asset,
        status: "COMPROMISED" as const,
        lastSeen: `${timestamp}:00`,
      };
    }
    return {
      ...asset,
      status: "HEALTHY" as const,
    };
  });

  const compromisedAssets = assets.filter((a) => compromisedAssetIds.includes(a.id));

  // Users state
  const isAlexCompromised = minute >= 18;
  const currentUsers: User[] = demoUsers.map((u) => {
    if (u.username === "alex.m" && isAlexCompromised) {
      return { ...u, status: "COMPROMISED" as const };
    }
    return { ...u, status: "ACTIVE" as const };
  });
  const compromisedUsers = currentUsers.filter((u) => u.status === "COMPROMISED");

  // Active Sessions
  const currentSessions = [];
  if (minute >= 18) {
    currentSessions.push({
      userId: "usr-alex-m",
      assetId: "LAPTOP-042",
      establishedAt: "10:00",
    });
  }
  if (minute >= 25) {
    currentSessions.push({
      userId: "usr-alex-m",
      assetId: "SERVER-03",
      establishedAt: "10:07",
    });
  }

  // Attack Nodes & Edges (Requirement 15 & Attack Graph view compatibility)
  const activeAttackNodes: AttackNode[] = demoAttackNodes.map((node) => {
    const activateMinute = node.activateAt ?? timestampToMinute(node.timestamp ?? "09:42");
    const isNodeActive = minute >= activateMinute;
    return {
      ...node,
      status: isNodeActive ? node.status : ("Clean" as const),
      risk: isNodeActive ? (node.risk ?? "Normal") : ("Normal" as const),
    };
  });

  const activeAttackEdges: AttackEdge[] = demoAttackEdges.filter((edge) => {
    const edgeMinute = timestampToMinute(edge.timestamp);
    return minute >= edgeMinute;
  });

  // Available Evidence up to this minute
  const availableEvidence: Evidence[] = demoEvidence.filter((ev) => {
    const evMinute = timestampToMinute(ev.timestamp);
    return minute >= evMinute;
  });

  return {
    timestamp,
    minute,
    stage,
    risk,
    status,
    activeEvent: activeEvent ?? null,
    completedEvents,
    activeEvents,
    upcomingEvents,
    allEvents: [...demoTimelineEvents],
    compromisedAssetIds,
    affectedAssetIds,
    assets,
    compromisedAssets,
    activeAttackNodes,
    activeAttackEdges,
    availableEvidence,
    currentUsers,
    compromisedUsers,
    currentSessions,
  };
}
