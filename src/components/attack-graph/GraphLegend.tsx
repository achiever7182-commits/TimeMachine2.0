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
    <div className="flex flex-wrap items-center gap-x-6 gap-y-2 rounded-lg border border-border/60 bg-secondary/20 px-3.5 py-2 text-xs backdrop-blur-sm">
      <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
        Legend:
      </span>

      {/* Node types */}
      <div className="flex items-center gap-3">
        <span className="flex items-center gap-1 text-muted-foreground">
          <Globe className="size-3 text-threat" /> Threat
        </span>
        <span className="flex items-center gap-1 text-muted-foreground">
          <User className="size-3 text-cyan-signal" /> Identity
        </span>
        <span className="flex items-center gap-1 text-muted-foreground">
          <Laptop className="size-3 text-cyan-signal" /> Endpoint
        </span>
        <span className="flex items-center gap-1 text-muted-foreground">
          <Server className="size-3 text-amber-400" /> Server
        </span>
        <span className="flex items-center gap-1 text-muted-foreground">
          <Database className="size-3 text-threat" /> Database
        </span>
        <span className="flex items-center gap-1 text-muted-foreground">
          <FolderGit2 className="size-3 text-purple-400" /> Share
        </span>
      </div>

      <div className="h-3 w-px bg-border/80" />

      {/* States */}
      <div className="flex items-center gap-3">
        <span className="flex items-center gap-1 text-threat font-medium">
          <ShieldAlert className="size-3" /> Compromised
        </span>
        <span className="flex items-center gap-1 text-amber-400 font-medium">
          <AlertTriangle className="size-3" /> Suspicious
        </span>
        <span className="flex items-center gap-1 text-blue-400 font-medium">
          <Radio className="size-3" /> Monitored
        </span>
        <span className="flex items-center gap-1 text-emerald-400 font-medium">
          <CheckCircle className="size-3" /> Healthy
        </span>
      </div>

      <div className="h-3 w-px bg-border/80" />

      {/* Relationships */}
      <div className="flex items-center gap-2 text-muted-foreground">
        <span className="inline-block h-0.5 w-4 bg-cyan-500" /> Traversal
        <span className="inline-block h-0.5 w-4 bg-threat" /> Active Kill-chain
      </div>
    </div>
  );
}
