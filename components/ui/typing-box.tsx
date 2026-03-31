import { Card } from "@/components/ui/card";

export function TypingBox({
  prompt,
  typedText,
  onChange
}: {
  prompt: string;
  typedText?: string;
  onChange?: (value: string) => void;
}) {
  return (
    <Card className="space-y-4">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-orange">
          Practice Text
        </p>
        <p className="mt-3 leading-7 text-slate-600">{prompt}</p>
      </div>
      <textarea
        value={typedText}
        onChange={(event) => onChange?.(event.target.value)}
        className="min-h-40 w-full rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm outline-none"
        placeholder="Your typing will appear here..."
      />
    </Card>
  );
}
