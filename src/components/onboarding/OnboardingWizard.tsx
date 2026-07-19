"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { WelcomeStep } from "./steps/WelcomeStep";
import { VoiceCalibrationStep } from "./steps/VoiceCalibrationStep";
import { PreferencesStep } from "./steps/PreferencesStep";

interface OnboardingWizardProps {
  onComplete: () => void;
}

const STEP_LABELS = ["Welcome", "Calibration", "Preferences"];

export function OnboardingWizard({ onComplete }: OnboardingWizardProps) {
  const [step, setStep] = useState(0);

  const nextStep = () => setStep((prev) => prev + 1);

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center px-4">
      <nav aria-label="Onboarding progress" className="mb-12 flex gap-2">
        {STEP_LABELS.map((label, i) => (
          <div
            key={label}
            className={`h-2 w-2 rounded-full transition-colors duration-300 ${
              i === step ? "bg-brand" : "bg-zinc-800"
            }`}
            role="progressbar"
            aria-valuenow={i === step ? 1 : 0}
            aria-valuemin={0}
            aria-valuemax={1}
            aria-label={`${label}: ${i === step ? "current" : i < step ? "completed" : "upcoming"}`}
          />
        ))}
      </nav>

      <AnimatePresence mode="wait">
        {step === 0 && <WelcomeStep key="welcome" onNext={nextStep} />}
        {step === 1 && <VoiceCalibrationStep key="calibration" onNext={nextStep} />}
        {step === 2 && <PreferencesStep key="preferences" onComplete={onComplete} />}
      </AnimatePresence>
    </div>
  );
}
