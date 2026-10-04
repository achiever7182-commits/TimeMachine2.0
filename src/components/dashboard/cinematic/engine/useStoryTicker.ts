import { useEffect, useRef } from "react";

/**
 * Shared requestAnimationFrame ticker for scenes that want a low-frequency update
 * (for example numeric telemetry counters). Caps at ~20fps to avoid React churn.
 * Honors document hidden state.
 */
export function useStoryTicker(
  onTick: (deltaMs: number, absMs: number) => void,
  opts: { maxFps?: number; paused?: boolean; disabled?: boolean } = {},
) {
  const cb = useRef(onTick);
  cb.current = onTick;
  const maxFps = opts.maxFps ?? 20;
  const paused = Boolean(opts.paused);
  const disabled = Boolean(opts.disabled);

  useEffect(() => {
    if (disabled) return;
    let raf = 0;
    let lastTs = performance.now();
    let acc = 0;
    const minFrameMs = 1000 / maxFps;
    let docHidden = false;

    const vis = () => {
      docHidden = document.hidden;
      if (!docHidden) lastTs = performance.now();
    };

    document.addEventListener("visibilitychange", vis);

    const loop = (ts: number) => {
      const delta = ts - lastTs;
      lastTs = ts;
      if (!paused && !docHidden) {
        acc += delta;
        if (acc >= minFrameMs) {
          cb.current(acc, ts);
          acc = 0;
        }
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("visibilitychange", vis);
    };
  }, [maxFps, paused, disabled]);
}
