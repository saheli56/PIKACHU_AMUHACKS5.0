"use client";

import { motion } from "framer-motion";
import { Metrics, WorldState } from "@/lib/types";
import clsx from "clsx";

interface MetricsPanelProps {
  metrics: Metrics;
  worldState: WorldState;
  compact?: boolean;
}

function getBarColor(value: number): string {
  if (value >= 65) return "bg-emerald-500";
  if (value >= 45) return "bg-amber-400";
  return "bg-rose-500";
}

function getBarBg(value: number): string {
  if (value >= 65) return "bg-emerald-100/60";
  if (value >= 45) return "bg-amber-100/60";
  return "bg-rose-100/60";
}

function getGlowClass(value: number): string {
  if (value >= 65) return "shadow-emerald-500/20";
  if (value >= 45) return "shadow-amber-400/20";
  return "shadow-rose-500/20";
}

function MetricBar({
  label,
  value,
  compact = false,
}: {
  label: string;
  value: number;
  compact?: boolean;
}) {
  return (
    <div className={clsx("w-full", compact ? "mb-2.5" : "mb-4")}>
      <div
        className={clsx(
          "mb-1.5 flex justify-between text-stone-600",
          compact ? "text-xs" : "text-sm"
        )}
      >
        <span className="font-medium">{label}</span>
        <motion.span
          key={value}
          initial={{ scale: 1.3, color: "#6366f1" }}
          animate={{ scale: 1, color: "#57534e" }}
          transition={{ duration: 0.4 }}
          className="tabular-nums font-semibold"
        >
          {value}
        </motion.span>
      </div>
      <div
        className={clsx(
          "w-full overflow-hidden rounded-full",
          getBarBg(value),
          compact ? "h-2" : "h-2.5"
        )}
      >
        <motion.div
          className={clsx(
            "h-full rounded-full shadow-sm",
            getBarColor(value),
            getGlowClass(value)
          )}
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        />
      </div>
    </div>
  );
}

export default function MetricsPanel({
  metrics,
  worldState,
  compact = false,
}: MetricsPanelProps) {
  return (
    <div className="w-full rounded-2xl border border-stone-200/60 bg-white/80 backdrop-blur-sm p-6 shadow-sm">
      <h3
        className={clsx(
          "font-bold text-stone-900",
          compact ? "mb-3 text-sm" : "mb-4 text-base"
        )}
      >
        Your Metrics
      </h3>
      <MetricBar
        label="Civic Awareness"
        value={metrics.civicAwareness}
        compact={compact}
      />
      <MetricBar label="Empathy" value={metrics.empathy} compact={compact} />
      <MetricBar
        label="Social Trust"
        value={metrics.socialTrust}
        compact={compact}
      />
      <MetricBar
        label="Personal Convenience"
        value={metrics.personalConvenience}
        compact={compact}
      />

      <div
        className={clsx("border-t border-stone-100", compact ? "my-3" : "my-5")}
      />

      <h3
        className={clsx(
          "font-bold text-stone-900",
          compact ? "mb-3 text-sm" : "mb-4 text-base"
        )}
      >
        World State
      </h3>
      <MetricBar
        label="Public Patience"
        value={worldState.publicPatience}
        compact={compact}
      />
      <MetricBar
        label="Cleanliness Level"
        value={worldState.cleanlinessLevel}
        compact={compact}
      />
      <MetricBar
        label="Cooperation Level"
        value={worldState.cooperationLevel}
        compact={compact}
      />
    </div>
  );
}
