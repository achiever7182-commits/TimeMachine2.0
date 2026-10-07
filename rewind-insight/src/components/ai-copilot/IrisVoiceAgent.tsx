import { ConversationProvider, useConversation } from "@elevenlabs/react";
import { Bot, Mic, MicOff, PhoneOff, X } from "lucide-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const agentId = import.meta.env["VITE_ELEVENLABS_AGENT_ID"] || "agent_0301m3r2q41pfj99jfgqq13jwnfy";

function IrisVoiceAgentControls({ autoStart }: { autoStart: boolean }) {
  const { startSession, endSession, status, message, isMuted, setMuted, mode } = useConversation();
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => setIsMounted(true), []);

  useEffect(() => {
    if (!autoStart) return;
    setIsOpen(true);
    startSession({ onError: (errorMessage) => setError(errorMessage) });
  }, [autoStart, startSession]);

  useEffect(() => {
    if (status !== "connecting") return;
    const timeoutId = window.setTimeout(() => {
      setError("Connection timed out. Check your connection and try again.");
      endSession();
    }, 15000);
    return () => window.clearTimeout(timeoutId);
  }, [endSession, status]);

  const startConversation = () => {
    setIsOpen(true);
    setError("");
    startSession({ onError: (errorMessage) => setError(errorMessage) });
  };

  const closeConversation = () => {
    endSession();
    setIsOpen(false);
    setError("");
  };

  if (!isMounted) return null;

  return createPortal(
    <div className="pointer-events-none fixed inset-0 z-[2147483647]">
      {isOpen && (
        <section
          aria-label="IRIS voice conversation"
          className="pointer-events-auto fixed bottom-[5.25rem] left-3 right-3 flex max-h-[min(28rem,calc(100dvh-7rem))] flex-col overflow-hidden rounded-xl border border-cyan-signal/40 bg-card/95 shadow-panel backdrop-blur-xl sm:left-auto sm:right-4 sm:w-[22rem]"
        >
          <header className="flex items-center justify-between border-b border-border bg-secondary/40 p-3.5">
            <div className="flex items-center gap-2.5">
              <span className="grid size-9 place-items-center rounded-full border border-cyan-signal/40 bg-cyan-signal/15 text-cyan-signal shadow-glow">
                <Bot className="size-5" aria-hidden="true" />
              </span>
              <div>
                <h2 className="text-xs font-bold text-foreground">IRIS VOICE</h2>
                <p className="text-[10px] font-mono text-muted-foreground" aria-live="polite">
                  {error ||
                    message ||
                    (status === "connecting"
                      ? "Connecting to IRIS..."
                      : status === "connected"
                        ? mode === "speaking"
                          ? "IRIS is speaking"
                          : "Listening"
                        : status === "error"
                          ? "Connection failed"
                          : "Ready to connect")}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={closeConversation}
              className="grid size-8 place-items-center rounded-md text-muted-foreground hover:bg-secondary hover:text-foreground"
              aria-label="End conversation and close IRIS voice"
              title="End conversation"
            >
              <X className="size-4" aria-hidden="true" />
            </button>
          </header>

          <div className="flex min-h-36 flex-1 flex-col items-center justify-center gap-3 px-5 py-6 text-center">
            <span className="grid size-16 place-items-center rounded-full border border-cyan-signal/40 bg-cyan-signal/10 text-cyan-signal shadow-glow">
              <Bot className="size-8" aria-hidden="true" />
            </span>
            <p className="text-sm font-medium text-foreground">
              {status === "connected"
                ? mode === "speaking"
                  ? "IRIS is responding"
                  : "I'm listening"
                : status === "connecting"
                  ? "Starting your voice session"
                  : "Talk with IRIS"}
            </p>
            <p className="max-w-xs text-xs leading-relaxed text-muted-foreground">
              {error
                ? "Check microphone permission and your connection, then try again."
                : status === "connected"
                  ? "Ask about the incident, attack path, or response options."
                  : "Your browser may ask for microphone access."}
            </p>
          </div>

          <footer className="flex items-center justify-center gap-3 border-t border-border p-3">
            {status === "connected" ? (
              <>
                <button
                  type="button"
                  onClick={() => setMuted(!isMuted)}
                  className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-border px-3 text-xs font-medium text-foreground hover:bg-secondary"
                  aria-label={isMuted ? "Unmute microphone" : "Mute microphone"}
                >
                  {isMuted ? <MicOff className="size-4" /> : <Mic className="size-4" />}
                  {isMuted ? "Unmute" : "Mute"}
                </button>
                <button
                  type="button"
                  onClick={closeConversation}
                  className="inline-flex min-h-10 items-center gap-2 rounded-lg bg-destructive px-3 text-xs font-semibold text-destructive-foreground hover:bg-destructive/90"
                >
                  <PhoneOff className="size-4" /> End call
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={startConversation}
                disabled={status === "connecting"}
                className="inline-flex min-h-10 items-center gap-2 rounded-lg bg-cyan-signal px-4 text-xs font-semibold text-background hover:bg-cyan-400 disabled:cursor-wait disabled:opacity-60"
              >
                <Mic className="size-4" />
                {status === "connecting" ? "Connecting..." : "Start conversation"}
              </button>
            )}
          </footer>
        </section>
      )}

      <button
        type="button"
        onClick={isOpen ? closeConversation : startConversation}
        className="pointer-events-auto fixed bottom-4 right-4 grid size-14 place-items-center rounded-full border border-cyan-signal/60 bg-cyan-signal text-background shadow-[0_0_30px_color-mix(in_oklab,var(--cyan-signal)_35%,transparent)] transition-transform hover:scale-105 hover:bg-cyan-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-signal focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        aria-label={isOpen ? "End IRIS voice conversation" : "Talk to IRIS by voice"}
        title={isOpen ? "End IRIS voice conversation" : "Talk to IRIS by voice"}
      >
        {isOpen ? <PhoneOff className="size-6" /> : <Bot className="size-6" />}
      </button>
    </div>,
    document.body,
  );
}

export function IrisVoiceAgent({ autoStart = false }: { autoStart?: boolean }) {
  return (
    <ConversationProvider agentId={agentId}>
      <IrisVoiceAgentControls autoStart={autoStart} />
    </ConversationProvider>
  );
}
