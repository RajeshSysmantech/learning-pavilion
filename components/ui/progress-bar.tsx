export function ProgressBar({
  value,
  max = 100
}: {
  value: number;
  max?: number;
}) {
  const percentage = Math.min(100, Math.round((value / max) * 100));

  return (
    <div className="h-3 rounded-full bg-slate-100">
      <div
        className="h-3 rounded-full bg-gradient-to-r from-brand-blue to-brand-green"
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
}
