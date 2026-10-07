import { createFileRoute } from "@tanstack/react-router";
import { SimulationLabView } from "@/components/simulation/SimulationLabView";
export const Route = createFileRoute("/simulation-lab")({
  head: () => ({ meta: [
    { title: "Simulation Lab — Incident Time Machine" },
    { name: "description", content: "Compare counterfactual incident response decisions in a safe simulation." },
    { property: "og:title", content: "Simulation Lab — Incident Time Machine" },
    { property: "og:description", content: "Compare counterfactual incident response decisions in a safe simulation." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ]}),
  component: SimulationLabView,
});
