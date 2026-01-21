"use client";

import { HeroSection } from "@/components/hero/HeroSection";
import { OnboardingWizard } from "@/components/onboarding/OnboardingWizard";
import { Workspace } from "@/components/workspace/Workspace";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function Home() {
  const [hasStarted, setHasStarted] = useState(false);
  const [isOnboardingComplete, setIsOnboardingComplete] = useState(false);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-black text-white selection:bg-blue-500/30 overflow-hidden">
      <AnimatePresence mode="wait">
        {!hasStarted && (
          <motion.div
            key="hero"
            exit={{ opacity: 0, y: -50 }}
            className="w-full"
          >
            <HeroSection onStart={() => setHasStarted(true)} />
          </motion.div>
        )}

        {hasStarted && !isOnboardingComplete && (
          <motion.div
            key="onboarding"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="w-full"
          >
            <OnboardingWizard onComplete={() => setIsOnboardingComplete(true)} />
          </motion.div>
        )}

        {isOnboardingComplete && (
          <motion.div
            key="app"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full min-h-screen"
          >
            <Workspace />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
