import { useState, useEffect } from "react";
import {
  Bell,
  Building2,
  Palette,
  Shield,
  SlidersHorizontal,
  Users,
  Bot,
  Volume2,
  CheckCircle2,
  Play,
  Square,
  Plus,
  Trash2,
  Save,
  Send,
  Sparkles,
  ShieldAlert,
  Laptop,
  Check,
  RotateCcw,
  ArrowRight,
  UserCheck,
  AlertTriangle,
  Radio,
  Sliders,
  ExternalLink,
} from "lucide-react";
import { GlassPanel, PageHeader } from "@/components/layout/PageHeader";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import {
  elevenLabsAgentService,
  ELEVENLABS_AGENT_ID,
  ELEVENLABS_VOICE_ID,
  ELEVENLABS_MODEL_ID,
} from "@/services/iris/elevenLabsAgentService";
import { cn } from "@/lib/utils";

type SettingCategory =
  | "organization"
  | "users"
  | "notifications"
  | "simulation"
  | "security"
  | "appearance";

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: "Lead Commander" | "Senior Threat Hunter" | "SOC Tier 2" | "Forensics Specialist" | "AI Copilot";
  status: "Active" | "On Shift" | "Offline";
  isSystem?: boolean;
}

const INITIAL_TEAM: TeamMember[] = [
  {
    id: "usr-1",
    name: "Alex Mercer",
    email: "alex.m@acme.internal",
    role: "Lead Commander",
    status: "Active",
  },
  {
    id: "usr-2",
    name: "Elena Rostova",
    email: "elena.r@acme.internal",
    role: "Senior Threat Hunter",
    status: "Active",
  },
  {
    id: "usr-3",
    name: "David Chen",
    email: "dchen@acme.internal",
    role: "SOC Tier 2",
    status: "On Shift",
  },
  {
    id: "usr-4",
    name: "Sarah Connor",
    email: "sconnor@acme.internal",
    role: "Forensics Specialist",
    status: "Offline",
  },
  {
    id: "usr-5",
    name: "IRIS Autonomous Agent",
    email: "iris-engine@soc.internal",
    role: "AI Copilot",
    status: "Active",
    isSystem: true,
  },
];

export function SettingsView() {
  const [activeCategory, setActiveCategory] = useState<SettingCategory | null>(null);

  // ElevenLabs Voice State
  const [voiceEnabled, setVoiceEnabled] = useState(
    () => elevenLabsAgentService.getState().voiceEnabled,
  );
  const [isTestingVoice, setIsTestingVoice] = useState(false);
  const [voiceStability, setVoiceStability] = useState(75);
  const [voiceClarity, setVoiceClarity] = useState(85);
  const [selectedVoice, setSelectedVoice] = useState("Rachel (Default SOC Voice)");

  // Organization Settings State
  const [orgName, setOrgName] = useState("ACME Cyber Defense SOC");
  const [orgDomain, setOrgDomain] = useState("acme-corp.internal");
  const [leadEmail, setLeadEmail] = useState("operator@time-machine.soc");
  const [slaEscrow, setSlaEscrow] = useState("15");

  // Team Members State
  const [team, setTeam] = useState<TeamMember[]>(INITIAL_TEAM);
  const [newMemberName, setNewMemberName] = useState("");
  const [newMemberEmail, setNewMemberEmail] = useState("");
  const [newMemberRole, setNewMemberRole] = useState<TeamMember["role"]>("SOC Tier 2");
  const [isAddingUser, setIsAddingUser] = useState(false);

  // Notifications State
  const [criticalAlarms, setCriticalAlarms] = useState(true);
  const [soundAlarms, setSoundAlarms] = useState(true);
  const [irisAlerts, setIrisAlerts] = useState(true);
  const [webhookUrl, setWebhookUrl] = useState("https://hooks.slack.com/services/T00/B00/SecOpsDemo");
  const [emailAlerts, setEmailAlerts] = useState(true);

  // Simulation Settings State
  const [defaultSpeed, setDefaultSpeed] = useState("2");
  const [autoPauseCritical, setAutoPauseCritical] = useState(true);
  const [loopSimulation, setLoopSimulation] = useState(false);
  const [timelineResolution, setTimelineResolution] = useState("1m");

  // Security & Safety State
  const [safeMode, setSafeMode] = useState(true);
  const [humanApprovalRequired, setHumanApprovalRequired] = useState(true);
  const [zeroTrustHash, setZeroTrustHash] = useState(true);
  const [logRetention, setLogRetention] = useState("90");

  // Appearance State
  const [activeTheme, setActiveTheme] = useState("cyan");
  const [scanlines, setScanlines] = useState(true);
  const [audioFeedback, setAudioFeedback] = useState(true);
  const [density, setDensity] = useState("comfortable");

  // Sync ElevenLabs state
  useEffect(() => {
    return elevenLabsAgentService.subscribe((s) => {
      setVoiceEnabled(s.voiceEnabled);
    });
  }, []);

  const handleVoiceToggle = (checked: boolean) => {
    elevenLabsAgentService.setVoiceEnabled(checked);
    toast.info(`Voice output ${checked ? "enabled" : "disabled"}`);
  };

  const handleTestVoice = () => {
    if (isTestingVoice) {
      elevenLabsAgentService.stopSpeaking();
      setIsTestingVoice(false);
      return;
    }

    setIsTestingVoice(true);
    toast.info("Testing ElevenLabs IRIS speech synthesis...", {
      description: "Audio test running via browser synthesis & voice pipeline.",
    });

    elevenLabsAgentService.speakText(
      "IRIS system nominal. Threat monitoring active on ACME corporate perimeter. Incident Time Machine online.",
    );

    setTimeout(() => {
      setIsTestingVoice(false);
    }, 6000);
  };

  const handleTestNotification = () => {
    toast.warning("🚨 [SOC HIGH ALERT] Lateral movement detected on SERVER-03", {
      description: "Anomalous PowerShell execution targeting customer database DB-PROD-01. SLA: 15 mins.",
      action: {
        label: "Investigate",
        onClick: () => {
          window.location.href = "/time-machine";
        },
      },
    });
  };

  const handleAddUser = () => {
    if (!newMemberName.trim() || !newMemberEmail.trim()) {
      toast.error("Please fill in both name and email.");
      return;
    }

    const newMember: TeamMember = {
      id: `usr-${Date.now()}`,
      name: newMemberName.trim(),
      email: newMemberEmail.trim(),
      role: newMemberRole,
      status: "Active",
    };

    setTeam((prev) => [...prev, newMember]);
    setNewMemberName("");
    setNewMemberEmail("");
    setIsAddingUser(false);
    toast.success(`Analyst ${newMember.name} added to SOC roster.`);
  };

  const handleRemoveUser = (id: string, name: string) => {
    setTeam((prev) => prev.filter((m) => m.id !== id));
    toast.info(`Analyst ${name} removed from active roster.`);
  };

  const handleSaveCategory = (catName: string) => {
    toast.success(`${catName} settings updated successfully.`, {
      description: "Changes persisted to active SOC configuration.",
    });
    setActiveCategory(null);
  };

  const categoryCards: Array<{
    id: SettingCategory;
    icon: typeof Building2;
    title: string;
    description: string;
    badge: string;
  }> = [
    {
      id: "organization",
      icon: Building2,
      title: "Organization",
      description: `${orgName} · ${orgDomain}`,
      badge: "ACME-CORP",
    },
    {
      id: "users",
      icon: Users,
      title: "Users & Team Access",
      description: `${team.length} active analysts and incident responders`,
      badge: `${team.filter((t) => t.status === "Active").length} Online`,
    },
    {
      id: "notifications",
      icon: Bell,
      title: "Notifications & Alerts",
      description: criticalAlarms ? "Critical HUD alarms & Webhooks active" : "Silent mode enabled",
      badge: criticalAlarms ? "Armed" : "Muted",
    },
    {
      id: "simulation",
      icon: SlidersHorizontal,
      title: "Simulation Engine",
      description: `Default Speed: ${defaultSpeed}x · Granularity: ${timelineResolution}`,
      badge: "Configured",
    },
    {
      id: "security",
      icon: Shield,
      title: "Security & Governance",
      description: safeMode ? "Strict Synthetic Isolation · Human-in-the-loop" : "Unrestricted Mode",
      badge: safeMode ? "Safe Boundary" : "Custom",
    },
    {
      id: "appearance",
      icon: Palette,
      title: "Appearance & HUD",
      description: `Theme: ${activeTheme.toUpperCase()} · Scanlines: ${scanlines ? "ON" : "OFF"}`,
      badge: "Command Center",
    },
  ];

  return (
    <div className="mx-auto max-w-5xl animate-fade-in space-y-6 pb-12">
      <PageHeader
        eyebrow="Workspace controls"
        title="Settings"
        description="Configure organization profile, response team, alert dispatchers, and simulation telemetry."
      />

      {/* ElevenLabs Agent Configuration Card */}
      <GlassPanel className="p-5 sm:p-6 border-cyan-signal/30 bg-card/60 shadow-[0_0_30px_rgba(0,229,255,0.06)]">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <span className="grid size-11 place-items-center rounded-lg bg-cyan-signal/15 text-cyan-signal border border-cyan-signal/40 shadow-[0_0_15px_rgba(0,229,255,0.2)] shrink-0">
              <Bot className="size-6" />
            </span>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="font-bold text-foreground sm:text-base">
                  ElevenLabs Conversational Agent (IRIS)
                </h3>
                <span className="flex items-center gap-1 rounded bg-emerald-500/20 px-2 py-0.5 text-[10px] font-mono font-bold text-emerald-400 border border-emerald-500/30">
                  <CheckCircle2 className="size-3" />
                  CONNECTED & ACTIVE
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-1 max-w-2xl">
                Deterministic IRIS engine provides ground-truth forensics; ElevenLabs conversational
                voice layer generates natural speech delivery.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleTestVoice}
              className="border-cyan-signal/40 bg-cyan-signal/10 hover:bg-cyan-signal/20 text-cyan-signal font-mono text-xs uppercase rounded-sm h-8"
            >
              {isTestingVoice ? (
                <>
                  <Square className="size-3 mr-1.5 fill-current" /> Stop Audio
                </>
              ) : (
                <>
                  <Play className="size-3 mr-1.5 fill-current" /> Test Voice
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Readout Tokens */}
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs font-mono">
          <div className="rounded border border-border/70 bg-black/50 p-2.5">
            <p className="text-[10px] text-muted-foreground uppercase">Agent ID</p>
            <p className="font-bold text-foreground truncate mt-0.5" title={ELEVENLABS_AGENT_ID}>
              {ELEVENLABS_AGENT_ID}
            </p>
          </div>
          <div className="rounded border border-border/70 bg-black/50 p-2.5">
            <p className="text-[10px] text-muted-foreground uppercase">Voice ID</p>
            <p className="font-bold text-foreground truncate mt-0.5" title={ELEVENLABS_VOICE_ID}>
              {ELEVENLABS_VOICE_ID}
            </p>
          </div>
          <div className="rounded border border-border/70 bg-black/50 p-2.5">
            <p className="text-[10px] text-muted-foreground uppercase">Model</p>
            <p className="font-bold text-cyan-signal truncate mt-0.5">{ELEVENLABS_MODEL_ID}</p>
          </div>
          <div className="rounded border border-border/70 bg-black/50 p-2.5">
            <p className="text-[10px] text-muted-foreground uppercase">ASR Engine</p>
            <p className="font-bold text-foreground truncate mt-0.5">Scribe Realtime</p>
          </div>
        </div>

        {/* Voice Toggles & Sliders */}
        <div className="mt-4 pt-4 border-t border-border/60 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Volume2 className="size-5 text-cyan-signal shrink-0" />
            <div>
              <p className="text-xs font-semibold text-foreground">Automated Voice Synthesis</p>
              <p className="text-[11px] text-muted-foreground">
                Vocalize IRIS responses using real-time conversational streaming.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-muted-foreground">
                {voiceEnabled ? "ENABLED" : "MUTED"}
              </span>
              <Switch
                checked={voiceEnabled}
                onCheckedChange={handleVoiceToggle}
                aria-label="Voice Output enabled"
              />
            </div>
          </div>
        </div>
      </GlassPanel>

      {/* Main Settings Category Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {categoryCards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.id}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setActiveCategory(card.id);
                }
              }}
              onClick={() => setActiveCategory(card.id)}
              className="rounded-xl border border-border bg-card/72 shadow-panel backdrop-blur-xl p-5 hover:border-cyan-signal/50 transition-all cursor-pointer group flex flex-col justify-between text-left focus:outline-none focus:ring-2 focus:ring-cyan-signal"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="flex items-center gap-3">
                    <span className="grid size-10 place-items-center rounded-sm bg-black/60 border border-border group-hover:border-cyan-signal/50 text-cyan-signal transition-colors">
                      <Icon className="size-5" />
                    </span>
                    <div>
                      <h4 className="font-bold text-sm text-foreground uppercase tracking-wide group-hover:text-cyan-signal transition-colors">
                        {card.title}
                      </h4>
                      <span className="font-mono text-[10px] text-muted-foreground/80">
                        CONFIGURE PREFERENCES
                      </span>
                    </div>
                  </div>
                  <span className="rounded px-2 py-0.5 font-mono text-[10px] font-bold bg-primary/10 border border-primary/20 text-cyan-signal uppercase">
                    {card.badge}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed pl-13">
                  {card.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-border/50 flex items-center justify-between font-mono text-[11px] text-cyan-signal font-semibold">
                <span>OPEN SETTINGS MODAL</span>
                <span className="group-hover:translate-x-1 transition-transform flex items-center gap-1 bg-cyan-signal/10 px-2 py-0.5 rounded border border-cyan-signal/30">
                  MANAGE →
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Demo Mode Safety Boundary */}
      <GlassPanel className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-green-signal/30 p-5 bg-card/60">
        <div className="flex items-start gap-3">
          <span className="grid size-9 place-items-center rounded bg-green-signal/15 text-green-signal border border-green-signal/30 shrink-0">
            <Shield className="size-4" />
          </span>
          <div>
            <div className="flex items-center gap-2">
              <p className="font-semibold text-foreground text-sm">Demo Mode & Safety Boundary</p>
              <span className="rounded bg-green-signal/20 px-1.5 py-0.2 font-mono text-[9px] font-bold text-green-signal border border-green-signal/30">
                ACTIVE
              </span>
            </div>
            <p className="mt-0.5 text-xs text-muted-foreground">
              Strictly synthetic incident telemetry (INC-2048). No real-world endpoint or
              production infrastructure mutations will execute.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className="font-mono text-xs text-green-signal font-bold uppercase">
            {safeMode ? "ISOLATED" : "UNRESTRICTED"}
          </span>
          <Switch
            checked={safeMode}
            onCheckedChange={(c) => {
              setSafeMode(c);
              toast.info(`Safety boundary ${c ? "armed" : "unrestricted"}`);
            }}
            aria-label="Demo Mode enabled"
          />
        </div>
      </GlassPanel>

      {/* ========================================================================= */}
      {/* MODALS / DIALOGS FOR EACH CATEGORY */}
      {/* ========================================================================= */}

      {/* 1. ORGANIZATION MODAL */}
      <Dialog
        open={activeCategory === "organization"}
        onOpenChange={(open) => !open && setActiveCategory(null)}
      >
        <DialogContent className="sm:max-w-lg bg-card border-border font-sans">
          <DialogHeader>
            <div className="flex items-center gap-2 mb-1">
              <Building2 className="size-5 text-cyan-signal" />
              <DialogTitle className="uppercase font-mono tracking-wide text-base">
                Organization Settings
              </DialogTitle>
            </div>
            <DialogDescription className="text-xs text-muted-foreground">
              Configure enterprise workspace parameters and incident escalation contacts.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-3">
            <div className="space-y-1.5">
              <Label className="text-xs font-mono uppercase text-muted-foreground">
                Organization Name
              </Label>
              <Input
                value={orgName}
                onChange={(e) => setOrgName(e.target.value)}
                placeholder="e.g. ACME Cyber Defense SOC"
                className="font-mono text-xs bg-black/50 border-border"
              />
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-mono uppercase text-muted-foreground">
                Enterprise Domain
              </Label>
              <Input
                value={orgDomain}
                onChange={(e) => setOrgDomain(e.target.value)}
                placeholder="e.g. acme-corp.internal"
                className="font-mono text-xs bg-black/50 border-border"
              />
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-mono uppercase text-muted-foreground">
                Incident Lead Operator Contact
              </Label>
              <Input
                value={leadEmail}
                onChange={(e) => setLeadEmail(e.target.value)}
                placeholder="operator@time-machine.soc"
                className="font-mono text-xs bg-black/50 border-border"
              />
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-mono uppercase text-muted-foreground">
                Critical SLA Response Escrow Window
              </Label>
              <Select value={slaEscrow} onValueChange={setSlaEscrow}>
                <SelectTrigger className="font-mono text-xs bg-black/50 border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-card border-border font-mono text-xs">
                  <SelectItem value="5">5 Minutes (Hyper-Critical)</SelectItem>
                  <SelectItem value="15">15 Minutes (Standard SOC)</SelectItem>
                  <SelectItem value="30">30 Minutes (Standard Enterprise)</SelectItem>
                  <SelectItem value="60">60 Minutes (Tier 2 Review)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setActiveCategory(null)}
              className="font-mono text-xs uppercase"
            >
              Cancel
            </Button>
            <Button
              size="sm"
              onClick={() => handleSaveCategory("Organization")}
              className="bg-cyan-signal text-black hover:bg-cyan-400 font-mono text-xs uppercase font-bold"
            >
              <Save className="size-3.5 mr-1.5" /> Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 2. USERS & TEAM ACCESS MODAL */}
      <Dialog
        open={activeCategory === "users"}
        onOpenChange={(open) => !open && setActiveCategory(null)}
      >
        <DialogContent className="sm:max-w-xl bg-card border-border font-sans max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex items-center gap-2 mb-1">
              <Users className="size-5 text-cyan-signal" />
              <DialogTitle className="uppercase font-mono tracking-wide text-base">
                SOC Team & Analysts
              </DialogTitle>
            </div>
            <DialogDescription className="text-xs text-muted-foreground">
              Manage operators, threat hunters, and authorized IRIS copilots.
            </DialogDescription>
          </DialogHeader>

          {/* User Roster List */}
          <div className="space-y-2 py-2">
            <div className="flex items-center justify-between pb-1">
              <span className="font-mono text-xs uppercase text-muted-foreground font-bold">
                Active Roster ({team.length})
              </span>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setIsAddingUser(!isAddingUser)}
                className="h-7 text-xs font-mono uppercase text-cyan-signal border-cyan-signal/30"
              >
                <Plus className="size-3 mr-1" /> Add Analyst
              </Button>
            </div>

            {/* Add User Form Drawer */}
            {isAddingUser && (
              <div className="p-3 border border-cyan-signal/40 bg-cyan-signal/5 rounded-sm space-y-3 animate-in fade-in">
                <p className="font-mono text-xs font-bold text-cyan-signal uppercase">
                  New Incident Responder
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <Input
                    placeholder="Full Name"
                    value={newMemberName}
                    onChange={(e) => setNewMemberName(e.target.value)}
                    className="font-mono text-xs bg-black/50"
                  />
                  <Input
                    placeholder="Email (@acme.internal)"
                    value={newMemberEmail}
                    onChange={(e) => setNewMemberEmail(e.target.value)}
                    className="font-mono text-xs bg-black/50"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Select
                    value={newMemberRole}
                    onValueChange={(v) => setNewMemberRole(v as TeamMember["role"])}
                  >
                    <SelectTrigger className="font-mono text-xs bg-black/50 flex-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-card border-border font-mono text-xs">
                      <SelectItem value="Lead Commander">Lead Commander</SelectItem>
                      <SelectItem value="Senior Threat Hunter">Senior Threat Hunter</SelectItem>
                      <SelectItem value="SOC Tier 2">SOC Tier 2 Analyst</SelectItem>
                      <SelectItem value="Forensics Specialist">Forensics Specialist</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button
                    size="sm"
                    onClick={handleAddUser}
                    className="bg-cyan-signal text-black font-mono text-xs uppercase font-bold h-9 px-3"
                  >
                    Confirm Add
                  </Button>
                </div>
              </div>
            )}

            <div className="divide-y divide-border/60 border border-border rounded-sm overflow-hidden bg-black/40">
              {team.map((member) => (
                <div key={member.id} className="p-3 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="grid size-8 place-items-center rounded bg-secondary font-mono text-xs font-bold text-cyan-signal shrink-0">
                      {member.name.substring(0, 2).toUpperCase()}
                    </span>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-bold text-xs text-foreground truncate">{member.name}</p>
                        {member.isSystem && (
                          <span className="bg-cyan-signal/20 text-cyan-signal text-[9px] font-mono px-1 rounded uppercase font-bold">
                            AI SERVICE
                          </span>
                        )}
                      </div>
                      <p className="font-mono text-[10px] text-muted-foreground truncate">
                        {member.email} · <span className="text-foreground">{member.role}</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span
                      className={cn(
                        "rounded px-1.5 py-0.5 font-mono text-[9px] font-bold uppercase",
                        member.status === "Active"
                          ? "bg-green-signal/20 text-green-signal border border-green-signal/30"
                          : member.status === "On Shift"
                            ? "bg-warning/20 text-warning border border-warning/30"
                            : "bg-muted text-muted-foreground",
                      )}
                    >
                      {member.status}
                    </span>
                    {!member.isSystem && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemoveUser(member.id, member.name)}
                        className="size-7 text-muted-foreground hover:text-threat"
                        title="Remove Analyst"
                      >
                        <Trash2 className="size-3.5" />
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <DialogFooter>
            <Button
              size="sm"
              onClick={() => handleSaveCategory("Team Access")}
              className="bg-cyan-signal text-black hover:bg-cyan-400 font-mono text-xs uppercase font-bold"
            >
              <Save className="size-3.5 mr-1.5" /> Save Roster
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 3. NOTIFICATIONS MODAL */}
      <Dialog
        open={activeCategory === "notifications"}
        onOpenChange={(open) => !open && setActiveCategory(null)}
      >
        <DialogContent className="sm:max-w-lg bg-card border-border font-sans">
          <DialogHeader>
            <div className="flex items-center gap-2 mb-1">
              <Bell className="size-5 text-cyan-signal" />
              <DialogTitle className="uppercase font-mono tracking-wide text-base">
                Notification & Alert Dispatcher
              </DialogTitle>
            </div>
            <DialogDescription className="text-xs text-muted-foreground">
              Configure automated incident alarms, webhook endpoints, and audio signals.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div className="flex items-center justify-between border-b border-border/50 pb-3">
              <div>
                <p className="text-xs font-semibold text-foreground">Critical Incident HUD Alarms</p>
                <p className="text-[11px] text-muted-foreground">
                  Pulsing red screen borders and telemetry warnings during critical breaches.
                </p>
              </div>
              <Switch checked={criticalAlarms} onCheckedChange={setCriticalAlarms} />
            </div>

            <div className="flex items-center justify-between border-b border-border/50 pb-3">
              <div>
                <p className="text-xs font-semibold text-foreground">Audible SOC Sirens & FX</p>
                <p className="text-[11px] text-muted-foreground">
                  Sound alert chime upon privilege escalation or database dump signals.
                </p>
              </div>
              <Switch checked={soundAlarms} onCheckedChange={setSoundAlarms} />
            </div>

            <div className="flex items-center justify-between border-b border-border/50 pb-3">
              <div>
                <p className="text-xs font-semibold text-foreground">IRIS Autonomous Copilot Alerts</p>
                <p className="text-[11px] text-muted-foreground">
                  Notify when IRIS identifies counterfactual containment decisions.
                </p>
              </div>
              <Switch checked={irisAlerts} onCheckedChange={setIrisAlerts} />
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-mono uppercase text-muted-foreground">
                SOC Slack / Teams Webhook URL
              </Label>
              <Input
                value={webhookUrl}
                onChange={(e) => setWebhookUrl(e.target.value)}
                placeholder="https://hooks.slack.com/services/..."
                className="font-mono text-xs bg-black/50 border-border"
              />
            </div>
          </div>

          <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:justify-between items-center">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleTestNotification}
              className="font-mono text-xs uppercase text-warning border-warning/30 hover:bg-warning/10"
            >
              <Radio className="size-3 mr-1.5" /> Send Test Alert
            </Button>
            <Button
              size="sm"
              onClick={() => handleSaveCategory("Notifications")}
              className="bg-cyan-signal text-black hover:bg-cyan-400 font-mono text-xs uppercase font-bold"
            >
              <Save className="size-3.5 mr-1.5" /> Save Alerts
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 4. SIMULATION SETTINGS MODAL */}
      <Dialog
        open={activeCategory === "simulation"}
        onOpenChange={(open) => !open && setActiveCategory(null)}
      >
        <DialogContent className="sm:max-w-lg bg-card border-border font-sans">
          <DialogHeader>
            <div className="flex items-center gap-2 mb-1">
              <SlidersHorizontal className="size-5 text-cyan-signal" />
              <DialogTitle className="uppercase font-mono tracking-wide text-base">
                Simulation Engine Settings
              </DialogTitle>
            </div>
            <DialogDescription className="text-xs text-muted-foreground">
              Fine-tune the counterfactual temporal reconstruction speeds and telemetry loop.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div className="space-y-1.5">
              <Label className="text-xs font-mono uppercase text-muted-foreground">
                Default Launch Playback Speed
              </Label>
              <Select value={defaultSpeed} onValueChange={setDefaultSpeed}>
                <SelectTrigger className="font-mono text-xs bg-black/50 border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-card border-border font-mono text-xs">
                  <SelectItem value="1">1x Real-Time Acceleration</SelectItem>
                  <SelectItem value="2">2x Accelerated Investigation</SelectItem>
                  <SelectItem value="5">5x Rapid Traversal</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-mono uppercase text-muted-foreground">
                Timeline Step Resolution
              </Label>
              <Select value={timelineResolution} onValueChange={setTimelineResolution}>
                <SelectTrigger className="font-mono text-xs bg-black/50 border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-card border-border font-mono text-xs">
                  <SelectItem value="30s">30 Seconds (High Precision)</SelectItem>
                  <SelectItem value="1m">1 Minute (Standard)</SelectItem>
                  <SelectItem value="5m">5 Minutes (Macro Overview)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between border-b border-border/50 pb-3">
              <div>
                <p className="text-xs font-semibold text-foreground">Auto-Pause at Breach Milestone</p>
                <p className="text-[11px] text-muted-foreground">
                  Halt simulation at 10:04 UTC initial detection to prompt human decision.
                </p>
              </div>
              <Switch checked={autoPauseCritical} onCheckedChange={setAutoPauseCritical} />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-foreground">Continuous Loop Simulation</p>
                <p className="text-[11px] text-muted-foreground">
                  Rewind back to 09:47 upon reaching the 10:45 incident terminus.
                </p>
              </div>
              <Switch checked={loopSimulation} onCheckedChange={setLoopSimulation} />
            </div>
          </div>

          <DialogFooter>
            <Button
              size="sm"
              onClick={() => handleSaveCategory("Simulation Engine")}
              className="bg-cyan-signal text-black hover:bg-cyan-400 font-mono text-xs uppercase font-bold"
            >
              <Save className="size-3.5 mr-1.5" /> Save Parameters
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 5. SECURITY & COMPLIANCE MODAL */}
      <Dialog
        open={activeCategory === "security"}
        onOpenChange={(open) => !open && setActiveCategory(null)}
      >
        <DialogContent className="sm:max-w-lg bg-card border-border font-sans">
          <DialogHeader>
            <div className="flex items-center gap-2 mb-1">
              <Shield className="size-5 text-cyan-signal" />
              <DialogTitle className="uppercase font-mono tracking-wide text-base">
                Security & RBAC Governance
              </DialogTitle>
            </div>
            <DialogDescription className="text-xs text-muted-foreground">
              Define containment safety barriers, cryptographic audit logs, and approval gates.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div className="flex items-center justify-between border-b border-border/50 pb-3">
              <div>
                <p className="text-xs font-semibold text-foreground">Mandatory Human Authorization</p>
                <p className="text-[11px] text-muted-foreground">
                  Require operator confirmation before executing simulated containment actions.
                </p>
              </div>
              <Switch checked={humanApprovalRequired} onCheckedChange={setHumanApprovalRequired} />
            </div>

            <div className="flex items-center justify-between border-b border-border/50 pb-3">
              <div>
                <p className="text-xs font-semibold text-foreground">SHA-256 Audit Chain Verification</p>
                <p className="text-[11px] text-muted-foreground">
                  Compute immutable cryptographic hash on all reconstructed timeline events.
                </p>
              </div>
              <Switch checked={zeroTrustHash} onCheckedChange={setZeroTrustHash} />
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-mono uppercase text-muted-foreground">
                Forensic Audit Trail Retention
              </Label>
              <Select value={logRetention} onValueChange={setLogRetention}>
                <SelectTrigger className="font-mono text-xs bg-black/50 border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-card border-border font-mono text-xs">
                  <SelectItem value="30">30 Days (Demo Storage)</SelectItem>
                  <SelectItem value="90">90 Days (Enterprise Standard)</SelectItem>
                  <SelectItem value="365">365 Days (Compliance / SEC)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button
              size="sm"
              onClick={() => handleSaveCategory("Security")}
              className="bg-cyan-signal text-black hover:bg-cyan-400 font-mono text-xs uppercase font-bold"
            >
              <Save className="size-3.5 mr-1.5" /> Apply Policies
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 6. APPEARANCE & HUD MODAL */}
      <Dialog
        open={activeCategory === "appearance"}
        onOpenChange={(open) => !open && setActiveCategory(null)}
      >
        <DialogContent className="sm:max-w-lg bg-card border-border font-sans">
          <DialogHeader>
            <div className="flex items-center gap-2 mb-1">
              <Palette className="size-5 text-cyan-signal" />
              <DialogTitle className="uppercase font-mono tracking-wide text-base">
                Appearance & HUD Customization
              </DialogTitle>
            </div>
            <DialogDescription className="text-xs text-muted-foreground">
              Customize cybernetic visual accents, scanlines, and interface density.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label className="text-xs font-mono uppercase text-muted-foreground">
                HUD Accent Theme
              </Label>
              <div className="grid grid-cols-2 gap-2 font-mono text-xs">
                {[
                  { id: "cyan", name: "Cyan Signal", border: "border-cyan-400", color: "bg-cyan-400" },
                  { id: "matrix", name: "Matrix Emerald", border: "border-emerald-400", color: "bg-emerald-400" },
                  { id: "amber", name: "Tactical Amber", border: "border-amber-400", color: "bg-amber-400" },
                  { id: "obsidian", name: "Void Obsidian", border: "border-purple-400", color: "bg-purple-400" },
                ].map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setActiveTheme(t.id)}
                    className={cn(
                      "flex items-center gap-2.5 p-2.5 rounded border transition-all text-left",
                      activeTheme === t.id
                        ? "border-cyan-signal bg-primary/10 text-foreground"
                        : "border-border/60 bg-black/40 text-muted-foreground hover:border-border",
                    )}
                  >
                    <span className={cn("size-3 rounded-full", t.color)} />
                    <span className="font-semibold text-xs">{t.name}</span>
                    {activeTheme === t.id && <Check className="size-3 ml-auto text-cyan-signal" />}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between border-b border-border/50 pb-3">
              <div>
                <p className="text-xs font-semibold text-foreground">Retro Cyber Scanline FX</p>
                <p className="text-[11px] text-muted-foreground">
                  Subtle CRT scanline overlay on 3D canvases and charts.
                </p>
              </div>
              <Switch checked={scanlines} onCheckedChange={setScanlines} />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-foreground">Interactive Click Sound FX</p>
                <p className="text-[11px] text-muted-foreground">
                  Subtle tactile audio clicks when manipulating the time machine scrubber.
                </p>
              </div>
              <Switch checked={audioFeedback} onCheckedChange={setAudioFeedback} />
            </div>
          </div>

          <DialogFooter>
            <Button
              size="sm"
              onClick={() => handleSaveCategory("Appearance")}
              className="bg-cyan-signal text-black hover:bg-cyan-400 font-mono text-xs uppercase font-bold"
            >
              <Save className="size-3.5 mr-1.5" /> Save Appearance
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
