import { createFileRoute } from "@tanstack/react-router";
import { useDemo } from "@/context/DemoContext";
import { LearningDashboard } from "@/components/reports/LearningDashboard";
import { useEffect } from "react";
import { RefreshCw } from "lucide-react";

import { incidentReportService } from "@/services/report/incidentReportService";

function LearningRouteComponent() {
  const { currentReport, generateReport, currentMinute } = useDemo();

  useEffect(() => {
    if (!currentReport) {
      generateReport();
    }
  }, [currentReport, generateReport]);

  const report =
    currentReport ||
    incidentReportService.generateIncidentReport("INC-2048", { minute: currentMinute });

  return (
    <div className="mx-auto max-w-7xl pb-16">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-white">
          Post-Incident Learning Dashboard
        </h1>
        <p className="text-sm text-muted-foreground">
          Systemic learnings, counterfactual damage prevention analysis, and strategic posture
          changes.
        </p>
      </div>
      <LearningDashboard report={report} />
    </div>
  );
}

export const Route = createFileRoute("/learning")({
  head: () => ({
    meta: [
      { title: "Post-Incident Learning — Incident Time Machine" },
      {
        name: "description",
        content: "Post-incident learning metrics, root cause, and damage prevention analysis.",
      },
    ],
  }),
  component: LearningRouteComponent,
});
