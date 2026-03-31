import { Card } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <PageHeader eyebrow="Settings" title="Personal preferences" description="Manage notification preferences, privacy choices, and accessibility options." />
      <Card className="space-y-4">
        <label className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
          <span className="text-sm font-medium text-brand-ink">Email notifications</span>
          <input type="checkbox" defaultChecked />
        </label>
        <label className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
          <span className="text-sm font-medium text-brand-ink">Streak reminders</span>
          <input type="checkbox" defaultChecked />
        </label>
      </Card>
    </div>
  );
}
