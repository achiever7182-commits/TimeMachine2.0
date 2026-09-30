import { r as __toESM } from "../_runtime.mjs";
import { i as require_react, r as require_jsx_runtime } from "../_libs/elevenlabs__react+react.mjs";
import { At as ArrowRight, D as Radar, G as Laptop, St as Check, c as UserRound, f as Sparkles, ot as Database, rt as FileKey, v as ShieldAlert, wt as BrainCircuit, x as Server } from "../_libs/lucide-react.mjs";
import { x as useDemo } from "./DemoContext-DI0dcfwA.mjs";
import { t as IrisInvestigationPanel } from "./IrisInvestigationPanel-COLlcjpA.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { t as Button } from "./button-Bq5vK6RO.mjs";
import { n as missedSignals } from "./incidents-Dy2WfHLh.mjs";
import { t as getAttackNodesForMinute } from "./incidentService-DUY9s4NE.mjs";
import { n as PageHeader, t as GlassPanel } from "./PageHeader-DeDQgGHW.mjs";
import { t as ForensicTimeline } from "./ForensicTimeline-Cq-zL1VS.mjs";
import { t as IncidentTimeMachine3D } from "./incident-time-machine-3d-BOeYEbR3.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/time-machine-DMYqXDPn.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var icons = {
	radar: Radar,
	user: UserRound,
	laptop: Laptop,
	server: Server,
	database: Database,
	files: FileKey
};
function AttackGraph({ simulation = false }) {
	const { currentMinute, selectedSimulation, isSimulating, simulationProgress } = useDemo();
	const nodes = getAttackNodesForMinute(simulation ? 42 : currentMinute);
	const [selectedId, setSelectedId] = (0, import_react.useState)("LAPTOP-042");
	const selected = nodes.find((node) => node.id === selectedId) ?? nodes[0];
	const stopAfter = selectedSimulation === "disable-account" ? 1 : selectedSimulation === "isolate-endpoint" ? 2 : 99;
	if (!selected) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GlassPanel, {
		className: "overflow-hidden",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "border-b border-border p-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-semibold uppercase tracking-[0.2em] text-cyan-signal",
				children: "Attack path"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-1 flex items-center justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-xl font-semibold",
					children: "Movement through the environment"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-mono text-xs text-muted-foreground",
					children: simulation ? "COUNTERFACTUAL" : `STATE ${currentMinute}/42`
				})]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid lg:grid-cols-[1fr_280px]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "overflow-x-auto p-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex min-w-[790px] items-center justify-between gap-2 py-10",
					children: nodes.map((node, index) => {
						const Icon = icons[node.icon] ?? Radar;
						const activeInSimulation = !simulation || !isSimulating || index <= simulationProgress;
						const stopped = simulation && simulationProgress >= stopAfter && index > stopAfter;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-1 items-center last:flex-none",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => setSelectedId(node.id),
								className: cn("group relative flex w-28 shrink-0 flex-col items-center rounded-xl border p-3 text-center transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring", stopped ? "border-border bg-muted/20 opacity-35" : node.status !== "Clean" && activeInSimulation ? "border-threat/45 bg-threat/10 shadow-threat" : "border-border bg-secondary/45", selected.id === node.id && "border-cyan-glow shadow-glow"),
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: cn("grid size-11 place-items-center rounded-lg border", stopped ? "border-border text-muted-foreground" : node.status !== "Clean" && activeInSimulation ? "border-threat/40 bg-threat/10 text-threat" : "border-border text-cyan-signal"),
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-5" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "mt-3 text-xs font-semibold leading-4",
										children: node.label
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "mt-1 font-mono text-[10px] text-muted-foreground",
										children: node.timestamp
									}),
									simulation && simulationProgress >= stopAfter && index === stopAfter ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "absolute -right-5 top-8 z-10 grid size-8 place-items-center rounded-full border border-threat bg-background text-lg font-bold text-threat",
										children: "×"
									}) : null
								]
							}), index < nodes.length - 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: cn("relative h-px min-w-6 flex-1 overflow-hidden bg-border", simulation && simulationProgress > index && index < stopAfter && "bg-cyan-signal", stopped && "opacity-30"),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("absolute inset-y-0 w-8 bg-primary blur-sm", isSimulating && index < simulationProgress && index < stopAfter ? "animate-flow-line" : "hidden") })
							}) : null]
						}, node.id);
					})
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "border-t border-border bg-secondary/25 p-5 lg:border-l lg:border-t-0",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground",
						children: "Selected asset"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "mt-3 text-lg font-semibold",
						children: selected.label
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
						className: "mt-5 space-y-4 text-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info$1, {
								label: "Hostname",
								value: selected.hostname ?? "External actor",
								mono: true
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info$1, {
								label: "Status",
								value: selected.status
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info$1, {
								label: "First observed",
								value: selected.timestamp ?? "09:42",
								mono: true
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info$1, {
								label: "Current risk",
								value: String(selected.risk ?? "NORMAL").toUpperCase()
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info$1, {
								label: "Related events",
								value: String(selected.relatedEvents)
							})
						]
					})
				]
			})]
		})]
	});
}
function Info$1({ label, value, mono = false }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-baseline justify-between gap-3 border-b border-border pb-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
			className: "text-muted-foreground",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
			className: cn("text-right font-semibold", mono && "font-mono"),
			children: value
		})]
	});
}
function IncidentTimeline() {
	const { showMissed, revealMissed } = useDemo();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ForensicTimeline, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				onClick: revealMissed,
				className: "h-14 w-full text-base font-mono gap-2",
				variant: showMissed ? "secondary" : "default",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-5 text-cyan-signal" }), " Show Me What We Missed"]
			}),
			showMissed ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GlassPanel, {
				className: "overflow-hidden border-cyan-glow shadow-glow animate-scale-in",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-6 p-6 lg:grid-cols-[0.75fr_1.25fr]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "border-b border-border pb-6 lg:border-b-0 lg:border-r lg:pb-0 lg:pr-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs font-semibold uppercase tracking-[0.2em] text-cyan-signal",
								children: "Earliest detectable opportunity"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-4 font-mono text-6xl font-semibold text-foreground",
								children: "09:47"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-lg text-cyan-signal",
								children: "28 minutes before formal detection."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-5 text-sm text-muted-foreground",
								children: "Signal"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm leading-6",
								children: "Unusual login + unfamiliar IP + abnormal authentication pattern."
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground",
						children: "Missed signals"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4 grid gap-3 sm:grid-cols-2",
						children: missedSignals.map((signal, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3 rounded-lg border border-border bg-secondary/40 p-4",
							style: { animationDelay: `${index * 90}ms` },
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "grid size-7 place-items-center rounded-full bg-green-signal/15 text-green-signal",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-4" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-sm font-medium",
								children: signal
							})]
						}, signal))
					})] })]
				})
			}) : null
		]
	});
}
function TimeMachineView() {
	const { incident, incidentState, currentTime, currentRisk } = useDemo();
	const minute = incidentState.minute;
	const confirmedCount = incidentState.compromisedAssetIds.length;
	const filesExposed = minute >= 36 ? 37 : 0;
	const dynamicBlastRadius = [
		{
			label: "compromised account",
			count: minute >= 18 ? "1" : "0",
			impact: minute >= 18 ? "confirmed" : "potential"
		},
		{
			label: "endpoints",
			count: minute >= 18 ? "1" : "0",
			impact: minute >= 18 ? "confirmed" : "potential"
		},
		{
			label: "internal server",
			count: minute >= 25 ? "1" : "0",
			impact: minute >= 25 ? "confirmed" : "potential"
		},
		{
			label: "database",
			count: minute >= 30 ? "1" : "0",
			impact: minute >= 30 ? "confirmed" : "potential"
		},
		{
			label: "potentially exposed files",
			count: String(filesExposed),
			impact: "potential"
		}
	];
	const summaryText = minute >= 42 ? "Incident INC-2048 declared. Multiple suspicious activities correlated across identity, endpoint, server, and database tiers. Attacker accessed customer DB and staged sensitive files." : minute >= 36 ? "Attacker attempting mass file access targeting 37 confidential documents on FILE-SRV-01 after querying production database." : minute >= 30 ? "Attacker has traversed to DB-PROD-01 and executed high-volume queries against customer identity tables." : minute >= 25 ? "Lateral movement confirmed from LAPTOP-042 to internal application server SERVER-03 via administrative session." : minute >= 22 ? "Suspicious encoded PowerShell process observed executing on LAPTOP-042 within user session." : minute >= 18 ? "Employee identity alex.m confirmed compromised. Interactive session active on workstation LAPTOP-042." : minute >= 5 ? "Earliest detectable opportunity: Unfamiliar foreign IP and multiple authentication failures observed. Response at this stage would have prevented endpoint compromise." : minute >= 2 ? "Repeated authentication failures observed from anomalous IP address targeting employee credentials." : "Initial authentication anomaly recorded from unfamiliar IP location. Environment systems nominal.";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-7xl animate-fade-in",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				eyebrow: `Incident Time Machine · ${incident.id}`,
				title: incident.title,
				description: "Reconstruct the incident timeline and explore alternate response decisions.",
				actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: cn("inline-flex items-center rounded-full border px-3 py-2 text-xs font-semibold uppercase", currentRisk === "CRITICAL" || currentRisk === "Critical" ? "border-threat/40 bg-threat/10 text-threat" : currentRisk === "HIGH" || currentRisk === "High" ? "border-warning/40 bg-warning/10 text-warning" : "border-cyan-glow bg-primary/10 text-cyan-signal"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldAlert, { className: "mr-2 size-4" }), currentRisk]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/simulation-lab",
						children: ["Open Simulation Lab ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })]
					})
				})] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "my-6 h-[520px] w-full overflow-hidden rounded-2xl border border-cyan-glow/30 bg-card/40 shadow-glow",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IncidentTimeMachine3D, { height: "100%" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IncidentTimeline, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 grid gap-6 xl:grid-cols-[1.45fr_0.55fr]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AttackGraph, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GlassPanel, {
					className: "p-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "grid size-10 place-items-center rounded-lg bg-primary/15 text-cyan-signal",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrainCircuit, { className: "size-5" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs font-semibold uppercase tracking-[0.18em] text-cyan-signal",
								children: "AI incident summary"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "font-mono text-xs text-muted-foreground",
								children: ["State at ", currentTime]
							})] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-5 text-sm leading-7 text-foreground typewriter-reveal",
							children: summaryText
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-5 border-t border-border pt-3",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "font-mono text-xs text-muted-foreground",
								children: ["Simulated Stage: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-cyan-signal",
									children: incidentState.stage
								})]
							})
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GlassPanel, {
				className: "mt-6 p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-semibold uppercase tracking-[0.2em] text-cyan-signal",
						children: "Potential blast radius"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-1 text-xl font-semibold",
						children: "Confirmed movement vs. potential exposure"
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-4 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
							className: "text-threat",
							children: confirmedCount
						}), " confirmed assets"] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
							className: "text-warning",
							children: filesExposed
						}), " estimated exposure"] })]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6 flex flex-col items-stretch gap-2 md:flex-row md:items-center",
					children: dynamicBlastRadius.map((node, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-1 items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: cn("flex min-h-24 flex-1 flex-col items-center justify-center rounded-lg border p-3 text-center transition-colors", node.count !== "0" && node.impact === "confirmed" ? "border-threat/35 bg-threat/8" : node.count !== "0" ? "border-warning/35 bg-warning/8" : "border-border bg-secondary/20 opacity-50"),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: cn("text-2xl font-semibold", node.count !== "0" && node.impact === "confirmed" ? "text-threat" : node.count !== "0" ? "text-warning" : "text-muted-foreground"),
									children: node.count
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "mt-1 text-xs text-muted-foreground",
									children: node.label
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "mt-2 text-[10px] font-semibold uppercase tracking-[0.15em]",
									children: node.impact
								})
							]
						}), index < dynamicBlastRadius.length - 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "hidden size-4 shrink-0 text-muted-foreground md:block" }) : null]
					}, node.label))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IrisInvestigationPanel, {
					title: "IRIS Forensic Time Machine Assistant",
					defaultPrompt: "What did defenders know here?",
					suggestedQuestions: [
						"What did defenders know here?",
						"What happened?",
						"When did the attack really begin?",
						"What did we miss?"
					],
					compact: true
				})
			})
		]
	});
}
var SplitComponent = TimeMachineView;
//#endregion
export { SplitComponent as component };
