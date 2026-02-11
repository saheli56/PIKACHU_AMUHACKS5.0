"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSimulation } from "@/context/SimulationContext";
import { scenarios } from "@/lib/scenarios";
import { ChoiceImpact } from "@/lib/types";
import ScenarioCard from "@/components/ScenarioCard";
import MetricsPanel from "@/components/MetricsPanel";

export default function SimulationPage() {
  const router = useRouter();
  const {
    currentScenarioIndex,
    metrics,
    worldState,
    isComplete,
    handleChoice,
    goToNextScenario,
  } = useSimulation();

  useEffect(() => {
    if (isComplete) {
      router.push("/results");
    }
  }, [isComplete, router]);

  const currentScenario = scenarios[currentScenarioIndex];

  if (!currentScenario) {
    return null;
  }

  const onChoice = (impact: ChoiceImpact) => {
    handleChoice(impact);
    goToNextScenario();
  };

  return (
    <div className="flex min-h-screen flex-col items-center bg-gray-50 px-4 py-12">
      <p className="mb-6 text-sm text-gray-500">
        Scenario {currentScenarioIndex + 1} of {scenarios.length}
      </p>
      <ScenarioCard scenario={currentScenario} onChoice={onChoice} />
      <div className="mt-8 w-full max-w-2xl">
        <MetricsPanel metrics={metrics} worldState={worldState} />
      </div>
    </div>
  );
}
