"use client";

import { useEffect } from "react";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    // TODO: Replace with error reporting service (e.g. Sentry) in production
    console.error("Unhandled error:", error);
  }, [error]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-black text-white">
      <div className="flex flex-col items-center gap-6 px-4 text-center">
        <h1 className="text-4xl font-bold tracking-tight">Something went wrong</h1>
        <p className="max-w-md text-lg text-zinc-400">
          An unexpected error occurred. Please try again.
        </p>
        <button
          onClick={reset}
          className="bg-brand-strong hover:bg-brand rounded-full px-6 py-3 font-semibold text-white transition-colors"
        >
          Try Again
        </button>
      </div>
    </main>
  );
}
