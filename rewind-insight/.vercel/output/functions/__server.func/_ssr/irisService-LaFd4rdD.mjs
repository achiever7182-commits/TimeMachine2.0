import { _ as incidentReportService, b as simulateCounterfactualFuture, d as getActualDigitalTwinState, f as getAttackGraphAtTime, g as getStandardResponseActions, h as getKnownSecurityState, i as demoIncident, l as findEarliestDetectableOpportunity, s as demoTimelineEvents, v as minuteToTimestamp, y as responseIntelligenceService } from "./DemoContext-DI0dcfwA.mjs";
import { i as elevenLabsAgentService } from "./elevenLabsAgentService-CAH0X6eo.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/irisService-LaFd4rdD.js
/**
* Classifies an analyst investigation question into a structured intent category (Requirement 10).
*/
function classifyIrisIntent(question) {
	const q = question.toLowerCase().trim();
	if (!q.includes("what happens") && !q.includes("what if") && !q.includes("what would happen") && (q.includes("reach") || q.includes("attack path") || q.includes("how did the attacker") || q.includes("path to the database") || q.includes("pivot") || q.includes("lateral movement") || q.includes("travers"))) return "ATTACK_PATH";
	if (q.includes("miss") || q.includes("detection gap") || q.includes("earliest") || q.includes("detectable") || q.includes("delay") || q.includes("opportunity")) return "DETECTION_GAP";
	if (q.includes("when did the attack") || q.includes("really begin") || q.includes("attack begin") || q.includes("start") || q.includes("origin") || q.includes("first seen")) return "ATTACK_START";
	if (q.includes("what did we know") || q.includes("soc know") || q.includes("known state") || q.includes("known at") || q.includes("defenders know")) return "KNOWN_STATE";
	if (q.includes("why do you recommend") || q.includes("why did you recommend") || q.includes("why didn't you recommend") || q.includes("why did not you recommend") || q.includes("how confident are you") || q.includes("decision basis")) return "RESPONSE_EXPLANATION";
	if (q.includes("compare the available response") || q.includes("compare available response") || q.includes("compare response options") || q.includes("show me the response comparison") || q.includes("response comparison") || q.includes("response options")) return "RESPONSE_COMPARISON";
	if (q.includes("simulate your recommended response") || q.includes("auto-simulate") || q.includes("auto simulate") || q.includes("autonomous response")) return "AUTO_SIMULATE_INTENT";
	if (q.includes("what should we do") || q.includes("what response do you recommend") || q.includes("which action would have prevented") || q.includes("recommended response") || q.includes("what do you recommend") || q.includes("should we isolate") || q.includes("best response")) return "RESPONSE_RECOMMENDATION";
	if (q.includes("prevent") || q.includes("what did this response prevent") || q.includes("stopped") || q.includes("blocked")) return "PREVENTED_EVENT";
	if (q.includes("what happens") || q.includes("what would happen") || q.includes("what if") || q.includes("would have happened") || q.includes("counterfactual") || q.includes("isolate") || q.includes("acted earlier") || q.includes("simulate") || q.includes("do nothing") || q.includes("disable") || q.includes("block lateral")) return "COUNTERFACTUAL";
	if (q.includes("compare") || q.includes("difference") || q.includes("versus") || q.includes("vs")) return "SCENARIO_COMPARISON";
	if (q.includes("asset") || q.includes("compromised") || q.includes("which systems") || q.includes("which endpoints") || q.includes("host")) return "COMPROMISED_ASSETS";
	if (q.includes("risk") || q.includes("stage") || q.includes("blast radius") || q.includes("severity")) return "CURRENT_RISK";
	if (q.includes("summarize this incident") || q.includes("summarize the incident") || q.includes("executive summary") || q.includes("incident summary") || q.includes("summarize")) return "REPORT_SUMMARY";
	if (q.includes("what should we change") || q.includes("lessons learned") || q.includes("what did we learn") || q.includes("what can we learn") || q.includes("learning")) return "LESSONS_LEARNED";
	if (q.includes("classified as critical") || q.includes("why was the incident classified") || q.includes("why is this critical") || q.includes("incident classification")) return "INCIDENT_CLASSIFICATION";
	if (q.includes("evidence") || q.includes("proof") || q.includes("logs") || q.includes("telemetry")) return "EVIDENCE";
	if (q.includes("what happened") || q.includes("summary") || q.includes("overview") || q.includes("explain the incident") || q.includes("tell me about")) return "WHAT_HAPPENED";
	if (q.includes("next") || q.includes("recommend") || q.includes("investigate next") || q.includes("suggest")) return "NEXT_INVESTIGATION";
	return "UNKNOWN";
}
/**
* Returns contextually relevant suggested questions depending on simulation minute and branch state (Requirement 28).
*/
function getContextualSuggestedQuestions(context) {
	const min = context.incident.currentMinute;
	if (Boolean(context.counterfactualBranch)) return [
		"What did this response prevent?",
		"Why was SERVER-03 not reached in the counterfactual?",
		"Compare the actual future with the counterfactual future.",
		"Did that counterfactual actually happen in the real timeline?"
	];
	if (min <= 10) return [
		"What happened so far?",
		"When did the attack really begin?",
		"What did defenders know at this time?",
		"What did we miss (earliest detection opportunity)?"
	];
	if (min <= 24) return [
		"What did we know at 10:04?",
		"What would happen if we isolated LAPTOP-042 at 10:04?",
		"How did the attacker reach the database?",
		"What was the earliest detectable opportunity?"
	];
	return [
		"What happened across the full incident?",
		"How did the attacker reach the database?",
		"Which assets were compromised?",
		"What would have happened if we had acted earlier at 10:04?"
	];
}
/**
* Explains the delta between what defenders knew at a specific minute
* and what was objectively happening in reality.
*/
function explainKnownVsActual(actualCompromised, knownCompromised, minute, timestamp) {
	const unknownToSoc = actualCompromised.filter((id) => !knownCompromised.includes(id));
	let narrative = `[KNOWN AT ${timestamp} vs ACTUAL REALITY]\n`;
	if (minute <= 24) narrative += `At ${timestamp} (T+${minute}m), an acute visibility gap existed:\n• In objective reality: LAPTOP-042 and identity alex.m were already actively compromised with encoded PowerShell activity.\n• In SOC awareness: Defenders only had disparate authentication anomaly telemetry from 09:47. Triage had not confirmed endpoint breach.\n• Crucially, downstream movement to SERVER-03 (10:07) and database queries (10:12) had NOT yet occurred in either reality.\n\nDefenders at ${timestamp} possessed enough evidence to isolate LAPTOP-042, but did not yet know the intrusion had succeeded.`;
	else {
		narrative += `At ${timestamp}, the SOC had confirmed compromise on: [${knownCompromised.join(", ") || "None"}].\n`;
		if (unknownToSoc.length > 0) narrative += `However, undetected compromises existed on: [${unknownToSoc.join(", ")}]. Lateral movement had outpaced defender alert triage.`;
		else narrative += `The SOC known state was fully synchronized with actual compromised systems.`;
	}
	return narrative;
}
/**
* Explains detection gap findings.
*/
function explainDetectionGap(gap) {
	return `[DETECTION GAP ANALYSIS]\n• Earliest Actionable Opportunity: ${gap.timestamp} (T+${gap.earliestOpportunityMinute}m)\n• Formal Incident Detection: ${gap.formalDetectionTimestamp}\n• Detection Delay: ${gap.detectionDelayMinutes} minutes\n\nWhat was missed: ${gap.explanation}\n\nInvestigative significance: The 37-minute window between 09:47 and 10:24 provided defenders multiple opportunities to revoke session tokens and isolate LAPTOP-042 before any lateral pivot occurred.`;
}
/**
* Deterministic IRIS Investigation Provider (Requirement 8 & 9).
* Grounded strictly in structured incident state, Digital Twin, Attack Graph, and Counterfactual data.
* Zero external LLM requirement, zero hallucination.
*/
var DeterministicIrisProvider = class {
	async answer(question, context) {
		const intent = classifyIrisIntent(question);
		const suggestedQuestions = getContextualSuggestedQuestions(context);
		const timestamp = context.incident.currentTime;
		const generatedAt = (/* @__PURE__ */ new Date()).toISOString();
		switch (intent) {
			case "WHAT_HAPPENED": {
				const events = context.actualState.completedEvents.concat(context.actualState.activeEvents);
				const citations = events.map((e) => ({
					id: `cit-${e.id}`,
					type: "TIMELINE_EVENT",
					label: `${e.timestamp} ${e.title}`,
					sourceId: e.id,
					timestamp: e.timestamp,
					minute: e.minute
				}));
				const answer = `[ACTUAL REALITY at ${timestamp}]\nIncident ${context.incident.id} involves an unauthorized intrusion into ACME Corporation. The progression observed up to ${timestamp}:\n` + events.map((e) => `• [${e.timestamp}] ${e.title}: ${e.description}`).join("\n") + `\n\nCurrent stage is ${context.incident.stage} with ${context.actualState.compromisedAssets.length} confirmed compromised assets.`;
				const findings = [{
					id: "f-summary",
					type: "TIMELINE",
					title: `Incident Progression at ${timestamp}`,
					summary: `${events.length} chronological milestones reconstructed up to ${timestamp}.`,
					confidence: "HIGH",
					citations: citations.slice(0, 4)
				}];
				return {
					id: `iris-ans-${Date.now()}`,
					answer,
					findings,
					citations,
					suggestedQuestions,
					generatedAt,
					intentCategory: intent,
					worldPerspective: "ACTUAL"
				};
			}
			case "ATTACK_START": {
				const earliestSuspicious = "09:42";
				const earliestOpportunity = "09:47";
				const firstCompromise = "10:00";
				const formalDetection = "10:24";
				const citations = [
					{
						id: "cit-0942",
						type: "TIMELINE_EVENT",
						label: "09:42 Unusual Authentication",
						sourceId: "evt-0942",
						timestamp: "09:42"
					},
					{
						id: "cit-0947",
						type: "TIMELINE_EVENT",
						label: "09:47 First Detection Opportunity",
						sourceId: "evt-0947",
						timestamp: "09:47"
					},
					{
						id: "cit-1000",
						type: "TIMELINE_EVENT",
						label: "10:00 Account Compromised",
						sourceId: "evt-1000",
						timestamp: "10:00"
					},
					{
						id: "cit-1024",
						type: "TIMELINE_EVENT",
						label: "10:24 Incident Detected",
						sourceId: "evt-1024",
						timestamp: "10:24"
					}
				];
				const answer = `[ACTUAL CHRONOLOGY]
To understand when the attack began, we must distinguish between four distinct milestones:
1. Earliest Suspicious Activity: ${earliestSuspicious} — Initial unrecognized foreign IP authentication attempt via VPN-GW-01.\n2. Earliest Detectable Opportunity: ${earliestOpportunity} — Anomalous velocity, unfamiliar ASN, and push-fatigue failures formed a high-confidence alert.\n3. First Confirmed Compromise: ${firstCompromise} — Attacker opened an interactive remote desktop session on LAPTOP-042 using alex.m credentials.\n4. Formal Incident Detection: ${formalDetection} — Security SIEM correlation triggered CR-8812 and alerted SOC analysts.\n\nThe attack really began at ${earliestSuspicious}, with actionable defense opportunity present at ${earliestOpportunity}.`;
				return {
					id: `iris-ans-${Date.now()}`,
					answer,
					findings: [{
						id: "f-start",
						type: "TIMELINE",
						title: "Attack Origin & Detection Milestones",
						summary: `Earliest probe at ${earliestSuspicious}; first actionable detection opportunity at ${earliestOpportunity}.`,
						confidence: "HIGH",
						citations
					}],
					citations,
					suggestedQuestions,
					generatedAt,
					intentCategory: intent,
					worldPerspective: "ACTUAL"
				};
			}
			case "KNOWN_STATE": {
				const minute = context.incident.currentMinute;
				const actualAssets = context.actualState.compromisedAssets;
				const knownAssets = context.knownSecurityState.assets.filter((a) => a.status === "COMPROMISED").map((a) => a.id);
				actualAssets.filter((id) => !knownAssets.includes(id));
				const citations = [{
					id: "cit-known-snap",
					type: "SNAPSHOT",
					label: `SOC Known State at ${timestamp}`,
					timestamp
				}];
				const answer = explainKnownVsActual(actualAssets, knownAssets, minute, timestamp);
				return {
					id: `iris-ans-${Date.now()}`,
					answer,
					findings: [{
						id: "f-known",
						type: "DETECTION_GAP",
						title: `Defenders' Perspective at ${timestamp}`,
						summary: `SOC known state at ${timestamp} tracked ${knownAssets.length} compromises vs ${actualAssets.length} actual compromised systems.`,
						confidence: "HIGH",
						citations
					}],
					citations,
					suggestedQuestions,
					generatedAt,
					intentCategory: intent,
					worldPerspective: "KNOWN_AT_TIME"
				};
			}
			case "ATTACK_PATH": {
				const path = context.attackGraph.activePath?.nodeIds ?? [
					"ATTACKER",
					"ALEX_ACCOUNT",
					"LAPTOP-042"
				];
				const edges = context.attackGraph.edges;
				const citations = edges.map((e) => ({
					id: `cit-${e.id}`,
					type: "ATTACK_EDGE",
					label: `${e.source} → ${e.target} (${e.relationshipType})`,
					sourceId: e.id,
					timestamp: e.firstSeen
				}));
				let answer = `[ATTACK GRAPH TRAVERSAL at ${timestamp}]\n`;
				if (path.length <= 2) answer += `The attacker has only penetrated the identity tier (ATTACKER → alex.m). Endpoint LAPTOP-042 is not yet compromised at ${timestamp}.`;
				else answer += `The attacker reached downstream assets via the following reconstructed causal sequence:\n` + path.map((node, i) => `${i + 1}. ${node}`).join(" → ") + `\n\nTraversal Details:\n` + edges.map((e) => `• [${e.firstSeen}] ${e.source} ${e.relationshipType.replace(/_/g, " ").toLowerCase()} ${e.target} via technique ${e.techniqueCategory}`).join("\n");
				return {
					id: `iris-ans-${Date.now()}`,
					answer,
					findings: [{
						id: "f-path",
						type: "ATTACK_PATH",
						title: "Observed Attack Path & Lateral Pivot",
						summary: `Kill chain sequence: ${path.join(" → ")}.`,
						confidence: "HIGH",
						citations
					}],
					citations,
					suggestedQuestions,
					generatedAt,
					intentCategory: intent,
					worldPerspective: "ACTUAL"
				};
			}
			case "COMPROMISED_ASSETS": {
				const assets = context.actualState.assets.filter((a) => a.status === "COMPROMISED");
				const citations = assets.map((a) => ({
					id: `cit-${a.id}`,
					type: "ASSET",
					label: `${a.id} (${a.name})`,
					sourceId: a.id
				}));
				const answer = `[COMPROMISED ASSETS at ${timestamp}]\nReconstructed Digital Twin state identifies ${assets.length} compromised assets at ${timestamp}:\n` + assets.map((a) => `• ${a.id} (${a.name}): Criticality ${a.criticality}, Compromise Time: ${a.compromiseTime ?? a.firstSeen}, Owner: ${a.owner}`).join("\n") + `\n\nPotentially affected/monitored assets: ${context.actualState.blastRadius.potentiallyAffectedAssets}.`;
				return {
					id: `iris-ans-${Date.now()}`,
					answer,
					findings: [{
						id: "f-assets",
						type: "ASSET",
						title: `Compromised Assets Count: ${assets.length}`,
						summary: `${assets.map((a) => a.id).join(", ") || "No compromised assets at this time."}`,
						confidence: "HIGH",
						citations
					}],
					citations,
					suggestedQuestions,
					generatedAt,
					intentCategory: intent,
					worldPerspective: "ACTUAL"
				};
			}
			case "DETECTION_GAP": {
				const gap = findEarliestDetectableOpportunity();
				const citations = [{
					id: "cit-gap-opp",
					type: "TIMELINE_EVENT",
					label: `${gap.timestamp} First Detection Opportunity`,
					timestamp: gap.timestamp
				}, {
					id: "cit-gap-alert",
					type: "TIMELINE_EVENT",
					label: `${gap.formalDetectionTimestamp} Formal Incident Detection`,
					timestamp: gap.formalDetectionTimestamp
				}];
				const answer = explainDetectionGap(gap);
				return {
					id: `iris-ans-${Date.now()}`,
					answer,
					findings: [{
						id: "f-gap",
						type: "DETECTION_GAP",
						title: `Detection Delay: ${gap.detectionDelayMinutes} Minutes`,
						summary: `Actionable evidence existed at ${gap.timestamp}, 37 minutes prior to formal SIEM declaration at ${gap.formalDetectionTimestamp}.`,
						confidence: "HIGH",
						citations
					}],
					citations,
					suggestedQuestions,
					generatedAt,
					intentCategory: intent,
					worldPerspective: "ACTUAL"
				};
			}
			case "CURRENT_RISK": {
				const br = context.actualState.blastRadius;
				const citations = [{
					id: "cit-risk",
					type: "RISK_STATE",
					label: `Risk: ${context.incident.currentRisk} (${context.incident.stage})`,
					timestamp
				}];
				const answer = `[CURRENT RISK & IMPACT ASSESSMENT at ${timestamp}]\n• Overall Risk Level: ${context.incident.currentRisk}\n• Incident Stage: ${context.incident.stage}\n• Confirmed Compromised Assets: ${br.confirmedAffectedAssets}\n• Critical Infrastructure Impacted: ${br.criticalAssetsAffected}\n• Data Resources at Risk: ${br.dataResourcesAtRisk} (Customer records & sensitive file shares)\n• Compromised Identities: ${br.usersAffected} (alex.m)`;
				return {
					id: `iris-ans-${Date.now()}`,
					answer,
					findings: [{
						id: "f-risk",
						type: "RISK",
						title: `Risk Assessment: ${context.incident.currentRisk}`,
						summary: `${br.confirmedAffectedAssets} assets compromised, ${br.criticalAssetsAffected} critical assets impacted.`,
						confidence: "HIGH",
						citations
					}],
					citations,
					suggestedQuestions,
					generatedAt,
					intentCategory: intent,
					worldPerspective: "ACTUAL"
				};
			}
			case "COUNTERFACTUAL":
			case "PREVENTED_EVENT":
			case "SCENARIO_COMPARISON": {
				const qLower = question.toLowerCase();
				const baseMin = context.incident.currentMinute > 0 ? context.incident.currentMinute : 22;
				const boundedMin = Math.max(0, Math.min(42, Math.floor(baseMin)));
				const standardActions = getStandardResponseActions(boundedMin);
				const targetAction = standardActions.find((a) => {
					if (qLower.includes("do nothing") && a.type === "DO_NOTHING") return true;
					if ((qLower.includes("disable") || qLower.includes("alex")) && a.type === "DISABLE_USER") return true;
					if ((qLower.includes("block") || qLower.includes("lateral")) && a.type === "BLOCK_LATERAL_CONNECTION") return true;
					if (qLower.includes("isolate") && a.type === "ISOLATE_ENDPOINT") return true;
					return false;
				});
				let branch = context.counterfactualBranch;
				if (targetAction) branch = simulateCounterfactualFuture(boundedMin, targetAction, context.incident.id);
				else if (!branch) branch = simulateCounterfactualFuture(22, standardActions.find((a) => a.type === "ISOLATE_ENDPOINT") || standardActions[1]);
				const comp = branch.comparison;
				const citations = comp.preventedEvents.map((p) => ({
					id: `cit-cf-${p.eventId}`,
					type: "COUNTERFACTUAL_EVENT",
					label: `[PREVENTED] ${p.originalTime} ${p.title}`,
					sourceId: p.eventId,
					timestamp: p.originalTime
				}));
				const actionIntro = branch.action.type === "DO_NOTHING" ? `If defenders take no action (DO NOTHING) at ${branch.baseTimestamp}, the attacker freely leverages LAPTOP-042 to traverse into the corporate core:` : `If ${branch.action.label} is executed at ${branch.baseTimestamp}, the deterministic simulation engine proves:`;
				const preventedSection = comp.preventedCount > 0 ? `1. PREVENTED ATTACK TRANSITIONS (${comp.preventedCount}):\n` + comp.preventedEvents.map((p) => `• [${p.originalTime}] ${p.title}: ${p.reason}`).join("\n") : `1. PREVENTED ATTACK TRANSITIONS: None (0 attack steps prevented).`;
				const answer = `[COUNTERFACTUAL SIMULATION: ${branch.action.label} at ${branch.baseTimestamp}]\n${actionIntro}\n\n${preventedSection}\n\n2. MEASURABLE IMPACT COMPARISON:\n• Final Risk: ${comp.baselineFinalRisk} (ACTUAL) → ${comp.counterfactualFinalRisk} (COUNTERFACTUAL)\n• Compromised Assets: ${comp.baselineCompromisedAssets.length} (ACTUAL) → ${comp.counterfactualCompromisedAssets.length} (COUNTERFACTUAL) [Saved: ${comp.preventedCompromises.join(", ") || "None"}]\n• Critical Assets Impacted: ${comp.baselineCriticalAssets.length} → ${comp.counterfactualCriticalAssets.length} [Protected: ${comp.preventedCriticalImpact.join(", ") || "None"}]\n• Exposed Data Stores: ${comp.baselineDataResourcesAtRisk} → ${comp.counterfactualDataResourcesAtRisk} (${comp.preventedDataExposure > 0 ? "Customer Data Protected" : "Exposed in Both"})\n\nIMPORTANT: The actual incident remains completely unchanged in historical truth. This is an isolated alternate future.`;
				return {
					id: `iris-ans-${Date.now()}`,
					answer,
					findings: [{
						id: "f-cf",
						type: "COUNTERFACTUAL",
						title: `Simulated Response Impact: ${comp.riskChange} Risk`,
						summary: `${comp.preventedCount} attack steps prevented, shielding ${comp.preventedCompromises.length} downstream servers.`,
						confidence: "HIGH",
						citations
					}],
					citations,
					suggestedQuestions,
					generatedAt,
					intentCategory: intent,
					worldPerspective: "COUNTERFACTUAL"
				};
			}
			case "EVIDENCE": {
				const evList = context.actualState.evidence;
				const citations = evList.map((e) => ({
					id: `cit-${e.id}`,
					type: "EVIDENCE",
					label: `[${e.timestamp}] ${e.title}`,
					sourceId: e.id,
					timestamp: e.timestamp
				}));
				const answer = `[FORENSIC EVIDENCE INVENTORY at ${timestamp}]\nThe reconstructed timeline contains ${evList.length} supporting evidence artifacts at ${timestamp}:\n` + evList.map((e) => `• [${e.timestamp}] ${e.id} (${e.type}): ${e.title} — ${e.content}`).join("\n");
				return {
					id: `iris-ans-${Date.now()}`,
					answer,
					findings: [{
						id: "f-ev",
						type: "EVIDENCE",
						title: `Evidence Artifacts: ${evList.length}`,
						summary: `${evList.map((e) => e.id).join(", ")}`,
						confidence: "HIGH",
						citations
					}],
					citations,
					suggestedQuestions,
					generatedAt,
					intentCategory: intent,
					worldPerspective: "ACTUAL"
				};
			}
			case "NEXT_INVESTIGATION": {
				const answer = `[RECOMMENDED INVESTIGATION ACTIONS]\nBased on current reconstructed state at ${timestamp}:\n1. Inspect the 09:47 authentication anomaly in the Forensic Timeline.\n2. Analyze the 10:04 encoded PowerShell telemetry on LAPTOP-042.\n3. Trace the lateral movement edge LAPTOP-042 → SERVER-03 in the Attack Graph.\n4. Open the Simulation Lab to model isolating LAPTOP-042 at 10:04.`;
				return {
					id: `iris-ans-${Date.now()}`,
					answer,
					findings: [{
						id: "f-next",
						type: "INVESTIGATION",
						title: "Analyst Next Steps",
						summary: "Recommended focus on 09:47 IdP signals and 10:04 endpoint isolation.",
						confidence: "HIGH",
						citations: []
					}],
					citations: [],
					suggestedQuestions,
					generatedAt,
					intentCategory: intent,
					worldPerspective: "ACTUAL"
				};
			}
			case "RESPONSE_RECOMMENDATION": {
				const rec = responseIntelligenceService.generateRecommendation(context.incident.currentMinute, context.incident.id);
				const answer = responseIntelligenceService.formatRecommendationAnswer(rec);
				const findings = [{
					id: `f-rec-${rec.id}`,
					type: "COUNTERFACTUAL",
					title: `IRIS Recommendation: ${rec.recommendedAction.label}`,
					summary: `${rec.expectedImpact} (Optimization Score: ${rec.score} pts)`,
					confidence: rec.confidence,
					citations: rec.evidence
				}];
				return {
					id: `iris-ans-${Date.now()}`,
					answer,
					findings,
					citations: rec.evidence,
					suggestedQuestions: [
						"Why do you recommend this response?",
						"Compare the available response options.",
						"Simulate your recommended response.",
						"What did this response prevent?"
					],
					generatedAt,
					intentCategory: intent,
					worldPerspective: "COUNTERFACTUAL"
				};
			}
			case "RESPONSE_COMPARISON": {
				const candidates = responseIntelligenceService.evaluateCandidates(context.incident.currentMinute, context.incident.id);
				const answer = responseIntelligenceService.formatComparisonAnswer(candidates);
				const citations = candidates.flatMap((c) => c.preventedEvents).slice(0, 4).map((pe) => ({
					id: `cit-cmp-${pe.eventId}`,
					type: "COUNTERFACTUAL_EVENT",
					label: `[PREVENTED] ${pe.originalTime} ${pe.title}`,
					sourceId: pe.eventId,
					timestamp: pe.originalTime
				}));
				return {
					id: `iris-ans-${Date.now()}`,
					answer,
					findings: [{
						id: `f-cmp-${Date.now()}`,
						type: "COUNTERFACTUAL",
						title: "Multi-Action Counterfactual Comparison",
						summary: `Evaluated ${candidates.length} proactive response candidates via Phase 4 simulation.`,
						confidence: "HIGH",
						citations
					}],
					citations,
					suggestedQuestions: [
						"What response do you recommend?",
						"Why do you recommend this response?",
						"Simulate your recommended response."
					],
					generatedAt,
					intentCategory: intent,
					worldPerspective: "COUNTERFACTUAL"
				};
			}
			case "RESPONSE_EXPLANATION": {
				const rec = responseIntelligenceService.generateRecommendation(context.incident.currentMinute, context.incident.id);
				const answer = `[IRIS DECISION EXPLANATION & CONFIDENCE BASIS]\n• Recommended Action: ${rec.recommendedAction.label}\n• Assessed Confidence: ${rec.confidence}\n• Decision Basis: ${rec.decisionBasis}\n\nWHY THIS ACTION WAS CHOSEN OVER ALTERNATIVES:\n` + rec.alternatives.map((alt) => `• ${alt.action.label} (Score: ${alt.score} vs ${rec.score}): ${alt.score < rec.score ? "Sub-optimal protection. Allows greater downstream damage or has narrower containment scope." : "Comparable containment but higher administrative overhead."}`).join("\n") + `

CONFIDENCE DERIVATION:
Confidence is assessed as ${rec.confidence} because the deterministic Phase 4 simulation confirmed direct causal interruption of the lateral pivot path.\n\nSAFETY NOTICE: SIMULATION ONLY. No real-world endpoint or infrastructure actions were executed.`;
				return {
					id: `iris-ans-${Date.now()}`,
					answer,
					findings: [{
						id: `f-expl-${Date.now()}`,
						type: "INVESTIGATION",
						title: `Decision Explanation: ${rec.confidence} Confidence`,
						summary: rec.decisionBasis,
						confidence: rec.confidence,
						citations: rec.evidence
					}],
					citations: rec.evidence,
					suggestedQuestions: [
						"Simulate your recommended response.",
						"Compare the available response options.",
						"What did this response prevent?"
					],
					generatedAt,
					intentCategory: intent,
					worldPerspective: "COUNTERFACTUAL"
				};
			}
			case "AUTO_SIMULATE_INTENT": {
				const { decision, branch, candidate, recommendation } = responseIntelligenceService.autoSimulate(context.incident.currentMinute, context.incident.id);
				const answer = `[AUTONOMOUS SIMULATED RESPONSE EXECUTED]\nStatus: SIMULATION COMPLETED | Mode: AUTO_SIMULATE | Timestamp: ${decision.timestamp}\n\nIRIS autonomously evaluated response candidates and executed the optimal response inside the synthetic incident model:\n• Selected Action: ${decision.selectedAction.label}\n• Target: ${decision.target}\n• Simulated Branch ID: ${decision.branchId}\n\nMEASURABLE SIMULATED IMPACT:\n• Prevented Events: ${branch.comparison.preventedCount} attack stages\n• Protected Assets: ${branch.comparison.preventedCompromises.join(", ") || "None"}\n• Final Simulated Risk: ${branch.comparison.baselineFinalRisk} → ${branch.comparison.counterfactualFinalRisk}\n\nCRITICAL SAFETY NOTICE: SIMULATION ONLY. This action was autonomously executed strictly within the synthetic incident sandbox. No real endpoints, networks, or user accounts were modified.`;
				const citations = branch.comparison.preventedEvents.map((pe) => ({
					id: `cit-auto-${pe.eventId}`,
					type: "COUNTERFACTUAL_EVENT",
					label: `[PREVENTED] ${pe.originalTime} ${pe.title}`,
					sourceId: pe.eventId,
					timestamp: pe.originalTime
				}));
				return {
					id: `iris-ans-${Date.now()}`,
					answer,
					findings: [{
						id: `f-auto-${Date.now()}`,
						type: "COUNTERFACTUAL",
						title: `Autonomous Response: ${decision.selectedAction.label}`,
						summary: `${branch.comparison.preventedCount} attack stages averted in synthetic sandbox.`,
						confidence: recommendation.confidence,
						citations
					}],
					citations,
					suggestedQuestions: [
						"What did this response prevent?",
						"Compare the actual future with the counterfactual future.",
						"Why was SERVER-03 not reached in the counterfactual?"
					],
					generatedAt,
					intentCategory: intent,
					worldPerspective: "COUNTERFACTUAL"
				};
			}
			case "REPORT_SUMMARY": {
				const report = incidentReportService.generateIncidentReport(context.incident.id, { minute: context.incident.currentMinute });
				const answer = `[INCIDENT EXECUTIVE SUMMARY — ${report.incidentId}]\nTitle: ${report.title} | Severity: ${report.severity} | Organization: ${report.organization}\nAttack Window: ${report.incidentStart} → ${report.formalDetection} (Earliest Opportunity: ${report.firstDetectableOpportunity})\n\n${report.executiveSummary}\n\nKEY OUTCOME COMPARISON:\n• Actual: ${report.actualImpact.compromisedAssetsCount} assets compromised, ${report.actualImpact.dataResourcesAffected.length} data resources exposed, CRITICAL final risk.\n• Simulated Containment: ${report.counterfactualAnalysis.recommendedAction.label} prevents ${report.counterfactualAnalysis.preventedEvents.length} stages, saving ${report.counterfactualAnalysis.protectedAssets.join(", ")}.\n\nSIMULATION ONLY: Derived from synthetic incident model telemetry.`;
				const citations = report.citations.slice(0, 5);
				return {
					id: `iris-ans-${Date.now()}`,
					answer,
					findings: [{
						id: `f-rep-${Date.now()}`,
						type: "INVESTIGATION",
						title: "Incident Resolution Report Summary",
						summary: `${report.actualImpact.compromisedAssetsCount} assets affected, 37-minute detection gap.`,
						confidence: "HIGH",
						citations
					}],
					citations,
					suggestedQuestions: [
						"What was the biggest detection gap?",
						"What should we change?",
						"Why was the incident classified as critical?",
						"Show me the evidence for this conclusion."
					],
					generatedAt,
					intentCategory: intent,
					worldPerspective: "ACTUAL"
				};
			}
			case "LESSONS_LEARNED": {
				const report = incidentReportService.generateIncidentReport(context.incident.id, { minute: context.incident.currentMinute });
				const answer = "[POST-INCIDENT LESSONS LEARNED & RECOMMENDATIONS]\nBased on INC-2048 synthetic reconstruction:\n\n" + report.lessonsLearned.map((ll, idx) => `${idx + 1}. [${ll.category}] ${ll.lesson}\n   • Observation: ${ll.observation}\n   • Impact if Applied: ${ll.impactIfApplied}`).join("\n\n") + `\n\nCORE TAKEAWAY: Intervening at 10:04 via host isolation eliminates all downstream database and file repository compromises.`;
				return {
					id: `iris-ans-${Date.now()}`,
					answer,
					findings: [{
						id: `f-ll-${Date.now()}`,
						type: "INVESTIGATION",
						title: "Post-Incident Lessons Learned",
						summary: `${report.lessonsLearned.length} operational improvements identified.`,
						confidence: "HIGH",
						citations: report.citations.slice(0, 3)
					}],
					citations: report.citations.slice(0, 3),
					suggestedQuestions: [
						"What was the biggest detection gap?",
						"Summarize this incident.",
						"What response prevented the most damage?"
					],
					generatedAt,
					intentCategory: intent,
					worldPerspective: "ACTUAL"
				};
			}
			case "INCIDENT_CLASSIFICATION": {
				const report = incidentReportService.generateIncidentReport(context.incident.id, { minute: context.incident.currentMinute });
				const cls = report.incidentClassification;
				const answer = `[INCIDENT CLASSIFICATION: ${report.severity} SEVERITY]\n• Incident Type: ${cls.incidentType}\n• Initial Access Vector: ${cls.initialAccessVector}\n• Primary Identity: ${cls.primaryCompromisedIdentity}\n• Beachhead Endpoint: ${cls.initialCompromisedEndpoint}\n• Lateral Traversal: ${cls.lateralMovement}\n• Data Tier Impact: ${cls.dataAccess}\n• Detection Mechanism: ${cls.detectionMethod}\n\nSEVERITY RATIONALE: Classified as CRITICAL because the adversary successfully bridged from the endpoint tier to production customer database DB-PROD-01 (DATA-CUST-VAULT) prior to formal containment.`;
				return {
					id: `iris-ans-${Date.now()}`,
					answer,
					findings: [{
						id: `f-cls-${Date.now()}`,
						type: "RISK",
						title: `Severity Classification: ${report.severity}`,
						summary: `Customer database tables reached via lateral movement.`,
						confidence: "HIGH",
						citations: report.citations.slice(0, 3)
					}],
					citations: report.citations.slice(0, 3),
					suggestedQuestions: [
						"Summarize this incident.",
						"What did this response prevent?",
						"What was the biggest detection gap?"
					],
					generatedAt,
					intentCategory: intent,
					worldPerspective: "ACTUAL"
				};
			}
			default: return {
				id: `iris-ans-${Date.now()}`,
				answer: "I don't have enough structured evidence in the current incident dataset to answer that reliably. Please ask about incident chronology, known state vs actual reality, attack path traversal, detection gaps, or counterfactual simulations.",
				findings: [],
				citations: [],
				suggestedQuestions,
				generatedAt,
				intentCategory: "UNKNOWN",
				worldPerspective: "MIXED"
			};
		}
	}
};
/**
* Helper to safely read configuration from Vite env, Node process.env, or browser storage.
*/
function getRuntimeConfig(key) {
	if (typeof import.meta !== "undefined" && {
		"BASE_URL": "/",
		"DEV": false,
		"MODE": "production",
		"PROD": true,
		"SSR": true,
		"TSS_DEV_SERVER": "false",
		"TSS_DEV_SSR_STYLES_BASEPATH": "/",
		"TSS_DEV_SSR_STYLES_ENABLED": "true",
		"TSS_DISABLE_CSRF_MIDDLEWARE_WARNING": "false",
		"TSS_INLINE_CSS_ENABLED": "false",
		"TSS_ROUTER_BASEPATH": "",
		"TSS_SERVER_FN_BASE": "/_serverFn/"
	}[key]) return String({
		"BASE_URL": "/",
		"DEV": false,
		"MODE": "production",
		"PROD": true,
		"SSR": true,
		"TSS_DEV_SERVER": "false",
		"TSS_DEV_SSR_STYLES_BASEPATH": "/",
		"TSS_DEV_SSR_STYLES_ENABLED": "true",
		"TSS_DISABLE_CSRF_MIDDLEWARE_WARNING": "false",
		"TSS_INLINE_CSS_ENABLED": "false",
		"TSS_ROUTER_BASEPATH": "",
		"TSS_SERVER_FN_BASE": "/_serverFn/"
	}[key]).trim();
	if (typeof process !== "undefined" && process.env && process.env[key]) return String(process.env[key]).trim();
	if (typeof window !== "undefined" && window.localStorage) try {
		const val = window.localStorage.getItem(key.toLowerCase());
		if (val) return val.trim();
	} catch {}
	return "";
}
/**
* Grounded ElevenLabs IRIS Provider (Requirement 2 & 3).
*
* Implements the IrisProvider interface by wrapping DeterministicIrisProvider:
* 1. Executes the deterministic engine FIRST as the sole source of cybersecurity truth.
* 2. Compiles a strictly bounded grounding payload containing verified facts, findings, and citations.
* 3. Optionally asks an explicitly supplied requester to formulate a conversational explanation.
* 4. Strictly preserves all deterministic findings, citations, perspective, and confidence.
* 5. If ElevenLabs is unconfigured, offline, or errors, falls back to the deterministic response seamlessly.
*/
var ElevenLabsIrisProvider = class {
	deterministic;
	apiKey;
	agentId;
	baseUrl;
	modelId;
	timeoutMs;
	requester;
	constructor(options) {
		this.deterministic = options?.deterministicProvider ?? new DeterministicIrisProvider();
		this.apiKey = options?.apiKey ?? "";
		this.agentId = options?.agentId ?? (getRuntimeConfig("VITE_ELEVENLABS_AGENT_ID") || "agent_8601m3q0xaarfcb9kcf8683hrxxj");
		this.baseUrl = options?.baseUrl ?? (getRuntimeConfig("VITE_ELEVENLABS_BASE_URL") || "https://api.elevenlabs.io");
		this.modelId = options?.modelId ?? getRuntimeConfig("VITE_ELEVENLABS_MODEL_ID");
		this.timeoutMs = options?.timeoutMs ?? 8e3;
		this.requester = options?.requester;
	}
	/**
	* Returns true only when an API key and explicit requester are both supplied.
	*/
	isConfigured() {
		return Boolean(this.apiKey && this.apiKey.trim().length > 0 && this.requester);
	}
	/**
	* Runtime configuration mutators for user-configured credentials (e.g. from Settings).
	*/
	setApiKey(key) {
		this.apiKey = key.trim();
	}
	setAgentId(id) {
		this.agentId = id.trim();
	}
	getDeterministicProvider() {
		return this.deterministic;
	}
	/**
	* Compiles the strict anti-hallucination grounding prompt from deterministic facts.
	*/
	buildGroundedPrompt(question, deterministic, context) {
		const structuredFacts = {
			incidentId: context.incident.id,
			currentTime: context.incident.currentTime,
			stage: context.incident.stage,
			currentRisk: context.incident.currentRisk,
			worldPerspective: deterministic.worldPerspective,
			intentCategory: deterministic.intentCategory,
			findingsCount: deterministic.findings.length,
			citationsCount: deterministic.citations.length,
			findings: deterministic.findings.map((f) => ({
				type: f.type,
				title: f.title,
				summary: f.summary,
				confidence: f.confidence
			})),
			citations: deterministic.citations.map((c) => ({
				type: c.type,
				label: c.label,
				timestamp: c.timestamp,
				sourceId: c.sourceId
			})),
			verifiedEngineAnswer: deterministic.answer
		};
		return {
			systemPrompt: [
				"You are IRIS (Intelligent Response & Investigation System), an expert cybersecurity incident responder.",
				"Your objective is to deliver a clear, articulate, and natural conversational briefing to a security analyst based strictly on the verified incident state below.",
				"",
				"CRITICAL GROUNDING AND ANTI-HALLUCINATION RULES:",
				"1. You are an EXPLANATION layer, NOT an investigative calculation engine.",
				"2. The VERIFIED ENGINE NARRATIVE, FINDINGS, and CITATIONS provided below are the sole, immutable source of truth.",
				"3. NEVER invent, extrapolate, or hallucinate: timeline events, timestamps, IP addresses, asset names, hostnames, CVE numbers, compromised accounts, detection gaps, risk levels, or counterfactual outcomes.",
				"4. STRICT PERSPECTIVE PRESERVATION: If perspective is ACTUAL, only reference actual history. If KNOWN_AT_TIME, describe only what the defenders knew. If COUNTERFACTUAL, make it explicit that this is an alternate simulated branch and did not occur in real history.",
				"5. Explain the verified findings clearly, professionally, and naturally without altering any underlying metrics or facts."
			].join("\n"),
			userPrompt: [
				`ANALYST QUERY: "${question}"`,
				"",
				`INCIDENT RECONSTRUCTION CONTEXT:`,
				`- Incident ID: ${structuredFacts.incidentId}`,
				`- Simulation Time: ${structuredFacts.currentTime}`,
				`- Current Risk Level: ${structuredFacts.currentRisk}`,
				`- Incident Stage: ${structuredFacts.stage}`,
				`- World Perspective: [${structuredFacts.worldPerspective}]`,
				`- Intent Category: ${structuredFacts.intentCategory}`,
				"",
				`VERIFIED ENGINE FINDINGS (${structuredFacts.findingsCount}):`,
				structuredFacts.findings.length > 0 ? structuredFacts.findings.map((f) => `• [${f.confidence} CONFIDENCE - ${f.type}] ${f.title}: ${f.summary}`).join("\n") : "• (No individual findings flagged)",
				"",
				`VERIFIED EVIDENCE & CITATIONS (${structuredFacts.citationsCount}):`,
				structuredFacts.citations.length > 0 ? structuredFacts.citations.map((c) => `• [${c.type}] ${c.label}${c.timestamp ? ` (Timestamp: ${c.timestamp})` : ""}`).join("\n") : "• (No specific citations)",
				"",
				`VERIFIED ENGINE NARRATIVE (GROUND TRUTH):`,
				`"""`,
				structuredFacts.verifiedEngineAnswer,
				`"""`,
				"",
				`TASK: Deliver a natural, professional conversational explanation answering the analyst's query based strictly on the verified facts above. Do NOT invent new facts.`
			].join("\n"),
			structuredFacts
		};
	}
	/**
	* Primary answer method implementing IrisProvider.
	*
	* 1. Evaluates DeterministicIrisProvider first.
	* 2. If ElevenLabs is unconfigured, offline, or errors: returns deterministic response unchanged.
	* 3. If ElevenLabs succeeds: updates the answer narrative while preserving all structured findings and citations.
	*/
	async answer(question, context) {
		const deterministicResponse = await this.deterministic.answer(question, context);
		if (!this.isConfigured() || !this.requester) return deterministicResponse;
		const groundedPayload = this.buildGroundedPrompt(question, deterministicResponse, context);
		if (typeof window !== "undefined") elevenLabsAgentService.sendGroundedContext(groundedPayload.structuredFacts);
		try {
			const naturalExplanation = await this.requester(groundedPayload, {
				apiKey: this.apiKey,
				agentId: this.agentId,
				baseUrl: this.baseUrl,
				modelId: this.modelId,
				timeoutMs: this.timeoutMs
			});
			if (!naturalExplanation || !naturalExplanation.trim()) return deterministicResponse;
			return {
				...deterministicResponse,
				answer: naturalExplanation.trim(),
				findings: deterministicResponse.findings,
				citations: deterministicResponse.citations,
				worldPerspective: deterministicResponse.worldPerspective,
				intentCategory: deterministicResponse.intentCategory,
				suggestedQuestions: deterministicResponse.suggestedQuestions
			};
		} catch (err) {
			console.warn("[ElevenLabsIrisProvider] Conversational synthesis failed or timed out. Falling back to deterministic engine response.", err instanceof Error ? err.message : err);
			return deterministicResponse;
		}
	}
};
/**
* Builds a strictly READ-ONLY investigation context snapshot for IRIS (Requirement 5 & 6).
* Never mutates simulation clock, Digital Twin, or incident state.
*/
function buildIrisContext({ incidentId = "INC-2048", currentMinute, counterfactualBranch = null, scenarioHistory = [] }) {
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
			currentRisk: actualState.riskLevel
		},
		actualState,
		knownSecurityState,
		attackGraph,
		timeline: demoTimelineEvents,
		evidence: actualState.evidence,
		counterfactualBranch,
		scenarioHistory
	};
}
var IrisService = class {
	provider;
	constructor(provider) {
		this.provider = provider ?? new ElevenLabsIrisProvider();
	}
	setProvider(provider) {
		this.provider = provider;
	}
	getProvider() {
		return this.provider;
	}
	/**
	* Builds an isolated, read-only IrisContext from central simulation state.
	*/
	createContext(currentMinute, counterfactualBranch, scenarioHistory, incidentId = "INC-2048") {
		return buildIrisContext({
			incidentId,
			currentMinute,
			counterfactualBranch,
			scenarioHistory
		});
	}
	/**
	* Answers an analyst question using the active provider.
	*/
	async ask(question, context) {
		if (!question || !question.trim()) return {
			id: `iris-err-${Date.now()}`,
			answer: "Please enter an investigation question about the incident, attack path, or counterfactual response.",
			findings: [],
			citations: [],
			suggestedQuestions: [
				"What happened?",
				"What did we know at 10:04?",
				"What did we miss?",
				"What if we isolate LAPTOP-042?"
			],
			generatedAt: (/* @__PURE__ */ new Date()).toISOString(),
			intentCategory: "UNKNOWN",
			worldPerspective: "MIXED"
		};
		return this.provider.answer(question.trim(), context);
	}
};
var irisService = new IrisService();
//#endregion
export { irisService as t };
