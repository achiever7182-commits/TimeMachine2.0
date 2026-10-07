import { createFileRoute } from "@tanstack/react-router";
import { DashboardView } from "@/components/dashboard/DashboardView";
export const Route = createFileRoute("/dashboard")({
  head: () => ({ meta: [
    { title: "Security Center — Incident Time Machine" },
    { name: "description", content: "Monitor organizational risk and active synthetic security incidents." },
    { property: "og:title", content: "Security Center — Incident Time Machine" },
    { property: "og:description", content: "Monitor organizational risk and active synthetic security incidents." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ]}),
  component: DashboardView,
});
