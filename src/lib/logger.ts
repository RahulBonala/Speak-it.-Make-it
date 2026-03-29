type LogLevel = "info" | "warn" | "error";

function shouldLog(): boolean {
  return process.env.NODE_ENV !== "production";
}

function formatMessage(level: LogLevel, message: string, ...args: unknown[]): void {
  if (!shouldLog() && level !== "error") return;

  const timestamp = new Date().toISOString();
  const prefix = `[${timestamp}] [${level.toUpperCase()}]`;

  switch (level) {
    case "info":
      console.info(prefix, message, ...args);
      break;
    case "warn":
      console.warn(prefix, message, ...args);
      break;
    case "error":
      console.error(prefix, message, ...args);
      break;
  }
}

export const logger = {
  info: (message: string, ...args: unknown[]) => formatMessage("info", message, ...args),
  warn: (message: string, ...args: unknown[]) => formatMessage("warn", message, ...args),
  error: (message: string, ...args: unknown[]) => formatMessage("error", message, ...args),
};
