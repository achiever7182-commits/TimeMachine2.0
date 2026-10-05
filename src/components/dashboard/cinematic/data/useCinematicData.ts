import { useMemo } from "react";
import type {
  CinematicData,
  CinematicIncidentSummary,
  TelemetrySnapshot,
  CinematicInvestigationSummary,
} from "./types";
import type {
  CNode,
  CEdge,
  AttackStep,
  VerificationCheck,
  ResponseOption,
  NetworkLayouts,
} from "./types";
import type { DataProvenance, Provenanced } from "./provenance";
import { labelFor, demoNow } from "./provenance";
import { fixture, fixtureAttackPathNodes } from "./fixtures/inc-2048";
import { useDemo } from "@/context/DemoContext";
import { getDashboardSnapshot } from "@/services/incidentService";
import type { Severity } from "@/types/incident";

/**
 * Cinematic data adapter (N2, N3).
 * Reads EXCLUSIVELY from existing hooks and services:
 *   - useDemo()       -> DemoContext
 *   - getDashboardSnapshot -> incidentService
 *   - fixture         -> one local typed deterministic source (no mock APIs)
 *
 * Every data-bearing field is wrapped in Provenanced<T> with an explicit
 * provenance tag. The UI reads labels through labelFor() only, which means
 * the word LIVE / ACTIVE ATTACK cannot appear unless provenance === 'live'.
 */

function sevKey(s: Severity | string): "low" | "medium" | "high" | "critical" {
  const k = String(s).toUpperCase();
  if (k === "LOW" || k === "NORMAL") return "low";
  if (k === "MEDIUM" || k === "ELEVATED") return "medium";
  if (k === "HIGH") return "high";
  return "critical";
}

/**
 * Deterministically compute jittered telemetry from the 0..1 storyClock fraction
 * so that values climb smoothly from baseline -> peak around progress 0.4 and
 * settle down after 0.9. Uses `cinematicRng` only for tiny jitter.
 */
function telemetryAt(progress: number, minute: number): TelemetrySnapshot {
  const { telemetryBaseline: base, telemetryPeak: peak } = fixture;
  const rise = Math.min(1, progress / 0.4);
  const fall = progress > 0.82 ? Math.min(1, (progress - 0.82) / 0.18) : 0;
  const t = Math.max(0, Math.min(1, rise - fall * 0.9));
  const jitterSeed = (minute * 9301 + 49297) % 233280;
  const j = (jitterSeed / 233280 - 0.5) * 0.06;
  const lerp = (a: number, b: number) => a + (b - a) * (t + j);
  const r = (n: number) => Math.round(n * 10) / 10;
  return {
    cpuPct: Math.round(lerp(base.cpuPct, peak.cpuPct)),
    memPct: Math.round(lerp(base.memPct, peak.memPct)),
    netMBps: r(lerp(base.netMBps, peak.netMBps)),
    processes: Math.round(lerp(base.processes, peak.processes)),
    eventsPerSec: Math.round(lerp(base.eventsPerSec, peak.eventsPerSec)),
  };
}

function provenanced<T>(
  value: T,
  provenance: DataProvenance,
  source?: string,
  asOf?: string,
): Provenanced<T> {
  return { value, provenance, source, asOf };
}

export function useCinematicData(): CinematicData {
  const demo = useDemo();
  const snapshot = useMemo(() => getDashboardSnapshot(demo.incidentState), [demo.incidentState]);

  return useMemo<CinematicData>(() => {
    const minute = demo.currentMinute;
    const progress = Math.max(0, Math.min(1, minute / 42));
    const asOf = demoNow();

    const telemetry: Provenanced<TelemetrySnapshot | null> = provenanced(
      telemetryAt(progress, minute),
      "demo",
      "fixture:inc-2048:telemetry",
      asOf,
    );

    const incident: Provenanced<CinematicIncidentSummary | null> = provenanced(
      {
        id: demo.incident.id,
        severity: sevKey(demo.currentRisk as Severity),
        status: demo.incident.status ?? "ACTIVE",
        detectedAt: demo.incident.detectedAt,
        affectedAssets: snapshot.compromisedAssetsCount ?? 0,
        events: demo.incident.eventIds?.length || fixture.attackSteps.length,
        mitreTechniques: new Set(fixture.attackSteps.map((s) => s.mitre).filter(Boolean)).size,
        evidence: fixture.reconstruction.evidenceTotal,
      },
      "demo",
      "fixture:inc-2048:incident + DemoContext.incidentState",
      asOf,
    );

    const attackPathSteps: AttackStep[] = fixture.attackSteps.filter((s: AttackStep, i: number) => {
      const active = Math.ceil(progress * fixture.attackSteps.length);
      void s;
      return i < Math.max(1, active);
    });
    const attackPath: Provenanced<AttackStep[]> = provenanced(
      attackPathSteps,
      "demo",
      "fixture:inc-2048:attackSteps",
      asOf,
    );

    const attackSet = new Set(attackPathSteps.map((s) => s.hostname));
    const pathIds = fixtureAttackPathNodes();
    const activeNodes = new Set<string>();
    for (let i = 0; i < Math.ceil(progress * pathIds.length); i++) {
      const id = pathIds[i];
      if (id) activeNodes.add(id);
    }

    const applyNodeState = (nodes: CNode[]): CNode[] =>
      nodes.map((n) => {
        if (!activeNodes.has(n.id)) return { ...n, state: "nominal" as const };
        const isLast = pathIds[pathIds.length - 1] === n.id;
        if (progress > 0.9 && isLast) return { ...n, state: "contained" as const };
        if (progress < 0.22) return { ...n, state: "suspicious" as const };
        return { ...n, state: "compromised" as const };
      });

    const applyEdgeKind = (edges: CEdge[]): CEdge[] =>
      edges.map((e) => {
        if (progress < 0.18) return { ...e, kind: "normal" as const };
        const fwd = activeNodes.has(e.from) && activeNodes.has(e.to);
        const onAttackPath =
          pathIds.includes(e.from) &&
          pathIds.includes(e.to) &&
          pathIds.indexOf(e.from) === pathIds.indexOf(e.to) - 1;
        if (progress >= 0.85 && onAttackPath) return { ...e, kind: "blocked" as const };
        if (fwd && onAttackPath) return { ...e, kind: "attack" as const };
        return { ...e, kind: "normal" as const };
      });

    const desktopNodes = applyNodeState(fixture.network.desktop.nodes);
    const desktopEdges = applyEdgeKind(fixture.network.desktop.edges);
    const graph: Provenanced<{ nodes: CNode[]; edges: CEdge[] }> = provenanced(
      { nodes: desktopNodes, edges: desktopEdges },
      "demo",
      "fixture:inc-2048:network.desktop",
      asOf,
    );

    const investigation: Provenanced<CinematicInvestigationSummary | null> = provenanced(
      {
        eventsCorrelated: demo.incidentState.allEvents.length,
        hostsAffected: fixture.reconstruction.hostsAffected,
        processesInvolved: fixture.reconstruction.processesInvolved,
        networkConnections: fixture.reconstruction.networkConnections,
        evidenceItems: demo.incidentState.availableEvidence.length,
      },
      "demo",
      "fixture:inc-2048:reconstruction + DemoContext.incidentState",
      asOf,
    );

    const responseOptions: ResponseOption[] = [...fixture.responseOptions];
    const verification: Provenanced<VerificationCheck[]> = provenanced(
      fixture.verification.map((c: VerificationCheck) => ({ ...c })),
      "demo",
      "fixture:inc-2048:verification",
      asOf,
    );

    const layouts: NetworkLayouts = {
      desktop: { ...fixture.network.desktop, nodes: desktopNodes, edges: desktopEdges },
      tablet: {
        ...fixture.network.tablet,
        nodes: applyNodeState(fixture.network.tablet.nodes),
        edges: applyEdgeKind(fixture.network.tablet.edges),
      },
      mobile: {
        ...fixture.network.mobile,
        nodes: applyNodeState(fixture.network.mobile.nodes),
        edges: applyEdgeKind(fixture.network.mobile.edges),
      },
    };

    return {
      mode: "demo",
      telemetry,
      incident,
      attackPath,
      graph,
      investigation,
      responseOptions,
      simulation: {
        available: true,
        route: "/simulation-lab",
      },
      verification,
      layouts,
      tagline: fixture.tagline,
    };
  }, [demo, snapshot]);
}

export { labelFor };
