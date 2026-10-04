import { memo } from "react";
import { cn } from "@/lib/utils";

export interface GridBackdropProps {
  className?: string;
}

export const GridBackdrop = memo(function GridBackdrop({ className }: GridBackdropProps) {
  return <div className={cn("tm-grid-backdrop", className)} aria-hidden />;
});
