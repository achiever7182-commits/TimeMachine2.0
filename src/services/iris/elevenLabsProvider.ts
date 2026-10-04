import { DeterministicIrisProvider } from "./irisInvestigator";
import {
  ELEVENLABS_AGENT_ID,
  ELEVENLABS_VOICE_ID,
  ELEVENLABS_MODEL_ID,
  elevenLabsAgentService,
} from "./elevenLabsAgentService";
import type {
  IrisContext,
  IrisFinding,
  IrisCitation,
  IrisProvider,
  IrisResponse,
} from "@/types/iris";

export { ELEVENLABS_AGENT_ID, ELEVENLABS_VOICE_ID, ELEVENLABS_MODEL_ID };

/**
 * Configuration options for ElevenLabsIrisProvider.
 */
export interface ElevenLabsProviderOptions {
  /** Required only when using an explicitly supplied requester. Never read from browser environment. */
  apiKey?: string;
  /** ElevenLabs Conversational AI Agent ID. Defaults to VITE_ELEVENLABS_AGENT_ID. */
  agentId?: string;
  /** ElevenLabs base API endpoint. Defaults to https://api.elevenlabs.io */
  baseUrl?: string;
  /** ElevenLabs model ID (e.g., eleven_turbo_v2_5). */
  modelId?: string;
  /** Network timeout in milliseconds. Defaults to 8000ms. */
  timeoutMs?: number;
  /** The deterministic engine delegate. Defaults to new DeterministicIrisProvider(). */
  deterministicProvider?: IrisProvider;
  /** Optional custom API requester for testing or custom transport. */
  requester?: ElevenLabsApiRequester;
}

/**
 * Structured facts and grounding payload passed to the conversational layer.
 * Strictly derived from the deterministic engine.
 */
export interface GroundedPromptPayload {
  systemPrompt: string;
  userPrompt: string;
  structuredFacts: {
    incidentId: string;
    currentTime: string;
    stage: string;
    currentRisk: string;
    worldPerspective: "ACTUAL" | "KNOWN_AT_TIME" | "COUNTERFACTUAL" | "MIXED";
    intentCategory: string;
    findingsCount: number;
    citationsCount: number;
    findings: Array<{
      type: string;
      title: string;
      summary: string;
      confidence: string;
    }>;
    citations: Array<{
      type: string;
      label: string;
      timestamp?: string;
      sourceId?: string;
    }>;
    verifiedEngineAnswer: string;
  };
}

export type ElevenLabsApiRequester = (
  payload: GroundedPromptPayload,
  config: {
    apiKey: string;
    agentId?: string;
    baseUrl: string;
    modelId?: string;
    timeoutMs: number;
  },
) => Promise<string>;

/**
 * Helper to safely read configuration from Vite env, Node process.env, or browser storage.
 */
function getRuntimeConfig(key: string): string {
  // Vite env
  if (typeof import.meta !== "undefined" && import.meta.env && import.meta.env[key]) {
    return String(import.meta.env[key]).trim();
  }
  // Node / test process.env
  if (typeof process !== "undefined" && process.env && process.env[key]) {
    return String(process.env[key]).trim();
  }
  // Client localStorage fallback
  if (typeof window !== "undefined" && window.localStorage) {
    try {
      const val = window.localStorage.getItem(key.toLowerCase());
      if (val) return val.trim();
    } catch {
      // Storage unavailable or blocked
    }
  }
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
export class ElevenLabsIrisProvider implements IrisProvider {
  private deterministic: IrisProvider;
  private apiKey: string;
  private agentId: string;
  private baseUrl: string;
  private modelId: string;
  private timeoutMs: number;
  private requester?: ElevenLabsApiRequester;

  constructor(options?: ElevenLabsProviderOptions) {
    this.deterministic = options?.deterministicProvider ?? new DeterministicIrisProvider();
    this.apiKey = options?.apiKey ?? "";
    this.agentId =
      options?.agentId ?? (getRuntimeConfig("VITE_ELEVENLABS_AGENT_ID") || ELEVENLABS_AGENT_ID);
    this.baseUrl =
      options?.baseUrl ??
      (getRuntimeConfig("VITE_ELEVENLABS_BASE_URL") || "https://api.elevenlabs.io");
    this.modelId = options?.modelId ?? getRuntimeConfig("VITE_ELEVENLABS_MODEL_ID");
    this.timeoutMs = options?.timeoutMs ?? 8000;
    this.requester = options?.requester;
  }

  /**
   * Returns true only when an API key and explicit requester are both supplied.
   */
  isConfigured(): boolean {
    return Boolean(this.apiKey && this.apiKey.trim().length > 0 && this.requester);
  }

  /**
   * Runtime configuration mutators for user-configured credentials (e.g. from Settings).
   */
  setApiKey(key: string): void {
    this.apiKey = key.trim();
  }

  setAgentId(id: string): void {
    this.agentId = id.trim();
  }

  getDeterministicProvider(): IrisProvider {
    return this.deterministic;
  }

  /**
   * Compiles the strict anti-hallucination grounding prompt from deterministic facts.
   */
  buildGroundedPrompt(
    question: string,
    deterministic: IrisResponse,
    context: IrisContext,
  ): GroundedPromptPayload {
    const structuredFacts = {
      incidentId: context.incident.id,
      currentTime: context.incident.currentTime,
      stage: context.incident.stage,
      currentRisk: context.incident.currentRisk,
      worldPerspective: deterministic.worldPerspective,
      intentCategory: deterministic.intentCategory,
      findingsCount: deterministic.findings.length,
      citationsCount: deterministic.citations.length,
      findings: deterministic.findings.map((f: IrisFinding) => ({
        type: f.type,
        title: f.title,
        summary: f.summary,
        confidence: f.confidence,
      })),
      citations: deterministic.citations.map((c: IrisCitation) => ({
        type: c.type,
        label: c.label,
        timestamp: c.timestamp,
        sourceId: c.sourceId,
      })),
      verifiedEngineAnswer: deterministic.answer,
    };

    const systemPrompt = [
      "You are IRIS (Intelligent Response & Investigation System), an expert cybersecurity incident responder.",
      "Your objective is to deliver a clear, articulate, and natural conversational briefing to a security analyst based strictly on the verified incident state below.",
      "",
      "CRITICAL GROUNDING AND ANTI-HALLUCINATION RULES:",
      "1. You are an EXPLANATION layer, NOT an investigative calculation engine.",
      "2. The VERIFIED ENGINE NARRATIVE, FINDINGS, and CITATIONS provided below are the sole, immutable source of truth.",
      "3. NEVER invent, extrapolate, or hallucinate: timeline events, timestamps, IP addresses, asset names, hostnames, CVE numbers, compromised accounts, detection gaps, risk levels, or counterfactual outcomes.",
      "4. STRICT PERSPECTIVE PRESERVATION: If perspective is ACTUAL, only reference actual history. If KNOWN_AT_TIME, describe only what the defenders knew. If COUNTERFACTUAL, make it explicit that this is an alternate simulated branch and did not occur in real history.",
      "5. Explain the verified findings clearly, professionally, and naturally without altering any underlying metrics or facts.",
    ].join("\n");

    const userPrompt = [
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
      structuredFacts.findings.length > 0
        ? structuredFacts.findings
            .map((f) => `• [${f.confidence} CONFIDENCE - ${f.type}] ${f.title}: ${f.summary}`)
            .join("\n")
        : "• (No individual findings flagged)",
      "",
      `VERIFIED EVIDENCE & CITATIONS (${structuredFacts.citationsCount}):`,
      structuredFacts.citations.length > 0
        ? structuredFacts.citations
            .map(
              (c) => `• [${c.type}] ${c.label}${c.timestamp ? ` (Timestamp: ${c.timestamp})` : ""}`,
            )
            .join("\n")
        : "• (No specific citations)",
      "",
      `VERIFIED ENGINE NARRATIVE (GROUND TRUTH):`,
      `"""`,
      structuredFacts.verifiedEngineAnswer,
      `"""`,
      "",
      `TASK: Deliver a natural, professional conversational explanation answering the analyst's query based strictly on the verified facts above. Do NOT invent new facts.`,
    ].join("\n");

    return {
      systemPrompt,
      userPrompt,
      structuredFacts,
    };
  }

  /**
   * Primary answer method implementing IrisProvider.
   *
   * 1. Evaluates DeterministicIrisProvider first.
   * 2. If ElevenLabs is unconfigured, offline, or errors: returns deterministic response unchanged.
   * 3. If ElevenLabs succeeds: updates the answer narrative while preserving all structured findings and citations.
   */
  async answer(question: string, context: IrisContext): Promise<IrisResponse> {
    // 1. Call DeterministicIrisProvider FIRST as the sole source of truth
    const deterministicResponse = await this.deterministic.answer(question, context);

    // 2. If ElevenLabs is not configured (no API key), return deterministic response unchanged
    if (!this.isConfigured() || !this.requester) {
      return deterministicResponse;
    }

    // 3. Build strictly bounded grounding payload
    const groundedPayload = this.buildGroundedPrompt(question, deterministicResponse, context);

    // Sync verified ground truth to active ElevenLabs voice agent session
    if (typeof window !== "undefined") {
      elevenLabsAgentService.sendGroundedContext(groundedPayload.structuredFacts);
    }

    // 4. Query ElevenLabs for conversational synthesis
    try {
      const naturalExplanation = await this.requester(groundedPayload, {
        apiKey: this.apiKey,
        agentId: this.agentId,
        baseUrl: this.baseUrl,
        modelId: this.modelId,
        timeoutMs: this.timeoutMs,
      });

      if (!naturalExplanation || !naturalExplanation.trim()) {
        return deterministicResponse;
      }

      // 5. Return synthesized answer while strictly preserving all deterministic findings, citations, and metadata
      return {
        ...deterministicResponse,
        answer: naturalExplanation.trim(),
        // Explicitly preserve deterministic structured results
        findings: deterministicResponse.findings,
        citations: deterministicResponse.citations,
        worldPerspective: deterministicResponse.worldPerspective,
        intentCategory: deterministicResponse.intentCategory,
        suggestedQuestions: deterministicResponse.suggestedQuestions,
      };
    } catch (err) {
      // Graceful fallback to verified deterministic response if ElevenLabs fails
      console.warn(
        "[ElevenLabsIrisProvider] Conversational synthesis failed or timed out. Falling back to deterministic engine response.",
        err instanceof Error ? err.message : err,
      );
      return deterministicResponse;
    }
  }
}
