import { useMemo } from "react";
import {
  ShieldAlert,
  AlertTriangle,
  ArrowRight,
  Clock,
  FileSearch,
  Activity,
  Layers,
  Zap,
  Info,
  ExternalLink,
} from "lucide-react";
import type { AttackGraphEdge, AttackGraphNode, AttackGraphState } from "@/types/attackGraph";
import {
  getDownstreamReachableNodes,
  generatePathExplanation,
} from "@/services/attackGraphService";

interface AttackGraphInspectorProps {
  graph: AttackGraphState;
  selectedNode: AttackGraphNode | null;
  selectedEdge: AttackGraphEdge | null;
  onSelectNode: (nodeId: string) => void;
  onViewTimelineEvents: (eventIds: string[]) => void;
  onViewEvidence: (evidenceIds: string[]) => void;
}

export function AttackGraphInspector({
  graph,
  selectedNode,
  selectedEdge,
  onSelectNode,
  onViewTimelineEvents,
  onViewEvidence,
}: AttackGraphInspectorProps) {
  // Edge selected view
  if (selectedEdge) {
    return (
      <div className="flex h-full flex-col overflow-y-auto rounded-xl border border-border/80 bg-card/50 p-4 text-xs backdrop-blur-md">
        <div className="flex items-center justify-between border-b border-border/70 pb-3">
          <div className="flex items-center gap-2">
            <Zap className="size-4 text-cyan-signal" />
            <h3 className="font-semibold text-foreground text-sm">Edge Relationship</h3>
          </div>
          <span className="rounded bg-cyan-signal/10 px-2 py-0.5 font-mono text-[10px] font-bold text-cyan-signal">
            {selectedEdge.relationshipType}
          </span>
        </div>

        <div className="mt-4 space-y-4">
          {/* Source -> Target Connection */}
          <div className="flex items-center justify-between rounded-lg border border-border/60 bg-secondary/20 p-2.5">
            <button
              onClick={() => onSelectNode(selectedEdge.source)}
              className="font-mono font-bold text-foreground hover:text-cyan-signal hover:underline"
            >
              {selectedEdge.source}
            </button>
            <ArrowRight className="size-3.5 text-muted-foreground" />
            <button
              onClick={() => onSelectNode(selectedEdge.target)}
              className="font-mono font-bold text-foreground hover:text-cyan-signal hover:underline"
            >
              {selectedEdge.target}
            </button>
          </div>

          {/* Description */}
          <div>
            <span className="font-semibold text-muted-foreground uppercase text-[10px] tracking-wider">
              Description
            </span>
            <p className="mt-1 text-foreground leading-relaxed">{selectedEdge.description}</p>
          </div>

          {/* Technique */}
          <div>
            <span className="font-semibold text-muted-foreground uppercase text-[10px] tracking-wider">
              Technique Category
            </span>
            <p className="mt-1 font-mono text-cyan-signal font-medium">
              {selectedEdge.techniqueCategory}
            </p>
          </div>

          {/* Temporal Boundaries */}
          <div className="grid grid-cols-2 gap-2 rounded-lg border border-border/50 bg-secondary/15 p-2">
            <div>
              <span className="text-[10px] text-muted-foreground">First Seen</span>
              <p className="font-mono font-bold text-foreground">{selectedEdge.firstSeen}</p>
            </div>
            <div>
              <span className="text-[10px] text-muted-foreground">Confidence</span>
              <p className="font-mono font-bold text-emerald-400">
                {Math.round(selectedEdge.confidence * 100)}%
              </p>
            </div>
          </div>

          {/* Navigation Action Buttons */}
          <div className="space-y-2 pt-2">
            <button
              onClick={() => onViewTimelineEvents(selectedEdge.eventIds)}
              className="flex w-full items-center justify-between rounded-md border border-cyan-signal/40 bg-cyan-signal/10 px-3 py-2 font-medium text-cyan-signal hover:bg-cyan-signal/20 transition-colors"
            >
              <span className="flex items-center gap-1.5">
                <Activity className="size-3.5" />
                View Related Events ({selectedEdge.eventIds.length})
              </span>
              <ExternalLink className="size-3" />
            </button>

            <button
              onClick={() => onViewEvidence(selectedEdge.evidenceIds)}
              className="flex w-full items-center justify-between rounded-md border border-border bg-secondary/30 px-3 py-2 font-medium text-foreground hover:bg-secondary/50 transition-colors"
            >
              <span className="flex items-center gap-1.5">
                <FileSearch className="size-3.5 text-muted-foreground" />
                View Supporting Evidence ({selectedEdge.evidenceIds.length})
              </span>
              <ExternalLink className="size-3 text-muted-foreground" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Node selected view
  if (selectedNode) {
    const incomingEdges = graph.edges.filter((e) => e.target === selectedNode.id);
    const outgoingEdges = graph.edges.filter((e) => e.source === selectedNode.id);
    const reachableNodes = getDownstreamReachableNodes(graph, selectedNode.id);
    const pathExplanation = generatePathExplanation(graph, selectedNode.id);

    return (
      <div className="flex h-full flex-col overflow-y-auto rounded-xl border border-border/80 bg-card/50 p-4 text-xs backdrop-blur-md">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border/70 pb-3">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-foreground text-sm font-mono">{selectedNode.id}</h3>
              <span className="rounded bg-secondary px-1.5 py-0.5 font-mono text-[9px] text-muted-foreground">
                {selectedNode.type}
              </span>
            </div>
            <p className="text-[10px] text-muted-foreground mt-0.5">{selectedNode.label}</p>
          </div>

          <div
            className={`flex items-center gap-1 rounded-full px-2 py-0.5 font-mono text-[10px] font-bold ${
              selectedNode.status === "COMPROMISED"
                ? "bg-threat/20 text-threat"
                : selectedNode.status === "AFFECTED"
                  ? "bg-amber-500/20 text-amber-300"
                  : selectedNode.status === "SUSPICIOUS"
                    ? "bg-amber-400/20 text-amber-400"
                    : "bg-emerald-500/20 text-emerald-400"
            }`}
          >
            {selectedNode.status}
          </div>
        </div>

        <div className="mt-3.5 space-y-4">
          {/* Metadata Grid */}
          <div className="grid grid-cols-2 gap-2 rounded-lg border border-border/50 bg-secondary/15 p-2.5">
            <div>
              <span className="text-[10px] text-muted-foreground">Criticality</span>
              <p className="font-semibold text-foreground">{selectedNode.criticality}</p>
            </div>
            <div>
              <span className="text-[10px] text-muted-foreground">Owner</span>
              <p className="font-semibold text-foreground truncate">{selectedNode.owner}</p>
            </div>
            <div>
              <span className="text-[10px] text-muted-foreground">First Seen</span>
              <p className="font-mono text-foreground">{selectedNode.firstSeen}</p>
            </div>
            <div>
              <span className="text-[10px] text-muted-foreground">Compromise Time</span>
              <p className="font-mono text-threat font-bold">
                {selectedNode.compromiseTime ?? "N/A"}
              </p>
            </div>
          </div>

          {/* Quick Actions (Events & Evidence) */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => onViewTimelineEvents(selectedNode.eventIds)}
              className="flex items-center justify-center gap-1.5 rounded-md border border-cyan-signal/40 bg-cyan-signal/10 py-1.5 font-medium text-cyan-signal hover:bg-cyan-signal/20 transition-colors"
            >
              <Activity className="size-3" />
              Events ({selectedNode.eventIds.length})
            </button>
            <button
              onClick={() => onViewEvidence(selectedNode.evidenceIds)}
              className="flex items-center justify-center gap-1.5 rounded-md border border-border bg-secondary/30 py-1.5 font-medium text-foreground hover:bg-secondary/50 transition-colors"
            >
              <FileSearch className="size-3" />
              Evidence ({selectedNode.evidenceIds.length})
            </button>
          </div>

          {/* "HOW DID WE GET HERE?" Panel (Requirement 26) */}
          <div className="rounded-lg border border-border/60 bg-secondary/15 p-2.5">
            <div className="flex items-center gap-1.5 font-semibold text-foreground mb-1.5">
              <Layers className="size-3.5 text-cyan-signal" />
              <span>How did we get here?</span>
            </div>
            <div className="space-y-1 text-[11px] text-muted-foreground">
              {pathExplanation.map((step, idx) => (
                <p key={idx} className="leading-snug">
                  {step}
                </p>
              ))}
            </div>
          </div>

          {/* "WHAT DID THE ATTACKER REACH?" Panel (Requirement 25) */}
          <div className="rounded-lg border border-border/60 bg-secondary/15 p-2.5">
            <div className="flex items-center gap-1.5 font-semibold text-foreground mb-1.5">
              <Zap className="size-3.5 text-amber-400" />
              <span>Downstream Reachable Systems</span>
            </div>
            {reachableNodes.length === 0 ? (
              <p className="text-[10px] text-muted-foreground">
                No downstream systems reachable from this node at {graph.timestamp}.
              </p>
            ) : (
              <div className="flex flex-wrap gap-1.5">
                {reachableNodes.map((n) => (
                  <button
                    key={n.id}
                    onClick={() => onSelectNode(n.id)}
                    className="flex items-center gap-1 rounded border border-border/80 bg-background/80 px-2 py-0.5 font-mono text-[10px] text-foreground hover:border-cyan-signal transition-colors"
                  >
                    <span>{n.id}</span>
                    <span
                      className={`size-1.5 rounded-full ${
                        n.status === "COMPROMISED" ? "bg-threat" : "bg-amber-400"
                      }`}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Relationships Summary */}
          <div className="space-y-1">
            <span className="font-semibold text-muted-foreground uppercase text-[10px] tracking-wider">
              Relationships ({incomingEdges.length} In / {outgoingEdges.length} Out)
            </span>
            <div className="space-y-1">
              {incomingEdges.map((e) => (
                <div
                  key={e.id}
                  className="flex items-center justify-between rounded bg-secondary/20 px-2 py-1 text-[10.5px]"
                >
                  <span className="text-muted-foreground">
                    From <strong className="text-foreground">{e.source}</strong>
                  </span>
                  <span className="font-mono text-[9px] text-cyan-signal">
                    {e.relationshipType}
                  </span>
                </div>
              ))}
              {outgoingEdges.map((e) => (
                <div
                  key={e.id}
                  className="flex items-center justify-between rounded bg-secondary/20 px-2 py-1 text-[10.5px]"
                >
                  <span className="text-muted-foreground">
                    To <strong className="text-foreground">{e.target}</strong>
                  </span>
                  <span className="font-mono text-[9px] text-cyan-signal">
                    {e.relationshipType}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Blank state
  return (
    <div className="flex h-full flex-col items-center justify-center rounded-xl border border-dashed border-border/80 bg-card/30 p-6 text-center text-xs text-muted-foreground">
      <Info className="size-6 text-muted-foreground/60 mb-2" />
      <p className="font-medium text-foreground">No Asset or Relationship Selected</p>
      <p className="mt-1 text-[11px] max-w-[200px]">
        Click any node or directional edge in the attack graph to inspect forensic details.
      </p>
    </div>
  );
}
