import { useState, useCallback, useMemo, useEffect, useRef } from "react";
import {
  Bot,
  Send,
  Sparkles,
  RotateCcw,
  Shield,
  Clock,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Radio,
} from "lucide-react";
import { useDemo } from "@/context/DemoContext";
import { irisService } from "@/services/iris/irisService";
import {
  elevenLabsAgentService,
  ELEVENLABS_AGENT_ID,
} from "@/services/iris/elevenLabsAgentService";
import { IrisMessage as IrisMessageBubble } from "./IrisMessage";
import { IrisSuggestedQuestions } from "./IrisSuggestedQuestions";
import type { IrisMessage as IrisMessageType } from "@/types/iris";

export function IrisCopilot() {
  const {
    currentTime,
    currentMinute,
    incidentStage,
    currentRisk,
    counterfactualBranch,
    scenarioHistory,
  } = useDemo();

  const [inputQuery, setInputQuery] = useState("");
  const [messages, setMessages] = useState<IrisMessageType[]>([]);
  const [isAnswering, setIsAnswering] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [voiceState, setVoiceState] = useState(() => elevenLabsAgentService.getState());

  useEffect(() => {
    return elevenLabsAgentService.subscribe((state) => {
      setVoiceState(state);
    });
  }, []);

  // Build current read-only IRIS context
  const irisContext = useMemo(() => {
    return irisService.createContext(currentMinute, counterfactualBranch, scenarioHistory);
  }, [currentMinute, counterfactualBranch, scenarioHistory]);

  // Initial welcome message
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: "msg-welcome",
          role: "IRIS",
          content:
            `Greetings, Analyst. I am IRIS (Intelligent Response & Investigation System). ` +
            `I operate directly on top of the deterministic incident reconstruction engine. ` +
            `Current simulation time is synchronized at ${currentTime} (T+${currentMinute}m, Risk: ${currentRisk}). ` +
            `Ask me about incident chronology, what defenders knew, attack graph paths, detection gaps, or counterfactual simulations.`,
          timestamp: currentTime,
        },
      ]);
    }
  }, [currentTime, currentMinute, currentRisk, messages.length]);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isAnswering]);

  const handleSend = useCallback(
    async (queryToSend?: string) => {
      const q = queryToSend ?? inputQuery;
      if (!q.trim() || isAnswering) return;

      const userMsg: IrisMessageType = {
        id: `user-${Date.now()}`,
        role: "USER",
        content: q.trim(),
        timestamp: currentTime,
      };

      setMessages((prev) => [...prev, userMsg]);
      setInputQuery("");
      setIsAnswering(true);

      try {
        // Query the deterministic IRIS provider
        const resp = await irisService.ask(q.trim(), irisContext);

        const irisMsg: IrisMessageType = {
          id: `iris-${Date.now()}`,
          role: "IRIS",
          content: resp.answer,
          response: resp,
          timestamp: currentTime,
        };

        setMessages((prev) => [...prev, irisMsg]);

        // Present only the verified engine response through the live Agent.
        if (elevenLabsAgentService.getState().voiceEnabled) {
          const presentedByAgent = elevenLabsAgentService.presentVerifiedResponse(
            resp.answer,
            irisMsg.id,
          );
          if (!presentedByAgent) {
            elevenLabsAgentService.speak(resp.answer, irisMsg.id);
          }
        }
      } catch (err) {
        setMessages((prev) => [
          ...prev,
          {
            id: `err-${Date.now()}`,
            role: "IRIS",
            content: "An unexpected error occurred while querying the incident engine.",
            timestamp: currentTime,
          },
        ]);
      } finally {
        setIsAnswering(false);
      }
    },
    [inputQuery, isAnswering, currentTime, irisContext],
  );

  const handleToggleMic = useCallback(() => {
    if (voiceState.isListening) {
      elevenLabsAgentService.stopListening();
    } else {
      elevenLabsAgentService.startListening((transcript) => {
        if (transcript.trim()) {
          handleSend(transcript.trim());
        }
      });
    }
  }, [voiceState.isListening, handleSend]);

  const handleToggleSession = useCallback(async () => {
    if (voiceState.status === "connected" || voiceState.status === "connecting") {
      elevenLabsAgentService.disconnectSession();
    } else {
      await elevenLabsAgentService.connectSession((transcript) => {
        if (transcript.trim()) {
          handleSend(transcript.trim());
        }
      });
    }
  }, [voiceState.status, handleSend]);

  const handleClearHistory = useCallback(() => {
    setMessages([
      {
        id: `msg-${Date.now()}`,
        role: "IRIS",
        content: `Investigation history reset. Grounded at simulation timestamp ${currentTime}.`,
        timestamp: currentTime,
      },
    ]);
  }, [currentTime]);

  // Suggested questions from the latest IRIS message or context defaults
  const latestResponse = messages
    .slice()
    .reverse()
    .find((m) => m.role === "IRIS" && m.response)?.response;

  const currentSuggestions = latestResponse?.suggestedQuestions ?? [
    "What happened?",
    "What did we know at 10:04?",
    "What did we miss?",
    "What should we do right now?",
    "Compare the available response options.",
    "Simulate your recommended response.",
  ];

  return (
    <div className="flex h-[calc(100vh-140px)] flex-col rounded-xl border border-border/80 bg-card/40 backdrop-blur-xl shadow-panel overflow-hidden">
      {/* IRIS Command Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/80 bg-secondary/30 p-4">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-xl bg-cyan-signal/15 border border-cyan-signal/40 text-cyan-signal shadow-glow">
            <Bot className="size-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold tracking-tight text-foreground">
                IRIS INVESTIGATOR
              </h2>
              <span className="rounded bg-cyan-signal/20 px-1.5 py-0.2 font-mono text-[9px] font-bold text-cyan-signal border border-cyan-signal/30 flex items-center gap-1">
                <span
                  className={`size-1.5 rounded-full ${
                    voiceState.isSpeaking
                      ? "bg-cyan-signal animate-ping"
                      : voiceState.status === "connected"
                        ? "bg-emerald-400"
                        : "bg-cyan-signal"
                  }`}
                />
                <span>
                  {voiceState.isSpeaking
                    ? "ELEVENLABS SPEAKING"
                    : voiceState.status === "connected"
                      ? "ELEVENLABS AGENT"
                      : "ELEVENLABS VOICE"}
                </span>
              </span>
            </div>
            <p className="text-[11px] text-muted-foreground flex items-center gap-1">
              <span>Intelligent Response & Investigation System · Grounded in INC-2048</span>
              <span className="opacity-60 hidden md:inline">
                · Agent: {ELEVENLABS_AGENT_ID.slice(0, 14)}...
              </span>
            </p>
          </div>
        </div>

        {/* Current State Badges & Voice Controls */}
        <div className="flex items-center gap-2 font-mono text-xs">
          {/* Voice Auto-Play Toggle */}
          <button
            type="button"
            onClick={() => elevenLabsAgentService.toggleVoiceEnabled()}
            title={
              voiceState.voiceEnabled
                ? "Voice Output Enabled (Click to Mute)"
                : "Voice Muted (Click to Unmute)"
            }
            className={`flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-[11px] transition-colors ${
              voiceState.voiceEnabled
                ? "border-cyan-signal/40 bg-cyan-signal/15 text-cyan-signal hover:bg-cyan-signal/25"
                : "border-border/70 bg-background/40 text-muted-foreground hover:text-foreground"
            }`}
          >
            {voiceState.voiceEnabled ? (
              <>
                <Volume2 className="size-3 text-cyan-signal" />
                <span className="hidden sm:inline font-bold">VOICE ON</span>
              </>
            ) : (
              <>
                <VolumeX className="size-3 text-muted-foreground" />
                <span className="hidden sm:inline">MUTED</span>
              </>
            )}
          </button>

          {/* Live Session Toggle */}
          <button
            type="button"
            onClick={handleToggleSession}
            title={
              voiceState.status === "connected"
                ? "Disconnect Live ElevenLabs Session"
                : "Connect Live ElevenLabs Voice Session"
            }
            className={`flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-[11px] transition-colors ${
              voiceState.status === "connected"
                ? "border-emerald-500/50 bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30"
                : "border-border/70 bg-background/40 text-muted-foreground hover:text-cyan-signal hover:bg-secondary"
            }`}
          >
            <Radio
              className={`size-3 ${
                voiceState.status === "connected" ? "text-emerald-400 animate-pulse" : ""
              }`}
            />
            <span>{voiceState.status === "connected" ? "LIVE" : "SESSION"}</span>
          </button>

          <div className="flex items-center gap-1.5 rounded-lg border border-border/70 bg-background/60 px-2.5 py-1 text-[11px]">
            <Clock className="size-3 text-cyan-signal" />
            <span>
              Time: <strong>{currentTime}</strong>
            </span>
          </div>

          <div className="flex items-center gap-1.5 rounded-lg border border-border/70 bg-background/60 px-2.5 py-1 text-[11px]">
            <Shield className="size-3 text-threat" />
            <span>
              Risk: <strong className="text-threat">{currentRisk}</strong>
            </span>
          </div>

          <button
            type="button"
            onClick={handleClearHistory}
            className="flex items-center gap-1 rounded-lg border border-border/70 bg-background/40 px-2.5 py-1 text-[11px] text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
            title="Reset Conversation"
          >
            <RotateCcw className="size-3" />
            Reset
          </button>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="min-h-0 flex-1 space-y-4 overflow-y-auto p-4.5">
        {messages.map((msg) => (
          <IrisMessageBubble key={msg.id} message={msg} />
        ))}

        {isAnswering && (
          <div className="flex items-center gap-2 text-xs text-muted-foreground italic">
            <Sparkles className="size-3.5 animate-spin text-cyan-signal" />
            <span>IRIS analyzing incident reconstruction context...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Questions Drawer */}
      <IrisSuggestedQuestions
        questions={currentSuggestions}
        onSelectQuestion={(q) => handleSend(q)}
        disabled={isAnswering}
      />

      {/* Input Bar */}
      <div className="border-t border-border/80 bg-background/70 p-3 backdrop-blur-md">
        {voiceState.error && (
          <div className="mb-2 text-[11px] text-threat bg-threat/10 border border-threat/30 rounded px-2.5 py-1">
            {voiceState.error}
          </div>
        )}

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2"
        >
          <button
            type="button"
            onClick={handleToggleMic}
            title={
              voiceState.isListening
                ? "Microphone listening... click to stop"
                : "Speak query with microphone (Voice Input)"
            }
            className={`flex h-10 items-center justify-center rounded-lg px-3 transition-colors ${
              voiceState.isListening
                ? "bg-threat text-white animate-pulse"
                : "border border-border bg-secondary/40 text-muted-foreground hover:text-cyan-signal hover:border-cyan-signal/40 hover:bg-secondary"
            }`}
          >
            {voiceState.isListening ? (
              <MicOff className="size-4 animate-bounce" />
            ) : (
              <Mic className="size-4" />
            )}
          </button>

          <input
            type="text"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            placeholder={
              voiceState.isListening
                ? "Listening to voice input... speak now..."
                : "Ask IRIS about chronology, what defenders knew, attack graph paths, or counterfactuals..."
            }
            disabled={isAnswering}
            className={`h-10 flex-1 rounded-lg border bg-secondary/30 px-3.5 text-xs text-foreground placeholder:text-muted-foreground focus:border-cyan-signal focus:outline-none focus:ring-1 focus:ring-cyan-signal/50 ${
              voiceState.isListening
                ? "border-threat/70 bg-threat/5 ring-1 ring-threat/40"
                : "border-border"
            }`}
          />

          <button
            type="submit"
            disabled={!inputQuery.trim() || isAnswering}
            className="flex h-10 items-center gap-1.5 rounded-lg bg-cyan-signal px-4 font-mono text-xs font-bold text-background hover:bg-cyan-400 disabled:opacity-50 transition-colors"
          >
            <span>SEND</span>
            <Send className="size-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
}
