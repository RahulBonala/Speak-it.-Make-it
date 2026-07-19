"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

interface WelcomeStepProps {
  onNext: () => void;
}

export function WelcomeStep({ onNext }: WelcomeStepProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex max-w-lg flex-col items-center space-y-8 text-center"
    >
      <div className="relative">
        <div
          className="bg-brand absolute inset-0 rounded-full opacity-20 blur-3xl"
          aria-hidden="true"
        />
        <Sparkles className="text-brand relative z-10 h-16 w-16" aria-hidden="true" />
      </div>

      <div className="space-y-4">
        <h2 className="text-3xl font-bold text-white">Welcome to the Future</h2>
        <p className="text-lg text-zinc-400">
          Speak It Make It uses advanced voice recognition to turn your thoughts into actionable
          widget stacks. No typing required.
        </p>
      </div>

      <button
        onClick={onNext}
        className="group flex items-center gap-2 rounded-full bg-white px-8 py-4 font-semibold text-black transition-all hover:bg-zinc-200 active:scale-95"
      >
        Let&apos;s Calibrate
        <ArrowRight
          className="h-4 w-4 transition-transform group-hover:translate-x-1"
          aria-hidden="true"
        />
      </button>
    </motion.div>
  );
}
