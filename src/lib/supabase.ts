import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env["VITE_SUPABASE_URL"] || "https://dummy.supabase.co";
const supabaseAnonKey = import.meta.env["VITE_SUPABASE_ANON_KEY"] || "dummy-anon-key";

// Create a single typed Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});
