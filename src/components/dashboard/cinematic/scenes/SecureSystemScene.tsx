import { memo } from "react";
import { ChapterShell } from "./_ChapterShell";
import { HudFrame } from "../hud/HudFrame";
import { HudLabel } from "../hud/HudLabel";
import { useStory } from "../engine/StoryContext";
import { StatusDot } from "../hud/StatusDot";
import { ProvenanceBadge } from "../hud/ProvenanceBadge";

// 10 SYSTEM SECURED
export const SecureSystemScene = memo(function SecureSystemScene() {
  const { cinematicData } = useStory();
  const checks = cinematicData?.verification.value ?? [];
  return (
    <ChapterShell
      index="10"
      title="SYSTEM SECURED"
      chapterId="secured"
      status="secure"
      provenance={cinematicData?.verification.provenance}
    >
      <div className="absolute top-5 right-6 lg:right-8 w-[min(440px,90vw)]">
        <HudFrame>
          <div className="flex items-center justify-between mb-3">
            <HudLabel>VERIFICATION CHECKS</HudLabel>
            <ProvenanceBadge
              provenance={cinematicData?.verification.provenance ?? "demo"}
              kind="response"
            />
          </div>
          <ol className="tm-font-mono text-[12px] space-y-2">
            {checks.map((c, i) => (
              <li key={c.id} className="flex items-center gap-3">
                <StatusDot state={i < 2 ? "secure" : "off"} />
                <span
                  className={`flex-1 ${i < 2 ? "text-[color:var(--tm-green)]" : "text-[color:var(--tm-text-dim)]"}`}
                >
                  {c.label}
                </span>
              </li>
            ))}
          </ol>
        </HudFrame>
      </div>
      <div className="absolute bottom-8 left-8 max-w-md">
        <HudFrame>
          <HudLabel>INCIDENT STATUS</HudLabel>
          <div className="mt-2 tm-font-mono text-[color:var(--tm-green)] uppercase tracking-[0.2em]">
            CONTAINED · VERIFYING · READY
          </div>
        </HudFrame>
      </div>
    </ChapterShell>
  );
});

// 11 FINALE
export const FinaleScene = memo(function FinaleScene() {
  const { cinematicData, skip } = useStory();
  return (
    <ChapterShell index="11" title="FINALE" chapterId="finale" status="secure">
      <div className="absolute inset-0 grid place-items-center">
        <div className="text-center max-w-2xl px-6">
          <div className="tm-font-mono text-[11px] uppercase tracking-[0.5em] text-[color:var(--tm-green)] mb-8">
            ALL CHECKS VERIFIED · READY
          </div>
          <h2 className="tm-chapter-text font-bold text-[clamp(1.6rem,4vw,2.75rem)] leading-[1.2] tracking-tighter text-[color:var(--tm-text)]">
            <span className="block">Investigate the Past.</span>
            <span className="block">Understand the Present.</span>
            <span className="block text-[color:var(--tm-green)]">
              {cinematicData?.tagline.split(".").pop()?.trim() ?? "Simulate the Future."}
            </span>
          </h2>
          <div className="mt-10 flex items-center justify-center gap-3 flex-wrap pointer-events-auto">
            <button className="tm-btn" data-variant="primary" onClick={skip} type="button">
              ENTER OPERATIONAL VIEW
            </button>
            <a className="tm-btn" href="/incidents">
              INCIDENT LIST →
            </a>
          </div>
          <p className="mt-10 tm-font-mono text-[10px] uppercase tracking-[0.3em] text-[color:var(--tm-text-faint)]">
            TIME MACHINE · CINEMATIC COMMAND CENTER
          </p>
        </div>
      </div>
    </ChapterShell>
  );
});
