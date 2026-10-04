import { memo, useEffect, useMemo, useState } from "react";
import { useStory } from "../engine/StoryContext";
import { HudFrame } from "../hud/HudFrame";
import { HudLabel } from "../hud/HudLabel";
import { StatusDot } from "../hud/StatusDot";
import { ProvenanceBadge } from "../hud/ProvenanceBadge";
import { SignalBars } from "../hud/SignalBars";
import { useCountUp } from "../engine/useCountUp";
import { useStoryTicker } from "../engine/useStoryTicker";
import type { DataProvenance } from "../data/provenance";
import type { TelemetrySnapshot } from "../data/types";

export interface TelemetryStreamProps {
  data: TelemetrySnapshot | null;
  provenance: DataProvenance;
  /** Scales the count-up with chapter progress; 0 means values are 0 and count up as this goes to 1. */
  revealProgress?: number;
  /** If true, values drift by ±2% per second to feel live. */
  drift?: boolean;
}

export const TelemetryStream = memo(function TelemetryStream({
  data,
  provenance,
  revealProgress = 1,
  drift = true,
}: TelemetryStreamProps) {
  const { frame, reducedMotion } = useStory();
  const active = frame.chapter === "system_online" || frame.chapter === "hero";
  const driftEnabled = drift && active && !reducedMotion;

  const base = data ?? {
    cpuPct: 0,
    memPct: 0,
    netMBps: 0,
    processes: 0,
    eventsPerSec: 0,
  };

  const [jitterSeed, setJitterSeed] = useState<number>(0);
  useStoryTicker(
    () => {
      setJitterSeed((s) => (s + 1) % 1000);
    },
    { disabled: !driftEnabled, maxFps: 1 },
  );

  const reveal = Math.max(0, Math.min(1, revealProgress));
  const driftPct = driftEnabled ? ((jitterSeed * 37) % 401) / 10000 - 0.02 : 0; // ±2%
  const scale = reveal * (1 + driftPct);

  const cpu = useCountUp(Math.round(base.cpuPct * scale), {
    start: 0,
    durationMs: 1400,
    paused: false,
  });
  const mem = useCountUp(Math.round(base.memPct * scale), {
    start: 0,
    durationMs: 1600,
  });
  const net = useCountUp(Math.round(base.netMBps * scale * 10) / 10, {
    start: 0,
    durationMs: 1700,
    decimals: 1,
  });
  const procs = useCountUp(Math.round(base.processes * scale), {
    start: 0,
    durationMs: 1800,
  });
  const eps = useCountUp(Math.round(base.eventsPerSec * scale), {
    start: 0,
    durationMs: 2000,
  });

  const rows = useMemo(
    () => [
      { k: "CPU", v: `${cpu}%` },
      { k: "MEMORY", v: `${mem}%` },
      { k: "NETWORK", v: `${net} MB/s` },
      { k: "ACTIVE PROCESSES", v: `${procs}` },
      { k: "EVENTS / SEC", v: `${eps}` },
    ],
    [cpu, mem, net, procs, eps],
  );

  return (
    <HudFrame role="region" aria-label="Telemetry stream">
      <div className="flex items-center justify-between mb-3 flex-wrap gap-3">
        <HudLabel>System Status · Telemetry Stream</HudLabel>
        <div className="flex items-center gap-3">
          <StatusDot state={active ? "nominal" : "off"} />
          <SignalBars strength={active ? (provenance === "demo" ? 3 : 2) : 0} />
          <ProvenanceBadge provenance={provenance} kind="telemetry" />
        </div>
      </div>
      <dl className="tm-font-mono text-[12px] grid grid-cols-[auto_1fr] gap-x-6 gap-y-2">
        {rows.map((r) => (
          <div key={r.k} className="contents">
            <dt className="text-[color:var(--tm-text-dim)]">{r.k}</dt>
            <dd className="text-right tabular-nums text-[color:var(--tm-text)]">{r.v}</dd>
          </div>
        ))}
      </dl>
    </HudFrame>
  );
});
