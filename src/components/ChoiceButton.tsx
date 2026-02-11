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
      transition={{
        delay: 0.15 * index,
        type: "spring",
        stiffness: 300,
        damping: 25,
      }}
      onClick={onClick}
      disabled={disabled}
      whileHover={!disabled ? { scale: 1.01, x: 4 } : undefined}
      whileTap={!disabled ? { scale: 0.98 } : undefined}
      className="group relative w-full cursor-pointer overflow-hidden rounded-xl border border-stone-200 bg-white px-5 py-4 text-left text-stone-700 shadow-sm transition-all duration-300 hover:border-indigo-300 hover:bg-indigo-50/30 hover:text-stone-900 hover:shadow-md disabled:pointer-events-none disabled:opacity-40"
    >
      {/* Hover gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-50/0 via-indigo-50/0 to-indigo-50/0 transition-all duration-300 group-hover:from-indigo-50/40 group-hover:via-indigo-50/20 group-hover:to-transparent" />

      <div className="relative flex items-start gap-3">
        <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-stone-200 bg-stone-50 text-xs font-bold text-stone-400 transition-all duration-300 group-hover:border-indigo-300 group-hover:bg-indigo-100 group-hover:text-indigo-600 group-hover:shadow-sm">
          {String.fromCharCode(65 + index)}
        </span>
        <span className="text-[15px] leading-relaxed font-medium">{text}</span>
      </div>
    </motion.button>
  );
}
