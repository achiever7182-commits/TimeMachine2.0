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
    <div className="flex flex-col h-full rounded-[4px] border border-[#1B2933] bg-[#05080C] p-3 font-mono text-xs">
      {/* Top Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#1B2933] pb-2 text-[9.5px]">
        <div className="flex items-center gap-2">
          <Terminal className="size-3 text-[#16D9F2]" />
          <span className="font-semibold uppercase tracking-[0.10em] text-[#F3F7FA]">
            // RAW TELEMETRY STREAM
          </span>
          <span className="flex items-center gap-1 rounded-[2px] bg-[#070C11] px-1.5 py-0.2 text-[#20DFA0] border border-[#20DFA0]/40">
            <span className={cn("size-1.5 rounded-full bg-[#20DFA0]", isStreaming && "animate-pulse")} />
            {isStreaming ? "LIVE INGESTION" : "STREAM PAUSED"}
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="rounded-[2px] border border-[#1B2933] bg-[#0B1117] px-2 py-0.5 text-[9.5px] text-[#F3F7FA] focus:outline-none cursor-pointer"
          >
            <option value="ALL">ALL EVENTS</option>
            <option value="DETECTION">DETECTIONS</option>
            <option value="NETWORK_CONNECT">NETWORK</option>
            <option value="AUTH_EVENT">AUTH</option>
            <option value="PROC_START">PROCESS</option>
          </select>

          <button
            onClick={() => setIsStreaming(!isStreaming)}
            className="flex items-center gap-1 rounded-[2px] border border-[#16D9F2]/30 bg-[#08798A]/20 px-2 py-0.5 text-[#16D9F2] hover:bg-[#16D9F2]/20 transition-colors cursor-pointer text-[9.5px]"
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
            className="rounded-[2px] border border-[#1B2933] bg-[#0B1117] p-1 text-[#647682] hover:text-[#F3F7FA] hover:border-[#16D9F2]/40 transition-colors cursor-pointer"
            title="Clear Stream"
          >
            <Trash2 className="size-3" />
          </button>
        </div>
      </div>

      {/* Stream Logs Viewport */}
      <div className="flex-1 overflow-y-auto max-h-72 space-y-1 py-2 font-mono text-[10.5px] custom-scrollbar">
        {filteredEvents.length === 0 ? (
          <div className="py-8 text-center text-[#647682]">
            NO TELEMETRY PACKETS MATCHING FILTER
          </div>
        ) : (
          filteredEvents.map((evt) => (
            <div
              key={evt.id}
              className={cn(
                "flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1 rounded-[2px] border px-2.5 py-1 transition-colors",
                evt.severity === "threat"
                  ? "border-[#FF3347]/30 bg-[#B91C2E]/10 text-[#FF5264]"
                  : evt.severity === "warn"
                    ? "border-[#FFB020]/30 bg-[#B77900]/10 text-[#FFD166]"
                    : "border-[#142029] bg-[#070C11] text-[#A5B5C0]",
              )}
            >
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[#647682] font-mono text-[9.5px]">{evt.time}</span>
                <span
                  className={cn(
                    "rounded-[2px] px-1 py-0.2 text-[8.5px] font-mono font-semibold uppercase border",
                    evt.severity === "threat"
                      ? "border-[#FF3347]/40 bg-[#B91C2E]/30 text-[#FF5264]"
                      : "border-[#16D9F2]/40 bg-[#08798A]/30 text-[#16D9F2]",
                  )}
                >
                  {evt.type}
                </span>
                <span className="text-[#16D9F2] font-medium">{evt.host}</span>
                <span className="text-[#F3F7FA]">{evt.detail}</span>
              </div>

              <div className="flex items-center gap-1.5 shrink-0 text-[9.5px]">
                {evt.pid && <span className="text-[#7893A1]">PID:{evt.pid}</span>}
                {evt.mitre && (
                  <span className="rounded-[2px] bg-[#05080C] px-1.5 py-0.2 font-mono font-medium text-[#FFB020] border border-[#FFB020]/30">
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

