import { AdminHero } from "@/components/admin/admin-hero";
import { Card } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import { StatCard } from "@/components/ui/stat-card";
import { adminStats } from "@/lib/demo-content";

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <AdminHero title="Platform dashboard" description="Track usage, subscriptions, content performance, moderation, and revenue at a glance." />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total users" value={adminStats.totalUsers} />
        <StatCard label="Active today" value={adminStats.activeToday} />
        <StatCard label="Pending redemptions" value={adminStats.pendingRedemptions} />
        <StatCard label="MRR" value={adminStats.mrr} />
      </div>
      <div className="grid gap-4 xl:grid-cols-2">
        <Card className="space-y-2">
          <h3 className="text-lg font-bold text-brand-ink">Revenue trend</h3>
          <p className="text-sm text-slate-500">Monthly and yearly revenue charts can be connected to your reporting layer here.</p>
        </Card>
        <DataTable
          columns={["Metric", "Value"]}
          rows={[
            ["Students", adminStats.students],
            ["Parents", adminStats.parents],
            ["Quiz attempts today", adminStats.quizAttempts],
            ["Typing attempts today", adminStats.typingAttempts]
          ]}
        />
      </div>
    </div>
  );
}
