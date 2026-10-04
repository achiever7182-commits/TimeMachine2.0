import { memo } from "react";
import { cn } from "@/lib/utils";

export interface ScanLinesProps {
  className?: string;
  opacity?: number;
}

export const ScanLines = memo(function ScanLines({ className, opacity }: ScanLinesProps) {
  const style =
    opacity !== undefined
      ? ({ "--tm-scanline-opacity": String(opacity) } as React.CSSProperties)
      : undefined;
  return <div className={cn("tm-scanlines", className)} style={style} aria-hidden />;
});
