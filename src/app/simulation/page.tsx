"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useSimulation } from "@/context/SimulationContext";
import { scenarios } from "@/lib/scenarios";
import { Choice } from "@/lib/types";
import ScenarioCard from "@/components/ScenarioCard";
import ConsequenceCard from "@/components/ConsequenceCard";
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

  const [showConsequence, setShowConsequence] = useState(false);
  const [currentConsequence, setCurrentConsequence] = useState("");
  const [choiceMade, setChoiceMade] = useState(false);

  useEffect(() => {
    if (isComplete) {
      router.push("/results");
    }
  }, [isComplete, router]);

  const currentScenario = scenarios[currentScenarioIndex];

  if (!currentScenario) {
    return null;
  }

  const onChoice = (choice: Choice) => {
    if (choiceMade) return;
    setChoiceMade(true);
    handleChoice(choice.id, choice.text, choice.impact, choice.consequence);

    // Short delay then show consequence
    setTimeout(() => {
      setCurrentConsequence(choice.consequence);
      setShowConsequence(true);
    }, 300);
  };

  const onContinue = () => {
    setShowConsequence(false);
    setChoiceMade(false);
    setCurrentConsequence("");
    goToNextScenario();
  };

  const progress = ((currentScenarioIndex) / scenarios.length) * 100;

  return (
    <div className="flex min-h-screen flex-col items-center bg-stone-50 px-4 py-8">
      {/* Progress bar */}
      <div className="mb-2 w-full max-w-2xl">
        <div className="h-1 w-full overflow-hidden rounded-full bg-stone-200">
          <motion.div
            className="h-full rounded-full bg-indigo-500"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* Scenario counter */}
      <motion.p
        key={currentScenarioIndex}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mb-8 text-xs font-medium tracking-wider text-stone-400"
      >
        {currentScenarioIndex + 1} / {scenarios.length}
      </motion.p>

      {/* Main content area */}
      <AnimatePresence mode="wait">
        {!showConsequence ? (
          <ScenarioCard
            key={`scenario-${currentScenarioIndex}`}
            scenario={currentScenario}
            onChoice={onChoice}
            disabled={choiceMade}
          />
        ) : (
          <ConsequenceCard
            key={`consequence-${currentScenarioIndex}`}
            consequence={currentConsequence}
            onContinue={onContinue}
          />
        )}
      </AnimatePresence>

      {/* Metrics panel */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="mt-8 w-full max-w-2xl"
      >
        <MetricsPanel metrics={metrics} worldState={worldState} compact />
      </motion.div>
    </div>
  );
}
