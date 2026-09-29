import { useState, useCallback } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  Play,
  ArrowLeft,
  RotateCcw,
  Sparkles,
  GitBranch,
  ShieldAlert,
  Clock,
  CheckCircle2,
  AlertTriangle,
  History,
  Layers,
  ArrowRight,
} from "lucide-react";
import { useDemo } from "@/context/DemoContext";
import { ActionSelector } from "@/components/simulation-lab/ActionSelector";
import { ImpactComparison } from "@/components/simulation-lab/ImpactComparison";
import { PreventedEvents } from "@/components/simulation-lab/PreventedEvents";
import { ScenarioComparison } from "@/components/simulation-lab/ScenarioComparison";
import { AttackGraphCanvas } from "@/components/attack-graph/AttackGraphCanvas";
import { GraphLegend } from "@/components/attack-graph/GraphLegend";
import { IrisInvestigationPanel } from "@/components/iris/IrisInvestigationPanel";
import { ResponseIntelligencePanel } from "@/components/simulation-lab/ResponseIntelligencePanel";
import type { CounterfactualAction } from "@/types/counterfactual";

export function SimulationLabView() {
  const navigate = useNavigate();
  const {
    currentTime,
    currentMinute,
    incidentStage,
    currentRisk,
    counterfactualBranch,
    activeAction,
    setActiveAction,
    availableActions,
    scenarioHistory,
    simulateAction,
    selectBranch,
    isCounterfactualMode,
    enterCounterfactualMode,
    exitCounterfactualMode,
    approvedBranchId,
    approveBranch,
    isSimulating,
    attackGraph: actualAttackGraph,
    selectedEntityId,
    setSelectedEntityId,
    selectedEdgeId,
    setSelectedEdgeId,
  } = useDemo();

  // Tab mode: "SIDE_BY_SIDE" | "PREVENTED" | "TIMELINE"
  const [activeTab, setActiveTab] = useState<"SIDE_BY_SIDE" | "PREVENTED" | "HISTORY">("SIDE_BY_SIDE");

  const handleSimulate = useCallback(() => {
    simulateAction(activeAction);
  }, [simulateAction, activeAction]);

  const handleReturnToIncident = useCallback(() => {
    exitCounterfactualMode();
    navigate({ to: "/time-machine" });
  }, [exitCounterfactualMode, navigate]);

  return (
    <div className="mx-auto max-w-7xl animate-fade-in space-y-5">
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-border/80 bg-card/60 p-4.5 backdrop-blur-md">
        <div className="flex items-center gap-3.5">
          <div className="flex size-11 items-center justify-center rounded-xl bg-cyan-signal/10 border border-cyan-signal/30 text-cyan-signal">
            <GitBranch className="size-6" />
          </div>
          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="text-xl font-bold tracking-tight text-foreground">
                COUNTERFACTUAL SIMULATION LAB
              </h1>
              <span className="rounded bg-cyan-signal/15 px-2 py-0.5 font-mono text-[11px] font-bold text-cyan-signal border border-cyan-signal/30">
                INC-2048 BRANCH
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-0.5">
              Simulate alternate realities forked from historical baseline at{" "}
              <strong className="text-foreground font-mono">{currentTime}</strong> (T+{currentMinute}m).
            </p>
          </div>
        </div>

        {/* Status Indicators & Navigation */}
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="flex items-center gap-1.5 rounded-lg border border-border/70 bg-secondary/30 px-3 py-1.5 text-xs">
            <Clock className="size-3.5 text-cyan-signal" />
            <span className="text-muted-foreground">Base:</span>
            <span className="font-mono font-bold text-foreground">{currentTime}</span>
          </div>

          <div className="flex items-center gap-1.5 rounded-lg border border-border/70 bg-secondary/30 px-3 py-1.5 text-xs">
            <ShieldAlert className="size-3.5 text-threat" />
            <span className="text-muted-foreground">Original Risk:</span>
            <span className="font-bold text-threat uppercase">{currentRisk}</span>
          </div>

          {/* Return to Real Incident Button (Requirement 26) */}
          <button
            type="button"
            onClick={handleReturnToIncident}
            className="flex items-center gap-1.5 rounded-lg border border-border bg-secondary/40 px-3 py-1.5 text-xs font-semibold text-foreground hover:bg-secondary/70 transition-colors"
          >
            <ArrowLeft className="size-3.5" />
            Return to Real Incident
          </button>
        </div>
      </div>

      {/* Action Selection Row */}
      <div className="rounded-xl border border-border/80 bg-card/40 p-4.5 backdrop-blur-md">
        <ActionSelector
          availableActions={availableActions}
          activeAction={activeAction}
          onSelectAction={setActiveAction}
          disabled={isSimulating}
        />

        {/* Simulate Action Button Bar */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-border/60 pt-4">
          <div className="text-xs text-muted-foreground">
            Targeting: <strong className="text-cyan-signal font-mono">{activeAction.targetId}</strong>{" "}
            via synthetic response engine. Real organization is untouched.
          </div>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={handleSimulate}
              disabled={isSimulating}
              className={`flex items-center gap-2 rounded-lg px-4 py-2 font-mono text-xs font-bold transition-all shadow-md ${
                isSimulating
                  ? "bg-secondary text-muted-foreground cursor-wait"
                  : "bg-cyan-signal text-background hover:bg-cyan-400 active:scale-95 shadow-[0_0_15px_rgba(6,182,212,0.35)]"
              }`}
            >
              <Play className="size-3.5 fill-current" />
              {isSimulating ? "SIMULATING ALTERNATE FUTURE..." : "SIMULATE FUTURE"}
            </button>
          </div>
        </div>
      </div>

      {/* Main Counterfactual Results */}
      {counterfactualBranch && (
        <div className="space-y-5">
          {/* Impact Comparison Summary Strip */}
          <ImpactComparison
            comparison={counterfactualBranch.comparison}
            actionLabel={counterfactualBranch.action.label}
          />

          {/* Navigation Sub-Tabs */}
          <div className="flex items-center gap-2 border-b border-border/70 pb-2">
            <button
              type="button"
              onClick={() => setActiveTab("SIDE_BY_SIDE")}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
                activeTab === "SIDE_BY_SIDE"
                  ? "bg-cyan-signal/15 text-cyan-signal border border-cyan-signal/30"
                  : "text-muted-foreground hover:bg-secondary/40 hover:text-foreground"
              }`}
            >
              <Layers className="size-3.5" />
              Side-by-Side Attack Graph
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("PREVENTED")}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
                activeTab === "PREVENTED"
                  ? "bg-cyan-signal/15 text-cyan-signal border border-cyan-signal/30"
                  : "text-muted-foreground hover:bg-secondary/40 hover:text-foreground"
              }`}
            >
              <CheckCircle2 className="size-3.5" />
              Prevented Steps ({counterfactualBranch.comparison.preventedCount})
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("HISTORY")}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
                activeTab === "HISTORY"
                  ? "bg-cyan-signal/15 text-cyan-signal border border-cyan-signal/30"
                  : "text-muted-foreground hover:bg-secondary/40 hover:text-foreground"
              }`}
            >
              <History className="size-3.5" />
              Scenario History ({scenarioHistory.length})
            </button>
          </div>

          {/* Tab 1: Side-by-Side Graph (Requirement 21) */}
          {activeTab === "SIDE_BY_SIDE" && (
            <div className="grid gap-4 lg:grid-cols-2">
              {/* Actual Baseline Reality */}
              <div className="space-y-2 rounded-xl border border-threat/40 bg-card/40 p-3.5 backdrop-blur-md">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="size-2 rounded-full bg-threat animate-ping" />
                    <h3 className="font-bold text-xs uppercase tracking-wider text-threat">
                      Baseline Reality (Unmitigated Future)
                    </h3>
                  </div>
                  <span className="font-mono text-[10px] text-muted-foreground">
                    Final: CRITICAL (4 Assets)
                  </span>
                </div>

                <AttackGraphCanvas
                  nodes={actualAttackGraph.nodes}
                  edges={actualAttackGraph.edges}
                  selectedNodeId={selectedEntityId}
                  selectedEdgeId={selectedEdgeId}
                  activePath={actualAttackGraph.activePath}
                  highlightedPathId={actualAttackGraph.activePath?.pathId ?? null}
                  onSelectNode={setSelectedEntityId}
                  onSelectEdge={setSelectedEdgeId}
                />
              </div>

              {/* Counterfactual Reality */}
              <div className="space-y-2 rounded-xl border border-cyan-signal/40 bg-card/40 p-3.5 backdrop-blur-md">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="size-2 rounded-full bg-cyan-signal" />
                    <h3 className="font-bold text-xs uppercase tracking-wider text-cyan-signal">
                      Counterfactual Reality ({counterfactualBranch.action.type})
                    </h3>
                  </div>
                  <span className="font-mono text-[10px] text-emerald-400 font-bold">
                    Final: {counterfactualBranch.comparison.counterfactualFinalRisk} (
                    {counterfactualBranch.comparison.counterfactualCompromisedAssets.length} Assets)
                  </span>
                </div>

                <AttackGraphCanvas
                  nodes={counterfactualBranch.attackGraph.nodes}
                  edges={counterfactualBranch.attackGraph.edges}
                  selectedNodeId={selectedEntityId}
                  selectedEdgeId={selectedEdgeId}
                  activePath={counterfactualBranch.attackGraph.activePath}
                  highlightedPathId={counterfactualBranch.attackGraph.activePath?.pathId ?? null}
                  onSelectNode={setSelectedEntityId}
                  onSelectEdge={setSelectedEdgeId}
                />
              </div>
            </div>
          )}

          {/* Tab 2: Prevented Events */}
          {activeTab === "PREVENTED" && (
            <PreventedEvents
              preventedEvents={counterfactualBranch.comparison.preventedEvents}
              actionLabel={counterfactualBranch.action.label}
            />
          )}

          {/* Tab 3: Scenario History Table */}
          {activeTab === "HISTORY" && (
            <ScenarioComparison
              scenarioHistory={scenarioHistory}
              activeBranchId={counterfactualBranch.branchId}
              approvedBranchId={approvedBranchId}
              onSelectBranch={selectBranch}
              onApproveBranch={approveBranch}
            />
          )}

          {/* Decision Bar & Approval (Requirement 25) */}
          <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-border/80 bg-secondary/20 p-4 text-xs backdrop-blur-md">
            <div>
              <span className="font-mono text-[10px] uppercase font-bold text-muted-foreground">
                Incident Response Decision Point
              </span>
              <p className="font-medium text-foreground mt-0.5">
                {approvedBranchId === counterfactualBranch.branchId ? (
                  <span className="text-emerald-400 font-bold flex items-center gap-1.5">
                    <CheckCircle2 className="size-4" /> RESPONSE PLAN SELECTED & APPROVED FOR PLAYBOOK
                  </span>
                ) : (
                  <span>
                    Select this simulated counterfactual response to validate the remediation trajectory.
                  </span>
                )}
              </p>
            </div>

            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => approveBranch(counterfactualBranch.branchId)}
                className={`flex items-center gap-1.5 rounded-lg px-3.5 py-2 font-mono text-xs font-bold transition-all ${
                  approvedBranchId === counterfactualBranch.branchId
                    ? "bg-emerald-500 text-background cursor-default"
                    : "border border-emerald-500/50 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20"
                }`}
              >
                <CheckCircle2 className="size-3.5" />
                {approvedBranchId === counterfactualBranch.branchId
                  ? "RESPONSE APPROVED"
                  : "SELECT THIS RESPONSE"}
              </button>

              <button
                type="button"
                onClick={handleReturnToIncident}
                className="rounded-lg border border-border bg-secondary/50 px-3 py-2 text-foreground font-medium hover:bg-secondary/80 transition-colors"
              >
                Return to Incident
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Response Intelligence & Autonomous Simulation (Phase 5 Extension) */}
      <ResponseIntelligencePanel />

      {/* Contextual IRIS Investigation Panel (Phase 5 Requirement 26) */}
      <IrisInvestigationPanel
        title="IRIS Simulation Assistant"
        defaultPrompt={
          counterfactualBranch
            ? "What did this response prevent?"
            : "What would happen if we isolate LAPTOP-042 at 10:04?"
        }
        suggestedQuestions={[
          "What did this response prevent?",
          "Why was SERVER-03 not reached in the counterfactual?",
          "Why was DB-PROD-01 protected?",
          "Compare the actual future with the counterfactual future.",
        ]}
        compact={false}
      />
    </div>
  );
}
