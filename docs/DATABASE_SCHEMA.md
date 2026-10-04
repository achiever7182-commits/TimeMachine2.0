# Database Schema Overview

The Supabase database for TimeMachine is heavily normalized and strongly typed, using Postgres enums, JSONB, and foreign key constraints to ensure data integrity for a robust cybersecurity platform.

## Key Schemas

### 1. Multi-tenant Foundation
- **organizations**: The core tenant boundary (`id`, `name`, `slug`).
- **roles & permissions**: RBAC system mapping standard roles (`ADMIN`, `SECURITY_ANALYST`, `VIEWER`) to granular UI actions.
- **profiles**: Maps to `auth.users`, extending user data with organizational linkage and RBAC role.

### 2. Assets & Agents
- **assets**: The IT estate (`asset_type`, `hostname`, `ip_address`, `platform`).
- **agents**: The telemetry collection sensors linked to assets (`agent_identifier`, `status`, `capabilities`).

### 3. Incidents & Detection
- **incidents**: A correlated case containing multiple alerts and events (`severity`, `status`, `priority`).
- **alerts**: Fired when rules trigger on telemetry.
- **detection_rules**: Configuration for the rule engine.
- **incident_events**: Relevant raw/normalized events associated with an incident.

### 4. Operational Workflows
- **policies**: Automated response playbooks (`conditions`, `actions`).
- **response_actions**: Manual or automated containment steps (`status`, `approval_required`).
- **evidence**: Hashes, files, and artifacts linked to investigations.
- **audit_logs**: Immutable record of system actions.

## Schema Migrations
All structural changes are tracked in `supabase/migrations/`.
- `20261004074330_initial_schema.sql` creates tables, ENUMs, constraints, and RLS policies.
- `20261004074435_seed_data.sql` inserts dummy organizations, assets, and incidents for local development.
