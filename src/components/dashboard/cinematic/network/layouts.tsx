import { memo } from "react";
import { cn } from "@/lib/utils";
import type { TmNetworkTheme } from "../tokens";
import { tmThemeFg, tmThemeBg, tmNodeStateColor } from "../tokens";
import type { CNode, CEdge, NetworkLayout } from "../data/types";
import type { StoryFrame } from "../engine/storyState";

export function nodeGlyph(kind: CNode["kind"]): string {
  switch (kind) {
    case "attacker":
      return "◇";
    case "endpoint":
      return "▣";
    case "server":
      return "▦";
    case "database":
      return "▤";
    case "identity":
      return "◉";
    case "firewall":
      return "▨";
    case "network":
      return "⬡";
    case "user":
      return "○";
    default:
      return "○";
  }
}

export function edgeClass(kind: CEdge["kind"]): string {
  switch (kind) {
    case "attack":
      return "tm-edge-attack";
    case "blocked":
      return "tm-edge-blocked";
    default:
      return "tm-edge-normal";
  }
}

const NODE_RADIUS_DESKTOP = 22;
const NODE_RADIUS_MOBILE = 18;

interface DrawNetworkProps {
  layout: NetworkLayout;
  nodeRadius?: number;
  frame: StoryFrame;
  theme: TmNetworkTheme;
}

export const DrawNetwork = memo(function DrawNetwork({
  layout,
  nodeRadius = NODE_RADIUS_DESKTOP,
  frame,
  theme,
}: DrawNetworkProps) {
  const fg = tmThemeFg[theme];
  const bg = tmThemeBg[theme];

  return (
    <g>
      <g fill="none" stroke={fg} strokeOpacity="0.18">
        {layout.edges.map((e) => {
          const a = layout.nodes.find((n) => n.id === e.from);
          const b = layout.nodes.find((n) => n.id === e.to);
          if (!a || !b) return null;
          const cls = edgeClass(e.kind);
          const attackProgress =
            frame.timeDirection === -1 ? 1 - frame.chapterProgress : frame.chapterProgress;
          const dashOff = e.kind === "attack" ? 100 * (1 - attackProgress) : undefined;
          return (
            <path
              key={e.id}
              d={`M${a.x} ${a.y} L${b.x} ${b.y}`}
              className={cls}
              strokeWidth={e.kind === "attack" ? 2 : 1}
              strokeDasharray={e.kind === "attack" ? "6 10" : undefined}
              strokeDashoffset={dashOff}
            />
          );
        })}
      </g>
      {layout.nodes.map((n) => {
        const color = tmNodeStateColor[n.state];
        const glow =
          n.state === "compromised"
            ? "drop-shadow-[0_0_3px_rgba(255,59,78,0.7)]"
            : n.state === "verified"
              ? "drop-shadow-[0_0_3px_rgba(46,230,166,0.7)]"
              : "";
        const ringOpacity = n.state === "nominal" ? 0.6 : 1;
        return (
          <g key={n.id} className={cn(glow)} transform={`translate(${n.x} ${n.y})`}>
            <circle r={nodeRadius} fill={bg} stroke={fg} strokeOpacity="0.35" />
            <circle
              className="tm-node-ring"
              r={nodeRadius - 5}
              stroke={color}
              strokeOpacity={ringOpacity}
            />
            <text className="tm-node-glyph" y="0" fill={color}>
              {nodeGlyph(n.kind)}
            </text>
            <text className="tm-node-label" y={nodeRadius + 12} fill={color} fillOpacity="0.7">
              {n.label}
            </text>
          </g>
        );
      })}
    </g>
  );
});

export { NODE_RADIUS_DESKTOP, NODE_RADIUS_MOBILE };
