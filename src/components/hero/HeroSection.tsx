"use client";

import { LiquidOrb } from "@/components/ui/LiquidOrb";
import { motion } from "framer-motion";
import { Mic, ArrowRight } from "lucide-react";

interface HeroSectionProps {
    onStart?: () => void;
}

export function HeroSection({ onStart }: HeroSectionProps) {
    return (
        <section className="relative flex flex-col items-center justify-center min-h-screen px-4 py-20 overflow-hidden text-center -mt-20 sm:mt-0">

            {/* Background Gradient Spotlights */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-blue-900/20 blur-[120px] rounded-full pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="relative z-10 flex flex-col items-center gap-8"
            >
                <LiquidOrb className="mb-8 scale-150 sm:scale-100" />

                <h1 className="text-5xl font-bold tracking-tight text-white sm:text-7xl">
                    Speak it. <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Make it.</span>
                </h1>

                <p className="max-w-xl text-lg text-zinc-400 sm:text-xl">
                    Turn your voice into organized tasks. Just speak, and watch your widgets float into place.
                </p>

                <div className="flex flex-col gap-4 sm:flex-row">
                    <button
                        onClick={onStart}
                        className="group relative flex items-center justify-center gap-2 px-8 py-4 text-white bg-blue-600 rounded-full shadow-lg shadow-blue-900/40 hover:bg-blue-500 transition-all hover:scale-105 active:scale-95"
                    >
                        <Mic className="w-5 h-5 group-hover:animate-pulse" />
                        <span className="font-semibold">Start Speaking</span>
                    </button>

                    <button className="flex items-center justify-center gap-2 px-8 py-4 text-zinc-300 transition-colors rounded-full hover:text-white hover:bg-white/5 border border-white/10 backdrop-blur-sm">
                        <span>How it works</span>
                        <ArrowRight className="w-4 h-4" />
                    </button>
                </div>
            </motion.div>
        </section>
    );
}
