import { ShieldCheck, Ban, ArrowRight, Clock, HelpCircle } from "lucide-react";
import type { PreventedEventDetail } from "@/types/counterfactual";

interface PreventedEventsProps {
  preventedEvents: PreventedEventDetail[];
  actionLabel: string;
}

export function PreventedEvents({ preventedEvents, actionLabel }: PreventedEventsProps) {
  if (preventedEvents.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border/80 bg-card/30 p-8 text-center text-xs text-muted-foreground">
        <HelpCircle className="size-6 text-muted-foreground/60 mb-2" />
        <p className="font-semibold text-foreground">No Attack Events Prevented</p>
        <p className="mt-1 text-[11px] max-w-sm">
          No simulated response action was selected or the selected action did not interrupt the active attack path.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Prevented Attack Transitions ({preventedEvents.length})
        </h3>
        <span className="font-mono text-[10px] text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
          ALL BLOCKED BY SIMULATION
        </span>
      </div>

      <div className="space-y-2.5">
        {preventedEvents.map((evt, idx) => (
          <div
            key={evt.eventId}
            className="flex items-start gap-3 rounded-xl border border-border/70 bg-card/40 p-3.5 text-xs backdrop-blur-sm"
          >
            <div className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              <ShieldCheck className="size-3.5" />
            </div>

            <div className="flex-1 space-y-1">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[10px] font-bold text-muted-foreground">
                    #{idx + 1} [{evt.originalTime}]
                  </span>
                  <span className="font-semibold text-foreground">{evt.title}</span>
                </div>
                <span className="rounded bg-threat/10 px-1.5 py-0.5 font-mono text-[9px] font-bold text-threat border border-threat/20 line-through">
                  ORIGINAL ATTACK STEP
                </span>
              </div>

              <p className="text-[11px] text-emerald-300 font-medium">
                {evt.reason}
              </p>

              <div className="flex items-center gap-2 pt-1 font-mono text-[10px] text-muted-foreground">
                <span>Target: <strong className="text-foreground">{evt.targetAsset}</strong></span>
                <span>•</span>
                <span>Trigger: <strong className="text-cyan-signal">{evt.causalTrigger}</strong></span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
