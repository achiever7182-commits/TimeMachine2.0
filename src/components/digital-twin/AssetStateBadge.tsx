import { cn } from "@/lib/utils";
import type { AssetState } from "@/types/digitalTwin";
import { CheckCircle2, ShieldAlert, ShieldCheck, AlertTriangle, Eye, ShieldX } from "lucide-react";

interface AssetStateBadgeProps {
  status: AssetState;
  className?: string;
  showIcon?: boolean;
}

export function AssetStateBadge({ status, className, showIcon = true }: AssetStateBadgeProps) {
  const config = {
    HEALTHY: {
      label: "Healthy",
      color: "border-green-signal/30 bg-green-signal/10 text-green-signal",
      icon: ShieldCheck,
    },
    MONITORED: {
      label: "Monitored",
      color: "border-cyan-glow bg-primary/10 text-cyan-signal",
      icon: Eye,
    },
    SUSPICIOUS: {
      label: "Suspicious",
      color: "border-amber-400/40 bg-amber-400/10 text-amber-400",
      icon: AlertTriangle,
    },
    COMPROMISED: {
      label: "Compromised",
      color: "border-threat/40 bg-threat/10 text-threat shadow-threat animate-pulse",
      icon: ShieldAlert,
    },
    ISOLATED: {
      label: "Isolated",
      color: "border-purple-400/40 bg-purple-400/10 text-purple-400",
      icon: ShieldX,
    },
    RECOVERED: {
      label: "Recovered",
      color: "border-teal-400/40 bg-teal-400/10 text-teal-400",
      icon: CheckCircle2,
    },
  }[status] ?? {
    label: status,
    color: "border-border bg-secondary text-muted-foreground",
    icon: ShieldCheck,
  };

  const Icon = config.icon;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider",
        config.color,
        className,
      )}
    >
      {showIcon ? <Icon className="size-3.5" /> : null}
      {config.label}
    </span>
  );
}
