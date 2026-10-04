import React from "react";
import { useAuth } from "@/context/AuthContext";
import { Activity, ShieldAlert, RotateCcw } from "lucide-react";
import { CyberAuthTerminal } from "./CyberAuthTerminal";
import { CyberBackground } from "./CyberBackground";
import { AuthHud } from "./AuthHud";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { authState, signOut } = useAuth();

  if (authState === "AUTHENTICATING" || authState === "LOADING_PROFILE") {
    return (
      <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-[#020609] font-mono text-cyan-400">
        <CyberBackground />
        <AuthHud />

        <div className="relative z-20 flex flex-col items-center gap-6 text-center">
          <div className="relative flex size-20 items-center justify-center rounded-full border border-cyan-500/40 bg-[#050B12]/80 backdrop-blur-md shadow-[0_0_30px_rgba(0,229,255,0.4)]">
            <RotateCcw className="size-8 text-cyan-400 animate-spin" />
            <div className="absolute inset-1 rounded-full border border-cyan-400/20 animate-ping" />
          </div>

          <div className="space-y-2">
            <h2 className="text-sm font-bold tracking-[0.3em] uppercase text-cyan-300">
              ESTABLISHING SECURE OPERATOR LINK...
            </h2>
            <p className="text-[10px] tracking-widest text-slate-500 uppercase">
              SYNCHRONIZING TEMPORAL INCIDENT ENVIRONMENT
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (authState === "UNAUTHENTICATED") {
    return <CyberAuthTerminal />;
  }

  // ACTIVE, AUTHENTICATED, NO_ORGANIZATION
  return <>{children}</>;
}
