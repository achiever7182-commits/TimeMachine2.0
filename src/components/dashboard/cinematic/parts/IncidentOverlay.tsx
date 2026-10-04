import { memo } from "react";
import { useStory } from "../engine/StoryContext";
import { HudFrame } from "../hud/HudFrame";
import { HudLabel } from "../hud/HudLabel";
import { ProvenanceBadge } from "../hud/ProvenanceBadge";

export const IncidentOverlay = memo(function IncidentOverlay() {
  const { cinematicData } = useStory();
  const inc = cinematicData?.incident.value;
  return (
    <div className="absolute top-5 left-1/2 -translate-x-1/2 w-[min(560px,92vw)] z-30 pointer-events-none">
      <HudFrame padding="sm" className="pointer-events-auto">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-3">
            <HudLabel>INCIDENT</HudLabel>
            <span className="tm-font-mono text-[12px] text-[color:var(--tm-text)]">
              {inc?.id ?? "INC-2048"}
            </span>
            <span className="tm-font-mono text-[10px] uppercase tracking-[0.2em] text-[color:var(--tm-amber)]">
              SEVERITY · {inc?.severity?.toUpperCase() ?? "CRITICAL"}
            </span>
          </div>
          <ProvenanceBadge
            provenance={cinematicData?.incident.provenance ?? "demo"}
            kind="incident"
          />
        </div>
      </HudFrame>
    </div>
  );
});
