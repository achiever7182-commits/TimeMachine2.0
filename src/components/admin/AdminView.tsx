import React, { useState, useEffect, useMemo } from "react";
import {
  ShieldCheck,
  Users,
  UserPlus,
  ShieldAlert,
  Search,
  CheckCircle2,
  XCircle,
  MoreVertical,
  Trash2,
  Edit,
  KeyRound,
  RefreshCw,
  Download,
  Lock,
  Radio,
  Eye,
  EyeOff,
  Activity,
  UserCheck,
  AlertTriangle,
  UserX,
  FileSpreadsheet,
  Terminal,
} from "lucide-react";
import { userService, StoredUser, UserRole, UserStatus } from "@/services/userService";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const ROLE_COLORS: Record<UserRole, { badge: string; text: string; border: string }> = {
  Admin: {
    badge: "bg-red-500/10 text-red-400 border-red-500/30",
    text: "text-red-400",
    border: "border-red-500/30",
  },
  "SOC Lead Operator": {
    badge: "bg-cyan-500/10 text-cyan-300 border-cyan-500/30",
    text: "text-cyan-300",
    border: "border-cyan-500/30",
  },
  "Forensics Analyst": {
    badge: "bg-blue-500/10 text-blue-300 border-blue-500/30",
    text: "text-blue-300",
    border: "border-blue-500/30",
  },
  "Incident Responder": {
    badge: "bg-amber-500/10 text-amber-300 border-amber-500/30",
    text: "text-amber-300",
    border: "border-amber-500/30",
  },
  "Security Auditor": {
    badge: "bg-slate-500/10 text-slate-300 border-slate-500/30",
    text: "text-slate-300",
    border: "border-slate-500/30",
  },
};

export function AdminView() {
  const { user: currentAuthUser, storedUser, isAdmin, signInAdmin } = useAuth();

  // Admin gate authorization state
  const [adminId, setAdminId] = useState("admin@timemachine.soc");
  const [adminPassword, setAdminPassword] = useState("admin");
  const [showAdminPassword, setShowAdminPassword] = useState(false);
  const [adminError, setAdminError] = useState<string | null>(null);
  const [isAuthorizing, setIsAuthorizing] = useState(false);
  const [unlocked, setUnlocked] = useState<boolean>(() => {
    if (isAdmin) return true;
    if (typeof window !== "undefined") {
      return localStorage.getItem("timemachine_admin_unlocked") === "true";
    }
    return false;
  });

  // User management state
  const [users, setUsers] = useState<StoredUser[]>(() => userService.getUsers());
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("ALL");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");

  // Modals state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isResetKeyModalOpen, setIsResetKeyModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<StoredUser | null>(null);

  // Form states
  const [newDisplayName, setNewDisplayName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newRole, setNewRole] = useState<UserRole>("SOC Lead Operator");
  const [newPassword, setNewPassword] = useState("password123");
  const [newStatus, setNewStatus] = useState<UserStatus>("active");

  const [editDisplayName, setEditDisplayName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editRole, setEditRole] = useState<UserRole>("SOC Lead Operator");
  const [editStatus, setEditStatus] = useState<UserStatus>("active");

  const [newAccessKey, setNewAccessKey] = useState("");

  // Audit log mock items
  const [auditLogs, setAuditLogs] = useState<
    { id: string; time: string; event: string; user: string; status: "success" | "warn" | "danger" }[]
  >([
    {
      id: "log-1",
      time: "Just now",
      event: "ADMIN_PORTAL_ACCESSED",
      user: storedUser?.email || "admin@timemachine.soc",
      status: "success",
    },
    {
      id: "log-2",
      time: "10 mins ago",
      event: "OPERATOR_SESSION_AUTHENTICATED",
      user: "operator@time-machine.soc",
      status: "success",
    },
    {
      id: "log-3",
      time: "1 hour ago",
      event: "PRIVILEGED_CONFIG_INSPECTION",
      user: "ciso.director@time-machine.soc",
      status: "success",
    },
    {
      id: "log-4",
      time: "3 hours ago",
      event: "AUDIT_ACCOUNT_SUSPENDED",
      user: "guest.auditor@external.audit",
      status: "warn",
    },
  ]);

  // Sync users when store changes and on mount with Supabase database
  useEffect(() => {
    userService.syncWithSupabase().then((data) => {
      if (data && data.length > 0) setUsers(data);
    });

    const unsub = userService.subscribe(() => {
      setUsers(userService.getUsers());
    });
    return unsub;
  }, []);

  const handleResetDefaults = () => {
    const reset = userService.resetToDefaults();
    setUsers(reset);
    toast.success(`Restored all ${reset.length} preset security operators into directory.`);
  };

  const handleSyncDatabase = async () => {
    toast.info("Syncing with Supabase database profiles...");
    const syncd = await userService.syncWithSupabase();
    setUsers(syncd);
    toast.success(`Synchronized ${syncd.length} operators.`);
  };

  // Filtered users
  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      const matchesSearch =
        u.displayName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.role.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesRole = roleFilter === "ALL" || u.role === roleFilter;
      const matchesStatus = statusFilter === "ALL" || u.status === statusFilter;

      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [users, searchTerm, roleFilter, statusFilter]);

  // Stats calculation
  const stats = useMemo(() => {
    const total = users.length;
    const active = users.filter((u) => u.status === "active").length;
    const suspended = users.filter((u) => u.status === "suspended").length;
    const admins = users.filter((u) => u.role === "Admin").length;
    return { total, active, suspended, admins };
  }, [users]);

  // Admin authentication submit
  const handleAdminAuth = (e: React.FormEvent) => {
    e.preventDefault();
    setAdminError(null);
    setIsAuthorizing(true);

    const result = signInAdmin(adminId, adminPassword);
    if (result.success) {
      setUnlocked(true);
      if (typeof window !== "undefined") {
        localStorage.setItem("timemachine_admin_unlocked", "true");
      }
      toast.success("Master Admin Security Clearance Verified. Access granted.");
    } else {
      setAdminError(result.error || "Master Admin Authorization Failed.");
      toast.error(result.error || "Authorization rejected.");
    }
    setIsAuthorizing(false);
  };

  const handleQuickAuthorizeAdmin = () => {
    setAdminId("admin@timemachine.soc");
    setAdminPassword("admin");
    const result = signInAdmin("admin@timemachine.soc", "admin");
    if (result.success) {
      setUnlocked(true);
      if (typeof window !== "undefined") {
        localStorage.setItem("timemachine_admin_unlocked", "true");
      }
      toast.success("Master Admin Clearance Granted.");
    }
  };

  // Add User
  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!newEmail.trim()) {
        toast.error("Operator email is required.");
        return;
      }
      const created = userService.createUser({
        email: newEmail.trim(),
        displayName: newDisplayName.trim() || newEmail.split("@")[0],
        role: newRole,
        password: newPassword,
        status: newStatus,
      });

      setAuditLogs((prev) => [
        {
          id: "log-" + Date.now(),
          time: "Just now",
          event: "OPERATOR_ACCOUNT_CREATED",
          user: created.email,
          status: "success",
        },
        ...prev,
      ]);

      toast.success(`Operator ${created.displayName} created successfully.`);
      setIsAddModalOpen(false);
      setNewDisplayName("");
      setNewEmail("");
      setNewPassword("password123");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to create user.";
      toast.error(msg);
    }
  };

  // Edit User
  const handleOpenEdit = (user: StoredUser) => {
    setSelectedUser(user);
    setEditDisplayName(user.displayName);
    setEditEmail(user.email);
    setEditRole(user.role);
    setEditStatus(user.status);
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUser) return;
    try {
      const updated = userService.updateUser(selectedUser.id, {
        displayName: editDisplayName.trim(),
        email: editEmail.trim(),
        role: editRole,
        status: editStatus,
      });

      setAuditLogs((prev) => [
        {
          id: "log-" + Date.now(),
          time: "Just now",
          event: "OPERATOR_PROFILE_UPDATED",
          user: updated.email,
          status: "success",
        },
        ...prev,
      ]);

      toast.success(`Operator ${updated.displayName} updated.`);
      setIsEditModalOpen(false);
      setSelectedUser(null);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to update user.";
      toast.error(msg);
    }
  };

  // Toggle status
  const handleToggleStatus = (user: StoredUser) => {
    try {
      const next = userService.toggleUserStatus(user.id);
      const isNowActive = next.status === "active";

      setAuditLogs((prev) => [
        {
          id: "log-" + Date.now(),
          time: "Just now",
          event: isNowActive ? "OPERATOR_ACTIVATED" : "OPERATOR_SUSPENDED",
          user: user.email,
          status: isNowActive ? "success" : "warn",
        },
        ...prev,
      ]);

      toast[isNowActive ? "success" : "warning"](
        `Operator ${user.displayName} is now ${next.status.toUpperCase()}.`,
      );
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Status update failed.";
      toast.error(msg);
    }
  };

  // Delete User
  const handleDeleteUser = (user: StoredUser) => {
    if (user.email === "admin@timemachine.soc") {
      toast.error("Master Administrator account cannot be deleted.");
      return;
    }

    if (confirm(`Are you sure you want to permanently delete operator ${user.displayName} (${user.email})?`)) {
      userService.deleteUser(user.id);
      setAuditLogs((prev) => [
        {
          id: "log-" + Date.now(),
          time: "Just now",
          event: "OPERATOR_DELETED",
          user: user.email,
          status: "danger",
        },
        ...prev,
      ]);
      toast.info(`Operator ${user.displayName} removed from directory.`);
    }
  };

  // Reset Password Key
  const handleOpenResetKey = (user: StoredUser) => {
    setSelectedUser(user);
    setNewAccessKey("password123");
    setIsResetKeyModalOpen(true);
  };

  const handleSaveResetKey = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUser) return;
    try {
      userService.updateUser(selectedUser.id, {
        password: newAccessKey.trim(),
      });
      toast.success(`Access key updated for ${selectedUser.displayName}.`);
      setIsResetKeyModalOpen(false);
      setSelectedUser(null);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Key reset failed.";
      toast.error(msg);
    }
  };

  // Export Users JSON
  const handleExportUsers = () => {
    const dataStr =
      "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(users, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute(
      "download",
      `timemachine-users-${new Date().toISOString().split("T")[0]}.json`,
    );
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    toast.success("User Directory exported successfully.");
  };

  // If not unlocked / authorized as Admin, render high-tech security gate
  if (!unlocked) {
    return (
      <div className="flex min-h-[85vh] w-full items-center justify-center p-4">
        <div className="relative w-full max-w-md overflow-hidden rounded border border-red-500/40 bg-[#050B12]/95 p-6 sm:p-8 shadow-[0_0_60px_rgba(255,50,50,0.15)] backdrop-blur-2xl">
          {/* Tech corner brackets */}
          <div className="absolute left-0 top-0 size-4 border-l-2 border-t-2 border-red-500" />
          <div className="absolute right-0 top-0 size-4 border-r-2 border-t-2 border-red-500" />
          <div className="absolute bottom-0 left-0 size-4 border-b-2 border-l-2 border-red-500" />
          <div className="absolute bottom-0 right-0 size-4 border-b-2 border-r-2 border-red-500" />

          {/* Security Gate Header */}
          <div className="mb-6 space-y-2 border-b border-red-500/30 pb-4 text-center font-mono">
            <div className="mx-auto flex size-14 items-center justify-center rounded-full border border-red-500/50 bg-red-950/40 shadow-[0_0_25px_rgba(255,50,50,0.4)]">
              <ShieldAlert className="size-7 text-red-400 animate-pulse" />
            </div>
            <h2 className="text-lg font-bold tracking-[0.2em] text-red-400 uppercase">
              RESTRICTED // ADMIN CONSOLE
            </h2>
            <p className="text-[11px] tracking-wider text-slate-400 uppercase">
              Level 4 Master Security Clearance Required
            </p>
          </div>

          {/* Preset hint banner */}
          <div className="mb-6 rounded border border-red-500/20 bg-red-950/20 p-3 font-mono text-[11px] text-red-300/90">
            <div className="font-bold flex items-center gap-1.5 text-red-400">
              <Lock className="size-3.5" /> MASTER ADMIN CREDENTIALS:
            </div>
            <div className="mt-1 flex flex-col gap-0.5 text-slate-300">
              <span>
                ID: <strong className="text-red-300">admin@timemachine.soc</strong> (or{" "}
                <strong className="text-red-300">admin</strong>)
              </span>
              <span>
                Password: <strong className="text-red-300">admin</strong> (or{" "}
                <strong className="text-red-300">admin123</strong>)
              </span>
            </div>
          </div>

          {/* Admin Auth Form */}
          <form onSubmit={handleAdminAuth} className="space-y-4 font-mono">
            <div className="space-y-1.5">
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-300">
                ADMINISTRATOR ID
              </label>
              <input
                type="text"
                required
                value={adminId}
                onChange={(e) => setAdminId(e.target.value)}
                placeholder="admin@timemachine.soc"
                className="w-full rounded border border-red-500/30 bg-black/70 px-3.5 py-2.5 text-sm text-red-100 placeholder:text-slate-600 focus:border-red-400 focus:outline-none focus:ring-1 focus:ring-red-400"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-300">
                MASTER ACCESS KEY
              </label>
              <div className="relative">
                <input
                  type={showAdminPassword ? "text" : "password"}
                  required
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded border border-red-500/30 bg-black/70 px-3.5 py-2.5 pr-10 text-sm text-red-100 placeholder:text-slate-600 focus:border-red-400 focus:outline-none focus:ring-1 focus:ring-red-400"
                />
                <button
                  type="button"
                  onClick={() => setShowAdminPassword(!showAdminPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-red-400 p-1"
                >
                  {showAdminPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
            </div>

            {adminError && (
              <div className="rounded border border-red-500/50 bg-red-950/40 p-2.5 text-[11px] text-red-300 flex items-center gap-2">
                <AlertTriangle className="size-4 text-red-400 shrink-0" />
                <span>{adminError}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isAuthorizing}
              className="w-full rounded border border-red-400 bg-red-600/20 py-3 font-mono text-xs font-bold tracking-[0.2em] text-red-200 hover:bg-red-500 hover:text-white transition-all shadow-[0_0_20px_rgba(255,50,50,0.3)] cursor-pointer"
            >
              [ ◈ AUTHORIZE ADMIN ACCESS ]
            </button>

            <button
              type="button"
              onClick={handleQuickAuthorizeAdmin}
              className="w-full rounded border border-slate-700 bg-black/40 py-2 font-mono text-[11px] font-semibold text-slate-400 hover:text-white hover:border-slate-500 transition-colors cursor-pointer"
            >
              ⚡ QUICK UNLOCK AS MASTER ADMIN
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Admin Portal Main Dashboard View
  return (
    <div className="space-y-6">
      {/* Top Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border bg-sidebar/50 p-5 rounded-sm backdrop-blur-md">
        <div className="space-y-1">
          <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest text-red-400">
            <ShieldCheck className="size-4 text-red-400" />
            <span>COMMAND CONTROL // USER DIRECTORY & ACCESS MANAGEMENT</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white uppercase font-sans">
            SECURITY OPERATORS & USER DIRECTORY
          </h1>
          <p className="text-xs text-muted-foreground">
            Manage SOC analysts, forensic operators, clearance roles, active sessions, and credential security.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 font-mono">
          <Button
            onClick={() => setIsAddModalOpen(true)}
            className="h-9 bg-red-500/20 text-red-300 border border-red-500/40 hover:bg-red-500/30 hover:text-white rounded-sm text-xs font-bold cursor-pointer"
          >
            <UserPlus className="mr-1.5 size-3.5" />
            [ + REGISTER OPERATOR ]
          </Button>

          <Button
            onClick={handleSyncDatabase}
            variant="outline"
            className="h-9 border-cyan-500/30 bg-cyan-950/20 text-cyan-300 hover:bg-cyan-500/20 hover:text-white rounded-sm text-xs cursor-pointer"
          >
            <RefreshCw className="mr-1.5 size-3.5" />
            SYNC DB
          </Button>

          <Button
            onClick={handleResetDefaults}
            variant="outline"
            className="h-9 border-amber-500/30 bg-amber-950/20 text-amber-300 hover:bg-amber-500/20 hover:text-white rounded-sm text-xs cursor-pointer"
          >
            <ShieldAlert className="mr-1.5 size-3.5" />
            RELOAD PRESETS
          </Button>

          <Button
            onClick={handleExportUsers}
            variant="outline"
            className="h-9 border-border bg-black/40 text-xs rounded-sm hover:bg-secondary cursor-pointer"
          >
            <Download className="mr-1.5 size-3.5" />
            EXPORT JSON
          </Button>
        </div>
      </div>

      {/* Cyber HUD Statistics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 font-mono">
        <div className="rounded border border-border bg-card/60 p-4 backdrop-blur-sm">
          <div className="flex items-center justify-between text-xs text-muted-foreground uppercase">
            <span>TOTAL USERS</span>
            <Users className="size-4 text-cyan-signal" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-bold text-foreground">{stats.total}</span>
            <span className="text-[10px] text-cyan-signal uppercase tracking-wider">REGISTERED</span>
          </div>
        </div>

        <div className="rounded border border-emerald-500/30 bg-emerald-950/10 p-4 backdrop-blur-sm">
          <div className="flex items-center justify-between text-xs text-emerald-400 uppercase">
            <span>ACTIVE OPERATORS</span>
            <UserCheck className="size-4 text-emerald-400" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-bold text-emerald-300">{stats.active}</span>
            <span className="flex items-center gap-1 text-[10px] text-emerald-400">
              <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
              ONLINE / READY
            </span>
          </div>
        </div>

        <div className="rounded border border-red-500/30 bg-red-950/10 p-4 backdrop-blur-sm">
          <div className="flex items-center justify-between text-xs text-red-400 uppercase">
            <span>ADMINISTRATORS</span>
            <ShieldCheck className="size-4 text-red-400" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-bold text-red-300">{stats.admins}</span>
            <span className="text-[10px] text-red-400/80 uppercase">MASTER PRIVILEGE</span>
          </div>
        </div>

        <div className="rounded border border-amber-500/30 bg-amber-950/10 p-4 backdrop-blur-sm">
          <div className="flex items-center justify-between text-xs text-amber-400 uppercase">
            <span>SUSPENDED</span>
            <UserX className="size-4 text-amber-400" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-bold text-amber-300">{stats.suspended}</span>
            <span className="text-[10px] text-amber-400/80 uppercase">LOCKED OUT</span>
          </div>
        </div>
      </div>

      {/* Control Filters Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 rounded border border-border bg-sidebar/70 p-3 font-mono text-xs">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by operator alias, email, ID or role..."
            className="w-full rounded-sm border border-border bg-black/60 py-1.5 pl-9 pr-3 text-xs text-foreground placeholder:text-muted-foreground/60 focus:border-cyan-signal focus:outline-none"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Role Filter */}
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="rounded-sm border border-border bg-black/60 px-2.5 py-1.5 text-xs text-foreground focus:outline-none cursor-pointer"
          >
            <option value="ALL">ALL ROLES</option>
            <option value="Admin">ADMINISTRATOR</option>
            <option value="SOC Lead Operator">SOC LEAD OPERATOR</option>
            <option value="Forensics Analyst">FORENSICS ANALYST</option>
            <option value="Incident Responder">INCIDENT RESPONDER</option>
            <option value="Security Auditor">SECURITY AUDITOR</option>
          </select>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-sm border border-border bg-black/60 px-2.5 py-1.5 text-xs text-foreground focus:outline-none cursor-pointer"
          >
            <option value="ALL">ALL STATUSES</option>
            <option value="active">ACTIVE ONLY</option>
            <option value="suspended">SUSPENDED ONLY</option>
          </select>
        </div>
      </div>

      {/* User Directory Table */}
      <div className="overflow-hidden rounded border border-border bg-card/40 backdrop-blur-md">
        <div className="overflow-x-auto">
          <table className="w-full text-left font-sans text-xs">
            <thead className="border-b border-border bg-sidebar/80 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-4 py-3">OPERATOR / IDENTITY</th>
                <th className="px-4 py-3">EMAIL / IDENTIFIER</th>
                <th className="px-4 py-3">SECURITY ROLE</th>
                <th className="px-4 py-3">STATUS</th>
                <th className="px-4 py-3">LAST ACTIVE</th>
                <th className="px-4 py-3 text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-10 text-center font-mono text-muted-foreground">
                    NO OPERATORS FOUND MATCHING CURRENT FILTER CRITERIA
                  </td>
                </tr>
              ) : (
                filteredUsers.map((u) => {
                  const roleStyle = ROLE_COLORS[u.role] || ROLE_COLORS["SOC Lead Operator"];
                  const isCurrent =
                    currentAuthUser?.email?.toLowerCase() === u.email.toLowerCase() ||
                    storedUser?.id === u.id;

                  return (
                    <tr
                      key={u.id}
                      className="hover:bg-secondary/30 transition-colors group"
                    >
                      {/* Operator info */}
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="flex size-8 shrink-0 items-center justify-center rounded border border-border bg-black/60 font-mono text-xs font-bold text-cyan-signal">
                            {u.avatarInitials || u.displayName.substring(0, 2).toUpperCase()}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-foreground">{u.displayName}</span>
                              {isCurrent && (
                                <span className="rounded bg-cyan-500/20 px-1.5 py-0.2 text-[9px] font-mono font-bold text-cyan-300 border border-cyan-500/30">
                                  YOU
                                </span>
                              )}
                              {u.isDemo && (
                                <span className="rounded bg-slate-800 px-1.5 py-0.2 text-[9px] font-mono text-slate-400">
                                  DEMO SEED
                                </span>
                              )}
                            </div>
                            <span className="font-mono text-[10px] text-muted-foreground">
                              ID: {u.id}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Email */}
                      <td className="px-4 py-3 font-mono text-muted-foreground">
                        {u.email}
                      </td>

                      {/* Role Badge */}
                      <td className="px-4 py-3 font-mono">
                        <span
                          className={`inline-flex items-center gap-1 rounded px-2 py-0.5 text-[10px] font-bold uppercase border ${roleStyle.badge}`}
                        >
                          <ShieldCheck className="size-3" />
                          {u.role}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="px-4 py-3 font-mono">
                        {u.status === "active" ? (
                          <span className="inline-flex items-center gap-1.5 rounded bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold text-emerald-400 border border-emerald-500/20">
                            <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            ACTIVE
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 rounded bg-red-500/10 px-2 py-0.5 text-[10px] font-bold text-red-400 border border-red-500/20">
                            <span className="size-1.5 rounded-full bg-red-400" />
                            SUSPENDED
                          </span>
                        )}
                      </td>

                      {/* Last Active */}
                      <td className="px-4 py-3 font-mono text-[11px] text-muted-foreground">
                        {new Date(u.lastLoginAt).toLocaleDateString()} at{" "}
                        {new Date(u.lastLoginAt).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </td>

                      {/* Actions */}
                      <td className="px-4 py-3 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="size-7 rounded hover:bg-secondary cursor-pointer"
                            >
                              <MoreVertical className="size-3.5 text-muted-foreground" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent
                            align="end"
                            className="w-48 rounded border-border bg-sidebar font-mono text-xs"
                          >
                            <DropdownMenuLabel className="text-[10px] text-muted-foreground uppercase">
                              OPERATOR ACTIONS
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator className="bg-border" />

                            <DropdownMenuItem
                              onClick={() => handleOpenEdit(u)}
                              className="cursor-pointer"
                            >
                              <Edit className="mr-2 size-3.5 text-cyan-400" />
                              <span>Edit Profile</span>
                            </DropdownMenuItem>

                            <DropdownMenuItem
                              onClick={() => handleToggleStatus(u)}
                              className="cursor-pointer"
                            >
                              {u.status === "active" ? (
                                <>
                                  <UserX className="mr-2 size-3.5 text-amber-400" />
                                  <span>Suspend Account</span>
                                </>
                              ) : (
                                <>
                                  <UserCheck className="mr-2 size-3.5 text-emerald-400" />
                                  <span>Activate Account</span>
                                </>
                              )}
                            </DropdownMenuItem>

                            <DropdownMenuItem
                              onClick={() => handleOpenResetKey(u)}
                              className="cursor-pointer"
                            >
                              <KeyRound className="mr-2 size-3.5 text-blue-400" />
                              <span>Reset Access Key</span>
                            </DropdownMenuItem>

                            <DropdownMenuSeparator className="bg-border" />

                            <DropdownMenuItem
                              onClick={() => handleDeleteUser(u)}
                              className="text-destructive font-bold cursor-pointer"
                            >
                              <Trash2 className="mr-2 size-3.5 text-destructive" />
                              <span>Delete Operator</span>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Audit & Security Log */}
      <div className="rounded border border-border bg-sidebar/40 p-4 backdrop-blur-md">
        <div className="mb-3 flex items-center justify-between border-b border-border pb-2 font-mono text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5 font-bold uppercase text-foreground">
            <Activity className="size-3.5 text-cyan-signal" />
            REAL-TIME SECURITY & AUTHENTICATION AUDIT TRAIL
          </span>
          <span className="text-[10px] text-cyan-signal">LOG FEED ACTIVE</span>
        </div>

        <div className="space-y-2 font-mono text-xs">
          {auditLogs.map((log) => (
            <div
              key={log.id}
              className="flex items-center justify-between rounded border border-border/40 bg-black/40 px-3 py-2 text-[11px]"
            >
              <div className="flex items-center gap-3">
                <span
                  className={`size-1.5 rounded-full ${
                    log.status === "success"
                      ? "bg-emerald-400"
                      : log.status === "warn"
                        ? "bg-amber-400"
                        : "bg-red-400"
                  }`}
                />
                <span className="font-bold text-foreground">{log.event}</span>
                <span className="text-muted-foreground">// {log.user}</span>
              </div>
              <span className="text-muted-foreground/70">{log.time}</span>
            </div>
          ))}
        </div>
      </div>

      {/* MODAL: Register New Operator */}
      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent className="border-border bg-sidebar font-mono text-xs sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-sm font-bold uppercase text-foreground">
              <UserPlus className="size-4 text-cyan-signal" />
              REGISTER NEW SECURITY OPERATOR
            </DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground">
              Provision credentials and role clearance for SOC analysts and investigators.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleCreateUser} className="space-y-3.5 pt-2">
            <div className="space-y-1">
              <label className="block text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">
                DISPLAY NAME / CALLSIGN
              </label>
              <input
                type="text"
                required
                value={newDisplayName}
                onChange={(e) => setNewDisplayName(e.target.value)}
                placeholder="Forensics Analyst Taylor"
                className="w-full rounded border border-border bg-black/60 px-3 py-2 text-xs text-foreground focus:border-cyan-signal focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">
                OPERATOR ID (EMAIL)
              </label>
              <input
                type="email"
                required
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                placeholder="analyst.taylor@time-machine.soc"
                className="w-full rounded border border-border bg-black/60 px-3 py-2 text-xs text-foreground focus:border-cyan-signal focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="block text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">
                  SECURITY ROLE
                </label>
                <select
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value as UserRole)}
                  className="w-full rounded border border-border bg-black/60 px-3 py-2 text-xs text-foreground focus:outline-none"
                >
                  <option value="SOC Lead Operator">SOC Lead Operator</option>
                  <option value="Forensics Analyst">Forensics Analyst</option>
                  <option value="Incident Responder">Incident Responder</option>
                  <option value="Security Auditor">Security Auditor</option>
                  <option value="Admin">Administrator</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="block text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">
                  INITIAL STATUS
                </label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value as UserStatus)}
                  className="w-full rounded border border-border bg-black/60 px-3 py-2 text-xs text-foreground focus:outline-none"
                >
                  <option value="active">Active</option>
                  <option value="suspended">Suspended</option>
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">
                INITIAL ACCESS KEY (PASSWORD)
              </label>
              <input
                type="text"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="password123"
                className="w-full rounded border border-border bg-black/60 px-3 py-2 text-xs text-foreground focus:border-cyan-signal focus:outline-none"
              />
            </div>

            <DialogFooter className="pt-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsAddModalOpen(false)}
                className="rounded text-xs"
              >
                CANCEL
              </Button>
              <Button
                type="submit"
                className="bg-primary text-black hover:bg-cyan-300 font-bold rounded text-xs"
              >
                [ CREATE OPERATOR ]
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* MODAL: Edit Operator */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="border-border bg-sidebar font-mono text-xs sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-sm font-bold uppercase text-foreground">
              <Edit className="size-4 text-cyan-signal" />
              EDIT OPERATOR PROFILE
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSaveEdit} className="space-y-3.5 pt-2">
            <div className="space-y-1">
              <label className="block text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">
                DISPLAY NAME
              </label>
              <input
                type="text"
                required
                value={editDisplayName}
                onChange={(e) => setEditDisplayName(e.target.value)}
                className="w-full rounded border border-border bg-black/60 px-3 py-2 text-xs text-foreground focus:border-cyan-signal focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">
                OPERATOR ID (EMAIL)
              </label>
              <input
                type="email"
                required
                value={editEmail}
                onChange={(e) => setEditEmail(e.target.value)}
                className="w-full rounded border border-border bg-black/60 px-3 py-2 text-xs text-foreground focus:border-cyan-signal focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="block text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">
                  SECURITY ROLE
                </label>
                <select
                  value={editRole}
                  onChange={(e) => setEditRole(e.target.value as UserRole)}
                  className="w-full rounded border border-border bg-black/60 px-3 py-2 text-xs text-foreground focus:outline-none"
                >
                  <option value="Admin">Administrator</option>
                  <option value="SOC Lead Operator">SOC Lead Operator</option>
                  <option value="Forensics Analyst">Forensics Analyst</option>
                  <option value="Incident Responder">Incident Responder</option>
                  <option value="Security Auditor">Security Auditor</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="block text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">
                  ACCOUNT STATUS
                </label>
                <select
                  value={editStatus}
                  onChange={(e) => setEditStatus(e.target.value as UserStatus)}
                  className="w-full rounded border border-border bg-black/60 px-3 py-2 text-xs text-foreground focus:outline-none"
                >
                  <option value="active">Active</option>
                  <option value="suspended">Suspended</option>
                </select>
              </div>
            </div>

            <DialogFooter className="pt-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsEditModalOpen(false)}
                className="rounded text-xs"
              >
                CANCEL
              </Button>
              <Button
                type="submit"
                className="bg-primary text-black hover:bg-cyan-300 font-bold rounded text-xs"
              >
                [ SAVE CHANGES ]
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* MODAL: Reset Access Key */}
      <Dialog open={isResetKeyModalOpen} onOpenChange={setIsResetKeyModalOpen}>
        <DialogContent className="border-border bg-sidebar font-mono text-xs sm:max-w-sm">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-sm font-bold uppercase text-foreground">
              <KeyRound className="size-4 text-blue-400" />
              RESET OPERATOR ACCESS KEY
            </DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground">
              Configure a new password for {selectedUser?.displayName}.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSaveResetKey} className="space-y-3.5 pt-2">
            <div className="space-y-1">
              <label className="block text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">
                NEW ACCESS KEY / PASSWORD
              </label>
              <input
                type="text"
                required
                value={newAccessKey}
                onChange={(e) => setNewAccessKey(e.target.value)}
                placeholder="newPassword123"
                className="w-full rounded border border-border bg-black/60 px-3 py-2 text-xs text-foreground focus:border-cyan-signal focus:outline-none"
              />
            </div>

            <DialogFooter className="pt-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsResetKeyModalOpen(false)}
                className="rounded text-xs"
              >
                CANCEL
              </Button>
              <Button
                type="submit"
                className="bg-blue-600 text-white hover:bg-blue-500 font-bold rounded text-xs"
              >
                UPDATE KEY
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
