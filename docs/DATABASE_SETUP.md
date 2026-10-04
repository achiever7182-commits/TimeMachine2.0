# Database Setup Instructions

To connect TimeMachine to Supabase:

1. Create a Supabase Project.
2. In the Supabase Dashboard, retrieve the **Project URL** and **anon key**.
3. Create a `.env` file based on `.env.example`:
   ```bash
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key
   ```
4. Run the local database migrations to build the schema:
   ```bash
   npx supabase link --project-ref your-project-id
   npx supabase db push
   ```
5. (Optional) For synthetic development data, manually apply the seed script `supabase/migrations/20261004074435_seed_data.sql` via the Supabase SQL editor.
