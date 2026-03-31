import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";

export default function ProfilePage() {
  return (
    <div className="space-y-6">
      <PageHeader eyebrow="Profile" title="Aarohi Sharma" description="Student profile, progress preferences, and language settings." />
      <Card className="space-y-4">
        <div className="grid gap-3 md:grid-cols-2">
          <p className="text-sm text-slate-500">Display name: Aaru</p>
          <p className="text-sm text-slate-500">Grade: 5</p>
          <p className="text-sm text-slate-500">Language: English</p>
          <p className="text-sm text-slate-500">Interests: Maths, Space, Puzzles</p>
        </div>
        <div className="flex gap-2">
          <Badge label="Explorer" tone="blue" />
          <Badge label="Maths Fan" tone="green" />
        </div>
      </Card>
    </div>
  );
}
