import { memo } from "react";
import { ChapterShell } from "./_ChapterShell";
import { HudFrame } from "../hud/HudFrame";
import { HudLabel } from "../hud/HudLabel";
import { formatTClock } from "../engine/storyState";
import { useStory } from "../engine/StoryContext";

// 04 REWIND — Signature Moment (signature money shot)
export const RewindScene = memo(function RewindScene() {
  const { frame } = useStory();
  return (
    <ChapterShell index="04" title="REWIND — TIME INVERSION" chapterId="rewind" status="threat">
      <div className="absolute inset-0 grid place-items-center">
        <div className="text-center">
          <div className="tm-font-mono text-[11px] uppercase tracking-[0.5em] text-[color:var(--tm-blue)]">
            TEMPORAL ENGINE · ACTIVE
          </div>
          <div className="mt-6 tm-chapter-text font-bold text-[clamp(1.5rem,4vw,2.75rem)] text-[color:var(--tm-text)]">
            Reversing the attack.
          </div>
          <div className="mt-4 tm-font-mono text-4xl lg:text-6xl tabular-nums tracking-wider text-[color:var(--tm-cyan)]">
            {formatTClock(frame.storyClockSec, frame.timeDirection)}
          </div>
        </div>
      </div>
      <div className="absolute bottom-8 right-8 w-[min(420px,90vw)]">
        <HudFrame>
          <HudLabel>REVERSE PLAYBACK · EVENT RETRACTION</HudLabel>
          <p className="mt-2 text-sm text-[color:var(--tm-text-dim)]">
            Packets retrace their paths. Compromised nodes reset to nominal.
          </p>
        </HudFrame>
      </div>
    </ChapterShell>
  );
});
