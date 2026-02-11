"use client";

import { motion } from "framer-motion";
import { Clock, ChevronDown } from "lucide-react";
import { useState } from "react";
import { ChoiceRecord } from "@/lib/types";

interface JourneyTimelineProps {
  choices: ChoiceRecord[];
}

function getNodeColor(impact: ChoiceRecord["impact"]): {
  bg: string;
  border: string;
  text: string;
} {
  const values = Object.values(impact).filter(
    (v) => v !== undefined
  ) as number[];
  const sum = values.reduce((a, b) => a + b, 0);

  if (sum > 10) return { bg: "bg-emerald-50", border: "border-emerald-300", text: "text-emerald-700" };
  if (sum < -5) return { bg: "bg-rose-50", border: "border-rose-300", text: "text-rose-700" };
  return { bg: "bg-amber-50", border: "border-amber-300", text: "text-amber-700" };
}

export default function JourneyTimeline({ choices }: JourneyTimelineProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-full rounded-2xl border border-stone-200/60 bg-white/80 backdrop-blur-sm p-6 shadow-sm"
    >
      <div className="mb-5 flex items-center gap-2">
        <Clock className="h-5 w-5 text-stone-400" />
        <h3 className="text-base font-bold text-stone-900">Your Journey</h3>
      </div>
      <div className="space-y-0">
        {choices.map((choice, i) => {
          const nodeColor = getNodeColor(choice.impact);
          const isExpanded = expandedIndex === i;

          return (
            <motion.div
              key={choice.choiceId}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.06, duration: 0.3 }}
              className="relative flex gap-4"
            >
              {/* Timeline line */}
              <div className="flex flex-col items-center">
                <div
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border ${nodeColor.border} ${nodeColor.bg} text-xs font-bold ${nodeColor.text}`}
                >
                  {i + 1}
                </div>
                {i < choices.length - 1 && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: "100%" }}
                    transition={{ delay: i * 0.06 + 0.2, duration: 0.3 }}
                    className="w-px flex-1 bg-gradient-to-b from-stone-200 to-stone-100"
                  />
                )}
              </div>

              {/* Content */}
              <div className="pb-5 flex-1">
                <button
                  onClick={() =>
                    setExpandedIndex(isExpanded ? null : i)
                  }
                  className="group flex w-full items-center justify-between text-left cursor-pointer"
                >
                  <div>
                    <p className="text-sm font-semibold text-stone-800">
                      {choice.scenarioTitle}
                    </p>
                    <p className="mt-0.5 text-sm text-stone-500">
                      {choice.choiceText}
                    </p>
                  </div>
                  <ChevronDown
                    className={`h-4 w-4 shrink-0 text-stone-300 transition-transform ${isExpanded ? "rotate-180" : ""
                      }`}
                  />
                </button>

                {/* Expandable consequence */}
                <motion.div
                  initial={false}
                  animate={{
                    height: isExpanded ? "auto" : 0,
                    opacity: isExpanded ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <p className="mt-2 rounded-lg bg-stone-50 px-3 py-2.5 text-xs leading-relaxed text-stone-500 border border-stone-100">
                    {choice.consequence}
                  </p>
                </motion.div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
