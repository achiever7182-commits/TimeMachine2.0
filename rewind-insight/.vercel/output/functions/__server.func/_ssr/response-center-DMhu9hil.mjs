import { r as __toESM } from "../_runtime.mjs";
import { i as require_react, r as require_jsx_runtime } from "../_libs/elevenlabs__react+react.mjs";
import { At as ArrowRight, B as LoaderCircle, St as Check, _ as ShieldCheck, p as SlidersHorizontal, pt as Circle } from "../_libs/lucide-react.mjs";
import { n as CheckboxIndicator, t as Checkbox$1 } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
import { x as useDemo } from "./DemoContext-DI0dcfwA.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { t as Button } from "./button-Bq5vK6RO.mjs";
import { r as responseActions } from "./incidents-Dy2WfHLh.mjs";
import { n as PageHeader, t as GlassPanel } from "./PageHeader-DeDQgGHW.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/response-center-DMhu9hil.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Checkbox = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox$1, {
	ref,
	className: cn("grid place-content-center peer h-4 w-4 shrink-0 rounded-sm border border-primary shadow cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground", className),
	...props,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckboxIndicator, {
		className: cn("grid place-content-center text-current"),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-4 w-4" })
	})
}));
Checkbox.displayName = Checkbox$1.displayName;
function ResponseCenterView() {
	const { responseApproved, approveResponse, executionStep } = useDemo();
	const [checked, setChecked] = (0, import_react.useState)(Object.fromEntries(responseActions.map((action) => [action.id, true])));
	const allSelected = responseActions.every((action) => checked[action.id]);
	const contained = responseApproved && executionStep >= responseActions.length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-5xl animate-fade-in",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			eyebrow: "Human-in-the-loop control",
			title: "Response Plan Ready",
			description: "IRIS recommends the actions below. A human analyst must review and approve them before the simulated response begins."
		}), !responseApproved ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "space-y-3",
			children: responseActions.map((action, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GlassPanel, {
				className: "p-5",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
						checked: Boolean(checked[action.id]),
						onCheckedChange: (value) => setChecked((current) => ({
							...current,
							[action.id]: Boolean(value)
						})),
						"aria-label": `Select ${action.label}`,
						className: "mt-1 size-5"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0 flex-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-center justify-between gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
									className: "font-semibold",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "mr-3 font-mono text-cyan-signal",
										children: String(index + 1).padStart(2, "0")
									}), action.label]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "rounded-full border border-border px-2 py-1 text-[10px] font-semibold uppercase",
									children: ["Risk ", action.risk]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm text-muted-foreground",
								children: action.explanation
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-4 grid gap-3 sm:grid-cols-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-lg bg-secondary/40 p-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[10px] uppercase tracking-[0.15em] text-muted-foreground",
										children: "Expected effect"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 text-sm",
										children: action.expectedEffect
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-lg bg-secondary/40 p-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[10px] uppercase tracking-[0.15em] text-muted-foreground",
										children: "Business impact"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 text-sm",
										children: action.businessImpact
									})]
								})]
							})
						]
					})]
				})
			}, action.id))
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-6 flex flex-col gap-3 border-t border-border pt-6 sm:flex-row sm:justify-end",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				variant: "outline",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SlidersHorizontal, { className: "size-4" }), "Modify Plan"]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				onClick: approveResponse,
				disabled: !allSelected,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "size-4" }), "Approve Response Plan"]
			})]
		})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GlassPanel, {
			className: "overflow-hidden border-green-signal/35",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "p-6 sm:p-8",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-2xl",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: cn("mx-auto grid size-24 place-items-center rounded-full border text-green-signal", contained ? "border-green-signal bg-green-signal/12 shadow-success animate-shield-in" : "border-cyan-glow bg-primary/10"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "size-11" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-5 text-center text-3xl font-semibold",
							children: contained ? "Incident Contained" : "Executing Simulated Response"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-center text-sm text-muted-foreground",
							children: contained ? "The approved plan completed with no real-world actions." : "Applying approved actions to the synthetic environment."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-8 space-y-3",
							children: responseActions.map((action, index) => {
								const done = executionStep > index;
								const running = executionStep === index;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: cn("flex items-center gap-3 rounded-lg border p-4 transition-all", done ? "border-green-signal/30 bg-green-signal/8" : "border-border bg-secondary/30"),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: cn("grid size-8 place-items-center rounded-full", done ? "bg-green-signal/15 text-green-signal" : running ? "bg-primary/15 text-cyan-signal" : "bg-muted text-muted-foreground"),
										children: done ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-4" }) : running ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-4 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Circle, { className: "size-3" })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-sm font-medium",
										children: done ? action.label.replace("affected ", "simulated ") : action.label
									})]
								}, action.id);
							})
						}),
						contained ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							className: "mt-8 w-full",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/reports",
								children: ["Generate Final Incident Report ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })]
							})
						}) : null
					]
				})
			})
		})]
	});
}
var SplitComponent = ResponseCenterView;
//#endregion
export { SplitComponent as component };
