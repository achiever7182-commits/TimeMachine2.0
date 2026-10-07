import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  Activity,
  ArrowLeft,
  ArrowRight,
  Bookmark,
  ChevronLeft,
  ChevronRight,
  Clock,
  Compass,
  Eye,
  Pause,
  Play,
  RotateCcw,
  Search,
  Shield,
  ShieldAlert,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlassPanel, PageHeader } from "@/components/layout/PageHeader";
import { useDemo } from "@/context/DemoContext";
import { DigitalTwinGraph } from "./DigitalTwinGraph";
import { DigitalTwinInspector } from "./DigitalTwinInspector";
import { ForensicTimeline } from "@/components/timeline/ForensicTimeline";
import { IrisInvestigationPanel } from "@/components/iris/IrisInvestigationPanel";
import { cn } from "@/lib/utils";

export function DigitalTwinView() {
  const {
    incident,
    digitalTwin,
    currentTime,
    currentRisk,
    incidentStage,
    isAttackRunning,
    isPaused,
    investigationMode,
    toggleInvestigationMode,
    stepForward,
    stepBack,
    jumpToNextEvent,
    jumpToPreviousEvent,
    rewindToStart,
    goToDetection,
    startAttackSimulation,
    pauseSimulation,
    resumeSimulation,
    resetDemo,
  } = useDemo();

  const [viewPerspective, setViewPerspective] = useState<"ACTUAL" | "KNOWN">("ACTUAL");

  const blastRadius = digitalTwin.blastRadius;
  const isCritical = currentRisk === "CRITICAL" || currentRisk === "Critical";
  const isHigh = currentRisk === "HIGH" || currentRisk === "High";

  return (
    <div className="mx-auto max-w-[1600px] animate-fade-in space-y-6">
      {/* Top Header */}
      <PageHeader
        eyebrow={`Virtual Digital Twin · ${incident.id}`}
        title="Organization Digital Twin"
        description="Reconstruct the complete synthetic enterprise state at any moment during the incident."
        actions={
          <div className="flex flex-wrap items-center gap-2">
            {/* View Mode: Actual vs SOC Known */}
            <div className="flex items-center rounded-lg border border-border bg-secondary/40 p-1 text-xs font-mono">
              <button
                type="button"
                onClick={() => setViewPerspective("ACTUAL")}
                className={cn(
                  "rounded px-2.5 py-1 transition-colors",
                  viewPerspective === "ACTUAL"
                    ? "bg-primary/20 text-cyan-signal font-semibold"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                Actual Environment
              </button>
              <button
                type="button"
                onClick={() => setViewPerspective("KNOWN")}
                className={cn(
                  "rounded px-2.5 py-1 transition-colors",
                  viewPerspective === "KNOWN"
                    ? "bg-primary/20 text-cyan-signal font-semibold"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                SOC Known State
              </button>
            </div>

            {/* Investigation Mode Toggle (Requirement 21) */}
            <Button
              variant={investigationMode ? "default" : "outline"}
              size="sm"
              onClick={toggleInvestigationMode}
              className={cn(
                "gap-1.5 font-mono text-xs",
                investigationMode && "border-cyan-glow shadow-glow text-foreground"
              )}
            >
              <Compass className="size-3.5" />
              {investigationMode ? "Investigation Mode ON" : "Investigation Mode"}
            </Button>

            {/* Primary Navigation to Timeline */}
            <Button asChild size="sm" variant="secondary" className="gap-1.5 font-mono text-xs">
              <Link to="/time-machine">
                Timeline Machine <ArrowRight className="size-3.5" />
              </Link>
            </Button>
          </div>
        }
      />

      {/* Forensic Timeline Controller (Requirement 2, 12, 18) */}
      <ForensicTimeline />

      {/* Main Digital Twin Grid: Topology Map + Entity Inspector */}
      <div className="grid gap-6 xl:grid-cols-[1fr_380px]">
        {/* Left Side: 2D Graph Map + Blast Radius Bar */}
        <div className="space-y-4">
          <DigitalTwinGraph viewMode={viewPerspective} />

          {/* Blast Radius Summary Strip (Requirement 24) */}
          <GlassPanel className="p-4">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-cyan-signal">
                  Simulated Blast Radius
                </p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  Temporal impact calculated at <span className="font-mono text-foreground">{currentTime}</span>
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-xs font-mono">
                <div className="rounded border border-threat/30 bg-threat/10 px-3 py-1.5">
                  <span className="text-muted-foreground">Compromised Assets: </span>
                  <strong className="text-threat">{blastRadius.confirmedAffectedAssets}</strong>
                </div>

                <div className="rounded border border-amber-400/30 bg-amber-400/10 px-3 py-1.5">
                  <span className="text-muted-foreground">Exposed Stores: </span>
                  <strong className="text-amber-400">{blastRadius.dataResourcesAtRisk}</strong>
                </div>

                <div className="rounded border border-primary/30 bg-primary/10 px-3 py-1.5">
                  <span className="text-muted-foreground">Active Sessions: </span>
                  <strong className="text-cyan-signal">{digitalTwin.activeSessions.length}</strong>
                </div>

                <div className="rounded border border-border bg-secondary/40 px-3 py-1.5">
                  <span className="text-muted-foreground">Total Telemetry: </span>
                  <strong className="text-foreground">{digitalTwin.evidence.length} items</strong>
                </div>
              </div>
            </div>
          </GlassPanel>
        </div>

        {/* Right Side: Data-driven Inspector */}
        <div>
          <DigitalTwinInspector />
        </div>
      </div>

      {/* Contextual IRIS Panel (Phase 5 Requirement 26) */}
      <IrisInvestigationPanel
        title="IRIS Digital Twin Telemetry Assistant"
        defaultPrompt="What changed at this time?"
        suggestedQuestions={[
          "What changed at this time?",
          "Which assets were compromised?",
          "What did defenders know at this moment?",
          "What evidence supports this finding?",
        ]}
        compact={true}
      />
    </div>
  );
}
