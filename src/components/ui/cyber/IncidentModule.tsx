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
        "relative flex flex-col justify-between rounded-[4px] border bg-[#0B1117] p-4 font-mono transition-all duration-200 hover:border-[#16D9F2]/50",
        isCritical
          ? "border-[#FF3347]/40 shadow-[0_0_10px_rgba(255,51,71,0.12)]"
          : "border-[#FFB020]/30 shadow-[0_0_10px_rgba(255,176,32,0.08)]",
      )}
    >
      {/* Corner crosshairs */}
      <div className="absolute -left-[1px] -top-[1px] size-1.5 border-l border-t border-[#FF3347]/70 pointer-events-none" />
      <div className="absolute -right-[1px] -top-[1px] size-1.5 border-r border-t border-[#FF3347]/70 pointer-events-none" />
      <div className="absolute -bottom-[1px] -left-[1px] size-1.5 border-b border-l border-[#FF3347]/70 pointer-events-none" />
      <div className="absolute -bottom-[1px] -right-[1px] size-1.5 border-b border-r border-[#FF3347]/70 pointer-events-none" />

      <div>
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-[#1B2933] pb-2 text-[9.5px]">
          <span className="flex items-center gap-1.5 font-bold uppercase text-[#FF5264]">
            <span className="size-1.5 rounded-full bg-[#FF3347] animate-pulse" />
            {severity} // {incidentNumber}
          </span>
          <span className="rounded-[2px] bg-[#05080C] px-1.5 py-0.2 text-[#7893A1] border border-[#1B2933]">
            {status}
          </span>
        </div>

        {/* Title */}
        <h3 className="mt-2 text-sm font-bold uppercase tracking-tight text-[#F3F7FA] font-sans">
          {title}
        </h3>

        {/* Forensic Metadata Grid */}
        <div className="mt-3 grid grid-cols-2 gap-2 text-[10.5px] text-[#A5B5C0]">
          <div className="space-y-0.5">
            <span className="text-[9px] text-[#647682] uppercase">// FIRST OBSERVED:</span>
            <div className="text-[#16D9F2] font-semibold">{firstObserved}</div>
          </div>

          <div className="space-y-0.5">
            <span className="text-[9px] text-[#647682] uppercase">// MITRE ATT&CK:</span>
            <div className="text-[#FFD166] font-semibold">{mitreCode}</div>
          </div>

          <div className="space-y-0.5">
            <span className="text-[9px] text-[#647682] uppercase">// ATTACK VECTOR:</span>
            <div className="text-[#F3F7FA] truncate">{attackVector}</div>
          </div>

          <div className="space-y-0.5">
            <span className="text-[9px] text-[#647682] uppercase">// AFFECTED ASSETS:</span>
            <div className="text-[#FF5264] font-bold">{affectedAssetsCount} HOSTS</div>
          </div>
        </div>

        {/* Attack Progression Bar */}
        <div className="mt-3.5 space-y-1">
          <div className="flex justify-between text-[9.5px] text-[#7893A1]">
            <span>// KILL CHAIN PROGRESSION</span>
            <span className="font-bold text-[#FF5264]">{progressionPercent}%</span>
          </div>
          <div className="text-[#FF3347] text-xs tracking-widest select-none font-mono">
            {progressAscii}
          </div>
        </div>
      </div>

      {/* Action Command Buttons */}
      <div className="mt-4 grid grid-cols-3 gap-1.5 border-t border-[#1B2933] pt-2.5 text-[9.5px] font-bold">
        <Link
          to="/time-machine"
          className="flex items-center justify-center gap-1 rounded-[2px] border border-[#16D9F2]/30 bg-[#08798A]/10 py-1.5 text-[#16D9F2] hover:bg-[#16D9F2]/20 hover:text-white transition-colors"
        >
          <BrainCircuit className="size-3" />
          <span>REWIND</span>
        </Link>

        <Link
          to="/simulation-lab"
          className="flex items-center justify-center gap-1 rounded-[2px] border border-[#3B82F6]/30 bg-[#1D4ED8]/10 py-1.5 text-[#60A5FA] hover:bg-[#3B82F6]/20 hover:text-white transition-colors"
        >
          <FlaskConical className="size-3" />
          <span>SIMULATE</span>
        </Link>

        <Link
          to="/response-center"
          className="flex items-center justify-center gap-1 rounded-[2px] border border-[#FF3347]/30 bg-[#B91C2E]/10 py-1.5 text-[#FF5264] hover:bg-[#FF3347]/20 hover:text-white transition-colors"
        >
          <ListChecks className="size-3" />
          <span>RESPOND</span>
        </Link>
      </div>
    </div>
  );
}

