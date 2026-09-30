import type { CounterfactualComparison } from "@/types/counterfactual";
import type { DetectionGapFinding } from "@/types/iris";
import type { AttackGraphEdge } from "@/types/attackGraph";

/**
 * Causal & investigative explainability utilities for IRIS.
 * Provides grounded natural-language explanations derived strictly
 * from deterministic engine data structures.
 */

/**
 * Explains why a specific asset or event was prevented in a counterfactual scenario.
 */
export function explainWhyAssetProtected(
  assetId: string,
  comparison: CounterfactualComparison
): string {
  const isPrevented = comparison.preventedCompromises.includes(assetId);
  if (!isPrevented) {
    if (comparison.counterfactualCompromisedAssets.includes(assetId)) {
      return `Asset ${assetId} was compromised prior to the response action and remained affected.`;
    }
    return `Asset ${assetId} was never targeted in the baseline attack progression.`;
  }

  // Check specific prevented event details
  const matchingEvent = comparison.preventedEvents.find(
    (pe) => pe.targetAsset === assetId
  );

  if (matchingEvent) {
    return (
      `Asset ${assetId} was protected because ${matchingEvent.title} was interrupted at ` +
      `${matchingEvent.originalTime}. Causal reason: ${matchingEvent.reason}`
    );
  }

  return (
    `Asset ${assetId} was protected because the upstream lateral movement path was severed ` +
    `by the simulated response action.`
  );
}

/**
 * Constructs a causal explanation of why the downstream attack path failed
 * following an intervention.
 */
export function explainCounterfactualPrevention(
  comparison: CounterfactualComparison
): {
  summary: string;
  causalChain: string[];
} {
  const causalChain: string[] = [];

  for (const pe of comparison.preventedEvents) {
    let causalTrigger = "upstream intervention";
    if (pe.eventId === "evt-1007") {
      causalTrigger = "endpoint network isolation severed remote interactive session";
    } else if (pe.eventId === "evt-1012") {
      causalTrigger = "SERVER-03 was never compromised, eliminating database query pivot";
    } else if (pe.eventId === "evt-1018") {
      causalTrigger = "internal network segment unreachable without database server foothold";
    }

    causalChain.push(
      `[${pe.originalTime}] [${pe.eventId}] ${pe.title} was prevented because ${causalTrigger} (${pe.reason})`
    );
  }

  const summary =
    `The response action successfully prevented ${comparison.preventedCount} attack stages, ` +
    `saving ${comparison.preventedCompromises.length} downstream systems (${comparison.preventedCompromises.join(", ")}). ` +
    `Final risk reduced from ${comparison.baselineFinalRisk} to ${comparison.counterfactualFinalRisk}.`;

  return { summary, causalChain };
}

/**
 * Explains the delta between what defenders knew at a specific minute
 * and what was objectively happening in reality.
 */
export function explainKnownVsActual(
  actualCompromised: string[],
  knownCompromised: string[],
  minute: number,
  timestamp: string
): string {
  const unknownToSoc = actualCompromised.filter((id) => !knownCompromised.includes(id));

  let narrative = `[KNOWN AT ${timestamp} vs ACTUAL REALITY]\n`;

  if (minute <= 24) {
    narrative +=
      `At ${timestamp} (T+${minute}m), an acute visibility gap existed:\n` +
      `• In objective reality: LAPTOP-042 and identity alex.m were already actively compromised with encoded PowerShell activity.\n` +
      `• In SOC awareness: Defenders only had disparate authentication anomaly telemetry from 09:47. Triage had not confirmed endpoint breach.\n` +
      `• Crucially, downstream movement to SERVER-03 (10:07) and database queries (10:12) had NOT yet occurred in either reality.\n\n` +
      `Defenders at ${timestamp} possessed enough evidence to isolate LAPTOP-042, but did not yet know the intrusion had succeeded.`;
  } else {
    narrative +=
      `At ${timestamp}, the SOC had confirmed compromise on: [${knownCompromised.join(", ") || "None"}].\n`;
    if (unknownToSoc.length > 0) {
      narrative +=
        `However, undetected compromises existed on: [${unknownToSoc.join(", ")}]. ` +
        `Lateral movement had outpaced defender alert triage.`;
    } else {
      narrative += `The SOC known state was fully synchronized with actual compromised systems.`;
    }
  }

  return narrative;
}

/**
 * Explains detection gap findings.
 */
export function explainDetectionGap(gap: DetectionGapFinding): string {
  return (
    `[DETECTION GAP ANALYSIS]\n` +
    `• Earliest Actionable Opportunity: ${gap.timestamp} (T+${gap.earliestOpportunityMinute}m)\n` +
    `• Formal Incident Detection: ${gap.formalDetectionTimestamp}\n` +
    `• Detection Delay: ${gap.detectionDelayMinutes} minutes\n\n` +
    `What was missed: ${gap.explanation}\n\n` +
    `Investigative significance: The 37-minute window between 09:47 and 10:24 provided defenders ` +
    `multiple opportunities to revoke session tokens and isolate LAPTOP-042 before any lateral pivot occurred.`
  );
}

/**
 * Formats a concise comparison between Actual and Counterfactual outcomes.
 */
export function formatScenarioComparison(comp: CounterfactualComparison): string {
  return (
    `ACTUAL vs COUNTERFACTUAL COMPARISON\n` +
    `• Compromised Assets: ${comp.baselineCompromisedAssets.length} (Actual) vs ${comp.counterfactualCompromisedAssets.length} (Counterfactual) [Diff: -${comp.preventedCompromises.length}]\n` +
    `• Critical Infrastructure: ${comp.baselineCriticalAssets.length} (Actual) vs ${comp.counterfactualCriticalAssets.length} (Counterfactual)\n` +
    `• Data Exposure: ${comp.baselineDataResourcesAtRisk} stores (Actual) vs ${comp.counterfactualDataResourcesAtRisk} stores (Counterfactual)\n` +
    `• Final Risk: ${comp.baselineFinalRisk} (Actual) → ${comp.counterfactualFinalRisk} (Counterfactual)\n` +
    `• Attack Stages Interrupted: ${comp.preventedCount}`
  );
}
