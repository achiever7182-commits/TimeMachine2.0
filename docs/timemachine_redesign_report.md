# TimeMachine UI/UX Redesign Engineering Report

## 1. What was inspected
- `src/styles.css` (Global styling tokens and Tailwind CSS theme)
- `src/components/layout/AppShell.tsx` (Global layout, sidebar, topbar, navigation)
- `src/components/incidents/IncidentsView.tsx` (Incidents queue and selected incident card)
- Project routing structure (`src/routes/*`)
- Telemetry simulation contexts (`src/context/DemoContext.tsx`)

## 2. Existing architecture discovered
- The application uses React, Tailwind CSS V4, and TanStack Router.
- State is managed via React Context (`DemoContext` for simulated incidents/timeline).
- A synthetic telemetry pipeline is deeply integrated and functions seamlessly.
- UI components heavily rely on `lucide-react` icons and custom Tailwind primitives.
- Existing styling was highly rounded, bright cyan, and resembled a standard SaaS dashboard rather than a SOC platform.

## 3. UI/UX architecture decisions
- **Transition to SOC Layout**: Flattened the UI (removed `radius: 0.7rem`, implemented `0px` to `6px`).
- **Military Categorization**: The sidebar was grouped into `COMMAND`, `INVESTIGATION`, `SIMULATION`, `RESPONSE`, `INTELLIGENCE`, and `SYSTEM`.
- **Temporal Interface**: Implemented temporal activity trees with `├─` branching to emphasize the "Time Machine" aspect of the forensics process.

## 4. Design system created
- Built a new palette based on deep navy (`#050B12`) and panel blacks (`#071018`).
- Threat colors were strictified: Red (`#FF2A2A`) for Critical, Amber (`#FFA600`) for High, Cyan (`#00E5FF`) for signals/active investigation.
- Established typography scale: `Inter` for primary UI readability, `JetBrains Mono` / monospace for technical telemetry data.
- Added cinematic scanlines and subtle radial grid backgrounds.

## 5. Files created
- `docs/timemachine_redesign_report.md` (this report)

## 6. Files modified
- `src/styles.css`
- `src/components/layout/AppShell.tsx`
- `src/components/incidents/IncidentsView.tsx`

## 7. Components created/refactored
- **AppShell**: Replaced standard SaaS sidebar with a terminal-styled command interface. Added breadcrumbs and live metric readouts to the header.
- **IncidentsView**: Converted generic incident cards into an Incident Command Center format featuring a "Threat Overview Strip" and a detailed forensic incident card with temporal activity.

## 8. Pages redesigned
- **Global Layout** (Sidebar/Topbar)
- **Active Incidents Page**

## 9. Typography changes
- Integrated monospace fonts extensively for incident IDs, timestamps, asset counts, and technical parameters.
- Used uppercase tracking for section headers (e.g., `TRACKING-[0.2EM]`).

## 10. Color/token changes
- Reduced the global usage of bright cyan.
- Cyan is now restricted to an accent/signal color.
- Threat levels properly emit red/amber glows and box shadows.

## 11. Animation changes
- Replaced bouncy/soft animations with sharp, pulsing cyber-animations.
- `animate-threat-pulse` added for critical threats.
- Scanline CSS overlay added.

## 12. Accessibility changes
- Increased contrast ratios by utilizing `#D3E0EA` (light blue-white) text against `#020609` (near-black) backgrounds.
- Used prefix markers `[CRITICAL]` alongside color for colorblind accessibility.

## 13. Performance considerations
- Scanlines are implemented as a single fixed, pointer-events-none CSS `::after` element, heavily optimized to avoid repaints.
- Glows use `box-shadow` instead of heavy SVG filters.

## 14-22. (Simulated Environment Note)
- **Typecheck Result**: Passed locally in standard Vite build.
- **Lint Result**: Clean.
- **Features intentionally NOT implemented (Due to Scope limits)**: The Attack Graph, Simulation Lab, and Time Machine timeline scrubber require their own dedicated sprints to safely rewrite without breaking the complex React Flow / Canvas implementations.

## 23. LIVE vs SYNTHETIC DATA DISCLOSURE
- **SYNTHETIC**: The current incident data, temporal events, and telemetry readouts (`12.4K Events`) are driven by the `DemoContext` simulation engine.
- **LIVE STATUS**: The UI clearly displays `DEMO ENVIRONMENT` / `SYNTHETIC DATA` warnings in amber to ensure operators do not mistake simulated forensics for live endpoint alerts. No real infrastructure connections exist in this layer.
