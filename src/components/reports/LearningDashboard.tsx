import { Link } from "@tanstack/react-router";
import {
  Clock,
  ShieldCheck,
  ShieldAlert,
  Zap,
  TrendingDown,
  Database,
  Server,
  Laptop,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  GitBranch,
  Sparkles,
  ExternalLink,
  Target,
  FileSearch,
  ListTodo,
  CheckCircle,
  Clock4,
  AlertCircle,
  Tag,
  ArrowUpRight,
  Lightbulb,
} from "lucide-react";
import type {
  IncidentReport,
  ActionItemStatus,
  RecommendationPriority,
} from "@/types/incidentReport";
import { Button } from "@/components/ui/button";
import { useDemo } from "@/context/DemoContext";

interface LearningDashboardProps {
  report: IncidentReport;
}

export function LearningDashboard({ report }: LearningDashboardProps) {
  const { updateActionItemStatus } = useDemo();
  const {
    learningMetrics,
    counterfactualAnalysis,
    detectionGap,
    whatWeMissed,
    lessonsLearned,
    recommendations,
    actionItems,
    attackPath,
    responseAnalysis,
  } = report;

  const handleStatusChange = (itemId: string, newStatus: ActionItemStatus) => {
    updateActionItemStatus(itemId, newStatus);
  };

  const getPriorityBadgeClass = (priority: RecommendationPriority) => {
    switch (priority) {
      case "HIGH":
        return "bg-rose-500/20 text-rose-300 border-rose-500/40";
      case "MEDIUM":
        return "bg-amber-500/20 text-amber-300 border-amber-500/40";
      case "LOW":
        return "bg-cyan-500/20 text-cyan-300 border-cyan-500/40";
    }
  };

  const getStatusBadgeClass = (status: ActionItemStatus) => {
    switch (status) {
      case "COMPLETED":
        return "bg-emerald-500/20 text-emerald-300 border-emerald-500/40";
      case "IN_PROGRESS":
        return "bg-cyan-500/20 text-cyan-300 border-cyan-500/40";
      case "OPEN":
        return "bg-amber-500/20 text-amber-300 border-amber-500/40";
      case "DEFERRED":
        return "bg-zinc-500/20 text-zinc-400 border-zinc-500/40";
    }
  };

  return (
    <div className="space-y-10 animate-fade-in text-foreground">
      {/* Simulation Notice Banner */}
      <div className="flex items-center justify-between gap-3 rounded-xl border border-cyan-500/30 bg-cyan-500/10 px-4 py-3 text-xs text-cyan-200">
        <div className="flex items-center gap-2">
          <Sparkles className="size-4 shrink-0 text-cyan-400" />
          <span>
            <strong>POST-INCIDENT LEARNING SYSTEM:</strong> Sourced from deterministic Phase 1–5
            telemetry, isolated Phase 4 counterfactual simulation branches, and IRIS investigation
            findings.
          </span>
        </div>
        <span className="font-mono text-[10px] uppercase font-bold text-cyan-400 border border-cyan-500/30 px-2 py-0.5 rounded bg-cyan-500/20">
          CLOSED-LOOP POST-MORTEM
        </span>
      </div>

      {/* Measurable Top Metrics Overview */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="rounded-xl border border-border/80 bg-card/60 p-4 backdrop-blur-sm">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1">
            <Clock className="size-3.5 text-amber-400" />
            <span>Detection Delay</span>
          </div>
          <div className="text-2xl font-bold font-mono text-amber-400">
            {learningMetrics.detectionDelayMinutes}m
          </div>
          <div className="text-[10px] text-muted-foreground mt-1">09:47 to 10:24 gap</div>
        </div>

        <div className="rounded-xl border border-border/80 bg-card/60 p-4 backdrop-blur-sm">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1">
            <Laptop className="size-3.5 text-rose-400" />
            <span>Actual Compromised</span>
          </div>
          <div className="text-2xl font-bold font-mono text-rose-400">
            {learningMetrics.actualCompromisedAssets}
          </div>
          <div className="text-[10px] text-muted-foreground mt-1">
            vs {learningMetrics.counterfactualCompromisedAssets} if contained
          </div>
        </div>

        <div className="rounded-xl border border-border/80 bg-card/60 p-4 backdrop-blur-sm">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1">
            <Server className="size-3.5 text-rose-400" />
            <span>Critical Assets</span>
          </div>
          <div className="text-2xl font-bold font-mono text-rose-400">
            {learningMetrics.criticalAssetsAffected}
          </div>
          <div className="text-[10px] text-emerald-400 font-medium mt-1">0 in counterfactual</div>
        </div>

        <div className="rounded-xl border border-border/80 bg-card/60 p-4 backdrop-blur-sm">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1">
            <CheckCircle2 className="size-3.5 text-emerald-400" />
            <span>Prevented Events</span>
          </div>
          <div className="text-2xl font-bold font-mono text-emerald-400">
            +{learningMetrics.preventedEventsCount}
          </div>
          <div className="text-[10px] text-muted-foreground mt-1">Downstream attack stages</div>
        </div>

        <div className="rounded-xl border border-border/80 bg-card/60 p-4 backdrop-blur-sm">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1">
            <Database className="size-3.5 text-cyan-400" />
            <span>Data Stores Saved</span>
          </div>
          <div className="text-2xl font-bold font-mono text-cyan-400">
            {learningMetrics.potentialDataStoresExposed -
              learningMetrics.counterfactualDataStoresExposed}
          </div>
          <div className="text-[10px] text-muted-foreground mt-1">DB-PROD-01 & FILE-SRV-01</div>
        </div>

        <div className="rounded-xl border border-border/80 bg-card/60 p-4 backdrop-blur-sm">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1">
            <Zap className="size-3.5 text-indigo-400" />
            <span>Response Score</span>
          </div>
          <div className="text-2xl font-bold font-mono text-indigo-400">
            {learningMetrics.responseEffectivenessScore}%
          </div>
          <div className="text-[10px] text-emerald-400 font-medium mt-1">Effective containment</div>
        </div>
      </div>

      {/* SECTION 1 — DETECTION GAP VISUALIZATION */}
      <section className="rounded-2xl border border-border/80 bg-card/60 p-6 md:p-8 backdrop-blur-md space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border/60 pb-4">
          <div className="flex items-center gap-2">
            <Clock className="size-5 text-amber-400" />
            <h2 className="text-lg md:text-xl font-bold text-foreground">
              Section 1: Detection Gap & Latency Analysis
            </h2>
          </div>
          <Link to="/time-machine">
            <Button
              variant="outline"
              size="sm"
              className="font-mono text-xs gap-1.5 border-cyan-500/30 text-cyan-300"
            >
              <Clock className="size-3.5" />
              Replay Gap in Time Machine
              <ArrowRight className="size-3.5" />
            </Button>
          </Link>
        </div>

        {/* Visual Timeline of Detection Gap */}
        <div className="rounded-xl border border-amber-500/30 bg-amber-950/10 p-5 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center text-center">
            <div className="rounded-lg bg-background/60 p-4 border border-border/60">
              <span className="text-[10px] font-mono uppercase text-muted-foreground block mb-1">
                1. Earliest High-Confidence Signal
              </span>
              <span className="text-xl font-mono font-bold text-amber-400">
                {detectionGap.earliestDetectableOpportunity}
              </span>
              <p className="text-xs text-muted-foreground mt-1">
                Auth0 MFA fatigue & unrecognized foreign ASN (198.51.100.42).
              </p>
            </div>

            <div className="flex flex-col items-center justify-center p-2">
              <div className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider mb-1">
                Detection Delay
              </div>
              <div className="w-full flex items-center gap-2 my-1">
                <div className="h-0.5 flex-1 bg-gradient-to-r from-amber-500/40 via-amber-400 to-rose-500/60" />
                <span className="font-mono font-extrabold text-lg text-amber-300 bg-amber-500/20 px-3 py-1 rounded-full border border-amber-500/40">
                  {detectionGap.delayMinutes} MINUTES
                </span>
                <div className="h-0.5 flex-1 bg-gradient-to-r from-amber-500/40 via-amber-400 to-rose-500/60" />
              </div>
              <span className="text-[11px] text-muted-foreground">
                Attacker moved laterally while alerts were unassigned
              </span>
            </div>

            <div className="rounded-lg bg-background/60 p-4 border border-border/60">
              <span className="text-[10px] font-mono uppercase text-muted-foreground block mb-1">
                2. Formal SIEM Incident Declaration
              </span>
              <span className="text-xl font-mono font-bold text-rose-400">
                {detectionGap.formalDetection}
              </span>
              <p className="text-xs text-muted-foreground mt-1">
                Multi-stage EDR + DB query rule triggered CRITICAL escalation.
              </p>
            </div>
          </div>

          <div className="pt-3 border-t border-border/50 text-xs text-muted-foreground flex flex-wrap items-center justify-between gap-3">
            <span>
              <strong>Potential Earlier Opportunity:</strong>{" "}
              {detectionGap.potentialDetectionOpportunity}
            </span>
            <span className="font-mono text-cyan-400">Confidence: {detectionGap.confidence}</span>
          </div>
        </div>
      </section>

      {/* SECTION 2 — ATTACK PATH LESSONS & INTERCEPTION POINTS */}
      <section className="rounded-2xl border border-border/80 bg-card/60 p-6 md:p-8 backdrop-blur-md space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border/60 pb-4">
          <div className="flex items-center gap-2">
            <Target className="size-5 text-rose-400" />
            <h2 className="text-lg md:text-xl font-bold text-foreground">
              Section 2: Attack Path & Interception Points
            </h2>
          </div>
          <Link to="/attack-graph">
            <Button
              variant="outline"
              size="sm"
              className="font-mono text-xs gap-1.5 border-rose-500/30 text-rose-300"
            >
              <Target className="size-3.5" />
              Interactive Attack Graph
              <ArrowRight className="size-3.5" />
            </Button>
          </Link>
        </div>

        <p className="text-xs text-muted-foreground leading-relaxed">{attackPath.description}</p>

        {/* Attack Path Visual Sequence */}
        <div className="flex flex-wrap items-center gap-2 pt-2">
          {attackPath.traversalSequence.map((node, idx) => (
            <div key={node} className="flex items-center gap-2">
              <Link
                to="/attack-graph"
                className={`rounded-lg px-3 py-2 font-mono text-xs font-semibold border transition-all hover:scale-105 ${
                  node === "DB-PROD-01"
                    ? "bg-rose-500/20 text-rose-300 border-rose-500/50 shadow-sm"
                    : node === "LAPTOP-042"
                      ? "bg-amber-500/20 text-amber-300 border-amber-500/50"
                      : node === "SERVER-03"
                        ? "bg-purple-500/20 text-purple-300 border-purple-500/50"
                        : "bg-background/80 text-foreground border-border/80"
                }`}
                title={`Inspect ${node} in Attack Graph`}
              >
                {node}
              </Link>
              {idx < attackPath.traversalSequence.length - 1 && (
                <ArrowRight className="size-3.5 text-cyan-400 shrink-0" />
              )}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 text-xs">
          <div className="rounded-lg bg-background/50 p-3 border border-border/60">
            <span className="text-muted-foreground block text-[10px] uppercase font-mono mb-1">
              Path Length & Critical Reach
            </span>
            <span className="font-bold text-foreground">
              {attackPath.hopsCount} Hops · {attackPath.criticalNodesReached.length} Critical
              Database
            </span>
          </div>
          <div className="rounded-lg bg-background/50 p-3 border border-border/60">
            <span className="text-muted-foreground block text-[10px] uppercase font-mono mb-1">
              Where Interruption Was Possible
            </span>
            <span className="font-bold text-emerald-400">
              Workstation Boundary (LAPTOP-042 at 10:04)
            </span>
          </div>
          <div className="rounded-lg bg-background/50 p-3 border border-border/60">
            <span className="text-muted-foreground block text-[10px] uppercase font-mono mb-1">
              Downstream Protected Systems
            </span>
            <span className="font-bold text-cyan-400">SERVER-03, DB-PROD-01, FILE-SRV-01</span>
          </div>
        </div>
      </section>

      {/* SECTION 3 — RESPONSE EFFECTIVENESS & "WHAT IF WE ACTED EARLIER?" */}
      <section className="space-y-6">
        {/* Spotlight Card: "WHAT IF WE HAD ACTED EARLIER?" */}
        <div className="relative overflow-hidden rounded-2xl border-2 border-cyan-500/40 bg-gradient-to-br from-cyan-950/30 via-card/80 to-indigo-950/20 p-6 md:p-8 backdrop-blur-md shadow-xl">
          <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
            <GitBranch className="size-48 text-cyan-400" />
          </div>

          <div className="relative z-10">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
              <div className="flex items-center gap-2">
                <span className="flex size-7 items-center justify-center rounded-lg bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 font-bold">
                  ?
                </span>
                <h2 className="text-xl md:text-2xl font-bold tracking-tight text-white">
                  WHAT IF WE HAD ACTED EARLIER?
                </h2>
              </div>
              <Link to="/simulation-lab">
                <Button
                  size="sm"
                  className="bg-cyan-600 hover:bg-cyan-500 text-white gap-2 font-mono text-xs shadow-lg"
                >
                  <GitBranch className="size-3.5" />
                  Launch in Simulation Lab
                  <ArrowRight className="size-3.5" />
                </Button>
              </Link>
            </div>

            <p className="text-sm text-muted-foreground max-w-3xl mb-6">
              The counterfactual simulation engine tested what would happen if the response action
              had been taken at{" "}
              <strong className="text-foreground font-mono">10:04 (Minute 22)</strong> immediately
              following suspicious PowerShell beaconing, instead of waiting for formal alert
              escalation at <strong className="text-foreground font-mono">10:24 (Minute 42)</strong>
              .
            </p>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="rounded-xl border border-border/80 bg-background/50 p-4">
                <div className="text-[10px] uppercase font-mono tracking-wider text-muted-foreground mb-1">
                  1. Earliest Opportunity
                </div>
                <div className="text-sm font-semibold text-amber-400 font-mono">
                  {detectionGap.earliestDetectableOpportunity} (09:47)
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Unfamiliar IP + MFA fatigue anomaly logged on Auth0 identity provider.
                </p>
              </div>

              <div className="rounded-xl border border-border/80 bg-background/50 p-4">
                <div className="text-[10px] uppercase font-mono tracking-wider text-muted-foreground mb-1">
                  2. Optimal Intervention
                </div>
                <div className="text-sm font-semibold text-cyan-400 font-mono">
                  {counterfactualAnalysis.recommendedAction.label}
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Executed at 10:04 before any internal network connections were initiated.
                </p>
              </div>

              <div className="rounded-xl border border-border/80 bg-background/50 p-4">
                <div className="text-[10px] uppercase font-mono tracking-wider text-muted-foreground mb-1">
                  3. Simulated Outcome
                </div>
                <div className="text-sm font-semibold text-emerald-400">Lateral Path Severed</div>
                <p className="text-xs text-muted-foreground mt-2">
                  Outbound connections blocked at host firewall; attacker isolated on LAPTOP-042.
                </p>
              </div>

              <div className="rounded-xl border border-border/80 bg-background/50 p-4">
                <div className="text-[10px] uppercase font-mono tracking-wider text-muted-foreground mb-1">
                  4. Prevented Impact
                </div>
                <div className="text-sm font-semibold text-emerald-400 font-mono">
                  {counterfactualAnalysis.preventedEvents.length} Events / 3 Assets Saved
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Zero database intrusion; zero customer data exposed. Critical risk avoided.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Side-by-Side Comparison: Actual Incident vs Earliest Effective Response */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Actual Incident */}
          <div className="rounded-2xl border border-rose-500/30 bg-rose-950/10 p-6 backdrop-blur-md">
            <div className="flex items-center justify-between pb-4 border-b border-rose-500/20 mb-4">
              <div className="flex items-center gap-2">
                <ShieldAlert className="size-5 text-rose-400" />
                <h3 className="font-semibold text-lg text-rose-200">ACTUAL INCIDENT</h3>
              </div>
              <span className="font-mono text-xs px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30">
                SEVERITY: CRITICAL
              </span>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-lg bg-background/40 p-3 border border-border/50">
                  <span className="text-xs text-muted-foreground block">Formal Detection</span>
                  <span className="font-mono font-bold text-rose-400 text-base">
                    {report.formalDetection}
                  </span>
                </div>
                <div className="rounded-lg bg-background/40 p-3 border border-border/50">
                  <span className="text-xs text-muted-foreground block">Detection Delay</span>
                  <span className="font-mono font-bold text-amber-400 text-base">
                    {detectionGap.delayMinutes} Minutes
                  </span>
                </div>
                <div className="rounded-lg bg-background/40 p-3 border border-border/50">
                  <span className="text-xs text-muted-foreground block">Compromised Assets</span>
                  <span className="font-mono font-bold text-rose-400 text-base">
                    {learningMetrics.actualCompromisedAssets} Hosts
                  </span>
                </div>
                <div className="rounded-lg bg-background/40 p-3 border border-border/50">
                  <span className="text-xs text-muted-foreground block">
                    Critical Data Exposure
                  </span>
                  <span className="font-mono font-bold text-rose-400 text-base">
                    Yes (DB-PROD-01)
                  </span>
                </div>
              </div>

              <div className="rounded-lg border border-rose-500/20 bg-rose-950/20 p-3 text-xs text-rose-200 space-y-1.5">
                <div className="font-semibold text-rose-300">Downstream Compromise Trajectory:</div>
                <p>• Attacker pivoted from LAPTOP-042 → SERVER-03 via SMB/WinRM (10:07)</p>
                <p>• Authenticated to PostgreSQL customer database on DB-PROD-01 (10:12)</p>
                <p>• Attempted mass file exfiltration from FILE-SRV-01 (10:18)</p>
                <p>• Containment only occurred after critical data had been accessed</p>
              </div>
            </div>
          </div>

          {/* Counterfactual Response */}
          <div className="rounded-2xl border border-emerald-500/30 bg-emerald-950/10 p-6 backdrop-blur-md">
            <div className="flex items-center justify-between pb-4 border-b border-emerald-500/20 mb-4">
              <div className="flex items-center gap-2">
                <ShieldCheck className="size-5 text-emerald-400" />
                <h3 className="font-semibold text-lg text-emerald-200">
                  EARLIEST EFFECTIVE RESPONSE
                </h3>
              </div>
              <span className="font-mono text-xs px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                SEVERITY: MEDIUM (PREVENTED)
              </span>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-lg bg-background/40 p-3 border border-border/50">
                  <span className="text-xs text-muted-foreground block">Intervention Time</span>
                  <span className="font-mono font-bold text-emerald-400 text-base">
                    {counterfactualAnalysis.interventionTime}
                  </span>
                </div>
                <div className="rounded-lg bg-background/40 p-3 border border-border/50">
                  <span className="text-xs text-muted-foreground block">Action Taken</span>
                  <span className="font-mono font-bold text-cyan-400 text-sm truncate">
                    {counterfactualAnalysis.recommendedAction.label}
                  </span>
                </div>
                <div className="rounded-lg bg-background/40 p-3 border border-border/50">
                  <span className="text-xs text-muted-foreground block">Compromised Assets</span>
                  <span className="font-mono font-bold text-emerald-400 text-base">
                    {learningMetrics.counterfactualCompromisedAssets} Host (LAPTOP-042 only)
                  </span>
                </div>
                <div className="rounded-lg bg-background/40 p-3 border border-border/50">
                  <span className="text-xs text-muted-foreground block">
                    Critical Data Exposure
                  </span>
                  <span className="font-mono font-bold text-emerald-400 text-base">
                    0 (Fully Protected)
                  </span>
                </div>
              </div>

              <div className="rounded-lg border border-emerald-500/20 bg-emerald-950/20 p-3 text-xs text-emerald-200 space-y-1.5">
                <div className="font-semibold text-emerald-300">Verified Prevented Events:</div>
                {counterfactualAnalysis.preventedEvents.map((pe) => (
                  <p key={pe.eventId}>
                    • <span className="font-mono text-emerald-300">[{pe.originalTime}]</span>{" "}
                    {pe.title} ({pe.targetAsset})
                  </p>
                ))}
                <p className="text-emerald-400 font-medium pt-1">
                  ✓ Blast radius capped to initial compromised laptop with zero database leakage
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4 — WHAT WE MISSED */}
      <section className="rounded-2xl border border-border/80 bg-card/60 p-6 md:p-8 backdrop-blur-md space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border/60 pb-4">
          <div className="flex items-center gap-2">
            <AlertTriangle className="size-5 text-amber-400" />
            <h2 className="text-lg md:text-xl font-bold text-foreground">
              Section 4: What We Missed (Forensic Detection Telemetry)
            </h2>
          </div>
          <Link to="/evidence">
            <Button
              variant="outline"
              size="sm"
              className="font-mono text-xs gap-1.5 border-amber-500/30 text-amber-300"
            >
              <FileSearch className="size-3.5" />
              Inspect Underlying Evidence
              <ArrowRight className="size-3.5" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {whatWeMissed.missedSignalsList.map((sig) => (
            <div
              key={sig.id}
              className="rounded-xl border border-border/70 bg-background/50 p-4 space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-amber-400">
                  {sig.timestamp} UTC
                </span>
                <span className="font-mono text-[10px] text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/30">
                  {sig.relatedEvidence}
                </span>
              </div>
              <h4 className="text-xs font-semibold text-foreground">{sig.signal}</h4>
              <p className="text-[11px] text-muted-foreground">
                {sig.whatDefendersCouldHaveObserved}
              </p>
              <div className="pt-2 border-t border-border/50 text-[10px] text-emerald-400 font-medium">
                Opportunity: {sig.potentialResponseOpportunity}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 5 — LESSONS LEARNED CARDS */}
      <section className="rounded-2xl border border-border/80 bg-card/60 p-6 md:p-8 backdrop-blur-md space-y-5">
        <div className="flex items-center gap-2 border-b border-border/60 pb-4">
          <Lightbulb className="size-5 text-cyan-400" />
          <h2 className="text-lg md:text-xl font-bold text-foreground">
            Section 5: Post-Incident Lessons Learned
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {lessonsLearned.map((ll) => (
            <div
              key={ll.id}
              className="rounded-xl border border-border/80 bg-background/50 p-5 space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase font-bold text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/30">
                  {ll.category}
                </span>
                <span className="font-mono text-[10px] text-muted-foreground">
                  {ll.confidence} CONFIDENCE
                </span>
              </div>
              <h4 className="text-sm font-semibold text-foreground">{ll.title}</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">{ll.lesson}</p>
              <div className="pt-2 border-t border-border/50 text-[11px] text-emerald-300">
                <strong>Impact if Applied:</strong> {ll.impactIfApplied}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 6 — ACTIONABLE RECOMMENDATIONS */}
      <section className="rounded-2xl border border-border/80 bg-card/60 p-6 md:p-8 backdrop-blur-md space-y-5">
        <div className="flex items-center gap-2 border-b border-border/60 pb-4">
          <CheckCircle2 className="size-5 text-emerald-400" />
          <h2 className="text-lg md:text-xl font-bold text-foreground">
            Section 6: Actionable Security Recommendations
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {recommendations.map((rec) => (
            <div
              key={rec.id}
              className="rounded-xl border border-border/80 bg-background/50 p-5 space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-semibold text-cyan-400">{rec.title}</span>
                <span
                  className={`font-mono text-[10px] font-bold px-2 py-0.5 rounded border ${getPriorityBadgeClass(rec.priority)}`}
                >
                  {rec.priority} PRIORITY
                </span>
              </div>
              <p className="text-xs text-foreground/90">{rec.recommendation}</p>
              <p className="text-[11px] text-muted-foreground">{rec.reason}</p>
              <div className="flex flex-wrap items-center justify-between pt-2 border-t border-border/50 text-[11px]">
                <span className="text-emerald-400 font-medium">Benefit: {rec.expectedBenefit}</span>
                <span className="font-mono text-[10px] text-muted-foreground">
                  Finding: {rec.relatedFinding}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 7 — INTERACTIVE ACTION ITEMS WORKFLOW */}
      <section className="rounded-2xl border border-border/80 bg-card/60 p-6 md:p-8 backdrop-blur-md space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border/60 pb-4">
          <div className="flex items-center gap-2">
            <ListTodo className="size-5 text-cyan-400" />
            <div>
              <h2 className="text-lg md:text-xl font-bold text-foreground">
                Section 7: Post-Incident Remediation Action Plan
              </h2>
              <p className="text-xs text-muted-foreground">
                Interactive workflow state. Updating status changes in-memory execution state
                without modifying incident facts.
              </p>
            </div>
          </div>
          <span className="font-mono text-xs px-2.5 py-1 rounded bg-secondary/60 text-muted-foreground border border-border/60">
            {actionItems.filter((a) => a.status === "COMPLETED").length} of {actionItems.length}{" "}
            Completed
          </span>
        </div>

        <div className="overflow-x-auto rounded-xl border border-border/80 bg-background/60">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-border/80 bg-secondary/40 font-mono text-[10px] uppercase text-muted-foreground">
              <tr>
                <th className="p-3">Action Item</th>
                <th className="p-3">Category</th>
                <th className="p-3">Owner Role</th>
                <th className="p-3">Priority</th>
                <th className="p-3">Status Workflow</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50 text-[11.5px]">
              {actionItems.map((item) => (
                <tr key={item.id} className="hover:bg-secondary/20 transition-colors">
                  <td className="p-3 font-medium text-foreground max-w-sm">
                    <div className="font-semibold">{item.title}</div>
                    <div className="text-[11px] text-muted-foreground mt-0.5">{item.action}</div>
                  </td>
                  <td className="p-3 font-mono text-[10px] text-cyan-400">{item.category}</td>
                  <td className="p-3 font-mono text-muted-foreground">{item.ownerRole}</td>
                  <td className="p-3">
                    <span
                      className={`font-mono text-[10px] font-bold px-2 py-0.5 rounded border ${getPriorityBadgeClass(item.priority)}`}
                    >
                      {item.priority}
                    </span>
                  </td>
                  <td className="p-3">
                    <select
                      value={item.status}
                      onChange={(e) =>
                        handleStatusChange(item.id, e.target.value as ActionItemStatus)
                      }
                      className={`font-mono text-xs font-semibold rounded px-2.5 py-1 border bg-background text-foreground transition-all cursor-pointer ${getStatusBadgeClass(item.status)}`}
                    >
                      <option value="OPEN">OPEN</option>
                      <option value="IN_PROGRESS">IN_PROGRESS</option>
                      <option value="COMPLETED">COMPLETED</option>
                      <option value="DEFERRED">DEFERRED</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Forensic Navigation Links */}
      <div className="rounded-xl border border-border/80 bg-card/40 p-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="text-xs text-muted-foreground">
            Explore and cross-examine this incident across forensic investigation engines:
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Link to="/time-machine">
              <Button variant="outline" size="sm" className="text-xs gap-1.5 font-mono">
                <Clock className="size-3 text-cyan-400" />
                Time Machine
              </Button>
            </Link>
            <Link to="/attack-graph">
              <Button variant="outline" size="sm" className="text-xs gap-1.5 font-mono">
                <Target className="size-3 text-rose-400" />
                Attack Graph
              </Button>
            </Link>
            <Link to="/evidence">
              <Button variant="outline" size="sm" className="text-xs gap-1.5 font-mono">
                <FileSearch className="size-3 text-amber-400" />
                Evidence
              </Button>
            </Link>
            <Link to="/simulation-lab">
              <Button variant="outline" size="sm" className="text-xs gap-1.5 font-mono">
                <GitBranch className="size-3 text-emerald-400" />
                Simulation Lab
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
