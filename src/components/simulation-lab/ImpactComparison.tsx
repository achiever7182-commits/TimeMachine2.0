import { Zap, ShieldAlert, CheckCircle, Flame, ArrowRight, CornerDownRight } from "lucide-react";
import type { CounterfactualComparison } from "@/types/counterfactual";

interface ImpactComparisonProps {
  comparison: CounterfactualComparison;
  actionLabel: string;
}

export function ImpactComparison({ comparison, actionLabel }: ImpactComparisonProps) {
  const isReduced = comparison.riskChange === "REDUCED";

  return (
    <div className="space-y-4">
      {/* Risk and High-Level Verdict Banner */}
      <div
        className={`rounded-xl border p-4.5 backdrop-blur-md transition-all ${
          isReduced
            ? "border-emerald-500/40 bg-emerald-500/10 shadow-[0_0_20px_rgba(16,185,129,0.15)]"
            : "border-border/80 bg-secondary/20"
        }`}
      >
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
              Counterfactual Risk Verdict
            </span>
            <div className="mt-1 flex items-center gap-2">
              <span
                className={`font-mono text-lg font-bold ${
                  comparison.baselineFinalRisk === "CRITICAL" ? "text-threat" : "text-amber-400"
                }`}
              >
                {comparison.baselineFinalRisk} (ACTUAL)
              </span>
              <ArrowRight className="size-4 text-muted-foreground" />
              <span
                className={`font-mono text-lg font-bold ${
                  isReduced ? "text-emerald-400" : "text-foreground"
                }`}
              >
                {comparison.counterfactualFinalRisk} (COUNTERFACTUAL)
              </span>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              {isReduced
                ? `Simulated response "${actionLabel}" arrested lateral movement and prevented downstream exposure.`
                : "No response action applied. Attack progression matches baseline incident trajectory."}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span
              className={`rounded-full px-3 py-1 font-mono text-xs font-bold ${
                isReduced
                  ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                  : "bg-secondary text-muted-foreground"
              }`}
            >
              {comparison.riskChange === "REDUCED" ? "RISK REDUCED" : "UNMITIGATED"}
            </span>
          </div>
        </div>
      </div>

      {/* Measurable Side-by-Side Metric Grid */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {/* Compromised Assets */}
        <div className="rounded-xl border border-border/70 bg-card/50 p-3.5 backdrop-blur-sm">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
            Compromised Assets
          </span>
          <div className="mt-1.5 flex items-baseline gap-2">
            <span className="font-mono text-2xl font-bold text-foreground">
              {comparison.counterfactualCompromisedAssets.length}
            </span>
            <span className="font-mono text-xs text-muted-foreground line-through">
              {comparison.baselineCompromisedAssets.length}
            </span>
          </div>
          <p className="mt-1 font-mono text-[11px] font-medium text-emerald-400">
            -{comparison.preventedCompromises.length} Prevented
          </p>
          <p className="text-[10px] text-muted-foreground truncate mt-0.5">
            {comparison.preventedCompromises.join(", ") || "None"}
          </p>
        </div>

        {/* Critical Assets */}
        <div className="rounded-xl border border-border/70 bg-card/50 p-3.5 backdrop-blur-sm">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
            Critical Assets Hit
          </span>
          <div className="mt-1.5 flex items-baseline gap-2">
            <span className="font-mono text-2xl font-bold text-foreground">
              {comparison.counterfactualCriticalAssets.length}
            </span>
            <span className="font-mono text-xs text-muted-foreground line-through">
              {comparison.baselineCriticalAssets.length}
            </span>
          </div>
          <p className="mt-1 font-mono text-[11px] font-medium text-emerald-400">
            -{comparison.preventedCriticalImpact.length} Protected
          </p>
          <p className="text-[10px] text-muted-foreground truncate mt-0.5">
            {comparison.preventedCriticalImpact.join(", ") || "None"}
          </p>
        </div>

        {/* Data Stores Exposed */}
        <div className="rounded-xl border border-border/70 bg-card/50 p-3.5 backdrop-blur-sm">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
            Data Stores at Risk
          </span>
          <div className="mt-1.5 flex items-baseline gap-2">
            <span className="font-mono text-2xl font-bold text-foreground">
              {comparison.counterfactualDataResourcesAtRisk}
            </span>
            <span className="font-mono text-xs text-muted-foreground line-through">
              {comparison.baselineDataResourcesAtRisk}
            </span>
          </div>
          <p className="mt-1 font-mono text-[11px] font-medium text-emerald-400">
            -{comparison.preventedDataExposure} Protected
          </p>
          <p className="text-[10px] text-muted-foreground truncate mt-0.5">Customer DB & Shares</p>
        </div>

        {/* Prevented Events */}
        <div className="rounded-xl border border-border/70 bg-card/50 p-3.5 backdrop-blur-sm">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
            Attack Steps Prevented
          </span>
          <div className="mt-1.5 flex items-baseline gap-2">
            <span className="font-mono text-2xl font-bold text-emerald-400">
              {comparison.preventedCount}
            </span>
            <span className="font-mono text-xs text-muted-foreground">/ 3 Downstream</span>
          </div>
          <p className="mt-1 font-mono text-[11px] font-medium text-cyan-signal">
            Deterministic Engine
          </p>
          <p className="text-[10px] text-muted-foreground truncate mt-0.5">
            Causal Chain Validated
          </p>
        </div>
      </div>

      {/* Causal Chain Explanation */}
      <div className="rounded-xl border border-border/70 bg-card/40 p-4 text-xs backdrop-blur-md">
        <div className="flex items-center gap-2 font-semibold text-foreground mb-2">
          <CornerDownRight className="size-4 text-cyan-signal" />
          <span>Causal Impact Explanation</span>
        </div>
        <p className="text-muted-foreground leading-relaxed">
          {comparison.preventedCount > 0 ? (
            <>
              Executing <strong className="text-foreground">{actionLabel}</strong> severed the
              attack graph pivot point. Because{" "}
              <strong className="text-foreground">
                {comparison.preventedEvents[0]?.targetAsset ?? "the target"}
              </strong>{" "}
              was contained, subsequent lateral hops (
              {comparison.preventedCompromises.join(" → ") || "downstream servers"}) could not be
              reached, shielding critical enterprise databases from data exfiltration.
            </>
          ) : (
            <>
              Without intervention, the attacker maintained persistent footholds across the
              workstation segment, progressively acquiring application tier tokens and exfiltrating
              proprietary records.
            </>
          )}
        </p>
      </div>
    </div>
  );
}
