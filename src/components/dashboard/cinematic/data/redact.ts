/**
 * Single redaction utility (N4). Redacts:
 *  - API-key-looking strings (sk-..., AKIA..., ghp_..., Bearer tokens, etc.)
 *  - `password=` / `pass=` / `secret=` / `token=` / `api_key=` query/form values
 *  - `-EncodedCommand` PowerShell payloads (entire value between quotes/braces)
 *  - Base64 blobs longer than 32 characters (A-Za-z0-9+/= only, no spaces)
 *  - `Authorization:` header values (any scheme)
 *  - Private IPs (10.x / 172.16-31.x / 192.168.x) when redactPrivateIps === true (opt-in)
 *  - JWTs (three base64url segments separated by dots)
 *  - Raw hex tokens >= 40 chars
 *
 * Unit-testable: all regexes are pure and order matters.
 */
export type RedactOptions = {
  replacement?: string;
  redactPrivateIps?: boolean;
  preserveLen?: boolean;
};

const DEFAULT_REPLACEMENT = "[REDACTED]";

const API_KEY_RE =
  /\b(?:sk-[A-Za-z0-9_-]{10,}|AKIA[0-9A-Z]{16}|ghp_[A-Za-z0-9]{20,}|github_pat_[A-Za-z0-9_]{20,}|xox[baprs]-[A-Za-z0-9-]{10,}|glpat-[A-Za-z0-9_-]{10,}|xox[a-z]-[A-Za-z0-9-]{10,}|eyJ[A-Za-z0-9_-]{8,}\.[A-Za-z0-9_-]{8,}\.[A-Za-z0-9_-]{8,})\b/g;

const AUTHZ_HEADER_RE = /(Authorization\s*:\s*)([^\s,;"']+\s+[^\s,;"']+|[^\s,;"']{16,})/gi;

const KEY_VALUE_RE =
  /((?:password|passwd|pass|secret|token|api[_-]?key|access[_-]?token|refresh[_-]?token|private[_-]?key|client[_-]?secret)\s*(?:=|:)\s*)([^\s;&'"`]{4,})/gi;

const ENCODED_CMD_RE = /(-EncodedCommand\s+)(["']?)([A-Za-z0-9+/=]{24,})(\2)/gi;

const BASE64_BLOB_RE = /\b[A-Za-z0-9+/=]{40,}\b/g;

const HEX_TOKEN_RE = /\b[0-9a-fA-F]{40,}\b/g;

const PRIVATE_IP_RE =
  /\b(?:10(?:\.\d{1,3}){3}|172\.(?:1[6-9]|2\d|3[01])(?:\.\d{1,3}){2}|192\.168(?:\.\d{1,3}){2})\b/g;

function replaceKeepingLen(src: string, replacement: string): string {
  return replacement
    .repeat(Math.max(1, Math.ceil(src.length / replacement.length)))
    .slice(0, src.length);
}

export function redact(input: string, opts: RedactOptions = {}): string {
  if (!input || typeof input !== "string") return input;
  const { replacement = DEFAULT_REPLACEMENT, redactPrivateIps = false, preserveLen = false } = opts;
  const rep = preserveLen ? (s: string) => replaceKeepingLen(s, "█") : () => replacement;

  let out = input;
  out = out.replace(
    AUTHZ_HEADER_RE,
    (_m, hdr) => `${hdr}${rep(typeof _m === "string" ? _m : "xxxxxxxx")}`,
  );
  out = out.replace(API_KEY_RE, (m) => rep(m));
  out = out.replace(
    ENCODED_CMD_RE,
    (_m, flag, q1) =>
      `${flag}${q1 ?? ""}${rep(typeof _m === "string" ? _m : "payload")}${q1 ?? ""}`,
  );
  out = out.replace(KEY_VALUE_RE, (_m, k) => `${k}${rep(typeof _m === "string" ? _m : "value")}`);
  out = out.replace(HEX_TOKEN_RE, (m) => rep(m));
  out = out.replace(BASE64_BLOB_RE, (m) => rep(m));
  if (redactPrivateIps) {
    out = out.replace(PRIVATE_IP_RE, (m) => rep(m));
  }
  return out;
}

export function redactCommand(command: string, opts?: RedactOptions): string {
  return redact(command, { ...opts, redactPrivateIps: true });
}
