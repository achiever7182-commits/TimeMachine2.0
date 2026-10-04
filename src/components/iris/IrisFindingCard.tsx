import { Clock, ShieldCheck, AlertTriangle, Layers, FileText, ExternalLink } from "lucide-react";
import type { IrisFinding } from "@/types/iris";

interface IrisFindingCardProps {
  finding: IrisFinding;
  onSelectCitation?: (citationId: string) => void;
}

const TYPE_ICONS = {
  TIMELINE: Clock,
  ASSET: ShieldCheck,
  USER: ShieldCheck,
  ATTACK_PATH: Layers,
  EVIDENCE: FileText,
  DETECTION_GAP: AlertTriangle,
  COUNTERFACTUAL: Layers,
  RISK: AlertTriangle,
  INVESTIGATION: FileText,
};

export function IrisFindingCard({ finding, onSelectCitation }: IrisFindingCardProps) {
  const Icon = TYPE_ICONS[finding.type] ?? FileText;

  return (
    <div className="rounded-xl border border-border/80 bg-card/60 p-3.5 text-xs backdrop-blur-md transition-all hover:border-cyan-signal/40 shadow-sm">
      <div className="flex items-center justify-between mb-1.5">
        <div className="flex items-center gap-2">
          <div className="flex size-6 items-center justify-center rounded-md bg-secondary text-cyan-signal border border-border/50">
            <Icon className="size-3.5" />
          </div>
          <span className="font-semibold text-foreground text-xs">{finding.title}</span>
        </div>
        <span
          className={`font-mono text-[9px] font-bold px-1.5 py-0.5 rounded border ${
            finding.confidence === "HIGH"
              ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
              : "bg-amber-500/10 text-amber-400 border-amber-500/20"
          }`}
        >
          {finding.confidence} CONFIDENCE
        </span>
      </div>

      <p className="text-muted-foreground text-[11px] leading-relaxed mb-2">{finding.summary}</p>

      {/* Citations badges */}
      {finding.citations.length > 0 && (
        <div className="flex flex-wrap gap-1.5 pt-1.5 border-t border-border/40">
          {finding.citations.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => onSelectCitation?.(c.id)}
              className="flex items-center gap-1 rounded bg-secondary/70 px-2 py-0.5 font-mono text-[9.5px] text-muted-foreground hover:text-cyan-signal hover:bg-secondary transition-colors"
            >
              <span>{c.label}</span>
              <ExternalLink className="size-2.5 opacity-60" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
