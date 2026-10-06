import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";

export type AuthState =
  | "AUTHENTICATING"
  | "UNAUTHENTICATED"
  | "AUTHENTICATED"
  | "LOADING_PROFILE"
  | "PROFILE_ERROR"
  | "NO_ORGANIZATION"
  | "ACTIVE";

interface Profile {
  id: string;
  organization_id: string | null;
  display_name: string | null;
  email: string;
  role_id: string | null;
}

interface AuthContextValue {
  session: Session | null;
  user: User | null;
  profile: Profile | null;
  authState: AuthState;
  signOut: () => Promise<void>;
}

const DEFAULT_DEMO_USER: User = {
  id: "00000000-0000-0000-0000-000000000001",
  app_metadata: { provider: "email" },
  user_metadata: { display_name: "SOC Lead Operator" },
  aud: "authenticated",
  created_at: new Date().toISOString(),
  email: "operator@time-machine.soc",
} as unknown as User;

const DEFAULT_DEMO_PROFILE: Profile = {
  id: "00000000-0000-0000-0000-000000000001",
  organization_id: "00000000-0000-0000-0000-000000000001",
  display_name: "SOC Lead Operator",
  email: "operator@time-machine.soc",
  role_id: "10000000-0000-0000-0000-000000000002",
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(DEFAULT_DEMO_USER);
  const [profile, setProfile] = useState<Profile | null>(DEFAULT_DEMO_PROFILE);
  const [authState, setAuthState] = useState<AuthState>("ACTIVE");

  useEffect(() => {
    let mounted = true;

    async function loadSession() {
      try {
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession();
        if (error) throw error;

        if (mounted) {
          if (session) {
            setSession(session);
            setUser(session.user);
            await loadProfile(session.user.id, session.user);
          } else {
            // Keep active demo operator profile
            setUser(DEFAULT_DEMO_USER);
            setProfile(DEFAULT_DEMO_PROFILE);
            setAuthState("ACTIVE");
          }
        }
      } catch {
        // Fallback to active demo operator session on unconfigured/invalid backend
        if (mounted) {
          setUser(DEFAULT_DEMO_USER);
          setProfile(DEFAULT_DEMO_PROFILE);
          setAuthState("ACTIVE");
        }
      }
    }

    async function loadProfile(userId: string, currentUser?: User | null) {
      try {
        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", userId)
          .single();

        if (error && error.code !== "PGRST116") {
          console.warn("Notice querying profiles table:", error.message);
        }

        if (mounted) {
          if (data) {
            setProfile(data as Profile);
            setAuthState("ACTIVE");
          } else {
            // Provision local operator profile if DB trigger is pending or table row does not yet exist
            const activeUser = currentUser || user;
            const fallbackProfile: Profile = {
              id: userId,
              organization_id: "00000000-0000-0000-0000-000000000001",
              display_name:
                (activeUser?.user_metadata?.["display_name"] as string | undefined) ||
                activeUser?.email?.split("@")[0] ||
                "Operator",
              email: activeUser?.email || "",
              role_id: "10000000-0000-0000-0000-000000000002",
            };
            setProfile(fallbackProfile);
            setAuthState("ACTIVE");

            // Attempt background sync if permissions allow
            (async () => {
              try {
                await supabase.from("profiles").upsert(fallbackProfile);
              } catch {
                // Ignore background sync errors
              }
            })();
          }
        }
      } catch (err) {
        console.warn("Could not load user profile, falling back to active operator session:", err);
        if (mounted) {
          const activeUser = currentUser || user;
          const fallbackProfile: Profile = {
            id: userId,
            organization_id: "00000000-0000-0000-0000-000000000001",
            display_name:
              (activeUser?.user_metadata?.["display_name"] as string | undefined) ||
              activeUser?.email?.split("@")[0] ||
              "Operator",
            email: activeUser?.email || "",
            role_id: "10000000-0000-0000-0000-000000000002",
          };
          setProfile(fallbackProfile);
          setAuthState("ACTIVE");
        }
      }
    }

    loadSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, newSession) => {
      if (!mounted) return;

      if (event === "SIGNED_OUT" || !newSession) {
        setSession(null);
        setUser(null);
        setProfile(null);
        setAuthState("UNAUTHENTICATED");
      } else if (event === "SIGNED_IN" || event === "TOKEN_REFRESHED") {
        setSession(newSession);
        setUser(newSession.user);
        await loadProfile(newSession.user.id, newSession.user);
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
    } catch (err) {
      console.error("Sign out error:", err);
    }
    setSession(null);
    setUser(null);
    setProfile(null);
    setAuthState("UNAUTHENTICATED");
  };

  return (
    <AuthContext.Provider value={{ session, user, profile, authState, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
