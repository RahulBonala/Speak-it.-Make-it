"use client";

import { LiquidOrb } from "@/components/ui/LiquidOrb";
import { AnimatePresence, motion } from "framer-motion";
import { Mic, ArrowRight, ChevronUp, AudioLines, LayoutGrid, CheckCircle2 } from "lucide-react";
import { useState } from "react";

interface HeroSectionProps {
  onStart?: () => void;
}

const HOW_IT_WORKS_STEPS = [
  {
    icon: AudioLines,
    title: "Speak",
    description: "Tap the mic and say what's on your mind — tasks, ideas, reminders.",
  },
  {
    icon: LayoutGrid,
    title: "Watch it organize",
    description: "Your words become widgets that float into place on your workspace.",
  },
  {
    icon: CheckCircle2,
    title: "Get it done",
    description: "Reorder, complete, and clear tasks as you move through your day.",
  },
];

export function HeroSection({ onStart }: HeroSectionProps) {
  const [showHowItWorks, setShowHowItWorks] = useState(false);

  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen px-4 py-20 overflow-hidden text-center -mt-20 sm:mt-0">
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-blue-900/20 blur-[120px] rounded-full pointer-events-none"
        aria-hidden="true"
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 flex flex-col items-center gap-8"
      >
        <LiquidOrb className="mb-8 scale-150 sm:scale-100" />

        <h1 className="text-5xl font-bold tracking-tight text-white sm:text-7xl">
          Speak it.{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
            Make it.
          </span>
        </h1>

        <p className="max-w-xl text-lg text-zinc-400 sm:text-xl">
          Turn your voice into organized tasks. Just speak, and watch your widgets float into place.
        </p>

        <div className="flex flex-col gap-4 sm:flex-row">
          <button
            onClick={onStart}
            className="group relative flex items-center justify-center gap-2 px-8 py-4 text-white bg-blue-600 rounded-full shadow-lg shadow-blue-900/40 hover:bg-blue-500 transition-all hover:scale-105 active:scale-95"
          >
            <Mic className="w-5 h-5 group-hover:animate-pulse" aria-hidden="true" />
            <span className="font-semibold">Start Speaking</span>
          </button>

          <button
            onClick={() => setShowHowItWorks((v) => !v)}
            aria-expanded={showHowItWorks}
            aria-controls="how-it-works"
            className="flex items-center justify-center gap-2 px-8 py-4 text-zinc-300 transition-colors rounded-full hover:text-white hover:bg-white/5 border border-white/10 backdrop-blur-sm"
          >
            <span>How it works</span>
            {showHowItWorks ? (
              <ChevronUp className="w-4 h-4" aria-hidden="true" />
            ) : (
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            )}
          </button>
        </div>

        <AnimatePresence>
          {showHowItWorks && (
            <motion.div
              id="how-it-works"
              initial={{ opacity: 0, y: 12, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: 12, height: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="w-full max-w-3xl overflow-hidden"
            >
              <div className="grid grid-cols-1 gap-4 pt-2 sm:grid-cols-3">
                {HOW_IT_WORKS_STEPS.map(({ icon: Icon, title, description }, i) => (
                  <motion.div
                    key={title}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + i * 0.08 }}
                    className="flex flex-col items-center gap-3 p-5 text-center border rounded-2xl border-white/10 bg-white/[0.03] backdrop-blur-sm"
                  >
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-500/10 text-blue-400">
                      <Icon className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <h3 className="text-sm font-semibold text-white">
                      <span className="mr-1.5 text-zinc-500">{i + 1}.</span>
                      {title}
                    </h3>
                    <p className="text-xs leading-relaxed text-zinc-400">{description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
