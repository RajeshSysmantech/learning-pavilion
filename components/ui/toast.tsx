export function Toast({
  title,
  description
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-brand-green/20 bg-brand-green/10 p-4">
      <p className="font-semibold text-brand-green">{title}</p>
      <p className="mt-1 text-sm text-slate-600">{description}</p>
    </div>
  );
}
