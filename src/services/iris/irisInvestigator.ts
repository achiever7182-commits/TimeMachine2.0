import { findEarliestDetectableOpportunity } from "./detectionGapService";
import { classifyIrisIntent, getContextualSuggestedQuestions } from "./irisQuestions";
import {
  simulateCounterfactualFuture,
  getStandardResponseActions,
} from "../counterfactualService";
import {
  explainKnownVsActual,
  explainDetectionGap,
  explainWhyAssetProtected,
  explainCounterfactualPrevention,
} from "./irisExplainability";
import { responseIntelligenceService } from "./responseIntelligenceService";
import { incidentReportService } from "../report/incidentReportService";
import type {
  IrisCitation,
  IrisContext,
  IrisFinding,
  IrisProvider,
  IrisResponse,
} from "@/types/iris";

/**
 * Deterministic IRIS Investigation Provider (Requirement 8 & 9).
 * Grounded strictly in structured incident state, Digital Twin, Attack Graph, and Counterfactual data.
 * Zero external LLM requirement, zero hallucination.
 */
export class DeterministicIrisProvider implements IrisProvider {
  async answer(question: string, context: IrisContext): Promise<IrisResponse> {
    const intent = classifyIrisIntent(question);
    const suggestedQuestions = getContextualSuggestedQuestions(context);
    const timestamp = context.incident.currentTime;
    const generatedAt = new Date().toISOString();

    switch (intent) {
      case "WHAT_HAPPENED": {
        const events = context.actualState.completedEvents.concat(context.actualState.activeEvents);
        const citations: IrisCitation[] = events.map((e) => ({
          id: `cit-${e.id}`,
          type: "TIMELINE_EVENT",
          label: `${e.timestamp} ${e.title}`,
          sourceId: e.id,
          timestamp: e.timestamp,
          minute: e.minute,
        }));

        const answer =
          `[ACTUAL REALITY at ${timestamp}]\n` +
          `Incident ${context.incident.id} involves an unauthorized intrusion into ACME Corporation. ` +
          `The progression observed up to ${timestamp}:\n` +
          events.map((e) => `• [${e.timestamp}] ${e.title}: ${e.description}`).join("\n") +
          `\n\nCurrent stage is ${context.incident.stage} with ${context.actualState.compromisedAssets.length} confirmed compromised assets.`;

        const findings: IrisFinding[] = [
          {
            id: "f-summary",
            type: "TIMELINE",
            title: `Incident Progression at ${timestamp}`,
            summary: `${events.length} chronological milestones reconstructed up to ${timestamp}.`,
            confidence: "HIGH",
            citations: citations.slice(0, 4),
          },
        ];

        return {
          id: `iris-ans-${Date.now()}`,
          answer,
          findings,
          citations,
          suggestedQuestions,
          generatedAt,
          intentCategory: intent,
          worldPerspective: "ACTUAL",
        };
      }

      case "ATTACK_START": {
        const earliestSuspicious = "09:42";
        const earliestOpportunity = "09:47";
        const firstCompromise = "10:00";
        const formalDetection = "10:24";

        const citations: IrisCitation[] = [
          { id: "cit-0942", type: "TIMELINE_EVENT", label: "09:42 Unusual Authentication", sourceId: "evt-0942", timestamp: "09:42" },
          { id: "cit-0947", type: "TIMELINE_EVENT", label: "09:47 First Detection Opportunity", sourceId: "evt-0947", timestamp: "09:47" },
          { id: "cit-1000", type: "TIMELINE_EVENT", label: "10:00 Account Compromised", sourceId: "evt-1000", timestamp: "10:00" },
          { id: "cit-1024", type: "TIMELINE_EVENT", label: "10:24 Incident Detected", sourceId: "evt-1024", timestamp: "10:24" },
        ];

        const answer =
          `[ACTUAL CHRONOLOGY]\n` +
          `To understand when the attack began, we must distinguish between four distinct milestones:\n` +
          `1. Earliest Suspicious Activity: ${earliestSuspicious} — Initial unrecognized foreign IP authentication attempt via VPN-GW-01.\n` +
          `2. Earliest Detectable Opportunity: ${earliestOpportunity} — Anomalous velocity, unfamiliar ASN, and push-fatigue failures formed a high-confidence alert.\n` +
          `3. First Confirmed Compromise: ${firstCompromise} — Attacker opened an interactive remote desktop session on LAPTOP-042 using alex.m credentials.\n` +
          `4. Formal Incident Detection: ${formalDetection} — Security SIEM correlation triggered CR-8812 and alerted SOC analysts.\n\n` +
          `The attack really began at ${earliestSuspicious}, with actionable defense opportunity present at ${earliestOpportunity}.`;

        return {
          id: `iris-ans-${Date.now()}`,
          answer,
          findings: [
            {
              id: "f-start",
              type: "TIMELINE",
              title: "Attack Origin & Detection Milestones",
              summary: `Earliest probe at ${earliestSuspicious}; first actionable detection opportunity at ${earliestOpportunity}.`,
              confidence: "HIGH",
              citations,
            },
          ],
          citations,
          suggestedQuestions,
          generatedAt,
          intentCategory: intent,
          worldPerspective: "ACTUAL",
        };
      }

      case "KNOWN_STATE": {
        const minute = context.incident.currentMinute;
        const actualAssets = context.actualState.compromisedAssets;
        const knownAssets = context.knownSecurityState.assets
          .filter((a) => a.status === "COMPROMISED")
          .map((a) => a.id);

        const unknownToSocAssets = actualAssets.filter((id) => !knownAssets.includes(id));

        const citations: IrisCitation[] = [
          { id: "cit-known-snap", type: "SNAPSHOT", label: `SOC Known State at ${timestamp}`, timestamp },
        ];

        const answer = explainKnownVsActual(actualAssets, knownAssets, minute, timestamp);

        return {
          id: `iris-ans-${Date.now()}`,
          answer,
          findings: [
            {
              id: "f-known",
              type: "DETECTION_GAP",
              title: `Defenders' Perspective at ${timestamp}`,
              summary: `SOC known state at ${timestamp} tracked ${knownAssets.length} compromises vs ${actualAssets.length} actual compromised systems.`,
              confidence: "HIGH",
              citations,
            },
          ],
          citations,
          suggestedQuestions,
          generatedAt,
          intentCategory: intent,
          worldPerspective: "KNOWN_AT_TIME",
        };
      }

      case "ATTACK_PATH": {
        const path = context.attackGraph.activePath?.nodeIds ?? ["ATTACKER", "ALEX_ACCOUNT", "LAPTOP-042"];
        const edges = context.attackGraph.edges;
        const citations: IrisCitation[] = edges.map((e) => ({
          id: `cit-${e.id}`,
          type: "ATTACK_EDGE",
          label: `${e.source} → ${e.target} (${e.relationshipType})`,
          sourceId: e.id,
          timestamp: e.firstSeen,
        }));

        let answer = `[ATTACK GRAPH TRAVERSAL at ${timestamp}]\n`;
        if (path.length <= 2) {
          answer += `The attacker has only penetrated the identity tier (ATTACKER → alex.m). Endpoint LAPTOP-042 is not yet compromised at ${timestamp}.`;
        } else {
          answer +=
            `The attacker reached downstream assets via the following reconstructed causal sequence:\n` +
            path.map((node, i) => `${i + 1}. ${node}`).join(" → ") +
            `\n\nTraversal Details:\n` +
            edges.map((e) => `• [${e.firstSeen}] ${e.source} ${e.relationshipType.replace(/_/g, " ").toLowerCase()} ${e.target} via technique ${e.techniqueCategory}`).join("\n");
        }

        return {
          id: `iris-ans-${Date.now()}`,
          answer,
          findings: [
            {
              id: "f-path",
              type: "ATTACK_PATH",
              title: "Observed Attack Path & Lateral Pivot",
              summary: `Kill chain sequence: ${path.join(" → ")}.`,
              confidence: "HIGH",
              citations,
            },
          ],
          citations,
          suggestedQuestions,
          generatedAt,
          intentCategory: intent,
          worldPerspective: "ACTUAL",
        };
      }

      case "COMPROMISED_ASSETS": {
        const assets = context.actualState.assets.filter((a) => a.status === "COMPROMISED");
        const citations: IrisCitation[] = assets.map((a) => ({
          id: `cit-${a.id}`,
          type: "ASSET",
          label: `${a.id} (${a.name})`,
          sourceId: a.id,
        }));

        const answer =
          `[COMPROMISED ASSETS at ${timestamp}]\n` +
          `Reconstructed Digital Twin state identifies ${assets.length} compromised assets at ${timestamp}:\n` +
          assets
            .map(
              (a) =>
                `• ${a.id} (${a.name}): Criticality ${a.criticality}, Compromise Time: ${a.compromiseTime ?? a.firstSeen}, Owner: ${a.owner}`
            )
            .join("\n") +
          `\n\nPotentially affected/monitored assets: ${context.actualState.blastRadius.potentiallyAffectedAssets}.`;

        return {
          id: `iris-ans-${Date.now()}`,
          answer,
          findings: [
            {
              id: "f-assets",
              type: "ASSET",
              title: `Compromised Assets Count: ${assets.length}`,
              summary: `${assets.map((a) => a.id).join(", ") || "No compromised assets at this time."}`,
              confidence: "HIGH",
              citations,
            },
          ],
          citations,
          suggestedQuestions,
          generatedAt,
          intentCategory: intent,
          worldPerspective: "ACTUAL",
        };
      }

      case "DETECTION_GAP": {
        const gap = findEarliestDetectableOpportunity();
        const citations: IrisCitation[] = [
          { id: "cit-gap-opp", type: "TIMELINE_EVENT", label: `${gap.timestamp} First Detection Opportunity`, timestamp: gap.timestamp },
          { id: "cit-gap-alert", type: "TIMELINE_EVENT", label: `${gap.formalDetectionTimestamp} Formal Incident Detection`, timestamp: gap.formalDetectionTimestamp },
        ];

        const answer = explainDetectionGap(gap);

        return {
          id: `iris-ans-${Date.now()}`,
          answer,
          findings: [
            {
              id: "f-gap",
              type: "DETECTION_GAP",
              title: `Detection Delay: ${gap.detectionDelayMinutes} Minutes`,
              summary: `Actionable evidence existed at ${gap.timestamp}, 37 minutes prior to formal SIEM declaration at ${gap.formalDetectionTimestamp}.`,
              confidence: "HIGH",
              citations,
            },
          ],
          citations,
          suggestedQuestions,
          generatedAt,
          intentCategory: intent,
          worldPerspective: "ACTUAL",
        };
      }

      case "CURRENT_RISK": {
        const br = context.actualState.blastRadius;
        const citations: IrisCitation[] = [
          { id: "cit-risk", type: "RISK_STATE", label: `Risk: ${context.incident.currentRisk} (${context.incident.stage})`, timestamp },
        ];

        const answer =
          `[CURRENT RISK & IMPACT ASSESSMENT at ${timestamp}]\n` +
          `• Overall Risk Level: ${context.incident.currentRisk}\n` +
          `• Incident Stage: ${context.incident.stage}\n` +
          `• Confirmed Compromised Assets: ${br.confirmedAffectedAssets}\n` +
          `• Critical Infrastructure Impacted: ${br.criticalAssetsAffected}\n` +
          `• Data Resources at Risk: ${br.dataResourcesAtRisk} (Customer records & sensitive file shares)\n` +
          `• Compromised Identities: ${br.usersAffected} (alex.m)`;

        return {
          id: `iris-ans-${Date.now()}`,
          answer,
          findings: [
            {
              id: "f-risk",
              type: "RISK",
              title: `Risk Assessment: ${context.incident.currentRisk}`,
              summary: `${br.confirmedAffectedAssets} assets compromised, ${br.criticalAssetsAffected} critical assets impacted.`,
              confidence: "HIGH",
              citations,
            },
          ],
          citations,
          suggestedQuestions,
          generatedAt,
          intentCategory: intent,
          worldPerspective: "ACTUAL",
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
        if (targetAction) {
          branch = simulateCounterfactualFuture(boundedMin, targetAction, context.incident.id);
        } else if (!branch) {
          branch = simulateCounterfactualFuture(
            22,
            standardActions.find((a) => a.type === "ISOLATE_ENDPOINT") || standardActions[1]
          );
        }

        const comp = branch.comparison;
        const citations: IrisCitation[] = comp.preventedEvents.map((p) => ({
          id: `cit-cf-${p.eventId}`,
          type: "COUNTERFACTUAL_EVENT",
          label: `[PREVENTED] ${p.originalTime} ${p.title}`,
          sourceId: p.eventId,
          timestamp: p.originalTime,
        }));

        const actionIntro =
          branch.action.type === "DO_NOTHING"
            ? `If defenders take no action (DO NOTHING) at ${branch.baseTimestamp}, the attacker freely leverages LAPTOP-042 to traverse into the corporate core:`
            : `If ${branch.action.label} is executed at ${branch.baseTimestamp}, the deterministic simulation engine proves:`;

        const preventedSection =
          comp.preventedCount > 0
            ? `1. PREVENTED ATTACK TRANSITIONS (${comp.preventedCount}):\n` +
              comp.preventedEvents.map((p) => `• [${p.originalTime}] ${p.title}: ${p.reason}`).join("\n")
            : `1. PREVENTED ATTACK TRANSITIONS: None (0 attack steps prevented).`;

        const answer =
          `[COUNTERFACTUAL SIMULATION: ${branch.action.label} at ${branch.baseTimestamp}]\n` +
          `${actionIntro}\n\n` +
          `${preventedSection}\n\n` +
          `2. MEASURABLE IMPACT COMPARISON:\n` +
          `• Final Risk: ${comp.baselineFinalRisk} (ACTUAL) → ${comp.counterfactualFinalRisk} (COUNTERFACTUAL)\n` +
          `• Compromised Assets: ${comp.baselineCompromisedAssets.length} (ACTUAL) → ${comp.counterfactualCompromisedAssets.length} (COUNTERFACTUAL) [Saved: ${comp.preventedCompromises.join(", ") || "None"}]\n` +
          `• Critical Assets Impacted: ${comp.baselineCriticalAssets.length} → ${comp.counterfactualCriticalAssets.length} [Protected: ${comp.preventedCriticalImpact.join(", ") || "None"}]\n` +
          `• Exposed Data Stores: ${comp.baselineDataResourcesAtRisk} → ${comp.counterfactualDataResourcesAtRisk} (${comp.preventedDataExposure > 0 ? "Customer Data Protected" : "Exposed in Both"})\n\n` +
          `IMPORTANT: The actual incident remains completely unchanged in historical truth. This is an isolated alternate future.`;

        return {
          id: `iris-ans-${Date.now()}`,
          answer,
          findings: [
            {
              id: "f-cf",
              type: "COUNTERFACTUAL",
              title: `Simulated Response Impact: ${comp.riskChange} Risk`,
              summary: `${comp.preventedCount} attack steps prevented, shielding ${comp.preventedCompromises.length} downstream servers.`,
              confidence: "HIGH",
              citations,
            },
          ],
          citations,
          suggestedQuestions,
          generatedAt,
          intentCategory: intent,
          worldPerspective: "COUNTERFACTUAL",
        };
      }

      case "EVIDENCE": {
        const evList = context.actualState.evidence;
        const citations: IrisCitation[] = evList.map((e) => ({
          id: `cit-${e.id}`,
          type: "EVIDENCE",
          label: `[${e.timestamp}] ${e.title}`,
          sourceId: e.id,
          timestamp: e.timestamp,
        }));

        const answer =
          `[FORENSIC EVIDENCE INVENTORY at ${timestamp}]\n` +
          `The reconstructed timeline contains ${evList.length} supporting evidence artifacts at ${timestamp}:\n` +
          evList.map((e) => `• [${e.timestamp}] ${e.id} (${e.type}): ${e.title} — ${e.content}`).join("\n");

        return {
          id: `iris-ans-${Date.now()}`,
          answer,
          findings: [
            {
              id: "f-ev",
              type: "EVIDENCE",
              title: `Evidence Artifacts: ${evList.length}`,
              summary: `${evList.map((e) => e.id).join(", ")}`,
              confidence: "HIGH",
              citations,
            },
          ],
          citations,
          suggestedQuestions,
          generatedAt,
          intentCategory: intent,
          worldPerspective: "ACTUAL",
        };
      }

      case "NEXT_INVESTIGATION": {
        const answer =
          `[RECOMMENDED INVESTIGATION ACTIONS]\n` +
          `Based on current reconstructed state at ${timestamp}:\n` +
          `1. Inspect the 09:47 authentication anomaly in the Forensic Timeline.\n` +
          `2. Analyze the 10:04 encoded PowerShell telemetry on LAPTOP-042.\n` +
          `3. Trace the lateral movement edge LAPTOP-042 → SERVER-03 in the Attack Graph.\n` +
          `4. Open the Simulation Lab to model isolating LAPTOP-042 at 10:04.`;

        return {
          id: `iris-ans-${Date.now()}`,
          answer,
          findings: [
            {
              id: "f-next",
              type: "INVESTIGATION",
              title: "Analyst Next Steps",
              summary: "Recommended focus on 09:47 IdP signals and 10:04 endpoint isolation.",
              confidence: "HIGH",
              citations: [],
            },
          ],
          citations: [],
          suggestedQuestions,
          generatedAt,
          intentCategory: intent,
          worldPerspective: "ACTUAL",
        };
      }

      case "RESPONSE_RECOMMENDATION": {
        const rec = responseIntelligenceService.generateRecommendation(
          context.incident.currentMinute,
          context.incident.id
        );
        const answer = responseIntelligenceService.formatRecommendationAnswer(rec);

        const findings: IrisFinding[] = [
          {
            id: `f-rec-${rec.id}`,
            type: "COUNTERFACTUAL",
            title: `IRIS Recommendation: ${rec.recommendedAction.label}`,
            summary: `${rec.expectedImpact} (Optimization Score: ${rec.score} pts)`,
            confidence: rec.confidence,
            citations: rec.evidence,
          },
        ];

        return {
          id: `iris-ans-${Date.now()}`,
          answer,
          findings,
          citations: rec.evidence,
          suggestedQuestions: [
            "Why do you recommend this response?",
            "Compare the available response options.",
            "Simulate your recommended response.",
            "What did this response prevent?",
          ],
          generatedAt,
          intentCategory: intent,
          worldPerspective: "COUNTERFACTUAL",
        };
      }

      case "RESPONSE_COMPARISON": {
        const candidates = responseIntelligenceService.evaluateCandidates(
          context.incident.currentMinute,
          context.incident.id
        );
        const answer = responseIntelligenceService.formatComparisonAnswer(candidates);
        const citations: IrisCitation[] = candidates
          .flatMap((c) => c.preventedEvents)
          .slice(0, 4)
          .map((pe) => ({
            id: `cit-cmp-${pe.eventId}`,
            type: "COUNTERFACTUAL_EVENT",
            label: `[PREVENTED] ${pe.originalTime} ${pe.title}`,
            sourceId: pe.eventId,
            timestamp: pe.originalTime,
          }));

        return {
          id: `iris-ans-${Date.now()}`,
          answer,
          findings: [
            {
              id: `f-cmp-${Date.now()}`,
              type: "COUNTERFACTUAL",
              title: "Multi-Action Counterfactual Comparison",
              summary: `Evaluated ${candidates.length} proactive response candidates via Phase 4 simulation.`,
              confidence: "HIGH",
              citations,
            },
          ],
          citations,
          suggestedQuestions: [
            "What response do you recommend?",
            "Why do you recommend this response?",
            "Simulate your recommended response.",
          ],
          generatedAt,
          intentCategory: intent,
          worldPerspective: "COUNTERFACTUAL",
        };
      }

      case "RESPONSE_EXPLANATION": {
        const rec = responseIntelligenceService.generateRecommendation(
          context.incident.currentMinute,
          context.incident.id
        );

        const answer =
          `[IRIS DECISION EXPLANATION & CONFIDENCE BASIS]\n` +
          `• Recommended Action: ${rec.recommendedAction.label}\n` +
          `• Assessed Confidence: ${rec.confidence}\n` +
          `• Decision Basis: ${rec.decisionBasis}\n\n` +
          `WHY THIS ACTION WAS CHOSEN OVER ALTERNATIVES:\n` +
          rec.alternatives
            .map(
              (alt) =>
                `• ${alt.action.label} (Score: ${alt.score} vs ${rec.score}): ${
                  alt.score < rec.score
                    ? "Sub-optimal protection. Allows greater downstream damage or has narrower containment scope."
                    : "Comparable containment but higher administrative overhead."
                }`
            )
            .join("\n") +
          `\n\n` +
          `CONFIDENCE DERIVATION:\n` +
          `Confidence is assessed as ${rec.confidence} because the deterministic Phase 4 simulation confirmed direct causal interruption of the lateral pivot path.\n\n` +
          `SAFETY NOTICE: SIMULATION ONLY. No real-world endpoint or infrastructure actions were executed.`;

        return {
          id: `iris-ans-${Date.now()}`,
          answer,
          findings: [
            {
              id: `f-expl-${Date.now()}`,
              type: "INVESTIGATION",
              title: `Decision Explanation: ${rec.confidence} Confidence`,
              summary: rec.decisionBasis,
              confidence: rec.confidence,
              citations: rec.evidence,
            },
          ],
          citations: rec.evidence,
          suggestedQuestions: [
            "Simulate your recommended response.",
            "Compare the available response options.",
            "What did this response prevent?",
          ],
          generatedAt,
          intentCategory: intent,
          worldPerspective: "COUNTERFACTUAL",
        };
      }

      case "AUTO_SIMULATE_INTENT": {
        const { decision, branch, candidate, recommendation } =
          responseIntelligenceService.autoSimulate(
            context.incident.currentMinute,
            context.incident.id
          );

        const answer =
          `[AUTONOMOUS SIMULATED RESPONSE EXECUTED]\n` +
          `Status: SIMULATION COMPLETED | Mode: AUTO_SIMULATE | Timestamp: ${decision.timestamp}\n\n` +
          `IRIS autonomously evaluated response candidates and executed the optimal response inside the synthetic incident model:\n` +
          `• Selected Action: ${decision.selectedAction.label}\n` +
          `• Target: ${decision.target}\n` +
          `• Simulated Branch ID: ${decision.branchId}\n\n` +
          `MEASURABLE SIMULATED IMPACT:\n` +
          `• Prevented Events: ${branch.comparison.preventedCount} attack stages\n` +
          `• Protected Assets: ${branch.comparison.preventedCompromises.join(", ") || "None"}\n` +
          `• Final Simulated Risk: ${branch.comparison.baselineFinalRisk} → ${branch.comparison.counterfactualFinalRisk}\n\n` +
          `CRITICAL SAFETY NOTICE: SIMULATION ONLY. This action was autonomously executed strictly within the synthetic incident sandbox. No real endpoints, networks, or user accounts were modified.`;

        const citations: IrisCitation[] = branch.comparison.preventedEvents.map((pe) => ({
          id: `cit-auto-${pe.eventId}`,
          type: "COUNTERFACTUAL_EVENT",
          label: `[PREVENTED] ${pe.originalTime} ${pe.title}`,
          sourceId: pe.eventId,
          timestamp: pe.originalTime,
        }));

        return {
          id: `iris-ans-${Date.now()}`,
          answer,
          findings: [
            {
              id: `f-auto-${Date.now()}`,
              type: "COUNTERFACTUAL",
              title: `Autonomous Response: ${decision.selectedAction.label}`,
              summary: `${branch.comparison.preventedCount} attack stages averted in synthetic sandbox.`,
              confidence: recommendation.confidence,
              citations,
            },
          ],
          citations,
          suggestedQuestions: [
            "What did this response prevent?",
            "Compare the actual future with the counterfactual future.",
            "Why was SERVER-03 not reached in the counterfactual?",
          ],
          generatedAt,
          intentCategory: intent,
          worldPerspective: "COUNTERFACTUAL",
        };
      }

      case "REPORT_SUMMARY": {
        const report = incidentReportService.generateIncidentReport(context.incident.id, {
          minute: context.incident.currentMinute,
        });

        const answer =
          `[INCIDENT EXECUTIVE SUMMARY — ${report.incidentId}]\n` +
          `Title: ${report.title} | Severity: ${report.severity} | Organization: ${report.organization}\n` +
          `Attack Window: ${report.incidentStart} → ${report.formalDetection} (Earliest Opportunity: ${report.firstDetectableOpportunity})\n\n` +
          `${report.executiveSummary}\n\n` +
          `KEY OUTCOME COMPARISON:\n` +
          `• Actual: ${report.actualImpact.compromisedAssetsCount} assets compromised, ${report.actualImpact.dataResourcesAffected.length} data resources exposed, CRITICAL final risk.\n` +
          `• Simulated Containment: ${report.counterfactualAnalysis.recommendedAction.label} prevents ${report.counterfactualAnalysis.preventedEvents.length} stages, saving ${report.counterfactualAnalysis.protectedAssets.join(", ")}.\n\n` +
          `SIMULATION ONLY: Derived from synthetic incident model telemetry.`;

        const citations = report.citations.slice(0, 5);

        return {
          id: `iris-ans-${Date.now()}`,
          answer,
          findings: [
            {
              id: `f-rep-${Date.now()}`,
              type: "INVESTIGATION",
              title: "Incident Resolution Report Summary",
              summary: `${report.actualImpact.compromisedAssetsCount} assets affected, 37-minute detection gap.`,
              confidence: "HIGH",
              citations,
            },
          ],
          citations,
          suggestedQuestions: [
            "What was the biggest detection gap?",
            "What should we change?",
            "Why was the incident classified as critical?",
            "Show me the evidence for this conclusion.",
          ],
          generatedAt,
          intentCategory: intent,
          worldPerspective: "ACTUAL",
        };
      }

      case "LESSONS_LEARNED": {
        const report = incidentReportService.generateIncidentReport(context.incident.id, {
          minute: context.incident.currentMinute,
        });

        const answer =
          `[POST-INCIDENT LESSONS LEARNED & RECOMMENDATIONS]\n` +
          `Based on INC-2048 synthetic reconstruction:\n\n` +
          report.lessonsLearned
            .map(
              (ll, idx) =>
                `${idx + 1}. [${ll.category}] ${ll.lesson}\n   • Observation: ${ll.observation}\n   • Impact if Applied: ${ll.impactIfApplied}`
            )
            .join("\n\n") +
          `\n\nCORE TAKEAWAY: Intervening at 10:04 via host isolation eliminates all downstream database and file repository compromises.`;

        return {
          id: `iris-ans-${Date.now()}`,
          answer,
          findings: [
            {
              id: `f-ll-${Date.now()}`,
              type: "INVESTIGATION",
              title: "Post-Incident Lessons Learned",
              summary: `${report.lessonsLearned.length} operational improvements identified.`,
              confidence: "HIGH",
              citations: report.citations.slice(0, 3),
            },
          ],
          citations: report.citations.slice(0, 3),
          suggestedQuestions: [
            "What was the biggest detection gap?",
            "Summarize this incident.",
            "What response prevented the most damage?",
          ],
          generatedAt,
          intentCategory: intent,
          worldPerspective: "ACTUAL",
        };
      }

      case "INCIDENT_CLASSIFICATION": {
        const report = incidentReportService.generateIncidentReport(context.incident.id, {
          minute: context.incident.currentMinute,
        });
        const cls = report.incidentClassification;

        const answer =
          `[INCIDENT CLASSIFICATION: ${report.severity} SEVERITY]\n` +
          `• Incident Type: ${cls.incidentType}\n` +
          `• Initial Access Vector: ${cls.initialAccessVector}\n` +
          `• Primary Identity: ${cls.primaryCompromisedIdentity}\n` +
          `• Beachhead Endpoint: ${cls.initialCompromisedEndpoint}\n` +
          `• Lateral Traversal: ${cls.lateralMovement}\n` +
          `• Data Tier Impact: ${cls.dataAccess}\n` +
          `• Detection Mechanism: ${cls.detectionMethod}\n\n` +
          `SEVERITY RATIONALE: Classified as CRITICAL because the adversary successfully bridged from the endpoint tier to production customer database DB-PROD-01 (DATA-CUST-VAULT) prior to formal containment.`;

        return {
          id: `iris-ans-${Date.now()}`,
          answer,
          findings: [
            {
              id: `f-cls-${Date.now()}`,
              type: "RISK",
              title: `Severity Classification: ${report.severity}`,
              summary: `Customer database tables reached via lateral movement.`,
              confidence: "HIGH",
              citations: report.citations.slice(0, 3),
            },
          ],
          citations: report.citations.slice(0, 3),
          suggestedQuestions: [
            "Summarize this incident.",
            "What did this response prevent?",
            "What was the biggest detection gap?",
          ],
          generatedAt,
          intentCategory: intent,
          worldPerspective: "ACTUAL",
        };
      }

      case "UNKNOWN":
      default: {
        return {
          id: `iris-ans-${Date.now()}`,
          answer:
            "I don't have enough structured evidence in the current incident dataset to answer that reliably. " +
            "Please ask about incident chronology, known state vs actual reality, attack path traversal, detection gaps, or counterfactual simulations.",
          findings: [],
          citations: [],
          suggestedQuestions,
          generatedAt,
          intentCategory: "UNKNOWN",
          worldPerspective: "MIXED",
        };
      }
    }
  }
}
