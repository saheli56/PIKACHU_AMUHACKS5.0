"use client";

import { motion } from "framer-motion";

interface SceneIllustrationProps {
    scenarioId: string;
    className?: string;
}

/* ─────────────────────────────────────────────
   Shared SVG building blocks
   ───────────────────────────────────────────── */

// Simple stick-figure person
function Person({
    x,
    y,
    fill = "#78716c",
    scale = 1,
    delay = 0,
    animate,
}: {
    x: number;
    y: number;
    fill?: string;
    scale?: number;
    delay?: number;
    animate?: Record<string, unknown>;
}) {
    return (
        <motion.g
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0, ...animate }}
            transition={{ delay, duration: 0.5 }}
            transform={`translate(${x}, ${y}) scale(${scale})`}
        >
            {/* Head */}
            <circle cx="0" cy="-16" r="5" fill={fill} />
            {/* Body */}
            <line x1="0" y1="-11" x2="0" y2="2" stroke={fill} strokeWidth="2.5" strokeLinecap="round" />
            {/* Arms */}
            <line x1="-7" y1="-6" x2="7" y2="-6" stroke={fill} strokeWidth="2" strokeLinecap="round" />
            {/* Legs */}
            <line x1="0" y1="2" x2="-5" y2="12" stroke={fill} strokeWidth="2" strokeLinecap="round" />
            <line x1="0" y1="2" x2="5" y2="12" stroke={fill} strokeWidth="2" strokeLinecap="round" />
        </motion.g>
    );
}

// Elder person with walking stick
function ElderPerson({
    x,
    y,
    fill = "#78716c",
    delay = 0,
}: {
    x: number;
    y: number;
    fill?: string;
    delay?: number;
}) {
    return (
        <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay, duration: 0.6 }}
            transform={`translate(${x}, ${y})`}
        >
            {/* Head */}
            <circle cx="0" cy="-16" r="5" fill={fill} />
            {/* Hair hint */}
            <path d="M-4,-19 Q0,-22 4,-19" stroke="#d6d3d1" strokeWidth="1.5" fill="none" />
            {/* Body - slightly hunched */}
            <path d="M0,-11 Q2,-4 1,2" stroke={fill} strokeWidth="2.5" fill="none" strokeLinecap="round" />
            {/* Arms */}
            <line x1="-6" y1="-7" x2="6" y2="-5" stroke={fill} strokeWidth="2" strokeLinecap="round" />
            {/* Walking stick */}
            <motion.line
                x1="8" y1="-5" x2="10" y2="14"
                stroke="#a8a29e" strokeWidth="2" strokeLinecap="round"
            />
            {/* Legs */}
            <line x1="1" y1="2" x2="-3" y2="12" stroke={fill} strokeWidth="2" strokeLinecap="round" />
            <line x1="1" y1="2" x2="5" y2="12" stroke={fill} strokeWidth="2" strokeLinecap="round" />
        </motion.g>
    );
}

/* ─────────────────────────────────────────────
   Scene 1: Railway Queue
   ───────────────────────────────────────────── */
function QueueRailwayScene() {
    return (
        <svg viewBox="0 0 400 180" className="w-full h-full">
            {/* Sky / background */}
            <rect width="400" height="180" fill="url(#railway-sky)" rx="0" />
            <defs>
                <linearGradient id="railway-sky" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#fef3c7" />
                    <stop offset="100%" stopColor="#fffbeb" />
                </linearGradient>
            </defs>

            {/* Station platform */}
            <rect x="0" y="140" width="400" height="40" fill="#e7e5e4" />
            <rect x="0" y="138" width="400" height="4" fill="#d6d3d1" />

            {/* Ticket counter */}
            <motion.g
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <rect x="20" y="80" width="50" height="60" rx="4" fill="#a8a29e" />
                <rect x="25" y="85" width="40" height="25" rx="2" fill="#78716c" />
                <text x="45" y="102" textAnchor="middle" fill="#fafaf9" fontSize="7" fontWeight="600">TICKETS</text>
                {/* Counter person */}
                <circle cx="45" cy="120" r="5" fill="#57534e" />
                <rect x="39" y="125" width="12" height="8" rx="2" fill="#57534e" />
            </motion.g>

            {/* Queue of people - staggered entrance */}
            <Person x={90} y={128} fill="#6366f1" delay={0.2} />
            <Person x={115} y={128} fill="#78716c" delay={0.3} />
            <Person x={140} y={128} fill="#57534e" delay={0.4} />
            <Person x={165} y={128} fill="#78716c" delay={0.5} />
            <Person x={190} y={128} fill="#a8a29e" delay={0.6} />
            <Person x={215} y={128} fill="#57534e" delay={0.7} />

            {/* The "you" person further back */}
            <Person x={260} y={128} fill="#4f46e5" delay={0.9} scale={1.1} />

            {/* Waving person at front */}
            <motion.g
                transform="translate(93, 108)"
                animate={{ rotate: [-10, 10, -10] }}
                transition={{ duration: 1.5, repeat: Infinity }}
            >
                <line x1="0" y1="0" x2="-8" y2="-10" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" />
            </motion.g>

            {/* Clock on wall */}
            <motion.g>
                <circle cx="45" cy="60" r="10" fill="white" stroke="#d6d3d1" strokeWidth="1.5" />
                <motion.line
                    x1="45" y1="60" x2="45" y2="53"
                    stroke="#57534e" strokeWidth="1.5" strokeLinecap="round"
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    style={{ transformOrigin: "45px 60px" }}
                />
                <motion.line
                    x1="45" y1="60" x2="50" y2="60"
                    stroke="#ef4444" strokeWidth="1" strokeLinecap="round"
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                    style={{ transformOrigin: "45px 60px" }}
                />
            </motion.g>

            {/* Impatience indicators - small wavy lines above some people */}
            <motion.text
                x="190" y="105"
                fontSize="10" fill="#ef4444"
                animate={{ opacity: [0, 1, 0], y: [105, 100, 105] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
            >😤</motion.text>

            {/* Label */}
            <text x="350" y="170" textAnchor="end" fill="#a8a29e" fontSize="8" fontWeight="600" letterSpacing="0.1em">RAILWAY STATION</text>
        </svg>
    );
}

/* ─────────────────────────────────────────────
   Scene 2: Loud Phone on Bus
   ───────────────────────────────────────────── */
function LoudPhoneScene() {
    return (
        <svg viewBox="0 0 400 180" className="w-full h-full">
            <defs>
                <linearGradient id="bus-sky" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#dbeafe" />
                    <stop offset="100%" stopColor="#eff6ff" />
                </linearGradient>
            </defs>
            <rect width="400" height="180" fill="url(#bus-sky)" />

            {/* Bus body */}
            <motion.g
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
            >
                <rect x="30" y="40" width="340" height="100" rx="10" fill="#3b82f6" />
                <rect x="30" y="40" width="340" height="100" rx="10" fill="none" stroke="#2563eb" strokeWidth="2" />

                {/* Windows */}
                <rect x="50" y="55" width="40" height="30" rx="4" fill="#bfdbfe" />
                <rect x="100" y="55" width="40" height="30" rx="4" fill="#bfdbfe" />
                <rect x="150" y="55" width="40" height="30" rx="4" fill="#bfdbfe" />
                <rect x="200" y="55" width="40" height="30" rx="4" fill="#bfdbfe" />
                <rect x="250" y="55" width="40" height="30" rx="4" fill="#bfdbfe" />
                <rect x="300" y="55" width="40" height="30" rx="4" fill="#bfdbfe" />

                {/* Door */}
                <rect x="340" y="60" width="22" height="60" rx="2" fill="#93c5fd" stroke="#60a5fa" strokeWidth="1" />

                {/* Stripe */}
                <rect x="30" y="110" width="340" height="8" fill="#2563eb" />

                {/* Wheels */}
                <circle cx="80" cy="142" r="12" fill="#44403c" />
                <circle cx="80" cy="142" r="5" fill="#78716c" />
                <circle cx="320" cy="142" r="12" fill="#44403c" />
                <circle cx="320" cy="142" r="5" fill="#78716c" />
            </motion.g>

            {/* Seated people visible through windows */}
            {/* Quiet passengers */}
            <circle cx="60" cy="68" r="4" fill="#78716c" />
            <circle cx="120" cy="68" r="4" fill="#57534e" />
            <circle cx="220" cy="68" r="4" fill="#78716c" />
            <circle cx="270" cy="68" r="4" fill="#a8a29e" />
            <circle cx="320" cy="68" r="4" fill="#57534e" />

            {/* Loud person with phone - highlighted */}
            <motion.g>
                <circle cx="170" cy="68" r="5" fill="#ef4444" />
                {/* Phone */}
                <motion.rect
                    x="178" y="62" width="5" height="8" rx="1" fill="#fca5a5"
                    animate={{ rotate: [-5, 5, -5] }}
                    transition={{ duration: 0.3, repeat: Infinity }}
                    style={{ transformOrigin: "180px 66px" }}
                />
            </motion.g>

            {/* Sound waves from loud person */}
            {[0, 1, 2].map((i) => (
                <motion.path
                    key={i}
                    d={`M185,${64 + i * 2} Q${190 + i * 4},${64 + i * 2} ${190 + i * 4},${68 + i * 2}`}
                    stroke="#ef4444"
                    strokeWidth="1"
                    fill="none"
                    initial={{ opacity: 0, pathLength: 0 }}
                    animate={{ opacity: [0, 0.6, 0], pathLength: [0, 1, 0] }}
                    transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
                />
            ))}

            {/* Discomfort indicators */}
            <motion.text
                x="115" y="62" fontSize="8" fill="#f59e0b"
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, delay: 0.8 }}
            >😣</motion.text>
            <motion.text
                x="265" y="62" fontSize="8" fill="#f59e0b"
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, delay: 1.5 }}
            >😒</motion.text>

            {/* Road */}
            <rect x="0" y="155" width="400" height="25" fill="#78716c" />
            <motion.g
                animate={{ x: [-50, -250] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
                {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
                    <rect key={i} x={i * 60} y="166" width="30" height="3" rx="1" fill="#fafaf9" opacity={0.5} />
                ))}
            </motion.g>

            <text x="350" y="170" textAnchor="end" fill="#93c5fd" fontSize="8" fontWeight="600" letterSpacing="0.1em">CITY BUS</text>
        </svg>
    );
}

/* ─────────────────────────────────────────────
   Scene 3: Littered Park
   ───────────────────────────────────────────── */
function LitterParkScene() {
    return (
        <svg viewBox="0 0 400 180" className="w-full h-full">
            <defs>
                <linearGradient id="park-sky" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#dcfce7" />
                    <stop offset="100%" stopColor="#f0fdf4" />
                </linearGradient>
            </defs>
            <rect width="400" height="180" fill="url(#park-sky)" />

            {/* Sun */}
            <motion.g
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 4, repeat: Infinity }}
            >
                <circle cx="350" cy="30" r="15" fill="#fbbf24" opacity={0.9} />
                {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
                    <motion.line
                        key={angle}
                        x1={350 + Math.cos(angle * Math.PI / 180) * 18}
                        y1={30 + Math.sin(angle * Math.PI / 180) * 18}
                        x2={350 + Math.cos(angle * Math.PI / 180) * 24}
                        y2={30 + Math.sin(angle * Math.PI / 180) * 24}
                        stroke="#fbbf24" strokeWidth="2" strokeLinecap="round"
                        animate={{ opacity: [0.4, 0.8, 0.4] }}
                        transition={{ duration: 2, repeat: Infinity, delay: angle / 360 }}
                    />
                ))}
            </motion.g>

            {/* Grass */}
            <rect x="0" y="120" width="400" height="60" fill="#86efac" rx="0" />
            <rect x="0" y="118" width="400" height="6" fill="#4ade80" rx="3" />

            {/* Trees */}
            {/* Tree 1 */}
            <rect x="35" y="70" width="8" height="50" rx="2" fill="#92400e" />
            <circle cx="39" cy="55" r="25" fill="#22c55e" opacity={0.8} />
            <circle cx="28" cy="65" r="18" fill="#16a34a" opacity={0.7} />
            <circle cx="52" cy="62" r="16" fill="#15803d" opacity={0.6} />

            {/* Tree 2 */}
            <rect x="310" y="80" width="6" height="40" rx="2" fill="#92400e" />
            <circle cx="313" cy="68" r="20" fill="#22c55e" opacity={0.8} />
            <circle cx="325" cy="75" r="15" fill="#16a34a" opacity={0.6} />

            {/* Swing set */}
            <g transform="translate(280, 90)">
                <line x1="-15" y1="0" x2="-15" y2="35" stroke="#a8a29e" strokeWidth="2" />
                <line x1="15" y1="0" x2="15" y2="35" stroke="#a8a29e" strokeWidth="2" />
                <line x1="-18" y1="0" x2="18" y2="0" stroke="#a8a29e" strokeWidth="2.5" />
                {/* Swinging child */}
                <motion.g
                    animate={{ rotate: [-15, 15, -15] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    style={{ transformOrigin: "0px 0px" }}
                >
                    <line x1="0" y1="0" x2="0" y2="25" stroke="#a8a29e" strokeWidth="1.5" />
                    <circle cx="0" cy="28" r="3.5" fill="#f472b6" />
                </motion.g>
            </g>

            {/* Family walking away - animated */}
            <motion.g
                animate={{ x: [0, 30] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            >
                <Person x={200} y={128} fill="#57534e" delay={0.3} scale={0.9} />
                <Person x={215} y={128} fill="#78716c" delay={0.4} scale={0.8} />
                <Person x={208} y={132} fill="#a8a29e" delay={0.5} scale={0.6} />
            </motion.g>

            {/* Litter on ground */}
            <motion.g
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.5 }}
            >
                {/* Wrapper */}
                <rect x="155" y="136" width="8" height="5" rx="1" fill="#fbbf24" transform="rotate(15, 159, 138)" />
                {/* Bottle */}
                <rect x="168" y="133" width="4" height="10" rx="2" fill="#60a5fa" opacity={0.7} />
                {/* Crumpled paper */}
                <circle cx="180" cy="138" r="3" fill="#e7e5e4" />
                {/* Another wrapper */}
                <rect x="145" y="140" width="6" height="4" rx="1" fill="#f87171" transform="rotate(-10, 148, 142)" />
            </motion.g>

            {/* Drifting wrapper animation */}
            <motion.rect
                x="175" y="130" width="5" height="3" rx="1" fill="#fbbf24" opacity={0.6}
                animate={{ x: [175, 200, 210], y: [130, 125, 132], rotate: [0, 45, 90] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            />

            <text x="350" y="170" textAnchor="end" fill="#86efac" fontSize="8" fontWeight="600" letterSpacing="0.1em">PUBLIC PARK</text>
        </svg>
    );
}

/* ─────────────────────────────────────────────
   Scene 4: Priority Seat on Metro
   ───────────────────────────────────────────── */
function PrioritySeatScene() {
    return (
        <svg viewBox="0 0 400 180" className="w-full h-full">
            <defs>
                <linearGradient id="metro-bg" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#ede9fe" />
                    <stop offset="100%" stopColor="#f5f3ff" />
                </linearGradient>
            </defs>
            <rect width="400" height="180" fill="url(#metro-bg)" />

            {/* Metro interior walls */}
            <rect x="10" y="20" width="380" height="130" rx="8" fill="#e7e5e4" />
            <rect x="10" y="20" width="380" height="130" rx="8" fill="none" stroke="#d6d3d1" strokeWidth="2" />

            {/* Overhead rail */}
            <line x1="20" y1="35" x2="380" y2="35" stroke="#a8a29e" strokeWidth="3" />

            {/* Hanging handles */}
            {[60, 120, 180, 240, 300, 350].map((xPos, i) => (
                <motion.g
                    key={i}
                    animate={{ rotate: [-3, 3, -3] }}
                    transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.2 }}
                    style={{ transformOrigin: `${xPos}px 35px` }}
                >
                    <line x1={xPos} y1="35" x2={xPos} y2="50" stroke="#a8a29e" strokeWidth="1.5" />
                    <circle cx={xPos} cy="53" r="5" fill="none" stroke="#a8a29e" strokeWidth="1.5" />
                </motion.g>
            ))}

            {/* Priority section marker */}
            <rect x="20" y="140" width="120" height="6" rx="2" fill="#8b5cf6" opacity={0.6} />
            <text x="80" y="134" textAnchor="middle" fill="#7c3aed" fontSize="6" fontWeight="600">PRIORITY</text>

            {/* Seats */}
            {[35, 75, 115].map((xPos, i) => (
                <rect key={i} x={xPos} y="105" width="25" height="30" rx="3" fill="#c4b5fd" stroke="#a78bfa" strokeWidth="1" />
            ))}
            {[200, 240, 280, 320].map((xPos, i) => (
                <rect key={i} x={xPos} y="105" width="25" height="30" rx="3" fill="#d6d3d1" stroke="#a8a29e" strokeWidth="1" />
            ))}

            {/* "You" seated in priority section */}
            <motion.g>
                <circle cx="47" cy="95" r="5" fill="#4f46e5" />
                <rect x="41" y="100" width="12" height="8" rx="2" fill="#4f46e5" />
                <text x="47" y="80" textAnchor="middle" fill="#4f46e5" fontSize="6" fontWeight="700">YOU</text>
            </motion.g>

            {/* Other seated people */}
            <circle cx="87" cy="95" r="4" fill="#78716c" />
            <circle cx="127" cy="95" r="4" fill="#57534e" />
            <circle cx="212" cy="95" r="4" fill="#78716c" />
            <circle cx="292" cy="95" r="4" fill="#a8a29e" />

            {/* Elder person entering from door */}
            <motion.g
                initial={{ x: 40, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.8, duration: 1.2, ease: "easeOut" }}
            >
                <ElderPerson x={360} y={118} fill="#92400e" delay={1} />
            </motion.g>

            {/* Door opening indicator */}
            <motion.rect
                x="370" y="45" width="15" height="90" rx="2"
                fill="#a78bfa"
                opacity={0.3}
                animate={{ opacity: [0.3, 0.1, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
            />

            {/* "Ding" door chime */}
            <motion.text
                x="377" y="42" fontSize="8"
                animate={{ opacity: [0, 1, 0], y: [42, 36, 42] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            >🔔</motion.text>

            <text x="350" y="170" textAnchor="end" fill="#a78bfa" fontSize="8" fontWeight="600" letterSpacing="0.1em">METRO TRAIN</text>
        </svg>
    );
}

/* ─────────────────────────────────────────────
   Scene 5: Street Vendor
   ───────────────────────────────────────────── */
function StreetVendorScene() {
    return (
        <svg viewBox="0 0 400 180" className="w-full h-full">
            <defs>
                <linearGradient id="vendor-bg" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#fce7f3" />
                    <stop offset="100%" stopColor="#fff1f2" />
                </linearGradient>
            </defs>
            <rect width="400" height="180" fill="url(#vendor-bg)" />

            {/* Market stalls in background */}
            <rect x="0" y="60" width="60" height="80" fill="#fbbf24" opacity={0.3} rx="3" />
            <rect x="340" y="65" width="60" height="75" fill="#60a5fa" opacity={0.3} rx="3" />

            {/* Ground */}
            <rect x="0" y="140" width="400" height="40" fill="#e7e5e4" />

            {/* Vendor's cart */}
            <motion.g
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
            >
                {/* Cart body */}
                <rect x="140" y="100" width="60" height="35" rx="3" fill="#78716c" />
                <rect x="145" y="105" width="50" height="12" rx="2" fill="#f87171" />
                {/* Fruits on cart */}
                <circle cx="155" cy="108" r="3" fill="#fbbf24" />
                <circle cx="163" cy="110" r="3" fill="#f97316" />
                <circle cx="171" cy="108" r="3" fill="#22c55e" />
                <circle cx="179" cy="110" r="3" fill="#ef4444" />
                <circle cx="187" cy="108" r="3" fill="#fbbf24" />
                {/* Wheels */}
                <circle cx="155" cy="138" r="5" fill="#44403c" />
                <circle cx="185" cy="138" r="5" fill="#44403c" />
            </motion.g>

            {/* Vendor (elderly woman) - pleading */}
            <motion.g
                animate={{ y: [0, 1, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
            >
                <ElderPerson x={125} y={128} fill="#92400e" delay={0.3} />
            </motion.g>

            {/* Tears */}
            <motion.circle
                cx="123" cy="112" r="1" fill="#60a5fa"
                animate={{ y: [0, 8], opacity: [1, 0] }}
                transition={{ duration: 1, repeat: Infinity, delay: 0.5 }}
            />
            <motion.circle
                cx="127" cy="113" r="1" fill="#60a5fa"
                animate={{ y: [0, 8], opacity: [1, 0] }}
                transition={{ duration: 1, repeat: Infinity, delay: 1 }}
            />

            {/* Officer - aggressive stance */}
            <motion.g>
                <Person x={220} y={128} fill="#1e40af" delay={0.4} scale={1.1} />
                {/* Cap */}
                <rect x="214" y="103" width="12" height="4" rx="1" fill="#1e3a8a" />
            </motion.g>

            {/* Grabbing motion lines */}
            <motion.line
                x1="210" y1="122" x2="200" y2="118"
                stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round"
                animate={{ opacity: [0, 0.6, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
            />

            {/* Crowd watching (bystanders) */}
            <Person x={270} y={128} fill="#a8a29e" delay={0.6} scale={0.85} />
            <Person x={290} y={128} fill="#78716c" delay={0.7} scale={0.85} />
            <Person x={310} y={130} fill="#a8a29e" delay={0.8} scale={0.75} />

            {/* Phone recording icon on a bystander */}
            <motion.rect
                x="285" y="113" width="5" height="8" rx="1" fill="#a8a29e"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
            />
            <motion.circle
                cx="287" cy="115" r="1" fill="#ef4444"
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
            />

            <text x="350" y="170" textAnchor="end" fill="#fda4af" fontSize="8" fontWeight="600" letterSpacing="0.1em">MARKETPLACE</text>
        </svg>
    );
}

/* ─────────────────────────────────────────────
   Scene 6: Broken Pipe / Water Wastage
   ───────────────────────────────────────────── */
function WaterWastageScene() {
    return (
        <svg viewBox="0 0 400 180" className="w-full h-full">
            <defs>
                <linearGradient id="water-bg" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#e0f2fe" />
                    <stop offset="100%" stopColor="#f0f9ff" />
                </linearGradient>
            </defs>
            <rect width="400" height="180" fill="url(#water-bg)" />

            {/* Sun */}
            <circle cx="340" cy="30" r="14" fill="#fbbf24" />

            {/* Ground */}
            <rect x="0" y="140" width="400" height="40" fill="#d6d3d1" />

            {/* Neighbor's house */}
            <motion.g
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
            >
                {/* House body */}
                <rect x="60" y="60" width="120" height="80" rx="3" fill="#fef3c7" stroke="#fbbf24" strokeWidth="1" />
                {/* Roof */}
                <polygon points="50,60 120,25 190,60" fill="#f97316" opacity={0.8} />
                {/* Door */}
                <rect x="100" y="100" width="20" height="40" rx="2" fill="#92400e" />
                <circle cx="116" cy="122" r="2" fill="#fbbf24" />
                {/* Window */}
                <rect x="75" y="75" width="18" height="18" rx="2" fill="#bfdbfe" stroke="#60a5fa" strokeWidth="1" />
                <line x1="84" y1="75" x2="84" y2="93" stroke="#60a5fa" strokeWidth="0.5" />
                <line x1="75" y1="84" x2="93" y2="84" stroke="#60a5fa" strokeWidth="0.5" />
                <rect x="145" y="75" width="18" height="18" rx="2" fill="#bfdbfe" stroke="#60a5fa" strokeWidth="1" />
            </motion.g>

            {/* Broken pipe on side of house */}
            <rect x="180" y="80" width="6" height="30" rx="2" fill="#a8a29e" />
            <rect x="178" y="108" width="10" height="6" rx="1" fill="#78716c" />

            {/* Water leak animation */}
            {[0, 1, 2, 3, 4].map((i) => (
                <motion.circle
                    key={i}
                    cx={183}
                    cy={115}
                    r={2}
                    fill="#38bdf8"
                    opacity={0.7}
                    animate={{
                        cy: [115, 145],
                        cx: [183, 185 + i * 3],
                        opacity: [0.7, 0],
                        r: [2, 1],
                    }}
                    transition={{
                        duration: 1.2,
                        repeat: Infinity,
                        delay: i * 0.25,
                        ease: "easeIn",
                    }}
                />
            ))}

            {/* Water stream on ground */}
            <motion.path
                d="M185,142 Q200,145 230,143 Q260,141 300,144 Q340,146 380,143"
                stroke="#38bdf8"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
                animate={{ strokeDashoffset: [0, -20] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                strokeDasharray="8 6"
            />

            {/* Small puddle */}
            <ellipse cx="220" cy="145" rx="20" ry="4" fill="#7dd3fc" opacity={0.5} />

            {/* Your house (next door) */}
            <rect x="260" y="70" width="100" height="70" rx="3" fill="#f5f5f4" stroke="#d6d3d1" strokeWidth="1" />
            <polygon points="250,70 310,40 370,70" fill="#78716c" opacity={0.6} />
            <rect x="295" y="100" width="18" height="40" rx="2" fill="#a8a29e" />
            <rect x="270" y="80" width="16" height="14" rx="2" fill="#bfdbfe" />

            {/* You peeking from window */}
            <motion.circle
                cx="278" cy="87" r="3" fill="#4f46e5"
                animate={{ opacity: [0, 1] }}
                transition={{ delay: 1.2, duration: 0.5 }}
            />

            <text x="350" y="170" textAnchor="end" fill="#7dd3fc" fontSize="8" fontWeight="600" letterSpacing="0.1em">NEIGHBORHOOD</text>
        </svg>
    );
}

/* ─────────────────────────────────────────────
   Scene 7: Accident Witness
   ───────────────────────────────────────────── */
function AccidentScene() {
    return (
        <svg viewBox="0 0 400 180" className="w-full h-full">
            <defs>
                <linearGradient id="accident-bg" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#e2e8f0" />
                    <stop offset="100%" stopColor="#f1f5f9" />
                </linearGradient>
            </defs>
            <rect width="400" height="180" fill="url(#accident-bg)" />

            {/* Dark clouds */}
            <motion.g
                animate={{ x: [0, 15, 0] }}
                transition={{ duration: 8, repeat: Infinity }}
            >
                <ellipse cx="80" cy="25" rx="40" ry="15" fill="#94a3b8" opacity={0.5} />
                <ellipse cx="60" cy="20" rx="30" ry="12" fill="#94a3b8" opacity={0.4} />
                <ellipse cx="200" cy="18" rx="35" ry="13" fill="#94a3b8" opacity={0.3} />
            </motion.g>

            {/* Rain drops */}
            {Array.from({ length: 12 }, (_, i) => (
                <motion.line
                    key={i}
                    x1={30 + i * 32}
                    y1={20}
                    x2={25 + i * 32}
                    y2={30}
                    stroke="#94a3b8"
                    strokeWidth="1"
                    opacity={0.3}
                    animate={{ y: [0, 140], opacity: [0.3, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.15, ease: "linear" }}
                />
            ))}

            {/* Road */}
            <rect x="0" y="120" width="400" height="60" fill="#64748b" />
            <line x1="0" y1="148" x2="400" y2="148" stroke="#fbbf24" strokeWidth="2" strokeDasharray="15 10" />

            {/* Wet road sheen */}
            <rect x="0" y="120" width="400" height="60" fill="#94a3b8" opacity={0.15} />

            {/* Fallen bike */}
            <motion.g
                initial={{ rotate: 0 }}
                animate={{ rotate: -45 }}
                transition={{ delay: 0.3, duration: 0.5, ease: "easeOut" }}
                style={{ transformOrigin: "160px 135px" }}
            >
                {/* Bike frame */}
                <circle cx="145" cy="135" r="10" fill="none" stroke="#ef4444" strokeWidth="2" />
                <circle cx="175" cy="135" r="10" fill="none" stroke="#ef4444" strokeWidth="2" />
                <line x1="145" y1="135" x2="160" y2="120" stroke="#ef4444" strokeWidth="2" />
                <line x1="175" y1="135" x2="160" y2="120" stroke="#ef4444" strokeWidth="2" />
                <line x1="160" y1="120" x2="165" y2="115" stroke="#ef4444" strokeWidth="1.5" />
            </motion.g>

            {/* Fallen rider on ground */}
            <motion.g
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
            >
                <circle cx="200" cy="138" r="5" fill="#78716c" />
                {/* Body on ground */}
                <line x1="200" y1="143" x2="218" y2="140" stroke="#78716c" strokeWidth="2.5" strokeLinecap="round" />
                {/* Legs */}
                <line x1="218" y1="140" x2="225" y2="148" stroke="#78716c" strokeWidth="2" strokeLinecap="round" />
                <line x1="218" y1="140" x2="228" y2="138" stroke="#78716c" strokeWidth="2" strokeLinecap="round" />
                {/* Bleeding scrape */}
                <motion.circle
                    cx="222" cy="144" r="2" fill="#ef4444"
                    animate={{ r: [2, 3, 2] }}
                    transition={{ duration: 2, repeat: Infinity }}
                />
            </motion.g>

            {/* Scattered packages */}
            <motion.g
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.4 }}
            >
                <rect x="230" y="133" width="10" height="8" rx="1" fill="#fbbf24" transform="rotate(20, 235, 137)" />
                <rect x="245" y="136" width="8" height="6" rx="1" fill="#f97316" transform="rotate(-15, 249, 139)" />
                <rect x="215" y="147" width="12" height="7" rx="1" fill="#a78bfa" transform="rotate(10, 221, 150)" />
            </motion.g>

            {/* Cars swerving past */}
            <motion.g
                animate={{ x: [-100, 500] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear", delay: 1 }}
            >
                <rect x="0" y="128" width="30" height="14" rx="4" fill="#44403c" />
                <rect x="3" y="130" width="8" height="6" rx="1" fill="#bfdbfe" />
                <rect x="19" y="130" width="8" height="6" rx="1" fill="#bfdbfe" />
            </motion.g>

            {/* Pedestrians walking past on sidewalk implied */}
            <motion.g
                animate={{ x: [0, 50] }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            >
                <Person x={320} y={118} fill="#a8a29e" delay={1} scale={0.7} />
            </motion.g>

            {/* Streetlight */}
            <rect x="100" y="50" width="3" height="70" fill="#64748b" />
            <motion.circle
                cx="101" cy="48" r="6" fill="#fbbf24" opacity={0.6}
                animate={{ opacity: [0.4, 0.7, 0.4] }}
                transition={{ duration: 3, repeat: Infinity }}
            />

            <text x="350" y="170" textAnchor="end" fill="#94a3b8" fontSize="8" fontWeight="600" letterSpacing="0.1em">WET ROAD · DUSK</text>
        </svg>
    );
}

/* ─────────────────────────────────────────────
   Scene 8: Community Meeting
   ───────────────────────────────────────────── */
function CommunityMeetingScene() {
    return (
        <svg viewBox="0 0 400 180" className="w-full h-full">
            <defs>
                <linearGradient id="meeting-bg" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#e0e7ff" />
                    <stop offset="100%" stopColor="#eef2ff" />
                </linearGradient>
            </defs>
            <rect width="400" height="180" fill="url(#meeting-bg)" />

            {/* Hall interior */}
            <rect x="10" y="20" width="380" height="140" rx="6" fill="#f5f5f4" stroke="#e7e5e4" strokeWidth="1.5" />

            {/* Whiteboard at front */}
            <motion.g
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
            >
                <rect x="150" y="30" width="100" height="50" rx="3" fill="white" stroke="#d6d3d1" strokeWidth="1.5" />
                <text x="200" y="50" textAnchor="middle" fill="#ef4444" fontSize="7" fontWeight="700">PROPOSAL</text>
                <text x="200" y="62" textAnchor="middle" fill="#57534e" fontSize="5">Garden → Parking</text>
                <line x1="165" y1="70" x2="235" y2="70" stroke="#ef4444" strokeWidth="0.8" opacity={0.5} />
            </motion.g>

            {/* Rows of seated people */}
            {/* Row 1 - front */}
            {[80, 110, 140, 170, 200, 230, 260, 290].map((x, i) => (
                <motion.g
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 + i * 0.05 }}
                >
                    <rect x={x - 8} y="100" width="16" height="10" rx="2" fill="#d6d3d1" />
                    <circle cx={x} cy="93" r="4" fill={i === 3 ? "#4f46e5" : i < 2 ? "#a8a29e" : "#78716c"} />
                </motion.g>
            ))}
            {/* Row 2 - back */}
            {[95, 125, 155, 185, 215, 245, 275].map((x, i) => (
                <motion.g
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 + i * 0.05 }}
                >
                    <rect x={x - 8} y="125" width="16" height="10" rx="2" fill="#d6d3d1" />
                    <circle cx={x} cy="118" r="3.5" fill={i > 4 ? "#92400e" : "#a8a29e"} />
                </motion.g>
            ))}

            {/* Elderly residents - smaller, in back */}
            <motion.text
                x="270" y="115" fontSize="6" fill="#92400e"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 3, repeat: Infinity }}
            >😟</motion.text>

            {/* Window showing garden outside */}
            <rect x="330" y="35" width="40" height="50" rx="3" fill="#86efac" opacity={0.6} stroke="#d6d3d1" strokeWidth="1" />
            {/* Tree in garden */}
            <rect x="346" y="50" width="3" height="15" fill="#92400e" />
            <circle cx="347" cy="45" r="8" fill="#22c55e" opacity={0.8} />

            {/* Children at window */}
            <motion.g
                animate={{ y: [0, -2, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
            >
                <circle cx="337" cy="80" r="3" fill="#f472b6" />
                <circle cx="345" cy="82" r="3" fill="#60a5fa" />
            </motion.g>

            {/* Speaker at front standing */}
            <Person x={200} y={88} fill="#57534e" delay={0.3} scale={0.9} />

            <text x="365" y="170" textAnchor="end" fill="#a5b4fc" fontSize="8" fontWeight="600" letterSpacing="0.1em">COMMUNITY HALL</text>
        </svg>
    );
}

/* ─────────────────────────────────────────────
   Main Component
   ───────────────────────────────────────────── */
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
