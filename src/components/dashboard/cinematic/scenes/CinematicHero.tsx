import { memo } from "react";
import { ChapterShell } from "./_ChapterShell";
import { useStory } from "../engine/StoryContext";
import { HudFrame } from "../hud/HudFrame";
import { HudLabel } from "../hud/HudLabel";

// Chapter 00 — Hero / Welcome (mounted 0.00–0.07)
export const CinematicHero = memo(function CinematicHero() {
  const { cinematicData } = useStory();
  return (
    <ChapterShell
      index="00"
      title="TIME MACHINE · COMMAND CENTER"
      chapterId="hero"
      status="nominal"
    >
      <div className="absolute inset-0 grid place-items-center pointer-events-none">
        <div className="text-center max-w-xl px-6">
          <div className="tm-font-mono text-[11px] uppercase tracking-[0.5em] text-[color:var(--tm-text-dim)] mb-6">
            Incident Response · Attack Reconstruction
          </div>
          <h1 className="tm-chapter-text font-bold text-[clamp(2rem,5vw,3.5rem)] tracking-tighter leading-[1.05] text-[color:var(--tm-text)] mb-6">
            <span className="block">Investigate the Past.</span>
            <span className="block text-[color:var(--tm-cyan)]">Understand the Present.</span>
            <span className="block">Simulate the Future.</span>
          </h1>
          <HudFrame padding="sm" className="inline-block">
            <HudLabel>SCROLL TO BEGIN</HudLabel>
          </HudFrame>
        </div>
      </div>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 pointer-events-none">
        <div className="tm-font-mono text-[10px] uppercase tracking-[0.3em] text-[color:var(--tm-text-faint)] animate-pulse">
          {cinematicData?.incident.value?.id ?? "INC-2048"} · READY
        </div>
      </div>
    </ChapterShell>
  );
});
