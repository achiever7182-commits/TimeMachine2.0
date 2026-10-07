import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Play,
  ShieldCheck,
  Sparkles,
  SlidersHorizontal,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import IncidentTimeMachine3D from "@/components/ui/incident-time-machine-3d";
import AirlockHero from "@/components/ui/airlock-spaceship-hero";
import ScrollTriggeredVideoHero from "@/components/ui/scroll-triggered-video-hero";

export function LandingPage() {
  const [interactiveMode, setInteractiveMode] = useState(false);

  return (
    <main className="relative min-h-screen w-full bg-black text-foreground overflow-x-clip">
      {/* Keep the original scroll-locked room intro before the cyber incident chapters. */}
      <AirlockHero
        title="THE TIME MACHINE OPENS"
        tagline="WHAT IF YOU COULD REWIND THE ATTACK — AND CHANGE WHAT HAPPENS NEXT?"
      />
      <ScrollTriggeredVideoHero />

      {/* Main Landing Page Content */}
      <div className="relative w-full">
        {/* Background Grid Pattern */}
        <div className="absolute inset-0 bg-command-grid opacity-40 pointer-events-none z-0" />

        {/* Navigation Header */}
        <header className="relative z-20 mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div className="flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-lg border border-cyan-glow bg-primary/15 shadow-glow">
              <ShieldCheck className="size-5 text-cyan-signal" />
            </span>
            <div>
              <span className="block font-semibold tracking-wide text-sm sm:text-base">
                INCIDENT TIME MACHINE
              </span>
              <span className="block text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
                RECONSTRUCT • REWIND • SIMULATE • RESPOND
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-flex items-center gap-2 rounded-full border border-green-signal/30 bg-green-signal/10 px-3 py-1 text-xs font-semibold text-green-signal">
              <span className="size-2 rounded-full bg-green-signal animate-pulse" />
              DEMO ONLINE
            </span>
            <Button
              asChild
              variant="outline"
              size="sm"
              className="text-xs font-mono border-red-500/30 bg-red-950/20 text-red-300 hover:bg-red-500/20"
            >
              <Link to="/admin">
                <ShieldCheck className="mr-1.5 size-3.5 text-red-400" />
                Admin Portal
              </Link>
            </Button>
            <Button
              asChild
              size="sm"
              className="text-xs font-mono bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 hover:bg-cyan-400 hover:text-black font-bold"
            >
              <Link to="/login">
                Operator Login
              </Link>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setInteractiveMode(!interactiveMode)}
              className="text-xs font-mono border-cyan-glow/40 bg-card/60"
            >
              <SlidersHorizontal className="mr-1.5 size-3.5 text-cyan-signal" />
              {interactiveMode ? "Hero Mode" : "Workshop Mode"}
            </Button>
          </div>
        </header>

        {/* Main 3D Hero Section */}
        <section className="relative z-10 w-full min-h-[calc(100vh-80px)] flex flex-col justify-center">
          {/* 3D Canvas Container */}
          <div className="absolute inset-0 w-full h-full z-0">
            <IncidentTimeMachine3D height="100%" embed={!interactiveMode} />
          </div>

          {/* Hero Content Overlay (Left Aligned for Hero Mode, Hidden in Full Workshop Mode) */}
          {!interactiveMode && (
            <div className="relative z-10 mx-auto max-w-7xl w-full px-6 py-12 pointer-events-none">
              <div className="max-w-xl pointer-events-auto bg-black/50 backdrop-blur-md p-6 sm:p-8 rounded-2xl border border-white/10 shadow-2xl">
                <div className="inline-flex items-center gap-2 rounded-full border border-cyan-glow/40 bg-cyan-glow/10 px-3 py-1 text-xs font-semibold text-cyan-signal uppercase tracking-wider mb-4">
                  <Sparkles className="size-3.5" />
                  Cybersecurity Incident Response
                </div>

                <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-[1.05]">
                  INCIDENT <br />
                  <span className="bg-gradient-to-r from-orange-400 via-amber-300 to-cyan-400 bg-clip-text text-transparent">
                    TIME MACHINE
                  </span>
                </h1>

                <p className="mt-3 font-mono text-xs text-amber-400 tracking-widest uppercase">
                  RECONSTRUCT • REWIND • SIMULATE • RESPOND
                </p>

                <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
                  Don’t just respond to an attack.{" "}
                  <span className="text-white font-semibold">
                    Rewind it. Understand it. Simulate it. Stop it.
                  </span>
                </p>

                <p className="mt-2 text-xs sm:text-sm text-slate-400 leading-normal">
                  Reconstruct historical timelines, inspect critical decision points, and simulate
                  counterfactual response actions before executing mitigation.
                </p>

                {/* 5-Stage Execution Pipeline Badges */}
                <div className="mt-6 flex flex-wrap items-center gap-1.5 font-mono text-[11px]">
                  {["01 ATTACK", "02 RECONSTRUCT", "03 REWIND", "04 SIMULATE", "05 RESPOND"].map(
                    (stage, idx) => (
                      <span key={stage} className="flex items-center gap-1.5 text-slate-300">
                        <span className="rounded bg-white/10 px-2 py-0.5 border border-white/15 hover:border-amber-400/50 transition-colors">
                          {stage}
                        </span>
                        {idx < 4 && <ChevronRight className="size-3 text-amber-500/70" />}
                      </span>
                    ),
                  )}
                </div>

                {/* CTAs */}
                <div className="mt-8 flex flex-wrap gap-4">
                  <Button
                    asChild
                    size="lg"
                    className="bg-amber-500 hover:bg-amber-600 text-black font-semibold shadow-lg shadow-amber-500/20"
                  >
                    <Link to="/dashboard">
                      Enter Security Center <ArrowRight className="ml-2 size-4" />
                    </Link>
                  </Button>
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="border-white/20 bg-black/40 hover:bg-white/10"
                  >
                    <Link to="/time-machine">
                      <Play className="mr-2 size-4 text-cyan-signal" /> Watch Live Incident Demo
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Secondary Feature Overview */}
        <section className="relative z-10 mx-auto max-w-7xl px-6 py-16 border-t border-white/10">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="rounded-xl border border-white/10 bg-card/40 p-6 backdrop-blur-md">
              <div className="font-mono text-xs text-amber-400">01 — RECONSTRUCT</div>
              <h3 className="mt-2 text-lg font-semibold">Graph & Security State</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Automatically builds identity graph, compromised assets, lateral movement paths, and
                evidence state surrounding the incident.
              </p>
            </div>
            <div className="rounded-xl border border-white/10 bg-card/40 p-6 backdrop-blur-md">
              <div className="font-mono text-xs text-amber-400">02 — REWIND</div>
              <h3 className="mt-2 text-lg font-semibold">Earliest Opportunity</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Scrub backward in time to inspect what defenders knew at the exact moment of initial
                access and initial authentication anomaly.
              </p>
            </div>
            <div className="rounded-xl border border-white/10 bg-card/40 p-6 backdrop-blur-md">
              <div className="font-mono text-xs text-amber-400">03 — SIMULATE & RESPOND</div>
              <h3 className="mt-2 text-lg font-semibold">Counterfactual Branching</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Simulate host isolation, credential suspension, and firewall block scenarios to
                verify risk reduction before live execution.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
