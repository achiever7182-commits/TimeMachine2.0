import { Link } from "@tanstack/react-router";
import { ArrowRight, BrainCircuit, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AttackGraph } from "@/components/attack-graph/AttackGraph";
import { GlassPanel, PageHeader } from "@/components/layout/PageHeader";
import { IncidentTimeline } from "@/components/timeline/IncidentTimeline";
import { IrisInvestigationPanel } from "@/components/iris/IrisInvestigationPanel";
import IncidentTimeMachine3D from "@/components/ui/incident-time-machine-3d";
import { useDemo } from "@/context/DemoContext";
import { cn } from "@/lib/utils";

export function TimeMachineView() {
  const { incident, incidentState, currentTime, currentRisk } = useDemo();
  const minute = incidentState.minute;

  // Dynamic blast radius calculation at this moment in time
  const confirmedCount = incidentState.compromisedAssetIds.length;
  const filesExposed = minute >= 36 ? 37 : 0;

  const dynamicBlastRadius = [
    {
      label: "compromised account",
      count: minute >= 18 ? "1" : "0",
      impact: minute >= 18 ? ("confirmed" as const) : ("potential" as const),
    },
    {
      label: "endpoints",
      count: minute >= 18 ? "1" : "0",
      impact: minute >= 18 ? ("confirmed" as const) : ("potential" as const),
    },
    {
      label: "internal server",
      count: minute >= 25 ? "1" : "0",
      impact: minute >= 25 ? ("confirmed" as const) : ("potential" as const),
    },
    {
      label: "database",
      count: minute >= 30 ? "1" : "0",
      impact: minute >= 30 ? ("confirmed" as const) : ("potential" as const),
    },
    {
      label: "potentially exposed files",
      count: String(filesExposed),
      impact: "potential" as const,
    },
  ];

  // Dynamic state summary text at this exact simulated moment
  const summaryText =
    minute >= 42
      ? "Incident INC-2048 declared. Multiple suspicious activities correlated across identity, endpoint, server, and database tiers. Attacker accessed customer DB and staged sensitive files."
      : minute >= 36
        ? "Attacker attempting mass file access targeting 37 confidential documents on FILE-SRV-01 after querying production database."
        : minute >= 30
          ? "Attacker has traversed to DB-PROD-01 and executed high-volume queries against customer identity tables."
          : minute >= 25
            ? "Lateral movement confirmed from LAPTOP-042 to internal application server SERVER-03 via administrative session."
            : minute >= 22
              ? "Suspicious encoded PowerShell process observed executing on LAPTOP-042 within user session."
              : minute >= 18
                ? "Employee identity alex.m confirmed compromised. Interactive session active on workstation LAPTOP-042."
                : minute >= 5
                  ? "Earliest detectable opportunity: Unfamiliar foreign IP and multiple authentication failures observed. Response at this stage would have prevented endpoint compromise."
                  : minute >= 2
                    ? "Repeated authentication failures observed from anomalous IP address targeting employee credentials."
                    : "Initial authentication anomaly recorded from unfamiliar IP location. Environment systems nominal.";

  return (
    <div className="mx-auto max-w-7xl animate-fade-in">
      <PageHeader
        eyebrow={`Incident Time Machine · ${incident.id}`}
        title={incident.title}
        description="Reconstruct the incident timeline and explore alternate response decisions."
        actions={
          <>
            <span
              className={cn(
                "inline-flex items-center rounded-full border px-3 py-2 text-xs font-semibold uppercase",
                currentRisk === "CRITICAL" || currentRisk === "Critical"
                  ? "border-threat/40 bg-threat/10 text-threat"
                  : currentRisk === "HIGH" || currentRisk === "High"
                    ? "border-warning/40 bg-warning/10 text-warning"
                    : "border-cyan-glow bg-primary/10 text-cyan-signal",
              )}
            >
              <ShieldAlert className="mr-2 size-4" />
              {currentRisk}
            </span>
            <Button asChild>
              <Link to="/simulation-lab">
                Open Simulation Lab <ArrowRight className="size-4" />
              </Link>
            </Button>
          </>
        }
      />

      {/* Interactive 3D Execution Pipeline Scene */}
      <div className="my-6 h-[520px] w-full overflow-hidden rounded-2xl border border-cyan-glow/30 bg-card/40 shadow-glow">
        <IncidentTimeMachine3D height="100%" />
      </div>

      <IncidentTimeline />

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.45fr_0.55fr]">
        <AttackGraph />
        <GlassPanel className="p-5">
          <div className="flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-lg bg-primary/15 text-cyan-signal">
              <BrainCircuit className="size-5" />
            </span>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-signal">
                AI incident summary
              </p>
              <p className="font-mono text-xs text-muted-foreground">State at {currentTime}</p>
            </div>
          </div>
          <p className="mt-5 text-sm leading-7 text-foreground typewriter-reveal">{summaryText}</p>
          <div className="mt-5 border-t border-border pt-3">
            <p className="font-mono text-xs text-muted-foreground">
              Simulated Stage: <span className="text-cyan-signal">{incidentState.stage}</span>
            </p>
          </div>
        </GlassPanel>
      </div>

      <GlassPanel className="mt-6 p-5">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-signal">
              Potential blast radius
            </p>
            <h2 className="mt-1 text-xl font-semibold">
              Confirmed movement vs. potential exposure
            </h2>
          </div>
          <div className="flex gap-4 text-sm">
            <span>
              <strong className="text-threat">{confirmedCount}</strong> confirmed assets
            </span>
            <span>
              <strong className="text-warning">{filesExposed}</strong> estimated exposure
            </span>
          </div>
        </div>
        <div className="mt-6 flex flex-col items-stretch gap-2 md:flex-row md:items-center">
          {dynamicBlastRadius.map((node, index) => (
            <div key={node.label} className="flex flex-1 items-center gap-2">
              <div
                className={cn(
                  "flex min-h-24 flex-1 flex-col items-center justify-center rounded-lg border p-3 text-center transition-colors",
                  node.count !== "0" && node.impact === "confirmed"
                    ? "border-threat/35 bg-threat/8"
                    : node.count !== "0"
                      ? "border-warning/35 bg-warning/8"
                      : "border-border bg-secondary/20 opacity-50",
                )}
              >
                <span
                  className={cn(
                    "text-2xl font-semibold",
                    node.count !== "0" && node.impact === "confirmed"
                      ? "text-threat"
                      : node.count !== "0"
                        ? "text-warning"
                        : "text-muted-foreground",
                  )}
                >
                  {node.count}
                </span>
                <span className="mt-1 text-xs text-muted-foreground">{node.label}</span>
                <span className="mt-2 text-[10px] font-semibold uppercase tracking-[0.15em]">
                  {node.impact}
                </span>
              </div>
              {index < dynamicBlastRadius.length - 1 ? (
                <ArrowRight className="hidden size-4 shrink-0 text-muted-foreground md:block" />
              ) : null}
            </div>
          ))}
        </div>
      </GlassPanel>

      {/* IRIS Contextual Panel (Phase 5 Requirement 26) */}
      <div className="mt-6">
        <IrisInvestigationPanel
          title="IRIS Forensic Time Machine Assistant"
          defaultPrompt="What did defenders know here?"
          suggestedQuestions={[
            "What did defenders know here?",
            "What happened?",
            "When did the attack really begin?",
            "What did we miss?",
          ]}
          compact={true}
        />
      </div>
    </div>
  );
}
