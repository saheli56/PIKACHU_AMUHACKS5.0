"use client";

import { motion } from "framer-motion";
import { User, Crown, Heart, Users, Lightbulb, Scale, EyeOff, Eye } from "lucide-react";
import { CivicProfile } from "@/lib/types";

interface ProfileCardProps {
  profile: CivicProfile;
}

const archetypeConfig: Record<
  string,
  { icon: React.ElementType; gradient: string; borderColor: string; glowColor: string }
> = {
  "civic-champion": {
    icon: Crown,
    gradient: "from-amber-400 to-yellow-500",
    borderColor: "border-amber-200",
    glowColor: "shadow-amber-500/20",
  },
  "empathetic-soul": {
    icon: Heart,
    gradient: "from-rose-400 to-pink-500",
    borderColor: "border-rose-200",
    glowColor: "shadow-rose-500/20",
  },
  "community-builder": {
    icon: Users,
    gradient: "from-emerald-400 to-teal-500",
    borderColor: "border-emerald-200",
    glowColor: "shadow-emerald-500/20",
  },
  "quiet-contributor": {
    icon: Lightbulb,
    gradient: "from-blue-400 to-indigo-500",
    borderColor: "border-blue-200",
    glowColor: "shadow-blue-500/20",
  },
  "pragmatic-individual": {
    icon: Scale,
    gradient: "from-orange-400 to-amber-500",
    borderColor: "border-orange-200",
    glowColor: "shadow-orange-500/20",
  },
  "reluctant-citizen": {
    icon: EyeOff,
    gradient: "from-slate-400 to-gray-500",
    borderColor: "border-slate-200",
    glowColor: "shadow-slate-500/20",
  },
  "silent-observer": {
    icon: Eye,
    gradient: "from-stone-400 to-stone-500",
    borderColor: "border-stone-300",
    glowColor: "shadow-stone-500/20",
  },
};

const defaultConfig = {
  icon: User,
  gradient: "from-indigo-400 to-purple-500",
  borderColor: "border-indigo-200",
  glowColor: "shadow-indigo-500/20",
};

export default function ProfileCard({ profile }: ProfileCardProps) {
  const config = archetypeConfig[profile.archetype] || defaultConfig;
  const Icon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`w-full rounded-3xl border ${config.borderColor} bg-gradient-to-br from-white to-stone-50/80 p-8 shadow-xl ${config.glowColor}`}
    >
      <div className="mb-5 flex items-center gap-4">
        {/* Archetype icon with gradient background */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 15,
            delay: 0.3,
          }}
          className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${config.gradient} shadow-lg`}
        >
          <Icon className="h-7 w-7 text-white" />
        </motion.div>

        <div>
          <motion.p
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xs font-semibold uppercase tracking-widest text-stone-400"
          >
            Your Archetype
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="text-2xl font-bold text-stone-900"
          >
            {profile.title}
          </motion.h2>
        </div>
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="text-[15px] leading-relaxed text-stone-600"
      >
        {profile.description}
      </motion.p>
    </motion.div>
  );
}
