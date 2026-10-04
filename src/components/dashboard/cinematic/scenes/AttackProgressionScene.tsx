import { memo } from "react";
import { ChapterShell } from "./_ChapterShell";
import { HudFrame } from "../hud/HudFrame";
import { HudLabel } from "../hud/HudLabel";
import { ProvenanceBadge } from "../hud/ProvenanceBadge";
import { useStory } from "../engine/StoryContext";
import { formatTClock } from "../engine/storyState";

// 03 ATTACK IN PROGRESS
export const AttackProgressionScene = memo(function AttackProgressionScene() {
  const { frame, cinematicData } = useStory();
  const steps = cinematicData?.attackPath.value ?? [];
  const current =
    steps[
      Math.min(steps.length - 1, Math.floor(frame.chapterProgress * Math.max(1, steps.length)))
    ];
  return (
    <ChapterShell
      index="03"
      title="ATTACK IN PROGRESS"
      chapterId="attack"
      status="threat"
      provenance={cinematicData?.attackPath.provenance}
    >
      <div className="absolute top-5 right-6 lg:right-8 w-[min(380px,90vw)]">
        <HudFrame>
          <div className="flex items-center justify-between mb-2">
            <HudLabel>ATTACK TIMELINE</HudLabel>
            <ProvenanceBadge
              provenance={cinematicData?.attackPath.provenance ?? "demo"}
              kind="attack"
            />
          </div>
          <ol className="tm-font-mono text-[11px] space-y-2 max-h-[46vh] overflow-hidden">
            {steps.slice(0, 7).map((s, i) => (
              <li key={s.id} className="flex items-start gap-3">
                <span className="tabular-nums text-[color:var(--tm-text-faint)]">
                  {formatTClock(s.tOffsetSec, 1).slice(1)}
                </span>
                <span className="text-[color:var(--tm-text-dim)] w-20 truncate">{s.hostname}</span>
                <span
                  className={`${current?.id === s.id ? "text-[color:var(--tm-red)]" : "text-[color:var(--tm-text-dim)]"}`}
                >
                  {s.mitre ?? s.stage}
                </span>
              </li>
            ))}
          </ol>
        </HudFrame>
      </div>
      <div className="absolute bottom-8 left-8 w-[min(640px,90vw)]">
        <HudFrame>
          <HudLabel>INCIDENT SEVERITY PROGRESSION</HudLabel>
          <div className="mt-3 h-2 rounded-full bg-[color:var(--tm-line)] overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[color:var(--tm-amber)] via-[color:var(--tm-red)] to-[color:var(--tm-red)]"
              style={{
                width: `${Math.round(frame.chapterProgress * 82)}%`,
                transition: "width 120ms linear",
              }}
            />
          </div>
          <div className="mt-2 tm-font-mono text-[11px] flex justify-between text-[color:var(--tm-text-dim)]">
            <span>T+00:00:01</span>
            <span>{formatTClock(frame.storyClockSec, frame.timeDirection)}</span>
            <span>T+00:24:17</span>
          </div>
        </HudFrame>
      </div>
    </ChapterShell>
  );
});
