"use client";

import { Stack } from "@/lib/types";
import { WidgetItem } from "./WidgetItem";
import { motion } from "framer-motion";
import { MoreHorizontal } from "lucide-react";

interface WidgetStackProps {
    stack: Stack;
    index: number;
}

export function WidgetStack({ stack, index }: WidgetStackProps) {
    // Staggered entry animation based on index
    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{
                type: "spring",
                damping: 20,
                stiffness: 100,
                delay: index * 0.1
            }}
            className={`
        relative overflow-hidden
        w-full max-w-sm rounded-2xl 
        border border-white/10 bg-white/5 backdrop-blur-md
        shadow-xl shadow-black/20
        flex flex-col
      `}
        >
            {/* Header */}
            <div className={`p-4 border-b border-white/5 flex items-center justify-between bg-gradient-to-r from-${stack.color}-500/10 to-transparent`}>
                <h3 className="font-semibold text-white tracking-wide">{stack.title}</h3>
                <button className="text-zinc-500 hover:text-white transition-colors">
                    <MoreHorizontal className="w-4 h-4" />
                </button>
            </div>

            {/* Widgets List */}
            <div className="p-3 space-y-1">
                {stack.widgets.map((widget) => (
                    <WidgetItem key={widget.id} widget={widget} />
                ))}
            </div>

            {/* Footer / Add Action (Visual only for prototype) */}
            <div className="p-3 pt-0">
                <button className="w-full py-2 text-xs font-medium text-zinc-500 hover:text-zinc-300 hover:bg-white/5 rounded-lg transition-colors text-left px-3">
                    + Add item
                </button>
            </div>
        </motion.div>
    );
}
