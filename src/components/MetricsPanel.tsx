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
  if (value >= 65) return "bg-emerald-100";
  if (value >= 45) return "bg-amber-100";
  return "bg-rose-100";
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
    <div className={clsx("w-full", compact ? "mb-2" : "mb-3.5")}>
      <div
        className={clsx(
          "mb-1 flex justify-between text-stone-600",
          compact ? "text-xs" : "text-sm"
        )}
      >
        <span className="font-medium">{label}</span>
        <span className="tabular-nums">{value}</span>
      </div>
      <div
        className={clsx(
          "w-full overflow-hidden rounded-full",
          getBarBg(value),
          compact ? "h-1.5" : "h-2"
        )}
      >
        <motion.div
          className={clsx("h-full rounded-full", getBarColor(value))}
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.6, ease: "easeOut" }}
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
    <div className="w-full rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
      <h3
        className={clsx(
          "font-semibold text-stone-900",
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

      <div className={clsx("border-t border-stone-100", compact ? "my-3" : "my-5")} />

      <h3
        className={clsx(
          "font-semibold text-stone-900",
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
