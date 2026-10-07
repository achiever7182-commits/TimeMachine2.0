import { Link } from "@tanstack/react-router";
import { ArrowRight, Check, Circle, LoaderCircle, ShieldCheck, SlidersHorizontal } from "lucide-react";
import { useState } from "react";
import { GlassPanel, PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useDemo } from "@/context/DemoContext";
import { responseActions } from "@/data/incidents";
import { cn } from "@/lib/utils";

export function ResponseCenterView() {
  const { responseApproved, approveResponse, executionStep } = useDemo();
  const [checked, setChecked] = useState<Record<string, boolean>>(Object.fromEntries(responseActions.map((action) => [action.id, true])));
  const allSelected = responseActions.every((action) => checked[action.id]);
  const contained = responseApproved && executionStep >= responseActions.length;

  return <div className="mx-auto max-w-5xl animate-fade-in"><PageHeader eyebrow="Human-in-the-loop control" title="Response Plan Ready" description="IRIS recommends the actions below. A human analyst must review and approve them before the simulated response begins." />
    {!responseApproved ? <>
      <div className="space-y-3">{responseActions.map((action, index) => <GlassPanel key={action.id} className="p-5"><div className="flex items-start gap-4"><Checkbox checked={Boolean(checked[action.id])} onCheckedChange={(value) => setChecked((current) => ({ ...current, [action.id]: Boolean(value) }))} aria-label={`Select ${action.label}`} className="mt-1 size-5" /><div className="min-w-0 flex-1"><div className="flex flex-wrap items-center justify-between gap-2"><h2 className="font-semibold"><span className="mr-3 font-mono text-cyan-signal">{String(index + 1).padStart(2, "0")}</span>{action.label}</h2><span className="rounded-full border border-border px-2 py-1 text-[10px] font-semibold uppercase">Risk {action.risk}</span></div><p className="mt-2 text-sm text-muted-foreground">{action.explanation}</p><div className="mt-4 grid gap-3 sm:grid-cols-2"><div className="rounded-lg bg-secondary/40 p-3"><p className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground">Expected effect</p><p className="mt-1 text-sm">{action.expectedEffect}</p></div><div className="rounded-lg bg-secondary/40 p-3"><p className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground">Business impact</p><p className="mt-1 text-sm">{action.businessImpact}</p></div></div></div></div></GlassPanel>)}</div>
      <div className="mt-6 flex flex-col gap-3 border-t border-border pt-6 sm:flex-row sm:justify-end"><Button variant="outline"><SlidersHorizontal className="size-4" />Modify Plan</Button><Button onClick={approveResponse} disabled={!allSelected}><ShieldCheck className="size-4" />Approve Response Plan</Button></div>
    </> : <GlassPanel className="overflow-hidden border-green-signal/35"><div className="p-6 sm:p-8"><div className="mx-auto max-w-2xl"><div className={cn("mx-auto grid size-24 place-items-center rounded-full border text-green-signal", contained ? "border-green-signal bg-green-signal/12 shadow-success animate-shield-in" : "border-cyan-glow bg-primary/10")}><ShieldCheck className="size-11" /></div><h2 className="mt-5 text-center text-3xl font-semibold">{contained ? "Incident Contained" : "Executing Simulated Response"}</h2><p className="mt-2 text-center text-sm text-muted-foreground">{contained ? "The approved plan completed with no real-world actions." : "Applying approved actions to the synthetic environment."}</p><div className="mt-8 space-y-3">{responseActions.map((action, index) => { const done = executionStep > index; const running = executionStep === index; return <div key={action.id} className={cn("flex items-center gap-3 rounded-lg border p-4 transition-all", done ? "border-green-signal/30 bg-green-signal/8" : "border-border bg-secondary/30")}><span className={cn("grid size-8 place-items-center rounded-full", done ? "bg-green-signal/15 text-green-signal" : running ? "bg-primary/15 text-cyan-signal" : "bg-muted text-muted-foreground")}>{done ? <Check className="size-4" /> : running ? <LoaderCircle className="size-4 animate-spin" /> : <Circle className="size-3" />}</span><span className="text-sm font-medium">{done ? action.label.replace("affected ", "simulated ") : action.label}</span></div>; })}</div>{contained ? <Button asChild className="mt-8 w-full"><Link to="/reports">Generate Final Incident Report <ArrowRight className="size-4" /></Link></Button> : null}</div></div></GlassPanel>}
  </div>;
}
