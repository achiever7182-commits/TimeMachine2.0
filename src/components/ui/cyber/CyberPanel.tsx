import React, { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CyberPanelProps {
  title?: string;
  subtitle?: string;
  badge?: string;
  badgeVariant?: "cyan" | "red" | "amber" | "green" | "purple";
  headerAction?: ReactNode;
  footer?: ReactNode;
  className?: string;
  bodyClassName?: string;
  children: ReactNode;
  glow?: "cyan" | "red" | "amber" | "green" | "none";
  showScanline?: boolean;
}

export function CyberPanel({
  title,
  subtitle,
  badge,
  badgeVariant = "cyan",
  headerAction,
  footer,
  className,
  bodyClassName,
  children,
  glow = "none",
  showScanline = false,
}: CyberPanelProps) {
  const badgeColors = {
    cyan: "border-cyan-500/40 bg-cyan-950/30 text-cyan-300",
    red: "border-red-500/40 bg-red-950/30 text-red-300",
    amber: "border-amber-500/40 bg-amber-950/30 text-amber-300",
    green: "border-emerald-500/40 bg-emerald-950/30 text-emerald-300",
    purple: "border-purple-500/40 bg-purple-950/30 text-purple-300",
  };

  const glowStyles = {
    cyan: "shadow-[0_0_25px_rgba(0,229,255,0.08)] border-cyan-500/30",
    red: "shadow-[0_0_30px_rgba(255,38,56,0.12)] border-red-500/40",
    amber: "shadow-[0_0_25px_rgba(255,176,0,0.1)] border-amber-500/40",
    green: "shadow-[0_0_25px_rgba(0,255,136,0.1)] border-emerald-500/40",
    none: "border-border/80",
  };

  return (
    <div
      className={cn(
        "relative flex flex-col rounded-none border bg-[#050A0F]/90 backdrop-blur-md transition-all duration-200",
        glowStyles[glow],
        className,
      )}
    >
      {/* Corner Crosshairs / Brackets */}
      <div className="absolute -left-[1px] -top-[1px] size-2 border-l border-t border-cyan-400/80 pointer-events-none" />
      <div className="absolute -right-[1px] -top-[1px] size-2 border-r border-t border-cyan-400/80 pointer-events-none" />
      <div className="absolute -bottom-[1px] -left-[1px] size-2 border-b border-l border-cyan-400/80 pointer-events-none" />
      <div className="absolute -bottom-[1px] -right-[1px] size-2 border-b border-r border-cyan-400/80 pointer-events-none" />

      {/* Header */}
      {(title || subtitle || badge || headerAction) && (
        <div className="flex items-center justify-between border-b border-border/80 bg-black/40 px-3.5 py-2.5 font-mono">
          <div className="flex items-center gap-2">
            <span className="inline-block size-1.5 bg-cyan-400 animate-pulse" />
            {title && (
              <span className="text-xs font-bold uppercase tracking-[0.15em] text-slate-100">
                {title}
              </span>
            )}
            {subtitle && (
              <span className="text-[10px] text-muted-foreground uppercase tracking-wider">
                // {subtitle}
              </span>
            )}
            {badge && (
              <span
                className={cn(
                  "rounded-sm border px-1.5 py-0.2 text-[9px] font-bold uppercase tracking-wider",
                  badgeColors[badgeVariant],
                )}
              >
                {badge}
              </span>
            )}
          </div>
          {headerAction && <div className="flex items-center gap-2">{headerAction}</div>}
        </div>
      )}

      {/* Body */}
      <div className={cn("relative flex-1 p-3.5 sm:p-4 font-sans text-xs", bodyClassName)}>
        {showScanline && (
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/[0.02] to-transparent bg-[length:100%_4px] opacity-40" />
        )}
        {children}
      </div>

      {/* Footer */}
      {footer && (
        <div className="border-t border-border/80 bg-black/40 px-3.5 py-2 font-mono text-[10px] text-muted-foreground">
          {footer}
        </div>
      )}
    </div>
  );
}
