import {
  ShieldAlert,
  AlertTriangle,
  CheckCircle,
  Radio,
  User,
  Laptop,
  Server,
  Database,
  FolderGit2,
  Globe,
} from "lucide-react";

export function GraphLegend() {
  return (
    <div className="flex flex-wrap items-center gap-x-6 gap-y-2 rounded-[2px] border border-[#1A2730] bg-[#0B1117] px-3.5 py-2 text-xs font-mono">
      <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#6F9AAA]">
        // LEGEND:
      </span>

      {/* Node types */}
      <div className="flex items-center gap-3 text-[11px]">
        <span className="flex items-center gap-1 text-[#A6B6C2]">
          <Globe className="size-3 text-[#FF3045]" /> Threat
        </span>
        <span className="flex items-center gap-1 text-[#A6B6C2]">
          <User className="size-3 text-[#19E6FF]" /> Identity
        </span>
        <span className="flex items-center gap-1 text-[#A6B6C2]">
          <Laptop className="size-3 text-[#19E6FF]" /> Endpoint
        </span>
        <span className="flex items-center gap-1 text-[#A6B6C2]">
          <Server className="size-3 text-[#FFB020]" /> Server
        </span>
        <span className="flex items-center gap-1 text-[#A6B6C2]">
          <Database className="size-3 text-[#FF3045]" /> Database
        </span>
        <span className="flex items-center gap-1 text-[#A6B6C2]">
          <FolderGit2 className="size-3 text-[#3B82F6]" /> Share
        </span>
      </div>

      <div className="h-3 w-px bg-[#1A2730]" />

      {/* States */}
      <div className="flex items-center gap-3 text-[11px]">
        <span className="flex items-center gap-1 text-[#FF5264] font-medium">
          <ShieldAlert className="size-3 text-[#FF3045]" /> Compromised
        </span>
        <span className="flex items-center gap-1 text-[#FFD166] font-medium">
          <AlertTriangle className="size-3 text-[#FFB020]" /> Suspicious
        </span>
        <span className="flex items-center gap-1 text-[#60A5FA] font-medium">
          <Radio className="size-3 text-[#3B82F6]" /> Monitored
        </span>
        <span className="flex items-center gap-1 text-[#5AF2C0] font-medium">
          <CheckCircle className="size-3 text-[#20E3A2]" /> Healthy
        </span>
      </div>

      <div className="h-3 w-px bg-[#1A2730]" />

      {/* Relationships */}
      <div className="flex items-center gap-2 text-[#6F9AAA] text-[11px]">
        <span className="inline-block h-0.5 w-4 bg-[#19E6FF]" /> Traversal
        <span className="inline-block h-0.5 w-4 bg-[#FF3045]" /> Active Kill-chain
      </div>
    </div>
  );
}

