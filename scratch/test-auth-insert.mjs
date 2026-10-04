import { createClient } from "@supabase/supabase-js";
import fs from "fs";

const envContent = fs.readFileSync(".env", "utf8");
const env = {};
envContent.split("\n").forEach((line) => {
  const [k, ...v] = line.split("=");
  if (k && v) env[k.trim()] = v.join("=").trim();
});

const supabase = createClient(env["VITE_SUPABASE_URL"], env["VITE_SUPABASE_ANON_KEY"]);

async function testAuthInsert() {
  const testEmail = `operator_auth_${Date.now()}@timemachine.soc`;
  const testPassword = "Password123!";

  // 1. Sign up
  const { data: signUpData, error: signUpErr } = await supabase.auth.signUp({
    email: testEmail,
    password: testPassword,
  });

  if (signUpErr) {
    console.error("Signup error:", signUpErr);
    return;
  }

  console.log("Logged in user:", signUpData.user.id);
  console.log("Session present:", !!signUpData.session);

  // 2. Try to insert with the authenticated client
  const { data: insertData, error: insertErr } = await supabase
    .from("profiles")
    .insert({
      id: signUpData.user.id,
      auth_user_id: signUpData.user.id,
      email: testEmail,
      display_name: "Test Operator",
      organization_id: "00000000-0000-0000-0000-000000000001",
    })
    .select();

  console.log("Authenticated insert result:", { insertData, insertErr });
}

testAuthInsert();
