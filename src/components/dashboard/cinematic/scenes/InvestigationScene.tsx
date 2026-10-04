import { memo } from "react";
import { ChapterShell } from "./_ChapterShell";
import { HudFrame } from "../hud/HudFrame";
import { HudLabel } from "../hud/HudLabel";
import { useStory } from "../engine/StoryContext";
import { ProvenanceBadge } from "../hud/ProvenanceBadge";

// 06 TRACE
export const InvestigationScene = memo(function InvestigationScene() {
  const { cinematicData } = useStory();
  const inv = cinematicData?.investigation.value;
  return (
    <ChapterShell
      index="06"
      title="TRACE · CORRELATION ENGINE"
      chapterId="trace"
      status="warn"
      provenance={cinematicData?.investigation.provenance}
    >
      <div className="absolute top-5 right-6 lg:right-8 w-[min(360px,90vw)]">
        <HudFrame>
          <div className="flex items-center justify-between mb-3">
            <HudLabel>INVESTIGATION</HudLabel>
            <ProvenanceBadge
              provenance={cinematicData?.investigation.provenance ?? "demo"}
              kind="investigation"
            />
          </div>
          <dl className="tm-font-mono text-[12px] grid grid-cols-2 gap-y-2">
            <dt className="text-[color:var(--tm-text-dim)]">EVENTS CORRELATED</dt>
            <dd className="text-right tabular-nums">{inv?.eventsCorrelated ?? 0}</dd>
            <dt className="text-[color:var(--tm-text-dim)]">HOSTS AFFECTED</dt>
            <dd className="text-right tabular-nums">{inv?.hostsAffected ?? 0}</dd>
            <dt className="text-[color:var(--tm-text-dim)]">PROCESSES</dt>
            <dd className="text-right tabular-nums">{inv?.processesInvolved ?? 0}</dd>
            <dt className="text-[color:var(--tm-text-dim)]">CONNECTIONS</dt>
            <dd className="text-right tabular-nums">{inv?.networkConnections ?? 0}</dd>
            <dt className="text-[color:var(--tm-text-dim)]">EVIDENCE</dt>
            <dd className="text-right tabular-nums text-[color:var(--tm-cyan)]">
              {inv?.evidenceItems ?? 0}
            </dd>
          </dl>
        </HudFrame>
      </div>
    </ChapterShell>
  );
});
