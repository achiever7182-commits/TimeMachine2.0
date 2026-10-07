import { useState } from "react";
import {
  Cloud,
  Database,
  FileText,
  Laptop,
  Network,
  Radio,
  Server,
  ShieldAlert,
  UserRound,
  Zap,
} from "lucide-react";
import { useDemo } from "@/context/DemoContext";
import { AssetStateBadge } from "./AssetStateBadge";
import { cn } from "@/lib/utils";
import type { AssetTemporalState, UserTemporalState } from "@/types/digitalTwin";

interface NodePosition {
  id: string;
  x: number;
  y: number;
  label: string;
  sublabel: string;
  type: "USER" | "NETWORK" | "ENDPOINT" | "SERVER" | "DATABASE" | "FILE_STORE" | "CLOUD_RESOURCE";
  icon: typeof Laptop;
}

// Topology coordinate layout
const NODE_POSITIONS: NodePosition[] = [
  {
    id: "usr-alex-m",
    x: 140,
    y: 70,
    label: "alex.m",
    sublabel: "Financial Analyst",
    type: "USER",
    icon: UserRound,
  },
  {
    id: "VPN-GW-01",
    x: 380,
    y: 70,
    label: "VPN-GW-01",
    sublabel: "Edge Perimeter Gateway",
    type: "NETWORK",
    icon: Network,
  },
  {
    id: "CLOUD-STORAGE-01",
    x: 680,
    y: 70,
    label: "CLOUD-STORAGE-01",
    sublabel: "Enterprise S3 Bucket",
    type: "CLOUD_RESOURCE",
    icon: Cloud,
  },
  {
    id: "LAPTOP-042",
    x: 380,
    y: 220,
    label: "LAPTOP-042",
    sublabel: "Finance Workstation",
    type: "ENDPOINT",
    icon: Laptop,
  },
  {
    id: "SERVER-03",
    x: 380,
    y: 370,
    label: "SERVER-03",
    sublabel: "Internal App Server",
    type: "SERVER",
    icon: Server,
  },
  {
    id: "DB-PROD-01",
    x: 200,
    y: 520,
    label: "DB-PROD-01",
    sublabel: "Customer Postgres DB",
    type: "DATABASE",
    icon: Database,
  },
  {
    id: "FILE-SRV-01",
    x: 560,
    y: 520,
    label: "FILE-SRV-01",
    sublabel: "Confidential Storage",
    type: "FILE_STORE",
    icon: FileText,
  },
];

export function DigitalTwinGraph({ viewMode = "ACTUAL" }: { viewMode?: "ACTUAL" | "KNOWN" }) {
  const { digitalTwin, knownSecurityState, selectedEntityId, setSelectedEntityId } = useDemo();

  const currentSnapshot = viewMode === "KNOWN" ? knownSecurityState : digitalTwin;
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);

  // Asset & User lookups
  const assetMap = new Map<string, AssetTemporalState>(
    currentSnapshot.assets.map((a) => [a.id, a]),
  );
  const userMap = new Map<string, UserTemporalState>(currentSnapshot.users.map((u) => [u.id, u]));

  // Connection lookups
  const activeConnections = currentSnapshot.networkConnections;

  return (
    <div className="relative h-[640px] w-full select-none overflow-hidden rounded-xl border border-border bg-card/60 p-4 shadow-panel backdrop-blur-xl">
      {/* Background Command Grid & Radar sweep */}
      <div className="pointer-events-none absolute inset-0 bg-command-grid opacity-50" />
      <div className="pointer-events-none absolute -right-20 -top-20 size-96 rounded-full bg-[#19E6FF]/5 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -left-20 size-96 rounded-full bg-[#3B82F6]/5 blur-3xl" />

      {/* SVG Canvas for Network Connections */}
      <svg className="absolute inset-0 size-full pointer-events-none">
        <defs>
          <linearGradient id="grad-active-conn" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#19E6FF" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#FF3045" stopOpacity="0.9" />
          </linearGradient>
          <linearGradient id="grad-healthy-conn" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#19E6FF" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#19E6FF" stopOpacity="0.1" />
          </linearGradient>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Render Network Links */}
        {activeConnections.map((conn) => {
          const sourceNode = NODE_POSITIONS.find((n) => n.id === conn.sourceId);
          const destNode = NODE_POSITIONS.find((n) => n.id === conn.destinationId);
          if (!sourceNode || !destNode) return null;

          const isLateral = conn.relationshipType === "LATERAL_MOVEMENT";
          const isAttackPath =
            conn.relationshipType === "LATERAL_MOVEMENT" ||
            conn.relationshipType === "DATABASE_QUERY" ||
            conn.relationshipType === "FILE_ACCESS";

          const isConnectedToHovered =
            hoveredNodeId === conn.sourceId || hoveredNodeId === conn.destinationId;

          return (
            <g key={conn.id} className="transition-opacity duration-300">
              {/* Background trace line */}
              <line
                x1={sourceNode.x + 95}
                y1={sourceNode.y + 40}
                x2={destNode.x + 95}
                y2={destNode.y + 40}
                stroke={isAttackPath ? "#FF3045" : "#19E6FF"}
                strokeWidth={isAttackPath ? 2.5 : 1.5}
                strokeDasharray={isLateral ? "5 4" : undefined}
                strokeOpacity={isConnectedToHovered ? 1 : isAttackPath ? 0.75 : 0.3}
                filter={isAttackPath ? "url(#glow)" : undefined}
              />

              {/* Animated Packet / Flow Signal */}
              {isAttackPath ? (
                <circle r="4" fill="#ff2a5f">
                  <animateMotion
                    path={`M ${sourceNode.x + 95} ${sourceNode.y + 40} L ${destNode.x + 95} ${destNode.y + 40}`}
                    dur="2.5s"
                    repeatCount="indefinite"
                  />
                </circle>
              ) : (
                <circle r="2.5" fill="#00f2fe" opacity="0.6">
                  <animateMotion
                    path={`M ${sourceNode.x + 95} ${sourceNode.y + 40} L ${destNode.x + 95} ${destNode.y + 40}`}
                    dur="4s"
                    repeatCount="indefinite"
                  />
                </circle>
              )}
            </g>
          );
        })}
      </svg>

      {/* Interactive Entity Node Cards */}
      <div className="relative size-full">
        {NODE_POSITIONS.map((pos) => {
          const isUser = pos.type === "USER";
          const userState = isUser ? userMap.get(pos.id) : null;
          const assetState = !isUser ? assetMap.get(pos.id) : null;

          const isCompromised =
            (isUser && userState?.status === "COMPROMISED") ||
            (!isUser && assetState?.status === "COMPROMISED");

          const isSuspicious =
            (isUser && userState?.status === "SUSPICIOUS") ||
            (!isUser && assetState?.status === "SUSPICIOUS");

          const isSelected = selectedEntityId === pos.id;
          const Icon = pos.icon;

          return (
            <div
              key={pos.id}
              onClick={() => setSelectedEntityId(pos.id)}
              onMouseEnter={() => setHoveredNodeId(pos.id)}
              onMouseLeave={() => setHoveredNodeId(null)}
              style={{ left: `${pos.x}px`, top: `${pos.y}px` }}
              className={cn(
                "absolute w-52 cursor-pointer rounded-xl border p-3.5 transition-all duration-200 shadow-panel backdrop-blur-md",
                isSelected
                  ? "border-cyan-glow ring-2 ring-cyan-signal/40 bg-secondary/80 shadow-glow scale-[1.03] z-20"
                  : isCompromised
                    ? "border-threat/50 bg-threat/10 hover:border-threat shadow-threat hover:scale-[1.02] z-10"
                    : isSuspicious
                      ? "border-amber-400/50 bg-amber-400/10 hover:border-amber-400 hover:scale-[1.02]"
                      : "border-border/80 bg-card/85 hover:border-cyan-signal/50 hover:scale-[1.02]",
              )}
            >
              {/* Header: Icon + Badge */}
              <div className="flex items-start justify-between gap-2">
                <span
                  className={cn(
                    "grid size-9 place-items-center rounded-lg border",
                    isCompromised
                      ? "border-threat/40 bg-threat/20 text-threat shadow-threat animate-pulse"
                      : isSuspicious
                        ? "border-amber-400/40 bg-amber-400/20 text-amber-400"
                        : "border-cyan-signal/30 bg-primary/10 text-cyan-signal",
                  )}
                >
                  <Icon className="size-4" />
                </span>

                {isUser && userState ? (
                  <span
                    className={cn(
                      "rounded-full border px-2 py-0.5 font-mono text-[10px] font-semibold uppercase",
                      userState.status === "COMPROMISED"
                        ? "border-threat/40 bg-threat/10 text-threat"
                        : userState.status === "SUSPICIOUS"
                          ? "border-amber-400/40 bg-amber-400/10 text-amber-400"
                          : "border-green-signal/30 bg-green-signal/10 text-green-signal",
                    )}
                  >
                    {userState.status}
                  </span>
                ) : assetState ? (
                  <AssetStateBadge
                    status={assetState.status}
                    showIcon={false}
                    className="text-[10px] px-2 py-0.5"
                  />
                ) : null}
              </div>

              {/* Title & Sublabel */}
              <div className="mt-2.5">
                <h4 className="font-mono text-xs font-bold text-foreground truncate">
                  {pos.label}
                </h4>
                <p className="mt-0.5 truncate text-[11px] text-muted-foreground">{pos.sublabel}</p>
              </div>

              {/* Key Indicators Footer */}
              <div className="mt-3 flex items-center justify-between border-t border-border/50 pt-2 font-mono text-[10px] text-muted-foreground">
                <span>
                  {isUser
                    ? `${userState?.currentSessions.length ?? 0} session(s)`
                    : `${assetState?.ipAddress ?? "Internal"}`}
                </span>
                {isCompromised ? (
                  <span className="flex items-center gap-1 font-semibold text-threat">
                    <ShieldAlert className="size-3" /> Compromised
                  </span>
                ) : isSuspicious ? (
                  <span className="flex items-center gap-1 font-semibold text-amber-400">
                    <Zap className="size-3" /> Suspicious
                  </span>
                ) : (
                  <span className="text-green-signal">Nominal</span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Legend overlay */}
      <div className="absolute bottom-3 left-3 flex flex-wrap items-center gap-3 rounded-lg border border-border bg-background/85 px-3 py-1.5 text-[11px] text-muted-foreground backdrop-blur-md">
        <span className="flex items-center gap-1.5 font-medium">
          <span className="size-2 rounded-full bg-green-signal" /> Healthy
        </span>
        <span className="flex items-center gap-1.5 font-medium">
          <span className="size-2 rounded-full bg-cyan-signal" /> Monitored
        </span>
        <span className="flex items-center gap-1.5 font-medium">
          <span className="size-2 rounded-full bg-amber-400" /> Suspicious
        </span>
        <span className="flex items-center gap-1.5 font-medium">
          <span className="size-2 rounded-full bg-threat animate-pulse" /> Compromised
        </span>
      </div>
    </div>
  );
}
