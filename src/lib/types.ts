export type WidgetType = "note" | "task" | "reminder" | "image";

export interface Widget {
  id: string;
  type: WidgetType;
  content: string;
  isCompleted?: boolean;
  createdAt: number;
}

export interface Stack {
  id: string;
  title: string;
  widgets: Widget[];
  color: string;
  position?: { x: number; y: number };
  createdAt: number;
}
