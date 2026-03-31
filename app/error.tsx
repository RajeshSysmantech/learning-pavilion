"use client";

import { Button } from "@/components/ui/button";

export default function Error({
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <div className="max-w-md rounded-3xl bg-white p-8 text-center shadow-soft">
        <h2 className="text-2xl font-bold text-brand-ink">Something went wrong</h2>
        <p className="mt-2 text-sm text-slate-500">
          We could not load this screen right now. Please try again.
        </p>
        <Button className="mt-6" onClick={reset}>
          Try again
        </Button>
      </div>
    </div>
  );
}
