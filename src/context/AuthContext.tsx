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

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [authState, setAuthState] = useState<AuthState>("AUTHENTICATING");

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
            setAuthState("LOADING_PROFILE");
            await loadProfile(session.user.id);
          } else {
            setAuthState("UNAUTHENTICATED");
          }
        }
      } catch (err) {
        console.error("Error loading auth session:", err);
        if (mounted) setAuthState("UNAUTHENTICATED");
      }
    }

    async function loadProfile(userId: string) {
      try {
        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", userId)
          .single();

        if (error && error.code !== "PGRST116") throw error; // Not found is handled

        if (mounted) {
          if (data) {
            setProfile(data as Profile);
            if (!data.organization_id) {
              setAuthState("NO_ORGANIZATION");
            } else {
              setAuthState("ACTIVE");
            }
          } else {
            // Profile doesn't exist yet (e.g. just signed up and trigger hasn't fired)
            setAuthState("PROFILE_ERROR");
          }
        }
      } catch (err) {
        console.error("Error loading user profile:", err);
        if (mounted) setAuthState("PROFILE_ERROR");
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
        if (newSession.user.id !== user?.id) {
          setAuthState("LOADING_PROFILE");
          await loadProfile(newSession.user.id);
        }
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [user?.id]);

  const signOut = async () => {
    await supabase.auth.signOut();
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
