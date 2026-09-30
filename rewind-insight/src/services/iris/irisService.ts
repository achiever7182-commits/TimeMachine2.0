import { DeterministicIrisProvider } from "./irisInvestigator";
import { ElevenLabsIrisProvider } from "./elevenLabsProvider";
import { buildIrisContext } from "./irisContextBuilder";
import type { IrisContext, IrisMessage, IrisProvider, IrisResponse } from "@/types/iris";
import type { CounterfactualBranch } from "@/types/counterfactual";

export class IrisService {
  private provider: IrisProvider;

  constructor(provider?: IrisProvider) {
    this.provider = provider ?? new ElevenLabsIrisProvider();
  }

  setProvider(provider: IrisProvider) {
    this.provider = provider;
  }

  getProvider(): IrisProvider {
    return this.provider;
  }

  /**
   * Builds an isolated, read-only IrisContext from central simulation state.
   */
  createContext(
    currentMinute: number,
    counterfactualBranch?: CounterfactualBranch | null,
    scenarioHistory?: CounterfactualBranch[],
    incidentId = "INC-2048"
  ): IrisContext {
    return buildIrisContext({
      incidentId,
      currentMinute,
      counterfactualBranch,
      scenarioHistory,
    });
  }

  /**
   * Answers an analyst question using the active provider.
   */
  async ask(question: string, context: IrisContext): Promise<IrisResponse> {
    if (!question || !question.trim()) {
      return {
        id: `iris-err-${Date.now()}`,
        answer: "Please enter an investigation question about the incident, attack path, or counterfactual response.",
        findings: [],
        citations: [],
        suggestedQuestions: [
          "What happened?",
          "What did we know at 10:04?",
          "What did we miss?",
          "What if we isolate LAPTOP-042?",
        ],
        generatedAt: new Date().toISOString(),
        intentCategory: "UNKNOWN",
        worldPerspective: "MIXED",
      };
    }

    return this.provider.answer(question.trim(), context);
  }
}

// Global singleton instance
export const irisService = new IrisService();
