import { createFileRoute } from "@tanstack/react-router";
import { ReportView } from "@/components/reports/ReportView";
export const Route = createFileRoute("/reports")({
  head: () => ({ meta: [
    { title: "Incident Resolution Report — Incident Time Machine" },
    { name: "description", content: "Review the final credential compromise timeline, response, and lessons learned." },
    { property: "og:title", content: "Incident Resolution Report — Incident Time Machine" },
    { property: "og:description", content: "Review the final credential compromise timeline, response, and lessons learned." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ]}),
  component: ReportView,
});
