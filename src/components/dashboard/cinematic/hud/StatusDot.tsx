import { memo } from "react";
import { cn } from "@/lib/utils";

export type StatusDotState = "nominal" | "warn" | "threat" | "secure" | "off";

export interface StatusDotProps {
  state: StatusDotState;
  className?: string;
  "aria-label"?: string;
  pulse?: boolean;
}

export const StatusDot = memo(function StatusDot({
  state,
  className,
  "aria-label": ariaLabel = `system status: ${state}`,
  pulse,
}: StatusDotProps) {
  return (
    <span
      className={cn("tm-status-dot", className, pulse && "animate-pulse")}
      data-state={state}
      role="status"
      aria-label={ariaLabel}
    />
  );
});
