import { ProgressBar } from "@/components/ui/progress-bar";
import { Card } from "@/components/ui/card";

type Option = {
  id: string;
  label: string;
};

export function QuestionCard({
  question,
  options,
  current,
  total,
  selectedOptionId,
  onSelect
}: {
  question: string;
  options: Option[];
  current: number;
  total: number;
  selectedOptionId?: string | null;
  onSelect?: (optionId: string) => void;
}) {
  return (
    <Card className="space-y-5">
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm font-semibold text-slate-500">
          <span>
            Question {current} of {total}
          </span>
          <span>{Math.round((current / total) * 100)}%</span>
        </div>
        <ProgressBar value={current} max={total} />
      </div>
      <h3 className="text-xl font-bold text-brand-ink">{question}</h3>
      <div className="space-y-3">
        {options.map((option) => (
          <button
            key={option.id}
            type="button"
            onClick={() => onSelect?.(option.id)}
            className={`w-full rounded-2xl border px-4 py-3 text-left text-sm font-medium transition ${
              selectedOptionId === option.id
                ? "border-brand-blue bg-brand-blue/10 text-brand-blue"
                : "border-slate-200 bg-slate-50 text-brand-ink hover:border-brand-blue hover:bg-brand-blue/5"
            }`}
            aria-pressed={selectedOptionId === option.id}
          >
            {option.label}
          </button>
        ))}
      </div>
    </Card>
  );
}
