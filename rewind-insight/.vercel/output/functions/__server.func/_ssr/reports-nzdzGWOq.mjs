import { r as __toESM } from "../_runtime.mjs";
import { i as require_react, r as require_jsx_runtime } from "../_libs/elevenlabs__react+react.mjs";
import { At as ArrowRight, K as Info, Mt as Archive, O as Printer, Ot as BookOpen, T as RefreshCw, W as Layers, X as GitBranch, at as ExternalLink, dt as Clock, gt as CircleCheck, l as TriangleAlert, t as Zap, tt as FileText, v as ShieldAlert, x as Server, z as Lock } from "../_libs/lucide-react.mjs";
import { _ as incidentReportService, x as useDemo } from "./DemoContext-DI0dcfwA.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Button } from "./button-Bq5vK6RO.mjs";
import { t as LearningDashboard } from "./LearningDashboard-B1l4Urp0.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/reports-nzdzGWOq.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function IncidentReportDoc({ report }) {
	const isFinal = report.reportStatus === "FINAL";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-8 print:space-y-6 text-foreground",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between gap-3 rounded-xl border border-amber-500/40 bg-amber-500/10 px-4 py-2.5 text-xs text-amber-300 print:border-black print:text-black",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "size-4 shrink-0 text-amber-400 print:text-black" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "SYNTHETIC INCIDENT RESOLUTION REPORT:" }), " All findings, forensics, timelines, and response simulations were evaluated within the synthetic ACME incident environment (INC-2048). No real enterprise production systems, endpoints, or users were modified."] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-mono text-[10px] font-bold uppercase tracking-wider rounded bg-amber-500/20 px-2 py-0.5 border border-amber-500/30 print:hidden",
					children: "SIMULATION ONLY"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				id: "executive-summary",
				className: "rounded-xl border border-border/80 bg-card/60 p-6 backdrop-blur-md print:border-none print:p-0",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center justify-between gap-4 border-b border-border/70 pb-4 mb-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "font-mono text-xs uppercase tracking-wider text-muted-foreground",
									children: ["Formal Incident Report · ", report.organization]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: `rounded px-2 py-0.5 font-mono text-[10px] font-bold ${isFinal ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" : "bg-amber-500/20 text-amber-400 border border-amber-500/30"}`,
									children: ["STATUS: ", report.reportStatus]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "text-2xl font-bold tracking-tight text-foreground mt-1",
								children: report.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-muted-foreground font-mono mt-0.5",
								children: [
									"Incident ID: ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
										className: "text-foreground",
										children: report.incidentId
									}),
									" · Generated: ",
									new Date(report.generatedAt).toLocaleString()
								]
							})
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex items-center gap-3",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-xl border border-threat/40 bg-threat/10 px-4 py-2 text-right",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-[10px] uppercase font-mono text-muted-foreground",
									children: "Severity Level"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-xl font-bold text-threat tracking-tight flex items-center gap-1.5 justify-end",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldAlert, { className: "size-5" }), report.severity]
								})]
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 gap-3 sm:grid-cols-4 mb-5 font-mono text-xs",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-lg border border-border/70 bg-background/50 p-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[10px] text-muted-foreground uppercase block",
									children: "Incident Window"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "font-bold text-foreground",
									children: [
										report.incidentStart,
										" → ",
										report.formalDetection
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-lg border border-border/70 bg-background/50 p-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[10px] text-muted-foreground uppercase block",
									children: "First Opportunity"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "font-bold text-cyan-signal",
									children: [report.firstDetectableOpportunity, " (T+5m)"]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-lg border border-border/70 bg-background/50 p-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[10px] text-muted-foreground uppercase block",
									children: "Detection Delay"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "font-bold text-amber-400",
									children: [report.detectionGap.delayMinutes, " Minutes"]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-lg border border-border/70 bg-background/50 p-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[10px] text-muted-foreground uppercase block",
									children: "Compromised Assets"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "font-bold text-threat",
									children: [report.actualImpact.compromisedAssetsCount, " Hosts"]
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-sm font-bold uppercase tracking-wider text-muted-foreground mb-2",
						children: "Executive Summary"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm leading-relaxed text-foreground/90 bg-secondary/20 rounded-lg p-4 border border-border/50",
						children: report.executiveSummary
					})] })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				id: "classification",
				className: "rounded-xl border border-border/80 bg-card/60 p-6 backdrop-blur-md print:border-none print:p-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
					className: "text-base font-bold text-foreground mb-3 flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "size-4 text-cyan-signal" }), "Incident Classification & Attack Profile"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-1 gap-3 md:grid-cols-2 text-xs",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2 rounded-lg border border-border/70 bg-background/40 p-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between border-b border-border/40 pb-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-muted-foreground",
									children: "Incident Classification:"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-semibold text-foreground",
									children: report.incidentClassification.incidentType
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between border-b border-border/40 pb-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-muted-foreground",
									children: "Initial Access Vector:"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-semibold text-foreground",
									children: report.incidentClassification.initialAccessVector
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between border-b border-border/40 pb-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-muted-foreground",
									children: "Compromised User Identity:"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono font-bold text-cyan-signal",
									children: report.incidentClassification.primaryCompromisedIdentity
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-muted-foreground",
									children: "Beachhead Workstation:"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono font-bold text-foreground",
									children: report.incidentClassification.initialCompromisedEndpoint
								})]
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2 rounded-lg border border-border/70 bg-background/40 p-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between border-b border-border/40 pb-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-muted-foreground",
									children: "Lateral Movement Technique:"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-semibold text-foreground",
									children: report.incidentClassification.lateralMovement
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between border-b border-border/40 pb-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-muted-foreground",
									children: "Data Tier Access:"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-semibold text-foreground",
									children: report.incidentClassification.dataAccess
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between border-b border-border/40 pb-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-muted-foreground",
									children: "Detection Mechanism:"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-semibold text-foreground",
									children: report.incidentClassification.detectionMethod
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-muted-foreground",
									children: "Assessed Final Severity:"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono font-bold text-threat",
									children: report.incidentClassification.finalSeverity
								})]
							})
						]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				id: "timeline",
				className: "rounded-xl border border-border/80 bg-card/60 p-6 backdrop-blur-md print:border-none print:p-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between mb-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						className: "text-base font-bold text-foreground flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "size-4 text-cyan-signal" }), "Complete Forensic Timeline"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/time-machine",
						className: "flex items-center gap-1 font-mono text-xs text-cyan-signal hover:underline print:hidden",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Inspect in Time Machine" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "size-3" })]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "overflow-x-auto rounded-lg border border-border/80 bg-background/60",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "w-full text-left text-xs",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
							className: "border-b border-border/80 bg-secondary/40 font-mono text-[10px] uppercase text-muted-foreground",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "p-2.5",
									children: "Time"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "p-2.5",
									children: "Event"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "p-2.5",
									children: "Category"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "p-2.5",
									children: "Target"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "p-2.5",
									children: "Significance & Context"
								})
							] })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
							className: "divide-y divide-border/50 text-[11.5px]",
							children: report.timeline.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								className: `hover:bg-secondary/20 transition-colors ${e.id === "evt-0947" ? "bg-cyan-signal/5" : ""}`,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "p-2.5 font-mono font-bold text-cyan-signal whitespace-nowrap",
										children: e.timestamp
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "p-2.5 font-medium text-foreground",
										children: e.title
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "p-2.5 font-mono text-[10px] text-muted-foreground",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "rounded bg-secondary/50 px-1.5 py-0.5 border border-border/50",
											children: e.category
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "p-2.5 font-mono text-muted-foreground",
										children: e.affectedAssetId || e.affectedUserId || "—"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "p-2.5 text-muted-foreground leading-relaxed",
										children: e.significance
									})
								]
							}, e.id))
						})]
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				id: "detection-gap",
				className: "rounded-xl border border-border/80 bg-card/60 p-6 backdrop-blur-md print:border-none print:p-0",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						className: "text-base font-bold text-foreground mb-3 flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "size-4 text-amber-400" }), "Detection Gap Analysis (\"What We Missed\")"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 mb-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex size-10 items-center justify-center rounded-lg bg-cyan-signal/20 text-cyan-signal font-mono font-bold",
										children: "09:47"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[10px] font-mono uppercase text-cyan-signal font-bold block",
										children: "First Detectable Opportunity"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs text-foreground",
										children: "Unfamiliar location + multiple failed authentication attempts"
									})] })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-col items-center gap-1 font-mono text-xs text-amber-400",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "rounded bg-amber-500/20 px-3 py-1 font-bold border border-amber-500/40",
										children: [report.detectionGap.delayMinutes, " MINUTE DETECTION GAP"]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[10px] text-muted-foreground",
										children: "(Adversary unhindered on LAPTOP-042 & SERVER-03)"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex size-10 items-center justify-center rounded-lg bg-threat/20 text-threat font-mono font-bold",
										children: "10:24"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[10px] font-mono uppercase text-threat font-bold block",
										children: "Formal Incident Declaration"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs text-foreground",
										children: "Multi-signal correlation rule triggers SOC alert"
									})] })]
								})
							]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-1 md:grid-cols-2 gap-3 text-xs",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-lg border border-border/70 bg-background/50 p-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
								className: "font-semibold text-foreground mb-2 flex items-center gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, { className: "size-3.5 text-cyan-signal" }), "Existing Telemetry Not Correlated:"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "list-disc list-inside space-y-1 text-muted-foreground leading-relaxed",
								children: report.whatWeMissed.telemetryExisted.map((t, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: t }, idx))
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-lg border border-border/70 bg-background/50 p-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
								className: "font-semibold text-foreground mb-2 flex items-center gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "size-3.5 text-amber-400" }), "Operational Blindspots & Delayed Recognition:"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "list-disc list-inside space-y-1 text-muted-foreground leading-relaxed",
								children: report.whatWeMissed.whatWasNotRecognized.map((nr, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: nr }, idx))
							})]
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				id: "attack-path",
				className: "rounded-xl border border-border/80 bg-card/60 p-6 backdrop-blur-md print:border-none print:p-0",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between mb-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
							className: "text-base font-bold text-foreground flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GitBranch, { className: "size-4 text-cyan-signal" }), "Attack Graph & Traversal Path"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/attack-graph",
							className: "flex items-center gap-1 font-mono text-xs text-cyan-signal hover:underline print:hidden",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Inspect in Attack Graph" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "size-3" })]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-wrap items-center gap-2 p-3 rounded-lg border border-border/70 bg-background/50 font-mono text-xs mb-4",
						children: report.attackPath.traversalSequence.map((node, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: `rounded px-2.5 py-1 font-bold ${node === "DB-PROD-01" ? "bg-threat/20 text-threat border border-threat/40" : node === "SERVER-03" || node === "LAPTOP-042" ? "bg-amber-500/20 text-amber-400 border border-amber-500/30" : "bg-secondary text-foreground border border-border"}`,
								children: node
							}), i < report.attackPath.traversalSequence.length - 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-3 text-cyan-signal" })]
						}, node))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground leading-relaxed",
						children: report.attackPath.description
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				id: "assets-and-users",
				className: "rounded-xl border border-border/80 bg-card/60 p-6 backdrop-blur-md print:border-none print:p-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between mb-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						className: "text-base font-bold text-foreground flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Server, { className: "size-4 text-cyan-signal" }), "Affected Assets & Identity Inventory"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/digital-twin",
						className: "flex items-center gap-1 font-mono text-xs text-cyan-signal hover:underline print:hidden",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Inspect in Digital Twin" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "size-3" })]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "overflow-x-auto rounded-lg border border-border/80 bg-background/60 mb-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "w-full text-left text-xs",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
							className: "border-b border-border/80 bg-secondary/40 font-mono text-[10px] uppercase text-muted-foreground",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "p-2.5",
									children: "Asset ID"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "p-2.5",
									children: "Type"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "p-2.5",
									children: "Status"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "p-2.5",
									children: "Role in Attack"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "p-2.5",
									children: "Data Exposure"
								})
							] })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
							className: "divide-y divide-border/50 text-[11.5px]",
							children: report.affectedAssets.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								className: "hover:bg-secondary/20 transition-colors",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "p-2.5 font-mono font-bold text-foreground",
										children: a.id
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "p-2.5 text-muted-foreground",
										children: a.type
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "p-2.5",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: `rounded px-1.5 py-0.5 text-[10px] font-mono font-bold ${a.status === "COMPROMISED" ? "bg-threat/20 text-threat" : "bg-emerald-500/20 text-emerald-400"}`,
											children: a.status
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "p-2.5 text-foreground",
										children: a.roleInAttack
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "p-2.5 text-muted-foreground",
										children: a.dataExposure
									})
								]
							}, a.id))
						})]
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				id: "counterfactual",
				className: "rounded-xl border border-cyan-signal/50 bg-cyan-signal/5 p-6 backdrop-blur-md print:border-none print:p-0",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between mb-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-mono text-[10px] font-bold uppercase tracking-wider text-cyan-signal",
							children: "Response Intelligence & Simulation"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-base font-bold text-foreground",
							children: "Actual Impact vs. Simulated Counterfactual Future"
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/simulation-lab",
							className: "flex items-center gap-1 font-mono text-xs text-cyan-signal hover:underline print:hidden",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Open in Simulation Lab" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "size-3" })]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 text-xs",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-xl border border-threat/40 bg-threat/5 p-4 space-y-2.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between font-mono text-xs",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-bold text-threat",
									children: "ACTUAL HISTORICAL REALITY"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "rounded bg-threat/20 px-2 py-0.5 text-threat font-bold",
									children: "CRITICAL RISK"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
								className: "space-y-1.5 text-muted-foreground",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
										"• Formal Detection: ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
											className: "text-foreground",
											children: "10:24"
										}),
										" (37 min delay)"
									] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
										"• Compromised Assets: ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
											className: "text-threat",
											children: "4 hosts"
										}),
										" (LAPTOP-042, SERVER-03, DB-PROD-01, FILE-SRV-01)"
									] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
										"• Database Access: ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
											className: "text-threat",
											children: "CONFIRMED"
										}),
										" (50,000 customer records accessed)"
									] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
										"• File Access: ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
											className: "text-threat",
											children: "CONFIRMED"
										}),
										" (37 strategic files staged)"
									] })
								]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-xl border border-emerald-500/40 bg-emerald-500/5 p-4 space-y-2.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between font-mono text-xs",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "font-bold text-emerald-400",
									children: ["COUNTERFACTUAL: ", report.counterfactualAnalysis.recommendedAction.label]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "rounded bg-emerald-500/20 px-2 py-0.5 text-emerald-400 font-bold",
									children: "MEDIUM RISK"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
								className: "space-y-1.5 text-muted-foreground",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
										"• Intervention Point: ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
											className: "text-foreground",
											children: "10:04"
										}),
										" (Workstation isolation)"
									] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
										"• Prevented Attack Stages: ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", {
											className: "text-emerald-400",
											children: [report.counterfactualAnalysis.preventedEvents.length, " stages"]
										}),
										" (evt-1007, evt-1012, evt-1018)"
									] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: ["• Protected Infrastructure: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
										className: "text-emerald-400",
										children: "SERVER-03, DB-PROD-01, FILE-SRV-01"
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
										"• Database Access: ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
											className: "text-emerald-400",
											children: "ZERO DATA LEAKED"
										}),
										" (Vault preserved)"
									] })
								]
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs text-muted-foreground leading-relaxed bg-background/50 rounded-lg p-3 border border-border/60",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Causal Explanation:" }),
							" ",
							report.counterfactualAnalysis.causalExplanation
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				id: "response-comparison",
				className: "rounded-xl border border-border/80 bg-card/60 p-6 backdrop-blur-md print:border-none print:p-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
					className: "text-base font-bold text-foreground mb-3 flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Layers, { className: "size-4 text-cyan-signal" }), "Evaluated Response Comparison Matrix"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "overflow-x-auto rounded-lg border border-border/80 bg-background/60",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "w-full text-left text-xs",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
							className: "border-b border-border/80 bg-secondary/40 font-mono text-[10px] uppercase text-muted-foreground",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "p-2.5",
									children: "Response Action"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "p-2.5",
									children: "Simulated Risk"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "p-2.5",
									children: "Prevented Events"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "p-2.5",
									children: "Protected Systems"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "p-2.5",
									children: "Trade-off / Operational Evaluation"
								})
							] })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
							className: "divide-y divide-border/50 text-[11.5px]",
							children: report.responseAnalysis.evaluatedActions.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								className: `hover:bg-secondary/20 transition-colors ${c.action.type === report.responseAnalysis.recommendedAction.type ? "bg-cyan-signal/10" : ""}`,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "p-2.5 font-medium text-foreground",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-1.5",
											children: [c.action.type === report.responseAnalysis.recommendedAction.type && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "rounded bg-cyan-signal/20 px-1 py-0.2 font-mono text-[9px] font-bold text-cyan-signal border border-cyan-signal/40",
												children: "RECOMMENDED"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: c.action.label })]
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "p-2.5 font-mono",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: `rounded px-1.5 py-0.5 text-[10px] font-bold ${c.simulatedRisk === "CRITICAL" ? "bg-threat/20 text-threat" : "bg-emerald-500/20 text-emerald-400"}`,
											children: c.simulatedRisk
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
										className: "p-2.5 font-mono text-foreground",
										children: [c.preventedEvents.length, " stages"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "p-2.5 font-mono text-foreground",
										children: c.preventedCompromises.length > 0 ? c.preventedCompromises.join(", ") : "None (Full Compromise)"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "p-2.5 text-muted-foreground leading-relaxed",
										children: c.rationale
									})
								]
							}, c.id))
						})]
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				id: "root-cause",
				className: "rounded-xl border border-border/80 bg-card/60 p-6 backdrop-blur-md print:border-none print:p-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
					className: "text-base font-bold text-foreground mb-3 flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldAlert, { className: "size-4 text-cyan-signal" }), "Root Cause Analysis"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-lg border border-border/70 bg-background/50 p-4 space-y-3 text-xs leading-relaxed",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-bold text-foreground block text-[11.5px] mb-1",
							children: "Direct Cause:"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-muted-foreground",
							children: report.rootCause.directCause
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "border-t border-border/50 pt-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-bold text-foreground block text-[11.5px] mb-1",
								children: "Contributing Factors:"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "list-disc list-inside space-y-1 text-muted-foreground",
								children: report.rootCause.contributingFactors.map((f, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: f }, idx))
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-1 md:grid-cols-2 gap-2 border-t border-border/50 pt-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-bold text-foreground block text-[11px]",
								children: "Detection Gap:"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-muted-foreground text-[11px]",
								children: report.rootCause.detectionGapSummary
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-bold text-foreground block text-[11px]",
								children: "Response Gap:"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-muted-foreground text-[11px]",
								children: report.rootCause.responseGapSummary
							})] })]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				id: "lessons-learned",
				className: "rounded-xl border border-border/80 bg-card/60 p-6 backdrop-blur-md print:border-none print:p-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
					className: "text-base font-bold text-foreground mb-3 flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, { className: "size-4 text-cyan-signal" }), "Post-Incident Lessons Learned"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-1 gap-3 md:grid-cols-2 text-xs",
					children: report.lessonsLearned.map((ll) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-lg border border-border/70 bg-background/40 p-4 space-y-1.5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "rounded bg-cyan-signal/20 px-2 py-0.5 font-mono text-[9px] font-bold text-cyan-signal border border-cyan-signal/30",
									children: ll.category.toUpperCase()
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono text-[10px] text-muted-foreground",
									children: ll.id
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-bold text-foreground text-[12px]",
								children: ll.lesson
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-muted-foreground text-[11px] leading-relaxed",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Observation:" }),
									" ",
									ll.observation
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-emerald-400 text-[11px] leading-relaxed",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Target Impact:" }),
									" ",
									ll.impactIfApplied
								]
							})
						]
					}, ll.id))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				id: "recommendations",
				className: "rounded-xl border border-border/80 bg-card/60 p-6 backdrop-blur-md print:border-none print:p-0",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						className: "text-base font-bold text-foreground mb-3 flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-4 text-emerald-400" }), "Recommendations & Corrective Action Items"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "overflow-x-auto rounded-lg border border-border/80 bg-background/60 mb-6",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
							className: "w-full text-left text-xs",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
								className: "border-b border-border/80 bg-secondary/40 font-mono text-[10px] uppercase text-muted-foreground",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "p-2.5",
										children: "Category"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "p-2.5",
										children: "Recommendation"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "p-2.5",
										children: "Priority"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "p-2.5",
										children: "Expected Benefit"
									})
								] })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
								className: "divide-y divide-border/50 text-[11.5px]",
								children: report.recommendations.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
									className: "hover:bg-secondary/20 transition-colors",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "p-2.5 font-mono text-cyan-signal",
											children: r.category
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "p-2.5 font-medium text-foreground",
											children: r.recommendation
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "p-2.5",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: `rounded px-1.5 py-0.5 text-[10px] font-mono font-bold ${r.priority === "HIGH" ? "bg-threat/20 text-threat" : "bg-amber-500/20 text-amber-400"}`,
												children: r.priority
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "p-2.5 text-muted-foreground",
											children: r.expectedBenefit
										})
									]
								}, r.id))
							})]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2",
						children: "Assigned Action Items"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "overflow-x-auto rounded-lg border border-border/80 bg-background/60",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
							className: "w-full text-left text-xs",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
								className: "border-b border-border/80 bg-secondary/40 font-mono text-[10px] uppercase text-muted-foreground",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "p-2.5",
										children: "Action Item"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "p-2.5",
										children: "Assigned Role"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "p-2.5",
										children: "Priority"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "p-2.5",
										children: "Status"
									})
								] })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
								className: "divide-y divide-border/50 text-[11.5px]",
								children: report.actionItems.map((act) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
									className: "hover:bg-secondary/20 transition-colors",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "p-2.5 font-medium text-foreground",
											children: act.action
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "p-2.5 font-mono text-muted-foreground",
											children: act.ownerRole
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "p-2.5 font-mono text-[10px]",
											children: act.priority
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "p-2.5",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "rounded bg-secondary/60 px-1.5 py-0.5 text-[10px] font-mono font-bold text-foreground",
												children: act.status
											})
										})
									]
								}, act.id))
							})]
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				id: "evidence-ledger",
				className: "rounded-xl border border-border/80 bg-card/60 p-6 backdrop-blur-md print:border-none print:p-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between mb-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						className: "text-base font-bold text-foreground flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "size-4 text-cyan-signal" }), "Appendix: Reconstructed Evidence Ledger & Typed Citations"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/evidence",
						className: "flex items-center gap-1 font-mono text-xs text-cyan-signal hover:underline print:hidden",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Inspect in Evidence Vault" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "size-3" })]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "overflow-x-auto rounded-lg border border-border/80 bg-background/60",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "w-full text-left text-xs",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
							className: "border-b border-border/80 bg-secondary/40 font-mono text-[10px] uppercase text-muted-foreground",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "p-2.5",
									children: "Evidence ID"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "p-2.5",
									children: "Type"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "p-2.5",
									children: "Timestamp"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "p-2.5",
									children: "Telemetry Extract"
								})
							] })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
							className: "divide-y divide-border/50 text-[11.5px]",
							children: report.evidence.map((ev) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								className: "hover:bg-secondary/20 transition-colors",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "p-2.5 font-mono font-bold text-cyan-signal",
										children: ev.id
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "p-2.5 font-mono text-muted-foreground text-[10px]",
										children: ev.type
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "p-2.5 font-mono text-foreground",
										children: ev.timestamp
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "p-2.5 font-mono text-muted-foreground text-[10.5px] leading-relaxed",
										children: ev.content
									})
								]
							}, ev.id))
						})]
					})
				})]
			})
		]
	});
}
var REPORT_SECTIONS = [
	{
		id: "executive-summary",
		label: "Executive Summary"
	},
	{
		id: "classification",
		label: "Incident Classification"
	},
	{
		id: "timeline",
		label: "Forensic Timeline"
	},
	{
		id: "detection-gap",
		label: "Detection Gap Analysis"
	},
	{
		id: "attack-path",
		label: "Attack Path & Lateral Movement"
	},
	{
		id: "assets-users",
		label: "Affected Assets & Users"
	},
	{
		id: "what-defenders-knew",
		label: "What Defenders Knew"
	},
	{
		id: "actual-impact",
		label: "Actual Impact Assessment"
	},
	{
		id: "counterfactual",
		label: "Counterfactual Response Analysis"
	},
	{
		id: "response-comparison",
		label: "Response Comparison Matrix"
	},
	{
		id: "root-cause",
		label: "Root Cause Analysis"
	},
	{
		id: "what-we-missed",
		label: "What We Missed"
	},
	{
		id: "lessons-learned",
		label: "Lessons Learned"
	},
	{
		id: "recommendations",
		label: "Actionable Recommendations"
	},
	{
		id: "action-items",
		label: "Remediation Action Items"
	},
	{
		id: "evidence-ledger",
		label: "Evidence Ledger"
	}
];
function ReportView() {
	const { currentReport, generateReport, finalizeReport, archiveReport, reportStatus, currentMinute } = useDemo();
	const [activeTab, setActiveTab] = (0, import_react.useState)("report");
	const [isGenerating, setIsGenerating] = (0, import_react.useState)(false);
	const [activeSection, setActiveSection] = (0, import_react.useState)("executive-summary");
	(0, import_react.useEffect)(() => {
		if (!currentReport) generateReport();
	}, [currentReport, generateReport]);
	const handleGenerate = () => {
		setIsGenerating(true);
		setTimeout(() => {
			generateReport();
			setIsGenerating(false);
		}, 350);
	};
	const handleRegenerateNewVersion = () => {
		setIsGenerating(true);
		setTimeout(() => {
			incidentReportService.clearFinalizedCache();
			generateReport({ status: "DRAFT" });
			setIsGenerating(false);
		}, 350);
	};
	const handleFinalize = () => {
		finalizeReport();
	};
	const handleArchive = () => {
		archiveReport();
	};
	const handlePrint = () => {
		window.print();
	};
	const report = currentReport || incidentReportService.generateIncidentReport("INC-2048", { minute: currentMinute });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-7xl animate-fade-in space-y-6 pb-16",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "print:hidden space-y-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border/70 pb-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono text-xs uppercase tracking-wider text-muted-foreground",
									children: "INCIDENT REPORTING & POST-INCIDENT LEARNING · INC-2048"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: `font-mono text-[10px] px-2 py-0.5 rounded font-bold ${reportStatus === "FINAL" ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" : reportStatus === "ARCHIVED" ? "bg-purple-500/20 text-purple-300 border border-purple-500/30" : "bg-amber-500/20 text-amber-400 border border-amber-500/30"}`,
									children: reportStatus === "FINAL" ? "STATUS: FINAL (LOCKED)" : reportStatus === "ARCHIVED" ? "STATUS: ARCHIVED" : "STATUS: DRAFT"
								}),
								report && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "font-mono text-[10px] px-2 py-0.5 rounded bg-secondary/50 text-muted-foreground border border-border/60",
									children: ["v", report.version]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "text-2xl font-bold tracking-tight text-white mt-1",
							children: "Incident Resolution Report & Post-Mortem"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground",
							children: "Deterministic synthesis of forensic timeline, digital twin telemetry, counterfactual simulation, and root-cause analysis."
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center gap-2",
						children: [
							reportStatus === "FINAL" || reportStatus === "ARCHIVED" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								variant: "outline",
								size: "sm",
								onClick: handleRegenerateNewVersion,
								disabled: isGenerating,
								className: "font-mono text-xs gap-1.5 border-cyan-500/40 text-cyan-300 hover:bg-cyan-500/10",
								title: "Create a new versioned report draft from current investigation state",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: `size-3.5 ${isGenerating ? "animate-spin text-cyan-400" : ""}` }), isGenerating ? "Regenerating..." : "Regenerate as New Version"]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								variant: "outline",
								size: "sm",
								onClick: handleGenerate,
								disabled: isGenerating,
								className: "font-mono text-xs gap-1.5",
								title: "Generate incident report from current simulation snapshot",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: `size-3.5 ${isGenerating ? "animate-spin text-cyan-400" : ""}` }), isGenerating ? "Generating..." : "Generate Incident Report"]
							}),
							reportStatus === "DRAFT" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								variant: "outline",
								size: "sm",
								onClick: handleFinalize,
								className: "font-mono text-xs gap-1.5 border-emerald-500/40 text-emerald-400 hover:bg-emerald-500/10",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-3.5" }), "Finalize Report"]
							}),
							reportStatus === "FINAL" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-mono font-medium",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "size-3.5" }), "Final Report"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								variant: "outline",
								size: "sm",
								onClick: handleArchive,
								className: "font-mono text-xs gap-1.5 border-purple-500/40 text-purple-300 hover:bg-purple-500/10",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Archive, { className: "size-3.5" }), "Archive"]
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								size: "sm",
								onClick: handlePrint,
								className: "bg-cyan-600 hover:bg-cyan-500 text-white font-mono text-xs gap-1.5 shadow-md",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Printer, { className: "size-3.5" }), "Print / Save as PDF"]
							})
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 rounded-lg bg-card/70 p-1 border border-border/80",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => setActiveTab("report"),
							className: `flex items-center gap-2 px-4 py-1.5 rounded-md text-xs font-semibold transition-all ${activeTab === "report" ? "bg-cyan-600 text-white shadow-sm" : "text-muted-foreground hover:text-foreground"}`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "size-3.5" }), "Incident Resolution Report"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => setActiveTab("learning"),
							className: `flex items-center gap-2 px-4 py-1.5 rounded-md text-xs font-semibold transition-all ${activeTab === "learning" ? "bg-cyan-600 text-white shadow-sm" : "text-muted-foreground hover:text-foreground"}`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "size-3.5" }), "Post-Incident Learning Dashboard"]
						})]
					}), report && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "hidden sm:flex items-center gap-3 text-xs font-mono text-muted-foreground",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Snapshot Minute: ", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", {
								className: "text-foreground",
								children: [
									"T+",
									report.snapshotMinute,
									"m"
								]
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "•" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Generated: ", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", {
								className: "text-foreground",
								children: [report.generatedAt.slice(11, 19), " UTC"]
							})] })
						]
					})]
				}),
				report && activeTab === "report" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-9 gap-2 pt-1 font-mono text-xs",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-lg border border-border/80 bg-background/60 p-2.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[10px] text-muted-foreground uppercase block",
								children: "Severity"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-bold text-rose-400",
								children: report.severity
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-lg border border-border/80 bg-background/60 p-2.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[10px] text-muted-foreground uppercase block",
								children: "Detection Gap"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "font-bold text-amber-400",
								children: [report.detectionGap.delayMinutes, "m"]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-lg border border-border/80 bg-background/60 p-2.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[10px] text-muted-foreground uppercase block",
								children: "Compromised"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "font-bold text-rose-400",
								children: [report.actualImpact.compromisedAssetsCount, " Hosts"]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-lg border border-border/80 bg-background/60 p-2.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[10px] text-muted-foreground uppercase block",
								children: "Critical Assets"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-bold text-rose-400",
								children: report.actualImpact.criticalAssetsAffected.length
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-lg border border-border/80 bg-background/60 p-2.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[10px] text-muted-foreground uppercase block",
								children: "Data Stores"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-bold text-cyan-400",
								children: report.actualImpact.dataStoresAffected
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-lg border border-border/80 bg-background/60 p-2.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[10px] text-muted-foreground uppercase block",
								children: "Attack Path"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "font-bold text-foreground",
								children: [report.attackPath.hopsCount, " Hops"]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-lg border border-border/80 bg-background/60 p-2.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[10px] text-muted-foreground uppercase block",
								children: "Earliest Opp"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-bold text-cyan-300",
								children: report.firstDetectableOpportunity
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-lg border border-border/80 bg-background/60 p-2.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[10px] text-muted-foreground uppercase block",
								children: "Preventable"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "font-bold text-emerald-400",
								children: [
									"+",
									report.counterfactualAnalysis.preventedEvents.length,
									" Stages"
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-lg border border-border/80 bg-background/60 p-2.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[10px] text-muted-foreground uppercase block",
								children: "Recommended"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-bold text-cyan-300 truncate block",
								title: report.responseAnalysis.recommendedAction.label,
								children: "Isolate Host"
							})]
						})
					]
				})
			]
		}), !report ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "rounded-xl border border-border/80 bg-card/40 p-12 text-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: "size-8 text-cyan-400 animate-spin mx-auto mb-3" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm font-medium",
				children: "Synthesizing deterministic incident report..."
			})]
		}) : activeTab === "learning" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LearningDashboard, { report }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-1 lg:grid-cols-4 gap-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
				className: "hidden lg:block lg:col-span-1 print:hidden",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "sticky top-20 rounded-xl border border-border/80 bg-card/60 p-4 backdrop-blur-md space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 pb-3 border-b border-border/60",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Layers, { className: "size-4 text-cyan-400" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono text-xs font-bold uppercase tracking-wider text-foreground",
								children: "Table of Contents"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
							className: "space-y-1 text-xs",
							children: REPORT_SECTIONS.map((section) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: `#${section.id}`,
								onClick: () => setActiveSection(section.id),
								className: `block px-2.5 py-1.5 rounded-md transition-colors ${activeSection === section.id ? "bg-cyan-500/15 text-cyan-300 font-semibold border-l-2 border-cyan-400" : "text-muted-foreground hover:text-foreground hover:bg-muted/30"}`,
								children: section.label
							}, section.id))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "pt-3 border-t border-border/60",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-[10px] font-mono text-muted-foreground",
									children: ["REPORT ID: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-foreground",
										children: report.id
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-[10px] font-mono text-muted-foreground mt-0.5",
									children: ["VERSION: ", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-cyan-400 font-bold",
										children: ["v", report.version]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-[10px] font-mono text-muted-foreground mt-0.5",
									children: ["CONFIDENCE: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-emerald-400 font-bold",
										children: report.confidence
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-[10px] font-mono text-muted-foreground mt-0.5",
									children: ["CITATIONS: ", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-cyan-400 font-bold",
										children: [report.citations.length, " Verified"]
									})]
								})
							]
						})
					]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: "lg:col-span-3 print:w-full print:p-0",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IncidentReportDoc, { report })
			})]
		})]
	});
}
var SplitComponent = ReportView;
//#endregion
export { SplitComponent as component };
