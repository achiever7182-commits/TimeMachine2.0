import { Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlassPanel } from "@/components/layout/PageHeader";
import { useDemo } from "@/context/DemoContext";
import { missedSignals } from "@/data/incidents";
import { ForensicTimeline } from "./ForensicTimeline";

export function IncidentTimeline() {
  const { showMissed, revealMissed } = useDemo();

  return (
    <div className="space-y-5">
      {/* Upgraded Forensic Timeline Ruler & Event Inspector */}
      <ForensicTimeline />

      {/* Earliest Detectable Opportunity & Missed Signals */}
      <Button
        onClick={revealMissed}
        className="h-14 w-full text-base font-mono gap-2"
        variant={showMissed ? "secondary" : "default"}
      >
        <Sparkles className="size-5 text-cyan-signal" /> Show Me What We Missed
      </Button>

      {showMissed ? (
        <GlassPanel className="overflow-hidden border-cyan-glow shadow-glow animate-scale-in">
          <div className="grid gap-6 p-6 lg:grid-cols-[0.75fr_1.25fr]">
            <div className="border-b border-border pb-6 lg:border-b-0 lg:border-r lg:pb-0 lg:pr-6">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-signal">
                Earliest detectable opportunity
              </p>
              <p className="mt-4 font-mono text-6xl font-semibold text-foreground">09:47</p>
              <p className="mt-2 text-lg text-cyan-signal">28 minutes before formal detection.</p>
              <p className="mt-5 text-sm text-muted-foreground">Signal</p>
              <p className="mt-1 text-sm leading-6">
                Unusual login + unfamiliar IP + abnormal authentication pattern.
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                Missed signals
              </p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {missedSignals.map((signal, index) => (
                  <div
                    key={signal}
                    className="flex items-center gap-3 rounded-lg border border-border bg-secondary/40 p-4"
                    style={{ animationDelay: `${index * 90}ms` }}
                  >
                    <span className="grid size-7 place-items-center rounded-full bg-green-signal/15 text-green-signal">
                      <Check className="size-4" />
                    </span>
                    <span className="text-sm font-medium">{signal}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </GlassPanel>
      ) : null}
    </div>
  );
}
