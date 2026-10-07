import { r as __toESM } from "../_runtime.mjs";
import { i as require_react, r as require_jsx_runtime } from "../_libs/elevenlabs__react+react.mjs";
import { Dt as BookmarkCheck, Et as Bookmark, at as ExternalLink, bt as ChevronLeft, dt as Clock, j as Pause, k as Play, n as X, w as RotateCcw, yt as ChevronRight } from "../_libs/lucide-react.mjs";
import { s as demoTimelineEvents, x as useDemo } from "./DemoContext-DI0dcfwA.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { t as Button } from "./button-Bq5vK6RO.mjs";
import { t as GlassPanel } from "./PageHeader-DeDQgGHW.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ForensicTimeline-Cq-zL1VS.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ForensicTimeline() {
	const { currentMinute, setCurrentMinute, currentTime, currentRisk, incidentStage, isAttackRunning, isPaused, startAttackSimulation, pauseSimulation, resumeSimulation, stepForward, stepBack, jumpToNextEvent, jumpToPreviousEvent, rewindToStart, goToDetection, timelineZoom, setTimelineZoom, bookmarks, addBookmark, jumpToBookmark, investigationMode, setSelectedEntityId, selectedEventId, setSelectedEventId } = useDemo();
	const [isBookmarkDialogOpen, setIsBookmarkDialogOpen] = (0, import_react.useState)(false);
	const [bookmarkName, setBookmarkName] = (0, import_react.useState)("");
	const activeInspectedEvent = demoTimelineEvents.find((e) => e.id === selectedEventId) ?? null;
	const visibleEvents = timelineZoom === "OVERVIEW" ? demoTimelineEvents.filter((e) => [
		"evt-0942",
		"evt-1000",
		"evt-1007",
		"evt-1012",
		"evt-1024"
	].includes(e.id)) : demoTimelineEvents;
	const handleCreateBookmark = (e) => {
		e.preventDefault();
		if (!bookmarkName.trim()) return;
		addBookmark(bookmarkName.trim());
		setBookmarkName("");
		setIsBookmarkDialogOpen(false);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GlassPanel, {
		className: "overflow-hidden border-border p-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-4 border-b border-border pb-4 lg:flex-row lg:items-center lg:justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "grid size-9 place-items-center rounded-lg bg-primary/15 text-cyan-signal",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "size-4" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono text-base font-bold text-foreground",
								children: currentTime
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: cn("rounded-full border px-2 py-0.2 font-mono text-[10px] font-semibold uppercase", currentRisk === "CRITICAL" ? "border-threat/40 bg-threat/10 text-threat" : currentRisk === "HIGH" ? "border-warning/40 bg-warning/10 text-warning" : "border-cyan-glow bg-primary/10 text-cyan-signal"),
								children: currentRisk
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "font-mono text-xs text-muted-foreground uppercase",
								children: [
									"[",
									incidentStage,
									"]"
								]
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground",
						children: "Forensic Time Controller & Virtual Twin Synchronizer"
					})] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center gap-1.5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							variant: "outline",
							onClick: rewindToStart,
							title: "Rewind to Start (09:42)",
							className: "size-8 p-0",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "size-3.5" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							variant: "outline",
							onClick: jumpToPreviousEvent,
							title: "Previous Event",
							className: "size-8 p-0",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "size-4" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							variant: "outline",
							onClick: stepBack,
							title: "Step Back (-1m)",
							className: "px-2 text-xs font-mono",
							children: "-1m"
						}),
						!isAttackRunning && !isPaused ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							size: "sm",
							onClick: startAttackSimulation,
							className: "gap-1.5 px-3 text-xs",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "size-3.5" }), " Play"]
						}) : isAttackRunning ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							size: "sm",
							variant: "secondary",
							onClick: pauseSimulation,
							className: "gap-1.5 px-3 text-xs",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pause, { className: "size-3.5" }), " Pause"]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							size: "sm",
							onClick: resumeSimulation,
							className: "gap-1.5 px-3 text-xs",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "size-3.5" }), " Resume"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							variant: "outline",
							onClick: stepForward,
							title: "Step Forward (+1m)",
							className: "px-2 text-xs font-mono",
							children: "+1m"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							variant: "outline",
							onClick: jumpToNextEvent,
							title: "Next Event",
							className: "size-8 p-0",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-4" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							variant: "outline",
							onClick: goToDetection,
							title: "Go to Detection (10:24)",
							className: "px-2 text-xs font-mono",
							children: "10:24"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mx-1 h-5 w-px bg-border" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex items-center rounded-lg border border-border bg-secondary/35 p-0.5 text-xs font-mono",
							children: [
								"OVERVIEW",
								"INCIDENT",
								"FORENSIC"
							].map((zm) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setTimelineZoom(zm),
								className: cn("rounded px-2 py-0.5 text-[10px] transition-colors", timelineZoom === zm ? "bg-primary/20 text-cyan-signal font-semibold" : "text-muted-foreground hover:text-foreground"),
								children: zm
							}, zm))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							size: "sm",
							variant: "outline",
							onClick: () => setIsBookmarkDialogOpen(true),
							className: "gap-1 px-2.5 text-xs font-mono",
							title: "Bookmark Current Time",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bookmark, { className: "size-3.5 text-cyan-signal" }), " Pin"]
						})
					]
				})]
			}),
			bookmarks.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center gap-2 pt-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-mono text-[10px] uppercase text-muted-foreground tracking-wider",
					children: "Bookmarks:"
				}), bookmarks.map((bmk) => {
					const isAtTime = bmk.minute === currentMinute;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => jumpToBookmark(bmk.id),
						className: cn("inline-flex items-center gap-1.5 rounded-md border px-2 py-1 font-mono text-[11px] transition-colors", isAtTime ? "border-cyan-glow bg-primary/20 text-cyan-signal font-semibold shadow-glow" : "border-border bg-secondary/30 text-muted-foreground hover:text-foreground hover:border-cyan-signal/40"),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookmarkCheck, { className: "size-3 text-cyan-signal" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-bold",
								children: bmk.timestamp
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "opacity-80 truncate max-w-[120px]",
								children: bmk.name
							})
						]
					}, bmk.id);
				})]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "overflow-x-auto pt-6 pb-2",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-[960px]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative grid gap-2 pt-2",
						style: { gridTemplateColumns: `repeat(${visibleEvents.length}, minmax(0, 1fr))` },
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute left-[4%] right-[4%] top-[24px] h-0.5 bg-border" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "absolute left-[4%] top-[23px] h-1 bg-cyan-signal transition-all duration-300 shadow-glow",
								style: { width: `${currentMinute / 42 * 92}%` }
							}),
							visibleEvents.map((event) => {
								const eventMinute = event.minute ?? 0;
								const happened = eventMinute <= currentMinute;
								const isExact = eventMinute === currentMinute;
								const isSelected = selectedEventId === event.id;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									onClick: () => {
										setCurrentMinute(eventMinute);
										setSelectedEventId(event.id);
									},
									className: cn("group relative cursor-pointer text-center transition-transform hover:-translate-y-0.5", isSelected && "scale-105"),
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("relative z-10 mx-auto block size-3.5 rounded-full border transition-all", isExact ? "border-cyan-signal bg-cyan-signal ring-4 ring-cyan-signal/25 shadow-glow" : happened ? "border-cyan-signal bg-cyan-signal/80" : "border-border bg-card") }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: cn("mt-3 font-mono text-xs font-semibold", happened ? "text-foreground" : "text-muted-foreground"),
											children: event.time ?? event.timestamp
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: cn("mt-1 text-[11px] leading-tight line-clamp-2 px-1", happened ? "text-cyan-signal font-medium" : "text-muted-foreground"),
											children: event.title
										}),
										timelineZoom === "FORENSIC" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "mt-1.5 inline-block rounded bg-secondary px-1.5 py-0.2 font-mono text-[9px] text-muted-foreground uppercase",
											children: event.category
										}) : null
									]
								}, event.id);
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-7",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							id: "timeline-range",
							className: "timeline-range w-full",
							type: "range",
							min: "0",
							max: "42",
							step: "1",
							value: currentMinute,
							onChange: (e) => setCurrentMinute(Number(e.target.value)),
							"aria-label": "Incident time"
						})
					})]
				})
			}),
			activeInspectedEvent ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-5 rounded-xl border border-cyan-glow/60 bg-secondary/40 p-4 animate-scale-in",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-center gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono text-xs font-semibold text-cyan-signal",
									children: activeInspectedEvent.id
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "rounded bg-primary/20 px-2 py-0.2 font-mono text-[10px] font-semibold text-cyan-signal uppercase",
									children: activeInspectedEvent.category
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "rounded bg-threat/20 px-2 py-0.2 font-mono text-[10px] font-semibold text-threat uppercase",
									children: activeInspectedEvent.severity
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "font-mono text-xs text-muted-foreground",
									children: ["Timestamp: ", activeInspectedEvent.timestamp]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
							className: "mt-1.5 text-base font-bold text-foreground",
							children: activeInspectedEvent.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-xs text-muted-foreground leading-relaxed",
							children: activeInspectedEvent.description
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "icon",
						onClick: () => setSelectedEventId(null),
						className: "size-7",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" })
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 flex flex-wrap items-center gap-2 border-t border-border pt-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-mono text-xs text-muted-foreground",
							children: "Correlated Targets:"
						}),
						activeInspectedEvent.affectedAssetIds.map((assetId) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							size: "sm",
							variant: "outline",
							className: "h-7 text-xs font-mono",
							onClick: () => setSelectedEntityId(assetId),
							children: [
								"VIEW ASSET (",
								assetId,
								")"
							]
						}, assetId)),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							size: "sm",
							variant: "secondary",
							className: "h-7 text-xs font-mono gap-1",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/evidence",
								children: ["VIEW RELATED EVIDENCE ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "size-3" })]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							size: "sm",
							variant: "outline",
							className: "h-7 text-xs font-mono gap-1",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/attack-graph",
								children: ["VIEW ATTACK PATH ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "size-3" })]
							})
						})
					]
				})]
			}) : null,
			isBookmarkDialogOpen ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-50 grid place-items-center bg-background/80 backdrop-blur-sm p-4 animate-fade-in",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "w-full max-w-md rounded-xl border border-border bg-card p-6 shadow-2xl",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-lg font-bold text-foreground",
							children: "Add Forensic Bookmark"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 text-xs text-muted-foreground",
							children: [
								"Save current simulation time ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
									className: "font-mono text-cyan-signal",
									children: currentTime
								}),
								" as an investigation marker."
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							onSubmit: handleCreateBookmark,
							className: "mt-4 space-y-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-xs font-mono text-muted-foreground",
								children: "Bookmark Label"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								required: true,
								placeholder: "e.g. Lateral Movement Observed",
								value: bookmarkName,
								onChange: (e) => setBookmarkName(e.target.value),
								className: "mt-1.5 w-full rounded-lg border border-input bg-input/40 px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-cyan-signal"
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-end gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									type: "button",
									variant: "outline",
									size: "sm",
									onClick: () => setIsBookmarkDialogOpen(false),
									children: "Cancel"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									type: "submit",
									size: "sm",
									children: "Save Bookmark"
								})]
							})]
						})
					]
				})
			}) : null
		]
	});
}
//#endregion
export { ForensicTimeline as t };
