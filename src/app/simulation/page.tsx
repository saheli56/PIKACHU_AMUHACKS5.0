"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useSimulation } from "@/context/SimulationContext";
import { scenarios } from "@/lib/scenarios";
import { Choice, ChoiceImpact } from "@/lib/types";
import ScenarioCard from "@/components/ScenarioCard";
import ConsequenceCard from "@/components/ConsequenceCard";
import MetricsPanel from "@/components/MetricsPanel";
import MetricDelta from "@/components/MetricDelta";
import MilestonePopup from "@/components/MilestonePopup";
import ParticleBackground from "@/components/ParticleBackground";

// Scenario-specific gradient classes for atmospheric backgrounds
const scenarioGradients: Record<string, string> = {
  "queue-railway": "from-amber-50/40 via-stone-50 to-stone-50",
  "loud-phone": "from-blue-50/40 via-stone-50 to-stone-50",
  "litter-park": "from-green-50/40 via-stone-50 to-stone-50",
  "priority-seat": "from-violet-50/40 via-stone-50 to-stone-50",
  "street-vendor": "from-rose-50/40 via-stone-50 to-stone-50",
  "water-wastage": "from-cyan-50/40 via-stone-50 to-stone-50",
  "accident-witness": "from-slate-100/40 via-stone-50 to-stone-50",
  "community-meeting": "from-indigo-50/40 via-stone-50 to-stone-50",
};

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
  const [lastImpact, setLastImpact] = useState<ChoiceImpact | null>(null);
  const [showDelta, setShowDelta] = useState(false);
  const [showMilestone, setShowMilestone] = useState(false);
  const [milestoneType, setMilestoneType] = useState<"halfway" | "complete">(
    "halfway"
  );

  useEffect(() => {
    if (isComplete) {
      // Show completion milestone before navigating
      setMilestoneType("complete");
      setShowMilestone(true);
    }
  }, [isComplete]);

  const currentScenario = scenarios[currentScenarioIndex];
  const bgGradient =
    scenarioGradients[currentScenario?.id] ||
    "from-stone-50 via-stone-50 to-stone-50";

  if (!currentScenario && !isComplete) {
    return null;
  }

  const onChoice = (choice: Choice) => {
    if (choiceMade) return;
    setChoiceMade(true);
    setLastImpact(choice.impact);
    handleChoice(choice.id, choice.text, choice.impact, choice.consequence);

    // Show delta badges
    setTimeout(() => {
      setShowDelta(true);
    }, 200);

    // Then show consequence card
    setTimeout(() => {
      setCurrentConsequence(choice.consequence);
      setShowConsequence(true);
    }, 600);
  };

  const onContinue = () => {
    const nextIndex = currentScenarioIndex + 1;

    // Check for halfway milestone (after scenario 4, index 3)
    if (nextIndex === 4) {
      setMilestoneType("halfway");
      setShowMilestone(true);
      return;
    }

    advanceToNext();
  };

  const advanceToNext = useCallback(() => {
    setShowConsequence(false);
    setChoiceMade(false);
    setCurrentConsequence("");
    setLastImpact(null);
    setShowDelta(false);
    goToNextScenario();
  }, [goToNextScenario]);

  const handleMilestoneContinue = () => {
    setShowMilestone(false);

    if (milestoneType === "complete") {
      router.push("/results");
    } else {
      advanceToNext();
    }
  };

  const progress = (currentScenarioIndex / scenarios.length) * 100;

  return (
    <div
      className={`relative flex min-h-screen flex-col items-center bg-gradient-to-b ${bgGradient} px-4 py-8 transition-colors duration-1000`}
    >
      {/* Ambient particles */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <ParticleBackground variant="subtle" />
      </div>

      <div className="relative z-10 w-full max-w-2xl">
        {/* Progress bar — segmented */}
        <div className="mb-2">
          <div className="flex gap-1">
            {scenarios.map((_, i) => (
              <div
                key={i}
                className="h-1.5 flex-1 overflow-hidden rounded-full bg-stone-200/60"
              >
                <motion.div
                  className={`h-full rounded-full ${i < currentScenarioIndex
                      ? "bg-indigo-500"
                      : i === currentScenarioIndex
                        ? "bg-indigo-400"
                        : "bg-transparent"
                    }`}
                  initial={{ width: 0 }}
                  animate={{
                    width:
                      i < currentScenarioIndex
                        ? "100%"
                        : i === currentScenarioIndex
                          ? `${progress > 0 ? 50 : 0}%`
                          : "0%",
                  }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Scenario counter */}
        <motion.div
          key={currentScenarioIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-6 flex items-center justify-between"
        >
          <p className="text-xs font-medium tracking-wider text-stone-400">
            Scenario {currentScenarioIndex + 1}{" "}
            <span className="text-stone-300">of</span> {scenarios.length}
          </p>
          <p className="text-xs font-medium text-stone-400">
            {Math.round(((currentScenarioIndex) / scenarios.length) * 100)}%
            complete
          </p>
        </motion.div>

        {/* Main content area */}
        <AnimatePresence mode="wait">
          {!showConsequence ? (
            currentScenario && (
              <ScenarioCard
                key={`scenario-${currentScenarioIndex}`}
                scenario={currentScenario}
                onChoice={onChoice}
                disabled={choiceMade}
              />
            )
          ) : (
            <div key={`consequence-${currentScenarioIndex}`}>
              {/* Metric deltas */}
              {lastImpact && (
                <MetricDelta impact={lastImpact} show={showDelta} />
              )}
              <ConsequenceCard
                consequence={currentConsequence}
                onContinue={onContinue}
                impact={lastImpact}
              />
            </div>
          )}
        </AnimatePresence>

        {/* Metrics panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-8"
        >
          <MetricsPanel metrics={metrics} worldState={worldState} compact />
        </motion.div>
      </div>

      {/* Milestone popup */}
      <MilestonePopup
        show={showMilestone}
        type={milestoneType}
        onContinue={handleMilestoneContinue}
      />
    </div>
  );
}
