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
            className="flex flex-col items-center text-center space-y-8 max-w-lg"
        >
            <div className="relative">
                <div className="absolute inset-0 bg-blue-500 blur-3xl opacity-20 rounded-full" />
                <Sparkles className="w-16 h-16 text-blue-400 relative z-10" />
            </div>

            <div className="space-y-4">
                <h2 className="text-3xl font-bold text-white">Welcome to the Future</h2>
                <p className="text-zinc-400 text-lg">
                    Speak It Make It uses advanced voice recognition to turn your thoughts into
                    actionable widget stacks. No typing required.
                </p>
            </div>

            <button
                onClick={onNext}
                className="group flex items-center gap-2 px-8 py-4 bg-white text-black rounded-full font-semibold hover:bg-zinc-200 transition-all active:scale-95"
            >
                Let's Calibrate
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
        </motion.div>
    );
}
