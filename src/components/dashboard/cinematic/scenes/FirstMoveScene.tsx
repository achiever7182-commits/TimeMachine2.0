import { memo } from "react";
import { ChapterShell } from "./_ChapterShell";
import { HudFrame } from "../hud/HudFrame";
import { HudLabel } from "../hud/HudLabel";

// "WE FOUND THE FIRST MOVE" + Reconstruction (0.52–0.68)
export const FirstMoveScene = memo(function FirstMoveScene() {
  return (
    <ChapterShell
      index="05"
      title="FIRST MOVE IDENTIFIED"
      chapterId="reconstruction"
      status="nominal"
    >
      <div className="absolute inset-0 grid place-items-center">
        <div className="text-center max-w-2xl px-6">
          <div className="tm-font-mono text-[11px] uppercase tracking-[0.5em] text-[color:var(--tm-text-faint)]">
            FORENSIC RECONSTRUCTION · COMPLETE
          </div>
          <div className="mt-6 tm-chapter-text font-bold text-[clamp(1.75rem,4vw,3rem)] text-[color:var(--tm-text)] leading-[1.1]">
            We found the <span className="text-[color:var(--tm-cyan)]">first move</span>.
          </div>
          <p className="mt-5 text-[color:var(--tm-text-dim)] leading-relaxed">
            T+00:00:00 — an impossible-travel login on VPN-GW-01. Detection took 03:18 hours. TIME
            MACHINE saw it in the first 00:05 minutes.
          </p>
        </div>
      </div>
    </ChapterShell>
  );
});

export const AttackReconstructionScene = memo(function AttackReconstructionScene() {
  return (
    <ChapterShell
      index="05"
      title="ATTACK RECONSTRUCTION"
      chapterId="reconstruction"
      status="nominal"
    >
      <div className="absolute bottom-8 left-8 right-8 lg:right-auto lg:w-[min(560px,90vw)]">
        <HudFrame>
          <HudLabel>INTERACTIVE FORENSIC VIEW</HudLabel>
          <p className="mt-2 text-sm text-[color:var(--tm-text-dim)]">
            Click any node to inspect the evidence chain. Graph ordered from entry → impact.
          </p>
        </HudFrame>
      </div>
    </ChapterShell>
  );
});
