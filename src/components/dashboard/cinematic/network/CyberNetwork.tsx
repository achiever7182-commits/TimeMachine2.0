import { useMemo } from "react";
import type { StoryFrame } from "../engine/storyState";
import type { TmNetworkTheme } from "../tokens";
import { tmThemeFg, tmThemeBg } from "../tokens";
import type { TmBreakpoint } from "../engine/useBreakpoint";
import type { CinematicData } from "../data/types";
import { DrawNetwork, NODE_RADIUS_DESKTOP, NODE_RADIUS_MOBILE } from "./layouts";

export function useNetworkTheme(frame: StoryFrame): TmNetworkTheme {
  return frame.networkTheme;
}

interface CyberNetworkProps {
  frame: StoryFrame;
  breakpoint: TmBreakpoint;
  data: CinematicData;
}

export function CyberNetwork({ frame, breakpoint, data }: CyberNetworkProps) {
  const theme = useNetworkTheme(frame);
  const fg = tmThemeFg[theme];
  const bg = tmThemeBg[theme];

  const layout = useMemo(() => {
    if (breakpoint === "mobile") return data.layouts.mobile;
    if (breakpoint === "tablet") return data.layouts.tablet;
    return data.layouts.desktop;
  }, [breakpoint, data.layouts.desktop, data.layouts.mobile, data.layouts.tablet]);

  const radius = breakpoint === "mobile" ? NODE_RADIUS_MOBILE : NODE_RADIUS_DESKTOP;

  return (
    <div
      className="tm-network-wrap"
      style={
        {
          "--tm-zoom": String(
            frame.chapter === "intrusion" ? 1.0 + frame.chapterProgress * 0.06 : 1,
          ),
        } as React.CSSProperties
      }
    >
      <svg
        viewBox={layout.viewBox}
        preserveAspectRatio="xMidYMid meet"
        aria-label="Network topology"
      >
        <g>
          <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill={bg}
            rx="16"
            opacity={breakpoint === "mobile" ? 0.3 : 0.6}
          />
        </g>
        <DrawNetwork layout={layout} nodeRadius={radius} frame={frame} theme={theme} />
        <PacketLayer layout={layout} frame={frame} theme={theme} />
        <g>
          <text
            x="24"
            y="32"
            className="tm-font-mono"
            fontSize="10"
            letterSpacing="0.18em"
            fill={fg}
            fillOpacity="0.85"
          >
            TOPOLOGY VIEW · {breakpoint.toUpperCase()}
          </text>
        </g>
      </svg>
    </div>
  );
}

/**
 * Lightweight packet recycling layer. No canvas 2D — small packet count (24) on SVG paths
 * using a shared `--tm-packet-progress` CSS var driven by story clock.
 * Falls back to zero packets on reduced-motion / mobile (perf-first, content is secondary).
 */
function PacketLayer({
  layout,
  frame,
  theme,
}: {
  layout: { nodes: { id: string; x: number; y: number }[]; edges: { id: string; from: string; to: string; kind: "normal" | "attack" | "blocked" }[] };
  frame: StoryFrame;
  theme: TmNetworkTheme;
}) {
  void theme;
  const packets = useMemo(() => {
    const attackEdges = layout.edges.filter((e: { kind: "normal" | "attack" | "blocked" }) => e.kind !== "blocked").slice(0, 24);
    return attackEdges
      .map((e: { id: string; from: string; to: string; kind: "normal" | "attack" | "blocked" }, i: number) => {
        const a = layout.nodes.find((n: { id: string; x: number; y: number }) => n.id === e.from);
        const b = layout.nodes.find((n: { id: string; x: number; y: number }) => n.id === e.to);
        if (!a || !b) return null;
        const basePhase =
          (i / attackEdges.length + frame.globalProgress * (frame.timeDirection === -1 ? -1 : 1)) %
          1;
        const p =
          frame.timeDirection === -1 ? 1 - Math.abs((1 - basePhase + 1) % 1) : Math.abs(basePhase);
        const x = a.x + (b.x - a.x) * p;
        const y = a.y + (b.y - a.y) * p;
        return { id: `p-${e.id}-${i}`, x, y, kind: e.kind };
      })
      .filter((x): x is NonNullable<typeof x> => Boolean(x));
  }, [layout, frame.globalProgress, frame.timeDirection]);

  if (frame.chapter === "finale" || frame.chapter === "secured") return null;

  return (
    <g pointerEvents="none">
      {packets.map((p) => (
        <circle
          key={p.id}
          cx={p.x}
          cy={p.y}
          r={p.kind === "attack" ? 2.6 : 1.6}
          fill={p.kind === "attack" ? "#FF3B4E" : "#22D3EE"}
          opacity={p.kind === "attack" ? 0.9 : 0.55}
        />
      ))}
    </g>
  );
}
