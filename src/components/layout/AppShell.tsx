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
    <nav className="space-y-4 px-2.5" aria-label="Security Command Console">
      {navSections.map((section) => (
        <div key={section.title} className="space-y-1">
          <div className="flex items-center justify-between px-2.5 py-1 text-[9.5px] font-mono font-bold tracking-[0.2em] text-[#7893A1] border-b border-[#142029]">
            <span>// {section.title}</span>
            <span className="text-[8px] text-[#16D9F2]/40">SYS</span>
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
                    "group relative flex min-h-[34px] items-center gap-2.5 px-2.5 text-xs font-mono transition-all duration-150 rounded-[3px] border",
                    active
                      ? "border-[#16D9F2]/40 bg-[#16D9F2]/10 text-[#F3F7FA] shadow-[inset_0_0_12px_rgba(22,217,242,0.08)] border-l-2 border-l-[#16D9F2]"
                      : "border-transparent text-[#A5B5C0] hover:border-[#1B2933] hover:bg-[#0B1117] hover:text-[#F3F7FA]",
                  )}
                >
                  <span className={cn(
                    "text-[10px] transition-colors font-mono",
                    active ? "text-[#16D9F2] font-bold" : "text-[#647682] group-hover:text-[#16D9F2]/70"
                  )}>
                    &gt;
                  </span>

                  <Icon
                    className={cn(
                      "size-3.5 shrink-0 transition-transform group-hover:scale-105",
                      active
                        ? "text-[#16D9F2] drop-shadow-[0_0_6px_rgba(22,217,242,0.6)]"
                        : "text-[#7893A1] group-hover:text-[#16D9F2]",
                    )}
                  />

                  <span className="truncate tracking-wide text-[11px] font-medium">{item.label}</span>

                  {item.tag && (
                    <span className={cn(
                      "ml-auto text-[8px] px-1.5 py-0.2 rounded-[2px] border font-mono font-semibold",
                      item.tag === "LIVE" ? "border-[#FF3347]/40 bg-[#FF3347]/10 text-[#FF3347] animate-pulse" :
                      item.tag === "REWIND" ? "border-[#16D9F2]/40 bg-[#16D9F2]/10 text-[#16D9F2]" :
                      item.tag === "AI" ? "border-[#20DFA0]/40 bg-[#20DFA0]/10 text-[#20DFA0]" :
                      "border-[#FFB020]/40 bg-[#FFB020]/10 text-[#FFB020]"
                    )}>
                      {item.tag}
                    </span>
                  )}

                  {item.shortcut && !item.tag && (
                    <span className="ml-auto text-[9px] text-[#647682] opacity-0 transition-opacity group-hover:opacity-100">
                      {item.shortcut}
                    </span>
                  )}

                  {active && (
                    <div className="absolute right-1.5 size-1.5 rounded-full bg-[#16D9F2] animate-pulse shadow-[0_0_6px_#16D9F2]" />
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
    <div className="min-h-screen bg-[#05080C] text-[#F3F7FA] font-sans selection:bg-[#16D9F2]/30 selection:text-[#16D9F2]">
      {/* Background Matrix Grid */}
      <div className="fixed inset-0 pointer-events-none opacity-20 bg-[linear-gradient(to_right,#16D9F208_1px,transparent_1px),linear-gradient(to_bottom,#16D9F208_1px,transparent_1px)] bg-[size:32px_32px] z-0" />

      {/* LEFT SIDEBAR: SECURITY COMMAND CONSOLE */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 border-r border-[#142029] bg-[#05080C] px-0 py-0 lg:flex lg:flex-col shadow-[4px_0_24px_rgba(0,0,0,0.8)]">
        {/* Brand Header */}
        <div className="border-b border-[#142029] p-4 bg-[#070C11]">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-[4px] border border-[#16D9F2]/40 bg-[#16D9F2]/10 text-[#16D9F2] shadow-[0_0_12px_rgba(22,217,242,0.15)]">
              <Terminal className="size-4.5" />
            </div>
            <div>
              <div className="font-mono text-xs font-black tracking-[0.18em] text-[#F3F7FA] flex items-center gap-1.5">
                TIMEMACHINE
                <span className="text-[9px] px-1 py-0.2 bg-[#16D9F2]/20 text-[#16D9F2] border border-[#16D9F2]/40 rounded-[2px] font-bold">2.0</span>
              </div>
              <div className="font-mono text-[8.5px] uppercase tracking-[0.2em] text-[#16D9F2]/80">
                INCIDENT RESPONSE ENGINE
              </div>
            </div>
          </div>
        </div>

        {/* Node & System State */}
        <div className="flex items-center justify-between border-b border-[#142029] bg-[#05080C] px-4 py-2 font-mono text-[9.5px]">
          <div className="flex items-center gap-1.5 text-[#647682]">
            <span>NODE:</span>
            <span className="text-[#16D9F2] font-bold">TM-CORE-01</span>
          </div>
          <div className="flex items-center gap-1.5 text-[#20DFA0]">
            <CircleDot className="size-2 text-[#20DFA0] animate-pulse" />
            <span className="font-bold tracking-wider">ONLINE</span>
          </div>
        </div>

        {/* Navigation Console */}
        <div className="flex-1 overflow-y-auto py-4 custom-scrollbar">
          <NavLinks />
        </div>

        {/* Simulator / Temporal Control Footer */}
        <div className="mt-auto border-t border-[#142029] bg-[#05080C] p-3.5 space-y-2.5">
          <div className="rounded-[4px] border border-[#FFB020]/30 bg-[#FFB020]/5 p-2.5">
            <div className="flex items-center justify-between font-mono text-[9px] uppercase">
              <span className="text-[#FFB020] font-bold flex items-center gap-1.5">
                <Activity className={cn("size-3", isAttackRunning && "animate-pulse")} />
                DEMO ENVIRONMENT
              </span>
              <span className="text-[#647682] font-mono text-[8px]">{currentTime}</span>
            </div>
            <p className="mt-1 font-mono text-[9.5px] text-[#A5B5C0] leading-tight">
              Synthetic telemetry active. No live endpoints currently streaming.
            </p>
          </div>

          <div className="flex flex-col gap-1.5">
            {!isAttackRunning && !isPaused ? (
              <Button
                size="sm"
                onClick={startAttackSimulation}
                className="w-full bg-[#16D9F2]/10 text-[#16D9F2] border border-[#16D9F2]/40 hover:bg-[#16D9F2] hover:text-[#05080C] transition-all font-mono text-[10px] h-7.5 rounded-[3px] font-bold tracking-wider cursor-pointer shadow-[0_0_12px_rgba(22,217,242,0.15)]"
              >
                ▶ RUN SIMULATION
              </Button>
            ) : isAttackRunning ? (
              <div className="flex gap-1.5">
                <Button
                  size="sm"
                  onClick={pauseSimulation}
                  className="flex-1 bg-[#FFB020]/10 text-[#FFB020] border border-[#FFB020]/40 hover:bg-[#FFB020] hover:text-[#05080C] font-mono text-[10px] h-7.5 rounded-[3px] font-bold cursor-pointer"
                >
                  ❚❚ PAUSE
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={resetDemo}
                  className="bg-transparent border-[#1B2933] hover:bg-[#FF3347]/10 hover:text-[#FF3347] hover:border-[#FF3347]/40 font-mono text-[10px] h-7.5 rounded-[3px] cursor-pointer"
                >
                  RESET
                </Button>
              </div>
            ) : (
              <div className="flex gap-1.5">
                <Button
                  size="sm"
                  onClick={resumeSimulation}
                  className="flex-1 bg-[#16D9F2]/10 text-[#16D9F2] border border-[#16D9F2]/40 hover:bg-[#16D9F2] hover:text-[#05080C] font-mono text-[10px] h-7.5 rounded-[3px] font-bold cursor-pointer"
                >
                  ▶ RESUME
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={resetDemo}
                  className="bg-transparent border-[#1B2933] hover:bg-[#FF3347]/10 hover:text-[#FF3347] hover:border-[#FF3347]/40 font-mono text-[10px] h-7.5 rounded-[3px] cursor-pointer"
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
        <header className="sticky top-0 z-20 flex h-13 shrink-0 items-center justify-between border-b border-[#142029] bg-[#05080C]/95 px-4 backdrop-blur-xl sm:px-6">
          <div className="flex items-center gap-3">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="shrink-0 lg:hidden rounded-[3px] border-[#1B2933] bg-transparent text-[#A5B5C0] hover:text-[#16D9F2] hover:border-[#16D9F2]/40">
                  <Menu className="size-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64 border-[#142029] bg-[#05080C] p-0 text-[#F3F7FA]">
                <div className="flex items-center gap-2 border-b border-[#142029] p-4 bg-[#070C11]">
                  <Terminal className="size-4 text-[#16D9F2]" />
                  <span className="font-mono text-xs font-bold tracking-widest text-[#F3F7FA]">
                    TIMEMACHINE CONSOLE
                  </span>
                </div>
                <div className="py-4">
                  <NavLinks />
                </div>
              </SheetContent>
            </Sheet>

            {/* Breadcrumb Path */}
            <div className="hidden items-center gap-1.5 font-mono text-[10.5px] text-[#A5B5C0] sm:flex">
              <span className="text-[#647682]">TM-CORE-01</span>
              <span className="text-[#16D9F2]/40">/</span>
              <span className="text-[#647682]">OPS</span>
              <span className="text-[#16D9F2]/40">/</span>
              <span className="text-[#16D9F2] font-bold">{breadcrumbName}</span>
            </div>
          </div>

          {/* Center Search Bar */}
          <div className="hidden max-w-sm flex-1 items-center border border-[#1B2933] bg-[#070C11] px-3 py-1 md:flex mx-4 focus-within:border-[#16D9F2]/60 rounded-[3px]">
            <Search className="mr-2 size-3 text-[#7893A1]" />
            <input
              type="text"
              placeholder="SEARCH INCIDENTS, HOSTS, MITRE T1059, IPS..."
              className="flex-1 bg-transparent font-mono text-[10px] text-[#F3F7FA] placeholder:text-[#647682] focus:outline-none uppercase"
            />
            <span className="font-mono text-[8.5px] text-[#647682] border border-[#1B2933] px-1 rounded-[2px]">CTRL+K</span>
          </div>

          {/* Right Status Indicators HUD */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Real-time System Metrics */}
            <div className="hidden xl:flex items-center gap-4 border-r border-[#142029] pr-4 font-mono text-[9px]">
              <div className="flex flex-col items-end">
                <span className="text-[#7893A1]">TELEMETRY</span>
                <span className="text-[#F3F7FA] font-bold">12,482/s</span>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-[#7893A1]">THREATS</span>
                <span className="text-[#FF3347] font-bold">03 ACTIVE</span>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-[#7893A1]">NETWORK</span>
                <span className="text-[#20DFA0] font-bold flex items-center gap-1">
                  <span className="size-1 rounded-full bg-[#20DFA0]" /> STABLE
                </span>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-[#7893A1]">AI ENGINE</span>
                <span className="text-[#16D9F2] font-bold">ACTIVE</span>
              </div>
            </div>

            {/* Mode Tag */}
            <span className="hidden items-center gap-1.5 border border-[#FFB020]/40 bg-[#FFB020]/10 px-2 py-0.5 font-mono text-[9px] font-bold text-[#FFB020] rounded-[2px] sm:inline-flex">
              <CircleDot className="size-2 animate-pulse text-[#FFB020]" /> DEMO ENVIRONMENT
            </span>

            {/* User Profile Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 gap-2 border-[#16D9F2]/30 bg-[#0B1117] px-2.5 font-mono text-xs text-[#16D9F2] hover:bg-[#16D9F2]/10 hover:text-[#16D9F2] rounded-[3px] cursor-pointer"
                >
                  <div className="size-2 rounded-full bg-[#20DFA0] animate-pulse" />
                  <span className="font-bold tracking-wider">{displayName.toUpperCase()}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-64 rounded-[4px] border-[#1B2933] bg-[#070C11] font-mono text-xs text-[#F3F7FA] shadow-2xl"
              >
                <DropdownMenuLabel className="font-normal text-[#A5B5C0] space-y-1 p-3 bg-[#0B1117]">
                  <div className="font-bold text-[#F3F7FA] truncate">{displayName}</div>
                  <div className="text-[9.5px] text-[#16D9F2] font-semibold">{displayRole}</div>
                  <div className="text-[9px] text-[#647682] truncate">{userEmail}</div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-[#1B2933]" />
                <DropdownMenuItem
                  asChild
                  className="hover:bg-[#16D9F2]/10 hover:text-[#16D9F2] focus:bg-[#16D9F2]/10 focus:text-[#16D9F2] cursor-pointer"
                >
                  <Link to="/admin" className="flex items-center gap-2 p-2 font-mono text-[11px]">
                    <ShieldCheck className="size-3.5 text-[#FF3347]" />
                    <span>&gt; ADMIN CONSOLE</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  asChild
                  className="hover:bg-[#16D9F2]/10 hover:text-[#16D9F2] focus:bg-[#16D9F2]/10 focus:text-[#16D9F2] cursor-pointer"
                >
                  <Link to="/settings" className="flex items-center gap-2 p-2 font-mono text-[11px]">
                    <Settings className="size-3.5 text-[#16D9F2]" />
                    <span>&gt; SYSTEM SETTINGS</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-[#1B2933]" />
                <DropdownMenuItem
                  onClick={handleSignOut}
                  className="text-[#FF3347] hover:bg-[#FF3347]/10 focus:bg-[#FF3347]/10 focus:text-[#FF3347] font-bold flex items-center justify-between p-2 cursor-pointer font-mono text-[11px]"
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

