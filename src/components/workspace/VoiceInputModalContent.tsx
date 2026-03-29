"use client";

import { motion } from "framer-motion";
import { Mic, X, Check } from "lucide-react";
import { useState, useEffect, useRef } from "react";

interface VoiceInputModalContentProps {
  onClose: () => void;
  onSubmit: (text: string) => void;
}

export function VoiceInputModalContent({ onClose, onSubmit }: VoiceInputModalContentProps) {
  const [transcript, setTranscript] = useState("");
  const [isListening, setIsListening] = useState(true);
  const isListeningRef = useRef(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    let audioCtx: AudioContext | null = null;

    async function startVisualizer() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        streamRef.current = stream;
        audioCtx = new AudioContext();
        const source = audioCtx.createMediaStreamSource(stream);
        const analyser = audioCtx.createAnalyser();
        analyser.fftSize = 64;
        source.connect(analyser);
        analyserRef.current = analyser;

        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const draw = () => {
          if (!analyserRef.current) return;
          const bufferLen = analyserRef.current.frequencyBinCount;
          const dataArr = new Uint8Array(bufferLen);
          analyserRef.current.getByteFrequencyData(dataArr);
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          const barWidth = canvas.width / bufferLen;
          dataArr.forEach((val, i) => {
            const barHeight = (val / 255) * canvas.height;
            const x = i * barWidth;
            const gradient = ctx.createLinearGradient(0, canvas.height, 0, 0);
            gradient.addColorStop(0, "rgba(59,130,246,0.8)");
            gradient.addColorStop(1, "rgba(147,51,234,0.8)");
            ctx.fillStyle = gradient;
            ctx.fillRect(x, canvas.height - barHeight, barWidth - 1, barHeight);
          });
          animFrameRef.current = requestAnimationFrame(draw);
        };
        draw();
      } catch {
        /* Microphone access denied or unavailable */
      }
    }

    startVisualizer();

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      if (analyserRef.current) {
        analyserRef.current.disconnect();
        analyserRef.current = null;
      }
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
        streamRef.current = null;
      }
      if (audioCtx) audioCtx.close();
    };
  }, []);

  useEffect(() => {
    let recognition: SpeechRecognition | null = null;

    if (!("SpeechRecognition" in window || "webkitSpeechRecognition" in window)) {
      return;
    }

    const SpeechRecognitionCtor =
      window.SpeechRecognition ?? window.webkitSpeechRecognition;
    recognition = new SpeechRecognitionCtor();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let fullTranscript = "";
      for (let i = 0; i < event.results.length; i++) {
        fullTranscript += event.results[i][0].transcript;
      }
      setTranscript(fullTranscript);
    };

    recognition.onend = () => {
      if (isListeningRef.current) {
        try {
          recognition?.start();
        } catch {
          setIsListening(false);
        }
      } else {
        setIsListening(false);
      }
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      if (event.error === "not-allowed") {
        setIsListening(false);
        isListeningRef.current = false;
      }
    };

    try {
      recognition.start();
    } catch {
      /* Recognition start failed */
    }

    return () => {
      isListeningRef.current = false;
      if (recognition) recognition.stop();
    };
  }, []);

  const handleStopAndSubmit = () => {
    isListeningRef.current = false;
    if (transcript.trim()) onSubmit(transcript);
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Voice input"
    >
      <motion.div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      <motion.div
        initial={{ y: 40, opacity: 0, scale: 0.97 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 40, opacity: 0, scale: 0.97 }}
        transition={{ type: "spring", stiffness: 400, damping: 35 }}
        className="relative w-full max-w-md bg-zinc-900 border border-white/10 rounded-2xl p-6 shadow-2xl flex flex-col gap-5"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Mic className="w-4 h-4 text-blue-400" aria-hidden="true" />
            <span className="text-sm font-semibold text-white">Voice Input</span>
          </div>
          <button
            onClick={onClose}
            className="text-zinc-500 hover:text-white transition-colors"
            aria-label="Close voice input"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <canvas
          ref={canvasRef}
          width={400}
          height={60}
          className="w-full rounded-lg bg-black/30"
          aria-hidden="true"
        />

        <div className="min-h-[64px] bg-white/5 rounded-xl px-4 py-3 border border-white/8">
          {transcript ? (
            <motion.p
              key={transcript}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm text-white leading-relaxed"
            >
              &ldquo;{transcript}&rdquo;
            </motion.p>
          ) : (
            <motion.p
              animate={{ opacity: [0.4, 0.8, 0.4] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="text-sm text-zinc-500 italic"
            >
              {isListening ? "Listening..." : "Mic inactive"}
            </motion.p>
          )}
        </div>

        <p className="text-xs text-zinc-600 text-center">
          Try: &ldquo;Shopping list with milk, eggs, and bread&rdquo;
        </p>

        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-400 text-sm font-medium transition-colors"
          >
            Cancel
          </button>

          <div className="relative flex-1">
            {isListening && (
              <motion.div
                className="absolute inset-0 rounded-xl bg-blue-500/30"
                animate={{ scale: [1, 1.05, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            )}
            <button
              onClick={handleStopAndSubmit}
              disabled={!transcript.trim()}
              className="relative w-full py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm font-medium transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <Check className="w-4 h-4" aria-hidden="true" />
              Create Stack
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
