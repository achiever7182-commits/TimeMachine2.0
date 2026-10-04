# Realtime Architecture

TimeMachine uses Supabase Realtime to synchronize operational state across the UI.

## Usage
- **Incidents & Alerts**: Subscribes to the `incidents` and `alerts` tables to show new cases instantly on the dashboard without manual polling.
- **Response Approvals**: Subscribes to `response_approvals` to update active containment steps.

## Limitations & Best Practices
- **Telemetry Data Plane**: Realtime is NOT used for the high-volume telemetry stream (Phase 1 engine data). Streaming 10,000+ EPS over WebSockets per client is non-viable. Telemetry will remain a high-performance HTTP/gRPC pull/push architecture (Phase 3).
- **Channels**: Supabase Realtime uses `postgres_changes`. We limit channels to specific tables and strictly enforce RLS so users only receive broadcast changes for their `organization_id`.
