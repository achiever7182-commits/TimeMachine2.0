import { createClient } from "@supabase/supabase-js";
import * as dotenv from "dotenv";

dotenv.config();

const url = process.env.VITE_SUPABASE_URL || "";
const key = process.env.VITE_SUPABASE_ANON_KEY || "";

console.log("Testing Supabase URL:", url);
console.log("Anon key present:", !!key);

const supabase = createClient(url, key);

async function run() {
  try {
    console.log("Checking organizations table...");
    const { data: orgs, error: orgErr } = await supabase.from("organizations").select("*");
    console.log("Orgs result:", { orgs, error: orgErr });

    console.log("Checking profiles table...");
    const { data: profiles, error: profErr } = await supabase.from("profiles").select("*");
    console.log("Profiles result:", { profiles, error: profErr });

    console.log("Checking roles table...");
    const { data: roles, error: rolesErr } = await supabase.from("roles").select("*");
    console.log("Roles result:", { roles, error: rolesErr });
  } catch (err) {
    console.error("Exception:", err);
  }
}

run();
