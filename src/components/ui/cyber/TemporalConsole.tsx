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
    <div className="relative rounded border border-cyan-500/40 bg-[#04080D] p-4 font-mono shadow-[0_0_30px_rgba(0,229,255,0.06)]">
      {/* Corner crosshairs */}
      <div className="absolute -left-[1px] -top-[1px] size-2 border-l border-t border-cyan-400" />
      <div className="absolute -right-[1px] -top-[1px] size-2 border-r border-t border-cyan-400" />
      <div className="absolute -bottom-[1px] -left-[1px] size-2 border-b border-l border-cyan-400" />
      <div className="absolute -bottom-[1px] -right-[1px] size-2 border-b border-r border-cyan-400" />

      {/* Header Readout */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-border/70 pb-3">
        <div className="flex items-center gap-2">
          <BrainCircuit className="size-4 text-cyan-400 animate-pulse" />
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-slate-100">
            TEMPORAL INCIDENT RECONSTRUCTION ENGINE
          </span>
          <span className="text-[10px] text-cyan-400 uppercase">// TIME SCRUBBER</span>
        </div>

        {/* Current Reconstructed Timestamp readout */}
        <div className="flex items-center gap-3 text-xs">
          <span className="flex items-center gap-1.5 rounded border border-cyan-500/30 bg-cyan-950/40 px-2.5 py-1 text-cyan-300 font-bold">
            <Clock className="size-3.5 text-cyan-400" />
            <span>TIME: {currentTime || "14:35:11 UTC"}</span>
            <span className="text-slate-400 text-[10px]">[T+{scrubPosition}m]</span>
          </span>

          {isRewinding && (
            <span className="rounded bg-amber-950/60 px-2 py-1 text-[10px] font-bold text-amber-300 border border-amber-500/40 animate-pulse">
              ◀ REVERSING STATE TRACES...
            </span>
          )}
        </div>
      </div>

      {/* Interactive Timeline Bar */}
      <div className="my-4 space-y-3">
        {/* Scrub Track */}
        <div className="relative h-6 w-full rounded bg-black/80 p-1 border border-border/60">
          {/* Progress fill */}
          <div
            style={{ width: `${(scrubPosition / 45) * 100}%` }}
            className="h-full rounded-sm bg-gradient-to-r from-cyan-500/30 via-sky-500/50 to-cyan-400 transition-all duration-200"
          />

          {/* Interactive Scrub Handle */}
          <div
            style={{ left: `${(scrubPosition / 45) * 100}%` }}
            className="absolute top-1/2 size-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-cyan-400 bg-black shadow-[0_0_12px_rgba(0,229,255,0.8)] cursor-pointer"
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
                    marker.severity === "critical" && "bg-red-500 border-red-300",
                    marker.severity === "high" && "bg-amber-400 border-amber-200",
                    marker.severity === "mitigated" && "bg-emerald-400 border-emerald-200",
                  )}
                />
              </div>
            );
          })}
        </div>

        {/* Timeline Axis Labels */}
        <div className="flex items-center justify-between text-[10px] text-muted-foreground uppercase">
          <span className="flex items-center gap-1">
            <span>PAST (PRE-BREACH)</span>
          </span>
          <span className="font-bold text-cyan-400">PATIENT ZERO INCIDENT HORIZON</span>
          <span>FUTURE (COUNTERFACTUAL)</span>
        </div>
      </div>

      {/* Playback Controls & Speed Multipliers */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border/70 pt-3">
        <div className="flex items-center gap-2">
          <button
            onClick={handleRewindStep}
            className="flex items-center gap-1.5 rounded border border-amber-500/40 bg-amber-950/20 px-3 py-1.5 text-xs font-bold text-amber-300 hover:bg-amber-500/20 transition-colors cursor-pointer"
          >
            <Rewind className="size-3.5" />
            <span>[ ◀ REWIND 5m ]</span>
          </button>

          <button
            onClick={() => {
              if (!isAttackRunning && !isPaused) startAttackSimulation();
              else if (isAttackRunning) pauseSimulation();
              else resumeSimulation();
            }}
            className="flex items-center gap-1.5 rounded border border-cyan-500/40 bg-cyan-950/30 px-3.5 py-1.5 text-xs font-bold text-cyan-300 hover:bg-cyan-500/20 hover:text-white transition-colors cursor-pointer"
          >
            {!isAttackRunning && !isPaused ? (
              <>
                <Play className="size-3.5 fill-cyan-400" />
                <span>PLAY RECONSTRUCTION</span>
              </>
            ) : isAttackRunning ? (
              <>
                <Pause className="size-3.5" />
                <span>PAUSE TIMELINE</span>
              </>
            ) : (
              <>
                <Play className="size-3.5 fill-cyan-400" />
                <span>RESUME</span>
              </>
            )}
          </button>

          <button
            onClick={handleForwardStep}
            className="flex items-center gap-1.5 rounded border border-cyan-500/30 bg-black/40 px-3 py-1.5 text-xs text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            <FastForward className="size-3.5" />
            <span>FORWARD 5m</span>
          </button>
        </div>

        {/* Speed Selector */}
        <div className="flex items-center gap-1 text-xs">
          <span className="text-[10px] text-muted-foreground mr-1">SPEED:</span>
          {speeds.map((s) => (
            <button
              key={s}
              onClick={() => setSimulationSpeed(s)}
              className={cn(
                "rounded border px-2 py-0.5 text-[10px] font-bold transition-all cursor-pointer",
                simulationSpeed === s
                  ? "border-cyan-400 bg-cyan-500/20 text-cyan-300 shadow-[0_0_10px_rgba(0,229,255,0.3)]"
                  : "border-border/60 bg-black/40 text-slate-400 hover:text-white",
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
