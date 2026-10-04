import { memo } from "react";
import { ChapterShell } from "./_ChapterShell";
import { HudFrame } from "../hud/HudFrame";
import { HudLabel } from "../hud/HudLabel";
import { SignalBars } from "../hud/SignalBars";
import { useStory } from "../engine/StoryContext";

// 01 SYSTEM ONLINE
export const SystemOnlineScene = memo(function SystemOnlineScene() {
  const { cinematicData } = useStory();
  const t = cinematicData?.telemetry.value;
  return (
    <ChapterShell index="01" title="SYSTEM ONLINE" chapterId="system_online" status="nominal">
      <div className="absolute top-5 right-6 lg:right-8 w-[min(340px,90vw)]">
        <HudFrame>
          <div className="flex items-center justify-between mb-3">
            <HudLabel>TELEMETRY STREAM</HudLabel>
            <SignalBars strength={3} aria-label="Nominal telemetry signal strength" />
          </div>
          <dl className="tm-font-mono text-[12px] grid grid-cols-2 gap-y-2">
            <dt className="text-[color:var(--tm-text-dim)]">CPU</dt>
            <dd className="text-right tabular-nums text-[color:var(--tm-cyan)]">
              {t?.cpuPct ?? 0}%
            </dd>
            <dt className="text-[color:var(--tm-text-dim)]">MEM</dt>
            <dd className="text-right tabular-nums">{t?.memPct ?? 0}%</dd>
            <dt className="text-[color:var(--tm-text-dim)]">NET</dt>
            <dd className="text-right tabular-nums">{t?.netMBps ?? 0} MB/s</dd>
            <dt className="text-[color:var(--tm-text-dim)]">PROCS</dt>
            <dd className="text-right tabular-nums">{t?.processes ?? 0}</dd>
            <dt className="text-[color:var(--tm-text-dim)]">EVT/S</dt>
            <dd className="text-right tabular-nums">{t?.eventsPerSec ?? 0}</dd>
          </dl>
        </HudFrame>
      </div>
      <div className="absolute bottom-8 left-8 max-w-md">
        <HudFrame>
          <HudLabel>TOPOLOGY RESOLVED</HudLabel>
          <p className="mt-2 text-sm text-[color:var(--tm-text-dim)] leading-relaxed">
            Network identity graph assembled.{" "}
            <span className="text-[color:var(--tm-text)]">No anomalies.</span>
          </p>
        </HudFrame>
      </div>
    </ChapterShell>
  );
});
