import React from "react";
import { Link } from "@tanstack/react-router";
import {
  Activity,
  ShieldAlert,
  ShieldCheck,
  Radio,
  Terminal,
  Cpu,
  Zap,
  Clock,
  Laptop,
  Server,
  Database,
  ArrowRight,
  BrainCircuit,
  FlaskConical,
  ListChecks,
  Radar,
  Lock,
} from "lucide-react";
import { useDemo } from "@/context/DemoContext";
import {
  CyberPanel,
  LiveAttackMap,
  ThreatRadar,
  TelemetryStream,
  TemporalConsole,
  SystemStatusBar,
  IncidentModule,
  AIInvestigationFeed,
} from "@/components/ui/cyber";
import { incidents } from "@/data/incidents";

export function DashboardView() {
  const { isAttackRunning, currentRisk, currentTime } = useDemo();

  return (
    <div className="space-y-5 font-mono">
      {/* Top Global System Status Bar */}
      <SystemStatusBar />

      {/* Cinematic Command Center Hero Banner */}
      <div className="relative overflow-hidden rounded border border-cyan-500/40 bg-gradient-to-r from-[#050B12] via-[#04080D] to-[#020508] p-5 backdrop-blur-xl shadow-[0_0_40px_rgba(0,229,255,0.08)]">
        <div className="absolute -left-1 -top-1 size-3 border-l-2 border-t-2 border-cyan-400" />
        <div className="absolute -right-1 -top-1 size-3 border-r-2 border-t-2 border-cyan-400" />
        <div className="absolute -bottom-1 -left-1 size-3 border-b-2 border-l-2 border-cyan-400" />
        <div className="absolute -bottom-1 -right-1 size-3 border-b-2 border-r-2 border-cyan-400" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2 text-[11px] text-cyan-400">
              <span className="flex items-center gap-1.5 rounded-sm border border-cyan-500/30 bg-cyan-950/40 px-2 py-0.5">
                <Radio className="size-3 text-cyan-400 animate-pulse" />
                GLOBAL DEFENSE MATRIX
              </span>
              <span className="text-slate-600">//</span>
              <span className="text-slate-400 uppercase tracking-widest">
                NODE: TM-CORE-01 // SECTOR 07
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white uppercase font-sans">
              SYSTEM UNDER{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-400 drop-shadow-[0_0_20px_rgba(0,229,255,0.4)]">
                CONTINUOUS OBSERVATION
              </span>
            </h1>

            <p className="max-w-2xl font-sans text-xs text-slate-400 leading-relaxed">
              Every packet, process spawn, and Kerberos ticket is correlated into an immutable temporal
              timeline. Observe attack progression in real-time, rewind to initial patient zero, and test
              counterfactual response actions.
            </p>
          </div>

          {/* Threat Matrix Status Pill */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 shrink-0">
            <div className="rounded border border-red-500/50 bg-red-950/30 p-3.5 shadow-[0_0_25px_rgba(255,38,56,0.2)]">
              <div className="text-[10px] text-red-400 uppercase tracking-wider font-bold flex items-center gap-1.5">
                <ShieldAlert className="size-3.5 text-red-400 animate-pulse" />
                DEFENSE MATRIX STATUS
              </div>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="text-2xl font-extrabold text-red-300 font-sans tracking-tight">
                  {currentRisk?.toUpperCase() || "CRITICAL"}
                </span>
                <span className="text-[10px] text-red-400">THREAT ACTIVE</span>
              </div>
            </div>

            <Link
              to="/time-machine"
              className="flex items-center gap-2 rounded bg-cyan-400 px-4 py-3 font-mono text-xs font-bold text-black shadow-[0_0_25px_rgba(0,229,255,0.4)] hover:bg-cyan-300 hover:scale-105 transition-all cursor-pointer"
            >
              <BrainCircuit className="size-4 fill-black" />
              <span>[ LAUNCH TIME MACHINE ]</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Centerpiece: Live Cyberattack Topology Map */}
      <LiveAttackMap />

      {/* Dual Tactical Radar & Real-Time Telemetry Stream Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <div className="lg:col-span-5">
          <CyberPanel
            title="TACTICAL THREAT RADAR"
            subtitle="SECTOR SURVEILLANCE"
            badge="LIVE 360°"
            badgeVariant="cyan"
            glow="cyan"
            className="h-full"
          >
            <ThreatRadar />
          </CyberPanel>
        </div>

        <div className="lg:col-span-7">
          <CyberPanel
            title="REAL-TIME TELEMETRY INGEST"
            subtitle="STREAM SOCKET"
            badge="INGESTING"
            badgeVariant="green"
            glow="none"
            className="h-full"
          >
            <TelemetryStream />
          </CyberPanel>
        </div>
      </div>

      {/* Temporal Reconstruction Console (Time Scrubber) */}
      <TemporalConsole />

      {/* Active Forensic Incident Modules Row */}
      <div className="space-y-3">
        <div className="flex items-center justify-between border-b border-border/80 pb-2">
          <div className="flex items-center gap-2">
            <ShieldAlert className="size-4 text-red-400 animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-100">
              ACTIVE FORENSIC INCIDENT MODULES
            </span>
            <span className="text-[10px] text-muted-foreground uppercase">// REAL-TIME CORRELATION</span>
          </div>

          <Link
            to="/incidents"
            className="flex items-center gap-1 text-[11px] text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            <span>VIEW ALL INCIDENTS (03)</span>
            <ArrowRight className="size-3" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <IncidentModule
            id="inc-2048"
            incidentNumber="INC-2048"
            title="Multi-Stage Kerberos Compromise & DB Exfil"
            severity="CRITICAL"
            firstObserved="14:32:08 UTC"
            attackVector="EXTERNAL VPN SPRAY"
            mitreCode="T1110.003 / T1059.001"
            affectedAssetsCount={4}
            progressionPercent={87}
            status="ACTIVE"
          />

          <IncidentModule
            id="inc-2049"
            incidentNumber="INC-2049"
            title="Living-Off-the-Land PowerShell Discovery"
            severity="HIGH"
            firstObserved="14:15:30 UTC"
            attackVector="INTERNAL BEACONING"
            mitreCode="T1087 / T1018"
            affectedAssetsCount={2}
            progressionPercent={45}
            status="INVESTIGATING"
          />

          <div className="h-full">
            <AIInvestigationFeed />
          </div>
        </div>
      </div>
    </div>
  );
}
