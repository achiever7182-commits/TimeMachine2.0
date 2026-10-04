import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import {
  FileText,
  Printer,
  ShieldCheck,
  CheckCircle2,
  RefreshCw,
  GitBranch,
  BookOpen,
  ArrowRight,
  Layers,
  Sparkles,
  Lock,
  Archive,
  ChevronRight,
  AlertTriangle,
  Clock,
  Laptop,
  Server,
  Database,
  ShieldAlert,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDemo } from "@/context/DemoContext";
import { IncidentReportDoc } from "./IncidentReportDoc";
import { LearningDashboard } from "./LearningDashboard";
import type { IncidentReport } from "@/types/incidentReport";
import { incidentReportService } from "@/services/report/incidentReportService";

const REPORT_SECTIONS = [
  { id: "executive-summary", label: "Executive Summary" },
  { id: "classification", label: "Incident Classification" },
  { id: "timeline", label: "Forensic Timeline" },
  { id: "detection-gap", label: "Detection Gap Analysis" },
  { id: "attack-path", label: "Attack Path & Lateral Movement" },
  { id: "assets-users", label: "Affected Assets & Users" },
  { id: "what-defenders-knew", label: "What Defenders Knew" },
  { id: "actual-impact", label: "Actual Impact Assessment" },
  { id: "counterfactual", label: "Counterfactual Response Analysis" },
  { id: "response-comparison", label: "Response Comparison Matrix" },
  { id: "root-cause", label: "Root Cause Analysis" },
  { id: "what-we-missed", label: "What We Missed" },
  { id: "lessons-learned", label: "Lessons Learned" },
  { id: "recommendations", label: "Actionable Recommendations" },
  { id: "action-items", label: "Remediation Action Items" },
  { id: "evidence-ledger", label: "Evidence Ledger" },
];

export function ReportView() {
  const {
    currentReport,
    generateReport,
    finalizeReport,
    archiveReport,
    reportStatus,
    currentMinute,
  } = useDemo();
  const [activeTab, setActiveTab] = useState<"report" | "learning">("report");
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>("executive-summary");

  // If no report has been generated yet, automatically generate one based on current state
  useEffect(() => {
    if (!currentReport) {
      generateReport();
    }
  }, [currentReport, generateReport]);

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      generateReport();
      setIsGenerating(false);
    }, 350);
  };

  const handleRegenerateNewVersion = () => {
    setIsGenerating(true);
    setTimeout(() => {
      // Clear current finalized lock if forcing new version
      incidentReportService.clearFinalizedCache();
      generateReport({ status: "DRAFT" });
      setIsGenerating(false);
    }, 350);
  };

  const handleFinalize = () => {
    finalizeReport();
  };

  const handleArchive = () => {
    archiveReport();
  };

  const handlePrint = () => {
    window.print();
  };

  const report =
    currentReport ||
    incidentReportService.generateIncidentReport("INC-2048", { minute: currentMinute });

  return (
    <div className="mx-auto max-w-7xl animate-fade-in space-y-6 pb-16">
      {/* Top Banner / Controls (Hidden in Print) */}
      <div className="print:hidden space-y-4">
        {/* Navigation & Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border/70 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                INCIDENT REPORTING & POST-INCIDENT LEARNING · INC-2048
              </span>
              <span
                className={`font-mono text-[10px] px-2 py-0.5 rounded font-bold ${
                  reportStatus === "FINAL"
                    ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                    : reportStatus === "ARCHIVED"
                      ? "bg-purple-500/20 text-purple-300 border border-purple-500/30"
                      : "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                }`}
              >
                {reportStatus === "FINAL"
                  ? "STATUS: FINAL (LOCKED)"
                  : reportStatus === "ARCHIVED"
                    ? "STATUS: ARCHIVED"
                    : "STATUS: DRAFT"}
              </span>
              {report && (
                <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-secondary/50 text-muted-foreground border border-border/60">
                  v{report.version}
                </span>
              )}
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-white mt-1">
              Incident Resolution Report & Post-Mortem
            </h1>
            <p className="text-sm text-muted-foreground">
              Deterministic synthesis of forensic timeline, digital twin telemetry, counterfactual
              simulation, and root-cause analysis.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            {reportStatus === "FINAL" || reportStatus === "ARCHIVED" ? (
              <Button
                variant="outline"
                size="sm"
                onClick={handleRegenerateNewVersion}
                disabled={isGenerating}
                className="font-mono text-xs gap-1.5 border-cyan-500/40 text-cyan-300 hover:bg-cyan-500/10"
                title="Create a new versioned report draft from current investigation state"
              >
                <RefreshCw
                  className={`size-3.5 ${isGenerating ? "animate-spin text-cyan-400" : ""}`}
                />
                {isGenerating ? "Regenerating..." : "Regenerate as New Version"}
              </Button>
            ) : (
              <Button
                variant="outline"
                size="sm"
                onClick={handleGenerate}
                disabled={isGenerating}
                className="font-mono text-xs gap-1.5"
                title="Generate incident report from current simulation snapshot"
              >
                <RefreshCw
                  className={`size-3.5 ${isGenerating ? "animate-spin text-cyan-400" : ""}`}
                />
                {isGenerating ? "Generating..." : "Generate Incident Report"}
              </Button>
            )}

            {reportStatus === "DRAFT" && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleFinalize}
                className="font-mono text-xs gap-1.5 border-emerald-500/40 text-emerald-400 hover:bg-emerald-500/10"
              >
                <CheckCircle2 className="size-3.5" />
                Finalize Report
              </Button>
            )}

            {reportStatus === "FINAL" && (
              <>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-mono font-medium">
                  <Lock className="size-3.5" />
                  Final Report
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleArchive}
                  className="font-mono text-xs gap-1.5 border-purple-500/40 text-purple-300 hover:bg-purple-500/10"
                >
                  <Archive className="size-3.5" />
                  Archive
                </Button>
              </>
            )}

            <Button
              size="sm"
              onClick={handlePrint}
              className="bg-cyan-600 hover:bg-cyan-500 text-white font-mono text-xs gap-1.5 shadow-md"
            >
              <Printer className="size-3.5" />
              Print / Save as PDF
            </Button>
          </div>
        </div>

        {/* View Switcher Tabs */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 rounded-lg bg-card/70 p-1 border border-border/80">
            <button
              onClick={() => setActiveTab("report")}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-md text-xs font-semibold transition-all ${
                activeTab === "report"
                  ? "bg-cyan-600 text-white shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <FileText className="size-3.5" />
              Incident Resolution Report
            </button>
            <button
              onClick={() => setActiveTab("learning")}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-md text-xs font-semibold transition-all ${
                activeTab === "learning"
                  ? "bg-cyan-600 text-white shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <BookOpen className="size-3.5" />
              Post-Incident Learning Dashboard
            </button>
          </div>

          {report && (
            <div className="hidden sm:flex items-center gap-3 text-xs font-mono text-muted-foreground">
              <span>
                Snapshot Minute:{" "}
                <strong className="text-foreground">T+{report.snapshotMinute}m</strong>
              </span>
              <span>•</span>
              <span>
                Generated:{" "}
                <strong className="text-foreground">{report.generatedAt.slice(11, 19)} UTC</strong>
              </span>
            </div>
          )}
        </div>

        {/* Step 33 — Compact Executive Dashboard Metrics Strip */}
        {report && activeTab === "report" && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-9 gap-2 pt-1 font-mono text-xs">
            <div className="rounded-lg border border-border/80 bg-background/60 p-2.5">
              <span className="text-[10px] text-muted-foreground uppercase block">Severity</span>
              <span className="font-bold text-rose-400">{report.severity}</span>
            </div>
            <div className="rounded-lg border border-border/80 bg-background/60 p-2.5">
              <span className="text-[10px] text-muted-foreground uppercase block">
                Detection Gap
              </span>
              <span className="font-bold text-amber-400">{report.detectionGap.delayMinutes}m</span>
            </div>
            <div className="rounded-lg border border-border/80 bg-background/60 p-2.5">
              <span className="text-[10px] text-muted-foreground uppercase block">Compromised</span>
              <span className="font-bold text-rose-400">
                {report.actualImpact.compromisedAssetsCount} Hosts
              </span>
            </div>
            <div className="rounded-lg border border-border/80 bg-background/60 p-2.5">
              <span className="text-[10px] text-muted-foreground uppercase block">
                Critical Assets
              </span>
              <span className="font-bold text-rose-400">
                {report.actualImpact.criticalAssetsAffected.length}
              </span>
            </div>
            <div className="rounded-lg border border-border/80 bg-background/60 p-2.5">
              <span className="text-[10px] text-muted-foreground uppercase block">Data Stores</span>
              <span className="font-bold text-cyan-400">
                {report.actualImpact.dataStoresAffected}
              </span>
            </div>
            <div className="rounded-lg border border-border/80 bg-background/60 p-2.5">
              <span className="text-[10px] text-muted-foreground uppercase block">Attack Path</span>
              <span className="font-bold text-foreground">{report.attackPath.hopsCount} Hops</span>
            </div>
            <div className="rounded-lg border border-border/80 bg-background/60 p-2.5">
              <span className="text-[10px] text-muted-foreground uppercase block">
                Earliest Opp
              </span>
              <span className="font-bold text-cyan-300">{report.firstDetectableOpportunity}</span>
            </div>
            <div className="rounded-lg border border-border/80 bg-background/60 p-2.5">
              <span className="text-[10px] text-muted-foreground uppercase block">Preventable</span>
              <span className="font-bold text-emerald-400">
                +{report.counterfactualAnalysis.preventedEvents.length} Stages
              </span>
            </div>
            <div className="rounded-lg border border-border/80 bg-background/60 p-2.5">
              <span className="text-[10px] text-muted-foreground uppercase block">Recommended</span>
              <span
                className="font-bold text-cyan-300 truncate block"
                title={report.responseAnalysis.recommendedAction.label}
              >
                Isolate Host
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Main Content Area */}
      {!report ? (
        <div className="rounded-xl border border-border/80 bg-card/40 p-12 text-center">
          <RefreshCw className="size-8 text-cyan-400 animate-spin mx-auto mb-3" />
          <p className="text-sm font-medium">Synthesizing deterministic incident report...</p>
        </div>
      ) : activeTab === "learning" ? (
        <LearningDashboard report={report} />
      ) : (
        /* Report View with Sidebar Table of Contents */
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sticky Sidebar Navigation (Desktop only, hidden in print) */}
          <aside className="hidden lg:block lg:col-span-1 print:hidden">
            <div className="sticky top-20 rounded-xl border border-border/80 bg-card/60 p-4 backdrop-blur-md space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-border/60">
                <Layers className="size-4 text-cyan-400" />
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-foreground">
                  Table of Contents
                </span>
              </div>

              <nav className="space-y-1 text-xs">
                {REPORT_SECTIONS.map((section) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    onClick={() => setActiveSection(section.id)}
                    className={`block px-2.5 py-1.5 rounded-md transition-colors ${
                      activeSection === section.id
                        ? "bg-cyan-500/15 text-cyan-300 font-semibold border-l-2 border-cyan-400"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/30"
                    }`}
                  >
                    {section.label}
                  </a>
                ))}
              </nav>

              <div className="pt-3 border-t border-border/60">
                <div className="text-[10px] font-mono text-muted-foreground">
                  REPORT ID: <span className="text-foreground">{report.id}</span>
                </div>
                <div className="text-[10px] font-mono text-muted-foreground mt-0.5">
                  VERSION: <span className="text-cyan-400 font-bold">v{report.version}</span>
                </div>
                <div className="text-[10px] font-mono text-muted-foreground mt-0.5">
                  CONFIDENCE:{" "}
                  <span className="text-emerald-400 font-bold">{report.confidence}</span>
                </div>
                <div className="text-[10px] font-mono text-muted-foreground mt-0.5">
                  CITATIONS:{" "}
                  <span className="text-cyan-400 font-bold">
                    {report.citations.length} Verified
                  </span>
                </div>
              </div>
            </div>
          </aside>

          {/* Full Report Document (Takes full width in print) */}
          <main className="lg:col-span-3 print:w-full print:p-0">
            <IncidentReportDoc report={report} />
          </main>
        </div>
      )}
    </div>
  );
}
