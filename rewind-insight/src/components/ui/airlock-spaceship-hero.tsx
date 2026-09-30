"use client"

import { useEffect, useRef, useState } from "react"

import { cn } from "@/lib/utils"

/* -------------------------------------------------------------------------- */
/*  INCIDENT TIME MACHINE — a scroll-locked, scrub-driven video hero         */
/*                                                                            */
/*  While the hero owns the screen the page cannot move: the body is pinned   */
/*  with position:fixed, the same technique modal libraries use, because      */
/*  overflow:hidden alone is not reliable across browsers. Wheel, touch and   */
/*  key input is captured and spent on video.currentTime instead, forward     */
/*  and backward. When the video reaches its end and the reader keeps         */
/*  pushing forward the page is handed back and scrolls normally; scrolling   */
/*  back up to the top takes the lock again at full progress.                 */
/*                                                                            */
/*  No dependencies beyond React. Reduced-motion readers never get locked.    */
/* -------------------------------------------------------------------------- */

/* --- Types --- */

export type AirlockTheme = "vacuum" | "ember" | "ice"

interface Palette {
    /** Page-coloured backdrop shown before the first frame decodes. */
    backdrop: string
    /** Headline and tagline colour. */
    text: string
    /** Scroll hint and signature colour. */
    muted: string
    /** Progress bar fill. */
    bar: string
}

const PALETTES: Record<AirlockTheme, Palette> = {
    vacuum: {
        backdrop: "#05070d",
        text: "#f2f4f8",
        muted: "rgba(240,244,248,0.72)",
        bar: "linear-gradient(90deg, rgba(255,255,255,0.45), rgba(255,255,255,0.95))",
    },
    ember: {
        backdrop: "#0d0705",
        text: "#fdf1e7",
        muted: "rgba(253,241,231,0.72)",
        bar: "linear-gradient(90deg, rgba(255,176,102,0.45), rgba(255,214,168,0.95))",
    },
    ice: {
        backdrop: "#04090f",
        text: "#eaf4ff",
        muted: "rgba(234,244,255,0.72)",
        bar: "linear-gradient(90deg, rgba(120,190,255,0.45), rgba(214,236,255,0.95))",
    },
}

export interface AirlockHeroProps {
    /** Video to scrub. Must be same-origin or CORS-enabled, and seekable. */
    videoSrc?: string
    /** Still shown until the video has enough data to paint. Kills the black flash. */
    posterSrc?: string
    /** Headline over the opening frames. Fades out as the scrub starts. */
    title?: string
    /** Word next to the bouncing arrow. Hidden once the reader moves. */
    scrollHint?: string
    /** Payoff line, revealed over the last fifth of the scrub. Pass "" to drop it. */
    tagline?: string
    /** Credit in the corner. Pass false to drop it. */
    signature?: { name: string; url: string } | false
    /** Input distance in pixels needed to scrub the whole video. Higher feels heavier. */
    scrubDistance?: number
    /**
     * Extra input distance spent on the last frame, after the film has run out.
     * The picture is frozen and the tagline is fully up for this stretch, so the
     * hero has somewhere to land instead of stopping dead. Set to 0 to drop it.
     */
    holdDistance?: number
    /** Named colour set. */
    theme?: AirlockTheme
    /** Label for the control that hands the page back without scrubbing. */
    skipLabel?: string
    className?: string
    style?: React.CSSProperties
}

/* --- Constants --- */

const CDN = "https://cdn.jsdelivr.net/gh/yuraoak/airlock-hero-assets@main"
const DEFAULT_VIDEO = `${CDN}/iss-hero-1080p.mp4`
const DEFAULT_POSTER = `${CDN}/iss-hero-poster.jpg`
const SANS = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"

/** Keyboard fallback, so a reader without a wheel is never stuck. */
const KEY_STEPS: Record<string, number> = {
    ArrowDown: 140,
    ArrowUp: -140,
    PageDown: 700,
    PageUp: -700,
    " ": 700,
    End: Number.MAX_SAFE_INTEGER,
    Home: Number.MIN_SAFE_INTEGER,
}

/* --- Helpers --- */

function clamp(v: number, min: number, max: number) {
    return Math.min(max, Math.max(min, v))
}

/* --- Component --- */

export default function AirlockHero({
    videoSrc = DEFAULT_VIDEO,
    posterSrc = DEFAULT_POSTER,
    title = "THE TIME MACHINE OPENS",
    scrollHint = "SCROLL",
    tagline = "WHAT IF YOU COULD REWIND THE ATTACK — AND CHANGE WHAT HAPPENS NEXT?",
    signature = false,
    scrubDistance = 3200,
    holdDistance = 1100,
    theme = "vacuum",
    skipLabel = "Skip intro",
    className,
    style,
}: AirlockHeroProps) {
    const sectionRef = useRef<HTMLDivElement>(null)
    const videoRef = useRef<HTMLVideoElement>(null)
    const titleRef = useRef<HTMLDivElement>(null)
    const hintRef = useRef<HTMLDivElement>(null)
    const taglineRef = useRef<HTMLDivElement>(null)
    const barRef = useRef<HTMLDivElement>(null)
    const scrimRef = useRef<HTMLDivElement>(null)
    const releaseRef = useRef<() => void>(() => {})
    const [ready, setReady] = useState(false)

    const palette = PALETTES[theme]

    useEffect(() => {
        const video = videoRef.current
        const section = sectionRef.current
        if (!video || !section) return

        const reduceMotion =
            typeof window !== "undefined" &&
            (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false)

        let duration = 0
        let rafId = 0
        let target = 0
        let shown = 0
        let moved = false
        let seeking = false
        let queued: number | null = null
        let locked = false
        let lockedY = 0
        let touchY = 0
        let released = false
        let lastY = 0

        const totalDistance = scrubDistance + holdDistance
        const scrubShare = scrubDistance / totalDistance

        /* --- Seeking ------------------------------------------------------- */

        function seekTo(t: number) {
            if (!video) return
            if (seeking) {
                queued = t
                return
            }
            if (Math.abs(video.currentTime - t) < 0.03) return
            seeking = true
            try {
                video.currentTime = t
            } catch (e) {
                seeking = false
            }
        }

        const onSeeked = () => {
            seeking = false
            if (queued !== null && video) {
                const t = queued
                queued = null
                if (Math.abs(video.currentTime - t) >= 0.03) {
                    seeking = true
                    try {
                        video.currentTime = t
                    } catch (e) {
                        seeking = false
                    }
                }
            }
        }

        /* --- Painting ------------------------------------------------------ */

        function paint(p: number) {
            const videoP = clamp(p / scrubShare, 0, 1)

            if (!duration && video && video.duration) {
                duration = video.duration
                setReady(true)
            }

            if (duration > 0) seekTo(Math.min(videoP * duration, duration - 0.04))

            const titleAlpha = 1 - clamp(videoP / 0.35, 0, 1)
            const taglineAlpha = clamp((videoP - 0.82) / 0.18, 0, 1)

            if (videoRef.current) {
                videoRef.current.style.transform = `scale(${1 + videoP * 0.06})`
            }
            if (scrimRef.current) {
                scrimRef.current.style.opacity = String(Math.max(titleAlpha, taglineAlpha))
            }
            if (titleRef.current) {
                const t = titleAlpha
                titleRef.current.style.opacity = String(t)
                titleRef.current.style.transform = `translateY(${(1 - t) * -24}px) scale(${0.96 + t * 0.04})`
                titleRef.current.style.filter = `blur(${(1 - t) * 10}px)`
            }
            if (hintRef.current) {
                hintRef.current.style.opacity = moved ? "0" : "1"
            }
            if (taglineRef.current) {
                const t = taglineAlpha
                taglineRef.current.style.opacity = String(t)
                taglineRef.current.style.transform = `translateY(${(1 - t) * 20}px) scale(${0.97 + t * 0.03})`
                taglineRef.current.style.filter = `blur(${(1 - t) * 8}px)`
            }
            if (barRef.current) {
                barRef.current.style.transform = `scaleX(${p})`
            }
        }

        /* --- Non-locking Scroll Sync --------------------------------------- */

        function updateScrollProgress() {
            if (!section) return
            const rect = section.getBoundingClientRect()
            const totalScrub = section.offsetHeight - window.innerHeight
            const progress = totalScrub > 0 ? clamp(-rect.top / totalScrub, 0, 1) : 1
            target = progress
            if (progress > 0.01) moved = true
        }

        releaseRef.current = () => {
            if (!section) return
            const totalScrub = section.offsetHeight - window.innerHeight
            window.scrollTo({ top: section.offsetTop + totalScrub, behavior: "smooth" })
        }

        const onScroll = () => {
            updateScrollProgress()
        }

        /* --- Wiring -------------------------------------------------------- */

        const checkReady = () => {
            if (video && video.duration > 0) {
                duration = video.duration
                setReady(true)
                updateScrollProgress()
            }
        }

        if (video.readyState >= 1 || video.duration > 0) {
            checkReady()
        }

        video.addEventListener("loadeddata", checkReady)
        video.addEventListener("loadedmetadata", checkReady)
        video.addEventListener("canplay", checkReady)
        video.addEventListener("seeked", onSeeked)

        if (!reduceMotion) {
            window.addEventListener("scroll", onScroll, { passive: true })
            window.addEventListener("resize", onScroll, { passive: true })
            updateScrollProgress()

            const frame = () => {
                shown += (target - shown) * 0.18
                paint(shown)
                rafId = requestAnimationFrame(frame)
            }
            rafId = requestAnimationFrame(frame)
        }

        return () => {
            video.removeEventListener("loadeddata", checkReady)
            video.removeEventListener("loadedmetadata", checkReady)
            video.removeEventListener("canplay", checkReady)
            video.removeEventListener("seeked", onSeeked)
            window.removeEventListener("scroll", onScroll)
            window.removeEventListener("resize", onScroll)
            cancelAnimationFrame(rafId)
        }
    }, [scrubDistance, holdDistance])

    return (
        <div
            ref={sectionRef}
            className={cn("relative w-full", className)}
            style={{ height: "300vh", background: palette.backdrop, ...style }}
        >
            <div className="sticky top-0 h-[100dvh] w-full overflow-hidden">
            <video
                ref={videoRef}
                src={videoSrc}
                poster={posterSrc}
                muted
                playsInline
                preload="auto"
                aria-hidden="true"
                className="absolute inset-0 h-full w-full object-cover"
                style={{
                    opacity: ready ? 1 : 0,
                    transformOrigin: "center center",
                    willChange: "transform",
                    transition: "opacity 0.6s ease",
                }}
            />

            {/* Top and bottom falloff, so type never fights the sky. */}
            <div
                className="pointer-events-none absolute inset-0"
                style={{
                    background:
                        "linear-gradient(180deg, rgba(5,7,13,0.38), rgba(5,7,13,0) 30%, rgba(5,7,13,0.15) 70%, rgba(5,7,13,0.58))",
                }}
            />

            {/* Centre scrim. Driven by paint(), so it is only there while there is type to protect. */}
            <div
                ref={scrimRef}
                className="pointer-events-none absolute inset-0"
                style={{
                    background:
                        "radial-gradient(ellipse 62% 44% at 50% 50%, rgba(5,7,13,0.68), rgba(5,7,13,0) 72%)",
                }}
            />

            <div
                ref={titleRef}
                className="pointer-events-none absolute inset-0 flex items-center justify-center px-[6%] text-center"
            >
                <h1
                    className="inline-block font-extrabold leading-none tracking-[-0.02em]"
                    style={{
                        fontFamily: SANS,
                        fontSize: "clamp(30px, 7vw, 96px)",
                        color: palette.text,
                        textShadow: "0 4px 30px rgba(0,0,0,0.55)",
                        willChange: "transform, filter, opacity",
                    }}
                >
                    {title}
                </h1>
            </div>

            {tagline ? (
                <div
                    ref={taglineRef}
                    className="pointer-events-none absolute inset-0 flex items-center justify-center px-[8%] text-center opacity-0"
                >
                    <p
                        className="font-bold tracking-[-0.01em]"
                        style={{
                            fontFamily: SANS,
                            fontSize: "clamp(20px, 3.4vw, 40px)",
                            lineHeight: 1.2,
                            color: palette.text,
                            textShadow: "0 4px 24px rgba(0,0,0,0.6)",
                        }}
                    >
                        {tagline}
                    </p>
                </div>
            ) : null}

            <div
                ref={hintRef}
                className="pointer-events-none absolute bottom-[clamp(20px,6vh,48px)] left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 transition-opacity duration-[400ms]"
                style={{
                    color: palette.muted,
                    fontFamily: SANS,
                    fontSize: "clamp(10px, 1.4vw, 12px)",
                    fontWeight: 600,
                    letterSpacing: "0.3em",
                }}
            >
                <span>{scrollHint}</span>
                <svg width="14" height="18" viewBox="0 0 14 18" aria-hidden="true" style={{ animation: "airlock-bounce 1.6s ease-in-out infinite" }}>
                    <style>{`
                        @keyframes airlock-bounce {
                            0%, 100% { transform: translateY(0); opacity: 0.5; }
                            50% { transform: translateY(5px); opacity: 1; }
                        }
                        @media (prefers-reduced-motion: reduce) {
                            [style*="airlock-bounce"] { animation: none !important; }
                        }
                    `}</style>
                    <path
                        d="M7 1 L7 17 M2 12 L7 17 L12 12"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </div>

            {/* Never trap anyone: a keyboard-reachable way straight to the page. */}
            <button
                type="button"
                onClick={() => releaseRef.current()}
                className="absolute left-1/2 top-4 z-10 -translate-x-1/2 rounded-full px-4 py-2 text-xs font-semibold opacity-0 transition-opacity focus-visible:opacity-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                style={{ fontFamily: SANS, color: palette.text, background: "rgba(5,7,13,0.7)", letterSpacing: "0.08em" }}
            >
                {skipLabel}
            </button>

            {/* Thin progress line — fills as the video advances. */}
            <div className="absolute inset-x-0 bottom-0 h-0.5" style={{ background: "rgba(255,255,255,0.12)" }}>
                <div
                    ref={barRef}
                    className="h-full w-full origin-left"
                    style={{ background: palette.bar, transform: "scaleX(0)" }}
                />
            </div>

            {signature ? (
                <span
                    className="absolute bottom-[clamp(10px,2vw,18px)] right-[clamp(12px,2.5vw,24px)] z-[2] font-medium"
                    style={{
                        fontFamily: SANS,
                        fontSize: "clamp(11px, 1.4vw, 13px)",
                        color: palette.muted,
                    }}
                >
                    by{" "}
                    <a
                        href={signature.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="no-underline transition-colors hover:opacity-100"
                        style={{ color: "inherit" }}
                    >
                        {signature.name}
                    </a>
                </span>
            ) : null}
            </div>
        </div>
    )
}
