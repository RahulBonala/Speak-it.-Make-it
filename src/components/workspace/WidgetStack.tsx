"use client";

import { Stack } from "@/lib/types";
import { WidgetItem } from "./WidgetItem";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Check } from "lucide-react";
import { useState, useRef } from "react";

interface WidgetStackProps {
  stack: Stack;
  index: number;
  onToggleWidget: (stackId: string, widgetId: string) => void;
  onDeleteStack: (stackId: string) => void;
  onAddWidget: (stackId: string, content: string) => void;
  onRenameStack: (stackId: string, title: string) => void;
}

const colorMap: Record<string, string> = {
  blue: "from-brand/20 to-transparent",
  purple: "from-brand-strong/20 to-transparent",
  emerald: "from-emerald-500/20 to-transparent",
  rose: "from-rose-500/20 to-transparent",
  orange: "from-orange-500/20 to-transparent",
};

const progressColorMap: Record<string, string> = {
  blue: "from-brand to-brand-strong",
  purple: "from-brand-strong to-brand",
  emerald: "from-emerald-500 to-emerald-400",
  rose: "from-rose-500 to-rose-400",
  orange: "from-orange-500 to-orange-400",
};

export function WidgetStack({
  stack,
  index,
  onToggleWidget,
  onDeleteStack,
  onAddWidget,
  onRenameStack,
}: WidgetStackProps) {
  const [showAddInput, setShowAddInput] = useState(false);
  const [newItemText, setNewItemText] = useState("");
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [editTitle, setEditTitle] = useState(stack.title);
  const inputRef = useRef<HTMLInputElement>(null);

  const completedCount = stack.widgets.filter((w) => w.isCompleted).length;
  const totalCount = stack.widgets.length;
  const allDone = totalCount > 0 && completedCount === totalCount;

  const handleAddItem = () => {
    if (newItemText.trim()) {
      onAddWidget(stack.id, newItemText.trim());
      setNewItemText("");
      inputRef.current?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleAddItem();
    if (e.key === "Escape") {
      setShowAddInput(false);
      setNewItemText("");
    }
  };

  const handleTitleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === "Escape") {
      onRenameStack(stack.id, editTitle.trim() || stack.title);
      setIsEditingTitle(false);
    }
  };

  return (
    <motion.article
      layout
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: -20 }}
      transition={{ delay: index * 0.05 }}
      aria-label={`Stack: ${stack.title}`}
      className={`group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/80 backdrop-blur-sm transition-shadow ${
        allDone ? "shadow-[0_0_30px_rgba(34,197,94,0.15)]" : ""
      }`}
    >
      <div
        className={`absolute top-0 right-0 left-0 h-24 bg-gradient-to-b ${colorMap[stack.color] ?? colorMap.blue} pointer-events-none`}
        aria-hidden="true"
      />

      <AnimatePresence>
        {allDone && (
          <motion.div
            key="allDone"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="pointer-events-none absolute inset-0 rounded-2xl bg-emerald-500/5"
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      <div className="relative flex items-center justify-between px-4 pt-4 pb-2">
        <div className="flex min-w-0 flex-1 items-center gap-2">
          {isEditingTitle ? (
            <label className="sr-only" htmlFor={`title-${stack.id}`}>
              Stack title
            </label>
          ) : null}
          {isEditingTitle ? (
            <input
              id={`title-${stack.id}`}
              autoFocus
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              onBlur={() => {
                onRenameStack(stack.id, editTitle.trim() || stack.title);
                setIsEditingTitle(false);
              }}
              onKeyDown={handleTitleKeyDown}
              className="w-full rounded border border-white/20 bg-white/10 px-2 py-0.5 text-sm font-semibold text-white outline-none focus:border-white/40"
            />
          ) : (
            <h3
              onDoubleClick={() => setIsEditingTitle(true)}
              className="cursor-default truncate text-sm font-semibold text-white select-none"
              title="Double-click to rename"
            >
              {stack.title}
            </h3>
          )}
          {totalCount > 0 && (
            <span
              className={`shrink-0 rounded-full px-1.5 py-0.5 text-xs font-medium ${
                allDone ? "bg-emerald-500/20 text-emerald-400" : "bg-white/10 text-zinc-400"
              }`}
            >
              {allDone ? (
                <Check className="inline h-3 w-3" aria-label="All tasks complete" />
              ) : (
                `${completedCount}/${totalCount}`
              )}
            </span>
          )}
        </div>

        <div className="ml-2 flex items-center gap-1">
          <button
            onClick={() => onDeleteStack(stack.id)}
            aria-label={`Delete stack: ${stack.title}`}
            className="rounded p-1 text-zinc-600 opacity-0 transition-colors group-hover:opacity-100 hover:text-rose-400 focus:opacity-100"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      <div className="relative flex-1 px-2 pb-2" role="list" aria-label="Widgets">
        <AnimatePresence initial={false}>
          {stack.widgets.map((widget) => (
            <WidgetItem
              key={widget.id}
              widget={widget}
              onToggle={(wId) => onToggleWidget(stack.id, wId)}
            />
          ))}
        </AnimatePresence>
      </div>

      <div className="relative px-2 pb-2">
        <AnimatePresence>
          {showAddInput && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="mb-1 overflow-hidden"
            >
              <label className="sr-only" htmlFor={`add-item-${stack.id}`}>
                New item text
              </label>
              <input
                id={`add-item-${stack.id}`}
                ref={inputRef}
                value={newItemText}
                onChange={(e) => setNewItemText(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Add item... (Enter to save, Esc to cancel)"
                className="w-full rounded-lg border border-white/10 bg-white/10 px-3 py-2 text-sm text-white outline-none placeholder:text-zinc-600 focus:border-white/30"
              />
            </motion.div>
          )}
        </AnimatePresence>
        <button
          onClick={() => {
            setShowAddInput(true);
            setTimeout(() => inputRef.current?.focus(), 50);
          }}
          className="flex w-full items-center gap-1.5 rounded-lg px-3 py-2 text-left text-xs font-medium text-zinc-500 transition-colors hover:bg-white/5 hover:text-zinc-300"
        >
          <Plus className="h-3.5 w-3.5" aria-hidden="true" />
          Add item
        </button>
      </div>

      {totalCount > 0 && (
        <div
          className="relative h-1 overflow-hidden rounded-b-2xl bg-white/5"
          role="progressbar"
          aria-valuenow={completedCount}
          aria-valuemin={0}
          aria-valuemax={totalCount}
          aria-label={`${completedCount} of ${totalCount} tasks completed`}
        >
          <motion.div
            className={`h-full bg-gradient-to-r ${progressColorMap[stack.color] ?? progressColorMap.blue}`}
            initial={{ width: 0 }}
            animate={{ width: `${(completedCount / totalCount) * 100}%` }}
            transition={{ type: "spring", stiffness: 200, damping: 30 }}
          />
        </div>
      )}
    </motion.article>
  );
}
