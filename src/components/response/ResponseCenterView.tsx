import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Check,
  Circle,
  LoaderCircle,
  ShieldCheck,
  SlidersHorizontal,
  ShieldAlert,
  AlertTriangle,
  Lock,
  Terminal,
  FileCheck,
  RotateCcw,
  Zap,
  Activity,
  CheckCircle2,
  Server,
  Key,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useDemo } from "@/context/DemoContext";
import { responseActions } from "@/data/incidents";
import { cn } from "@/lib/utils";
import { CyberPanel } from "@/components/ui/cyber/CyberPanel";

export function ResponseCenterView() {
  const { responseApproved, approveResponse, executionStep, resetDemo } = useDemo();
  const [checked, setChecked] = useState<Record<string, boolean>>(
    Object.fromEntries(responseActions.map((action) => [action.id, true])),
  );
  const allSelected = responseActions.every((action) => checked[action.id]);
  const contained = responseApproved && executionStep >= responseActions.length;

  return (
    <div className="mx-auto max-w-5xl space-y-6 font-sans animate-fade-in">
      {/* HEADER BAR */}
      <div className="flex flex-col gap-4 border-b border-[#1B2933] pb-5 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1.5 font-mono text-[10px] text-[#16D9F2] tracking-[0.2em] uppercase">
            <Lock className="size-3.5 text-[#16D9F2] animate-pulse" />
            <span>INCIDENT COMMAND & TACTICAL CONTAINMENT CONSOLE</span>
          </div>
          <h1 className="font-mono text-2xl font-black uppercase tracking-wider text-[#F3F7FA] flex items-center gap-3">
            RESPONSE CENTER // INC-2048
            <span className={cn(
              "text-[10px] font-mono px-2 py-0.5 border font-bold rounded-[2px]",
              contained
                ? "border-[#20DFA0] bg-[#20DFA0]/15 text-[#20DFA0]"
                : "border-[#FFB020] bg-[#FFB020]/15 text-[#FFB020]"
            )}>
              {contained ? "SYSTEM SECURED" : "APPROVAL PENDING"}
            </span>
          </h1>
        </div>

        <div className="flex items-center gap-2.5 font-mono text-xs">
          <Button
            asChild
            size="sm"
            variant="outline"
            className="rounded-[3px] border-[#3B82F6]/40 bg-[#0B1117] text-[#3B82F6] hover:bg-[#3B82F6]/20 font-bold text-[11px] h-8 cursor-pointer"
          >
            <Link to="/simulation-lab">
              ⚡ SIMULATE FIRST &gt;
            </Link>
          </Button>
        </div>
      </div>

      {!responseApproved ? (
        <div className="space-y-4">
          <div className="border border-[#1B2933] bg-[#070C11] p-4 font-mono text-xs text-[#A5B5C0] rounded-[3px]">
            <span className="text-[#16D9F2] font-bold">&gt; HUMAN-IN-THE-LOOP CONTROL MATRIX:</span>
            <p className="mt-1 text-[#F3F7FA]">
              Autonomous response playbook ready for incident INC-2048. Review and authorize tactical containment procedures below before synthetic execution.
            </p>
          </div>

          <div className="space-y-3 font-mono">
            {responseActions.map((action, index) => {
              const isSelected = Boolean(checked[action.id]);
              return (
                <div
                  key={action.id}
                  className={cn(
                    "border p-4 transition-all duration-150 rounded-[3px]",
                    isSelected
                      ? "border-[#1B2933] bg-[#070C11] hover:border-[#16D9F2]/40"
                      : "border-[#1B2933]/40 bg-[#05080C] opacity-60",
                  )}
                >
                  <div className="flex items-start gap-4">
                    <Checkbox
                      checked={isSelected}
                      onCheckedChange={(value) =>
                        setChecked((current) => ({ ...current, [action.id]: Boolean(value) }))
                      }
                      aria-label={`Select ${action.label}`}
                      className="mt-1 border-[#16D9F2]/50 data-[state=checked]:bg-[#16D9F2] data-[state=checked]:text-[#05080C] rounded-[2px]"
                    />

                    <div className="min-w-0 flex-1 space-y-3">
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#1B2933] pb-2.5">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-[#16D9F2] font-bold text-sm">
                            [{String(index + 1).padStart(2, "0")}]
                          </span>
                          <h2 className="font-bold text-sm uppercase text-[#F3F7FA] tracking-wide">
                            {action.label}
                          </h2>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="border border-[#FFB020]/40 bg-[#FFB020]/10 text-[#FFB020] px-2 py-0.5 text-[9px] font-bold rounded-[2px]">
                            RISK: {action.risk}
                          </span>
                          <span className="border border-[#16D9F2]/40 bg-[#16D9F2]/10 text-[#16D9F2] px-2 py-0.5 text-[9px] font-bold rounded-[2px]">
                            APPROVAL: REQUIRED
                          </span>
                        </div>
                      </div>

                      <p className="text-xs text-[#A5B5C0] leading-relaxed">
                        {action.explanation}
                      </p>

                      <div className="grid gap-3 sm:grid-cols-2 text-xs">
                        <div className="border border-[#1B2933] bg-[#0B1117] p-2.5 rounded-[2px]">
                          <span className="text-[9px] text-[#7893A1] uppercase block mb-0.5">&gt; EXPECTED EFFECT:</span>
                          <span className="text-[#16D9F2] font-medium">{action.expectedEffect}</span>
                        </div>
                        <div className="border border-[#1B2933] bg-[#0B1117] p-2.5 rounded-[2px]">
                          <span className="text-[9px] text-[#7893A1] uppercase block mb-0.5">&gt; BUSINESS IMPACT:</span>
                          <span className="text-[#FFB020] font-medium">{action.businessImpact}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#1B2933] pt-5 font-mono">
            <div className="text-[10px] text-[#7893A1]">
              <span>STATUS:</span> <span className="text-[#F3F7FA] font-bold">{Object.values(checked).filter(Boolean).length} OF {responseActions.length} ACTIONS SELECTED</span>
            </div>

            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                onClick={() => setChecked(Object.fromEntries(responseActions.map((a) => [a.id, true])))}
                className="rounded-[3px] border-[#1B2933] bg-transparent text-[#A5B5C0] hover:text-[#F3F7FA] text-xs h-9 cursor-pointer"
              >
                SELECT ALL
              </Button>
              <Button
                onClick={approveResponse}
                disabled={!allSelected}
                className="rounded-[3px] bg-[#16D9F2]/15 text-[#16D9F2] border border-[#16D9F2]/50 hover:bg-[#16D9F2] hover:text-[#05080C] font-black text-xs h-9 px-6 cursor-pointer shadow-[0_0_10px_rgba(22,217,242,0.12)] tracking-wider"
              >
                ⚡ EXECUTE RESPONSE PLAYBOOK
              </Button>
            </div>
          </div>
        </div>
      ) : (
        /* SECURED DRAMATIC END STATE */
        <div className={cn(
          "border p-6 sm:p-8 font-mono space-y-6 transition-all duration-700 rounded-[4px]",
          contained
            ? "border-[#20DFA0] bg-[#20DFA0]/5 shadow-[0_0_10px_rgba(32,223,160,0.10)]"
            : "border-[#16D9F2] bg-[#16D9F2]/5 shadow-[0_0_10px_rgba(22,217,242,0.12)]"
        )}>
          {/* Center Status Icon */}
          <div className="text-center space-y-4">
            <div className={cn(
              "mx-auto size-20 border flex items-center justify-center transition-all duration-500 rounded-[4px]",
              contained
                ? "border-[#20DFA0] bg-[#20DFA0]/15 text-[#20DFA0] shadow-[0_0_10px_rgba(32,223,160,0.10)]"
                : "border-[#16D9F2] bg-[#16D9F2]/15 text-[#16D9F2] animate-pulse"
            )}>
              <ShieldCheck className="size-10" />
            </div>

            <div>
              <h2 className={cn(
                "text-2xl sm:text-3xl font-black uppercase tracking-wider",
                contained ? "text-[#20DFA0]" : "text-[#16D9F2]"
              )}>
                {contained ? "SYSTEM SECURED // THREAT CONTAINED" : "EXECUTING SIMULATED CONTAINMENT..."}
              </h2>
              <p className="mt-1 text-xs text-[#A5B5C0]">
                {contained
                  ? "All kill-chain nodes isolated. Forensic state preserved. Network telemetry verified clean."
                  : "Applying cryptographic isolation rules and session revocations across virtual nodes."}
              </p>
            </div>
          </div>

          {/* SECURED METRIC HUD */}
          {contained && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 border-y border-[#20DFA0]/30 py-4 text-center">
              <div>
                <span className="text-[8.5px] text-[#7893A1] uppercase block">SYSTEM INTEGRITY</span>
                <span className="text-xl font-bold text-[#20DFA0]">100%</span>
              </div>
              <div>
                <span className="text-[8.5px] text-[#7893A1] uppercase block">ACTIVE THREATS</span>
                <span className="text-xl font-bold text-[#20DFA0]">00</span>
              </div>
              <div>
                <span className="text-[8.5px] text-[#7893A1] uppercase block">COMPROMISED HOSTS</span>
                <span className="text-xl font-bold text-[#20DFA0]">00 ISOLATED</span>
              </div>
              <div>
                <span className="text-[8.5px] text-[#7893A1] uppercase block">EVIDENCE</span>
                <span className="text-xl font-bold text-[#16D9F2]">PRESERVED</span>
              </div>
            </div>
          )}

          {/* Step Progress Checklist */}
          <div className="space-y-2.5 max-w-xl mx-auto">
            {responseActions.map((action, index) => {
              const done = executionStep > index;
              const running = executionStep === index;
              return (
                <div
                  key={action.id}
                  className={cn(
                    "flex items-center gap-3 border p-3 text-xs transition-all rounded-[3px]",
                    done
                      ? "border-[#20DFA0]/40 bg-[#20DFA0]/10 text-[#20DFA0]"
                      : running
                        ? "border-[#16D9F2] bg-[#16D9F2]/10 text-[#16D9F2]"
                        : "border-[#1B2933] bg-[#070C11] text-[#647682]",
                  )}
                >
                  <span className="font-bold font-mono">
                    {done ? (
                      <Check className="size-4 text-[#20DFA0]" />
                    ) : running ? (
                      <LoaderCircle className="size-4 animate-spin text-[#16D9F2]" />
                    ) : (
                      <Circle className="size-3 text-[#647682]" />
                    )}
                  </span>
                  <span className="font-medium flex-1">
                    {action.label}
                  </span>
                  <span className="text-[9px] uppercase font-bold">
                    {done ? "[ VERIFIED ]" : running ? "[ EXECUTING... ]" : "[ QUEUED ]"}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Post-Containment Actions */}
          {contained && (
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
              <Button
                asChild
                className="rounded-[3px] bg-[#20DFA0]/15 text-[#20DFA0] border border-[#20DFA0]/50 hover:bg-[#20DFA0] hover:text-[#05080C] font-bold text-xs h-9 px-6 cursor-pointer shadow-[0_0_10px_rgba(32,223,160,0.10)]"
              >
                <Link to="/reports">
                  VIEW INCIDENT FORENSIC REPORT &gt;
                </Link>
              </Button>
              <Button
                variant="outline"
                onClick={resetDemo}
                className="rounded-[3px] border-[#1B2933] bg-[#0B1117] text-[#A5B5C0] hover:text-[#F3F7FA] text-xs h-9 cursor-pointer"
              >
                RESET SIMULATION
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

