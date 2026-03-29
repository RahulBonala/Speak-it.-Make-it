"use client";

import { Widget } from "@/lib/types";
import { Check, Circle, StickyNote, Clock, Image as ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface WidgetItemProps {
  widget: Widget;
  onToggle?: (id: string) => void;
}

const iconMap = {
  note: StickyNote,
  task: Circle,
  reminder: Clock,
  image: ImageIcon,
} as const;

export function WidgetItem({ widget, onToggle }: WidgetItemProps) {
  const Icon = iconMap[widget.type];

  return (
    <motion.div
      layout
      role={widget.type === "task" ? "checkbox" : undefined}
      aria-checked={widget.type === "task" ? widget.isCompleted : undefined}
      tabIndex={0}
      onClick={() => onToggle?.(widget.id)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onToggle?.(widget.id);
        }
      }}
      className={cn(
        "flex items-start gap-3 px-3 py-2.5 rounded-lg transition-colors cursor-pointer select-none",
        widget.type === "task" ? "hover:bg-white/8 active:bg-white/12" : "hover:bg-white/5",
        widget.isCompleted && "opacity-50",
      )}
    >
      <div className="mt-0.5 shrink-0" aria-hidden="true">
        {widget.type === "task" ? (
          widget.isCompleted ? (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className="w-4 h-4 rounded-full bg-emerald-500 flex items-center justify-center"
            >
              <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />
            </motion.div>
          ) : (
            <Circle className="w-4 h-4 text-zinc-500" />
          )
        ) : (
          <Icon className="w-4 h-4 text-zinc-400" />
        )}
      </div>

      <span
        className={cn(
          "text-sm leading-relaxed",
          widget.isCompleted ? "line-through text-zinc-500" : "text-zinc-200",
        )}
      >
        {widget.content}
      </span>
    </motion.div>
  );
}
