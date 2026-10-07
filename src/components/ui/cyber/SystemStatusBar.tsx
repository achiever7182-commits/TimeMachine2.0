import React from "react";
import {
  Activity,
  CircleDot,
  Cpu,
  Database,
  Radio,
  ShieldAlert,
  ShieldCheck,
  Wifi,
  Zap,
} from "lucide-react";
import { useDemo } from "@/context/DemoContext";
import { cn } from "@/lib/utils";

export function SystemStatusBar() {
  const { isAttackRunning, currentRisk } = useDemo();

  return (
    <div className="w-full border-b border-border/80 bg-[#020508]/90 px-4 py-2 font-mono text-xs backdrop-blur-xl">
      <div className="flex flex-wrap items-center justify-between gap-3 text-[11px]">
        {/* Core Node & State */}
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <Radio className="size-3.5 text-cyan-400 animate-pulse" />
            <span className="font-bold text-slate-100">TM-CORE-01</span>
            <span className="flex items-center gap-1 text-[10px] text-emerald-400">
              <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
              ONLINE
            </span>
          </div>

          <div className="hidden md:flex items-center gap-4 border-l border-border/60 pl-4 text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <span>TELEMETRY:</span>
              <strong className="text-cyan-300">12,482/s</strong>
            </span>

            <span className="flex items-center gap-1.5">
              <span>EVENTS:</span>
              <strong className="text-slate-200">8,291,402</strong>
            </span>

            <span className="flex items-center gap-1.5">
              <span>ACTIVE THREATS:</span>
              <strong className="text-red-400">03</strong>
            </span>

            <span className="flex items-center gap-1.5">
              <span>ENDPOINTS:</span>
              <strong className="text-slate-200">248</strong>
            </span>
          </div>
        </div>

        {/* Engine status pills */}
        <div className="flex items-center gap-2">
          <span className="hidden lg:inline-flex items-center gap-1 rounded bg-black/60 px-2 py-0.5 text-[10px] text-slate-400 border border-border/60">
            <Cpu className="size-3 text-cyan-400" />
            <span>AI IRIS: <strong className="text-cyan-400">ACTIVE</strong></span>
          </span>

          <span className="hidden lg:inline-flex items-center gap-1 rounded bg-black/60 px-2 py-0.5 text-[10px] text-slate-400 border border-border/60">
            <Zap className="size-3 text-cyan-400" />
            <span>TEMPORAL ENGINE: <strong className="text-emerald-400">READY</strong></span>
          </span>

          {/* Environment Banner (Honest demo/live indicator) */}
          <span className="flex items-center gap-1.5 rounded border border-warning/40 bg-warning/10 px-2.5 py-0.5 text-[10px] font-bold text-warning">
            <CircleDot className="size-2 animate-pulse" />
            <span>DEMO ENVIRONMENT // SYNTHETIC DATA</span>
          </span>
        </div>
      </div>
    </div>
  );
}
