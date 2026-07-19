"use client";

import { Mic } from "lucide-react";
import { motion } from "framer-motion";

interface WorkspaceControlsProps {
  onOpenVoiceInput: () => void;
}

export function WorkspaceControls({ onOpenVoiceInput }: WorkspaceControlsProps) {
  return (
    <div className="fixed bottom-8 left-1/2 z-40 flex -translate-x-1/2 flex-col items-center gap-3">
      <p className="text-xs font-medium tracking-wide text-zinc-500">
        Press{" "}
        <kbd className="rounded border border-white/10 bg-white/10 px-1.5 py-0.5 font-mono text-xs text-zinc-300">
          Space
        </kbd>{" "}
        or{" "}
        <kbd className="rounded border border-white/10 bg-white/10 px-1.5 py-0.5 font-mono text-xs text-zinc-300">
          M
        </kbd>{" "}
        to speak
      </p>
      <div className="relative">
        <motion.div
          className="bg-brand/30 absolute inset-0 rounded-full"
          animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0, 0.6] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          aria-hidden="true"
        />
        <button
          onClick={onOpenVoiceInput}
          aria-label="Open voice input"
          className="from-brand to-brand-strong shadow-brand/30 hover:shadow-brand/50 relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br shadow-lg transition-shadow"
        >
          <Mic className="h-6 w-6 text-white" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
