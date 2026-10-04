import { createClient } from "@supabase/supabase-js";
import fs from "fs";

const envContent = fs.readFileSync(".env", "utf8");
const env = {};
envContent.split("\n").forEach((line) => {
  const [k, ...v] = line.split("=");
  if (k && v) env[k.trim()] = v.join("=").trim();
});

const supabase = createClient(env["VITE_SUPABASE_URL"], env["VITE_SUPABASE_ANON_KEY"]);

async function testAuth() {
  const testEmail = `operator_test_${Date.now()}@timemachine.soc`;
  const testPassword = "TimeMachineSecOps2026!";

  console.log("1. Testing sign up for:", testEmail);
  const { data: signUpData, error: signUpErr } = await supabase.auth.signUp({
    email: testEmail,
    password: testPassword,
    options: {
      data: {
        display_name: "Operator Test",
      },
    },
  });

  console.log("SignUp response:", {
    user: signUpData.user ? { id: signUpData.user.id, email: signUpData.user.email, identities: signUpData.user.identities } : null,
    session: signUpData.session ? "Active session created" : "No session created (Email confirmation might be enabled)",
    error: signUpErr,
  });

  if (signUpData.user) {
    console.log("\n2. Checking if profile was created for user id:", signUpData.user.id);
    const { data: prof, error: profErr } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", signUpData.user.id)
      .single();
    console.log("Profile row:", prof, "Error:", profErr);

    console.log("\n3. Testing if client can insert into profiles directly...");
    const { data: insProf, error: insProfErr } = await supabase
      .from("profiles")
      .insert({
        id: signUpData.user.id,
        auth_user_id: signUpData.user.id,
        email: testEmail,
        display_name: "Operator Test",
      })
      .select();
    console.log("Insert profile result:", insProf, "Error:", insProfErr);
  }
}

testAuth();
