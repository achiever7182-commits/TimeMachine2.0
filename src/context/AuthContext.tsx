import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";
import { userService, StoredUser } from "@/services/userService";

export type AuthState =
  | "AUTHENTICATING"
  | "UNAUTHENTICATED"
  | "AUTHENTICATED"
  | "LOADING_PROFILE"
  | "PROFILE_ERROR"
  | "NO_ORGANIZATION"
  | "ACTIVE";

export interface Profile {
  id: string;
  organization_id: string | null;
  display_name: string | null;
  email: string;
  role_id: string | null;
  role?: string;
}

interface AuthContextValue {
  session: Session | null;
  user: User | null;
  profile: Profile | null;
  storedUser: StoredUser | null;
  isAdmin: boolean;
  authState: AuthState;
  signOut: () => Promise<void>;
  signInDemo: () => void;
  signInWithCredentials: (
    email: string,
    password: string,
  ) => Promise<{ success: boolean; error?: string }>;
  signInAdmin: (
    idOrEmail: string,
    password: string,
  ) => { success: boolean; error?: string };
}

function convertStoredUserToSupabaseUser(stored: StoredUser): User {
  return {
    id: stored.id,
    app_metadata: { provider: "email" },
    user_metadata: {
      display_name: stored.displayName,
      role: stored.role,
    },
    aud: "authenticated",
    created_at: stored.createdAt,
    email: stored.email,
  } as unknown as User;
}

function convertStoredUserToProfile(stored: StoredUser): Profile {
  return {
    id: stored.id,
    organization_id: stored.organizationId || "00000000-0000-0000-0000-000000000001",
    display_name: stored.displayName,
    email: stored.email,
    role_id:
      stored.role === "Admin"
        ? "10000000-0000-0000-0000-000000000001"
        : "10000000-0000-0000-0000-000000000002",
    role: stored.role,
  };
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [storedUser, setStoredUser] = useState<StoredUser | null>(null);
  const [authState, setAuthState] = useState<AuthState>("AUTHENTICATING");

  const isAdmin = Boolean(
    storedUser?.role === "Admin" ||
      profile?.role === "Admin" ||
      user?.email?.toLowerCase().includes("admin") ||
      (typeof window !== "undefined" &&
        localStorage.getItem("timemachine_admin_unlocked") === "true"),
  );

  useEffect(() => {
    let mounted = true;

    async function initAuth() {
      // 1. Check persistent local session first
      const localSession = userService.getActiveSession();
      if (localSession) {
        if (mounted) {
          setStoredUser(localSession);
          setUser(convertStoredUserToSupabaseUser(localSession));
          setProfile(convertStoredUserToProfile(localSession));
          setAuthState("ACTIVE");
        }
        return;
      }

      // 2. Check Supabase session if no local session found
      try {
        const {
          data: { session: remoteSession },
        } = await supabase.auth.getSession();

        if (mounted) {
          if (remoteSession && remoteSession.user) {
            setSession(remoteSession);
            setUser(remoteSession.user);
            const userEmail = remoteSession.user.email || "";
            let matchedUser = userService.getUserByEmail(userEmail);
            if (!matchedUser) {
              matchedUser = userService.createUser({
                email: userEmail,
                displayName:
                  (remoteSession.user.user_metadata?.["display_name"] as string) ||
                  userEmail.split("@")[0] ||
                  "Operator",
              });
            }
            setStoredUser(matchedUser);
            setProfile(convertStoredUserToProfile(matchedUser));
            userService.saveActiveSession(matchedUser);
            setAuthState("ACTIVE");
          } else {
            // User is unauthenticated. Do NOT auto-login to demo without explicit request!
            setUser(null);
            setProfile(null);
            setStoredUser(null);
            setAuthState("UNAUTHENTICATED");
          }
        }
      } catch {
        if (mounted) {
          setUser(null);
          setProfile(null);
          setStoredUser(null);
          setAuthState("UNAUTHENTICATED");
        }
      }
    }

    initAuth();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, newSession) => {
      if (!mounted) return;

      if (event === "SIGNED_OUT" || !newSession) {
        // Only clear if no local session is explicitly active
        const active = userService.getActiveSession();
        if (!active) {
          setSession(null);
          setUser(null);
          setProfile(null);
          setStoredUser(null);
          setAuthState("UNAUTHENTICATED");
        }
      } else if (event === "SIGNED_IN" || event === "TOKEN_REFRESHED") {
        setSession(newSession);
        setUser(newSession.user);
        const email = newSession.user.email || "";
        let matched = userService.getUserByEmail(email);
        if (!matched) {
          matched = userService.createUser({
            email,
            displayName:
              (newSession.user.user_metadata?.["display_name"] as string) ||
              email.split("@")[0] ||
              "Operator",
          });
        }
        setStoredUser(matched);
        setProfile(convertStoredUserToProfile(matched));
        userService.saveActiveSession(matched);
        setAuthState("ACTIVE");
      }
    });

    // Listen to userService updates (e.g. role change, deletion)
    const unsubscribeUsers = userService.subscribe(() => {
      if (!mounted) return;
      const currentActive = userService.getActiveSession();
      if (currentActive) {
        const fresh = userService.getUserById(currentActive.id);
        if (fresh) {
          if (fresh.status === "suspended") {
            userService.clearActiveSession();
            setUser(null);
            setProfile(null);
            setStoredUser(null);
            setAuthState("UNAUTHENTICATED");
            return;
          }
          setStoredUser(fresh);
          setProfile(convertStoredUserToProfile(fresh));
          userService.saveActiveSession(fresh);
        }
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
      unsubscribeUsers();
    };
  }, []);

  const signOut = async () => {
    try {
      userService.clearActiveSession();
      if (typeof window !== "undefined") {
        localStorage.removeItem("timemachine_admin_unlocked");
      }
      await supabase.auth.signOut();
    } catch (err) {
      console.warn("Sign out remote notice:", err);
    } finally {
      setSession(null);
      setUser(null);
      setProfile(null);
      setStoredUser(null);
      setAuthState("UNAUTHENTICATED");
    }
  };

  const signInDemo = () => {
    let demoUser = userService.getUserByEmail("operator@time-machine.soc");
    if (!demoUser) {
      demoUser = userService.createUser({
        email: "operator@time-machine.soc",
        displayName: "SOC Lead Operator",
        role: "SOC Lead Operator",
      });
    }
    userService.recordLogin(demoUser.email);
    userService.saveActiveSession(demoUser);
    setStoredUser(demoUser);
    setUser(convertStoredUserToSupabaseUser(demoUser));
    setProfile(convertStoredUserToProfile(demoUser));
    setAuthState("ACTIVE");
  };

  const signInWithCredentials = async (
    email: string,
    password: string,
  ): Promise<{ success: boolean; error?: string }> => {
    // 1. Try local verified users store
    const localResult = userService.verifyCredentials(email, password);
    if (localResult.success && localResult.user) {
      userService.saveActiveSession(localResult.user);
      setStoredUser(localResult.user);
      setUser(convertStoredUserToSupabaseUser(localResult.user));
      setProfile(convertStoredUserToProfile(localResult.user));
      setAuthState("ACTIVE");

      // Background attempt with Supabase client (if connected)
      try {
        await supabase.auth.signInWithPassword({ email: email.trim(), password });
      } catch {
        // Local auth is sufficient
      }

      return { success: true };
    }

    // 2. If not found in local seed/registered users, try Supabase directly
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (error) {
        return {
          success: false,
          error: localResult.error || error.message || "Invalid operator credentials.",
        };
      }

      if (data.user) {
        const displayName =
          (data.user.user_metadata?.["display_name"] as string) ||
          email.split("@")[0] ||
          "Operator";
        const newUser = userService.createUser({
          email: data.user.email || email,
          displayName,
          password,
        });
        userService.saveActiveSession(newUser);
        setStoredUser(newUser);
        setUser(data.user);
        setProfile(convertStoredUserToProfile(newUser));
        setAuthState("ACTIVE");
        return { success: true };
      }
    } catch {
      // Return local error
    }

    return {
      success: false,
      error: localResult.error || "Authentication failed. Check your ID and access key.",
    };
  };

  const signInAdmin = (
    idOrEmail: string,
    password: string,
  ): { success: boolean; error?: string } => {
    const result = userService.verifyAdmin(idOrEmail, password);
    if (result.success && result.user) {
      userService.saveActiveSession(result.user);
      if (typeof window !== "undefined") {
        localStorage.setItem("timemachine_admin_unlocked", "true");
      }
      setStoredUser(result.user);
      setUser(convertStoredUserToSupabaseUser(result.user));
      setProfile(convertStoredUserToProfile(result.user));
      setAuthState("ACTIVE");
      return { success: true };
    }
    return { success: false, error: result.error || "Master Admin authorization failed." };
  };

  return (
    <AuthContext.Provider
      value={{
        session,
        user,
        profile,
        storedUser,
        isAdmin,
        authState,
        signOut,
        signInDemo,
        signInWithCredentials,
        signInAdmin,
      }}
    >
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
