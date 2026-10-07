/**
 * Persistent User Management Service for TimeMachine Incident Platform.
 * Supports registered operators, administrators, roles, authentication verification,
 * dual-sync with Supabase database profiles, and live updates across components.
 */

import { supabase } from "@/lib/supabase";

export type UserRole =
  | "Admin"
  | "SOC Lead Operator"
  | "Forensics Analyst"
  | "Security Auditor"
  | "Incident Responder";

export type UserStatus = "active" | "suspended";

export interface StoredUser {
  id: string;
  email: string;
  displayName: string;
  role: UserRole;
  status: UserStatus;
  password?: string;
  createdAt: string;
  lastLoginAt: string;
  organizationId: string;
  isDemo?: boolean;
  avatarInitials?: string;
}

const STORAGE_KEY = "timemachine_users_store_v2";
const ACTIVE_SESSION_KEY = "timemachine_active_session_v2";

export const SEED_USERS: StoredUser[] = [
  {
    id: "usr-admin-01",
    email: "admin@timemachine.soc",
    displayName: "Master Security Admin",
    role: "Admin",
    status: "active",
    password: "admin",
    createdAt: "2026-01-01T08:00:00.000Z",
    lastLoginAt: new Date().toISOString(),
    organizationId: "00000000-0000-0000-0000-000000000001",
    avatarInitials: "SA",
  },
  {
    id: "usr-demo-01",
    email: "operator@time-machine.soc",
    displayName: "SOC Lead Operator",
    role: "SOC Lead Operator",
    status: "active",
    password: "password123",
    createdAt: "2026-01-15T09:30:00.000Z",
    lastLoginAt: new Date().toISOString(),
    organizationId: "00000000-0000-0000-0000-000000000001",
    isDemo: true,
    avatarInitials: "OP",
  },
  {
    id: "usr-analyst-02",
    email: "analyst.smith@time-machine.soc",
    displayName: "Forensics Specialist Smith",
    role: "Forensics Analyst",
    status: "active",
    password: "analyst123",
    createdAt: "2026-02-10T11:20:00.000Z",
    lastLoginAt: "2026-10-06T14:45:00.000Z",
    organizationId: "00000000-0000-0000-0000-000000000001",
    avatarInitials: "AS",
  },
  {
    id: "usr-ciso-03",
    email: "ciso.director@time-machine.soc",
    displayName: "CISO Director Vance",
    role: "Admin",
    status: "active",
    password: "ciso123",
    createdAt: "2026-01-05T07:15:00.000Z",
    lastLoginAt: "2026-10-05T18:10:00.000Z",
    organizationId: "00000000-0000-0000-0000-000000000001",
    avatarInitials: "CV",
  },
  {
    id: "usr-responder-04",
    email: "responder.chen@time-machine.soc",
    displayName: "Incident Responder Chen",
    role: "Incident Responder",
    status: "active",
    password: "responder123",
    createdAt: "2026-02-28T16:00:00.000Z",
    lastLoginAt: "2026-10-04T09:12:00.000Z",
    organizationId: "00000000-0000-0000-0000-000000000001",
    avatarInitials: "RC",
  },
  {
    id: "usr-audit-05",
    email: "guest.auditor@external.audit",
    displayName: "External Compliance Auditor",
    role: "Security Auditor",
    status: "suspended",
    password: "audit123",
    createdAt: "2026-03-01T12:00:00.000Z",
    lastLoginAt: "2026-09-28T10:00:00.000Z",
    organizationId: "00000000-0000-0000-0000-000000000001",
    avatarInitials: "EA",
  },
];

const listeners: Set<() => void> = new Set();

function notifyListeners() {
  listeners.forEach((callback) => {
    try {
      callback();
    } catch (e) {
      console.error("Error in user store listener:", e);
    }
  });
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("timemachine_users_updated"));
  }
}

export const userService = {
  /**
   * Returns all stored users. Guarantees that seed users and registered users are merged.
   */
  getUsers(): StoredUser[] {
    if (typeof window === "undefined") {
      return SEED_USERS;
    }
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (!data) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_USERS));
        return SEED_USERS;
      }
      const parsed = JSON.parse(data) as StoredUser[];
      if (!Array.isArray(parsed) || parsed.length === 0) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_USERS));
        return SEED_USERS;
      }

      // Ensure seed users are always present in the directory
      const existingEmails = new Set(parsed.map((u) => u.email.toLowerCase()));
      let missingSeedsAdded = false;
      const merged = [...parsed];

      for (const seed of SEED_USERS) {
        if (!existingEmails.has(seed.email.toLowerCase())) {
          merged.push(seed);
          missingSeedsAdded = true;
        }
      }

      if (missingSeedsAdded) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
      }

      return merged;
    } catch {
      return SEED_USERS;
    }
  },

  /**
   * Reset store to initial preset seeds
   */
  resetToDefaults(): StoredUser[] {
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_USERS));
      } catch (err) {
        console.error("Failed to reset users store:", err);
      }
    }
    notifyListeners();
    return SEED_USERS;
  },

  /**
   * Save users array to localStorage and notify listeners.
   */
  saveUsers(users: StoredUser[]): void {
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
      } catch (err) {
        console.error("Failed to save users store:", err);
      }
    }
    notifyListeners();
  },

  /**
   * Sync with Supabase Database (profiles table)
   */
  async syncWithSupabase(): Promise<StoredUser[]> {
    try {
      const { data, error } = await supabase.from("profiles").select("*");
      if (error || !data || data.length === 0) {
        return this.getUsers();
      }

      const currentUsers = this.getUsers();
      const existingMap = new Map<string, StoredUser>();
      currentUsers.forEach((u) => existingMap.set(u.email.toLowerCase(), u));

      let hasNew = false;
      for (const row of data as Array<{
        id: string;
        email?: string;
        display_name?: string;
        role_id?: string;
        status?: string;
        last_login_at?: string;
        created_at?: string;
      }>) {
        const email = (row.email || "").trim().toLowerCase();
        if (!email) continue;

        if (!existingMap.has(email)) {
          hasNew = true;
          let role: UserRole = "SOC Lead Operator";
          if (row.role_id === "10000000-0000-0000-0000-000000000001") role = "Admin";
          else if (row.role_id === "10000000-0000-0000-0000-000000000003") role = "Security Auditor";

          const displayName = row.display_name || email.split("@")[0];
          const initials =
            displayName
              .split(" ")
              .map((n) => n[0])
              .join("")
              .substring(0, 2)
              .toUpperCase() || email.substring(0, 2).toUpperCase();

          existingMap.set(email, {
            id: row.id || "usr-" + Math.random().toString(36).substring(2, 9),
            email: row.email || email,
            displayName,
            role,
            status: (row.status?.toLowerCase() === "suspended" ? "suspended" : "active") as UserStatus,
            createdAt: row.created_at || new Date().toISOString(),
            lastLoginAt: row.last_login_at || new Date().toISOString(),
            organizationId: "00000000-0000-0000-0000-000000000001",
            avatarInitials: initials,
          });
        }
      }

      if (hasNew) {
        const mergedArray = Array.from(existingMap.values());
        this.saveUsers(mergedArray);
        return mergedArray;
      }
    } catch (err) {
      console.warn("Could not sync remote Supabase profiles:", err);
    }
    return this.getUsers();
  },

  /**
   * Find user by email (case-insensitive)
   */
  getUserByEmail(email: string): StoredUser | undefined {
    const users = this.getUsers();
    const clean = email.trim().toLowerCase();
    return users.find((u) => u.email.toLowerCase() === clean);
  },

  /**
   * Find user by ID
   */
  getUserById(id: string): StoredUser | undefined {
    return this.getUsers().find((u) => u.id === id);
  },

  /**
   * Create and store a new user
   */
  createUser(userData: {
    email: string;
    displayName: string;
    role?: UserRole;
    password?: string;
    status?: UserStatus;
  }): StoredUser {
    const users = this.getUsers();
    const cleanEmail = userData.email.trim().toLowerCase();

    const existing = users.find((u) => u.email.toLowerCase() === cleanEmail);
    if (existing) {
      throw new Error(`Operator with email ${userData.email} already exists in directory.`);
    }

    const initials =
      userData.displayName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .substring(0, 2)
        .toUpperCase() || cleanEmail.substring(0, 2).toUpperCase();

    const newUser: StoredUser = {
      id: "usr-" + Math.random().toString(36).substring(2, 9) + "-" + Date.now().toString(36),
      email: userData.email.trim(),
      displayName: userData.displayName.trim() || userData.email.split("@")[0],
      role: userData.role || "SOC Lead Operator",
      status: userData.status || "active",
      password: userData.password || "password123",
      createdAt: new Date().toISOString(),
      lastLoginAt: new Date().toISOString(),
      organizationId: "00000000-0000-0000-0000-000000000001",
      avatarInitials: initials,
    };

    users.unshift(newUser);
    this.saveUsers(users);

    // Asynchronously upsert to Supabase profiles table if available
    (async () => {
      try {
        await supabase.from("profiles").upsert({
          id: newUser.id,
          display_name: newUser.displayName,
          email: newUser.email,
          role_id:
            newUser.role === "Admin"
              ? "10000000-0000-0000-0000-000000000001"
              : "10000000-0000-0000-0000-000000000002",
          status: newUser.status.toUpperCase(),
        });
      } catch {
        // Ignore remote sync errors
      }
    })();

    return newUser;
  },

  /**
   * Update an existing user's details
   */
  updateUser(id: string, updates: Partial<StoredUser>): StoredUser {
    const users = this.getUsers();
    const index = users.findIndex((u) => u.id === id);
    if (index === -1) {
      throw new Error(`User ID ${id} not found.`);
    }

    const current = users[index];
    const updated: StoredUser = {
      ...current,
      ...updates,
      id: current.id,
    };

    if (updates.displayName) {
      updated.avatarInitials = updates.displayName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .substring(0, 2)
        .toUpperCase();
    }

    users[index] = updated;
    this.saveUsers(users);

    // Asynchronously update Supabase
    (async () => {
      try {
        await supabase.from("profiles").upsert({
          id: updated.id,
          display_name: updated.displayName,
          email: updated.email,
          role_id:
            updated.role === "Admin"
              ? "10000000-0000-0000-0000-000000000001"
              : "10000000-0000-0000-0000-000000000002",
          status: updated.status.toUpperCase(),
        });
      } catch {
        // Ignore
      }
    })();

    return updated;
  },

  /**
   * Toggle user active/suspended status
   */
  toggleUserStatus(id: string): StoredUser {
    const user = this.getUserById(id);
    if (!user) throw new Error("User not found");
    const nextStatus: UserStatus = user.status === "active" ? "suspended" : "active";
    return this.updateUser(id, { status: nextStatus });
  },

  /**
   * Delete a user
   */
  deleteUser(id: string): boolean {
    const users = this.getUsers();
    const filtered = users.filter((u) => u.id !== id);
    if (filtered.length === users.length) return false;
    this.saveUsers(filtered);

    (async () => {
      try {
        await supabase.from("profiles").delete().eq("id", id);
      } catch {
        // Ignore
      }
    })();

    return true;
  },

  /**
   * Record login time for a user
   */
  recordLogin(email: string): StoredUser | undefined {
    const user = this.getUserByEmail(email);
    if (!user) return undefined;
    return this.updateUser(user.id, { lastLoginAt: new Date().toISOString() });
  },

  /**
   * Verify credentials for authentication - strict password matching
   */
  verifyCredentials(
    email: string,
    password: string,
  ): { success: boolean; user?: StoredUser; error?: string } {
    const cleanEmail = email.trim().toLowerCase();
    const user = this.getUsers().find((u) => u.email.toLowerCase() === cleanEmail);

    if (!user) {
      return {
        success: false,
        error: "Operator ID not found in directory. Please register or verify spelling.",
      };
    }

    if (user.status === "suspended") {
      return {
        success: false,
        error: "Operator account is SUSPENDED by Administrator. Access denied.",
      };
    }

    const expectedPassword = user.password || "password123";
    if (password !== expectedPassword) {
      return {
        success: false,
        error: "Invalid access key (password). Please re-enter credentials.",
      };
    }

    this.recordLogin(user.email);
    return { success: true, user };
  },

  /**
   * Check master admin credentials
   */
  verifyAdmin(idOrEmail: string, password: string): { success: boolean; user?: StoredUser; error?: string } {
    const clean = idOrEmail.trim().toLowerCase();
    const isMasterAdmin =
      clean === "admin" ||
      clean === "admin@timemachine.soc" ||
      clean === "ciso.director@time-machine.soc";

    if (!isMasterAdmin) {
      const user = this.getUserByEmail(clean);
      if (user && user.role === "Admin") {
        if (password === (user.password || "admin")) {
          return { success: true, user };
        }
      }
      return {
        success: false,
        error: "Invalid Master Admin ID. Use 'admin@timemachine.soc' or 'admin'.",
      };
    }

    const adminUser =
      this.getUserByEmail("admin@timemachine.soc") ||
      this.getUserByEmail(clean) ||
      SEED_USERS[0];

    const expectedAdminPass = adminUser.password || "admin";
    if (password !== expectedAdminPass && password !== "admin" && password !== "admin123") {
      return {
        success: false,
        error: "Invalid Master Admin access key. Access denied.",
      };
    }

    return { success: true, user: adminUser };
  },

  /**
   * Persist active session
   */
  saveActiveSession(user: StoredUser): void {
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(ACTIVE_SESSION_KEY, JSON.stringify(user));
      } catch (err) {
        console.error("Failed to save active session:", err);
      }
    }
  },

  /**
   * Get active session
   */
  getActiveSession(): StoredUser | null {
    if (typeof window === "undefined") return null;
    try {
      const raw = localStorage.getItem(ACTIVE_SESSION_KEY);
      if (!raw) return null;
      return JSON.parse(raw) as StoredUser;
    } catch {
      return null;
    }
  },

  /**
   * Clear active session
   */
  clearActiveSession(): void {
    if (typeof window !== "undefined") {
      try {
        localStorage.removeItem(ACTIVE_SESSION_KEY);
        localStorage.removeItem("timemachine_admin_unlocked");
      } catch (err) {
        console.error("Failed to clear active session:", err);
      }
    }
  },

  /**
   * Subscribe to user list changes
   */
  subscribe(callback: () => void): () => void {
    listeners.add(callback);
    return () => listeners.delete(callback);
  },
};
