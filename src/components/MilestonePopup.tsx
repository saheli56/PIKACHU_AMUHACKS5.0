"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Trophy, ArrowRight } from "lucide-react";
import confetti from "canvas-confetti";

interface MilestonePopupProps {
    show: boolean;
    type: "halfway" | "complete";
    onContinue: () => void;
}

export default function MilestonePopup({
    show,
    type,
    onContinue,
}: MilestonePopupProps) {
    useEffect(() => {
        if (show) {
            // Fire confetti
            const defaults = {
                spread: 360,
                ticks: 100,
                gravity: 0.8,
                decay: 0.94,
                startVelocity: 20,
                colors: ["#6366f1", "#a78bfa", "#c084fc", "#f472b6", "#34d399"],
            };

            const shoot = () => {
                confetti({ ...defaults, particleCount: 30, origin: { x: 0.3, y: 0.6 } });
                confetti({ ...defaults, particleCount: 30, origin: { x: 0.7, y: 0.6 } });
            };

            shoot();
            const timer = setTimeout(shoot, 300);
            return () => clearTimeout(timer);
        }
    }, [show]);

    const config =
        type === "halfway"
            ? {
                icon: Sparkles,
                title: "Halfway There!",
                message:
                    "Your choices are already shaping the world around you. Four more scenarios await — will you stay the course?",
                gradient: "from-indigo-500 to-purple-600",
            }
            : {
                icon: Trophy,
                title: "Journey Complete!",
                message:
                    "You've navigated all 8 scenarios. Your civic profile is ready — let's see who you really are.",
                gradient: "from-amber-500 to-orange-600",
            };

    const Icon = config.icon;

    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: -10 }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        className="relative w-full max-w-sm overflow-hidden rounded-3xl bg-white p-8 shadow-2xl"
                    >
                        {/* Gradient top bar */}
                        <div
                            className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${config.gradient}`}
                        />

                        <div className="flex flex-col items-center text-center">
                            {/* Icon */}
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{
                                    type: "spring",
                                    stiffness: 300,
                                    damping: 15,
                                    delay: 0.2,
                                }}
                                className={`mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${config.gradient} shadow-lg`}
                            >
                                <Icon className="h-8 w-8 text-white" />
                            </motion.div>

                            {/* Title */}
                            <motion.h2
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="mb-2 text-2xl font-bold text-stone-900"
                            >
                                {config.title}
                            </motion.h2>

                            {/* Message */}
                            <motion.p
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="mb-8 text-sm leading-relaxed text-stone-500"
                            >
                                {config.message}
                            </motion.p>

                            {/* CTA */}
                            <motion.button
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                onClick={onContinue}
                                className={`group flex cursor-pointer items-center gap-2 rounded-xl bg-gradient-to-r ${config.gradient} px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:shadow-xl hover:brightness-110 active:scale-[0.97]`}
                            >
                                {type === "halfway" ? "Keep Going" : "See My Profile"}
                                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                            </motion.button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
