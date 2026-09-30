import { r as __toESM } from "../_runtime.mjs";
import { i as require_react, r as require_jsx_runtime } from "../_libs/elevenlabs__react+react.mjs";
import { C as Search, dt as Clock, n as X } from "../_libs/lucide-react.mjs";
import { r as demoEvidence, x as useDemo } from "./DemoContext-DI0dcfwA.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { t as Button } from "./button-Bq5vK6RO.mjs";
import { n as PageHeader, t as GlassPanel } from "./PageHeader-DeDQgGHW.mjs";
import { t as Input } from "./input-B8Q2ztVi.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/evidence-DwMsfIrg.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function EvidenceView() {
	const { incident, currentTime, digitalTwin, knownSecurityState, selectedEntityId, setSelectedEntityId } = useDemo();
	const [searchQuery, setSearchQuery] = (0, import_react.useState)("");
	const [selectedType, setSelectedType] = (0, import_react.useState)("ALL");
	const [selectedSeverity, setSelectedSeverity] = (0, import_react.useState)("ALL");
	const [selectedAsset, setSelectedAsset] = (0, import_react.useState)(selectedEntityId ?? "ALL");
	const [showOnlyKnown, setShowOnlyKnown] = (0, import_react.useState)(true);
	const baseList = showOnlyKnown ? digitalTwin.evidence : demoEvidence;
	const filteredEvidence = (0, import_react.useMemo)(() => {
		return baseList.filter((item) => {
			if (selectedType !== "ALL" && item.type !== selectedType) return false;
			if (selectedSeverity !== "ALL" && item.severity !== selectedSeverity) return false;
			if (selectedAsset !== "ALL" && item.assetId !== selectedAsset) return false;
			if (searchQuery.trim()) {
				const q = searchQuery.toLowerCase();
				if (!(item.title && item.title.toLowerCase().includes(q) || item.detail && item.detail.toLowerCase().includes(q) || item.actor && item.actor.toLowerCase().includes(q) || item.target && item.target.toLowerCase().includes(q) || item.source && item.source.toLowerCase().includes(q) || item.hash && item.hash.toLowerCase().includes(q))) return false;
			}
			return true;
		});
	}, [
		baseList,
		selectedType,
		selectedSeverity,
		selectedAsset,
		searchQuery
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-7xl animate-fade-in space-y-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				eyebrow: `Forensic Evidence Ledger · ${incident.id}`,
				title: "Evidence Viewer",
				description: "Correlated authentication, endpoint, network, database, and process forensic artifacts.",
				actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex items-center gap-1.5 rounded-lg border border-border bg-secondary/50 px-3 py-1.5 font-mono text-xs text-muted-foreground",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "size-3.5 text-cyan-signal" }),
							"State at: ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
								className: "text-foreground",
								children: currentTime
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: showOnlyKnown ? "default" : "outline",
						size: "sm",
						onClick: () => setShowOnlyKnown(!showOnlyKnown),
						className: "text-xs font-mono",
						children: showOnlyKnown ? "Showing Known Evidence" : "Show All Timeline Evidence"
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3 sm:grid-cols-[1fr_auto_auto_auto_auto]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center rounded-lg border border-input bg-input/30 px-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "size-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: searchQuery,
							onChange: (e) => setSearchQuery(e.target.value),
							placeholder: "Search evidence hash, actor, action, or payload...",
							className: "border-0 bg-transparent shadow-none text-xs"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						value: selectedType,
						onChange: (e) => setSelectedType(e.target.value),
						className: "h-10 rounded-md border border-input bg-background px-3 text-xs font-mono text-foreground focus:outline-none",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "ALL",
								children: "All Types"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "AUTH",
								children: "Authentication"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "ENDPOINT",
								children: "Endpoint"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "NETWORK",
								children: "Network"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "DATABASE",
								children: "Database"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "PROCESS",
								children: "Process"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						value: selectedSeverity,
						onChange: (e) => setSelectedSeverity(e.target.value),
						className: "h-10 rounded-md border border-input bg-background px-3 text-xs font-mono text-foreground focus:outline-none",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "ALL",
								children: "All Severities"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "CRITICAL",
								children: "Critical"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "HIGH",
								children: "High"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "MEDIUM",
								children: "Medium"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "LOW",
								children: "Low"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						value: selectedAsset,
						onChange: (e) => setSelectedAsset(e.target.value),
						className: "h-10 rounded-md border border-input bg-background px-3 text-xs font-mono text-foreground focus:outline-none",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "ALL",
								children: "All Assets"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "LAPTOP-042",
								children: "LAPTOP-042"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "SERVER-03",
								children: "SERVER-03"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "DB-PROD-01",
								children: "DB-PROD-01"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "FILE-SRV-01",
								children: "FILE-SRV-01"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "VPN-GW-01",
								children: "VPN-GW-01"
							})
						]
					}),
					(selectedType !== "ALL" || selectedSeverity !== "ALL" || selectedAsset !== "ALL" || searchQuery) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "ghost",
						size: "sm",
						onClick: () => {
							setSelectedType("ALL");
							setSelectedSeverity("ALL");
							setSelectedAsset("ALL");
							setSearchQuery("");
						},
						className: "text-xs gap-1 font-mono",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-3.5" }), " Clear"]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GlassPanel, {
				className: "overflow-hidden",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "overflow-x-auto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "w-full min-w-[850px] text-left text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
							className: "bg-secondary/45 text-xs uppercase font-mono text-muted-foreground border-b border-border",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "p-4",
									children: "Time"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "p-4",
									children: "Type"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "p-4",
									children: "Actor"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "p-4",
									children: "Action"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "p-4",
									children: "Target / Asset"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "p-4",
									children: "Severity"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "p-4",
									children: "Cryptographic Hash / Detail"
								})
							] })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tbody", {
							className: "divide-y divide-border",
							children: [filteredEvidence.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								className: "hover:bg-secondary/25 transition-colors",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "p-4 font-mono text-cyan-signal text-xs font-semibold whitespace-nowrap",
										children: e.time ?? e.timestamp
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "p-4 font-semibold font-mono text-xs",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "rounded bg-secondary/80 px-2 py-0.5 border border-border",
											children: e.type
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "p-4 font-mono text-xs",
										children: e.actor ?? "alex.m"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "p-4 font-mono text-xs text-muted-foreground",
										children: e.action ?? e.title
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "p-4 font-mono text-xs font-semibold text-foreground",
										children: e.target ?? e.assetId
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "p-4 whitespace-nowrap",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: cn("rounded-full border px-2 py-0.5 font-mono text-[10px] font-semibold uppercase", e.severity === "CRITICAL" ? "border-threat/40 bg-threat/10 text-threat" : e.severity === "HIGH" ? "border-warning/40 bg-warning/10 text-warning" : "border-cyan-glow bg-primary/10 text-cyan-signal"),
											children: e.severity
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
										className: "max-w-md p-4 text-xs text-muted-foreground",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "line-clamp-2",
											children: e.detail ?? e.content
										}), e.hash ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-1 font-mono text-[10px] text-cyan-signal/70 truncate",
											children: e.hash
										}) : null]
									})
								]
							}, e.id)), filteredEvidence.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
								colSpan: 7,
								className: "p-8 text-center text-xs text-muted-foreground font-mono",
								children: [
									"No evidence records matching the current filters at simulation time ",
									currentTime,
									"."
								]
							}) }) : null]
						})]
					})
				})
			})
		]
	});
}
var SplitComponent = EvidenceView;
//#endregion
export { SplitComponent as component };
