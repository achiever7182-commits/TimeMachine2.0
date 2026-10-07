import { createFileRoute } from "@tanstack/react-router";
import { SettingsView } from "@/components/SettingsView";
export const Route = createFileRoute("/settings")({
  head: () => ({ meta: [
    { title: "Settings — Incident Time Machine" },
    { name: "description", content: "Configure the synthetic Incident Time Machine demonstration." },
    { property: "og:title", content: "Settings — Incident Time Machine" },
    { property: "og:description", content: "Configure the synthetic Incident Time Machine demonstration." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ]}),
  component: SettingsView,
});
