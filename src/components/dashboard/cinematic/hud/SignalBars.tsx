import { memo } from "react";
import { cn } from "@/lib/utils";

export type SignalStrength = 0 | 1 | 2 | 3;

export interface SignalBarsProps {
  strength: SignalStrength;
  className?: string;
  "aria-label"?: string;
}

export const SignalBars = memo(function SignalBars({
  strength,
  className,
  "aria-label": ariaLabel,
}: SignalBarsProps) {
  return (
    <span
      className={cn("tm-signal-bars", className)}
      data-strength={strength}
      role="img"
      aria-label={ariaLabel ?? `signal strength ${strength} of 3`}
    >
      <span />
      <span />
      <span />
    </span>
  );
});
