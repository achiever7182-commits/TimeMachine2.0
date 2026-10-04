import { useState, useEffect } from "react";
import {
  Bell,
  BrainCircuit,
  Building2,
  Palette,
  Shield,
  SlidersHorizontal,
  Users,
  Bot,
  Volume2,
  CheckCircle2,
} from "lucide-react";
import { GlassPanel, PageHeader } from "@/components/layout/PageHeader";
import { Switch } from "@/components/ui/switch";
import {
  elevenLabsAgentService,
  ELEVENLABS_AGENT_ID,
  ELEVENLABS_VOICE_ID,
  ELEVENLABS_MODEL_ID,
} from "@/services/iris/elevenLabsAgentService";

const items = [
  [Building2, "Organization", "Security Team Workspace"],
  [Users, "Users", "12 analysts and responders"],
  [Bell, "Notifications", "Critical incidents and approvals"],
  [SlidersHorizontal, "Simulation Settings", "Accelerated timeline playback"],
  [Shield, "Security", "Human approval always required"],
  [Palette, "Appearance", "Command center theme"],
] as const;

export function SettingsView() {
  const [voiceEnabled, setVoiceEnabled] = useState(
    () => elevenLabsAgentService.getState().voiceEnabled,
  );

  useEffect(() => {
    return elevenLabsAgentService.subscribe((s) => {
      setVoiceEnabled(s.voiceEnabled);
    });
  }, []);

  const handleVoiceToggle = (checked: boolean) => {
    elevenLabsAgentService.setVoiceEnabled(checked);
  };

  return (
    <div className="mx-auto max-w-4xl animate-fade-in space-y-6">
      <PageHeader
        eyebrow="Workspace controls"
        title="Settings"
        description="Configure the synthetic Incident Time Machine demonstration."
      />

      {/* ElevenLabs Agent Configuration Card */}
      <GlassPanel className="p-5 border-cyan-signal/30 bg-card/60">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-lg bg-cyan-signal/15 text-cyan-signal border border-cyan-signal/40">
              <Bot className="size-5" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-foreground">
                  ElevenLabs Conversational Agent (IRIS)
                </h3>
                <span className="flex items-center gap-1 rounded bg-emerald-500/20 px-2 py-0.5 text-[10px] font-mono font-bold text-emerald-400 border border-emerald-500/30">
                  <CheckCircle2 className="size-3" />
                  CONFIGURED
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">
                Deterministic IRIS engine provides ground truth; ElevenLabs provides natural
                conversational delivery and voice.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs font-mono">
          <div className="rounded-lg border border-border/70 bg-background/50 p-2.5">
            <p className="text-[10px] text-muted-foreground uppercase">Agent ID</p>
            <p className="font-bold text-foreground truncate mt-0.5" title={ELEVENLABS_AGENT_ID}>
              {ELEVENLABS_AGENT_ID}
            </p>
          </div>
          <div className="rounded-lg border border-border/70 bg-background/50 p-2.5">
            <p className="text-[10px] text-muted-foreground uppercase">Voice ID</p>
            <p className="font-bold text-foreground truncate mt-0.5" title={ELEVENLABS_VOICE_ID}>
              {ELEVENLABS_VOICE_ID}
            </p>
          </div>
          <div className="rounded-lg border border-border/70 bg-background/50 p-2.5">
            <p className="text-[10px] text-muted-foreground uppercase">Model</p>
            <p className="font-bold text-cyan-signal truncate mt-0.5">{ELEVENLABS_MODEL_ID}</p>
          </div>
          <div className="rounded-lg border border-border/70 bg-background/50 p-2.5">
            <p className="text-[10px] text-muted-foreground uppercase">ASR / STT</p>
            <p className="font-bold text-foreground truncate mt-0.5">Scribe Realtime</p>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-border/60 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Volume2 className="size-4 text-cyan-signal" />
            <div>
              <p className="text-xs font-semibold text-foreground">Voice Output</p>
              <p className="text-[11px] text-muted-foreground">
                Automatically vocalize IRIS answers using ElevenLabs conversational voice.
              </p>
            </div>
          </div>
          <Switch
            checked={voiceEnabled}
            onCheckedChange={handleVoiceToggle}
            aria-label="Voice Output enabled"
          />
        </div>
      </GlassPanel>

      {/* General Settings */}
      <GlassPanel className="divide-y divide-border">
        {items.map(([Icon, title, description]) => (
          <div key={title} className="flex items-center gap-4 p-5">
            <span className="grid size-10 place-items-center rounded-lg bg-secondary text-cyan-signal">
              <Icon className="size-5" />
            </span>
            <div className="flex-1">
              <p className="font-semibold text-foreground">{title}</p>
              <p className="text-sm text-muted-foreground">{description}</p>
            </div>
            <span className="text-sm text-muted-foreground">Manage →</span>
          </div>
        ))}
      </GlassPanel>

      {/* Demo Mode Safety Boundary */}
      <GlassPanel className="flex items-center justify-between gap-4 border-green-signal/25 p-5">
        <div>
          <p className="font-semibold text-foreground">Demo Mode & Safety Boundary</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Strictly synthetic incident telemetry (INC-2048). No real-world endpoint or
            infrastructure mutations.
          </p>
        </div>
        <Switch checked aria-label="Demo Mode enabled" />
      </GlassPanel>
    </div>
  );
}
