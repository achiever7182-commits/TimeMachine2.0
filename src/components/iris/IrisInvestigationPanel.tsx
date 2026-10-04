import { useState, useMemo } from "react";
import { Bot, Sparkles, Send, ChevronDown, ChevronUp, ArrowRight } from "lucide-react";
import { useDemo } from "@/context/DemoContext";
import { irisService } from "@/services/iris/irisService";
import { IrisMessage } from "./IrisMessage";
import type { IrisMessage as IrisMessageType } from "@/types/iris";

interface IrisInvestigationPanelProps {
  defaultPrompt?: string;
  suggestedQuestions?: string[];
  title?: string;
  compact?: boolean;
}

export function IrisInvestigationPanel({
  defaultPrompt,
  suggestedQuestions,
  title = "IRIS Quick Investigation",
  compact = false,
}: IrisInvestigationPanelProps) {
  const { currentTime, currentMinute, counterfactualBranch, scenarioHistory } = useDemo();

  const [inputQuery, setInputQuery] = useState(defaultPrompt || "");
  const [messages, setMessages] = useState<IrisMessageType[]>([]);
  const [isAnswering, setIsAnswering] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(compact);

  const irisContext = useMemo(() => {
    return irisService.createContext(currentMinute, counterfactualBranch, scenarioHistory);
  }, [currentMinute, counterfactualBranch, scenarioHistory]);

  const handleAsk = async (queryToAsk?: string) => {
    const q = (queryToAsk ?? inputQuery).trim();
    if (!q || isAnswering) return;

    const userMsg: IrisMessageType = {
      id: `usr-${Date.now()}`,
      role: "USER",
      content: q,
      timestamp: currentTime,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery("");
    setIsAnswering(true);
    if (isCollapsed) setIsCollapsed(false);

    try {
      const resp = await irisService.ask(q, irisContext);
      const irisMsg: IrisMessageType = {
        id: `iris-${Date.now()}`,
        role: "IRIS",
        content: resp.answer,
        response: resp,
        timestamp: currentTime,
      };
      setMessages((prev) => [...prev, irisMsg]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          role: "IRIS",
          content: "Failed to query the incident investigation engine.",
          timestamp: currentTime,
        },
      ]);
    } finally {
      setIsAnswering(false);
    }
  };

  const defaultSuggestions = suggestedQuestions ?? [
    "What did we know at this time?",
    "What did we miss?",
    "How did the attacker reach the database?",
  ];

  return (
    <div className="rounded-xl border border-border/80 bg-card/60 backdrop-blur-md shadow-panel overflow-hidden transition-all">
      {/* Header */}
      <div
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="flex items-center justify-between p-3.5 bg-secondary/30 cursor-pointer hover:bg-secondary/40 transition-colors"
      >
        <div className="flex items-center gap-2.5">
          <div className="flex size-7 items-center justify-center rounded-lg bg-cyan-signal/15 border border-cyan-signal/30 text-cyan-signal">
            <Bot className="size-4" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-foreground flex items-center gap-1.5">
              <span>{title}</span>
              <span className="font-mono text-[9px] text-cyan-signal font-normal">
                @{currentTime}
              </span>
            </h3>
            <p className="text-[10px] text-muted-foreground">
              Direct telemetry inspection & interpretation
            </p>
          </div>
        </div>

        <button type="button" className="text-muted-foreground hover:text-foreground">
          {isCollapsed ? <ChevronDown className="size-4" /> : <ChevronUp className="size-4" />}
        </button>
      </div>

      {!isCollapsed && (
        <div className="p-3.5 space-y-3">
          {/* Quick Questions */}
          <div className="flex flex-wrap gap-1.5">
            {defaultSuggestions.map((prompt) => (
              <button
                key={prompt}
                type="button"
                onClick={() => handleAsk(prompt)}
                disabled={isAnswering}
                className="flex items-center gap-1 rounded border border-border/70 bg-background/50 px-2 py-0.5 text-[10px] text-foreground hover:border-cyan-signal/50 hover:bg-cyan-signal/10 disabled:opacity-50 transition-colors"
              >
                <span>{prompt}</span>
                <ArrowRight className="size-2 opacity-60" />
              </button>
            ))}
          </div>

          {/* Messages list */}
          {messages.length > 0 && (
            <div className="max-h-64 space-y-3 overflow-y-auto pr-1">
              {messages.map((m) => (
                <IrisMessage key={m.id} message={m} />
              ))}
            </div>
          )}

          {isAnswering && (
            <div className="flex items-center gap-2 text-xs text-muted-foreground italic py-1">
              <Sparkles className="size-3 animate-spin text-cyan-signal" />
              <span>IRIS analyzing incident reconstruction...</span>
            </div>
          )}

          {/* Query input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleAsk();
            }}
            className="flex items-center gap-2 pt-1"
          >
            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              placeholder="Ask IRIS about this exact moment..."
              disabled={isAnswering}
              className="h-8 flex-1 rounded-lg border border-border bg-secondary/30 px-3 text-[11px] text-foreground placeholder:text-muted-foreground focus:border-cyan-signal focus:outline-none"
            />
            <button
              type="submit"
              disabled={!inputQuery.trim() || isAnswering}
              className="flex h-8 items-center gap-1 rounded-lg bg-cyan-signal px-3 font-mono text-[10px] font-bold text-background hover:bg-cyan-400 disabled:opacity-50 transition-colors"
            >
              <span>ASK</span>
              <Send className="size-2.5" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
