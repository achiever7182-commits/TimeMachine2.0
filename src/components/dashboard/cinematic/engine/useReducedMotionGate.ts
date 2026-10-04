import { useEffect, useState } from "react";

/**
 * Respects prefers-reduced-motion media query.
 * Cinematic layer gates:
 *  - soft scroll snapping (disabled)
 *  - scanline sweep / flicker animations (disabled)
 *  - particle count (reduced to 8)
 *  - vignette pulsing (static alpha)
 */
export function useReducedMotionGate(): boolean {
  const [reduced, setReduced] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = () => setReduced(mql.matches);
    mql.addEventListener?.("change", handler);
    return () => mql.removeEventListener?.("change", handler);
  }, []);

  return reduced;
}
