"use client";

import { forwardRef } from "react";
import { CivicProfile, Metrics, WorldState } from "@/lib/types";

/* ─── Per-archetype accent theming ─── */
const archetypeThemes: Record<
    string,
    { accent: string; glow1: string; glow2: string; emoji: string }
> = {
    "civic-champion": {
        accent: "#fbbf24",
        glow1: "#f59e0b",
        glow2: "#92400e",
        emoji: "👑",
    },
    "empathetic-soul": {
        accent: "#f472b6",
        glow1: "#ec4899",
        glow2: "#831843",
        emoji: "💗",
    },
    "community-builder": {
        accent: "#34d399",
        glow1: "#10b981",
        glow2: "#064e3b",
        emoji: "🤝",
    },
    "quiet-contributor": {
        accent: "#60a5fa",
        glow1: "#3b82f6",
        glow2: "#1e3a8a",
        emoji: "💡",
    },
    "pragmatic-individual": {
        accent: "#fb923c",
        glow1: "#f97316",
        glow2: "#7c2d12",
        emoji: "⚖️",
    },
    "reluctant-citizen": {
        accent: "#94a3b8",
        glow1: "#64748b",
        glow2: "#1e293b",
        emoji: "🌫️",
    },
    "silent-observer": {
        accent: "#a8a29e",
        glow1: "#78716c",
        glow2: "#292524",
        emoji: "👁️",
    },
};

const defaultTheme = {
    accent: "#818cf8",
    glow1: "#6366f1",
    glow2: "#312e81",
    emoji: "🪞",
};

/* ─── Metric config ─── */
const metricMeta: { key: keyof Metrics; label: string }[] = [
    { key: "civicAwareness", label: "Civic Awareness" },
    { key: "empathy", label: "Empathy" },
    { key: "socialTrust", label: "Social Trust" },
    { key: "personalConvenience", label: "Convenience" },
];

const worldMeta: { key: keyof WorldState; label: string }[] = [
    { key: "publicPatience", label: "Patience" },
    { key: "cleanlinessLevel", label: "Cleanliness" },
    { key: "cooperationLevel", label: "Cooperation" },
];

interface ShareableCardProps {
    profile: CivicProfile;
    metrics: Metrics;
    worldState: WorldState;
    choiceCount: number;
}

/**
 * A 1200×630 capture-optimized card rendered off-screen.
 * Uses ONLY html2canvas-compatible CSS (no gradient text, no backdrop-filter, no filter blur, no line-clamp).
 */
const ShareableCard = forwardRef<HTMLDivElement, ShareableCardProps>(
    function ShareableCard({ profile, metrics, worldState, choiceCount }, ref) {
        const theme = archetypeThemes[profile.archetype] || defaultTheme;

        // Truncate description to ~180 chars for the card
        const shortDesc =
            profile.description.length > 180
                ? profile.description.slice(0, 177) + "..."
                : profile.description;

        return (
            <div
                ref={ref}
                style={{
                    width: 1200,
                    height: 630,
                    position: "relative",
                    overflow: "hidden",
                    fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
                    background: `linear-gradient(145deg, #0c0a1a 0%, #1a1332 35%, #0f172a 70%, #0c0a1a 100%)`,
                }}
            >
                {/* ── Subtle grid pattern ── */}
                <div
                    style={{
                        position: "absolute",
                        inset: 0,
                        backgroundImage: `
              linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
            `,
                        backgroundSize: "40px 40px",
                    }}
                />

                {/* ── Static glow accents (no filter:blur — use gradients instead) ── */}
                <div
                    style={{
                        position: "absolute",
                        width: 600,
                        height: 600,
                        borderRadius: "50%",
                        background: `radial-gradient(circle, ${theme.glow2}50 0%, transparent 60%)`,
                        top: -200,
                        right: -100,
                    }}
                />
                <div
                    style={{
                        position: "absolute",
                        width: 500,
                        height: 500,
                        borderRadius: "50%",
                        background: `radial-gradient(circle, ${theme.glow2}35 0%, transparent 60%)`,
                        bottom: -200,
                        left: -100,
                    }}
                />

                {/* ── Content layer ── */}
                <div
                    style={{
                        position: "relative",
                        zIndex: 10,
                        height: "100%",
                        padding: "40px 52px",
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    {/* ── Top bar: logo + URL ── */}
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginBottom: 32,
                        }}
                    >
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                            <div
                                style={{
                                    width: 36,
                                    height: 36,
                                    borderRadius: 10,
                                    background: `linear-gradient(135deg, ${theme.glow1}, ${theme.accent})`,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    fontSize: 18,
                                }}
                            >
                                🪞
                            </div>
                            <span
                                style={{
                                    color: "rgba(255,255,255,0.7)",
                                    fontSize: 16,
                                    fontWeight: 600,
                                    letterSpacing: "0.06em",
                                }}
                            >
                                CIVIC MIRROR
                            </span>
                        </div>
                        <span
                            style={{
                                color: "rgba(255,255,255,0.3)",
                                fontSize: 12,
                                letterSpacing: "0.12em",
                                fontWeight: 500,
                            }}
                        >
                            civic-mirror.vercel.app
                        </span>
                    </div>

                    {/* ── Main two-column layout ── */}
                    <div
                        style={{
                            display: "flex",
                            flex: 1,
                            gap: 44,
                        }}
                    >
                        {/* LEFT COLUMN — archetype info */}
                        <div
                            style={{
                                width: 600,
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                            }}
                        >
                            {/* Archetype badge pill */}
                            <div
                                style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: 8,
                                    background: `${theme.glow2}80`,
                                    border: `1px solid ${theme.accent}40`,
                                    borderRadius: 100,
                                    padding: "6px 16px 6px 12px",
                                    marginBottom: 16,
                                    width: "fit-content",
                                }}
                            >
                                <span style={{ fontSize: 16 }}>{theme.emoji}</span>
                                <span
                                    style={{
                                        color: theme.accent,
                                        fontSize: 12,
                                        fontWeight: 700,
                                        letterSpacing: "0.1em",
                                    }}
                                >
                                    YOUR ARCHETYPE
                                </span>
                            </div>

                            {/* Title — plain white, no gradient text */}
                            <div
                                style={{
                                    color: "white",
                                    fontSize: 46,
                                    fontWeight: 800,
                                    lineHeight: 1.1,
                                    marginBottom: 16,
                                    letterSpacing: "-0.02em",
                                }}
                            >
                                {profile.title}
                            </div>

                            {/* Description — simple truncation */}
                            <div
                                style={{
                                    color: "rgba(255,255,255,0.5)",
                                    fontSize: 15,
                                    lineHeight: 1.7,
                                    marginBottom: 24,
                                    maxWidth: 500,
                                }}
                            >
                                {shortDesc}
                            </div>

                            {/* Stats row */}
                            <div style={{ display: "flex", gap: 12 }}>
                                {[
                                    { label: "DECISIONS", value: String(choiceCount) },
                                    { label: "SCENARIOS", value: "8" },
                                ].map((stat) => (
                                    <div
                                        key={stat.label}
                                        style={{
                                            background: "rgba(255,255,255,0.06)",
                                            borderRadius: 12,
                                            padding: "12px 20px",
                                            border: "1px solid rgba(255,255,255,0.08)",
                                        }}
                                    >
                                        <div
                                            style={{
                                                color: "rgba(255,255,255,0.35)",
                                                fontSize: 10,
                                                fontWeight: 600,
                                                letterSpacing: "0.12em",
                                                marginBottom: 4,
                                            }}
                                        >
                                            {stat.label}
                                        </div>
                                        <div
                                            style={{
                                                color: "white",
                                                fontSize: 24,
                                                fontWeight: 700,
                                            }}
                                        >
                                            {stat.value}
                                        </div>
                                    </div>
                                ))}

                                {/* Top strength badge */}
                                <div
                                    style={{
                                        background: "rgba(255,255,255,0.06)",
                                        borderRadius: 12,
                                        padding: "12px 20px",
                                        border: "1px solid rgba(255,255,255,0.08)",
                                        maxWidth: 200,
                                    }}
                                >
                                    <div
                                        style={{
                                            color: "rgba(255,255,255,0.35)",
                                            fontSize: 10,
                                            fontWeight: 600,
                                            letterSpacing: "0.12em",
                                            marginBottom: 4,
                                        }}
                                    >
                                        TOP STRENGTH
                                    </div>
                                    <div
                                        style={{
                                            color: theme.accent,
                                            fontSize: 14,
                                            fontWeight: 600,
                                            overflow: "hidden",
                                            whiteSpace: "nowrap" as const,
                                            textOverflow: "ellipsis",
                                        }}
                                    >
                                        {profile.strengths[0]?.split("—")[0]?.trim() || "Growth"}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT COLUMN — metrics panel */}
                        <div
                            style={{
                                width: 420,
                                background: "rgba(255,255,255,0.05)",
                                borderRadius: 20,
                                border: "1px solid rgba(255,255,255,0.1)",
                                padding: "28px 28px",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                            }}
                        >
                            <div
                                style={{
                                    color: "rgba(255,255,255,0.5)",
                                    fontSize: 11,
                                    fontWeight: 700,
                                    letterSpacing: "0.15em",
                                    marginBottom: 22,
                                }}
                            >
                                BEHAVIORAL FOOTPRINT
                            </div>

                            {/* Personal metrics — bar chart */}
                            {metricMeta.map(({ key, label }, i) => {
                                const value = metrics[key];
                                return (
                                    <div key={key} style={{ marginBottom: i < 3 ? 16 : 0 }}>
                                        <div
                                            style={{
                                                display: "flex",
                                                justifyContent: "space-between",
                                                alignItems: "center",
                                                marginBottom: 6,
                                            }}
                                        >
                                            <span
                                                style={{
                                                    color: "rgba(255,255,255,0.6)",
                                                    fontSize: 13,
                                                    fontWeight: 500,
                                                }}
                                            >
                                                {label}
                                            </span>
                                            <span
                                                style={{
                                                    color: "white",
                                                    fontSize: 14,
                                                    fontWeight: 700,
                                                }}
                                            >
                                                {value}%
                                            </span>
                                        </div>
                                        {/* Bar track */}
                                        <div
                                            style={{
                                                height: 10,
                                                borderRadius: 100,
                                                background: "rgba(255,255,255,0.08)",
                                                overflow: "hidden",
                                            }}
                                        >
                                            {/* Bar fill */}
                                            <div
                                                style={{
                                                    height: "100%",
                                                    width: `${value}%`,
                                                    borderRadius: 100,
                                                    background: `linear-gradient(90deg, ${theme.glow1}, ${theme.accent})`,
                                                }}
                                            />
                                        </div>
                                    </div>
                                );
                            })}

                            {/* Divider */}
                            <div
                                style={{
                                    height: 1,
                                    background: "rgba(255,255,255,0.1)",
                                    margin: "20px 0",
                                }}
                            />

                            {/* World state — compact row */}
                            <div style={{ display: "flex", gap: 10 }}>
                                {worldMeta.map(({ key, label }) => {
                                    const value = worldState[key];
                                    return (
                                        <div
                                            key={key}
                                            style={{
                                                flex: 1,
                                                background: "rgba(255,255,255,0.05)",
                                                borderRadius: 12,
                                                padding: "10px 8px",
                                                textAlign: "center" as const,
                                            }}
                                        >
                                            <div
                                                style={{
                                                    color: "white",
                                                    fontSize: 18,
                                                    fontWeight: 700,
                                                    marginBottom: 2,
                                                }}
                                            >
                                                {value}
                                            </div>
                                            <div
                                                style={{
                                                    color: "rgba(255,255,255,0.35)",
                                                    fontSize: 10,
                                                    fontWeight: 500,
                                                }}
                                            >
                                                {label}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* ── Bottom bar ── */}
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginTop: 24,
                        }}
                    >
                        <span
                            style={{
                                color: "rgba(255,255,255,0.2)",
                                fontSize: 11,
                                fontWeight: 500,
                            }}
                        >
                            {new Date().toLocaleDateString("en-US", {
                                month: "long",
                                day: "numeric",
                                year: "numeric",
                            })}
                        </span>
                        <span
                            style={{
                                color: "rgba(255,255,255,0.2)",
                                fontSize: 11,
                                fontWeight: 500,
                                fontStyle: "italic" as const,
                            }}
                        >
                            Discover your civic profile → civic-mirror.vercel.app
                        </span>
                    </div>
                </div>
            </div>
        );
    }
);

export default ShareableCard;
