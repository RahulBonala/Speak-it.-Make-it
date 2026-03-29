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
      const SpeechRecognitionCtor =
        window.SpeechRecognition ?? window.webkitSpeechRecognition;
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
      className="flex flex-col items-center text-center space-y-8 max-w-lg w-full"
    >
      <div className="space-y-2">
        <h2 className="text-3xl font-bold text-white">Voice Calibration</h2>
        <p className="text-zinc-400">
          Tap the mic and confirm:{" "}
          <br />
          <span className="text-blue-400 font-medium">
            &quot;I am ready to create&quot;
          </span>
        </p>
      </div>

      <div className="relative w-32 h-32 flex items-center justify-center">
        {isListening && (
          <>
            <motion.div
              className="absolute inset-0 bg-blue-500 rounded-full opacity-20"
              animate={{ scale: [1, 2.5], opacity: [0.3, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
            />
            <motion.div
              className="absolute inset-0 bg-purple-500 rounded-full opacity-20"
              animate={{ scale: [1, 1.8], opacity: [0.3, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.4, ease: "easeOut" }}
            />
          </>
        )}

        <button
          onClick={startListening}
          disabled={isListening}
          aria-label={isListening ? "Listening for voice input" : "Start voice calibration"}
          className={`relative z-10 w-24 h-24 rounded-full flex items-center justify-center transition-all duration-300 ${
            isListening
              ? "bg-zinc-800 scale-95 cursor-default"
              : "bg-blue-600 hover:bg-blue-500 hover:scale-105 shadow-[0_0_30px_rgba(37,99,235,0.5)]"
          }`}
        >
          {effectiveProgress >= 100 ? (
            <Check className="w-10 h-10 text-green-400" />
          ) : (
            <Mic
              className={`w-10 h-10 text-white ${isListening ? "animate-pulse text-blue-400" : ""}`}
            />
          )}
        </button>
      </div>

      <div className="w-full max-w-xs space-y-4 h-24">
        {isListening || detectedText ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <p className="text-lg font-medium text-white min-h-[1.5em]">
              &quot;{detectedText || "Listening..."}&quot;
            </p>

            <div
              className="h-2 bg-zinc-800 rounded-full overflow-hidden"
              role="progressbar"
              aria-valuenow={effectiveProgress}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              <motion.div
                className="h-full bg-gradient-to-r from-blue-500 to-green-500"
                initial={{ width: 0 }}
                animate={{ width: `${effectiveProgress}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </motion.div>
        ) : (
          <p className="text-sm text-zinc-500 pt-4 animate-pulse">Tap microphone to begin</p>
        )}
      </div>
    </motion.div>
  );
}
