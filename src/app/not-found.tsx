import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-black text-white">
      <div className="flex flex-col items-center gap-6 px-4 text-center">
        <h1 className="text-6xl font-bold tracking-tight">404</h1>
        <p className="max-w-md text-lg text-zinc-400">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="bg-brand-strong hover:bg-brand rounded-full px-6 py-3 font-semibold text-white transition-colors"
        >
          Back to Home
        </Link>
      </div>
    </main>
  );
}
