import { r as __toESM } from "../_runtime.mjs";
import { i as require_react, r as require_jsx_runtime } from "../_libs/elevenlabs__react+react.mjs";
import { At as ArrowRight, J as History, K as Info, Nt as Activity, P as Network, St as Check, Tt as Bot, W as Layers, X as GitBranch, _ as ShieldCheck, ct as CornerDownRight, dt as Clock, f as Sparkles, gt as CircleCheck, h as Shield, jt as ArrowLeft, k as Play, l as TriangleAlert, mt as CircleQuestionMark, s as UserX, t as Zap, v as ShieldAlert } from "../_libs/lucide-react.mjs";
import { x as useDemo } from "./DemoContext-DI0dcfwA.mjs";
import { t as AttackGraphCanvas } from "./AttackGraphCanvas-Bx3nguR1.mjs";
import { t as IrisInvestigationPanel } from "./IrisInvestigationPanel-COLlcjpA.mjs";
import { _ as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/simulation-lab-X01jXmyA.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var ACTION_ICONS = {
	DO_NOTHING: Activity,
	ISOLATE_ENDPOINT: Shield,
	DISABLE_USER: UserX,
	BLOCK_LATERAL_CONNECTION: Network
};
function ActionSelector({ availableActions, activeAction, onSelectAction, disabled = false }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
				className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground",
				children: "Step 1: Choose Synthetic Intervention"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "font-mono text-[10px] text-muted-foreground",
				children: [availableActions.length, " response options"]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-4",
			children: availableActions.map((action) => {
				const Icon = ACTION_ICONS[action.type] ?? Shield;
				const isSelected = activeAction.type === action.type;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					disabled,
					onClick: () => onSelectAction(action),
					className: `relative flex flex-col justify-between rounded-xl border p-3.5 text-left backdrop-blur-md transition-all ${isSelected ? "border-cyan-signal bg-cyan-signal/10 ring-1 ring-cyan-signal/50 shadow-[0_0_15px_rgba(6,182,212,0.2)]" : "border-border/70 bg-card/50 hover:border-border hover:bg-card/80"} ${disabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between mb-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: `flex size-8 items-center justify-center rounded-lg border ${isSelected ? "border-cyan-signal/50 bg-cyan-signal/20 text-cyan-signal" : "border-border/60 bg-secondary/30 text-muted-foreground"}`,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4" })
							}), isSelected && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "flex size-5 items-center justify-center rounded-full bg-cyan-signal text-background",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-3 stroke-[3]" })
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
							className: "font-semibold text-xs text-foreground leading-snug",
							children: action.label
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1.5 text-[11px] text-muted-foreground line-clamp-2 leading-relaxed",
							children: action.description
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 border-t border-border/50 pt-2 flex items-center justify-between font-mono text-[10px]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-muted-foreground",
							children: "Target:"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: `font-semibold ${isSelected ? "text-cyan-signal" : "text-foreground"}`,
							children: action.targetId
						})]
					})]
				}, action.id);
			})
		})]
	});
}
function ImpactComparison({ comparison, actionLabel }) {
	const isReduced = comparison.riskChange === "REDUCED";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: `rounded-xl border p-4.5 backdrop-blur-md transition-all ${isReduced ? "border-emerald-500/40 bg-emerald-500/10 shadow-[0_0_20px_rgba(16,185,129,0.15)]" : "border-border/80 bg-secondary/20"}`,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-mono text-[10px] font-bold uppercase tracking-wider text-muted-foreground",
							children: "Counterfactual Risk Verdict"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-1 flex items-center gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: `font-mono text-lg font-bold ${comparison.baselineFinalRisk === "CRITICAL" ? "text-threat" : "text-amber-400"}`,
									children: [comparison.baselineFinalRisk, " (ACTUAL)"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4 text-muted-foreground" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: `font-mono text-lg font-bold ${isReduced ? "text-emerald-400" : "text-foreground"}`,
									children: [comparison.counterfactualFinalRisk, " (COUNTERFACTUAL)"]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-xs text-muted-foreground",
							children: isReduced ? `Simulated response "${actionLabel}" arrested lateral movement and prevented downstream exposure.` : "No response action applied. Attack progression matches baseline incident trajectory."
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex items-center gap-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: `rounded-full px-3 py-1 font-mono text-xs font-bold ${isReduced ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" : "bg-secondary text-muted-foreground"}`,
							children: comparison.riskChange === "REDUCED" ? "RISK REDUCED" : "UNMITIGATED"
						})
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 gap-3 sm:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border border-border/70 bg-card/50 p-3.5 backdrop-blur-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[10px] font-semibold uppercase tracking-wider text-muted-foreground",
								children: "Compromised Assets"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-1.5 flex items-baseline gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono text-2xl font-bold text-foreground",
									children: comparison.counterfactualCompromisedAssets.length
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono text-xs text-muted-foreground line-through",
									children: comparison.baselineCompromisedAssets.length
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1 font-mono text-[11px] font-medium text-emerald-400",
								children: [
									"-",
									comparison.preventedCompromises.length,
									" Prevented"
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[10px] text-muted-foreground truncate mt-0.5",
								children: comparison.preventedCompromises.join(", ") || "None"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border border-border/70 bg-card/50 p-3.5 backdrop-blur-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[10px] font-semibold uppercase tracking-wider text-muted-foreground",
								children: "Critical Assets Hit"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-1.5 flex items-baseline gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono text-2xl font-bold text-foreground",
									children: comparison.counterfactualCriticalAssets.length
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono text-xs text-muted-foreground line-through",
									children: comparison.baselineCriticalAssets.length
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1 font-mono text-[11px] font-medium text-emerald-400",
								children: [
									"-",
									comparison.preventedCriticalImpact.length,
									" Protected"
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[10px] text-muted-foreground truncate mt-0.5",
								children: comparison.preventedCriticalImpact.join(", ") || "None"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border border-border/70 bg-card/50 p-3.5 backdrop-blur-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[10px] font-semibold uppercase tracking-wider text-muted-foreground",
								children: "Data Stores at Risk"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-1.5 flex items-baseline gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono text-2xl font-bold text-foreground",
									children: comparison.counterfactualDataResourcesAtRisk
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono text-xs text-muted-foreground line-through",
									children: comparison.baselineDataResourcesAtRisk
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1 font-mono text-[11px] font-medium text-emerald-400",
								children: [
									"-",
									comparison.preventedDataExposure,
									" Protected"
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[10px] text-muted-foreground truncate mt-0.5",
								children: "Customer DB & Shares"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border border-border/70 bg-card/50 p-3.5 backdrop-blur-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[10px] font-semibold uppercase tracking-wider text-muted-foreground",
								children: "Attack Steps Prevented"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-1.5 flex items-baseline gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono text-2xl font-bold text-emerald-400",
									children: comparison.preventedCount
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono text-xs text-muted-foreground",
									children: "/ 3 Downstream"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 font-mono text-[11px] font-medium text-cyan-signal",
								children: "Deterministic Engine"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[10px] text-muted-foreground truncate mt-0.5",
								children: "Causal Chain Validated"
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-xl border border-border/70 bg-card/40 p-4 text-xs backdrop-blur-md",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 font-semibold text-foreground mb-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CornerDownRight, { className: "size-4 text-cyan-signal" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Causal Impact Explanation" })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-muted-foreground leading-relaxed",
					children: comparison.preventedCount > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						"Executing ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
							className: "text-foreground",
							children: actionLabel
						}),
						" severed the attack graph pivot point. Because ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
							className: "text-foreground",
							children: comparison.preventedEvents[0]?.targetAsset ?? "the target"
						}),
						" was contained, subsequent lateral hops (",
						comparison.preventedCompromises.join(" → ") || "downstream servers",
						") could not be reached, shielding critical enterprise databases from data exfiltration."
					] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Without intervention, the attacker maintained persistent footholds across the workstation segment, progressively acquiring application tier tokens and exfiltrating proprietary records." })
				})]
			})
		]
	});
}
function PreventedEvents({ preventedEvents, actionLabel }) {
	if (preventedEvents.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col items-center justify-center rounded-xl border border-dashed border-border/80 bg-card/30 p-8 text-center text-xs text-muted-foreground",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleQuestionMark, { className: "size-6 text-muted-foreground/60 mb-2" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-semibold text-foreground",
				children: "No Attack Events Prevented"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-[11px] max-w-sm",
				children: "No simulated response action was selected or the selected action did not interrupt the active attack path."
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
				className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground",
				children: [
					"Prevented Attack Transitions (",
					preventedEvents.length,
					")"
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "font-mono text-[10px] text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20",
				children: "ALL BLOCKED BY SIMULATION"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "space-y-2.5",
			children: preventedEvents.map((evt, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start gap-3 rounded-xl border border-border/70 bg-card/40 p-3.5 text-xs backdrop-blur-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "size-3.5" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex-1 space-y-1",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-center justify-between gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "font-mono text-[10px] font-bold text-muted-foreground",
									children: [
										"#",
										idx + 1,
										" [",
										evt.originalTime,
										"]"
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-semibold text-foreground",
									children: evt.title
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "rounded bg-threat/10 px-1.5 py-0.5 font-mono text-[9px] font-bold text-threat border border-threat/20 line-through",
								children: "ORIGINAL ATTACK STEP"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[11px] text-emerald-300 font-medium",
							children: evt.reason
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 pt-1 font-mono text-[10px] text-muted-foreground",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Target: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
									className: "text-foreground",
									children: evt.targetAsset
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "•" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Trigger: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
									className: "text-cyan-signal",
									children: evt.causalTrigger
								})] })
							]
						})
					]
				})]
			}, evt.eventId))
		})]
	});
}
function ScenarioComparison({ scenarioHistory, activeBranchId, approvedBranchId, onSelectBranch, onApproveBranch }) {
	if (scenarioHistory.length === 0) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground",
				children: [
					"Simulated Scenario Comparison & Decision Matrix (",
					scenarioHistory.length,
					")"
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "font-mono text-[10px] text-muted-foreground",
				children: "Select any branch to inspect"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "overflow-x-auto rounded-xl border border-border/80 bg-card/40 backdrop-blur-md",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
				className: "w-full min-w-[700px] text-left text-xs",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
					className: "border-b border-border/70 bg-secondary/30 text-[10.5px] uppercase tracking-wider text-muted-foreground font-semibold",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "p-3",
							children: "Scenario / Action"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "p-3",
							children: "Compromised Assets"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "p-3",
							children: "Critical Assets"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "p-3",
							children: "Data Exposure"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "p-3",
							children: "Final Risk"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "p-3",
							children: "Prevented Steps"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "p-3 text-right",
							children: "Decision"
						})
					] })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
					className: "divide-y divide-border/50",
					children: scenarioHistory.map((branch) => {
						const isActive = branch.branchId === activeBranchId;
						const isApproved = branch.branchId === approvedBranchId;
						const comp = branch.comparison;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							onClick: () => onSelectBranch(branch.branchId),
							className: `cursor-pointer transition-colors ${isActive ? "bg-cyan-signal/10" : "hover:bg-secondary/30"}`,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "p-3 font-semibold text-foreground",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GitBranch, { className: `size-3.5 ${isActive ? "text-cyan-signal" : "text-muted-foreground"}` }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: branch.name }),
											isActive && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "rounded bg-cyan-signal/20 px-1.5 py-0.2 font-mono text-[9px] text-cyan-signal",
												children: "ACTIVE"
											}),
											isApproved && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "rounded bg-emerald-500/20 px-1.5 py-0.2 font-mono text-[9px] text-emerald-400 font-bold border border-emerald-500/30",
												children: "APPROVED"
											})
										]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
									className: "p-3 font-mono",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-bold text-foreground",
										children: comp.counterfactualCompromisedAssets.length
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-muted-foreground text-[10px] ml-1",
										children: [
											"(from ",
											comp.baselineCompromisedAssets.length,
											")"
										]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "p-3 font-mono",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: `font-bold ${comp.counterfactualCriticalAssets.length === 0 ? "text-emerald-400" : "text-threat"}`,
										children: comp.counterfactualCriticalAssets.length
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "p-3 font-mono",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: `font-bold ${comp.counterfactualDataResourcesAtRisk === 0 ? "text-emerald-400" : "text-threat"}`,
										children: comp.counterfactualDataResourcesAtRisk
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "p-3",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: `rounded px-2 py-0.5 font-mono text-[10px] font-bold ${comp.counterfactualFinalRisk === "CRITICAL" ? "bg-threat/20 text-threat" : comp.counterfactualFinalRisk === "HIGH" ? "bg-amber-500/20 text-amber-300" : "bg-emerald-500/20 text-emerald-400"}`,
										children: comp.counterfactualFinalRisk
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "p-3 font-mono text-emerald-400 font-semibold",
									children: comp.preventedCount > 0 ? `+${comp.preventedCount} blocked` : "None"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "p-3 text-right",
									onClick: (e) => e.stopPropagation(),
									children: isApproved ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "inline-flex items-center gap-1 font-mono text-[10px] text-emerald-400 font-bold",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-3" }), " Selected"]
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => onApproveBranch(branch.branchId),
										className: "rounded-md border border-border bg-secondary/50 px-2.5 py-1 text-[11px] font-medium text-foreground hover:border-emerald-500/50 hover:bg-emerald-500/10 hover:text-emerald-300 transition-colors",
										children: "Select Response"
									})
								})
							]
						}, branch.branchId);
					})
				})]
			})
		})]
	});
}
function ResponseIntelligencePanel() {
	const { currentTime, currentMinute, responseMode, setResponseMode, responseCandidates, responseRecommendation, responseDecision, responseSimulationStatus, approveResponse, rejectResponse, simulateRecommendedResponse, autoSimulateResponse, simulateAction, isSimulating } = useDemo();
	const [showAutoConfirmModal, setShowAutoConfirmModal] = (0, import_react.useState)(false);
	const [showComparisonDetails, setShowComparisonDetails] = (0, import_react.useState)(true);
	const rec = responseRecommendation;
	const handleSimulateCandidate = (candidate) => {
		simulateAction(candidate.action);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl border border-cyan-signal/40 bg-card/70 backdrop-blur-xl shadow-panel overflow-hidden space-y-4 p-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between gap-3 rounded-lg border border-amber-500/40 bg-amber-500/10 px-3.5 py-2 text-[11px] text-amber-300",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "size-4 shrink-0 text-amber-400" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "SIMULATION ONLY SANDBOX:" }), " All response actions are evaluated exclusively inside the synthetic ACME incident engine. No real endpoints, EDRs, firewalls, or credentials will be contacted or modified."] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-mono text-[9px] font-bold uppercase tracking-wider rounded bg-amber-500/20 px-2 py-0.5 border border-amber-500/30",
					children: "Synthetic Model"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center justify-between gap-4 border-b border-border/80 pb-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex size-10 items-center justify-center rounded-xl bg-cyan-signal/15 border border-cyan-signal/40 text-cyan-signal shadow-glow",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bot, { className: "size-5" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-base font-bold text-foreground tracking-tight",
							children: "IRIS RESPONSE INTELLIGENCE & DECISION SUPPORT"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "rounded bg-cyan-signal/20 px-2 py-0.5 font-mono text-[10px] font-bold text-cyan-signal border border-cyan-signal/30",
							children: "PHASE 5 EXTENSION"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs text-muted-foreground",
						children: [
							"Autonomous simulated evaluation & human-in-the-loop decision optimization at ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
								className: "text-foreground font-mono",
								children: currentTime
							}),
							" (T+",
							currentMinute,
							"m)."
						]
					})] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center rounded-lg border border-border/80 bg-secondary/40 p-1 text-xs",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => setResponseMode("IRIS_RECOMMEND"),
							className: `flex items-center gap-1.5 rounded-md px-3 py-1.5 font-medium transition-all ${responseMode === "IRIS_RECOMMEND" ? "bg-cyan-signal text-background font-bold shadow-sm" : "text-muted-foreground hover:text-foreground"}`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bot, { className: "size-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "IRIS Recommend" })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => setResponseMode("AUTO_SIMULATE"),
							className: `flex items-center gap-1.5 rounded-md px-3 py-1.5 font-medium transition-all ${responseMode === "AUTO_SIMULATE" ? "bg-purple-600 text-white font-bold shadow-sm" : "text-muted-foreground hover:text-foreground"}`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, { className: "size-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Auto-Simulate" })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => setResponseMode("MANUAL"),
							className: `flex items-center gap-1.5 rounded-md px-3 py-1.5 font-medium transition-all ${responseMode === "MANUAL" ? "bg-secondary text-foreground font-bold shadow-sm" : "text-muted-foreground hover:text-foreground"}`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Layers, { className: "size-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Manual Review" })]
						})
					]
				})]
			}),
			responseMode === "IRIS_RECOMMEND" && rec && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-xl border border-cyan-signal/50 bg-cyan-signal/5 p-4.5 space-y-3.5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-center justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "flex items-center gap-1 rounded bg-cyan-signal/20 px-2 py-0.5 font-mono text-[10px] font-bold text-cyan-signal border border-cyan-signal/40",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-3" }), " RECOMMENDED RESPONSE"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "font-mono text-xs text-muted-foreground",
									children: ["Score: ", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", {
										className: "text-cyan-signal",
										children: [rec.score, " pts"]
									})]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 font-mono text-xs",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-muted-foreground",
									children: "Confidence:"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: `rounded px-2 py-0.5 text-[10px] font-bold ${rec.confidence === "HIGH" ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" : "bg-amber-500/20 text-amber-400 border border-amber-500/30"}`,
									children: [rec.confidence, " CONFIDENCE"]
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-lg font-bold text-foreground",
							children: rec.recommendedAction.label
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-muted-foreground mt-0.5",
							children: [
								"Target Entity: ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
									className: "text-foreground font-mono",
									children: rec.target
								}),
								" · Scope: Endpoint Network Interface Severance"
							]
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-1 gap-3 md:grid-cols-2 text-xs",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-lg border border-border/70 bg-background/50 p-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "font-semibold text-foreground flex items-center gap-1.5 mb-1 text-[11px]",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, { className: "size-3.5 text-cyan-signal" }), " Why IRIS Recommends This:"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-muted-foreground text-[11.5px] leading-relaxed",
									children: rec.rationale
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-lg border border-border/70 bg-background/50 p-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "font-semibold text-foreground flex items-center gap-1.5 mb-1 text-[11px]",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, { className: "size-3.5 text-emerald-400" }), " Expected Simulated Impact:"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-muted-foreground text-[11.5px] leading-relaxed",
									children: rec.expectedImpact
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-cyan-signal/20",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex items-center gap-2",
								children: responseDecision?.status === "APPROVED" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "flex items-center gap-1.5 text-xs font-bold text-emerald-400",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-4" }), " RESPONSE STRATEGY APPROVED"]
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs text-muted-foreground",
									children: "Human Review Required: Validate rationale before triggering simulated branch."
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2.5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: approveResponse,
										disabled: responseDecision?.status === "APPROVED",
										className: "rounded-lg border border-emerald-500/50 bg-emerald-500/10 px-3 py-1.5 text-xs font-bold text-emerald-400 hover:bg-emerald-500/20 disabled:opacity-50 transition-colors",
										children: responseDecision?.status === "APPROVED" ? "APPROVED" : "APPROVE PLAN"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										onClick: simulateRecommendedResponse,
										disabled: isSimulating,
										className: "flex items-center gap-1.5 rounded-lg bg-cyan-signal px-4 py-1.5 font-mono text-xs font-bold text-background hover:bg-cyan-400 disabled:opacity-50 transition-all shadow-md",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "size-3.5 fill-current" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: isSimulating ? "SIMULATING..." : "SIMULATE FUTURE" })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: rejectResponse,
										className: "rounded-lg border border-border bg-secondary/50 px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors",
										children: "REJECT / DISMISS"
									})
								]
							})]
						})
					]
				})
			}),
			responseMode === "AUTO_SIMULATE" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-xl border border-purple-500/40 bg-purple-500/5 p-4.5 space-y-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex items-center gap-1 rounded bg-purple-500/20 px-2 py-0.5 font-mono text-[10px] font-bold text-purple-300 border border-purple-500/40 w-fit",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, { className: "size-3" }), " AUTONOMOUS SIMULATED REMEDIATION"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-base font-bold text-foreground mt-1",
							children: "Autonomous Decision Pipeline & Counterfactual Execution"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground",
							children: "IRIS autonomously selects the highest-scoring response and executes an isolated counterfactual branch without human intervention."
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => setShowAutoConfirmModal(true),
						className: "flex items-center gap-2 rounded-lg bg-purple-600 px-4 py-2 font-mono text-xs font-bold text-white hover:bg-purple-500 transition-colors shadow-glow",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, { className: "size-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "RUN AUTO-SIMULATE" })]
					})]
				}), responseDecision?.mode === "AUTO_SIMULATE" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-lg border border-purple-500/30 bg-background/60 p-3.5 space-y-2 text-xs",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between font-mono text-[11px]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-purple-300 font-bold flex items-center gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-3.5 text-emerald-400" }), "AUTONOMOUS EXECUTION COMPLETED (SIMULATION ONLY)"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted-foreground",
								children: responseDecision.executedAt
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-foreground",
							children: [
								"Action: ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
									className: "text-cyan-signal",
									children: responseDecision.selectedAction.label
								}),
								" on target ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
									className: "font-mono text-purple-300",
									children: responseDecision.target
								}),
								"."
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-muted-foreground text-[11px]",
							children: [
								"Simulated Branch ID: ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
									className: "text-foreground font-mono",
									children: responseDecision.branchId
								}),
								". Downstream lateral pivots to SERVER-03 and DB-PROD-01 were autonomously averted in the synthetic model."
							]
						})
					]
				})]
			}),
			responseMode === "MANUAL" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "rounded-xl border border-border bg-secondary/20 p-4 text-xs",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-foreground font-medium",
					children: "Manual Response Mode: You can select any response candidate from the comparison matrix below and simulate it directly to explore alternate futures."
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-2 pt-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h4", {
						className: "text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Layers, { className: "size-3.5 text-cyan-signal" }),
							"Evaluated Response Candidates (",
							responseCandidates.length,
							")"
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-mono text-[10px] text-muted-foreground",
						children: "Ranked by Deterministic Prevention Score"
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
									children: "Response Candidate"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "p-2.5",
									children: "Target"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "p-2.5",
									children: "Simulated Risk"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "p-2.5",
									children: "Prevented Systems"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "p-2.5",
									children: "Prevented Events"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "p-2.5",
									children: "Data Protected"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "p-2.5",
									children: "Score"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "p-2.5",
									children: "Confidence"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "p-2.5 text-right",
									children: "Action"
								})
							] })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
							className: "divide-y divide-border/50 text-[11.5px]",
							children: responseCandidates.map((c) => {
								const isRecommended = rec?.candidateId === c.id || c.action.type === rec?.recommendedAction.type;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
									className: `transition-colors hover:bg-secondary/30 ${isRecommended ? "bg-cyan-signal/10" : ""}`,
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "p-2.5 font-medium text-foreground",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-1.5",
												children: [isRecommended && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "rounded bg-cyan-signal/20 px-1 py-0.2 font-mono text-[9px] font-bold text-cyan-signal border border-cyan-signal/40",
													children: "IRIS CHOICE"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: c.action.label })]
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "p-2.5 font-mono text-muted-foreground",
											children: c.target
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "p-2.5 font-mono",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: `rounded px-1.5 py-0.5 text-[10px] font-bold ${c.simulatedRisk === "CRITICAL" ? "bg-threat/20 text-threat" : c.simulatedRisk === "HIGH" ? "bg-warning/20 text-warning" : "bg-emerald-500/20 text-emerald-400"}`,
												children: c.simulatedRisk
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "p-2.5 font-mono text-foreground",
											children: c.preventedCompromises.length > 0 ? c.preventedCompromises.join(", ") : "0 assets"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
											className: "p-2.5 font-mono text-foreground",
											children: [c.preventedEvents.length, " stages"]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
											className: "p-2.5 font-mono text-foreground",
											children: [c.preventedDataExposure, " stores"]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "p-2.5 font-mono font-bold text-cyan-signal",
											children: c.score
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "p-2.5",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-mono text-[10px] text-muted-foreground",
												children: c.confidence
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "p-2.5 text-right",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												type: "button",
												onClick: () => handleSimulateCandidate(c),
												disabled: isSimulating,
												className: `rounded px-2.5 py-1 font-mono text-[10px] font-bold transition-all ${isRecommended ? "bg-cyan-signal text-background hover:bg-cyan-400" : "border border-border bg-secondary hover:bg-secondary/80 text-foreground"}`,
												children: "Simulate"
											})
										})
									]
								}, c.id);
							})
						})]
					})
				})]
			}),
			showAutoConfirmModal && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "w-full max-w-md rounded-xl border border-purple-500/50 bg-card p-5 shadow-2xl space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3 text-purple-400",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, { className: "size-6" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-base font-bold text-foreground",
								children: "Confirm Autonomous Simulated Response"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-muted-foreground leading-relaxed",
							children: [
								"IRIS will automatically select and simulate the highest-scoring response action (",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: rec?.recommendedAction.label }),
								") using the synthetic incident model."
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-lg border border-amber-500/40 bg-amber-500/10 p-3 text-xs text-amber-300",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "STRICT SAFETY GUARANTEE:" }), " This is a simulation only. No real infrastructure, endpoints, or cloud policies will be modified."]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-end gap-2.5 pt-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setShowAutoConfirmModal(false),
								className: "rounded-lg border border-border bg-secondary px-3 py-1.5 text-xs text-foreground font-medium hover:bg-secondary/80",
								children: "Cancel"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => {
									setShowAutoConfirmModal(false);
									autoSimulateResponse();
								},
								className: "rounded-lg bg-purple-600 px-4 py-1.5 font-mono text-xs font-bold text-white hover:bg-purple-500 shadow-glow",
								children: "Confirm & Auto-Simulate"
							})]
						})
					]
				})
			})
		]
	});
}
function SimulationLabView() {
	const navigate = useNavigate();
	const { currentTime, currentMinute, incidentStage, currentRisk, counterfactualBranch, activeAction, setActiveAction, availableActions, scenarioHistory, simulateAction, selectBranch, isCounterfactualMode, enterCounterfactualMode, exitCounterfactualMode, approvedBranchId, approveBranch, isSimulating, attackGraph: actualAttackGraph, selectedEntityId, setSelectedEntityId, selectedEdgeId, setSelectedEdgeId } = useDemo();
	const [activeTab, setActiveTab] = (0, import_react.useState)("SIDE_BY_SIDE");
	const handleSimulate = (0, import_react.useCallback)(() => {
		simulateAction(activeAction);
	}, [simulateAction, activeAction]);
	const handleReturnToIncident = (0, import_react.useCallback)(() => {
		exitCounterfactualMode();
		navigate({ to: "/time-machine" });
	}, [exitCounterfactualMode, navigate]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-7xl animate-fade-in space-y-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center justify-between gap-4 rounded-xl border border-border/80 bg-card/60 p-4.5 backdrop-blur-md",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex size-11 items-center justify-center rounded-xl bg-cyan-signal/10 border border-cyan-signal/30 text-cyan-signal",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GitBranch, { className: "size-6" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "text-xl font-bold tracking-tight text-foreground",
							children: "COUNTERFACTUAL SIMULATION LAB"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "rounded bg-cyan-signal/15 px-2 py-0.5 font-mono text-[11px] font-bold text-cyan-signal border border-cyan-signal/30",
							children: "INC-2048 BRANCH"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs text-muted-foreground mt-0.5",
						children: [
							"Simulate alternate realities forked from historical baseline at",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
								className: "text-foreground font-mono",
								children: currentTime
							}),
							" (T+",
							currentMinute,
							"m)."
						]
					})] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center gap-2.5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-1.5 rounded-lg border border-border/70 bg-secondary/30 px-3 py-1.5 text-xs",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "size-3.5 text-cyan-signal" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-muted-foreground",
									children: "Base:"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono font-bold text-foreground",
									children: currentTime
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-1.5 rounded-lg border border-border/70 bg-secondary/30 px-3 py-1.5 text-xs",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldAlert, { className: "size-3.5 text-threat" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-muted-foreground",
									children: "Original Risk:"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-bold text-threat uppercase",
									children: currentRisk
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: handleReturnToIncident,
							className: "flex items-center gap-1.5 rounded-lg border border-border bg-secondary/40 px-3 py-1.5 text-xs font-semibold text-foreground hover:bg-secondary/70 transition-colors",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-3.5" }), "Return to Real Incident"]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-xl border border-border/80 bg-card/40 p-4.5 backdrop-blur-md",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActionSelector, {
					availableActions,
					activeAction,
					onSelectAction: setActiveAction,
					disabled: isSimulating
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-border/60 pt-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-xs text-muted-foreground",
						children: [
							"Targeting: ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
								className: "text-cyan-signal font-mono",
								children: activeAction.targetId
							}),
							" ",
							"via synthetic response engine. Real organization is untouched."
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex items-center gap-2.5",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: handleSimulate,
							disabled: isSimulating,
							className: `flex items-center gap-2 rounded-lg px-4 py-2 font-mono text-xs font-bold transition-all shadow-md ${isSimulating ? "bg-secondary text-muted-foreground cursor-wait" : "bg-cyan-signal text-background hover:bg-cyan-400 active:scale-95 shadow-[0_0_15px_rgba(6,182,212,0.35)]"}`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "size-3.5 fill-current" }), isSimulating ? "SIMULATING ALTERNATE FUTURE..." : "SIMULATE FUTURE"]
						})
					})]
				})]
			}),
			counterfactualBranch && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImpactComparison, {
						comparison: counterfactualBranch.comparison,
						actionLabel: counterfactualBranch.action.label
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 border-b border-border/70 pb-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => setActiveTab("SIDE_BY_SIDE"),
								className: `flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${activeTab === "SIDE_BY_SIDE" ? "bg-cyan-signal/15 text-cyan-signal border border-cyan-signal/30" : "text-muted-foreground hover:bg-secondary/40 hover:text-foreground"}`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Layers, { className: "size-3.5" }), "Side-by-Side Attack Graph"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => setActiveTab("PREVENTED"),
								className: `flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${activeTab === "PREVENTED" ? "bg-cyan-signal/15 text-cyan-signal border border-cyan-signal/30" : "text-muted-foreground hover:bg-secondary/40 hover:text-foreground"}`,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-3.5" }),
									"Prevented Steps (",
									counterfactualBranch.comparison.preventedCount,
									")"
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => setActiveTab("HISTORY"),
								className: `flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${activeTab === "HISTORY" ? "bg-cyan-signal/15 text-cyan-signal border border-cyan-signal/30" : "text-muted-foreground hover:bg-secondary/40 hover:text-foreground"}`,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(History, { className: "size-3.5" }),
									"Scenario History (",
									scenarioHistory.length,
									")"
								]
							})
						]
					}),
					activeTab === "SIDE_BY_SIDE" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-4 lg:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2 rounded-xl border border-threat/40 bg-card/40 p-3.5 backdrop-blur-md",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-2 rounded-full bg-threat animate-ping" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "font-bold text-xs uppercase tracking-wider text-threat",
										children: "Baseline Reality (Unmitigated Future)"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono text-[10px] text-muted-foreground",
									children: "Final: CRITICAL (4 Assets)"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AttackGraphCanvas, {
								nodes: actualAttackGraph.nodes,
								edges: actualAttackGraph.edges,
								selectedNodeId: selectedEntityId,
								selectedEdgeId,
								activePath: actualAttackGraph.activePath,
								highlightedPathId: actualAttackGraph.activePath?.pathId ?? null,
								onSelectNode: setSelectedEntityId,
								onSelectEdge: setSelectedEdgeId
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2 rounded-xl border border-cyan-signal/40 bg-card/40 p-3.5 backdrop-blur-md",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-2 rounded-full bg-cyan-signal" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
										className: "font-bold text-xs uppercase tracking-wider text-cyan-signal",
										children: [
											"Counterfactual Reality (",
											counterfactualBranch.action.type,
											")"
										]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "font-mono text-[10px] text-emerald-400 font-bold",
									children: [
										"Final: ",
										counterfactualBranch.comparison.counterfactualFinalRisk,
										" (",
										counterfactualBranch.comparison.counterfactualCompromisedAssets.length,
										" Assets)"
									]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AttackGraphCanvas, {
								nodes: counterfactualBranch.attackGraph.nodes,
								edges: counterfactualBranch.attackGraph.edges,
								selectedNodeId: selectedEntityId,
								selectedEdgeId,
								activePath: counterfactualBranch.attackGraph.activePath,
								highlightedPathId: counterfactualBranch.attackGraph.activePath?.pathId ?? null,
								onSelectNode: setSelectedEntityId,
								onSelectEdge: setSelectedEdgeId
							})]
						})]
					}),
					activeTab === "PREVENTED" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreventedEvents, {
						preventedEvents: counterfactualBranch.comparison.preventedEvents,
						actionLabel: counterfactualBranch.action.label
					}),
					activeTab === "HISTORY" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScenarioComparison, {
						scenarioHistory,
						activeBranchId: counterfactualBranch.branchId,
						approvedBranchId,
						onSelectBranch: selectBranch,
						onApproveBranch: approveBranch
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center justify-between gap-4 rounded-xl border border-border/80 bg-secondary/20 p-4 text-xs backdrop-blur-md",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-mono text-[10px] uppercase font-bold text-muted-foreground",
							children: "Incident Response Decision Point"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-medium text-foreground mt-0.5",
							children: approvedBranchId === counterfactualBranch.branchId ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-emerald-400 font-bold flex items-center gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-4" }), " RESPONSE PLAN SELECTED & APPROVED FOR PLAYBOOK"]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Select this simulated counterfactual response to validate the remediation trajectory." })
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => approveBranch(counterfactualBranch.branchId),
								className: `flex items-center gap-1.5 rounded-lg px-3.5 py-2 font-mono text-xs font-bold transition-all ${approvedBranchId === counterfactualBranch.branchId ? "bg-emerald-500 text-background cursor-default" : "border border-emerald-500/50 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20"}`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-3.5" }), approvedBranchId === counterfactualBranch.branchId ? "RESPONSE APPROVED" : "SELECT THIS RESPONSE"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: handleReturnToIncident,
								className: "rounded-lg border border-border bg-secondary/50 px-3 py-2 text-foreground font-medium hover:bg-secondary/80 transition-colors",
								children: "Return to Incident"
							})]
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponseIntelligencePanel, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IrisInvestigationPanel, {
				title: "IRIS Simulation Assistant",
				defaultPrompt: counterfactualBranch ? "What did this response prevent?" : "What would happen if we isolate LAPTOP-042 at 10:04?",
				suggestedQuestions: [
					"What did this response prevent?",
					"Why was SERVER-03 not reached in the counterfactual?",
					"Why was DB-PROD-01 protected?",
					"Compare the actual future with the counterfactual future."
				],
				compact: false
			})
		]
	});
}
var SplitComponent = SimulationLabView;
//#endregion
export { SplitComponent as component };
