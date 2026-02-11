"use client";

import { useEffect, useState, useMemo } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { ISourceOptions } from "@tsparticles/engine";

interface ParticleBackgroundProps {
    variant?: "default" | "celebration" | "subtle";
}

export default function ParticleBackground({
    variant = "default",
}: ParticleBackgroundProps) {
    const [init, setInit] = useState(false);

    useEffect(() => {
        initParticlesEngine(async (engine) => {
            await loadSlim(engine);
        }).then(() => {
            setInit(true);
        });
    }, []);

    const options: ISourceOptions = useMemo(() => {
        const base: ISourceOptions = {
            fullScreen: false,
            background: { color: { value: "transparent" } },
            fpsLimit: 60,
            detectRetina: true,
        };

        if (variant === "celebration") {
            return {
                ...base,
                particles: {
                    number: { value: 30, density: { enable: true } },
                    color: { value: ["#6366f1", "#a78bfa", "#c084fc", "#f472b6"] },
                    shape: { type: "circle" },
                    opacity: { value: { min: 0.2, max: 0.5 } },
                    size: { value: { min: 2, max: 5 } },
                    move: {
                        enable: true,
                        speed: 1.5,
                        direction: "none",
                        random: true,
                        outModes: { default: "out" },
                    },
                },
            };
        }

        if (variant === "subtle") {
            return {
                ...base,
                particles: {
                    number: { value: 15, density: { enable: true } },
                    color: { value: "#a8a29e" },
                    shape: { type: "circle" },
                    opacity: { value: { min: 0.05, max: 0.15 } },
                    size: { value: { min: 1, max: 3 } },
                    move: {
                        enable: true,
                        speed: 0.3,
                        direction: "none",
                        random: true,
                        outModes: { default: "out" },
                    },
                },
            };
        }

        // Default
        return {
            ...base,
            particles: {
                number: { value: 25, density: { enable: true } },
                color: { value: ["#6366f1", "#a78bfa", "#d6d3d1"] },
                shape: { type: "circle" },
                opacity: { value: { min: 0.08, max: 0.25 } },
                size: { value: { min: 1, max: 4 } },
                move: {
                    enable: true,
                    speed: 0.5,
                    direction: "none",
                    random: true,
                    outModes: { default: "out" },
                },
                links: {
                    enable: false,
                },
            },
        };
    }, [variant]);

    if (!init) return null;

    return (
        <Particles
            id={`particles-${variant}`}
            options={options}
            className="absolute inset-0 pointer-events-none"
        />
    );
}
