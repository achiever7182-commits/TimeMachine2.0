import { memo, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface HudLabelProps {
  className?: string;
  children?: ReactNode;
  as?: "span" | "div" | "p";
}

export const HudLabel = memo(function HudLabel({
  className,
  children,
  as: Tag = "span",
}: HudLabelProps) {
  return <Tag className={cn("tm-hud-label", className)}>{children}</Tag>;
});
