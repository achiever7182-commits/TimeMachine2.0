import type { IrisContext, IrisIntentCategory } from "@/types/iris";

/**
 * Classifies an analyst investigation question into a structured intent category (Requirement 10).
 */
export function classifyIrisIntent(question: string): IrisIntentCategory {
  const q = question.toLowerCase().trim();

  // Attack Path / Traversal (excluding hypothetical what-if queries)
  if (
    !q.includes("what happens") &&
    !q.includes("what if") &&
    !q.includes("what would happen") &&
    (q.includes("reach") ||
      q.includes("attack path") ||
      q.includes("how did the attacker") ||
      q.includes("path to the database") ||
      q.includes("pivot") ||
      q.includes("lateral movement") ||
      q.includes("travers"))
  ) {
    return "ATTACK_PATH";
  }

  // Detection Gap / Missed opportunities
  if (
    q.includes("miss") ||
    q.includes("detection gap") ||
    q.includes("earliest") ||
    q.includes("detectable") ||
    q.includes("delay") ||
    q.includes("opportunity")
  ) {
    return "DETECTION_GAP";
  }

  // Attack Start
  if (
    q.includes("when did the attack") ||
    q.includes("really begin") ||
    q.includes("attack begin") ||
    q.includes("start") ||
    q.includes("origin") ||
    q.includes("first seen")
  ) {
    return "ATTACK_START";
  }

  // Known State vs Actual Reality at a historical timestamp
  if (
    q.includes("what did we know") ||
    q.includes("soc know") ||
    q.includes("known state") ||
    q.includes("known at") ||
    q.includes("defenders know")
  ) {
    return "KNOWN_STATE";
  }

  // Response Intelligence: Explanation of recommendation or confidence
  if (
    q.includes("why do you recommend") ||
    q.includes("why did you recommend") ||
    q.includes("why didn't you recommend") ||
    q.includes("why did not you recommend") ||
    q.includes("how confident are you") ||
    q.includes("decision basis")
  ) {
    return "RESPONSE_EXPLANATION";
  }

  // Response Intelligence: Multi-action comparison
  if (
    q.includes("compare the available response") ||
    q.includes("compare available response") ||
    q.includes("compare response options") ||
    q.includes("show me the response comparison") ||
    q.includes("response comparison") ||
    q.includes("response options")
  ) {
    return "RESPONSE_COMPARISON";
  }

  // Response Intelligence: Autonomous simulated response
  if (
    q.includes("simulate your recommended response") ||
    q.includes("auto-simulate") ||
    q.includes("auto simulate") ||
    q.includes("autonomous response")
  ) {
    return "AUTO_SIMULATE_INTENT";
  }

  // Response Intelligence: Recommendation request
  if (
    q.includes("what should we do") ||
    q.includes("what response do you recommend") ||
    q.includes("which action would have prevented") ||
    q.includes("recommended response") ||
    q.includes("what do you recommend") ||
    q.includes("should we isolate") ||
    q.includes("best response")
  ) {
    return "RESPONSE_RECOMMENDATION";
  }

  // Counterfactual response / Prevented steps
  if (
    q.includes("prevent") ||
    q.includes("what did this response prevent") ||
    q.includes("stopped") ||
    q.includes("blocked")
  ) {
    return "PREVENTED_EVENT";
  }

  if (
    q.includes("what happens") ||
    q.includes("what would happen") ||
    q.includes("what if") ||
    q.includes("would have happened") ||
    q.includes("counterfactual") ||
    q.includes("isolate") ||
    q.includes("acted earlier") ||
    q.includes("simulate") ||
    q.includes("do nothing") ||
    q.includes("disable") ||
    q.includes("block lateral")
  ) {
    return "COUNTERFACTUAL";
  }

  if (
    q.includes("compare") ||
    q.includes("difference") ||
    q.includes("versus") ||
    q.includes("vs")
  ) {
    return "SCENARIO_COMPARISON";
  }

  // Compromised assets
  if (
    q.includes("asset") ||
    q.includes("compromised") ||
    q.includes("which systems") ||
    q.includes("which endpoints") ||
    q.includes("host")
  ) {
    return "COMPROMISED_ASSETS";
  }

  // Risk & Blast Radius
  if (
    q.includes("risk") ||
    q.includes("stage") ||
    q.includes("blast radius") ||
    q.includes("severity")
  ) {
    return "CURRENT_RISK";
  }

  // Report & Lessons Learned (Phase 6)
  if (
    q.includes("summarize this incident") ||
    q.includes("summarize the incident") ||
    q.includes("executive summary") ||
    q.includes("incident summary") ||
    q.includes("summarize")
  ) {
    return "REPORT_SUMMARY";
  }

  if (
    q.includes("what should we change") ||
    q.includes("lessons learned") ||
    q.includes("what did we learn") ||
    q.includes("what can we learn") ||
    q.includes("learning")
  ) {
    return "LESSONS_LEARNED";
  }

  if (
    q.includes("classified as critical") ||
    q.includes("why was the incident classified") ||
    q.includes("why is this critical") ||
    q.includes("incident classification")
  ) {
    return "INCIDENT_CLASSIFICATION";
  }

  // Evidence
  if (
    q.includes("evidence") ||
    q.includes("proof") ||
    q.includes("logs") ||
    q.includes("telemetry")
  ) {
    return "EVIDENCE";
  }

  // General summary / What happened
  if (
    q.includes("what happened") ||
    q.includes("summary") ||
    q.includes("overview") ||
    q.includes("explain the incident") ||
    q.includes("tell me about")
  ) {
    return "WHAT_HAPPENED";
  }

  // Next steps / Recommendation
  if (
    q.includes("next") ||
    q.includes("recommend") ||
    q.includes("investigate next") ||
    q.includes("suggest")
  ) {
    return "NEXT_INVESTIGATION";
  }

  return "UNKNOWN";
}

/**
 * Returns contextually relevant suggested questions depending on simulation minute and branch state (Requirement 28).
 */
export function getContextualSuggestedQuestions(context: IrisContext): string[] {
  const min = context.incident.currentMinute;
  const hasCf = Boolean(context.counterfactualBranch);

  if (hasCf) {
    return [
      "What did this response prevent?",
      "Why was SERVER-03 not reached in the counterfactual?",
      "Compare the actual future with the counterfactual future.",
      "Did that counterfactual actually happen in the real timeline?",
    ];
  }

  if (min <= 10) {
    return [
      "What happened so far?",
      "When did the attack really begin?",
      "What did defenders know at this time?",
      "What did we miss (earliest detection opportunity)?",
    ];
  }

  if (min <= 24) {
    // around 10:04 (minute 22)
    return [
      "What did we know at 10:04?",
      "What would happen if we isolated LAPTOP-042 at 10:04?",
      "How did the attacker reach the database?",
      "What was the earliest detectable opportunity?",
    ];
  }

  return [
    "What happened across the full incident?",
    "How did the attacker reach the database?",
    "Which assets were compromised?",
    "What would have happened if we had acted earlier at 10:04?",
  ];
}
