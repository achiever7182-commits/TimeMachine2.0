import { memo } from "react";
import { ChapterShell } from "./_ChapterShell";
import { HudFrame } from "../hud/HudFrame";
import { HudLabel } from "../hud/HudLabel";
import { useStory } from "../engine/StoryContext";

// 02 INTRUSION DETECTED
export const ThreatDetectionScene = memo(function ThreatDetectionScene() {
  const { frame } = useStory();
  const flicker = frame.chapterProgress > 0.5;
  return (
    <ChapterShell
      index="02"
      title="INTRUSION DETECTED"
      chapterId="intrusion"
      status={flicker ? "warn" : "nominal"}
    >
      <div className="absolute top-5 right-6 lg:right-8 w-[min(360px,90vw)]">
        <HudFrame>
          <div className="flex items-center justify-between">
            <HudLabel>ANOMALY CARD</HudLabel>
            <span className="tm-font-mono text-[10px] text-[color:var(--tm-amber)] uppercase tracking-[0.2em]">
              ALT-0812
            </span>
          </div>
          <div className="mt-3 text-sm text-[color:var(--tm-text)]">
            <div className="tm-font-mono text-[11px] text-[color:var(--tm-text-dim)]">
              VPN · 09:44:03 UTC
            </div>
            <div className="mt-1 font-medium">Brute-force credential attempt cluster.</div>
            <div className="mt-2 text-xs text-[color:var(--tm-text-dim)]">
              Source signals: failed authentication + impossible travel + lateral burst candidate.
            </div>
          </div>
        </HudFrame>
      </div>
      <div className="absolute bottom-8 left-8 max-w-md">
        <HudFrame>
          <HudLabel>THREAT LEVEL</HudLabel>
          <div className="mt-2 tm-font-mono text-[color:var(--tm-amber)] uppercase tracking-[0.2em] animate-pulse">
            ELEVATED
          </div>
        </HudFrame>
      </div>
    </ChapterShell>
  );
});
