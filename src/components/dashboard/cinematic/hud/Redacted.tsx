import { memo } from "react";
import { cn } from "@/lib/utils";

export interface RedactedProps {
  className?: string;
  children?: string;
  /** Visual placeholder width in em; defaults to length-based estimate */
  widthEm?: number;
  "aria-label"?: string;
}

export const Redacted = memo(function Redacted({
  className,
  children,
  widthEm,
  "aria-label": ariaLabel = "redacted value",
}: RedactedProps) {
  const width =
    widthEm !== undefined
      ? { width: `${widthEm}em` }
      : children
        ? { width: `${Math.max(1.6, Math.min(14, children.length * 0.62))}em` }
        : { width: "4em" };

  return (
    <span
      className={cn("tm-redacted", className)}
      role="presentation"
      aria-label={ariaLabel}
      title="REDACTED"
      style={width}
    >
      {children ?? "████████"}
    </span>
  );
});
