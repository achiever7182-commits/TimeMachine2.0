import { r as __toESM } from "../_runtime.mjs";
import { i as require_react, r as require_jsx_runtime } from "../_libs/elevenlabs__react+react.mjs";
import { At as ArrowRight, E as Radio, I as Mic, L as MicOff, S as Send, Tt as Bot, dt as Clock, f as Sparkles, h as Shield, i as Volume2, r as VolumeX, w as RotateCcw } from "../_libs/lucide-react.mjs";
import { x as useDemo } from "./DemoContext-DI0dcfwA.mjs";
import { i as elevenLabsAgentService, t as ELEVENLABS_AGENT_ID } from "./elevenLabsAgentService-CAH0X6eo.mjs";
import { t as irisService } from "./irisService-LaFd4rdD.mjs";
import { t as IrisMessage } from "./IrisMessage-BQssWEP_.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/iris-DB6CJT-N.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function IrisSuggestedQuestions({ questions, onSelectQuestion, disabled = false }) {
	if (!questions || questions.length === 0) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "border-t border-border/70 bg-secondary/15 px-4 py-2.5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-1.5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-3 text-cyan-signal" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Contextual Investigation Questions:" })]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex gap-2 overflow-x-auto pb-1 scrollbar-none",
			children: questions.map((prompt) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				disabled,
				onClick: () => onSelectQuestion(prompt),
				className: "flex shrink-0 items-center gap-1.5 rounded-lg border border-border/80 bg-background/60 px-2.5 py-1 text-[11px] text-foreground hover:border-cyan-signal/50 hover:bg-cyan-signal/10 disabled:opacity-50 transition-colors",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: prompt }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-2.5 opacity-60" })]
			}, prompt))
		})]
	});
}
function IrisCopilot() {
	const { currentTime, currentMinute, incidentStage, currentRisk, counterfactualBranch, scenarioHistory } = useDemo();
	const [inputQuery, setInputQuery] = (0, import_react.useState)("");
	const [messages, setMessages] = (0, import_react.useState)([]);
	const [isAnswering, setIsAnswering] = (0, import_react.useState)(false);
	const messagesContainerRef = (0, import_react.useRef)(null);
	const [voiceState, setVoiceState] = (0, import_react.useState)(() => elevenLabsAgentService.getState());
	(0, import_react.useEffect)(() => {
		return elevenLabsAgentService.subscribe((state) => {
			setVoiceState(state);
		});
	}, []);
	const irisContext = (0, import_react.useMemo)(() => {
		return irisService.createContext(currentMinute, counterfactualBranch, scenarioHistory);
	}, [
		currentMinute,
		counterfactualBranch,
		scenarioHistory
	]);
	(0, import_react.useEffect)(() => {
		if (messages.length === 0) setMessages([{
			id: "msg-welcome",
			role: "IRIS",
			content: `Greetings, Analyst. I am IRIS (Intelligent Response & Investigation System). I operate directly on top of the deterministic incident reconstruction engine. Current simulation time is synchronized at ${currentTime} (T+${currentMinute}m, Risk: ${currentRisk}). Ask me about incident chronology, what defenders knew, attack graph paths, detection gaps, or counterfactual simulations.`,
			timestamp: currentTime
		}]);
	}, [
		currentTime,
		currentMinute,
		currentRisk,
		messages.length
	]);
	(0, import_react.useEffect)(() => {
		if (messagesContainerRef.current) messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
	}, [messages, isAnswering]);
	const handleSend = (0, import_react.useCallback)(async (queryToSend) => {
		const q = queryToSend ?? inputQuery;
		if (!q.trim() || isAnswering) return;
		const userMsg = {
			id: `user-${Date.now()}`,
			role: "USER",
			content: q.trim(),
			timestamp: currentTime
		};
		setMessages((prev) => [...prev, userMsg]);
		setInputQuery("");
		setIsAnswering(true);
		try {
			const resp = await irisService.ask(q.trim(), irisContext);
			const irisMsg = {
				id: `iris-${Date.now()}`,
				role: "IRIS",
				content: resp.answer,
				response: resp,
				timestamp: currentTime
			};
			setMessages((prev) => [...prev, irisMsg]);
			if (elevenLabsAgentService.getState().voiceEnabled) {
				if (!elevenLabsAgentService.presentVerifiedResponse(resp.answer, irisMsg.id)) elevenLabsAgentService.speak(resp.answer, irisMsg.id);
			}
		} catch (err) {
			setMessages((prev) => [...prev, {
				id: `err-${Date.now()}`,
				role: "IRIS",
				content: "An unexpected error occurred while querying the incident engine.",
				timestamp: currentTime
			}]);
		} finally {
			setIsAnswering(false);
		}
	}, [
		inputQuery,
		isAnswering,
		currentTime,
		irisContext
	]);
	const handleToggleMic = (0, import_react.useCallback)(() => {
		if (voiceState.isListening) elevenLabsAgentService.stopListening();
		else elevenLabsAgentService.startListening((transcript) => {
			if (transcript.trim()) handleSend(transcript.trim());
		});
	}, [voiceState.isListening, handleSend]);
	const handleToggleSession = (0, import_react.useCallback)(async () => {
		if (voiceState.status === "connected" || voiceState.status === "connecting") elevenLabsAgentService.disconnectSession();
		else await elevenLabsAgentService.connectSession((transcript) => {
			if (transcript.trim()) handleSend(transcript.trim());
		});
	}, [voiceState.status, handleSend]);
	const handleClearHistory = (0, import_react.useCallback)(() => {
		setMessages([{
			id: `msg-${Date.now()}`,
			role: "IRIS",
			content: `Investigation history reset. Grounded at simulation timestamp ${currentTime}.`,
			timestamp: currentTime
		}]);
	}, [currentTime]);
	const currentSuggestions = (messages.slice().reverse().find((m) => m.role === "IRIS" && m.response)?.response)?.suggestedQuestions ?? [
		"What happened?",
		"What did we know at 10:04?",
		"What did we miss?",
		"What should we do right now?",
		"Compare the available response options.",
		"Simulate your recommended response."
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-[calc(100vh-140px)] flex-col rounded-xl border border-border/80 bg-card/40 backdrop-blur-xl shadow-panel overflow-hidden",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center justify-between gap-3 border-b border-border/80 bg-secondary/30 p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex size-10 items-center justify-center rounded-xl bg-cyan-signal/15 border border-cyan-signal/40 text-cyan-signal shadow-glow",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bot, { className: "size-5" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-sm font-bold tracking-tight text-foreground",
							children: "IRIS INVESTIGATOR"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "rounded bg-cyan-signal/20 px-1.5 py-0.2 font-mono text-[9px] font-bold text-cyan-signal border border-cyan-signal/30 flex items-center gap-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `size-1.5 rounded-full ${voiceState.isSpeaking ? "bg-cyan-signal animate-ping" : voiceState.status === "connected" ? "bg-emerald-400" : "bg-cyan-signal"}` }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: voiceState.isSpeaking ? "ELEVENLABS SPEAKING" : voiceState.status === "connected" ? "ELEVENLABS AGENT" : "ELEVENLABS VOICE" })]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-[11px] text-muted-foreground flex items-center gap-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Intelligent Response & Investigation System · Grounded in INC-2048" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "opacity-60 hidden md:inline",
							children: [
								"· Agent: ",
								ELEVENLABS_AGENT_ID.slice(0, 14),
								"..."
							]
						})]
					})] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 font-mono text-xs",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => elevenLabsAgentService.toggleVoiceEnabled(),
							title: voiceState.voiceEnabled ? "Voice Output Enabled (Click to Mute)" : "Voice Muted (Click to Unmute)",
							className: `flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-[11px] transition-colors ${voiceState.voiceEnabled ? "border-cyan-signal/40 bg-cyan-signal/15 text-cyan-signal hover:bg-cyan-signal/25" : "border-border/70 bg-background/40 text-muted-foreground hover:text-foreground"}`,
							children: voiceState.voiceEnabled ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Volume2, { className: "size-3 text-cyan-signal" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "hidden sm:inline font-bold",
								children: "VOICE ON"
							})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(VolumeX, { className: "size-3 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "hidden sm:inline",
								children: "MUTED"
							})] })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: handleToggleSession,
							title: voiceState.status === "connected" ? "Disconnect Live ElevenLabs Session" : "Connect Live ElevenLabs Voice Session",
							className: `flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-[11px] transition-colors ${voiceState.status === "connected" ? "border-emerald-500/50 bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30" : "border-border/70 bg-background/40 text-muted-foreground hover:text-cyan-signal hover:bg-secondary"}`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Radio, { className: `size-3 ${voiceState.status === "connected" ? "text-emerald-400 animate-pulse" : ""}` }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: voiceState.status === "connected" ? "LIVE" : "SESSION" })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-1.5 rounded-lg border border-border/70 bg-background/60 px-2.5 py-1 text-[11px]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "size-3 text-cyan-signal" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Time: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: currentTime })] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-1.5 rounded-lg border border-border/70 bg-background/60 px-2.5 py-1 text-[11px]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, { className: "size-3 text-threat" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Risk: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
								className: "text-threat",
								children: currentRisk
							})] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: handleClearHistory,
							className: "flex items-center gap-1 rounded-lg border border-border/70 bg-background/40 px-2.5 py-1 text-[11px] text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors",
							title: "Reset Conversation",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "size-3" }), "Reset"]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				ref: messagesContainerRef,
				className: "min-h-0 flex-1 space-y-4 overflow-y-auto p-4.5",
				children: [messages.map((msg) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IrisMessage, { message: msg }, msg.id)), isAnswering && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 text-xs text-muted-foreground italic",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-3.5 animate-spin text-cyan-signal" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "IRIS analyzing incident reconstruction context..." })]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IrisSuggestedQuestions, {
				questions: currentSuggestions,
				onSelectQuestion: (q) => handleSend(q),
				disabled: isAnswering
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "border-t border-border/80 bg-background/70 p-3 backdrop-blur-md",
				children: [voiceState.error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mb-2 text-[11px] text-threat bg-threat/10 border border-threat/30 rounded px-2.5 py-1",
					children: voiceState.error
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: (e) => {
						e.preventDefault();
						handleSend();
					},
					className: "flex items-center gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: handleToggleMic,
							title: voiceState.isListening ? "Microphone listening... click to stop" : "Speak query with microphone (Voice Input)",
							className: `flex h-10 items-center justify-center rounded-lg px-3 transition-colors ${voiceState.isListening ? "bg-threat text-white animate-pulse" : "border border-border bg-secondary/40 text-muted-foreground hover:text-cyan-signal hover:border-cyan-signal/40 hover:bg-secondary"}`,
							children: voiceState.isListening ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MicOff, { className: "size-4 animate-bounce" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mic, { className: "size-4" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "text",
							value: inputQuery,
							onChange: (e) => setInputQuery(e.target.value),
							placeholder: voiceState.isListening ? "Listening to voice input... speak now..." : "Ask IRIS about chronology, what defenders knew, attack graph paths, or counterfactuals...",
							disabled: isAnswering,
							className: `h-10 flex-1 rounded-lg border bg-secondary/30 px-3.5 text-xs text-foreground placeholder:text-muted-foreground focus:border-cyan-signal focus:outline-none focus:ring-1 focus:ring-cyan-signal/50 ${voiceState.isListening ? "border-threat/70 bg-threat/5 ring-1 ring-threat/40" : "border-border"}`
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "submit",
							disabled: !inputQuery.trim() || isAnswering,
							className: "flex h-10 items-center gap-1.5 rounded-lg bg-cyan-signal px-4 font-mono text-xs font-bold text-background hover:bg-cyan-400 disabled:opacity-50 transition-colors",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "SEND" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "size-3.5" })]
						})
					]
				})]
			})
		]
	});
}
function IrisViewPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mx-auto max-w-7xl animate-fade-in space-y-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IrisCopilot, {})
	});
}
//#endregion
export { IrisViewPage as component };
