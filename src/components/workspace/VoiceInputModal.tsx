"use client";

import { AnimatePresence } from "framer-motion";
import { VoiceInputModalContent } from "./VoiceInputModalContent";

interface VoiceInputModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (text: string) => void;
}

export function VoiceInputModal({ isOpen, onClose, onSubmit }: VoiceInputModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <VoiceInputModalContent
          key="voice-modal"
          onClose={onClose}
          onSubmit={onSubmit}
        />
      )}
    </AnimatePresence>
  );
}
