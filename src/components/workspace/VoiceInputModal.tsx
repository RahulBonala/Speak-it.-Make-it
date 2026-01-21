"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Mic, X, Check } from "lucide-react";
import { useState, useEffect, useRef } from "react";

interface VoiceInputModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (text: string) => void;
}

export function VoiceInputModal({ isOpen, onClose, onSubmit }: VoiceInputModalProps) {
    const [transcript, setTranscript] = useState("");
    const [isListening, setIsListening] = useState(false);
    const isListeningRef = useRef(false);

    useEffect(() => {
        let recognition: any = null;

        if (isOpen) {
            setTranscript("");
            setIsListening(true);
            isListeningRef.current = true;

            if ("SpeechRecognition" in window || "webkitSpeechRecognition" in window) {
                const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
                recognition = new SpeechRecognition();
                recognition.continuous = true;
                recognition.interimResults = true;
                recognition.lang = "en-US";

                recognition.onstart = () => {
                    setIsListening(true);
                    isListeningRef.current = true;
                };

                recognition.onresult = (event: any) => {
                    let fullTranscript = "";
                    // On Android/Chrome, results accumulate. On others, might need to append. 
                    // Usually 'continuous' means results has history.
                    for (let i = 0; i < event.results.length; i++) {
                        fullTranscript += event.results[i][0].transcript;
                    }
                    setTranscript(fullTranscript);
                };

                recognition.onend = () => {
                    // If intentional stop, isListeningRef will be false.
                    // If browser stopped (no-speech), it will be true -> Restart.
                    if (isListeningRef.current) {
                        try {
                            recognition.start();
                        } catch (e) {
                            console.error("Restart failed", e);
                            setIsListening(false);
                        }
                    } else {
                        setIsListening(false);
                    }
                };

                recognition.onerror = (event: any) => {
                    console.error("Speech Recognition Error", event.error);
                    // Don't disable immediately on minor errors (no-speech), but crucial for user feedback
                    if (event.error === 'not-allowed') {
                        setIsListening(false);
                        isListeningRef.current = false;
                    }
                    // Ignore 'no-speech', onend will handle restart
                };

                try {
                    recognition.start();
                } catch (e) {
                    console.error("Start failed", e);
                }
            }
        } else {
            isListeningRef.current = false;
        }

        return () => {
            isListeningRef.current = false;
            if (recognition) recognition.stop();
        };
    }, [isOpen]); // Only run on open/close toggle

    const handleStopAndSubmit = () => {
        if (transcript.trim()) {
            onSubmit(transcript);
            onClose();
        } else {
            onClose();
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-end sm:items-end justify-center sm:pb-12">
                    {/* Safe area backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
                    />

                    {/* Floating Voice Island */}
                    <motion.div
                        initial={{ opacity: 0, y: 100, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 100, scale: 0.9 }}
                        className="relative z-10 w-full max-w-2xl mx-4 mb-4 sm:mb-0"
                    >
                        <div className="relative bg-zinc-900/90 border border-white/10 rounded-[2rem] p-8 shadow-2xl overflow-hidden backdrop-blur-xl min-h-[300px] flex flex-col justify-between">

                            {/* Ambient Glow */}
                            <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-blue-500/10 blur-[100px] transition-opacity duration-1000 ${isListening ? "opacity-100" : "opacity-0"}`} />

                            {/* Live Text Display */}
                            <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center space-y-4">
                                {transcript ? (
                                    <p className="text-3xl md:text-4xl font-medium text-white leading-tight">
                                        "{transcript}"
                                    </p>
                                ) : (
                                    <p className="text-2xl md:text-3xl font-medium text-zinc-500 animate-pulse">
                                        Listening...
                                    </p>
                                )}
                            </div>

                            {/* Controls */}
                            <div className="relative z-10 flex items-center justify-center gap-6 mt-8">
                                <button
                                    onClick={onClose}
                                    className="p-4 rounded-full bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white transition-all transform hover:scale-105"
                                >
                                    <X className="w-6 h-6" />
                                </button>

                                {/* Visualizer / Mic Status */}
                                <div className="relative">
                                    {isListening && (
                                        <motion.div
                                            className="absolute inset-0 bg-blue-500 rounded-full blur-xl"
                                            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0.8, 0.5] }}
                                            transition={{ duration: 2, repeat: Infinity }}
                                        />
                                    )}
                                    <div className={`relative z-10 w-20 h-20 rounded-full flex items-center justify-center bg-gradient-to-tr from-blue-600 to-purple-600 shadow-lg`}>
                                        <Mic className="w-8 h-8 text-white" />
                                    </div>
                                </div>

                                <button
                                    onClick={handleStopAndSubmit}
                                    disabled={!transcript.trim()}
                                    className="p-4 rounded-full bg-blue-600 text-white hover:bg-blue-500 disabled:opacity-50 disabled:bg-zinc-800 disabled:text-zinc-600 transition-all transform hover:scale-105"
                                >
                                    <Check className="w-6 h-6" />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
