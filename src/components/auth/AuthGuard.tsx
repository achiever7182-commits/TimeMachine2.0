import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { 
  ShieldAlert, 
  Terminal, 
  Activity, 
  ScanLine,
  Lock,
  User,
  KeyRound,
  Eye,
  EyeOff
} from "lucide-react";
import { PrivacyRobot } from "@/components/ui/privacy-robot";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { authState } = useAuth();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [authStage, setAuthStage] = useState<string | null>(null);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  if (authState === "AUTHENTICATING" || authState === "LOADING_PROFILE") {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#020609] text-cyan-500 font-mono">
        <div className="relative flex items-center justify-center">
          <div className="absolute inset-0 animate-ping rounded-full border border-cyan-500/50" />
          <ScanLine className="size-12 animate-pulse text-cyan-500" />
        </div>
        <p className="mt-8 tracking-[0.3em] text-sm animate-pulse">ESTABLISHING SECURE LINK...</p>
      </div>
    );
  }

  if (authState === "UNAUTHENTICATED") {
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setError(null);
      setLoading(true);
      setAuthStage(isLogin ? "AUTHENTICATING..." : "CREATING OPERATOR PROFILE...");
      
      try {
        if (isLogin) {
          const { error } = await supabase.auth.signInWithPassword({ email, password });
          if (error) throw error;
          setAuthStage("VERIFYING CREDENTIALS...");
          await new Promise(r => setTimeout(r, 600)); // Cinematic delay
          setAuthStage("ACCESS GRANTED");
        } else {
          if (password !== confirmPassword) {
            throw new Error("Passwords do not match.");
          }
          const { error } = await supabase.auth.signUp({ 
            email, 
            password,
            options: {
              data: {
                display_name: username,
              }
            }
          });
          if (error) throw error;
          setAuthStage("INITIALIZING SECURITY SESSION...");
          await new Promise(r => setTimeout(r, 600)); // Cinematic delay
          setAuthStage("ACCESS READY");
        }
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred.");
        }
        setAuthStage(null);
        setLoading(false);
      }
      // If success, we don't set loading to false because the auth listener will re-render to ACTIVE state
    };

    return (
      <div className="relative min-h-screen w-full overflow-hidden bg-[#020609] text-slate-300 font-sans selection:bg-cyan-500/30">
        {/* Animated Background Systems */}
        <div className="pointer-events-none absolute inset-0 z-0 opacity-40">
          {/* Digital Grid */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#00d9ff15_1px,transparent_1px),linear-gradient(to_bottom,#00d9ff15_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_10%,transparent_100%)]" />
          
          {/* Scanning Beam */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/10 to-transparent h-[200%] w-full animate-[scan_8s_linear_infinite]" />
        </div>

        {/* 3D Privacy Guardian Robot */}
        <PrivacyRobot isPasswordFocused={isPasswordFocused} />

        {/* HUD Elements */}
        <div className="pointer-events-none absolute inset-4 z-10 flex flex-col justify-between font-mono text-[10px] text-cyan-600/60 uppercase tracking-widest">
          <div className="flex justify-between">
            <div className="flex items-center gap-2">
              <Terminal className="size-4" /> TIMEMACHINE // INCIDENT INTELLIGENCE
            </div>
            <div className="flex items-center gap-2 text-right">
              <div className="size-2 rounded-full bg-green-500 animate-pulse" /> SYSTEM ONLINE
            </div>
          </div>
          <div className="flex justify-between">
            <div>OBSERVATION ENGINE: READY</div>
            <div className="text-right">BUILD TM-2.0</div>
          </div>
        </div>

        {/* Main Composition */}
        <div className="relative z-20 flex min-h-screen w-full flex-col lg:flex-row">
          
          {/* Left Side: Cinematic Branding */}
          <div className="flex flex-1 flex-col justify-center px-8 py-12 lg:px-24">
            <div className="relative max-w-2xl">
              {/* Subtle background glow */}
              <div className="absolute -left-20 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-cyan-500/10 blur-[120px]" />
              
              <h2 className="mb-2 font-mono text-sm tracking-[0.3em] text-cyan-500">
                TIMEMACHINE
              </h2>
              <h1 className="mb-6 text-5xl font-bold tracking-tight text-white lg:text-7xl">
                RECONSTRUCT<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">THE ATTACK.</span>
              </h1>
              <p className="max-w-lg text-lg text-slate-400">
                Observe. Investigate. Rewind. Respond. <br/>
                Every event leaves a trace in the timeline.
              </p>
              
              {/* Timeline Visualization */}
              <div className="mt-12 hidden lg:block opacity-60 font-mono text-xs">
                <div className="flex flex-col gap-2 border-l border-cyan-500/20 pl-4">
                  <div className="flex items-center gap-4 text-cyan-500">
                    <span className="-ml-[21px] flex size-2 rounded-full bg-cyan-500 shadow-[0_0_8px_#00d9ff]" />
                    <span>2026-09-28 14:32:08</span>
                    <span className="rounded bg-cyan-500/10 px-2 py-0.5 text-[10px]">AUTH_FAILURE</span>
                  </div>
                  <div className="flex items-center gap-4 text-slate-500">
                    <span className="-ml-[21px] flex size-2 rounded-full bg-slate-800 border border-slate-600" />
                    <span>2026-09-28 14:32:10</span>
                    <span className="rounded bg-slate-800 px-2 py-0.5 text-[10px]">PROCESS_CREATE</span>
                  </div>
                  <div className="flex items-center gap-4 text-red-500">
                    <span className="-ml-[21px] flex size-2 rounded-full bg-red-500 shadow-[0_0_8px_#ef4444]" />
                    <span>2026-09-28 14:32:15</span>
                    <span className="rounded bg-red-500/10 px-2 py-0.5 text-[10px]">NETWORK_EXFIL</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Authentication Terminal */}
          <div className="flex w-full items-center justify-center p-6 lg:w-[32rem] lg:bg-black/40 lg:backdrop-blur-xl lg:border-l lg:border-white/5">
            <div className="w-full max-w-sm">
              <div className="relative overflow-hidden rounded-sm border border-cyan-500/30 bg-[#06121A]/80 p-8 shadow-[0_0_40px_rgba(0,217,255,0.05)] backdrop-blur-md">
                
                {/* HUD Corners */}
                <div className="absolute left-0 top-0 h-4 w-4 border-l-2 border-t-2 border-cyan-500/50" />
                <div className="absolute right-0 top-0 h-4 w-4 border-r-2 border-t-2 border-cyan-500/50" />
                <div className="absolute bottom-0 left-0 h-4 w-4 border-b-2 border-l-2 border-cyan-500/50" />
                <div className="absolute bottom-0 right-0 h-4 w-4 border-b-2 border-r-2 border-cyan-500/50" />

                <div className="mb-8 flex items-center justify-between border-b border-cyan-500/20 pb-4 font-mono text-xs text-cyan-500">
                  <span className="flex items-center gap-2 tracking-widest">
                    <ShieldAlert className="size-4" /> 
                    {isLogin ? "SECURE ACCESS" : "OPERATOR REGISTRATION"}
                  </span>
                  <span>AES-256</span>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-4 font-mono">
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase tracking-widest text-slate-400" htmlFor="email">
                        Operator ID (Email)
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-cyan-500/50" />
                        <input
                          id="email"
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full rounded-sm border border-cyan-500/20 bg-black/50 py-2.5 pl-10 pr-4 text-sm text-cyan-50 placeholder:text-slate-600 focus:border-cyan-500/50 focus:outline-none focus:ring-1 focus:ring-cyan-500/50 transition-all"
                          placeholder="operator@acme.corp"
                        />
                      </div>
                    </div>

                    {!isLogin && (
                      <div className="space-y-1">
                        <label className="text-[10px] uppercase tracking-widest text-slate-400" htmlFor="username">
                          Operator Alias (Username)
                        </label>
                        <div className="relative">
                          <Terminal className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-cyan-500/50" />
                          <input
                            id="username"
                            type="text"
                            required={!isLogin}
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full rounded-sm border border-cyan-500/20 bg-black/50 py-2.5 pl-10 pr-4 text-sm text-cyan-50 placeholder:text-slate-600 focus:border-cyan-500/50 focus:outline-none focus:ring-1 focus:ring-cyan-500/50 transition-all"
                            placeholder="shadow_broker"
                          />
                        </div>
                      </div>
                    )}
                    
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase tracking-widest text-slate-400" htmlFor="password">
                        Access Key (Password)
                      </label>
                      <div className="relative">
                        <KeyRound className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-cyan-500/50" />
                        <input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          required
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          onFocus={() => setIsPasswordFocused(true)}
                          onBlur={() => setIsPasswordFocused(false)}
                          className="w-full rounded-sm border border-cyan-500/20 bg-black/50 py-2.5 pl-10 pr-10 text-sm text-cyan-50 placeholder:text-slate-600 focus:border-cyan-500/50 focus:outline-none focus:ring-1 focus:ring-cyan-500/50 transition-all relative z-50"
                          placeholder="••••••••••••"
                        />
                        <button 
                          type="button" 
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-cyan-500/50 hover:text-cyan-400 transition-colors z-50"
                        >
                          {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                        </button>
                      </div>
                    </div>

                    {!isLogin && (
                      <div className="space-y-1">
                        <label className="text-[10px] uppercase tracking-widest text-slate-400" htmlFor="confirmPassword">
                          Verify Access Key
                        </label>
                        <div className="relative">
                          <KeyRound className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-cyan-500/50" />
                          <input
                            id="confirmPassword"
                            type={showPassword ? "text" : "password"}
                            required={!isLogin}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            onFocus={() => setIsPasswordFocused(true)}
                            onBlur={() => setIsPasswordFocused(false)}
                            className="w-full rounded-sm border border-cyan-500/20 bg-black/50 py-2.5 pl-10 pr-4 text-sm text-cyan-50 placeholder:text-slate-600 focus:border-cyan-500/50 focus:outline-none focus:ring-1 focus:ring-cyan-500/50 transition-all relative z-50"
                            placeholder="••••••••••••"
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {error && (
                    <div className="relative border border-red-500/30 bg-red-500/10 p-3 font-mono text-xs text-red-400">
                      <div className="absolute left-0 top-0 h-full w-1 bg-red-500" />
                      <span className="block font-bold">⚠ AUTHENTICATION FAILED</span>
                      {error}
                    </div>
                  )}

                  <button 
                    type="submit" 
                    disabled={loading}
                    className="group relative w-full overflow-hidden rounded-sm border border-cyan-500 bg-cyan-500/10 py-3 font-mono text-sm font-semibold tracking-widest text-cyan-400 transition-all hover:bg-cyan-500 hover:text-black hover:shadow-[0_0_20px_rgba(0,217,255,0.4)] focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-black disabled:opacity-50 disabled:hover:bg-cyan-500/10 disabled:hover:text-cyan-400"
                  >
                    {/* Hover scan effect */}
                    <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent transition-transform duration-500 group-hover:translate-x-full" />
                    <span className="relative flex items-center justify-center gap-2">
                      {loading ? (
                        <>
                          <Activity className="size-4 animate-pulse" />
                          {authStage || "PROCESSING..."}
                        </>
                      ) : (
                        <>
                          <Lock className="size-4" />
                          {isLogin ? "AUTHENTICATE" : "CREATE ACCOUNT"}
                        </>
                      )}
                    </span>
                  </button>
                </form>

                <div className="mt-6 flex flex-col items-center justify-center gap-4 text-center font-mono text-[10px] tracking-widest text-slate-500">
                  <button 
                    onClick={() => {
                      setIsLogin(!isLogin);
                      setError(null);
                    }} 
                    className="hover:text-cyan-400 transition-colors"
                  >
                    {isLogin ? "NEW OPERATOR? REQUEST ACCESS" : "EXISTING OPERATOR? AUTHENTICATE"}
                  </button>
                  <div className="flex items-center gap-2 text-cyan-600/40">
                    <Lock className="size-3" /> ENCRYPTED CONNECTION
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CSS for custom animations that Tailwind doesn't have built-in */}
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes scan {
            0% { transform: translateY(-50%); }
            100% { transform: translateY(0%); }
          }
        `}} />
      </div>
    );
  }

  // ACTIVE, NO_ORGANIZATION, PROFILE_ERROR
  return <>{children}</>;
}
