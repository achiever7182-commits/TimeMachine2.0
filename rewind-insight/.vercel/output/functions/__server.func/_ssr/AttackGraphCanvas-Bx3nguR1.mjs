import { r as __toESM } from "../_runtime.mjs";
import { i as require_react, r as require_jsx_runtime } from "../_libs/elevenlabs__react+react.mjs";
import { E as Radio, G as Laptop, P as Network, Q as FolderGit2, Y as Globe, _t as CircleCheckBig, l as TriangleAlert, o as User, ot as Database, st as Cpu, v as ShieldAlert, x as Server } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/AttackGraphCanvas-Bx3nguR1.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var TYPE_ICONS = {
	EXTERNAL_THREAT: Globe,
	USER: User,
	ENDPOINT: Laptop,
	SERVER: Server,
	DATABASE: Database,
	FILE_SERVER: FolderGit2,
	NETWORK_GATEWAY: Network,
	DATA_RESOURCE: Database,
	PROCESS: Cpu
};
var NODE_COORDINATES = {
	ATTACKER: {
		x: 90,
		y: 220
	},
	ALEX_ACCOUNT: {
		x: 260,
		y: 140
	},
	"VPN-GW-01": {
		x: 260,
		y: 300
	},
	"LAPTOP-042": {
		x: 440,
		y: 220
	},
	"SERVER-03": {
		x: 620,
		y: 220
	},
	"DB-PROD-01": {
		x: 800,
		y: 140
	},
	"FILE-SRV-01": {
		x: 800,
		y: 300
	}
};
function AttackGraphCanvas({ nodes, edges, selectedNodeId, selectedEdgeId, activePath, highlightedPathId, onSelectNode, onSelectEdge }) {
	const pathNodeIds = (0, import_react.useMemo)(() => {
		if (!highlightedPathId || !activePath) return /* @__PURE__ */ new Set();
		return new Set(activePath.nodeIds);
	}, [highlightedPathId, activePath]);
	const pathEdgeIds = (0, import_react.useMemo)(() => {
		if (!highlightedPathId || !activePath) return /* @__PURE__ */ new Set();
		return new Set(activePath.edgeIds);
	}, [highlightedPathId, activePath]);
	const isPathActive = Boolean(highlightedPathId && activePath);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative h-[480px] w-full select-none overflow-hidden rounded-xl border border-border/80 bg-gradient-to-b from-card/60 via-background/80 to-card/40 backdrop-blur-md",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "pointer-events-none absolute inset-0 opacity-[0.07]",
				style: {
					backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
					backgroundSize: "28px 28px"
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
				className: "absolute inset-0 size-full pointer-events-auto",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("defs", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("marker", {
						id: "arrow-default",
						viewBox: "0 0 10 10",
						refX: "22",
						refY: "5",
						markerWidth: "6",
						markerHeight: "6",
						orient: "auto-start-reverse",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
							d: "M 0 1 L 10 5 L 0 9 z",
							fill: "rgba(148, 163, 184, 0.7)"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("marker", {
						id: "arrow-threat",
						viewBox: "0 0 10 10",
						refX: "22",
						refY: "5",
						markerWidth: "6",
						markerHeight: "6",
						orient: "auto-start-reverse",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
							d: "M 0 1 L 10 5 L 0 9 z",
							fill: "#ef4444"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("marker", {
						id: "arrow-active",
						viewBox: "0 0 10 10",
						refX: "22",
						refY: "5",
						markerWidth: "7",
						markerHeight: "7",
						orient: "auto-start-reverse",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
							d: "M 0 1 L 10 5 L 0 9 z",
							fill: "#06b6d4"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("filter", {
						id: "glow",
						x: "-20%",
						y: "-20%",
						width: "140%",
						height: "140%",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("feGaussianBlur", {
							stdDeviation: "3",
							result: "blur"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("feComposite", {
							in: "SourceGraphic",
							in2: "blur",
							operator: "over"
						})]
					})
				] }), edges.map((edge) => {
					const srcPos = NODE_COORDINATES[edge.source];
					const dstPos = NODE_COORDINATES[edge.target];
					if (!srcPos || !dstPos) return null;
					const isSelected = selectedEdgeId === edge.id;
					const isOnHighlightedPath = pathEdgeIds.has(edge.id);
					const isDeemphasized = isPathActive && !isOnHighlightedPath;
					const dx = dstPos.x - srcPos.x;
					dstPos.y - srcPos.y;
					const cx1 = srcPos.x + dx * .5;
					const cy1 = srcPos.y;
					const cx2 = srcPos.x + dx * .5;
					const cy2 = dstPos.y;
					const pathD = `M ${srcPos.x} ${srcPos.y} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${dstPos.x} ${dstPos.y}`;
					const isKillchain = isOnHighlightedPath || edge.relationshipType === "LATERALLY_MOVED_TO" || edge.relationshipType === "ACCESSED_DATA";
					let strokeColor = "rgba(148, 163, 184, 0.4)";
					let markerEnd = "url(#arrow-default)";
					if (isSelected) {
						strokeColor = "#22d3ee";
						markerEnd = "url(#arrow-active)";
					} else if (isOnHighlightedPath || isKillchain) {
						strokeColor = "#ef4444";
						markerEnd = "url(#arrow-threat)";
					}
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
						className: `cursor-pointer transition-opacity duration-300 ${isDeemphasized ? "opacity-20" : "opacity-100"}`,
						onClick: () => onSelectEdge(edge.id),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
								d: pathD,
								fill: "none",
								stroke: "transparent",
								strokeWidth: "20",
								className: "hover:stroke-cyan-500/20"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
								d: pathD,
								fill: "none",
								stroke: strokeColor,
								strokeWidth: isSelected ? "3" : isOnHighlightedPath ? "2.5" : "1.8",
								strokeDasharray: isSelected ? "none" : isOnHighlightedPath ? "none" : "4 2",
								markerEnd,
								filter: isSelected || isOnHighlightedPath ? "url(#glow)" : void 0,
								className: "transition-all duration-300"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
								transform: `translate(${(srcPos.x + dstPos.x) / 2}, ${(srcPos.y + dstPos.y) / 2})`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
									x: "-35",
									y: "-9",
									width: "70",
									height: "18",
									rx: "4",
									fill: "rgba(15, 23, 42, 0.85)",
									stroke: isSelected ? "#22d3ee" : isOnHighlightedPath ? "#ef4444" : "rgba(148, 163, 184, 0.3)",
									strokeWidth: "1"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
									x: "0",
									y: "3",
									textAnchor: "middle",
									fontSize: "8.5",
									fontFamily: "monospace",
									fill: isSelected ? "#22d3ee" : isOnHighlightedPath ? "#f87171" : "#94a3b8",
									fontWeight: "600",
									children: edge.firstSeen
								})]
							})
						]
					}, edge.id);
				})]
			}),
			nodes.map((node) => {
				const pos = NODE_COORDINATES[node.id];
				if (!pos) return null;
				const Icon = TYPE_ICONS[node.type] ?? Globe;
				const isSelected = selectedNodeId === node.id;
				const isOnHighlightedPath = pathNodeIds.has(node.id);
				const isDeemphasized = isPathActive && !isOnHighlightedPath;
				let statusBg = "bg-secondary/40 border-border/80 text-foreground";
				let statusBadge = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheckBig, { className: "size-3 text-emerald-400" });
				if (node.status === "COMPROMISED") {
					statusBg = "bg-threat/15 border-threat/60 text-threat shadow-[0_0_15px_rgba(239,68,68,0.25)]";
					statusBadge = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldAlert, { className: "size-3 text-threat animate-pulse" });
				} else if (node.status === "AFFECTED") {
					statusBg = "bg-amber-500/15 border-amber-500/60 text-amber-300 shadow-[0_0_12px_rgba(245,158,11,0.2)]";
					statusBadge = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "size-3 text-amber-400" });
				} else if (node.status === "SUSPICIOUS") {
					statusBg = "bg-amber-400/10 border-amber-400/40 text-amber-400";
					statusBadge = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "size-3 text-amber-400" });
				} else if (node.status === "MONITORED") {
					statusBg = "bg-blue-500/10 border-blue-500/40 text-blue-400";
					statusBadge = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Radio, { className: "size-3 text-blue-400" });
				}
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					onClick: () => onSelectNode(node.id),
					style: {
						left: `${pos.x}px`,
						top: `${pos.y}px`
					},
					className: `absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300 ${isDeemphasized ? "opacity-25 scale-95" : "opacity-100 hover:scale-105"}`,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: `group relative flex w-36 flex-col items-center rounded-xl border p-2.5 backdrop-blur-md transition-all ${statusBg} ${isSelected ? "ring-2 ring-cyan-signal ring-offset-2 ring-offset-background scale-105 shadow-[0_0_20px_rgba(6,182,212,0.4)]" : ""}`,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "absolute -top-1.5 -right-1.5 rounded-full bg-background/90 p-0.5 shadow-sm",
								children: statusBadge
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex size-9 items-center justify-center rounded-lg bg-background/50 border border-border/50",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4.5" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mt-1.5 text-center font-mono text-[11px] font-bold tracking-tight",
								children: node.id
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-center text-[9.5px] text-muted-foreground truncate w-full",
								children: node.label.replace(` (${node.type})`, "")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-1 flex items-center gap-1 font-mono text-[9px] text-muted-foreground/80",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: node.status }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "•" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: node.firstSeen })
								]
							})
						]
					})
				}, node.id);
			})
		]
	});
}
//#endregion
export { AttackGraphCanvas as t };
