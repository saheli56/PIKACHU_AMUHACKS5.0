"use client";

import { motion } from "framer-motion";
import { CheckCircle, AlertTriangle, XCircle } from "lucide-react";
import clsx from "clsx";

type InsightType = "good" | "bad" | "ugly";

interface InsightSectionProps {
  type: InsightType;
  title: string;
  items: string[];
}

const config: Record<
  InsightType,
  {
    icon: React.ElementType;
    border: string;
    bg: string;
    iconColor: string;
    titleColor: string;
    dotColor: string;
    glowBorder: string;
  }
> = {
  good: {
    icon: CheckCircle,
    border: "border-emerald-200/60",
    bg: "bg-gradient-to-br from-emerald-50/60 to-white",
    iconColor: "text-emerald-500",
    titleColor: "text-emerald-700",
    dotColor: "bg-emerald-400",
    glowBorder: "hover:border-emerald-300/80",
  },
  bad: {
    icon: AlertTriangle,
    border: "border-amber-200/60",
    bg: "bg-gradient-to-br from-amber-50/60 to-white",
    iconColor: "text-amber-500",
    titleColor: "text-amber-700",
    dotColor: "bg-amber-400",
    glowBorder: "hover:border-amber-300/80",
  },
  ugly: {
    icon: XCircle,
    border: "border-rose-200/60",
    bg: "bg-gradient-to-br from-rose-50/60 to-white",
    iconColor: "text-rose-500",
    titleColor: "text-rose-700",
    dotColor: "bg-rose-400",
    glowBorder: "hover:border-rose-300/80",
  },
};

export default function InsightSection({
  type,
  title,
  items,
}: InsightSectionProps) {
  const c = config[type];
  const Icon = c.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={clsx(
        "w-full rounded-2xl border p-6 backdrop-blur-sm transition-all duration-300 shadow-sm",
        c.border,
        c.bg,
        c.glowBorder
      )}
    >
      <div className="mb-4 flex items-center gap-2.5">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <Icon className={clsx("h-5 w-5", c.iconColor)} />
        </motion.div>
        <h3 className={clsx("text-base font-bold", c.titleColor)}>
          {title}
        </h3>
      </div>
      <ul className="space-y-3">
        {items.map((item, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 * i, duration: 0.3 }}
            className="flex items-start gap-3"
          >
            <span
              className={clsx(
                "mt-2 h-1.5 w-1.5 shrink-0 rounded-full",
                c.dotColor
              )}
            />
            <span className="text-sm leading-relaxed text-stone-600">
              {item}
            </span>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
}
