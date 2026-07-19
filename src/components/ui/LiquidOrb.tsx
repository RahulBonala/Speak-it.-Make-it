"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface LiquidOrbProps {
  className?: string;
}

export function LiquidOrb({ className }: LiquidOrbProps) {
  return (
    <div className={cn("relative flex items-center justify-center", className)} aria-hidden="true">
      <motion.div
        className="from-brand to-brand-strong absolute h-64 w-64 rounded-full bg-gradient-to-r opacity-60 blur-3xl"
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

      <motion.div
        className="from-brand via-brand to-brand-strong relative h-48 w-48 rounded-full bg-gradient-to-br shadow-[0_0_40px_rgba(255,107,26,0.5)]"
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
        <div className="absolute inset-0 rounded-[inherit] bg-gradient-to-br from-white/20 to-transparent opacity-80 backdrop-blur-sm" />
      </motion.div>

      <motion.div
        className="bg-brand absolute h-2 w-2 rounded-full blur-sm"
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
