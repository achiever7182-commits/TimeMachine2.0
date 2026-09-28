import { createFileRoute } from "@tanstack/react-router";
import { LandingPage } from "@/components/landing/LandingPage";
export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "Incident Time Machine — Rewind. Simulate. Respond." },
    { name: "description", content: "Explore an AI-powered incident response demo that reconstructs attacks and compares safer decisions before action." },
    { property: "og:title", content: "Incident Time Machine — Rewind. Simulate. Respond." },
    { property: "og:description", content: "Explore an AI-powered incident response demo that reconstructs attacks and compares safer decisions before action." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ]}),
  component: LandingPage,
});
