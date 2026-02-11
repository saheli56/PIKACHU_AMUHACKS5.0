"use client";

import { motion, AnimatePresence } from "framer-motion";
import { MapPin } from "lucide-react";
import { Scenario, Choice } from "@/lib/types";
import ChoiceButton from "./ChoiceButton";
import SceneIllustration from "./SceneIllustration";

interface ScenarioCardProps {
  scenario: Scenario;
  onChoice: (choice: Choice) => void;
  disabled?: boolean;
}

export default function ScenarioCard({
  scenario,
  onChoice,
  disabled = false,
}: ScenarioCardProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={scenario.id}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -30 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full"
      >
        {/* Scene illustration */}
        <div className="mb-4">
          <SceneIllustration scenarioId={scenario.id} />
        </div>

        <div className="rounded-2xl border border-stone-200/60 bg-white/80 backdrop-blur-sm p-8 shadow-sm">
          {/* Context / atmosphere */}
          <div className="mb-5 flex items-start gap-2.5 rounded-xl bg-stone-50/80 px-4 py-3 border border-stone-100">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-stone-400" />
            <p className="text-sm leading-relaxed text-stone-500 italic">
              {scenario.context}
            </p>
          </div>

          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="mb-3 text-2xl font-bold tracking-tight text-stone-900"
          >
            {scenario.title}
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mb-8 text-[15px] leading-relaxed text-stone-600"
          >
            {scenario.description}
          </motion.p>

          {/* Choices */}
          <div className="flex flex-col gap-3">
            {scenario.choices.map((choice, i) => (
              <ChoiceButton
                key={choice.id}
                text={choice.text}
                onClick={() => onChoice(choice)}
                index={i}
                disabled={disabled}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
