import { r as __toESM } from "../_runtime.mjs";
import { i as require_react, r as require_jsx_runtime } from "../_libs/elevenlabs__react+react.mjs";
import { At as ArrowRight, C as Search, dt as Clock, f as Sparkles, v as ShieldAlert, x as Server } from "../_libs/lucide-react.mjs";
import { x as useDemo } from "./DemoContext-DI0dcfwA.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { t as Button } from "./button-Bq5vK6RO.mjs";
import { t as incidents } from "./incidents-Dy2WfHLh.mjs";
import { n as PageHeader, t as GlassPanel } from "./PageHeader-DeDQgGHW.mjs";
import { t as Input } from "./input-B8Q2ztVi.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/incidents-Cnp-NGja.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function IncidentsView() {
	const { incident, incidentState, currentTime, currentRisk, affectedAssets } = useDemo();
	const [searchQuery, setSearchQuery] = (0, import_react.useState)("");
	const [selectedIncidentId, setSelectedIncidentId] = (0, import_react.useState)("INC-2048");
	const filteredIncidents = incidents.filter((i) => i.id.toLowerCase().includes(searchQuery.toLowerCase()) || i.title.toLowerCase().includes(searchQuery.toLowerCase()) || i.employeeAccount && i.employeeAccount.toLowerCase().includes(searchQuery.toLowerCase()));
	const isTargetSelected = selectedIncidentId === "INC-2048";
	const selectedIncident = isTargetSelected ? incident : incidents.find((i) => i.id === selectedIncidentId) ?? incident;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-7xl animate-fade-in",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				eyebrow: "Investigation queue",
				title: "Active Incidents",
				description: "Prioritized synthetic incidents awaiting investigation and response decisions.",
				actions: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					className: "gap-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/time-machine",
						children: ["OPEN TIME MACHINE ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })]
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GlassPanel, {
				className: "mb-6 border-cyan-glow p-6 shadow-glow",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-center gap-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-mono text-sm font-semibold text-cyan-signal",
										children: selectedIncident.id
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: cn("rounded-full border px-2.5 py-0.5 text-xs font-semibold uppercase", selectedIncident.severity === "CRITICAL" ? "border-threat/40 bg-threat/10 text-threat" : selectedIncident.severity === "HIGH" ? "border-warning/40 bg-warning/10 text-warning" : "border-cyan-glow bg-primary/10 text-cyan-signal"),
										children: selectedIncident.severity
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "rounded-full border border-border bg-secondary/60 px-2.5 py-0.5 text-xs font-mono text-muted-foreground uppercase",
										children: ["STATUS: ", selectedIncident.status]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-2xl font-bold text-foreground",
								children: selectedIncident.title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 max-w-3xl text-sm leading-relaxed text-muted-foreground",
								children: selectedIncident.description || selectedIncident.summary
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-2 gap-4 sm:grid-cols-4 border-t border-border pt-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs uppercase tracking-wider text-muted-foreground",
										children: "Current Stage"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 font-mono text-sm font-semibold text-cyan-signal",
										children: isTargetSelected ? incidentState.stage : selectedIncident.stage ?? "NORMAL"
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs uppercase tracking-wider text-muted-foreground",
										children: "Simulation Time"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "mt-1 flex items-center gap-1.5 font-mono text-sm font-semibold text-foreground",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "size-3.5 text-cyan-signal" }), isTargetSelected ? currentTime : selectedIncident.detectedAt]
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs uppercase tracking-wider text-muted-foreground",
										children: "Calculated Risk"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: cn("mt-1 font-mono text-sm font-semibold uppercase", currentRisk === "CRITICAL" || currentRisk === "Critical" ? "text-threat" : currentRisk === "HIGH" || currentRisk === "High" ? "text-warning" : "text-cyan-signal"),
										children: isTargetSelected ? currentRisk : selectedIncident.severity
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs uppercase tracking-wider text-muted-foreground",
										children: "Affected Assets"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "mt-1 flex items-center gap-1.5 font-mono text-sm font-semibold text-foreground",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Server, { className: "size-3.5 text-cyan-signal" }),
											isTargetSelected ? affectedAssets.length : selectedIncident.affectedAssets ?? 0,
											" asset(s)"
										]
									})] })
								]
							}),
							isTargetSelected && affectedAssets.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-center gap-2 pt-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs text-muted-foreground",
									children: "Entities affected:"
								}), affectedAssets.map((asset) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "rounded border border-threat/30 bg-threat/10 px-2 py-0.5 font-mono text-xs text-threat",
									children: asset
								}, asset))]
							}) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-lg border border-border bg-secondary/30 p-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs font-semibold uppercase tracking-wider text-cyan-signal",
									children: "Timeline Summary"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-xs text-muted-foreground",
									children: isTargetSelected ? incidentState.activeEvent ? `[${incidentState.activeEvent.time ?? incidentState.activeEvent.timestamp}] ${incidentState.activeEvent.title}: ${incidentState.activeEvent.description}` : selectedIncident.summary : selectedIncident.summary
								})]
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-col gap-3 sm:flex-row lg:flex-col shrink-0",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							size: "lg",
							className: "gap-2 shadow-glow",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/time-machine",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-4 text-cyan-signal" }), " OPEN TIME MACHINE"]
							})
						})
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-4 flex items-center rounded-lg border border-input bg-input/30 px-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "size-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					placeholder: "Search incident ID, title, account, or host",
					value: searchQuery,
					onChange: (e) => setSearchQuery(e.target.value),
					className: "border-0 bg-transparent shadow-none"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-4",
				children: filteredIncidents.map((i) => {
					const isTarget = i.id === "INC-2048";
					const display = isTarget ? incident : i;
					const isSelected = display.id === selectedIncidentId;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						onClick: () => setSelectedIncidentId(display.id),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GlassPanel, {
							className: cn("p-5 cursor-pointer transition-all hover:border-cyan-glow", isSelected && "border-cyan-glow bg-secondary/40 shadow-glow"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col gap-4 md:flex-row md:items-center md:justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex gap-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: cn("grid size-11 shrink-0 place-items-center rounded-lg", display.severity === "CRITICAL" ? "bg-threat/12 text-threat" : "bg-warning/12 text-warning"),
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldAlert, { className: "size-5" })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "font-mono text-xs text-muted-foreground",
												children: display.id
											}), isTarget ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "rounded bg-primary/20 px-1.5 py-0.5 text-[10px] font-mono text-cyan-signal",
												children: "SIMULATED INCIDENT"
											}) : null]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "mt-1 text-lg font-semibold",
											children: display.title
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "mt-1 text-sm text-muted-foreground",
											children: [
												"Detected ",
												display.detectedAgo,
												" · ",
												display.affectedAssets,
												" affected assets"
											]
										})
									] })]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: cn("rounded-full border px-2.5 py-1 text-xs font-semibold uppercase", display.severity === "CRITICAL" ? "border-threat/40 text-threat" : "border-warning/40 text-warning"),
										children: display.severity
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										asChild: true,
										size: "sm",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
											to: "/time-machine",
											children: ["Open Investigation ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })]
										})
									})]
								})]
							})
						})
					}, display.id);
				})
			})
		]
	});
}
var SplitComponent = IncidentsView;
//#endregion
export { SplitComponent as component };
