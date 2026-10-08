import React, { useEffect, useRef, useState } from "react";
import {
  ShieldAlert,
  Terminal,
  RotateCcw,
  Activity,
  Radio,
  Clock,
  Cpu,
  Eye,
  Layers,
  Sparkles,
  Lock,
  Flame,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";
import { useDemo } from "@/context/DemoContext";
import { cn } from "@/lib/utils";

export interface TemporalCoreCubeProps {
  incidentId?: string;
  incidentTitle?: string;
  minute?: number;
  stage?: string;
  currentTime?: string;
  currentRisk?: string;
  compromisedAssets?: string[];
  autoRotateDefault?: boolean;
  className?: string;
}

export interface PoemAnimationProps {
  poemHTML?: string;
  backgroundImageUrl?: string;
  boyImageUrl?: string;
  incidentId?: string;
  incidentTitle?: string;
  minute?: number;
  stage?: string;
  currentTime?: string;
  currentRisk?: string;
  className?: string;
}

type CubeFace = "front" | "right" | "back" | "left" | "top" | "bottom";

/**
 * 3D Temporal Core Animation Cube
 * Transformed from the 3D poem animation concept into an elite TimeMachine
 * Cyber Incident & Telemetry Reconstruction Core.
 *
 * Consumes real Incident Time Machine state (minute, blast radius, risk, MITRE TTPs).
 */
export const TemporalCoreCube: React.FC<TemporalCoreCubeProps> = ({
  incidentId: propId,
  incidentTitle: propTitle,
  minute: propMinute,
  stage: propStage,
  currentTime: propCurrentTime,
  currentRisk: propCurrentRisk,
  compromisedAssets: propAssets,
  autoRotateDefault = true,
  className,
}) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const demo = useDemo();

  // Active state derived from props or DemoContext
  const incidentId = propId || demo.incident?.id || "INC-2048";
  const incidentTitle =
    propTitle || demo.incident?.title || "Multi-stage Compromise via Stolen Credentials";
  const minute = propMinute !== undefined ? propMinute : (demo.incidentState?.minute ?? 18);
  const stage =
    propStage ||
    demo.incidentState?.stage ||
    (minute >= 36 ? "Exfiltration" : minute >= 25 ? "Lateral Movement" : "Initial Access");
  const currentTime = propCurrentTime || demo.currentTime || "14:32:18";
  const currentRisk =
    propCurrentRisk ||
    demo.currentRisk ||
    (minute >= 30 ? "CRITICAL" : minute >= 15 ? "HIGH" : "MEDIUM");
  const compromisedCount = propAssets
    ? propAssets.length
    : (demo.incidentState?.compromisedAssetIds?.length ?? (minute >= 18 ? 2 : 1));

  const [isAutoOrbit, setIsAutoOrbit] = useState(autoRotateDefault);
  const [activeFace, setActiveFace] = useState<CubeFace>("front");
  const [rotation, setRotation] = useState<{ x: number; y: number }>({ x: -16, y: 25 });

  // Responsive scaling handler from original 3d-animation design
  useEffect(() => {
    function adjustContentSize() {
      if (contentRef.current) {
        const viewportWidth = window.innerWidth;
        const baseWidth = 980;
        const scaleFactor = viewportWidth < baseWidth ? (viewportWidth / baseWidth) * 0.92 : 1;
        contentRef.current.style.transform = `scale(${scaleFactor})`;
      }
    }

    adjustContentSize();
    window.addEventListener("resize", adjustContentSize);
    return () => window.removeEventListener("resize", adjustContentSize);
  }, []);

  // Update manual face rotations
  const handleFaceSelect = (face: CubeFace) => {
    setIsAutoOrbit(false);
    setActiveFace(face);
    switch (face) {
      case "front":
        setRotation({ x: -12, y: 0 });
        break;
      case "right":
        setRotation({ x: -12, y: -90 });
        break;
      case "back":
        setRotation({ x: -12, y: -180 });
        break;
      case "left":
        setRotation({ x: -12, y: 90 });
        break;
      case "top":
        setRotation({ x: -85, y: 0 });
        break;
      case "bottom":
        setRotation({ x: 75, y: 0 });
        break;
    }
  };

  const threatColor =
    currentRisk === "CRITICAL" || currentRisk === "Critical"
      ? "text-threat border-threat/40 bg-threat/10"
      : currentRisk === "HIGH" || currentRisk === "High"
        ? "text-warning border-warning/40 bg-warning/10"
        : "text-cyan-signal border-cyan-signal/40 bg-cyan-signal/10";

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden rounded-xl border border-cyan-500/20 bg-background p-4 font-sans select-none",
        className,
      )}
    >
      {/* Background Cyber Floor Grid & Scanning Beam */}
      <div className="pointer-events-none absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00d9ff10_1px,transparent_1px),linear-gradient(to_bottom,#00d9ff10_1px,transparent_1px)] bg-[size:3rem_3rem]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/10 to-transparent h-full w-full animate-pulse" />
      </div>

      {/* Top HUD Controls */}
      <div className="relative z-20 mb-4 flex flex-wrap items-center justify-between gap-3 border-b border-cyan-500/20 pb-3 font-mono text-xs">
        <div className="flex items-center gap-2.5">
          <div className="flex size-6 items-center justify-center rounded border border-cyan-400/40 bg-card text-cyan-400 shadow-glow">
            <RotateCcw className="size-3.5 animate-spin" style={{ animationDuration: "12s" }} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold tracking-widest text-cyan-400">TEMPORAL CORE CUBE</span>
              <span
                className={cn("rounded px-1.5 py-0.2 text-[10px] font-bold border", threatColor)}
              >
                [{currentRisk}]
              </span>
            </div>
            <div className="text-[10px] text-slate-400 tracking-wider">
              {incidentId} // T+{String(minute).padStart(2, "0")}:00 // {currentTime} UTC
            </div>
          </div>
        </div>

        {/* Orbit & Face Switcher Controls */}
        <div className="flex flex-wrap items-center gap-1.5 text-[10px]">
          <button
            onClick={() => setIsAutoOrbit(!isAutoOrbit)}
            className={cn(
              "rounded px-2.5 py-1 font-bold tracking-wider transition-all border",
              isAutoOrbit
                ? "bg-cyan-500/20 text-cyan-300 border-cyan-400 shadow-[0_0_10px_rgba(0,229,255,0.3)]"
                : "bg-card text-slate-400 border-slate-700 hover:text-cyan-400",
            )}
          >
            [◈ ORBIT {isAutoOrbit ? "ON" : "OFF"}]
          </button>
          <button
            onClick={() => handleFaceSelect("front")}
            className={cn(
              "rounded px-2 py-1 transition-all border",
              activeFace === "front" && !isAutoOrbit
                ? "border-cyan-400 bg-cyan-950 text-cyan-300"
                : "border-slate-800 bg-card text-slate-400 hover:text-cyan-400",
            )}
          >
            OVERVIEW
          </button>
          <button
            onClick={() => handleFaceSelect("left")}
            className={cn(
              "rounded px-2 py-1 transition-all border",
              activeFace === "left" && !isAutoOrbit
                ? "border-cyan-400 bg-cyan-950 text-cyan-300"
                : "border-slate-800 bg-card text-slate-400 hover:text-cyan-400",
            )}
          >
            EVENTS
          </button>
          <button
            onClick={() => handleFaceSelect("right")}
            className={cn(
              "rounded px-2 py-1 transition-all border",
              activeFace === "right" && !isAutoOrbit
                ? "border-cyan-400 bg-cyan-950 text-cyan-300"
                : "border-slate-800 bg-card text-slate-400 hover:text-cyan-400",
            )}
          >
            IRIS GAP
          </button>
          <button
            onClick={() => handleFaceSelect("back")}
            className={cn(
              "rounded px-2 py-1 transition-all border",
              activeFace === "back" && !isAutoOrbit
                ? "border-cyan-400 bg-cyan-950 text-cyan-300"
                : "border-slate-800 bg-card text-slate-400 hover:text-cyan-400",
            )}
          >
            BLAST RADIUS
          </button>
        </div>
      </div>

      {/* 3D Scene Viewport */}
      <div className="relative flex h-[480px] w-full items-center justify-center overflow-hidden">
        {/* Scaling container */}
        <div
          ref={contentRef}
          className="relative flex items-center justify-center transition-transform duration-300"
          style={{ width: "900px", height: "460px" }}
        >
          {/* Main 3D Perspective Stage */}
          <div
            className="relative flex items-center justify-center"
            style={{
              perspective: "1200px",
              perspectiveOrigin: "50% 48%",
            }}
          >
            {/* The Rotating Cube Container */}
            <div
              className={cn(
                "relative size-[280px] sm:size-[300px] transition-transform",
                isAutoOrbit ? "animate-cube-orbit" : "duration-700 ease-out",
              )}
              style={{
                transformStyle: "preserve-3d",
                ...(!isAutoOrbit && {
                  transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
                }),
              }}
            >
              {/* FACE 1: FRONT (Overview & Temporal Cursor) */}
              <div
                className="absolute inset-0 flex flex-col justify-between rounded border border-cyan-400/50 bg-card p-5 text-slate-200 shadow-[0_0_30px_rgba(0,229,255,0.15)] backdrop-blur-xl"
                style={{
                  transform: "translateZ(150px)",
                  backfaceVisibility: "visible",
                }}
              >
                {/* HUD Corners */}
                <div className="absolute left-0 top-0 size-3 border-l-2 border-t-2 border-cyan-400" />
                <div className="absolute right-0 top-0 size-3 border-r-2 border-t-2 border-cyan-400" />
                <div className="absolute bottom-0 left-0 size-3 border-b-2 border-l-2 border-cyan-400" />
                <div className="absolute bottom-0 right-0 size-3 border-b-2 border-r-2 border-cyan-400" />

                <div>
                  <div className="flex items-center justify-between border-b border-cyan-500/20 pb-2 font-mono text-[10px] text-cyan-400">
                    <span className="flex items-center gap-1.5 font-bold uppercase tracking-widest">
                      <Terminal className="size-3.5" /> RECONSTRUCTION
                    </span>
                    <span>FACE // 01</span>
                  </div>
                  <h3 className="mt-3 font-mono text-base font-bold text-white uppercase tracking-tight">
                    {incidentId}
                  </h3>
                  <p className="mt-1 text-xs text-slate-400 line-clamp-2">{incidentTitle}</p>
                </div>

                <div className="my-2 space-y-2 font-mono text-[11px]">
                  <div className="flex justify-between border-b border-slate-800 pb-1">
                    <span className="text-slate-500">STAGE:</span>
                    <span className="font-bold text-cyan-300 uppercase">{stage}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800 pb-1">
                    <span className="text-slate-500">CURSOR:</span>
                    <span className="text-slate-200">
                      T+{minute}m ({currentTime})
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">SEVERITY:</span>
                    <span className={cn("font-bold", threatColor.split(" ")[0])}>
                      {currentRisk}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-cyan-500/20 pt-2 font-mono text-[9px] text-cyan-400/80">
                  <span className="flex items-center gap-1">
                    <span className="size-1.5 rounded-full bg-emerald-400 animate-ping" />
                    LIVE TELEMETRY
                  </span>
                  <span>AES-256 TLS</span>
                </div>
              </div>

              {/* FACE 2: BACK (Blast Radius & Impact) */}
              <div
                className="absolute inset-0 flex flex-col justify-between rounded border border-threat/50 bg-card p-5 text-slate-200 shadow-[0_0_30px_rgba(255,42,42,0.15)] backdrop-blur-xl"
                style={{
                  transform: "rotateY(180deg) translateZ(150px)",
                  backfaceVisibility: "visible",
                }}
              >
                <div className="absolute left-0 top-0 size-3 border-l-2 border-t-2 border-threat" />
                <div className="absolute right-0 top-0 size-3 border-r-2 border-t-2 border-threat" />
                <div className="absolute bottom-0 left-0 size-3 border-b-2 border-l-2 border-threat" />
                <div className="absolute bottom-0 right-0 size-3 border-b-2 border-r-2 border-threat" />

                <div>
                  <div className="flex items-center justify-between border-b border-threat/20 pb-2 font-mono text-[10px] text-threat">
                    <span className="flex items-center gap-1.5 font-bold uppercase tracking-widest">
                      <Flame className="size-3.5" /> BLAST RADIUS
                    </span>
                    <span>FACE // 03</span>
                  </div>
                  <h4 className="mt-3 font-mono text-sm font-bold text-white uppercase">
                    IMPACT ASSESSMENT
                  </h4>
                  <p className="mt-1 text-xs text-slate-400">
                    Confirmed asset exposure at T+{minute}m.
                  </p>
                </div>

                <div className="my-2 space-y-2 font-mono text-[11px]">
                  <div className="flex justify-between border-b border-slate-800 pb-1">
                    <span className="text-slate-500">COMPROMISED:</span>
                    <span className="font-bold text-threat">{compromisedCount} ASSETS</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800 pb-1">
                    <span className="text-slate-500">PRIMARY IDENTITY:</span>
                    <span className="text-slate-200">alex.m (compromised)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">EXPOSED FILES:</span>
                    <span className="text-warning">
                      {minute >= 36 ? "37 CONFIDENTIAL" : "0 DETECTED"}
                    </span>
                  </div>
                </div>

                <div className="border-t border-threat/20 pt-2 font-mono text-[9px] text-threat/80 flex justify-between">
                  <span>ROOT CAUSE: RECOGNIZED</span>
                  <span>ISOLATION READY</span>
                </div>
              </div>

              {/* FACE 3: LEFT (Telemetry & Event Logs) */}
              <div
                className="absolute inset-0 flex flex-col justify-between rounded border border-cyan-400/40 bg-card p-5 text-slate-200 shadow-[0_0_30px_rgba(0,229,255,0.15)] backdrop-blur-xl"
                style={{
                  transform: "rotateY(-90deg) translateZ(150px)",
                  backfaceVisibility: "visible",
                }}
              >
                <div className="absolute left-0 top-0 size-3 border-l-2 border-t-2 border-cyan-400" />
                <div className="absolute right-0 top-0 size-3 border-r-2 border-t-2 border-cyan-400" />
                <div className="absolute bottom-0 left-0 size-3 border-b-2 border-l-2 border-cyan-400" />
                <div className="absolute bottom-0 right-0 size-3 border-b-2 border-r-2 border-cyan-400" />

                <div>
                  <div className="flex items-center justify-between border-b border-cyan-500/20 pb-2 font-mono text-[10px] text-cyan-400">
                    <span className="flex items-center gap-1.5 font-bold uppercase tracking-widest">
                      <Activity className="size-3.5" /> EVENT TRACE
                    </span>
                    <span>FACE // 04</span>
                  </div>
                  <h4 className="mt-2.5 font-mono text-xs font-bold text-white uppercase tracking-wider">
                    CHRONOLOGICAL TRACES
                  </h4>
                </div>

                <div className="my-1 space-y-1.5 font-mono text-[10px]">
                  <div className="rounded bg-black/40 p-1.5 border border-cyan-500/10">
                    <div className="flex justify-between text-cyan-400 font-bold">
                      <span>14:32:08</span>
                      <span className="text-threat">AUTH_ANOMALY</span>
                    </div>
                    <div className="text-slate-400 text-[9px] truncate">
                      Unfamiliar ASN IP · 192.168.1.104
                    </div>
                  </div>

                  <div className="rounded bg-black/40 p-1.5 border border-cyan-500/10">
                    <div className="flex justify-between text-cyan-400 font-bold">
                      <span>14:32:15</span>
                      <span className="text-warning">PRIV_ELEVATION</span>
                    </div>
                    <div className="text-slate-400 text-[9px] truncate">
                      PowerShell encoded token hijack
                    </div>
                  </div>

                  <div className="rounded bg-black/40 p-1.5 border border-cyan-500/10">
                    <div className="flex justify-between text-cyan-400 font-bold">
                      <span>14:32:42</span>
                      <span className="text-sky-400">LATERAL_TRAVERSAL</span>
                    </div>
                    <div className="text-slate-400 text-[9px] truncate">
                      Admin share SMB to SERVER-03
                    </div>
                  </div>
                </div>

                <div className="border-t border-cyan-500/20 pt-2 font-mono text-[9px] text-slate-500 flex justify-between">
                  <span>MITRE ATT&CK: T1078</span>
                  <span className="text-cyan-400 font-bold">SYNCHRONIZED</span>
                </div>
              </div>

              {/* FACE 4: RIGHT (IRIS Earliest Detection Gap) */}
              <div
                className="absolute inset-0 flex flex-col justify-between rounded border border-sky-400/50 bg-card p-5 text-slate-200 shadow-[0_0_30px_rgba(56,189,248,0.15)] backdrop-blur-xl"
                style={{
                  transform: "rotateY(90deg) translateZ(150px)",
                  backfaceVisibility: "visible",
                }}
              >
                <div className="absolute left-0 top-0 size-3 border-l-2 border-t-2 border-sky-400" />
                <div className="absolute right-0 top-0 size-3 border-r-2 border-t-2 border-sky-400" />
                <div className="absolute bottom-0 left-0 size-3 border-b-2 border-l-2 border-sky-400" />
                <div className="absolute bottom-0 right-0 size-3 border-b-2 border-r-2 border-sky-400" />

                <div>
                  <div className="flex items-center justify-between border-b border-sky-500/20 pb-2 font-mono text-[10px] text-sky-400">
                    <span className="flex items-center gap-1.5 font-bold uppercase tracking-widest">
                      <Sparkles className="size-3.5" /> IRIS GAP ENGINE
                    </span>
                    <span>FACE // 02</span>
                  </div>
                  <h4 className="mt-3 font-mono text-sm font-bold text-white uppercase">
                    DETECTION WINDOW
                  </h4>
                  <p className="mt-1 text-xs text-sky-300 font-mono">
                    Earliest Opportunity: T+05:00
                  </p>
                </div>

                <div className="my-2 space-y-1.5 font-mono text-[10px] bg-sky-950/20 border border-sky-500/20 p-2 rounded">
                  <div className="text-slate-300 leading-relaxed">
                    A 13-minute gap was available before credential leverage reached internal
                    systems.
                  </div>
                  <div className="border-t border-sky-500/20 pt-1 text-emerald-400 font-bold">
                    RECOMMENDED: Enforce hardware MFA on foreign ASN challenge.
                  </div>
                </div>

                <div className="border-t border-sky-500/20 pt-2 font-mono text-[9px] text-sky-400 flex justify-between">
                  <span>COUNTERFACTUAL: READY</span>
                  <span>CONFIDENCE: 98%</span>
                </div>
              </div>

              {/* FACE 5: TOP (Temporal Radar Sweep HUD) */}
              <div
                className="absolute inset-0 flex flex-col items-center justify-center rounded border border-cyan-400/40 bg-card p-4 text-center shadow-[0_0_30px_rgba(0,229,255,0.2)] backdrop-blur-xl"
                style={{
                  transform: "rotateX(90deg) translateZ(150px)",
                  backfaceVisibility: "visible",
                }}
              >
                <div className="relative size-36 flex items-center justify-center">
                  <div className="absolute inset-0 rounded-full border border-cyan-500/30 animate-ping" />
                  <div className="absolute inset-2 rounded-full border border-cyan-400/50" />
                  <div className="absolute inset-6 rounded-full border border-dashed border-cyan-400/40 animate-[spin_20s_linear_infinite]" />
                  <Cpu className="size-8 text-cyan-400" />
                </div>
                <div className="mt-3 font-mono text-[10px] tracking-widest text-cyan-400 font-bold uppercase">
                  CHRONO RADAR: 4.88 GHz
                </div>
                <div className="text-[8px] font-mono text-slate-500 tracking-wider">
                  TIME ENGINE // TOP ELEVATION
                </div>
              </div>

              {/* FACE 6: BOTTOM (Cryptographic Hash & Seal) */}
              <div
                className="absolute inset-0 flex flex-col items-center justify-center rounded border border-cyan-400/40 bg-card p-4 text-center shadow-[0_0_30px_rgba(0,229,255,0.2)] backdrop-blur-xl"
                style={{
                  transform: "rotateX(-90deg) translateZ(150px)",
                  backfaceVisibility: "visible",
                }}
              >
                <Lock className="size-8 text-cyan-400 mb-2" />
                <div className="font-mono text-[10px] text-cyan-300 font-bold uppercase tracking-widest">
                  IMMUTABLE ATTESTATION
                </div>
                <div className="mt-1 font-mono text-[9px] text-slate-400">
                  SHA-256: 7f4a9b2c8e31
                </div>
                <div className="mt-1 font-mono text-[8px] text-emerald-400">
                  ZERO-TRUST CHAIN SEALED
                </div>
              </div>
            </div>

            {/* Mirror Reflection underneath (transformed from original container-reflect concept) */}
            <div
              className="pointer-events-none absolute top-[320px] size-[280px] sm:size-[300px] opacity-25 blur-[1.5px]"
              style={{
                transformStyle: "preserve-3d",
                transform: isAutoOrbit
                  ? "scaleY(-0.7) translateY(40px)"
                  : `scaleY(-0.7) translateY(40px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
                maskImage: "linear-gradient(to top, rgba(0,0,0,1) 0%, transparent 80%)",
                WebkitMaskImage: "linear-gradient(to top, rgba(0,0,0,1) 0%, transparent 80%)",
              }}
            >
              <div
                className={cn("relative size-full", isAutoOrbit && "animate-cube-orbit")}
                style={{ transformStyle: "preserve-3d" }}
              >
                <div
                  className="absolute inset-0 rounded border border-cyan-400/30 bg-card p-4 text-cyan-400"
                  style={{ transform: "translateZ(150px)" }}
                >
                  <div className="font-mono text-xs font-bold">{incidentId} [MIRROR]</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Timeline Summary Ribbon */}
      <div className="relative z-20 mt-2 flex flex-wrap items-center justify-between border-t border-cyan-500/20 pt-3 font-mono text-[10px] text-slate-400">
        <div className="flex items-center gap-2">
          <Radio className="size-3 text-cyan-400 animate-pulse" />
          <span>INCIDENT TEMPORAL RECONSTRUCTION ENGINE</span>
        </div>
        <div className="flex items-center gap-3">
          <span>
            TIMELINE SYNC: <strong className="text-cyan-400 font-bold">100%</strong>
          </span>
          <span className="text-slate-600">|</span>
          <span>MITRE T1078 ATT&CK TRACE</span>
        </div>
      </div>
    </div>
  );
};

/**
 * PoemAnimation backwards-compatibility alias.
 * Transforms the requested 3d-animation component into the TimeMachine Temporal Core.
 */
export const PoemAnimation: React.FC<PoemAnimationProps> = (props) => {
  return <TemporalCoreCube {...props} />;
};

export default TemporalCoreCube;
