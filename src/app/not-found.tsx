import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-black text-white">
      <div className="flex flex-col items-center gap-6 text-center px-4">
        <h1 className="text-6xl font-bold tracking-tight">404</h1>
        <p className="text-lg text-zinc-400 max-w-md">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-full font-semibold transition-colors"
        >
          Back to Home
        </Link>
      </div>
    </main>
  );
}
