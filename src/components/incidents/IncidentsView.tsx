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
          border: "border-[#FF2638]",
          bg: "bg-[#FF2638]/15",
          text: "text-[#FF2638]",
          shadow: "shadow-[0_0_12px_rgba(255,38,56,0.25)]",
          glow: "border-l-4 border-l-[#FF2638]",
        };
      case "HIGH":
        return {
          border: "border-[#FFB000]",
          bg: "bg-[#FFB000]/15",
          text: "text-[#FFB000]",
          shadow: "shadow-[0_0_12px_rgba(255,176,0,0.2)]",
          glow: "border-l-4 border-l-[#FFB000]",
        };
      case "MEDIUM":
        return {
          border: "border-[#1683FF]",
          bg: "bg-[#1683FF]/15",
          text: "text-[#1683FF]",
          shadow: "shadow-[0_0_12px_rgba(22,131,255,0.2)]",
          glow: "border-l-4 border-l-[#1683FF]",
        };
      default:
        return {
          border: "border-[#00FF88]",
          bg: "bg-[#00FF88]/15",
          text: "text-[#00FF88]",
          shadow: "shadow-[0_0_12px_rgba(0,255,136,0.2)]",
          glow: "border-l-4 border-l-[#00FF88]",
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
      <div className="flex flex-col gap-4 border-b border-[#0D1B24] pb-5 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1.5 font-mono text-[10px] text-[#00E5FF] tracking-[0.25em] uppercase">
            <ShieldAlert className="size-3.5 text-[#FF2638] animate-pulse" />
            <span>GLOBAL THREAT SURVEILLANCE // ACTIVE INCIDENT QUEUE</span>
          </div>
          <h1 className="font-mono text-2xl font-black uppercase tracking-wider text-[#E8F7FF] flex items-center gap-3">
            INCIDENT COMMAND DOSSIERS
            <span className="text-[11px] font-mono font-normal px-2 py-0.5 border border-[#FF2638]/40 bg-[#FF2638]/10 text-[#FF2638]">
              01 CRITICAL ACTIVE
            </span>
          </h1>
        </div>
        
        {/* Metric Strips */}
        <div className="flex flex-wrap gap-2.5 font-mono text-[9.5px]">
          <div className="border border-[#0D1B24] bg-[#071017] px-3.5 py-1.5 min-w-[90px]">
            <span className="text-[#6F8A99] block text-[8px]">TOTAL QUEUE</span>
            <span className="text-base font-bold text-[#E8F7FF]">{incidents.length.toString().padStart(2, "0")}</span>
          </div>
          <div className="border border-[#FF2638]/50 bg-[#FF2638]/10 px-3.5 py-1.5 min-w-[90px] shadow-[0_0_12px_rgba(255,38,56,0.15)]">
            <span className="text-[#FF2638] block text-[8px]">CRITICAL</span>
            <span className="text-base font-bold text-[#FF2638]">01</span>
          </div>
          <div className="border border-[#FFB000]/40 bg-[#FFB000]/10 px-3.5 py-1.5 min-w-[90px]">
            <span className="text-[#FFB000] block text-[8px]">HIGH SEVERITY</span>
            <span className="text-base font-bold text-[#FFB000]">02</span>
          </div>
          <div className="border border-[#00E5FF]/40 bg-[#00E5FF]/10 px-3.5 py-1.5 min-w-[90px]">
            <span className="text-[#00E5FF] block text-[8px]">RECONSTRUCTED</span>
            <span className="text-base font-bold text-[#00E5FF]">100%</span>
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
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#0D1B24] pb-4">
            <div>
              <div className="flex items-center gap-2 font-mono text-[10px] text-[#6F8A99] mb-1">
                <span className="text-[#00E5FF]">&gt; ROOT ANOMALY CLASSIFICATION:</span>
                <span className="text-[#E8F7FF] font-bold">{selectedIncident.id}</span>
                <span>//</span>
                <span className="text-[#FFB000]">CONFIDENCE: 94%</span>
              </div>
              <h2 className="text-lg font-bold font-mono text-[#E8F7FF] uppercase tracking-wide">
                {selectedIncident.title}
              </h2>
            </div>

            <div className="flex flex-wrap items-center gap-2 font-mono">
              <Button
                asChild
                size="sm"
                className="rounded-none bg-[#00E5FF] text-[#03070B] hover:bg-[#00E5FF]/90 font-bold text-[11px] h-8 cursor-pointer shadow-[0_0_12px_rgba(0,229,255,0.4)]"
              >
                <Link to="/time-machine">
                  ◀ RECONSTRUCT INCIDENT
                </Link>
              </Button>
              <Button
                asChild
                size="sm"
                variant="outline"
                className="rounded-none border-[#1683FF]/40 bg-[#071017] text-[#00E5FF] hover:bg-[#1683FF]/20 font-bold text-[11px] h-8 cursor-pointer"
              >
                <Link to="/simulation-lab">
                  ⚡ SIMULATE RESPONSE
                </Link>
              </Button>
              <Button
                asChild
                size="sm"
                variant="outline"
                className="rounded-none border-[#0D1B24] bg-transparent text-[#6F8A99] hover:text-[#E8F7FF] hover:border-[#00E5FF]/40 text-[11px] h-8 cursor-pointer"
              >
                <Link to="/attack-graph">
                  VIEW ATTACK GRAPH →
                </Link>
              </Button>
            </div>
          </div>

          {/* Dossier Forensic Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 font-mono text-xs">
            <div className="border border-[#0D1B24] bg-[#071017] p-3">
              <span className="text-[9px] text-[#6F8A99] uppercase block mb-1">FIRST OBSERVED</span>
              <div className="font-bold text-[#E8F7FF] flex items-center gap-2">
                <Clock className="size-3.5 text-[#00E5FF]" />
                {isTargetSelected ? currentTime : selectedIncident.detectedAt || "10:21:04 UTC"}
              </div>
            </div>

            <div className="border border-[#0D1B24] bg-[#071017] p-3">
              <span className="text-[9px] text-[#6F8A99] uppercase block mb-1">ATTACK VECTOR</span>
              <div className="font-bold text-[#FFB000] truncate">
                {selectedMitre.vector}
              </div>
            </div>

            <div className="border border-[#0D1B24] bg-[#071017] p-3">
              <span className="text-[9px] text-[#6F8A99] uppercase block mb-1">MITRE ATT&CK ID</span>
              <div className="font-bold text-[#00E5FF]">
                {selectedMitre.code}
              </div>
            </div>

            <div className="border border-[#0D1B24] bg-[#071017] p-3">
              <span className="text-[9px] text-[#6F8A99] uppercase block mb-1">AFFECTED ASSETS</span>
              <div className="font-bold text-[#FF2638] flex items-center gap-2">
                <Server className="size-3.5 text-[#FF2638]" />
                {isTargetSelected ? affectedAssets.length : (selectedIncident.affectedAssets || 4)} HOSTS COMPROMISED
              </div>
            </div>
          </div>

          {/* Attack Progression Kill-chain */}
          <div className="border border-[#0D1B24] bg-[#03070B] p-4 font-mono">
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="text-[#6F8A99] text-[10px] uppercase font-bold flex items-center gap-2">
                <Activity className="size-3 text-[#FF2638] animate-pulse" />
                ATTACK PROGRESSION MATRIX
              </span>
              <span className="text-[#FF2638] font-bold">
                {isTargetSelected ? "87% KILL-CHAIN SATURATION" : "42% ISOLATED"}
              </span>
            </div>
            
            {/* Custom Cyber Progression Bar */}
            <div className="relative h-4 bg-[#071017] border border-[#0D1B24] p-0.5 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#FFB000] via-[#FF2638] to-[#FF2638] shadow-[0_0_12px_#FF2638] transition-all duration-500"
                style={{ width: isTargetSelected ? "87%" : "42%" }}
              />
            </div>
            <div className="mt-2 text-[9px] text-[#6F8A99] flex justify-between">
              <span>INITIAL ACCESS (T1110)</span>
              <span>EXECUTION (T1059)</span>
              <span>LATERAL MOVEMENT (T1021)</span>
              <span>DATA EXFILTRATION (T1048)</span>
            </div>
          </div>

          {/* Description & Asset Tags */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 font-mono text-xs">
            <div className="lg:col-span-2 space-y-2">
              <div className="text-[10px] text-[#6F8A99] uppercase font-bold">&gt; FORENSIC EXECUTIVE SUMMARY:</div>
              <p className="font-mono text-xs text-[#6F8A99] leading-relaxed bg-[#071017] p-3.5 border border-[#0D1B24]">
                {selectedIncident.description || selectedIncident.summary || "High-risk temporal threat event detected across primary subnet nodes. Attack pattern demonstrates automated credential stuffing followed by privilege escalation."}
              </p>
            </div>

            <div className="space-y-2">
              <div className="text-[10px] text-[#6F8A99] uppercase font-bold">&gt; COMPROMISED IDENTIFIERS:</div>
              <div className="flex flex-wrap gap-1.5">
                {(isTargetSelected ? affectedAssets : ["HOST-ACME-WS01", "10.24.17.82", "analyst01", "PID:4812"]).map((tag) => (
                  <span
                    key={tag}
                    className="border border-[#FF2638]/40 bg-[#FF2638]/10 text-[#FF2638] px-2 py-1 text-[10px] font-bold"
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
      <div className="flex items-center justify-between gap-4 border border-[#0D1B24] bg-[#050A0F] p-2 font-mono">
        <div className="flex flex-1 items-center gap-2">
          <Search className="size-4 text-[#6F8A99]" />
          <Input
            placeholder="FILTER BY INCIDENT ID, MITRE CODE (T1059), HOST OR HASH..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border-0 bg-transparent shadow-none font-mono text-xs text-[#E8F7FF] placeholder:text-[#6F8A99]/40 focus-visible:ring-0 uppercase h-8"
          />
        </div>
        <div className="hidden sm:flex items-center gap-2 text-[10px] text-[#6F8A99]">
          <span>STATUS:</span>
          <span className="text-[#00E5FF] font-bold">AUTO-SYNC ACTIVE</span>
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
                "group relative border bg-[#050A0F] p-4 transition-all duration-150 cursor-pointer",
                isSelected
                  ? "border-[#00E5FF] bg-[#071017] shadow-[0_0_15px_rgba(0,229,255,0.1)] border-l-4 border-l-[#00E5FF]"
                  : "border-[#0D1B24] hover:border-[#1683FF]/40 hover:bg-[#071017]/80",
              )}
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                {/* Left Identity */}
                <div className="flex items-start sm:items-center gap-3.5">
                  <div className={cn("px-2.5 py-1 text-[11px] font-bold border", badgeStyle.border, badgeStyle.bg, badgeStyle.text)}>
                    {display.id}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-sm text-[#E8F7FF] uppercase tracking-wide group-hover:text-[#00E5FF] transition-colors">
                        {display.title}
                      </h3>
                      <span className={cn("text-[9px] px-1.5 py-0.2 border", badgeStyle.border, badgeStyle.text)}>
                        {isTarget ? currentRisk : display.severity}
                      </span>
                    </div>
                    <div className="mt-1 flex flex-wrap items-center gap-3 text-[10px] text-[#6F8A99]">
                      <span>VECTOR: <span className="text-[#E8F7FF]">{mitre.vector}</span></span>
                      <span>•</span>
                      <span>MITRE: <span className="text-[#00E5FF]">{mitre.code}</span></span>
                      <span>•</span>
                      <span>DETECTED: <span className="text-[#E8F7FF]">{display.detectedAgo || "LIVE TELEMETRY"}</span></span>
                    </div>
                  </div>
                </div>

                {/* Right Actions */}
                <div className="flex items-center gap-3 self-end lg:self-auto">
                  <div className="text-right hidden sm:block">
                    <span className="text-[9px] text-[#6F8A99] block">AFFECTED NODES</span>
                    <span className="text-xs font-bold text-[#E8F7FF]">{display.affectedAssets || 1} HOSTS</span>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-7 text-[10px] font-mono border-[#0D1B24] bg-[#03070B] text-[#00E5FF] hover:border-[#00E5FF]/40 hover:bg-[#00E5FF]/10 rounded-none cursor-pointer"
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

