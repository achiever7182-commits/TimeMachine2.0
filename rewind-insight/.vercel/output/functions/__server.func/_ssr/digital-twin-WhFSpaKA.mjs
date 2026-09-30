import { r as __toESM } from "../_runtime.mjs";
import { i as require_react, r as require_jsx_runtime } from "../_libs/elevenlabs__react+react.mjs";
import { At as ArrowRight, G as Laptop, P as Network, _ as ShieldCheck, c as UserRound, dt as Clock, g as ShieldX, gt as CircleCheck, it as Eye, l as TriangleAlert, lt as Compass, ot as Database, st as Cpu, t as Zap, tt as FileText, ut as Cloud, v as ShieldAlert, x as Server } from "../_libs/lucide-react.mjs";
import { x as useDemo } from "./DemoContext-DI0dcfwA.mjs";
import { t as IrisInvestigationPanel } from "./IrisInvestigationPanel-COLlcjpA.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { t as Button } from "./button-Bq5vK6RO.mjs";
import { n as PageHeader, t as GlassPanel } from "./PageHeader-DeDQgGHW.mjs";
import { t as ForensicTimeline } from "./ForensicTimeline-Cq-zL1VS.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/digital-twin-WhFSpaKA.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AssetStateBadge({ status, className, showIcon = true }) {
	const config = {
		HEALTHY: {
			label: "Healthy",
			color: "border-green-signal/30 bg-green-signal/10 text-green-signal",
			icon: ShieldCheck
		},
		MONITORED: {
			label: "Monitored",
			color: "border-cyan-glow bg-primary/10 text-cyan-signal",
			icon: Eye
		},
		SUSPICIOUS: {
			label: "Suspicious",
			color: "border-amber-400/40 bg-amber-400/10 text-amber-400",
			icon: TriangleAlert
		},
		COMPROMISED: {
			label: "Compromised",
			color: "border-threat/40 bg-threat/10 text-threat shadow-threat animate-pulse",
			icon: ShieldAlert
		},
		ISOLATED: {
			label: "Isolated",
			color: "border-purple-400/40 bg-purple-400/10 text-purple-400",
			icon: ShieldX
		},
		RECOVERED: {
			label: "Recovered",
			color: "border-teal-400/40 bg-teal-400/10 text-teal-400",
			icon: CircleCheck
		}
	}[status] ?? {
		label: status,
		color: "border-border bg-secondary text-muted-foreground",
		icon: ShieldCheck
	};
	const Icon = config.icon;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: cn("inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider", config.color, className),
		children: [showIcon ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-3.5" }) : null, config.label]
	});
}
var NODE_POSITIONS = [
	{
		id: "usr-alex-m",
		x: 140,
		y: 70,
		label: "alex.m",
		sublabel: "Financial Analyst",
		type: "USER",
		icon: UserRound
	},
	{
		id: "VPN-GW-01",
		x: 380,
		y: 70,
		label: "VPN-GW-01",
		sublabel: "Edge Perimeter Gateway",
		type: "NETWORK",
		icon: Network
	},
	{
		id: "CLOUD-STORAGE-01",
		x: 680,
		y: 70,
		label: "CLOUD-STORAGE-01",
		sublabel: "Enterprise S3 Bucket",
		type: "CLOUD_RESOURCE",
		icon: Cloud
	},
	{
		id: "LAPTOP-042",
		x: 380,
		y: 220,
		label: "LAPTOP-042",
		sublabel: "Finance Workstation",
		type: "ENDPOINT",
		icon: Laptop
	},
	{
		id: "SERVER-03",
		x: 380,
		y: 370,
		label: "SERVER-03",
		sublabel: "Internal App Server",
		type: "SERVER",
		icon: Server
	},
	{
		id: "DB-PROD-01",
		x: 200,
		y: 520,
		label: "DB-PROD-01",
		sublabel: "Customer Postgres DB",
		type: "DATABASE",
		icon: Database
	},
	{
		id: "FILE-SRV-01",
		x: 560,
		y: 520,
		label: "FILE-SRV-01",
		sublabel: "Confidential Storage",
		type: "FILE_STORE",
		icon: FileText
	}
];
function DigitalTwinGraph({ viewMode = "ACTUAL" }) {
	const { digitalTwin, knownSecurityState, selectedEntityId, setSelectedEntityId } = useDemo();
	const currentSnapshot = viewMode === "KNOWN" ? knownSecurityState : digitalTwin;
	const [hoveredNodeId, setHoveredNodeId] = (0, import_react.useState)(null);
	const assetMap = new Map(currentSnapshot.assets.map((a) => [a.id, a]));
	const userMap = new Map(currentSnapshot.users.map((u) => [u.id, u]));
	const activeConnections = currentSnapshot.networkConnections;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative h-[640px] w-full select-none overflow-hidden rounded-xl border border-border bg-card/60 p-4 shadow-panel backdrop-blur-xl",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute inset-0 bg-command-grid opacity-50" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute -right-20 -top-20 size-96 rounded-full bg-cyan-500/5 blur-3xl" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute -bottom-20 -left-20 size-96 rounded-full bg-purple-500/5 blur-3xl" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
				className: "absolute inset-0 size-full pointer-events-none",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("defs", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
						id: "grad-active-conn",
						x1: "0%",
						y1: "0%",
						x2: "100%",
						y2: "100%",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
							offset: "0%",
							stopColor: "var(--cyan-signal)",
							stopOpacity: "0.8"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
							offset: "100%",
							stopColor: "var(--threat)",
							stopOpacity: "0.9"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
						id: "grad-healthy-conn",
						x1: "0%",
						y1: "0%",
						x2: "100%",
						y2: "100%",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
							offset: "0%",
							stopColor: "#00f2fe",
							stopOpacity: "0.3"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
							offset: "100%",
							stopColor: "#00f2fe",
							stopOpacity: "0.1"
						})]
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
				] }), activeConnections.map((conn) => {
					const sourceNode = NODE_POSITIONS.find((n) => n.id === conn.sourceId);
					const destNode = NODE_POSITIONS.find((n) => n.id === conn.destinationId);
					if (!sourceNode || !destNode) return null;
					const isLateral = conn.relationshipType === "LATERAL_MOVEMENT";
					const isAttackPath = conn.relationshipType === "LATERAL_MOVEMENT" || conn.relationshipType === "DATABASE_QUERY" || conn.relationshipType === "FILE_ACCESS";
					const isConnectedToHovered = hoveredNodeId === conn.sourceId || hoveredNodeId === conn.destinationId;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
						className: "transition-opacity duration-300",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
							x1: sourceNode.x + 95,
							y1: sourceNode.y + 40,
							x2: destNode.x + 95,
							y2: destNode.y + 40,
							stroke: isAttackPath ? "#ff2a5f" : "#00f2fe",
							strokeWidth: isAttackPath ? 2.5 : 1.5,
							strokeDasharray: isLateral ? "5 4" : void 0,
							strokeOpacity: isConnectedToHovered ? 1 : isAttackPath ? .75 : .3,
							filter: isAttackPath ? "url(#glow)" : void 0
						}), isAttackPath ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
							r: "4",
							fill: "#ff2a5f",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("animateMotion", {
								path: `M ${sourceNode.x + 95} ${sourceNode.y + 40} L ${destNode.x + 95} ${destNode.y + 40}`,
								dur: "2.5s",
								repeatCount: "indefinite"
							})
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
							r: "2.5",
							fill: "#00f2fe",
							opacity: "0.6",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("animateMotion", {
								path: `M ${sourceNode.x + 95} ${sourceNode.y + 40} L ${destNode.x + 95} ${destNode.y + 40}`,
								dur: "4s",
								repeatCount: "indefinite"
							})
						})]
					}, conn.id);
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "relative size-full",
				children: NODE_POSITIONS.map((pos) => {
					const isUser = pos.type === "USER";
					const userState = isUser ? userMap.get(pos.id) : null;
					const assetState = !isUser ? assetMap.get(pos.id) : null;
					const isCompromised = isUser && userState?.status === "COMPROMISED" || !isUser && assetState?.status === "COMPROMISED";
					const isSuspicious = isUser && userState?.status === "SUSPICIOUS" || !isUser && assetState?.status === "SUSPICIOUS";
					const isSelected = selectedEntityId === pos.id;
					const Icon = pos.icon;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						onClick: () => setSelectedEntityId(pos.id),
						onMouseEnter: () => setHoveredNodeId(pos.id),
						onMouseLeave: () => setHoveredNodeId(null),
						style: {
							left: `${pos.x}px`,
							top: `${pos.y}px`
						},
						className: cn("absolute w-52 cursor-pointer rounded-xl border p-3.5 transition-all duration-200 shadow-panel backdrop-blur-md", isSelected ? "border-cyan-glow ring-2 ring-cyan-signal/40 bg-secondary/80 shadow-glow scale-[1.03] z-20" : isCompromised ? "border-threat/50 bg-threat/10 hover:border-threat shadow-threat hover:scale-[1.02] z-10" : isSuspicious ? "border-amber-400/50 bg-amber-400/10 hover:border-amber-400 hover:scale-[1.02]" : "border-border/80 bg-card/85 hover:border-cyan-signal/50 hover:scale-[1.02]"),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-start justify-between gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: cn("grid size-9 place-items-center rounded-lg border", isCompromised ? "border-threat/40 bg-threat/20 text-threat shadow-threat animate-pulse" : isSuspicious ? "border-amber-400/40 bg-amber-400/20 text-amber-400" : "border-cyan-signal/30 bg-primary/10 text-cyan-signal"),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4" })
								}), isUser && userState ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: cn("rounded-full border px-2 py-0.5 font-mono text-[10px] font-semibold uppercase", userState.status === "COMPROMISED" ? "border-threat/40 bg-threat/10 text-threat" : userState.status === "SUSPICIOUS" ? "border-amber-400/40 bg-amber-400/10 text-amber-400" : "border-green-signal/30 bg-green-signal/10 text-green-signal"),
									children: userState.status
								}) : assetState ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AssetStateBadge, {
									status: assetState.status,
									showIcon: false,
									className: "text-[10px] px-2 py-0.5"
								}) : null]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-2.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
									className: "font-mono text-xs font-bold text-foreground truncate",
									children: pos.label
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-0.5 truncate text-[11px] text-muted-foreground",
									children: pos.sublabel
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-3 flex items-center justify-between border-t border-border/50 pt-2 font-mono text-[10px] text-muted-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: isUser ? `${userState?.currentSessions.length ?? 0} session(s)` : `${assetState?.ipAddress ?? "Internal"}` }), isCompromised ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "flex items-center gap-1 font-semibold text-threat",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldAlert, { className: "size-3" }), " Compromised"]
								}) : isSuspicious ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "flex items-center gap-1 font-semibold text-amber-400",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, { className: "size-3" }), " Suspicious"]
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-green-signal",
									children: "Nominal"
								})]
							})
						]
					}, pos.id);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "absolute bottom-3 left-3 flex flex-wrap items-center gap-3 rounded-lg border border-border bg-background/85 px-3 py-1.5 text-[11px] text-muted-foreground backdrop-blur-md",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex items-center gap-1.5 font-medium",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-2 rounded-full bg-green-signal" }), " Healthy"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex items-center gap-1.5 font-medium",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-2 rounded-full bg-cyan-signal" }), " Monitored"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex items-center gap-1.5 font-medium",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-2 rounded-full bg-amber-400" }), " Suspicious"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex items-center gap-1.5 font-medium",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-2 rounded-full bg-threat animate-pulse" }), " Compromised"]
					})
				]
			})
		]
	});
}
function DigitalTwinInspector() {
	const { digitalTwin, selectedEntityId, setSelectedEntityId, currentTime, setCurrentMinute } = useDemo();
	const selectedAsset = digitalTwin.assets.find((a) => a.id === selectedEntityId);
	const selectedUser = !selectedAsset ? digitalTwin.users.find((u) => u.id === selectedEntityId || u.username === selectedEntityId) : digitalTwin.users.find((u) => u.associatedDeviceIds.includes(selectedAsset.id));
	const activeAsset = selectedAsset ?? digitalTwin.assets[0];
	const relatedConnections = digitalTwin.networkConnections.filter((c) => c.sourceId === activeAsset.id || c.destinationId === activeAsset.id);
	const relatedProcesses = digitalTwin.processes.filter((p) => p.assetId === activeAsset.id);
	digitalTwin.activeSessions.filter((s) => s.sourceAssetId === activeAsset.id || s.destinationAssetId === activeAsset.id);
	const relatedEvidence = digitalTwin.evidence.filter((e) => e.assetId === activeAsset.id);
	const relatedDataResources = digitalTwin.dataResources.filter((d) => d.assetId === activeAsset.id);
	const isCompromised = activeAsset.status === "COMPROMISED";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GlassPanel, {
		className: "flex flex-col h-[640px] overflow-hidden p-5 border-border",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "border-b border-border pb-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-xs font-semibold uppercase tracking-[0.2em] text-cyan-signal",
						children: "Entity Inspector"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "font-mono text-xs text-muted-foreground",
						children: ["Live at ", currentTime]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3 flex items-start justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-mono text-lg font-bold text-foreground",
						children: activeAsset.hostname
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground",
						children: activeAsset.name
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AssetStateBadge, { status: activeAsset.status })]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex-1 overflow-y-auto pr-1 pt-4 space-y-5 text-sm",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 gap-2 text-xs",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AttributeItem, {
								label: "Type",
								value: activeAsset.type
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AttributeItem, {
								label: "IP Address",
								value: activeAsset.ipAddress,
								mono: true
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AttributeItem, {
								label: "Owner",
								value: activeAsset.owner
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AttributeItem, {
								label: "Criticality",
								value: activeAsset.criticality
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AttributeItem, {
								label: "Calculated Risk",
								value: activeAsset.risk,
								highlight: isCompromised
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AttributeItem, {
								label: "Compromise Time",
								value: activeAsset.compromiseTime ?? "N/A",
								mono: true
							})
						]
					}),
					selectedUser ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-lg border border-border bg-secondary/35 p-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "flex items-center gap-2 text-xs font-semibold text-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserRound, { className: "size-3.5 text-cyan-signal" }), " Associated Identity"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: cn("rounded px-1.5 py-0.2 font-mono text-[10px] font-semibold uppercase", selectedUser.status === "COMPROMISED" ? "bg-threat/20 text-threat" : "bg-primary/20 text-cyan-signal"),
								children: selectedUser.status
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-2 flex items-center justify-between font-mono text-xs text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
								selectedUser.username,
								" (",
								selectedUser.displayName,
								")"
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: selectedUser.department })]
						})]
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex items-center justify-between mb-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "flex items-center gap-1.5 font-mono text-xs font-semibold uppercase tracking-wider text-muted-foreground",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cpu, { className: "size-3.5 text-cyan-signal" }),
								" Running Processes (",
								relatedProcesses.length,
								")"
							]
						})
					}), relatedProcesses.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "space-y-1.5",
						children: relatedProcesses.map((proc) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: cn("rounded-lg border p-2 text-xs font-mono transition-colors", proc.status === "MALICIOUS" ? "border-threat/40 bg-threat/10 text-threat" : proc.status === "SUSPICIOUS" ? "border-amber-400/40 bg-amber-400/10 text-amber-400" : "border-border bg-secondary/30 text-foreground"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-semibold",
									children: proc.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-[10px] opacity-80",
									children: [
										"PID: ",
										proc.pid,
										" · ",
										proc.timestamp
									]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-[11px] truncate opacity-90",
								children: proc.commandSummary
							})]
						}, proc.id))
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "rounded border border-dashed border-border p-2.5 text-center text-xs text-muted-foreground",
						children: ["No anomaly processes active at ", currentTime]
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "flex items-center gap-1.5 font-mono text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Network, { className: "size-3.5 text-cyan-signal" }),
							" Network Connections (",
							relatedConnections.length,
							")"
						]
					}), relatedConnections.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "space-y-1.5",
						children: relatedConnections.map((conn) => {
							const peerId = conn.sourceId === activeAsset.id ? conn.destinationId : conn.sourceId;
							const isLateral = conn.relationshipType === "LATERAL_MOVEMENT";
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								onClick: () => setSelectedEntityId(peerId),
								className: cn("cursor-pointer rounded-lg border p-2 text-xs font-mono transition-colors hover:border-cyan-glow", isLateral ? "border-threat/35 bg-threat/10" : "border-border bg-secondary/25"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "font-semibold text-foreground",
										children: [
											conn.sourceId,
											" → ",
											conn.destinationId
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[10px] text-muted-foreground",
										children: conn.firstSeen
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-1 flex items-center justify-between text-[10px] text-muted-foreground",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: conn.relationshipType }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
										"Port ",
										conn.port,
										" (",
										conn.protocol,
										")"
									] })]
								})]
							}, conn.id);
						})
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "rounded border border-dashed border-border p-2.5 text-center text-xs text-muted-foreground",
						children: ["No active network sessions at ", currentTime]
					})] }),
					relatedDataResources.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "flex items-center gap-1.5 font-mono text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Database, { className: "size-3.5 text-cyan-signal" }),
							" Data Resources (",
							relatedDataResources.length,
							")"
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "space-y-1.5",
						children: relatedDataResources.map((res) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: cn("rounded-lg border p-2 text-xs font-mono", res.isExposed ? "border-threat/40 bg-threat/10 text-threat" : "border-border bg-secondary/30 text-foreground"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-semibold",
									children: res.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "rounded bg-background/50 px-1 py-0.5 text-[10px]",
									children: res.classification
								})]
							}), res.isExposed ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1 text-[10px] text-threat font-semibold",
								children: [
									"⚠ Accessed at ",
									res.accessedAt,
									" by ",
									res.accessedBy
								]
							}) : null]
						}, res.id))
					})] }) : null
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "border-t border-border pt-4 mt-2 flex flex-col gap-2",
				children: [activeAsset.compromiseTime ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					size: "sm",
					variant: "outline",
					className: "w-full text-xs font-mono justify-between",
					onClick: () => {
						if (activeAsset.compromiseTime) {
							const parts = activeAsset.compromiseTime.split(":");
							const h = Number(parts[0] ?? 9);
							const m = Number(parts[1] ?? 42);
							const min = h * 60 + m - 582;
							setCurrentMinute(min);
						}
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
						"Jump to Compromise (",
						activeAsset.compromiseTime,
						")"
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "size-3.5" })]
				}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					size: "sm",
					className: "w-full text-xs gap-1.5",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/evidence",
						children: [
							"View Forensic Evidence (",
							relatedEvidence.length,
							") ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-3.5" })
						]
					})
				})]
			})
		]
	});
}
function AttributeItem({ label, value, mono = false, highlight = false }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded border border-border bg-secondary/25 p-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-[10px] text-muted-foreground uppercase",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: cn("mt-0.5 font-semibold truncate", mono && "font-mono", highlight ? "text-threat" : "text-foreground"),
			children: value
		})]
	});
}
function DigitalTwinView() {
	const { incident, digitalTwin, currentTime, currentRisk, incidentStage, isAttackRunning, isPaused, investigationMode, toggleInvestigationMode, stepForward, stepBack, jumpToNextEvent, jumpToPreviousEvent, rewindToStart, goToDetection, startAttackSimulation, pauseSimulation, resumeSimulation, resetDemo } = useDemo();
	const [viewPerspective, setViewPerspective] = (0, import_react.useState)("ACTUAL");
	const blastRadius = digitalTwin.blastRadius;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-[1600px] animate-fade-in space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				eyebrow: `Virtual Digital Twin · ${incident.id}`,
				title: "Organization Digital Twin",
				description: "Reconstruct the complete synthetic enterprise state at any moment during the incident.",
				actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center rounded-lg border border-border bg-secondary/40 p-1 text-xs font-mono",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setViewPerspective("ACTUAL"),
								className: cn("rounded px-2.5 py-1 transition-colors", viewPerspective === "ACTUAL" ? "bg-primary/20 text-cyan-signal font-semibold" : "text-muted-foreground hover:text-foreground"),
								children: "Actual Environment"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setViewPerspective("KNOWN"),
								className: cn("rounded px-2.5 py-1 transition-colors", viewPerspective === "KNOWN" ? "bg-primary/20 text-cyan-signal font-semibold" : "text-muted-foreground hover:text-foreground"),
								children: "SOC Known State"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: investigationMode ? "default" : "outline",
							size: "sm",
							onClick: toggleInvestigationMode,
							className: cn("gap-1.5 font-mono text-xs", investigationMode && "border-cyan-glow shadow-glow text-foreground"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Compass, { className: "size-3.5" }), investigationMode ? "Investigation Mode ON" : "Investigation Mode"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							size: "sm",
							variant: "secondary",
							className: "gap-1.5 font-mono text-xs",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/time-machine",
								children: ["Timeline Machine ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-3.5" })]
							})
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ForensicTimeline, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-6 xl:grid-cols-[1fr_380px]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DigitalTwinGraph, { viewMode: viewPerspective }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GlassPanel, {
						className: "p-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-mono text-xs font-semibold uppercase tracking-[0.18em] text-cyan-signal",
								children: "Simulated Blast Radius"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-0.5 text-xs text-muted-foreground",
								children: ["Temporal impact calculated at ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono text-foreground",
									children: currentTime
								})]
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-center gap-4 text-xs font-mono",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded border border-threat/30 bg-threat/10 px-3 py-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-muted-foreground",
											children: "Compromised Assets: "
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
											className: "text-threat",
											children: blastRadius.confirmedAffectedAssets
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded border border-amber-400/30 bg-amber-400/10 px-3 py-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-muted-foreground",
											children: "Exposed Stores: "
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
											className: "text-amber-400",
											children: blastRadius.dataResourcesAtRisk
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded border border-primary/30 bg-primary/10 px-3 py-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-muted-foreground",
											children: "Active Sessions: "
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
											className: "text-cyan-signal",
											children: digitalTwin.activeSessions.length
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded border border-border bg-secondary/40 px-3 py-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-muted-foreground",
											children: "Total Telemetry: "
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", {
											className: "text-foreground",
											children: [digitalTwin.evidence.length, " items"]
										})]
									})
								]
							})]
						})
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DigitalTwinInspector, {}) })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IrisInvestigationPanel, {
				title: "IRIS Digital Twin Telemetry Assistant",
				defaultPrompt: "What changed at this time?",
				suggestedQuestions: [
					"What changed at this time?",
					"Which assets were compromised?",
					"What did defenders know at this moment?",
					"What evidence supports this finding?"
				],
				compact: true
			})
		]
	});
}
var SplitComponent = DigitalTwinView;
//#endregion
export { SplitComponent as component };
