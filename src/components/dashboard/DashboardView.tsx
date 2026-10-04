import { lazy, Suspense, useCallback, useState } from "react";
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
  Terminal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDemo } from "@/context/DemoContext";
import { incidents } from "@/data/incidents";
import { getDashboardSnapshot } from "@/services/incidentService";
import { SIMULATION_SPEEDS } from "@/services/simulationService";
import { cn } from "@/lib/utils";

const CINEMATIC_FLAG =
  (import.meta.env?.VITE_ENABLE_CINEMATIC_DASHBOARD as string | undefined) ?? "true";

const LazyCinematicDashboard = lazy(() =>
  import("./cinematic").then((m) => ({
    default: m.CinematicDashboard,
  })),
);

const isCinematicEnabled = typeof window !== "undefined" && CINEMATIC_FLAG === "true";

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

  const [cinematicActive, setCinematicActive] = useState<boolean>(isCinematicEnabled);
  const handleCinematicExit = useCallback(() => {
    setCinematicActive(false);
    window.requestAnimationFrame(() => {
      document
        .getElementById("operational-dashboard")
        ?.scrollIntoView({ behavior: "auto", block: "start" });
    });
  }, []);

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
        ? "text-warning"
        : "text-cyan-signal";

  return (
    <AppPage>
      {cinematicActive && isCinematicEnabled ? (
        <Suspense fallback={null}>
          <LazyCinematicDashboard onExit={handleCinematicExit} />
        </Suspense>
      ) : null}

      {/* DASHBOARD HEADER */}
      <div
        id="operational-dashboard"
        className="mb-6 flex flex-col gap-4 border-b border-border pb-6 md:flex-row md:items-end md:justify-between"
      >
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Terminal className="size-4 text-cyan-signal" />
            <h1 className="font-mono text-sm uppercase tracking-[0.2em] text-cyan-signal font-bold">
              Global Overview
            </h1>
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground uppercase">
            Security Operations Center
          </h2>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap items-center gap-4">
          {/* Speed Selector */}
          <div className="flex items-center border border-border bg-black/40 px-2 py-1 text-xs">
            <span className="px-2 font-mono text-muted-foreground/60 uppercase">Speed:</span>
            {SIMULATION_SPEEDS.map((spd) => (
              <button
                key={spd}
                type="button"
                onClick={() => setSimulationSpeed(spd)}
                className={cn(
                  "px-3 py-1 font-mono transition-colors",
                  simulationSpeed === spd
                    ? "bg-cyan-signal/10 text-cyan-signal font-bold border border-cyan-signal/30"
                    : "text-muted-foreground hover:text-foreground border border-transparent",
                )}
              >
                {spd}x
              </button>
            ))}
          </div>

          {/* Simulation Controls */}
          {!isAttackRunning && !isPaused ? (
            <Button
              onClick={startAttackSimulation}
              className="bg-primary/10 text-cyan-signal border border-primary/30 hover:bg-primary/20 rounded-sm font-mono text-xs uppercase h-8"
            >
              <Radar className="size-3 mr-2" /> Start Simulation
            </Button>
          ) : isAttackRunning ? (
            <>
              <Button
                onClick={pauseSimulation}
                className="bg-warning/10 text-warning border border-warning/30 hover:bg-warning/20 rounded-sm font-mono text-xs uppercase h-8"
              >
                <Pause className="size-3 mr-2" /> Pause [{currentTime}]
              </Button>
              <Button
                onClick={resetDemo}
                variant="outline"
                size="icon"
                className="rounded-sm h-8 w-8"
                title="Reset Incident"
              >
                <RotateCcw className="size-3" />
              </Button>
            </>
          ) : (
            <>
              <Button
                onClick={resumeSimulation}
                className="bg-primary/10 text-cyan-signal border border-primary/30 hover:bg-primary/20 rounded-sm font-mono text-xs uppercase h-8"
              >
                <Play className="size-3 mr-2" /> Resume [{currentTime}]
              </Button>
              <Button
                onClick={resetDemo}
                variant="outline"
                size="icon"
                className="rounded-sm h-8 w-8"
                title="Reset Incident"
              >
                <RotateCcw className="size-3" />
              </Button>
            </>
          )}
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {snapshot.kpis.map((kpi, index) => {
          const Icon = kpiIcons[index] ?? Activity;
          return (
            <div
              key={kpi.label}
              className="border border-border bg-base-panel p-5 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-16 h-16 bg-cyan-signal/5 blur-2xl rounded-full -mr-8 -mt-8 transition-transform group-hover:scale-150" />
              <div className="flex items-start justify-between gap-3 relative z-10">
                <div>
                  <p className="font-mono text-[10px] uppercase text-muted-foreground tracking-wider mb-2">
                    {kpi.label}
                  </p>
                  <p className="text-3xl font-mono font-bold text-foreground tracking-tight">
                    {kpi.value}
                  </p>
                </div>
                <span className="grid size-10 place-items-center bg-black/40 border border-border text-cyan-signal">
                  <Icon className="size-4" />
                </span>
              </div>
              <p className="mt-4 font-mono text-[10px] font-bold text-green-signal uppercase tracking-wider">
                {kpi.trend}
              </p>
            </div>
          );
        })}
      </div>

      {/* Main Grid: Risk Meter & Incident Queue */}
      <div className="mt-6 grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        {/* THREAT LEVEL METER */}
        <div className="border border-border bg-base-panel p-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/black-scales.png')] opacity-10 mix-blend-overlay pointer-events-none" />
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between relative z-10">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-4">
                SYSTEM THREAT LEVEL
              </p>
              <p
                className={cn(
                  "text-6xl font-sans font-bold uppercase transition-colors tracking-tight",
                  riskColor,
                )}
              >
                {String(currentRisk).toUpperCase()}
              </p>

              <div className="mt-8 space-y-3 font-mono text-[11px] uppercase">
                <div className="flex items-center justify-between border-b border-border/50 pb-2">
                  <span className="text-muted-foreground/60">SIMULATION STAGE</span>
                  <span className="text-foreground font-bold">{snapshot.stage}</span>
                </div>
                <div className="flex items-center justify-between border-b border-border/50 pb-2">
                  <span className="text-muted-foreground/60">TEMPORAL CLOCK</span>
                  <span className="text-cyan-signal font-bold">{currentTime}</span>
                </div>
                <div className="flex items-center justify-between pb-2">
                  <span className="text-muted-foreground/60">SYSTEM HEALTH</span>
                  <span
                    className={cn("font-bold", isCritical ? "text-threat" : "text-green-signal")}
                  >
                    {isCritical ? "COMPROMISED" : "NOMINAL"}
                  </span>
                </div>
              </div>
            </div>

            <div className="relative mx-auto aspect-square w-64 max-w-full">
              <div className="absolute inset-0 rounded-full border border-border bg-black/40" />
              <div className="absolute inset-4 rounded-full border border-border bg-black/60 shadow-[inset_0_0_30px_rgba(0,0,0,1)]" />
              <div className="absolute inset-8 rounded-full border-[18px] border-border/30" />
              <div
                className={cn(
                  "absolute inset-8 rounded-full border-[18px] border-transparent transition-transform duration-700",
                  isCritical
                    ? "border-t-threat border-r-threat"
                    : isHigh
                      ? "border-t-threat border-r-threat"
                      : isMedium
                        ? "border-t-warning border-r-warning"
                        : "border-t-cyan-signal border-r-cyan-signal",
                  meterRotation,
                )}
              />
              <div className="absolute inset-0 grid place-items-center text-center">
                <ShieldAlert
                  className={cn(
                    "mx-auto size-12 transition-colors",
                    riskColor,
                    isCritical && "animate-threat-pulse",
                  )}
                />
                <span className="font-mono text-xs text-muted-foreground mt-2 uppercase tracking-wider">
                  T+{currentTime}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-4 gap-2 relative z-10">
            {[
              { label: "LOW", active: true },
              { label: "MEDIUM", active: isMedium || isHigh || isCritical },
              { label: "HIGH", active: isHigh || isCritical },
              { label: "CRITICAL", active: isCritical },
            ].map(({ label, active }) => (
              <div key={label} className="min-w-0">
                <div
                  className={cn(
                    "h-1.5 transition-colors",
                    active
                      ? isCritical
                        ? "bg-threat shadow-[0_0_10px_rgba(255,42,42,0.8)]"
                        : isHigh
                          ? "bg-warning shadow-[0_0_10px_rgba(255,166,0,0.8)]"
                          : isMedium
                            ? "bg-yellow-500"
                            : "bg-cyan-signal"
                      : "bg-border",
                  )}
                />
                <p className="mt-2 truncate font-mono text-[10px] text-muted-foreground">{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Incidents Queue */}
        <div className="border border-border bg-base-panel p-6 flex flex-col h-full">
          <div className="mb-6 flex items-center justify-between border-b border-border/50 pb-4">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-cyan-signal mb-1">
                ACTIVE INCIDENTS
              </p>
              <h2 className="text-xl font-bold uppercase">Threat Activity</h2>
            </div>
            <Button
              asChild
              variant="outline"
              size="sm"
              className="font-mono text-[10px] uppercase rounded-sm border-border bg-black/40 hover:bg-border"
            >
              <Link to="/incidents">[ VIEW ALL ]</Link>
            </Button>
          </div>

          <div className="space-y-2 flex-1">
            {incidents.slice(0, 4).map((inc) => {
              // Read from single source of truth for INC-2048
              const isTarget = inc.id === "INC-2048";
              const displayIncident = isTarget ? incident : inc;

              return (
                <div
                  key={displayIncident.id}
                  className="group relative border border-border bg-black/30 p-4 transition-colors hover:bg-base-elevated hover:border-border/80"
                >
                  {/* Status Indicator Line */}
                  <div
                    className={cn(
                      "absolute left-0 top-0 bottom-0 w-1",
                      displayIncident.severity === "CRITICAL"
                        ? "bg-threat"
                        : displayIncident.severity === "HIGH"
                          ? "bg-warning"
                          : "bg-cyan-signal",
                    )}
                  />

                  <div className="flex items-start justify-between gap-3 pl-2">
                    <div>
                      <div className="flex items-center gap-3 mb-1.5">
                        <span
                          className={cn(
                            "font-mono text-[10px] font-bold uppercase",
                            displayIncident.severity === "CRITICAL"
                              ? "text-threat"
                              : displayIncident.severity === "HIGH"
                                ? "text-warning"
                                : "text-cyan-signal",
                          )}
                        >
                          [{displayIncident.severity}]
                        </span>
                        <span className="font-mono text-[10px] text-muted-foreground">
                          {displayIncident.id}
                        </span>
                      </div>

                      <h3 className="font-sans text-sm font-bold uppercase tracking-wide group-hover:text-cyan-signal transition-colors">
                        {displayIncident.title}
                      </h3>

                      <div className="mt-2 flex gap-4 font-mono text-[10px] text-muted-foreground uppercase">
                        <span>T-{displayIncident.detectedAgo}</span>
                        <span>
                          ASSETS:{" "}
                          <span className="text-foreground font-bold">
                            {displayIncident.affectedAssets ?? 0}
                          </span>
                        </span>
                      </div>
                    </div>

                    <Button
                      asChild
                      size="sm"
                      className="opacity-0 group-hover:opacity-100 transition-opacity font-mono text-[10px] uppercase bg-cyan-signal/10 text-cyan-signal border border-cyan-signal/30 hover:bg-cyan-signal hover:text-black rounded-sm h-7"
                    >
                      <Link to="/time-machine">INVESTIGATE →</Link>
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </AppPage>
  );
}

function AppPage({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto max-w-7xl animate-fade-in">{children}</div>;
}
