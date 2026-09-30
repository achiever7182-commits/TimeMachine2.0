import { GitBranch, Clock, CheckCircle2, ChevronRight, Play } from "lucide-react";
import type { CounterfactualBranch } from "@/types/counterfactual";

interface ScenarioComparisonProps {
  scenarioHistory: CounterfactualBranch[];
  activeBranchId?: string;
  approvedBranchId?: string | null;
  onSelectBranch: (branchId: string) => void;
  onApproveBranch: (branchId: string) => void;
}

export function ScenarioComparison({
  scenarioHistory,
  activeBranchId,
  approvedBranchId,
  onSelectBranch,
  onApproveBranch,
}: ScenarioComparisonProps) {
  if (scenarioHistory.length === 0) return null;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Simulated Scenario Comparison & Decision Matrix ({scenarioHistory.length})
        </label>
        <span className="font-mono text-[10px] text-muted-foreground">
          Select any branch to inspect
        </span>
      </div>

      <div className="overflow-x-auto rounded-xl border border-border/80 bg-card/40 backdrop-blur-md">
        <table className="w-full min-w-[700px] text-left text-xs">
          <thead className="border-b border-border/70 bg-secondary/30 text-[10.5px] uppercase tracking-wider text-muted-foreground font-semibold">
            <tr>
              <th className="p-3">Scenario / Action</th>
              <th className="p-3">Compromised Assets</th>
              <th className="p-3">Critical Assets</th>
              <th className="p-3">Data Exposure</th>
              <th className="p-3">Final Risk</th>
              <th className="p-3">Prevented Steps</th>
              <th className="p-3 text-right">Decision</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/50">
            {scenarioHistory.map((branch) => {
              const isActive = branch.branchId === activeBranchId;
              const isApproved = branch.branchId === approvedBranchId;
              const comp = branch.comparison;

              return (
                <tr
                  key={branch.branchId}
                  onClick={() => onSelectBranch(branch.branchId)}
                  className={`cursor-pointer transition-colors ${
                    isActive
                      ? "bg-cyan-signal/10"
                      : "hover:bg-secondary/30"
                  }`}
                >
                  <td className="p-3 font-semibold text-foreground">
                    <div className="flex items-center gap-2">
                      <GitBranch className={`size-3.5 ${isActive ? "text-cyan-signal" : "text-muted-foreground"}`} />
                      <span>{branch.name}</span>
                      {isActive && (
                        <span className="rounded bg-cyan-signal/20 px-1.5 py-0.2 font-mono text-[9px] text-cyan-signal">
                          ACTIVE
                        </span>
                      )}
                      {isApproved && (
                        <span className="rounded bg-emerald-500/20 px-1.5 py-0.2 font-mono text-[9px] text-emerald-400 font-bold border border-emerald-500/30">
                          APPROVED
                        </span>
                      )}
                    </div>
                  </td>

                  <td className="p-3 font-mono">
                    <span className="font-bold text-foreground">
                      {comp.counterfactualCompromisedAssets.length}
                    </span>
                    <span className="text-muted-foreground text-[10px] ml-1">
                      (from {comp.baselineCompromisedAssets.length})
                    </span>
                  </td>

                  <td className="p-3 font-mono">
                    <span className={`font-bold ${comp.counterfactualCriticalAssets.length === 0 ? "text-emerald-400" : "text-threat"}`}>
                      {comp.counterfactualCriticalAssets.length}
                    </span>
                  </td>

                  <td className="p-3 font-mono">
                    <span className={`font-bold ${comp.counterfactualDataResourcesAtRisk === 0 ? "text-emerald-400" : "text-threat"}`}>
                      {comp.counterfactualDataResourcesAtRisk}
                    </span>
                  </td>

                  <td className="p-3">
                    <span
                      className={`rounded px-2 py-0.5 font-mono text-[10px] font-bold ${
                        comp.counterfactualFinalRisk === "CRITICAL"
                          ? "bg-threat/20 text-threat"
                          : comp.counterfactualFinalRisk === "HIGH"
                          ? "bg-amber-500/20 text-amber-300"
                          : "bg-emerald-500/20 text-emerald-400"
                      }`}
                    >
                      {comp.counterfactualFinalRisk}
                    </span>
                  </td>

                  <td className="p-3 font-mono text-emerald-400 font-semibold">
                    {comp.preventedCount > 0 ? `+${comp.preventedCount} blocked` : "None"}
                  </td>

                  <td className="p-3 text-right" onClick={(e) => e.stopPropagation()}>
                    {isApproved ? (
                      <span className="inline-flex items-center gap-1 font-mono text-[10px] text-emerald-400 font-bold">
                        <CheckCircle2 className="size-3" /> Selected
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={() => onApproveBranch(branch.branchId)}
                        className="rounded-md border border-border bg-secondary/50 px-2.5 py-1 text-[11px] font-medium text-foreground hover:border-emerald-500/50 hover:bg-emerald-500/10 hover:text-emerald-300 transition-colors"
                      >
                        Select Response
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
