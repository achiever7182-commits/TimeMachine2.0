import { Link } from "@tanstack/react-router";
import { ArrowRight, BrainCircuit, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AttackGraph } from "@/components/attack-graph/AttackGraph";
import { GlassPanel, PageHeader } from "@/components/layout/PageHeader";
import { IncidentTimeline } from "@/components/timeline/IncidentTimeline";
import { blastRadius } from "@/data/incidents";
import { useDemo } from "@/context/DemoContext";
import { cn } from "@/lib/utils";

export function TimeMachineView() {
  const { currentTime } = useDemo();
  return (
    <div className="mx-auto max-w-7xl animate-fade-in">
      <PageHeader
        eyebrow="Incident Time Machine · INC-2048"
        title="Credential Compromise"
        description="Reconstruct the incident timeline and explore alternate response decisions."
        actions={<><span className="inline-flex items-center rounded-full border border-threat/40 bg-threat/10 px-3 py-2 text-xs font-semibold text-threat"><ShieldAlert className="mr-2 size-4" />CRITICAL</span><Button asChild><Link to="/simulation-lab">Open Simulation Lab <ArrowRight className="size-4" /></Link></Button></>}
      />
      <IncidentTimeline />
      <div className="mt-6 grid gap-6 xl:grid-cols-[1.45fr_0.55fr]">
        <AttackGraph />
        <GlassPanel className="p-5">
          <div className="flex items-center gap-3"><span className="grid size-10 place-items-center rounded-lg bg-primary/15 text-cyan-signal"><BrainCircuit className="size-5" /></span><div><p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-signal">AI incident summary</p><p className="font-mono text-xs text-muted-foreground">State at {currentTime}</p></div></div>
          <p className="mt-5 text-sm leading-7 text-foreground typewriter-reveal">An employee account was compromised through an unusual authentication event. The attacker then accessed an internal endpoint, performed lateral movement and attempted to access a sensitive database. The earliest detectable opportunity occurred 28 minutes before the incident was formally detected.</p>
        </GlassPanel>
      </div>
      <GlassPanel className="mt-6 p-5">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between"><div><p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-signal">Potential blast radius</p><h2 className="mt-1 text-xl font-semibold">Confirmed movement vs. potential exposure</h2></div><div className="flex gap-4 text-sm"><span><strong className="text-threat">4</strong> confirmed assets</span><span><strong className="text-warning">37</strong> estimated exposure</span></div></div>
        <div className="mt-6 flex flex-col items-stretch gap-2 md:flex-row md:items-center">
          {blastRadius.map((node, index) => <div key={node.label} className="flex flex-1 items-center gap-2"><div className={cn("flex min-h-24 flex-1 flex-col items-center justify-center rounded-lg border p-3 text-center", node.impact === "confirmed" ? "border-threat/35 bg-threat/8" : "border-warning/35 bg-warning/8")}><span className={cn("text-2xl font-semibold", node.impact === "confirmed" ? "text-threat" : "text-warning")}>{node.count}</span><span className="mt-1 text-xs text-muted-foreground">{node.label}</span><span className="mt-2 text-[10px] font-semibold uppercase tracking-[0.15em]">{node.impact}</span></div>{index < blastRadius.length - 1 ? <ArrowRight className="hidden size-4 shrink-0 text-muted-foreground md:block" /> : null}</div>)}
        </div>
      </GlassPanel>
    </div>
  );
}
