import React, { useState, useEffect } from "react";
import { Terminal, Shield, Cpu, Activity } from "lucide-react";

export function AuthHud() {
  const [utcTime, setUtcTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = String(now.getUTCHours()).padStart(2, "0");
      const minutes = String(now.getUTCMinutes()).padStart(2, "0");
      const seconds = String(now.getUTCSeconds()).padStart(2, "0");
      setUtcTime(`${hours}:${minutes}:${seconds}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-10 flex flex-col justify-between p-4 sm:p-6 font-mono text-[10px] text-slate-500 select-none">
      {/* Top Bar HUD */}
      <div className="flex items-center justify-between">
        {/* Top Left */}
        <div className="flex items-center gap-2.5">
          <div className="flex size-6 items-center justify-center rounded border border-cyan-500/30 bg-[#050B12]/80 text-cyan-400 shadow-[0_0_10px_rgba(0,229,255,0.2)]">
            <Terminal className="size-3.5" />
          </div>
          <div>
            <div className="font-bold tracking-widest text-cyan-400">TIMEMACHINE</div>
            <div className="text-[9px] tracking-wider text-slate-400">
              INCIDENT INTELLIGENCE // TERMINAL
            </div>
          </div>
        </div>

        {/* Top Right */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-1.5 px-2 py-1 rounded border border-cyan-500/20 bg-[#050B12]/60 text-slate-400">
            <Shield className="size-3 text-cyan-400" />
            <span>CHANNEL: TLS 1.3</span>
          </div>
          <div className="flex items-center gap-2 px-2.5 py-1 rounded border border-cyan-500/20 bg-[#050B12]/80 font-bold text-cyan-400 shadow-[0_0_12px_rgba(0,229,255,0.1)]">
            <span className="size-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_6px_#34d399]" />
            <span className="tracking-widest">SYSTEM ONLINE</span>
            <span className="text-slate-500">|</span>
            <span className="text-slate-300">UTC {utcTime || "14:32:08"}</span>
          </div>
        </div>
      </div>

      {/* Bottom Bar HUD */}
      <div className="flex items-end justify-between">
        {/* Bottom Left */}
        <div className="flex items-center gap-2 text-slate-400">
          <Cpu className="size-3.5 text-cyan-500" />
          <div>
            <span className="text-slate-500">OBSERVATION ENGINE: </span>
            <span className="text-cyan-400 font-semibold tracking-wider">READY</span>
          </div>
        </div>

        {/* Bottom Center */}
        <div className="hidden md:block text-center text-slate-500 tracking-[0.2em]">
          &ldquo;EVERY EVENT LEAVES A TRACE IN THE TIMELINE&rdquo;
        </div>

        {/* Bottom Right */}
        <div className="flex items-center gap-3 text-slate-400">
          <div className="text-right">
            <span className="text-slate-500">SYSTEM BUILD: </span>
            <span className="font-semibold text-cyan-400">TM-2.0.4</span>
          </div>
          <div className="size-2 rounded-sm bg-cyan-500/40" />
        </div>
      </div>
    </div>
  );
}
