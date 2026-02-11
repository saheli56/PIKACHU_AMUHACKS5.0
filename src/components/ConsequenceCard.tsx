"use client";

import { motion } from "framer-motion";
import { ArrowRight, BookOpen } from "lucide-react";

interface ConsequenceCardProps {
  consequence: string;
  onContinue: () => void;
}

export default function ConsequenceCard({
  consequence,
  onContinue,
}: ConsequenceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-full max-w-2xl"
    >
      <div className="rounded-2xl border border-stone-200 bg-white p-8 shadow-sm">
        <div className="mb-4 flex items-center gap-2 text-stone-400">
          <BookOpen className="h-4 w-4" />
          <span className="text-xs font-medium uppercase tracking-wider">
            What happened
          </span>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mb-8 text-[15px] leading-[1.8] text-stone-600"
        >
          {consequence}
        </motion.p>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.4 }}
          onClick={onContinue}
          className="group flex cursor-pointer items-center gap-2 rounded-xl bg-stone-900 px-5 py-3 text-sm font-medium text-white transition-all hover:bg-stone-800 active:scale-[0.98]"
        >
          Continue
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </motion.button>
      </div>
    </motion.div>
  );
}
