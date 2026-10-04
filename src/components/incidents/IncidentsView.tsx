import { Link } from "@tanstack/react-router";
import { ArrowRight, Clock, Layers, Search, Server, ShieldAlert, Sparkles, Activity, AlertTriangle, CircleDot } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
      ((i as any).employeeAccount &&
        (i as any).employeeAccount.toLowerCase().includes(searchQuery.toLowerCase())),
  );

  // Selected incident details (reads live INC-2048 state from central engine)
  const isTargetSelected = selectedIncidentId === "INC-2048";
  const selectedIncident = isTargetSelected
    ? incident
    : (incidents.find((i) => i.id === selectedIncidentId) ?? incident);

  const getThreatColor = (severity: string) => {
    switch (severity?.toUpperCase()) {
      case "CRITICAL": return "border-threat bg-threat/10 text-threat shadow-[inset_4px_0_0_#FF2A2A]";
      case "HIGH": return "border-warning bg-warning/10 text-warning shadow-[inset_4px_0_0_#FFA600]";
      case "MEDIUM": return "border-yellow-500 bg-yellow-500/10 text-yellow-500 shadow-[inset_4px_0_0_#eab308]";
      default: return "border-cyan-signal bg-cyan-signal/10 text-cyan-signal shadow-[inset_4px_0_0_#00E5FF]";
    }
  };

  const getThreatPulse = (severity: string) => {
    switch (severity?.toUpperCase()) {
      case "CRITICAL": return "animate-threat-pulse";
      default: return "";
    }
  };

  return (
    <div className="mx-auto max-w-7xl animate-fade-in font-sans">
      
      {/* INCIDENT COMMAND CENTER HEADER */}
      <div className="mb-6 flex flex-col gap-4 border-b border-border pb-6 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Activity className="size-4 text-threat animate-pulse" />
            <h1 className="font-mono text-sm uppercase tracking-[0.2em] text-threat font-bold">
              Live Threat Investigation
            </h1>
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground uppercase">Incident Command Center</h2>
        </div>
        
        {/* Threat Overview Strip */}
        <div className="flex gap-4 font-mono text-[10px] uppercase">
          <div className="flex flex-col items-center border border-border bg-black/40 px-4 py-2 min-w-[100px]">
            <span className="text-muted-foreground mb-1">ACTIVE INCIDENTS</span>
            <span className="text-xl font-bold text-foreground">04</span>
          </div>
          <div className="flex flex-col items-center border border-threat/40 bg-threat/10 px-4 py-2 min-w-[100px] animate-threat-pulse shadow-[inset_0_0_15px_rgba(255,42,42,0.1)]">
            <span className="text-threat mb-1">CRITICAL</span>
            <span className="text-xl font-bold text-threat">01</span>
          </div>
          <div className="flex flex-col items-center border border-warning/40 bg-warning/10 px-4 py-2 min-w-[100px]">
            <span className="text-warning mb-1">HIGH</span>
            <span className="text-xl font-bold text-warning">02</span>
          </div>
          <div className="flex flex-col items-center border border-cyan-signal/40 bg-primary/10 px-4 py-2 min-w-[100px]">
            <span className="text-cyan-signal mb-1">INVESTIGATING</span>
            <span className="text-xl font-bold text-cyan-signal">03</span>
          </div>
        </div>
      </div>

      {/* Selected Incident Detail Card (Requirement 8) */}
      <div className={cn("mb-8 relative border border-border bg-base-elevated shadow-panel", getThreatColor(isTargetSelected ? currentRisk : selectedIncident.severity))}>
        <div className="p-6">
          <div className="flex items-start justify-between border-b border-border/50 pb-4 mb-4">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-2 font-mono text-sm font-bold text-foreground">
                <CircleDot className={cn("size-3", getThreatPulse(isTargetSelected ? currentRisk : selectedIncident.severity))} /> 
                {isTargetSelected ? currentRisk : selectedIncident.severity}
              </span>
              <span className="font-mono text-sm text-muted-foreground">{selectedIncident.id}</span>
            </div>
            <Button asChild size="sm" className="font-mono text-xs bg-cyan-signal/10 text-cyan-signal border border-cyan-signal/30 hover:bg-cyan-signal hover:text-black transition-all">
              <Link to="/time-machine">
                [ OPEN INVESTIGATION → ]
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="col-span-2 space-y-4">
              <h3 className="text-xl font-bold text-foreground uppercase tracking-wide">{selectedIncident.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {selectedIncident.description || selectedIncident.summary}
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 mt-4 border-t border-border/50 font-mono text-[11px]">
                <div>
                  <span className="block text-muted-foreground/60 mb-1">DETECTED</span>
                  <span className="text-foreground">{isTargetSelected ? currentTime : selectedIncident.detectedAt}</span>
                </div>
                <div>
                  <span className="block text-muted-foreground/60 mb-1">RISK</span>
                  <span className={cn("font-bold", isTargetSelected ? (currentRisk === "CRITICAL" ? "text-threat" : "text-warning") : "")}>
                    {isTargetSelected ? currentRisk : selectedIncident.severity}
                  </span>
                </div>
                <div>
                  <span className="block text-muted-foreground/60 mb-1">ASSETS</span>
                  <span className="text-foreground">{isTargetSelected ? affectedAssets.length : (selectedIncident.affectedAssets ?? 0)}</span>
                </div>
                <div>
                  <span className="block text-muted-foreground/60 mb-1">STAGE</span>
                  <span className="text-cyan-signal">{isTargetSelected ? incidentState.stage : (selectedIncident.stage ?? "NORMAL")}</span>
                </div>
              </div>

              {/* Affected Asset Pills */}
              {isTargetSelected && affectedAssets.length > 0 && (
                <div className="pt-2">
                  <span className="font-mono text-[10px] text-muted-foreground/60 block mb-2">AFFECTED ASSETS</span>
                  <div className="flex flex-wrap gap-2">
                    {affectedAssets.map((asset) => (
                      <span key={asset} className="border border-border bg-black/40 px-2 py-1 font-mono text-[10px] text-muted-foreground">
                        [{asset}]
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Temporal Activity Tree (Requirement 9) */}
            <div className="col-span-1 border-l border-border/50 pl-6 flex flex-col justify-end pb-2">
              <span className="font-mono text-[10px] text-muted-foreground/60 block mb-4">TEMPORAL ACTIVITY</span>
              <div className="font-mono text-xs space-y-2">
                <div className="flex gap-3 text-threat">
                  <span>●</span>
                  <span>{currentTime}</span>
                  <span className="truncate">Incident detected</span>
                </div>
                <div className="flex gap-3 text-muted-foreground opacity-80">
                  <span>├─</span>
                  <span>10:21</span>
                  <span className="truncate">Credential anomaly</span>
                </div>
                <div className="flex gap-3 text-muted-foreground opacity-60">
                  <span>├─</span>
                  <span>10:19</span>
                  <span className="truncate">PowerShell execution</span>
                </div>
                <div className="flex gap-3 text-muted-foreground opacity-40">
                  <span>├─</span>
                  <span>10:17</span>
                  <span className="truncate">Endpoint access</span>
                </div>
                <div className="flex gap-3 text-muted-foreground opacity-20">
                  <span>└─</span>
                  <span>10:14</span>
                  <span className="truncate">Initial auth</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="mb-6 flex items-center border border-border bg-black/50 px-3 py-2">
        <Search className="mr-2 size-4 text-muted-foreground" />
        <Input
          placeholder="SEARCH INCIDENTS, HOSTS, HASHES..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border-0 bg-transparent shadow-none font-mono text-xs focus-visible:ring-0 placeholder:text-muted-foreground/50 uppercase"
        />
      </div>

      {/* Incidents Queue List */}
      <div className="grid gap-3">
        {filteredIncidents.map((i) => {
          const isTarget = i.id === "INC-2048";
          const display = isTarget ? incident : i;
          const isSelected = display.id === selectedIncidentId;

          return (
            <div 
              key={display.id} 
              onClick={() => setSelectedIncidentId(display.id)}
              className={cn(
                "border bg-base-panel p-4 cursor-pointer transition-all hover:bg-base-elevated",
                isSelected ? "border-border shadow-[inset_2px_0_0_#00E5FF]" : "border-transparent",
                getThreatColor(display.severity).replace("bg-", "hover:bg-").replace("border-", "hover:border-") // subtle hover hint
              )}
            >
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="flex items-center gap-4">
                  <span className={cn("font-mono text-xs font-bold w-20", display.severity === "CRITICAL" ? "text-threat" : "text-warning")}>
                    {display.id}
                  </span>
                  <div>
                    <h3 className="font-sans text-sm font-bold uppercase">{display.title}</h3>
                    <p className="mt-1 font-mono text-[10px] text-muted-foreground">
                      DETECTED {display.detectedAgo ? display.detectedAgo.toUpperCase() : "RECENTLY"} • {display.affectedAssets} ASSETS
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <span className={cn(
                    "font-mono text-[10px] font-bold uppercase",
                    display.severity === "CRITICAL" ? "text-threat" : "text-warning"
                  )}>
                    [{display.severity}]
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
