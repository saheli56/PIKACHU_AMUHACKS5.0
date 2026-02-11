"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";
import { Metrics, WorldState, ChoiceImpact } from "@/lib/types";
import { applyImpact } from "@/lib/simulationEngine";
import { scenarios } from "@/lib/scenarios";

interface SimulationState {
  currentScenarioIndex: number;
  metrics: Metrics;
  worldState: WorldState;
  isComplete: boolean;
  handleChoice: (choiceImpact: ChoiceImpact) => void;
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
  const [isComplete, setIsComplete] = useState(false);

  const handleChoice = useCallback(
    (choiceImpact: ChoiceImpact) => {
      const result = applyImpact(metrics, worldState, choiceImpact);
      setMetrics(result.metrics);
      setWorldState(result.worldState);
    },
    [metrics, worldState]
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
    setIsComplete(false);
  }, []);

  return (
    <SimulationContext.Provider
      value={{
        currentScenarioIndex,
        metrics,
        worldState,
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
