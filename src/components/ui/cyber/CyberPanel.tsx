import React, { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CyberPanelProps {
  title?: string;
  subtitle?: string;
  badge?: string;
  badgeVariant?: "cyan" | "blue" | "red" | "amber" | "green";
  headerAction?: ReactNode;
  footer?: ReactNode;
  className?: string;
  bodyClassName?: string;
  children: ReactNode;
  glow?: "cyan" | "blue" | "red" | "amber" | "green" | "none";
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
    cyan: "border-[#19E6FF]/40 bg-[#08758A]/20 text-[#19E6FF]",
    blue: "border-[#3B82F6]/40 bg-[#1D4ED8]/20 text-[#60A5FA]",
    red: "border-[#FF3045]/40 bg-[#B91C2E]/20 text-[#FF5264]",
    amber: "border-[#FFB020]/40 bg-[#B77900]/20 text-[#FFD166]",
    green: "border-[#20E3A2]/40 bg-[#087F60]/20 text-[#5AF2C0]",
  };

  const glowStyles = {
    cyan: "shadow-[0_0_12px_rgba(25,230,255,0.15)] border-[#19E6FF]/40",
    blue: "shadow-[0_0_12px_rgba(59,130,246,0.15)] border-[#3B82F6]/40",
    red: "shadow-[0_0_18px_rgba(255,48,69,0.20)] border-[#FF3045]/40",
    amber: "shadow-[0_0_12px_rgba(255,176,32,0.18)] border-[#FFB020]/40",
    green: "shadow-[0_0_12px_rgba(32,227,162,0.18)] border-[#20E3A2]/40",
    none: "border-[#1A2730]",
  };

  return (
    <div
      className={cn(
        "relative flex flex-col rounded-[2px] border bg-[#0B1117] transition-all duration-200",
        glowStyles[glow],
        className,
      )}
    >
      {/* Corner Crosshairs / Brackets */}
      <div className="absolute -left-[1px] -top-[1px] size-1.5 border-l border-t border-[#19E6FF]/70 pointer-events-none" />
      <div className="absolute -right-[1px] -top-[1px] size-1.5 border-r border-t border-[#19E6FF]/70 pointer-events-none" />
      <div className="absolute -bottom-[1px] -left-[1px] size-1.5 border-b border-l border-[#19E6FF]/70 pointer-events-none" />
      <div className="absolute -bottom-[1px] -right-[1px] size-1.5 border-b border-r border-[#19E6FF]/70 pointer-events-none" />

      {/* Header */}
      {(title || subtitle || badge || headerAction) && (
        <div className="flex items-center justify-between border-b border-[#1A2730] bg-[#080D12] px-3.5 py-2 font-mono">
          <div className="flex items-center gap-2">
            <span className="inline-block size-1.5 bg-[#19E6FF] animate-pulse" />
            {title && (
              <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#F2F7FA]">
                {title}
              </span>
            )}
            {subtitle && (
              <span className="text-[10px] text-[#6F9AAA] uppercase tracking-[0.12em]">
                // {subtitle}
              </span>
            )}
            {badge && (
              <span
                className={cn(
                  "rounded-[2px] border px-1.5 py-0.2 text-[8.5px] font-mono font-medium uppercase tracking-[0.12em]",
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
      <div className={cn("relative flex-1 p-3.5 sm:p-4 font-sans text-xs text-[#F2F7FA]", bodyClassName)}>
        {showScanline && (
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-[#19E6FF]/[0.02] to-transparent bg-[length:100%_4px] opacity-30" />
        )}
        {children}
      </div>

      {/* Footer */}
      {footer && (
        <div className="border-t border-[#1A2730] bg-[#080D12] px-3.5 py-1.5 font-mono text-[9.5px] text-[#667783]">
          {footer}
        </div>
      )}
    </div>
  );
}

