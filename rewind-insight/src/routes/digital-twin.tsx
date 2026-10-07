import { createFileRoute } from "@tanstack/react-router";
import { DigitalTwinView } from "@/components/digital-twin/DigitalTwinView";

export const Route = createFileRoute("/digital-twin")({
  head: () => ({
    meta: [
      { title: "Digital Twin — Incident Time Machine" },
      {
        name: "description",
        content: "Virtual temporal Digital Twin of the organization during incident INC-2048.",
      },
      { property: "og:title", content: "Digital Twin — Incident Time Machine" },
      {
        property: "og:description",
        content: "Virtual temporal Digital Twin of the organization during incident INC-2048.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: DigitalTwinView,
});
