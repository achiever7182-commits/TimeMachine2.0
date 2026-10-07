import React, { useState, useEffect, useRef } from "react";
import {
  Terminal,
  Activity,
  Play,
  Pause,
  Filter,
  Trash2,
  Lock,
  ArrowDown,
  ShieldAlert,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface TelemetryEvent {
  id: string;
  time: string;
  type: "PROC_START" | "NETWORK_CONNECT" | "AUTH_EVENT" | "DETECTION" | "PRIV_ESC" | "FILE_MOD";
  host: string;
  detail: string;
  severity: "info" | "warn" | "threat";
  pid?: string;
  ip?: string;
  mitre?: string;
}

const INITIAL_EVENTS: TelemetryEvent[] = [
  {
    id: "evt-101",
    time: "14:32:08.192",
    type: "AUTH_EVENT",
    host: "vpn-gateway-01",
    detail: "Kerberos TGT requested for operator account from anomalous ASN 185.220.101.5",
    severity: "threat",
    ip: "185.220.101.5",
    mitre: "T1110.003",
  },
  {
    id: "evt-102",
    time: "14:32:11.401",
    type: "PROC_START",
    host: "WS-ANALYST-019",
    detail: "powershell.exe -NoP -NonI -W Hidden -Enc SQBFAFgA...",
    severity: "threat",
    pid: "4812",
    mitre: "T1059.001",
  },
  {
    id: "evt-103",
    time: "14:32:15.820",
    type: "NETWORK_CONNECT",
    host: "WS-ANALYST-019",
    detail: "Outbound HTTPS TLS session initiated -> 185.220.101.5:443 [C2_BEACON]",
    severity: "threat",
    ip: "185.220.101.5:443",
    mitre: "T1071.001",
  },
  {
    id: "evt-104",
    time: "14:32:22.049",
    type: "PRIV_ESC",
    host: "WS-ANALYST-019",
    detail: "SeDebugPrivilege enabled on PID 4812; LSASS process handle opened",
    severity: "threat",
    pid: "672",
    mitre: "T1003.001",
  },
  {
    id: "evt-105",
    time: "14:32:42.311",
    type: "NETWORK_CONNECT",
    host: "WS-ANALYST-019",
    detail: "SMB session setup with IPC$ -> 10.0.4.12 (srv-core-app01)",
    severity: "warn",
    ip: "10.0.4.12:445",
    mitre: "T1021.002",
  },
  {
    id: "evt-106",
    time: "14:33:01.782",
    type: "FILE_MOD",
    host: "srv-core-app01",
    detail: "Shadow copy deletion script scheduled task registered",
    severity: "threat",
    mitre: "T1490",
  },
];

const EVENT_TEMPLATES = [
  {
    type: "NETWORK_CONNECT" as const,
    host: "srv-core-app01",
    detail: "TCP Handshake established with staging server 10.0.4.50:5432",
    severity: "warn" as const,
    ip: "10.0.4.50:5432",
    mitre: "T1046",
  },
  {
    type: "DETECTION" as const,
    host: "TM-SENSOR-08",
    detail: "Heuristic pattern match: Encrypted exfiltration burst detected (>45MB/s)",
    severity: "threat" as const,
    mitre: "T1048",
  },
  {
    type: "PROC_START" as const,
    host: "db-finance-vault",
    detail: "pg_dump.exe spawned by compromised service token",
    severity: "threat" as const,
    pid: "9102",
    mitre: "T1560",
  },
  {
    type: "AUTH_EVENT" as const,
    host: "dc-global-01",
    detail: "Replication request DsGetNcChanges from non-DC workstation IP",
    severity: "threat" as const,
    mitre: "T1003.006",
  },
];

export function TelemetryStream() {
  const [events, setEvents] = useState<TelemetryEvent[]>(INITIAL_EVENTS);
  const [isStreaming, setIsStreaming] = useState(true);
  const [filterType, setFilterType] = useState<string>("ALL");
  const [autoScroll, setAutoScroll] = useState(true);
  const streamEndRef = useRef<HTMLDivElement>(null);

  // Live event ticker
  useEffect(() => {
    if (!isStreaming) return;

    const interval = setInterval(() => {
      const template = EVENT_TEMPLATES[Math.floor(Math.random() * EVENT_TEMPLATES.length)];
      const now = new Date();
      const timeStr = now.toTimeString().split(" ")[0] + "." + String(now.getMilliseconds()).padStart(3, "0");

      const newEvt: TelemetryEvent = {
        id: "evt-" + Math.random().toString(36).substring(2, 7),
        time: timeStr,
        ...template,
      };

      setEvents((prev) => [...prev.slice(-30), newEvt]);
    }, 2800);

    return () => clearInterval(interval);
  }, [isStreaming]);

  // Auto-scroll
  useEffect(() => {
    if (autoScroll && streamEndRef.current) {
      streamEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [events, autoScroll]);

  const filteredEvents = events.filter((e) => {
    if (filterType === "ALL") return true;
    return e.type === filterType;
  });

  return (
    <div className="flex flex-col h-full rounded border border-border/80 bg-[#020609] p-3 font-mono text-xs">
      {/* Top Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border/60 pb-2 text-[10px]">
        <div className="flex items-center gap-2">
          <Terminal className="size-3.5 text-cyan-400" />
          <span className="font-bold uppercase tracking-wider text-slate-100">
            RAW TELEMETRY STREAM
          </span>
          <span className="flex items-center gap-1 rounded bg-black/60 px-1.5 py-0.2 text-emerald-400 border border-emerald-500/30">
            <span className={cn("size-1.5 rounded-full bg-emerald-400", isStreaming && "animate-pulse")} />
            {isStreaming ? "LIVE INGESTION" : "STREAM PAUSED"}
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="rounded border border-border bg-black/70 px-2 py-0.5 text-[10px] text-foreground focus:outline-none cursor-pointer"
          >
            <option value="ALL">ALL EVENTS</option>
            <option value="DETECTION">DETECTIONS</option>
            <option value="NETWORK_CONNECT">NETWORK</option>
            <option value="AUTH_EVENT">AUTH</option>
            <option value="PROC_START">PROCESS</option>
          </select>

          <button
            onClick={() => setIsStreaming(!isStreaming)}
            className="flex items-center gap-1 rounded border border-cyan-500/30 bg-cyan-950/20 px-2 py-0.5 text-cyan-300 hover:bg-cyan-500/20 transition-colors cursor-pointer"
          >
            {isStreaming ? (
              <>
                <Pause className="size-2.5" /> PAUSE
              </>
            ) : (
              <>
                <Play className="size-2.5" /> RESUME
              </>
            )}
          </button>

          <button
            onClick={() => setEvents([])}
            className="rounded border border-border bg-black/40 p-1 text-slate-400 hover:text-white transition-colors cursor-pointer"
            title="Clear Stream"
          >
            <Trash2 className="size-3" />
          </button>
        </div>
      </div>

      {/* Stream Logs Viewport */}
      <div className="flex-1 overflow-y-auto max-h-72 space-y-1.5 py-2 font-mono text-[11px] custom-scrollbar">
        {filteredEvents.length === 0 ? (
          <div className="py-8 text-center text-muted-foreground">
            NO TELEMETRY PACKETS MATCHING FILTER
          </div>
        ) : (
          filteredEvents.map((evt) => (
            <div
              key={evt.id}
              className={cn(
                "flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1 rounded border px-2.5 py-1.5 transition-colors",
                evt.severity === "threat"
                  ? "border-red-500/30 bg-red-950/20 text-red-200"
                  : evt.severity === "warn"
                    ? "border-amber-500/30 bg-amber-950/20 text-amber-200"
                    : "border-border/40 bg-black/40 text-slate-300",
              )}
            >
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-slate-500 font-mono text-[10px]">{evt.time}</span>
                <span
                  className={cn(
                    "rounded px-1 py-0.2 text-[9px] font-bold uppercase border",
                    evt.severity === "threat"
                      ? "border-red-500/40 bg-red-950/60 text-red-400"
                      : "border-cyan-500/40 bg-cyan-950/60 text-cyan-300",
                  )}
                >
                  {evt.type}
                </span>
                <span className="text-cyan-400 font-semibold">{evt.host}</span>
                <span className="text-slate-300">{evt.detail}</span>
              </div>

              <div className="flex items-center gap-1.5 shrink-0 text-[10px]">
                {evt.pid && <span className="text-slate-400">PID:{evt.pid}</span>}
                {evt.mitre && (
                  <span className="rounded bg-black/60 px-1.5 py-0.2 font-bold text-amber-400 border border-amber-500/30">
                    {evt.mitre}
                  </span>
                )}
              </div>
            </div>
          ))
        )}
        <div ref={streamEndRef} />
      </div>
    </div>
  );
}
