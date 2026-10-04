import { useEffect, useState } from "react";

export type TmBreakpoint = "desktop" | "tablet" | "mobile";

const QUERIES: Record<TmBreakpoint, string> = {
  desktop: "(min-width: 1280px)",
  tablet: "(min-width: 768px) and (max-width: 1279px)",
  mobile: "(max-width: 767px)",
};

export function useBreakpoint(): TmBreakpoint {
  const [bp, setBp] = useState<TmBreakpoint>(() => {
    if (typeof window === "undefined") return "desktop";
    if (window.matchMedia(QUERIES.mobile).matches) return "mobile";
    if (window.matchMedia(QUERIES.tablet).matches) return "tablet";
    return "desktop";
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const entries: Array<[TmBreakpoint, MediaQueryList]> = (
      Object.keys(QUERIES) as TmBreakpoint[]
    ).map((k) => [k, window.matchMedia(QUERIES[k])]);

    const recalc = () => {
      for (const [k, mql] of entries) {
        if (mql.matches) {
          setBp(k);
          return;
        }
      }
      setBp("desktop");
    };

    recalc();
    const handlers: Array<() => void> = [];
    for (const [, mql] of entries) {
      const h = () => recalc();
      mql.addEventListener?.("change", h);
      handlers.push(h);
    }
    return () => {
      entries.forEach(([, mql], i) => mql.removeEventListener?.("change", handlers[i]!));
    };
  }, []);

  return bp;
}

export function totalTrackVH(bp: TmBreakpoint): number {
  if (bp === "mobile") return 650;
  if (bp === "tablet") return 800;
  return 1100;
}
