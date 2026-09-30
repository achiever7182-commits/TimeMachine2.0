import { getActualDigitalTwinState, getKnownSecurityState } from "../digitalTwinService";
import { getAttackGraphAtTime } from "../attackGraphService";
import { minuteToTimestamp } from "../stateReconstruction";
import { demoIncident, demoTimelineEvents } from "@/data/incidentData";
import type { IrisContext } from "@/types/iris";
import type { CounterfactualBranch } from "@/types/counterfactual";

interface BuildIrisContextParams {
  incidentId?: string;
  currentMinute: number;
  counterfactualBranch?: CounterfactualBranch | null;
  scenarioHistory?: CounterfactualBranch[];
}

/**
 * Builds a strictly READ-ONLY investigation context snapshot for IRIS (Requirement 5 & 6).
 * Never mutates simulation clock, Digital Twin, or incident state.
 */
export function buildIrisContext({
  incidentId = "INC-2048",
  currentMinute,
  counterfactualBranch = null,
  scenarioHistory = [],
}: BuildIrisContextParams): IrisContext {
  const boundedMinute = Math.max(0, Math.min(42, Math.floor(currentMinute)));
  const currentTime = minuteToTimestamp(boundedMinute);

  const actualState = getActualDigitalTwinState(boundedMinute);
  const knownSecurityState = getKnownSecurityState(boundedMinute);
  const attackGraph = getAttackGraphAtTime(incidentId, boundedMinute);

  return {
    incident: {
      id: incidentId,
      title: demoIncident.title,
      stage: actualState.incidentStage,
      currentMinute: boundedMinute,
      currentTime,
      currentRisk: actualState.riskLevel,
    },
    actualState,
    knownSecurityState,
    attackGraph,
    timeline: demoTimelineEvents,
    evidence: actualState.evidence,
    counterfactualBranch,
    scenarioHistory,
  };
}
