import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";

export default function ChildrenPage() {
  return (
    <div className="space-y-6">
      <PageHeader eyebrow="Parent Dashboard" title="Linked children" description="Phase 2 surface scaffolded now so schema and access patterns remain future-safe." />
      <Card className="space-y-4">
        <h2 className="text-xl font-bold text-brand-ink">Aarohi Sharma</h2>
        <p className="text-sm text-slate-500">Coins: 1240 • Streak: 7 days • Recent quiz average: 84%</p>
        <Link href="/children/child-1">
          <Button>View child summary</Button>
        </Link>
      </Card>
    </div>
  );
}
