import { r as __toESM } from "../_runtime.mjs";
import { i as require_react, r as require_jsx_runtime } from "../_libs/elevenlabs__react+react.mjs";
import { Tt as Bot, W as Layers, X as GitBranch, _ as ShieldCheck, at as ExternalLink, d as Square, dt as Clock, h as Shield, i as Volume2, l as TriangleAlert, o as User, tt as FileText, x as Server, y as Share2 } from "../_libs/lucide-react.mjs";
import { i as elevenLabsAgentService } from "./elevenLabsAgentService-CAH0X6eo.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/IrisMessage-BQssWEP_.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var TYPE_ICONS = {
	TIMELINE: Clock,
	ASSET: ShieldCheck,
	USER: ShieldCheck,
	ATTACK_PATH: Layers,
	EVIDENCE: FileText,
	DETECTION_GAP: TriangleAlert,
	COUNTERFACTUAL: Layers,
	RISK: TriangleAlert,
	INVESTIGATION: FileText
};
function IrisFindingCard({ finding, onSelectCitation }) {
	const Icon = TYPE_ICONS[finding.type] ?? FileText;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl border border-border/80 bg-card/60 p-3.5 text-xs backdrop-blur-md transition-all hover:border-cyan-signal/40 shadow-sm",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between mb-1.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex size-6 items-center justify-center rounded-md bg-secondary text-cyan-signal border border-border/50",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-3.5" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-semibold text-foreground text-xs",
						children: finding.title
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: `font-mono text-[9px] font-bold px-1.5 py-0.5 rounded border ${finding.confidence === "HIGH" ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" : "bg-amber-500/10 text-amber-400 border-amber-500/20"}`,
					children: [finding.confidence, " CONFIDENCE"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-muted-foreground text-[11px] leading-relaxed mb-2",
				children: finding.summary
			}),
			finding.citations.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-wrap gap-1.5 pt-1.5 border-t border-border/40",
				children: finding.citations.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => onSelectCitation?.(c.id),
					className: "flex items-center gap-1 rounded bg-secondary/70 px-2 py-0.5 font-mono text-[9.5px] text-muted-foreground hover:text-cyan-signal hover:bg-secondary transition-colors",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: c.label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "size-2.5 opacity-60" })]
				}, c.id))
			})
		]
	});
}
function IrisTimelineCitation({ citation, onClick }) {
	const getIcon = () => {
		switch (citation.type) {
			case "TIMELINE_EVENT": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "size-2.5 text-cyan-signal" });
			case "EVIDENCE": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "size-2.5 text-yellow-400" });
			case "ASSET": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Server, { className: "size-2.5 text-purple-400" });
			case "USER": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "size-2.5 text-blue-400" });
			case "ATTACK_NODE":
			case "ATTACK_EDGE": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Share2, { className: "size-2.5 text-red-400" });
			case "COUNTERFACTUAL_EVENT": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GitBranch, { className: "size-2.5 text-emerald-400" });
			case "RISK_STATE": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, { className: "size-2.5 text-amber-500" });
			default: return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Layers, { className: "size-2.5 text-muted-foreground" });
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick: () => onClick?.(citation),
		className: "inline-flex items-center gap-1 rounded border border-border/80 bg-background/80 px-2 py-0.5 font-mono text-[10px] text-foreground hover:border-cyan-signal/60 hover:bg-cyan-signal/10 transition-colors",
		title: `Citation: ${citation.type} (${citation.sourceId || citation.id})`,
		children: [
			getIcon(),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "truncate max-w-[220px]",
				children: citation.label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "text-[8px] text-muted-foreground uppercase opacity-75",
				children: [
					"[",
					citation.type.replace(/_/g, " "),
					"]"
				]
			})
		]
	});
}
function IrisMessage({ message, onSelectCitation }) {
	const isUser = message.role === "USER";
	const resp = message.response;
	const [voiceState, setVoiceState] = (0, import_react.useState)(() => elevenLabsAgentService.getState());
	(0, import_react.useEffect)(() => {
		return elevenLabsAgentService.subscribe((state) => {
			setVoiceState(state);
		});
	}, []);
	const isThisMessagePlaying = voiceState.isSpeaking && voiceState.activeMessageId === message.id;
	const handleToggleVoice = () => {
		if (isThisMessagePlaying) elevenLabsAgentService.stopSpeaking();
		else elevenLabsAgentService.speak(message.content, message.id);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: `flex flex-col ${isUser ? "items-end" : "items-start"}`,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: `max-w-3xl rounded-xl p-4 text-xs leading-relaxed transition-all shadow-sm ${isUser ? "bg-cyan-signal/15 text-foreground border border-cyan-signal/30 ml-12" : "bg-secondary/40 text-foreground border border-border/80 mr-8"}`,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between gap-3 mb-2 font-mono text-[10px] text-muted-foreground border-b border-border/40 pb-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "font-bold flex items-center gap-1 text-cyan-signal",
								children: [isUser ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "size-3" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bot, { className: "size-3" }), isUser ? "ANALYST" : "IRIS"]
							}),
							resp?.worldPerspective && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: `rounded px-1.5 py-0.2 text-[9px] font-bold uppercase tracking-wider ${resp.worldPerspective === "COUNTERFACTUAL" ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" : resp.worldPerspective === "KNOWN_AT_TIME" ? "bg-amber-500/20 text-amber-400 border border-amber-500/30" : "bg-cyan-signal/20 text-cyan-signal border border-cyan-signal/30"}`,
								children: [
									"[",
									resp.worldPerspective.replace(/_/g, " "),
									"]"
								]
							}),
							!isUser && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: handleToggleVoice,
								title: isThisMessagePlaying ? "Stop Voice Narration" : "Listen to ElevenLabs Voice",
								className: `flex items-center gap-1 rounded px-1.5 py-0.5 text-[9px] transition-colors border ${isThisMessagePlaying ? "bg-cyan-signal text-background border-cyan-signal font-bold animate-pulse" : "border-border/60 text-muted-foreground hover:text-cyan-signal hover:border-cyan-signal/40 hover:bg-secondary/60"}`,
								children: isThisMessagePlaying ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Square, { className: "size-2.5 fill-current" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "STOP" })] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Volume2, { className: "size-2.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "VOICE" })] })
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: message.timestamp })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "whitespace-pre-line text-[11.5px] font-sans text-foreground/95",
					children: message.content
				}),
				resp?.findings && resp.findings.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3.5 space-y-2 border-t border-border/50 pt-2.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-[10px] font-semibold text-muted-foreground uppercase tracking-wider",
						children: "Derived Findings:"
					}), resp.findings.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IrisFindingCard, {
						finding: f,
						onSelectCitation: (cId) => onSelectCitation?.({
							id: cId,
							type: "EVIDENCE",
							label: cId
						})
					}, f.id))]
				}),
				resp?.citations && resp.citations.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3 border-t border-border/40 pt-2 flex flex-wrap gap-1.5",
					children: resp.citations.slice(0, 6).map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IrisTimelineCitation, {
						citation: c,
						onClick: onSelectCitation
					}, c.id))
				})
			]
		})
	});
}
//#endregion
export { IrisMessage as t };
