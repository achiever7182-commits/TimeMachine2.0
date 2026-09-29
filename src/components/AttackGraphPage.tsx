import { AttackGraphView } from "@/components/attack-graph/AttackGraphView";
import { IrisInvestigationPanel } from "@/components/iris/IrisInvestigationPanel";

export function AttackGraphPage() {
  return (
    <div className="mx-auto max-w-7xl animate-fade-in space-y-4">
      <AttackGraphView />

      <IrisInvestigationPanel
        title="IRIS Attack Path Investigator"
        defaultPrompt="How did the attacker reach the database?"
        suggestedQuestions={[
          "How did the attacker reach the database?",
          "What is this attack path?",
          "Which assets were compromised?",
          "What would happen if we isolate LAPTOP-042?",
        ]}
        compact={true}
      />
    </div>
  );
}
