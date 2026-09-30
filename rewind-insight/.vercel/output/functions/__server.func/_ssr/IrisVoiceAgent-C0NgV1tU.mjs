import { r as __toESM } from "../_runtime.mjs";
import { i as require_react, n as ConversationProvider, r as require_jsx_runtime, t as useConversation } from "../_libs/elevenlabs__react+react.mjs";
import { A as PhoneOff, I as Mic, L as MicOff, Tt as Bot, n as X } from "../_libs/lucide-react.mjs";
import { p as require_react_dom } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/IrisVoiceAgent-C0NgV1tU.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var import_react_dom = /* @__PURE__ */ __toESM(require_react_dom());
var agentId = {
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
}["VITE_ELEVENLABS_AGENT_ID"] || "agent_0301m3r2q41pfj99jfgqq13jwnfy";
function IrisVoiceAgentControls({ autoStart }) {
	const { startSession, endSession, status, message, isMuted, setMuted, mode } = useConversation();
	const [isOpen, setIsOpen] = (0, import_react.useState)(false);
	const [isMounted, setIsMounted] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => setIsMounted(true), []);
	(0, import_react.useEffect)(() => {
		if (!autoStart) return;
		setIsOpen(true);
		startSession({ onError: (errorMessage) => setError(errorMessage) });
	}, [autoStart, startSession]);
	(0, import_react.useEffect)(() => {
		if (status !== "connecting") return;
		const timeoutId = window.setTimeout(() => {
			setError("Connection timed out. Check your connection and try again.");
			endSession();
		}, 15e3);
		return () => window.clearTimeout(timeoutId);
	}, [endSession, status]);
	const startConversation = () => {
		setIsOpen(true);
		setError("");
		startSession({ onError: (errorMessage) => setError(errorMessage) });
	};
	const closeConversation = () => {
		endSession();
		setIsOpen(false);
		setError("");
	};
	if (!isMounted) return null;
	return (0, import_react_dom.createPortal)(/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "pointer-events-none fixed inset-0 z-[2147483647]",
		children: [isOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			"aria-label": "IRIS voice conversation",
			className: "pointer-events-auto fixed bottom-[5.25rem] left-3 right-3 flex max-h-[min(28rem,calc(100dvh-7rem))] flex-col overflow-hidden rounded-xl border border-cyan-signal/40 bg-card/95 shadow-panel backdrop-blur-xl sm:left-auto sm:right-4 sm:w-[22rem]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "flex items-center justify-between border-b border-border bg-secondary/40 p-3.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "grid size-9 place-items-center rounded-full border border-cyan-signal/40 bg-cyan-signal/15 text-cyan-signal shadow-glow",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bot, {
								className: "size-5",
								"aria-hidden": "true"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-xs font-bold text-foreground",
							children: "IRIS VOICE"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[10px] font-mono text-muted-foreground",
							"aria-live": "polite",
							children: error || message || (status === "connecting" ? "Connecting to IRIS..." : status === "connected" ? mode === "speaking" ? "IRIS is speaking" : "Listening" : status === "error" ? "Connection failed" : "Ready to connect")
						})] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: closeConversation,
						className: "grid size-8 place-items-center rounded-md text-muted-foreground hover:bg-secondary hover:text-foreground",
						"aria-label": "End conversation and close IRIS voice",
						title: "End conversation",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {
							className: "size-4",
							"aria-hidden": "true"
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex min-h-36 flex-1 flex-col items-center justify-center gap-3 px-5 py-6 text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "grid size-16 place-items-center rounded-full border border-cyan-signal/40 bg-cyan-signal/10 text-cyan-signal shadow-glow",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bot, {
								className: "size-8",
								"aria-hidden": "true"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-medium text-foreground",
							children: status === "connected" ? mode === "speaking" ? "IRIS is responding" : "I'm listening" : status === "connecting" ? "Starting your voice session" : "Talk with IRIS"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "max-w-xs text-xs leading-relaxed text-muted-foreground",
							children: error ? "Check microphone permission and your connection, then try again." : status === "connected" ? "Ask about the incident, attack path, or response options." : "Your browser may ask for microphone access."
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
					className: "flex items-center justify-center gap-3 border-t border-border p-3",
					children: status === "connected" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => setMuted(!isMuted),
						className: "inline-flex min-h-10 items-center gap-2 rounded-lg border border-border px-3 text-xs font-medium text-foreground hover:bg-secondary",
						"aria-label": isMuted ? "Unmute microphone" : "Mute microphone",
						children: [isMuted ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MicOff, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mic, { className: "size-4" }), isMuted ? "Unmute" : "Mute"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: closeConversation,
						className: "inline-flex min-h-10 items-center gap-2 rounded-lg bg-destructive px-3 text-xs font-semibold text-destructive-foreground hover:bg-destructive/90",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PhoneOff, { className: "size-4" }), " End call"]
					})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: startConversation,
						disabled: status === "connecting",
						className: "inline-flex min-h-10 items-center gap-2 rounded-lg bg-cyan-signal px-4 text-xs font-semibold text-background hover:bg-cyan-400 disabled:cursor-wait disabled:opacity-60",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mic, { className: "size-4" }), status === "connecting" ? "Connecting..." : "Start conversation"]
					})
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			onClick: isOpen ? closeConversation : startConversation,
			className: "pointer-events-auto fixed bottom-4 right-4 grid size-14 place-items-center rounded-full border border-cyan-signal/60 bg-cyan-signal text-background shadow-[0_0_30px_color-mix(in_oklab,var(--cyan-signal)_35%,transparent)] transition-transform hover:scale-105 hover:bg-cyan-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-signal focus-visible:ring-offset-2 focus-visible:ring-offset-background",
			"aria-label": isOpen ? "End IRIS voice conversation" : "Talk to IRIS by voice",
			title: isOpen ? "End IRIS voice conversation" : "Talk to IRIS by voice",
			children: isOpen ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PhoneOff, { className: "size-6" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bot, { className: "size-6" })
		})]
	}), document.body);
}
function IrisVoiceAgent({ autoStart = false }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConversationProvider, {
		agentId,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IrisVoiceAgentControls, { autoStart })
	});
}
//#endregion
export { IrisVoiceAgent };
