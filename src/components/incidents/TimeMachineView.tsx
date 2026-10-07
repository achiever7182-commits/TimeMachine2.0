import { Link } from "@tanstack/react-router";
import { ArrowRight, BrainCircuit, ShieldAlert, Clock, Play, RotateCcw, FastForward, Activity, Zap, Server, Database, UserCheck, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { AttackGraph } from "@/components/attack-graph/AttackGraph";
import { IncidentTimeline } from "@/components/timeline/IncidentTimeline";
import { IrisInvestigationPanel } from "@/components/iris/IrisInvestigationPanel";
import IncidentTimeMachine3D from "@/components/ui/incident-time-machine-3d";
import { TemporalCoreCube } from "@/components/ui/3d-animation";
import { useDemo } from "@/context/DemoContext";
import { cn } from "@/lib/utils";
import { CyberPanel } from "@/components/ui/cyber/CyberPanel";
import { TemporalConsole } from "@/components/ui/cyber/TemporalConsole";

export function TimeMachineView() {
  const { incident, incidentState, currentTime, currentRisk } = useDemo();
  const [viewMode, setViewMode] = useState<"cube" | "pipeline">("cube");
  const minute = incidentState.minute;

  // Dynamic blast radius calculation at this moment in time
  const confirmedCount = incidentState.compromisedAssetIds.length;
  const filesExposed = minute >= 36 ? 37 : 0;

  const dynamicBlastRadius = [
    {
      label: "COMPROMISED IDENTITY",
      count: minute >= 18 ? "01" : "00",
      target: "alex.m (analyst01)",
      impact: minute >= 18 ? ("confirmed" as const) : ("potential" as const),
    },
    {
      label: "ENDPOINTS ACCESSED",
      count: minute >= 18 ? "01" : "00",
      target: "LAPTOP-042 (10.24.17.82)",
      impact: minute >= 18 ? ("confirmed" as const) : ("potential" as const),
    },
    {
      label: "INTERNAL SERVERS",
      count: minute >= 25 ? "01" : "00",
      target: "SERVER-03 (10.24.17.110)",
      impact: minute >= 25 ? ("confirmed" as const) : ("potential" as const),
    },
    {
      label: "DATABASE REACHED",
      count: minute >= 30 ? "01" : "00",
      target: "DB-PROD-01 (10.24.17.200)",
      impact: minute >= 30 ? ("confirmed" as const) : ("potential" as const),
    },
    {
      label: "EXPOSED FILES",
      count: String(filesExposed).padStart(2, "0"),
      target: "FILE-SRV-01 / SECRETS",
      impact: "potential" as const,
    },
  ];

  // Dynamic state summary text at this exact simulated moment
  const summaryText =
    minute >= 42
      ? "CRITICAL INCIDENT DECLARED. Full temporal reconstruction confirms automated credential spraying followed by interactive PowerShell execution, privilege escalation on SERVER-03, and SQL exfiltration targeting DB-PROD-01."
      : minute >= 36
        ? "MASS FILE STAGING IN PROGRESS. Attacker attempting exfiltration targeting 37 high-value corporate identity records on FILE-SRV-01."
        : minute >= 30
          ? "LATERAL MOVEMENT TO PRODUCTION DATABASE. Unauthorized queries detected against customer credential tables on DB-PROD-01."
          : minute >= 25
            ? "ADMINISTRATIVE LATERAL TRAVERSAL. Attacker pivoted from endpoint LAPTOP-042 to application server SERVER-03."
            : minute >= 22
              ? "ANOMALOUS PROCESS EXECUTION. Encoded PowerShell payload executed under user PID 4812."
              : minute >= 18
                ? "IDENTITY BREACH CONFIRMED. Active external VPN session established using valid credentials for user alex.m."
                : minute >= 5
                  ? "FIRST DETECTABLE WINDOW: High-frequency authentication failures observed from external IP 185.220.101.4."
                  : minute >= 2
                    ? "REPEATED AUTH FAILURES. Initial password spray anomaly logged against identity gateway."
                    : "ENVIRONMENT NOMINAL. All security nodes synchronized.";

  return (
    <div className="mx-auto max-w-7xl space-y-6 font-sans">
      {/* HEADER HUD */}
      <div className="flex flex-col gap-4 border-b border-[#1B2933] pb-5 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1.5 font-mono text-[10px] text-[#16D9F2] tracking-[0.2em] uppercase">
            <BrainCircuit className="size-3.5 text-[#16D9F2] animate-pulse" />
            <span>TEMPORAL INCIDENT RECONSTRUCTION ENGINE // TIME MACHINE</span>
          </div>
          <h1 className="font-mono text-2xl font-black uppercase tracking-wider text-[#F3F7FA] flex items-center gap-3">
            {incident.id} // {incident.title}
            <span className={cn(
              "text-[10px] font-mono px-2 py-0.5 border font-bold rounded-[2px]",
              currentRisk === "CRITICAL" ? "border-[#FF3347] bg-[#FF3347]/15 text-[#FF3347]" : "border-[#FFB020] bg-[#FFB020]/15 text-[#FFB020]"
            )}>
              {currentRisk} STATE
            </span>
          </h1>
        </div>

        <div className="flex items-center gap-3 font-mono">
          <Button
            asChild
            size="sm"
            className="rounded-[3px] bg-[#16D9F2]/10 text-[#16D9F2] border border-[#16D9F2]/40 hover:bg-[#16D9F2] hover:text-[#05080C] font-bold text-xs h-8 cursor-pointer shadow-[0_0_10px_rgba(22,217,242,0.12)]"
          >
            <Link to="/simulation-lab">
              ⚡ SIMULATION LAB &gt;
            </Link>
          </Button>
        </div>
      </div>

      {/* TEMPORAL SCRUBBER CONSOLE */}
      <TemporalConsole />

      {/* 3D TEMPORAL VISUALIZER */}
      <CyberPanel
        title="3D RECONSTRUCTION ENVIRONMENT"
        badge="SPATIAL TOPOLOGY"
        badgeColor="cyan"
      >
        <div className="space-y-3">
          <div className="flex items-center justify-between border-b border-[#1B2933] pb-2 font-mono text-xs">
            <span className="text-[#7893A1] text-[10px]">&gt; RENDER MODE:</span>
            <div className="flex gap-2">
              <Button
                variant={viewMode === "cube" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("cube")}
                className={cn(
                  "rounded-[3px] h-7 text-[10px] font-mono cursor-pointer",
                  viewMode === "cube" ? "bg-[#16D9F2] text-[#05080C] font-bold" : "border-[#1B2933] bg-transparent text-[#7893A1]"
                )}
              >
                [ ◈ 3D TEMPORAL CORE CUBE ]
              </Button>
              <Button
                variant={viewMode === "pipeline" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("pipeline")}
                className={cn(
                  "rounded-[3px] h-7 text-[10px] font-mono cursor-pointer",
                  viewMode === "pipeline" ? "bg-[#16D9F2] text-[#05080C] font-bold" : "border-[#1B2933] bg-transparent text-[#7893A1]"
                )}
              >
                [ ◈ 3D PIPELINE TOPOLOGY ]
              </Button>
            </div>
          </div>

          {viewMode === "cube" ? (
            <TemporalCoreCube
              incidentId={incident.id}
              incidentTitle={incident.title}
              minute={minute}
              stage={incidentState.stage}
              currentTime={currentTime}
              currentRisk={currentRisk}
              compromisedAssets={incidentState.compromisedAssetIds}
            />
          ) : (
            <div className="h-[520px] w-full overflow-hidden border border-[#1B2933] bg-[#05080C]">
              <IncidentTimeMachine3D height="100%" />
            </div>
          )}
        </div>
      </CyberPanel>

      {/* DETAILED TIMELINE SCROLLER */}
      <IncidentTimeline />

      {/* ATTACK GRAPH & FORENSIC SUMMARY */}
      <div className="grid gap-6 xl:grid-cols-[1.45fr_0.55fr]">
        <AttackGraph />
        
        {/* Real-time Stage Briefing */}
        <CyberPanel
          title="AUTONOMOUS INCIDENT SUMMARY"
          badge={`T+${minute}m STATE`}
          badgeColor="blue"
        >
          <div className="space-y-4 font-mono">
            <div className="flex items-center gap-2 text-[10px] text-[#16D9F2] border-b border-[#1B2933] pb-2">
              <Clock className="size-3 text-[#16D9F2]" />
              <span>TIME SLICE: {currentTime} UTC</span>
            </div>
            
            <p className="text-xs text-[#F3F7FA] leading-relaxed bg-[#0B1117] p-3.5 border border-[#1B2933] rounded-[3px]">
              {summaryText}
            </p>

            <div className="border-t border-[#1B2933] pt-3 text-[10px] text-[#7893A1] space-y-1.5">
              <div className="flex justify-between">
                <span>SIMULATED STAGE:</span>
                <span className="text-[#16D9F2] font-bold">{incidentState.stage}</span>
              </div>
              <div className="flex justify-between">
                <span>COMPROMISED ASSETS:</span>
                <span className="text-[#FF3347] font-bold">{confirmedCount} CONFIRMED</span>
              </div>
            </div>
          </div>
        </CyberPanel>
      </div>

      {/* DYNAMIC BLAST RADIUS MATRIX */}
      <CyberPanel
        title="DYNAMIC BLAST RADIUS & THREAT PROPAGATION"
        badge={`${confirmedCount} CONFIRMED // ${filesExposed} EXPOSED`}
        badgeColor="red"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 font-mono">
          {dynamicBlastRadius.map((node, index) => (
            <div
              key={node.label}
              className={cn(
                "border p-3.5 flex flex-col justify-between transition-all rounded-[3px]",
                node.count !== "00" && node.impact === "confirmed"
                  ? "border-[#FF3347] bg-[#FF3347]/10 shadow-[0_0_10px_rgba(255,51,71,0.12)]"
                  : node.count !== "00"
                    ? "border-[#FFB020]/50 bg-[#FFB020]/10"
                    : "border-[#1B2933] bg-[#070C11] opacity-50",
              )}
            >
              <div>
                <span className="text-[8.5px] text-[#7893A1] uppercase block mb-1">{node.label}</span>
                <span className={cn(
                  "text-2xl font-black block font-mono",
                  node.count !== "00" && node.impact === "confirmed"
                    ? "text-[#FF3347]"
                    : node.count !== "00"
                      ? "text-[#FFB020]"
                      : "text-[#647682]"
                )}>
                  {node.count}
                </span>
                <p className="text-[9px] text-[#F3F7FA] truncate mt-1">{node.target}</p>
              </div>

              <div className="mt-3 pt-2 border-t border-[#1B2933] flex items-center justify-between text-[8px] uppercase">
                <span className={cn(
                  node.impact === "confirmed" && node.count !== "00" ? "text-[#FF3347] font-bold" : "text-[#647682]"
                )}>
                  [{node.impact}]
                </span>
                <span className="text-[#647682]/60">HOP {index + 1}</span>
              </div>
            </div>
          ))}
        </div>
      </CyberPanel>

      {/* IRIS FORENSIC ASSISTANT */}
      <IrisInvestigationPanel
        title="IRIS FORENSIC TIME MACHINE ASSISTANT"
        defaultPrompt="What did defenders know here?"
        suggestedQuestions={[
          "What did defenders know at this exact minute?",
          "How did the attacker pivot from WS-019 to SERVER-03?",
          "When did the initial password spraying begin?",
          "What automated containment rule could have stopped this?",
        ]}
        compact={true}
      />
    </div>
  );
}

