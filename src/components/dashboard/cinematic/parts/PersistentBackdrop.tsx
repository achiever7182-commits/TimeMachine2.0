import { memo } from "react";
import { ScanLines } from "../hud/ScanLines";
import { GridBackdrop } from "../hud/GridBackdrop";
import { useStory } from "../engine/StoryContext";
import { threatFromLevel } from "../engine/storyState";

export const PersistentBackdrop = memo(function PersistentBackdrop() {
  const { frame, reducedMotion } = useStory();
  const vig = threatFromLevel(frame.threatLevel);
  const threat = vig.kind === "threat" ? vig.alpha : 0;
  const rewind = vig.kind === "rewind" ? vig.alpha : 0;
  const verify = vig.kind === "verify" ? vig.alpha : 0;
  return (
    <div
      className="absolute inset-0 z-0"
      style={
        {
          "--tm-threat-alpha": String(threat),
          "--tm-rewind-alpha": String(rewind),
          "--tm-verify-alpha": String(verify),
          "--tm-scan-speed": frame.networkTheme === "red" ? "1.6s" : "3.6s",
          "--tm-scanline-opacity": reducedMotion ? "0.05" : "0.22",
        } as React.CSSProperties
      }
    >
      <GridBackdrop />
      <ScanLines opacity={reducedMotion ? 0.05 : 0.22} />
      <div className="tm-threat-vignette" aria-hidden />
      <div className="tm-rewind-vignette" aria-hidden />
      <div className="tm-secure-vignette" aria-hidden />
    </div>
  );
});
