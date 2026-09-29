import { useState, useEffect } from "react";
import { Bot, User as UserIcon, Volume2, Square } from "lucide-react";
import { IrisFindingCard } from "./IrisFindingCard";
import { IrisTimelineCitation } from "./IrisTimelineCitation";
import { elevenLabsAgentService } from "@/services/iris/elevenLabsAgentService";
import type { IrisCitation, IrisMessage as IrisMessageType } from "@/types/iris";

interface IrisMessageProps {
  message: IrisMessageType;
  onSelectCitation?: (citation: IrisCitation) => void;
}

export function IrisMessage({ message, onSelectCitation }: IrisMessageProps) {
  const isUser = message.role === "USER";
  const resp = message.response;

  const [voiceState, setVoiceState] = useState(() => elevenLabsAgentService.getState());

  useEffect(() => {
    return elevenLabsAgentService.subscribe((state) => {
      setVoiceState(state);
    });
  }, []);

  const isThisMessagePlaying =
    voiceState.isSpeaking && voiceState.activeMessageId === message.id;

  const handleToggleVoice = () => {
    if (isThisMessagePlaying) {
      elevenLabsAgentService.stopSpeaking();
    } else {
      elevenLabsAgentService.speak(message.content, message.id);
    }
  };

  return (
    <div className={`flex flex-col ${isUser ? "items-end" : "items-start"}`}>
      <div
        className={`max-w-3xl rounded-xl p-4 text-xs leading-relaxed transition-all shadow-sm ${
          isUser
            ? "bg-cyan-signal/15 text-foreground border border-cyan-signal/30 ml-12"
            : "bg-secondary/40 text-foreground border border-border/80 mr-8"
        }`}
      >
        {/* Role, World Perspective & Timestamp */}
        <div className="flex items-center justify-between gap-3 mb-2 font-mono text-[10px] text-muted-foreground border-b border-border/40 pb-1.5">
          <div className="flex items-center gap-2">
            <span className="font-bold flex items-center gap-1 text-cyan-signal">
              {isUser ? <UserIcon className="size-3" /> : <Bot className="size-3" />}
              {isUser ? "ANALYST" : "IRIS"}
            </span>

            {resp?.worldPerspective && (
              <span
                className={`rounded px-1.5 py-0.2 text-[9px] font-bold uppercase tracking-wider ${
                  resp.worldPerspective === "COUNTERFACTUAL"
                    ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                    : resp.worldPerspective === "KNOWN_AT_TIME"
                    ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                    : "bg-cyan-signal/20 text-cyan-signal border border-cyan-signal/30"
                }`}
              >
                [{resp.worldPerspective.replace(/_/g, " ")}]
              </span>
            )}

            {!isUser && (
              <button
                type="button"
                onClick={handleToggleVoice}
                title={isThisMessagePlaying ? "Stop Voice Narration" : "Listen to ElevenLabs Voice"}
                className={`flex items-center gap-1 rounded px-1.5 py-0.5 text-[9px] transition-colors border ${
                  isThisMessagePlaying
                    ? "bg-cyan-signal text-background border-cyan-signal font-bold animate-pulse"
                    : "border-border/60 text-muted-foreground hover:text-cyan-signal hover:border-cyan-signal/40 hover:bg-secondary/60"
                }`}
              >
                {isThisMessagePlaying ? (
                  <>
                    <Square className="size-2.5 fill-current" />
                    <span>STOP</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="size-2.5" />
                    <span>VOICE</span>
                  </>
                )}
              </button>
            )}
          </div>
          <span>{message.timestamp}</span>
        </div>

        {/* Formatted Text Content */}
        <div className="whitespace-pre-line text-[11.5px] font-sans text-foreground/95">
          {message.content}
        </div>

        {/* Structured Findings */}
        {resp?.findings && resp.findings.length > 0 && (
          <div className="mt-3.5 space-y-2 border-t border-border/50 pt-2.5">
            <div className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
              Derived Findings:
            </div>
            {resp.findings.map((f) => (
              <IrisFindingCard
                key={f.id}
                finding={f}
                onSelectCitation={onSelectCitation}
              />
            ))}
          </div>
        )}

        {/* Direct Citations List */}
        {resp?.citations && resp.citations.length > 0 && (
          <div className="mt-3 border-t border-border/40 pt-2 flex flex-wrap gap-1.5">
            {resp.citations.slice(0, 6).map((c) => (
              <IrisTimelineCitation
                key={c.id}
                citation={c}
                onClick={onSelectCitation}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
