import { Card } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";

export default function NotificationsPage() {
  const items = [
    "You earned the 5-Day Streak badge.",
    "Your reward redemption is pending admin approval.",
    "Daily quiz challenge starts now.",
    "You moved up two places on the typing leaderboard."
  ];

  return (
    <div className="space-y-6">
      <PageHeader eyebrow="Notifications" title="Stay updated" description="Badges, streaks, approvals, leaderboard events, and promotions arrive here." />
      <div className="space-y-3">
        {items.map((item) => (
          <Card key={item}>
            <p className="text-sm text-brand-ink">{item}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
