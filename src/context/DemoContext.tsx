import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { demoIncident, demoTimelineEvents } from "@/data/incidentData";
import { getActualDigitalTwinState, getKnownSecurityState } from "@/services/digitalTwinService";
import { getAttackGraphAtTime } from "@/services/attackGraphService";
import {
  simulateCounterfactualFuture,
  getStandardResponseActions,
} from "@/services/counterfactualService";
import type { CounterfactualAction, CounterfactualBranch } from "@/types/counterfactual";
import { responseIntelligenceService } from "@/services/iris/responseIntelligenceService";
import type {
  ResponseCandidate,
  ResponseDecision,
  ResponseDecisionStatus,
  ResponseMode,
  ResponseRecommendation,
} from "@/types/responseIntelligence";
import {
  incidentReportService,
  type GenerateReportOptions,
} from "@/services/report/incidentReportService";
import type { IncidentReport, ReportStatus, ActionItemStatus } from "@/types/incidentReport";
import {
  getIncidentStateAtTime,
  minuteToTimestamp,
  timestampToMinute,
  type ReconstructedIncidentState,
} from "@/services/stateReconstruction";
import {
  getTickIntervalMs,
  loadLastSimulationTime,
  loadSimulationSpeed,
  saveLastSimulationTime,
  saveSimulationSpeed,
} from "@/services/simulationService";
import type { DigitalTwinSnapshot, TimelineBookmark, TimelineZoom } from "@/types/digitalTwin";
import type { Incident, IncidentStage, Severity } from "@/types/incident";

const DEFAULT_BOOKMARKS: TimelineBookmark[] = [
  {
    id: "bmk-0947",
    timestamp: "09:47",
    minute: 5,
    name: "First Detection Opportunity",
    description: "Anomalous authentication sequence with unfamiliar source IP and MFA fatigue.",
    createdAt: "2026-09-29T09:47:00Z",
  },
  {
    id: "bmk-1000",
    timestamp: "10:00",
    minute: 18,
    name: "Workstation Compromised",
    description: "alex.m interactive session established on LAPTOP-042.",
    createdAt: "2026-09-29T10:00:00Z",
  },
  {
    id: "bmk-1007",
    timestamp: "10:07",
    minute: 25,
    name: "Lateral Movement Begins",
    description:
      "Authenticated WinRM/SMB connection initiated to internal application server SERVER-03.",
    createdAt: "2026-09-29T10:07:00Z",
  },
  {
    id: "bmk-1012",
    timestamp: "10:12",
    minute: 30,
    name: "Database Access",
    description: "Privileged queries targeted customer identity records on DB-PROD-01.",
    createdAt: "2026-09-29T10:12:00Z",
  },
];

interface DemoContextValue {
  // Phase 1 Core State
  incident: Incident;
  incidentState: ReconstructedIncidentState;
  currentMinute: number;
  setCurrentMinute: (minute: number) => void;
  currentTime: string;
  setSimulationTime: (time: string) => void;
  currentRisk: Severity | string;
  affectedAssets: string[];
  compromisedAssets: string[];
  demoStage: string;
  incidentStage: IncidentStage;
  demoStep: number;

  // Simulation Controls
  isAttackRunning: boolean;
  isRunning: boolean;
  isPaused: boolean;
  simulationSpeed: number;
  setSimulationSpeed: (speed: number) => void;
  startAttackSimulation: () => void;
  pauseSimulation: () => void;
  resumeSimulation: () => void;
  toggleSimulation: () => void;
  resetDemo: () => void;

  // Step & Event Jump Navigation (Requirement 19)
  stepForward: () => void;
  stepBack: () => void;
  jumpToNextEvent: () => void;
  jumpToPreviousEvent: () => void;
  rewindToStart: () => void;
  goToDetection: () => void;

  // Rewind State & Controls
  isRewinding: boolean;
  rewindIncident: (targetMinute?: number) => void;
  showMissed: boolean;
  revealMissed: () => void;

  // Phase 2: Digital Twin & Forensic Controls
  digitalTwin: DigitalTwinSnapshot;
  knownSecurityState: DigitalTwinSnapshot;
  investigationMode: boolean;
  toggleInvestigationMode: () => void;
  setInvestigationMode: (enabled: boolean) => void;
  timelineZoom: TimelineZoom;
  setTimelineZoom: (zoom: TimelineZoom) => void;
  bookmarks: TimelineBookmark[];
  addBookmark: (name: string, description?: string) => void;
  removeBookmark: (id: string) => void;
  jumpToBookmark: (id: string) => void;

  // Selection & Inspector
  selectedEntityId: string | null;
  setSelectedEntityId: (id: string | null) => void;
  selectedEventId: string | null;
  setSelectedEventId: (id: string | null) => void;

  // Phase 3: Attack Graph & Path State
  attackGraph: import("@/types/attackGraph").AttackGraphState;
  selectedEdgeId: string | null;
  setSelectedEdgeId: (id: string | null) => void;
  highlightedPathId: string | null;
  setHighlightedPathId: (id: string | null) => void;
  clearHighlightedPath: () => void;

  // Counterfactual & Response Center (Phase 4 Working Branch Engine)
  selectedSimulation: string;
  selectSimulation: (id: string) => void;
  isSimulating: boolean;
  runSimulation: () => void;
  simulationProgress: number;
  responseApproved: boolean;
  executionStep: number;

  // Phase 4 Counterfactual Simulation Lab
  counterfactualBranch: CounterfactualBranch | null;
  activeAction: CounterfactualAction;
  setActiveAction: (action: CounterfactualAction) => void;
  availableActions: CounterfactualAction[];
  scenarioHistory: CounterfactualBranch[];
  simulateAction: (action?: CounterfactualAction) => void;
  selectBranch: (branchId: string) => void;
  isCounterfactualMode: boolean;
  enterCounterfactualMode: () => void;
  exitCounterfactualMode: () => void;
  approvedBranchId: string | null;
  approveBranch: (branchId: string) => void;

  // Phase 5 Extension: Response Intelligence & Autonomous Simulation
  responseMode: ResponseMode;
  setResponseMode: (mode: ResponseMode) => void;
  responseCandidates: ResponseCandidate[];
  responseRecommendation: ResponseRecommendation | null;
  responseDecision: ResponseDecision | null;
  responseSimulationStatus: ResponseDecisionStatus;
  evaluateResponses: () => ResponseCandidate[];
  recommendResponse: () => ResponseRecommendation;
  approveResponse: () => void;
  rejectResponse: () => void;
  simulateRecommendedResponse: () => void;
  autoSimulateResponse: () => void;

  // Phase 6: Incident Report & Post-Incident Learning
  currentReport: IncidentReport | null;
  generateReport: (options?: GenerateReportOptions) => IncidentReport;
  finalizeReport: () => IncidentReport;
  archiveReport: () => void;
  updateActionItemStatus: (actionItemId: string, status: ActionItemStatus) => void;
  reportStatus: ReportStatus;
}

const DemoContext = createContext<DemoContextValue | undefined>(undefined);

export function DemoProvider({ children }: { children: ReactNode }) {
  // Saved simulation time & speed
  const [currentMinute, setCurrentMinuteState] = useState<number>(() => {
    const saved = loadLastSimulationTime();
    return saved ? timestampToMinute(saved) : 42;
  });

  const [simulationSpeed, setSimulationSpeedState] = useState<number>(() => loadSimulationSpeed());
  const [isAttackRunning, setIsAttackRunning] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [isInitialReset, setIsInitialReset] = useState<boolean>(false);

  // Rewind & Counterfactual state
  const [isRewinding, setIsRewinding] = useState<boolean>(false);
  const [rewindTarget, setRewindTarget] = useState<number>(5);
  const [showMissed, setShowMissed] = useState<boolean>(false);
  const [selectedSimulation, setSelectedSimulation] = useState<string>("disable-account");
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [simulationProgress, setSimulationProgress] = useState<number>(0);
  const [responseApproved, setResponseApproved] = useState<boolean>(false);
  const [executionStep, setExecutionStep] = useState<number>(0);

  // Phase 2: Investigation Mode, Zoom, Bookmarks, and Selection
  const [investigationMode, setInvestigationModeState] = useState<boolean>(false);
  const [timelineZoom, setTimelineZoom] = useState<TimelineZoom>("INCIDENT");
  const [bookmarks, setBookmarks] = useState<TimelineBookmark[]>(() => {
    if (typeof window === "undefined") return DEFAULT_BOOKMARKS;
    try {
      const saved = localStorage.getItem("itm_timeline_bookmarks");
      return saved ? JSON.parse(saved) : DEFAULT_BOOKMARKS;
    } catch {
      return DEFAULT_BOOKMARKS;
    }
  });

  const [selectedEntityId, setSelectedEntityId] = useState<string | null>("LAPTOP-042");
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);

  // Phase 3: Attack Graph edge & path selection
  const [selectedEdgeId, setSelectedEdgeId] = useState<string | null>(null);
  const [highlightedPathId, setHighlightedPathId] = useState<string | null>(null);

  const clearHighlightedPath = useCallback(() => {
    setHighlightedPathId(null);
  }, []);

  // Phase 4: Counterfactual Simulation State
  const [isCounterfactualMode, setIsCounterfactualMode] = useState<boolean>(false);
  const [availableActions, setAvailableActions] = useState<CounterfactualAction[]>(
    () => getStandardResponseActions(22), // default to 10:04
  );
  const [activeAction, setActiveAction] = useState<CounterfactualAction>(() => {
    const actions = getStandardResponseActions(22);
    return actions[1]!; // default Option A: Isolate LAPTOP-042
  });
  const [counterfactualBranch, setCounterfactualBranch] = useState<CounterfactualBranch | null>(
    () => {
      const actions = getStandardResponseActions(22);
      return simulateCounterfactualFuture(22, actions[1]!);
    },
  );
  const [scenarioHistory, setScenarioHistory] = useState<CounterfactualBranch[]>(() => {
    const actions = getStandardResponseActions(22);
    const branch0 = simulateCounterfactualFuture(22, actions[0]!); // Do Nothing
    const branchA = simulateCounterfactualFuture(22, actions[1]!); // Isolate LAPTOP
    return [branch0, branchA];
  });
  const [approvedBranchId, setApprovedBranchId] = useState<string | null>(null);

  // Phase 5 Extension: Response Intelligence & Autonomous Simulation States
  const [responseMode, setResponseMode] = useState<ResponseMode>("IRIS_RECOMMEND");
  const [responseCandidates, setResponseCandidates] = useState<ResponseCandidate[]>(() =>
    responseIntelligenceService.evaluateCandidates(22),
  );
  const [responseRecommendation, setResponseRecommendation] =
    useState<ResponseRecommendation | null>(() =>
      responseIntelligenceService.generateRecommendation(22),
    );
  const [responseDecision, setResponseDecision] = useState<ResponseDecision | null>(null);
  const [responseSimulationStatus, setResponseSimulationStatus] =
    useState<ResponseDecisionStatus>("PROPOSED");

  // Phase 6: Incident Report & Learning State
  const [reportStatus, setReportStatus] = useState<ReportStatus>("DRAFT");
  const [currentReport, setCurrentReport] = useState<IncidentReport | null>(() =>
    incidentReportService.generateIncidentReport("INC-2048", { minute: 42, status: "DRAFT" }),
  );

  // Timer Ref
  const timerRef = useRef<number | null>(null);

  const clearSimulationTimer = useCallback(() => {
    if (timerRef.current !== null) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const setCurrentMinute = useCallback((minute: number) => {
    const bounded = Math.max(0, Math.min(42, Math.round(minute)));
    setIsInitialReset(false);
    setCurrentMinuteState(bounded);
    saveLastSimulationTime(minuteToTimestamp(bounded));
  }, []);

  const setSimulationTime = useCallback(
    (time: string) => {
      setCurrentMinute(timestampToMinute(time));
    },
    [setCurrentMinute],
  );

  const setSimulationSpeed = useCallback((speed: number) => {
    setSimulationSpeedState(speed);
    saveSimulationSpeed(speed);
  }, []);

  // Investigation Mode
  const setInvestigationMode = useCallback(
    (enabled: boolean) => {
      setInvestigationModeState(enabled);
      if (enabled) {
        clearSimulationTimer();
        setIsAttackRunning(false);
        setIsPaused(true);
      }
    },
    [clearSimulationTimer],
  );

  const toggleInvestigationMode = useCallback(() => {
    setInvestigationMode(!investigationMode);
  }, [investigationMode, setInvestigationMode]);

  // Bookmarks
  const addBookmark = useCallback(
    (name: string, description?: string) => {
      const newBookmark: TimelineBookmark = {
        id: `bmk-${Date.now()}`,
        timestamp: minuteToTimestamp(currentMinute),
        minute: currentMinute,
        name: name || `Bookmark at ${minuteToTimestamp(currentMinute)}`,
        description,
        createdAt: new Date().toISOString(),
      };
      setBookmarks((prev) => {
        const updated = [...prev, newBookmark].sort((a, b) => a.minute - b.minute);
        try {
          localStorage.setItem("itm_timeline_bookmarks", JSON.stringify(updated));
        } catch {
          // ignore
        }
        return updated;
      });
    },
    [currentMinute],
  );

  const removeBookmark = useCallback((id: string) => {
    setBookmarks((prev) => {
      const updated = prev.filter((b) => b.id !== id);
      try {
        localStorage.setItem("itm_timeline_bookmarks", JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
  }, []);

  const jumpToBookmark = useCallback(
    (id: string) => {
      const bookmark = bookmarks.find((b) => b.id === id);
      if (bookmark) {
        setCurrentMinute(bookmark.minute);
      }
    },
    [bookmarks, setCurrentMinute],
  );

  // Step Controls (Requirement 19)
  const stepForward = useCallback(() => {
    setCurrentMinute(Math.min(42, currentMinute + 1));
  }, [currentMinute, setCurrentMinute]);

  const stepBack = useCallback(() => {
    setCurrentMinute(Math.max(0, currentMinute - 1));
  }, [currentMinute, setCurrentMinute]);

  const jumpToNextEvent = useCallback(() => {
    const nextEvent = demoTimelineEvents.find((e) => (e.minute ?? 0) > currentMinute);
    if (nextEvent) {
      setCurrentMinute(nextEvent.minute ?? 42);
    } else {
      setCurrentMinute(42);
    }
  }, [currentMinute, setCurrentMinute]);

  const jumpToPreviousEvent = useCallback(() => {
    const prevEvents = demoTimelineEvents.filter((e) => (e.minute ?? 0) < currentMinute);
    if (prevEvents.length > 0) {
      const prev = prevEvents[prevEvents.length - 1]!;
      setCurrentMinute(prev.minute ?? 0);
    } else {
      setCurrentMinute(0);
    }
  }, [currentMinute, setCurrentMinute]);

  const rewindToStart = useCallback(() => {
    setCurrentMinute(0);
  }, [setCurrentMinute]);

  const goToDetection = useCallback(() => {
    setCurrentMinute(42);
  }, [setCurrentMinute]);

  // Reset Demo
  const resetDemo = useCallback(() => {
    clearSimulationTimer();
    setIsAttackRunning(false);
    setIsPaused(false);
    setIsInitialReset(true);
    setIsRewinding(false);
    setCurrentMinuteState(0);
    setShowMissed(false);
    setResponseApproved(false);
    setExecutionStep(0);
    setSimulationProgress(0);
    setIsSimulating(false);
    setInvestigationModeState(false);
    saveLastSimulationTime("09:42");
  }, [clearSimulationTimer]);

  // Start Attack Simulation
  const startAttackSimulation = useCallback(() => {
    clearSimulationTimer();
    setIsInitialReset(false);
    setCurrentMinuteState(0);
    setShowMissed(false);
    setResponseApproved(false);
    setExecutionStep(0);
    setSimulationProgress(0);
    setIsSimulating(false);
    setIsPaused(false);
    setInvestigationModeState(false);
    setIsAttackRunning(true);
    saveLastSimulationTime("09:42");
  }, [clearSimulationTimer]);

  // Pause Simulation
  const pauseSimulation = useCallback(() => {
    clearSimulationTimer();
    setIsAttackRunning(false);
    setIsPaused(true);
  }, [clearSimulationTimer]);

  // Resume Simulation
  const resumeSimulation = useCallback(() => {
    if (currentMinute >= 42) return;
    setIsPaused(false);
    setIsAttackRunning(true);
  }, [currentMinute]);

  const toggleSimulation = useCallback(() => {
    if (isAttackRunning) {
      pauseSimulation();
    } else {
      resumeSimulation();
    }
  }, [isAttackRunning, pauseSimulation, resumeSimulation]);

  // Timer Tick Effect
  useEffect(() => {
    if (!isAttackRunning) {
      clearSimulationTimer();
      return;
    }

    const intervalMs = getTickIntervalMs(simulationSpeed);

    timerRef.current = window.setInterval(() => {
      setCurrentMinuteState((prev) => {
        if (prev >= 42) {
          clearSimulationTimer();
          setIsAttackRunning(false);
          setIsPaused(false);
          saveLastSimulationTime("10:24");
          return 42;
        }
        const next = prev + 1;
        saveLastSimulationTime(minuteToTimestamp(next));
        return next;
      });
    }, intervalMs);

    return () => {
      clearSimulationTimer();
    };
  }, [isAttackRunning, simulationSpeed, clearSimulationTimer]);

  // Rewind Animation Effect
  const rewindIncident = useCallback(
    (targetMinute = 5) => {
      clearSimulationTimer();
      setIsAttackRunning(false);
      setIsPaused(false);
      setIsRewinding(true);
      setShowMissed(false);
      setRewindTarget(targetMinute);
    },
    [clearSimulationTimer],
  );

  useEffect(() => {
    if (!isRewinding) return;
    if (currentMinute <= rewindTarget) {
      setIsRewinding(false);
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setCurrentMinuteState((minute) => {
        const next = Math.max(rewindTarget, minute - 3);
        saveLastSimulationTime(minuteToTimestamp(next));
        return next;
      });
    }, 120);

    return () => window.clearTimeout(timeoutId);
  }, [currentMinute, isRewinding, rewindTarget]);

  // Preserved Counterfactual & Response Run Effects
  const runSimulation = useCallback(() => {
    setIsSimulating(true);
    setSimulationProgress(0);
    setResponseApproved(false);
    setExecutionStep(0);
  }, []);

  useEffect(() => {
    if (!isSimulating) return;
    if (simulationProgress >= 5) {
      setIsSimulating(false);
      return;
    }
    const id = window.setTimeout(() => setSimulationProgress((progress) => progress + 1), 620);
    return () => window.clearTimeout(id);
  }, [isSimulating, simulationProgress]);

  // Phase 4 Counterfactual Actions and Branch Management
  const simulateAction = useCallback(
    (actionToSimulate?: CounterfactualAction) => {
      const act = actionToSimulate || activeAction;
      setIsSimulating(true);
      setSimulationProgress(0);

      const branch = simulateCounterfactualFuture(currentMinute, act);
      setCounterfactualBranch(branch);
      setScenarioHistory((prev) => {
        const filtered = prev.filter(
          (b) => b.action.type !== act.type || b.baseMinute !== currentMinute,
        );
        return [...filtered, branch];
      });
      setIsCounterfactualMode(true);

      window.setTimeout(() => {
        setSimulationProgress(5);
        setIsSimulating(false);
      }, 350);
    },
    [activeAction, currentMinute],
  );

  const selectBranch = useCallback((branchId: string) => {
    setScenarioHistory((history) => {
      const found = history.find((b) => b.branchId === branchId);
      if (found) {
        setCounterfactualBranch(found);
        setActiveAction(found.action);
        setIsCounterfactualMode(true);
      }
      return history;
    });
  }, []);

  const enterCounterfactualMode = useCallback(() => {
    setIsCounterfactualMode(true);
  }, []);

  const exitCounterfactualMode = useCallback(() => {
    setIsCounterfactualMode(false);
  }, []);

  const approveBranch = useCallback((branchId: string) => {
    setApprovedBranchId(branchId);
    setResponseApproved(true);
  }, []);

  // Phase 5 Extension: Response Intelligence Callbacks
  const evaluateResponses = useCallback(() => {
    const candidates = responseIntelligenceService.evaluateCandidates(currentMinute);
    setResponseCandidates(candidates);
    return candidates;
  }, [currentMinute]);

  const recommendResponse = useCallback(() => {
    const rec = responseIntelligenceService.generateRecommendation(currentMinute);
    setResponseRecommendation(rec);
    setActiveAction(rec.recommendedAction);
    setResponseCandidates(responseIntelligenceService.evaluateCandidates(currentMinute));
    setResponseDecision({
      mode: responseMode,
      selectedAction: rec.recommendedAction,
      target: rec.target,
      status: "PROPOSED",
      approved: false,
      recommendationId: rec.id,
      timestamp: minuteToTimestamp(currentMinute),
    });
    setResponseSimulationStatus("PROPOSED");
    return rec;
  }, [currentMinute, responseMode]);

  const approveResponse = useCallback(() => {
    setResponseApproved(true);
    const rec =
      responseRecommendation || responseIntelligenceService.generateRecommendation(currentMinute);
    setResponseDecision((prev) =>
      prev
        ? { ...prev, status: "APPROVED", approved: true }
        : {
            mode: responseMode,
            selectedAction: rec.recommendedAction,
            target: rec.target,
            status: "APPROVED",
            approved: true,
            recommendationId: rec.id,
            timestamp: minuteToTimestamp(currentMinute),
          },
    );
    setResponseSimulationStatus("APPROVED");
  }, [responseRecommendation, responseMode, currentMinute]);

  const rejectResponse = useCallback(() => {
    setResponseApproved(false);
    setResponseDecision((prev) => (prev ? { ...prev, status: "REJECTED", approved: false } : null));
    setResponseSimulationStatus("REJECTED");
  }, []);

  const simulateRecommendedResponse = useCallback(() => {
    const rec =
      responseRecommendation || responseIntelligenceService.generateRecommendation(currentMinute);
    simulateAction(rec.recommendedAction);
    setResponseDecision({
      mode: responseMode,
      selectedAction: rec.recommendedAction,
      target: rec.target,
      status: "COMPLETED",
      approved: true,
      recommendationId: rec.id,
      timestamp: minuteToTimestamp(currentMinute),
      executedAt: new Date().toISOString(),
      branchId: `branch-${rec.recommendedAction.type.toLowerCase()}-${currentMinute}`,
    });
    setResponseSimulationStatus("COMPLETED");
  }, [responseRecommendation, currentMinute, responseMode, simulateAction]);

  const autoSimulateResponse = useCallback(() => {
    setResponseMode("AUTO_SIMULATE");
    setResponseSimulationStatus("SIMULATING");
    const { decision, branch, recommendation } =
      responseIntelligenceService.autoSimulate(currentMinute);

    setResponseRecommendation(recommendation);
    setResponseDecision(decision);
    setCounterfactualBranch(branch);
    setScenarioHistory((prev) => {
      const filtered = prev.filter(
        (b) => b.action.type !== branch.action.type || b.baseMinute !== currentMinute,
      );
      return [...filtered, branch];
    });
    setIsCounterfactualMode(true);
    setApprovedBranchId(branch.branchId);
    setResponseApproved(true);
    setResponseSimulationStatus("COMPLETED");
  }, [currentMinute]);

  // Phase 6: Report Generation Callbacks
  const generateReport = useCallback(
    (options?: GenerateReportOptions) => {
      const rpt = incidentReportService.generateIncidentReport("INC-2048", {
        minute: options?.minute ?? currentMinute,
        status: options?.status ?? reportStatus,
        selectedAction: options?.selectedAction ?? activeAction,
      });
      setCurrentReport(rpt);
      if (options?.status) {
        setReportStatus(options.status);
      }
      return rpt;
    },
    [currentMinute, reportStatus, activeAction],
  );

  const finalizeReport = useCallback(() => {
    const finalized = incidentReportService.finalizeReport("INC-2048", currentReport || undefined);
    setCurrentReport(finalized);
    setReportStatus("FINAL");
    return finalized;
  }, [currentReport]);

  const archiveReport = useCallback(() => {
    const archived = incidentReportService.archiveReport("INC-2048");
    if (archived) {
      setCurrentReport(archived);
      setReportStatus("ARCHIVED");
    }
  }, []);

  const updateActionItemStatus = useCallback((actionItemId: string, status: ActionItemStatus) => {
    incidentReportService.updateActionItemStatus("INC-2048", actionItemId, status);
    setCurrentReport((prev) => {
      if (!prev) return prev;
      const updated = prev.actionItems.map((item) =>
        item.id === actionItemId ? { ...item, status } : item,
      );
      return {
        ...prev,
        actionItems: updated,
      };
    });
  }, []);

  // Sync available actions & response evaluation whenever currentMinute changes (e.g., historical rewind)
  useEffect(() => {
    const actions = getStandardResponseActions(currentMinute);
    setAvailableActions(actions);
    const candidates = responseIntelligenceService.evaluateCandidates(currentMinute);
    setResponseCandidates(candidates);
    const rec = responseIntelligenceService.generateRecommendation(currentMinute);
    setResponseRecommendation(rec);
  }, [currentMinute]);

  useEffect(() => {
    if (!responseApproved) return;
    if (executionStep >= 5) return;
    const id = window.setTimeout(() => setExecutionStep((step) => step + 1), 640);
    return () => window.clearTimeout(id);
  }, [executionStep, responseApproved]);

  // Digital Twin Actual State (Single Source of Truth)
  const digitalTwin = useMemo<DigitalTwinSnapshot>(() => {
    return getActualDigitalTwinState(currentMinute);
  }, [currentMinute]);

  // Digital Twin Known Security State (SOC view)
  const knownSecurityState = useMemo<DigitalTwinSnapshot>(() => {
    return getKnownSecurityState(currentMinute);
  }, [currentMinute]);

  // Phase 3: Attack Graph State (Derived from central simulation time & Digital Twin)
  const attackGraph = useMemo(() => {
    return getAttackGraphAtTime("INC-2048", currentMinute);
  }, [currentMinute]);

  // Reconstructed Phase 1 incident state
  const incidentState = useMemo<ReconstructedIncidentState>(() => {
    return getIncidentStateAtTime(currentMinute, {
      isInitialReset,
      isContained: responseApproved && executionStep >= 5,
    });
  }, [currentMinute, isInitialReset, responseApproved, executionStep]);

  // Single Source of Truth for INC-2048 Incident Model
  const incident = useMemo<Incident>(() => {
    return {
      ...demoIncident,
      currentSimulationTime: incidentState.timestamp,
      stage: incidentState.stage,
      severity: incidentState.risk,
      status: incidentState.status,
      affectedAssetIds: incidentState.affectedAssetIds,
      affectedAssets: incidentState.affectedAssetIds.length,
    };
  }, [incidentState]);

  const currentTime = incidentState.timestamp;
  const currentRisk = incidentState.risk;
  const affectedAssets = incidentState.activeEvent?.assets ?? [
    ...incidentState.compromisedAssetIds,
  ];
  const demoStep = Math.min(6, Math.floor((currentMinute / 42) * 6));
  const demoStage = incidentState.stage;

  const value = useMemo<DemoContextValue>(
    () => ({
      incident,
      incidentState,
      currentMinute,
      setCurrentMinute,
      currentTime,
      setSimulationTime,
      currentRisk,
      affectedAssets,
      compromisedAssets: incidentState.compromisedAssetIds,
      demoStage,
      incidentStage: incidentState.stage,
      demoStep,
      isAttackRunning,
      isRunning: isAttackRunning,
      isPaused,
      simulationSpeed,
      setSimulationSpeed,
      startAttackSimulation,
      pauseSimulation,
      resumeSimulation,
      toggleSimulation,
      resetDemo,
      stepForward,
      stepBack,
      jumpToNextEvent,
      jumpToPreviousEvent,
      rewindToStart,
      goToDetection,
      isRewinding,
      rewindIncident,
      showMissed,
      revealMissed: () => setShowMissed(true),
      digitalTwin,
      knownSecurityState,
      investigationMode,
      toggleInvestigationMode,
      setInvestigationMode,
      timelineZoom,
      setTimelineZoom,
      bookmarks,
      addBookmark,
      removeBookmark,
      jumpToBookmark,
      selectedEntityId,
      setSelectedEntityId,
      selectedEventId,
      setSelectedEventId,
      attackGraph,
      selectedEdgeId,
      setSelectedEdgeId,
      highlightedPathId,
      setHighlightedPathId,
      clearHighlightedPath,
      selectedSimulation,
      selectSimulation: setSelectedSimulation,
      isSimulating,
      runSimulation,
      simulationProgress,
      responseApproved,
      executionStep,
      // Phase 4 Counterfactual
      counterfactualBranch,
      activeAction,
      setActiveAction,
      availableActions,
      scenarioHistory,
      simulateAction,
      selectBranch,
      isCounterfactualMode,
      enterCounterfactualMode,
      exitCounterfactualMode,
      approvedBranchId,
      approveBranch,
      // Phase 5 Extension: Response Intelligence
      responseMode,
      setResponseMode,
      responseCandidates,
      responseRecommendation,
      responseDecision,
      responseSimulationStatus,
      evaluateResponses,
      recommendResponse,
      approveResponse,
      rejectResponse,
      simulateRecommendedResponse,
      autoSimulateResponse,
      // Phase 6: Incident Report & Learning
      currentReport,
      generateReport,
      finalizeReport,
      archiveReport,
      updateActionItemStatus,
      reportStatus,
    }),
    [
      incident,
      incidentState,
      currentMinute,
      setCurrentMinute,
      currentTime,
      setSimulationTime,
      currentRisk,
      affectedAssets,
      demoStage,
      demoStep,
      isAttackRunning,
      isPaused,
      simulationSpeed,
      setSimulationSpeed,
      startAttackSimulation,
      pauseSimulation,
      resumeSimulation,
      toggleSimulation,
      resetDemo,
      stepForward,
      stepBack,
      jumpToNextEvent,
      jumpToPreviousEvent,
      rewindToStart,
      goToDetection,
      isRewinding,
      rewindIncident,
      showMissed,
      digitalTwin,
      knownSecurityState,
      attackGraph,
      investigationMode,
      toggleInvestigationMode,
      setInvestigationMode,
      timelineZoom,
      bookmarks,
      addBookmark,
      removeBookmark,
      jumpToBookmark,
      selectedEntityId,
      selectedEventId,
      selectedEdgeId,
      highlightedPathId,
      clearHighlightedPath,
      selectedSimulation,
      isSimulating,
      runSimulation,
      simulationProgress,
      responseApproved,
      executionStep,
      counterfactualBranch,
      activeAction,
      availableActions,
      scenarioHistory,
      simulateAction,
      selectBranch,
      isCounterfactualMode,
      enterCounterfactualMode,
      exitCounterfactualMode,
      approvedBranchId,
      approveBranch,
      responseMode,
      responseCandidates,
      responseRecommendation,
      responseDecision,
      responseSimulationStatus,
      evaluateResponses,
      recommendResponse,
      approveResponse,
      rejectResponse,
      simulateRecommendedResponse,
      autoSimulateResponse,
      currentReport,
      generateReport,
      finalizeReport,
      archiveReport,
      updateActionItemStatus,
      reportStatus,
    ],
  );

  return <DemoContext.Provider value={value}>{children}</DemoContext.Provider>;
}

export function useDemo() {
  const context = useContext(DemoContext);
  if (!context) throw new Error("useDemo must be used inside DemoProvider");
  return context;
}
