"use client";

import { motion } from "framer-motion";
import { User } from "lucide-react";
import { CivicProfile } from "@/lib/types";

interface ProfileCardProps {
  profile: CivicProfile;
}

export default function ProfileCard({ profile }: ProfileCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full rounded-2xl border border-indigo-100 bg-gradient-to-br from-indigo-50 to-white p-8 shadow-sm"
    >
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100">
          <User className="h-5 w-5 text-indigo-600" />
        </div>
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-indigo-400">
            Your Archetype
          </p>
          <h2 className="text-xl font-semibold text-stone-900">
            {profile.title}
          </h2>
        </div>
      </div>
      <p className="text-[15px] leading-relaxed text-stone-600">
        {profile.description}
      </p>
    </motion.div>
  );
}
