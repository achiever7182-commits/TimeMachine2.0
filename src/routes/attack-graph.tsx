import { createFileRoute } from "@tanstack/react-router";
import { AttackGraphPage } from "@/components/AttackGraphPage";
export const Route = createFileRoute("/attack-graph")({
  head: () => ({
    meta: [
      { title: "Attack Graph — Incident Time Machine" },
      {
        name: "description",
        content: "Explore the reconstructed attack path through affected assets.",
      },
      { property: "og:title", content: "Attack Graph — Incident Time Machine" },
      {
        property: "og:description",
        content: "Explore the reconstructed attack path through affected assets.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AttackGraphPage,
});
