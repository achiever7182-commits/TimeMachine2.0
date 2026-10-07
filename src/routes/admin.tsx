import { createFileRoute } from "@tanstack/react-router";
import { AdminView } from "@/components/admin/AdminView";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin Portal & User Directory — Incident Time Machine" },
      {
        name: "description",
        content: "Master Admin Console for managing user directory, credentials, and access control.",
      },
      { property: "og:title", content: "Admin Portal — Incident Time Machine" },
      {
        property: "og:description",
        content: "Master Admin Console for managing user directory, credentials, and access control.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AdminView,
});
