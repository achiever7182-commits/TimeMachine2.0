import { useState } from "react";
import {
  Sparkles,
  Bot,
  ShieldAlert,
  CheckCircle2,
  AlertTriangle,
  Play,
  RotateCcw,
  Zap,
  Info,
  Shield,
  Layers,
  ArrowRight,
  ExternalLink,
} from "lucide-react";
import { useDemo } from "@/context/DemoContext";
import type { ResponseCandidate, ResponseMode } from "@/types/responseIntelligence";

export function ResponseIntelligencePanel() {
  const {
    currentTime,
    currentMinute,
    responseMode,
    setResponseMode,
    responseCandidates,
    responseRecommendation,
    responseDecision,
    responseSimulationStatus,
    approveResponse,
    rejectResponse,
    simulateRecommendedResponse,
    autoSimulateResponse,
    simulateAction,
    isSimulating,
  } = useDemo();

  const [showAutoConfirmModal, setShowAutoConfirmModal] = useState(false);
  const [showComparisonDetails, setShowComparisonDetails] = useState(true);

  const rec = responseRecommendation;

  const handleSimulateCandidate = (candidate: ResponseCandidate) => {
    simulateAction(candidate.action);
  };

  return (
    <div className="rounded-xl border border-cyan-signal/40 bg-card/70 backdrop-blur-xl shadow-panel overflow-hidden space-y-4 p-5">
      {/* Simulation Safety Warning Banner (Strict Requirement) */}
      <div className="flex items-center justify-between gap-3 rounded-lg border border-amber-500/40 bg-amber-500/10 px-3.5 py-2 text-[11px] text-amber-300">
        <div className="flex items-center gap-2">
          <AlertTriangle className="size-4 shrink-0 text-amber-400" />
          <span>
            <strong>SIMULATION ONLY SANDBOX:</strong> All response actions are evaluated exclusively
            inside the synthetic ACME incident engine. No real endpoints, EDRs, firewalls, or
            credentials will be contacted or modified.
          </span>
        </div>
        <span className="font-mono text-[9px] font-bold uppercase tracking-wider rounded bg-amber-500/20 px-2 py-0.5 border border-amber-500/30">
          Synthetic Model
        </span>
      </div>

      {/* Header & Mode Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border/80 pb-4">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-xl bg-cyan-signal/15 border border-cyan-signal/40 text-cyan-signal shadow-glow">
            <Bot className="size-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-foreground tracking-tight">
                IRIS RESPONSE INTELLIGENCE & DECISION SUPPORT
              </h2>
              <span className="rounded bg-cyan-signal/20 px-2 py-0.5 font-mono text-[10px] font-bold text-cyan-signal border border-cyan-signal/30">
                PHASE 5 EXTENSION
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              Autonomous simulated evaluation & human-in-the-loop decision optimization at{" "}
              <strong className="text-foreground font-mono">{currentTime}</strong> (T+
              {currentMinute}m).
            </p>
          </div>
        </div>

        {/* Mode Selector Tabs */}
        <div className="flex items-center rounded-lg border border-border/80 bg-secondary/40 p-1 text-xs">
          <button
            type="button"
            onClick={() => setResponseMode("IRIS_RECOMMEND")}
            className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 font-medium transition-all ${
              responseMode === "IRIS_RECOMMEND"
                ? "bg-cyan-signal text-background font-bold shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Bot className="size-3.5" />
            <span>IRIS Recommend</span>
          </button>

          <button
            type="button"
            onClick={() => setResponseMode("AUTO_SIMULATE")}
            className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 font-medium transition-all ${
              responseMode === "AUTO_SIMULATE"
                ? "bg-blue-600 text-white font-bold shadow-sm shadow-blue-500/20"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Zap className="size-3.5" />
            <span>Auto-Simulate</span>
          </button>

          <button
            type="button"
            onClick={() => setResponseMode("MANUAL")}
            className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 font-medium transition-all ${
              responseMode === "MANUAL"
                ? "bg-secondary text-foreground font-bold shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Layers className="size-3.5" />
            <span>Manual Review</span>
          </button>
        </div>
      </div>

      {/* Main Mode View */}
      {responseMode === "IRIS_RECOMMEND" && rec && (
        <div className="space-y-4">
          {/* Recommendation Spotlight Card */}
          <div className="rounded-xl border border-cyan-signal/50 bg-cyan-signal/5 p-4.5 space-y-3.5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1 rounded bg-cyan-signal/20 px-2 py-0.5 font-mono text-[10px] font-bold text-cyan-signal border border-cyan-signal/40">
                  <Sparkles className="size-3" /> RECOMMENDED RESPONSE
                </span>
                <span className="font-mono text-xs text-muted-foreground">
                  Score: <strong className="text-cyan-signal">{rec.score} pts</strong>
                </span>
              </div>

              <div className="flex items-center gap-2 font-mono text-xs">
                <span className="text-muted-foreground">Confidence:</span>
                <span
                  className={`rounded px-2 py-0.5 text-[10px] font-bold ${
                    rec.confidence === "HIGH"
                      ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                      : "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                  }`}
                >
                  {rec.confidence} CONFIDENCE
                </span>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold text-foreground">{rec.recommendedAction.label}</h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                Target Entity: <strong className="text-foreground font-mono">{rec.target}</strong> ·
                Scope: Endpoint Network Interface Severance
              </p>
            </div>

            <div className="grid grid-cols-1 gap-3 md:grid-cols-2 text-xs">
              <div className="rounded-lg border border-border/70 bg-background/50 p-3">
                <span className="font-semibold text-foreground flex items-center gap-1.5 mb-1 text-[11px]">
                  <Info className="size-3.5 text-cyan-signal" /> Why IRIS Recommends This:
                </span>
                <p className="text-muted-foreground text-[11.5px] leading-relaxed">
                  {rec.rationale}
                </p>
              </div>

              <div className="rounded-lg border border-border/70 bg-background/50 p-3">
                <span className="font-semibold text-foreground flex items-center gap-1.5 mb-1 text-[11px]">
                  <Shield className="size-3.5 text-emerald-400" /> Expected Simulated Impact:
                </span>
                <p className="text-muted-foreground text-[11.5px] leading-relaxed">
                  {rec.expectedImpact}
                </p>
              </div>
            </div>

            {/* Human in the loop action controls */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-cyan-signal/20">
              <div className="flex items-center gap-2">
                {responseDecision?.status === "APPROVED" ? (
                  <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-400">
                    <CheckCircle2 className="size-4" /> RESPONSE STRATEGY APPROVED
                  </span>
                ) : (
                  <span className="text-xs text-muted-foreground">
                    Human Review Required: Validate rationale before triggering simulated branch.
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={approveResponse}
                  disabled={responseDecision?.status === "APPROVED"}
                  className="rounded-lg border border-emerald-500/50 bg-emerald-500/10 px-3 py-1.5 text-xs font-bold text-emerald-400 hover:bg-emerald-500/20 disabled:opacity-50 transition-colors"
                >
                  {responseDecision?.status === "APPROVED" ? "APPROVED" : "APPROVE PLAN"}
                </button>

                <button
                  type="button"
                  onClick={simulateRecommendedResponse}
                  disabled={isSimulating}
                  className="flex items-center gap-1.5 rounded-lg bg-cyan-signal px-4 py-1.5 font-mono text-xs font-bold text-background hover:bg-cyan-400 disabled:opacity-50 transition-all shadow-md"
                >
                  <Play className="size-3.5 fill-current" />
                  <span>{isSimulating ? "SIMULATING..." : "SIMULATE FUTURE"}</span>
                </button>

                <button
                  type="button"
                  onClick={rejectResponse}
                  className="rounded-lg border border-border bg-secondary/50 px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  REJECT / DISMISS
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Auto-Simulate Mode View */}
      {responseMode === "AUTO_SIMULATE" && (
        <div className="rounded-xl border border-blue-500/40 bg-blue-500/5 p-4.5 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <span className="flex items-center gap-1 rounded bg-blue-500/20 px-2 py-0.5 font-mono text-[10px] font-bold text-blue-300 border border-blue-500/40 w-fit">
                <Zap className="size-3" /> AUTONOMOUS SIMULATED REMEDIATION
              </span>
              <h3 className="text-base font-bold text-foreground mt-1">
                Autonomous Decision Pipeline & Counterfactual Execution
              </h3>
              <p className="text-xs text-muted-foreground">
                IRIS autonomously selects the highest-scoring response and executes an isolated
                counterfactual branch without human intervention.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setShowAutoConfirmModal(true)}
              className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 font-mono text-xs font-bold text-white hover:bg-blue-500 transition-colors shadow-sm shadow-blue-500/20"
            >
              <Zap className="size-3.5" />
              <span>RUN AUTO-SIMULATE</span>
            </button>
          </div>

          {responseDecision?.mode === "AUTO_SIMULATE" && (
            <div className="rounded-lg border border-blue-500/30 bg-background/60 p-3.5 space-y-2 text-xs">
              <div className="flex items-center justify-between font-mono text-[11px]">
                <span className="text-blue-300 font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="size-3.5 text-emerald-400" />
                  AUTONOMOUS EXECUTION COMPLETED (SIMULATION ONLY)
                </span>
                <span className="text-muted-foreground">{responseDecision.executedAt}</span>
              </div>
              <p className="text-foreground">
                Action:{" "}
                <strong className="text-cyan-signal">
                  {responseDecision.selectedAction.label}
                </strong>{" "}
                on target{" "}
                <strong className="font-mono text-blue-300">{responseDecision.target}</strong>.
              </p>
              <p className="text-muted-foreground text-[11px]">
                Simulated Branch ID:{" "}
                <code className="text-foreground font-mono">{responseDecision.branchId}</code>.
                Downstream lateral pivots to SERVER-03 and DB-PROD-01 were autonomously averted in
                the synthetic model.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Manual Mode View */}
      {responseMode === "MANUAL" && (
        <div className="rounded-xl border border-border bg-secondary/20 p-4 text-xs">
          <p className="text-foreground font-medium">
            Manual Response Mode: You can select any response candidate from the comparison matrix
            below and simulate it directly to explore alternate futures.
          </p>
        </div>
      )}

      {/* Multi-Action Comparative Matrix Table */}
      <div className="space-y-2 pt-2">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
            <Layers className="size-3.5 text-cyan-signal" />
            Evaluated Response Candidates ({responseCandidates.length})
          </h4>
          <span className="font-mono text-[10px] text-muted-foreground">
            Ranked by Deterministic Prevention Score
          </span>
        </div>

        <div className="overflow-x-auto rounded-lg border border-border/80 bg-background/60">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-border/80 bg-secondary/40 font-mono text-[10px] uppercase text-muted-foreground">
              <tr>
                <th className="p-2.5">Response Candidate</th>
                <th className="p-2.5">Target</th>
                <th className="p-2.5">Simulated Risk</th>
                <th className="p-2.5">Prevented Systems</th>
                <th className="p-2.5">Prevented Events</th>
                <th className="p-2.5">Data Protected</th>
                <th className="p-2.5">Score</th>
                <th className="p-2.5">Confidence</th>
                <th className="p-2.5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50 text-[11.5px]">
              {responseCandidates.map((c) => {
                const isRecommended =
                  rec?.candidateId === c.id || c.action.type === rec?.recommendedAction.type;

                return (
                  <tr
                    key={c.id}
                    className={`transition-colors hover:bg-secondary/30 ${
                      isRecommended ? "bg-cyan-signal/10" : ""
                    }`}
                  >
                    <td className="p-2.5 font-medium text-foreground">
                      <div className="flex items-center gap-1.5">
                        {isRecommended && (
                          <span className="rounded bg-cyan-signal/20 px-1 py-0.2 font-mono text-[9px] font-bold text-cyan-signal border border-cyan-signal/40">
                            IRIS CHOICE
                          </span>
                        )}
                        <span>{c.action.label}</span>
                      </div>
                    </td>
                    <td className="p-2.5 font-mono text-muted-foreground">{c.target}</td>
                    <td className="p-2.5 font-mono">
                      <span
                        className={`rounded px-1.5 py-0.5 text-[10px] font-bold ${
                          c.simulatedRisk === "CRITICAL"
                            ? "bg-threat/20 text-threat"
                            : c.simulatedRisk === "HIGH"
                              ? "bg-warning/20 text-warning"
                              : "bg-emerald-500/20 text-emerald-400"
                        }`}
                      >
                        {c.simulatedRisk}
                      </span>
                    </td>
                    <td className="p-2.5 font-mono text-foreground">
                      {c.preventedCompromises.length > 0
                        ? c.preventedCompromises.join(", ")
                        : "0 assets"}
                    </td>
                    <td className="p-2.5 font-mono text-foreground">
                      {c.preventedEvents.length} stages
                    </td>
                    <td className="p-2.5 font-mono text-foreground">
                      {c.preventedDataExposure} stores
                    </td>
                    <td className="p-2.5 font-mono font-bold text-cyan-signal">{c.score}</td>
                    <td className="p-2.5">
                      <span className="font-mono text-[10px] text-muted-foreground">
                        {c.confidence}
                      </span>
                    </td>
                    <td className="p-2.5 text-right">
                      <button
                        type="button"
                        onClick={() => handleSimulateCandidate(c)}
                        disabled={isSimulating}
                        className={`rounded px-2.5 py-1 font-mono text-[10px] font-bold transition-all ${
                          isRecommended
                            ? "bg-cyan-signal text-background hover:bg-cyan-400"
                            : "border border-border bg-secondary hover:bg-secondary/80 text-foreground"
                        }`}
                      >
                        Simulate
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Confirmation Modal for Autonomous Simulation */}
      {showAutoConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-xl border border-blue-500/50 bg-card p-5 shadow-2xl space-y-4">
            <div className="flex items-center gap-3 text-blue-400">
              <Zap className="size-6" />
              <h3 className="text-base font-bold text-foreground">
                Confirm Autonomous Simulated Response
              </h3>
            </div>

            <p className="text-xs text-muted-foreground leading-relaxed">
              IRIS will automatically select and simulate the highest-scoring response action (
              <strong>{rec?.recommendedAction.label}</strong>) using the synthetic incident model.
            </p>

            <div className="rounded-lg border border-amber-500/40 bg-amber-500/10 p-3 text-xs text-amber-300">
              <strong>STRICT SAFETY GUARANTEE:</strong> This is a simulation only. No real
              infrastructure, endpoints, or cloud policies will be modified.
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => setShowAutoConfirmModal(false)}
                className="rounded-lg border border-border bg-secondary px-3 py-1.5 text-xs text-foreground font-medium hover:bg-secondary/80"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={() => {
                  setShowAutoConfirmModal(false);
                  autoSimulateResponse();
                }}
                className="rounded-lg bg-blue-600 px-4 py-1.5 font-mono text-xs font-bold text-white hover:bg-blue-500 shadow-sm shadow-blue-500/20"
              >
                Confirm & Auto-Simulate
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
