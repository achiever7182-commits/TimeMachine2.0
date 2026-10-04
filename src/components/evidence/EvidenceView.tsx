import { useMemo, useState } from "react";
import { Clock, Filter, Layers, Search, Shield, ShieldAlert, Sparkles, X } from "lucide-react";
import { GlassPanel, PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useDemo } from "@/context/DemoContext";
import { demoEvidence } from "@/data/incidentData";
import { cn } from "@/lib/utils";

export function EvidenceView() {
  const {
    incident,
    currentTime,
    digitalTwin,
    knownSecurityState,
    selectedEntityId,
    setSelectedEntityId,
  } = useDemo();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<string>("ALL");
  const [selectedSeverity, setSelectedSeverity] = useState<string>("ALL");
  const [selectedAsset, setSelectedAsset] = useState<string>(selectedEntityId ?? "ALL");
  const [showOnlyKnown, setShowOnlyKnown] = useState<boolean>(true);

  // Evidence list based on current simulation time
  const baseList = showOnlyKnown ? digitalTwin.evidence : demoEvidence;

  // Filter evidence
  const filteredEvidence = useMemo(() => {
    return baseList.filter((item) => {
      // Type filter
      if (selectedType !== "ALL" && item.type !== selectedType) {
        return false;
      }
      // Severity filter
      if (selectedSeverity !== "ALL" && item.severity !== selectedSeverity) {
        return false;
      }
      // Asset filter
      if (selectedAsset !== "ALL" && item.assetId !== selectedAsset) {
        return false;
      }
      // Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matches =
          (item.title && item.title.toLowerCase().includes(q)) ||
          (item.detail && item.detail.toLowerCase().includes(q)) ||
          (item.actor && item.actor.toLowerCase().includes(q)) ||
          (item.target && item.target.toLowerCase().includes(q)) ||
          (item.source && item.source.toLowerCase().includes(q)) ||
          (item.hash && item.hash.toLowerCase().includes(q));
        if (!matches) return false;
      }
      return true;
    });
  }, [baseList, selectedType, selectedSeverity, selectedAsset, searchQuery]);

  return (
    <div className="mx-auto max-w-7xl animate-fade-in space-y-5">
      <PageHeader
        eyebrow={`Forensic Evidence Ledger · ${incident.id}`}
        title="Evidence Viewer"
        description="Correlated authentication, endpoint, network, database, and process forensic artifacts."
        actions={
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 rounded-lg border border-border bg-secondary/50 px-3 py-1.5 font-mono text-xs text-muted-foreground">
              <Clock className="size-3.5 text-cyan-signal" />
              State at: <strong className="text-foreground">{currentTime}</strong>
            </span>
            <Button
              variant={showOnlyKnown ? "default" : "outline"}
              size="sm"
              onClick={() => setShowOnlyKnown(!showOnlyKnown)}
              className="text-xs font-mono"
            >
              {showOnlyKnown ? "Showing Known Evidence" : "Show All Timeline Evidence"}
            </Button>
          </div>
        }
      />

      {/* Filter Bar (Requirement 16) */}
      <div className="grid gap-3 sm:grid-cols-[1fr_auto_auto_auto_auto]">
        {/* Search */}
        <div className="flex items-center rounded-lg border border-input bg-input/30 px-3">
          <Search className="size-4 text-muted-foreground" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search evidence hash, actor, action, or payload..."
            className="border-0 bg-transparent shadow-none text-xs"
          />
        </div>

        {/* Type Filter */}
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="h-10 rounded-md border border-input bg-background px-3 text-xs font-mono text-foreground focus:outline-none"
        >
          <option value="ALL">All Types</option>
          <option value="AUTH">Authentication</option>
          <option value="ENDPOINT">Endpoint</option>
          <option value="NETWORK">Network</option>
          <option value="DATABASE">Database</option>
          <option value="PROCESS">Process</option>
        </select>

        {/* Severity Filter */}
        <select
          value={selectedSeverity}
          onChange={(e) => setSelectedSeverity(e.target.value)}
          className="h-10 rounded-md border border-input bg-background px-3 text-xs font-mono text-foreground focus:outline-none"
        >
          <option value="ALL">All Severities</option>
          <option value="CRITICAL">Critical</option>
          <option value="HIGH">High</option>
          <option value="MEDIUM">Medium</option>
          <option value="LOW">Low</option>
        </select>

        {/* Asset Filter */}
        <select
          value={selectedAsset}
          onChange={(e) => setSelectedAsset(e.target.value)}
          className="h-10 rounded-md border border-input bg-background px-3 text-xs font-mono text-foreground focus:outline-none"
        >
          <option value="ALL">All Assets</option>
          <option value="LAPTOP-042">LAPTOP-042</option>
          <option value="SERVER-03">SERVER-03</option>
          <option value="DB-PROD-01">DB-PROD-01</option>
          <option value="FILE-SRV-01">FILE-SRV-01</option>
          <option value="VPN-GW-01">VPN-GW-01</option>
        </select>

        {/* Reset Filter Button */}
        {(selectedType !== "ALL" ||
          selectedSeverity !== "ALL" ||
          selectedAsset !== "ALL" ||
          searchQuery) && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setSelectedType("ALL");
              setSelectedSeverity("ALL");
              setSelectedAsset("ALL");
              setSearchQuery("");
            }}
            className="text-xs gap-1 font-mono"
          >
            <X className="size-3.5" /> Clear
          </Button>
        )}
      </div>

      {/* Evidence Table */}
      <GlassPanel className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[850px] text-left text-sm">
            <thead className="bg-secondary/45 text-xs uppercase font-mono text-muted-foreground border-b border-border">
              <tr>
                <th className="p-4">Time</th>
                <th className="p-4">Type</th>
                <th className="p-4">Actor</th>
                <th className="p-4">Action</th>
                <th className="p-4">Target / Asset</th>
                <th className="p-4">Severity</th>
                <th className="p-4">Cryptographic Hash / Detail</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredEvidence.map((e) => (
                <tr key={e.id} className="hover:bg-secondary/25 transition-colors">
                  <td className="p-4 font-mono text-cyan-signal text-xs font-semibold whitespace-nowrap">
                    {e.time ?? e.timestamp}
                  </td>
                  <td className="p-4 font-semibold font-mono text-xs">
                    <span className="rounded bg-secondary/80 px-2 py-0.5 border border-border">
                      {e.type}
                    </span>
                  </td>
                  <td className="p-4 font-mono text-xs">{e.actor ?? "alex.m"}</td>
                  <td className="p-4 font-mono text-xs text-muted-foreground">
                    {e.action ?? e.title}
                  </td>
                  <td className="p-4 font-mono text-xs font-semibold text-foreground">
                    {e.target ?? e.assetId}
                  </td>
                  <td className="p-4 whitespace-nowrap">
                    <span
                      className={cn(
                        "rounded-full border px-2 py-0.5 font-mono text-[10px] font-semibold uppercase",
                        e.severity === "CRITICAL"
                          ? "border-threat/40 bg-threat/10 text-threat"
                          : e.severity === "HIGH"
                            ? "border-warning/40 bg-warning/10 text-warning"
                            : "border-cyan-glow bg-primary/10 text-cyan-signal",
                      )}
                    >
                      {e.severity}
                    </span>
                  </td>
                  <td className="max-w-md p-4 text-xs text-muted-foreground">
                    <p className="line-clamp-2">{e.detail ?? e.content}</p>
                    {e.hash ? (
                      <p className="mt-1 font-mono text-[10px] text-cyan-signal/70 truncate">
                        {e.hash}
                      </p>
                    ) : null}
                  </td>
                </tr>
              ))}
              {filteredEvidence.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="p-8 text-center text-xs text-muted-foreground font-mono"
                  >
                    No evidence records matching the current filters at simulation time{" "}
                    {currentTime}.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </GlassPanel>
    </div>
  );
}
