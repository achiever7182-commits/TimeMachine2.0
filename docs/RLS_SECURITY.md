# Row Level Security (RLS)

PostgreSQL RLS guarantees data isolation at the lowest possible layer. Even if the application logic contains flaws, users cannot access cross-tenant data.

## Policies
1. **Org Isolation**: Most tables enforce `organization_id = current_user_org_id()`.
   ```sql
   CREATE POLICY org_isolation ON incidents FOR ALL 
   USING (organization_id = current_user_org_id());
   ```
2. **Profile Access**: Users can read all profiles in their org, but can only UPDATE their own profile row.
3. **Audit Log Immutable Inserts**: Audit logs enforce isolation on SELECT and strictly limit mutation to INSERT-only.

## Security Definer Functions
`current_user_org_id()` is a PL/pgSQL function executing with `SECURITY DEFINER` privileges to efficiently retrieve the `organization_id` linked to the active `auth.uid()`, minimizing complex JOINs in RLS policies.
