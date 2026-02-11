"use client";

import { motion } from "framer-motion";
import {
    Train,
    Bus,
    Trees,
    TrainFront,
    Store,
    Droplets,
    Bike,
    Building2,
    Users,
    Sun,
    Cloud,
    CloudRain,
    Clock,
    MapPin,
} from "lucide-react";

interface SceneIllustrationProps {
    scenarioId: string;
    className?: string;
}

interface SceneConfig {
    gradient: string;
    icon: React.ElementType;
    accentIcon?: React.ElementType;
    ambientIcon?: React.ElementType;
    label: string;
    accentColor: string;
    iconColor: string;
}

const sceneConfigs: Record<string, SceneConfig> = {
    "queue-railway": {
        gradient: "from-amber-100 via-orange-50 to-yellow-50",
        icon: Train,
        accentIcon: Clock,
        ambientIcon: Sun,
        label: "Railway Station",
        accentColor: "text-amber-500",
        iconColor: "text-amber-600",
    },
    "loud-phone": {
        gradient: "from-blue-100 via-sky-50 to-indigo-50",
        icon: Bus,
        accentIcon: Users,
        ambientIcon: Cloud,
        label: "City Bus",
        accentColor: "text-blue-500",
        iconColor: "text-blue-600",
    },
    "litter-park": {
        gradient: "from-green-100 via-emerald-50 to-teal-50",
        icon: Trees,
        accentIcon: MapPin,
        ambientIcon: Sun,
        label: "Public Park",
        accentColor: "text-green-500",
        iconColor: "text-green-600",
    },
    "priority-seat": {
        gradient: "from-violet-100 via-purple-50 to-fuchsia-50",
        icon: TrainFront,
        accentIcon: Users,
        ambientIcon: Clock,
        label: "Metro Train",
        accentColor: "text-violet-500",
        iconColor: "text-violet-600",
    },
    "street-vendor": {
        gradient: "from-rose-100 via-pink-50 to-orange-50",
        icon: Store,
        accentIcon: Users,
        ambientIcon: Sun,
        label: "Marketplace",
        accentColor: "text-rose-500",
        iconColor: "text-rose-600",
    },
    "water-wastage": {
        gradient: "from-cyan-100 via-sky-50 to-blue-50",
        icon: Droplets,
        accentIcon: Building2,
        ambientIcon: Sun,
        label: "Neighborhood",
        accentColor: "text-cyan-500",
        iconColor: "text-cyan-600",
    },
    "accident-witness": {
        gradient: "from-slate-200 via-gray-100 to-zinc-50",
        icon: Bike,
        accentIcon: MapPin,
        ambientIcon: CloudRain,
        label: "Wet Road",
        accentColor: "text-slate-500",
        iconColor: "text-slate-600",
    },
    "community-meeting": {
        gradient: "from-indigo-100 via-blue-50 to-violet-50",
        icon: Building2,
        accentIcon: Users,
        ambientIcon: Trees,
        label: "Community Hall",
        accentColor: "text-indigo-500",
        iconColor: "text-indigo-600",
    },
};

const defaultScene: SceneConfig = {
    gradient: "from-stone-100 via-stone-50 to-white",
    icon: MapPin,
    label: "Scene",
    accentColor: "text-stone-500",
    iconColor: "text-stone-600",
};

export default function SceneIllustration({
    scenarioId,
    className = "",
}: SceneIllustrationProps) {
    const config = sceneConfigs[scenarioId] || defaultScene;
    const MainIcon = config.icon;
    const AccentIcon = config.accentIcon;
    const AmbientIcon = config.ambientIcon;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${config.gradient} ${className}`}
        >
            {/* Decorative circles */}
            <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-white/30" />
            <div className="absolute -left-4 -bottom-4 h-16 w-16 rounded-full bg-white/20" />

            <div className="relative flex items-center justify-center py-10 px-6">
                {/* Ambient icon floating in background */}
                {AmbientIcon && (
                    <motion.div
                        animate={{ y: [0, -6, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute right-8 top-4 opacity-20"
                    >
                        <AmbientIcon className={`h-8 w-8 ${config.accentColor}`} />
                    </motion.div>
                )}

                {/* Accent icon floating */}
                {AccentIcon && (
                    <motion.div
                        animate={{ y: [0, -4, 0] }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 0.5,
                        }}
                        className="absolute left-8 bottom-6 opacity-25"
                    >
                        <AccentIcon className={`h-6 w-6 ${config.accentColor}`} />
                    </motion.div>
                )}

                {/* Main icon */}
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                        type: "spring",
                        stiffness: 200,
                        damping: 15,
                        delay: 0.2,
                    }}
                    className="flex flex-col items-center gap-3"
                >
                    <div className="relative">
                        {/* Glow ring */}
                        <motion.div
                            animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.15, 0.3] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                            className={`absolute inset-0 rounded-full bg-gradient-to-br ${config.gradient}`}
                            style={{ margin: "-8px" }}
                        />
                        <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-white/80 shadow-lg shadow-black/5">
                            <MainIcon className={`h-8 w-8 ${config.iconColor}`} />
                        </div>
                    </div>
                    <span
                        className={`text-xs font-semibold uppercase tracking-widest ${config.accentColor}`}
                    >
                        {config.label}
                    </span>
                </motion.div>
            </div>
        </motion.div>
    );
}
