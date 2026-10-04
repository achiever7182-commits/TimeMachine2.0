import { useEffect, useRef, useState } from "react";

/**
 * Counts a numeric value up from start to end over `durationMs`, capped by `fps` throttling.
 * Pure — deterministic given the same inputs. Pauses when `paused=true` or document is hidden.
 * Uses requestAnimationFrame; output updates via React state at ~fps Hz (default 20Hz).
 */
export function useCountUp(
  end: number,
  opts: { start?: number; durationMs?: number; fps?: number; paused?: boolean; decimals?: number } = {},
): number {
  const { start = 0, durationMs = 1800, fps = 20, paused = false, decimals = 0 } = opts;
  const factor = Math.pow(10, decimals);
  const [value, setValue] = useState<number>(start);
  const rafRef = useRef<number | null>(null);
  const startedAt = useRef<number | null>(null);
  const lastTick = useRef<number>(0);

  useEffect(() => {
    if (paused) return;
    const minFrameMs = 1000 / Math.max(1, fps);
    const tick = (ts: number) => {
      if (document.hidden) {
        rafRef.current = requestAnimationFrame(tick);
        return;
      }
      if (startedAt.current === null) startedAt.current = ts;
      const elapsed = ts - startedAt.current;
      const t = Math.min(1, Math.max(0, elapsed / durationMs));
      // easeOutCubic
      const eased = 1 - Math.pow(1 - t, 3);
      const next = start + (end - start) * eased;
      if (ts - lastTick.current >= minFrameMs) {
        lastTick.current = ts;
        setValue(Math.round(next * factor) / factor);
      }
      if (t < 1) rafRef.current = requestAnimationFrame(tick);
      else setValue(Math.round(end * factor) / factor);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      startedAt.current = null;
    };
  }, [start, end, durationMs, fps, paused, factor]);
  return value;
}
