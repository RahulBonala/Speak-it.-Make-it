"use client";

import { motion } from "framer-motion";
import { Mic, Sparkles } from "lucide-react";

interface WorkspaceControlsProps {
    onOpenVoiceInput: () => void;
}

export function WorkspaceControls({ onOpenVoiceInput }: WorkspaceControlsProps) {
    return (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-4">
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onOpenVoiceInput}
                className="
          flex items-center gap-3 px-6 py-4 
          bg-white/10 backdrop-blur-2xl 
          border border-white/20 rounded-full 
          shadow-[0_0_50px_rgba(59,130,246,0.3)]
          text-white font-medium
          hover:bg-white/20 hover:border-white/30 transition-all
        "
            >
                <div className="relative">
                    <div className="absolute inset-0 bg-blue-500 blur-lg opacity-50 animate-pulse" />
                    <Mic className="w-5 h-5 relative z-10" />
                </div>
                <span>Tap to Speak</span>
            </motion.button>

        </div>
    );
}
