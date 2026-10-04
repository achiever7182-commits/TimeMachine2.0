import { memo } from "react";
import { ChapterShell } from "./_ChapterShell";
import { HudFrame } from "../hud/HudFrame";
import { HudLabel } from "../hud/HudLabel";
import { Redacted } from "../hud/Redacted";
import { useStory } from "../engine/StoryContext";

// 07 COUNTERMEASURES
export const ResponseScene = memo(function ResponseScene() {
  const { cinematicData } = useStory();
  const opts = cinematicData?.responseOptions ?? [];
  return (
    <ChapterShell
      index="07"
      title="COUNTERMEASURES · BEFORE WE ACT"
      chapterId="response"
      status="warn"
      provenance="demo"
    >
      <div className="absolute top-5 right-6 lg:right-8 w-[min(440px,90vw)]">
        <HudFrame>
          <HudLabel>RESPONSE OPTIONS</HudLabel>
          <ul className="mt-3 space-y-2 text-sm">
            {opts.slice(0, 3).map((o) => (
              <li key={o.id} className="rounded border border-[color:var(--tm-line)] p-2">
                <div className="tm-font-mono text-[11px] uppercase tracking-[0.18em] text-[color:var(--tm-text-dim)]">
                  {o.targetType} · ID {o.targetId}
                </div>
                <div className="mt-1 font-medium">{o.label}</div>
                <div className="mt-1 text-xs text-[color:var(--tm-text-dim)]">
                  Risk reduction: <Redacted widthEm={2}>{String(o.riskReductionPct)}</Redacted>% ·
                  ETA {o.estimatedImpactSec}s
                </div>
              </li>
            ))}
          </ul>
        </HudFrame>
      </div>
      <div className="absolute bottom-8 left-8 right-8 lg:right-auto lg:w-[min(640px,90vw)]">
        <HudFrame>
          <HudLabel>BEFORE WE ACT — SIMULATE FIRST</HudLabel>
          <p className="mt-2 text-sm text-[color:var(--tm-text-dim)]">
            Response calls the existing response architecture. Approval flow required.
            <span className="ml-2 tm-font-mono text-[color:var(--tm-cyan)]">SIMULATION ONLY</span>
          </p>
        </HudFrame>
      </div>
    </ChapterShell>
  );
});

// SYSTEM FIGHTS BACK — 08
export const SimulationTransitionScene = memo(function SimulationTransitionScene() {
  return (
    <ChapterShell index="08" title="SYSTEM FIGHTS BACK" chapterId="simulation" status="secure">
      <div className="absolute inset-0 grid place-items-center">
        <div className="tm-chapter-text text-[clamp(1.5rem,4vw,2.75rem)] font-semibold tracking-tight text-[color:var(--tm-green)]">
          Deploying countermeasures.
        </div>
      </div>
    </ChapterShell>
  );
});

// DEFENSE SEQUENCE — 09
export const DefenseSequenceScene = memo(function DefenseSequenceScene() {
  return <ChapterShell index="09" title="DEFENSE SEQUENCE" chapterId="defense" status="secure" />;
});
