"use client";

import { motion } from "framer-motion";
import { ArrowRight, BookOpen } from "lucide-react";
import { ChoiceImpact } from "@/lib/types";

interface ConsequenceCardProps {
  consequence: string;
  onContinue: () => void;
  impact?: ChoiceImpact | null;
}

function getNetImpact(impact: ChoiceImpact | null | undefined): "positive" | "neutral" | "negative" {
  if (!impact) return "neutral";
  const values = Object.values(impact).filter((v) => v !== undefined) as number[];
  const sum = values.reduce((a, b) => a + b, 0);
  if (sum > 10) return "positive";
  if (sum < -5) return "negative";
  return "neutral";
}

const moodConfig = {
  positive: {
    emoji: "🌱",
    label: "Positive impact",
    borderColor: "border-emerald-200",
    bgColor: "bg-emerald-50/30",
  },
  neutral: {
    emoji: "⚖️",
    label: "Mixed impact",
    borderColor: "border-amber-200",
    bgColor: "bg-amber-50/30",
  },
  negative: {
    emoji: "🌧️",
    label: "Concerning impact",
    borderColor: "border-rose-200",
    bgColor: "bg-rose-50/30",
  },
};

export default function ConsequenceCard({
  consequence,
  onContinue,
  impact,
}: ConsequenceCardProps) {
  const mood = getNetImpact(impact);
  const config = moodConfig[mood];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-full"
    >
      <div
        className={`rounded-2xl border ${config.borderColor} ${config.bgColor} bg-white/80 backdrop-blur-sm p-8 shadow-sm`}
      >
        {/* Header with mood indicator */}
        <div className="mb-5 flex items-center justify-between">
          <div className="flex items-center gap-2 text-stone-400">
            <BookOpen className="h-4 w-4" />
            <span className="text-xs font-medium uppercase tracking-wider">
              What happened
            </span>
          </div>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.3 }}
            className="flex items-center gap-1.5 text-xs text-stone-500"
          >
            <span className="text-base">{config.emoji}</span>
            <span className="font-medium">{config.label}</span>
          </motion.div>
        </div>

        {/* Consequence text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="mb-8 text-[15px] leading-[1.85] text-stone-600"
        >
          {consequence}
        </motion.p>

        {/* Continue button */}
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.4 }}
          onClick={onContinue}
          className="group flex cursor-pointer items-center gap-2 rounded-xl bg-stone-900 px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:bg-stone-800 hover:shadow-xl active:scale-[0.97]"
        >
          Continue
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </motion.button>
      </div>
    </motion.div>
  );
}
