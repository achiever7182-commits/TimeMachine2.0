import {
  Bell,
  Bot,
  BrainCircuit,
  CircleDot,
  FileText,
  FlaskConical,
  GitBranch,
  Home,
  ListChecks,
  Menu,
  Network,
  Radar,
  Search,
  Settings,
  ShieldAlert,
  ShieldCheck,
  Siren,
  Terminal,
  Activity,
  LogOut,
  Zap,
  Cpu,
  Radio,
  Clock,
  Layers,
} from "lucide-react";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Link, useRouterState, useLocation, useNavigate } from "@tanstack/react-router";
import { useDemo } from "@/context/DemoContext";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";
import { IrisCopilot } from "@/components/ai-copilot/IrisCopilot";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface NavItem {
  cmd: string;
  label: string;
  to: string;
  icon: any;
  shortcut?: string;
  tag?: string;
}

const navSections: { title: string; items: NavItem[] }[] = [
  {
    title: "COMMAND",
    items: [
      { cmd: "CMD_01", label: "COMMAND CENTER", to: "/dashboard", icon: Terminal, shortcut: "⌘1" },
      { cmd: "CMD_02", label: "INCIDENTS", to: "/incidents", icon: ShieldAlert, shortcut: "⌘2", tag: "LIVE" },
      { cmd: "CMD_03", label: "ADMIN CONSOLE", to: "/admin", icon: ShieldCheck, shortcut: "⌘A" },
    ],
  },
  {
    title: "INVESTIGATION",
    items: [
      { cmd: "INV_01", label: "TIME MACHINE", to: "/time-machine", icon: BrainCircuit, shortcut: "⌘3", tag: "REWIND" },
      { cmd: "INV_02", label: "ATTACK GRAPH", to: "/attack-graph", icon: GitBranch, shortcut: "⌘4" },
      { cmd: "INV_03", label: "DIGITAL TWIN", to: "/digital-twin", icon: Network },
      { cmd: "INV_04", label: "IRIS INVESTIGATOR", to: "/iris", icon: Bot, tag: "AI" },
      { cmd: "INV_05", label: "EVIDENCE", to: "/evidence", icon: Radar },
    ],
  },
  {
    title: "SIMULATION",
    items: [
      { cmd: "SIM_01", label: "SIMULATION LAB", to: "/simulation-lab", icon: FlaskConical, tag: "WAR-ROOM" },
    ],
  },
  {
    title: "RESPONSE",
    items: [
      { cmd: "RES_01", label: "RESPONSE CENTER", to: "/response-center", icon: ListChecks },
    ],
  },
  {
    title: "INTELLIGENCE",
    items: [
      { cmd: "INT_01", label: "REPORTS", to: "/reports", icon: FileText },
    ],
  },
  {
    title: "SYSTEM",
    items: [
      { cmd: "SYS_01", label: "SYSTEM SETTINGS", to: "/settings", icon: Settings },
    ],
  },
];

function NavLinks({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  return (
    <nav className="space-y-5 px-3" aria-label="Security Command Console">
      {navSections.map((section) => (
        <div key={section.title} className="space-y-1">
          <div className="flex items-center justify-between px-2.5 py-1 text-[9px] font-mono font-bold tracking-[0.25em] text-[#6F8A99]/70 border-b border-[#0D1B24]/80">
            <span>{section.title}</span>
            <span className="text-[8px] text-[#00E5FF]/40">//</span>
          </div>
          <div className="space-y-0.5 pt-1">
            {section.items.map((item) => {
              const Icon = item.icon;
              const active = pathname === item.to || pathname.startsWith(item.to + "/");
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={onNavigate}
                  className={cn(
                    "group relative flex min-h-[34px] items-center gap-2.5 px-2.5 text-xs font-mono transition-all duration-150 border",
                    active
                      ? "border-[#00E5FF]/40 bg-[#00E5FF]/10 text-[#E8F7FF] shadow-[inset_0_0_15px_rgba(0,229,255,0.08)] border-l-2 border-l-[#00E5FF]"
                      : "border-transparent text-[#6F8A99] hover:border-[#1683FF]/30 hover:bg-[#071017] hover:text-[#E8F7FF]",
                  )}
                >
                  <span className={cn(
                    "text-[10px] transition-colors",
                    active ? "text-[#00E5FF] font-bold" : "text-[#6F8A99]/40 group-hover:text-[#00E5FF]/70"
                  )}>
                    &gt;
                  </span>

                  <Icon
                    className={cn(
                      "size-3.5 shrink-0 transition-transform group-hover:scale-110",
                      active
                        ? "text-[#00E5FF] drop-shadow-[0_0_8px_rgba(0,229,255,0.8)]"
                        : "text-[#6F8A99] group-hover:text-[#00E5FF]",
                    )}
                  />

                  <span className="truncate tracking-wide text-[11px] font-medium">{item.label}</span>

                  {item.tag && (
                    <span className={cn(
                      "ml-auto text-[8px] px-1 py-0.2 rounded border font-mono",
                      item.tag === "LIVE" ? "border-[#FF2638]/40 bg-[#FF2638]/10 text-[#FF2638] animate-pulse" :
                      item.tag === "REWIND" ? "border-[#00E5FF]/40 bg-[#00E5FF]/10 text-[#00E5FF]" :
                      item.tag === "AI" ? "border-[#00FF88]/40 bg-[#00FF88]/10 text-[#00FF88]" :
                      "border-[#FFB000]/40 bg-[#FFB000]/10 text-[#FFB000]"
                    )}>
                      {item.tag}
                    </span>
                  )}

                  {item.shortcut && !item.tag && (
                    <span className="ml-auto text-[9px] text-[#6F8A99]/40 opacity-0 transition-opacity group-hover:opacity-100">
                      {item.shortcut}
                    </span>
                  )}

                  {active && (
                    <div className="absolute right-1.5 size-1.5 rounded-full bg-[#00E5FF] animate-pulse drop-shadow-[0_0_6px_#00E5FF]" />
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      ))}
    </nav>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  const { user, profile, storedUser, signOut } = useAuth();
  const {
    demoStage,
    isAttackRunning,
    isPaused,
    currentTime,
    startAttackSimulation,
    pauseSimulation,
    resumeSimulation,
    resetDemo,
  } = useDemo();

  const navigate = useNavigate();
  const location = useLocation();
  const breadcrumbName =
    navSections.flatMap((s) => s.items).find((i) => i.to === location.pathname)?.label ||
    location.pathname.substring(1).toUpperCase() ||
    "COMMAND CENTER";

  const handleSignOut = async () => {
    toast.info("Terminating operator session...");
    await signOut();
    navigate({ to: "/login" });
  };

  const displayName = profile?.display_name || storedUser?.displayName || "Operator";
  const displayRole = profile?.role || storedUser?.role || "SOC Lead Operator";
  const userEmail = user?.email || storedUser?.email || "operator@time-machine.soc";

  return (
    <div className="min-h-screen bg-[#03070B] text-[#E8F7FF] font-sans selection:bg-[#00E5FF]/30 selection:text-[#00E5FF]">
      {/* Background Matrix Grid */}
      <div className="fixed inset-0 pointer-events-none opacity-20 bg-[linear-gradient(to_right,#00E5FF08_1px,transparent_1px),linear-gradient(to_bottom,#00E5FF08_1px,transparent_1px)] bg-[size:32px_32px] z-0" />

      {/* LEFT SIDEBAR: SECURITY COMMAND CONSOLE */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 border-r border-[#0D1B24] bg-[#050A0F] px-0 py-0 lg:flex lg:flex-col shadow-[4px_0_24px_rgba(0,0,0,0.6)]">
        {/* Brand Header */}
        <div className="border-b border-[#0D1B24] p-4 bg-[#071017]">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded border border-[#00E5FF]/40 bg-[#00E5FF]/10 text-[#00E5FF] shadow-[0_0_12px_rgba(0,229,255,0.4)]">
              <Terminal className="size-4.5" />
            </div>
            <div>
              <div className="font-mono text-xs font-black tracking-[0.18em] text-[#E8F7FF] flex items-center gap-1.5">
                TIMEMACHINE
                <span className="text-[9px] px-1 py-0.2 bg-[#00E5FF]/20 text-[#00E5FF] border border-[#00E5FF]/40 rounded font-bold">2.0</span>
              </div>
              <div className="font-mono text-[8.5px] uppercase tracking-[0.2em] text-[#00E5FF]/70">
                INCIDENT RESPONSE ENGINE
              </div>
            </div>
          </div>
        </div>

        {/* Node & System State */}
        <div className="flex items-center justify-between border-b border-[#0D1B24] bg-[#03070B] px-4 py-2 font-mono text-[9.5px]">
          <div className="flex items-center gap-1.5 text-[#6F8A99]">
            <span>NODE:</span>
            <span className="text-[#00E5FF] font-bold">TM-CORE-01</span>
          </div>
          <div className="flex items-center gap-1.5 text-[#00FF88]">
            <CircleDot className="size-2 text-[#00FF88] animate-pulse" />
            <span className="font-bold tracking-wider">ONLINE</span>
          </div>
        </div>

        {/* Navigation Console */}
        <div className="flex-1 overflow-y-auto py-4 custom-scrollbar">
          <NavLinks />
        </div>

        {/* Simulator / Temporal Control Footer */}
        <div className="mt-auto border-t border-[#0D1B24] bg-[#03070B] p-3.5 space-y-2.5">
          <div className="rounded border border-[#FFB000]/30 bg-[#FFB000]/5 p-2.5">
            <div className="flex items-center justify-between font-mono text-[9px] uppercase">
              <span className="text-[#FFB000] font-bold flex items-center gap-1.5">
                <Activity className={cn("size-3", isAttackRunning && "animate-pulse")} />
                DEMO ENVIRONMENT
              </span>
              <span className="text-[#6F8A99]/80 font-mono text-[8px]">{currentTime}</span>
            </div>
            <p className="mt-1 font-mono text-[9.5px] text-[#6F8A99] leading-tight">
              Synthetic telemetry active. No live endpoints currently streaming.
            </p>
          </div>

          <div className="flex flex-col gap-1.5">
            {!isAttackRunning && !isPaused ? (
              <Button
                size="sm"
                onClick={startAttackSimulation}
                className="w-full bg-[#00E5FF]/10 text-[#00E5FF] border border-[#00E5FF]/40 hover:bg-[#00E5FF] hover:text-[#03070B] transition-all font-mono text-[10px] h-7.5 rounded-none font-bold tracking-wider cursor-pointer"
              >
                ▶ RUN SIMULATION
              </Button>
            ) : isAttackRunning ? (
              <div className="flex gap-1.5">
                <Button
                  size="sm"
                  onClick={pauseSimulation}
                  className="flex-1 bg-[#FFB000]/10 text-[#FFB000] border border-[#FFB000]/40 hover:bg-[#FFB000] hover:text-[#03070B] font-mono text-[10px] h-7.5 rounded-none font-bold cursor-pointer"
                >
                  ❚❚ PAUSE
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={resetDemo}
                  className="bg-transparent border-[#0D1B24] hover:bg-[#FF2638]/10 hover:text-[#FF2638] hover:border-[#FF2638]/40 font-mono text-[10px] h-7.5 rounded-none cursor-pointer"
                >
                  RESET
                </Button>
              </div>
            ) : (
              <div className="flex gap-1.5">
                <Button
                  size="sm"
                  onClick={resumeSimulation}
                  className="flex-1 bg-[#00E5FF]/10 text-[#00E5FF] border border-[#00E5FF]/40 hover:bg-[#00E5FF] hover:text-[#03070B] font-mono text-[10px] h-7.5 rounded-none font-bold cursor-pointer"
                >
                  ▶ RESUME
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={resetDemo}
                  className="bg-transparent border-[#0D1B24] hover:bg-[#FF2638]/10 hover:text-[#FF2638] hover:border-[#FF2638]/40 font-mono text-[10px] h-7.5 rounded-none cursor-pointer"
                >
                  RESET
                </Button>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* MAIN CONTAINER */}
      <div className="flex min-h-screen flex-col lg:pl-64">
        {/* TOP SYSTEM BAR */}
        <header className="sticky top-0 z-20 flex h-13 shrink-0 items-center justify-between border-b border-[#0D1B24] bg-[#050A0F]/90 px-4 backdrop-blur-xl sm:px-6">
          <div className="flex items-center gap-3">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="shrink-0 lg:hidden rounded-none border-[#0D1B24] bg-transparent text-[#6F8A99] hover:text-[#00E5FF] hover:border-[#00E5FF]/40">
                  <Menu className="size-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64 border-[#0D1B24] bg-[#050A0F] p-0 text-[#E8F7FF]">
                <div className="flex items-center gap-2 border-b border-[#0D1B24] p-4 bg-[#071017]">
                  <Terminal className="size-4 text-[#00E5FF]" />
                  <span className="font-mono text-xs font-bold tracking-widest text-[#E8F7FF]">
                    TIMEMACHINE CONSOLE
                  </span>
                </div>
                <div className="py-4">
                  <NavLinks />
                </div>
              </SheetContent>
            </Sheet>

            {/* Breadcrumb Path */}
            <div className="hidden items-center gap-1.5 font-mono text-[10.5px] text-[#6F8A99] sm:flex">
              <span className="text-[#6F8A99]/50">TM-CORE-01</span>
              <span className="text-[#00E5FF]/40">/</span>
              <span className="text-[#6F8A99]/50">OPS</span>
              <span className="text-[#00E5FF]/40">/</span>
              <span className="text-[#00E5FF] font-bold">{breadcrumbName}</span>
            </div>
          </div>

          {/* Center Search Bar */}
          <div className="hidden max-w-sm flex-1 items-center border border-[#0D1B24] bg-[#03070B] px-3 py-1 md:flex mx-4 focus-within:border-[#00E5FF]/40">
            <Search className="mr-2 size-3 text-[#6F8A99]" />
            <input
              type="text"
              placeholder="SEARCH INCIDENTS, HOSTS, MITRE T1059, IPS..."
              className="flex-1 bg-transparent font-mono text-[10px] text-[#E8F7FF] placeholder:text-[#6F8A99]/40 focus:outline-none uppercase"
            />
            <span className="font-mono text-[8.5px] text-[#6F8A99]/40 border border-[#0D1B24] px-1">CTRL+K</span>
          </div>

          {/* Right Status Indicators HUD */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Real-time System Metrics */}
            <div className="hidden xl:flex items-center gap-4 border-r border-[#0D1B24] pr-4 font-mono text-[9px]">
              <div className="flex flex-col items-end">
                <span className="text-[#6F8A99]/60">TELEMETRY</span>
                <span className="text-[#00E5FF] font-bold">12,482/s</span>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-[#6F8A99]/60">THREATS</span>
                <span className="text-[#FF2638] font-bold">03 ACTIVE</span>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-[#6F8A99]/60">NETWORK</span>
                <span className="text-[#00FF88] font-bold flex items-center gap-1">
                  <span className="size-1 rounded-full bg-[#00FF88]" /> STABLE
                </span>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-[#6F8A99]/60">AI ENGINE</span>
                <span className="text-[#00E5FF] font-bold">ACTIVE</span>
              </div>
            </div>

            {/* Mode Tag */}
            <span className="hidden items-center gap-1.5 border border-[#FFB000]/40 bg-[#FFB000]/10 px-2 py-0.5 font-mono text-[9px] font-bold text-[#FFB000] sm:inline-flex">
              <CircleDot className="size-2 animate-pulse text-[#FFB000]" /> DEMO ENVIRONMENT
            </span>

            {/* User Profile Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 gap-2 border-[#00E5FF]/30 bg-[#071017] px-2.5 font-mono text-xs text-[#00E5FF] hover:bg-[#00E5FF]/10 hover:text-[#00E5FF] rounded-none cursor-pointer"
                >
                  <div className="size-2 rounded-full bg-[#00FF88] animate-pulse" />
                  <span className="font-bold tracking-wider">{displayName.toUpperCase()}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-64 rounded-none border-[#0D1B24] bg-[#050A0F] font-mono text-xs text-[#E8F7FF] shadow-2xl"
              >
                <DropdownMenuLabel className="font-normal text-[#6F8A99] space-y-1 p-3 bg-[#071017]">
                  <div className="font-bold text-[#E8F7FF] truncate">{displayName}</div>
                  <div className="text-[9.5px] text-[#00E5FF] font-semibold">{displayRole}</div>
                  <div className="text-[9px] text-[#6F8A99]/80 truncate">{userEmail}</div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-[#0D1B24]" />
                <DropdownMenuItem
                  asChild
                  className="hover:bg-[#00E5FF]/10 hover:text-[#00E5FF] focus:bg-[#00E5FF]/10 focus:text-[#00E5FF] cursor-pointer"
                >
                  <Link to="/admin" className="flex items-center gap-2 p-2 font-mono text-[11px]">
                    <ShieldCheck className="size-3.5 text-[#FF2638]" />
                    <span>&gt; ADMIN CONSOLE</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  asChild
                  className="hover:bg-[#00E5FF]/10 hover:text-[#00E5FF] focus:bg-[#00E5FF]/10 focus:text-[#00E5FF] cursor-pointer"
                >
                  <Link to="/settings" className="flex items-center gap-2 p-2 font-mono text-[11px]">
                    <Settings className="size-3.5 text-[#00E5FF]" />
                    <span>&gt; SYSTEM SETTINGS</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-[#0D1B24]" />
                <DropdownMenuItem
                  onClick={handleSignOut}
                  className="text-[#FF2638] hover:bg-[#FF2638]/10 focus:bg-[#FF2638]/10 focus:text-[#FF2638] font-bold flex items-center justify-between p-2 cursor-pointer font-mono text-[11px]"
                >
                  <span>&gt; TERMINATE SESSION</span>
                  <LogOut className="size-3.5" />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 p-3.5 sm:p-5 lg:p-6 w-full relative z-10">{children}</main>
      </div>
      <IrisCopilot />
    </div>
  );
}

