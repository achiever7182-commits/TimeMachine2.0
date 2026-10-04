# TimeMachine Supabase Architecture

## Overview

TimeMachine uses Supabase as its persistent **CONTROL PLANE**. This provides authentication, role-based access control (RBAC), persistent operational state, and realtime synchronization for UI components.

**IMPORTANT DISTINCTION:** Supabase does NOT replace the telemetry ingestion pipeline or detection engine. The high-volume telemetry stream operates on the data plane, which is evaluated in-memory (Phase 1) and will later be replaced by a dedicated telemetry service (Phase 3). Supabase only stores the configuration, asset metadata, alerts, incidents, and operational workflows.

## Components

### 1. Authentication

- **Supabase Auth** is the single source of truth for identity.
- We support Email/Password (and future SSO).
- The frontend uses `@supabase/supabase-js` to persist sessions.
- `AuthContext` provides application states (`AUTHENTICATING`, `UNAUTHENTICATED`, `ACTIVE`, etc.).
- `AuthGuard` protects routes from unauthenticated access.

### 2. Database & Data Isolation

- PostgreSQL is the primary store.
- **Row Level Security (RLS)** enforces strict multitenancy at the database layer. Every table with operational data references an `organization_id`.
- The database schema is fully versioned using Supabase Migrations (`supabase/migrations/`).

### 3. Frontend Data Layer

- UI components do not query the database directly.
- The `src/services/supabase/` directory contains service modules (e.g., `incidentService`, `assetService`) that encapsulate Supabase queries and mutations.

### 4. Realtime

- Supabase Realtime is used for UI state synchronization of incidents, alerts, and response workflows.
- It is explicitly NOT used to stream raw telemetry events due to volume constraints.

## Next Phases

In future phases, real Windows/Linux telemetry agents will communicate with a dedicated ingestion service, which will run the Phase 1 detection engine and push only meaningful alerts and incident updates to the Supabase control plane.
