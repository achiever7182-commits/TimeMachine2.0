import { Database, FileKey2, Laptop, Radar, Server, UserRound } from "lucide-react";
import { useState } from "react";
import { useDemo } from "@/context/DemoContext";
import { getAttackNodesForMinute } from "@/services/incidentService";
import { cn } from "@/lib/utils";
import { GlassPanel } from "@/components/layout/PageHeader";

const icons = { radar: Radar, user: UserRound, laptop: Laptop, server: Server, database: Database, files: FileKey2 };

export function AttackGraph({ simulation = false }: { simulation?: boolean }) {
  const { currentMinute, selectedSimulation, isSimulating, simulationProgress } = useDemo();
  const nodes = getAttackNodesForMinute(simulation ? 42 : currentMinute);
  const [selectedId, setSelectedId] = useState("laptop");
  const selected = nodes.find((node) => node.id === selectedId) ?? nodes[0];
  const stopAfter = selectedSimulation === "disable-account" ? 1 : selectedSimulation === "isolate-endpoint" ? 2 : 99;

  if (!selected) return null;

  return (
    <GlassPanel className="overflow-hidden">
      <div className="border-b border-border p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-signal">Attack path</p>
        <div className="mt-1 flex items-center justify-between gap-4"><h2 className="text-xl font-semibold">Movement through the environment</h2><span className="font-mono text-xs text-muted-foreground">{simulation ? "COUNTERFACTUAL" : `STATE ${currentMinute}/42`}</span></div>
      </div>
      <div className="grid lg:grid-cols-[1fr_280px]">
        <div className="overflow-x-auto p-6">
          <div className="flex min-w-[790px] items-center justify-between gap-2 py-10">
            {nodes.map((node, index) => {
              const Icon = icons[node.icon as keyof typeof icons] ?? Radar;
              const activeInSimulation = !simulation || !isSimulating || index <= simulationProgress;
              const stopped = simulation && simulationProgress >= stopAfter && index > stopAfter;
              return (
                <div key={node.id} className="flex flex-1 items-center last:flex-none">
                  <button
                    type="button"
                    onClick={() => setSelectedId(node.id)}
                    className={cn(
                      "group relative flex w-28 shrink-0 flex-col items-center rounded-xl border p-3 text-center transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                      stopped ? "border-border bg-muted/20 opacity-35" : node.status !== "Clean" && activeInSimulation ? "border-threat/45 bg-threat/10 shadow-threat" : "border-border bg-secondary/45",
                      selected.id === node.id && "border-cyan-glow shadow-glow",
                    )}
                  >
                    <span className={cn("grid size-11 place-items-center rounded-lg border", stopped ? "border-border text-muted-foreground" : node.status !== "Clean" && activeInSimulation ? "border-threat/40 bg-threat/10 text-threat" : "border-border text-cyan-signal")}><Icon className="size-5" /></span>
                    <span className="mt-3 text-xs font-semibold leading-4">{node.label}</span>
                    <span className="mt-1 font-mono text-[10px] text-muted-foreground">{node.timestamp}</span>
                    {simulation && simulationProgress >= stopAfter && index === stopAfter ? <span className="absolute -right-5 top-8 z-10 grid size-8 place-items-center rounded-full border border-threat bg-background text-lg font-bold text-threat">×</span> : null}
                  </button>
                  {index < nodes.length - 1 ? <div className={cn("relative h-px min-w-6 flex-1 overflow-hidden bg-border", simulation && simulationProgress > index && index < stopAfter && "bg-cyan-signal", stopped && "opacity-30")}><span className={cn("absolute inset-y-0 w-8 bg-primary blur-sm", isSimulating && index < simulationProgress && index < stopAfter ? "animate-flow-line" : "hidden")} /></div> : null}
                </div>
              );
            })}
          </div>
        </div>
        <div className="border-t border-border bg-secondary/25 p-5 lg:border-l lg:border-t-0">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Selected asset</p>
          <h3 className="mt-3 text-lg font-semibold">{selected.label}</h3>
          <dl className="mt-5 space-y-4 text-sm">
            <Info label="Hostname" value={selected.hostname ?? "External actor"} mono />
            <Info label="Status" value={selected.status} />
            <Info label="First observed" value={selected.timestamp} mono />
            <Info label="Current risk" value={selected.risk.toUpperCase()} />
            <Info label="Related events" value={String(selected.relatedEvents)} />
          </dl>
        </div>
      </div>
    </GlassPanel>
  );
}

function Info({ label, value, mono = false }: { label: string; value: string; mono?: boolean }) {
  return <div className="flex items-baseline justify-between gap-3 border-b border-border pb-3"><dt className="text-muted-foreground">{label}</dt><dd className={cn("text-right font-semibold", mono && "font-mono")}>{value}</dd></div>;
}
