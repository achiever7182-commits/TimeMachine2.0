import { useState, useRef, useEffect, useMemo } from "react";
import { Link } from "@tanstack/react-router";
import {
  Bot,
  MessageCircle,
  Send,
  X,
  Sparkles,
  AlertTriangle,
  Play,
  RotateCcw,
  Layers,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDemo } from "@/context/DemoContext";
import { irisService } from "@/services/iris/irisService";
import type { IrisMessage as IrisMessageType, IrisResponse } from "@/types/iris";

export function IrisCopilot() {
  const {
    currentTime,
    currentMinute,
    currentRisk,
    counterfactualBranch,
    scenarioHistory,
    simulateAction,
    activeAction,
  } = useDemo();

  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<
    Array<{
      id: string;
      from: "user" | "iris";
      text: string;
      response?: IrisResponse;
      timestamp: string;
    }>
  >([
    {
      id: "initial",
      from: "iris",
      text: "Greetings, Analyst. I am IRIS (Incident Response Intelligence System). I provide deterministic decision support and autonomous simulated remediation grounded in the INC-2048 engine.",
      timestamp: currentTime,
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const irisContext = useMemo(() => {
    return irisService.createContext(currentMinute, counterfactualBranch, scenarioHistory);
  }, [currentMinute, counterfactualBranch, scenarioHistory]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const quickPrompts = [
    "What did we know at 10:04?",
    "What should we do right now?",
    "Compare the available response options.",
    "What happens if we isolate LAPTOP-042?",
    "What happens if we do nothing?",
    "Simulate your recommended response.",
  ];

  const handleAsk = async (queryText?: string) => {
    const q = (queryText ?? input).trim();
    if (!q || loading) return;

    setMessages((prev) => [
      ...prev,
      {
        id: `usr-${Date.now()}`,
        from: "user",
        text: q,
        timestamp: currentTime,
      },
    ]);
    setInput("");
    setLoading(true);

    try {
      const resp = await irisService.ask(q, irisContext);
      setMessages((prev) => [
        ...prev,
        {
          id: `iris-${Date.now()}`,
          from: "iris",
          text: resp.answer,
          response: resp,
          timestamp: currentTime,
        },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          from: "iris",
          text: "An error occurred while evaluating the synthetic telemetry.",
          timestamp: currentTime,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button
        size="icon"
        onClick={() => setOpen(true)}
        className="fixed bottom-4 right-4 z-40 size-12 rounded-full shadow-glow bg-cyan-signal text-background hover:bg-cyan-400"
        aria-label="Open IRIS Assistant"
      >
        <Bot className="size-6" />
      </Button>

      {open && (
        <div className="fixed inset-x-3 bottom-3 z-50 flex max-h-[82vh] flex-col rounded-xl border border-cyan-signal/40 bg-card/95 shadow-panel backdrop-blur-xl sm:left-auto sm:right-4 sm:w-[440px] overflow-hidden animate-in fade-in zoom-in-95">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-border p-3.5 bg-secondary/40">
            <div className="flex items-center gap-2.5">
              <span className="grid size-9 place-items-center rounded-lg bg-cyan-signal/15 text-cyan-signal border border-cyan-signal/30">
                <Bot className="size-5" />
              </span>
              <div>
                <div className="flex items-center gap-1.5">
                  <p className="text-xs font-bold text-foreground">IRIS COPILOT</p>
                  <span className="rounded bg-cyan-signal/20 px-1.5 py-0.2 font-mono text-[9px] font-bold text-cyan-signal border border-cyan-signal/30">
                    SIMULATION ONLY
                  </span>
                </div>
                <p className="text-[10px] text-muted-foreground font-mono">
                  INC-2048 @ {currentTime} · Risk: {currentRisk}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                onClick={() =>
                  setMessages([
                    {
                      id: `rst-${Date.now()}`,
                      from: "iris",
                      text: `Investigation reset. Grounded at ${currentTime}.`,
                      timestamp: currentTime,
                    },
                  ])
                }
                title="Reset history"
                className="size-7 text-muted-foreground hover:text-foreground"
              >
                <RotateCcw className="size-3.5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setOpen(false)}
                className="size-7 text-muted-foreground hover:text-foreground"
                aria-label="Close IRIS"
              >
                <X className="size-4" />
              </Button>
            </div>
          </div>

          {/* Safety Notice */}
          <div className="flex items-center gap-1.5 bg-amber-500/10 px-3 py-1 text-[10px] text-amber-300 border-b border-amber-500/20">
            <AlertTriangle className="size-3 shrink-0 text-amber-400" />
            <span>Synthetic engine only. No real endpoints or credentials touched.</span>
          </div>

          {/* Messages Feed */}
          <div className="min-h-0 flex-1 space-y-3 overflow-y-auto p-3.5 text-xs">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex flex-col ${m.from === "user" ? "items-end" : "items-start"}`}
              >
                <div
                  className={`max-w-[92%] rounded-xl p-3 text-[11.5px] leading-relaxed shadow-sm ${
                    m.from === "user"
                      ? "bg-cyan-signal/20 text-foreground border border-cyan-signal/30 ml-6"
                      : "bg-secondary/50 text-foreground border border-border/80 mr-4"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1.5 font-mono text-[9px] text-muted-foreground border-b border-border/40 pb-1">
                    <span className="font-bold text-cyan-signal uppercase">
                      {m.from === "user" ? "You" : "IRIS"}
                    </span>
                    <span>{m.timestamp}</span>
                  </div>
                  <div className="whitespace-pre-line font-sans">{m.text}</div>

                  {m.response?.intentCategory === "RESPONSE_RECOMMENDATION" && (
                    <div className="mt-2.5 pt-2 border-t border-cyan-signal/30 flex items-center justify-between gap-2">
                      <Link
                        to="/simulation-lab"
                        onClick={() => setOpen(false)}
                        className="flex items-center gap-1 text-[11px] font-bold text-cyan-signal hover:underline"
                      >
                        <span>Open in Simulation Lab</span>
                        <ArrowRight className="size-3" />
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex items-center gap-2 text-xs text-muted-foreground italic py-1">
                <Sparkles className="size-3.5 animate-spin text-cyan-signal" />
                <span>Evaluating Phase 4 counterfactual model...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts Strip */}
          <div className="flex gap-1.5 overflow-x-auto border-t border-border/60 bg-secondary/20 p-2 scrollbar-none">
            {quickPrompts.map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => handleAsk(p)}
                disabled={loading}
                className="shrink-0 rounded-md border border-border/80 bg-background/60 px-2 py-1 text-[10px] text-foreground hover:border-cyan-signal/50 hover:bg-cyan-signal/10 transition-colors disabled:opacity-50"
              >
                {p}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleAsk();
            }}
            className="flex items-center gap-2 border-t border-border p-2.5 bg-background/80"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask IRIS about responses, what-ifs, or evidence..."
              disabled={loading}
              className="flex-1 rounded-lg border border-border bg-input/40 px-3 py-1.5 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-cyan-signal"
            />
            <Button
              type="submit"
              size="sm"
              disabled={!input.trim() || loading}
              className="bg-cyan-signal text-background hover:bg-cyan-400 font-bold px-3 py-1.5 h-auto text-xs"
            >
              <Send className="size-3.5" />
            </Button>
          </form>
        </div>
      )}
    </>
  );
}
