import { createClient } from "@supabase/supabase-js";
import fs from "fs";

// Read .env directly
const envContent = fs.readFileSync(".env", "utf8");
const env = {};
envContent.split("\n").forEach((line) => {
  const [k, ...v] = line.split("=");
  if (k && v) env[k.trim()] = v.join("=").trim();
});

const url = env["VITE_SUPABASE_URL"];
const key = env["VITE_SUPABASE_ANON_KEY"];

console.log("Supabase URL:", url);
console.log("Anon key present:", !!key);

const supabase = createClient(url, key);

async function run() {
  try {
    console.log("\n1. Testing organizations table...");
    const { data: orgs, error: orgErr } = await supabase.from("organizations").select("*");
    console.log("Organizations count:", orgs ? orgs.length : 0, "Error:", orgErr);
    if (orgs && orgs.length) console.log("First org:", orgs[0]);

    console.log("\n2. Testing roles table...");
    const { data: roles, error: rolesErr } = await supabase.from("roles").select("*");
    console.log("Roles count:", roles ? roles.length : 0, "Error:", rolesErr);

    console.log("\n3. Testing profiles table...");
    const { data: profiles, error: profErr } = await supabase.from("profiles").select("*");
    console.log("Profiles count:", profiles ? profiles.length : 0, "Error:", profErr);

    console.log("\n4. Testing incidents table...");
    const { data: incs, error: incsErr } = await supabase.from("incidents").select("id, incident_number, title");
    console.log("Incidents count:", incs ? incs.length : 0, "Error:", incsErr);
  } catch (err) {
    console.error("Diagnostic error:", err);
  }
}

run();
