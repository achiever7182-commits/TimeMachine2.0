# Demo Mode vs. Live Mode

TimeMachine relies on a deterministic "Demo Mode" for demonstrations and consistent testability. With Phase 2, a "Live Mode" backed by persistent Supabase data is introduced.

## Guiding Principles
- **Never Fallback Silently**: If the app is in Live Mode, it must NEVER silently query demo data.
- **Explicit Contexts**: 
  - `DemoContext.tsx` serves synthetic incidents when the URL or environment requests demo context.
  - `AuthContext.tsx` handles real persistence.

## Telemetry Pipeline
- The Phase 1 Telemetry Pipeline (`TelemetryContext.tsx`) remains in memory. It can generate synthetic events deterministically for testing.
- When in Live Mode, the telemetry pipeline will eventually connect to the remote high-volume telemetry ingestion service (Phase 3). Currently, Phase 2 implements the Supabase control plane, leaving the data plane isolated.
