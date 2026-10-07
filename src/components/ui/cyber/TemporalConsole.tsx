import React, { useState } from "react";
import {
  Clock,
  RotateCcw,
  Play,
  Pause,
  FastForward,
  Rewind,
  BrainCircuit,
  History,
  Sparkles,
  Zap,
} from "lucide-react";
import { useDemo } from "@/context/DemoContext";
import { cn } from "@/lib/utils";

interface TemporalEventMarker {
  minute: number;
  timeStr: string;
  label: string;
  severity: "critical" | "high" | "mitigated";
}

const TIMELINE_MARKERS: TemporalEventMarker[] = [
  { minute: 0, timeStr: "14:20:00", label: "BASELINE SECURE", severity: "mitigated" },
  { minute: 12, timeStr: "14:32:08", label: "INITIAL VPN ANOMALY", severity: "critical" },
  { minute: 15, timeStr: "14:35:11", label: "POWERSHELL LSASS DUMP", severity: "critical" },
  { minute: 22, timeStr: "14:42:15", label: "SMB LATERAL PROPAGATION", severity: "high" },
  { minute: 30, timeStr: "14:50:00", label: "CROWN JEWEL DB STAGED", severity: "critical" },
  { minute: 40, timeStr: "15:00:00", label: "COUNTERFACTUAL ISOLATION", severity: "mitigated" },
];

export function TemporalConsole() {
  const {
    currentMinute,
    currentTime,
    isAttackRunning,
    isPaused,
    simulationSpeed,
    setSimulationSpeed,
    startAttackSimulation,
    pauseSimulation,
    resumeSimulation,
    resetDemo,
  } = useDemo();

  const [scrubPosition, setScrubPosition] = useState<number>(15);
  const [isRewinding, setIsRewinding] = useState<boolean>(false);

  const handleRewindStep = () => {
    setIsRewinding(true);
    setScrubPosition((prev) => Math.max(0, prev - 5));
    setTimeout(() => setIsRewinding(false), 500);
  };

  const handleForwardStep = () => {
    setScrubPosition((prev) => Math.min(45, prev + 5));
  };

  const speeds = [1, 2, 5, 10];

  return (
    <div className="relative rounded-[2px] border border-[#1A2730] bg-[#0B1117] p-4 font-mono shadow-[0_0_20px_rgba(25,230,255,0.05)]">
      {/* Corner crosshairs */}
      <div className="absolute -left-[1px] -top-[1px] size-1.5 border-l border-t border-[#19E6FF]/70 pointer-events-none" />
      <div className="absolute -right-[1px] -top-[1px] size-1.5 border-r border-t border-[#19E6FF]/70 pointer-events-none" />
      <div className="absolute -bottom-[1px] -left-[1px] size-1.5 border-b border-l border-[#19E6FF]/70 pointer-events-none" />
      <div className="absolute -bottom-[1px] -right-[1px] size-1.5 border-b border-r border-[#19E6FF]/70 pointer-events-none" />

      {/* Header Readout */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-[#1A2730] pb-2.5">
        <div className="flex items-center gap-2">
          <BrainCircuit className="size-3.5 text-[#19E6FF] animate-pulse" />
          <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#F2F7FA]">
            TEMPORAL INCIDENT RECONSTRUCTION ENGINE
          </span>
          <span className="text-[9.5px] text-[#6F9AAA] uppercase tracking-[0.12em]">// TIME SCRUBBER</span>
        </div>

        {/* Current Reconstructed Timestamp readout */}
        <div className="flex items-center gap-3 text-xs">
          <span className="flex items-center gap-1.5 rounded-[2px] border border-[#19E6FF]/30 bg-[#08758A]/20 px-2.5 py-1 text-[#19E6FF] font-bold text-[11px]">
            <Clock className="size-3 text-[#19E6FF]" />
            <span>TIME: {currentTime || "14:35:11 UTC"}</span>
            <span className="text-[#6F9AAA] text-[9.5px]">[T+{scrubPosition}m]</span>
          </span>

          {isRewinding && (
            <span className="rounded-[2px] bg-[#B77900]/20 px-2 py-1 text-[9.5px] font-bold text-[#FFD166] border border-[#FFB020]/40 animate-pulse">
              ◀ REVERSING STATE TRACES...
            </span>
          )}
        </div>
      </div>

      {/* Interactive Timeline Bar */}
      <div className="my-3 space-y-2.5">
        {/* Scrub Track */}
        <div className="relative h-5 w-full rounded-[2px] bg-[#05080C] p-0.5 border border-[#1A2730]">
          {/* Progress fill */}
          <div
            style={{ width: `${(scrubPosition / 45) * 100}%` }}
            className="h-full rounded-[1px] bg-gradient-to-r from-[#08758A]/30 via-[#3B82F6]/40 to-[#19E6FF] transition-all duration-200"
          />

          {/* Interactive Scrub Handle */}
          <div
            style={{ left: `${(scrubPosition / 45) * 100}%` }}
            className="absolute top-1/2 size-3.5 -translate-x-1/2 -translate-y-1/2 rounded-[1px] border border-[#19E6FF] bg-[#05080C] shadow-[0_0_8px_rgba(25,230,255,0.6)] cursor-pointer"
          />

          {/* Markers */}
          {TIMELINE_MARKERS.map((marker) => {
            const leftPct = (marker.minute / 45) * 100;
            return (
              <div
                key={marker.minute}
                onClick={() => setScrubPosition(marker.minute)}
                style={{ left: `${leftPct}%` }}
                className="group absolute top-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10"
                title={`${marker.timeStr} - ${marker.label}`}
              >
                <div
                  className={cn(
                    "size-2 rounded-full border",
                    marker.severity === "critical" && "bg-[#FF3045] border-[#FF5264]",
                    marker.severity === "high" && "bg-[#FFB020] border-[#FFD166]",
                    marker.severity === "mitigated" && "bg-[#20E3A2] border-[#5AF2C0]",
                  )}
                />
              </div>
            );
          })}
        </div>

        {/* Timeline Axis Labels */}
        <div className="flex items-center justify-between text-[9px] text-[#6F9AAA] uppercase tracking-[0.12em]">
          <span>PAST (PRE-BREACH)</span>
          <span className="font-medium text-[#19E6FF]">PATIENT ZERO INCIDENT HORIZON</span>
          <span>FUTURE (COUNTERFACTUAL)</span>
        </div>
      </div>

      {/* Playback Controls & Speed Multipliers */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#1A2730] pt-2.5">
        <div className="flex items-center gap-2">
          <button
            onClick={handleRewindStep}
            className="flex items-center gap-1.5 rounded-[2px] border border-[#FFB020]/40 bg-[#B77900]/10 px-3 py-1 text-[10.5px] font-mono font-bold text-[#FFD166] hover:bg-[#FFB020]/20 transition-colors cursor-pointer"
          >
            <Rewind className="size-3" />
            <span>[ ◀ REWIND 5m ]</span>
          </button>

          <button
            onClick={() => {
              if (!isAttackRunning && !isPaused) startAttackSimulation();
              else if (isAttackRunning) pauseSimulation();
              else resumeSimulation();
            }}
            className="flex items-center gap-1.5 rounded-[2px] border border-[#19E6FF]/40 bg-[#08758A]/20 px-3 py-1 text-[10.5px] font-mono font-bold text-[#19E6FF] hover:bg-[#19E6FF]/20 hover:text-white transition-colors cursor-pointer"
          >
            {!isAttackRunning && !isPaused ? (
              <>
                <Play className="size-3 fill-[#19E6FF]" />
                <span>PLAY RECONSTRUCTION</span>
              </>
            ) : isAttackRunning ? (
              <>
                <Pause className="size-3" />
                <span>PAUSE TIMELINE</span>
              </>
            ) : (
              <>
                <Play className="size-3 fill-[#19E6FF]" />
                <span>RESUME</span>
              </>
            )}
          </button>

          <button
            onClick={handleForwardStep}
            className="flex items-center gap-1.5 rounded-[2px] border border-[#1A2730] bg-[#080D12] px-3 py-1 text-[10.5px] font-mono text-[#A6B6C2] hover:text-[#F2F7FA] hover:border-[#19E6FF]/40 transition-colors cursor-pointer"
          >
            <FastForward className="size-3" />
            <span>FORWARD 5m</span>
          </button>
        </div>

        {/* Speed Selector */}
        <div className="flex items-center gap-1 text-xs">
          <span className="text-[9.5px] text-[#6F9AAA] mr-1">SPEED:</span>
          {speeds.map((s) => (
            <button
              key={s}
              onClick={() => setSimulationSpeed(s)}
              className={cn(
                "rounded-[2px] border px-2 py-0.5 text-[9.5px] font-mono font-bold transition-all cursor-pointer",
                simulationSpeed === s
                  ? "border-[#19E6FF] bg-[#08758A]/30 text-[#19E6FF] shadow-[0_0_8px_rgba(25,230,255,0.25)]"
                  : "border-[#1A2730] bg-[#080D12] text-[#667783] hover:text-[#F2F7FA]",
              )}
            >
              {s}x
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

