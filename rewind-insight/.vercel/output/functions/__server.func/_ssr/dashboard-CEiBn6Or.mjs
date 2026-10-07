import { r as require_jsx_runtime } from "../_libs/elevenlabs__react+react.mjs";
import { D as Radar, F as MonitorCheck, Nt as Activity, ft as Clock3, j as Pause, k as Play, v as ShieldAlert, w as RotateCcw } from "../_libs/lucide-react.mjs";
import { n as SIMULATION_SPEEDS, x as useDemo } from "./DemoContext-DI0dcfwA.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { t as Button } from "./button-Bq5vK6RO.mjs";
import { t as incidents } from "./incidents-Dy2WfHLh.mjs";
import { n as getDashboardSnapshot } from "./incidentService-DUY9s4NE.mjs";
import { n as PageHeader, t as GlassPanel } from "./PageHeader-DeDQgGHW.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/dashboard-CEiBn6Or.js
var import_jsx_runtime = require_jsx_runtime();
var kpiIcons = [
	Activity,
	ShieldAlert,
	MonitorCheck,
	Clock3
];
function DashboardView() {
	const { incident, incidentState, currentRisk, currentTime, isAttackRunning, isPaused, simulationSpeed, setSimulationSpeed, startAttackSimulation, pauseSimulation, resumeSimulation, resetDemo } = useDemo();
	const snapshot = getDashboardSnapshot(incidentState);
	const isCritical = currentRisk === "CRITICAL" || currentRisk === "Critical";
	const isHigh = currentRisk === "HIGH" || currentRisk === "High";
	const isMedium = currentRisk === "MEDIUM" || currentRisk === "Elevated";
	const meterRotation = isCritical ? "rotate-[135deg]" : isHigh ? "rotate-[90deg]" : isMedium ? "rotate-[45deg]" : "rotate-[5deg]";
	const riskColor = isCritical ? "text-threat" : isHigh ? "text-threat" : isMedium ? "text-amber-400" : "text-cyan-signal";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppPage, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			eyebrow: "Good evening, Security Team",
			title: "Incident Time Machine",
			description: "Rewind an incident, compare alternate decisions, and approve a simulated response before action is taken.",
			actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center rounded-lg border border-border bg-secondary/50 p-1 text-xs",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "px-2 text-muted-foreground",
						children: "Speed:"
					}), SIMULATION_SPEEDS.map((spd) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => setSimulationSpeed(spd),
						className: cn("rounded px-2 py-1 font-mono transition-colors", simulationSpeed === spd ? "bg-primary/20 text-cyan-signal font-semibold" : "text-muted-foreground hover:text-foreground"),
						children: [spd, "x"]
					}, spd))]
				}), !isAttackRunning && !isPaused ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					onClick: startAttackSimulation,
					className: "gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Radar, { className: "size-4" }), " Start Attack Simulation"]
				}) : isAttackRunning ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					onClick: pauseSimulation,
					variant: "secondary",
					className: "gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pause, { className: "size-4" }),
						" Pause (",
						currentTime,
						")"
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					onClick: resetDemo,
					variant: "outline",
					size: "icon",
					title: "Reset Incident",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "size-4" })
				})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					onClick: resumeSimulation,
					className: "gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "size-4" }),
						" Resume (",
						currentTime,
						")"
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					onClick: resetDemo,
					variant: "outline",
					size: "icon",
					title: "Reset Incident",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "size-4" })
				})] })]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-4 md:grid-cols-2 xl:grid-cols-4",
			children: snapshot.kpis.map((kpi, index) => {
				const Icon = kpiIcons[index] ?? Activity;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GlassPanel, {
					className: "p-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted-foreground",
								children: kpi.label
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-3xl font-semibold",
								children: kpi.value
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "grid size-10 place-items-center rounded-lg border border-primary/25 bg-primary/12 text-cyan-signal",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-5" })
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 text-xs font-semibold text-green-signal",
							children: kpi.trend
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted-foreground",
							children: kpi.description
						})
					]
				}, kpi.label);
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-6 grid gap-6 xl:grid-cols-[1.1fr_0.9fr]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GlassPanel, {
				className: "overflow-hidden p-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground",
							children: "Current Organizational Risk"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: cn("mt-3 text-6xl font-semibold uppercase transition-colors", riskColor),
							children: String(currentRisk).toUpperCase()
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-2 text-sm text-muted-foreground",
							children: [
								"Live simulation stage:",
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono text-foreground",
									children: snapshot.stage
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 text-xs text-muted-foreground",
							children: ["Simulation Clock: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono text-cyan-signal",
								children: currentTime
							})]
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative mx-auto aspect-square w-64 max-w-full",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 rounded-full border border-border bg-secondary/30" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-4 rounded-full border border-cyan-glow bg-background/60" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-8 rounded-full border-[18px] border-muted" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: cn("absolute inset-8 rounded-full border-[18px] border-transparent transition-transform duration-700", isCritical ? "border-t-threat border-r-threat" : isHigh ? "border-t-threat border-r-threat" : isMedium ? "border-t-amber-400 border-r-amber-400" : "border-t-cyan-signal border-r-cyan-signal", meterRotation) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "absolute inset-0 grid place-items-center text-center",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldAlert, { className: cn("mx-auto size-10 transition-colors", riskColor) }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-2 text-sm font-semibold",
										children: "Risk meter"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-mono text-xs text-muted-foreground",
										children: currentTime
									})
								]
							})
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-8 grid grid-cols-4 gap-2",
					children: [
						{
							label: "Low",
							active: true
						},
						{
							label: "Medium",
							active: isMedium || isHigh || isCritical
						},
						{
							label: "High",
							active: isHigh || isCritical
						},
						{
							label: "Critical",
							active: isCritical
						}
					].map(({ label, active }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: cn("h-2 rounded-full transition-colors", active ? isCritical ? "bg-threat" : isHigh ? "bg-amber-500" : isMedium ? "bg-amber-400" : "bg-cyan-signal" : "bg-muted") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 truncate text-xs text-muted-foreground",
							children: label
						})]
					}, label))
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GlassPanel, {
				className: "p-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-4 flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-semibold uppercase tracking-[0.2em] text-cyan-signal",
						children: "Active incidents"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-1 text-xl font-semibold",
						children: "Critical queue"
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						variant: "outline",
						size: "sm",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/incidents",
							children: "View all"
						})
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-3",
					children: incidents.map((inc) => {
						const displayIncident = inc.id === "INC-2048" ? incident : inc;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
							className: "rounded-lg border border-border bg-secondary/35 p-4 transition-colors hover:border-cyan-glow",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-start justify-between gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-mono text-xs text-muted-foreground",
										children: displayIncident.id
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "mt-1 font-semibold",
										children: displayIncident.title
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "mt-1 text-sm text-muted-foreground",
										children: ["Detected ", displayIncident.detectedAgo]
									}),
									displayIncident.employeeAccount ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "mt-1 text-sm text-muted-foreground",
										children: [
											"Employee Account:",
											" ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-mono text-foreground",
												children: displayIncident.employeeAccount
											})
										]
									}) : null
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: cn("rounded-full border px-2.5 py-1 text-xs font-semibold uppercase", displayIncident.severity === "CRITICAL" ? "border-threat/40 bg-threat/10 text-threat" : displayIncident.severity === "HIGH" ? "border-warning/40 bg-warning/10 text-warning" : "border-cyan-glow bg-primary/10 text-cyan-signal"),
									children: displayIncident.severity
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-4 flex items-center justify-between gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-sm text-muted-foreground",
									children: [
										"Affected assets:",
										" ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
											className: "text-foreground",
											children: displayIncident.affectedAssets ?? 0
										})
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									asChild: true,
									size: "sm",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/time-machine",
										children: "Open Investigation →"
									})
								})]
							})]
						}, displayIncident.id);
					})
				})]
			})]
		})
	] });
}
function AppPage({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mx-auto max-w-7xl animate-fade-in",
		children
	});
}
var SplitComponent = DashboardView;
//#endregion
export { SplitComponent as component };
