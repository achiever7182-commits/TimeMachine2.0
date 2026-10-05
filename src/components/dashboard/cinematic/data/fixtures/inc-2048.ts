import type {
  AttackStep,
  AttackStageId,
  CNode,
  CEdge,
  CNodeKind,
  CNodeState,
  CinematicFixture,
  ResponseOption,
  VerificationCheck,
} from "../types";
import { redactCommand } from "../redact";

/**
 * Tiny Mulberry32 seeded PRNG. Deterministic given the same seed, so that
 * jitter in particle positions and "stutter" in threat telemetry values is
 * the same between runs (screenshots / verification are reproducible).
 */
export function mulberry32(seed: number) {
  let a = seed >>> 0;
  return function (): number {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const FIXTURE_SEED = 20480929;
export const cinematicRng = mulberry32(FIXTURE_SEED);

const FIXED_NOW = "2026-09-29T10:24:00.000Z";

const attackSteps: AttackStep[] = [
  {
    id: "step-0942-auth",
    stage: "initial_access",
    tOffsetSec: 0,
    hostname: "VPN-GW-01",
    ip: "185.220.101.5",
    mitre: "T1078.004",
    eventCount: 6,
    evidenceRefs: ["ev-auth-1", "ev-auth-2", "ev-signal-1"],
  },
  {
    id: "step-0944-brute",
    stage: "credential_access",
    tOffsetSec: 120,
    hostname: "VPN-GW-01",
    ip: "185.220.101.5",
    process: "sslvpn_service.exe",
    parentProcess: "svchost.exe",
    mitre: "T1110.001",
    eventCount: 14,
    evidenceRefs: ["ev-auth-3", "ev-auth-4", "ev-auth-5"],
  },
  {
    id: "step-1000-compromise",
    stage: "execution",
    tOffsetSec: 1080,
    hostname: "LAPTOP-042",
    ip: "10.0.4.42",
    process: "explorer.exe",
    parentProcess: "userinit.exe",
    commandRedacted: redactCommand(
      "powershell.exe -EncodedCommand JABzAD0ATgBlAHcALQBPAGIAagBlAGMAdABfAFMAeQBzAHQAZQBtAC4ATgBlAHQALgBXAGUAYgBDAGwAaQBlAG4AdAA=",
    ),
    mitre: "T1059.001",
    eventCount: 9,
    evidenceRefs: ["ev-end-1", "ev-end-2", "ev-session-1"],
  },
  {
    id: "step-1004-priv",
    stage: "privilege_escalation",
    tOffsetSec: 1320,
    hostname: "LAPTOP-042",
    ip: "10.0.4.42",
    process: "powershell.exe",
    parentProcess: "explorer.exe",
    commandRedacted: redactCommand(
      "rundll32.exe C:\\Users\\alex.m\\AppData\\Local\\Temp\\s.dll,DllRegisterServer password=S3cr3tP@ss!",
    ),
    mitre: "T1548.002",
    eventCount: 7,
    evidenceRefs: ["ev-end-3", "ev-end-4", "ev-dll-1"],
  },
  {
    id: "step-1007-lateral",
    stage: "lateral_movement",
    tOffsetSec: 1500,
    hostname: "SERVER-03",
    ip: "10.0.12.3",
    process: "wsmprovhost.exe",
    parentProcess: "winrm.exe",
    commandRedacted: redactCommand(
      'winrs -r:SERVER-03.ad.acme.internal "net use X: \\\\DB-PROD-01\\c$ /user:alex.m API_KEY=sk-1234567890abcdefghij"',
    ),
    mitre: "T1021.003",
    eventCount: 11,
    evidenceRefs: ["ev-net-1", "ev-net-2", "ev-auth-6"],
  },
  {
    id: "step-1012-collect",
    stage: "collection",
    tOffsetSec: 1800,
    hostname: "DB-PROD-01",
    ip: "10.0.20.8",
    process: "sqlservr.exe",
    parentProcess: "services.exe",
    mitre: "T1213.002",
    eventCount: 17,
    evidenceRefs: ["ev-db-1", "ev-db-2", "ev-db-3", "ev-file-1"],
  },
  {
    id: "step-1018-exfil",
    stage: "impact",
    tOffsetSec: 2160,
    hostname: "FS-CORP-02",
    ip: "10.0.30.18",
    process: "7z.exe",
    parentProcess: "cmd.exe",
    commandRedacted: redactCommand(
      "7z.exe a -p$ecureP@ss -sdel C:\\Users\\Public\\dump.7z D:\\Finance\\Customers\\*.*",
    ),
    mitre: "T1537",
    eventCount: 8,
    evidenceRefs: ["ev-file-2", "ev-file-3", "ev-exfil-1"],
  },
];

const NODES_DESKTOP: Array<CNode & { kind: CNodeKind }> = [
  {
    id: "ATTACKER",
    kind: "attacker",
    label: "SIMULATED THREAT ACTOR",
    x: 60,
    y: 300,
    state: "nominal",
  },
  { id: "VPN-GW-01", kind: "firewall", label: "VPN-GW-01", x: 220, y: 300, state: "nominal" },
  { id: "ALEX", kind: "identity", label: "alex.m", x: 380, y: 140, state: "nominal" },
  { id: "LAPTOP-042", kind: "endpoint", label: "LAPTOP-042", x: 380, y: 460, state: "nominal" },
  { id: "SERVER-03", kind: "server", label: "SERVER-03", x: 580, y: 300, state: "nominal" },
  { id: "DC-01", kind: "identity", label: "DC-01", x: 580, y: 80, state: "nominal" },
  { id: "DB-PROD-01", kind: "database", label: "DB-PROD-01", x: 780, y: 140, state: "nominal" },
  { id: "FS-CORP-02", kind: "network", label: "FS-CORP-02", x: 780, y: 460, state: "nominal" },
  { id: "MAIL-01", kind: "server", label: "MAIL-01", x: 940, y: 80, state: "nominal" },
  { id: "SIEM-01", kind: "firewall", label: "SIEM-01", x: 940, y: 300, state: "nominal" },
  { id: "API-GW-01", kind: "firewall", label: "API-GW-01", x: 940, y: 520, state: "nominal" },
  { id: "BACKUP-01", kind: "database", label: "BACKUP-01", x: 780, y: 300, state: "nominal" },
];

const EDGES_DESKTOP: CEdge[] = [
  { id: "e1", from: "ATTACKER", to: "VPN-GW-01", kind: "normal" },
  { id: "e2", from: "VPN-GW-01", to: "DC-01", kind: "normal" },
  { id: "e3", from: "VPN-GW-01", to: "ALEX", kind: "normal" },
  { id: "e4", from: "ALEX", to: "LAPTOP-042", kind: "normal" },
  { id: "e5", from: "LAPTOP-042", to: "SERVER-03", kind: "normal" },
  { id: "e6", from: "SERVER-03", to: "DB-PROD-01", kind: "normal" },
  { id: "e7", from: "SERVER-03", to: "FS-CORP-02", kind: "normal" },
  { id: "e8", from: "DC-01", to: "MAIL-01", kind: "normal" },
  { id: "e9", from: "DB-PROD-01", to: "SIEM-01", kind: "normal" },
  { id: "e10", from: "FS-CORP-02", to: "API-GW-01", kind: "normal" },
  { id: "e11", from: "SERVER-03", to: "BACKUP-01", kind: "normal" },
  { id: "e12", from: "MAIL-01", to: "SIEM-01", kind: "normal" },
  { id: "e13", from: "LAPTOP-042", to: "SIEM-01", kind: "normal" },
  { id: "e14", from: "DB-PROD-01", to: "BACKUP-01", kind: "normal" },
  { id: "e15", from: "VPN-GW-01", to: "LAPTOP-042", kind: "normal" },
];

const responseOptions: ResponseOption[] = [
  {
    id: "opt-disable-user",
    label: "Disable Compromised Identity",
    targetId: "ALEX",
    targetType: "USER",
    description:
      "Disable alex.m credential. Blocks future authentication but does not kill active sessions.",
    estimatedImpactSec: 60,
    riskReductionPct: 38,
    severity: "medium",
  },
  {
    id: "opt-isolate-laptop",
    label: "Isolate LAPTOP-042",
    targetId: "LAPTOP-042",
    targetType: "ENDPOINT",
    description:
      "Isolate workstation at network egress. Preserves RAM and disk for forensic collection.",
    estimatedImpactSec: 25,
    riskReductionPct: 74,
    severity: "low",
  },
  {
    id: "opt-block-lateral",
    label: "Block Lateral Connection",
    targetId: "LAPTOP-042->SERVER-03",
    targetType: "CONNECTION",
    description:
      "Block WinRM / SMB egress from LAPTOP-042 to SERVER-03. Fastest lateral-mitigation.",
    estimatedImpactSec: 12,
    riskReductionPct: 61,
    severity: "low",
  },
  {
    id: "opt-do-nothing",
    label: "Baseline — Do Nothing",
    targetId: "NONE",
    targetType: "NONE",
    description: "No response executed. Counterfactual branch used to evaluate all other options.",
    estimatedImpactSec: 0,
    riskReductionPct: 0,
    severity: "high",
  },
];

const verification: VerificationCheck[] = [
  { id: "chk-1", label: "All threat sessions terminated", status: "pending" },
  { id: "chk-2", label: "LAPTOP-042 isolated from egress", status: "pending" },
  { id: "chk-3", label: "alex.m credentials revoked", status: "pending" },
  { id: "chk-4", label: "No anomalous DB queries last 5m", status: "pending" },
  { id: "chk-5", label: "EDR telemetry nominal 248/248", status: "pending" },
  { id: "chk-6", label: "SIEM correlation: no new signals", status: "pending" },
  { id: "chk-7", label: "Blast-radius containment verified", status: "pending" },
];

export const fixture: CinematicFixture = {
  version: 1,
  incidentId: "INC-2048",
  generatedAt: FIXED_NOW,
  seed: FIXTURE_SEED,
  network: {
    desktop: { nodes: NODES_DESKTOP, edges: EDGES_DESKTOP, viewBox: "0 0 1000 600" },
    tablet: {
      nodes: NODES_DESKTOP.map((n) => ({ ...n, x: n.x * 0.9, y: n.y * 0.9 })),
      edges: EDGES_DESKTOP,
      viewBox: "0 0 900 540",
    },
    mobile: {
      nodes: [
        {
          id: "ATTACKER",
          kind: "attacker",
          label: "SIMULATED THREAT ACTOR",
          x: 300,
          y: 40,
          state: "nominal" as CNodeState,
        },
        {
          id: "VPN-GW-01",
          kind: "firewall",
          label: "VPN-GW-01",
          x: 300,
          y: 120,
          state: "nominal" as CNodeState,
        },
        {
          id: "ALEX",
          kind: "identity",
          label: "alex.m",
          x: 300,
          y: 200,
          state: "nominal" as CNodeState,
        },
        {
          id: "LAPTOP-042",
          kind: "endpoint",
          label: "LAPTOP-042",
          x: 300,
          y: 280,
          state: "nominal" as CNodeState,
        },
        {
          id: "SERVER-03",
          kind: "server",
          label: "SERVER-03",
          x: 300,
          y: 360,
          state: "nominal" as CNodeState,
        },
        {
          id: "DB-PROD-01",
          kind: "database",
          label: "DB-PROD-01",
          x: 300,
          y: 440,
          state: "nominal" as CNodeState,
        },
        {
          id: "SIEM-01",
          kind: "firewall",
          label: "SIEM-01",
          x: 300,
          y: 520,
          state: "nominal" as CNodeState,
        },
      ],
      edges: [
        { id: "m1", from: "ATTACKER", to: "VPN-GW-01", kind: "normal" as const },
        { id: "m2", from: "VPN-GW-01", to: "ALEX", kind: "normal" as const },
        { id: "m3", from: "ALEX", to: "LAPTOP-042", kind: "normal" as const },
        { id: "m4", from: "LAPTOP-042", to: "SERVER-03", kind: "normal" as const },
        { id: "m5", from: "SERVER-03", to: "DB-PROD-01", kind: "normal" as const },
        { id: "m6", from: "DB-PROD-01", to: "SIEM-01", kind: "normal" as const },
      ],
      viewBox: "0 0 600 600",
    },
  },
  attackSteps,
  responseOptions,
  verification,
  telemetryBaseline: { cpuPct: 18, memPct: 42, netMBps: 1.4, processes: 182, eventsPerSec: 320 },
  telemetryPeak: { cpuPct: 86, memPct: 77, netMBps: 48.6, processes: 331, eventsPerSec: 3480 },
  reconstruction: {
    firstEventId: "step-0942-auth",
    detectionOpportunitySec: 300,
    missedSignalsCount: 4,
    evidenceTotal: 23,
    hostsAffected: 5,
    processesInvolved: 17,
    networkConnections: 46,
  },
  tagline: "Investigate the Past. Understand the Present. Simulate the Future.",
};

export function fixtureAttackPathNodes(): string[] {
  return ["ATTACKER", "VPN-GW-01", "ALEX", "LAPTOP-042", "SERVER-03", "DB-PROD-01", "FS-CORP-02"];
}

export function fixtureStepForStage(stage: AttackStageId): AttackStep | undefined {
  return fixture.attackSteps.find((s) => s.stage === stage);
}
