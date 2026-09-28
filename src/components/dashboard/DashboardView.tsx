import { Link } from "@tanstack/react-router";
import { Activity, AlertTriangle, Clock3, MonitorCheck, Radar, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDemo } from "@/context/DemoContext";
import { incidents } from "@/data/incidents";
import { getDashboardSnapshot } from "@/services/incidentService";
import { GlassPanel, PageHeader } from "@/components/layout/PageHeader";
import { cn } from "@/lib/utils";

const kpiIcons = [Activity, ShieldAlert, MonitorCheck, Clock3];

export function DashboardView() {
  const { demoStep, demoStage, isAttackRunning, startAttackSimulation } = useDemo();
  const snapshot = getDashboardSnapshot(demoStep);
  const riskHigh = demoStep >= 5;

  return (
    <AppPage>
      <PageHeader
        eyebrow="Good evening, Security Team"
        title="Incident Time Machine"
        description="Rewind an incident, compare alternate decisions, and approve a simulated response before action is taken."
        actions={
          <Button onClick={startAttackSimulation} disabled={isAttackRunning}>
            <Radar className="size-4" /> {isAttackRunning ? demoStage : "Start Attack Simulation"}
          </Button>
        }
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {snapshot.kpis.map((kpi, index) => {
          const Icon = kpiIcons[index] ?? Activity;
          return (
            <GlassPanel key={kpi.label} className="p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm text-muted-foreground">{kpi.label}</p>
                  <p className="mt-2 text-3xl font-semibold">{kpi.value}</p>
                </div>
                <span className="grid size-10 place-items-center rounded-lg border border-primary/25 bg-primary/12 text-cyan-signal">
                  <Icon className="size-5" />
                </span>
              </div>
              <p className="mt-4 text-xs font-semibold text-green-signal">{kpi.trend}</p>
              <p className="mt-1 text-sm text-muted-foreground">{kpi.description}</p>
            </GlassPanel>
          );
        })}
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <GlassPanel className="overflow-hidden p-6">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Current Organizational Risk</p>
              <p className={cn("mt-3 text-6xl font-semibold", riskHigh ? "text-threat" : "text-cyan-signal")}>{riskHigh ? "HIGH" : "ELEVATED"}</p>
              <p className="mt-2 text-sm text-muted-foreground">Live demo stage: <span className="font-mono text-foreground">{snapshot.stage}</span></p>
            </div>
            <div className="relative mx-auto aspect-square w-64 max-w-full">
              <div className="absolute inset-0 rounded-full border border-border bg-secondary/30" />
              <div className="absolute inset-4 rounded-full border border-cyan-glow bg-background/60" />
              <div className="absolute inset-8 rounded-full border-[18px] border-muted" />
              <div className={cn("absolute inset-8 rounded-full border-[18px] border-transparent border-t-threat border-r-threat transition-transform duration-700", riskHigh ? "rotate-[55deg]" : "rotate-[5deg]")} />
              <div className="absolute inset-0 grid place-items-center text-center">
                <ShieldAlert className={cn("mx-auto size-10", riskHigh ? "text-threat" : "text-cyan-signal")} />
                <p className="mt-2 text-sm font-semibold">Risk meter</p>
              </div>
            </div>
          </div>
          <div className="mt-8 grid grid-cols-4 gap-2">
            {["Normal", "Elevated", "High", "Critical"].map((stage, index) => (
              <div key={stage} className="min-w-0">
                <div className={cn("h-2 rounded-full", index <= (riskHigh ? 2 : 1) ? "bg-cyan-signal" : "bg-muted")} />
                <p className="mt-2 truncate text-xs text-muted-foreground">{stage}</p>
              </div>
            ))}
          </div>
        </GlassPanel>

        <GlassPanel className="p-6">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-signal">Active incidents</p>
              <h2 className="mt-1 text-xl font-semibold">Critical queue</h2>
            </div>
            <Button asChild variant="outline" size="sm"><Link to="/incidents">View all</Link></Button>
          </div>
          <div className="space-y-3">
            {incidents.map((incident) => (
              <article key={incident.id} className="rounded-lg border border-border bg-secondary/35 p-4 transition-colors hover:border-cyan-glow">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-mono text-xs text-muted-foreground">{incident.id}</p>
                    <h3 className="mt-1 font-semibold">{incident.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">Detected {incident.detectedAgo}</p>
                    {incident.employeeAccount ? <p className="mt-1 text-sm text-muted-foreground">Employee Account: <span className="font-mono text-foreground">{incident.employeeAccount}</span></p> : null}
                  </div>
                  <span className={cn("rounded-full border px-2.5 py-1 text-xs font-semibold", incident.severity === "CRITICAL" ? "border-threat/40 bg-threat/10 text-threat" : incident.severity === "HIGH" ? "border-warning/40 bg-warning/10 text-warning" : "border-cyan-glow bg-primary/10 text-cyan-signal")}>{incident.severity}</span>
                </div>
                <div className="mt-4 flex items-center justify-between gap-3">
                  <span className="text-sm text-muted-foreground">Affected assets: {incident.affectedAssets}</span>
                  <Button asChild size="sm"><Link to="/time-machine">Open Investigation →</Link></Button>
                </div>
              </article>
            ))}
          </div>
        </GlassPanel>
      </div>
    </AppPage>
  );
}

function AppPage({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto max-w-7xl animate-fade-in">{children}</div>;
}
