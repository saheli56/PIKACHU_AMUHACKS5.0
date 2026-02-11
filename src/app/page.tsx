"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  Eye,
  Heart,
  Users,
  Shield,
  Sparkles,
  ChevronDown,
} from "lucide-react";
import ParticleBackground from "@/components/ParticleBackground";
import { TypeAnimation } from "react-type-animation";

const features = [
  {
    icon: Eye,
    title: "Experience",
    desc: "Step into real-world civic scenarios — no textbook answers, just your instincts.",
    gradient: "from-blue-500 to-indigo-600",
    bgGlow: "bg-blue-500/10",
  },
  {
    icon: Heart,
    title: "Reflect",
    desc: "See the consequences of your choices unfold in real time and understand their weight.",
    gradient: "from-rose-500 to-pink-600",
    bgGlow: "bg-rose-500/10",
  },
  {
    icon: Users,
    title: "Discover",
    desc: "Receive a personalized civic profile — your strengths, your blind spots, the full picture.",
    gradient: "from-emerald-500 to-teal-600",
    bgGlow: "bg-emerald-500/10",
  },
];

const steps = [
  {
    number: "01",
    title: "Enter the Simulation",
    desc: "You'll face 8 real-world scenarios — each one drawn from everyday civic life.",
  },
  {
    number: "02",
    title: "Make Your Choice",
    desc: "No right answers. No wrong ones. Just consequences that ripple outward.",
  },
  {
    number: "03",
    title: "See the Impact",
    desc: "Every decision shifts your metrics and the world state around you.",
  },
  {
    number: "04",
    title: "Meet Yourself",
    desc: "Your choices reveal your civic archetype — the good, the bad, and the ugly.",
  },
];

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col items-center bg-stone-50">
      {/* Particle background */}
      <div className="fixed inset-0 z-0">
        <ParticleBackground variant="default" />
      </div>

      {/* ─── HERO SECTION ─── */}
      <section className="relative z-10 flex min-h-screen w-full flex-col items-center justify-center px-4">
        <div className="w-full max-w-2xl text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-stone-200/60 bg-white/70 backdrop-blur-sm px-4 py-1.5 text-xs font-medium tracking-wide text-stone-500 shadow-sm"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-indigo-500 animate-subtle-pulse" />
            Interactive Civic Simulation
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="mb-4 text-5xl font-bold tracking-tight text-stone-900 sm:text-6xl"
          >
            Civic{" "}
            <span className="text-gradient">Mirror</span>
          </motion.h1>

          {/* Typewriter subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mx-auto mb-4 max-w-lg text-lg leading-relaxed text-stone-500"
          >
            Your everyday choices shape the world around you.
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="mx-auto mb-10 h-7 max-w-lg text-lg font-medium text-stone-700"
          >
            <TypeAnimation
              sequence={[
                "Make decisions.",
                1500,
                "See the impact.",
                1500,
                "Know yourself.",
                2000,
                "Make decisions. See the impact. Know yourself.",
                4000,
              ]}
              wrapper="span"
              cursor={true}
              repeat={Infinity}
              speed={40}
            />
          </motion.div>

          {/* CTA Button with shimmer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <Link
              href="/simulation"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-2xl bg-stone-900 px-8 py-4 text-sm font-semibold text-white shadow-xl shadow-stone-900/20 transition-all hover:bg-stone-800 hover:shadow-2xl hover:shadow-stone-900/30 active:scale-[0.97]"
            >
              {/* Shimmer overlay */}
              <div className="absolute inset-0 shimmer-bg opacity-0 transition-opacity group-hover:opacity-100" />
              <span className="relative z-10">Begin Your Journey</span>
              <ArrowRight className="relative z-10 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>

            {/* Social proof */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="mt-4 flex items-center justify-center gap-1.5 text-xs text-stone-400"
            >
              <Shield className="h-3 w-3" />
              No data collected · 100% anonymous
            </motion.p>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="mt-20"
          >
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <ChevronDown className="mx-auto h-5 w-5 text-stone-300" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ─── FEATURES SECTION ─── */}
      <section className="relative z-10 w-full px-4 py-20">
        <div className="mx-auto w-full max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="mb-12 text-center"
          >
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-indigo-500">
              How It Works
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-stone-900">
              A simulation, not a survey
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="group relative overflow-hidden rounded-2xl border border-stone-200/60 bg-white/70 backdrop-blur-sm p-6 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-stone-300/80 hover:-translate-y-1"
              >
                {/* Background glow on hover */}
                <div
                  className={`absolute inset-0 ${f.bgGlow} opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
                />
                <div className="relative">
                  <div
                    className={`mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${f.gradient} shadow-lg`}
                  >
                    <f.icon className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="mb-1.5 text-sm font-bold text-stone-900">
                    {f.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-stone-500">
                    {f.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── STEPS SECTION ─── */}
      <section className="relative z-10 w-full px-4 py-20">
        <div className="mx-auto w-full max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="mb-12 text-center"
          >
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-indigo-500">
              Your Journey
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-stone-900">
              Four steps to self-discovery
            </h2>
          </motion.div>

          <div className="space-y-0">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="relative flex gap-5 pb-8"
              >
                {/* Timeline connector */}
                <div className="flex flex-col items-center">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-sm font-bold text-white shadow-lg shadow-indigo-500/20">
                    {step.number}
                  </div>
                  {i < steps.length - 1 && (
                    <div className="mt-2 w-px flex-1 bg-gradient-to-b from-indigo-200 to-transparent" />
                  )}
                </div>

                {/* Content */}
                <div className="pt-1.5">
                  <h3 className="mb-1 text-sm font-bold text-stone-900">
                    {step.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-stone-500">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── BOTTOM CTA ─── */}
      <section className="relative z-10 w-full px-4 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto w-full max-w-lg overflow-hidden rounded-3xl border border-stone-200/60 bg-gradient-to-br from-white to-indigo-50/50 p-10 text-center shadow-xl"
        >
          <Sparkles className="mx-auto mb-4 h-8 w-8 text-indigo-400" />
          <h3 className="mb-2 text-2xl font-bold text-stone-900">
            Ready to discover your civic self?
          </h3>
          <p className="mb-6 text-sm text-stone-500">
            8 scenarios · ~5 minutes · No data collected
          </p>
          <Link
            href="/simulation"
            className="group inline-flex items-center gap-2 rounded-2xl bg-stone-900 px-7 py-3.5 text-sm font-semibold text-white shadow-lg transition-all hover:bg-stone-800 hover:shadow-xl active:scale-[0.97]"
          >
            Start the Simulation
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
