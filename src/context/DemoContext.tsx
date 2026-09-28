import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { getTimelineState } from "@/services/incidentService";

interface DemoContextValue {
  currentMinute: number;
  setCurrentMinute: (minute: number) => void;
  currentTime: string;
  currentRisk: string;
  affectedAssets: string[];
  isRewinding: boolean;
  rewindIncident: () => void;
  showMissed: boolean;
  revealMissed: () => void;
  demoStep: number;
  demoStage: string;
  isAttackRunning: boolean;
  startAttackSimulation: () => void;
  selectedSimulation: string;
  selectSimulation: (id: string) => void;
  isSimulating: boolean;
  runSimulation: () => void;
  simulationProgress: number;
  responseApproved: boolean;
  approveResponse: () => void;
  executionStep: number;
  resetDemo: () => void;
}

const DemoContext = createContext<DemoContextValue | undefined>(undefined);
const demoStages = ["Normal", "Suspicious Login", "Account Compromised", "Endpoint Compromised", "Lateral Movement", "Database Access", "Incident Detected"];

export function DemoProvider({ children }: { children: ReactNode }) {
  const [currentMinute, setCurrentMinuteState] = useState(42);
  const [isRewinding, setIsRewinding] = useState(false);
  const [showMissed, setShowMissed] = useState(false);
  const [demoStep, setDemoStep] = useState(6);
  const [isAttackRunning, setIsAttackRunning] = useState(false);
  const [selectedSimulation, setSelectedSimulation] = useState("disable-account");
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationProgress, setSimulationProgress] = useState(0);
  const [responseApproved, setResponseApproved] = useState(false);
  const [executionStep, setExecutionStep] = useState(0);

  const setCurrentMinute = useCallback((minute: number) => {
    setCurrentMinuteState(Math.max(0, Math.min(42, minute)));
  }, []);

  const rewindIncident = useCallback(() => {
    setIsRewinding(true);
    setShowMissed(false);
  }, []);

  useEffect(() => {
    if (!isRewinding) return;
    if (currentMinute <= 5) {
      setIsRewinding(false);
      return;
    }
    const id = window.setTimeout(() => setCurrentMinuteState((minute) => Math.max(5, minute - 3)), 120);
    return () => window.clearTimeout(id);
  }, [currentMinute, isRewinding]);

  const startAttackSimulation = useCallback(() => {
    setDemoStep(0);
    setIsAttackRunning(true);
    setCurrentMinute(0);
    setShowMissed(false);
  }, [setCurrentMinute]);

  useEffect(() => {
    if (!isAttackRunning) return;
    if (demoStep >= demoStages.length - 1) {
      setIsAttackRunning(false);
      setCurrentMinute(42);
      return;
    }
    const id = window.setTimeout(() => {
      setDemoStep((step) => step + 1);
      setCurrentMinuteState((minute) => Math.min(42, minute + 7));
    }, 850);
    return () => window.clearTimeout(id);
  }, [demoStep, isAttackRunning]);

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

  const approveResponse = useCallback(() => {
    setResponseApproved(true);
    setExecutionStep(0);
  }, []);

  useEffect(() => {
    if (!responseApproved) return;
    if (executionStep >= 5) return;
    const id = window.setTimeout(() => setExecutionStep((step) => step + 1), 640);
    return () => window.clearTimeout(id);
  }, [executionStep, responseApproved]);

  const timelineState = getTimelineState(currentMinute);

  const value = useMemo<DemoContextValue>(
    () => ({
      currentMinute,
      setCurrentMinute,
      currentTime: timelineState.current.time,
      currentRisk: timelineState.current.risk,
      affectedAssets: timelineState.current.assets,
      isRewinding,
      rewindIncident,
      showMissed,
      revealMissed: () => setShowMissed(true),
      demoStep,
      demoStage: demoStages[Math.min(demoStep, demoStages.length - 1)],
      isAttackRunning,
      startAttackSimulation,
      selectedSimulation,
      selectSimulation: setSelectedSimulation,
      isSimulating,
      runSimulation,
      simulationProgress,
      responseApproved,
      approveResponse,
      executionStep,
      resetDemo: () => {
        setCurrentMinute(42);
        setShowMissed(false);
        setResponseApproved(false);
        setExecutionStep(0);
        setSimulationProgress(0);
        setIsSimulating(false);
      },
    }),
    [currentMinute, setCurrentMinute, timelineState.current.time, timelineState.current.risk, timelineState.current.assets, isRewinding, rewindIncident, showMissed, demoStep, isAttackRunning, startAttackSimulation, selectedSimulation, isSimulating, simulationProgress, responseApproved, executionStep],
  );

  return <DemoContext.Provider value={value}>{children}</DemoContext.Provider>;
}

export function useDemo() {
  const context = useContext(DemoContext);
  if (!context) throw new Error("useDemo must be used inside DemoProvider");
  return context;
}
