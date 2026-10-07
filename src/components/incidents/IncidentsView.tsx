import { Link } from "@tanstack/react-router";
import { Search, ShieldAlert, Sparkles, Activity, AlertTriangle, CircleDot, Terminal, Clock, Server, ArrowRight, ShieldCheck, Cpu, Layers } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useDemo } from "@/context/DemoContext";
import { incidents } from "@/data/incidents";
import { cn } from "@/lib/utils";
import { CyberPanel } from "@/components/ui/cyber/CyberPanel";

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

  // Selected incident details
  const isTargetSelected = selectedIncidentId === "INC-2048";
  const selectedIncident = isTargetSelected
    ? incident
    : (incidents.find((i) => i.id === selectedIncidentId) ?? incident);

  const getSeverityBadge = (severity: string) => {
    switch (severity?.toUpperCase()) {
      case "CRITICAL":
        return {
          border: "border-[#FF3347]",
          bg: "bg-[#FF3347]/15",
          text: "text-[#FF3347]",
          shadow: "shadow-[0_0_10px_rgba(255,51,71,0.12)]",
          glow: "border-l-4 border-l-[#FF3347]",
        };
      case "HIGH":
        return {
          border: "border-[#FFB020]",
          bg: "bg-[#FFB020]/15",
          text: "text-[#FFB020]",
          shadow: "shadow-[0_0_10px_rgba(255,176,32,0.12)]",
          glow: "border-l-4 border-l-[#FFB020]",
        };
      case "MEDIUM":
        return {
          border: "border-[#3B82F6]",
          bg: "bg-[#3B82F6]/15",
          text: "text-[#3B82F6]",
          shadow: "shadow-[0_0_10px_rgba(59,130,246,0.12)]",
          glow: "border-l-4 border-l-[#3B82F6]",
        };
      default:
        return {
          border: "border-[#20DFA0]",
          bg: "bg-[#20DFA0]/15",
          text: "text-[#20DFA0]",
          shadow: "shadow-[0_0_10px_rgba(32,223,160,0.10)]",
          glow: "border-l-4 border-l-[#20DFA0]",
        };
    }
  };

  const getMitreForIncident = (id: string) => {
    switch (id) {
      case "INC-2048": return { code: "T1110.003", name: "PASSWORD SPRAYING / T1059.001 POWERSHELL", vector: "EXTERNAL VPN SPRAY" };
      case "INC-1092": return { code: "T1078.004", name: "VALID CLOUD ACCOUNTS EXPLOITATION", vector: "AWS IAM TOKEN THEFT" };
      case "INC-1087": return { code: "T1059.001", name: "SUSPICIOUS POWERSHELL EXECUTION", vector: "INTERNAL WORKSTATION HOOK" };
      default: return { code: "T1190", name: "EXPLOIT PUBLIC APPLICATION", vector: "API GATEWAY OVERFLOW" };
    }
  };

  const selectedMitre = getMitreForIncident(selectedIncident.id);

  return (
    <div className="mx-auto max-w-7xl space-y-6 font-sans">
      
      {/* HEADER: MILITARY INCIDENT INTELLIGENCE CONSOLE */}
      <div className="flex flex-col gap-4 border-b border-[#1B2933] pb-5 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1.5 font-mono text-[10px] text-[#16D9F2] tracking-[0.2em] uppercase">
            <ShieldAlert className="size-3.5 text-[#FF3347] animate-pulse" />
            <span>GLOBAL THREAT SURVEILLANCE // ACTIVE INCIDENT QUEUE</span>
          </div>
          <h1 className="font-mono text-2xl font-black uppercase tracking-wider text-[#F3F7FA] flex items-center gap-3">
            INCIDENT COMMAND DOSSIERS
            <span className="text-[11px] font-mono font-normal px-2 py-0.5 border border-[#FF3347]/40 bg-[#FF3347]/10 text-[#FF3347] rounded-[2px]">
              01 CRITICAL ACTIVE
            </span>
          </h1>
        </div>
        
        {/* Metric Strips */}
        <div className="flex flex-wrap gap-2.5 font-mono text-[9.5px]">
          <div className="border border-[#1B2933] bg-[#0B1117] px-3.5 py-1.5 min-w-[90px] rounded-[3px]">
            <span className="text-[#7893A1] block text-[8px]">TOTAL QUEUE</span>
            <span className="text-base font-bold text-[#F3F7FA]">{incidents.length.toString().padStart(2, "0")}</span>
          </div>
          <div className="border border-[#FF3347]/50 bg-[#FF3347]/10 px-3.5 py-1.5 min-w-[90px] rounded-[3px] shadow-[0_0_10px_rgba(255,51,71,0.12)]">
            <span className="text-[#FF3347] block text-[8px]">CRITICAL</span>
            <span className="text-base font-bold text-[#FF3347]">01</span>
          </div>
          <div className="border border-[#FFB020]/40 bg-[#FFB020]/10 px-3.5 py-1.5 min-w-[90px] rounded-[3px]">
            <span className="text-[#FFB020] block text-[8px]">HIGH SEVERITY</span>
            <span className="text-base font-bold text-[#FFB020]">02</span>
          </div>
          <div className="border border-[#16D9F2]/40 bg-[#16D9F2]/10 px-3.5 py-1.5 min-w-[90px] rounded-[3px]">
            <span className="text-[#16D9F2] block text-[8px]">RECONSTRUCTED</span>
            <span className="text-base font-bold text-[#F3F7FA]">100%</span>
          </div>
        </div>
      </div>

      {/* FORENSIC DOSSIER SPOTLIGHT (SELECTED INCIDENT) */}
      <CyberPanel
        title={`FORENSIC INCIDENT DOSSIER // ${selectedIncident.id}`}
        badge={`${isTargetSelected ? currentRisk : selectedIncident.severity} PRIORITY`}
        badgeColor={isTargetSelected && currentRisk === "CRITICAL" ? "red" : "amber"}
      >
        <div className="space-y-6">
          {/* Top Bar inside Dossier */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#1B2933] pb-4">
            <div>
              <div className="flex items-center gap-2 font-mono text-[10px] text-[#7893A1] mb-1">
                <span className="text-[#16D9F2]">&gt; ROOT ANOMALY CLASSIFICATION:</span>
                <span className="text-[#F3F7FA] font-bold">{selectedIncident.id}</span>
                <span>//</span>
                <span className="text-[#FFB020]">CONFIDENCE: 94%</span>
              </div>
              <h2 className="text-lg font-bold font-mono text-[#F3F7FA] uppercase tracking-wide">
                {selectedIncident.title}
              </h2>
            </div>

            <div className="flex flex-wrap items-center gap-2 font-mono">
              <Button
                asChild
                size="sm"
                className="rounded-[3px] bg-[#16D9F2]/10 text-[#16D9F2] border border-[#16D9F2]/40 hover:bg-[#16D9F2] hover:text-[#05080C] font-bold text-[11px] h-8 cursor-pointer shadow-[0_0_10px_rgba(22,217,242,0.12)]"
              >
                <Link to="/time-machine">
                  ◀ RECONSTRUCT INCIDENT
                </Link>
              </Button>
              <Button
                asChild
                size="sm"
                variant="outline"
                className="rounded-[3px] border-[#3B82F6]/40 bg-[#0B1117] text-[#3B82F6] hover:bg-[#3B82F6]/20 font-bold text-[11px] h-8 cursor-pointer"
              >
                <Link to="/simulation-lab">
                  ⚡ SIMULATE RESPONSE
                </Link>
              </Button>
              <Button
                asChild
                size="sm"
                variant="outline"
                className="rounded-[3px] border-[#1B2933] bg-transparent text-[#A5B5C0] hover:text-[#F3F7FA] hover:border-[#16D9F2]/40 text-[11px] h-8 cursor-pointer"
              >
                <Link to="/attack-graph">
                  VIEW ATTACK GRAPH →
                </Link>
              </Button>
            </div>
          </div>

          {/* Dossier Forensic Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 font-mono text-xs">
            <div className="border border-[#1B2933] bg-[#0B1117] p-3 rounded-[3px]">
              <span className="text-[9px] text-[#7893A1] uppercase block mb-1">FIRST OBSERVED</span>
              <div className="font-bold text-[#F3F7FA] flex items-center gap-2">
                <Clock className="size-3.5 text-[#16D9F2]" />
                {isTargetSelected ? currentTime : selectedIncident.detectedAt || "10:21:04 UTC"}
              </div>
            </div>

            <div className="border border-[#1B2933] bg-[#0B1117] p-3 rounded-[3px]">
              <span className="text-[9px] text-[#7893A1] uppercase block mb-1">ATTACK VECTOR</span>
              <div className="font-bold text-[#FFB020] truncate">
                {selectedMitre.vector}
              </div>
            </div>

            <div className="border border-[#1B2933] bg-[#0B1117] p-3 rounded-[3px]">
              <span className="text-[9px] text-[#7893A1] uppercase block mb-1">MITRE ATT&CK ID</span>
              <div className="font-bold text-[#16D9F2]">
                {selectedMitre.code}
              </div>
            </div>

            <div className="border border-[#1B2933] bg-[#0B1117] p-3 rounded-[3px]">
              <span className="text-[9px] text-[#7893A1] uppercase block mb-1">AFFECTED ASSETS</span>
              <div className="font-bold text-[#FF3347] flex items-center gap-2">
                <Server className="size-3.5 text-[#FF3347]" />
                {isTargetSelected ? affectedAssets.length : (selectedIncident.affectedAssets || 4)} HOSTS COMPROMISED
              </div>
            </div>
          </div>

          {/* Attack Progression Kill-chain */}
          <div className="border border-[#1B2933] bg-[#05080C] p-4 font-mono rounded-[3px]">
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="text-[#7893A1] text-[10px] uppercase font-bold flex items-center gap-2">
                <Activity className="size-3 text-[#FF3347] animate-pulse" />
                ATTACK PROGRESSION MATRIX
              </span>
              <span className="text-[#FF3347] font-bold">
                {isTargetSelected ? "87% KILL-CHAIN SATURATION" : "42% ISOLATED"}
              </span>
            </div>
            
            {/* Custom Cyber Progression Bar */}
            <div className="relative h-4 bg-[#0B1117] border border-[#1B2933] p-0.5 overflow-hidden rounded-[2px]">
              <div
                className="h-full bg-gradient-to-r from-[#FFB020] via-[#FF3347] to-[#FF3347] shadow-[0_0_10px_rgba(255,51,71,0.3)] transition-all duration-500"
                style={{ width: isTargetSelected ? "87%" : "42%" }}
              />
            </div>
            <div className="mt-2 text-[9px] text-[#647682] flex justify-between">
              <span>INITIAL ACCESS (T1110)</span>
              <span>EXECUTION (T1059)</span>
              <span>LATERAL MOVEMENT (T1021)</span>
              <span>DATA EXFILTRATION (T1048)</span>
            </div>
          </div>

          {/* Description & Asset Tags */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 font-mono text-xs">
            <div className="lg:col-span-2 space-y-2">
              <div className="text-[10px] text-[#7893A1] uppercase font-bold">&gt; FORENSIC EXECUTIVE SUMMARY:</div>
              <p className="font-mono text-xs text-[#A5B5C0] leading-relaxed bg-[#0B1117] p-3.5 border border-[#1B2933] rounded-[3px]">
                {selectedIncident.description || selectedIncident.summary || "High-risk temporal threat event detected across primary subnet nodes. Attack pattern demonstrates automated credential stuffing followed by privilege escalation."}
              </p>
            </div>

            <div className="space-y-2">
              <div className="text-[10px] text-[#7893A1] uppercase font-bold">&gt; COMPROMISED IDENTIFIERS:</div>
              <div className="flex flex-wrap gap-1.5">
                {(isTargetSelected ? affectedAssets : ["HOST-ACME-WS01", "10.24.17.82", "analyst01", "PID:4812"]).map((tag) => (
                  <span
                    key={tag}
                    className="border border-[#FF3347]/40 bg-[#FF3347]/10 text-[#FF3347] px-2 py-1 text-[10px] font-bold rounded-[2px]"
                  >
                    [{tag}]
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </CyberPanel>

      {/* SEARCH & FILTER HUD */}
      <div className="flex items-center justify-between gap-4 border border-[#1B2933] bg-[#070C11] p-2 font-mono rounded-[3px]">
        <div className="flex flex-1 items-center gap-2">
          <Search className="size-4 text-[#7893A1]" />
          <Input
            placeholder="FILTER BY INCIDENT ID, MITRE CODE (T1059), HOST OR HASH..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border-0 bg-transparent shadow-none font-mono text-xs text-[#F3F7FA] placeholder:text-[#647682] focus-visible:ring-0 uppercase h-8"
          />
        </div>
        <div className="hidden sm:flex items-center gap-2 text-[10px] text-[#7893A1]">
          <span>STATUS:</span>
          <span className="text-[#16D9F2] font-bold">AUTO-SYNC ACTIVE</span>
        </div>
      </div>

      {/* INCIDENT MODULES QUEUE */}
      <div className="space-y-3 font-mono">
        {filteredIncidents.map((i) => {
          const isTarget = i.id === "INC-2048";
          const display = isTarget ? incident : i;
          const isSelected = display.id === selectedIncidentId;
          const badgeStyle = getSeverityBadge(isTarget ? currentRisk : display.severity);
          const mitre = getMitreForIncident(display.id);

          return (
            <div
              key={display.id}
              onClick={() => setSelectedIncidentId(display.id)}
              className={cn(
                "group relative border bg-[#070C11] p-4 transition-all duration-150 cursor-pointer rounded-[3px]",
                isSelected
                  ? "border-[#16D9F2] bg-[#0B1117] shadow-[0_0_10px_rgba(22,217,242,0.12)] border-l-4 border-l-[#16D9F2]"
                  : "border-[#1B2933] hover:border-[#3B82F6]/40 hover:bg-[#0B1117]/80",
              )}
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                {/* Left Identity */}
                <div className="flex items-start sm:items-center gap-3.5">
                  <div className={cn("px-2.5 py-1 text-[11px] font-bold border rounded-[2px]", badgeStyle.border, badgeStyle.bg, badgeStyle.text)}>
                    {display.id}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-sm text-[#F3F7FA] uppercase tracking-wide group-hover:text-[#16D9F2] transition-colors">
                        {display.title}
                      </h3>
                      <span className={cn("text-[9px] px-1.5 py-0.2 border rounded-[2px]", badgeStyle.border, badgeStyle.text)}>
                        {isTarget ? currentRisk : display.severity}
                      </span>
                    </div>
                    <div className="mt-1 flex flex-wrap items-center gap-3 text-[10px] text-[#647682]">
                      <span>VECTOR: <span className="text-[#F3F7FA]">{mitre.vector}</span></span>
                      <span>•</span>
                      <span>MITRE: <span className="text-[#16D9F2]">{mitre.code}</span></span>
                      <span>•</span>
                      <span>DETECTED: <span className="text-[#F3F7FA]">{display.detectedAgo || "LIVE TELEMETRY"}</span></span>
                    </div>
                  </div>
                </div>

                {/* Right Actions */}
                <div className="flex items-center gap-3 self-end lg:self-auto">
                  <div className="text-right hidden sm:block">
                    <span className="text-[9px] text-[#7893A1] block">AFFECTED NODES</span>
                    <span className="text-xs font-bold text-[#F3F7FA]">{display.affectedAssets || 1} HOSTS</span>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-7 text-[10px] font-mono border-[#1B2933] bg-[#05080C] text-[#16D9F2] hover:border-[#16D9F2]/40 hover:bg-[#16D9F2]/10 rounded-[3px] cursor-pointer"
                  >
                    INSPECT DOSSIER &gt;
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}

