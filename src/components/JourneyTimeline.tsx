"use client";

import { motion } from "framer-motion";
import { Clock } from "lucide-react";
import { ChoiceRecord } from "@/lib/types";

interface JourneyTimelineProps {
  choices: ChoiceRecord[];
}

export default function JourneyTimeline({ choices }: JourneyTimelineProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-full rounded-2xl border border-stone-200 bg-white p-6 shadow-sm"
    >
      <div className="mb-5 flex items-center gap-2">
        <Clock className="h-5 w-5 text-stone-400" />
        <h3 className="text-base font-semibold text-stone-900">
          Your Journey
        </h3>
      </div>
      <div className="space-y-0">
        {choices.map((choice, i) => (
          <div key={choice.choiceId} className="relative flex gap-4">
            {/* Timeline line */}
            <div className="flex flex-col items-center">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-stone-200 bg-stone-50 text-xs font-medium text-stone-500">
                {i + 1}
              </div>
              {i < choices.length - 1 && (
                <div className="w-px flex-1 bg-stone-200" />
              )}
            </div>
            {/* Content */}
            <div className="pb-6">
              <p className="text-sm font-medium text-stone-800">
                {choice.scenarioTitle}
              </p>
              <p className="mt-0.5 text-sm text-stone-500">
                {choice.choiceText}
              </p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
