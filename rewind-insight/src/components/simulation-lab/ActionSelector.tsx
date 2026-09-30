import { Check, Shield, UserX, Network, Activity } from "lucide-react";
import type { CounterfactualAction, CounterfactualActionType } from "@/types/counterfactual";

interface ActionSelectorProps {
  availableActions: CounterfactualAction[];
  activeAction: CounterfactualAction;
  onSelectAction: (action: CounterfactualAction) => void;
  disabled?: boolean;
}

const ACTION_ICONS = {
  DO_NOTHING: Activity,
  ISOLATE_ENDPOINT: Shield,
  DISABLE_USER: UserX,
  BLOCK_LATERAL_CONNECTION: Network,
};

export function ActionSelector({
  availableActions,
  activeAction,
  onSelectAction,
  disabled = false,
}: ActionSelectorProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Step 1: Choose Synthetic Intervention
        </label>
        <span className="font-mono text-[10px] text-muted-foreground">
          {availableActions.length} response options
        </span>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {availableActions.map((action) => {
          const Icon = ACTION_ICONS[action.type] ?? Shield;
          const isSelected = activeAction.type === action.type;

          return (
            <button
              key={action.id}
              type="button"
              disabled={disabled}
              onClick={() => onSelectAction(action)}
              className={`relative flex flex-col justify-between rounded-xl border p-3.5 text-left backdrop-blur-md transition-all ${
                isSelected
                  ? "border-cyan-signal bg-cyan-signal/10 ring-1 ring-cyan-signal/50 shadow-[0_0_15px_rgba(6,182,212,0.2)]"
                  : "border-border/70 bg-card/50 hover:border-border hover:bg-card/80"
              } ${disabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div
                    className={`flex size-8 items-center justify-center rounded-lg border ${
                      isSelected
                        ? "border-cyan-signal/50 bg-cyan-signal/20 text-cyan-signal"
                        : "border-border/60 bg-secondary/30 text-muted-foreground"
                    }`}
                  >
                    <Icon className="size-4" />
                  </div>
                  {isSelected && (
                    <span className="flex size-5 items-center justify-center rounded-full bg-cyan-signal text-background">
                      <Check className="size-3 stroke-[3]" />
                    </span>
                  )}
                </div>

                <h4 className="font-semibold text-xs text-foreground leading-snug">
                  {action.label}
                </h4>
                <p className="mt-1.5 text-[11px] text-muted-foreground line-clamp-2 leading-relaxed">
                  {action.description}
                </p>
              </div>

              <div className="mt-3 border-t border-border/50 pt-2 flex items-center justify-between font-mono text-[10px]">
                <span className="text-muted-foreground">Target:</span>
                <span className={`font-semibold ${isSelected ? "text-cyan-signal" : "text-foreground"}`}>
                  {action.targetId}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
