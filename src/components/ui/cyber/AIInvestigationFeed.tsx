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
    <div className="flex flex-col h-full rounded-[2px] border border-[#1A2730] bg-[#0B1117] p-4 font-mono text-xs">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-[#1A2730] pb-2.5">
        <div className="flex items-center gap-2">
          <Bot className="size-3.5 text-[#19E6FF] animate-pulse" />
          <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#F2F7FA]">
            IRIS // AUTONOMOUS AI INVESTIGATION ENGINE
          </span>
        </div>
        <span className="flex items-center gap-1 rounded-[2px] bg-[#08758A]/20 px-2 py-0.5 text-[9.5px] font-bold text-[#19E6FF] border border-[#19E6FF]/30">
          <Sparkles className="size-3 text-[#19E6FF]" />
          CONFIDENCE: 94%
        </span>
      </div>

      {/* Investigation Steps Log */}
      <div className="my-3 space-y-1.5 text-[10.5px]">
        {STEPS.map((s, idx) => (
          <div
            key={idx}
            className={cn(
              "flex items-start gap-2 rounded-[2px] border px-2.5 py-1.5 transition-colors",
              s.highlight
                ? "border-[#19E6FF]/40 bg-[#08758A]/10 text-[#F2F7FA]"
                : "border-[#142029] bg-[#080D12] text-[#A6B6C2]",
            )}
          >
            <span className="text-[#19E6FF] font-bold shrink-0">&gt;</span>
            <span className="text-[#667783] shrink-0 text-[9.5px]">{s.time}</span>
            <span className="leading-relaxed">{s.step}</span>
          </div>
        ))}
      </div>

      {/* Conclusion & Recommended Mitigation */}
      <div className="mt-auto rounded-[2px] border border-[#FF3045]/30 bg-[#B91C2E]/10 p-3">
        <div className="flex items-center gap-2 text-[9.5px] font-bold uppercase text-[#FF5264]">
          <ShieldAlert className="size-3.5 text-[#FF3045]" />
          <span>// INVESTIGATION CONCLUSION & RECOMMENDED ACTION</span>
        </div>
        <p className="mt-1 font-sans text-[11.5px] text-[#F2F7FA] leading-relaxed">
          Attacker holds valid session token on <strong className="text-[#19E6FF]">WS-ANALYST-019</strong>. Immediate host
          isolation and Kerberos ticket revocation prevents projected lateral move to{" "}
          <strong className="text-[#FF5264]">db-finance-vault</strong> with <strong className="text-[#20E3A2]">0% collateral impact</strong>.
        </p>

        <div className="mt-3 flex flex-wrap gap-2">
          <Link
            to="/simulation-lab"
            className="flex items-center gap-1.5 rounded-[2px] bg-[#19E6FF] px-3 py-1 text-[10.5px] font-mono font-bold text-[#05080C] hover:bg-[#5CEFFF] transition-colors cursor-pointer shadow-[0_0_10px_rgba(25,230,255,0.3)]"
          >
            <Zap className="size-3 fill-[#05080C]" />
            <span>[ SIMULATE ISOLATION ACTION ]</span>
          </Link>
          <Link
            to="/iris"
            className="flex items-center gap-1 rounded-[2px] border border-[#19E6FF]/30 bg-[#080D12] px-3 py-1 text-[10.5px] font-mono text-[#19E6FF] hover:text-white transition-colors"
          >
            <span>DEEP INVESTIGATION DOSSIER</span>
            <ArrowRight className="size-3" />
          </Link>
        </div>
      </div>
    </div>
  );
}

