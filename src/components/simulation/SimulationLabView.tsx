import { Link } from "@tanstack/react-router";
import { ArrowRight, BrainCircuit, CheckCircle2, Play, ShieldCheck } from "lucide-react";
import { AttackGraph } from "@/components/attack-graph/AttackGraph";
import { GlassPanel, PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/button";
import { useDemo } from "@/context/DemoContext";
import { simulationOptions } from "@/data/incidents";
import { cn } from "@/lib/utils";

export function SimulationLabView() {
  const { selectedSimulation, selectSimulation, runSimulation, isSimulating, simulationProgress } = useDemo();
  const selected = simulationOptions.find((item) => item.id === selectedSimulation) ?? simulationOptions[1];
  const simulationComplete = simulationProgress >= 5 && !isSimulating;

  if (!selected) return null;

  return (
    <div className="mx-auto max-w-7xl animate-fade-in">
      <PageHeader eyebrow="Counterfactual engine" title="Simulation Lab" description="What would have happened if we had taken a different action?" actions={<Button onClick={runSimulation} disabled={isSimulating}><Play className="size-4" />{isSimulating ? "Simulating…" : "Simulate"}</Button>} />
      <div className="grid gap-4 xl:grid-cols-3">
        {simulationOptions.map((option) => {
          const active = selectedSimulation === option.id;
          return (
            <button key={option.id} type="button" onClick={() => selectSimulation(option.id)} className={cn("rounded-xl border bg-card/72 p-5 text-left shadow-panel transition-all hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring", active ? "border-cyan-glow shadow-glow" : "border-border")}>
              <div className="flex items-start justify-between gap-3"><span><span className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-signal">{option.label}</span><span className="mt-2 block text-sm text-muted-foreground">{option.subtitle}</span></span>{active ? <CheckCircle2 className="size-5 text-green-signal" /> : null}</div>
              <div className="mt-5 space-y-3 border-l border-border pl-4">
                {option.timeline.map((event) => <div key={`${option.id}-${event.time}`} className="grid grid-cols-[48px_1fr] gap-3 text-sm"><span className="font-mono text-cyan-signal">{event.time}</span><span>{event.event}</span></div>)}
              </div>
              <div className="mt-5 grid grid-cols-3 gap-2 border-t border-border pt-4 text-center"><Metric label="Risk reduction" value={option.riskReduction} /><Metric label="Impact" value={option.businessImpact} /><Metric label="Progression" value={option.attackProgression} /></div>
            </button>
          );
        })}
      </div>
      <div className="mt-6"><AttackGraph simulation /></div>
      {simulationComplete ? <GlassPanel className="mt-6 border-green-signal/35 p-6 animate-scale-in"><div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between"><div className="flex gap-4"><span className="grid size-12 shrink-0 place-items-center rounded-lg bg-green-signal/12 text-green-signal"><BrainCircuit className="size-6" /></span><div><p className="text-xs font-semibold uppercase tracking-[0.2em] text-green-signal">AI analysis</p><h2 className="mt-1 text-xl font-semibold">Containment path validated</h2><p className="mt-2 max-w-3xl text-sm text-muted-foreground">The simulation indicates that <strong className="text-foreground">{selected.label.replace(/Option [A-C] — /, "")}</strong> interrupts the attack path while limiting business disruption. This is a recommendation only; a human must approve every simulated action.</p></div></div><Button asChild><Link to="/response-center"><ShieldCheck className="size-4" />Review Response <ArrowRight className="size-4" /></Link></Button></div></GlassPanel> : null}
      <GlassPanel className="mt-6 overflow-hidden"><div className="border-b border-border p-5"><p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-signal">Response comparison</p><h2 className="mt-1 text-xl font-semibold">Decision matrix</h2></div><div className="overflow-x-auto"><table className="w-full min-w-[780px] text-left text-sm"><thead className="bg-secondary/45 text-xs uppercase tracking-[0.12em] text-muted-foreground"><tr><th className="p-4">Action</th><th className="p-4">Risk Reduction</th><th className="p-4">Business Impact</th><th className="p-4">Attack Progression</th><th className="p-4">Evidence Preserved</th></tr></thead><tbody>{[...simulationOptions, { ...simulationOptions[1], id: "revoke", label: "Revoke Sessions", riskReduction: "88%", evidencePreserved: "High" }].map((row) => <tr key={row.id} className="border-t border-border"><td className="p-4 font-semibold">{row.label.replace(/Option [A-C] — /, "")}</td><td className="p-4 text-green-signal">{row.riskReduction}</td><td className="p-4">{row.businessImpact}</td><td className="p-4">{row.attackProgression}</td><td className="p-4">{row.evidencePreserved}</td></tr>)}</tbody></table></div></GlassPanel>
    </div>
  );
}
function Metric({ label, value }: { label: string; value: string }) { return <div className="min-w-0"><p className="truncate text-[10px] uppercase tracking-[0.1em] text-muted-foreground">{label}</p><p className={cn("mt-1 truncate text-xs font-semibold", value === "STOPPED" || value.includes("%") ? "text-green-signal" : value === "CRITICAL" ? "text-threat" : "text-foreground")}>{value}</p></div>; }
