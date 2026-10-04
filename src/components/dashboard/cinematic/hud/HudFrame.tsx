import { memo, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface HudFrameProps {
  className?: string;
  children?: ReactNode;
  padding?: "none" | "sm" | "md" | "lg";
  role?: string;
  "aria-label"?: string;
}

const padMap: Record<NonNullable<HudFrameProps["padding"]>, string> = {
  none: "",
  sm: "p-2",
  md: "p-4",
  lg: "p-6",
};

export const HudFrame = memo(function HudFrame({
  className,
  children,
  padding = "md",
  role,
  "aria-label": ariaLabel,
}: HudFrameProps) {
  return (
    <div
      className={cn("tm-hud-frame", padMap[padding], className)}
      role={role}
      aria-label={ariaLabel}
    >
      <span className="tm-bracket-tl" aria-hidden />
      <span className="tm-bracket-br" aria-hidden />
      {children}
    </div>
  );
});
