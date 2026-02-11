"use client";

import { motion } from "framer-motion";

interface SceneIllustrationProps {
    scenarioId: string;
    className?: string;
}

/* ══════════════════════════════════════════════
   SHARED HIGH-FIDELITY CHARACTER SYSTEM
   ══════════════════════════════════════════════ */

/** Flat-art person with torso, head with hair, proper limbs */
function FlatPerson({
    x, y, shirtColor = "#64748b", hairColor = "#44403c",
    skinColor = "#f5d0b0", pantsColor = "#334155",
    scale = 1, delay = 0, facing = 1,
    armPose = "down", label, labelColor,
}: {
    x: number; y: number; shirtColor?: string; hairColor?: string;
    skinColor?: string; pantsColor?: string;
    scale?: number; delay?: number; facing?: 1 | -1;
    armPose?: "down" | "up" | "hold" | "hips";
    label?: string; labelColor?: string;
}) {
    return (
        <g transform={`translate(${x}, ${y}) scale(${scale * facing}, ${scale})`}>
            <motion.g
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay, duration: 0.5, ease: "easeOut" }}
            >
                {/* Shadow on ground */}
                <ellipse cx="0" cy="24" rx="8" ry="2.5" fill="#00000015" />

                {/* Legs */}
                <path d={`M-3,10 L-4,22`} stroke={pantsColor} strokeWidth="3.5" strokeLinecap="round" />
                <path d={`M3,10 L4,22`} stroke={pantsColor} strokeWidth="3.5" strokeLinecap="round" />
                {/* Shoes */}
                <ellipse cx="-4" cy="23" rx="3" ry="1.5" fill="#292524" />
                <ellipse cx="4" cy="23" rx="3" ry="1.5" fill="#292524" />

                {/* Torso */}
                <path d="M-7,-6 Q-8,-10 -5,-12 L5,-12 Q8,-10 7,-6 L6,11 L-6,11 Z"
                    fill={shirtColor} />

                {/* Arms */}
                {armPose === "down" && (
                    <>
                        <path d="M-7,-8 L-10,6" stroke={skinColor} strokeWidth="3" strokeLinecap="round" />
                        <path d="M7,-8 L10,6" stroke={skinColor} strokeWidth="3" strokeLinecap="round" />
                    </>
                )}
                {armPose === "up" && (
                    <>
                        <path d="M-7,-8 L-12,-16" stroke={skinColor} strokeWidth="3" strokeLinecap="round" />
                        <path d="M7,-8 L12,-16" stroke={skinColor} strokeWidth="3" strokeLinecap="round" />
                    </>
                )}
                {armPose === "hold" && (
                    <>
                        <path d="M-7,-8 L-10,0" stroke={skinColor} strokeWidth="3" strokeLinecap="round" />
                        <path d="M7,-8 L12,-4" stroke={skinColor} strokeWidth="3" strokeLinecap="round" />
                    </>
                )}
                {armPose === "hips" && (
                    <>
                        <path d="M-7,-6 L-11,2 L-7,4" stroke={skinColor} strokeWidth="3" strokeLinecap="round" fill="none" />
                        <path d="M7,-6 L11,2 L7,4" stroke={skinColor} strokeWidth="3" strokeLinecap="round" fill="none" />
                    </>
                )}

                {/* Neck */}
                <rect x="-2" y="-14" width="4" height="3" rx="1" fill={skinColor} />

                {/* Head */}
                <circle cx="0" cy="-20" r="7" fill={skinColor} />

                {/* Hair */}
                <path d="M-7,-22 Q-7,-28 0,-28 Q7,-28 7,-22 Q7,-19 5,-18 L-5,-18 Q-7,-19 -7,-22 Z"
                    fill={hairColor} />

                {/* Eyes */}
                <circle cx="-2.5" cy="-21" r="1" fill="#1e293b" />
                <circle cx="2.5" cy="-21" r="1" fill="#1e293b" />

                {/* Label */}
                {label && (
                    <text x="0" y="-34" textAnchor="middle" fill={labelColor || shirtColor}
                        fontSize="6" fontWeight="700" letterSpacing="0.05em">{label}</text>
                )}
            </motion.g>
        </g>
    );
}

/** Elder person — hunched, grey hair, walking stick */
function FlatElder({
    x, y, shirtColor = "#a16207", scale = 1, delay = 0, facing = 1,
}: {
    x: number; y: number; shirtColor?: string;
    scale?: number; delay?: number; facing?: 1 | -1;
}) {
    return (
        <g transform={`translate(${x}, ${y}) scale(${scale * facing}, ${scale})`}>
            <motion.g
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay, duration: 0.6, ease: "easeOut" }}
            >
                <ellipse cx="0" cy="24" rx="7" ry="2" fill="#00000012" />
                {/* Legs */}
                <path d="M-3,10 L-3,22" stroke="#57534e" strokeWidth="3" strokeLinecap="round" />
                <path d="M3,10 L5,22" stroke="#57534e" strokeWidth="3" strokeLinecap="round" />
                <ellipse cx="-3" cy="23" rx="3" ry="1.5" fill="#292524" />
                <ellipse cx="5" cy="23" rx="3" ry="1.5" fill="#292524" />
                {/* Walking stick */}
                <line x1="12" y1="-2" x2="14" y2="22" stroke="#78350f" strokeWidth="2.5" strokeLinecap="round" />
                {/* Torso — slightly hunched forward */}
                <path d="M-6,-6 L-4,-12 L5,-11 L7,-4 L5,11 L-5,11 Z" fill={shirtColor} />
                {/* Arms */}
                <path d="M-6,-6 L-9,4" stroke="#f5d0b0" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M7,-5 L12,-2" stroke="#f5d0b0" strokeWidth="2.5" strokeLinecap="round" />
                {/* Neck */}
                <rect x="-2" y="-14" width="4" height="3" rx="1" fill="#f5d0b0" />
                {/* Head */}
                <circle cx="0" cy="-20" r="6.5" fill="#f5d0b0" />
                {/* Grey hair */}
                <path d="M-6,-22 Q-6,-28 0,-28 Q6,-28 6,-22 L5,-19 L-5,-19 Z" fill="#d1d5db" />
                {/* Glasses */}
                <circle cx="-2.5" cy="-20" r="2.5" fill="none" stroke="#78716c" strokeWidth="0.8" />
                <circle cx="2.5" cy="-20" r="2.5" fill="none" stroke="#78716c" strokeWidth="0.8" />
                <line x1="-5" y1="-20" x2="-6.5" y2="-19" stroke="#78716c" strokeWidth="0.8" />
                <line x1="5" y1="-20" x2="6.5" y2="-19" stroke="#78716c" strokeWidth="0.8" />
                {/* Eyes behind glasses */}
                <circle cx="-2.5" cy="-20" r="0.8" fill="#1e293b" />
                <circle cx="2.5" cy="-20" r="0.8" fill="#1e293b" />
            </motion.g>
        </g>
    );
}

/** Seated person seen from side (for bus/metro) */
function SeatedPerson({
    x, y, shirtColor = "#64748b", hairColor = "#44403c",
    skinColor = "#f5d0b0", delay = 0,
}: {
    x: number; y: number; shirtColor?: string; hairColor?: string;
    skinColor?: string; delay?: number;
}) {
    return (
        <g transform={`translate(${x}, ${y})`}>
            <motion.g
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay, duration: 0.4 }}
            >
                {/* Seated torso */}
                <rect x="-5" y="-8" width="10" height="12" rx="2" fill={shirtColor} />
                {/* Bent legs */}
                <path d="M-4,4 L-4,8 L2,8" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                {/* Neck + Head */}
                <rect x="-1.5" y="-11" width="3" height="3" fill={skinColor} />
                <circle cx="0" cy="-16" r="5.5" fill={skinColor} />
                {/* Hair */}
                <path d="M-5,-18 Q-5,-24 0,-24 Q5,-24 5,-18 L4,-16 L-4,-16 Z" fill={hairColor} />
                {/* Eye */}
                <circle cx="1.5" cy="-17" r="0.8" fill="#1e293b" />
            </motion.g>
        </g>
    );
}


/* ══════════════════════════════════════════════
   SCENE 1 — Railway Station Queue
   ══════════════════════════════════════════════ */
function QueueRailwayScene() {
    return (
        <svg viewBox="0 0 400 180" className="w-full h-full">
            <defs>
                <linearGradient id="rs-sky" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#fef3c7" />
                    <stop offset="60%" stopColor="#fffbeb" />
                    <stop offset="100%" stopColor="#f5f5f4" />
                </linearGradient>
                <linearGradient id="rs-platform" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#d6d3d1" />
                    <stop offset="100%" stopColor="#e7e5e4" />
                </linearGradient>
            </defs>
            <rect width="400" height="180" fill="url(#rs-sky)" />

            {/* Background — Station pillars with roof */}
            <rect x="0" y="0" width="400" height="18" fill="#a8a29e" opacity={0.2} />
            {[60, 200, 340].map((px) => (
                <g key={px}>
                    <rect x={px - 5} y="18" width="10" height="120" fill="#d6d3d1" />
                    <rect x={px - 8} y="15" width="16" height="6" rx="1" fill="#a8a29e" />
                </g>
            ))}

            {/* Platform floor */}
            <rect x="0" y="138" width="400" height="42" fill="url(#rs-platform)" />
            <line x1="0" y1="138" x2="400" y2="138" stroke="#a8a29e" strokeWidth="1.5" />
            {/* Platform edge yellow stripe */}
            <rect x="0" y="138" width="400" height="3" fill="#fbbf24" opacity={0.6} />

            {/* Ticket Counter */}
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                <rect x="15" y="60" width="65" height="78" rx="3" fill="#78716c" />
                <rect x="15" y="60" width="65" height="12" rx="3" fill="#57534e" />
                <text x="47" y="69" textAnchor="middle" fill="#fafaf9" fontSize="6" fontWeight="700" letterSpacing="0.1em">TICKETS</text>
                {/* Window opening */}
                <rect x="22" y="78" width="50" height="30" rx="2" fill="#292524" opacity={0.7} />
                {/* Clerk */}
                <circle cx="47" cy="92" r="6" fill="#f5d0b0" />
                <path d="M41,98 L53,98 L54,108 L40,108 Z" fill="#3b82f6" />
                <path d="M42,86 Q47,82 52,86" fill="#44403c" />
            </motion.g>

            {/* Wall clock */}
            <g transform="translate(47, 42)">
                <circle cx="0" cy="0" r="9" fill="white" stroke="#a8a29e" strokeWidth="1.5" />
                {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((a) => (
                    <line key={a}
                        x1={Math.cos(a * Math.PI / 180) * 6.5} y1={Math.sin(a * Math.PI / 180) * 6.5}
                        x2={Math.cos(a * Math.PI / 180) * 7.5} y2={Math.sin(a * Math.PI / 180) * 7.5}
                        stroke="#78716c" strokeWidth="0.8" />
                ))}
                <motion.line x1="0" y1="0" x2="0" y2="-5.5"
                    stroke="#1e293b" strokeWidth="1.2" strokeLinecap="round"
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                    style={{ transformOrigin: "0px 0px" }} />
                <motion.line x1="0" y1="0" x2="4" y2="0"
                    stroke="#ef4444" strokeWidth="0.8" strokeLinecap="round"
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                    style={{ transformOrigin: "0px 0px" }} />
                <circle cx="0" cy="0" r="1" fill="#1e293b" />
            </g>

            {/* Queue of people */}
            <FlatPerson x={100} y={118} shirtColor="#6366f1" delay={0.15} />
            <FlatPerson x={128} y={118} shirtColor="#f59e0b" hairColor="#78350f" delay={0.25} />
            <FlatPerson x={156} y={118} shirtColor="#10b981" delay={0.35} />
            <FlatPerson x={184} y={118} shirtColor="#64748b" hairColor="#292524" delay={0.45} />
            <FlatPerson x={212} y={118} shirtColor="#ec4899" hairColor="#7c2d12" skinColor="#d4a574" delay={0.55} />
            <FlatPerson x={240} y={118} shirtColor="#8b5cf6" delay={0.65} />

            {/* YOU — arriving, highlighted */}
            <motion.g animate={{ x: [20, 0] }} transition={{ delay: 0.6, duration: 1.2, ease: "easeOut" }}>
                <FlatPerson x={290} y={118} shirtColor="#4f46e5" hairColor="#1e293b" delay={0.8}
                    label="YOU" labelColor="#4f46e5" />
            </motion.g>

            {/* Frustration emoji */}
            <motion.text x="210" y="82" fontSize="14" textAnchor="middle"
                animate={{ opacity: [0, 1, 0], y: [82, 76, 82] }}
                transition={{ duration: 2.5, repeat: Infinity, delay: 1.5 }}>😤</motion.text>

            <text x="380" y="172" textAnchor="end" fill="#a8a29e" fontSize="7" fontWeight="600"
                letterSpacing="0.12em" opacity={0.7}>RAILWAY STATION</text>
        </svg>
    );
}


/* ══════════════════════════════════════════════
   SCENE 2 — Loud Phone on City Bus
   ══════════════════════════════════════════════ */
function LoudPhoneScene() {
    return (
        <svg viewBox="0 0 400 180" className="w-full h-full">
            <defs>
                <linearGradient id="bus-sky" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#bfdbfe" />
                    <stop offset="100%" stopColor="#eff6ff" />
                </linearGradient>
            </defs>
            <rect width="400" height="180" fill="url(#bus-sky)" />

            {/* Road */}
            <rect x="0" y="148" width="400" height="32" fill="#64748b" />
            <motion.g animate={{ x: [-60, -300] }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }}>
                {Array.from({ length: 10 }, (_, i) => (
                    <rect key={i} x={i * 65} y="163" width="30" height="3" rx="1.5" fill="#fafaf9" opacity={0.4} />
                ))}
            </motion.g>

            {/* Bus body */}
            <motion.g initial={{ x: -30, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.7 }}>
                {/* Main body */}
                <rect x="25" y="38" width="350" height="110" rx="12" fill="#2563eb" />
                <rect x="25" y="38" width="350" height="110" rx="12" fill="none" stroke="#1d4ed8" strokeWidth="2" />
                {/* Accent stripe */}
                <rect x="25" y="115" width="350" height="10" fill="#1d4ed8" />
                {/* Roof detail */}
                <rect x="30" y="38" width="340" height="6" rx="3" fill="#1e40af" opacity={0.5} />

                {/* Windows */}
                {[48, 102, 156, 210, 264, 318].map((wx, i) => (
                    <g key={i}>
                        <rect x={wx} y="52" width="42" height="30" rx="4" fill="#dbeafe" stroke="#93c5fd" strokeWidth="1" />
                        {/* Window reflection */}
                        <line x1={wx + 3} y1="55" x2={wx + 3} y2="78" stroke="white" strokeWidth="1" opacity={0.3} />
                    </g>
                ))}

                {/* Front windshield */}
                <path d="M25,50 L25,90 L48,90 L48,52 Z" fill="#bfdbfe" stroke="#93c5fd" strokeWidth="1" />

                {/* Door */}
                <rect x="350" y="55" width="18" height="70" rx="2" fill="#93c5fd" stroke="#60a5fa" strokeWidth="1" />
                <line x1="359" y1="55" x2="359" y2="125" stroke="#60a5fa" strokeWidth="0.5" />

                {/* Route display */}
                <rect x="50" y="42" width="40" height="8" rx="2" fill="#1e293b" />
                <text x="70" y="49" textAnchor="middle" fill="#fbbf24" fontSize="5" fontWeight="700">42A</text>

                {/* Wheels */}
                {[85, 320].map((wx) => (
                    <g key={wx}>
                        <circle cx={wx} cy="150" r="14" fill="#292524" />
                        <circle cx={wx} cy="150" r="9" fill="#57534e" />
                        <circle cx={wx} cy="150" r="3" fill="#78716c" />
                    </g>
                ))}
            </motion.g>

            {/* Interior people visible through windows */}
            <SeatedPerson x={65} y={72} shirtColor="#94a3b8" delay={0.3} />
            <SeatedPerson x={120} y={72} shirtColor="#78716c" hairColor="#292524" delay={0.4} />
            <SeatedPerson x={228} y={72} shirtColor="#64748b" delay={0.5} />
            <SeatedPerson x={282} y={72} shirtColor="#a8a29e" hairColor="#78350f" delay={0.6} />
            <SeatedPerson x={336} y={72} shirtColor="#475569" delay={0.7} />

            {/* LOUD PERSON — highlighted red, with phone */}
            <g transform="translate(174, 72)">
                <SeatedPerson x={0} y={0} shirtColor="#ef4444" hairColor="#1e293b" delay={0.35} />
                {/* Phone held up */}
                <motion.g animate={{ rotate: [-3, 3, -3] }} transition={{ duration: 0.4, repeat: Infinity }}
                    style={{ transformOrigin: "8px -12px" }}>
                    <rect x="6" y="-18" width="5" height="9" rx="1" fill="#1e293b" />
                    <rect x="7" y="-17" width="3" height="6" rx="0.5" fill="#60a5fa" />
                </motion.g>
            </g>

            {/* Sound waves emanating */}
            {[0, 1, 2].map((i) => (
                <motion.path key={i}
                    d={`M192,${60 - i * 3} Q${198 + i * 5},${56 - i * 3} ${198 + i * 5},${64 - i * 3}`}
                    fill="none" stroke="#ef4444" strokeWidth={1.5 - i * 0.3} strokeLinecap="round"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 0.7, 0], scale: [0.9, 1.1, 0.9] }}
                    transition={{ duration: 1, repeat: Infinity, delay: i * 0.25 }} />
            ))}

            {/* Discomfort reactions */}
            <motion.text x="118" y="57" fontSize="10"
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: 1 }}>😣</motion.text>
            <motion.text x="278" y="57" fontSize="10"
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: 2 }}>😒</motion.text>

            <text x="370" y="172" textAnchor="end" fill="#93c5fd" fontSize="7" fontWeight="600"
                letterSpacing="0.12em" opacity={0.7}>CITY BUS</text>
        </svg>
    );
}


/* ══════════════════════════════════════════════
   SCENE 3 — Littered Park
   ══════════════════════════════════════════════ */
function LitterParkScene() {
    return (
        <svg viewBox="0 0 400 180" className="w-full h-full">
            <defs>
                <linearGradient id="pk-sky" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#bae6fd" />
                    <stop offset="50%" stopColor="#e0f2fe" />
                    <stop offset="100%" stopColor="#dcfce7" />
                </linearGradient>
                <radialGradient id="pk-sun" cx="0.5" cy="0.5" r="0.5">
                    <stop offset="0%" stopColor="#fde68a" />
                    <stop offset="100%" stopColor="#fbbf24" stopOpacity={0} />
                </radialGradient>
            </defs>
            <rect width="400" height="180" fill="url(#pk-sky)" />

            {/* Sun with glow */}
            <motion.g animate={{ scale: [1, 1.06, 1] }} transition={{ duration: 5, repeat: Infinity }}>
                <circle cx="355" cy="28" r="30" fill="url(#pk-sun)" />
                <circle cx="355" cy="28" r="13" fill="#fbbf24" />
                {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
                    <motion.line key={a}
                        x1={355 + Math.cos(a * Math.PI / 180) * 16}
                        y1={28 + Math.sin(a * Math.PI / 180) * 16}
                        x2={355 + Math.cos(a * Math.PI / 180) * 22}
                        y2={28 + Math.sin(a * Math.PI / 180) * 22}
                        stroke="#fbbf24" strokeWidth="2" strokeLinecap="round"
                        animate={{ opacity: [0.3, 0.8, 0.3] }}
                        transition={{ duration: 2, repeat: Infinity, delay: a / 400 }} />
                ))}
            </motion.g>

            {/* Rolling hills background */}
            <path d="M0,130 Q60,100 130,120 Q200,140 280,115 Q350,95 400,110 V180 H0 Z" fill="#86efac" opacity={0.5} />

            {/* Grass ground */}
            <path d="M0,130 Q100,118 200,128 Q300,138 400,125 V180 H0 Z" fill="#4ade80" />
            <path d="M0,140 Q150,132 250,142 Q350,150 400,138 V180 H0 Z" fill="#22c55e" />

            {/* Tree left — detailed */}
            <g transform="translate(50, 50)">
                <rect x="-4" y="30" width="8" height="55" rx="3" fill="#78350f" />
                {/* Bark texture */}
                <line x1="-2" y1="45" x2="-1" y2="60" stroke="#92400e" strokeWidth="1" opacity={0.4} />
                <line x1="1" y1="38" x2="2" y2="55" stroke="#92400e" strokeWidth="1" opacity={0.4} />
                {/* Branch */}
                <path d="M4,40 Q15,30 20,35" stroke="#78350f" strokeWidth="3" fill="none" strokeLinecap="round" />
                {/* Foliage */}
                <circle cx="0" cy="15" r="22" fill="#16a34a" />
                <circle cx="-14" cy="25" r="16" fill="#15803d" />
                <circle cx="16" cy="22" r="18" fill="#22c55e" />
                <circle cx="5" cy="5" r="15" fill="#4ade80" opacity={0.6} />
                {/* Leaf highlight */}
                <circle cx="-8" cy="10" r="5" fill="#86efac" opacity={0.4} />
            </g>

            {/* Tree right */}
            <g transform="translate(340, 60)">
                <rect x="-3" y="25" width="6" height="42" rx="2" fill="#78350f" />
                <circle cx="0" cy="12" r="18" fill="#16a34a" />
                <circle cx="-10" cy="20" r="13" fill="#22c55e" />
                <circle cx="12" cy="18" r="14" fill="#15803d" />
            </g>

            {/* Park bench */}
            <g transform="translate(135, 115)">
                <rect x="0" y="0" width="40" height="3" rx="1" fill="#92400e" />
                <rect x="0" y="5" width="40" height="3" rx="1" fill="#78350f" />
                <rect x="2" y="-12" width="3" height="14" fill="#57534e" />
                <rect x="35" y="-12" width="3" height="14" fill="#57534e" />
                <rect x="0" y="-14" width="40" height="3" rx="1" fill="#92400e" />
            </g>

            {/* Swing set */}
            <g transform="translate(270, 78)">
                {/* A-frame */}
                <line x1="-20" y1="50" x2="-6" y2="0" stroke="#78716c" strokeWidth="2.5" />
                <line x1="6" y1="0" x2="20" y2="50" stroke="#78716c" strokeWidth="2.5" />
                <line x1="-6" y1="0" x2="6" y2="0" stroke="#78716c" strokeWidth="3" />
                {/* Swinging child */}
                <motion.g
                    animate={{ rotate: [-20, 20, -20] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                    style={{ transformOrigin: "0px 0px" }}>
                    <line x1="0" y1="0" x2="0" y2="32" stroke="#a8a29e" strokeWidth="1.5" />
                    <rect x="-4" y="32" width="8" height="3" rx="1" fill="#78716c" />
                    {/* Child */}
                    <circle cx="0" cy="26" r="4" fill="#f472b6" />
                    <circle cx="0" cy="21" r="3" fill="#f5d0b0" />
                </motion.g>
            </g>

            {/* Family walking away */}
            <motion.g animate={{ x: [0, 40] }} transition={{ duration: 6, repeat: Infinity, ease: "linear" }}>
                <FlatPerson x={185} y={120} shirtColor="#475569" hairColor="#292524" delay={0.3} scale={0.7} />
                <FlatPerson x={198} y={120} shirtColor="#6b7280" hairColor="#78350f" skinColor="#d4a574" delay={0.4} scale={0.65} />
                <FlatPerson x={192} y={124} shirtColor="#f472b6" hairColor="#44403c" delay={0.5} scale={0.45} />
            </motion.g>

            {/* Litter scattered on ground */}
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8, duration: 0.6 }}>
                {/* Crushed can */}
                <ellipse cx="160" cy="142" rx="4" ry="2.5" fill="#ef4444" opacity={0.8} />
                <rect x="157" y="139" width="6" height="3" rx="1" fill="#dc2626" opacity={0.7} />
                {/* Plastic bottle */}
                <rect x="175" y="136" width="3.5" height="10" rx="1.5" fill="#38bdf8" opacity={0.6} />
                <rect x="176" y="134" width="1.5" height="3" rx="0.5" fill="#38bdf8" opacity={0.5} />
                {/* Wrapper */}
                <rect x="150" y="145" width="7" height="4" rx="0.5" fill="#fbbf24" transform="rotate(18, 153, 147)" />
                {/* Paper bag */}
                <rect x="190" y="140" width="8" height="6" rx="1" fill="#d6d3d1" transform="rotate(-12, 194, 143)" />
                {/* Chip packet */}
                <rect x="140" y="148" width="6" height="8" rx="1" fill="#a855f7" opacity={0.7} transform="rotate(8, 143, 152)" />
            </motion.g>

            {/* Drifting wrapper animation */}
            <motion.g
                animate={{ x: [0, 50, 60], y: [0, -12, 2], rotate: [0, 60, 120] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}>
                <rect x="170" y="135" width="5" height="3" rx="0.5" fill="#fbbf24" opacity={0.5} />
            </motion.g>

            <text x="380" y="172" textAnchor="end" fill="#86efac" fontSize="7" fontWeight="600"
                letterSpacing="0.12em" opacity={0.7}>PUBLIC PARK</text>
        </svg>
    );
}


/* ══════════════════════════════════════════════
   SCENE 4 — Priority Seat on Metro
   ══════════════════════════════════════════════ */
function PrioritySeatScene() {
    return (
        <svg viewBox="0 0 400 180" className="w-full h-full">
            <defs>
                <linearGradient id="mt-bg" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#ede9fe" />
                    <stop offset="100%" stopColor="#f5f3ff" />
                </linearGradient>
                <linearGradient id="mt-floor" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#d6d3d1" />
                    <stop offset="100%" stopColor="#e7e5e4" />
                </linearGradient>
            </defs>
            <rect width="400" height="180" fill="url(#mt-bg)" />

            {/* Metro car shell */}
            <rect x="8" y="16" width="384" height="148" rx="10" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="2" />
            {/* Interior ceiling */}
            <rect x="8" y="16" width="384" height="20" rx="10" fill="#e2e8f0" />

            {/* Overhead rail */}
            <line x1="18" y1="36" x2="382" y2="36" stroke="#94a3b8" strokeWidth="3" />

            {/* Hanging handles — swaying */}
            {[55, 105, 155, 205, 255, 305, 355].map((xPos, i) => (
                <motion.g key={i}
                    animate={{ rotate: [-4, 4, -4] }}
                    transition={{ duration: 3, repeat: Infinity, delay: i * 0.3, ease: "easeInOut" }}
                    style={{ transformOrigin: `${xPos}px 36px` }}>
                    <line x1={xPos} y1="36" x2={xPos} y2="52" stroke="#94a3b8" strokeWidth="1.5" />
                    <circle cx={xPos} cy="56" r="5" fill="none" stroke="#94a3b8" strokeWidth="2" />
                </motion.g>
            ))}

            {/* Floor */}
            <rect x="8" y="140" width="384" height="24" rx="0" fill="url(#mt-floor)" />

            {/* Priority section — left side */}
            <rect x="18" y="142" width="130" height="4" rx="2" fill="#8b5cf6" opacity={0.5} />
            <text x="83" y="138" textAnchor="middle" fill="#7c3aed" fontSize="5.5" fontWeight="700" letterSpacing="0.08em">⬥ PRIORITY SEATING ⬥</text>

            {/* Priority seats */}
            {[28, 68, 108].map((sx, i) => (
                <g key={i}>
                    <rect x={sx} y="105" width="28" height="35" rx="4" fill="#c4b5fd" stroke="#a78bfa" strokeWidth="1" />
                    <rect x={sx + 2} y="108" width="24" height="5" rx="2" fill="#ddd6fe" />
                </g>
            ))}

            {/* Regular seats */}
            {[200, 240, 280, 320].map((sx, i) => (
                <g key={i}>
                    <rect x={sx} y="105" width="28" height="35" rx="4" fill="#e2e8f0" stroke="#cbd5e1" strokeWidth="1" />
                    <rect x={sx + 2} y="108" width="24" height="5" rx="2" fill="#f1f5f9" />
                </g>
            ))}

            {/* YOU seated in priority seat */}
            <SeatedPerson x={42} y={98} shirtColor="#4f46e5" hairColor="#1e293b" delay={0.2} />
            <text x="42" y="78" textAnchor="middle" fill="#4f46e5" fontSize="6" fontWeight="700">YOU</text>

            {/* Other seated people */}
            <SeatedPerson x={82} y={98} shirtColor="#78716c" delay={0.3} />
            <SeatedPerson x={214} y={98} shirtColor="#64748b" hairColor="#292524" delay={0.4} />
            <SeatedPerson x={294} y={98} shirtColor="#94a3b8" delay={0.5} />

            {/* Door area on right */}
            <rect x="365" y="40" width="22" height="100" rx="3" fill="#f1f5f9" stroke="#e2e8f0" strokeWidth="1" />
            <motion.rect x="365" y="40" width="22" height="100" rx="3"
                fill="#a78bfa" opacity={0.15}
                animate={{ opacity: [0.15, 0.05, 0.15] }}
                transition={{ duration: 2, repeat: Infinity }} />

            {/* Elder entering through door */}
            <motion.g
                initial={{ x: 35, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.8, duration: 1.4, ease: "easeOut" }}>
                <FlatElder x={360} y={118} shirtColor="#a16207" delay={1} />
            </motion.g>

            {/* Door chime */}
            <motion.text x="380" y="34" fontSize="10"
                animate={{ opacity: [0, 1, 0], y: [34, 28, 34] }}
                transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}>🔔</motion.text>

            <text x="370" y="172" textAnchor="end" fill="#a78bfa" fontSize="7" fontWeight="600"
                letterSpacing="0.12em" opacity={0.7}>METRO TRAIN</text>
        </svg>
    );
}


/* ══════════════════════════════════════════════
   SCENE 5 — Street Vendor / Marketplace
   ══════════════════════════════════════════════ */
function StreetVendorScene() {
    return (
        <svg viewBox="0 0 400 180" className="w-full h-full">
            <defs>
                <linearGradient id="mk-bg" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#fce7f3" />
                    <stop offset="60%" stopColor="#fff1f2" />
                    <stop offset="100%" stopColor="#fef2f2" />
                </linearGradient>
            </defs>
            <rect width="400" height="180" fill="url(#mk-bg)" />

            {/* Background market stalls */}
            <g opacity={0.3}>
                {/* Stall left */}
                <rect x="5" y="50" width="55" height="90" rx="3" fill="#fbbf24" />
                <path d="M0,50 L32,28 L60,50" fill="#f59e0b" />
                {/* Stall right */}
                <rect x="345" y="55" width="55" height="85" rx="3" fill="#60a5fa" />
                <path d="M340,55 L372,33 L400,55" fill="#3b82f6" />
            </g>

            {/* Ground — cobblestone feel */}
            <rect x="0" y="140" width="400" height="40" fill="#d6d3d1" />
            <rect x="0" y="140" width="400" height="2" fill="#a8a29e" opacity={0.4} />

            {/* Vendor Cart — detailed */}
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
                {/* Cart frame */}
                <rect x="130" y="95" width="70" height="40" rx="4" fill="#78350f" stroke="#57534e" strokeWidth="1" />
                {/* Cart shelf */}
                <rect x="127" y="92" width="76" height="4" rx="1" fill="#a8a29e" />
                {/* Awning */}
                <path d="M125,92 L165,72 L205,92" fill="#ef4444" opacity={0.8} />
                <path d="M125,92 L165,72 L205,92" fill="none" stroke="#dc2626" strokeWidth="1" />
                {/* Striped awning detail */}
                <line x1="135" y1="89" x2="155" y2="76" stroke="white" strokeWidth="1" opacity={0.3} />
                <line x1="155" y1="89" x2="165" y2="76" stroke="white" strokeWidth="1" opacity={0.3} />
                <line x1="175" y1="89" x2="175" y2="76" stroke="white" strokeWidth="1" opacity={0.3} />

                {/* Fruits arranged on display */}
                {/* Row 1 */}
                <circle cx="140" cy="89" r="4" fill="#ef4444" stroke="#dc2626" strokeWidth="0.5" />
                <circle cx="150" cy="89" r="4" fill="#f97316" stroke="#ea580c" strokeWidth="0.5" />
                <circle cx="160" cy="89" r="4" fill="#eab308" stroke="#ca8a04" strokeWidth="0.5" />
                <circle cx="170" cy="89" r="4" fill="#22c55e" stroke="#16a34a" strokeWidth="0.5" />
                <circle cx="180" cy="89" r="4" fill="#a855f7" stroke="#9333ea" strokeWidth="0.5" />
                <circle cx="190" cy="89" r="4" fill="#ef4444" stroke="#dc2626" strokeWidth="0.5" />
                {/* Row 2 */}
                <circle cx="145" cy="82" r="3.5" fill="#fbbf24" stroke="#f59e0b" strokeWidth="0.5" />
                <circle cx="155" cy="82" r="3.5" fill="#22c55e" stroke="#16a34a" strokeWidth="0.5" />
                <circle cx="165" cy="82" r="3.5" fill="#f97316" stroke="#ea580c" strokeWidth="0.5" />
                <circle cx="175" cy="82" r="3.5" fill="#ef4444" stroke="#dc2626" strokeWidth="0.5" />
                <circle cx="185" cy="82" r="3.5" fill="#fbbf24" stroke="#f59e0b" strokeWidth="0.5" />

                {/* Cart wheels */}
                <circle cx="145" cy="138" r="7" fill="#292524" />
                <circle cx="145" cy="138" r="3" fill="#57534e" />
                <circle cx="185" cy="138" r="7" fill="#292524" />
                <circle cx="185" cy="138" r="3" fill="#57534e" />
                {/* Cart handle */}
                <line x1="127" y1="110" x2="115" y2="105" stroke="#57534e" strokeWidth="3" strokeLinecap="round" />
            </motion.g>

            {/* Vendor (elderly woman) */}
            <motion.g animate={{ y: [0, 1.5, 0] }} transition={{ duration: 2, repeat: Infinity }}>
                <FlatElder x={110} y={118} shirtColor="#92400e" delay={0.3} />
            </motion.g>

            {/* Animated tears */}
            {[0, 1].map((i) => (
                <motion.circle key={i}
                    cx={108 + i * 4} cy={98} r={1.2} fill="#38bdf8"
                    animate={{ y: [0, 12], opacity: [0.8, 0] }}
                    transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.6 }} />
            ))}

            {/* Officer */}
            <FlatPerson x={225} y={118} shirtColor="#1e3a8a" pantsColor="#1e293b" hairColor="#0f172a"
                delay={0.4} scale={1.05} armPose="hips" facing={-1} />
            {/* Officer cap brim */}
            <rect x="220" y="89" width="12" height="3" rx="1" fill="#1e3a8a" />

            {/* Grabbing motion lines */}
            <motion.g animate={{ opacity: [0, 0.5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                <line x1="213" y1="112" x2="203" y2="108" stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="213" y1="116" x2="205" y2="114" stroke="#ef4444" strokeWidth="1" strokeLinecap="round" />
            </motion.g>

            {/* Bystanders watching */}
            <FlatPerson x={275} y={118} shirtColor="#94a3b8" hairColor="#57534e" delay={0.6} scale={0.8} />
            <FlatPerson x={300} y={118} shirtColor="#78716c" hairColor="#292524" skinColor="#d4a574" delay={0.7} scale={0.8} />
            <FlatPerson x={325} y={120} shirtColor="#a8a29e" hairColor="#78350f" delay={0.8} scale={0.7} />

            {/* Phone recording with red dot */}
            <motion.g>
                <rect x="296" y="100" width="5" height="9" rx="1" fill="#1e293b" />
                <rect x="297" y="101" width="3" height="6" rx="0.5" fill="#334155" />
                <motion.circle cx="298" cy="102" r="1" fill="#ef4444"
                    animate={{ opacity: [0, 1, 0] }} transition={{ duration: 0.8, repeat: Infinity }} />
            </motion.g>

            <text x="380" y="172" textAnchor="end" fill="#fda4af" fontSize="7" fontWeight="600"
                letterSpacing="0.12em" opacity={0.7}>MARKETPLACE</text>
        </svg>
    );
}



/* ══════════════════════════════════════════════
   SCENE 6 — Water Wastage / Broken Pipe
   ══════════════════════════════════════════════ */
function WaterWastageScene() {
    return (
        <svg viewBox="0 0 400 180" className="w-full h-full">
            <defs>
                <linearGradient id="wt-bg" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#bae6fd" />
                    <stop offset="100%" stopColor="#f0f9ff" />
                </linearGradient>
            </defs>
            <rect width="400" height="180" fill="url(#wt-bg)" />

            {/* Sun */}
            <circle cx="350" cy="28" r="14" fill="#fbbf24" />
            {[0, 60, 120, 180, 240, 300].map((a) => (
                <line key={a}
                    x1={350 + Math.cos(a * Math.PI / 180) * 17}
                    y1={28 + Math.sin(a * Math.PI / 180) * 17}
                    x2={350 + Math.cos(a * Math.PI / 180) * 21}
                    y2={28 + Math.sin(a * Math.PI / 180) * 21}
                    stroke="#fbbf24" strokeWidth="1.5" strokeLinecap="round" />
            ))}

            {/* Ground */}
            <rect x="0" y="140" width="400" height="40" fill="#d6d3d1" />

            {/* Neighbor's house */}
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
                <rect x="50" y="55" width="130" height="85" rx="3" fill="#fef3c7" stroke="#fbbf24" strokeWidth="1.5" />
                <polygon points="40,55 115,18 190,55" fill="#f97316" />
                <polygon points="40,55 115,18 190,55" fill="none" stroke="#ea580c" strokeWidth="1" />
                <rect x="150" y="25" width="12" height="30" rx="1" fill="#a8a29e" />
                <rect x="100" y="95" width="25" height="45" rx="2" fill="#78350f" stroke="#57534e" strokeWidth="1" />
                <circle cx="120" cy="120" r="2" fill="#fbbf24" />
                <rect x="65" y="72" width="22" height="20" rx="2" fill="#bfdbfe" stroke="#60a5fa" strokeWidth="1" />
                <line x1="76" y1="72" x2="76" y2="92" stroke="#93c5fd" strokeWidth="0.5" />
                <line x1="65" y1="82" x2="87" y2="82" stroke="#93c5fd" strokeWidth="0.5" />
                <rect x="140" y="72" width="22" height="20" rx="2" fill="#bfdbfe" stroke="#60a5fa" strokeWidth="1" />
            </motion.g>

            {/* Pipe */}
            <rect x="180" y="60" width="5" height="50" rx="1.5" fill="#94a3b8" />
            <rect x="178" y="108" width="9" height="7" rx="1" fill="#64748b" />
            <path d="M183,100 L186,103 L182,106" stroke="#ef4444" strokeWidth="1" fill="none" />

            {/* Water drops */}
            {[0, 1, 2, 3, 4, 5].map((i) => (
                <motion.ellipse key={i}
                    cx={183} cy={115} rx={2} ry={1.5} fill="#38bdf8" opacity={0.7}
                    animate={{ cy: [115, 148], cx: [183, 186 + i * 3], opacity: [0.7, 0] }}
                    transition={{ duration: 1, repeat: Infinity, delay: i * 0.2, ease: "easeIn" }} />
            ))}

            {/* Water stream on ground */}
            <motion.path
                d="M186,143 Q210,146 240,144 Q280,142 330,145 Q370,148 400,144"
                stroke="#38bdf8" strokeWidth="3.5" fill="none" strokeLinecap="round"
                strokeDasharray="8 5"
                animate={{ strokeDashoffset: [0, -26] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }} />
            <ellipse cx="240" cy="146" rx="25" ry="5" fill="#7dd3fc" opacity={0.4} />

            {/* Your house */}
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
                <rect x="250" y="65" width="110" height="75" rx="3" fill="#f5f5f4" stroke="#d6d3d1" strokeWidth="1.5" />
                <polygon points="240,65 305,32 370,65" fill="#64748b" />
                <rect x="290" y="100" width="22" height="40" rx="2" fill="#78716c" />
                <rect x="262" y="78" width="18" height="16" rx="2" fill="#bfdbfe" stroke="#60a5fa" strokeWidth="1" />
                <rect x="330" y="78" width="18" height="16" rx="2" fill="#bfdbfe" stroke="#60a5fa" strokeWidth="1" />
            </motion.g>

            {/* You peeking */}
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2, duration: 0.5 }}>
                <circle cx="271" cy="86" r="4" fill="#4f46e5" />
            </motion.g>

            <text x="380" y="172" textAnchor="end" fill="#7dd3fc" fontSize="7" fontWeight="600"
                letterSpacing="0.12em" opacity={0.7}>NEIGHBORHOOD</text>
        </svg>
    );
}


/* ══════════════════════════════════════════════
   SCENE 7 — Accident Witness (Wet Road)
   ══════════════════════════════════════════════ */
function AccidentScene() {
    return (
        <svg viewBox="0 0 400 180" className="w-full h-full">
            <defs>
                <linearGradient id="ac-bg" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#94a3b8" />
                    <stop offset="40%" stopColor="#cbd5e1" />
                    <stop offset="100%" stopColor="#e2e8f0" />
                </linearGradient>
            </defs>
            <rect width="400" height="180" fill="url(#ac-bg)" />

            {/* Clouds */}
            <motion.g animate={{ x: [0, 12, 0] }} transition={{ duration: 10, repeat: Infinity }}>
                <ellipse cx="70" cy="22" rx="50" ry="16" fill="#64748b" opacity={0.5} />
                <ellipse cx="150" cy="15" rx="40" ry="12" fill="#94a3b8" opacity={0.4} />
                <ellipse cx="280" cy="20" rx="45" ry="14" fill="#64748b" opacity={0.3} />
            </motion.g>

            {/* Rain */}
            {Array.from({ length: 16 }, (_, i) => (
                <motion.line key={i}
                    x1={20 + i * 24} y1={10} x2={14 + i * 24} y2={22}
                    stroke="#94a3b8" strokeWidth="1" opacity={0.25}
                    animate={{ y: [0, 160], opacity: [0.25, 0] }}
                    transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.1, ease: "linear" }} />
            ))}

            {/* Road */}
            <rect x="0" y="115" width="400" height="65" fill="#475569" />
            <rect x="0" y="115" width="400" height="65" fill="#94a3b8" opacity={0.12} />
            <line x1="0" y1="146" x2="400" y2="146" stroke="#fbbf24" strokeWidth="2" strokeDasharray="18 12" />

            {/* Streetlight */}
            <rect x="85" y="40" width="3.5" height="75" fill="#475569" />
            <motion.circle cx="87" cy="38" r="6" fill="#fbbf24" opacity={0.5}
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 3, repeat: Infinity }} />
            <path d="M81,44 L70,115 L104,115 L93,44 Z" fill="#fbbf24" opacity={0.04} />

            {/* Fallen bike */}
            <motion.g initial={{ rotate: 0 }} animate={{ rotate: -50 }}
                transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
                style={{ transformOrigin: "155px 132px" }}>
                <circle cx="140" cy="132" r="11" fill="none" stroke="#dc2626" strokeWidth="2.5" />
                <circle cx="172" cy="132" r="11" fill="none" stroke="#dc2626" strokeWidth="2.5" />
                <line x1="140" y1="132" x2="156" y2="118" stroke="#ef4444" strokeWidth="2.5" />
                <line x1="172" y1="132" x2="156" y2="118" stroke="#ef4444" strokeWidth="2.5" />
                <line x1="156" y1="118" x2="160" y2="112" stroke="#78716c" strokeWidth="2" strokeLinecap="round" />
                <ellipse cx="150" cy="118" rx="4" ry="2" fill="#292524" />
            </motion.g>

            {/* Fallen rider */}
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
                <circle cx="198" cy="136" r="5.5" fill="#f5d0b0" />
                <path d="M198,141 L218,138" stroke="#57534e" strokeWidth="3" strokeLinecap="round" />
                <path d="M218,138 L226,148" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M218,138 L230,136" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
                <motion.circle cx="224" cy="142" r="2.5" fill="#ef4444" opacity={0.7}
                    animate={{ r: [2.5, 3.5, 2.5] }}
                    transition={{ duration: 2, repeat: Infinity }} />
            </motion.g>

            {/* Scattered packages */}
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
                <rect x="235" y="130" width="12" height="9" rx="1.5" fill="#fbbf24" transform="rotate(22, 241, 134)" />
                <rect x="252" y="135" width="9" height="7" rx="1" fill="#f97316" transform="rotate(-18, 256, 138)" />
                <rect x="218" y="148" width="14" height="8" rx="1.5" fill="#a78bfa" transform="rotate(12, 225, 152)" />
            </motion.g>

            {/* Passing car */}
            <motion.g animate={{ x: [-120, 520] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "linear", delay: 1.5 }}>
                <rect x="0" y="122" width="40" height="16" rx="5" fill="#1e293b" />
                <rect x="5" y="116" width="30" height="8" rx="3" fill="#1e293b" />
                <rect x="8" y="117" width="10" height="6" rx="1.5" fill="#bfdbfe" opacity={0.7} />
                <rect x="22" y="117" width="10" height="6" rx="1.5" fill="#bfdbfe" opacity={0.7} />
                <rect x="38" y="126" width="3" height="4" rx="1" fill="#fde68a" />
                <circle cx="10" cy="140" r="4" fill="#0f172a" />
                <circle cx="30" cy="140" r="4" fill="#0f172a" />
            </motion.g>

            {/* You */}
            <FlatPerson x={320} y={118} shirtColor="#4f46e5" hairColor="#1e293b" delay={0.8}
                label="YOU" labelColor="#4f46e5" />

            <text x="380" y="172" textAnchor="end" fill="#94a3b8" fontSize="7" fontWeight="600"
                letterSpacing="0.12em" opacity={0.7}>WET ROAD · DUSK</text>
        </svg>
    );
}


/* ══════════════════════════════════════════════
   SCENE 8 — Community Meeting
   ══════════════════════════════════════════════ */
function CommunityMeetingScene() {
    return (
        <svg viewBox="0 0 400 180" className="w-full h-full">
            <defs>
                <linearGradient id="cm-bg" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#e0e7ff" />
                    <stop offset="100%" stopColor="#eef2ff" />
                </linearGradient>
            </defs>
            <rect width="400" height="180" fill="url(#cm-bg)" />

            {/* Hall interior */}
            <rect x="8" y="16" width="384" height="148" rx="8" fill="#fafaf9" stroke="#e7e5e4" strokeWidth="1.5" />
            {/* Floor */}
            <rect x="8" y="140" width="384" height="24" rx="0" fill="#e7e5e4" />

            {/* Whiteboard at front */}
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 0.5 }}>
                <rect x="140" y="26" width="120" height="55" rx="4" fill="white" stroke="#d6d3d1" strokeWidth="2" />
                {/* Whiteboard tray */}
                <rect x="140" y="81" width="120" height="4" rx="1" fill="#a8a29e" />
                {/* Content */}
                <text x="200" y="44" textAnchor="middle" fill="#ef4444" fontSize="7" fontWeight="800" letterSpacing="0.05em">PROPOSAL</text>
                <line x1="160" y1="49" x2="240" y2="49" stroke="#e7e5e4" strokeWidth="0.5" />
                <text x="200" y="60" textAnchor="middle" fill="#57534e" fontSize="5.5">Community Garden</text>
                <text x="200" y="68" textAnchor="middle" fill="#ef4444" fontSize="5.5" fontWeight="700">→ Parking Lot</text>
                {/* Markers in tray */}
                <rect x="155" y="82" width="8" height="2" rx="0.5" fill="#ef4444" />
                <rect x="166" y="82" width="8" height="2" rx="0.5" fill="#3b82f6" />
            </motion.g>

            {/* Rows of chairs with people */}
            {/* Row 1 — front */}
            {[65, 95, 125, 155, 185, 215, 245, 275, 305, 335].map((cx, i) => (
                <motion.g key={`r1-${i}`}
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 + i * 0.04 }}>
                    {/* Chair */}
                    <rect x={cx - 9} y="102" width="18" height="12" rx="2" fill="#d6d3d1" stroke="#a8a29e" strokeWidth="0.5" />
                    <rect x={cx - 7} y="95" width="2" height="8" fill="#a8a29e" />
                    <rect x={cx + 5} y="95" width="2" height="8" fill="#a8a29e" />
                    {/* Person head */}
                    <circle cx={cx} cy="90" r="4.5"
                        fill={i === 4 ? "#4f46e5" : ["#78716c", "#57534e", "#a8a29e", "#64748b", "#78716c", "#94a3b8", "#57534e", "#78716c", "#a8a29e"][i] || "#78716c"} />
                    {/* Hair */}
                    <path d={`M${cx - 4},${88} Q${cx},${84} ${cx + 4},${88}`}
                        fill={i === 4 ? "#1e293b" : ["#44403c", "#292524", "#78350f", "#44403c", "#1e293b", "#292524", "#57534e", "#44403c", "#78350f"][i] || "#44403c"} />
                    {/* Shoulders */}
                    <rect x={cx - 6} y="94" width="12" height="5" rx="2"
                        fill={i === 4 ? "#4f46e5" : ["#78716c", "#57534e", "#a8a29e", "#64748b", "#78716c", "#94a3b8", "#57534e", "#78716c", "#a8a29e"][i] || "#78716c"} />
                </motion.g>
            ))}

            {/* "YOU" label */}
            <text x="185" y="78" textAnchor="middle" fill="#4f46e5" fontSize="5" fontWeight="700">YOU</text>

            {/* Row 2 — back */}
            {[80, 110, 140, 170, 200, 230, 260, 290, 320].map((cx, i) => (
                <motion.g key={`r2-${i}`}
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 + i * 0.04 }}>
                    <rect x={cx - 9} y="128" width="18" height="12" rx="2" fill="#d6d3d1" stroke="#a8a29e" strokeWidth="0.5" />
                    <circle cx={cx} cy="118" r="4"
                        fill={i >= 7 ? "#92400e" : "#a8a29e"} />
                    <rect x={cx - 5} y="122" width="10" height="4" rx="1.5"
                        fill={i >= 7 ? "#92400e" : "#a8a29e"} />
                </motion.g>
            ))}

            {/* Elderly worried emoji */}
            <motion.text x="316" y="112" fontSize="7"
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 3, repeat: Infinity }}>😟</motion.text>

            {/* Window showing garden outside */}
            <g>
                <rect x="340" y="30" width="40" height="50" rx="3" fill="#86efac" opacity={0.5} stroke="#d6d3d1" strokeWidth="1" />
                {/* Tree */}
                <rect x="356" y="48" width="3" height="14" fill="#78350f" />
                <circle cx="357" cy="42" r="9" fill="#22c55e" opacity={0.8} />
                <circle cx="352" cy="46" r="6" fill="#16a34a" opacity={0.6} />
                {/* Flowers */}
                <circle cx="348" y="68" r="2" fill="#f472b6" />
                <circle cx="366" y="68" r="2" fill="#fbbf24" />
            </g>

            {/* Children at window */}
            <motion.g animate={{ y: [0, -2, 0] }} transition={{ duration: 2.5, repeat: Infinity }}>
                <circle cx="345" cy="76" r="3.5" fill="#f472b6" />
                <circle cx="355" cy="78" r="3.5" fill="#60a5fa" />
                {/* Tiny hands on windowsill */}
                <rect x="342" y="79" width="5" height="2" rx="0.5" fill="#f5d0b0" />
                <rect x="352" y="80" width="5" height="2" rx="0.5" fill="#f5d0b0" />
            </motion.g>

            {/* Speaker standing at front */}
            <FlatPerson x={50} y={108} shirtColor="#334155" hairColor="#1e293b" delay={0.2} scale={0.85} armPose="hold" />

            <text x="375" y="172" textAnchor="end" fill="#a5b4fc" fontSize="7" fontWeight="600"
                letterSpacing="0.12em" opacity={0.7}>COMMUNITY HALL</text>
        </svg>
    );
}


/* ══════════════════════════════════════════════
   MAIN EXPORT
   ══════════════════════════════════════════════ */
const sceneComponents: Record<string, React.ComponentType> = {
    "queue-railway": QueueRailwayScene,
    "loud-phone": LoudPhoneScene,
    "litter-park": LitterParkScene,
    "priority-seat": PrioritySeatScene,
    "street-vendor": StreetVendorScene,
    "water-wastage": WaterWastageScene,
    "accident-witness": AccidentScene,
    "community-meeting": CommunityMeetingScene,
};

export default function SceneIllustration({
    scenarioId,
    className = "",
}: SceneIllustrationProps) {
    const SceneComponent = sceneComponents[scenarioId];

    if (!SceneComponent) {
        return null;
    }

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className={`relative overflow-hidden rounded-2xl shadow-sm border border-stone-200/40 ${className}`}
        >
            <SceneComponent />
        </motion.div>
    );
}
