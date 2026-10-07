import React, { useState, useEffect } from "react";
import {
  ShieldAlert,
  Terminal,
  Activity,
  Server,
  Laptop,
  Database,
  Globe,
  Radio,
  Wifi,
  Skull,
  Lock,
  Zap,
  Play,
  Pause,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";
import { useDemo } from "@/context/DemoContext";
import { cn } from "@/lib/utils";

interface AttackNode {
  id: string;
  name: string;
  type: "attacker" | "gateway" | "endpoint" | "process" | "server" | "database";
  ip: string;
  hostname?: string;
  status: "compromised" | "threat" | "suspicious" | "target" | "secured" | "normal";
  mitre?: string;
  description: string;
  x: number;
  y: number;
}

const NODES: AttackNode[] = [
  {
    id: "att-01",
    name: "EXTERNAL ADVERSARY",
    type: "attacker",
    ip: "185.220.101.5",
    hostname: "TOR_EXIT_NODE_NL",
    status: "threat",
    mitre: "T1190 / Initial Exploit",
    description: "Malicious ASN brute-force & credential spray source",
    x: 10,
    y: 50,
  },
  {
    id: "vpn-01",
    name: "VPN GATEWAY",
    type: "gateway",
    ip: "10.0.1.1",
    hostname: "vpn-corp-ext01",
    status: "threat",
    mitre: "T1133 / External Remote Services",
    description: "Stolen credentials used to bypass MFA policy",
    x: 28,
    y: 50,
  },
  {
    id: "end-01",
    name: "PATIENT ZERO (WS-019)",
    type: "endpoint",
    ip: "10.24.17.82",
    hostname: "WS-ANALYST-019",
    status: "compromised",
    mitre: "T1078.002 / Valid Accounts",
    description: "Initial workstation access gained via compromised session",
    x: 48,
    y: 30,
  },
  {
    id: "proc-01",
    name: "POWERSHELL EXECUTION",
    type: "process",
    ip: "PID: 4812",
    hostname: "powershell.exe -enc",
    status: "compromised",
    mitre: "T1059.001 / PowerShell",
    description: "Obfuscated script executed in memory to dump LSASS",
    x: 48,
    y: 70,
  },
  {
    id: "srv-01",
    name: "PROD APP SERVER",
    type: "server",
    ip: "10.0.4.12",
    hostname: "srv-core-app01",
    status: "threat",
    mitre: "T1021.002 / SMB/Windows Admin Shares",
    description: "Lateral movement via harvested domain credentials",
    x: 72,
    y: 50,
  },
  {
    id: "db-01",
    name: "CRITICAL DB (CROWN JEWEL)",
    type: "database",
    ip: "10.0.4.50",
    hostname: "db-finance-vault",
    status: "target",
    mitre: "T1560 / Data Staged for Exfil",
    description: "High-value financial database targeted for exfiltration",
    x: 92,
    y: 50,
  },
];

const CONNECTIONS = [
  { from: "att-01", to: "vpn-01", label: "PASSWORD_SPRAY", active: true },
  { from: "vpn-01", to: "end-01", label: "SESSION_HIJACK", active: true },
  { from: "end-01", to: "proc-01", label: "PROCESS_SPAWN", active: true },
  { from: "proc-01", to: "srv-01", label: "LATERAL_MOVE", active: true },
  { from: "srv-01", to: "db-01", label: "TARGET_ACCESS", active: true },
];

export function LiveAttackMap() {
  const { isAttackRunning, isPaused, currentRisk, startAttackSimulation, pauseSimulation, resumeSimulation, resetDemo } =
    useDemo();

  const [selectedNode, setSelectedNode] = useState<AttackNode | null>(NODES[2]);
  const [pulseIndex, setPulseIndex] = useState(0);

  // Animated packet travel loop
  useEffect(() => {
    const timer = setInterval(() => {
      setPulseIndex((prev) => (prev + 1) % CONNECTIONS.length);
    }, 1400);
    return () => clearInterval(timer);
  }, []);

  const getNodeIcon = (type: AttackNode["type"]) => {
    switch (type) {
      case "attacker":
        return <Skull className="size-4 text-red-400 animate-pulse" />;
      case "gateway":
        return <Globe className="size-4 text-amber-400" />;
      case "endpoint":
        return <Laptop className="size-4 text-cyan-400" />;
      case "process":
        return <Terminal className="size-4 text-red-400" />;
      case "server":
        return <Server className="size-4 text-purple-400" />;
      case "database":
        return <Database className="size-4 text-red-400" />;
    }
  };

  const getNodeStatusStyles = (status: AttackNode["status"]) => {
    switch (status) {
      case "compromised":
        return "border-red-500 bg-red-950/60 shadow-[0_0_20px_rgba(255,38,56,0.5)] text-red-300";
      case "threat":
        return "border-amber-500 bg-amber-950/50 shadow-[0_0_15px_rgba(255,176,0,0.3)] text-amber-300";
      case "target":
        return "border-red-400 bg-red-950/40 shadow-[0_0_25px_rgba(255,38,56,0.6)] text-red-200 animate-pulse";
      case "secured":
        return "border-emerald-500 bg-emerald-950/40 text-emerald-300";
      default:
        return "border-cyan-500/40 bg-black/60 text-cyan-300";
    }
  };

  return (
    <div className="relative flex flex-col rounded border border-border/80 bg-[#03070B] p-4 font-mono">
      {/* Corner crosshairs */}
      <div className="absolute -left-[1px] -top-[1px] size-2 border-l border-t border-cyan-400" />
      <div className="absolute -right-[1px] -top-[1px] size-2 border-r border-t border-cyan-400" />
      <div className="absolute -bottom-[1px] -left-[1px] size-2 border-b border-l border-cyan-400" />
      <div className="absolute -bottom-[1px] -right-[1px] size-2 border-b border-r border-cyan-400" />

      {/* Top Map Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/70 pb-3">
        <div className="flex items-center gap-2.5">
          <span className="flex size-2 rounded-full bg-red-500 animate-ping" />
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-slate-100">
            LIVE ATTACK PROPAGATION TOPOLOGY
          </span>
          <span className="text-[10px] text-muted-foreground uppercase">// DYNAMIC TRACE MATRIX</span>
        </div>

        <div className="flex items-center gap-2 text-[10px]">
          <span className="flex items-center gap-1.5 rounded border border-red-500/40 bg-red-950/30 px-2 py-0.5 font-bold text-red-400">
            <span className="size-1.5 rounded-full bg-red-400 animate-pulse" />
            THREAT LEVEL: {currentRisk?.toUpperCase() || "CRITICAL"}
          </span>

          <span className="hidden sm:inline-flex items-center gap-1 rounded border border-cyan-500/30 bg-cyan-950/30 px-2 py-0.5 text-cyan-300">
            <Activity className="size-3 text-cyan-400 animate-pulse" />
            LIVE TELEMETRY HOPS: 5
          </span>
        </div>
      </div>

      {/* Main Interactive Map Canvas */}
      <div className="relative my-4 h-72 sm:h-80 w-full overflow-hidden rounded border border-border/40 bg-black/70">
        {/* Tech Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#142733_1px,transparent_1px),linear-gradient(to_bottom,#142733_1px,transparent_1px)] bg-[size:32px_32px] opacity-25 pointer-events-none" />

        {/* Pulsing Radar Ring Background in Center */}
        <div className="absolute left-1/2 top-1/2 size-72 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-500/10 pointer-events-none" />
        <div className="absolute left-1/2 top-1/2 size-48 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-500/15 pointer-events-none" />
        <div className="absolute left-1/2 top-1/2 size-24 -translate-x-1/2 -translate-y-1/2 rounded-full border border-red-500/20 pointer-events-none animate-ping" />

        {/* SVG Attack Vector Lines & Animated Packets */}
        <svg className="absolute inset-0 size-full pointer-events-none">
          <defs>
            <linearGradient id="attackGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ff2638" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#ffb000" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#00e5ff" stopOpacity="0.8" />
            </linearGradient>
          </defs>

          {/* Connection Lines */}
          {CONNECTIONS.map((conn, idx) => {
            const fromNode = NODES.find((n) => n.id === conn.from);
            const toNode = NODES.find((n) => n.id === conn.to);
            if (!fromNode || !toNode) return null;

            const isCurrentHop = pulseIndex === idx;

            return (
              <g key={`${conn.from}-${conn.to}`}>
                {/* Base connection line */}
                <line
                  x1={`${fromNode.x}%`}
                  y1={`${fromNode.y}%`}
                  x2={`${toNode.x}%`}
                  y2={`${toNode.y}%`}
                  stroke={isCurrentHop ? "#ff2638" : "#1e3a4f"}
                  strokeWidth={isCurrentHop ? "2.5" : "1.5"}
                  strokeDasharray={isCurrentHop ? "4 2" : "none"}
                  className="transition-all duration-300"
                />

                {/* Animated traveling Threat Packet circle */}
                <circle
                  cx={`${isCurrentHop ? toNode.x : fromNode.x}%`}
                  cy={`${isCurrentHop ? toNode.y : fromNode.y}%`}
                  r="3.5"
                  fill="#ff2638"
                  className="transition-all duration-1000 ease-in-out"
                />
              </g>
            );
          })}
        </svg>

        {/* Interactive Node Badges */}
        {NODES.map((node) => {
          const isSelected = selectedNode?.id === node.id;
          return (
            <div
              key={node.id}
              onClick={() => setSelectedNode(node)}
              style={{
                left: `${node.x}%`,
                top: `${node.y}%`,
                transform: "translate(-50%, -50%)",
              }}
              className={cn(
                "group absolute z-10 flex cursor-pointer flex-col items-center transition-all duration-200 hover:scale-110",
              )}
            >
              {/* Node Card Element */}
              <div
                className={cn(
                  "flex items-center gap-1.5 rounded-sm border px-2.5 py-1.5 text-[11px] font-bold backdrop-blur-md transition-all",
                  getNodeStatusStyles(node.status),
                  isSelected && "ring-2 ring-cyan-400 scale-105",
                )}
              >
                {getNodeIcon(node.type)}
                <span className="tracking-wider">{node.name}</span>
              </div>

              {/* Sub-label IP / PID */}
              <span className="mt-1 rounded bg-black/80 px-1.5 py-0.2 text-[9px] text-slate-400 border border-border/60">
                {node.ip}
              </span>
            </div>
          );
        })}
      </div>

      {/* Bottom Inspection Drawer for Selected Node */}
      {selectedNode && (
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-t border-border/70 pt-3 text-xs">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-100 uppercase">{selectedNode.name}</span>
              <span className="text-[10px] text-cyan-400">[{selectedNode.ip}]</span>
              <span className="rounded bg-red-950/40 px-1.5 py-0.2 text-[9px] font-bold text-red-400 border border-red-500/30">
                MITRE: {selectedNode.mitre}
              </span>
            </div>
            <p className="text-[11px] text-slate-400">{selectedNode.description}</p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => {
                if (!isAttackRunning && !isPaused) startAttackSimulation();
                else if (isAttackRunning) pauseSimulation();
                else resumeSimulation();
              }}
              className="flex items-center gap-1.5 rounded border border-cyan-500/40 bg-cyan-950/30 px-3 py-1.5 text-xs font-bold text-cyan-300 hover:bg-cyan-500/20 hover:text-white transition-colors cursor-pointer"
            >
              {!isAttackRunning && !isPaused ? (
                <>
                  <Play className="size-3 fill-cyan-400" />
                  <span>SIMULATE ATTACK</span>
                </>
              ) : isAttackRunning ? (
                <>
                  <Pause className="size-3" />
                  <span>PAUSE STREAM</span>
                </>
              ) : (
                <>
                  <Play className="size-3 fill-cyan-400" />
                  <span>RESUME STREAM</span>
                </>
              )}
            </button>

            <button
              onClick={resetDemo}
              className="flex items-center gap-1 rounded border border-border bg-black/40 px-2.5 py-1.5 text-xs text-slate-400 hover:text-white hover:border-slate-500 transition-colors cursor-pointer"
              title="Reset Simulation"
            >
              <RotateCcw className="size-3" />
              <span>RESET</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
