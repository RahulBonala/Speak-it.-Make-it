"use client";

import { useState, useEffect } from "react";
import { Stack } from "@/lib/types";
import { WidgetStack } from "./WidgetStack";
import { WorkspaceControls } from "./WorkspaceControls";
import { VoiceInputModal } from "./VoiceInputModal";
import { motion, AnimatePresence } from "framer-motion";

// Mock Data Generators
const STACK_TITLES = ["Project Alpha", "Weekend Trip", "Groceries", "Ideas", "Gym Routine"];
const WIDGET_CONTENT = ["Review PRs", "Buy milk", "Design mockups", "Call Mom", "Schedule dentist", "Update roadmap", "Book flights"];

const getRandom = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];

export function Workspace() {
    const [stacks, setStacks] = useState<Stack[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        // Add a welcome stack if empty
        if (stacks.length === 0) {
            setTimeout(() => {
                setStacks([{
                    id: "intro-stack",
                    title: "Welcome to your Workspace",
                    color: "blue",
                    widgets: [
                        { id: "w1", type: "note", content: "This is a Widget Stack.", isCompleted: false },
                        { id: "w2", type: "task", content: "Tap the mic to add more.", isCompleted: false },
                        { id: "w3", type: "reminder", content: "Try dragging me around (soon)", isCompleted: false },
                    ]
                }]);
            }, 500);
        }
    }, []);

    const handleVoiceInput = (text: string) => {
        // Simple parsing logic: "Title with item1, item2, and item3"
        let title = "New Stack";
        let items: string[] = [];

        if (text.toLowerCase().includes(" with ")) {
            const parts = text.split(/ with /i);
            title = parts[0];
            const itemsPart = parts[1];
            // Split by comma or "and"
            items = itemsPart.split(/, | and /).filter(i => i.trim().length > 0);
        } else {
            // Just a title or single item input
            title = text;
        }

        const newStack: Stack = {
            id: Math.random().toString(36).substr(2, 9),
            title: title.charAt(0).toUpperCase() + title.slice(1),
            color: ["blue", "purple", "emerald", "rose", "orange"][Math.floor(Math.random() * 5)],
            widgets: items.length > 0 ? items.map(item => ({
                id: Math.random().toString(36).substr(2, 9),
                type: "task",
                content: item.trim(),
                isCompleted: false
            })) : [{
                id: Math.random().toString(36).substr(2, 9),
                type: "note",
                content: "Empty stack created from input",
                isCompleted: false
            }],
        };

        setStacks((prev) => [newStack, ...prev]);
    };

    return (
        <div className="relative w-full h-full min-h-screen p-4 sm:p-8 pt-24 pb-32">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[length:40px_40px] pointer-events-none" />

            {stacks.length === 0 ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-zinc-500 pointer-events-none">
                    <p className="mb-4">Workspace Empty</p>
                    <p className="text-sm opacity-50">Tap the microphone to create a stack</p>
                </div>
            ) : (
                <div className="max-w-7xl mx-auto columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
                    <AnimatePresence mode="popLayout">
                        {stacks.map((stack, index) => (
                            <div key={stack.id} className="break-inside-avoid">
                                <WidgetStack stack={stack} index={index} />
                            </div>
                        ))}
                    </AnimatePresence>
                </div>
            )}

            <WorkspaceControls onOpenVoiceInput={() => setIsModalOpen(true)} />
            <VoiceInputModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleVoiceInput}
            />
        </div>
    );
}
