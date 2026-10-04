/**
 * Runtime error reporting utility.
 * Logs errors to the console in development; can be extended to forward
 * to a real observability service in production.
 */
export function reportError(error: unknown, context: Record<string, unknown> = {}): void {
  if (typeof window === "undefined") return;

  const message =
    error instanceof Response
      ? `Response ${error.status}${error.url ? ` at ${error.url}` : ""}`
      : error instanceof Error
        ? error.message
        : String(error);

  const stack = error instanceof Error ? error.stack : undefined;

  // Log for local debugging
  console.error("[incident-time-machine] Runtime error:", message, {
    ...context,
    ...(stack !== undefined && { stack }),
    route: window.location.pathname,
  });
}
