import { createFileRoute } from "@tanstack/react-router";
import { IncidentsView } from "@/components/incidents/IncidentsView";
export const Route = createFileRoute("/incidents")({
  head: () => ({ meta: [
    { title: "Active Incidents — Incident Time Machine" },
    { name: "description", content: "Investigate prioritized synthetic cybersecurity incidents." },
    { property: "og:title", content: "Active Incidents — Incident Time Machine" },
    { property: "og:description", content: "Investigate prioritized synthetic cybersecurity incidents." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ]}),
  component: IncidentsView,
});
