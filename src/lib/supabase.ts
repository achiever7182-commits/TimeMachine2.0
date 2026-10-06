import { createClient } from "@supabase/supabase-js";

const getResolvedSupabaseUrl = () => {
  if (typeof window !== "undefined" && window.location?.origin) {
    const raw = import.meta.env["VITE_SUPABASE_URL"];
    if (
      !raw ||
      raw === "https://dummy.supabase.co" ||
      raw === "https://your-project.supabase.co" ||
      raw.includes("dummy.supabase.co") ||
      raw.includes("localhost") ||
      raw.includes("127.0.0.1") ||
      raw.includes("::1")
    ) {
      return window.location.origin;
    }
    return raw;
  }
  return import.meta.env["VITE_SUPABASE_URL"] || "http://localhost:8080";
};

const supabaseUrl = getResolvedSupabaseUrl();
const supabaseAnonKey = import.meta.env["VITE_SUPABASE_ANON_KEY"] || "local-dev-anon-key";

// Create a single typed Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});
