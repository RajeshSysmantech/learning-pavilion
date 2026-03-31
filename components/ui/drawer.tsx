import type { ReactNode } from "react";
import { Card } from "@/components/ui/card";

export function Drawer({
  title,
  children
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <Card className="space-y-4">
      <h3 className="text-lg font-bold text-brand-ink">{title}</h3>
      {children}
    </Card>
  );
}
