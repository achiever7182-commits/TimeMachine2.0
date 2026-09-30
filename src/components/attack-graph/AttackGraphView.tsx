import { useState, useMemo, useCallback } from "react";
import { useNavigate } from "@tanstack/react-router";
import {
  ShieldAlert,
  Clock,
  Compass,
  Zap,
  Play,
  RotateCcw,
  Sparkles,
  Info,
  ChevronRight,
  Flame,
} from "lucide-react";
import { useDemo } from "@/context/DemoContext";
import { filterAttackGraph } from "@/services/attackGraphService";
import type { AttackGraphFilter } from "@/types/attackGraph";
import { AttackGraphCanvas } from "./AttackGraphCanvas";
import { AttackGraphFilters } from "./AttackGraphFilters";
import { AttackGraphInspector } from "./AttackGraphInspector";
import { GraphLegend } from "./GraphLegend";

export function AttackGraphView() {
  const navigate = useNavigate();
  const {
    attackGraph,
    currentMinute,
    currentTime,
    setCurrentMinute,
    selectedEntityId,
    setSelectedEntityId,
    selectedEdgeId,
    setSelectedEdgeId,
    highlightedPathId,
    setHighlightedPathId,
    clearHighlightedPath,
    currentRisk,
    incidentStage,
    setSelectedEventId,
  } = useDemo();

  // Graph filters state
  const [filters, setFilters] = useState<AttackGraphFilter>({
    nodeType: "ALL",
    status: "ALL",
    relationship: "ALL",
    searchQuery: "",
  });

  const handleResetFilters = useCallback(() => {
    setFilters({
      nodeType: "ALL",
      status: "ALL",
      relationship: "ALL",
      searchQuery: "",
    });
  }, []);

  // Filtered nodes and edges for display (non-destructive)
  const { nodes: displayedNodes, edges: displayedEdges } = useMemo(() => {
    return filterAttackGraph(attackGraph, filters);
  }, [attackGraph, filters]);

  // Selected Node / Edge resolution
  const selectedNode = useMemo(() => {
    if (!selectedEntityId) return null;
    return attackGraph.nodes.find((n) => n.id === selectedEntityId) ?? null;
  }, [attackGraph.nodes, selectedEntityId]);

  const selectedEdge = useMemo(() => {
    if (!selectedEdgeId) return null;
    return attackGraph.edges.find((e) => e.id === selectedEdgeId) ?? null;
  }, [attackGraph.edges, selectedEdgeId]);

  const handleSelectNode = useCallback(
    (nodeId: string) => {
      setSelectedEntityId(nodeId);
      setSelectedEdgeId(null);
    },
    [setSelectedEntityId, setSelectedEdgeId]
  );

  const handleSelectEdge = useCallback(
    (edgeId: string) => {
      setSelectedEdgeId(edgeId);
      setSelectedEntityId(null);
    },
    [setSelectedEdgeId, setSelectedEntityId]
  );

  // Focus Entry Point (Requirement 16)
  const handleFocusEntryPoint = useCallback(() => {
    if (attackGraph.entryPoint) {
      handleSelectNode(attackGraph.entryPoint.id);
    }
  }, [attackGraph.entryPoint, handleSelectNode]);

  // Path Highlighting toggle (Requirement 19)
  const handleTogglePath = useCallback(() => {
    if (highlightedPathId) {
      clearHighlightedPath();
    } else if (attackGraph.activePath) {
      setHighlightedPathId(attackGraph.activePath.pathId);
    }
  }, [highlightedPathId, clearHighlightedPath, attackGraph.activePath, setHighlightedPathId]);

  // Navigate to Timeline with filtered event
  const handleViewTimelineEvents = useCallback(
    (eventIds: string[]) => {
      if (eventIds.length > 0) {
        setSelectedEventId(eventIds[0] ?? null);
      }
      navigate({ to: "/time-machine" });
    },
    [navigate, setSelectedEventId]
  );

  // Navigate to Evidence
  const handleViewEvidence = useCallback(
    (_evidenceIds: string[]) => {
      navigate({ to: "/evidence" });
    },
    [navigate]
  );

  return (
    <div className="space-y-4">
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-border/80 bg-card/60 p-4 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-lg bg-cyan-signal/10 border border-cyan-signal/30 text-cyan-signal">
            <Compass className="size-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold tracking-tight text-foreground">ATTACK GRAPH</h1>
              <span className="rounded bg-secondary/80 px-2 py-0.5 font-mono text-xs font-semibold text-muted-foreground">
                INC-2048
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              Dynamic forensic graph reconstructed at <strong className="text-foreground font-mono">{currentTime}</strong> (T+{currentMinute}m)
            </p>
          </div>
        </div>

        {/* Status badges & Quick Controls */}
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="flex items-center gap-1.5 rounded-lg border border-border/70 bg-secondary/30 px-3 py-1.5 text-xs">
            <Clock className="size-3.5 text-cyan-signal" />
            <span className="text-muted-foreground">Stage:</span>
            <span className="font-semibold text-foreground">{incidentStage}</span>
          </div>

          <div className="flex items-center gap-1.5 rounded-lg border border-border/70 bg-secondary/30 px-3 py-1.5 text-xs">
            <ShieldAlert className="size-3.5 text-threat" />
            <span className="text-muted-foreground">Risk:</span>
            <span className="font-bold text-threat uppercase">{currentRisk}</span>
          </div>

          {/* Quick jump to Entry Point */}
          <button
            onClick={handleFocusEntryPoint}
            className="flex items-center gap-1.5 rounded-lg border border-cyan-signal/40 bg-cyan-signal/10 px-3 py-1.5 text-xs font-medium text-cyan-signal hover:bg-cyan-signal/20 transition-colors"
          >
            <Compass className="size-3.5" />
            Entry Point ({attackGraph.entryPoint?.id ?? "ATTACKER"})
          </button>

          {/* Active Kill Chain Path Toggle */}
          <button
            onClick={handleTogglePath}
            className={`flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors ${
              highlightedPathId
                ? "border-threat bg-threat/20 text-threat shadow-[0_0_12px_rgba(239,68,68,0.3)]"
                : "border-border bg-secondary/40 text-foreground hover:bg-secondary/70"
            }`}
          >
            <Zap className="size-3.5" />
            {highlightedPathId ? "Clear Path" : "Highlight Active Kill Chain"}
          </button>
        </div>
      </div>

      {/* Blast Radius Summary strip */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded-lg border border-threat/40 bg-threat/10 p-3">
          <div className="flex items-center justify-between text-xs text-threat font-semibold">
            <span>Confirmed Affected</span>
            <Flame className="size-3.5" />
          </div>
          <p className="mt-1 font-mono text-xl font-bold text-foreground">
            {attackGraph.blastRadius.confirmedAffectedAssets}
          </p>
          <p className="text-[10px] text-muted-foreground truncate">
            {attackGraph.compromisedNodes.map((n) => n.id).join(", ") || "None"}
          </p>
        </div>

        <div className="rounded-lg border border-amber-500/40 bg-amber-500/10 p-3">
          <div className="flex items-center justify-between text-xs text-amber-300 font-semibold">
            <span>Potentially Affected</span>
            <Zap className="size-3.5" />
          </div>
          <p className="mt-1 font-mono text-xl font-bold text-foreground">
            {attackGraph.blastRadius.potentiallyAffectedAssets}
          </p>
          <p className="text-[10px] text-muted-foreground truncate">
            {attackGraph.suspiciousNodes.map((n) => n.id).join(", ") || "None"}
          </p>
        </div>

        <div className="rounded-lg border border-border bg-secondary/20 p-3">
          <div className="flex items-center justify-between text-xs text-muted-foreground font-semibold">
            <span>Critical Assets</span>
            <ShieldAlert className="size-3.5 text-threat" />
          </div>
          <p className="mt-1 font-mono text-xl font-bold text-foreground">
            {attackGraph.blastRadius.criticalAssetsAffected}
          </p>
          <p className="text-[10px] text-muted-foreground truncate">
            {attackGraph.criticalNodes.map((n) => n.id).join(", ") || "None"}
          </p>
        </div>

        <div className="rounded-lg border border-border bg-secondary/20 p-3">
          <div className="flex items-center justify-between text-xs text-muted-foreground font-semibold">
            <span>Path Confidence</span>
            <Sparkles className="size-3.5 text-cyan-signal" />
          </div>
          <p className="mt-1 font-mono text-xl font-bold text-emerald-400">
            {Math.round(attackGraph.confidence * 100)}%
          </p>
          <p className="text-[10px] text-muted-foreground">Deterministic temporal reconstruction</p>
        </div>
      </div>

      {/* Filter toolbar */}
      <AttackGraphFilters
        filters={filters}
        onChange={setFilters}
        onReset={handleResetFilters}
      />

      {/* Main 2-Column Layout: Left Graph Canvas, Right Inspector */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_360px]">
        {/* Canvas & Legend */}
        <div className="space-y-3">
          <AttackGraphCanvas
            nodes={displayedNodes}
            edges={displayedEdges}
            selectedNodeId={selectedEntityId}
            selectedEdgeId={selectedEdgeId}
            activePath={attackGraph.activePath}
            highlightedPathId={highlightedPathId}
            onSelectNode={handleSelectNode}
            onSelectEdge={handleSelectEdge}
          />

          <GraphLegend />
        </div>

        {/* Forensic Inspector */}
        <div className="h-[530px]">
          <AttackGraphInspector
            graph={attackGraph}
            selectedNode={selectedNode}
            selectedEdge={selectedEdge}
            onSelectNode={handleSelectNode}
            onViewTimelineEvents={handleViewTimelineEvents}
            onViewEvidence={handleViewEvidence}
          />
        </div>
      </div>
    </div>
  );
}
