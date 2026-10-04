import { Link } from "@tanstack/react-router";
import {
  ShieldAlert,
  ShieldCheck,
  Clock,
  AlertTriangle,
  GitBranch,
  Database,
  Server,
  Laptop,
  User,
  Layers,
  ArrowRight,
  ExternalLink,
  CheckCircle2,
  FileText,
  Info,
  Zap,
} from "lucide-react";
import type { IncidentReport } from "@/types/incidentReport";
import type { IrisCitation } from "@/types/iris";

interface IncidentReportDocProps {
  report: IncidentReport;
}

export function IncidentReportDoc({ report }: IncidentReportDocProps) {
  const isFinal = report.reportStatus === "FINAL";

  return (
    <div className="space-y-8 print:space-y-6 text-foreground">
      {/* Simulation-Only Safety Disclaimer */}
      <div className="flex items-center justify-between gap-3 rounded-xl border border-amber-500/40 bg-amber-500/10 px-4 py-2.5 text-xs text-amber-300 print:border-black print:text-black">
        <div className="flex items-center gap-2">
          <AlertTriangle className="size-4 shrink-0 text-amber-400 print:text-black" />
          <span>
            <strong>SYNTHETIC INCIDENT RESOLUTION REPORT:</strong> All findings, forensics,
            timelines, and response simulations were evaluated within the synthetic ACME incident
            environment (INC-2048). No real enterprise production systems, endpoints, or users were
            modified.
          </span>
        </div>
        <span className="font-mono text-[10px] font-bold uppercase tracking-wider rounded bg-amber-500/20 px-2 py-0.5 border border-amber-500/30 print:hidden">
          SIMULATION ONLY
        </span>
      </div>

      {/* 1. Header & Executive Summary */}
      <section
        id="executive-summary"
        className="rounded-xl border border-border/80 bg-card/60 p-6 backdrop-blur-md print:border-none print:p-0"
      >
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border/70 pb-4 mb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                Formal Incident Report · {report.organization}
              </span>
              <span
                className={`rounded px-2 py-0.5 font-mono text-[10px] font-bold ${
                  isFinal
                    ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                    : "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                }`}
              >
                STATUS: {report.reportStatus}
              </span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground mt-1">
              {report.title}
            </h1>
            <p className="text-xs text-muted-foreground font-mono mt-0.5">
              Incident ID: <strong className="text-foreground">{report.incidentId}</strong> ·
              Generated: {new Date(report.generatedAt).toLocaleString()}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="rounded-xl border border-threat/40 bg-threat/10 px-4 py-2 text-right">
              <div className="text-[10px] uppercase font-mono text-muted-foreground">
                Severity Level
              </div>
              <div className="text-xl font-bold text-threat tracking-tight flex items-center gap-1.5 justify-end">
                <ShieldAlert className="size-5" />
                {report.severity}
              </div>
            </div>
          </div>
        </div>

        {/* High-Level Attack Metrics Strip */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 mb-5 font-mono text-xs">
          <div className="rounded-lg border border-border/70 bg-background/50 p-3">
            <span className="text-[10px] text-muted-foreground uppercase block">
              Incident Window
            </span>
            <span className="font-bold text-foreground">
              {report.incidentStart} → {report.formalDetection}
            </span>
          </div>
          <div className="rounded-lg border border-border/70 bg-background/50 p-3">
            <span className="text-[10px] text-muted-foreground uppercase block">
              First Opportunity
            </span>
            <span className="font-bold text-cyan-signal">
              {report.firstDetectableOpportunity} (T+5m)
            </span>
          </div>
          <div className="rounded-lg border border-border/70 bg-background/50 p-3">
            <span className="text-[10px] text-muted-foreground uppercase block">
              Detection Delay
            </span>
            <span className="font-bold text-amber-400">
              {report.detectionGap.delayMinutes} Minutes
            </span>
          </div>
          <div className="rounded-lg border border-border/70 bg-background/50 p-3">
            <span className="text-[10px] text-muted-foreground uppercase block">
              Compromised Assets
            </span>
            <span className="font-bold text-threat">
              {report.actualImpact.compromisedAssetsCount} Hosts
            </span>
          </div>
        </div>

        <div>
          <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-2">
            Executive Summary
          </h2>
          <p className="text-sm leading-relaxed text-foreground/90 bg-secondary/20 rounded-lg p-4 border border-border/50">
            {report.executiveSummary}
          </p>
        </div>
      </section>

      {/* 2. Incident Classification */}
      <section
        id="classification"
        className="rounded-xl border border-border/80 bg-card/60 p-6 backdrop-blur-md print:border-none print:p-0"
      >
        <h2 className="text-base font-bold text-foreground mb-3 flex items-center gap-2">
          <FileText className="size-4 text-cyan-signal" />
          Incident Classification & Attack Profile
        </h2>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 text-xs">
          <div className="space-y-2 rounded-lg border border-border/70 bg-background/40 p-4">
            <div className="flex justify-between border-b border-border/40 pb-1.5">
              <span className="text-muted-foreground">Incident Classification:</span>
              <span className="font-semibold text-foreground">
                {report.incidentClassification.incidentType}
              </span>
            </div>
            <div className="flex justify-between border-b border-border/40 pb-1.5">
              <span className="text-muted-foreground">Initial Access Vector:</span>
              <span className="font-semibold text-foreground">
                {report.incidentClassification.initialAccessVector}
              </span>
            </div>
            <div className="flex justify-between border-b border-border/40 pb-1.5">
              <span className="text-muted-foreground">Compromised User Identity:</span>
              <span className="font-mono font-bold text-cyan-signal">
                {report.incidentClassification.primaryCompromisedIdentity}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Beachhead Workstation:</span>
              <span className="font-mono font-bold text-foreground">
                {report.incidentClassification.initialCompromisedEndpoint}
              </span>
            </div>
          </div>

          <div className="space-y-2 rounded-lg border border-border/70 bg-background/40 p-4">
            <div className="flex justify-between border-b border-border/40 pb-1.5">
              <span className="text-muted-foreground">Lateral Movement Technique:</span>
              <span className="font-semibold text-foreground">
                {report.incidentClassification.lateralMovement}
              </span>
            </div>
            <div className="flex justify-between border-b border-border/40 pb-1.5">
              <span className="text-muted-foreground">Data Tier Access:</span>
              <span className="font-semibold text-foreground">
                {report.incidentClassification.dataAccess}
              </span>
            </div>
            <div className="flex justify-between border-b border-border/40 pb-1.5">
              <span className="text-muted-foreground">Detection Mechanism:</span>
              <span className="font-semibold text-foreground">
                {report.incidentClassification.detectionMethod}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Assessed Final Severity:</span>
              <span className="font-mono font-bold text-threat">
                {report.incidentClassification.finalSeverity}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Forensic Timeline */}
      <section
        id="timeline"
        className="rounded-xl border border-border/80 bg-card/60 p-6 backdrop-blur-md print:border-none print:p-0"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-bold text-foreground flex items-center gap-2">
            <Clock className="size-4 text-cyan-signal" />
            Complete Forensic Timeline
          </h2>
          <Link
            to="/time-machine"
            className="flex items-center gap-1 font-mono text-xs text-cyan-signal hover:underline print:hidden"
          >
            <span>Inspect in Time Machine</span>
            <ExternalLink className="size-3" />
          </Link>
        </div>

        <div className="overflow-x-auto rounded-lg border border-border/80 bg-background/60">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-border/80 bg-secondary/40 font-mono text-[10px] uppercase text-muted-foreground">
              <tr>
                <th className="p-2.5">Time</th>
                <th className="p-2.5">Event</th>
                <th className="p-2.5">Category</th>
                <th className="p-2.5">Target</th>
                <th className="p-2.5">Significance & Context</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50 text-[11.5px]">
              {report.timeline.map((e) => (
                <tr
                  key={e.id}
                  className={`hover:bg-secondary/20 transition-colors ${
                    e.id === "evt-0947" ? "bg-cyan-signal/5" : ""
                  }`}
                >
                  <td className="p-2.5 font-mono font-bold text-cyan-signal whitespace-nowrap">
                    {e.timestamp}
                  </td>
                  <td className="p-2.5 font-medium text-foreground">{e.title}</td>
                  <td className="p-2.5 font-mono text-[10px] text-muted-foreground">
                    <span className="rounded bg-secondary/50 px-1.5 py-0.5 border border-border/50">
                      {e.category}
                    </span>
                  </td>
                  <td className="p-2.5 font-mono text-muted-foreground">
                    {e.affectedAssetId || e.affectedUserId || "—"}
                  </td>
                  <td className="p-2.5 text-muted-foreground leading-relaxed">{e.significance}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 4. Detection Gap Analysis (What We Missed) */}
      <section
        id="detection-gap"
        className="rounded-xl border border-border/80 bg-card/60 p-6 backdrop-blur-md print:border-none print:p-0"
      >
        <h2 className="text-base font-bold text-foreground mb-3 flex items-center gap-2">
          <AlertTriangle className="size-4 text-amber-400" />
          Detection Gap Analysis ("What We Missed")
        </h2>

        {/* Visual Timeline Diagram */}
        <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 mb-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-lg bg-cyan-signal/20 text-cyan-signal font-mono font-bold">
                09:47
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase text-cyan-signal font-bold block">
                  First Detectable Opportunity
                </span>
                <span className="text-xs text-foreground">
                  Unfamiliar location + multiple failed authentication attempts
                </span>
              </div>
            </div>

            <div className="flex flex-col items-center gap-1 font-mono text-xs text-amber-400">
              <span className="rounded bg-amber-500/20 px-3 py-1 font-bold border border-amber-500/40">
                {report.detectionGap.delayMinutes} MINUTE DETECTION GAP
              </span>
              <span className="text-[10px] text-muted-foreground">
                (Adversary unhindered on LAPTOP-042 & SERVER-03)
              </span>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-lg bg-threat/20 text-threat font-mono font-bold">
                10:24
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase text-threat font-bold block">
                  Formal Incident Declaration
                </span>
                <span className="text-xs text-foreground">
                  Multi-signal correlation rule triggers SOC alert
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <div className="rounded-lg border border-border/70 bg-background/50 p-4">
            <h3 className="font-semibold text-foreground mb-2 flex items-center gap-1.5">
              <Info className="size-3.5 text-cyan-signal" />
              Existing Telemetry Not Correlated:
            </h3>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground leading-relaxed">
              {report.whatWeMissed.telemetryExisted.map((t, idx) => (
                <li key={idx}>{t}</li>
              ))}
            </ul>
          </div>

          <div className="rounded-lg border border-border/70 bg-background/50 p-4">
            <h3 className="font-semibold text-foreground mb-2 flex items-center gap-1.5">
              <AlertTriangle className="size-3.5 text-amber-400" />
              Operational Blindspots & Delayed Recognition:
            </h3>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground leading-relaxed">
              {report.whatWeMissed.whatWasNotRecognized.map((nr, idx) => (
                <li key={idx}>{nr}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 5. Attack Path & Graph Traversal */}
      <section
        id="attack-path"
        className="rounded-xl border border-border/80 bg-card/60 p-6 backdrop-blur-md print:border-none print:p-0"
      >
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-bold text-foreground flex items-center gap-2">
            <GitBranch className="size-4 text-cyan-signal" />
            Attack Graph & Traversal Path
          </h2>
          <Link
            to="/attack-graph"
            className="flex items-center gap-1 font-mono text-xs text-cyan-signal hover:underline print:hidden"
          >
            <span>Inspect in Attack Graph</span>
            <ExternalLink className="size-3" />
          </Link>
        </div>

        {/* Traversal sequence chain */}
        <div className="flex flex-wrap items-center gap-2 p-3 rounded-lg border border-border/70 bg-background/50 font-mono text-xs mb-4">
          {report.attackPath.traversalSequence.map((node, i) => (
            <div key={node} className="flex items-center gap-2">
              <span
                className={`rounded px-2.5 py-1 font-bold ${
                  node === "DB-PROD-01"
                    ? "bg-threat/20 text-threat border border-threat/40"
                    : node === "SERVER-03" || node === "LAPTOP-042"
                      ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                      : "bg-secondary text-foreground border border-border"
                }`}
              >
                {node}
              </span>
              {i < report.attackPath.traversalSequence.length - 1 && (
                <ArrowRight className="size-3 text-cyan-signal" />
              )}
            </div>
          ))}
        </div>

        <p className="text-xs text-muted-foreground leading-relaxed">
          {report.attackPath.description}
        </p>
      </section>

      {/* 6. Affected Assets & Users */}
      <section
        id="assets-and-users"
        className="rounded-xl border border-border/80 bg-card/60 p-6 backdrop-blur-md print:border-none print:p-0"
      >
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-bold text-foreground flex items-center gap-2">
            <Server className="size-4 text-cyan-signal" />
            Affected Assets & Identity Inventory
          </h2>
          <Link
            to="/digital-twin"
            className="flex items-center gap-1 font-mono text-xs text-cyan-signal hover:underline print:hidden"
          >
            <span>Inspect in Digital Twin</span>
            <ExternalLink className="size-3" />
          </Link>
        </div>

        <div className="overflow-x-auto rounded-lg border border-border/80 bg-background/60 mb-4">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-border/80 bg-secondary/40 font-mono text-[10px] uppercase text-muted-foreground">
              <tr>
                <th className="p-2.5">Asset ID</th>
                <th className="p-2.5">Type</th>
                <th className="p-2.5">Status</th>
                <th className="p-2.5">Role in Attack</th>
                <th className="p-2.5">Data Exposure</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50 text-[11.5px]">
              {report.affectedAssets.map((a) => (
                <tr key={a.id} className="hover:bg-secondary/20 transition-colors">
                  <td className="p-2.5 font-mono font-bold text-foreground">{a.id}</td>
                  <td className="p-2.5 text-muted-foreground">{a.type}</td>
                  <td className="p-2.5">
                    <span
                      className={`rounded px-1.5 py-0.5 text-[10px] font-mono font-bold ${
                        a.status === "COMPROMISED"
                          ? "bg-threat/20 text-threat"
                          : "bg-emerald-500/20 text-emerald-400"
                      }`}
                    >
                      {a.status}
                    </span>
                  </td>
                  <td className="p-2.5 text-foreground">{a.roleInAttack}</td>
                  <td className="p-2.5 text-muted-foreground">{a.dataExposure}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 7. Actual Impact vs Counterfactual Response Analysis */}
      <section
        id="counterfactual"
        className="rounded-xl border border-cyan-signal/50 bg-cyan-signal/5 p-6 backdrop-blur-md print:border-none print:p-0"
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-cyan-signal">
              Response Intelligence & Simulation
            </span>
            <h2 className="text-base font-bold text-foreground">
              Actual Impact vs. Simulated Counterfactual Future
            </h2>
          </div>
          <Link
            to="/simulation-lab"
            className="flex items-center gap-1 font-mono text-xs text-cyan-signal hover:underline print:hidden"
          >
            <span>Open in Simulation Lab</span>
            <ExternalLink className="size-3" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 text-xs">
          {/* Actual Reality */}
          <div className="rounded-xl border border-threat/40 bg-threat/5 p-4 space-y-2.5">
            <div className="flex items-center justify-between font-mono text-xs">
              <span className="font-bold text-threat">ACTUAL HISTORICAL REALITY</span>
              <span className="rounded bg-threat/20 px-2 py-0.5 text-threat font-bold">
                CRITICAL RISK
              </span>
            </div>
            <ul className="space-y-1.5 text-muted-foreground">
              <li>
                • Formal Detection: <strong className="text-foreground">10:24</strong> (37 min
                delay)
              </li>
              <li>
                • Compromised Assets: <strong className="text-threat">4 hosts</strong> (LAPTOP-042,
                SERVER-03, DB-PROD-01, FILE-SRV-01)
              </li>
              <li>
                • Database Access: <strong className="text-threat">CONFIRMED</strong> (50,000
                customer records accessed)
              </li>
              <li>
                • File Access: <strong className="text-threat">CONFIRMED</strong> (37 strategic
                files staged)
              </li>
            </ul>
          </div>

          {/* Recommended Counterfactual Future */}
          <div className="rounded-xl border border-emerald-500/40 bg-emerald-500/5 p-4 space-y-2.5">
            <div className="flex items-center justify-between font-mono text-xs">
              <span className="font-bold text-emerald-400">
                COUNTERFACTUAL: {report.counterfactualAnalysis.recommendedAction.label}
              </span>
              <span className="rounded bg-emerald-500/20 px-2 py-0.5 text-emerald-400 font-bold">
                MEDIUM RISK
              </span>
            </div>
            <ul className="space-y-1.5 text-muted-foreground">
              <li>
                • Intervention Point: <strong className="text-foreground">10:04</strong>{" "}
                (Workstation isolation)
              </li>
              <li>
                • Prevented Attack Stages:{" "}
                <strong className="text-emerald-400">
                  {report.counterfactualAnalysis.preventedEvents.length} stages
                </strong>{" "}
                (evt-1007, evt-1012, evt-1018)
              </li>
              <li>
                • Protected Infrastructure:{" "}
                <strong className="text-emerald-400">SERVER-03, DB-PROD-01, FILE-SRV-01</strong>
              </li>
              <li>
                • Database Access: <strong className="text-emerald-400">ZERO DATA LEAKED</strong>{" "}
                (Vault preserved)
              </li>
            </ul>
          </div>
        </div>

        <p className="text-xs text-muted-foreground leading-relaxed bg-background/50 rounded-lg p-3 border border-border/60">
          <strong>Causal Explanation:</strong> {report.counterfactualAnalysis.causalExplanation}
        </p>
      </section>

      {/* 8. Multi-Action Response Matrix */}
      <section
        id="response-comparison"
        className="rounded-xl border border-border/80 bg-card/60 p-6 backdrop-blur-md print:border-none print:p-0"
      >
        <h2 className="text-base font-bold text-foreground mb-3 flex items-center gap-2">
          <Layers className="size-4 text-cyan-signal" />
          Evaluated Response Comparison Matrix
        </h2>

        <div className="overflow-x-auto rounded-lg border border-border/80 bg-background/60">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-border/80 bg-secondary/40 font-mono text-[10px] uppercase text-muted-foreground">
              <tr>
                <th className="p-2.5">Response Action</th>
                <th className="p-2.5">Simulated Risk</th>
                <th className="p-2.5">Prevented Events</th>
                <th className="p-2.5">Protected Systems</th>
                <th className="p-2.5">Trade-off / Operational Evaluation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50 text-[11.5px]">
              {report.responseAnalysis.evaluatedActions.map((c) => (
                <tr
                  key={c.id}
                  className={`hover:bg-secondary/20 transition-colors ${
                    c.action.type === report.responseAnalysis.recommendedAction.type
                      ? "bg-cyan-signal/10"
                      : ""
                  }`}
                >
                  <td className="p-2.5 font-medium text-foreground">
                    <div className="flex items-center gap-1.5">
                      {c.action.type === report.responseAnalysis.recommendedAction.type && (
                        <span className="rounded bg-cyan-signal/20 px-1 py-0.2 font-mono text-[9px] font-bold text-cyan-signal border border-cyan-signal/40">
                          RECOMMENDED
                        </span>
                      )}
                      <span>{c.action.label}</span>
                    </div>
                  </td>
                  <td className="p-2.5 font-mono">
                    <span
                      className={`rounded px-1.5 py-0.5 text-[10px] font-bold ${
                        c.simulatedRisk === "CRITICAL"
                          ? "bg-threat/20 text-threat"
                          : "bg-emerald-500/20 text-emerald-400"
                      }`}
                    >
                      {c.simulatedRisk}
                    </span>
                  </td>
                  <td className="p-2.5 font-mono text-foreground">
                    {c.preventedEvents.length} stages
                  </td>
                  <td className="p-2.5 font-mono text-foreground">
                    {c.preventedCompromises.length > 0
                      ? c.preventedCompromises.join(", ")
                      : "None (Full Compromise)"}
                  </td>
                  <td className="p-2.5 text-muted-foreground leading-relaxed">{c.rationale}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 9. Root Cause Analysis */}
      <section
        id="root-cause"
        className="rounded-xl border border-border/80 bg-card/60 p-6 backdrop-blur-md print:border-none print:p-0"
      >
        <h2 className="text-base font-bold text-foreground mb-3 flex items-center gap-2">
          <ShieldAlert className="size-4 text-cyan-signal" />
          Root Cause Analysis
        </h2>

        <div className="rounded-lg border border-border/70 bg-background/50 p-4 space-y-3 text-xs leading-relaxed">
          <div>
            <span className="font-bold text-foreground block text-[11.5px] mb-1">
              Direct Cause:
            </span>
            <p className="text-muted-foreground">{report.rootCause.directCause}</p>
          </div>

          <div className="border-t border-border/50 pt-2">
            <span className="font-bold text-foreground block text-[11.5px] mb-1">
              Contributing Factors:
            </span>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              {report.rootCause.contributingFactors.map((f, idx) => (
                <li key={idx}>{f}</li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 border-t border-border/50 pt-2">
            <div>
              <span className="font-bold text-foreground block text-[11px]">Detection Gap:</span>
              <p className="text-muted-foreground text-[11px]">
                {report.rootCause.detectionGapSummary}
              </p>
            </div>
            <div>
              <span className="font-bold text-foreground block text-[11px]">Response Gap:</span>
              <p className="text-muted-foreground text-[11px]">
                {report.rootCause.responseGapSummary}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 10. Lessons Learned */}
      <section
        id="lessons-learned"
        className="rounded-xl border border-border/80 bg-card/60 p-6 backdrop-blur-md print:border-none print:p-0"
      >
        <h2 className="text-base font-bold text-foreground mb-3 flex items-center gap-2">
          <Zap className="size-4 text-cyan-signal" />
          Post-Incident Lessons Learned
        </h2>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 text-xs">
          {report.lessonsLearned.map((ll) => (
            <div
              key={ll.id}
              className="rounded-lg border border-border/70 bg-background/40 p-4 space-y-1.5"
            >
              <div className="flex items-center justify-between">
                <span className="rounded bg-cyan-signal/20 px-2 py-0.5 font-mono text-[9px] font-bold text-cyan-signal border border-cyan-signal/30">
                  {ll.category.toUpperCase()}
                </span>
                <span className="font-mono text-[10px] text-muted-foreground">{ll.id}</span>
              </div>
              <h3 className="font-bold text-foreground text-[12px]">{ll.lesson}</h3>
              <p className="text-muted-foreground text-[11px] leading-relaxed">
                <strong>Observation:</strong> {ll.observation}
              </p>
              <p className="text-emerald-400 text-[11px] leading-relaxed">
                <strong>Target Impact:</strong> {ll.impactIfApplied}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 11. Recommendations & Action Items */}
      <section
        id="recommendations"
        className="rounded-xl border border-border/80 bg-card/60 p-6 backdrop-blur-md print:border-none print:p-0"
      >
        <h2 className="text-base font-bold text-foreground mb-3 flex items-center gap-2">
          <CheckCircle2 className="size-4 text-emerald-400" />
          Recommendations & Corrective Action Items
        </h2>

        <div className="overflow-x-auto rounded-lg border border-border/80 bg-background/60 mb-6">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-border/80 bg-secondary/40 font-mono text-[10px] uppercase text-muted-foreground">
              <tr>
                <th className="p-2.5">Category</th>
                <th className="p-2.5">Recommendation</th>
                <th className="p-2.5">Priority</th>
                <th className="p-2.5">Expected Benefit</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50 text-[11.5px]">
              {report.recommendations.map((r) => (
                <tr key={r.id} className="hover:bg-secondary/20 transition-colors">
                  <td className="p-2.5 font-mono text-cyan-signal">{r.category}</td>
                  <td className="p-2.5 font-medium text-foreground">{r.recommendation}</td>
                  <td className="p-2.5">
                    <span
                      className={`rounded px-1.5 py-0.5 text-[10px] font-mono font-bold ${
                        r.priority === "HIGH"
                          ? "bg-threat/20 text-threat"
                          : "bg-amber-500/20 text-amber-400"
                      }`}
                    >
                      {r.priority}
                    </span>
                  </td>
                  <td className="p-2.5 text-muted-foreground">{r.expectedBenefit}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">
          Assigned Action Items
        </h3>
        <div className="overflow-x-auto rounded-lg border border-border/80 bg-background/60">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-border/80 bg-secondary/40 font-mono text-[10px] uppercase text-muted-foreground">
              <tr>
                <th className="p-2.5">Action Item</th>
                <th className="p-2.5">Assigned Role</th>
                <th className="p-2.5">Priority</th>
                <th className="p-2.5">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50 text-[11.5px]">
              {report.actionItems.map((act) => (
                <tr key={act.id} className="hover:bg-secondary/20 transition-colors">
                  <td className="p-2.5 font-medium text-foreground">{act.action}</td>
                  <td className="p-2.5 font-mono text-muted-foreground">{act.ownerRole}</td>
                  <td className="p-2.5 font-mono text-[10px]">{act.priority}</td>
                  <td className="p-2.5">
                    <span className="rounded bg-secondary/60 px-1.5 py-0.5 text-[10px] font-mono font-bold text-foreground">
                      {act.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 12. Evidence Ledger & Citations Appendix */}
      <section
        id="evidence-ledger"
        className="rounded-xl border border-border/80 bg-card/60 p-6 backdrop-blur-md print:border-none print:p-0"
      >
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-bold text-foreground flex items-center gap-2">
            <FileText className="size-4 text-cyan-signal" />
            Appendix: Reconstructed Evidence Ledger & Typed Citations
          </h2>
          <Link
            to="/evidence"
            className="flex items-center gap-1 font-mono text-xs text-cyan-signal hover:underline print:hidden"
          >
            <span>Inspect in Evidence Vault</span>
            <ExternalLink className="size-3" />
          </Link>
        </div>

        <div className="overflow-x-auto rounded-lg border border-border/80 bg-background/60">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-border/80 bg-secondary/40 font-mono text-[10px] uppercase text-muted-foreground">
              <tr>
                <th className="p-2.5">Evidence ID</th>
                <th className="p-2.5">Type</th>
                <th className="p-2.5">Timestamp</th>
                <th className="p-2.5">Telemetry Extract</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50 text-[11.5px]">
              {report.evidence.map((ev) => (
                <tr key={ev.id} className="hover:bg-secondary/20 transition-colors">
                  <td className="p-2.5 font-mono font-bold text-cyan-signal">{ev.id}</td>
                  <td className="p-2.5 font-mono text-muted-foreground text-[10px]">{ev.type}</td>
                  <td className="p-2.5 font-mono text-foreground">{ev.timestamp}</td>
                  <td className="p-2.5 font-mono text-muted-foreground text-[10.5px] leading-relaxed">
                    {ev.content}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
