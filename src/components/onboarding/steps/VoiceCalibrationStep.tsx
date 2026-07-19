"use client";

import { motion } from "framer-motion";
import { Mic, Check } from "lucide-react";
import { useState, useEffect, useRef, useCallback } from "react";

interface VoiceCalibrationStepProps {
  onNext: () => void;
}

export function VoiceCalibrationStep({ onNext }: VoiceCalibrationStepProps) {
  const [isListening, setIsListening] = useState(false);
  const [detectedText, setDetectedText] = useState("");
  const [progress, setProgress] = useState(0);

  const isListeningRef = useRef(false);

  const startListening = useCallback(() => {
    if (isListening) return;
    setIsListening(true);
  }, [isListening]);

  useEffect(() => {
    let recognition: SpeechRecognition | null = null;

    if (!isListening) {
      isListeningRef.current = false;
      return;
    }

    isListeningRef.current = true;

    if ("SpeechRecognition" in window || "webkitSpeechRecognition" in window) {
      const SpeechRecognitionCtor = window.SpeechRecognition ?? window.webkitSpeechRecognition;
      recognition = new SpeechRecognitionCtor();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = "en-US";

      recognition.onresult = (event: SpeechRecognitionEvent) => {
        let transcript = "";
        for (let i = 0; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript;
        }
        setDetectedText(transcript);

        if (transcript.length > 2) {
          setProgress((prev) => Math.min(prev + transcript.length * 2, 100));
        }
      };

      recognition.onend = () => {
        if (isListeningRef.current) {
          try {
            recognition?.start();
          } catch {
            /* already started or context destroyed */
          }
        }
      };

      recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
        if (event.error === "not-allowed") {
          isListeningRef.current = false;
        }
      };

      try {
        recognition.start();
      } catch {
        /* start failed */
      }
    } else {
      setTimeout(() => {
        setDetectedText("Simulated Voice Input");
        setProgress(100);
      }, 1000);
    }

    return () => {
      isListeningRef.current = false;
      if (recognition) recognition.stop();
    };
  }, [isListening]);

  const effectiveProgress = detectedText.length > 15 ? 100 : progress;

  useEffect(() => {
    if (detectedText.length > 5 && effectiveProgress >= 100) {
      const timeout = setTimeout(() => {
        onNext();
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [detectedText, effectiveProgress, onNext]);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex w-full max-w-lg flex-col items-center space-y-8 text-center"
    >
      <div className="space-y-2">
        <h2 className="text-3xl font-bold text-white">Voice Calibration</h2>
        <p className="text-zinc-400">
          Tap the mic and confirm: <br />
          <span className="text-brand font-medium">&quot;I am ready to create&quot;</span>
        </p>
      </div>

      <div className="relative flex h-32 w-32 items-center justify-center">
        {isListening && (
          <>
            <motion.div
              className="bg-brand absolute inset-0 rounded-full opacity-20"
              animate={{ scale: [1, 2.5], opacity: [0.3, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
            />
            <motion.div
              className="bg-brand-strong absolute inset-0 rounded-full opacity-20"
              animate={{ scale: [1, 1.8], opacity: [0.3, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.4, ease: "easeOut" }}
            />
          </>
        )}

        <button
          onClick={startListening}
          disabled={isListening}
          aria-label={isListening ? "Listening for voice input" : "Start voice calibration"}
          className={`relative z-10 flex h-24 w-24 items-center justify-center rounded-full transition-all duration-300 ${
            isListening
              ? "scale-95 cursor-default bg-zinc-800"
              : "bg-brand-strong hover:bg-brand-deep shadow-[0_0_30px_rgba(255,107,26,0.5)] hover:scale-105"
          }`}
        >
          {effectiveProgress >= 100 ? (
            <Check className="h-10 w-10 text-green-400" />
          ) : (
            <Mic
              className={`h-10 w-10 text-white ${isListening ? "text-brand animate-pulse" : ""}`}
            />
          )}
        </button>
      </div>

      <div className="h-24 w-full max-w-xs space-y-4">
        {isListening || detectedText ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <p className="min-h-[1.5em] text-lg font-medium text-white">
              &quot;{detectedText || "Listening..."}&quot;
            </p>

            <div
              className="h-2 overflow-hidden rounded-full bg-zinc-800"
              role="progressbar"
              aria-valuenow={effectiveProgress}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              <motion.div
                className="from-brand h-full bg-gradient-to-r to-green-500"
                initial={{ width: 0 }}
                animate={{ width: `${effectiveProgress}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </motion.div>
        ) : (
          <p className="animate-pulse pt-4 text-sm text-zinc-500">Tap microphone to begin</p>
        )}
      </div>
    </motion.div>
  );
}
