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
  }
> = {
  good: {
    icon: CheckCircle,
    border: "border-emerald-100",
    bg: "bg-emerald-50/50",
    iconColor: "text-emerald-500",
    titleColor: "text-emerald-700",
    dotColor: "bg-emerald-400",
  },
  bad: {
    icon: AlertTriangle,
    border: "border-amber-100",
    bg: "bg-amber-50/50",
    iconColor: "text-amber-500",
    titleColor: "text-amber-700",
    dotColor: "bg-amber-400",
  },
  ugly: {
    icon: XCircle,
    border: "border-rose-100",
    bg: "bg-rose-50/50",
    iconColor: "text-rose-500",
    titleColor: "text-rose-700",
    dotColor: "bg-rose-400",
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
        "w-full rounded-2xl border p-6",
        c.border,
        c.bg
      )}
    >
      <div className="mb-4 flex items-center gap-2">
        <Icon className={clsx("h-5 w-5", c.iconColor)} />
        <h3 className={clsx("text-base font-semibold", c.titleColor)}>
          {title}
        </h3>
      </div>
      <ul className="space-y-3">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-3">
            <span
              className={clsx(
                "mt-2 h-1.5 w-1.5 shrink-0 rounded-full",
                c.dotColor
              )}
            />
            <span className="text-sm leading-relaxed text-stone-600">
              {item}
            </span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
