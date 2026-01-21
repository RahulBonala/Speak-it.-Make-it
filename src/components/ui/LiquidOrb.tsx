"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface LiquidOrbProps {
    className?: string;
}

export function LiquidOrb({ className }: LiquidOrbProps) {
    return (
        <div className={cn("relative flex items-center justify-center", className)}>
            {/* Core Glowing Orb */}
            <motion.div
                className="absolute w-64 h-64 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur-3xl opacity-60"
                animate={{
                    scale: [1, 1.2, 0.9, 1.1, 1],
                    rotate: [0, 90, 180, 270, 360],
                    borderRadius: ["50%", "40% 60%", "60% 40%", "50%"],
                }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            {/* Inner Fluid Shape */}
            <motion.div
                className="relative w-48 h-48 bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-500 rounded-full shadow-[0_0_40px_rgba(59,130,246,0.5)]"
                animate={{
                    borderRadius: [
                        "60% 40% 30% 70% / 60% 30% 70% 40%",
                        "30% 60% 70% 40% / 50% 60% 30% 60%",
                        "60% 40% 30% 70% / 60% 30% 70% 40%",
                    ],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            >
                {/* Glass Overlay/Reflection */}
                <div className="absolute inset-0 rounded-[inherit] bg-gradient-to-br from-white/20 to-transparent opacity-80 backdrop-blur-sm" />
            </motion.div>

            {/* Floating Particles (Optional for extra flair) */}
            <motion.div
                className="absolute w-2 h-2 bg-blue-400 rounded-full blur-sm"
                animate={{
                    y: [-20, 20, -20],
                    x: [-20, 20, -20],
                    opacity: [0, 1, 0],
                }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1,
                }}
            />
        </div>
    );
}
