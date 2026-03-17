"use client";

import { useState, useEffect, useCallback } from "react";
import { Stack } from "@/lib/types";
import { WidgetStack } from "./WidgetStack";
import { WorkspaceControls } from "./WorkspaceControls";
import { VoiceInputModal } from "./VoiceInputModal";
import { motion, AnimatePresence } from "framer-motion";

const STORAGE_KEY = "speak-it-stacks-v1";
const COLORS = ["blue", "purple", "emerald", "rose", "orange"];

function genId() { return Math.random().toString(36).substr(2, 9); }

function parseVoiceInput(text: string): { title: string; items: string[] } {
  const lower = text.toLowerCase().trim();

  if (lower.includes(" with ")) {
    const parts = text.split(/ with /i);
    const title = parts[0].trim();
    const rest = parts.slice(1).join(" with ");
    const items = rest.split(/,\s*|\s+and\s+/).map(i => i.trim()).filter(Boolean);
    return { title, items };
  }

  if (/^(add|create)\s+/i.test(text)) {
    const withoutPrefix = text.replace(/^(add|create)\s+/i, "");
    if (withoutPrefix.includes(":")) {
      const [title, rest] = withoutPrefix.split(":");
      const items = rest.split(/,\s*|\s+and\s+/).map(i => i.trim()).filter(Boolean);
      return { title: title.trim(), items };
    }
    return { title: withoutPrefix.trim(), items: [] };
  }

  return { title: text.trim(), items: [] };
}

export function Workspace() {
  const [stacks, setStacks] = useState<Stack[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setStacks(JSON.parse(saved));
      } else {
        const now = Date.now();
        setStacks([{
          id: "intro-stack",
          title: "Welcome to your Workspace",
          color: "blue",
          createdAt: now,
          widgets: [
            { id: "w1", type: "note", content: "This is a Widget Stack.", isCompleted: false, createdAt: now },
            { id: "w2", type: "task", content: "Tap the mic to add a new stack.", isCompleted: false, createdAt: now },
            { id: "w3", type: "task", content: "Click any task to complete it!", isCompleted: false, createdAt: now },
            { id: "w4", type: "reminder", content: "Double-click the title to rename it.", isCompleted: false, createdAt: now },
            { id: "w5", type: "task", content: "Press Space or M to open the mic.", isCompleted: false, createdAt: now },
          ],
        }]);
      }
    } catch { /* ignore */ }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (!isLoaded) return;
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(stacks)); } catch { /* ignore */ }
  }, [stacks, isLoaded]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement).tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      if ((e.key === " " || e.key === "m" || e.key === "M") && !isModalOpen) {
        e.preventDefault();
        setIsModalOpen(true);
      }
      if (e.key === "Escape") setIsModalOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isModalOpen]);

  const handleVoiceInput = useCallback((text: string) => {
    const { title, items } = parseVoiceInput(text);
    const newStack: Stack = {
      id: genId(),
      title: title.charAt(0).toUpperCase() + title.slice(1),
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      createdAt: Date.now(),
      widgets: items.length > 0
        ? items.map(item => ({
            id: genId(), type: "task" as const,
            content: item.charAt(0).toUpperCase() + item.slice(1),
            isCompleted: false, createdAt: Date.now(),
          }))
        : [{ id: genId(), type: "note" as const, content: "Stack created from voice.", isCompleted: false, createdAt: Date.now() }],
    };
    setStacks(prev => [newStack, ...prev]);
  }, []);

  const handleToggleWidget = useCallback((stackId: string, widgetId: string) => {
    setStacks(prev => prev.map(s =>
      s.id === stackId
        ? { ...s, widgets: s.widgets.map(w => w.id === widgetId ? { ...w, isCompleted: !w.isCompleted } : w) }
        : s
    ));
  }, []);

  const handleDeleteStack = useCallback((stackId: string) => {
    setStacks(prev => prev.filter(s => s.id !== stackId));
  }, []);

  const handleAddWidget = useCallback((stackId: string, content: string) => {
    setStacks(prev => prev.map(s =>
      s.id === stackId
        ? { ...s, widgets: [...s.widgets, { id: genId(), type: "task" as const, content, isCompleted: false, createdAt: Date.now() }] }
        : s
    ));
  }, []);

  const handleRenameStack = useCallback((stackId: string, title: string) => {
    setStacks(prev => prev.map(s => s.id === stackId ? { ...s, title } : s));
  }, []);

  return (
    <div className="relative min-h-screen pb-36">
      {/* Background grid */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-900 via-zinc-950 to-black pointer-events-none" />

      {stacks.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3">
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-2xl font-bold text-white"
          >
            Workspace empty
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-zinc-500 text-sm"
          >
            Press Space or tap the mic to create a stack
          </motion.p>
        </div>
      ) : (
        <div className="relative p-6 pt-8">
          <AnimatePresence mode="popLayout">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {stacks.map((stack, index) => (
                <motion.div key={stack.id} layout>
                  <WidgetStack
                    stack={stack}
                    index={index}
                    onToggleWidget={handleToggleWidget}
                    onDeleteStack={handleDeleteStack}
                    onAddWidget={handleAddWidget}
                    onRenameStack={handleRenameStack}
                  />
                </motion.div>
              ))}
            </div>
          </AnimatePresence>
        </div>
      )}

      <WorkspaceControls onOpenVoiceInput={() => setIsModalOpen(true)} />
      <VoiceInputModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSubmit={handleVoiceInput} />
    </div>
  );
}
