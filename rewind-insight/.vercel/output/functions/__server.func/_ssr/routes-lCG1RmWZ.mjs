import { r as __toESM } from "../_runtime.mjs";
import { i as require_react, r as require_jsx_runtime } from "../_libs/elevenlabs__react+react.mjs";
import { At as ArrowRight, _ as ShieldCheck, f as Sparkles, k as Play, p as SlidersHorizontal, yt as ChevronRight } from "../_libs/lucide-react.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { t as Button } from "./button-Bq5vK6RO.mjs";
import { t as IncidentTimeMachine3D } from "./incident-time-machine-3d-BOeYEbR3.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-lCG1RmWZ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var PALETTES = {
	vacuum: {
		backdrop: "#05070d",
		text: "#f2f4f8",
		muted: "rgba(240,244,248,0.72)",
		bar: "linear-gradient(90deg, rgba(255,255,255,0.45), rgba(255,255,255,0.95))"
	},
	ember: {
		backdrop: "#0d0705",
		text: "#fdf1e7",
		muted: "rgba(253,241,231,0.72)",
		bar: "linear-gradient(90deg, rgba(255,176,102,0.45), rgba(255,214,168,0.95))"
	},
	ice: {
		backdrop: "#04090f",
		text: "#eaf4ff",
		muted: "rgba(234,244,255,0.72)",
		bar: "linear-gradient(90deg, rgba(120,190,255,0.45), rgba(214,236,255,0.95))"
	}
};
var CDN = "https://cdn.jsdelivr.net/gh/yuraoak/airlock-hero-assets@main";
var DEFAULT_VIDEO = `${CDN}/iss-hero-1080p.mp4`;
var DEFAULT_POSTER = `${CDN}/iss-hero-poster.jpg`;
var SANS = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";
Number.MAX_SAFE_INTEGER, Number.MIN_SAFE_INTEGER;
function clamp(v, min, max) {
	return Math.min(max, Math.max(min, v));
}
function AirlockHero({ videoSrc = DEFAULT_VIDEO, posterSrc = DEFAULT_POSTER, title = "THE TIME MACHINE OPENS", scrollHint = "SCROLL", tagline = "WHAT IF YOU COULD REWIND THE ATTACK — AND CHANGE WHAT HAPPENS NEXT?", signature = false, scrubDistance = 3200, holdDistance = 1100, theme = "vacuum", skipLabel = "Skip intro", className, style }) {
	const sectionRef = (0, import_react.useRef)(null);
	const videoRef = (0, import_react.useRef)(null);
	const titleRef = (0, import_react.useRef)(null);
	const hintRef = (0, import_react.useRef)(null);
	const taglineRef = (0, import_react.useRef)(null);
	const barRef = (0, import_react.useRef)(null);
	const scrimRef = (0, import_react.useRef)(null);
	const releaseRef = (0, import_react.useRef)(() => {});
	const [ready, setReady] = (0, import_react.useState)(false);
	const palette = PALETTES[theme];
	(0, import_react.useEffect)(() => {
		const video = videoRef.current;
		const section = sectionRef.current;
		if (!video || !section) return;
		const reduceMotion = typeof window !== "undefined" && (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false);
		let duration = 0;
		let rafId = 0;
		let target = 0;
		let shown = 0;
		let moved = false;
		let seeking = false;
		let queued = null;
		const scrubShare = scrubDistance / (scrubDistance + holdDistance);
		function seekTo(t) {
			if (!video) return;
			if (seeking) {
				queued = t;
				return;
			}
			if (Math.abs(video.currentTime - t) < .03) return;
			seeking = true;
			try {
				video.currentTime = t;
			} catch (e) {
				seeking = false;
			}
		}
		const onSeeked = () => {
			seeking = false;
			if (queued !== null && video) {
				const t = queued;
				queued = null;
				if (Math.abs(video.currentTime - t) >= .03) {
					seeking = true;
					try {
						video.currentTime = t;
					} catch (e) {
						seeking = false;
					}
				}
			}
		};
		function paint(p) {
			const videoP = clamp(p / scrubShare, 0, 1);
			if (!duration && video && video.duration) {
				duration = video.duration;
				setReady(true);
			}
			if (duration > 0) seekTo(Math.min(videoP * duration, duration - .04));
			const titleAlpha = 1 - clamp(videoP / .35, 0, 1);
			const taglineAlpha = clamp((videoP - .82) / .18, 0, 1);
			if (videoRef.current) videoRef.current.style.transform = `scale(${1 + videoP * .06})`;
			if (scrimRef.current) scrimRef.current.style.opacity = String(Math.max(titleAlpha, taglineAlpha));
			if (titleRef.current) {
				const t = titleAlpha;
				titleRef.current.style.opacity = String(t);
				titleRef.current.style.transform = `translateY(${(1 - t) * -24}px) scale(${.96 + t * .04})`;
				titleRef.current.style.filter = `blur(${(1 - t) * 10}px)`;
			}
			if (hintRef.current) hintRef.current.style.opacity = moved ? "0" : "1";
			if (taglineRef.current) {
				const t = taglineAlpha;
				taglineRef.current.style.opacity = String(t);
				taglineRef.current.style.transform = `translateY(${(1 - t) * 20}px) scale(${.97 + t * .03})`;
				taglineRef.current.style.filter = `blur(${(1 - t) * 8}px)`;
			}
			if (barRef.current) barRef.current.style.transform = `scaleX(${p})`;
		}
		function updateScrollProgress() {
			if (!section) return;
			const rect = section.getBoundingClientRect();
			const totalScrub = section.offsetHeight - window.innerHeight;
			const progress = totalScrub > 0 ? clamp(-rect.top / totalScrub, 0, 1) : 1;
			target = progress;
			if (progress > .01) moved = true;
		}
		releaseRef.current = () => {
			if (!section) return;
			const totalScrub = section.offsetHeight - window.innerHeight;
			window.scrollTo({
				top: section.offsetTop + totalScrub,
				behavior: "smooth"
			});
		};
		const onScroll = () => {
			updateScrollProgress();
		};
		const checkReady = () => {
			if (video && video.duration > 0) {
				duration = video.duration;
				setReady(true);
				updateScrollProgress();
			}
		};
		if (video.readyState >= 1 || video.duration > 0) checkReady();
		video.addEventListener("loadeddata", checkReady);
		video.addEventListener("loadedmetadata", checkReady);
		video.addEventListener("canplay", checkReady);
		video.addEventListener("seeked", onSeeked);
		if (!reduceMotion) {
			window.addEventListener("scroll", onScroll, { passive: true });
			window.addEventListener("resize", onScroll, { passive: true });
			updateScrollProgress();
			const frame = () => {
				shown += (target - shown) * .18;
				paint(shown);
				rafId = requestAnimationFrame(frame);
			};
			rafId = requestAnimationFrame(frame);
		}
		return () => {
			video.removeEventListener("loadeddata", checkReady);
			video.removeEventListener("loadedmetadata", checkReady);
			video.removeEventListener("canplay", checkReady);
			video.removeEventListener("seeked", onSeeked);
			window.removeEventListener("scroll", onScroll);
			window.removeEventListener("resize", onScroll);
			cancelAnimationFrame(rafId);
		};
	}, [scrubDistance, holdDistance]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		ref: sectionRef,
		className: cn("relative w-full", className),
		style: {
			height: "300vh",
			background: palette.backdrop,
			...style
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "sticky top-0 h-[100dvh] w-full overflow-hidden",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
					ref: videoRef,
					src: videoSrc,
					poster: posterSrc,
					muted: true,
					playsInline: true,
					preload: "auto",
					"aria-hidden": "true",
					className: "absolute inset-0 h-full w-full object-cover",
					style: {
						opacity: ready ? 1 : 0,
						transformOrigin: "center center",
						willChange: "transform",
						transition: "opacity 0.6s ease"
					}
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "pointer-events-none absolute inset-0",
					style: { background: "linear-gradient(180deg, rgba(5,7,13,0.38), rgba(5,7,13,0) 30%, rgba(5,7,13,0.15) 70%, rgba(5,7,13,0.58))" }
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					ref: scrimRef,
					className: "pointer-events-none absolute inset-0",
					style: { background: "radial-gradient(ellipse 62% 44% at 50% 50%, rgba(5,7,13,0.68), rgba(5,7,13,0) 72%)" }
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					ref: titleRef,
					className: "pointer-events-none absolute inset-0 flex items-center justify-center px-[6%] text-center",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "inline-block font-extrabold leading-none tracking-[-0.02em]",
						style: {
							fontFamily: SANS,
							fontSize: "clamp(30px, 7vw, 96px)",
							color: palette.text,
							textShadow: "0 4px 30px rgba(0,0,0,0.55)",
							willChange: "transform, filter, opacity"
						},
						children: title
					})
				}),
				tagline ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					ref: taglineRef,
					className: "pointer-events-none absolute inset-0 flex items-center justify-center px-[8%] text-center opacity-0",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-bold tracking-[-0.01em]",
						style: {
							fontFamily: SANS,
							fontSize: "clamp(20px, 3.4vw, 40px)",
							lineHeight: 1.2,
							color: palette.text,
							textShadow: "0 4px 24px rgba(0,0,0,0.6)"
						},
						children: tagline
					})
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					ref: hintRef,
					className: "pointer-events-none absolute bottom-[clamp(20px,6vh,48px)] left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 transition-opacity duration-[400ms]",
					style: {
						color: palette.muted,
						fontFamily: SANS,
						fontSize: "clamp(10px, 1.4vw, 12px)",
						fontWeight: 600,
						letterSpacing: "0.3em"
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: scrollHint }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
						width: "14",
						height: "18",
						viewBox: "0 0 14 18",
						"aria-hidden": "true",
						style: { animation: "airlock-bounce 1.6s ease-in-out infinite" },
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("style", { children: `
                        @keyframes airlock-bounce {
                            0%, 100% { transform: translateY(0); opacity: 0.5; }
                            50% { transform: translateY(5px); opacity: 1; }
                        }
                        @media (prefers-reduced-motion: reduce) {
                            [style*="airlock-bounce"] { animation: none !important; }
                        }
                    ` }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
							d: "M7 1 L7 17 M2 12 L7 17 L12 12",
							stroke: "currentColor",
							strokeWidth: "1.5",
							fill: "none",
							strokeLinecap: "round",
							strokeLinejoin: "round"
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => releaseRef.current(),
					className: "absolute left-1/2 top-4 z-10 -translate-x-1/2 rounded-full px-4 py-2 text-xs font-semibold opacity-0 transition-opacity focus-visible:opacity-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
					style: {
						fontFamily: SANS,
						color: palette.text,
						background: "rgba(5,7,13,0.7)",
						letterSpacing: "0.08em"
					},
					children: skipLabel
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute inset-x-0 bottom-0 h-0.5",
					style: { background: "rgba(255,255,255,0.12)" },
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						ref: barRef,
						className: "h-full w-full origin-left",
						style: {
							background: palette.bar,
							transform: "scaleX(0)"
						}
					})
				}),
				signature ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "absolute bottom-[clamp(10px,2vw,18px)] right-[clamp(12px,2.5vw,24px)] z-[2] font-medium",
					style: {
						fontFamily: SANS,
						fontSize: "clamp(11px, 1.4vw, 13px)",
						color: palette.muted
					},
					children: [
						"by",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: signature.url,
							target: "_blank",
							rel: "noopener noreferrer",
							className: "no-underline transition-colors hover:opacity-100",
							style: { color: "inherit" },
							children: signature.name
						})
					]
				}) : null
			]
		})
	});
}
function LandingPage() {
	const [interactiveMode, setInteractiveMode] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "relative min-h-screen w-full bg-black text-foreground",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AirlockHero, {
			title: "THE TIME MACHINE OPENS",
			tagline: "WHAT IF YOU COULD REWIND THE ATTACK — AND CHANGE WHAT HAPPENS NEXT?"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative w-full",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-command-grid opacity-40 pointer-events-none z-0" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "relative z-20 mx-auto flex max-w-7xl items-center justify-between px-6 py-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "grid size-10 place-items-center rounded-lg border border-cyan-glow bg-primary/15 shadow-glow",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "size-5 text-cyan-signal" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block font-semibold tracking-wide text-sm sm:text-base",
							children: "INCIDENT TIME MACHINE"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block text-[10px] font-mono text-muted-foreground uppercase tracking-widest",
							children: "RECONSTRUCT • REWIND • SIMULATE • RESPOND"
						})] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "hidden sm:inline-flex items-center gap-2 rounded-full border border-green-signal/30 bg-green-signal/10 px-3 py-1 text-xs font-semibold text-green-signal",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-2 rounded-full bg-green-signal animate-pulse" }), "DEMO SYSTEM ONLINE"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "outline",
							size: "sm",
							onClick: () => setInteractiveMode(!interactiveMode),
							className: "text-xs font-mono border-cyan-glow/40 bg-card/60",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SlidersHorizontal, { className: "mr-1.5 size-3.5 text-cyan-signal" }), interactiveMode ? "Hero Mode" : "Full Workshop Mode"]
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "relative z-10 w-full min-h-[calc(100vh-80px)] flex flex-col justify-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: `absolute inset-0 w-full h-full z-0 ${interactiveMode ? "pointer-events-auto" : "pointer-events-none"}`,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IncidentTimeMachine3D, {
							height: "100%",
							embed: !interactiveMode
						})
					}), !interactiveMode && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "relative z-10 mx-auto max-w-7xl w-full px-6 py-12 pointer-events-none",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "max-w-xl pointer-events-auto bg-black/50 backdrop-blur-md p-6 sm:p-8 rounded-2xl border border-white/10 shadow-2xl",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "inline-flex items-center gap-2 rounded-full border border-cyan-glow/40 bg-cyan-glow/10 px-3 py-1 text-xs font-semibold text-cyan-signal uppercase tracking-wider mb-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-3.5" }), "Cybersecurity Incident Response"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
									className: "text-4xl sm:text-6xl font-extrabold tracking-tight leading-[1.05]",
									children: [
										"INCIDENT ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "bg-gradient-to-r from-orange-400 via-amber-300 to-cyan-400 bg-clip-text text-transparent",
											children: "TIME MACHINE"
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-3 font-mono text-xs text-amber-400 tracking-widest uppercase",
									children: "RECONSTRUCT • REWIND • SIMULATE • RESPOND"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-4 text-base sm:text-lg text-slate-300 leading-relaxed",
									children: ["Don’t just respond to an attack. ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-white font-semibold",
										children: "Rewind it. Understand it. Simulate it. Stop it."
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-xs sm:text-sm text-slate-400 leading-normal",
									children: "Reconstruct historical timelines, inspect critical decision points, and simulate counterfactual response actions before executing mitigation."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-6 flex flex-wrap items-center gap-1.5 font-mono text-[11px]",
									children: [
										"01 ATTACK",
										"02 RECONSTRUCT",
										"03 REWIND",
										"04 SIMULATE",
										"05 RESPOND"
									].map((stage, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "flex items-center gap-1.5 text-slate-300",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "rounded bg-white/10 px-2 py-0.5 border border-white/15 hover:border-amber-400/50 transition-colors",
											children: stage
										}), idx < 4 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-3 text-amber-500/70" })]
									}, stage))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-8 flex flex-wrap gap-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										asChild: true,
										size: "lg",
										className: "bg-amber-500 hover:bg-amber-600 text-black font-semibold shadow-lg shadow-amber-500/20",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
											to: "/dashboard",
											children: ["Enter Security Center ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "ml-2 size-4" })]
										})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										asChild: true,
										size: "lg",
										variant: "outline",
										className: "border-white/20 bg-black/40 hover:bg-white/10",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
											to: "/time-machine",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "mr-2 size-4 text-cyan-signal" }), " Watch Live Incident Demo"]
										})
									})]
								})
							]
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
					className: "relative z-10 mx-auto max-w-7xl px-6 py-16 border-t border-white/10",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-8 md:grid-cols-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-xl border border-white/10 bg-card/40 p-6 backdrop-blur-md",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "font-mono text-xs text-amber-400",
										children: "01 — RECONSTRUCT"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "mt-2 text-lg font-semibold",
										children: "Graph & Security State"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-2 text-sm text-muted-foreground",
										children: "Automatically builds identity graph, compromised assets, lateral movement paths, and evidence state surrounding the incident."
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-xl border border-white/10 bg-card/40 p-6 backdrop-blur-md",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "font-mono text-xs text-amber-400",
										children: "02 — REWIND"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "mt-2 text-lg font-semibold",
										children: "Earliest Opportunity"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-2 text-sm text-muted-foreground",
										children: "Scrub backward in time to inspect what defenders knew at the exact moment of initial access and initial authentication anomaly."
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-xl border border-white/10 bg-card/40 p-6 backdrop-blur-md",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "font-mono text-xs text-amber-400",
										children: "03 — SIMULATE & RESPOND"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "mt-2 text-lg font-semibold",
										children: "Counterfactual Branching"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-2 text-sm text-muted-foreground",
										children: "Simulate host isolation, credential suspension, and firewall block scenarios to verify risk reduction before live execution."
									})
								]
							})
						]
					})
				})
			]
		})]
	});
}
var SplitComponent = LandingPage;
//#endregion
export { SplitComponent as component };
