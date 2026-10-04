import { memo, useEffect, useMemo, useState } from "react";
import { useStory } from "../engine/StoryContext";
import { cinematicRng } from "../data/fixtures/inc-2048";

/**
 * Canvas-free CSS particle field. 40–80 tiny dots drifting. Deterministic positions via `cinematicRng`.
 * Staggered entry opacity controlled by scene. Does not touch the DOM layout.
 */
export interface SceneParticlesProps {
  count?: number;
  kind?: "hero" | "grid" | "trace";
  /** 0..1 — fades particles in during the hero */
  revealProgress?: number;
}

function buildPositions(count: number, seed = 0): Array<{
  top: number;
  left: number;
  size: number;
  delay: number;
  duration: number;
  opacity: number;
  xDrift: number;
}> {
  // reset seeded PRNG to a deterministic offset so hero doesn't shift between reloads
  const rnd = cinematicRng;
  void seed;
  const arr: Array<{
    top: number;
    left: number;
    size: number;
    delay: number;
    duration: number;
    opacity: number;
    xDrift: number;
  }> = [];
  for (let i = 0; i < count; i++) {
    arr.push({
      top: rnd() * 100,
      left: rnd() * 100,
      size: 1 + Math.round(rnd() * 2),
      delay: rnd() * 3,
      duration: 6 + rnd() * 10,
      opacity: 0.25 + rnd() * 0.5,
      xDrift: (rnd() - 0.5) * 2,
    });
  }
  return arr;
}

export const SceneParticles = memo(function SceneParticles({
  count = 64,
  kind = "hero",
  revealProgress = 1,
}: SceneParticlesProps) {
  const { reducedMotion, breakpoint } = useStory();
  const cappedCount = useMemo(() => {
    if (reducedMotion) return Math.min(12, count);
    if (breakpoint === "mobile") return Math.min(28, count);
    return count;
  }, [count, reducedMotion, breakpoint]);

  const positions = useMemo(
    () => buildPositions(cappedCount),
    [cappedCount],
  );

  const color =
    kind === "trace"
      ? "var(--tm-cyan)"
      : kind === "grid"
        ? "var(--tm-blue)"
        : "var(--tm-cyan)";
  const [mountReveal, setMountReveal] = useState<number>(reducedMotion ? 1 : 0);
  useEffect(() => {
    if (reducedMotion) return undefined;
    let raf = 0;
    const t0 = performance.now();
    const tick = (ts: number) => {
      const p = Math.min(1, (ts - t0) / 900);
      setMountReveal(p);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reducedMotion]);

  const alpha = mountReveal * (0.4 + 0.6 * revealProgress);

  return (
    <div
      className="absolute inset-0 pointer-events-none"
      aria-hidden
      style={{ opacity: alpha }}
    >
      <style>
        {`
          @keyframes tm-particle-float {
            0%   { transform: translate(0, 0); opacity: 0; }
            10%  { opacity: var(--p-op); }
            50%  { transform: translate(calc(var(--p-x) * 1vh), -3vh); }
            90%  { opacity: var(--p-op); }
            100% { transform: translate(calc(var(--p-x) * -1 * 1vh), -8vh); opacity: 0; }
          }
        `}
      </style>
      {positions.map((p, i) => (
        <span
          key={`p-${kind}-${i}`}
          className="tm-scene-particle absolute rounded-full"
          style={
            {
              top: `${p.top}%`,
              left: `${p.left}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              background: color,
              opacity: reducedMotion ? p.opacity * 0.55 : p.opacity,
              ["--p-op" as never]: String(p.opacity),
              ["--p-x" as never]: String(p.xDrift),
              animation: reducedMotion
                ? "none"
                : `tm-particle-float ${p.duration}s ${p.delay}s ease-in-out infinite`,
              mixBlendMode: "screen",
              filter: "blur(0.2px)",
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
});
