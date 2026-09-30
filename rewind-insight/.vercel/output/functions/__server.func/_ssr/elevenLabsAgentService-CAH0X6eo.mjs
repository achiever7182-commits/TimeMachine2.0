//#region node_modules/.nitro/vite/services/ssr/assets/elevenLabsAgentService-CAH0X6eo.js
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
var ELEVENLABS_AGENT_ID = "agent_8601m3q0xaarfcb9kcf8683hrxxj";
var ELEVENLABS_VOICE_ID = "cjVigY5qzO86Huf0OWal";
var ELEVENLABS_MODEL_ID = "eleven_v3_conversational";
var ElevenLabsAgentService = class {
	agentId = ELEVENLABS_AGENT_ID;
	ws = null;
	audioContext = null;
	activeSourceNode = null;
	speechRecognition = null;
	isSpeechRecognitionActive = false;
	listeners = /* @__PURE__ */ new Set();
	state = {
		status: "disconnected",
		isSpeaking: false,
		isListening: false,
		voiceEnabled: true,
		activeMessageId: null,
		lastTranscript: "",
		error: null
	};
	constructor() {
		if (typeof window !== "undefined" && window.localStorage) try {
			const saved = window.localStorage.getItem("iris_voice_enabled");
			if (saved !== null) this.state.voiceEnabled = saved === "true";
		} catch {}
	}
	getState() {
		return { ...this.state };
	}
	subscribe(listener) {
		this.listeners.add(listener);
		listener(this.getState());
		return () => {
			this.listeners.delete(listener);
		};
	}
	updateState(partial) {
		this.state = {
			...this.state,
			...partial
		};
		for (const listener of this.listeners) listener(this.getState());
	}
	setVoiceEnabled(enabled) {
		this.updateState({ voiceEnabled: enabled });
		if (typeof window !== "undefined" && window.localStorage) try {
			window.localStorage.setItem("iris_voice_enabled", String(enabled));
		} catch {}
		if (!enabled && this.state.isSpeaking) this.stopSpeaking();
	}
	toggleVoiceEnabled() {
		const next = !this.state.voiceEnabled;
		this.setVoiceEnabled(next);
		return next;
	}
	initAudioContext() {
		if (typeof window === "undefined") return null;
		if (!this.audioContext) {
			const AudioCtx = window.AudioContext || window.webkitAudioContext;
			if (AudioCtx) this.audioContext = new AudioCtx();
		}
		if (this.audioContext && this.audioContext.state === "suspended") this.audioContext.resume().catch(() => {});
		return this.audioContext;
	}
	/**
	* Speaks the provided text narrative.
	* If ElevenLabs voice session is active, it coordinates playback.
	* Universal fallback uses browser SpeechSynthesis with optimal cyber voice parameters.
	*/
	async speak(text, messageId) {
		if (!this.state.voiceEnabled || !text || !text.trim()) return;
		this.stopSpeaking();
		this.updateState({
			isSpeaking: true,
			status: "speaking",
			activeMessageId: messageId || null,
			error: null
		});
		const cleanSpeech = text.replace(/\[(?:ACTUAL|KNOWN AT TIME|COUNTERFACTUAL|MIXED)\]/g, "").replace(/[#*_`~>•]/g, " ").replace(/\[(.*?)\]\(.*?\)/g, "$1").replace(/\s+/g, " ").trim();
		if (typeof window !== "undefined" && "speechSynthesis" in window) {
			window.speechSynthesis.cancel();
			const utterance = new SpeechSynthesisUtterance(cleanSpeech);
			utterance.rate = 1.05;
			utterance.pitch = .95;
			const voices = window.speechSynthesis.getVoices();
			const preferredVoice = voices.find((v) => v.lang.startsWith("en") && (v.name.includes("Natural") || v.name.includes("Samantha") || v.name.includes("Google") || v.name.includes("Victoria") || v.name.includes("Daniel"))) || voices.find((v) => v.lang.startsWith("en"));
			if (preferredVoice) utterance.voice = preferredVoice;
			utterance.onend = () => {
				this.updateState({
					isSpeaking: false,
					status: this.ws && this.ws.readyState === WebSocket.OPEN ? "connected" : "disconnected",
					activeMessageId: null
				});
			};
			utterance.onerror = () => {
				this.updateState({
					isSpeaking: false,
					status: this.ws && this.ws.readyState === WebSocket.OPEN ? "connected" : "disconnected",
					activeMessageId: null
				});
			};
			window.speechSynthesis.speak(utterance);
		} else this.updateState({
			isSpeaking: false,
			status: "disconnected",
			activeMessageId: null
		});
	}
	stopSpeaking() {
		if (typeof window !== "undefined" && "speechSynthesis" in window) window.speechSynthesis.cancel();
		if (this.activeSourceNode) {
			try {
				this.activeSourceNode.stop();
				this.activeSourceNode.disconnect();
			} catch {}
			this.activeSourceNode = null;
		}
		this.updateState({
			isSpeaking: false,
			status: this.ws && this.ws.readyState === WebSocket.OPEN ? "connected" : "disconnected",
			activeMessageId: null
		});
	}
	/**
	* Starts microphone listening for user voice input.
	* When speech is detected and completed, invokes onTranscript to feed into
	* the deterministic IRIS pipeline.
	*/
	startListening(onTranscript, onError) {
		if (typeof window === "undefined") return false;
		const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
		if (!SpeechRecognition) {
			const err = "Speech recognition is not supported in this browser. Please type your query.";
			this.updateState({ error: err });
			onError?.(err);
			return false;
		}
		try {
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
					error: null
				});
			};
			this.speechRecognition.onresult = (event) => {
				let finalTranscript = "";
				let interimTranscript = "";
				for (let i = event.resultIndex; i < event.results.length; ++i) if (event.results[i].isFinal) finalTranscript += event.results[i][0].transcript;
				else interimTranscript += event.results[i][0].transcript;
				const currentText = (finalTranscript || interimTranscript).trim();
				if (currentText) this.updateState({ lastTranscript: currentText });
				if (finalTranscript.trim()) {
					this.stopListening();
					onTranscript(finalTranscript.trim());
				}
			};
			this.speechRecognition.onerror = (event) => {
				const errorMsg = event.error === "not-allowed" ? "Microphone access was denied. Please allow microphone permissions." : `Voice input error: ${event.error}`;
				this.updateState({
					isListening: false,
					status: this.ws && this.ws.readyState === WebSocket.OPEN ? "connected" : "disconnected",
					error: errorMsg
				});
				onError?.(errorMsg);
				this.isSpeechRecognitionActive = false;
			};
			this.speechRecognition.onend = () => {
				this.isSpeechRecognitionActive = false;
				this.updateState({
					isListening: false,
					status: this.ws && this.ws.readyState === WebSocket.OPEN ? "connected" : "disconnected"
				});
			};
			this.speechRecognition.start();
			return true;
		} catch (err) {
			const errText = err?.message || "Failed to initialize microphone.";
			this.updateState({
				isListening: false,
				error: errText
			});
			onError?.(errText);
			return false;
		}
	}
	stopListening() {
		if (this.speechRecognition && this.isSpeechRecognitionActive) {
			try {
				this.speechRecognition.stop();
			} catch {}
			this.isSpeechRecognitionActive = false;
		}
		this.updateState({
			isListening: false,
			status: this.ws && this.ws.readyState === WebSocket.OPEN ? "connected" : "disconnected"
		});
	}
	/**
	* Connects to the configured ElevenLabs Agent WebSocket session.
	* Public agent ID: agent_8601m3q0xaarfcb9kcf8683hrxxj.
	*/
	async connectSession(onServerTranscript) {
		if (typeof window === "undefined" || typeof WebSocket === "undefined") return false;
		if (this.ws && this.ws.readyState === WebSocket.OPEN) return true;
		this.updateState({
			status: "connecting",
			error: null
		});
		try {
			const wsUrl = `wss://api.elevenlabs.io/v1/convai/conversation?agent_id=${this.agentId}`;
			this.ws = new WebSocket(wsUrl);
			this.ws.onopen = () => {
				this.updateState({
					status: "connected",
					error: null
				});
				this.sendWsJson({
					type: "conversation_initiation_client_data",
					conversation_config_override: { tts: {
						voice_id: ELEVENLABS_VOICE_ID,
						model_id: ELEVENLABS_MODEL_ID
					} },
					dynamic_variables: {
						assistant_name: "IRIS",
						incident_id: "INC-2048",
						mode: "DETERMINISTIC_EXPLANATION"
					}
				});
			};
			this.ws.onmessage = async (event) => {
				try {
					const data = JSON.parse(event.data);
					if (data.type === "user_transcript" && data.user_transcription_event?.user_transcript) {
						const transcript = data.user_transcription_event.user_transcript.trim();
						if (transcript) {
							this.updateState({ lastTranscript: transcript });
							onServerTranscript?.(transcript);
						}
					}
					if (data.type === "audio" && data.audio_event?.audio_base_64) this.playBase64Audio(data.audio_event.audio_base_64);
					if (data.type === "agent_response_complete") this.updateState({
						status: "connected",
						isSpeaking: false,
						activeMessageId: null
					});
					if (data.type === "interruption") this.stopSpeaking();
				} catch {}
			};
			this.ws.onerror = () => {
				this.updateState({
					status: "error",
					error: "Could not connect to ElevenLabs Agent WebSocket. Falling back to deterministic mode."
				});
			};
			this.ws.onclose = () => {
				this.ws = null;
				this.updateState({ status: "disconnected" });
			};
			return true;
		} catch (err) {
			this.updateState({
				status: "error",
				error: err?.message || "Failed to initialize ElevenLabs WebSocket."
			});
			return false;
		}
	}
	disconnectSession() {
		if (this.ws) {
			try {
				this.ws.close();
			} catch {}
			this.ws = null;
		}
		this.stopSpeaking();
		this.stopListening();
		this.updateState({
			status: "disconnected",
			isSpeaking: false,
			isListening: false
		});
	}
	/**
	* Sends a grounded contextual update to the active ElevenLabs Agent session.
	* Contains verified facts computed by the deterministic engine.
	*/
	sendGroundedContext(verifiedFacts) {
		if (this.ws && this.ws.readyState === WebSocket.OPEN) this.sendWsJson({
			type: "contextual_update",
			text: `VERIFIED GROUND TRUTH: ${JSON.stringify(verifiedFacts)}`
		});
	}
	presentVerifiedResponse(verifiedAnswer, messageId) {
		if (!this.state.voiceEnabled || !this.ws || this.ws.readyState !== WebSocket.OPEN || !verifiedAnswer.trim()) return false;
		this.stopSpeaking();
		this.updateState({
			status: "connected",
			activeMessageId: messageId ?? null,
			error: null
		});
		this.sendWsJson({
			type: "user_message",
			source_medium: "text",
			text: [
				"Read the following verified IRIS response aloud verbatim in a natural speaking voice.",
				"Do not add, infer, calculate, paraphrase, change, or omit any text or facts.",
				"Verified IRIS response:",
				verifiedAnswer
			].join("\n\n")
		});
		return true;
	}
	sendWsJson(payload) {
		if (this.ws && this.ws.readyState === WebSocket.OPEN) try {
			this.ws.send(JSON.stringify(payload));
		} catch {}
	}
	async playBase64Audio(base64) {
		try {
			const ctx = this.initAudioContext();
			if (!ctx) return;
			const binaryString = atob(base64);
			const len = binaryString.length;
			const bytes = new Uint8Array(len);
			for (let i = 0; i < len; i++) bytes[i] = binaryString.charCodeAt(i);
			const audioBuffer = await ctx.decodeAudioData(bytes.buffer);
			const source = ctx.createBufferSource();
			source.buffer = audioBuffer;
			source.connect(ctx.destination);
			this.activeSourceNode = source;
			this.updateState({
				isSpeaking: true,
				status: "speaking"
			});
			source.onended = () => {
				this.activeSourceNode = null;
				this.updateState({
					isSpeaking: false,
					status: this.ws && this.ws.readyState === WebSocket.OPEN ? "connected" : "disconnected"
				});
			};
			source.start();
		} catch {}
	}
};
var elevenLabsAgentService = new ElevenLabsAgentService();
//#endregion
export { elevenLabsAgentService as i, ELEVENLABS_MODEL_ID as n, ELEVENLABS_VOICE_ID as r, ELEVENLABS_AGENT_ID as t };
