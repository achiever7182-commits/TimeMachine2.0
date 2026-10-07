/**
 * Local development mock for Supabase Auth and REST API endpoints.
 * Provides live, reachable HTTP endpoints for local operation when a remote
 * Supabase instance is not configured.
 */

function toBase64Url(str: string): string {
  if (typeof Buffer !== "undefined") {
    return Buffer.from(str).toString("base64url");
  }
  return btoa(str).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

export function createMockJwt(userId: string, email: string, displayName: string): string {
  const header = toBase64Url(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const now = Math.floor(Date.now() / 1000);
  const payload = toBase64Url(
    JSON.stringify({
      aud: "authenticated",
      exp: now + 60 * 60 * 24 * 7,
      sub: userId,
      email,
      phone: "",
      app_metadata: { provider: "email", providers: ["email"] },
      user_metadata: { display_name: displayName },
      role: "authenticated",
      aal: "aal1",
      amr: [{ method: "password", timestamp: now }],
      session_id: "00000000-0000-0000-0000-000000000002",
    }),
  );
  const signature = toBase64Url("mock_signature_for_local_development");
  return `${header}.${payload}.${signature}`;
}

export function createMockUser(userId: string, email: string, displayName: string) {
  const nowIso = new Date().toISOString();
  return {
    id: userId,
    aud: "authenticated",
    role: "authenticated",
    email: email || "operator@time-machine.soc",
    email_confirmed_at: "2026-01-01T00:00:00.000Z",
    phone: "",
    confirmed_at: "2026-01-01T00:00:00.000Z",
    last_sign_in_at: nowIso,
    app_metadata: {
      provider: "email",
      providers: ["email"],
    },
    user_metadata: {
      display_name: displayName || "Operator",
    },
    identities: [],
    created_at: "2026-01-01T00:00:00.000Z",
    updated_at: nowIso,
  };
}

export const MOCK_PROFILES = [
  {
    id: "usr-admin-01",
    organization_id: "00000000-0000-0000-0000-000000000001",
    display_name: "Master Security Admin",
    email: "admin@timemachine.soc",
    role_id: "10000000-0000-0000-0000-000000000001",
    status: "ACTIVE",
    last_login_at: new Date().toISOString(),
    created_at: "2026-01-01T08:00:00.000Z",
  },
  {
    id: "usr-demo-01",
    organization_id: "00000000-0000-0000-0000-000000000001",
    display_name: "SOC Lead Operator",
    email: "operator@time-machine.soc",
    role_id: "10000000-0000-0000-0000-000000000002",
    status: "ACTIVE",
    last_login_at: new Date().toISOString(),
    created_at: "2026-01-15T09:30:00.000Z",
  },
  {
    id: "usr-analyst-02",
    organization_id: "00000000-0000-0000-0000-000000000001",
    display_name: "Forensics Specialist Smith",
    email: "analyst.smith@time-machine.soc",
    role_id: "10000000-0000-0000-0000-000000000002",
    status: "ACTIVE",
    last_login_at: "2026-10-06T14:45:00.000Z",
    created_at: "2026-02-10T11:20:00.000Z",
  },
  {
    id: "usr-ciso-03",
    organization_id: "00000000-0000-0000-0000-000000000001",
    display_name: "CISO Director Vance",
    email: "ciso.director@time-machine.soc",
    role_id: "10000000-0000-0000-0000-000000000001",
    status: "ACTIVE",
    last_login_at: "2026-10-05T18:10:00.000Z",
    created_at: "2026-01-05T07:15:00.000Z",
  },
  {
    id: "usr-responder-04",
    organization_id: "00000000-0000-0000-0000-000000000001",
    display_name: "Incident Responder Chen",
    email: "responder.chen@time-machine.soc",
    role_id: "10000000-0000-0000-0000-000000000002",
    status: "ACTIVE",
    last_login_at: "2026-10-04T09:12:00.000Z",
    created_at: "2026-02-28T16:00:00.000Z",
  },
  {
    id: "usr-audit-05",
    organization_id: "00000000-0000-0000-0000-000000000001",
    display_name: "External Compliance Auditor",
    email: "guest.auditor@external.audit",
    role_id: "10000000-0000-0000-0000-000000000003",
    status: "SUSPENDED",
    last_login_at: "2026-09-28T10:00:00.000Z",
    created_at: "2026-03-01T12:00:00.000Z",
  },
];

export function createSessionPayload(email: string, displayName?: string) {
  const userId = "00000000-0000-0000-0000-000000000001";
  const name = displayName || email.split("@")[0] || "Operator";
  const token = createMockJwt(userId, email, name);
  return {
    access_token: token,
    token_type: "bearer",
    expires_in: 3600 * 24 * 7,
    expires_at: Math.floor(Date.now() / 1000) + 3600 * 24 * 7,
    refresh_token: "mock_refresh_token_" + Date.now(),
    user: createMockUser(userId, email, name),
  };
}

export function getCorsHeaders(originHeader?: string | null): Record<string, string> {
  const origin = originHeader || "*";
  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Credentials": "true",
    "Access-Control-Allow-Methods": "GET, POST, PUT, PATCH, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization, apikey, x-client-info, x-supabase-api-version, *",
  };
}

/**
 * Handles Web standard Request objects (Fetch API) for Nitro / SSR / TanStack Start.
 */
export async function handleMockSupabaseRequest(request: Request): Promise<Response | null> {
  const url = new URL(request.url);
  const pathname = url.pathname;

  if (!pathname.startsWith("/auth/v1") && !pathname.startsWith("/rest/v1")) {
    return null;
  }

  const cors = getCorsHeaders(request.headers.get("origin"));

  if (request.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: cors,
    });
  }

  // Auth endpoints
  if (pathname === "/auth/v1/token") {
    let body: Record<string, unknown> = {};
    try {
      body = (await request.json()) as Record<string, unknown>;
    } catch {
      // Empty or invalid body
    }
    const email = String(body["email"] || "operator@time-machine.soc");
    const session = createSessionPayload(email);
    return new Response(JSON.stringify(session), {
      status: 200,
      headers: { ...cors, "Content-Type": "application/json" },
    });
  }

  if (pathname === "/auth/v1/signup") {
    let body: Record<string, unknown> = {};
    try {
      body = (await request.json()) as Record<string, unknown>;
    } catch {
      // Empty or invalid body
    }
    const email = String(body["email"] || "operator@time-machine.soc");
    const data = (body["data"] as Record<string, unknown>) || {};
    const displayName = String(data["display_name"] || email.split("@")[0] || "Operator");
    const session = createSessionPayload(email, displayName);
    return new Response(JSON.stringify(session), {
      status: 200,
      headers: { ...cors, "Content-Type": "application/json" },
    });
  }

  if (pathname === "/auth/v1/user") {
    const user = createMockUser("00000000-0000-0000-0000-000000000001", "operator@time-machine.soc", "Operator");
    return new Response(JSON.stringify(user), {
      status: 200,
      headers: { ...cors, "Content-Type": "application/json" },
    });
  }

  if (pathname === "/auth/v1/logout") {
    return new Response(JSON.stringify({}), {
      status: 200,
      headers: { ...cors, "Content-Type": "application/json" },
    });
  }

  if (pathname === "/auth/v1/recover") {
    return new Response(JSON.stringify({}), {
      status: 200,
      headers: { ...cors, "Content-Type": "application/json" },
    });
  }

  // REST endpoints
  if (pathname === "/rest/v1/profiles") {
    if (request.method === "GET") {
      const isSingle = (request.headers.get("accept") || "").includes("vnd.pgrst.object+json");
      return new Response(JSON.stringify(isSingle ? MOCK_PROFILES[0] : MOCK_PROFILES), {
        status: 200,
        headers: { ...cors, "Content-Type": "application/json" },
      });
    }
    // UPSERT / POST
    return new Response(JSON.stringify([]), {
      status: 200,
      headers: { ...cors, "Content-Type": "application/json" },
    });
  }

  // Generic REST fallback for incidents / assets / etc.
  if (pathname.startsWith("/rest/v1/")) {
    return new Response(JSON.stringify([]), {
      status: 200,
      headers: { ...cors, "Content-Type": "application/json" },
    });
  }

  return null;
}

/**
 * Connect middleware for Vite dev server (Node.js runtime).
 */
export function handleMockSupabaseNode(
  req: { url?: string; method?: string; headers: Record<string, string | string[] | undefined>; on: (event: string, callback: (chunk?: unknown) => void) => void },
  res: { statusCode: number; setHeader: (name: string, value: string) => void; end: (chunk?: string) => void },
  next: () => void,
) {
  const url = new URL(req.url || "/", `http://${req.headers["host"] || "localhost:8080"}`);
  const pathname = url.pathname;

  if (!pathname.startsWith("/auth/v1") && !pathname.startsWith("/rest/v1")) {
    return next();
  }

  // Set CORS headers
  const origin = (req.headers["origin"] as string) || "*";
  res.setHeader("Access-Control-Allow-Origin", origin);
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, apikey, x-client-info, x-supabase-api-version, *");

  if (req.method === "OPTIONS") {
    res.statusCode = 204;
    return res.end();
  }

  let bodyData = "";
  req.on("data", (chunk: unknown) => {
    bodyData += String(chunk);
  });

  req.on("end", () => {
    let body: Record<string, unknown> = {};
    try {
      body = bodyData ? JSON.parse(bodyData) : {};
    } catch {
      // Empty
    }

    res.setHeader("Content-Type", "application/json");

    if (pathname === "/auth/v1/token") {
      const email = String(body["email"] || "operator@time-machine.soc");
      const session = createSessionPayload(email);
      res.statusCode = 200;
      return res.end(JSON.stringify(session));
    }

    if (pathname === "/auth/v1/signup") {
      const email = String(body["email"] || "operator@time-machine.soc");
      const data = (body["data"] as Record<string, unknown>) || {};
      const displayName = String(data["display_name"] || email.split("@")[0] || "Operator");
      const session = createSessionPayload(email, displayName);
      res.statusCode = 200;
      return res.end(JSON.stringify(session));
    }

    if (pathname === "/auth/v1/user") {
      const user = createMockUser("00000000-0000-0000-0000-000000000001", "operator@time-machine.soc", "Operator");
      res.statusCode = 200;
      return res.end(JSON.stringify(user));
    }

    if (pathname === "/auth/v1/logout" || pathname === "/auth/v1/recover") {
      res.statusCode = 200;
      return res.end(JSON.stringify({}));
    }

    if (pathname === "/rest/v1/profiles") {
      if (req.method === "GET") {
        const acceptHeader = String(req.headers["accept"] || "");
        const isSingle = acceptHeader.includes("vnd.pgrst.object+json");
        res.statusCode = 200;
        return res.end(JSON.stringify(isSingle ? MOCK_PROFILES[0] : MOCK_PROFILES));
      }
      res.statusCode = 200;
      return res.end(JSON.stringify([]));
    }

    if (pathname.startsWith("/rest/v1/")) {
      res.statusCode = 200;
      return res.end(JSON.stringify([]));
    }

    next();
  });
}

