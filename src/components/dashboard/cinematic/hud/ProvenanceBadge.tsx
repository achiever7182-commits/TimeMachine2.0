import { memo } from "react";
import { cn } from "@/lib/utils";
import type { DataProvenance } from "../data/provenance";
import { labelFor } from "../data/provenance";

export interface ProvenanceBadgeProps {
  provenance: DataProvenance;
  kind?: "telemetry" | "incident" | "attack" | "investigation" | "response";
  className?: string;
  showText?: boolean;
}

/**
 * The ONLY component allowed to render the words DEMO / LIVE / MIXED / NO DATA on HUD surfaces.
 * Text is produced exclusively through labelFor() — never by string literals in JSX.
 */
export const ProvenanceBadge = memo(function ProvenanceBadge({
  provenance,
  kind = "telemetry",
  className,
  showText = true,
}: ProvenanceBadgeProps) {
  const text = labelFor(provenance, kind);
  const short: Record<DataProvenance, string> = {
    live: "L",
    demo: "D",
    mixed: "M",
    unavailable: "—",
  };
  return (
    <span className={cn("tm-provenance", className)} data-p={provenance} title={text}>
      <span className="tm-pip" aria-hidden />
      {showText ? (
        <span data-role="provenance-text">{text}</span>
      ) : (
        <span className="tm-font-mono">{short[provenance]}</span>
      )}
    </span>
  );
});
