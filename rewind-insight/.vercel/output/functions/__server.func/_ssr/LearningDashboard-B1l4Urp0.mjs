import { r as require_jsx_runtime } from "../_libs/elevenlabs__react+react.mjs";
import { At as ArrowRight, G as Laptop, U as Lightbulb, V as ListTodo, X as GitBranch, _ as ShieldCheck, dt as Clock, f as Sparkles, gt as CircleCheck, l as TriangleAlert, nt as FileSearch, ot as Database, t as Zap, u as Target, v as ShieldAlert, x as Server } from "../_libs/lucide-react.mjs";
import { x as useDemo } from "./DemoContext-DI0dcfwA.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Button } from "./button-Bq5vK6RO.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/LearningDashboard-B1l4Urp0.js
var import_jsx_runtime = require_jsx_runtime();
function LearningDashboard({ report }) {
	const { updateActionItemStatus } = useDemo();
	const { learningMetrics, counterfactualAnalysis, detectionGap, whatWeMissed, lessonsLearned, recommendations, actionItems, attackPath, responseAnalysis } = report;
	const handleStatusChange = (itemId, newStatus) => {
		updateActionItemStatus(itemId, newStatus);
	};
	const getPriorityBadgeClass = (priority) => {
		switch (priority) {
			case "HIGH": return "bg-rose-500/20 text-rose-300 border-rose-500/40";
			case "MEDIUM": return "bg-amber-500/20 text-amber-300 border-amber-500/40";
			case "LOW": return "bg-cyan-500/20 text-cyan-300 border-cyan-500/40";
		}
	};
	const getStatusBadgeClass = (status) => {
		switch (status) {
			case "COMPLETED": return "bg-emerald-500/20 text-emerald-300 border-emerald-500/40";
			case "IN_PROGRESS": return "bg-cyan-500/20 text-cyan-300 border-cyan-500/40";
			case "OPEN": return "bg-amber-500/20 text-amber-300 border-amber-500/40";
			case "DEFERRED": return "bg-zinc-500/20 text-zinc-400 border-zinc-500/40";
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-10 animate-fade-in text-foreground",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between gap-3 rounded-xl border border-cyan-500/30 bg-cyan-500/10 px-4 py-3 text-xs text-cyan-200",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-4 shrink-0 text-cyan-400" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "POST-INCIDENT LEARNING SYSTEM:" }), " Sourced from deterministic Phase 1–5 telemetry, isolated Phase 4 counterfactual simulation branches, and IRIS investigation findings."] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-mono text-[10px] uppercase font-bold text-cyan-400 border border-cyan-500/30 px-2 py-0.5 rounded bg-cyan-500/20",
					children: "CLOSED-LOOP POST-MORTEM"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border border-border/80 bg-card/60 p-4 backdrop-blur-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-1.5 text-xs text-muted-foreground mb-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "size-3.5 text-amber-400" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Detection Delay" })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-2xl font-bold font-mono text-amber-400",
								children: [learningMetrics.detectionDelayMinutes, "m"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-[10px] text-muted-foreground mt-1",
								children: "09:47 to 10:24 gap"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border border-border/80 bg-card/60 p-4 backdrop-blur-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-1.5 text-xs text-muted-foreground mb-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Laptop, { className: "size-3.5 text-rose-400" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Actual Compromised" })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-2xl font-bold font-mono text-rose-400",
								children: learningMetrics.actualCompromisedAssets
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-[10px] text-muted-foreground mt-1",
								children: [
									"vs ",
									learningMetrics.counterfactualCompromisedAssets,
									" if contained"
								]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border border-border/80 bg-card/60 p-4 backdrop-blur-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-1.5 text-xs text-muted-foreground mb-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Server, { className: "size-3.5 text-rose-400" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Critical Assets" })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-2xl font-bold font-mono text-rose-400",
								children: learningMetrics.criticalAssetsAffected
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-[10px] text-emerald-400 font-medium mt-1",
								children: "0 in counterfactual"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border border-border/80 bg-card/60 p-4 backdrop-blur-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-1.5 text-xs text-muted-foreground mb-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-3.5 text-emerald-400" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Prevented Events" })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-2xl font-bold font-mono text-emerald-400",
								children: ["+", learningMetrics.preventedEventsCount]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-[10px] text-muted-foreground mt-1",
								children: "Downstream attack stages"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border border-border/80 bg-card/60 p-4 backdrop-blur-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-1.5 text-xs text-muted-foreground mb-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Database, { className: "size-3.5 text-cyan-400" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Data Stores Saved" })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-2xl font-bold font-mono text-cyan-400",
								children: learningMetrics.potentialDataStoresExposed - learningMetrics.counterfactualDataStoresExposed
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-[10px] text-muted-foreground mt-1",
								children: "DB-PROD-01 & FILE-SRV-01"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border border-border/80 bg-card/60 p-4 backdrop-blur-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-1.5 text-xs text-muted-foreground mb-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, { className: "size-3.5 text-indigo-400" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Response Score" })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-2xl font-bold font-mono text-indigo-400",
								children: [learningMetrics.responseEffectivenessScore, "%"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-[10px] text-emerald-400 font-medium mt-1",
								children: "Effective containment"
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-2xl border border-border/80 bg-card/60 p-6 md:p-8 backdrop-blur-md space-y-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center justify-between gap-4 border-b border-border/60 pb-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "size-5 text-amber-400" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-lg md:text-xl font-bold text-foreground",
							children: "Section 1: Detection Gap & Latency Analysis"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/time-machine",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "outline",
							size: "sm",
							className: "font-mono text-xs gap-1.5 border-cyan-500/30 text-cyan-300",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "size-3.5" }),
								"Replay Gap in Time Machine",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-3.5" })
							]
						})
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-xl border border-amber-500/30 bg-amber-950/10 p-5 space-y-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-1 md:grid-cols-3 gap-4 items-center text-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-lg bg-background/60 p-4 border border-border/60",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[10px] font-mono uppercase text-muted-foreground block mb-1",
										children: "1. Earliest High-Confidence Signal"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xl font-mono font-bold text-amber-400",
										children: detectionGap.earliestDetectableOpportunity
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-muted-foreground mt-1",
										children: "Auth0 MFA fatigue & unrecognized foreign ASN (198.51.100.42)."
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col items-center justify-center p-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-xs font-mono font-bold text-amber-400 uppercase tracking-wider mb-1",
										children: "Detection Delay"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "w-full flex items-center gap-2 my-1",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-0.5 flex-1 bg-gradient-to-r from-amber-500/40 via-amber-400 to-rose-500/60" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "font-mono font-extrabold text-lg text-amber-300 bg-amber-500/20 px-3 py-1 rounded-full border border-amber-500/40",
												children: [detectionGap.delayMinutes, " MINUTES"]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-0.5 flex-1 bg-gradient-to-r from-amber-500/40 via-amber-400 to-rose-500/60" })
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[11px] text-muted-foreground",
										children: "Attacker moved laterally while alerts were unassigned"
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-lg bg-background/60 p-4 border border-border/60",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[10px] font-mono uppercase text-muted-foreground block mb-1",
										children: "2. Formal SIEM Incident Declaration"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xl font-mono font-bold text-rose-400",
										children: detectionGap.formalDetection
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-muted-foreground mt-1",
										children: "Multi-stage EDR + DB query rule triggered CRITICAL escalation."
									})
								]
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "pt-3 border-t border-border/50 text-xs text-muted-foreground flex flex-wrap items-center justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Potential Earlier Opportunity:" }),
							" ",
							detectionGap.potentialDetectionOpportunity
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "font-mono text-cyan-400",
							children: ["Confidence: ", detectionGap.confidence]
						})]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-2xl border border-border/80 bg-card/60 p-6 md:p-8 backdrop-blur-md space-y-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center justify-between gap-4 border-b border-border/60 pb-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Target, { className: "size-5 text-rose-400" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-lg md:text-xl font-bold text-foreground",
								children: "Section 2: Attack Path & Interception Points"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/attack-graph",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								variant: "outline",
								size: "sm",
								className: "font-mono text-xs gap-1.5 border-rose-500/30 text-rose-300",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Target, { className: "size-3.5" }),
									"Interactive Attack Graph",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-3.5" })
								]
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground leading-relaxed",
						children: attackPath.description
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-wrap items-center gap-2 pt-2",
						children: attackPath.traversalSequence.map((node, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/attack-graph",
								className: `rounded-lg px-3 py-2 font-mono text-xs font-semibold border transition-all hover:scale-105 ${node === "DB-PROD-01" ? "bg-rose-500/20 text-rose-300 border-rose-500/50 shadow-sm" : node === "LAPTOP-042" ? "bg-amber-500/20 text-amber-300 border-amber-500/50" : node === "SERVER-03" ? "bg-purple-500/20 text-purple-300 border-purple-500/50" : "bg-background/80 text-foreground border-border/80"}`,
								title: `Inspect ${node} in Attack Graph`,
								children: node
							}), idx < attackPath.traversalSequence.length - 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-3.5 text-cyan-400 shrink-0" })]
						}, node))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 text-xs",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-lg bg-background/50 p-3 border border-border/60",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-muted-foreground block text-[10px] uppercase font-mono mb-1",
									children: "Path Length & Critical Reach"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "font-bold text-foreground",
									children: [
										attackPath.hopsCount,
										" Hops · ",
										attackPath.criticalNodesReached.length,
										" Critical Database"
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-lg bg-background/50 p-3 border border-border/60",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-muted-foreground block text-[10px] uppercase font-mono mb-1",
									children: "Where Interruption Was Possible"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-bold text-emerald-400",
									children: "Workstation Boundary (LAPTOP-042 at 10:04)"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-lg bg-background/50 p-3 border border-border/60",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-muted-foreground block text-[10px] uppercase font-mono mb-1",
									children: "Downstream Protected Systems"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-bold text-cyan-400",
									children: "SERVER-03, DB-PROD-01, FILE-SRV-01"
								})]
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative overflow-hidden rounded-2xl border-2 border-cyan-500/40 bg-gradient-to-br from-cyan-950/30 via-card/80 to-indigo-950/20 p-6 md:p-8 backdrop-blur-md shadow-xl",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "absolute top-0 right-0 p-8 opacity-10 pointer-events-none",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GitBranch, { className: "size-48 text-cyan-400" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative z-10",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-center justify-between gap-4 mb-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "flex size-7 items-center justify-center rounded-lg bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 font-bold",
										children: "?"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										className: "text-xl md:text-2xl font-bold tracking-tight text-white",
										children: "WHAT IF WE HAD ACTED EARLIER?"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/simulation-lab",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										size: "sm",
										className: "bg-cyan-600 hover:bg-cyan-500 text-white gap-2 font-mono text-xs shadow-lg",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GitBranch, { className: "size-3.5" }),
											"Launch in Simulation Lab",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-3.5" })
										]
									})
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-sm text-muted-foreground max-w-3xl mb-6",
								children: [
									"The counterfactual simulation engine tested what would happen if the response action had been taken at",
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
										className: "text-foreground font-mono",
										children: "10:04 (Minute 22)"
									}),
									" immediately following suspicious PowerShell beaconing, instead of waiting for formal alert escalation at",
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
										className: "text-foreground font-mono",
										children: "10:24 (Minute 42)"
									}),
									"."
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-1 md:grid-cols-4 gap-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded-xl border border-border/80 bg-background/50 p-4",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "text-[10px] uppercase font-mono tracking-wider text-muted-foreground mb-1",
												children: "1. Earliest Opportunity"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "text-sm font-semibold text-amber-400 font-mono",
												children: [detectionGap.earliestDetectableOpportunity, " (09:47)"]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-xs text-muted-foreground mt-2",
												children: "Unfamiliar IP + MFA fatigue anomaly logged on Auth0 identity provider."
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded-xl border border-border/80 bg-background/50 p-4",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "text-[10px] uppercase font-mono tracking-wider text-muted-foreground mb-1",
												children: "2. Optimal Intervention"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "text-sm font-semibold text-cyan-400 font-mono",
												children: counterfactualAnalysis.recommendedAction.label
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-xs text-muted-foreground mt-2",
												children: "Executed at 10:04 before any internal network connections were initiated."
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded-xl border border-border/80 bg-background/50 p-4",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "text-[10px] uppercase font-mono tracking-wider text-muted-foreground mb-1",
												children: "3. Simulated Outcome"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "text-sm font-semibold text-emerald-400",
												children: "Lateral Path Severed"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-xs text-muted-foreground mt-2",
												children: "Outbound connections blocked at host firewall; attacker isolated on LAPTOP-042."
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded-xl border border-border/80 bg-background/50 p-4",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "text-[10px] uppercase font-mono tracking-wider text-muted-foreground mb-1",
												children: "4. Prevented Impact"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "text-sm font-semibold text-emerald-400 font-mono",
												children: [counterfactualAnalysis.preventedEvents.length, " Events / 3 Assets Saved"]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-xs text-muted-foreground mt-2",
												children: "Zero database intrusion; zero customer data exposed. Critical risk avoided."
											})
										]
									})
								]
							})
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-1 md:grid-cols-2 gap-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-2xl border border-rose-500/30 bg-rose-950/10 p-6 backdrop-blur-md",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between pb-4 border-b border-rose-500/20 mb-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldAlert, { className: "size-5 text-rose-400" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-semibold text-lg text-rose-200",
									children: "ACTUAL INCIDENT"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono text-xs px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30",
								children: "SEVERITY: CRITICAL"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-2 gap-3 text-sm",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded-lg bg-background/40 p-3 border border-border/50",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xs text-muted-foreground block",
											children: "Formal Detection"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-mono font-bold text-rose-400 text-base",
											children: report.formalDetection
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded-lg bg-background/40 p-3 border border-border/50",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xs text-muted-foreground block",
											children: "Detection Delay"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "font-mono font-bold text-amber-400 text-base",
											children: [detectionGap.delayMinutes, " Minutes"]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded-lg bg-background/40 p-3 border border-border/50",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xs text-muted-foreground block",
											children: "Compromised Assets"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "font-mono font-bold text-rose-400 text-base",
											children: [learningMetrics.actualCompromisedAssets, " Hosts"]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded-lg bg-background/40 p-3 border border-border/50",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xs text-muted-foreground block",
											children: "Critical Data Exposure"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-mono font-bold text-rose-400 text-base",
											children: "Yes (DB-PROD-01)"
										})]
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-lg border border-rose-500/20 bg-rose-950/20 p-3 text-xs text-rose-200 space-y-1.5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "font-semibold text-rose-300",
										children: "Downstream Compromise Trajectory:"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "• Attacker pivoted from LAPTOP-042 → SERVER-03 via SMB/WinRM (10:07)" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "• Authenticated to PostgreSQL customer database on DB-PROD-01 (10:12)" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "• Attempted mass file exfiltration from FILE-SRV-01 (10:18)" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "• Containment only occurred after critical data had been accessed" })
								]
							})]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-2xl border border-emerald-500/30 bg-emerald-950/10 p-6 backdrop-blur-md",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between pb-4 border-b border-emerald-500/20 mb-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "size-5 text-emerald-400" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-semibold text-lg text-emerald-200",
									children: "EARLIEST EFFECTIVE RESPONSE"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono text-xs px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30",
								children: "SEVERITY: MEDIUM (PREVENTED)"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-2 gap-3 text-sm",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded-lg bg-background/40 p-3 border border-border/50",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xs text-muted-foreground block",
											children: "Intervention Time"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-mono font-bold text-emerald-400 text-base",
											children: counterfactualAnalysis.interventionTime
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded-lg bg-background/40 p-3 border border-border/50",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xs text-muted-foreground block",
											children: "Action Taken"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-mono font-bold text-cyan-400 text-sm truncate",
											children: counterfactualAnalysis.recommendedAction.label
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded-lg bg-background/40 p-3 border border-border/50",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xs text-muted-foreground block",
											children: "Compromised Assets"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "font-mono font-bold text-emerald-400 text-base",
											children: [learningMetrics.counterfactualCompromisedAssets, " Host (LAPTOP-042 only)"]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded-lg bg-background/40 p-3 border border-border/50",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xs text-muted-foreground block",
											children: "Critical Data Exposure"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-mono font-bold text-emerald-400 text-base",
											children: "0 (Fully Protected)"
										})]
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-lg border border-emerald-500/20 bg-emerald-950/20 p-3 text-xs text-emerald-200 space-y-1.5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "font-semibold text-emerald-300",
										children: "Verified Prevented Events:"
									}),
									counterfactualAnalysis.preventedEvents.map((pe) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
										"• ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "font-mono text-emerald-300",
											children: [
												"[",
												pe.originalTime,
												"]"
											]
										}),
										" ",
										pe.title,
										" (",
										pe.targetAsset,
										")"
									] }, pe.eventId)),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-emerald-400 font-medium pt-1",
										children: "✓ Blast radius capped to initial compromised laptop with zero database leakage"
									})
								]
							})]
						})]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-2xl border border-border/80 bg-card/60 p-6 md:p-8 backdrop-blur-md space-y-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center justify-between gap-4 border-b border-border/60 pb-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "size-5 text-amber-400" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-lg md:text-xl font-bold text-foreground",
							children: "Section 4: What We Missed (Forensic Detection Telemetry)"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/evidence",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "outline",
							size: "sm",
							className: "font-mono text-xs gap-1.5 border-amber-500/30 text-amber-300",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileSearch, { className: "size-3.5" }),
								"Inspect Underlying Evidence",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-3.5" })
							]
						})
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-1 md:grid-cols-3 gap-4",
					children: whatWeMissed.missedSignalsList.map((sig) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border border-border/70 bg-background/50 p-4 space-y-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "font-mono text-xs font-bold text-amber-400",
									children: [sig.timestamp, " UTC"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono text-[10px] text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/30",
									children: sig.relatedEvidence
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
								className: "text-xs font-semibold text-foreground",
								children: sig.signal
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[11px] text-muted-foreground",
								children: sig.whatDefendersCouldHaveObserved
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "pt-2 border-t border-border/50 text-[10px] text-emerald-400 font-medium",
								children: ["Opportunity: ", sig.potentialResponseOpportunity]
							})
						]
					}, sig.id))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-2xl border border-border/80 bg-card/60 p-6 md:p-8 backdrop-blur-md space-y-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 border-b border-border/60 pb-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lightbulb, { className: "size-5 text-cyan-400" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-lg md:text-xl font-bold text-foreground",
						children: "Section 5: Post-Incident Lessons Learned"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5",
					children: lessonsLearned.map((ll) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border border-border/80 bg-background/50 p-5 space-y-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono text-[10px] uppercase font-bold text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/30",
									children: ll.category
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "font-mono text-[10px] text-muted-foreground",
									children: [ll.confidence, " CONFIDENCE"]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
								className: "text-sm font-semibold text-foreground",
								children: ll.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground leading-relaxed",
								children: ll.lesson
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "pt-2 border-t border-border/50 text-[11px] text-emerald-300",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Impact if Applied:" }),
									" ",
									ll.impactIfApplied
								]
							})
						]
					}, ll.id))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-2xl border border-border/80 bg-card/60 p-6 md:p-8 backdrop-blur-md space-y-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 border-b border-border/60 pb-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-5 text-emerald-400" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-lg md:text-xl font-bold text-foreground",
						children: "Section 6: Actionable Security Recommendations"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-1 md:grid-cols-2 gap-4",
					children: recommendations.map((rec) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border border-border/80 bg-background/50 p-5 space-y-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono text-xs font-semibold text-cyan-400",
									children: rec.title
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: `font-mono text-[10px] font-bold px-2 py-0.5 rounded border ${getPriorityBadgeClass(rec.priority)}`,
									children: [rec.priority, " PRIORITY"]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-foreground/90",
								children: rec.recommendation
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[11px] text-muted-foreground",
								children: rec.reason
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-center justify-between pt-2 border-t border-border/50 text-[11px]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-emerald-400 font-medium",
									children: ["Benefit: ", rec.expectedBenefit]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "font-mono text-[10px] text-muted-foreground",
									children: ["Finding: ", rec.relatedFinding]
								})]
							})
						]
					}, rec.id))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-2xl border border-border/80 bg-card/60 p-6 md:p-8 backdrop-blur-md space-y-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center justify-between gap-4 border-b border-border/60 pb-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListTodo, { className: "size-5 text-cyan-400" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-lg md:text-xl font-bold text-foreground",
							children: "Section 7: Post-Incident Remediation Action Plan"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground",
							children: "Interactive workflow state. Updating status changes in-memory execution state without modifying incident facts."
						})] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "font-mono text-xs px-2.5 py-1 rounded bg-secondary/60 text-muted-foreground border border-border/60",
						children: [
							actionItems.filter((a) => a.status === "COMPLETED").length,
							" of ",
							actionItems.length,
							" Completed"
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "overflow-x-auto rounded-xl border border-border/80 bg-background/60",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "w-full text-left text-xs",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
							className: "border-b border-border/80 bg-secondary/40 font-mono text-[10px] uppercase text-muted-foreground",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "p-3",
									children: "Action Item"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "p-3",
									children: "Category"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "p-3",
									children: "Owner Role"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "p-3",
									children: "Priority"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "p-3",
									children: "Status Workflow"
								})
							] })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
							className: "divide-y divide-border/50 text-[11.5px]",
							children: actionItems.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								className: "hover:bg-secondary/20 transition-colors",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
										className: "p-3 font-medium text-foreground max-w-sm",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "font-semibold",
											children: item.title
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-[11px] text-muted-foreground mt-0.5",
											children: item.action
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "p-3 font-mono text-[10px] text-cyan-400",
										children: item.category
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "p-3 font-mono text-muted-foreground",
										children: item.ownerRole
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "p-3",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: `font-mono text-[10px] font-bold px-2 py-0.5 rounded border ${getPriorityBadgeClass(item.priority)}`,
											children: item.priority
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "p-3",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
											value: item.status,
											onChange: (e) => handleStatusChange(item.id, e.target.value),
											className: `font-mono text-xs font-semibold rounded px-2.5 py-1 border bg-background text-foreground transition-all cursor-pointer ${getStatusBadgeClass(item.status)}`,
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "OPEN",
													children: "OPEN"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "IN_PROGRESS",
													children: "IN_PROGRESS"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "COMPLETED",
													children: "COMPLETED"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "DEFERRED",
													children: "DEFERRED"
												})
											]
										})
									})
								]
							}, item.id))
						})]
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "rounded-xl border border-border/80 bg-card/40 p-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center justify-between gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-xs text-muted-foreground",
						children: "Explore and cross-examine this incident across forensic investigation engines:"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/time-machine",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									variant: "outline",
									size: "sm",
									className: "text-xs gap-1.5 font-mono",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "size-3 text-cyan-400" }), "Time Machine"]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/attack-graph",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									variant: "outline",
									size: "sm",
									className: "text-xs gap-1.5 font-mono",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Target, { className: "size-3 text-rose-400" }), "Attack Graph"]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/evidence",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									variant: "outline",
									size: "sm",
									className: "text-xs gap-1.5 font-mono",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileSearch, { className: "size-3 text-amber-400" }), "Evidence"]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/simulation-lab",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									variant: "outline",
									size: "sm",
									className: "text-xs gap-1.5 font-mono",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GitBranch, { className: "size-3 text-emerald-400" }), "Simulation Lab"]
								})
							})
						]
					})]
				})
			})
		]
	});
}
//#endregion
export { LearningDashboard as t };
