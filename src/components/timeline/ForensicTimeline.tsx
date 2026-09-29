import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  Bookmark,
  BookmarkCheck,
  ChevronLeft,
  ChevronRight,
  Clock,
  Compass,
  Database,
  ExternalLink,
  Eye,
  FileCode,
  HardDrive,
  Laptop,
  Layers,
  Network,
  Pause,
  Play,
  Plus,
  Radio,
  RotateCcw,
  Search,
  Server,
  Shield,
  ShieldAlert,
  Sparkles,
  Terminal,
  UserRound,
  X,
  ZoomIn,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlassPanel } from "@/components/layout/PageHeader";
import { useDemo } from "@/context/DemoContext";
import { demoTimelineEvents } from "@/data/incidentData";
import { AssetStateBadge } from "@/components/digital-twin/AssetStateBadge";
import { cn } from "@/lib/utils";
import type { TimelineBookmark, TimelineZoom } from "@/types/digitalTwin";
import type { TimelineEvent } from "@/types/incident";

export function ForensicTimeline() {
  const {
    currentMinute,
    setCurrentMinute,
    currentTime,
    currentRisk,
    incidentStage,
    isAttackRunning,
    isPaused,
    startAttackSimulation,
    pauseSimulation,
    resumeSimulation,
    stepForward,
    stepBack,
    jumpToNextEvent,
    jumpToPreviousEvent,
    rewindToStart,
    goToDetection,
    timelineZoom,
    setTimelineZoom,
    bookmarks,
    addBookmark,
    jumpToBookmark,
    investigationMode,
    setSelectedEntityId,
    selectedEventId,
    setSelectedEventId,
  } = useDemo();

  const [isBookmarkDialogOpen, setIsBookmarkDialogOpen] = useState(false);
  const [bookmarkName, setBookmarkName] = useState("");

  // Inspecting Event Detail
  const activeInspectedEvent = demoTimelineEvents.find((e) => e.id === selectedEventId) ?? null;

  // Zoom filtering
  // OVERVIEW: only major anchor events (09:42, 10:00, 10:07, 10:12, 10:24)
  // INCIDENT: all 9 standard events
  // FORENSIC: all 9 events + sub-telemetry markers
  const visibleEvents =
    timelineZoom === "OVERVIEW"
      ? demoTimelineEvents.filter((e) => ["evt-0942", "evt-1000", "evt-1007", "evt-1012", "evt-1024"].includes(e.id))
      : demoTimelineEvents;

  const handleCreateBookmark = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookmarkName.trim()) return;
    addBookmark(bookmarkName.trim());
    setBookmarkName("");
    setIsBookmarkDialogOpen(false);
  };

  return (
    <GlassPanel className="overflow-hidden border-border p-5">
      {/* Top Header Controls: Playback, Zoom, Bookmarks, and Current Time */}
      <div className="flex flex-col gap-4 border-b border-border pb-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-3">
          <span className="grid size-9 place-items-center rounded-lg bg-primary/15 text-cyan-signal">
            <Clock className="size-4" />
          </span>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-base font-bold text-foreground">{currentTime}</span>
              <span
                className={cn(
                  "rounded-full border px-2 py-0.2 font-mono text-[10px] font-semibold uppercase",
                  currentRisk === "CRITICAL"
                    ? "border-threat/40 bg-threat/10 text-threat"
                    : currentRisk === "HIGH"
                    ? "border-warning/40 bg-warning/10 text-warning"
                    : "border-cyan-glow bg-primary/10 text-cyan-signal"
                )}
              >
                {currentRisk}
              </span>
              <span className="font-mono text-xs text-muted-foreground uppercase">
                [{incidentStage}]
              </span>
            </div>
            <p className="text-xs text-muted-foreground">Forensic Time Controller & Virtual Twin Synchronizer</p>
          </div>
        </div>

        {/* Playback Control Bar (Requirement 19) */}
        <div className="flex flex-wrap items-center gap-1.5">
          <Button
            size="sm"
            variant="outline"
            onClick={rewindToStart}
            title="Rewind to Start (09:42)"
            className="size-8 p-0"
          >
            <RotateCcw className="size-3.5" />
          </Button>

          <Button
            size="sm"
            variant="outline"
            onClick={jumpToPreviousEvent}
            title="Previous Event"
            className="size-8 p-0"
          >
            <ChevronLeft className="size-4" />
          </Button>

          <Button
            size="sm"
            variant="outline"
            onClick={stepBack}
            title="Step Back (-1m)"
            className="px-2 text-xs font-mono"
          >
            -1m
          </Button>

          {/* Main Play/Pause */}
          {!isAttackRunning && !isPaused ? (
            <Button size="sm" onClick={startAttackSimulation} className="gap-1.5 px-3 text-xs">
              <Play className="size-3.5" /> Play
            </Button>
          ) : isAttackRunning ? (
            <Button size="sm" variant="secondary" onClick={pauseSimulation} className="gap-1.5 px-3 text-xs">
              <Pause className="size-3.5" /> Pause
            </Button>
          ) : (
            <Button size="sm" onClick={resumeSimulation} className="gap-1.5 px-3 text-xs">
              <Play className="size-3.5" /> Resume
            </Button>
          )}

          <Button
            size="sm"
            variant="outline"
            onClick={stepForward}
            title="Step Forward (+1m)"
            className="px-2 text-xs font-mono"
          >
            +1m
          </Button>

          <Button
            size="sm"
            variant="outline"
            onClick={jumpToNextEvent}
            title="Next Event"
            className="size-8 p-0"
          >
            <ChevronRight className="size-4" />
          </Button>

          <Button
            size="sm"
            variant="outline"
            onClick={goToDetection}
            title="Go to Detection (10:24)"
            className="px-2 text-xs font-mono"
          >
            10:24
          </Button>

          <div className="mx-1 h-5 w-px bg-border" />

          {/* Zoom Buttons (Requirement 13) */}
          <div className="flex items-center rounded-lg border border-border bg-secondary/35 p-0.5 text-xs font-mono">
            {(["OVERVIEW", "INCIDENT", "FORENSIC"] as TimelineZoom[]).map((zm) => (
              <button
                key={zm}
                type="button"
                onClick={() => setTimelineZoom(zm)}
                className={cn(
                  "rounded px-2 py-0.5 text-[10px] transition-colors",
                  timelineZoom === zm
                    ? "bg-primary/20 text-cyan-signal font-semibold"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {zm}
              </button>
            ))}
          </div>

          {/* Bookmark Button (Requirement 20) */}
          <Button
            size="sm"
            variant="outline"
            onClick={() => setIsBookmarkDialogOpen(true)}
            className="gap-1 px-2.5 text-xs font-mono"
            title="Bookmark Current Time"
          >
            <Bookmark className="size-3.5 text-cyan-signal" /> Pin
          </Button>
        </div>
      </div>

      {/* Bookmarks Strip (Requirement 20) */}
      {bookmarks.length > 0 ? (
        <div className="flex flex-wrap items-center gap-2 pt-3">
          <span className="font-mono text-[10px] uppercase text-muted-foreground tracking-wider">
            Bookmarks:
          </span>
          {bookmarks.map((bmk) => {
            const isAtTime = bmk.minute === currentMinute;
            return (
              <button
                key={bmk.id}
                type="button"
                onClick={() => jumpToBookmark(bmk.id)}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-md border px-2 py-1 font-mono text-[11px] transition-colors",
                  isAtTime
                    ? "border-cyan-glow bg-primary/20 text-cyan-signal font-semibold shadow-glow"
                    : "border-border bg-secondary/30 text-muted-foreground hover:text-foreground hover:border-cyan-signal/40"
                )}
              >
                <BookmarkCheck className="size-3 text-cyan-signal" />
                <span className="font-bold">{bmk.timestamp}</span>
                <span className="opacity-80 truncate max-w-[120px]">{bmk.name}</span>
              </button>
            );
          })}
        </div>
      ) : null}

      {/* Main Forensic Timeline Ruler & Event Markers */}
      <div className="overflow-x-auto pt-6 pb-2">
        <div className="min-w-[960px]">
          <div
            className="relative grid gap-2 pt-2"
            style={{ gridTemplateColumns: `repeat(${visibleEvents.length}, minmax(0, 1fr))` }}
          >
            {/* Background connection bar */}
            <div className="absolute left-[4%] right-[4%] top-[24px] h-0.5 bg-border" />

            {/* Glowing active progress bar */}
            <div
              className="absolute left-[4%] top-[23px] h-1 bg-cyan-signal transition-all duration-300 shadow-glow"
              style={{ width: `${(currentMinute / 42) * 92}%` }}
            />

            {/* Event Markers */}
            {visibleEvents.map((event) => {
              const eventMinute = event.minute ?? 0;
              const happened = eventMinute <= currentMinute;
              const isExact = eventMinute === currentMinute;
              const isSelected = selectedEventId === event.id;

              return (
                <div
                  key={event.id}
                  onClick={() => {
                    setCurrentMinute(eventMinute);
                    setSelectedEventId(event.id);
                  }}
                  className={cn(
                    "group relative cursor-pointer text-center transition-transform hover:-translate-y-0.5",
                    isSelected && "scale-105"
                  )}
                >
                  {/* Pin Dot */}
                  <span
                    className={cn(
                      "relative z-10 mx-auto block size-3.5 rounded-full border transition-all",
                      isExact
                        ? "border-cyan-signal bg-cyan-signal ring-4 ring-cyan-signal/25 shadow-glow"
                        : happened
                        ? "border-cyan-signal bg-cyan-signal/80"
                        : "border-border bg-card"
                    )}
                  />

                  {/* Timestamp */}
                  <p
                    className={cn(
                      "mt-3 font-mono text-xs font-semibold",
                      happened ? "text-foreground" : "text-muted-foreground"
                    )}
                  >
                    {event.time ?? event.timestamp}
                  </p>

                  {/* Title / Label */}
                  <p
                    className={cn(
                      "mt-1 text-[11px] leading-tight line-clamp-2 px-1",
                      happened ? "text-cyan-signal font-medium" : "text-muted-foreground"
                    )}
                  >
                    {event.title}
                  </p>

                  {/* Category Pill in Forensic view */}
                  {timelineZoom === "FORENSIC" ? (
                    <span className="mt-1.5 inline-block rounded bg-secondary px-1.5 py-0.2 font-mono text-[9px] text-muted-foreground uppercase">
                      {event.category}
                    </span>
                  ) : null}
                </div>
              );
            })}
          </div>

          {/* Continuous Interactive Range Slider */}
          <div className="mt-7">
            <input
              id="timeline-range"
              className="timeline-range w-full"
              type="range"
              min="0"
              max="42"
              step="1"
              value={currentMinute}
              onChange={(e) => setCurrentMinute(Number(e.target.value))}
              aria-label="Incident time"
            />
          </div>
        </div>
      </div>

      {/* Forensic Event Detail Panel (Requirement 14 & 15: Event Correlation) */}
      {activeInspectedEvent ? (
        <div className="mt-5 rounded-xl border border-cyan-glow/60 bg-secondary/40 p-4 animate-scale-in">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono text-xs font-semibold text-cyan-signal">
                  {activeInspectedEvent.id}
                </span>
                <span className="rounded bg-primary/20 px-2 py-0.2 font-mono text-[10px] font-semibold text-cyan-signal uppercase">
                  {activeInspectedEvent.category}
                </span>
                <span className="rounded bg-threat/20 px-2 py-0.2 font-mono text-[10px] font-semibold text-threat uppercase">
                  {activeInspectedEvent.severity}
                </span>
                <span className="font-mono text-xs text-muted-foreground">
                  Timestamp: {activeInspectedEvent.timestamp}
                </span>
              </div>
              <h4 className="mt-1.5 text-base font-bold text-foreground">
                {activeInspectedEvent.title}
              </h4>
              <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                {activeInspectedEvent.description}
              </p>
            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSelectedEventId(null)}
              className="size-7"
            >
              <X className="size-4" />
            </Button>
          </div>

          {/* Correlated Entities & Jump Buttons (Requirement 14 & 15) */}
          <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-border pt-3">
            <span className="font-mono text-xs text-muted-foreground">Correlated Targets:</span>
            {activeInspectedEvent.affectedAssetIds.map((assetId) => (
              <Button
                key={assetId}
                size="sm"
                variant="outline"
                className="h-7 text-xs font-mono"
                onClick={() => setSelectedEntityId(assetId)}
              >
                VIEW ASSET ({assetId})
              </Button>
            ))}

            <Button asChild size="sm" variant="secondary" className="h-7 text-xs font-mono gap-1">
              <Link to="/evidence">
                VIEW RELATED EVIDENCE <ExternalLink className="size-3" />
              </Link>
            </Button>

            <Button asChild size="sm" variant="outline" className="h-7 text-xs font-mono gap-1">
              <Link to="/attack-graph">
                VIEW ATTACK PATH <ExternalLink className="size-3" />
              </Link>
            </Button>
          </div>
        </div>
      ) : null}

      {/* Bookmark Modal */}
      {isBookmarkDialogOpen ? (
        <div className="fixed inset-0 z-50 grid place-items-center bg-background/80 backdrop-blur-sm p-4 animate-fade-in">
          <div className="w-full max-w-md rounded-xl border border-border bg-card p-6 shadow-2xl">
            <h3 className="text-lg font-bold text-foreground">Add Forensic Bookmark</h3>
            <p className="mt-1 text-xs text-muted-foreground">
              Save current simulation time <strong className="font-mono text-cyan-signal">{currentTime}</strong> as an investigation marker.
            </p>

            <form onSubmit={handleCreateBookmark} className="mt-4 space-y-4">
              <div>
                <label className="text-xs font-mono text-muted-foreground">Bookmark Label</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Lateral Movement Observed"
                  value={bookmarkName}
                  onChange={(e) => setBookmarkName(e.target.value)}
                  className="mt-1.5 w-full rounded-lg border border-input bg-input/40 px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-cyan-signal"
                />
              </div>

              <div className="flex justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setIsBookmarkDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" size="sm">
                  Save Bookmark
                </Button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </GlassPanel>
  );
}
