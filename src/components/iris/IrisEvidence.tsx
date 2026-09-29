import { FileCheck, ExternalLink, ShieldCheck, AlertCircle } from "lucide-react";
import type { IrisCitation } from "@/types/iris";

interface IrisEvidenceProps {
  citations: IrisCitation[];
  onSelectCitation?: (citation: IrisCitation) => void;
}

export function IrisEvidence({ citations, onSelectCitation }: IrisEvidenceProps) {
  if (!citations || citations.length === 0) return null;

  return (
    <div className="rounded-lg border border-border/70 bg-secondary/20 p-3 space-y-2">
      <div className="flex items-center justify-between text-[11px] font-semibold text-foreground">
        <span className="flex items-center gap-1.5 text-cyan-signal">
          <ShieldCheck className="size-3.5" />
          Corroborating Telemetry & Evidence Citations ({citations.length})
        </span>
        <span className="font-mono text-[9px] text-muted-foreground uppercase">
          Source Grounded
        </span>
      </div>

      <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2">
        {citations.map((c) => (
          <div
            key={c.id}
            onClick={() => onSelectCitation?.(c)}
            className="group flex items-center justify-between gap-2 rounded border border-border/50 bg-background/50 p-2 text-[10px] hover:border-cyan-signal/50 hover:bg-secondary/40 cursor-pointer transition-colors"
          >
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5">
                <span className="font-mono font-bold text-foreground truncate">
                  {c.label}
                </span>
              </div>
              <div className="flex items-center gap-2 text-[9px] text-muted-foreground">
                <span className="uppercase text-cyan-signal font-semibold">
                  {c.type.replace(/_/g, " ")}
                </span>
                {c.timestamp && <span>@{c.timestamp}</span>}
                {c.sourceId && <span className="font-mono">ID: {c.sourceId}</span>}
              </div>
            </div>

            <ExternalLink className="size-3 shrink-0 text-muted-foreground opacity-50 group-hover:opacity-100 group-hover:text-cyan-signal transition-opacity" />
          </div>
        ))}
      </div>
    </div>
  );
}
