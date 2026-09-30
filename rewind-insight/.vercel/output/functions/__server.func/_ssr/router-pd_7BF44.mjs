import { r as __toESM } from "../_runtime.mjs";
import { i as require_react, r as require_jsx_runtime } from "../_libs/elevenlabs__react+react.mjs";
import { $ as FlaskConical, At as ArrowRight, C as Search, D as Radar, H as ListChecks, M as PanelRightOpen, P as Network, R as Menu, S as Send, Tt as Bot, X as GitBranch, _ as ShieldCheck, b as Settings, f as Sparkles, ht as CircleDot, kt as Bell, l as TriangleAlert, m as Siren, n as X, q as House, tt as FileText, w as RotateCcw, wt as BrainCircuit } from "../_libs/lucide-react.mjs";
import { p as require_react_dom } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
import { t as DemoProvider, x as useDemo } from "./DemoContext-DI0dcfwA.mjs";
import { t as irisService } from "./irisService-LaFd4rdD.mjs";
import { c as HeadContent, d as createRouter, f as Outlet, g as Link, h as createRootRouteWithContext, l as useRouterState, m as createFileRoute, p as lazyRouteComponent, s as Scripts, v as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { t as Button } from "./button-Bq5vK6RO.mjs";
import { t as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { a as DialogOverlay, c as DialogTrigger, i as DialogDescription, n as DialogClose, o as DialogPortal, r as DialogContent, s as DialogTitle, t as Dialog } from "../_libs/@radix-ui/react-dialog+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-pd_7BF44.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var import_react_dom = /* @__PURE__ */ __toESM(require_react_dom());
var Sheet = Dialog;
var SheetTrigger = DialogTrigger;
var SheetPortal = DialogPortal;
var SheetOverlay = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, {
	className: cn("fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className),
	...props,
	ref
}));
SheetOverlay.displayName = DialogOverlay.displayName;
var sheetVariants = cva("fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500 data-[state=open]:animate-in data-[state=closed]:animate-out", {
	variants: { side: {
		top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
		bottom: "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
		left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
		right: "inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm"
	} },
	defaultVariants: { side: "right" }
});
var SheetContent = import_react.forwardRef(({ side = "right", className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
	ref,
	className: cn(sheetVariants({ side }), className),
	...props,
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogClose, {
		className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background cursor-pointer transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "sr-only",
			children: "Close"
		})]
	}), children]
})] }));
SheetContent.displayName = DialogContent.displayName;
var SheetHeader = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col space-y-2 text-center sm:text-left", className),
	...props
});
SheetHeader.displayName = "SheetHeader";
var SheetFooter = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
	...props
});
SheetFooter.displayName = "SheetFooter";
var SheetTitle = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
	ref,
	className: cn("text-lg font-semibold text-foreground", className),
	...props
}));
SheetTitle.displayName = DialogTitle.displayName;
var SheetDescription = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
	ref,
	className: cn("text-sm text-muted-foreground", className),
	...props
}));
SheetDescription.displayName = DialogDescription.displayName;
function IrisCopilot() {
	const { currentTime, currentMinute, currentRisk, counterfactualBranch, scenarioHistory, simulateAction, activeAction } = useDemo();
	const [open, setOpen] = (0, import_react.useState)(false);
	const [messages, setMessages] = (0, import_react.useState)([{
		id: "initial",
		from: "iris",
		text: "Greetings, Analyst. I am IRIS (Incident Response Intelligence System). I provide deterministic decision support and autonomous simulated remediation grounded in the INC-2048 engine.",
		timestamp: currentTime
	}]);
	const [input, setInput] = (0, import_react.useState)("");
	const [loading, setLoading] = (0, import_react.useState)(false);
	const chatFeedRef = (0, import_react.useRef)(null);
	const irisContext = (0, import_react.useMemo)(() => {
		return irisService.createContext(currentMinute, counterfactualBranch, scenarioHistory);
	}, [
		currentMinute,
		counterfactualBranch,
		scenarioHistory
	]);
	(0, import_react.useEffect)(() => {
		if (chatFeedRef.current) chatFeedRef.current.scrollTop = chatFeedRef.current.scrollHeight;
	}, [messages, loading]);
	const quickPrompts = [
		"What did we know at 10:04?",
		"What should we do right now?",
		"Compare the available response options.",
		"What happens if we isolate LAPTOP-042?",
		"What happens if we do nothing?",
		"Simulate your recommended response."
	];
	const handleAsk = async (queryText) => {
		const q = (queryText ?? input).trim();
		if (!q || loading) return;
		setMessages((prev) => [...prev, {
			id: `usr-${Date.now()}`,
			from: "user",
			text: q,
			timestamp: currentTime
		}]);
		setInput("");
		setLoading(true);
		try {
			const resp = await irisService.ask(q, irisContext);
			setMessages((prev) => [...prev, {
				id: `iris-${Date.now()}`,
				from: "iris",
				text: resp.answer,
				response: resp,
				timestamp: currentTime
			}]);
		} catch (err) {
			setMessages((prev) => [...prev, {
				id: `err-${Date.now()}`,
				from: "iris",
				text: "An error occurred while evaluating the synthetic telemetry.",
				timestamp: currentTime
			}]);
		} finally {
			setLoading(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
		size: "icon",
		onClick: () => setOpen(true),
		className: "fixed bottom-20 right-4 z-40 size-12 rounded-full shadow-glow bg-cyan-signal text-background hover:bg-cyan-400",
		"aria-label": "Open IRIS Assistant",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bot, { className: "size-6" })
	}), open && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "fixed inset-x-3 bottom-3 z-50 flex max-h-[82vh] flex-col rounded-xl border border-cyan-signal/40 bg-card/95 shadow-panel backdrop-blur-xl sm:left-auto sm:right-4 sm:w-[440px] overflow-hidden animate-in fade-in zoom-in-95",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between border-b border-border p-3.5 bg-secondary/40",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "grid size-9 place-items-center rounded-lg bg-cyan-signal/15 text-cyan-signal border border-cyan-signal/30",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bot, { className: "size-5" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-bold text-foreground",
							children: "IRIS COPILOT"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "rounded bg-cyan-signal/20 px-1.5 py-0.2 font-mono text-[9px] font-bold text-cyan-signal border border-cyan-signal/30",
							children: "SIMULATION ONLY"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-[10px] text-muted-foreground font-mono",
						children: [
							"INC-2048 @ ",
							currentTime,
							" · Risk: ",
							currentRisk
						]
					})] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "icon",
						onClick: () => setMessages([{
							id: `rst-${Date.now()}`,
							from: "iris",
							text: `Investigation reset. Grounded at ${currentTime}.`,
							timestamp: currentTime
						}]),
						title: "Reset history",
						className: "size-7 text-muted-foreground hover:text-foreground",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "size-3.5" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "icon",
						onClick: () => setOpen(false),
						className: "size-7 text-muted-foreground hover:text-foreground",
						"aria-label": "Close IRIS",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" })
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-1.5 bg-amber-500/10 px-3 py-1 text-[10px] text-amber-300 border-b border-amber-500/20",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "size-3 shrink-0 text-amber-400" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Synthetic engine only. No real endpoints or credentials touched." })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				ref: chatFeedRef,
				className: "min-h-0 flex-1 space-y-3 overflow-y-auto p-3.5 text-xs",
				children: [messages.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: `flex flex-col ${m.from === "user" ? "items-end" : "items-start"}`,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: `max-w-[92%] rounded-xl p-3 text-[11.5px] leading-relaxed shadow-sm ${m.from === "user" ? "bg-cyan-signal/20 text-foreground border border-cyan-signal/30 ml-6" : "bg-secondary/50 text-foreground border border-border/80 mr-4"}`,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between gap-2 mb-1.5 font-mono text-[9px] text-muted-foreground border-b border-border/40 pb-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-bold text-cyan-signal uppercase",
									children: m.from === "user" ? "You" : "IRIS"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: m.timestamp })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "whitespace-pre-line font-sans",
								children: m.text
							}),
							m.response?.intentCategory === "RESPONSE_RECOMMENDATION" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-2.5 pt-2 border-t border-cyan-signal/30 flex items-center justify-between gap-2",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/simulation-lab",
									onClick: () => setOpen(false),
									className: "flex items-center gap-1 text-[11px] font-bold text-cyan-signal hover:underline",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Open in Simulation Lab" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-3" })]
								})
							})
						]
					})
				}, m.id)), loading && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 text-xs text-muted-foreground italic py-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-3.5 animate-spin text-cyan-signal" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Evaluating Phase 4 counterfactual model..." })]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex gap-1.5 overflow-x-auto border-t border-border/60 bg-secondary/20 p-2 scrollbar-none",
				children: quickPrompts.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => handleAsk(p),
					disabled: loading,
					className: "shrink-0 rounded-md border border-border/80 bg-background/60 px-2 py-1 text-[10px] text-foreground hover:border-cyan-signal/50 hover:bg-cyan-signal/10 transition-colors disabled:opacity-50",
					children: p
				}, p))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: (e) => {
					e.preventDefault();
					handleAsk();
				},
				className: "flex items-center gap-2 border-t border-border p-2.5 bg-background/80",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "text",
					value: input,
					onChange: (e) => setInput(e.target.value),
					placeholder: "Ask IRIS about responses, what-ifs, or evidence...",
					disabled: loading,
					className: "flex-1 rounded-lg border border-border bg-input/40 px-3 py-1.5 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-cyan-signal"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "submit",
					size: "sm",
					disabled: !input.trim() || loading,
					className: "bg-cyan-signal text-background hover:bg-cyan-400 font-bold px-3 py-1.5 h-auto text-xs",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "size-3.5" })
				})]
			})
		]
	})] });
}
var navItems = [
	{
		label: "Dashboard",
		to: "/dashboard",
		icon: House
	},
	{
		label: "Incidents",
		to: "/incidents",
		icon: Siren
	},
	{
		label: "Digital Twin",
		to: "/digital-twin",
		icon: Network
	},
	{
		label: "Incident Time Machine",
		to: "/time-machine",
		icon: BrainCircuit
	},
	{
		label: "Attack Graph",
		to: "/attack-graph",
		icon: GitBranch
	},
	{
		label: "Simulation Lab",
		to: "/simulation-lab",
		icon: FlaskConical
	},
	{
		label: "IRIS Investigator",
		to: "/iris",
		icon: Bot
	},
	{
		label: "Evidence",
		to: "/evidence",
		icon: Radar
	},
	{
		label: "Response Center",
		to: "/response-center",
		icon: ListChecks
	},
	{
		label: "Reports",
		to: "/reports",
		icon: FileText
	},
	{
		label: "Settings",
		to: "/settings",
		icon: Settings
	}
];
function NavLinks({ onNavigate }) {
	const pathname = useRouterState({ select: (state) => state.location.pathname });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
		className: "space-y-1",
		"aria-label": "Primary",
		children: navItems.map((item) => {
			const Icon = item.icon;
			const active = pathname === item.to;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: item.to,
				onClick: onNavigate,
				className: cn("group flex min-h-11 items-center gap-3 rounded-lg border px-3 text-sm font-medium transition-all duration-200", active ? "border-cyan-glow bg-primary/15 text-foreground shadow-glow" : "border-transparent text-muted-foreground hover:border-border hover:bg-secondary/70 hover:text-foreground"),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: cn("size-4", active ? "text-cyan-signal" : "text-muted-foreground group-hover:text-cyan-signal") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: item.label })]
			}, item.to);
		})
	});
}
function AppShell({ children }) {
	const { demoStage, isAttackRunning, isPaused, currentTime, startAttackSimulation, pauseSimulation, resumeSimulation, resetDemo } = useDemo();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background text-foreground",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "fixed inset-0 -z-10 bg-command-grid opacity-70" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "fixed inset-0 -z-10 bg-[radial-gradient(circle_at_20%_10%,var(--aura-cyan),transparent_28%),radial-gradient(circle_at_90%_0%,var(--aura-violet),transparent_24%),linear-gradient(180deg,var(--background),var(--background))]" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "fixed inset-y-0 left-0 z-30 hidden w-72 border-r border-border bg-sidebar/80 px-4 py-5 backdrop-blur-xl lg:flex lg:flex-col overflow-y-auto",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/",
						className: "mb-6 flex items-center gap-3 rounded-lg px-2 shrink-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "grid size-11 place-items-center rounded-lg border border-cyan-glow bg-primary/15 shadow-glow",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "size-5 text-cyan-signal" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block text-sm font-semibold uppercase tracking-[0.22em] text-muted-foreground",
							children: "Incident"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block text-lg font-semibold",
							children: "Time Machine"
						})] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex-1 overflow-y-auto pr-1 space-y-1",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavLinks, {})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 shrink-0 rounded-lg border border-border bg-card/70 p-4 shadow-panel",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between text-xs font-semibold uppercase tracking-[0.18em] text-cyan-signal",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleDot, { className: cn("size-3", isAttackRunning && "animate-pulse") }), " DEMO MODE"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono text-muted-foreground",
									children: currentTime
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-xs text-muted-foreground",
								children: "Synthetic telemetry only. No real infrastructure actions are connected."
							}),
							!isAttackRunning && !isPaused ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								className: "mt-4 w-full",
								onClick: startAttackSimulation,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Radar, { className: "size-4" }), " Start Attack Simulation"]
							}) : isAttackRunning ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-4 flex gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									className: "flex-1",
									variant: "secondary",
									size: "sm",
									onClick: pauseSimulation,
									children: "Pause"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "outline",
									size: "sm",
									onClick: resetDemo,
									children: "Reset"
								})]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-4 flex gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									className: "flex-1",
									size: "sm",
									onClick: resumeSimulation,
									children: "Resume"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "outline",
									size: "sm",
									onClick: resetDemo,
									children: "Reset"
								})]
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-h-screen lg:pl-72",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
					className: "sticky top-0 z-20 border-b border-border bg-background/75 backdrop-blur-xl",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex min-h-16 items-center gap-3 px-4 sm:px-6 lg:px-8",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sheet, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetTrigger, {
								asChild: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "outline",
									size: "icon",
									className: "lg:hidden",
									"aria-label": "Open navigation",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "size-4" })
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetContent, {
								side: "left",
								className: "w-80 border-border bg-sidebar/95 p-5 backdrop-blur-xl",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetHeader, {
									className: "mb-5 text-left",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetTitle, { children: "Incident Time Machine" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetDescription, { children: "Demo security center navigation." })]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavLinks, {})]
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "hidden min-w-0 flex-1 items-center rounded-lg border border-border bg-input/30 px-3 py-2 sm:flex",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "mr-2 size-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-sm text-muted-foreground",
									children: "Search incidents, hosts, hashes, evidence"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "ml-auto flex items-center gap-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "hidden items-center gap-2 rounded-full border border-green-signal/30 bg-green-signal/10 px-3 py-1.5 text-xs font-semibold text-green-signal sm:inline-flex",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleDot, { className: "size-3" }), " Systems nominal"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-3 py-1.5 text-xs font-semibold text-cyan-signal",
										children: "DEMO MODE"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										variant: "outline",
										size: "icon",
										"aria-label": "Notifications",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, { className: "size-4" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "grid size-9 place-items-center rounded-lg border border-border bg-card font-semibold",
										children: "SK"
									})
								]
							})
						]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
					className: "px-4 py-6 sm:px-6 lg:px-8",
					children
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IrisCopilot, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				className: "fixed bottom-4 left-4 z-30 hidden shadow-glow lg:inline-flex",
				variant: "secondary",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/time-machine",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PanelRightOpen, { className: "size-4" }), " Resume demo flow"]
				})
			})
		]
	});
}
var IrisVoiceAgent = (0, import_react.lazy)(() => import("./IrisVoiceAgent-C0NgV1tU.mjs").then(({ IrisVoiceAgent: Component }) => ({ default: Component })));
function IrisVoiceLauncher() {
	const [isActivated, setIsActivated] = (0, import_react.useState)(false);
	const [isMounted, setIsMounted] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => setIsMounted(true), []);
	if (!isMounted) return null;
	return (0, import_react_dom.createPortal)(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "pointer-events-none fixed inset-0 z-[2147483647]",
		children: isActivated ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Suspense, {
			fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				role: "status",
				className: "pointer-events-auto fixed bottom-4 right-4 rounded-xl border border-cyan-signal/40 bg-card/95 px-4 py-3 text-sm text-foreground shadow-panel",
				children: "Loading IRIS voice..."
			}),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IrisVoiceAgent, { autoStart: true })
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			onClick: () => setIsActivated(true),
			className: "pointer-events-auto fixed bottom-4 right-4 grid size-14 place-items-center rounded-full border border-cyan-signal/60 bg-cyan-signal text-background shadow-[0_0_30px_color-mix(in_oklab,var(--cyan-signal)_35%,transparent)] transition-transform hover:scale-105 hover:bg-cyan-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-signal focus-visible:ring-offset-2 focus-visible:ring-offset-background",
			"aria-label": "Talk to IRIS by voice",
			title: "Talk to IRIS by voice",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bot, {
				className: "size-6",
				"aria-hidden": "true"
			})
		})
	}), document.body);
}
var styles_default = "/assets/styles-D8GpWh9Q.css";
/**
* Runtime error reporting utility.
* Logs errors to the console in development; can be extended to forward
* to a real observability service in production.
*/
function reportError(error, context = {}) {
	if (typeof window === "undefined") return;
	const message = error instanceof Response ? `Response ${error.status}${error.url ? ` at ${error.url}` : ""}` : error instanceof Error ? error.message : String(error);
	const stack = error instanceof Error ? error.stack : void 0;
	console.error("[incident-time-machine] Runtime error:", message, {
		...context,
		...stack !== void 0 && { stack },
		route: window.location.pathname
	});
}
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid min-h-screen place-items-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-mono text-cyan-signal",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-2 text-3xl font-semibold",
					children: "Signal not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-muted-foreground",
					children: "This view is outside the reconstructed timeline."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						children: "Return home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	const router = useRouter();
	(0, import_react.useEffect)(() => reportError(error, { boundary: "incident_time_machine" }), [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid min-h-screen place-items-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold",
					children: "Something went wrong while loading this view."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The demo is safe. Retry the view or return to the dashboard."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						onClick: () => {
							router.invalidate();
							reset();
						},
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						variant: "outline",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/dashboard",
							children: "Dashboard"
						})
					})]
				})
			]
		})
	});
}
var Route$13 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "Incident Time Machine | AI Incident Response" },
			{
				name: "description",
				content: "AI-powered incident response with incident reconstruction and counterfactual simulation."
			},
			{
				name: "application-name",
				content: "Incident Time Machine"
			},
			{
				name: "theme-color",
				content: "#0a0f1a"
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				property: "og:title",
				content: "Incident Time Machine | AI Incident Response"
			},
			{
				property: "og:description",
				content: "AI-powered incident response with incident reconstruction and counterfactual simulation."
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			},
			{
				name: "twitter:title",
				content: "Incident Time Machine | AI Incident Response"
			},
			{
				name: "twitter:description",
				content: "AI-powered incident response with incident reconstruction and counterfactual simulation."
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600&display=swap"
			},
			{
				rel: "icon",
				type: "image/svg+xml",
				href: "/favicon.svg"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		className: "dark",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$13.useRouteContext();
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DemoProvider, { children: [pathname === "/" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IrisVoiceLauncher, {})] })
	});
}
var $$splitComponentImporter$12 = () => import("./routes-lCG1RmWZ.mjs");
var Route$12 = createFileRoute("/")({
	head: () => ({ meta: [
		{ title: "Incident Time Machine — Rewind. Simulate. Respond." },
		{
			name: "description",
			content: "Explore an AI-powered incident response demo that reconstructs attacks and compares safer decisions before action."
		},
		{
			property: "og:title",
			content: "Incident Time Machine — Rewind. Simulate. Respond."
		},
		{
			property: "og:description",
			content: "Explore an AI-powered incident response demo that reconstructs attacks and compares safer decisions before action."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$12, "component")
});
var $$splitComponentImporter$11 = () => import("./attack-graph-DtwDj2wc.mjs");
var Route$11 = createFileRoute("/attack-graph")({
	head: () => ({ meta: [
		{ title: "Attack Graph — Incident Time Machine" },
		{
			name: "description",
			content: "Explore the reconstructed attack path through affected assets."
		},
		{
			property: "og:title",
			content: "Attack Graph — Incident Time Machine"
		},
		{
			property: "og:description",
			content: "Explore the reconstructed attack path through affected assets."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$11, "component")
});
var $$splitComponentImporter$10 = () => import("./dashboard-CEiBn6Or.mjs");
var Route$10 = createFileRoute("/dashboard")({
	head: () => ({ meta: [
		{ title: "Security Center — Incident Time Machine" },
		{
			name: "description",
			content: "Monitor organizational risk and active synthetic security incidents."
		},
		{
			property: "og:title",
			content: "Security Center — Incident Time Machine"
		},
		{
			property: "og:description",
			content: "Monitor organizational risk and active synthetic security incidents."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$10, "component")
});
var $$splitComponentImporter$9 = () => import("./digital-twin-WhFSpaKA.mjs");
var Route$9 = createFileRoute("/digital-twin")({
	head: () => ({ meta: [
		{ title: "Digital Twin — Incident Time Machine" },
		{
			name: "description",
			content: "Virtual temporal Digital Twin of the organization during incident INC-2048."
		},
		{
			property: "og:title",
			content: "Digital Twin — Incident Time Machine"
		},
		{
			property: "og:description",
			content: "Virtual temporal Digital Twin of the organization during incident INC-2048."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
var $$splitComponentImporter$8 = () => import("./evidence-DwMsfIrg.mjs");
var Route$8 = createFileRoute("/evidence")({
	head: () => ({ meta: [
		{ title: "Evidence Viewer — Incident Time Machine" },
		{
			name: "description",
			content: "Review synthetic authentication, endpoint, network, cloud, and process evidence."
		},
		{
			property: "og:title",
			content: "Evidence Viewer — Incident Time Machine"
		},
		{
			property: "og:description",
			content: "Review synthetic authentication, endpoint, network, cloud, and process evidence."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
var $$splitComponentImporter$7 = () => import("./incidents-Cnp-NGja.mjs");
var Route$7 = createFileRoute("/incidents")({
	head: () => ({ meta: [
		{ title: "Active Incidents — Incident Time Machine" },
		{
			name: "description",
			content: "Investigate prioritized synthetic cybersecurity incidents."
		},
		{
			property: "og:title",
			content: "Active Incidents — Incident Time Machine"
		},
		{
			property: "og:description",
			content: "Investigate prioritized synthetic cybersecurity incidents."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
var $$splitComponentImporter$6 = () => import("./iris-DB6CJT-N.mjs");
var Route$6 = createFileRoute("/iris")({
	head: () => ({ meta: [
		{ title: "IRIS Investigator — Incident Time Machine" },
		{
			name: "description",
			content: "Intelligent Response & Investigation System grounded in INC-2048 telemetry."
		},
		{
			property: "og:title",
			content: "IRIS Investigator — Incident Time Machine"
		},
		{
			property: "og:description",
			content: "Intelligent Response & Investigation System grounded in INC-2048 telemetry."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
var $$splitComponentImporter$5 = () => import("./learning-R3TrSz6B.mjs");
var Route$5 = createFileRoute("/learning")({
	head: () => ({ meta: [{ title: "Post-Incident Learning — Incident Time Machine" }, {
		name: "description",
		content: "Post-incident learning metrics, root cause, and damage prevention analysis."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var $$splitComponentImporter$4 = () => import("./reports-nzdzGWOq.mjs");
var Route$4 = createFileRoute("/reports")({
	head: () => ({ meta: [
		{ title: "Incident Resolution Report — Incident Time Machine" },
		{
			name: "description",
			content: "Review the final credential compromise timeline, response, and lessons learned."
		},
		{
			property: "og:title",
			content: "Incident Resolution Report — Incident Time Machine"
		},
		{
			property: "og:description",
			content: "Review the final credential compromise timeline, response, and lessons learned."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitComponentImporter$3 = () => import("./response-center-DMhu9hil.mjs");
var Route$3 = createFileRoute("/response-center")({
	head: () => ({ meta: [
		{ title: "Response Center — Incident Time Machine" },
		{
			name: "description",
			content: "Review and approve a human-controlled simulated response plan."
		},
		{
			property: "og:title",
			content: "Response Center — Incident Time Machine"
		},
		{
			property: "og:description",
			content: "Review and approve a human-controlled simulated response plan."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./settings-VMoxyUpi.mjs");
var Route$2 = createFileRoute("/settings")({
	head: () => ({ meta: [
		{ title: "Settings — Incident Time Machine" },
		{
			name: "description",
			content: "Configure the synthetic Incident Time Machine demonstration."
		},
		{
			property: "og:title",
			content: "Settings — Incident Time Machine"
		},
		{
			property: "og:description",
			content: "Configure the synthetic Incident Time Machine demonstration."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./simulation-lab-X01jXmyA.mjs");
var Route$1 = createFileRoute("/simulation-lab")({
	head: () => ({ meta: [
		{ title: "Simulation Lab — Incident Time Machine" },
		{
			name: "description",
			content: "Compare counterfactual incident response decisions in a safe simulation."
		},
		{
			property: "og:title",
			content: "Simulation Lab — Incident Time Machine"
		},
		{
			property: "og:description",
			content: "Compare counterfactual incident response decisions in a safe simulation."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("./time-machine-DMYqXDPn.mjs");
var Route = createFileRoute("/time-machine")({
	head: () => ({ meta: [
		{ title: "INC-2048 Time Machine — Incident Time Machine" },
		{
			name: "description",
			content: "Rewind a credential compromise and reveal the earliest detection opportunity."
		},
		{
			property: "og:title",
			content: "INC-2048 Time Machine — Incident Time Machine"
		},
		{
			property: "og:description",
			content: "Rewind a credential compromise and reveal the earliest detection opportunity."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var rootRouteChildren = {
	IndexRoute: Route$12.update({
		id: "/",
		path: "/",
		getParentRoute: () => Route$13
	}),
	AttackGraphRoute: Route$11.update({
		id: "/attack-graph",
		path: "/attack-graph",
		getParentRoute: () => Route$13
	}),
	DashboardRoute: Route$10.update({
		id: "/dashboard",
		path: "/dashboard",
		getParentRoute: () => Route$13
	}),
	DigitalTwinRoute: Route$9.update({
		id: "/digital-twin",
		path: "/digital-twin",
		getParentRoute: () => Route$13
	}),
	EvidenceRoute: Route$8.update({
		id: "/evidence",
		path: "/evidence",
		getParentRoute: () => Route$13
	}),
	IncidentsRoute: Route$7.update({
		id: "/incidents",
		path: "/incidents",
		getParentRoute: () => Route$13
	}),
	IrisRoute: Route$6.update({
		id: "/iris",
		path: "/iris",
		getParentRoute: () => Route$13
	}),
	LearningRoute: Route$5.update({
		id: "/learning",
		path: "/learning",
		getParentRoute: () => Route$13
	}),
	ReportsRoute: Route$4.update({
		id: "/reports",
		path: "/reports",
		getParentRoute: () => Route$13
	}),
	ResponseCenterRoute: Route$3.update({
		id: "/response-center",
		path: "/response-center",
		getParentRoute: () => Route$13
	}),
	SettingsRoute: Route$2.update({
		id: "/settings",
		path: "/settings",
		getParentRoute: () => Route$13
	}),
	SimulationLabRoute: Route$1.update({
		id: "/simulation-lab",
		path: "/simulation-lab",
		getParentRoute: () => Route$13
	}),
	TimeMachineRoute: Route.update({
		id: "/time-machine",
		path: "/time-machine",
		getParentRoute: () => Route$13
	})
};
var routeTree = Route$13._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	const queryClient = new QueryClient();
	return createRouter({
		routeTree,
		context: { queryClient },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
