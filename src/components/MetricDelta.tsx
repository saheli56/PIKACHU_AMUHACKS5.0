"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ChoiceImpact } from "@/lib/types";
import { TrendingUp, TrendingDown } from "lucide-react";

interface MetricDeltaProps {
    impact: ChoiceImpact;
    show: boolean;
}

const metricLabels: Record<string, string> = {
    civicAwareness: "Civic Awareness",
    empathy: "Empathy",
    socialTrust: "Social Trust",
    personalConvenience: "Convenience",
    publicPatience: "Public Patience",
    cleanlinessLevel: "Cleanliness",
    cooperationLevel: "Cooperation",
};

export default function MetricDelta({ impact, show }: MetricDeltaProps) {
    const entries = Object.entries(impact).filter(
        ([, value]) => value !== undefined && value !== 0
    ) as [string, number][];

    if (entries.length === 0) return null;

    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-wrap justify-center gap-2 py-3"
                >
                    {entries.map(([key, value], i) => (
                        <motion.div
                            key={key}
                            initial={{ opacity: 0, y: 10, scale: 0.8 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{
                                delay: i * 0.08,
                                type: "spring",
                                stiffness: 300,
                                damping: 20,
                            }}
                            className={`inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-semibold shadow-sm ${value > 0
                                    ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                    : "bg-rose-50 text-rose-700 border border-rose-200"
                                }`}
                        >
                            {value > 0 ? (
                                <TrendingUp className="h-3 w-3" />
                            ) : (
                                <TrendingDown className="h-3 w-3" />
                            )}
                            <span>
                                {value > 0 ? "+" : ""}
                                {value}
                            </span>
                            <span className="opacity-70">{metricLabels[key] || key}</span>
                        </motion.div>
                    ))}
                </motion.div>
            )}
        </AnimatePresence>
    );
}
