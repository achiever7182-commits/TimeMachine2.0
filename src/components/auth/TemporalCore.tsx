import React from "react";
import { History, RotateCcw, Clock } from "lucide-react";

export function TemporalCore() {
  return (
    <div className="relative size-64 sm:size-72 lg:size-80 flex items-center justify-center select-none pointer-events-none">
      {/* Ambient Radial Core Glow */}
      <div className="absolute inset-0 rounded-full bg-cyan-500/10 blur-3xl animate-pulse" />

      {/* SVG Concentric Temporal HUD Rings */}
      <svg
        className="absolute inset-0 size-full text-cyan-400"
        viewBox="0 0 320 320"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Outermost Static Measurement Ring */}
        <circle
          cx="160"
          cy="160"
          r="150"
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray="4 8"
          strokeOpacity="0.25"
        />

        {/* Counter-Clockwise Rotating Ring */}
        <g className="origin-center animate-[spin_40s_linear_infinite_reverse]">
          <circle
            cx="160"
            cy="160"
            r="135"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeDasharray="30 15 5 15"
            strokeOpacity="0.4"
          />
          {/* Degree markers */}
          <line
            x1="160"
            y1="20"
            x2="160"
            y2="30"
            stroke="currentColor"
            strokeWidth="2"
            strokeOpacity="0.8"
          />
          <line
            x1="160"
            y1="290"
            x2="160"
            y2="300"
            stroke="currentColor"
            strokeWidth="2"
            strokeOpacity="0.8"
          />
          <line
            x1="20"
            y1="160"
            x2="30"
            y2="160"
            stroke="currentColor"
            strokeWidth="2"
            strokeOpacity="0.8"
          />
          <line
            x1="290"
            y1="160"
            x2="300"
            y2="160"
            stroke="currentColor"
            strokeWidth="2"
            strokeOpacity="0.8"
          />
        </g>

        {/* Clockwise Segmented Ring */}
        <g className="origin-center animate-[spin_25s_linear_infinite]">
          <circle
            cx="160"
            cy="160"
            r="115"
            stroke="currentColor"
            strokeWidth="2"
            strokeDasharray="90 30"
            strokeOpacity="0.5"
          />
          <circle
            cx="160"
            cy="160"
            r="98"
            stroke="currentColor"
            strokeWidth="1"
            strokeDasharray="6 6"
            strokeOpacity="0.3"
          />
          {/* Temporal Checkpoints on Ring */}
          <circle cx="160" cy="45" r="3" fill="#00E5FF" filter="drop-shadow(0 0 4px #00E5FF)" />
          <circle cx="275" cy="160" r="3" fill="#00E5FF" filter="drop-shadow(0 0 4px #00E5FF)" />
          <circle cx="160" cy="275" r="3" fill="#FF2A2A" filter="drop-shadow(0 0 4px #FF2A2A)" />
        </g>

        {/* Rotating Temporal Radar Sweep Line */}
        <g className="origin-center animate-[spin_8s_linear_infinite]">
          <line x1="160" y1="160" x2="160" y2="45" stroke="url(#sweepGrad)" strokeWidth="2" />
        </g>

        {/* Inner Solid Tech Ring */}
        <circle
          cx="160"
          cy="160"
          r="75"
          stroke="currentColor"
          strokeWidth="1"
          strokeOpacity="0.3"
        />

        <defs>
          <linearGradient
            id="sweepGrad"
            x1="160"
            y1="160"
            x2="160"
            y2="45"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#00E5FF" stopOpacity="0" />
            <stop offset="1" stopColor="#00E5FF" stopOpacity="0.8" />
          </linearGradient>
        </defs>
      </svg>

      {/* Central Temporal Engine Core Icon */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center">
        <div className="relative flex items-center justify-center size-20 rounded-full border border-cyan-500/40 bg-[#050B12]/80 backdrop-blur-md shadow-[0_0_25px_rgba(0,229,255,0.3)]">
          <RotateCcw className="size-8 text-cyan-400 animate-[spin_20s_linear_infinite]" />
          <div className="absolute inset-2 rounded-full border border-cyan-400/20" />
        </div>
        <div className="mt-3 flex flex-col items-center font-mono">
          <span className="text-[9px] font-bold tracking-[0.25em] text-cyan-400 uppercase">
            TEMPORAL CORE
          </span>
          <span className="text-[8px] tracking-widest text-slate-500">REWIND ENGINE // READY</span>
        </div>
      </div>
    </div>
  );
}
