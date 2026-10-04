import {
  Bell,
  Bot,
  BrainCircuit,
  CircleDot,
  FileText,
  FlaskConical,
  Gauge,
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
import { Link, useRouterState } from "@tanstack/react-router";
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

const navItems = [
  { label: "Dashboard", to: "/dashboard", icon: Home },
  { label: "Incidents", to: "/incidents", icon: Siren },
  { label: "Digital Twin", to: "/digital-twin", icon: Network },
  { label: "Incident Time Machine", to: "/time-machine", icon: BrainCircuit },
  { label: "Attack Graph", to: "/attack-graph", icon: GitBranch },
  { label: "Simulation Lab", to: "/simulation-lab", icon: FlaskConical },
  { label: "IRIS Investigator", to: "/iris", icon: Bot },
  { label: "Evidence", to: "/evidence", icon: Radar },
  { label: "Response Center", to: "/response-center", icon: ListChecks },
  { label: "Reports", to: "/reports", icon: FileText },
  { label: "Settings", to: "/settings", icon: Settings },
] as const;

function NavLinks({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  return (
    <nav className="space-y-1" aria-label="Primary">
      {navItems.map((item) => {
        const Icon = item.icon;
        const active = pathname === item.to;
        return (
          <Link
            key={item.to}
            to={item.to}
            onClick={onNavigate}
            className={cn(
              "group flex min-h-11 items-center gap-3 rounded-lg border px-3 text-sm font-medium transition-all duration-200",
              active
                ? "border-cyan-glow bg-primary/15 text-foreground shadow-glow"
                : "border-transparent text-muted-foreground hover:border-border hover:bg-secondary/70 hover:text-foreground",
            )}
          >
            <Icon
              className={cn(
                "size-4",
                active ? "text-cyan-signal" : "text-muted-foreground group-hover:text-cyan-signal",
              )}
            />
            <span>{item.label}</span>
          </Link>
        );
      })}
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

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="fixed inset-0 -z-10 bg-command-grid opacity-70" />
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_20%_10%,var(--aura-cyan),transparent_28%),radial-gradient(circle_at_90%_0%,var(--aura-violet),transparent_24%),linear-gradient(180deg,var(--background),var(--background))]" />
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-72 border-r border-border bg-sidebar/80 px-4 py-5 backdrop-blur-xl lg:block">
        <Link to="/" className="mb-6 flex items-center gap-3 rounded-lg px-2">
          <span className="grid size-11 place-items-center rounded-lg border border-cyan-glow bg-primary/15 shadow-glow">
            <ShieldCheck className="size-5 text-cyan-signal" />
          </span>
          <span>
            <span className="block text-sm font-semibold uppercase tracking-[0.22em] text-muted-foreground">
              Incident
            </span>
            <span className="block text-lg font-semibold">Time Machine</span>
          </span>
        </Link>
        <NavLinks />
        <div className="mt-6 rounded-lg border border-border bg-card/70 p-4 shadow-panel">
          <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.18em] text-cyan-signal">
            <span className="flex items-center gap-2">
              <CircleDot className={cn("size-3", isAttackRunning && "animate-pulse")} /> DEMO MODE
            </span>
            <span className="font-mono text-muted-foreground">{currentTime}</span>
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            Synthetic telemetry only. No real infrastructure actions are connected.
          </p>
          {!isAttackRunning && !isPaused ? (
            <Button className="mt-4 w-full" onClick={startAttackSimulation}>
              <Radar className="size-4" /> Start Attack Simulation
            </Button>
          ) : isAttackRunning ? (
            <div className="mt-4 flex gap-2">
              <Button className="flex-1" variant="secondary" size="sm" onClick={pauseSimulation}>
                Pause
              </Button>
              <Button variant="outline" size="sm" onClick={resetDemo}>
                Reset
              </Button>
            </div>
          ) : (
            <div className="mt-4 flex gap-2">
              <Button className="flex-1" size="sm" onClick={resumeSimulation}>
                Resume
              </Button>
              <Button variant="outline" size="sm" onClick={resetDemo}>
                Reset
              </Button>
            </div>
          )}
        </div>
      </aside>

      <div className="min-h-screen lg:pl-72">
        <header className="sticky top-0 z-20 border-b border-border bg-background/75 backdrop-blur-xl">
          <div className="flex min-h-16 items-center gap-3 px-4 sm:px-6 lg:px-8">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="lg:hidden"
                  aria-label="Open navigation"
                >
                  <Menu className="size-4" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="left"
                className="w-80 border-border bg-sidebar/95 p-5 backdrop-blur-xl"
              >
                <SheetHeader className="mb-5 text-left">
                  <SheetTitle>Incident Time Machine</SheetTitle>
                  <SheetDescription>Demo security center navigation.</SheetDescription>
                </SheetHeader>
                <NavLinks />
              </SheetContent>
            </Sheet>
            <div className="hidden min-w-0 flex-1 items-center rounded-lg border border-border bg-input/30 px-3 py-2 sm:flex">
              <Search className="mr-2 size-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                Search incidents, hosts, hashes, evidence
              </span>
            </div>
            <div className="ml-auto flex items-center gap-2">
              <span className="hidden items-center gap-2 rounded-full border border-green-signal/30 bg-green-signal/10 px-3 py-1.5 text-xs font-semibold text-green-signal sm:inline-flex">
                <CircleDot className="size-3" /> Systems nominal
              </span>
              <span className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-3 py-1.5 text-xs font-semibold text-cyan-signal">
                DEMO MODE
              </span>
              <Button variant="outline" size="icon" aria-label="Notifications">
                <Bell className="size-4" />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="size-9 rounded-lg border border-border bg-card font-semibold hover:bg-secondary">
                    {profile?.display_name?.substring(0, 2).toUpperCase() || user?.email?.substring(0, 2).toUpperCase() || "SK"}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{profile?.display_name || "User"}</p>
                      <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/settings">Profile & Settings</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => signOut()}>
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>
        <main className="px-4 py-6 sm:px-6 lg:px-8">{children}</main>
      </div>
      <IrisCopilot />
      <Button
        asChild
        className="fixed bottom-4 left-4 z-30 hidden shadow-glow lg:inline-flex"
        variant="secondary"
      >
        <Link to="/time-machine">
          <PanelRightOpen className="size-4" /> Resume demo flow
        </Link>
      </Button>
    </div>
  );
}
