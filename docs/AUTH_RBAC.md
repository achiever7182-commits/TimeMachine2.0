# Authentication & RBAC

TimeMachine enforces a robust, multi-tenant Role-Based Access Control (RBAC) model.

## Identity & Sessions
- **Supabase Auth**: JWT-based session management.
- `src/context/AuthContext.tsx` wraps the app and handles automatic token refreshing.
- `src/components/auth/AuthGuard.tsx` forces authentication for protected routes.

## Roles
- `ADMIN`: Full system access across the tenant.
- `SECURITY_ANALYST`: Can view telemetry, modify incidents, and propose responses.
- `VIEWER`: Read-only operational views.

## Permissions Map
The `role_permissions` table maps precise actions (e.g., `response.approve`, `simulation.run`) to standard roles. The UI and future backend endpoints will evaluate these before allowing state mutation.

## Multi-Tenancy
All users belong to an `organization_id` in the `profiles` table. This UUID isolates data contexts system-wide.
