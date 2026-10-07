import { Clock, FileText, Server, User, Share2, GitBranch, Shield, Layers } from "lucide-react";
import type { IrisCitation } from "@/types/iris";

interface IrisTimelineCitationProps {
  citation: IrisCitation;
  onClick?: (citation: IrisCitation) => void;
}

export function IrisTimelineCitation({ citation, onClick }: IrisTimelineCitationProps) {
  const getIcon = () => {
    switch (citation.type) {
      case "TIMELINE_EVENT":
        return <Clock className="size-2.5 text-[#19E6FF]" />;
      case "EVIDENCE":
        return <FileText className="size-2.5 text-[#FFB020]" />;
      case "ASSET":
        return <Server className="size-2.5 text-[#3B82F6]" />;
      case "USER":
        return <User className="size-2.5 text-[#19E6FF]" />;
      case "ATTACK_NODE":
      case "ATTACK_EDGE":
        return <Share2 className="size-2.5 text-[#FF3045]" />;
      case "COUNTERFACTUAL_EVENT":
        return <GitBranch className="size-2.5 text-[#20E3A2]" />;
      case "RISK_STATE":
        return <Shield className="size-2.5 text-[#FFB020]" />;
      case "SNAPSHOT":
      default:
        return <Layers className="size-2.5 text-[#667783]" />;
    }
  };

  return (
    <button
      type="button"
      onClick={() => onClick?.(citation)}
      className="inline-flex items-center gap-1 rounded-[2px] border border-[#1A2730] bg-[#080D12] px-2 py-0.5 font-mono text-[9.5px] text-[#F2F7FA] hover:border-[#19E6FF]/60 hover:bg-[#19E6FF]/10 transition-colors cursor-pointer"
      title={`Citation: ${citation.type} (${citation.sourceId || citation.id})`}
    >
      {getIcon()}
      <span className="truncate max-w-[220px]">{citation.label}</span>
      <span className="text-[8px] text-[#6F9AAA] uppercase opacity-75">
        [{citation.type.replace(/_/g, " ")}]
      </span>
    </button>
  );
}

