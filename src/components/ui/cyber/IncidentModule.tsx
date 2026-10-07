import React from "react";
import { Link } from "@tanstack/react-router";
import {
  ShieldAlert,
  Clock,
  Radio,
  ArrowRight,
  BrainCircuit,
  FlaskConical,
  ListChecks,
  Laptop,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface IncidentModuleProps {
  id: string;
  incidentNumber: string;
  title: string;
  severity: "CRITICAL" | "HIGH" | "MEDIUM" | "LOW";
  firstObserved: string;
  attackVector: string;
  mitreCode: string;
  affectedAssetsCount: number;
  progressionPercent: number;
  status: "ACTIVE" | "CONTAINED" | "INVESTIGATING" | "SIMULATING";
}

export function IncidentModule({
  id,
  incidentNumber,
  title,
  severity,
  firstObserved,
  attackVector,
  mitreCode,
  affectedAssetsCount,
  progressionPercent,
  status,
}: IncidentModuleProps) {
  const isCritical = severity === "CRITICAL";

  // Calculate ASCII progress blocks
  const filledBlocks = Math.round((progressionPercent / 100) * 16);
  const emptyBlocks = 16 - filledBlocks;
  const progressAscii = "█".repeat(filledBlocks) + "░".repeat(Math.max(0, emptyBlocks));

  return (
    <div
      className={cn(
        "relative flex flex-col justify-between rounded-none border bg-[#050B12]/90 p-4 font-mono transition-all duration-200 hover:border-cyan-500/60",
        isCritical
          ? "border-red-500/50 shadow-[0_0_20px_rgba(255,38,56,0.12)]"
          : "border-amber-500/40 shadow-[0_0_15px_rgba(255,176,0,0.08)]",
      )}
    >
      {/* Corner crosshairs */}
      <div className="absolute -left-[1px] -top-[1px] size-2 border-l border-t border-red-400" />
      <div className="absolute -right-[1px] -top-[1px] size-2 border-r border-t border-red-400" />
      <div className="absolute -bottom-[1px] -left-[1px] size-2 border-b border-l border-red-400" />
      <div className="absolute -bottom-[1px] -right-[1px] size-2 border-b border-r border-red-400" />

      <div>
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-border/60 pb-2 text-[10px]">
          <span className="flex items-center gap-1.5 font-bold uppercase text-red-400">
            <span className="size-1.5 rounded-full bg-red-400 animate-pulse" />
            {severity} // {incidentNumber}
          </span>
          <span className="rounded bg-black/60 px-1.5 py-0.2 text-slate-400 border border-border/60">
            {status}
          </span>
        </div>

        {/* Title */}
        <h3 className="mt-2.5 text-sm font-bold uppercase tracking-tight text-slate-100 font-sans">
          {title}
        </h3>

        {/* Forensic Metadata Grid */}
        <div className="mt-3 grid grid-cols-2 gap-2 text-[11px] text-slate-300">
          <div className="space-y-0.5">
            <span className="text-[10px] text-muted-foreground uppercase">FIRST OBSERVED:</span>
            <div className="text-cyan-300 font-semibold">{firstObserved}</div>
          </div>

          <div className="space-y-0.5">
            <span className="text-[10px] text-muted-foreground uppercase">MITRE ATT&CK:</span>
            <div className="text-amber-400 font-semibold">{mitreCode}</div>
          </div>

          <div className="space-y-0.5">
            <span className="text-[10px] text-muted-foreground uppercase">ATTACK VECTOR:</span>
            <div className="text-slate-200 truncate">{attackVector}</div>
          </div>

          <div className="space-y-0.5">
            <span className="text-[10px] text-muted-foreground uppercase">AFFECTED ASSETS:</span>
            <div className="text-red-400 font-bold">{affectedAssetsCount} HOSTS</div>
          </div>
        </div>

        {/* Attack Progression Bar */}
        <div className="mt-4 space-y-1">
          <div className="flex justify-between text-[10px] text-muted-foreground">
            <span>KILL CHAIN PROGRESSION</span>
            <span className="font-bold text-red-400">{progressionPercent}%</span>
          </div>
          <div className="text-red-400/90 text-xs tracking-widest select-none">
            {progressAscii}
          </div>
        </div>
      </div>

      {/* Action Command Buttons */}
      <div className="mt-5 grid grid-cols-3 gap-1.5 border-t border-border/60 pt-3 text-[10px] font-bold">
        <Link
          to="/time-machine"
          className="flex items-center justify-center gap-1 rounded-sm border border-cyan-500/40 bg-cyan-950/20 py-1.5 text-cyan-300 hover:bg-cyan-500/20 hover:text-white transition-colors"
        >
          <BrainCircuit className="size-3" />
          <span>REWIND</span>
        </Link>

        <Link
          to="/simulation-lab"
          className="flex items-center justify-center gap-1 rounded-sm border border-purple-500/40 bg-purple-950/20 py-1.5 text-purple-300 hover:bg-purple-500/20 hover:text-white transition-colors"
        >
          <FlaskConical className="size-3" />
          <span>SIMULATE</span>
        </Link>

        <Link
          to="/response-center"
          className="flex items-center justify-center gap-1 rounded-sm border border-red-500/40 bg-red-950/20 py-1.5 text-red-300 hover:bg-red-500/20 hover:text-white transition-colors"
        >
          <ListChecks className="size-3" />
          <span>RESPOND</span>
        </Link>
      </div>
    </div>
  );
}
