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
      color: "border-[#20E3A2]/40 bg-[#087F60]/20 text-[#5AF2C0]",
      icon: ShieldCheck,
    },
    MONITORED: {
      label: "Monitored",
      color: "border-[#19E6FF]/40 bg-[#08758A]/20 text-[#19E6FF]",
      icon: Eye,
    },
    SUSPICIOUS: {
      label: "Suspicious",
      color: "border-[#FFB020]/40 bg-[#B77900]/20 text-[#FFD166]",
      icon: AlertTriangle,
    },
    COMPROMISED: {
      label: "Compromised",
      color: "border-[#FF3045]/50 bg-[#B91C2E]/20 text-[#FF5264] shadow-[0_0_10px_rgba(255,48,69,0.3)] animate-pulse",
      icon: ShieldAlert,
    },
    ISOLATED: {
      label: "Isolated",
      color: "border-[#3B82F6]/40 bg-[#1D4ED8]/20 text-[#60A5FA]",
      icon: ShieldX,
    },
    RECOVERED: {
      label: "Recovered",
      color: "border-[#20E3A2]/40 bg-[#087F60]/20 text-[#20E3A2]",
      icon: CheckCircle2,
    },
  }[status] ?? {
    label: status,
    color: "border-[#1A2730] bg-[#080D12] text-[#667783]",
    icon: ShieldCheck,
  };

  const Icon = config.icon;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-[2px] border px-2 py-0.5 text-[9.5px] font-mono font-medium uppercase tracking-[0.12em]",
        config.color,
        className,
      )}
    >
      {showIcon ? <Icon className="size-3" /> : null}
      {config.label}
    </span>
  );
}

