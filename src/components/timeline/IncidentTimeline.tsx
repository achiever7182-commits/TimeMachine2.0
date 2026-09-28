import { Check, Rewind, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDemo } from "@/context/DemoContext";
import { missedSignals, timelineEvents } from "@/data/incidents";
import { cn } from "@/lib/utils";
import { GlassPanel } from "@/components/layout/PageHeader";

export function IncidentTimeline() {
  const { currentMinute, setCurrentMinute, currentTime, currentRisk, affectedAssets, isRewinding, rewindIncident, showMissed, revealMissed } = useDemo();

  return (
    <div className="space-y-5">
      <GlassPanel className="overflow-hidden">
        <div className="flex flex-col gap-4 border-b border-border p-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-signal">Incident timeline</p>
            <h2 className="mt-1 text-xl font-semibold">Reconstruction at <span className="font-mono text-cyan-signal">{currentTime}</span></h2>
          </div>
          <Button onClick={rewindIncident} disabled={isRewinding}>
            <Rewind className={cn("size-4", isRewinding && "animate-spin")} /> {isRewinding ? "Rewinding…" : "Rewind Incident"}
          </Button>
        </div>
        <div className="overflow-x-auto p-5 pb-7">
          <div className="min-w-[860px]">
            <div className="relative grid grid-cols-7 gap-5 pt-2">
              <div className="absolute left-[7%] right-[7%] top-[25px] h-px bg-border" />
              <div className="absolute left-[7%] top-[24px] h-0.5 bg-cyan-signal transition-all duration-300" style={{ width: `${(currentMinute / 42) * 86}%` }} />
              {timelineEvents.map((event) => {
                const happened = event.minute <= currentMinute;
                return (
                  <div key={event.id} className="relative text-center">
                    <span className={cn("relative z-10 mx-auto block size-3 rounded-full border transition-all", happened ? "border-cyan-signal bg-cyan-signal shadow-glow" : "border-border bg-muted")} />
                    <p className={cn("mt-4 font-mono text-sm font-semibold", happened ? "text-foreground" : "text-muted-foreground")}>{event.time}</p>
                    <p className={cn("mt-1 text-xs", happened ? "text-cyan-signal" : "text-muted-foreground")}>{event.label}</p>
                  </div>
                );
              })}
            </div>
            <label className="mt-7 block text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground" htmlFor="timeline-range">Drag through the incident</label>
            <input
              id="timeline-range"
              className="timeline-range mt-3 w-full"
              type="range"
              min="0"
              max="42"
              step="1"
              value={currentMinute}
              onChange={(event) => setCurrentMinute(Number(event.target.value))}
              aria-label="Incident time"
            />
          </div>
        </div>
        <div className="grid gap-px border-t border-border bg-border md:grid-cols-3">
          <div className="bg-card/90 p-4"><p className="text-xs text-muted-foreground">Current state</p><p className="mt-1 text-sm font-medium">{timelineEvents.filter((event) => event.minute <= currentMinute).at(-1)?.state}</p></div>
          <div className="bg-card/90 p-4"><p className="text-xs text-muted-foreground">Risk level</p><p className={cn("mt-1 text-sm font-semibold uppercase", currentRisk === "Critical" ? "text-threat" : currentRisk === "High" ? "text-warning" : "text-cyan-signal")}>{currentRisk}</p></div>
          <div className="bg-card/90 p-4"><p className="text-xs text-muted-foreground">Affected at this moment</p><p className="mt-1 text-sm font-medium">{affectedAssets.join(" · ")}</p></div>
        </div>
      </GlassPanel>

      <Button onClick={revealMissed} className="h-14 w-full text-base" variant={showMissed ? "secondary" : "default"}>
        <Sparkles className="size-5" /> Show Me What We Missed
      </Button>

      {showMissed ? (
        <GlassPanel className="overflow-hidden border-cyan-glow shadow-glow animate-scale-in">
          <div className="grid gap-6 p-6 lg:grid-cols-[0.75fr_1.25fr]">
            <div className="border-b border-border pb-6 lg:border-b-0 lg:border-r lg:pb-0 lg:pr-6">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-signal">Earliest detectable opportunity</p>
              <p className="mt-4 font-mono text-6xl font-semibold text-foreground">09:47</p>
              <p className="mt-2 text-lg text-cyan-signal">28 minutes before formal detection.</p>
              <p className="mt-5 text-sm text-muted-foreground">Signal</p>
              <p className="mt-1 text-sm leading-6">Unusual login + unfamiliar IP + abnormal authentication pattern.</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Missed signals</p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {missedSignals.map((signal, index) => (
                  <div key={signal} className="flex items-center gap-3 rounded-lg border border-border bg-secondary/40 p-4" style={{ animationDelay: `${index * 90}ms` }}>
                    <span className="grid size-7 place-items-center rounded-full bg-green-signal/15 text-green-signal"><Check className="size-4" /></span>
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
