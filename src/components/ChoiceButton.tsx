"use client";

import { motion } from "framer-motion";

interface ChoiceButtonProps {
  text: string;
  onClick: () => void;
  index: number;
  disabled?: boolean;
}

export default function ChoiceButton({
  text,
  onClick,
  index,
  disabled = false,
}: ChoiceButtonProps) {
  return (
    <motion.button
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ delay: 0.1 * index, duration: 0.4, ease: "easeOut" }}
      onClick={onClick}
      disabled={disabled}
      className="group relative w-full cursor-pointer rounded-xl border border-stone-200 bg-white px-5 py-4 text-left text-stone-700 shadow-sm transition-all duration-200 hover:border-indigo-300 hover:bg-indigo-50/50 hover:text-stone-900 hover:shadow-md active:scale-[0.98] disabled:pointer-events-none disabled:opacity-40"
    >
      <div className="flex items-start gap-3">
        <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-stone-300 text-xs font-medium text-stone-400 transition-colors group-hover:border-indigo-400 group-hover:bg-indigo-100 group-hover:text-indigo-600">
          {String.fromCharCode(65 + index)}
        </span>
        <span className="text-[15px] leading-relaxed">{text}</span>
      </div>
    </motion.button>
  );
}
