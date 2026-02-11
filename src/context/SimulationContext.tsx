"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";
import { Metrics, WorldState, ChoiceImpact, ChoiceRecord } from "@/lib/types";
import { applyImpact } from "@/lib/simulationEngine";
import { scenarios } from "@/lib/scenarios";

interface SimulationState {
  currentScenarioIndex: number;
  metrics: Metrics;
  worldState: WorldState;
  choiceHistory: ChoiceRecord[];
  isComplete: boolean;
  handleChoice: (choiceId: string, choiceText: string, choiceImpact: ChoiceImpact, consequence: string) => void;
  goToNextScenario: () => void;
  resetSimulation: () => void;
}

const initialMetrics: Metrics = {
  civicAwareness: 50,
  empathy: 50,
  socialTrust: 50,
  personalConvenience: 50,
};

const initialWorldState: WorldState = {
  publicPatience: 50,
  cleanlinessLevel: 50,
  cooperationLevel: 50,
};

const SimulationContext = createContext<SimulationState | undefined>(undefined);

export function SimulationProvider({ children }: { children: ReactNode }) {
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
  const [metrics, setMetrics] = useState<Metrics>(initialMetrics);
  const [worldState, setWorldState] = useState<WorldState>(initialWorldState);
  const [choiceHistory, setChoiceHistory] = useState<ChoiceRecord[]>([]);
  const [isComplete, setIsComplete] = useState(false);

  const handleChoice = useCallback(
    (choiceId: string, choiceText: string, choiceImpact: ChoiceImpact, consequence: string) => {
      const result = applyImpact(metrics, worldState, choiceImpact);
      setMetrics(result.metrics);
      setWorldState(result.worldState);

      const scenario = scenarios[currentScenarioIndex];
      setChoiceHistory((prev) => [
        ...prev,
        {
          scenarioId: scenario.id,
          scenarioTitle: scenario.title,
          choiceId,
          choiceText,
          consequence,
          impact: choiceImpact,
        },
      ]);
    },
    [metrics, worldState, currentScenarioIndex]
  );

  const goToNextScenario = useCallback(() => {
    setCurrentScenarioIndex((prev) => {
      const next = prev + 1;
      if (next >= scenarios.length) {
        setIsComplete(true);
      }
      return next;
    });
  }, []);

  const resetSimulation = useCallback(() => {
    setCurrentScenarioIndex(0);
    setMetrics(initialMetrics);
    setWorldState(initialWorldState);
    setChoiceHistory([]);
    setIsComplete(false);
  }, []);

  return (
    <SimulationContext.Provider
      value={{
        currentScenarioIndex,
        metrics,
        worldState,
        choiceHistory,
        isComplete,
        handleChoice,
        goToNextScenario,
        resetSimulation,
      }}
    >
      {children}
    </SimulationContext.Provider>
  );
}

export function useSimulation() {
  const context = useContext(SimulationContext);
  if (!context) {
    throw new Error("useSimulation must be used within a SimulationProvider");
  }
  return context;
}
