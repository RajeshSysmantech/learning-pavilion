import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <div className="max-w-lg text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-orange">
          404
        </p>
        <h1 className="mt-3 text-4xl font-black text-brand-ink">Page not found</h1>
        <p className="mt-3 text-slate-600">
          The learning quest you are looking for does not exist yet.
        </p>
        <Link href="/" className="mt-6 inline-block">
          <Button>Back to home</Button>
        </Link>
      </div>
    </div>
  );
}
