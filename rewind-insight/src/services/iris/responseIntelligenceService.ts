import {
  simulateCounterfactualFuture,
  getStandardResponseActions,
} from "../counterfactualService";
import { minuteToTimestamp } from "../stateReconstruction";
import type {
  ResponseCandidate,
  ResponseDecision,
  ResponseMode,
  ResponseRecommendation,
} from "@/types/responseIntelligence";
import type { CounterfactualAction, CounterfactualBranch } from "@/types/counterfactual";
import type { IrisCitation, IrisConfidence } from "@/types/iris";

/**
 * Deterministic Response Intelligence & Decision Support Engine (Phase 5 Extension).
 * Evaluates available incident response strategies strictly using the Phase 4 counterfactual engine.
 * Never executes real-world actions: all actions are simulated within the synthetic incident model.
 */
export class ResponseIntelligenceService {
  /**
   * Evaluates all standard response candidates at a given timestamp using Phase 4 simulation.
   */
  evaluateCandidates(minute = 22, incidentId = "INC-2048"): ResponseCandidate[] {
    const boundedMinute = Math.max(0, Math.min(42, Math.floor(minute)));
    const timestamp = minuteToTimestamp(boundedMinute);
    const actions = getStandardResponseActions(boundedMinute);

    const candidates: ResponseCandidate[] = actions.map((act) => {
      // Execute isolated Phase 4 simulation for this action
      const branch = simulateCounterfactualFuture(boundedMinute, act, incidentId);
      const comp = branch.comparison;

      // Deterministic scoring based on structured preservation metrics
      const criticalWeight = comp.preventedCriticalImpact.length * 50;
      const compromiseWeight = comp.preventedCompromises.length * 30;
      const dataExposureWeight = comp.preventedDataExposure * 25;
      const eventsWeight = comp.preventedCount * 10;
      const riskReductionWeight = comp.riskChange === "REDUCED" ? 40 : 0;
      const baselinePenalty = act.type === "DO_NOTHING" ? 200 : 0;

      const score = Math.max(
        0,
        criticalWeight +
          compromiseWeight +
          dataExposureWeight +
          eventsWeight +
          riskReductionWeight -
          baselinePenalty
      );

      // Determine confidence grounded in deterministic simulation completeness
      let confidence: IrisConfidence = "LOW";
      if (act.type === "DO_NOTHING") {
        confidence = "HIGH";
      } else if (comp.preventedCount >= 3 && comp.preventedCompromises.length > 0) {
        confidence = "HIGH";
      } else if (comp.preventedCount >= 1) {
        confidence = "MEDIUM";
      }

      // Generate explainable rationale
      let rationale = "";
      if (act.type === "DO_NOTHING") {
        rationale =
          "Passive observation results in complete attack chain traversal to internal servers, databases, and file repositories with CRITICAL final risk.";
      } else if (act.type === "ISOLATE_ENDPOINT") {
        rationale = `Isolating ${act.targetId} severs outbound lateral pivot capability, protecting ${comp.preventedCompromises.join(", ") || "downstream servers"} and preserving production database assets.`;
      } else if (act.type === "DISABLE_USER") {
        rationale = `Disabling ${act.targetId} revokes authentication tokens, preventing downstream authenticated pivots while leaving existing interactive host processes running.`;
      } else if (act.type === "BLOCK_LATERAL_CONNECTION") {
        rationale = `Dropping lateral network traffic between ${act.targetId} isolates the application tier but leaves the originating endpoint actively compromised.`;
      }

      return {
        id: `cand-${act.type.toLowerCase()}-${boundedMinute}`,
        action: act,
        target: act.targetId,
        description: act.description,
        rationale,
        simulatedRisk: comp.counterfactualFinalRisk,
        baselineRisk: comp.baselineFinalRisk,
        riskReduction: comp.riskChange,
        compromisedAssets: comp.counterfactualCompromisedAssets,
        preventedCompromises: comp.preventedCompromises,
        preventedEvents: comp.preventedEvents,
        preventedCriticalImpact: comp.preventedCriticalImpact,
        preventedDataExposure: comp.preventedDataExposure,
        confidence,
        simulationStatus: "COMPLETED",
        branchId: branch.branchId,
        score,
      };
    });

    return candidates;
  }

  /**
   * Generates a deterministic recommendation by ranking all evaluated candidates.
   */
  generateRecommendation(minute = 22, incidentId = "INC-2048"): ResponseRecommendation {
    const candidates = this.evaluateCandidates(minute, incidentId);

    // Filter out DO_NOTHING for recommendation selection if proactive alternatives exist
    const actionable = candidates.filter((c) => c.action.type !== "DO_NOTHING");
    const sorted = actionable.sort((a, b) => b.score - a.score);
    const best = (sorted[0] || candidates[0])!;

    const alternatives = candidates.filter((c) => c.id !== best.id);
    const timestamp = minuteToTimestamp(minute);

    // Build grounded evidence citations supporting the recommendation
    const evidence: IrisCitation[] = [
      {
        id: `cit-rec-target-${best.target}`,
        type: best.action.targetType === "USER" ? "USER" : "ASSET",
        label: `Intervention Target: ${best.target}`,
        sourceId: best.target,
        timestamp,
      },
    ];

    if (best.preventedEvents.length > 0) {
      best.preventedEvents.slice(0, 3).forEach((pe) => {
        evidence.push({
          id: `cit-rec-prev-${pe.eventId}`,
          type: "COUNTERFACTUAL_EVENT",
          label: `[PREVENTED] ${pe.originalTime} ${pe.title}`,
          sourceId: pe.eventId,
          timestamp: pe.originalTime,
        });
      });
    }

    const expectedImpact =
      `Simulation confirms that ${best.action.label} prevents ${best.preventedEvents.length} future attack stages, ` +
      `shields ${best.preventedCompromises.length} downstream servers (${best.preventedCompromises.join(", ") || "None"}), ` +
      `and reduces final risk from ${best.baselineRisk} to ${best.simulatedRisk}.`;

    const decisionBasis =
      `Deterministic optimization algorithm assigned highest score (${best.score} pts) based on: ` +
      `${best.preventedCriticalImpact.length} critical assets protected, ` +
      `${best.preventedCompromises.length} total compromises avoided, and ` +
      `${best.preventedDataExposure} sensitive data stores preserved.`;

    return {
      id: `rec-${best.action.type.toLowerCase()}-${minute}`,
      recommendedAction: best.action,
      target: best.target,
      confidence: best.confidence,
      rationale: best.rationale,
      evidence,
      alternatives,
      expectedImpact,
      decisionBasis,
      generatedAt: new Date().toISOString(),
      sourceMinute: minute,
      candidateId: best.id,
      score: best.score,
    };
  }

  /**
   * Executes an autonomous simulated response within the synthetic incident model.
   * STRICT SAFETY: No real-world networks or endpoints are touched.
   */
  autoSimulate(
    minute = 22,
    incidentId = "INC-2048"
  ): {
    decision: ResponseDecision;
    branch: CounterfactualBranch;
    candidate: ResponseCandidate;
    recommendation: ResponseRecommendation;
  } {
    const recommendation = this.generateRecommendation(minute, incidentId);
    const branch = simulateCounterfactualFuture(
      minute,
      recommendation.recommendedAction,
      incidentId
    );

    const candidates = this.evaluateCandidates(minute, incidentId);
    const candidate =
      candidates.find((c) => c.action.type === recommendation.recommendedAction.type) ||
      candidates[0]!;

    const decision: ResponseDecision = {
      mode: "AUTO_SIMULATE",
      selectedAction: recommendation.recommendedAction,
      target: recommendation.target,
      status: "COMPLETED",
      approved: true,
      recommendationId: recommendation.id,
      timestamp: minuteToTimestamp(minute),
      executedAt: new Date().toISOString(),
      branchId: branch.branchId,
    };

    return {
      decision,
      branch,
      candidate,
      recommendation,
    };
  }

  /**
   * Formats a comprehensive natural language investigation response explaining the recommendation.
   */
  formatRecommendationAnswer(rec: ResponseRecommendation): string {
    const act = rec.recommendedAction;
    return (
      `[IRIS RESPONSE INTELLIGENCE & RECOMMENDATION]\n` +
      `Incident: INC-2048 | Timestamp: ${minuteToTimestamp(rec.sourceMinute)} | Confidence: ${rec.confidence}\n\n` +
      `RECOMMENDED ACTION:\n` +
      `• Action: ${act.label}\n` +
      `• Target Entity: ${rec.target}\n` +
      `• Primary Rationale: ${rec.rationale}\n\n` +
      `SIMULATED OUTCOME & IMPACT:\n` +
      `• ${rec.expectedImpact}\n` +
      `• Decision Optimization: ${rec.decisionBasis}\n\n` +
      `ALTERNATIVES CONSIDERED & COMPARISON:\n` +
      rec.alternatives
        .map(
          (alt) =>
            `• ${alt.action.label}: Score ${alt.score} pts | Simulated Risk: ${alt.simulatedRisk} | Prevented: ${alt.preventedCompromises.length} assets (${alt.rationale})`
        )
        .join("\n") +
      `\n\n` +
      `SAFETY NOTICE: SIMULATION ONLY. This decision was evaluated using the Phase 4 counterfactual model. No real host or network infrastructure was modified.`
    );
  }

  /**
   * Formats comparative response candidate options.
   */
  formatComparisonAnswer(candidates: ResponseCandidate[]): string {
    return (
      `[RESPONSE OPTIONS COMPARISON]\n` +
      candidates
        .map(
          (c) =>
            `[${c.action.label}]\n` +
            `• Target: ${c.target}\n` +
            `• Final Simulated Risk: ${c.simulatedRisk} (Baseline: ${c.baselineRisk})\n` +
            `• Prevented Compromises: ${c.preventedCompromises.length} (${c.preventedCompromises.join(", ") || "None"})\n` +
            `• Prevented Events: ${c.preventedEvents.length} stages\n` +
            `• Protected Data Stores: ${c.preventedDataExposure}\n` +
            `• Confidence: ${c.confidence} | Score: ${c.score} pts`
        )
        .join("\n\n") +
      `\n\nSAFETY NOTICE: SIMULATION ONLY — All outcomes derived from Phase 4 counterfactual simulation.`
    );
  }
}

export const responseIntelligenceService = new ResponseIntelligenceService();
