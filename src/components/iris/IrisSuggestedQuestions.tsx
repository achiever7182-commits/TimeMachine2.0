import { Sparkles, ArrowRight } from "lucide-react";

interface IrisSuggestedQuestionsProps {
  questions: string[];
  onSelectQuestion: (question: string) => void;
  disabled?: boolean;
}

export function IrisSuggestedQuestions({
  questions,
  onSelectQuestion,
  disabled = false,
}: IrisSuggestedQuestionsProps) {
  if (!questions || questions.length === 0) return null;

  return (
    <div className="border-t border-border/70 bg-secondary/15 px-4 py-2.5">
      <div className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
        <Sparkles className="size-3 text-cyan-signal" />
        <span>Contextual Investigation Questions:</span>
      </div>
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
        {questions.map((prompt) => (
          <button
            key={prompt}
            type="button"
            disabled={disabled}
            onClick={() => onSelectQuestion(prompt)}
            className="flex shrink-0 items-center gap-1.5 rounded-lg border border-border/80 bg-background/60 px-2.5 py-1 text-[11px] text-foreground hover:border-cyan-signal/50 hover:bg-cyan-signal/10 disabled:opacity-50 transition-colors"
          >
            <span>{prompt}</span>
            <ArrowRight className="size-2.5 opacity-60" />
          </button>
        ))}
      </div>
    </div>
  );
}
