/**
 * ElevenLabs Conversational AI & Voice Service
 *
 * Connects the existing IRIS chatbot to the configured ElevenLabs Agent:
 * - Agent ID: agent_8601m3q0xaarfcb9kcf8683hrxxj
 * - Voice ID: cjVigY5qzO86Huf0OWal
 * - Model: eleven_v3_conversational
 * - ASR: Scribe Realtime
 *
 * Core Mandates:
 * 1. The deterministic IRIS engine remains the SINGLE SOURCE OF TRUTH.
 * 2. Every user query (text or voice) is routed through DeterministicIrisProvider first.
 * 3. ElevenLabs provides the natural conversational delivery and voice experience.
 * 4. Graceful fallback to deterministic response and offline speech synthesis if disconnected.
 * 5. Zero external packages installed; uses native Web Audio API, WebSockets, and Speech APIs.
 */

export const ELEVENLABS_AGENT_ID = "agent_8601m3q0xaarfcb9kcf8683hrxxj";
export const ELEVENLABS_VOICE_ID = "cjVigY5qzO86Huf0OWal";
export const ELEVENLABS_MODEL_ID = "eleven_v3_conversational";

export type AgentConnectionStatus =
  "disconnected" | "connecting" | "connected" | "speaking" | "listening" | "error";

export interface AgentVoiceState {
  status: AgentConnectionStatus;
  isSpeaking: boolean;
  isListening: boolean;
  voiceEnabled: boolean;
  activeMessageId: string | null;
  lastTranscript: string;
  error: string | null;
}

type StateListener = (state: AgentVoiceState) => void;

class ElevenLabsAgentService {
  private agentId: string = ELEVENLABS_AGENT_ID;
  private ws: WebSocket | null = null;
  private audioContext: AudioContext | null = null;
  private activeSourceNode: AudioBufferSourceNode | null = null;
  private speechRecognition: any = null;
  private isSpeechRecognitionActive: boolean = false;
  private listeners: Set<StateListener> = new Set();

  private state: AgentVoiceState = {
    status: "disconnected",
    isSpeaking: false,
    isListening: false,
    voiceEnabled: true,
    activeMessageId: null,
    lastTranscript: "",
    error: null,
  };

  constructor() {
    // Check if voiceEnabled was saved in localStorage
    if (typeof window !== "undefined" && window.localStorage) {
      try {
        const saved = window.localStorage.getItem("iris_voice_enabled");
        if (saved !== null) {
          this.state.voiceEnabled = saved === "true";
        }
      } catch {
        // storage blocked
      }
    }
  }

  // ---------------------------------------------------------------------------
  // State Subscriptions
  // ---------------------------------------------------------------------------

  public getState(): AgentVoiceState {
    return { ...this.state };
  }

  public subscribe(listener: StateListener): () => void {
    this.listeners.add(listener);
    listener(this.getState());
    return () => {
      this.listeners.delete(listener);
    };
  }

  private updateState(partial: Partial<AgentVoiceState>): void {
    this.state = { ...this.state, ...partial };
    for (const listener of this.listeners) {
      listener(this.getState());
    }
  }

  public setVoiceEnabled(enabled: boolean): void {
    this.updateState({ voiceEnabled: enabled });
    if (typeof window !== "undefined" && window.localStorage) {
      try {
        window.localStorage.setItem("iris_voice_enabled", String(enabled));
      } catch {
        // storage blocked
      }
    }
    if (!enabled && this.state.isSpeaking) {
      this.stopSpeaking();
    }
  }

  public toggleVoiceEnabled(): boolean {
    const next = !this.state.voiceEnabled;
    this.setVoiceEnabled(next);
    return next;
  }

  // ---------------------------------------------------------------------------
  // Audio Playback & Voice Narration
  // ---------------------------------------------------------------------------

  private initAudioContext(): AudioContext | null {
    if (typeof window === "undefined") return null;
    if (!this.audioContext) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.audioContext = new AudioCtx();
      }
    }
    if (this.audioContext && this.audioContext.state === "suspended") {
      this.audioContext.resume().catch(() => {});
    }
    return this.audioContext;
  }

  /**
   * Speaks the provided text narrative.
   * If ElevenLabs voice session is active, it coordinates playback.
   * Universal fallback uses browser SpeechSynthesis with optimal cyber voice parameters.
   */
  public async speak(text: string, messageId?: string): Promise<void> {
    if (!this.state.voiceEnabled || !text || !text.trim()) {
      return;
    }

    // Stop any current playback
    this.stopSpeaking();

    this.updateState({
      isSpeaking: true,
      status: "speaking",
      activeMessageId: messageId || null,
      error: null,
    });

    // Clean markdown symbols for natural voice narration
    const cleanSpeech = text
      .replace(/\[(?:ACTUAL|KNOWN AT TIME|COUNTERFACTUAL|MIXED)\]/g, "")
      .replace(/[#*_`~>•]/g, " ")
      .replace(/\[(.*?)\]\(.*?\)/g, "$1")
      .replace(/\s+/g, " ")
      .trim();

    // Primary or Fallback: Browser Web Speech Synthesis
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(cleanSpeech);
      utterance.rate = 1.05;
      utterance.pitch = 0.95;

      // Select high quality English voice if available
      const voices = window.speechSynthesis.getVoices();
      const preferredVoice =
        voices.find(
          (v) =>
            v.lang.startsWith("en") &&
            (v.name.includes("Natural") ||
              v.name.includes("Samantha") ||
              v.name.includes("Google") ||
              v.name.includes("Victoria") ||
              v.name.includes("Daniel")),
        ) || voices.find((v) => v.lang.startsWith("en"));

      if (preferredVoice) {
        utterance.voice = preferredVoice;
      }

      utterance.onend = () => {
        this.updateState({
          isSpeaking: false,
          status: this.ws && this.ws.readyState === WebSocket.OPEN ? "connected" : "disconnected",
          activeMessageId: null,
        });
      };

      utterance.onerror = () => {
        this.updateState({
          isSpeaking: false,
          status: this.ws && this.ws.readyState === WebSocket.OPEN ? "connected" : "disconnected",
          activeMessageId: null,
        });
      };

      window.speechSynthesis.speak(utterance);
    } else {
      // Audio not supported in environment
      this.updateState({
        isSpeaking: false,
        status: "disconnected",
        activeMessageId: null,
      });
    }
  }

  public stopSpeaking(): void {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    if (this.activeSourceNode) {
      try {
        this.activeSourceNode.stop();
        this.activeSourceNode.disconnect();
      } catch {
        // already stopped
      }
      this.activeSourceNode = null;
    }
    this.updateState({
      isSpeaking: false,
      status: this.ws && this.ws.readyState === WebSocket.OPEN ? "connected" : "disconnected",
      activeMessageId: null,
    });
  }

  // ---------------------------------------------------------------------------
  // Microphone / Voice-to-Text Input
  // ---------------------------------------------------------------------------

  /**
   * Starts microphone listening for user voice input.
   * When speech is detected and completed, invokes onTranscript to feed into
   * the deterministic IRIS pipeline.
   */
  public startListening(
    onTranscript: (text: string) => void,
    onError?: (err: string) => void,
  ): boolean {
    if (typeof window === "undefined") return false;

    // Check for Web Speech Recognition API
    const SpeechRecognition =
      (window as unknown as { SpeechRecognition?: any }).SpeechRecognition ||
      (window as unknown as { webkitSpeechRecognition?: any }).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      const err = "Speech recognition is not supported in this browser. Please type your query.";
      this.updateState({ error: err });
      onError?.(err);
      return false;
    }

    try {
      // If already speaking, pause playback so it doesn't pick up own audio
      this.stopSpeaking();

      this.speechRecognition = new SpeechRecognition();
      this.speechRecognition.continuous = false;
      this.speechRecognition.interimResults = true;
      this.speechRecognition.lang = "en-US";

      this.speechRecognition.onstart = () => {
        this.isSpeechRecognitionActive = true;
        this.updateState({
          isListening: true,
          status: "listening",
          error: null,
        });
      };

      this.speechRecognition.onresult = (event: any) => {
        let finalTranscript = "";
        let interimTranscript = "";

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          } else {
            interimTranscript += event.results[i][0].transcript;
          }
        }

        const currentText = (finalTranscript || interimTranscript).trim();
        if (currentText) {
          this.updateState({ lastTranscript: currentText });
        }

        if (finalTranscript.trim()) {
          this.stopListening();
          onTranscript(finalTranscript.trim());
        }
      };

      this.speechRecognition.onerror = (event: any) => {
        const errorMsg =
          event.error === "not-allowed"
            ? "Microphone access was denied. Please allow microphone permissions."
            : `Voice input error: ${event.error}`;
        this.updateState({
          isListening: false,
          status: this.ws && this.ws.readyState === WebSocket.OPEN ? "connected" : "disconnected",
          error: errorMsg,
        });
        onError?.(errorMsg);
        this.isSpeechRecognitionActive = false;
      };

      this.speechRecognition.onend = () => {
        this.isSpeechRecognitionActive = false;
        this.updateState({
          isListening: false,
          status: this.ws && this.ws.readyState === WebSocket.OPEN ? "connected" : "disconnected",
        });
      };

      this.speechRecognition.start();
      return true;
    } catch (err: any) {
      const errText = err?.message || "Failed to initialize microphone.";
      this.updateState({
        isListening: false,
        error: errText,
      });
      onError?.(errText);
      return false;
    }
  }

  public stopListening(): void {
    if (this.speechRecognition && this.isSpeechRecognitionActive) {
      try {
        this.speechRecognition.stop();
      } catch {
        // already stopped
      }
      this.isSpeechRecognitionActive = false;
    }
    this.updateState({
      isListening: false,
      status: this.ws && this.ws.readyState === WebSocket.OPEN ? "connected" : "disconnected",
    });
  }

  // ---------------------------------------------------------------------------
  // Live ElevenLabs Agent WebSocket Session
  // ---------------------------------------------------------------------------

  /**
   * Connects to the configured ElevenLabs Agent WebSocket session.
   * Public agent ID: agent_8601m3q0xaarfcb9kcf8683hrxxj.
   */
  public async connectSession(onServerTranscript?: (transcript: string) => void): Promise<boolean> {
    if (typeof window === "undefined" || typeof WebSocket === "undefined") {
      return false;
    }

    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      return true;
    }

    this.updateState({ status: "connecting", error: null });

    try {
      const wsUrl = `wss://api.elevenlabs.io/v1/convai/conversation?agent_id=${this.agentId}`;
      this.ws = new WebSocket(wsUrl);

      this.ws.onopen = () => {
        this.updateState({ status: "connected", error: null });
        // Send initial conversation config
        this.sendWsJson({
          type: "conversation_initiation_client_data",
          conversation_config_override: {
            tts: {
              voice_id: ELEVENLABS_VOICE_ID,
              model_id: ELEVENLABS_MODEL_ID,
            },
          },
          dynamic_variables: {
            assistant_name: "IRIS",
            incident_id: "INC-2048",
            mode: "DETERMINISTIC_EXPLANATION",
          },
        });
      };

      this.ws.onmessage = async (event: MessageEvent) => {
        try {
          const data = JSON.parse(event.data);

          // Handle server-side transcript of analyst speech
          if (data.type === "user_transcript" && data.user_transcription_event?.user_transcript) {
            const transcript = data.user_transcription_event.user_transcript.trim();
            if (transcript) {
              this.updateState({ lastTranscript: transcript });
              onServerTranscript?.(transcript);
            }
          }

          // Handle agent audio streaming chunks
          if (data.type === "audio" && data.audio_event?.audio_base_64) {
            this.playBase64Audio(data.audio_event.audio_base_64);
          }

          if (data.type === "agent_response_complete") {
            this.updateState({
              status: "connected",
              isSpeaking: false,
              activeMessageId: null,
            });
          }

          // Handle interruption
          if (data.type === "interruption") {
            this.stopSpeaking();
          }
        } catch {
          // message parse or non-json
        }
      };

      this.ws.onerror = () => {
        this.updateState({
          status: "error",
          error:
            "Could not connect to ElevenLabs Agent WebSocket. Falling back to deterministic mode.",
        });
      };

      this.ws.onclose = () => {
        this.ws = null;
        this.updateState({
          status: "disconnected",
        });
      };

      return true;
    } catch (err: any) {
      this.updateState({
        status: "error",
        error: err?.message || "Failed to initialize ElevenLabs WebSocket.",
      });
      return false;
    }
  }

  public disconnectSession(): void {
    if (this.ws) {
      try {
        this.ws.close();
      } catch {
        // already closed
      }
      this.ws = null;
    }
    this.stopSpeaking();
    this.stopListening();
    this.updateState({
      status: "disconnected",
      isSpeaking: false,
      isListening: false,
    });
  }

  /**
   * Sends a grounded contextual update to the active ElevenLabs Agent session.
   * Contains verified facts computed by the deterministic engine.
   */
  public sendGroundedContext(verifiedFacts: Record<string, unknown>): void {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.sendWsJson({
        type: "contextual_update",
        text: `VERIFIED GROUND TRUTH: ${JSON.stringify(verifiedFacts)}`,
      });
    }
  }

  public presentVerifiedResponse(verifiedAnswer: string, messageId?: string): boolean {
    if (
      !this.state.voiceEnabled ||
      !this.ws ||
      this.ws.readyState !== WebSocket.OPEN ||
      !verifiedAnswer.trim()
    ) {
      return false;
    }

    this.stopSpeaking();
    this.updateState({
      status: "connected",
      activeMessageId: messageId ?? null,
      error: null,
    });

    this.sendWsJson({
      type: "user_message",
      source_medium: "text",
      text: [
        "Read the following verified IRIS response aloud verbatim in a natural speaking voice.",
        "Do not add, infer, calculate, paraphrase, change, or omit any text or facts.",
        "Verified IRIS response:",
        verifiedAnswer,
      ].join("\n\n"),
    });
    return true;
  }

  private sendWsJson(payload: Record<string, unknown>): void {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      try {
        this.ws.send(JSON.stringify(payload));
      } catch {
        // send error
      }
    }
  }

  private async playBase64Audio(base64: string): Promise<void> {
    try {
      const ctx = this.initAudioContext();
      if (!ctx) return;

      const binaryString = atob(base64);
      const len = binaryString.length;
      const bytes = new Uint8Array(len);
      for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }

      const audioBuffer = await ctx.decodeAudioData(bytes.buffer);
      const source = ctx.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(ctx.destination);

      this.activeSourceNode = source;
      this.updateState({ isSpeaking: true, status: "speaking" });

      source.onended = () => {
        this.activeSourceNode = null;
        this.updateState({
          isSpeaking: false,
          status: this.ws && this.ws.readyState === WebSocket.OPEN ? "connected" : "disconnected",
        });
      };

      source.start();
    } catch {
      // Audio decode failed
    }
  }
}

// Global Singleton Instance
export const elevenLabsAgentService = new ElevenLabsAgentService();
