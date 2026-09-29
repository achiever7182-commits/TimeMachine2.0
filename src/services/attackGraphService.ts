import {
  getActualDigitalTwinState,
} from "./digitalTwinService";
import {
  minuteToTimestamp,
  timestampToMinute,
} from "./stateReconstruction";
import type {
  AttackGraphEdge,
  AttackGraphFilter,
  AttackGraphNode,
  AttackGraphNodeStatus,
  AttackGraphNodeType,
  AttackGraphState,
  AttackPath,
  AttackRelationshipType,
} from "@/types/attackGraph";
import type { Severity } from "@/types/incident";

// Master Node Blueprints
const MASTER_NODES: Omit<AttackGraphNode, "status" | "risk">[] = [
  {
    id: "ATTACKER",
    label: "Attacker (185.220.101.5)",
    type: "EXTERNAL_THREAT",
    criticality: "HIGH",
    firstSeen: "09:42",
    owner: "External / Unrecognized ASN9009",
    evidenceIds: ["ev-1"],
    eventIds: ["raw-0942-auth"],
    confidence: 0.99,
    tier: 0,
    metadata: { ip: "185.220.101.5", asn: "AS9009", location: "External Non-Corporate" },
  },
  {
    id: "ALEX_ACCOUNT",
    label: "alex.m (Finance Analyst)",
    type: "USER",
    criticality: "MEDIUM",
    firstSeen: "09:42",
    compromiseTime: "10:00",
    owner: "Finance Department",
    currentUser: "alex.m",
    evidenceIds: ["ev-1", "ev-2"],
    eventIds: ["raw-0942-auth", "raw-0944-success", "raw-1000-session"],
    confidence: 0.98,
    tier: 1,
    metadata: { role: "Financial Analyst", authMethod: "MFA Token / Kerberos" },
  },
  {
    id: "VPN-GW-01",
    label: "VPN-GW-01 (Edge Gateway)",
    type: "NETWORK_GATEWAY",
    criticality: "CRITICAL",
    firstSeen: "09:42",
    owner: "Infrastructure",
    evidenceIds: ["ev-1"],
    eventIds: ["raw-0942-auth", "raw-0944-failed-1"],
    confidence: 0.95,
    tier: 1,
    metadata: { ip: "10.0.0.1", port: 443 },
  },
  {
    id: "LAPTOP-042",
    label: "LAPTOP-042 (Workstation)",
    type: "ENDPOINT",
    criticality: "MEDIUM",
    firstSeen: "09:44",
    compromiseTime: "10:00",
    owner: "alex.m",
    currentUser: "alex.m",
    evidenceIds: ["ev-2", "ev-3"],
    eventIds: ["raw-1000-session", "raw-1004-ps"],
    confidence: 0.97,
    tier: 2,
    metadata: { os: "Windows 11 Enterprise", ip: "10.0.4.42" },
  },
  {
    id: "SERVER-03",
    label: "SERVER-03 (App Server)",
    type: "SERVER",
    criticality: "HIGH",
    firstSeen: "10:07",
    compromiseTime: "10:07",
    owner: "Engineering",
    evidenceIds: ["ev-4"],
    eventIds: ["raw-1007-smb"],
    confidence: 0.93,
    tier: 3,
    metadata: { role: "Internal Application Server", ip: "10.0.12.3", service: "WinRM / SMB" },
  },
  {
    id: "DB-PROD-01",
    label: "DB-PROD-01 (Customer DB)",
    type: "DATABASE",
    criticality: "CRITICAL",
    firstSeen: "10:12",
    compromiseTime: "10:12",
    owner: "Data Operations",
    evidenceIds: ["ev-5"],
    eventIds: ["raw-1012-db"],
    confidence: 0.96,
    tier: 4,
    metadata: { engine: "PostgreSQL 16", ip: "10.0.20.10", database: "acme_prod" },
  },
  {
    id: "FILE-SRV-01",
    label: "FILE-SRV-01 (Share)",
    type: "FILE_SERVER",
    criticality: "CRITICAL",
    firstSeen: "10:18",
    compromiseTime: "10:18",
    owner: "IT Corporate Storage",
    evidenceIds: ["ev-6"],
    eventIds: ["raw-1018-share"],
    confidence: 0.91,
    tier: 5,
    metadata: { protocol: "SMBv3", share: "//FILE-SRV-01/confidential", filesCount: 37 },
  },
];

// Master Edge Blueprints
const MASTER_EDGES: AttackGraphEdge[] = [
  {
    id: "edge-threat-alex",
    source: "ATTACKER",
    target: "ALEX_ACCOUNT",
    relationshipType: "AUTHENTICATED_TO",
    status: "ACTIVE",
    firstSeen: "09:42",
    lastSeen: "10:24",
    eventIds: ["raw-0942-auth", "raw-0944-success"],
    evidenceIds: ["ev-1", "ev-2"],
    confidence: 0.95,
    techniqueCategory: "T1078 Valid Accounts",
    description: "Attacker used stolen credentials to authenticate as employee alex.m.",
  },
  {
    id: "edge-alex-vpn",
    source: "ALEX_ACCOUNT",
    target: "VPN-GW-01",
    relationshipType: "CONNECTED_TO",
    status: "ACTIVE",
    firstSeen: "09:44",
    lastSeen: "10:24",
    eventIds: ["raw-0944-success"],
    evidenceIds: ["ev-1"],
    confidence: 0.94,
    techniqueCategory: "T1133 External Remote Services",
    description: "Compromised employee credentials authenticated through corporate VPN gateway.",
  },
  {
    id: "edge-vpn-laptop",
    source: "VPN-GW-01",
    target: "LAPTOP-042",
    relationshipType: "COMMUNICATED_WITH",
    status: "ACTIVE",
    firstSeen: "09:44",
    lastSeen: "10:24",
    eventIds: ["raw-0944-success", "raw-1000-session"],
    evidenceIds: ["ev-2"],
    confidence: 0.92,
    techniqueCategory: "T1021 Remote Services",
    description: "VPN ingress traffic routed to assigned workstation LAPTOP-042.",
  },
  {
    id: "edge-alex-laptop",
    source: "ALEX_ACCOUNT",
    target: "LAPTOP-042",
    relationshipType: "AUTHENTICATED_TO",
    status: "ACTIVE",
    firstSeen: "10:00",
    lastSeen: "10:24",
    eventIds: ["raw-1000-session"],
    evidenceIds: ["ev-2"],
    confidence: 0.98,
    techniqueCategory: "T1078.002 Domain Accounts",
    description: "Attacker established interactive desktop session on workstation LAPTOP-042.",
  },
  {
    id: "edge-laptop-server",
    source: "LAPTOP-042",
    target: "SERVER-03",
    relationshipType: "LATERALLY_MOVED_TO",
    status: "ACTIVE",
    firstSeen: "10:07",
    lastSeen: "10:24",
    eventIds: ["raw-1007-smb"],
    evidenceIds: ["ev-4"],
    confidence: 0.92,
    techniqueCategory: "T1021.002 SMB/Windows Admin Shares",
    description: "Lateral traversal from LAPTOP-042 to internal application server SERVER-03.",
  },
  {
    id: "edge-server-db",
    source: "SERVER-03",
    target: "DB-PROD-01",
    relationshipType: "QUERIED",
    status: "ACTIVE",
    firstSeen: "10:12",
    lastSeen: "10:24",
    eventIds: ["raw-1012-db"],
    evidenceIds: ["ev-5"],
    confidence: 0.96,
    techniqueCategory: "T1505 Server Software Component / Database Query",
    description: "Privileged query connection executed from SERVER-03 to production customer database.",
  },
  {
    id: "edge-server-files",
    source: "SERVER-03",
    target: "FILE-SRV-01",
    relationshipType: "ACCESSED_DATA",
    status: "ACTIVE",
    firstSeen: "10:18",
    lastSeen: "10:24",
    eventIds: ["raw-1018-share"],
    evidenceIds: ["ev-6"],
    confidence: 0.89,
    techniqueCategory: "T1005 Data from Network Shared Drive",
    description: "Attempted enumeration and bulk staging of 37 confidential files from FILE-SRV-01.",
  },
];

/**
 * Reconstructs the complete Attack Graph state at any simulated timestamp (Requirement 2 & 8).
 * Purely deterministic: derived directly from the centralized Digital Twin state.
 */
export function getAttackGraphAtTime(
  incidentId = "INC-2048",
  timestampOrMinute: string | number
): AttackGraphState {
  const minute =
    typeof timestampOrMinute === "number"
      ? Math.max(0, Math.min(42, Math.floor(timestampOrMinute)))
      : timestampToMinute(timestampOrMinute);

  const timestamp = minuteToTimestamp(minute);
  const digitalTwin = getActualDigitalTwinState(minute);

  // 1. Reconstruct Nodes with Temporal Status & Risk
  const nodes: AttackGraphNode[] = MASTER_NODES.map((blueprint) => {
    let status: AttackGraphNodeStatus = "HEALTHY";
    let risk: Severity = "LOW";

    if (blueprint.id === "ATTACKER") {
      status = "SUSPICIOUS";
      risk = "HIGH";
    } else if (blueprint.id === "ALEX_ACCOUNT") {
      if (minute >= 18) {
        status = "COMPROMISED";
        risk = "HIGH";
      } else if (minute >= 0) {
        status = "SUSPICIOUS";
        risk = "MEDIUM";
      }
    } else if (blueprint.id === "VPN-GW-01") {
      status = minute >= 0 ? "SUSPICIOUS" : "HEALTHY";
      risk = minute >= 0 ? "MEDIUM" : "LOW";
    } else if (blueprint.id === "LAPTOP-042") {
      if (minute >= 18) {
        status = "COMPROMISED";
        risk = "HIGH";
      } else if (minute >= 2) {
        status = "MONITORED";
        risk = "MEDIUM";
      }
    } else if (blueprint.id === "SERVER-03") {
      if (minute >= 25) {
        status = "COMPROMISED";
        risk = "HIGH";
      } else if (minute >= 18) {
        status = "MONITORED";
        risk = "LOW";
      }
    } else if (blueprint.id === "DB-PROD-01") {
      if (minute >= 30) {
        status = "COMPROMISED";
        risk = "CRITICAL";
      }
    } else if (blueprint.id === "FILE-SRV-01") {
      if (minute >= 36) {
        status = "AFFECTED";
        risk = "CRITICAL";
      }
    }

    return {
      ...blueprint,
      status,
      risk,
    };
  });

  // 2. Reconstruct Temporal Edges (Requirement 7)
  // An edge ONLY exists if timestampToMinute(edge.firstSeen) <= minute
  const edges: AttackGraphEdge[] = MASTER_EDGES.filter((edge) => {
    const edgeMin = timestampToMinute(edge.firstSeen);
    return edgeMin <= minute;
  });

  // 3. Classify Nodes
  const entryPoint = nodes.find((n) => n.id === "ATTACKER") ?? nodes[0];
  const compromisedNodes = nodes.filter((n) => n.status === "COMPROMISED");
  const suspiciousNodes = nodes.filter((n) => n.status === "SUSPICIOUS" || n.status === "MONITORED");
  const affectedNodes = nodes.filter((n) => n.status === "COMPROMISED" || n.status === "AFFECTED");
  const criticalNodes = nodes.filter(
    (n) => (n.status === "COMPROMISED" || n.status === "AFFECTED") && n.criticality === "CRITICAL"
  );

  // 4. Determine Active Attack Path (Requirement 15 & 18)
  const fullSequence = [
    "ATTACKER",
    "ALEX_ACCOUNT",
    "LAPTOP-042",
    "SERVER-03",
    "DB-PROD-01",
    "FILE-SRV-01",
  ];

  // Active path contains nodes reached so far
  const activeNodeIds: string[] = [];
  if (minute >= 0) activeNodeIds.push("ATTACKER", "ALEX_ACCOUNT");
  if (minute >= 18) activeNodeIds.push("LAPTOP-042");
  if (minute >= 25) activeNodeIds.push("SERVER-03");
  if (minute >= 30) activeNodeIds.push("DB-PROD-01");
  if (minute >= 36) activeNodeIds.push("FILE-SRV-01");

  const activeEdgeIds = edges
    .filter((e) => activeNodeIds.includes(e.source) && activeNodeIds.includes(e.target))
    .map((e) => e.id);

  const primaryPath: AttackPath = {
    pathId: "path-primary-killchain",
    name: "Primary Credential Compromise & Exfiltration Path",
    nodeIds: activeNodeIds,
    edgeIds: activeEdgeIds,
    startTime: "09:42",
    endTime: timestamp,
    status: minute >= 30 ? "ACTIVE" : "POTENTIAL",
    confidence: 0.95,
    severity: minute >= 30 ? "CRITICAL" : minute >= 18 ? "HIGH" : "MEDIUM",
    summary:
      minute >= 36
        ? "Attacker leveraged compromised credentials through finance workstation to access internal app server, query customer DB, and stage confidential files."
        : minute >= 30
        ? "Attacker reached customer database DB-PROD-01 via application server SERVER-03."
        : minute >= 25
        ? "Lateral traversal from LAPTOP-042 to SERVER-03 observed."
        : minute >= 18
        ? "Workstation LAPTOP-042 compromised via alex.m identity."
        : "Initial authentication anomaly targeting employee credentials.",
  };

  return {
    timestamp,
    minute,
    incidentId,
    nodes,
    edges,
    entryPoint,
    compromisedNodes,
    suspiciousNodes,
    affectedNodes,
    criticalNodes,
    activePath: primaryPath,
    attackPaths: [primaryPath],
    blastRadius: digitalTwin.blastRadius,
    confidence: 0.94,
  };
}

/**
 * Reusable Graph Traversal Utility: Shortest path between source and target nodes (Requirement 17).
 * Deterministic BFS graph traversal over currently active edges.
 */
export function findPath(
  sourceNodeId: string,
  targetNodeId: string,
  graph: AttackGraphState
): string[] {
  if (sourceNodeId === targetNodeId) return [sourceNodeId];

  // Adjacency list from active edges
  const adj = new Map<string, string[]>();
  for (const edge of graph.edges) {
    if (!adj.has(edge.source)) adj.set(edge.source, []);
    adj.get(edge.source)!.push(edge.target);
  }

  const queue: string[][] = [[sourceNodeId]];
  const visited = new Set<string>([sourceNodeId]);

  while (queue.length > 0) {
    const path = queue.shift()!;
    const current = path[path.length - 1];

    if (current === targetNodeId) {
      return path;
    }

    const neighbors = adj.get(current) ?? [];
    for (const neighbor of neighbors) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push([...path, neighbor]);
      }
    }
  }

  // Fallback direct or empty if not reachable
  return [];
}

/**
 * Returns downstream reachable systems from selected node at current timestamp (Requirement 25).
 */
export function getDownstreamReachableNodes(
  graph: AttackGraphState,
  nodeId: string
): AttackGraphNode[] {
  const reachableIds = new Set<string>();
  const queue: string[] = [nodeId];

  while (queue.length > 0) {
    const current = queue.shift()!;
    const outgoing = graph.edges.filter((e) => e.source === current);
    for (const edge of outgoing) {
      if (!reachableIds.has(edge.target) && edge.target !== nodeId) {
        reachableIds.add(edge.target);
        queue.push(edge.target);
      }
    }
  }

  return graph.nodes.filter((n) => reachableIds.has(n.id));
}

/**
 * Generates human-readable path explanation from structured data (Requirement 26).
 */
export function generatePathExplanation(
  graph: AttackGraphState,
  targetNodeId: string
): string[] {
  const entryId = graph.entryPoint?.id ?? "ATTACKER";
  const path = findPath(entryId, targetNodeId, graph);

  if (path.length === 0) {
    return [`No confirmed attack path reached ${targetNodeId} as of ${graph.timestamp}.`];
  }

  const explanations: string[] = [];

  for (let i = 0; i < path.length - 1; i++) {
    const srcId = path[i];
    const dstId = path[i + 1];
    const edge = graph.edges.find((e) => e.source === srcId && e.target === dstId);

    if (edge) {
      explanations.push(
        `${i + 1}. [${edge.firstSeen}] ${edge.source} ${edge.relationshipType.replace(/_/g, " ").toLowerCase()} ${edge.target} (${edge.techniqueCategory})`
      );
    } else {
      explanations.push(`${i + 1}. Attacker traversed from ${srcId} to ${dstId}`);
    }
  }

  return explanations;
}

/**
 * Filters the displayed attack graph without modifying underlying state (Requirement 20).
 */
export function filterAttackGraph(
  graph: AttackGraphState,
  filters: AttackGraphFilter
): { nodes: AttackGraphNode[]; edges: AttackGraphEdge[] } {
  let filteredNodes = graph.nodes;

  if (filters.nodeType !== "ALL") {
    filteredNodes = filteredNodes.filter((n) => n.type === filters.nodeType);
  }

  if (filters.status !== "ALL") {
    filteredNodes = filteredNodes.filter((n) => n.status === filters.status);
  }

  if (filters.searchQuery.trim()) {
    const q = filters.searchQuery.toLowerCase();
    filteredNodes = filteredNodes.filter(
      (n) =>
        n.id.toLowerCase().includes(q) ||
        n.label.toLowerCase().includes(q) ||
        n.owner.toLowerCase().includes(q)
    );
  }

  const visibleNodeIds = new Set(filteredNodes.map((n) => n.id));

  let filteredEdges = graph.edges.filter(
    (e) => visibleNodeIds.has(e.source) && visibleNodeIds.has(e.target)
  );

  if (filters.relationship !== "ALL") {
    filteredEdges = filteredEdges.filter((e) => e.relationshipType === filters.relationship);
  }

  return {
    nodes: filteredNodes,
    edges: filteredEdges,
  };
}
