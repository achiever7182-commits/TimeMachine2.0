import { Link } from "@tanstack/react-router";
import {
  Activity,
  Clock3,
  MonitorCheck,
  Pause,
  Play,
  Radar,
  RotateCcw,
  ShieldAlert,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDemo } from "@/context/DemoContext";
import { incidents } from "@/data/incidents";
import { getDashboardSnapshot } from "@/services/incidentService";
import { SIMULATION_SPEEDS } from "@/services/simulationService";
import { GlassPanel, PageHeader } from "@/components/layout/PageHeader";
import { cn } from "@/lib/utils";

const kpiIcons = [Activity, ShieldAlert, MonitorCheck, Clock3];

export function DashboardView() {
  const {
    incident,
    incidentState,
    currentRisk,
    currentTime,
    isAttackRunning,
    isPaused,
    simulationSpeed,
    setSimulationSpeed,
    startAttackSimulation,
    pauseSimulation,
    resumeSimulation,
    resetDemo,
  } = useDemo();

  const snapshot = getDashboardSnapshot(incidentState);
  const isCritical = currentRisk === "CRITICAL" || currentRisk === "Critical";
  const isHigh = currentRisk === "HIGH" || currentRisk === "High";
  const isMedium = currentRisk === "MEDIUM" || currentRisk === "Elevated";

  // Meter rotation based on dynamic risk
  const meterRotation = isCritical
    ? "rotate-[135deg]"
    : isHigh
      ? "rotate-[90deg]"
      : isMedium
        ? "rotate-[45deg]"
        : "rotate-[5deg]";

  const riskColor = isCritical
    ? "text-threat"
    : isHigh
      ? "text-threat"
      : isMedium
        ? "text-amber-400"
        : "text-cyan-signal";

  return (
    <AppPage>
      <PageHeader
        eyebrow="Good evening, Security Team"
        title="Incident Time Machine"
        description="Rewind an incident, compare alternate decisions, and approve a simulated response before action is taken."
        actions={
          <div className="flex flex-wrap items-center gap-2">
            {/* Speed Selector */}
            <div className="flex items-center rounded-lg border border-border bg-secondary/50 p-1 text-xs">
              <span className="px-2 text-muted-foreground">Speed:</span>
              {SIMULATION_SPEEDS.map((spd) => (
                <button
                  key={spd}
                  type="button"
                  onClick={() => setSimulationSpeed(spd)}
                  className={cn(
                    "rounded px-2 py-1 font-mono transition-colors",
                    simulationSpeed === spd
                      ? "bg-primary/20 text-cyan-signal font-semibold"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {spd}x
                </button>
              ))}
            </div>

            {/* Simulation Controls */}
            {!isAttackRunning && !isPaused ? (
              <Button onClick={startAttackSimulation} className="gap-2">
                <Radar className="size-4" /> Start Attack Simulation
              </Button>
            ) : isAttackRunning ? (
              <>
                <Button onClick={pauseSimulation} variant="secondary" className="gap-2">
                  <Pause className="size-4" /> Pause ({currentTime})
                </Button>
                <Button onClick={resetDemo} variant="outline" size="icon" title="Reset Incident">
                  <RotateCcw className="size-4" />
                </Button>
              </>
            ) : (
              <>
                <Button onClick={resumeSimulation} className="gap-2">
                  <Play className="size-4" /> Resume ({currentTime})
                </Button>
                <Button onClick={resetDemo} variant="outline" size="icon" title="Reset Incident">
                  <RotateCcw className="size-4" />
                </Button>
              </>
            )}
          </div>
        }
      />

      {/* KPI Cards */}
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

      {/* Main Grid: Risk Meter & Incident Queue */}
      <div className="mt-6 grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <GlassPanel className="overflow-hidden p-6">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                Current Organizational Risk
              </p>
              <p
                className={cn("mt-3 text-6xl font-semibold uppercase transition-colors", riskColor)}
              >
                {String(currentRisk).toUpperCase()}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                Live simulation stage:{" "}
                <span className="font-mono text-foreground">{snapshot.stage}</span>
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Simulation Clock: <span className="font-mono text-cyan-signal">{currentTime}</span>
              </p>
            </div>
            <div className="relative mx-auto aspect-square w-64 max-w-full">
              <div className="absolute inset-0 rounded-full border border-border bg-secondary/30" />
              <div className="absolute inset-4 rounded-full border border-cyan-glow bg-background/60" />
              <div className="absolute inset-8 rounded-full border-[18px] border-muted" />
              <div
                className={cn(
                  "absolute inset-8 rounded-full border-[18px] border-transparent transition-transform duration-700",
                  isCritical
                    ? "border-t-threat border-r-threat"
                    : isHigh
                      ? "border-t-threat border-r-threat"
                      : isMedium
                        ? "border-t-amber-400 border-r-amber-400"
                        : "border-t-cyan-signal border-r-cyan-signal",
                  meterRotation,
                )}
              />
              <div className="absolute inset-0 grid place-items-center text-center">
                <ShieldAlert className={cn("mx-auto size-10 transition-colors", riskColor)} />
                <p className="mt-2 text-sm font-semibold">Risk meter</p>
                <span className="font-mono text-xs text-muted-foreground">{currentTime}</span>
              </div>
            </div>
          </div>
          <div className="mt-8 grid grid-cols-4 gap-2">
            {[
              { label: "Low", active: true },
              { label: "Medium", active: isMedium || isHigh || isCritical },
              { label: "High", active: isHigh || isCritical },
              { label: "Critical", active: isCritical },
            ].map(({ label, active }) => (
              <div key={label} className="min-w-0">
                <div
                  className={cn(
                    "h-2 rounded-full transition-colors",
                    active
                      ? isCritical
                        ? "bg-threat"
                        : isHigh
                          ? "bg-amber-500"
                          : isMedium
                            ? "bg-amber-400"
                            : "bg-cyan-signal"
                      : "bg-muted",
                  )}
                />
                <p className="mt-2 truncate text-xs text-muted-foreground">{label}</p>
              </div>
            ))}
          </div>
        </GlassPanel>

        {/* Incidents Queue */}
        <GlassPanel className="p-6">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-signal">
                Active incidents
              </p>
              <h2 className="mt-1 text-xl font-semibold">Critical queue</h2>
            </div>
            <Button asChild variant="outline" size="sm">
              <Link to="/incidents">View all</Link>
            </Button>
          </div>
          <div className="space-y-3">
            {incidents.map((inc) => {
              // Read from single source of truth for INC-2048
              const isTarget = inc.id === "INC-2048";
              const displayIncident = isTarget ? incident : inc;

              return (
                <article
                  key={displayIncident.id}
                  className="rounded-lg border border-border bg-secondary/35 p-4 transition-colors hover:border-cyan-glow"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-mono text-xs text-muted-foreground">
                        {displayIncident.id}
                      </p>
                      <h3 className="mt-1 font-semibold">{displayIncident.title}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Detected {displayIncident.detectedAgo}
                      </p>
                      {displayIncident.employeeAccount ? (
                        <p className="mt-1 text-sm text-muted-foreground">
                          Employee Account:{" "}
                          <span className="font-mono text-foreground">
                            {displayIncident.employeeAccount}
                          </span>
                        </p>
                      ) : null}
                    </div>
                    <span
                      className={cn(
                        "rounded-full border px-2.5 py-1 text-xs font-semibold uppercase",
                        displayIncident.severity === "CRITICAL"
                          ? "border-threat/40 bg-threat/10 text-threat"
                          : displayIncident.severity === "HIGH"
                            ? "border-warning/40 bg-warning/10 text-warning"
                            : "border-cyan-glow bg-primary/10 text-cyan-signal",
                      )}
                    >
                      {displayIncident.severity}
                    </span>
                  </div>
                  <div className="mt-4 flex items-center justify-between gap-3">
                    <span className="text-sm text-muted-foreground">
                      Affected assets:{" "}
                      <strong className="text-foreground">
                        {displayIncident.affectedAssets ?? 0}
                      </strong>
                    </span>
                    <Button asChild size="sm">
                      <Link to="/time-machine">Open Investigation →</Link>
                    </Button>
                  </div>
                </article>
              );
            })}
          </div>
        </GlassPanel>
      </div>
    </AppPage>
  );
}

function AppPage({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto max-w-7xl animate-fade-in">{children}</div>;
}
