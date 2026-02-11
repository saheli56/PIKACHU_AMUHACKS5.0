"use client";

import { useMemo, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { RotateCcw, Share2, Sparkles } from "lucide-react";
import { useSimulation } from "@/context/SimulationContext";
import { determineProfile } from "@/lib/profiles";
import ProfileCard from "@/components/ProfileCard";
import ResultsRadarChart from "@/components/ResultsRadarChart";
import InsightSection from "@/components/InsightSection";
import JourneyTimeline from "@/components/JourneyTimeline";
import MetricsPanel from "@/components/MetricsPanel";
import ParticleBackground from "@/components/ParticleBackground";
import ShareModal from "@/components/ShareModal";
import { useSound } from "@/hooks/useSound";
import confetti from "canvas-confetti";

export default function ResultsPage() {
  const { metrics, worldState, choiceHistory, resetSimulation } =
    useSimulation();
  const router = useRouter();

  const profile = useMemo(
    () => determineProfile(metrics, worldState, choiceHistory),
    [metrics, worldState, choiceHistory]
  );

  const { playCelebration } = useSound();

  // Celebration confetti + sound on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      playCelebration();
      confetti({
        particleCount: 80,
        spread: 100,
        origin: { y: 0.3 },
        colors: ["#6366f1", "#a78bfa", "#c084fc", "#34d399", "#fbbf24"],
      });
    }, 800);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [showShareModal, setShowShareModal] = useState(false);

  const handleRestart = () => {
    resetSimulation();
    router.push("/");
  };

  return (
    <div className="relative flex min-h-screen flex-col items-center bg-gradient-to-b from-indigo-50/30 via-stone-50 to-stone-50 px-4 py-12">
      {/* Ambient particles */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <ParticleBackground variant="celebration" />
      </div>

      <div className="relative z-10 w-full max-w-2xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-10 text-center"
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-2 text-xs font-semibold uppercase tracking-widest text-indigo-500"
          >
            Simulation Complete
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mb-2 text-4xl font-bold tracking-tight text-stone-900"
          >
            Your Civic Profile
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-sm text-stone-500"
          >
            Based on{" "}
            <span className="font-semibold text-stone-700">
              {choiceHistory.length} decisions
            </span>{" "}
            across real-world scenarios
          </motion.p>
        </motion.div>

        {/* Profile archetype — dramatic reveal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
          className="mb-6"
        >
          <ProfileCard profile={profile} />
        </motion.div>

        {/* Radar chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="mb-6 rounded-2xl border border-stone-200/60 bg-white/80 backdrop-blur-sm p-6 shadow-sm"
        >
          <h3 className="mb-2 text-center text-base font-bold text-stone-900">
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
          transition={{ delay: 1.0, duration: 0.6 }}
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
          transition={{ delay: 1.2, duration: 0.5 }}
          className="mb-6"
        >
          <MetricsPanel metrics={metrics} worldState={worldState} />
        </motion.div>

        {/* Journey timeline */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.5 }}
          className="mb-10"
        >
          <JourneyTimeline choices={choiceHistory} />
        </motion.div>

        {/* Share & Restart */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
          className="flex flex-col items-center gap-4 pb-8"
        >
          {/* Share section */}
          <div className="w-full rounded-2xl border border-indigo-100 bg-gradient-to-br from-indigo-50/50 to-purple-50/50 p-6 text-center">
            <Sparkles className="mx-auto mb-2 h-5 w-5 text-indigo-400" />
            <p className="mb-1 text-sm font-semibold text-stone-800">
              Share Your Civic Profile
            </p>
            <p className="mb-4 text-xs text-stone-500">
              Download a stunning card or share it with friends
            </p>
            <div className="flex justify-center gap-2">
              <button
                onClick={() => setShowShareModal(true)}
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 px-6 py-2.5 text-xs font-semibold text-white shadow-lg shadow-indigo-500/25 transition-all hover:shadow-xl hover:from-indigo-600 hover:to-purple-600 active:scale-[0.97] cursor-pointer"
              >
                <Share2 className="h-3.5 w-3.5" />
                Generate Share Card
              </button>
            </div>
          </div>

          {/* Restart */}
          <button
            onClick={handleRestart}
            className="group flex cursor-pointer items-center gap-2 rounded-xl border border-stone-200 bg-white/80 backdrop-blur-sm px-6 py-3 text-sm font-medium text-stone-700 shadow-sm transition-all hover:bg-stone-50 hover:shadow-md active:scale-[0.98]"
          >
            <RotateCcw className="h-4 w-4 text-stone-400 transition-transform group-hover:-rotate-45" />
            Start Over
          </button>
        </motion.div>
      </div>

      {/* Share modal */}
      <ShareModal
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
        profile={profile}
        metrics={metrics}
        worldState={worldState}
        choiceCount={choiceHistory.length}
      />
    </div>
  );
}
