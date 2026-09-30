import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Clock,
  Layers,
  Search,
  Server,
  ShieldAlert,
  Sparkles,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GlassPanel, PageHeader } from "@/components/layout/PageHeader";
import { useDemo } from "@/context/DemoContext";
import { incidents } from "@/data/incidents";
import { cn } from "@/lib/utils";

export function IncidentsView() {
  const { incident, incidentState, currentTime, currentRisk, affectedAssets } = useDemo();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIncidentId, setSelectedIncidentId] = useState<string>("INC-2048");

  // Filter incidents by search
  const filteredIncidents = incidents.filter(
    (i) =>
      i.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      i.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ((i as any).employeeAccount && (i as any).employeeAccount.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Selected incident details (reads live INC-2048 state from central engine)
  const isTargetSelected = selectedIncidentId === "INC-2048";
  const selectedIncident = isTargetSelected
    ? incident
    : incidents.find((i) => i.id === selectedIncidentId) ?? incident;

  return (
    <div className="mx-auto max-w-7xl animate-fade-in">
      <PageHeader
        eyebrow="Investigation queue"
        title="Active Incidents"
        description="Prioritized synthetic incidents awaiting investigation and response decisions."
        actions={
          <Button asChild className="gap-2">
            <Link to="/time-machine">
              OPEN TIME MACHINE <ArrowRight className="size-4" />
            </Link>
          </Button>
        }
      />

      {/* Selected Incident Detail Card (Requirement 20) */}
      <GlassPanel className="mb-6 border-cyan-glow p-6 shadow-glow">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <span className="font-mono text-sm font-semibold text-cyan-signal">
                {selectedIncident.id}
              </span>
              <span
                className={cn(
                  "rounded-full border px-2.5 py-0.5 text-xs font-semibold uppercase",
                  selectedIncident.severity === "CRITICAL"
                    ? "border-threat/40 bg-threat/10 text-threat"
                    : selectedIncident.severity === "HIGH"
                    ? "border-warning/40 bg-warning/10 text-warning"
                    : "border-cyan-glow bg-primary/10 text-cyan-signal"
                )}
              >
                {selectedIncident.severity}
              </span>
              <span className="rounded-full border border-border bg-secondary/60 px-2.5 py-0.5 text-xs font-mono text-muted-foreground uppercase">
                STATUS: {selectedIncident.status}
              </span>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground">{selectedIncident.title}</h2>
              <p className="mt-1 max-w-3xl text-sm leading-relaxed text-muted-foreground">
                {selectedIncident.description || selectedIncident.summary}
              </p>
            </div>

            {/* Key Metadata Grid */}
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 border-t border-border pt-4">
              <div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground">Current Stage</p>
                <p className="mt-1 font-mono text-sm font-semibold text-cyan-signal">
                  {isTargetSelected ? incidentState.stage : (selectedIncident.stage ?? "NORMAL")}
                </p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground">Simulation Time</p>
                <p className="mt-1 flex items-center gap-1.5 font-mono text-sm font-semibold text-foreground">
                  <Clock className="size-3.5 text-cyan-signal" />
                  {isTargetSelected ? currentTime : selectedIncident.detectedAt}
                </p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground">Calculated Risk</p>
                <p
                  className={cn(
                    "mt-1 font-mono text-sm font-semibold uppercase",
                    currentRisk === "CRITICAL" || currentRisk === "Critical"
                      ? "text-threat"
                      : currentRisk === "HIGH" || currentRisk === "High"
                      ? "text-warning"
                      : "text-cyan-signal"
                  )}
                >
                  {isTargetSelected ? currentRisk : selectedIncident.severity}
                </p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground">Affected Assets</p>
                <p className="mt-1 flex items-center gap-1.5 font-mono text-sm font-semibold text-foreground">
                  <Server className="size-3.5 text-cyan-signal" />
                  {isTargetSelected ? affectedAssets.length : (selectedIncident.affectedAssets ?? 0)} asset(s)
                </p>
              </div>
            </div>

            {/* Affected Asset Pills */}
            {isTargetSelected && affectedAssets.length > 0 ? (
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <span className="text-xs text-muted-foreground">Entities affected:</span>
                {affectedAssets.map((asset) => (
                  <span
                    key={asset}
                    className="rounded border border-threat/30 bg-threat/10 px-2 py-0.5 font-mono text-xs text-threat"
                  >
                    {asset}
                  </span>
                ))}
              </div>
            ) : null}

            {/* Timeline Summary */}
            <div className="rounded-lg border border-border bg-secondary/30 p-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-cyan-signal">
                Timeline Summary
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                {isTargetSelected
                  ? incidentState.activeEvent
                    ? `[${incidentState.activeEvent.time ?? incidentState.activeEvent.timestamp}] ${incidentState.activeEvent.title}: ${incidentState.activeEvent.description}`
                    : selectedIncident.summary
                  : selectedIncident.summary}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col shrink-0">
            <Button asChild size="lg" className="gap-2 shadow-glow">
              <Link to="/time-machine">
                <Sparkles className="size-4 text-cyan-signal" /> OPEN TIME MACHINE
              </Link>
            </Button>
          </div>
        </div>
      </GlassPanel>

      {/* Search Bar */}
      <div className="mb-4 flex items-center rounded-lg border border-input bg-input/30 px-3">
        <Search className="size-4 text-muted-foreground" />
        <Input
          placeholder="Search incident ID, title, account, or host"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border-0 bg-transparent shadow-none"
        />
      </div>

      {/* Incidents Queue List */}
      <div className="grid gap-4">
        {filteredIncidents.map((i) => {
          const isTarget = i.id === "INC-2048";
          const display = isTarget ? incident : i;
          const isSelected = display.id === selectedIncidentId;

          return (
            <div key={display.id} onClick={() => setSelectedIncidentId(display.id)}>
              <GlassPanel
                className={cn(
                  "p-5 cursor-pointer transition-all hover:border-cyan-glow",
                  isSelected && "border-cyan-glow bg-secondary/40 shadow-glow"
                )}
              >
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="flex gap-4">
                  <span
                    className={cn(
                      "grid size-11 shrink-0 place-items-center rounded-lg",
                      display.severity === "CRITICAL"
                        ? "bg-threat/12 text-threat"
                        : "bg-warning/12 text-warning"
                    )}
                  >
                    <ShieldAlert className="size-5" />
                  </span>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-mono text-xs text-muted-foreground">{display.id}</p>
                      {isTarget ? (
                        <span className="rounded bg-primary/20 px-1.5 py-0.5 text-[10px] font-mono text-cyan-signal">
                          SIMULATED INCIDENT
                        </span>
                      ) : null}
                    </div>
                    <h3 className="mt-1 text-lg font-semibold">{display.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Detected {display.detectedAgo} · {display.affectedAssets} affected assets
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span
                    className={cn(
                      "rounded-full border px-2.5 py-1 text-xs font-semibold uppercase",
                      display.severity === "CRITICAL"
                        ? "border-threat/40 text-threat"
                        : "border-warning/40 text-warning"
                    )}
                  >
                    {display.severity}
                  </span>
                  <Button asChild size="sm">
                    <Link to="/time-machine">
                      Open Investigation <ArrowRight className="size-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </GlassPanel>
          </div>
        );
      })}
      </div>
    </div>
  );
}
