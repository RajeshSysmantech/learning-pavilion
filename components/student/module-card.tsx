import type { Route } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";

export function ModuleCard({
  title,
  description,
  href
}: {
  title: string;
  description: string;
  href: Route;
}) {
  return (
    <Link href={href}>
      <Card className="group h-full bg-white transition hover:-translate-y-1 hover:shadow-game">
        <div className="flex h-full flex-col justify-between gap-6">
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-brand-ink">{title}</h3>
            <p className="text-sm text-slate-500">{description}</p>
          </div>
          <div className="flex items-center gap-2 text-sm font-semibold text-brand-blue">
            Start now
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
          </div>
        </div>
      </Card>
    </Link>
  );
}
