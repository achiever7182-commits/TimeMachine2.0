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
    <div className="w-full border-b border-[#1B2933] bg-[#05080C] px-4 py-2 font-mono text-xs backdrop-blur-xl">
      <div className="flex flex-wrap items-center justify-between gap-3 text-[10.5px]">
        {/* Core Node & State */}
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <Radio className="size-3 text-[#16D9F2] animate-pulse" />
            <span className="font-bold text-[#F3F7FA]">TM-CORE-01</span>
            <span className="flex items-center gap-1 text-[9.5px] text-[#20DFA0]">
              <span className="size-1.5 rounded-full bg-[#20DFA0] animate-pulse" />
              ONLINE
            </span>
          </div>

          <div className="hidden md:flex items-center gap-4 border-l border-[#1B2933] pl-4 text-[#647682]">
            <span className="flex items-center gap-1.5">
              <span>TELEMETRY:</span>
              <strong className="text-[#16D9F2]">12,482/s</strong>
            </span>

            <span className="flex items-center gap-1.5">
              <span>EVENTS:</span>
              <strong className="text-[#F3F7FA]">8,291,402</strong>
            </span>

            <span className="flex items-center gap-1.5">
              <span>ACTIVE THREATS:</span>
              <strong className="text-[#FF3347]">03</strong>
            </span>

            <span className="flex items-center gap-1.5">
              <span>ENDPOINTS:</span>
              <strong className="text-[#F3F7FA]">248</strong>
            </span>
          </div>
        </div>

        {/* Engine status pills */}
        <div className="flex items-center gap-2">
          <span className="hidden lg:inline-flex items-center gap-1 rounded-[2px] bg-[#070C11] px-2 py-0.5 text-[9.5px] text-[#7893A1] border border-[#1B2933]">
            <Cpu className="size-3 text-[#16D9F2]" />
            <span>AI IRIS: <strong className="text-[#16D9F2]">ACTIVE</strong></span>
          </span>

          <span className="hidden lg:inline-flex items-center gap-1 rounded-[2px] bg-[#070C11] px-2 py-0.5 text-[9.5px] text-[#7893A1] border border-[#1B2933]">
            <Zap className="size-3 text-[#16D9F2]" />
            <span>TEMPORAL ENGINE: <strong className="text-[#20DFA0]">READY</strong></span>
          </span>

          {/* Environment Banner (Honest demo/live indicator) */}
          <span className="flex items-center gap-1.5 rounded-[2px] border border-[#FFB020]/40 bg-[#B77900]/10 px-2.5 py-0.5 text-[9.5px] font-bold text-[#FFD166]">
            <CircleDot className="size-1.5 animate-pulse text-[#FFB020]" />
            <span>DEMO ENVIRONMENT // SYNTHETIC DATA</span>
          </span>
        </div>
      </div>
    </div>
  );
}

