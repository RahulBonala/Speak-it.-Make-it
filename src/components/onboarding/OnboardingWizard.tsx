"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { WelcomeStep } from "./steps/WelcomeStep";
import { VoiceCalibrationStep } from "./steps/VoiceCalibrationStep";
import { PreferencesStep } from "./steps/PreferencesStep";

interface OnboardingWizardProps {
    onComplete: () => void;
}

export function OnboardingWizard({ onComplete }: OnboardingWizardProps) {
    const [step, setStep] = useState(0);

    const nextStep = () => setStep((prev) => prev + 1);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen w-full px-4">
            {/* Progress Dots */}
            <div className="flex gap-2 mb-12">
                {[0, 1, 2].map((i) => (
                    <div
                        key={i}
                        className={`w-2 h-2 rounded-full transition-colors duration-300 ${i === step ? "bg-blue-500" : "bg-zinc-800"
                            }`}
                    />
                ))}
            </div>

            <AnimatePresence mode="wait">
                {step === 0 && <WelcomeStep key="welcome" onNext={nextStep} />}
                {step === 1 && <VoiceCalibrationStep key="calibration" onNext={nextStep} />}
                {step === 2 && <PreferencesStep key="preferences" onComplete={onComplete} />}
            </AnimatePresence>
        </div>
    );
}
