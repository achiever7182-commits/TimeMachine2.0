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
      <div className="flex flex-col gap-4 border-b border-[#0D1B24] pb-5 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1.5 font-mono text-[10px] text-[#00E5FF] tracking-[0.25em] uppercase">
            <Lock className="size-3.5 text-[#00E5FF] animate-pulse" />
            <span>INCIDENT COMMAND & TACTICAL CONTAINMENT CONSOLE</span>
          </div>
          <h1 className="font-mono text-2xl font-black uppercase tracking-wider text-[#E8F7FF] flex items-center gap-3">
            RESPONSE CENTER // INC-2048
            <span className={cn(
              "text-[10px] font-mono px-2 py-0.5 border font-bold",
              contained
                ? "border-[#00FF88] bg-[#00FF88]/15 text-[#00FF88]"
                : "border-[#FFB000] bg-[#FFB000]/15 text-[#FFB000]"
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
            className="rounded-none border-[#1683FF]/40 bg-[#071017] text-[#00E5FF] hover:bg-[#1683FF]/20 font-bold text-[11px] h-8 cursor-pointer"
          >
            <Link to="/simulation-lab">
              ⚡ SIMULATE FIRST &gt;
            </Link>
          </Button>
        </div>
      </div>

      {!responseApproved ? (
        <div className="space-y-4">
          <div className="border border-[#0D1B24] bg-[#050A0F] p-4 font-mono text-xs text-[#6F8A99]">
            <span className="text-[#00E5FF] font-bold">&gt; HUMAN-IN-THE-LOOP CONTROL MATRIX:</span>
            <p className="mt-1 text-[#E8F7FF]">
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
                    "border p-4 transition-all duration-150",
                    isSelected
                      ? "border-[#0D1B24] bg-[#050A0F] hover:border-[#00E5FF]/40"
                      : "border-[#0D1B24]/40 bg-[#03070B] opacity-60",
                  )}
                >
                  <div className="flex items-start gap-4">
                    <Checkbox
                      checked={isSelected}
                      onCheckedChange={(value) =>
                        setChecked((current) => ({ ...current, [action.id]: Boolean(value) }))
                      }
                      aria-label={`Select ${action.label}`}
                      className="mt-1 border-[#00E5FF]/50 data-[state=checked]:bg-[#00E5FF] data-[state=checked]:text-[#03070B] rounded-none"
                    />

                    <div className="min-w-0 flex-1 space-y-3">
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#0D1B24] pb-2.5">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-[#00E5FF] font-bold text-sm">
                            [{String(index + 1).padStart(2, "0")}]
                          </span>
                          <h2 className="font-bold text-sm uppercase text-[#E8F7FF] tracking-wide">
                            {action.label}
                          </h2>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="border border-[#FFB000]/40 bg-[#FFB000]/10 text-[#FFB000] px-2 py-0.5 text-[9px] font-bold">
                            RISK: {action.risk}
                          </span>
                          <span className="border border-[#00E5FF]/40 bg-[#00E5FF]/10 text-[#00E5FF] px-2 py-0.5 text-[9px] font-bold">
                            APPROVAL: REQUIRED
                          </span>
                        </div>
                      </div>

                      <p className="text-xs text-[#6F8A99] leading-relaxed">
                        {action.explanation}
                      </p>

                      <div className="grid gap-3 sm:grid-cols-2 text-xs">
                        <div className="border border-[#0D1B24] bg-[#071017] p-2.5">
                          <span className="text-[9px] text-[#6F8A99] uppercase block mb-0.5">&gt; EXPECTED EFFECT:</span>
                          <span className="text-[#00E5FF] font-medium">{action.expectedEffect}</span>
                        </div>
                        <div className="border border-[#0D1B24] bg-[#071017] p-2.5">
                          <span className="text-[9px] text-[#6F8A99] uppercase block mb-0.5">&gt; BUSINESS IMPACT:</span>
                          <span className="text-[#FFB000] font-medium">{action.businessImpact}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#0D1B24] pt-5 font-mono">
            <div className="text-[10px] text-[#6F8A99]">
              <span>STATUS:</span> <span className="text-[#E8F7FF] font-bold">{Object.values(checked).filter(Boolean).length} OF {responseActions.length} ACTIONS SELECTED</span>
            </div>

            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                onClick={() => setChecked(Object.fromEntries(responseActions.map((a) => [a.id, true])))}
                className="rounded-none border-[#0D1B24] bg-transparent text-[#6F8A99] hover:text-[#E8F7FF] text-xs h-9 cursor-pointer"
              >
                SELECT ALL
              </Button>
              <Button
                onClick={approveResponse}
                disabled={!allSelected}
                className="rounded-none bg-[#00E5FF] text-[#03070B] hover:bg-[#00E5FF]/90 font-black text-xs h-9 px-6 cursor-pointer shadow-[0_0_15px_rgba(0,229,255,0.4)] tracking-wider"
              >
                ⚡ EXECUTE RESPONSE PLAYBOOK
              </Button>
            </div>
          </div>
        </div>
      ) : (
        /* SECURED DRAMATIC END STATE */
        <div className={cn(
          "border p-6 sm:p-8 font-mono space-y-6 transition-all duration-700",
          contained
            ? "border-[#00FF88] bg-[#00FF88]/5 shadow-[0_0_30px_rgba(0,255,136,0.15)]"
            : "border-[#00E5FF] bg-[#00E5FF]/5 shadow-[0_0_20px_rgba(0,229,255,0.1)]"
        )}>
          {/* Center Status Icon */}
          <div className="text-center space-y-4">
            <div className={cn(
              "mx-auto size-20 border flex items-center justify-center transition-all duration-500",
              contained
                ? "border-[#00FF88] bg-[#00FF88]/15 text-[#00FF88] shadow-[0_0_20px_#00FF88]"
                : "border-[#00E5FF] bg-[#00E5FF]/15 text-[#00E5FF] animate-pulse"
            )}>
              <ShieldCheck className="size-10" />
            </div>

            <div>
              <h2 className={cn(
                "text-2xl sm:text-3xl font-black uppercase tracking-wider",
                contained ? "text-[#00FF88]" : "text-[#00E5FF]"
              )}>
                {contained ? "SYSTEM SECURED // THREAT CONTAINED" : "EXECUTING SIMULATED CONTAINMENT..."}
              </h2>
              <p className="mt-1 text-xs text-[#6F8A99]">
                {contained
                  ? "All kill-chain nodes isolated. Forensic state preserved. Network telemetry verified clean."
                  : "Applying cryptographic isolation rules and session revocations across virtual nodes."}
              </p>
            </div>
          </div>

          {/* SECURED METRIC HUD */}
          {contained && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 border-y border-[#00FF88]/30 py-4 text-center">
              <div>
                <span className="text-[8.5px] text-[#6F8A99] uppercase block">SYSTEM INTEGRITY</span>
                <span className="text-xl font-bold text-[#00FF88]">100%</span>
              </div>
              <div>
                <span className="text-[8.5px] text-[#6F8A99] uppercase block">ACTIVE THREATS</span>
                <span className="text-xl font-bold text-[#00FF88]">00</span>
              </div>
              <div>
                <span className="text-[8.5px] text-[#6F8A99] uppercase block">COMPROMISED HOSTS</span>
                <span className="text-xl font-bold text-[#00FF88]">00 ISOLATED</span>
              </div>
              <div>
                <span className="text-[8.5px] text-[#6F8A99] uppercase block">EVIDENCE</span>
                <span className="text-xl font-bold text-[#00E5FF]">PRESERVED</span>
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
                    "flex items-center gap-3 border p-3 text-xs transition-all",
                    done
                      ? "border-[#00FF88]/40 bg-[#00FF88]/10 text-[#00FF88]"
                      : running
                        ? "border-[#00E5FF] bg-[#00E5FF]/10 text-[#00E5FF]"
                        : "border-[#0D1B24] bg-[#050A0F] text-[#6F8A99]",
                  )}
                >
                  <span className="font-bold font-mono">
                    {done ? (
                      <Check className="size-4 text-[#00FF88]" />
                    ) : running ? (
                      <LoaderCircle className="size-4 animate-spin text-[#00E5FF]" />
                    ) : (
                      <Circle className="size-3 text-[#6F8A99]" />
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
                className="rounded-none bg-[#00FF88] text-[#03070B] hover:bg-[#00FF88]/90 font-bold text-xs h-9 px-6 cursor-pointer shadow-[0_0_15px_rgba(0,255,136,0.4)]"
              >
                <Link to="/reports">
                  VIEW INCIDENT FORENSIC REPORT &gt;
                </Link>
              </Button>
              <Button
                variant="outline"
                onClick={resetDemo}
                className="rounded-none border-[#0D1B24] bg-[#071017] text-[#6F8A99] hover:text-[#E8F7FF] text-xs h-9 cursor-pointer"
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

