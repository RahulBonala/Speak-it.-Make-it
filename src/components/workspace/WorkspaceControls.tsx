"use client";

import { Mic } from "lucide-react";
import { motion } from "framer-motion";

interface WorkspaceControlsProps {
  onOpenVoiceInput: () => void;
}

export function WorkspaceControls({ onOpenVoiceInput }: WorkspaceControlsProps) {
  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-40">
      <p className="text-xs text-zinc-500 font-medium tracking-wide">
        Press{" "}
        <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-zinc-300 font-mono text-xs border border-white/10">Space</kbd>
        {" "}or{" "}
        <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-zinc-300 font-mono text-xs border border-white/10">M</kbd>
        {" "}to speak
      </p>
      <div className="relative">
        {/* Pulsing ring */}
        <motion.div
          className="absolute inset-0 rounded-full bg-blue-500/30"
          animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0, 0.6] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
        <button
          onClick={onOpenVoiceInput}
          className="relative w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-shadow"
        >
          <Mic className="w-6 h-6 text-white" />
        </button>
      </div>
    </div>
  );
}
