import { memo, useMemo } from "react";
import { HudFrame } from "../hud/HudFrame";
import { HudLabel } from "../hud/HudLabel";
import { ProvenanceBadge } from "../hud/ProvenanceBadge";
import { StatusDot } from "../hud/StatusDot";
import type { DataProvenance } from "../data/provenance";
import { formatTClock } from "../engine/storyState";

export interface TimelineEntry {
  id: string;
  tOffsetSec: number;
  label: string;
  state?: "done" | "active" | "pending" | "retracted";
  host?: string;
  mitre?: string;
}

export interface TemporalTimelineProps {
  entries: TimelineEntry[];
  /** 0..1 — how far the narrative has progressed along the attack clock (used to highlight active row). */
  progress?: number;
  direction?: 1 | -1;
  provenance?: DataProvenance;
  title?: string;
  /** If direction === -1, rows are retracted from last → first. Otherwise, they light up first → last. */
  rewindProgress?: number;
}

export const TemporalTimeline = memo(function TemporalTimeline({
  entries,
  progress = 1,
  direction = 1,
  provenance = "demo",
  title = "Attack Timeline",
  rewindProgress = 0,
}: TemporalTimelineProps) {
  const rows = useMemo(() => {
    const n = Math.max(1, entries.length);
    return entries.map((e, i) => {
      const pos = direction === 1 ? (i + 1) / n : (n - i) / n;
      let visible = direction === 1 ? pos <= progress : pos <= progress;
      let retracted = false;
      if (direction === -1 && rewindProgress > 0) {
        // rows start retracting from the end (first visually)
        const retractFromEnd = (i + 1) / n;
        retracted = retractFromEnd <= rewindProgress;
        visible = true;
      }
      return { ...e, visible, retracted, index: i };
    });
  }, [entries, progress, direction, rewindProgress]);

  return (
    <HudFrame role="region" aria-label={title}>
      <div className="flex items-center justify-between mb-3 flex-wrap gap-3">
        <HudLabel>{title}</HudLabel>
        <div className="flex items-center gap-3">
          <StatusDot state={direction === -1 ? "warn" : "threat"} />
          <ProvenanceBadge provenance={provenance} kind="attack" />
        </div>
      </div>
      <ol className="tm-font-mono text-[11px] space-y-2">
        {rows.map((r) => (
          <li
            key={r.id}
            className={
              "relative flex items-start gap-3 pl-6 transition-opacity duration-300 " +
              (r.retracted ? "opacity-30" : r.visible ? "opacity-100" : "opacity-0")
            }
          >
            <span
              aria-hidden
              className={
                "absolute left-0 top-[6px] size-2 rounded-full " +
                (r.retracted
                  ? "bg-[color:var(--tm-text-faint)]"
                  : r.state === "active"
                    ? "bg-[color:var(--tm-red)] animate-pulse"
                    : r.visible
                      ? "bg-[color:var(--tm-red)]"
                      : "bg-[color:var(--tm-line-strong)]")
              }
            />
            <span className="tabular-nums text-[color:var(--tm-text-faint)] w-[68px] shrink-0">
              {formatTClock(r.tOffsetSec, direction).slice(1)}
            </span>
            <span className={"flex-1 " + (r.retracted ? "line-through decoration-[color:var(--tm-red)]/40" : "")}>
              <span className="text-[color:var(--tm-text)]">{r.label}</span>
              {(r.host || r.mitre) ? (
                <span className="block text-[color:var(--tm-text-dim)] text-[10px] mt-0.5 truncate">
                  {r.host ? `${r.host}` : ""}
                  {r.mitre ? (r.host ? ` · ${r.mitre}` : r.mitre) : ""}
                  {r.retracted ? (r.host || r.mitre ? " · " : "") + "EVENT RETRACTED" : ""}
                </span>
              ) : r.retracted ? (
                <span className="block text-[color:var(--tm-text-dim)] text-[10px] mt-0.5">EVENT RETRACTED</span>
              ) : null}
            </span>
          </li>
        ))}
      </ol>
    </HudFrame>
  );
});
