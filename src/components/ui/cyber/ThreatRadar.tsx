import React, { useState, useEffect } from "react";
import { Radar as RadarIcon, ShieldAlert, Activity, AlertTriangle } from "lucide-react";
import { useDemo } from "@/context/DemoContext";
import { cn } from "@/lib/utils";

interface ThreatBlip {
  id: string;
  name: string;
  sector: "IDENTITY" | "ENDPOINT" | "NETWORK" | "PROCESS" | "FILE" | "CLOUD";
  severity: "critical" | "high" | "medium";
  angle: number; // degrees
  radius: number; // percentage 20-85%
  mitre: string;
}

const BLIPS: ThreatBlip[] = [
  {
    id: "blip-1",
    name: "Credential Spray Anomaly",
    sector: "IDENTITY",
    severity: "critical",
    angle: 35,
    radius: 70,
    mitre: "T1110.003",
  },
  {
    id: "blip-2",
    name: "Encoded PowerShell Execution",
    sector: "PROCESS",
    severity: "critical",
    angle: 155,
    radius: 60,
    mitre: "T1059.001",
  },
  {
    id: "blip-3",
    name: "External C2 Beaconing",
    sector: "NETWORK",
    severity: "high",
    angle: 90,
    radius: 75,
    mitre: "T1071.001",
  },
  {
    id: "blip-4",
    name: "LSASS Memory Dump",
    sector: "ENDPOINT",
    severity: "critical",
    angle: 215,
    radius: 45,
    mitre: "T1003.001",
  },
  {
    id: "blip-5",
    name: "Staged Archive in Temp",
    sector: "FILE",
    severity: "medium",
    angle: 280,
    radius: 50,
    mitre: "T1074.001",
  },
  {
    id: "blip-6",
    name: "Privileged Token Impersonation",
    sector: "CLOUD",
    severity: "high",
    angle: 330,
    radius: 65,
    mitre: "T1134",
  },
];

export function ThreatRadar() {
  const { isAttackRunning, currentRisk } = useDemo();
  const [activeBlip, setActiveBlip] = useState<ThreatBlip | null>(BLIPS[0]);
  const [rotation, setRotation] = useState(0);

  // Radar continuous sweep
  useEffect(() => {
    const sweep = setInterval(() => {
      setRotation((r) => (r + 3) % 360);
    }, 40);
    return () => clearInterval(sweep);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center p-2 font-mono">
      {/* Radar Canvas Container */}
      <div className="relative size-64 sm:size-72 rounded-full border border-[#19E6FF]/25 bg-[#05080C] p-2 shadow-[0_0_20px_rgba(25,230,255,0.06)]">
        {/* Outer Concentric Rings */}
        <div className="absolute inset-4 rounded-full border border-[#19E6FF]/15" />
        <div className="absolute inset-12 rounded-full border border-[#19E6FF]/15" />
        <div className="absolute inset-20 rounded-full border border-[#19E6FF]/20" />
        <div className="absolute inset-28 rounded-full border border-[#FF3045]/30 bg-[#B91C2E]/10" />

        {/* Crosshair Axes */}
        <div className="absolute inset-x-0 top-1/2 h-[1px] -translate-y-1/2 bg-[#19E6FF]/15" />
        <div className="absolute inset-y-0 left-1/2 w-[1px] -translate-x-1/2 bg-[#19E6FF]/15" />

        {/* Sector Labels */}
        <span className="absolute top-2 left-1/2 -translate-x-1/2 text-[8.5px] font-semibold text-[#19E6FF] tracking-wider">
          NETWORK
        </span>
        <span className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[8.5px] font-semibold text-[#19E6FF] tracking-wider">
          ENDPOINT
        </span>
        <span className="absolute left-2 top-1/2 -translate-y-1/2 text-[8.5px] font-semibold text-[#19E6FF] tracking-wider">
          FILE
        </span>
        <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[8.5px] font-semibold text-[#19E6FF] tracking-wider">
          IDENTITY
        </span>

        {/* Rotating Sweep Beam */}
        <div
          style={{ transform: `rotate(${rotation}deg)` }}
          className="pointer-events-none absolute inset-0 origin-center transition-transform"
        >
          <div className="h-1/2 w-1/2 origin-bottom-right bg-gradient-to-l from-[#19E6FF]/20 via-[#19E6FF]/5 to-transparent [clip-path:polygon(100%_100%,0%_0%,100%_0%)]" />
        </div>

        {/* Threat Blips */}
        {BLIPS.map((blip) => {
          const rad = (blip.angle * Math.PI) / 180;
          const x = 50 + (blip.radius / 2) * Math.cos(rad);
          const y = 50 + (blip.radius / 2) * Math.sin(rad);
          const isSelected = activeBlip?.id === blip.id;

          return (
            <button
              key={blip.id}
              onClick={() => setActiveBlip(blip)}
              style={{ left: `${x}%`, top: `${y}%` }}
              className={cn(
                "group absolute -translate-x-1/2 -translate-y-1/2 rounded-full p-1 transition-all z-20 cursor-pointer",
                isSelected ? "scale-125" : "hover:scale-125",
              )}
            >
              <div
                className={cn(
                  "size-2 rounded-full",
                  blip.severity === "critical" &&
                    "bg-[#FF3045] shadow-[0_0_12px_rgba(255,48,69,0.8)] animate-ping",
                  blip.severity === "high" && "bg-[#FFB020] shadow-[0_0_10px_rgba(255,176,32,0.6)]",
                  blip.severity === "medium" && "bg-[#19E6FF] shadow-[0_0_8px_rgba(25,230,255,0.6)]",
                )}
              />
            </button>
          );
        })}

        {/* Center Target Core */}
        <div className="absolute left-1/2 top-1/2 flex size-15 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border border-[#FF3045]/60 bg-[#080D12] text-center shadow-[0_0_12px_rgba(255,48,69,0.3)]">
          <ShieldAlert className="size-3.5 text-[#FF3045] animate-pulse" />
          <span className="text-[7.5px] font-bold uppercase tracking-wider text-[#FF5264]">
            {currentRisk || "CRITICAL"}
          </span>
        </div>
      </div>

      {/* Selected Blip Detail Box */}
      {activeBlip && (
        <div className="mt-3 w-full rounded-[2px] border border-[#1A2730] bg-[#080D12] p-2.5 text-left text-xs font-mono">
          <div className="flex items-center justify-between border-b border-[#1A2730] pb-1 text-[9.5px]">
            <span className="font-bold text-[#FF5264] uppercase">
              ◈ SECTOR: {activeBlip.sector}
            </span>
            <span className="text-[#19E6FF]">MITRE: {activeBlip.mitre}</span>
          </div>
          <div className="mt-1 text-[11px] font-semibold text-[#F2F7FA]">{activeBlip.name}</div>
        </div>
      )}
    </div>
  );
}

