"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { RotateCcw } from "lucide-react";
import { useSimulation } from "@/context/SimulationContext";
import { determineProfile } from "@/lib/profiles";
import ProfileCard from "@/components/ProfileCard";
import ResultsRadarChart from "@/components/ResultsRadarChart";
import InsightSection from "@/components/InsightSection";
import JourneyTimeline from "@/components/JourneyTimeline";
import MetricsPanel from "@/components/MetricsPanel";

export default function ResultsPage() {
  const { metrics, worldState, choiceHistory, resetSimulation } =
    useSimulation();
  const router = useRouter();

  const profile = useMemo(
    () => determineProfile(metrics, worldState, choiceHistory),
    [metrics, worldState, choiceHistory]
  );

  const handleRestart = () => {
    resetSimulation();
    router.push("/");
  };

  return (
    <div className="flex min-h-screen flex-col items-center bg-stone-50 px-4 py-12">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-10 text-center"
        >
          <p className="mb-2 text-xs font-medium uppercase tracking-wider text-stone-400">
            Simulation Complete
          </p>
          <h1 className="mb-2 text-3xl font-bold tracking-tight text-stone-900">
            Your Civic Profile
          </h1>
          <p className="text-sm text-stone-500">
            Based on {choiceHistory.length} decisions across real-world
            scenarios
          </p>
        </motion.div>

        {/* Profile archetype */}
        <div className="mb-6">
          <ProfileCard profile={profile} />
        </div>

        {/* Radar chart */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mb-6 rounded-2xl border border-stone-200 bg-white p-6 shadow-sm"
        >
          <h3 className="mb-2 text-center text-base font-semibold text-stone-900">
            Behavioral Footprint
          </h3>
          <p className="mb-4 text-center text-xs text-stone-400">
            A complete view of your civic dimensions
          </p>
          <ResultsRadarChart metrics={metrics} worldState={worldState} />
        </motion.div>

        {/* The Good, The Bad, The Ugly */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mb-6 space-y-4"
        >
          <InsightSection
            type="good"
            title="The Good"
            items={profile.strengths}
          />
          <InsightSection
            type="bad"
            title="The Bad"
            items={profile.improvements}
          />
          <InsightSection
            type="ugly"
            title="The Ugly"
            items={profile.criticalInsights}
          />
        </motion.div>

        {/* Detailed metrics */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mb-6"
        >
          <MetricsPanel metrics={metrics} worldState={worldState} />
        </motion.div>

        {/* Journey timeline */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="mb-10"
        >
          <JourneyTimeline choices={choiceHistory} />
        </motion.div>

        {/* Restart button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.5 }}
          className="flex justify-center pb-8"
        >
          <button
            onClick={handleRestart}
            className="group flex cursor-pointer items-center gap-2 rounded-xl border border-stone-200 bg-white px-6 py-3 text-sm font-medium text-stone-700 shadow-sm transition-all hover:bg-stone-50 hover:shadow-md active:scale-[0.98]"
          >
            <RotateCcw className="h-4 w-4 text-stone-400 transition-transform group-hover:-rotate-45" />
            Start Over
          </button>
        </motion.div>
      </div>
    </div>
  );
}
