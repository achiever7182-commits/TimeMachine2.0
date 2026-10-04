import { Link } from "@tanstack/react-router";
import {
  Activity,
  ArrowRight,
  Clock,
  Cpu,
  Database,
  FileCode,
  HardDrive,
  Laptop,
  Network,
  Radio,
  Server,
  Shield,
  ShieldAlert,
  Terminal,
  UserRound,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlassPanel } from "@/components/layout/PageHeader";
import { useDemo } from "@/context/DemoContext";
import { AssetStateBadge } from "./AssetStateBadge";
import { cn } from "@/lib/utils";

export function DigitalTwinInspector() {
  const { digitalTwin, selectedEntityId, setSelectedEntityId, currentTime, setCurrentMinute } =
    useDemo();

  const selectedAsset = digitalTwin.assets.find((a) => a.id === selectedEntityId);
  const selectedUser = !selectedAsset
    ? digitalTwin.users.find((u) => u.id === selectedEntityId || u.username === selectedEntityId)
    : digitalTwin.users.find((u) => u.associatedDeviceIds.includes(selectedAsset.id));

  // Default to LAPTOP-042 if nothing found
  const activeAsset = (selectedAsset ?? digitalTwin.assets[0])!;

  // Connected network links
  const relatedConnections = digitalTwin.networkConnections.filter(
    (c) => c.sourceId === activeAsset.id || c.destinationId === activeAsset.id,
  );

  // Active processes on this asset
  const relatedProcesses = digitalTwin.processes.filter((p) => p.assetId === activeAsset.id);

  // Active sessions on this asset
  const relatedSessions = digitalTwin.activeSessions.filter(
    (s) => s.sourceAssetId === activeAsset.id || s.destinationAssetId === activeAsset.id,
  );

  // Associated evidence
  const relatedEvidence = digitalTwin.evidence.filter((e) => e.assetId === activeAsset.id);

  // Sensitive data resources hosted on this asset
  const relatedDataResources = digitalTwin.dataResources.filter(
    (d) => d.assetId === activeAsset.id,
  );

  const isCompromised = activeAsset.status === "COMPROMISED";

  return (
    <GlassPanel className="flex flex-col h-[640px] overflow-hidden p-5 border-border">
      {/* Inspector Header */}
      <div className="border-b border-border pb-4">
        <div className="flex items-center justify-between">
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-cyan-signal">
            Entity Inspector
          </p>
          <span className="font-mono text-xs text-muted-foreground">Live at {currentTime}</span>
        </div>

        <div className="mt-3 flex items-start justify-between gap-3">
          <div>
            <h3 className="font-mono text-lg font-bold text-foreground">{activeAsset.hostname}</h3>
            <p className="text-xs text-muted-foreground">{activeAsset.name}</p>
          </div>
          <AssetStateBadge status={activeAsset.status} />
        </div>
      </div>

      {/* Scrollable Content Body */}
      <div className="flex-1 overflow-y-auto pr-1 pt-4 space-y-5 text-sm">
        {/* Core Attributes */}
        <div className="grid grid-cols-2 gap-2 text-xs">
          <AttributeItem label="Type" value={activeAsset.type} />
          <AttributeItem label="IP Address" value={activeAsset.ipAddress} mono />
          <AttributeItem label="Owner" value={activeAsset.owner} />
          <AttributeItem label="Criticality" value={activeAsset.criticality} />
          <AttributeItem
            label="Calculated Risk"
            value={activeAsset.risk}
            highlight={isCompromised}
          />
          <AttributeItem label="Compromise Time" value={activeAsset.compromiseTime ?? "N/A"} mono />
        </div>

        {/* Current Active User */}
        {selectedUser ? (
          <div className="rounded-lg border border-border bg-secondary/35 p-3">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-xs font-semibold text-foreground">
                <UserRound className="size-3.5 text-cyan-signal" /> Associated Identity
              </span>
              <span
                className={cn(
                  "rounded px-1.5 py-0.2 font-mono text-[10px] font-semibold uppercase",
                  selectedUser.status === "COMPROMISED"
                    ? "bg-threat/20 text-threat"
                    : "bg-primary/20 text-cyan-signal",
                )}
              >
                {selectedUser.status}
              </span>
            </div>
            <div className="mt-2 flex items-center justify-between font-mono text-xs text-muted-foreground">
              <span>
                {selectedUser.username} ({selectedUser.displayName})
              </span>
              <span>{selectedUser.department}</span>
            </div>
          </div>
        ) : null}

        {/* Active Processes */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <p className="flex items-center gap-1.5 font-mono text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <Cpu className="size-3.5 text-cyan-signal" /> Running Processes (
              {relatedProcesses.length})
            </p>
          </div>
          {relatedProcesses.length > 0 ? (
            <div className="space-y-1.5">
              {relatedProcesses.map((proc) => (
                <div
                  key={proc.id}
                  className={cn(
                    "rounded-lg border p-2 text-xs font-mono transition-colors",
                    proc.status === "MALICIOUS"
                      ? "border-threat/40 bg-threat/10 text-threat"
                      : proc.status === "SUSPICIOUS"
                        ? "border-amber-400/40 bg-amber-400/10 text-amber-400"
                        : "border-border bg-secondary/30 text-foreground",
                  )}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">{proc.name}</span>
                    <span className="text-[10px] opacity-80">
                      PID: {proc.pid} · {proc.timestamp}
                    </span>
                  </div>
                  <p className="mt-1 text-[11px] truncate opacity-90">{proc.commandSummary}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="rounded border border-dashed border-border p-2.5 text-center text-xs text-muted-foreground">
              No anomaly processes active at {currentTime}
            </p>
          )}
        </div>

        {/* Active Network Connections */}
        <div>
          <p className="flex items-center gap-1.5 font-mono text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
            <Network className="size-3.5 text-cyan-signal" /> Network Connections (
            {relatedConnections.length})
          </p>
          {relatedConnections.length > 0 ? (
            <div className="space-y-1.5">
              {relatedConnections.map((conn) => {
                const peerId =
                  conn.sourceId === activeAsset.id ? conn.destinationId : conn.sourceId;
                const isLateral = conn.relationshipType === "LATERAL_MOVEMENT";

                return (
                  <div
                    key={conn.id}
                    onClick={() => setSelectedEntityId(peerId)}
                    className={cn(
                      "cursor-pointer rounded-lg border p-2 text-xs font-mono transition-colors hover:border-cyan-glow",
                      isLateral ? "border-threat/35 bg-threat/10" : "border-border bg-secondary/25",
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-foreground">
                        {conn.sourceId} → {conn.destinationId}
                      </span>
                      <span className="text-[10px] text-muted-foreground">{conn.firstSeen}</span>
                    </div>
                    <div className="mt-1 flex items-center justify-between text-[10px] text-muted-foreground">
                      <span>{conn.relationshipType}</span>
                      <span>
                        Port {conn.port} ({conn.protocol})
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="rounded border border-dashed border-border p-2.5 text-center text-xs text-muted-foreground">
              No active network sessions at {currentTime}
            </p>
          )}
        </div>

        {/* Hosted Sensitive Data Resources */}
        {relatedDataResources.length > 0 ? (
          <div>
            <p className="flex items-center gap-1.5 font-mono text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
              <Database className="size-3.5 text-cyan-signal" /> Data Resources (
              {relatedDataResources.length})
            </p>
            <div className="space-y-1.5">
              {relatedDataResources.map((res) => (
                <div
                  key={res.id}
                  className={cn(
                    "rounded-lg border p-2 text-xs font-mono",
                    res.isExposed
                      ? "border-threat/40 bg-threat/10 text-threat"
                      : "border-border bg-secondary/30 text-foreground",
                  )}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">{res.name}</span>
                    <span className="rounded bg-background/50 px-1 py-0.5 text-[10px]">
                      {res.classification}
                    </span>
                  </div>
                  {res.isExposed ? (
                    <p className="mt-1 text-[10px] text-threat font-semibold">
                      ⚠ Accessed at {res.accessedAt} by {res.accessedBy}
                    </p>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>

      {/* Inspector Quick Actions */}
      <div className="border-t border-border pt-4 mt-2 flex flex-col gap-2">
        {activeAsset.compromiseTime ? (
          <Button
            size="sm"
            variant="outline"
            className="w-full text-xs font-mono justify-between"
            onClick={() => {
              if (activeAsset.compromiseTime) {
                // Seek to compromise time
                const parts = activeAsset.compromiseTime.split(":");
                const h = Number(parts[0] ?? 9);
                const m = Number(parts[1] ?? 42);
                const min = h * 60 + m - (9 * 60 + 42);
                setCurrentMinute(min);
              }
            }}
          >
            <span>Jump to Compromise ({activeAsset.compromiseTime})</span>
            <Clock className="size-3.5" />
          </Button>
        ) : null}

        <Button asChild size="sm" className="w-full text-xs gap-1.5">
          <Link to="/evidence">
            View Forensic Evidence ({relatedEvidence.length}) <ArrowRight className="size-3.5" />
          </Link>
        </Button>
      </div>
    </GlassPanel>
  );
}

function AttributeItem({
  label,
  value,
  mono = false,
  highlight = false,
}: {
  label: string;
  value: string;
  mono?: boolean;
  highlight?: boolean;
}) {
  return (
    <div className="rounded border border-border bg-secondary/25 p-2">
      <p className="text-[10px] text-muted-foreground uppercase">{label}</p>
      <p
        className={cn(
          "mt-0.5 font-semibold truncate",
          mono && "font-mono",
          highlight ? "text-threat" : "text-foreground",
        )}
      >
        {value}
      </p>
    </div>
  );
}
