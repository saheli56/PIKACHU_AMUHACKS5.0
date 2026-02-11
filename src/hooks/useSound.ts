"use client";

import { useCallback } from "react";
import soundEngine from "@/lib/SoundEngine";

/**
 * React hook providing memoized sound playback functions.
 * All sounds are synthesized via Web Audio API — no external files.
 */
export function useSound() {
    const playChoiceSelect = useCallback(() => soundEngine.choiceSelect(), []);

    const playConsequenceReveal = useCallback(
        (mood: "positive" | "neutral" | "negative") =>
            soundEngine.consequenceReveal(mood),
        []
    );

    const playPositiveImpact = useCallback(() => soundEngine.positiveImpact(), []);
    const playNegativeImpact = useCallback(() => soundEngine.negativeImpact(), []);
    const playSceneTransition = useCallback(() => soundEngine.sceneTransition(), []);
    const playMilestone = useCallback(() => soundEngine.milestone(), []);
    const playCelebration = useCallback(() => soundEngine.celebration(), []);
    const playHover = useCallback(() => soundEngine.hover(), []);
    const playButtonClick = useCallback(() => soundEngine.buttonClick(), []);

    const setEnabled = useCallback((val: boolean) => {
        soundEngine.enabled = val;
    }, []);

    const setVolume = useCallback((val: number) => {
        soundEngine.volume = val;
    }, []);

    return {
        playChoiceSelect,
        playConsequenceReveal,
        playPositiveImpact,
        playNegativeImpact,
        playSceneTransition,
        playMilestone,
        playCelebration,
        playHover,
        playButtonClick,
        setEnabled,
        setVolume,
        get enabled() {
            return soundEngine.enabled;
        },
    };
}
