import { lazy, Suspense, useCallback, useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  Activity,
  ArrowRight,
  Clock3,
  Database,
  FileCode,
  FileText,
  Film,
  FlaskConical,
  GitBranch,
  Laptop,
  MonitorCheck,
  Network,
  Pause,
  Play,
  Radar,
  RotateCcw,
  Server,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Terminal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDemo } from "@/context/DemoContext";
import { incidents } from "@/data/incidents";
import { demoAssets } from "@/data/organization";
import { demoTimelineEvents } from "@/data/incidentData";
import { getDashboardSnapshot } from "@/services/incidentService";
import { SIMULATION_SPEEDS } from "@/services/simulationService";
import { cn } from "@/lib/utils";

const LazyCinematicDashboard = lazy(() =>
  import("./cinematic").then((m) => ({
    default: m.CinematicDashboard,
  })),
);

const kpiIcons = [Activity, ShieldAlert, MonitorCheck, Clock3];

export function DashboardView() {
  const {
    incident,
    incidentState,
    currentRisk,
    currentTime,
    currentMinute,
    isAttackRunning,
    isPaused,
    simulationSpeed,
    setSimulationSpeed,
    startAttackSimulation,
    pauseSimulation,
    resumeSimulation,
    resetDemo,
  } = useDemo();

  const [cinematicActive, setCinematicActive] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      if (params.get("view") === "cinematic") {
        setCinematicActive(true);
      }
    }
  }, []);

  const handleCinematicExit = useCallback(() => {
    setCinematicActive(false);
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.delete("view");
      window.history.replaceState({}, "", url.toString());
      window.requestAnimationFrame(() => {
        document
          .getElementById("operational-dashboard")
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }
  }, []);

  const handleCinematicEnter = useCallback(() => {
    setCinematicActive(true);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
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

  // Host assets to display in digital twin summary (4 key enterprise hosts)
  const keyHostIds = ["LAPTOP-042", "SERVER-03", "DB-PROD-01", "FILE-SRV-01"];
  const displayHosts = demoAssets.filter((a) => keyHostIds.includes(a.id));

  // Determine which assets are currently affected/compromised at current time
  const compromisedSet = new Set(incidentState.compromisedAssetIds ?? []);

  // Filter relevant timeline events based on simulation progress
  const visibleEvents = demoTimelineEvents.filter((e) => (e.minute ?? 0) <= Math.max(currentMinute, 5)).slice(-4);
  const recentEvents = visibleEvents.length > 0 ? visibleEvents : demoTimelineEvents.slice(0, 4);

  return (
    <AppPage>
      {cinematicActive && isMounted ? (
        <Suspense fallback={null}>
          <LazyCinematicDashboard onExit={handleCinematicExit} />
        </Suspense>
      ) : null}

      {/* DASHBOARD HEADER */}
      <div
        id="operational-dashboard"
        className="flex flex-col gap-3 border-b border-border/80 pb-4 md:flex-row md:items-center md:justify-between"
      >
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <Terminal className="size-3.5 text-cyan-signal" />
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-cyan-signal font-bold">
              Global Overview · Command Center
            </span>
            <span className="text-border">|</span>
            <span className="rounded bg-primary/10 border border-primary/20 px-1.5 py-0.5 font-mono text-[10px] text-cyan-signal uppercase">
              Target: ACME-CORP
            </span>
            <span className="rounded bg-threat/10 border border-threat/20 px-1.5 py-0.5 font-mono text-[10px] text-threat font-bold uppercase">
              Incident: {incident.id}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground uppercase">
            Security Operations Center
          </h1>
        </div>

        {/* Actions & Simulation Controls */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Cinematic Story Launcher */}
          <Button
            type="button"
            variant="outline"
            onClick={handleCinematicEnter}
            className="border-cyan-signal/40 bg-cyan-signal/10 hover:bg-cyan-signal/20 text-cyan-signal rounded-sm font-mono text-xs uppercase h-8 px-2.5"
            title="Launch 12-chapter cinematic incident story"
          >
            <Film className="size-3.5 mr-1.5" /> Story Mode
          </Button>

          {/* Speed Selector */}
          <div className="flex items-center border border-border bg-black/50 px-2 py-1 text-xs rounded-sm">
            <span className="px-1.5 font-mono text-muted-foreground/70 uppercase text-[11px]">
              Speed:
            </span>
            {SIMULATION_SPEEDS.map((spd) => (
              <button
                key={spd}
                type="button"
                onClick={() => setSimulationSpeed(spd)}
                className={cn(
                  "px-2.5 py-0.5 font-mono text-xs transition-colors rounded-sm",
                  simulationSpeed === spd
                    ? "bg-cyan-signal/15 text-cyan-signal font-bold border border-cyan-signal/40 shadow-[0_0_10px_rgba(0,229,255,0.2)]"
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
              className="bg-primary/15 text-cyan-signal border border-primary/40 hover:bg-primary/25 rounded-sm font-mono text-xs uppercase h-8 px-3 shadow-[0_0_15px_rgba(0,229,255,0.15)]"
            >
              <Radar className="size-3.5 mr-1.5" /> Start Simulation
            </Button>
          ) : isAttackRunning ? (
            <div className="flex items-center gap-1.5">
              <Button
                onClick={pauseSimulation}
                className="bg-warning/15 text-warning border border-warning/40 hover:bg-warning/25 rounded-sm font-mono text-xs uppercase h-8 px-3"
              >
                <Pause className="size-3.5 mr-1.5" /> Pause [{currentTime}]
              </Button>
              <Button
                onClick={resetDemo}
                variant="outline"
                size="icon"
                className="rounded-sm h-8 w-8 border-border bg-black/40 hover:bg-border"
                title="Reset Incident"
              >
                <RotateCcw className="size-3.5" />
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-1.5">
              <Button
                onClick={resumeSimulation}
                className="bg-primary/15 text-cyan-signal border border-primary/40 hover:bg-primary/25 rounded-sm font-mono text-xs uppercase h-8 px-3"
              >
                <Play className="size-3.5 mr-1.5" /> Resume [{currentTime}]
              </Button>
              <Button
                onClick={resetDemo}
                variant="outline"
                size="icon"
                className="rounded-sm h-8 w-8 border-border bg-black/40 hover:bg-border"
                title="Reset Incident"
              >
                <RotateCcw className="size-3.5" />
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* KPI METRIC CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3.5 sm:gap-4">
        {snapshot.kpis.map((kpi, index) => {
          const Icon = kpiIcons[index] ?? Activity;
          return (
            <div
              key={kpi.label}
              className="border border-border bg-base-panel p-4 sm:p-5 relative overflow-hidden group hover:border-cyan-signal/30 transition-colors"
            >
              <div className="absolute top-0 right-0 w-20 h-20 bg-cyan-signal/5 blur-2xl rounded-full -mr-8 -mt-8 transition-transform group-hover:scale-150" />
              <div className="flex items-start justify-between gap-3 relative z-10">
                <div>
                  <p className="font-mono text-[10px] uppercase text-muted-foreground/80 tracking-wider mb-1.5">
                    {kpi.label}
                  </p>
                  <p className="text-2xl sm:text-3xl font-mono font-bold text-foreground tracking-tight">
                    {kpi.value}
                  </p>
                </div>
                <span className="grid size-9 place-items-center bg-black/50 border border-border/80 text-cyan-signal rounded-sm">
                  <Icon className="size-4" />
                </span>
              </div>
              <p className="mt-3 font-mono text-[10px] font-bold text-green-signal uppercase tracking-wider flex items-center gap-1.5">
                <span className="size-1.5 rounded-full bg-green-signal animate-pulse" />
                {kpi.trend}
              </p>
            </div>
          );
        })}
      </div>

      {/* PRIMARY OPERATIONAL GRID: THREAT GAUGE & ACTIVE INCIDENTS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5">
        {/* SYSTEM THREAT LEVEL METER */}
        <div className="lg:col-span-7 xl:col-span-7 border border-border bg-base-panel p-5 sm:p-6 relative overflow-hidden flex flex-col justify-between">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/black-scales.png')] opacity-10 mix-blend-overlay pointer-events-none" />

          {/* Section Header */}
          <div className="flex items-center justify-between border-b border-border/50 pb-3 mb-5 relative z-10">
            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-cyan-signal animate-ping" />
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-cyan-signal font-bold">
                SYSTEM THREAT MONITOR
              </p>
            </div>
            <span className="font-mono text-[10px] text-muted-foreground/70 uppercase">
              RECONSTRUCTION ENGINE · ACTIVE
            </span>
          </div>

          {/* Inner Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center relative z-10 flex-1">
            {/* Left: Text Readouts */}
            <div className="md:col-span-7 flex flex-col justify-between h-full">
              <div>
                <span className="font-mono text-[10px] uppercase text-muted-foreground tracking-wider">
                  CURRENT COMPUTED SEVERITY
                </span>
                <p
                  className={cn(
                    "text-5xl sm:text-6xl font-sans font-bold uppercase transition-colors tracking-tight mt-1 mb-4",
                    riskColor,
                  )}
                >
                  {String(currentRisk).toUpperCase()}
                </p>
              </div>

              <div className="space-y-2.5 font-mono text-[11px] uppercase bg-black/40 border border-border/60 p-3.5 rounded-sm">
                <div className="flex items-center justify-between border-b border-border/40 pb-1.5">
                  <span className="text-muted-foreground/70">SIMULATION STAGE</span>
                  <span className="text-foreground font-bold">{snapshot.stage}</span>
                </div>
                <div className="flex items-center justify-between border-b border-border/40 pb-1.5">
                  <span className="text-muted-foreground/70">TEMPORAL CLOCK</span>
                  <span className="text-cyan-signal font-bold">{currentTime} UTC</span>
                </div>
                <div className="flex items-center justify-between border-b border-border/40 pb-1.5">
                  <span className="text-muted-foreground/70">SYSTEM HEALTH</span>
                  <span
                    className={cn(
                      "font-bold",
                      isCritical ? "text-threat" : isHigh ? "text-warning" : "text-green-signal",
                    )}
                  >
                    {isCritical ? "COMPROMISED" : isHigh ? "DEGRADED" : "NOMINAL"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground/70">ATTACK VECTOR</span>
                  <span className="text-foreground font-semibold">EXTERNAL VPN SPRAY</span>
                </div>
              </div>
            </div>

            {/* Right: Circular Meter Dial */}
            <div className="md:col-span-5 flex items-center justify-center">
              <div className="relative aspect-square w-48 sm:w-56 max-w-full">
                <div className="absolute inset-0 rounded-full border border-border bg-black/40" />
                <div className="absolute inset-3 rounded-full border border-border bg-black/60 shadow-[inset_0_0_30px_rgba(0,0,0,1)]" />
                <div className="absolute inset-6 rounded-full border-[14px] border-border/30" />
                <div
                  className={cn(
                    "absolute inset-6 rounded-full border-[14px] border-transparent transition-transform duration-700",
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
                      "mx-auto size-10 transition-colors",
                      riskColor,
                      isCritical && "animate-threat-pulse",
                    )}
                  />
                  <span className="font-mono text-xs font-bold text-foreground mt-1 uppercase tracking-wider">
                    T+{currentTime}
                  </span>
                  <span className="font-mono text-[9px] text-muted-foreground/70 uppercase">
                    TIMELINE OFFSET
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Severity Bars */}
          <div className="mt-5 pt-4 border-t border-border/50 grid grid-cols-4 gap-2 relative z-10">
            {[
              { label: "LOW", active: true },
              { label: "MEDIUM", active: isMedium || isHigh || isCritical },
              { label: "HIGH", active: isHigh || isCritical },
              { label: "CRITICAL", active: isCritical },
            ].map(({ label, active }) => (
              <div key={label} className="min-w-0">
                <div
                  className={cn(
                    "h-1.5 transition-colors rounded-xs",
                    active
                      ? isCritical
                        ? "bg-threat shadow-[0_0_10px_rgba(255,42,42,0.8)]"
                        : isHigh
                          ? "bg-warning shadow-[0_0_10px_rgba(255,166,0,0.8)]"
                          : isMedium
                            ? "bg-yellow-500"
                            : "bg-cyan-signal"
                      : "bg-border/60",
                  )}
                />
                <p className="mt-1.5 truncate font-mono text-[10px] text-muted-foreground">{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ACTIVE INCIDENTS QUEUE */}
        <div className="lg:col-span-5 xl:col-span-5 border border-border bg-base-panel p-5 sm:p-6 flex flex-col justify-between">
          <div>
            <div className="mb-4 flex items-center justify-between border-b border-border/50 pb-3">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-cyan-signal mb-0.5">
                  ACTIVE QUEUE
                </p>
                <h2 className="text-lg font-bold uppercase tracking-tight">Threat Incidents</h2>
              </div>
              <Button
                asChild
                variant="outline"
                size="sm"
                className="font-mono text-[10px] uppercase rounded-sm border-border bg-black/40 hover:bg-border h-7 px-2.5"
              >
                <Link to="/incidents">[ VIEW ALL ]</Link>
              </Button>
            </div>

            {/* Incident Cards List */}
            <div className="space-y-2.5">
              {incidents.slice(0, 4).map((inc) => {
                const isTarget = inc.id === "INC-2048";
                const displayIncident = isTarget ? incident : inc;

                return (
                  <div
                    key={displayIncident.id}
                    className="group relative border border-border bg-black/40 p-3 sm:p-3.5 transition-all hover:bg-base-elevated hover:border-cyan-signal/40"
                  >
                    {/* Status Indicator Line */}
                    <div
                      className={cn(
                        "absolute left-0 top-0 bottom-0 w-1",
                        displayIncident.severity === "CRITICAL"
                          ? "bg-threat shadow-[0_0_8px_rgba(255,42,42,0.6)]"
                          : displayIncident.severity === "HIGH"
                            ? "bg-warning"
                            : "bg-cyan-signal",
                      )}
                    />

                    <div className="flex items-center justify-between gap-3 pl-2.5">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 mb-1">
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
                          <span className="font-mono text-[10px] text-muted-foreground/80">
                            {displayIncident.id}
                          </span>
                          <span className="font-mono text-[10px] text-muted-foreground/50">·</span>
                          <span className="font-mono text-[10px] text-muted-foreground/80">
                            {displayIncident.detectedAgo}
                          </span>
                        </div>

                        <h3 className="font-sans text-xs sm:text-sm font-bold uppercase tracking-wide group-hover:text-cyan-signal transition-colors truncate">
                          {displayIncident.title}
                        </h3>

                        <div className="mt-1 flex items-center gap-3 font-mono text-[10px] text-muted-foreground uppercase">
                          <span>
                            AFFECTED ASSETS:{" "}
                            <span className="text-foreground font-bold">
                              {displayIncident.affectedAssets ?? 0}
                            </span>
                          </span>
                        </div>
                      </div>

                      <Button
                        asChild
                        size="sm"
                        className="font-mono text-[10px] uppercase bg-cyan-signal/10 text-cyan-signal border border-cyan-signal/30 hover:bg-cyan-signal hover:text-black rounded-sm h-7 px-2.5 shrink-0 transition-all"
                      >
                        <Link to="/time-machine">INVESTIGATE →</Link>
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-3 pt-3 border-t border-border/40 flex items-center justify-between font-mono text-[10px] text-muted-foreground uppercase">
            <span>SHOWING 4 OF {incidents.length} INCIDENTS</span>
            <span className="text-cyan-signal font-semibold">ALL FEEDS MONITORED</span>
          </div>
        </div>
      </div>

      {/* SECONDARY OPERATIONAL GRID: DIGITAL TWIN HOSTS & TIMELINE EVENT LEDGER */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5">
        {/* MONITORED DIGITAL TWIN ASSETS */}
        <div className="lg:col-span-6 border border-border bg-base-panel p-5 sm:p-6 flex flex-col justify-between">
          <div>
            <div className="mb-4 flex items-center justify-between border-b border-border/50 pb-3">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-cyan-signal mb-0.5">
                  INFRASTRUCTURE TWIN
                </p>
                <h2 className="text-lg font-bold uppercase tracking-tight">Monitored Assets</h2>
              </div>
              <Button
                asChild
                variant="outline"
                size="sm"
                className="font-mono text-[10px] uppercase rounded-sm border-border bg-black/40 hover:bg-border h-7 px-2.5"
              >
                <Link to="/digital-twin">[ DIGITAL TWIN → ]</Link>
              </Button>
            </div>

            {/* Asset Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {displayHosts.map((host) => {
                const isHostCompromised =
                  compromisedSet.has(host.id) ||
                  (currentMinute >= 18 && host.id === "LAPTOP-042") ||
                  (currentMinute >= 25 && host.id === "SERVER-03") ||
                  (currentMinute >= 30 && host.id === "DB-PROD-01") ||
                  (currentMinute >= 36 && host.id === "FILE-SRV-01");

                const HostIcon =
                  host.type === "DATABASE" ? Database : host.type === "SERVER" ? Server : Laptop;

                return (
                  <div
                    key={host.id}
                    className={cn(
                      "border p-3 rounded-sm transition-all bg-black/40 relative overflow-hidden",
                      isHostCompromised
                        ? "border-threat/50 bg-threat/5"
                        : "border-border hover:border-cyan-signal/30",
                    )}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span
                          className={cn(
                            "grid size-7 place-items-center rounded-xs border text-xs",
                            isHostCompromised
                              ? "border-threat/40 bg-threat/10 text-threat"
                              : "border-border/80 bg-black/60 text-cyan-signal",
                          )}
                        >
                          <HostIcon className="size-3.5" />
                        </span>
                        <div>
                          <p className="font-mono text-xs font-bold text-foreground uppercase truncate">
                            {host.hostname}
                          </p>
                          <p className="font-mono text-[10px] text-muted-foreground/70">{host.ipAddress}</p>
                        </div>
                      </div>

                      <span
                        className={cn(
                          "rounded px-1.5 py-0.5 font-mono text-[9px] font-bold uppercase",
                          isHostCompromised
                            ? "bg-threat/20 text-threat border border-threat/40 animate-pulse"
                            : "bg-green-signal/15 text-green-signal border border-green-signal/30",
                        )}
                      >
                        {isHostCompromised ? "COMPROMISED" : "HEALTHY"}
                      </span>
                    </div>

                    <div className="mt-2.5 flex items-center justify-between font-mono text-[10px] text-muted-foreground border-t border-border/40 pt-2">
                      <span className="uppercase">{host.department}</span>
                      <span className="text-cyan-signal font-semibold uppercase">
                        {host.criticality} TIER
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-3 pt-3 border-t border-border/40 flex items-center justify-between font-mono text-[10px] text-muted-foreground uppercase">
            <span>ENTERPRISE SURFACE: 4 TARGET NODES</span>
            <span className="text-muted-foreground/80">EDR AGENT TELEMETRY LIVE</span>
          </div>
        </div>

        {/* FORENSIC TIMELINE ACTIVITY STREAM */}
        <div className="lg:col-span-6 border border-border bg-base-panel p-5 sm:p-6 flex flex-col justify-between">
          <div>
            <div className="mb-4 flex items-center justify-between border-b border-border/50 pb-3">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-cyan-signal mb-0.5">
                  TEMPORAL RECONSTRUCTION
                </p>
                <h2 className="text-lg font-bold uppercase tracking-tight">Forensic Activity Feed</h2>
              </div>
              <Button
                asChild
                variant="outline"
                size="sm"
                className="font-mono text-[10px] uppercase rounded-sm border-border bg-black/40 hover:bg-border h-7 px-2.5"
              >
                <Link to="/time-machine">[ REWIND TIMELINE → ]</Link>
              </Button>
            </div>

            {/* Event Ledger List */}
            <div className="space-y-2.5">
              {recentEvents.map((evt) => {
                const isEvtCritical = evt.severity === "CRITICAL";
                const isEvtHigh = evt.severity === "HIGH";

                return (
                  <div
                    key={evt.id}
                    className="flex items-start gap-3 border border-border/80 bg-black/40 p-2.5 sm:p-3 rounded-sm transition-colors hover:border-cyan-signal/40"
                  >
                    <div className="shrink-0 text-center font-mono">
                      <span className="block text-xs font-bold text-cyan-signal bg-cyan-signal/10 px-1.5 py-0.5 rounded border border-cyan-signal/20">
                        {evt.timestamp}
                      </span>
                      <span className="block text-[9px] text-muted-foreground/60 mt-0.5">
                        T+{evt.minute}m
                      </span>
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span
                          className={cn(
                            "rounded px-1.5 py-0.2 font-mono text-[9px] font-bold uppercase border",
                            isEvtCritical
                              ? "bg-threat/15 text-threat border-threat/30"
                              : isEvtHigh
                                ? "bg-warning/15 text-warning border-warning/30"
                                : "bg-cyan-signal/15 text-cyan-signal border-cyan-signal/30",
                          )}
                        >
                          {evt.category}
                        </span>
                        <p className="font-sans text-xs sm:text-sm font-bold text-foreground truncate">
                          {evt.title}
                        </p>
                      </div>
                      <p className="font-mono text-[10px] text-muted-foreground truncate">
                        {evt.description}
                      </p>
                    </div>

                    <span className="font-mono text-[10px] text-muted-foreground/60 uppercase shrink-0">
                      {evt.id}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-3 pt-3 border-t border-border/40 flex items-center justify-between font-mono text-[10px] text-muted-foreground uppercase">
            <span>DETERMINISTIC FORENSIC LEDGER</span>
            <span className="text-cyan-signal font-semibold">ZERO EXTERNAL HALLUCINATIONS</span>
          </div>
        </div>
      </div>

      {/* TACTICAL SOC ACTION LAUNCHERS (BOTTOM COMMAND BAR) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        {[
          {
            title: "Time Machine",
            desc: "Scrub & rewind attack state",
            icon: Clock3,
            to: "/time-machine",
            shortcut: "⌘3",
          },
          {
            title: "Attack Graph",
            desc: "Inspect traversal & blast radius",
            icon: GitBranch,
            to: "/attack-graph",
            shortcut: "⌘4",
          },
          {
            title: "Simulation Lab",
            desc: "Fork & test interventions",
            icon: FlaskConical,
            to: "/simulation-lab",
            shortcut: "⌘5",
          },
          {
            title: "Incident Reports",
            desc: "Generate deterministic post-mortem",
            icon: FileText,
            to: "/reports",
            shortcut: "⌘6",
          },
        ].map((action) => {
          const ActionIcon = action.icon;
          return (
            <Link
              key={action.to}
              to={action.to}
              className="group border border-border bg-base-panel p-3.5 sm:p-4 rounded-sm transition-all hover:bg-base-elevated hover:border-cyan-signal/50 flex flex-col justify-between"
            >
              <div className="flex items-start justify-between">
                <span className="grid size-8 place-items-center rounded bg-black/50 border border-border text-cyan-signal group-hover:border-cyan-signal/40 transition-colors">
                  <ActionIcon className="size-4" />
                </span>
                <span className="font-mono text-[10px] text-muted-foreground/60 bg-black/30 border border-border/40 px-1.5 py-0.5 rounded">
                  {action.shortcut}
                </span>
              </div>
              <div className="mt-3">
                <div className="flex items-center gap-1 text-xs font-bold text-foreground group-hover:text-cyan-signal transition-colors uppercase font-mono">
                  <span>{action.title}</span>
                  <ArrowRight className="size-3 group-hover:translate-x-0.5 transition-transform" />
                </div>
                <p className="font-mono text-[10px] text-muted-foreground mt-0.5 truncate">
                  {action.desc}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </AppPage>
  );
}

function AppPage({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full max-w-[1720px] mx-auto space-y-4 sm:space-y-5 animate-fade-in">
      {children}
    </div>
  );
}
