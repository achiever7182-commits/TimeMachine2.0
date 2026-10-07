import {
  Clock,
  FileText,
  Server,
  User,
  Share2,
  GitBranch,
  Shield,
  Layers,
} from "lucide-react";
import type { IrisCitation } from "@/types/iris";

interface IrisTimelineCitationProps {
  citation: IrisCitation;
  onClick?: (citation: IrisCitation) => void;
}

export function IrisTimelineCitation({
  citation,
  onClick,
}: IrisTimelineCitationProps) {
  const getIcon = () => {
    switch (citation.type) {
      case "TIMELINE_EVENT":
        return <Clock className="size-2.5 text-cyan-signal" />;
      case "EVIDENCE":
        return <FileText className="size-2.5 text-yellow-400" />;
      case "ASSET":
        return <Server className="size-2.5 text-purple-400" />;
      case "USER":
        return <User className="size-2.5 text-blue-400" />;
      case "ATTACK_NODE":
      case "ATTACK_EDGE":
        return <Share2 className="size-2.5 text-red-400" />;
      case "COUNTERFACTUAL_EVENT":
        return <GitBranch className="size-2.5 text-emerald-400" />;
      case "RISK_STATE":
        return <Shield className="size-2.5 text-amber-500" />;
      case "SNAPSHOT":
      default:
        return <Layers className="size-2.5 text-muted-foreground" />;
    }
  };

  return (
    <button
      type="button"
      onClick={() => onClick?.(citation)}
      className="inline-flex items-center gap-1 rounded border border-border/80 bg-background/80 px-2 py-0.5 font-mono text-[10px] text-foreground hover:border-cyan-signal/60 hover:bg-cyan-signal/10 transition-colors"
      title={`Citation: ${citation.type} (${citation.sourceId || citation.id})`}
    >
      {getIcon()}
      <span className="truncate max-w-[220px]">{citation.label}</span>
      <span className="text-[8px] text-muted-foreground uppercase opacity-75">
        [{citation.type.replace(/_/g, " ")}]
      </span>
    </button>
  );
}
