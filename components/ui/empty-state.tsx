import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function EmptyState({
  title,
  description,
  actionLabel
}: {
  title: string;
  description: string;
  actionLabel?: string;
}) {
  return (
    <Card className="flex flex-col items-start gap-4 border-dashed text-left">
      <div className="space-y-1">
        <h3 className="text-lg font-bold text-brand-ink">{title}</h3>
        <p className="text-sm text-slate-500">{description}</p>
      </div>
      {actionLabel ? <Button variant="ghost">{actionLabel}</Button> : null}
    </Card>
  );
}
