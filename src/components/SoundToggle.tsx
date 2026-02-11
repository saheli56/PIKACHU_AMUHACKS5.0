"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";
import soundEngine from "@/lib/SoundEngine";

/**
 * Floating sound toggle button.
 * Renders in fixed bottom-right position across all pages.
 */
export default function SoundToggle() {
    const [enabled, setEnabled] = useState(soundEngine.enabled);

    const toggle = () => {
        const next = !enabled;
        soundEngine.enabled = next;
        setEnabled(next);

        // Play a tiny click if enabling
        if (next) {
            soundEngine.buttonClick();
        }
    };

    return (
        <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.5, duration: 0.3 }}
            onClick={toggle}
            title={enabled ? "Mute sounds" : "Enable sounds"}
            className="fixed bottom-5 right-5 z-40 flex h-10 w-10 items-center justify-center rounded-full border border-stone-200/60 bg-white/80 backdrop-blur-sm text-stone-500 shadow-lg transition-all hover:bg-white hover:text-stone-700 hover:shadow-xl cursor-pointer active:scale-95"
        >
            {enabled ? (
                <Volume2 className="h-4 w-4" />
            ) : (
                <VolumeX className="h-4 w-4" />
            )}
        </motion.button>
    );
}
