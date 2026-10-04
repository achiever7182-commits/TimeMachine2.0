import { createFileRoute } from "@tanstack/react-router";
import { ResponseCenterView } from "@/components/response/ResponseCenterView";
export const Route = createFileRoute("/response-center")({
  head: () => ({
    meta: [
      { title: "Response Center — Incident Time Machine" },
      {
        name: "description",
        content: "Review and approve a human-controlled simulated response plan.",
      },
      { property: "og:title", content: "Response Center — Incident Time Machine" },
      {
        property: "og:description",
        content: "Review and approve a human-controlled simulated response plan.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ResponseCenterView,
});
