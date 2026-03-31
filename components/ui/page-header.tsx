import { ReactNode } from "react";

export function PageHeader({
  eyebrow,
  title,
  description,
  action
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div className="space-y-2">
        {eyebrow ? (
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-orange">
            {eyebrow}
          </p>
        ) : null}
        <div className="space-y-1">
          <h1 className="text-3xl font-black text-brand-ink md:text-4xl">{title}</h1>
          {description ? <p className="max-w-2xl text-slate-600">{description}</p> : null}
        </div>
      </div>
      {action}
    </div>
  );
}
