import { useMemo } from "react";
import {
  Globe,
  User,
  Laptop,
  Server,
  Database,
  FolderGit2,
  Network,
  Cpu,
  ShieldAlert,
  AlertTriangle,
  Radio,
  CheckCircle,
} from "lucide-react";
import type { AttackGraphEdge, AttackGraphNode, AttackPath } from "@/types/attackGraph";

interface AttackGraphCanvasProps {
  nodes: AttackGraphNode[];
  edges: AttackGraphEdge[];
  selectedNodeId: string | null;
  selectedEdgeId: string | null;
  activePath: AttackPath | null;
  highlightedPathId: string | null;
  onSelectNode: (nodeId: string) => void;
  onSelectEdge: (edgeId: string) => void;
}

const TYPE_ICONS = {
  EXTERNAL_THREAT: Globe,
  USER: User,
  ENDPOINT: Laptop,
  SERVER: Server,
  DATABASE: Database,
  FILE_SERVER: FolderGit2,
  NETWORK_GATEWAY: Network,
  DATA_RESOURCE: Database,
  PROCESS: Cpu,
};

// Layout tiers and coordinate map (Directional: Entry -> Identity/Gateway -> Endpoint -> Server -> Database / File Share)
const NODE_COORDINATES: Record<string, { x: number; y: number }> = {
  ATTACKER: { x: 90, y: 220 },
  ALEX_ACCOUNT: { x: 260, y: 140 },
  "VPN-GW-01": { x: 260, y: 300 },
  "LAPTOP-042": { x: 440, y: 220 },
  "SERVER-03": { x: 620, y: 220 },
  "DB-PROD-01": { x: 800, y: 140 },
  "FILE-SRV-01": { x: 800, y: 300 },
};

export function AttackGraphCanvas({
  nodes,
  edges,
  selectedNodeId,
  selectedEdgeId,
  activePath,
  highlightedPathId,
  onSelectNode,
  onSelectEdge,
}: AttackGraphCanvasProps) {
  // Path highlight check
  const pathNodeIds = useMemo(() => {
    if (!highlightedPathId || !activePath) return new Set<string>();
    return new Set(activePath.nodeIds);
  }, [highlightedPathId, activePath]);

  const pathEdgeIds = useMemo(() => {
    if (!highlightedPathId || !activePath) return new Set<string>();
    return new Set(activePath.edgeIds);
  }, [highlightedPathId, activePath]);

  const isPathActive = Boolean(highlightedPathId && activePath);

  return (
    <div className="relative h-[480px] w-full select-none overflow-hidden rounded-xl border border-border/80 bg-gradient-to-b from-card/60 via-background/80 to-card/40 backdrop-blur-md">
      {/* Background cyber grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
          backgroundSize: "28px 28px",
        }}
      />

      {/* SVG Canvas for directional connecting edges */}
      <svg className="absolute inset-0 size-full pointer-events-auto">
        <defs>
          {/* Arrow markers */}
          <marker
            id="arrow-default"
            viewBox="0 0 10 10"
            refX="22"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M 0 1 L 10 5 L 0 9 z" fill="rgba(148, 163, 184, 0.7)" />
          </marker>
          <marker
            id="arrow-threat"
            viewBox="0 0 10 10"
            refX="22"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M 0 1 L 10 5 L 0 9 z" fill="#ef4444" />
          </marker>
          <marker
            id="arrow-active"
            viewBox="0 0 10 10"
            refX="22"
            refY="5"
            markerWidth="7"
            markerHeight="7"
            orient="auto-start-reverse"
          >
            <path d="M 0 1 L 10 5 L 0 9 z" fill="#06b6d4" />
          </marker>

          {/* Glow filter */}
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {edges.map((edge) => {
          const srcPos = NODE_COORDINATES[edge.source];
          const dstPos = NODE_COORDINATES[edge.target];
          if (!srcPos || !dstPos) return null;

          const isSelected = selectedEdgeId === edge.id;
          const isOnHighlightedPath = pathEdgeIds.has(edge.id);
          const isDeemphasized = isPathActive && !isOnHighlightedPath;

          // Compute smooth bezier curve
          const dx = dstPos.x - srcPos.x;
          const dy = dstPos.y - srcPos.y;
          const cx1 = srcPos.x + dx * 0.5;
          const cy1 = srcPos.y;
          const cx2 = srcPos.x + dx * 0.5;
          const cy2 = dstPos.y;
          const pathD = `M ${srcPos.x} ${srcPos.y} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${dstPos.x} ${dstPos.y}`;

          const isKillchain = isOnHighlightedPath || edge.relationshipType === "LATERALLY_MOVED_TO" || edge.relationshipType === "ACCESSED_DATA";

          let strokeColor = "rgba(148, 163, 184, 0.4)";
          let markerEnd = "url(#arrow-default)";

          if (isSelected) {
            strokeColor = "#22d3ee";
            markerEnd = "url(#arrow-active)";
          } else if (isOnHighlightedPath || isKillchain) {
            strokeColor = "#ef4444";
            markerEnd = "url(#arrow-threat)";
          }

          return (
            <g
              key={edge.id}
              className={`cursor-pointer transition-opacity duration-300 ${
                isDeemphasized ? "opacity-20" : "opacity-100"
              }`}
              onClick={() => onSelectEdge(edge.id)}
            >
              {/* Invisible wide hit area */}
              <path
                d={pathD}
                fill="none"
                stroke="transparent"
                strokeWidth="20"
                className="hover:stroke-cyan-500/20"
              />

              {/* Base line */}
              <path
                d={pathD}
                fill="none"
                stroke={strokeColor}
                strokeWidth={isSelected ? "3" : isOnHighlightedPath ? "2.5" : "1.8"}
                strokeDasharray={isSelected ? "none" : isOnHighlightedPath ? "none" : "4 2"}
                markerEnd={markerEnd}
                filter={isSelected || isOnHighlightedPath ? "url(#glow)" : undefined}
                className="transition-all duration-300"
              />

              {/* Edge label badge mid-point */}
              <g transform={`translate(${(srcPos.x + dstPos.x) / 2}, ${(srcPos.y + dstPos.y) / 2})`}>
                <rect
                  x="-35"
                  y="-9"
                  width="70"
                  height="18"
                  rx="4"
                  fill="rgba(15, 23, 42, 0.85)"
                  stroke={isSelected ? "#22d3ee" : isOnHighlightedPath ? "#ef4444" : "rgba(148, 163, 184, 0.3)"}
                  strokeWidth="1"
                />
                <text
                  x="0"
                  y="3"
                  textAnchor="middle"
                  fontSize="8.5"
                  fontFamily="monospace"
                  fill={isSelected ? "#22d3ee" : isOnHighlightedPath ? "#f87171" : "#94a3b8"}
                  fontWeight="600"
                >
                  {edge.firstSeen}
                </text>
              </g>
            </g>
          );
        })}
      </svg>

      {/* Interactive Node Badges (HTML absolute positioned) */}
      {nodes.map((node) => {
        const pos = NODE_COORDINATES[node.id];
        if (!pos) return null;

        const Icon = TYPE_ICONS[node.type] ?? Globe;
        const isSelected = selectedNodeId === node.id;
        const isOnHighlightedPath = pathNodeIds.has(node.id);
        const isDeemphasized = isPathActive && !isOnHighlightedPath;

        let statusBg = "bg-secondary/40 border-border/80 text-foreground";
        let statusBadge = <CheckCircle className="size-3 text-emerald-400" />;

        if (node.status === "COMPROMISED") {
          statusBg = "bg-threat/15 border-threat/60 text-threat shadow-[0_0_15px_rgba(239,68,68,0.25)]";
          statusBadge = <ShieldAlert className="size-3 text-threat animate-pulse" />;
        } else if (node.status === "AFFECTED") {
          statusBg = "bg-amber-500/15 border-amber-500/60 text-amber-300 shadow-[0_0_12px_rgba(245,158,11,0.2)]";
          statusBadge = <AlertTriangle className="size-3 text-amber-400" />;
        } else if (node.status === "SUSPICIOUS") {
          statusBg = "bg-amber-400/10 border-amber-400/40 text-amber-400";
          statusBadge = <AlertTriangle className="size-3 text-amber-400" />;
        } else if (node.status === "MONITORED") {
          statusBg = "bg-blue-500/10 border-blue-500/40 text-blue-400";
          statusBadge = <Radio className="size-3 text-blue-400" />;
        }

        return (
          <div
            key={node.id}
            onClick={() => onSelectNode(node.id)}
            style={{ left: `${pos.x}px`, top: `${pos.y}px` }}
            className={`absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300 ${
              isDeemphasized ? "opacity-25 scale-95" : "opacity-100 hover:scale-105"
            }`}
          >
            <div
              className={`group relative flex w-36 flex-col items-center rounded-xl border p-2.5 backdrop-blur-md transition-all ${statusBg} ${
                isSelected
                  ? "ring-2 ring-cyan-signal ring-offset-2 ring-offset-background scale-105 shadow-[0_0_20px_rgba(6,182,212,0.4)]"
                  : ""
              }`}
            >
              {/* Status indicator top right */}
              <div className="absolute -top-1.5 -right-1.5 rounded-full bg-background/90 p-0.5 shadow-sm">
                {statusBadge}
              </div>

              {/* Icon */}
              <div className="flex size-9 items-center justify-center rounded-lg bg-background/50 border border-border/50">
                <Icon className="size-4.5" />
              </div>

              {/* Labels */}
              <span className="mt-1.5 text-center font-mono text-[11px] font-bold tracking-tight">
                {node.id}
              </span>
              <span className="text-center text-[9.5px] text-muted-foreground truncate w-full">
                {node.label.replace(` (${node.type})`, "")}
              </span>

              {/* Temporal tag */}
              <div className="mt-1 flex items-center gap-1 font-mono text-[9px] text-muted-foreground/80">
                <span>{node.status}</span>
                <span>•</span>
                <span>{node.firstSeen}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
