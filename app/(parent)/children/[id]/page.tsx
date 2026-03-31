import { Card } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";
import { StatCard } from "@/components/ui/stat-card";

export default function ChildPerformancePage() {
  return (
    <div className="space-y-6">
      <PageHeader eyebrow="Child Summary" title="Aarohi's progress" description="Time spent, weak areas, recent rewards, and plan status will live here in Phase 2." />
      <div className="grid gap-4 md:grid-cols-3">
        <StatCard label="Quiz average" value="84%" />
        <StatCard label="Typing accuracy" value="95%" />
        <StatCard label="Time spent this week" value="4h 10m" />
      </div>
      <Card>
        <p className="text-sm text-slate-500">Weak areas currently identified: fractions, punctuation, and sustained speed.</p>
      </Card>
    </div>
  );
}
