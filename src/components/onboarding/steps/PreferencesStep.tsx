"use client";

import { motion } from "framer-motion";
import { Check, Monitor, Bell, Zap } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface PreferencesStepProps {
  onComplete: () => void;
}

export function PreferencesStep({ onComplete }: PreferencesStepProps) {
  const [preferences, setPreferences] = useState({
    autoStack: true,
    notifications: false,
    highContrast: false,
  });

  const toggle = (key: keyof typeof preferences) => {
    setPreferences((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex w-full max-w-md flex-col items-center space-y-8 text-center"
    >
      <div className="space-y-2">
        <h2 className="text-3xl font-bold text-white">Preferences</h2>
        <p className="text-zinc-400">Customize your workspace experience.</p>
      </div>

      <div className="w-full space-y-4" role="group" aria-label="Workspace preferences">
        <PreferenceOption
          id="autoStack"
          icon={<Zap className="h-5 w-5 text-yellow-400" aria-hidden="true" />}
          label="Auto-Stack Widgets"
          description="Automatically group related voice commands."
          active={preferences.autoStack}
          onClick={() => toggle("autoStack")}
        />
        <PreferenceOption
          id="notifications"
          icon={<Bell className="h-5 w-5 text-red-400" aria-hidden="true" />}
          label="Smart Notifications"
          description="Get alerted when tasks are due."
          active={preferences.notifications}
          onClick={() => toggle("notifications")}
        />
        <PreferenceOption
          id="highContrast"
          icon={<Monitor className="h-5 w-5 text-green-400" aria-hidden="true" />}
          label="High Contrast Mode"
          description="Increase visibility for outdoor usage."
          active={preferences.highContrast}
          onClick={() => toggle("highContrast")}
        />
      </div>

      <button
        onClick={onComplete}
        className="bg-brand-strong hover:bg-brand w-full rounded-xl py-4 font-bold text-white transition-all active:scale-95"
      >
        Finish Setup
      </button>
    </motion.div>
  );
}

function PreferenceOption({
  id,
  icon,
  label,
  description,
  active,
  onClick,
}: {
  id: string;
  icon: React.ReactNode;
  label: string;
  description: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <div
      role="switch"
      aria-checked={active}
      aria-label={label}
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
      className={cn(
        "flex cursor-pointer items-center gap-4 rounded-xl border border-white/5 p-4 transition-all",
        active ? "border-brand/50 bg-white/10" : "bg-black hover:bg-white/5",
      )}
    >
      <div className="rounded-lg bg-white/5 p-3">{icon}</div>
      <div className="flex-1 text-left">
        <h3 className="font-semibold text-white" id={`pref-${id}`}>
          {label}
        </h3>
        <p className="text-xs text-zinc-500">{description}</p>
      </div>
      <div
        className={cn(
          "flex h-6 w-6 items-center justify-center rounded-full border transition-colors",
          active ? "bg-brand border-brand" : "border-zinc-700",
        )}
        aria-hidden="true"
      >
        {active && <Check className="h-4 w-4 text-white" />}
      </div>
    </div>
  );
}
