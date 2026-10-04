import { createFileRoute } from "@tanstack/react-router";
import { TimeMachineView } from "@/components/incidents/TimeMachineView";
export const Route = createFileRoute("/time-machine")({
  head: () => ({
    meta: [
      { title: "INC-2048 Time Machine — Incident Time Machine" },
      {
        name: "description",
        content: "Rewind a credential compromise and reveal the earliest detection opportunity.",
      },
      { property: "og:title", content: "INC-2048 Time Machine — Incident Time Machine" },
      {
        property: "og:description",
        content: "Rewind a credential compromise and reveal the earliest detection opportunity.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: TimeMachineView,
});
