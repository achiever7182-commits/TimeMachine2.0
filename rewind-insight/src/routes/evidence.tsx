import { createFileRoute } from "@tanstack/react-router";
import { EvidenceView } from "@/components/evidence/EvidenceView";
export const Route = createFileRoute("/evidence")({
  head: () => ({ meta: [
    { title: "Evidence Viewer — Incident Time Machine" },
    { name: "description", content: "Review synthetic authentication, endpoint, network, cloud, and process evidence." },
    { property: "og:title", content: "Evidence Viewer — Incident Time Machine" },
    { property: "og:description", content: "Review synthetic authentication, endpoint, network, cloud, and process evidence." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ]}),
  component: EvidenceView,
});
