"use client";

import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { Activity, ArrowRight, Cpu, Database, ShieldAlert, TimerReset } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

import { useDemo } from "@/context/DemoContext";
import { cn } from "@/lib/utils";

type Chapter = {
  id: string;
  title: string;
  subtitle: string;
  label: string;
  description: string;
  metadata: string[];
  videoUrl: string;
};

const CHAPTERS: Chapter[] = [
  {
    id: "01",
    title: "OBSERVE",
    subtitle: "EVERY ATTACK LEAVES A TRACE.",
    label: "TELEMETRY / DETECTION",
    description:
      "Every authentication, process, network connection and endpoint event becomes part of the investigation timeline.",
    metadata: ["EVENT STREAM", "ENDPOINT ACTIVITY", "AUTHENTICATION", "NETWORK ACTIVITY"],
    videoUrl:
      "https://cdn.21st.dev/assets/mirror/13/130f3cb22e97770a1e0a2c66893bf5b63a1c21fd47598839a04d3af34c9da165.mp4",
  },
  {
    id: "02",
    title: "REWIND",
    subtitle: "RECONSTRUCT WHAT HAPPENED.",
    label: "TEMPORAL INVESTIGATION",
    description:
      "Move backward through the incident timeline to identify the first suspicious event, trace the attack path and reconstruct the sequence of compromise.",
    metadata: ["TIMELINE", "ATTACK PATH", "EVIDENCE", "CORRELATION"],
    videoUrl: "https://cdn.jsdelivr.net/gh/yuraoak/airlock-hero-assets@main/iss-hero-1080p.mp4",
  },
  {
    id: "03",
    title: "RESPOND",
    subtitle: "CHANGE WHAT HAPPENS NEXT.",
    label: "RESPONSE / VERIFICATION",
    description:
      "Simulate response actions, evaluate their impact, execute approved actions and verify whether the environment returned to a safe state.",
    metadata: ["SIMULATION", "CONTAINMENT", "RESPONSE", "VERIFICATION"],
    videoUrl:
      "https://cdn.21st.dev/assets/mirror/5d/5d00d3f51a1f753bb8f106955b9e116d86e82f34b173166ee79275ab10e670b1.mp4",
  },
];

export default function ScrollTriggeredVideoHero({ className }: { className?: string }) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [failedVideoId, setFailedVideoId] = useState<string | null>(null);
  const { incident, incidentState, currentRisk, currentTime } = useDemo();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.4 });

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      const boundedProgress = Math.min(1, Math.max(0, latest));
      const nextIndex = Math.min(
        Math.floor(boundedProgress * CHAPTERS.length),
        CHAPTERS.length - 1,
      );
      setActiveIndex(nextIndex);
    });

    return () => unsubscribe();
  }, [scrollYProgress]);

  const activeChapter = CHAPTERS[activeIndex] ?? CHAPTERS[0]!;

  const telemetrySummary = useMemo(() => {
    const eventCount = incident?.eventIds?.length ?? 0;
    const compromisedAssets = incidentState?.compromisedAssetIds?.length ?? 0;

    return [
      { label: "Event stream", value: `${eventCount} events`, icon: Activity },
      { label: "Active risk", value: currentRisk || "MONITORING", icon: ShieldAlert },
      { label: "Compromised assets", value: `${compromisedAssets} confirmed`, icon: Database },
      { label: "Current time", value: currentTime || "--:--", icon: TimerReset },
    ];
  }, [currentRisk, currentTime, incident?.eventIds, incidentState?.compromisedAssetIds]);

  const modeLabel = "DEMO ENVIRONMENT";
  const modeDetail = "SYNTHETIC TELEMETRY";

  return (
    <section
      ref={sectionRef}
      className={cn("relative isolate w-full bg-[#030816]", className)}
      style={{ height: `${CHAPTERS.length * 120}vh` }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="absolute inset-0 bg-[#030816]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(36,146,255,0.18),transparent_55%)]" />
        <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(148,163,184,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.08)_1px,transparent_1px)] [background-size:72px_72px]" />

        <motion.div
          key={activeChapter.id}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {failedVideoId !== activeChapter.id && (
            <video
              src={activeChapter.videoUrl}
              className="h-full w-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              onError={() => setFailedVideoId(activeChapter.id)}
            />
          )}
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(2,6,15,0.9)_0%,rgba(2,6,15,0.72)_35%,rgba(2,6,15,0.25)_70%,rgba(2,6,15,0.75)_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(2,6,15,0.4)_72%,rgba(2,6,15,0.82)_100%)]" />
        </motion.div>

        <div className="relative z-20 flex h-full items-end">
          <div className="mx-auto grid w-full max-w-7xl gap-10 px-6 pb-10 pt-20 lg:grid-cols-[1.2fr_0.8fr] lg:items-end lg:pb-14">
            <div className="max-w-[720px]">
              <div className="mb-6 flex flex-wrap items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.28em] text-slate-200/90">
                <span className="rounded-full border border-cyan-400/40 bg-cyan-400/10 px-3 py-1 text-cyan-200">
                  {modeLabel}
                </span>
                <span className="text-slate-300/80">{modeDetail}</span>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -18 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="space-y-6"
                >
                  <div className="flex items-center gap-4">
                    <div className="h-px w-14 bg-cyan-400" />
                    <span className="text-[10px] font-semibold uppercase tracking-[0.38em] text-cyan-200/90">
                      CHAPTER {activeChapter.id}
                    </span>
                  </div>

                  <div className="space-y-3">
                    <h1 className="text-4xl font-black uppercase tracking-[-0.06em] text-white sm:text-5xl lg:text-7xl">
                      {activeChapter.title}
                    </h1>
                    <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-100 sm:text-base">
                      {activeChapter.subtitle}
                    </p>
                  </div>

                  <div className="max-w-xl rounded-2xl border border-white/10 bg-slate-950/35 p-4 shadow-2xl shadow-cyan-950/20 backdrop-blur-xl">
                    <div className="mb-3 text-[10px] font-bold uppercase tracking-[0.34em] text-cyan-200/90">
                      {activeChapter.label}
                    </div>
                    <p className="text-base leading-7 text-slate-200/90 sm:text-lg">
                      {activeChapter.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {activeChapter.metadata.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.23em] text-slate-200/85"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="relative z-10 ml-auto w-full max-w-md rounded-2xl border border-white/10 bg-slate-950/55 p-4 shadow-2xl shadow-cyan-950/15 backdrop-blur-xl">
              <div className="mb-4 flex items-center justify-between border-b border-white/10 pb-3">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-slate-300/80">
                    INCIDENT STATUS
                  </p>
                  <p className="mt-1 text-2xl font-bold text-white">{incident?.id || "INC-2048"}</p>
                </div>
                <div className="rounded-full border border-emerald-400/30 bg-emerald-500/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-emerald-200">
                  {incident?.status || "ACTIVE"}
                </div>
              </div>

              <div className="space-y-3">
                {telemetrySummary.map(({ label, value, icon: Icon }) => (
                  <div
                    key={label}
                    className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-3 py-2.5"
                  >
                    <div className="flex items-center gap-3">
                      <span className="grid size-8 place-items-center rounded-lg bg-cyan-500/10 text-cyan-200">
                        <Icon className="size-4" />
                      </span>
                      <span className="text-[10px] uppercase tracking-[0.26em] text-slate-400">
                        {label}
                      </span>
                    </div>
                    <span className="text-right text-sm font-semibold text-slate-100">{value}</span>
                  </div>
                ))}
              </div>

              <div className="mt-4 flex items-center justify-between rounded-xl border border-cyan-400/20 bg-cyan-500/10 p-3 text-xs font-medium text-cyan-100">
                <div className="flex items-center gap-2">
                  <Cpu className="size-4 text-cyan-200" />
                  <span>Verified state</span>
                </div>
                <span className="uppercase tracking-[0.22em]">{currentRisk || "MEDIUM"}</span>
              </div>
            </div>
          </div>
        </div>

        <motion.div
          className="absolute bottom-8 left-1/2 z-30 flex w-[min(88vw,600px)] -translate-x-1/2 items-center gap-4 rounded-full border border-white/10 bg-slate-950/70 px-4 py-2.5 shadow-2xl shadow-cyan-950/25 backdrop-blur-xl"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex w-full items-center gap-4">
            <div className="flex min-w-0 flex-1 items-center gap-3">
              <div className="text-[10px] font-semibold uppercase tracking-[0.32em] text-slate-300/80">
                CHAPTER {activeChapter.id}
              </div>
              <div className="h-px flex-1 bg-white/10" />
            </div>

            <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-slate-200">
              {activeChapter.title}
            </div>
          </div>

          <div className="relative h-11 w-11 flex-none rounded-full border border-cyan-400/30 bg-cyan-400/10">
            <svg viewBox="0 0 48 48" className="absolute inset-0 h-full w-full -rotate-90">
              <circle
                cx="24"
                cy="24"
                r="18"
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="2"
                fill="none"
              />
              <motion.circle
                cx="24"
                cy="24"
                r="18"
                stroke="rgba(103,232,249,0.95)"
                strokeWidth="2"
                fill="none"
                strokeDasharray="113"
                style={{ pathLength: smoothProgress }}
              />
            </svg>
            <div className="absolute inset-0 grid place-items-center">
              <ArrowRight className="size-4 text-cyan-100" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
