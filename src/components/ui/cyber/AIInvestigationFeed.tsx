import React from "react";
import { Link } from "@tanstack/react-router";
import { Bot, Sparkles, CheckCircle2, ShieldAlert, ArrowRight, BrainCircuit, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

interface InvestigationStep {
  time: string;
  step: string;
  type: "DETECT" | "CORRELATE" | "MAP" | "IDENTIFY" | "CONCLUSION";
  highlight?: boolean;
}

const STEPS: InvestigationStep[] = [
  {
    time: "14:32:08",
    step: "Anomaly detected: Unfamiliar ASN Kerberos ticket requested for operator identity.",
    type: "DETECT",
  },
  {
    time: "14:32:11",
    step: "Correlating authentication event with endpoint telemetry on WS-ANALYST-019...",
    type: "CORRELATE",
  },
  {
    time: "14:32:18",
    step: "Mapping attack path: Obfuscated PowerShell execution spawned under explorer.exe.",
    type: "MAP",
  },
  {
    time: "14:32:45",
    step: "Identified patient zero & initial access: External VPN credential spraying.",
    type: "IDENTIFY",
    highlight: true,
  },
];

export function AIInvestigationFeed() {
  return (
    <div className="flex flex-col h-full rounded border border-cyan-500/40 bg-[#04090E] p-4 font-mono text-xs">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-border/70 pb-2.5">
        <div className="flex items-center gap-2">
          <Bot className="size-4 text-cyan-400 animate-pulse" />
          <span className="text-xs font-bold uppercase tracking-wider text-slate-100">
            IRIS // AUTONOMOUS AI INVESTIGATION ENGINE
          </span>
        </div>
        <span className="flex items-center gap-1 rounded bg-cyan-950/40 px-2 py-0.5 text-[10px] font-bold text-cyan-300 border border-cyan-500/30">
          <Sparkles className="size-3 text-cyan-400" />
          CONFIDENCE: 94%
        </span>
      </div>

      {/* Investigation Steps Log */}
      <div className="my-3 space-y-2 text-[11px]">
        {STEPS.map((s, idx) => (
          <div
            key={idx}
            className={cn(
              "flex items-start gap-2 rounded border px-2.5 py-1.5",
              s.highlight
                ? "border-cyan-500/40 bg-cyan-950/20 text-cyan-200"
                : "border-border/40 bg-black/40 text-slate-300",
            )}
          >
            <span className="text-cyan-500 font-bold shrink-0">&gt;</span>
            <span className="text-slate-500 shrink-0 text-[10px]">{s.time}</span>
            <span className="leading-relaxed">{s.step}</span>
          </div>
        ))}
      </div>

      {/* Conclusion & Recommended Mitigation */}
      <div className="mt-auto rounded border border-red-500/30 bg-red-950/20 p-3">
        <div className="flex items-center gap-2 text-[10px] font-bold uppercase text-red-400">
          <ShieldAlert className="size-3.5 text-red-400" />
          <span>INVESTIGATION CONCLUSION & RECOMMENDED ACTION</span>
        </div>
        <p className="mt-1 font-sans text-xs text-slate-200 leading-relaxed">
          Attacker holds valid session token on <strong>WS-ANALYST-019</strong>. Immediate host
          isolation and Kerberos ticket revocation prevents projected lateral move to{" "}
          <strong>db-finance-vault</strong> with <strong>0% collateral impact</strong>.
        </p>

        <div className="mt-3 flex flex-wrap gap-2">
          <Link
            to="/simulation-lab"
            className="flex items-center gap-1.5 rounded bg-cyan-400 px-3 py-1.5 text-xs font-bold text-black hover:bg-cyan-300 transition-colors cursor-pointer"
          >
            <Zap className="size-3.5 fill-black" />
            <span>[ SIMULATE ISOLATION ACTION ]</span>
          </Link>
          <Link
            to="/iris"
            className="flex items-center gap-1 rounded border border-cyan-500/30 bg-black/60 px-3 py-1.5 text-xs text-cyan-300 hover:text-white transition-colors"
          >
            <span>DEEP INVESTIGATION DOSSIER</span>
            <ArrowRight className="size-3" />
          </Link>
        </div>
      </div>
    </div>
  );
}
