import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  HeadContent,
  Link,
  Outlet,
  Scripts,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { AppShell } from "@/components/layout/AppShell";
import { IrisVoiceLauncher } from "@/components/ai-copilot/IrisVoiceLauncher";
import { DemoProvider } from "@/context/DemoContext";
import { AuthProvider } from "@/context/AuthContext";
import { AuthGuard } from "@/components/auth/AuthGuard";
import { TelemetryProvider } from "@/telemetry/context/TelemetryContext";
import appCss from "../styles.css?url";
import { reportError } from "../lib/error-reporting";
function NotFoundComponent() {
  return (
    <div className="grid min-h-screen place-items-center bg-background px-4">
      <div className="text-center">
        <p className="font-mono text-cyan-signal">404</p>
        <h1 className="mt-2 text-3xl font-semibold">Signal not found</h1>
        <p className="mt-2 text-muted-foreground">
          This view is outside the reconstructed timeline.
        </p>
        <Button asChild className="mt-6">
          <Link to="/">Return home</Link>
        </Button>
      </div>
    </div>
  );
}
function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter();
  useEffect(() => reportError(error, { boundary: "incident_time_machine" }), [error]);
  return (
    <div className="grid min-h-screen place-items-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold">Something went wrong while loading this view.</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          The demo is safe. Retry the view or return to the dashboard.
        </p>
        <div className="mt-6 flex justify-center gap-2">
          <Button
            onClick={() => {
              router.invalidate();
              reset();
            }}
          >
            Try again
          </Button>
          <Button asChild variant="outline">
            <Link to="/dashboard">Dashboard</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Incident Time Machine | AI Incident Response" },
      {
        name: "description",
        content:
          "AI-powered incident response with incident reconstruction and counterfactual simulation.",
      },
      { name: "application-name", content: "Incident Time Machine" },
      { name: "theme-color", content: "#0a0f1a" },
      { property: "og:type", content: "website" },
      { property: "og:title", content: "Incident Time Machine | AI Incident Response" },
      {
        property: "og:description",
        content:
          "AI-powered incident response with incident reconstruction and counterfactual simulation.",
      },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Incident Time Machine | AI Incident Response" },
      {
        name: "twitter:description",
        content:
          "AI-powered incident response with incident reconstruction and counterfactual simulation.",
      },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600&display=swap",
      },
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});
function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}
function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <AuthGuard>
          <TelemetryProvider>
            <DemoProvider>
              {pathname === "/" ? (
                <Outlet />
              ) : (
                <AppShell>
                  <Outlet />
                </AppShell>
              )}
              <IrisVoiceLauncher />
            </DemoProvider>
          </TelemetryProvider>
        </AuthGuard>
      </AuthProvider>
    </QueryClientProvider>
  );
}
