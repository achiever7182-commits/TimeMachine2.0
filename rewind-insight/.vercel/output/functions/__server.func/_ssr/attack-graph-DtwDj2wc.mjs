import { r as __toESM } from "../_runtime.mjs";
import { i as require_react, r as require_jsx_runtime } from "../_libs/elevenlabs__react+react.mjs";
import { At as ArrowRight, C as Search, E as Radio, G as Laptop, K as Info, Nt as Activity, Q as FolderGit2, W as Layers, Y as Globe, Z as Funnel, _t as CircleCheckBig, at as ExternalLink, dt as Clock, et as Flame, f as Sparkles, l as TriangleAlert, lt as Compass, nt as FileSearch, o as User, ot as Database, t as Zap, v as ShieldAlert, w as RotateCcw, x as Server } from "../_libs/lucide-react.mjs";
import { c as filterAttackGraph, p as getDownstreamReachableNodes, u as generatePathExplanation, x as useDemo } from "./DemoContext-DI0dcfwA.mjs";
import { t as AttackGraphCanvas } from "./AttackGraphCanvas-Bx3nguR1.mjs";
import { t as IrisInvestigationPanel } from "./IrisInvestigationPanel-COLlcjpA.mjs";
import { _ as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/attack-graph-DtwDj2wc.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var NODE_TYPES = [
	{
		label: "All Types",
		value: "ALL"
	},
	{
		label: "External Threat",
		value: "EXTERNAL_THREAT"
	},
	{
		label: "Users / Identity",
		value: "USER"
	},
	{
		label: "Endpoints",
		value: "ENDPOINT"
	},
	{
		label: "Servers",
		value: "SERVER"
	},
	{
		label: "Databases",
		value: "DATABASE"
	},
	{
		label: "File Servers",
		value: "FILE_SERVER"
	},
	{
		label: "Gateways",
		value: "NETWORK_GATEWAY"
	}
];
var NODE_STATUSES = [
	{
		label: "All Statuses",
		value: "ALL"
	},
	{
		label: "Compromised",
		value: "COMPROMISED"
	},
	{
		label: "Affected",
		value: "AFFECTED"
	},
	{
		label: "Suspicious",
		value: "SUSPICIOUS"
	},
	{
		label: "Monitored",
		value: "MONITORED"
	},
	{
		label: "Healthy",
		value: "HEALTHY"
	}
];
var RELATIONSHIPS = [
	{
		label: "All Relationships",
		value: "ALL"
	},
	{
		label: "Authentication",
		value: "AUTHENTICATED_TO"
	},
	{
		label: "Connection",
		value: "CONNECTED_TO"
	},
	{
		label: "Lateral Movement",
		value: "LATERALLY_MOVED_TO"
	},
	{
		label: "Query",
		value: "QUERIED"
	},
	{
		label: "Data Access",
		value: "ACCESSED_DATA"
	},
	{
		label: "Communication",
		value: "COMMUNICATED_WITH"
	}
];
function AttackGraphFilters({ filters, onChange, onReset }) {
	const isFiltered = filters.nodeType !== "ALL" || filters.status !== "ALL" || filters.relationship !== "ALL" || filters.searchQuery.trim().length > 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-wrap items-center gap-3 rounded-xl border border-border/70 bg-card/40 p-3 backdrop-blur-md",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative min-w-[200px] flex-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "text",
					value: filters.searchQuery,
					onChange: (e) => onChange({
						...filters,
						searchQuery: e.target.value
					}),
					placeholder: "Filter nodes by ID, label, owner...",
					className: "h-8 w-full rounded-md border border-border bg-secondary/30 pl-8 pr-3 text-xs text-foreground placeholder:text-muted-foreground focus:border-cyan-signal focus:outline-none focus:ring-1 focus:ring-cyan-signal/50"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-1.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Funnel, { className: "size-3 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
					value: filters.nodeType,
					onChange: (e) => onChange({
						...filters,
						nodeType: e.target.value
					}),
					className: "h-8 rounded-md border border-border bg-secondary/30 px-2.5 text-xs text-foreground focus:border-cyan-signal focus:outline-none",
					children: NODE_TYPES.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: t.value,
						className: "bg-popover text-foreground",
						children: t.label
					}, t.value))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
				value: filters.status,
				onChange: (e) => onChange({
					...filters,
					status: e.target.value
				}),
				className: "h-8 rounded-md border border-border bg-secondary/30 px-2.5 text-xs text-foreground focus:border-cyan-signal focus:outline-none",
				children: NODE_STATUSES.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
					value: s.value,
					className: "bg-popover text-foreground",
					children: s.label
				}, s.value))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
				value: filters.relationship,
				onChange: (e) => onChange({
					...filters,
					relationship: e.target.value
				}),
				className: "h-8 rounded-md border border-border bg-secondary/30 px-2.5 text-xs text-foreground focus:border-cyan-signal focus:outline-none",
				children: RELATIONSHIPS.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
					value: r.value,
					className: "bg-popover text-foreground",
					children: r.label
				}, r.value))
			}),
			isFiltered && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				onClick: onReset,
				className: "flex h-8 items-center gap-1 rounded-md border border-threat/40 bg-threat/10 px-2.5 text-xs font-medium text-threat hover:bg-threat/20 transition-colors",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "size-3" }), "Clear Filters"]
			})
		]
	});
}
function AttackGraphInspector({ graph, selectedNode, selectedEdge, onSelectNode, onViewTimelineEvents, onViewEvidence }) {
	if (selectedEdge) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-full flex-col overflow-y-auto rounded-xl border border-border/80 bg-card/50 p-4 text-xs backdrop-blur-md",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between border-b border-border/70 pb-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, { className: "size-4 text-cyan-signal" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-semibold text-foreground text-sm",
					children: "Edge Relationship"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "rounded bg-cyan-signal/10 px-2 py-0.5 font-mono text-[10px] font-bold text-cyan-signal",
				children: selectedEdge.relationshipType
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-4 space-y-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between rounded-lg border border-border/60 bg-secondary/20 p-2.5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => onSelectNode(selectedEdge.source),
							className: "font-mono font-bold text-foreground hover:text-cyan-signal hover:underline",
							children: selectedEdge.source
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-3.5 text-muted-foreground" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => onSelectNode(selectedEdge.target),
							className: "font-mono font-bold text-foreground hover:text-cyan-signal hover:underline",
							children: selectedEdge.target
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-semibold text-muted-foreground uppercase text-[10px] tracking-wider",
					children: "Description"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-foreground leading-relaxed",
					children: selectedEdge.description
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-semibold text-muted-foreground uppercase text-[10px] tracking-wider",
					children: "Technique Category"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 font-mono text-cyan-signal font-medium",
					children: selectedEdge.techniqueCategory
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-2 gap-2 rounded-lg border border-border/50 bg-secondary/15 p-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-[10px] text-muted-foreground",
						children: "First Seen"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono font-bold text-foreground",
						children: selectedEdge.firstSeen
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-[10px] text-muted-foreground",
						children: "Confidence"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "font-mono font-bold text-emerald-400",
						children: [Math.round(selectedEdge.confidence * 100), "%"]
					})] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-2 pt-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => onViewTimelineEvents(selectedEdge.eventIds),
						className: "flex w-full items-center justify-between rounded-md border border-cyan-signal/40 bg-cyan-signal/10 px-3 py-2 font-medium text-cyan-signal hover:bg-cyan-signal/20 transition-colors",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex items-center gap-1.5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, { className: "size-3.5" }),
								"View Related Events (",
								selectedEdge.eventIds.length,
								")"
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "size-3" })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => onViewEvidence(selectedEdge.evidenceIds),
						className: "flex w-full items-center justify-between rounded-md border border-border bg-secondary/30 px-3 py-2 font-medium text-foreground hover:bg-secondary/50 transition-colors",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex items-center gap-1.5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileSearch, { className: "size-3.5 text-muted-foreground" }),
								"View Supporting Evidence (",
								selectedEdge.evidenceIds.length,
								")"
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "size-3 text-muted-foreground" })]
					})]
				})
			]
		})]
	});
	if (selectedNode) {
		const incomingEdges = graph.edges.filter((e) => e.target === selectedNode.id);
		const outgoingEdges = graph.edges.filter((e) => e.source === selectedNode.id);
		const reachableNodes = getDownstreamReachableNodes(graph, selectedNode.id);
		const pathExplanation = generatePathExplanation(graph, selectedNode.id);
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex h-full flex-col overflow-y-auto rounded-xl border border-border/80 bg-card/50 p-4 text-xs backdrop-blur-md",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between border-b border-border/70 pb-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-bold text-foreground text-sm font-mono",
						children: selectedNode.id
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "rounded bg-secondary px-1.5 py-0.5 font-mono text-[9px] text-muted-foreground",
						children: selectedNode.type
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[10px] text-muted-foreground mt-0.5",
					children: selectedNode.label
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: `flex items-center gap-1 rounded-full px-2 py-0.5 font-mono text-[10px] font-bold ${selectedNode.status === "COMPROMISED" ? "bg-threat/20 text-threat" : selectedNode.status === "AFFECTED" ? "bg-amber-500/20 text-amber-300" : selectedNode.status === "SUSPICIOUS" ? "bg-amber-400/20 text-amber-400" : "bg-emerald-500/20 text-emerald-400"}`,
					children: selectedNode.status
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3.5 space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 gap-2 rounded-lg border border-border/50 bg-secondary/15 p-2.5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[10px] text-muted-foreground",
								children: "Criticality"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-semibold text-foreground",
								children: selectedNode.criticality
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[10px] text-muted-foreground",
								children: "Owner"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-semibold text-foreground truncate",
								children: selectedNode.owner
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[10px] text-muted-foreground",
								children: "First Seen"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-mono text-foreground",
								children: selectedNode.firstSeen
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[10px] text-muted-foreground",
								children: "Compromise Time"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-mono text-threat font-bold",
								children: selectedNode.compromiseTime ?? "N/A"
							})] })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => onViewTimelineEvents(selectedNode.eventIds),
							className: "flex items-center justify-center gap-1.5 rounded-md border border-cyan-signal/40 bg-cyan-signal/10 py-1.5 font-medium text-cyan-signal hover:bg-cyan-signal/20 transition-colors",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, { className: "size-3" }),
								"Events (",
								selectedNode.eventIds.length,
								")"
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => onViewEvidence(selectedNode.evidenceIds),
							className: "flex items-center justify-center gap-1.5 rounded-md border border-border bg-secondary/30 py-1.5 font-medium text-foreground hover:bg-secondary/50 transition-colors",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileSearch, { className: "size-3" }),
								"Evidence (",
								selectedNode.evidenceIds.length,
								")"
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-lg border border-border/60 bg-secondary/15 p-2.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-1.5 font-semibold text-foreground mb-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Layers, { className: "size-3.5 text-cyan-signal" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "How did we get here?" })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "space-y-1 text-[11px] text-muted-foreground",
							children: pathExplanation.map((step, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "leading-snug",
								children: step
							}, idx))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-lg border border-border/60 bg-secondary/15 p-2.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-1.5 font-semibold text-foreground mb-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, { className: "size-3.5 text-amber-400" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Downstream Reachable Systems" })]
						}), reachableNodes.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-[10px] text-muted-foreground",
							children: [
								"No downstream systems reachable from this node at ",
								graph.timestamp,
								"."
							]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex flex-wrap gap-1.5",
							children: reachableNodes.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => onSelectNode(n.id),
								className: "flex items-center gap-1 rounded border border-border/80 bg-background/80 px-2 py-0.5 font-mono text-[10px] text-foreground hover:border-cyan-signal transition-colors",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: n.id }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `size-1.5 rounded-full ${n.status === "COMPROMISED" ? "bg-threat" : "bg-amber-400"}` })]
							}, n.id))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "font-semibold text-muted-foreground uppercase text-[10px] tracking-wider",
							children: [
								"Relationships (",
								incomingEdges.length,
								" In / ",
								outgoingEdges.length,
								" Out)"
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1",
							children: [incomingEdges.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between rounded bg-secondary/20 px-2 py-1 text-[10.5px]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-muted-foreground",
									children: ["From ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
										className: "text-foreground",
										children: e.source
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono text-[9px] text-cyan-signal",
									children: e.relationshipType
								})]
							}, e.id)), outgoingEdges.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between rounded bg-secondary/20 px-2 py-1 text-[10.5px]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-muted-foreground",
									children: ["To ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
										className: "text-foreground",
										children: e.target
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono text-[9px] text-cyan-signal",
									children: e.relationshipType
								})]
							}, e.id))]
						})]
					})
				]
			})]
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-full flex-col items-center justify-center rounded-xl border border-dashed border-border/80 bg-card/30 p-6 text-center text-xs text-muted-foreground",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, { className: "size-6 text-muted-foreground/60 mb-2" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-medium text-foreground",
				children: "No Asset or Relationship Selected"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-[11px] max-w-[200px]",
				children: "Click any node or directional edge in the attack graph to inspect forensic details."
			})
		]
	});
}
function GraphLegend() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-wrap items-center gap-x-6 gap-y-2 rounded-lg border border-border/60 bg-secondary/20 px-3.5 py-2 text-xs backdrop-blur-sm",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "font-mono text-[10px] font-semibold uppercase tracking-wider text-muted-foreground",
				children: "Legend:"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex items-center gap-1 text-muted-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Globe, { className: "size-3 text-threat" }), " Threat"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex items-center gap-1 text-muted-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "size-3 text-cyan-signal" }), " Identity"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex items-center gap-1 text-muted-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Laptop, { className: "size-3 text-cyan-signal" }), " Endpoint"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex items-center gap-1 text-muted-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Server, { className: "size-3 text-amber-400" }), " Server"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex items-center gap-1 text-muted-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Database, { className: "size-3 text-threat" }), " Database"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex items-center gap-1 text-muted-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FolderGit2, { className: "size-3 text-purple-400" }), " Share"]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-3 w-px bg-border/80" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex items-center gap-1 text-threat font-medium",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldAlert, { className: "size-3" }), " Compromised"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex items-center gap-1 text-amber-400 font-medium",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "size-3" }), " Suspicious"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex items-center gap-1 text-blue-400 font-medium",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Radio, { className: "size-3" }), " Monitored"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex items-center gap-1 text-emerald-400 font-medium",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheckBig, { className: "size-3" }), " Healthy"]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-3 w-px bg-border/80" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2 text-muted-foreground",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "inline-block h-0.5 w-4 bg-cyan-500" }),
					" Traversal",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "inline-block h-0.5 w-4 bg-threat" }),
					" Active Kill-chain"
				]
			})
		]
	});
}
function AttackGraphView() {
	const navigate = useNavigate();
	const { attackGraph, currentMinute, currentTime, setCurrentMinute, selectedEntityId, setSelectedEntityId, selectedEdgeId, setSelectedEdgeId, highlightedPathId, setHighlightedPathId, clearHighlightedPath, currentRisk, incidentStage, setSelectedEventId } = useDemo();
	const [filters, setFilters] = (0, import_react.useState)({
		nodeType: "ALL",
		status: "ALL",
		relationship: "ALL",
		searchQuery: ""
	});
	const handleResetFilters = (0, import_react.useCallback)(() => {
		setFilters({
			nodeType: "ALL",
			status: "ALL",
			relationship: "ALL",
			searchQuery: ""
		});
	}, []);
	const { nodes: displayedNodes, edges: displayedEdges } = (0, import_react.useMemo)(() => {
		return filterAttackGraph(attackGraph, filters);
	}, [attackGraph, filters]);
	const selectedNode = (0, import_react.useMemo)(() => {
		if (!selectedEntityId) return null;
		return attackGraph.nodes.find((n) => n.id === selectedEntityId) ?? null;
	}, [attackGraph.nodes, selectedEntityId]);
	const selectedEdge = (0, import_react.useMemo)(() => {
		if (!selectedEdgeId) return null;
		return attackGraph.edges.find((e) => e.id === selectedEdgeId) ?? null;
	}, [attackGraph.edges, selectedEdgeId]);
	const handleSelectNode = (0, import_react.useCallback)((nodeId) => {
		setSelectedEntityId(nodeId);
		setSelectedEdgeId(null);
	}, [setSelectedEntityId, setSelectedEdgeId]);
	const handleSelectEdge = (0, import_react.useCallback)((edgeId) => {
		setSelectedEdgeId(edgeId);
		setSelectedEntityId(null);
	}, [setSelectedEdgeId, setSelectedEntityId]);
	const handleFocusEntryPoint = (0, import_react.useCallback)(() => {
		if (attackGraph.entryPoint) handleSelectNode(attackGraph.entryPoint.id);
	}, [attackGraph.entryPoint, handleSelectNode]);
	const handleTogglePath = (0, import_react.useCallback)(() => {
		if (highlightedPathId) clearHighlightedPath();
		else if (attackGraph.activePath) setHighlightedPathId(attackGraph.activePath.pathId);
	}, [
		highlightedPathId,
		clearHighlightedPath,
		attackGraph.activePath,
		setHighlightedPathId
	]);
	const handleViewTimelineEvents = (0, import_react.useCallback)((eventIds) => {
		if (eventIds.length > 0) setSelectedEventId(eventIds[0] ?? null);
		navigate({ to: "/time-machine" });
	}, [navigate, setSelectedEventId]);
	const handleViewEvidence = (0, import_react.useCallback)((_evidenceIds) => {
		navigate({ to: "/evidence" });
	}, [navigate]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center justify-between gap-4 rounded-xl border border-border/80 bg-card/60 p-4 backdrop-blur-md",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex size-10 items-center justify-center rounded-lg bg-cyan-signal/10 border border-cyan-signal/30 text-cyan-signal",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Compass, { className: "size-5" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "text-lg font-bold tracking-tight text-foreground",
							children: "ATTACK GRAPH"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "rounded bg-secondary/80 px-2 py-0.5 font-mono text-xs font-semibold text-muted-foreground",
							children: "INC-2048"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs text-muted-foreground",
						children: [
							"Dynamic forensic graph reconstructed at ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
								className: "text-foreground font-mono",
								children: currentTime
							}),
							" (T+",
							currentMinute,
							"m)"
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
									children: "Stage:"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-semibold text-foreground",
									children: incidentStage
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-1.5 rounded-lg border border-border/70 bg-secondary/30 px-3 py-1.5 text-xs",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldAlert, { className: "size-3.5 text-threat" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-muted-foreground",
									children: "Risk:"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-bold text-threat uppercase",
									children: currentRisk
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: handleFocusEntryPoint,
							className: "flex items-center gap-1.5 rounded-lg border border-cyan-signal/40 bg-cyan-signal/10 px-3 py-1.5 text-xs font-medium text-cyan-signal hover:bg-cyan-signal/20 transition-colors",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Compass, { className: "size-3.5" }),
								"Entry Point (",
								attackGraph.entryPoint?.id ?? "ATTACKER",
								")"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: handleTogglePath,
							className: `flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors ${highlightedPathId ? "border-threat bg-threat/20 text-threat shadow-[0_0_12px_rgba(239,68,68,0.3)]" : "border-border bg-secondary/40 text-foreground hover:bg-secondary/70"}`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, { className: "size-3.5" }), highlightedPathId ? "Clear Path" : "Highlight Active Kill Chain"]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 gap-3 sm:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-lg border border-threat/40 bg-threat/10 p-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between text-xs text-threat font-semibold",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Confirmed Affected" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flame, { className: "size-3.5" })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 font-mono text-xl font-bold text-foreground",
								children: attackGraph.blastRadius.confirmedAffectedAssets
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[10px] text-muted-foreground truncate",
								children: attackGraph.compromisedNodes.map((n) => n.id).join(", ") || "None"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-lg border border-amber-500/40 bg-amber-500/10 p-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between text-xs text-amber-300 font-semibold",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Potentially Affected" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, { className: "size-3.5" })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 font-mono text-xl font-bold text-foreground",
								children: attackGraph.blastRadius.potentiallyAffectedAssets
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[10px] text-muted-foreground truncate",
								children: attackGraph.suspiciousNodes.map((n) => n.id).join(", ") || "None"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-lg border border-border bg-secondary/20 p-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between text-xs text-muted-foreground font-semibold",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Critical Assets" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldAlert, { className: "size-3.5 text-threat" })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 font-mono text-xl font-bold text-foreground",
								children: attackGraph.blastRadius.criticalAssetsAffected
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[10px] text-muted-foreground truncate",
								children: attackGraph.criticalNodes.map((n) => n.id).join(", ") || "None"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-lg border border-border bg-secondary/20 p-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between text-xs text-muted-foreground font-semibold",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Path Confidence" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-3.5 text-cyan-signal" })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1 font-mono text-xl font-bold text-emerald-400",
								children: [Math.round(attackGraph.confidence * 100), "%"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[10px] text-muted-foreground",
								children: "Deterministic temporal reconstruction"
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AttackGraphFilters, {
				filters,
				onChange: setFilters,
				onReset: handleResetFilters
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-1 gap-4 lg:grid-cols-[1fr_360px]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AttackGraphCanvas, {
						nodes: displayedNodes,
						edges: displayedEdges,
						selectedNodeId: selectedEntityId,
						selectedEdgeId,
						activePath: attackGraph.activePath,
						highlightedPathId,
						onSelectNode: handleSelectNode,
						onSelectEdge: handleSelectEdge
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GraphLegend, {})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-[530px]",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AttackGraphInspector, {
						graph: attackGraph,
						selectedNode,
						selectedEdge,
						onSelectNode: handleSelectNode,
						onViewTimelineEvents: handleViewTimelineEvents,
						onViewEvidence: handleViewEvidence
					})
				})]
			})
		]
	});
}
function AttackGraphPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-7xl animate-fade-in space-y-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AttackGraphView, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IrisInvestigationPanel, {
			title: "IRIS Attack Path Investigator",
			defaultPrompt: "How did the attacker reach the database?",
			suggestedQuestions: [
				"How did the attacker reach the database?",
				"What is this attack path?",
				"Which assets were compromised?",
				"What would happen if we isolate LAPTOP-042?"
			],
			compact: true
		})]
	});
}
var SplitComponent = AttackGraphPage;
//#endregion
export { SplitComponent as component };
