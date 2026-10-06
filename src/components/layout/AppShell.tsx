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
  PanelRightOpen,
  Radar,
  Search,
  Settings,
  ShieldCheck,
  Siren,
  Terminal,
  Activity
} from "lucide-react";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Link, useRouterState, useLocation } from "@tanstack/react-router";
import { useDemo } from "@/context/DemoContext";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";
import { IrisCopilot } from "@/components/ai-copilot/IrisCopilot";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const navSections = [
  {
    title: "COMMAND",
    items: [
      { label: "Dashboard", to: "/dashboard", icon: Home, shortcut: "⌘1" },
      { label: "Incidents", to: "/incidents", icon: Siren, shortcut: "⌘2" },
    ]
  },
  {
    title: "INVESTIGATION",
    items: [
      { label: "Time Machine", to: "/time-machine", icon: BrainCircuit, shortcut: "⌘3" },
      { label: "Attack Graph", to: "/attack-graph", icon: GitBranch, shortcut: "⌘4" },
      { label: "Digital Twin", to: "/digital-twin", icon: Network },
      { label: "IRIS Investigator", to: "/iris", icon: Bot },
      { label: "Evidence", to: "/evidence", icon: Radar },
    ]
  },
  {
    title: "SIMULATION",
    items: [
      { label: "Simulation Lab", to: "/simulation-lab", icon: FlaskConical },
    ]
  },
  {
    title: "RESPONSE",
    items: [
      { label: "Response Center", to: "/response-center", icon: ListChecks },
    ]
  },
  {
    title: "INTELLIGENCE",
    items: [
      { label: "Reports", to: "/reports", icon: FileText },
    ]
  },
  {
    title: "SYSTEM",
    items: [
      { label: "Settings", to: "/settings", icon: Settings },
    ]
  }
];

function NavLinks({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  return (
    <nav className="space-y-6" aria-label="Primary">
      {navSections.map((section) => (
        <div key={section.title} className="space-y-2">
          <div className="px-3 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/70">
            {section.title}
          </div>
          <div className="space-y-0.5">
            {section.items.map((item) => {
              const Icon = item.icon;
              const active = pathname === item.to || pathname.startsWith(item.to + "/");
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={onNavigate}
                  className={cn(
                    "group relative flex min-h-10 items-center gap-3 rounded-none border-l-2 px-3 text-sm font-medium transition-all duration-200",
                    active
                      ? "border-primary bg-primary/10 text-foreground shadow-[inset_40px_0_40px_rgba(0,229,255,0.05)]"
                      : "border-transparent text-muted-foreground hover:border-border hover:bg-secondary/40 hover:text-foreground",
                  )}
                >
                  <Icon
                    className={cn(
                      "size-[14px]",
                      active ? "text-cyan-signal drop-shadow-[0_0_8px_rgba(0,229,255,0.8)]" : "text-muted-foreground/70 group-hover:text-cyan-signal",
                    )}
                  />
                  <span className="font-sans text-[13px]">{item.label}</span>
                  {item.shortcut && (
                    <span className="ml-auto font-mono text-[10px] text-muted-foreground/50 opacity-0 transition-opacity group-hover:opacity-100">
                      {item.shortcut}
                    </span>
                  )}
                  {active && (
                    <div className="absolute right-3 size-1.5 rounded-full bg-cyan-signal animate-pulse-ring" />
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
  const { user, profile, signOut } = useAuth();
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
  
  const location = useLocation();
  const breadcrumbName = navSections.flatMap(s => s.items).find(i => i.to === location.pathname)?.label || location.pathname.substring(1).toUpperCase() || "DASHBOARD";

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 border-r border-border bg-sidebar px-0 py-0 lg:flex lg:flex-col">
        <div className="flex items-center gap-3 border-b border-border p-5">
          <Terminal className="size-5 text-cyan-signal drop-shadow-[0_0_8px_rgba(0,229,255,0.8)]" />
          <div>
            <span className="block font-sans text-sm font-bold tracking-[0.1em] text-foreground">
              TIMEMACHINE
            </span>
            <span className="block font-mono text-[9px] uppercase tracking-[0.2em] text-cyan-signal/70">
              Incident Response Platform
            </span>
          </div>
        </div>
        
        <div className="flex items-center gap-2 border-b border-border bg-black/40 px-5 py-2 font-mono text-[10px]">
          <CircleDot className="size-2 text-cyan-signal animate-pulse" />
          <span className="text-muted-foreground">NODE: <span className="text-cyan-signal">TM-CORE-01</span></span>
        </div>

        <div className="flex-1 overflow-y-auto px-2 py-6 custom-scrollbar">
          <NavLinks />
        </div>
        
        <div className="mt-auto border-t border-border bg-black/60 p-4">
          <div className="mb-3 rounded border border-warning/30 bg-warning/5 p-3">
            <div className="flex items-center gap-2 font-mono text-[10px] uppercase text-warning">
              <Activity className={cn("size-3", isAttackRunning && "animate-pulse")} />
              <span>DEMO ENVIRONMENT</span>
            </div>
            <p className="mt-1.5 font-sans text-[11px] text-muted-foreground leading-tight">
              Synthetic telemetry active. No verified live endpoint telemetry connected.
            </p>
          </div>
          
          <div className="flex flex-col gap-2">
            {!isAttackRunning && !isPaused ? (
              <Button size="sm" onClick={startAttackSimulation} className="w-full bg-primary/10 text-cyan-signal border border-primary/30 hover:bg-primary/20 hover:text-white transition-colors font-mono text-xs rounded-sm h-8">
                [ RUN SIMULATION ]
              </Button>
            ) : isAttackRunning ? (
              <div className="flex gap-2">
                <Button size="sm" onClick={pauseSimulation} className="flex-1 bg-warning/10 text-warning border border-warning/30 hover:bg-warning/20 rounded-sm font-mono text-xs h-8">
                  PAUSE
                </Button>
                <Button size="sm" variant="outline" onClick={resetDemo} className="rounded-sm font-mono text-xs h-8">
                  RESET
                </Button>
              </div>
            ) : (
              <div className="flex gap-2">
                <Button size="sm" onClick={resumeSimulation} className="flex-1 bg-primary/10 text-cyan-signal border border-primary/30 hover:bg-primary/20 rounded-sm font-mono text-xs h-8">
                  RESUME
                </Button>
                <Button size="sm" variant="outline" onClick={resetDemo} className="rounded-sm font-mono text-xs h-8">
                  RESET
                </Button>
              </div>
            )}
          </div>
        </div>
      </aside>

      <div className="flex min-h-screen flex-col lg:pl-64">
        <header className="sticky top-0 z-20 flex h-14 shrink-0 items-center gap-4 border-b border-border bg-sidebar/80 px-4 backdrop-blur-xl sm:gap-6 sm:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="shrink-0 lg:hidden rounded-sm">
                <Menu className="size-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 border-border bg-sidebar p-0">
              {/* Mobile nav similar to desktop */}
              <div className="flex items-center gap-3 border-b border-border p-5">
                <Terminal className="size-5 text-cyan-signal" />
                <div>
                  <span className="block font-sans text-sm font-bold tracking-[0.1em] text-foreground">TIMEMACHINE</span>
                </div>
              </div>
              <div className="px-2 py-6">
                <NavLinks />
              </div>
            </SheetContent>
          </Sheet>
          
          <div className="hidden items-center gap-2 font-mono text-[10px] text-muted-foreground/60 sm:flex">
            <span>TIMEMACHINE</span>
            <span>/</span>
            <span>INCIDENT RESPONSE</span>
            <span>/</span>
            <span className="text-cyan-signal">{breadcrumbName.toUpperCase()}</span>
          </div>

          <div className="mx-auto hidden max-w-md flex-1 items-center rounded-sm border border-border bg-black/50 px-3 py-1.5 sm:flex">
            <Search className="mr-2 size-3 text-muted-foreground" />
            <input 
              type="text"
              placeholder="Search incidents, hosts, hashes, IPs, evidence..." 
              className="flex-1 bg-transparent font-mono text-xs text-foreground placeholder:text-muted-foreground/50 focus:outline-none"
            />
          </div>

          <div className="ml-auto flex items-center gap-4">
            <div className="hidden lg:flex items-center gap-4 border-r border-border pr-4 font-mono text-[10px]">
              <div className="flex flex-col items-end">
                <span className="text-muted-foreground/50">EVENTS</span>
                <span className="text-foreground">12.4K</span>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-muted-foreground/50">ALERTS</span>
                <span className="text-warning">03</span>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-muted-foreground/50">AGENTS</span>
                <span className="text-foreground">08</span>
              </div>
            </div>

            <span className="hidden items-center gap-2 rounded-sm border border-warning/30 bg-warning/10 px-2 py-1 font-mono text-[10px] font-bold text-warning sm:inline-flex">
              <CircleDot className="size-2 animate-pulse" /> SYNTHETIC DATA
            </span>
            
            <Button variant="ghost" size="icon" className="rounded-sm hover:bg-secondary/50">
              <Bell className="size-4 text-muted-foreground" />
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="size-8 rounded-sm bg-black/50 font-mono text-xs font-bold text-cyan-signal border-primary/20 hover:bg-primary/10 hover:text-cyan-signal">
                  {profile?.display_name?.substring(0, 2).toUpperCase() || user?.email?.substring(0, 2).toUpperCase() || "OP"}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 rounded-sm border-border bg-sidebar font-mono text-xs">
                <DropdownMenuLabel className="font-normal text-muted-foreground">
                  OPERATOR: {user?.email}
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-border" />
                <DropdownMenuItem asChild className="hover:bg-primary/10 hover:text-cyan-signal focus:bg-primary/10 focus:text-cyan-signal">
                  <Link to="/settings">SYSTEM SETTINGS</Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => signOut()} className="text-destructive hover:bg-destructive/10 focus:bg-destructive/10 focus:text-destructive">
                  TERMINATE SESSION
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        <main className="flex-1 p-3.5 sm:p-5 lg:p-6 w-full">{children}</main>
      </div>
      <IrisCopilot />
    </div>
  );
}
