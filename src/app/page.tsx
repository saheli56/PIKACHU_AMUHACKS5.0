"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Eye, Heart, Users } from "lucide-react";

const features = [
  {
    icon: Eye,
    title: "Experience",
    desc: "Step into real-world civic scenarios — no textbook answers, just your instincts.",
  },
  {
    icon: Heart,
    title: "Reflect",
    desc: "See the consequences of your choices unfold in real time and understand their weight.",
  },
  {
    icon: Users,
    title: "Discover",
    desc: "Receive a personalized civic profile — your strengths, your blind spots, the full picture.",
  },
];

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-stone-50 px-4">
      <div className="w-full max-w-2xl py-20 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-stone-200 bg-white px-4 py-1.5 text-xs font-medium tracking-wide text-stone-500 shadow-sm"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-indigo-500 animate-subtle-pulse" />
          Interactive Civic Simulation
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="mb-4 text-4xl font-bold tracking-tight text-stone-900 sm:text-5xl"
        >
          Civic Mirror
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mx-auto mb-10 max-w-md text-lg leading-relaxed text-stone-500"
        >
          Your everyday choices shape the world around you.
          <br />
          <span className="text-stone-700">
            Make decisions. See the impact. Know yourself.
          </span>
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <Link
            href="/simulation"
            className="group inline-flex items-center gap-2 rounded-xl bg-stone-900 px-7 py-3.5 text-sm font-medium text-white shadow-lg shadow-stone-900/10 transition-all hover:bg-stone-800 hover:shadow-xl hover:shadow-stone-900/15 active:scale-[0.98]"
          >
            Begin Your Journey
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-20 grid grid-cols-1 gap-6 sm:grid-cols-3"
        >
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 + i * 0.1, duration: 0.5 }}
              className="rounded-xl border border-stone-200 bg-white p-5 text-left shadow-sm"
            >
              <f.icon className="mb-3 h-5 w-5 text-indigo-500" />
              <h3 className="mb-1 text-sm font-semibold text-stone-900">
                {f.title}
              </h3>
              <p className="text-sm leading-relaxed text-stone-500">
                {f.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Footer note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="mt-16 text-xs text-stone-400"
        >
          8 scenarios · ~5 minutes · No data collected
        </motion.p>
      </div>
    </div>
  );
}
