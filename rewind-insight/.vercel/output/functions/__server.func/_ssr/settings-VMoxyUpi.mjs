import { r as __toESM } from "../_runtime.mjs";
import { i as require_react, r as require_jsx_runtime } from "../_libs/elevenlabs__react+react.mjs";
import { Ct as Building2, N as Palette, Tt as Bot, a as Users, gt as CircleCheck, h as Shield, i as Volume2, kt as Bell, p as SlidersHorizontal } from "../_libs/lucide-react.mjs";
import { i as elevenLabsAgentService, n as ELEVENLABS_MODEL_ID, r as ELEVENLABS_VOICE_ID, t as ELEVENLABS_AGENT_ID } from "./elevenLabsAgentService-CAH0X6eo.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { n as PageHeader, t as GlassPanel } from "./PageHeader-DeDQgGHW.mjs";
import { n as SwitchThumb, t as Switch$1 } from "../_libs/radix-ui__react-switch.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/settings-VMoxyUpi.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Switch = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch$1, {
	className: cn("peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input", className),
	...props,
	ref,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SwitchThumb, { className: cn("pointer-events-none block h-4 w-4 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0") })
}));
Switch.displayName = Switch$1.displayName;
var items = [
	[
		Building2,
		"Organization",
		"Security Team Workspace"
	],
	[
		Users,
		"Users",
		"12 analysts and responders"
	],
	[
		Bell,
		"Notifications",
		"Critical incidents and approvals"
	],
	[
		SlidersHorizontal,
		"Simulation Settings",
		"Accelerated timeline playback"
	],
	[
		Shield,
		"Security",
		"Human approval always required"
	],
	[
		Palette,
		"Appearance",
		"Command center theme"
	]
];
function SettingsView() {
	const [voiceEnabled, setVoiceEnabled] = (0, import_react.useState)(() => elevenLabsAgentService.getState().voiceEnabled);
	(0, import_react.useEffect)(() => {
		return elevenLabsAgentService.subscribe((s) => {
			setVoiceEnabled(s.voiceEnabled);
		});
	}, []);
	const handleVoiceToggle = (checked) => {
		elevenLabsAgentService.setVoiceEnabled(checked);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-4xl animate-fade-in space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				eyebrow: "Workspace controls",
				title: "Settings",
				description: "Configure the synthetic Incident Time Machine demonstration."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GlassPanel, {
				className: "p-5 border-cyan-signal/30 bg-card/60",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex items-start justify-between gap-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "grid size-10 place-items-center rounded-lg bg-cyan-signal/15 text-cyan-signal border border-cyan-signal/40",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bot, { className: "size-5" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-semibold text-foreground",
									children: "ElevenLabs Conversational Agent (IRIS)"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "flex items-center gap-1 rounded bg-emerald-500/20 px-2 py-0.5 text-[10px] font-mono font-bold text-emerald-400 border border-emerald-500/30",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-3" }), "CONFIGURED"]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground mt-0.5",
								children: "Deterministic IRIS engine provides ground truth; ElevenLabs provides natural conversational delivery and voice."
							})] })]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs font-mono",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-lg border border-border/70 bg-background/50 p-2.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[10px] text-muted-foreground uppercase",
									children: "Agent ID"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-bold text-foreground truncate mt-0.5",
									title: ELEVENLABS_AGENT_ID,
									children: ELEVENLABS_AGENT_ID
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-lg border border-border/70 bg-background/50 p-2.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[10px] text-muted-foreground uppercase",
									children: "Voice ID"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-bold text-foreground truncate mt-0.5",
									title: ELEVENLABS_VOICE_ID,
									children: ELEVENLABS_VOICE_ID
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-lg border border-border/70 bg-background/50 p-2.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[10px] text-muted-foreground uppercase",
									children: "Model"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-bold text-cyan-signal truncate mt-0.5",
									children: ELEVENLABS_MODEL_ID
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-lg border border-border/70 bg-background/50 p-2.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[10px] text-muted-foreground uppercase",
									children: "ASR / STT"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-bold text-foreground truncate mt-0.5",
									children: "Scribe Realtime"
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 pt-4 border-t border-border/60 flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Volume2, { className: "size-4 text-cyan-signal" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs font-semibold text-foreground",
								children: "Voice Output"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[11px] text-muted-foreground",
								children: "Automatically vocalize IRIS answers using ElevenLabs conversational voice."
							})] })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
							checked: voiceEnabled,
							onCheckedChange: handleVoiceToggle,
							"aria-label": "Voice Output enabled"
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GlassPanel, {
				className: "divide-y divide-border",
				children: items.map(([Icon, title, description]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-4 p-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "grid size-10 place-items-center rounded-lg bg-secondary text-cyan-signal",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-5" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-semibold text-foreground",
								children: title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted-foreground",
								children: description
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-sm text-muted-foreground",
							children: "Manage →"
						})
					]
				}, title))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GlassPanel, {
				className: "flex items-center justify-between gap-4 border-green-signal/25 p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-semibold text-foreground",
					children: "Demo Mode & Safety Boundary"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted-foreground",
					children: "Strictly synthetic incident telemetry (INC-2048). No real-world endpoint or infrastructure mutations."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
					checked: true,
					"aria-label": "Demo Mode enabled"
				})]
			})
		]
	});
}
var SplitComponent = SettingsView;
//#endregion
export { SplitComponent as component };
