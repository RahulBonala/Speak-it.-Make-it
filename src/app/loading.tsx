export default function Loading() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-black">
      <div className="flex flex-col items-center gap-4">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-zinc-700 border-t-blue-500" />
        <p className="text-sm text-zinc-500">Loading...</p>
      </div>
    </main>
  );
}
