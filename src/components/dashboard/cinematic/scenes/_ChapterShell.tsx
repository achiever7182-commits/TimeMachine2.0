import { memo, type ReactNode } from "react";
import { HudFrame } from "../hud/HudFrame";
import { HudLabel } from "../hud/HudLabel";
import { StatusDot, type StatusDotState } from "../hud/StatusDot";
import { ProvenanceBadge } from "../hud/ProvenanceBadge";
import { useStory } from "../engine/StoryContext";
import { formatTClock } from "../engine/storyState";

export interface ChapterShellProps {
  /** Display index (01, 02, …) */
  index: string;
  title: string;
  chapterId: string;
  /** Optional provenance chip in corner. */
  provenance?: "live" | "demo" | "mixed" | "unavailable";
  children?: ReactNode;
  /** Top-left corner status dot state. */
  status?: StatusDotState;
}

export const ChapterShell = memo(function ChapterShell({
  index,
  title,
  chapterId,
  provenance = "demo",
  children,
  status = "nominal",
}: ChapterShellProps) {
  const { frame } = useStory();
  const isActive = frame.chapter === chapterId;
  const clock = formatTClock(frame.storyClockSec, frame.timeDirection);

  return (
    <div
      className="tm-scene-layer"
      aria-hidden={!isActive}
      data-chapter={chapterId}
      style={{
        opacity: isActive ? 1 : 0,
        transition: "opacity 380ms ease",
        pointerEvents: isActive ? "auto" : "none",
      }}
    >
      <div className="absolute inset-0 grid grid-cols-12 grid-rows-12 gap-4 p-5 lg:p-8 pointer-events-none">
        {/* TOP LEFT: chapter header */}
        <div className="col-span-7 sm:col-span-6 lg:col-span-5 row-span-2 pointer-events-auto">
          <HudFrame className="w-full h-full flex flex-col justify-between">
            <div className="flex items-center gap-3 flex-wrap">
              <StatusDot state={status} />
              <HudLabel>CHAPTER {index}</HudLabel>
              <span className="tm-font-mono text-[10px] uppercase tracking-[0.22em] text-[color:var(--tm-text-dim)]">
                {clock}
              </span>
              <ProvenanceBadge provenance={provenance} kind="telemetry" showText={false} />
            </div>
            <div className="mt-2">
              <h2 className="tm-chapter-text font-semibold text-[clamp(1rem,1.5vw,1.5rem)] text-[color:var(--tm-text)] tracking-tight">
                {title}
              </h2>
            </div>
          </HudFrame>
        </div>

        {/* Scene content mount (unopinionated grid area; scenes position themselves absolutely) */}
        {children}
      </div>
    </div>
  );
});
