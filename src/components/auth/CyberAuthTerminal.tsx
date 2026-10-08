import React, { useState } from "react";
import {
  ShieldAlert,
  Terminal,
  Activity,
  Lock,
  User,
  KeyRound,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Fingerprint,
  Radio,
  FileKey,
  Sparkles,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { CyberBackground } from "./CyberBackground";
import { TemporalCore } from "./TemporalCore";
import { AuthHud } from "./AuthHud";
import { PrivacyRobot } from "@/components/ui/privacy-robot";
import { useAuth } from "@/context/AuthContext";
import { userService } from "@/services/userService";

type AuthMode = "login" | "signup" | "recovery";

interface CyberAuthTerminalProps {
  onSuccess?: () => void;
}

export function CyberAuthTerminal({ onSuccess }: CyberAuthTerminalProps) {
  const { signInDemo, signInWithCredentials } = useAuth();
  const [mode, setMode] = useState<AuthMode>("login");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [authStage, setAuthStage] = useState<string | null>(null);
  const [enteringApp, setEnteringApp] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  const handleLaunchDemo = () => {
    setError(null);
    setAuthStage("LAUNCHING DEMO ENVIRONMENT...");
    signInDemo();
    setEnteringApp(true);
    if (onSuccess) {
      setTimeout(() => {
        onSuccess();
      }, 350);
    }
  };

  const handleQuickFill = (targetEmail: string, targetPass: string) => {
    setEmail(targetEmail);
    setPassword(targetPass);
    setError(null);
    setSuccessMessage(null);
    setMode("login");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);
    setLoading(true);

    try {
      if (mode === "login") {
        setAuthStage("AUTHENTICATING OPERATOR...");
        const result = await signInWithCredentials(email.trim(), password);

        if (!result.success) {
          throw new Error(result.error || "Authentication rejected. Invalid ID or access key.");
        }

        // Cinematic 3-phase verification sequence
        setAuthStage("VERIFYING SECURITY TOKENS...");
        await new Promise((r) => setTimeout(r, 200));
        setAuthStage("OPERATOR SESSION INITIALIZED...");
        await new Promise((r) => setTimeout(r, 200));
        setAuthStage("TIMELINE ENGINE READY...");
        await new Promise((r) => setTimeout(r, 200));

        setEnteringApp(true);
        if (onSuccess) {
          setTimeout(() => {
            onSuccess();
          }, 300);
        }
      } else if (mode === "signup") {
        if (password !== confirmPassword) {
          throw new Error("Access keys do not match. Please re-enter.");
        }
        if (password.length < 4) {
          throw new Error("Access key must contain at least 4 characters.");
        }

        setAuthStage("CREATING OPERATOR PROFILE...");
        try {
          const newUser = userService.createUser({
            email: email.trim(),
            displayName: username.trim() || email.split("@")[0],
            password,
            role: "SOC Lead Operator",
          });

          // Auto-sign in the newly registered user
          setAuthStage("LOGGING IN WITH NEW CREDENTIALS...");
          await signInWithCredentials(newUser.email, password);

          setEnteringApp(true);
          if (onSuccess) {
            setTimeout(() => {
              onSuccess();
            }, 300);
          }
        } catch (regErr: unknown) {
          const msg = regErr instanceof Error ? regErr.message : "Registration failed.";
          throw new Error(msg);
        }
      } else if (mode === "recovery") {
        setAuthStage("VERIFYING OPERATOR ID...");
        await new Promise((r) => setTimeout(r, 400));
        const user = userService.getUserByEmail(email.trim());
        if (user) {
          setSuccessMessage(
            `RECOVERY TOKEN GRANTED. Operator Call sign: ${user.displayName}. Default demo key is 'password123' or 'admin'.`,
          );
        } else {
          setSuccessMessage(
            "RECOVERY TOKEN DISPATCHED. Check the designated operator email address.",
          );
        }
        setLoading(false);
        setAuthStage(null);
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Authentication subsystem encountered an unexpected fault.");
      }
      setAuthStage(null);
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-background text-foreground font-sans selection:bg-cyan-500/30">
      {/* Background Animated Systems */}
      <CyberBackground />

      {/* 3D Privacy Guardian Robot */}
      <PrivacyRobot isPasswordFocused={isPasswordFocused} />

      {/* Viewport Frame HUD */}
      <AuthHud />

      {/* Cinematic Transition Overlay when Entering Dashboard */}
      {enteringApp && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background backdrop-blur-2xl transition-all duration-500 animate-in fade-in">
          <div className="relative flex flex-col items-center gap-6 text-center font-mono">
            <div className="relative flex size-20 items-center justify-center rounded-full border border-cyan-400 bg-cyan-950/40 shadow-[0_0_40px_rgba(0,229,255,0.6)]">
              <Activity className="size-10 animate-pulse text-cyan-400" />
            </div>
            <div className="space-y-2">
              <h2 className="text-xl font-bold tracking-[0.25em] text-cyan-300">
                ACCESS GRANTED // SESSION ACTIVE
              </h2>
              <p className="text-xs text-slate-400 tracking-widest animate-pulse">
                INITIALIZING TIMEMACHINE PLATFORM...
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Main Full-Screen Layout */}
      <div className="relative z-20 flex min-h-screen w-full flex-col lg:flex-row">
        {/* Left Side: Cinematic Branding & Temporal Core */}
        <div className="flex flex-1 flex-col justify-center px-6 py-12 sm:px-12 lg:px-16 xl:px-24">
          <div className="relative max-w-2xl">
            {/* Top Brand Badges */}
            <div className="mb-4 flex flex-wrap items-center gap-2 font-mono text-[11px] tracking-[0.2em] text-cyan-400">
              <span className="flex items-center gap-1.5 rounded-sm border border-cyan-500/30 bg-card px-2.5 py-1 shadow-[0_0_10px_rgba(0,229,255,0.1)]">
                <Radio className="size-3 animate-pulse text-cyan-400" />
                SOC INCIDENT TERMINAL
              </span>
              <span className="text-slate-600">//</span>
              <span className="text-slate-400 uppercase tracking-widest">
                DIGITAL FORENSICS ENGINE
              </span>
            </div>

            {/* Main Header with subtle tech styling */}
            <div className="relative">
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white uppercase font-sans">
                TIME
                <span className="text-cyan-400 drop-shadow-[0_0_20px_rgba(0,229,255,0.5)]">
                  MACHINE
                </span>
              </h1>
              <div className="mt-1 font-mono text-xs sm:text-sm tracking-[0.35em] text-cyan-400/90 uppercase font-semibold">
                INCIDENT INTELLIGENCE PLATFORM
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold uppercase tracking-tight text-slate-200">
                RECONSTRUCT <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500 drop-shadow-[0_0_25px_rgba(0,229,255,0.3)]">
                  THE ATTACK TIMELINE.
                </span>
              </h2>
              <p className="max-w-lg text-xs sm:text-sm text-slate-400 leading-relaxed">
                Observe synthetic cyber telemetry, isolate patient zero, and run counterfactual
                what-if branch simulations in real time.
              </p>
            </div>

            {/* Instant One-Click Demo Mode Banner */}
            <div className="mt-6 rounded border border-cyan-400/40 bg-gradient-to-r from-cyan-950/60 via-sky-950/40 to-transparent p-4 backdrop-blur-md shadow-[0_0_25px_rgba(0,229,255,0.15)]">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 font-mono text-xs font-bold text-cyan-300">
                    <Sparkles className="size-4 text-cyan-400 animate-pulse" />
                    <span>INSTANT DEMO MODE (NO LOGIN REQUIRED)</span>
                  </div>
                  <p className="mt-1 font-mono text-[11px] text-slate-400">
                    Explore the full Incident Time Machine platform instantly with preloaded cyber attack scenarios.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleLaunchDemo}
                  className="shrink-0 flex items-center gap-2 rounded bg-cyan-400 px-4 py-2 font-mono text-xs font-bold text-black shadow-[0_0_20px_rgba(0,229,255,0.4)] transition-all hover:bg-cyan-300 hover:scale-105 active:scale-95 cursor-pointer"
                >
                  <Zap className="size-3.5 fill-black" />
                  <span>EXPLORE DEMO NOW</span>
                </button>
              </div>
            </div>

            {/* Central Temporal Core & Forensic Timeline Motifs */}
            <div className="mt-8 flex flex-col md:flex-row items-center gap-6">
              <TemporalCore />

              {/* Forensic Artifacts Stream */}
              <div className="w-full max-w-sm rounded border border-cyan-500/20 bg-card p-3.5 font-mono text-xs backdrop-blur-md">
                <div className="mb-2 flex items-center justify-between border-b border-cyan-500/20 pb-1.5 text-[10px] text-cyan-400">
                  <span className="flex items-center gap-1.5 font-bold uppercase tracking-wider">
                    <Fingerprint className="size-3.5" /> RECONSTRUCTED TRACES
                  </span>
                  <span className="text-slate-500">LIVE FEED</span>
                </div>
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-cyan-400 font-semibold">EVT-2048</span>
                    <span className="text-slate-400">14:32:08</span>
                    <span className="rounded bg-threat/10 px-1.5 py-0.5 text-[9px] font-bold text-threat border border-threat/20">
                      AUTH_ANOMALY
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-cyan-400 font-semibold">EVT-2051</span>
                    <span className="text-slate-400">14:32:15</span>
                    <span className="rounded bg-warning/10 px-1.5 py-0.5 text-[9px] font-bold text-warning border border-warning/20">
                      PRIV_ELEVATION
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-cyan-400 font-semibold">EVT-2059</span>
                    <span className="text-slate-400">14:32:42</span>
                    <span className="rounded bg-sky-500/10 px-1.5 py-0.5 text-[9px] font-bold text-sky-400 border border-sky-500/20">
                      LATERAL_MOVE
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Secure Authentication Terminal */}
        <div className="flex w-full items-center justify-center p-4 sm:p-6 lg:w-[34rem] xl:w-[38rem] lg:bg-background lg:backdrop-blur-xl lg:border-l lg:border-cyan-500/10">
          <div className="w-full max-w-md">
            {/* Terminal Container with Sharp Corner Brackets & Inner Glow */}
            <div className="relative overflow-hidden rounded border border-cyan-500/30 bg-card p-5 sm:p-7 shadow-[0_0_50px_rgba(0,229,255,0.06)] backdrop-blur-2xl">
              {/* Technical Corner Brackets */}
              <div className="absolute left-0 top-0 size-4 border-l-2 border-t-2 border-cyan-400" />
              <div className="absolute right-0 top-0 size-4 border-r-2 border-t-2 border-cyan-400" />
              <div className="absolute bottom-0 left-0 size-4 border-b-2 border-l-2 border-cyan-400" />
              <div className="absolute bottom-0 right-0 size-4 border-b-2 border-r-2 border-cyan-400" />

              {/* Technical Header & Diagnostic Info */}
              <div className="mb-5 space-y-2 border-b border-cyan-500/20 pb-3 font-mono">
                <div className="flex items-center justify-between text-xs text-cyan-400">
                  <span className="flex items-center gap-2 font-bold tracking-widest uppercase">
                    <ShieldAlert className="size-4 text-cyan-400" />
                    {mode === "login" && "◈ SECURE OPERATOR ACCESS"}
                    {mode === "signup" && "◈ OPERATOR REGISTRATION"}
                    {mode === "recovery" && "◈ ACCOUNT RECOVERY"}
                  </span>
                  <span className="text-[10px] text-slate-400 border border-slate-700/50 px-1.5 py-0.5 rounded bg-black/40">
                    AES-256
                  </span>
                </div>

                <div className="flex items-center justify-between text-[10px] text-slate-400 uppercase pt-1">
                  <span>
                    SYSTEM: <strong className="text-cyan-400">TIMEMACHINE CORE</strong>
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    STATUS: <strong className="text-emerald-400">ONLINE</strong>
                  </span>
                </div>
              </div>

              {/* Quick Fill Preset Buttons */}
              <div className="mb-4">
                <div className="mb-1.5 font-mono text-[10px] uppercase tracking-wider text-slate-400">
                  ⚡ QUICK TEST CREDENTIALS:
                </div>
                <div className="grid grid-cols-2 gap-1.5 font-mono text-[10px]">
                  <button
                    type="button"
                    onClick={() => handleQuickFill("operator@time-machine.soc", "password123")}
                    className="flex items-center justify-center gap-1 rounded border border-cyan-500/30 bg-cyan-950/20 py-1.5 text-cyan-300 hover:bg-cyan-500/20 hover:border-cyan-400 transition-colors"
                  >
                    <User className="size-3 text-cyan-400" />
                    <span>Demo Operator</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleQuickFill("admin@timemachine.soc", "admin")}
                    className="flex items-center justify-center gap-1 rounded border border-red-500/30 bg-red-950/20 py-1.5 text-red-300 hover:bg-red-500/20 hover:border-red-400 transition-colors"
                  >
                    <ShieldCheck className="size-3 text-red-400" />
                    <span>Master Admin</span>
                  </button>
                </div>
              </div>

              {/* Auth Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-3 font-mono">
                  {/* Email / Operator ID Field */}
                  <div className="space-y-1">
                    <label
                      htmlFor="operator-email"
                      className="block text-[11px] font-semibold uppercase tracking-wider text-slate-300"
                    >
                      OPERATOR ID (EMAIL)
                    </label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-cyan-400/60" />
                      <input
                        id="operator-email"
                        type="text"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full rounded border border-cyan-500/30 bg-black/60 py-2 pl-10 pr-4 text-xs sm:text-sm text-cyan-50 placeholder:text-slate-600 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400 shadow-inner transition-all"
                        placeholder="operator@time-machine.soc"
                        autoComplete="username"
                      />
                    </div>
                  </div>

                  {/* Username Field for Registration */}
                  {mode === "signup" && (
                    <div className="space-y-1">
                      <label
                        htmlFor="operator-username"
                        className="block text-[11px] font-semibold uppercase tracking-wider text-slate-300"
                      >
                        OPERATOR ALIAS (DISPLAY NAME)
                      </label>
                      <div className="relative">
                        <Terminal className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-cyan-400/60" />
                        <input
                          id="operator-username"
                          type="text"
                          required
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          className="w-full rounded border border-cyan-500/30 bg-black/60 py-2 pl-10 pr-4 text-xs sm:text-sm text-cyan-50 placeholder:text-slate-600 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400 shadow-inner transition-all"
                          placeholder="SOC Specialist Alpha"
                        />
                      </div>
                    </div>
                  )}

                  {/* Password / Access Key Field (Login & Signup) */}
                  {mode !== "recovery" && (
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <label
                          htmlFor="operator-password"
                          className="block text-[11px] font-semibold uppercase tracking-wider text-slate-300"
                        >
                          ACCESS KEY (PASSWORD)
                        </label>
                        {mode === "login" && (
                          <button
                            type="button"
                            onClick={() => {
                              setMode("recovery");
                              setError(null);
                              setSuccessMessage(null);
                            }}
                            className="text-[10px] text-cyan-400 hover:text-cyan-300 hover:underline transition-colors"
                          >
                            FORGOT KEY?
                          </button>
                        )}
                      </div>
                      <div className="relative">
                        <KeyRound className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-cyan-400/60" />
                        <input
                          id="operator-password"
                          type={showPassword ? "text" : "password"}
                          required
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          onFocus={() => setIsPasswordFocused(true)}
                          onBlur={() => setIsPasswordFocused(false)}
                          className="w-full rounded border border-cyan-500/30 bg-black/60 py-2 pl-10 pr-11 text-xs sm:text-sm text-cyan-50 placeholder:text-slate-600 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400 shadow-inner transition-all relative z-10"
                          placeholder="••••••••••••"
                          autoComplete={mode === "login" ? "current-password" : "new-password"}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-cyan-400 transition-colors p-1 z-10"
                          aria-label={showPassword ? "Hide password" : "Show password"}
                        >
                          {showPassword ? (
                            <EyeOff className="size-4" />
                          ) : (
                            <Eye className="size-4" />
                          )}
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Confirm Password Field for Registration */}
                  {mode === "signup" && (
                    <div className="space-y-1">
                      <label
                        htmlFor="operator-confirm-password"
                        className="block text-[11px] font-semibold uppercase tracking-wider text-slate-300"
                      >
                        CONFIRM ACCESS KEY
                      </label>
                      <div className="relative">
                        <KeyRound className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-cyan-400/60" />
                        <input
                          id="operator-confirm-password"
                          type={showPassword ? "text" : "password"}
                          required
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          onFocus={() => setIsPasswordFocused(true)}
                          onBlur={() => setIsPasswordFocused(false)}
                          className="w-full rounded border border-cyan-500/30 bg-black/60 py-2 pl-10 pr-4 text-xs sm:text-sm text-cyan-50 placeholder:text-slate-600 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400 shadow-inner transition-all relative z-10"
                          placeholder="••••••••••••"
                          autoComplete="new-password"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Error Banner */}
                {error && (
                  <div
                    role="alert"
                    className="relative rounded border border-threat/40 bg-threat/10 p-3 font-mono text-xs text-threat-foreground"
                  >
                    <div className="absolute left-0 top-0 h-full w-1 bg-threat" />
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="size-4 shrink-0 text-threat mt-0.5" />
                      <div>
                        <span className="block font-bold text-threat uppercase">
                          ⚠ AUTHENTICATION FAILED
                        </span>
                        <span className="text-slate-300 text-[11px]">{error}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Success Banner */}
                {successMessage && (
                  <div
                    role="status"
                    className="relative rounded border border-emerald-500/40 bg-emerald-500/10 p-3 font-mono text-xs text-emerald-300"
                  >
                    <div className="absolute left-0 top-0 h-full w-1 bg-emerald-400" />
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="size-4 shrink-0 text-emerald-400 mt-0.5" />
                      <div>
                        <span className="block font-bold uppercase">◈ TRANSMISSION CONFIRMED</span>
                        <span className="text-[11px]">{successMessage}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Authenticate Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="group relative w-full overflow-hidden rounded border border-cyan-400 bg-cyan-500/10 py-3 font-mono text-xs sm:text-sm font-bold tracking-[0.2em] text-cyan-300 transition-all hover:bg-cyan-400 hover:text-black hover:shadow-[0_0_30px_rgba(0,229,255,0.5)] focus:outline-none focus:ring-2 focus:ring-cyan-400 disabled:opacity-60 disabled:pointer-events-none active:scale-[0.99] cursor-pointer"
                >
                  <span className="relative flex items-center justify-center gap-2">
                    {loading ? (
                      <>
                        <Activity className="size-4 animate-spin text-cyan-400 group-hover:text-black" />
                        <span>{authStage || "PROCESSING..."}</span>
                      </>
                    ) : (
                      <>
                        {mode === "login" && (
                          <>
                            <Lock className="size-4" />
                            <span>[ ◈ AUTHENTICATE OPERATOR ]</span>
                          </>
                        )}
                        {mode === "signup" && (
                          <>
                            <FileKey className="size-4" />
                            <span>[ ◈ REGISTER OPERATOR ]</span>
                          </>
                        )}
                        {mode === "recovery" && (
                          <>
                            <ArrowRight className="size-4" />
                            <span>[ ◈ TRANSMIT RECOVERY TOKEN ]</span>
                          </>
                        )}
                      </>
                    )}
                  </span>
                </button>

                {/* Instant Demo Operator Access Button */}
                <button
                  type="button"
                  onClick={handleLaunchDemo}
                  className="w-full rounded border border-cyan-500/40 bg-gradient-to-r from-cyan-950/40 via-cyan-900/30 to-cyan-950/40 py-2.5 font-mono text-xs font-bold tracking-wider text-cyan-300 hover:bg-cyan-500/20 hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(0,229,255,0.3)] transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Zap className="size-3.5 text-cyan-400 animate-pulse fill-cyan-400" />
                  <span>[ NO LOGIN REQUIRED — INSTANT DEMO ]</span>
                </button>
              </form>

              {/* Mode Toggle Secondary Actions */}
              <div className="mt-5 flex flex-col items-center justify-center gap-2 border-t border-cyan-500/20 pt-3.5 text-center font-mono text-[11px] tracking-wider text-slate-400">
                {mode === "login" ? (
                  <button
                    type="button"
                    onClick={() => {
                      setMode("signup");
                      setError(null);
                      setSuccessMessage(null);
                    }}
                    className="hover:text-cyan-400 transition-colors uppercase"
                  >
                    NEW OPERATOR?{" "}
                    <span className="text-cyan-400 font-bold underline">REGISTER HERE</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      setMode("login");
                      setError(null);
                      setSuccessMessage(null);
                    }}
                    className="hover:text-cyan-400 transition-colors uppercase"
                  >
                    EXISTING OPERATOR?{" "}
                    <span className="text-cyan-400 font-bold underline">AUTHENTICATE</span>
                  </button>
                )}

                <div className="flex items-center gap-2 text-[10px] text-slate-500">
                  <Lock className="size-3 text-cyan-500/60" />
                  <span>SECURE CHANNEL ENCRYPTED // TLS 1.3</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
