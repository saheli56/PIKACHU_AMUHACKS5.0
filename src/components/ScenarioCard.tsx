"use client";

import { motion, AnimatePresence } from "framer-motion";
import { MapPin } from "lucide-react";
import { Scenario, Choice } from "@/lib/types";
import ChoiceButton from "./ChoiceButton";

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
        className="w-full max-w-2xl"
      >
        <div className="rounded-2xl border border-stone-200 bg-white p-8 shadow-sm">
          {/* Context / atmosphere */}
          <div className="mb-5 flex items-start gap-2 rounded-lg bg-stone-50 px-4 py-3">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-stone-400" />
            <p className="text-sm leading-relaxed text-stone-500 italic">
              {scenario.context}
            </p>
          </div>

          {/* Title */}
          <h2 className="mb-3 text-2xl font-semibold tracking-tight text-stone-900">
            {scenario.title}
          </h2>

          {/* Description */}
          <p className="mb-8 text-[15px] leading-relaxed text-stone-600">
            {scenario.description}
          </p>

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
