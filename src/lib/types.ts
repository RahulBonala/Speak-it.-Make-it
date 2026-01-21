export type WidgetType = "note" | "task" | "reminder" | "image";

export interface Widget {
    id: string;
    type: WidgetType;
    content: string;
    isCompleted?: boolean;
}

export interface Stack {
    id: string;
    title: string;
    widgets: Widget[];
    color: string; // Tailwind color class prefix e.g. "blue"
    position?: { x: number; y: number }; // For floating layout
}
