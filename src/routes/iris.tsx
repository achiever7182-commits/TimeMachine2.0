import { createFileRoute } from "@tanstack/react-router";
import { IrisCopilot } from "@/components/iris/IrisCopilot";

export const Route = createFileRoute("/iris")({
  head: () => ({
    meta: [
      { title: "IRIS Investigator — Incident Time Machine" },
      {
        name: "description",
        content: "Intelligent Response & Investigation System grounded in INC-2048 telemetry.",
      },
      { property: "og:title", content: "IRIS Investigator — Incident Time Machine" },
      {
        property: "og:description",
        content: "Intelligent Response & Investigation System grounded in INC-2048 telemetry.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: IrisViewPage,
});

function IrisViewPage() {
  return (
    <div className="mx-auto max-w-7xl animate-fade-in space-y-4">
      <IrisCopilot />
    </div>
  );
}
