"use client";

import { Widget } from "@/lib/types";
import { Check, Circle, StickyNote, Clock, Image as ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface WidgetItemProps {
    widget: Widget;
    onToggle?: (id: string) => void;
}

export function WidgetItem({ widget, onToggle }: WidgetItemProps) {
    const Icon = {
        note: StickyNote,
        task: Circle,
        reminder: Clock,
        image: ImageIcon,
    }[widget.type];

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn(
                "flex items-start gap-3 p-3 text-sm rounded-lg transition-colors group",
                widget.isCompleted ? "text-white/30 line-through bg-white/5" : "text-zinc-200 hover:bg-white/5"
            )}
        >
            <button
                onClick={() => onToggle?.(widget.id)}
                className={cn(
                    "mt-0.5 flex-shrink-0 transition-colors",
                    widget.isCompleted ? "text-green-500" : "text-zinc-500 group-hover:text-zinc-300"
                )}
            >
                {widget.type === "task" ? (
                    widget.isCompleted ? (
                        <Check className="w-4 h-4" />
                    ) : (
                        <Circle className="w-4 h-4" />
                    )
                ) : (
                    <Icon className="w-4 h-4" />
                )}
            </button>

            <span className="leading-snug">{widget.content}</span>
        </motion.div>
    );
}
