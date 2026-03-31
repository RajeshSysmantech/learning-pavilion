import { Flame, Rocket, Star } from "lucide-react";
import { LeaderboardList } from "@/components/ui/leaderboard-list";
import { PageHeader } from "@/components/ui/page-header";
import { RewardCard } from "@/components/ui/reward-card";
import { SectionTitle } from "@/components/ui/section-title";
import { StatCard } from "@/components/ui/stat-card";
import { ModuleCard } from "@/components/student/module-card";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { formatNumber } from "@/lib/utils";
import { getServerSession } from "@/server/auth/session";
import { getStudentDashboard } from "@/server/services/dashboard-service";

export default async function DashboardPage() {
  const session = await getServerSession();
  const dashboard = session ? await getStudentDashboard(BigInt(session.sub)) : null;
  const profile = dashboard?.profile;

  if (!profile) {
    return (
      <div className="space-y-6">
        <PageHeader
          eyebrow="Student Dashboard"
          title="Dashboard unavailable"
          description="We could not find a student profile for this account."
        />
      </div>
    );
  }

  const displayName = profile.user.displayName || profile.user.fullName.split(" ")[0];

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Student Dashboard"
        title={`Welcome back, ${displayName}`}
        description="Keep your streak going with a quick quiz, a typing challenge, and a daily reward mission."
      />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Coins"
          value={formatNumber(profile.totalCoins)}
          icon={<Star className="h-5 w-5 text-brand-orange" />}
        />
        <StatCard
          label="XP"
          value={formatNumber(profile.totalXp)}
          icon={<Rocket className="h-5 w-5 text-brand-blue" />}
        />
        <StatCard
          label="Current streak"
          value={`${profile.currentStreak} days`}
          icon={<Flame className="h-5 w-5 text-brand-green" />}
        />
        <StatCard
          label="Level"
          value={`${profile.currentLevel}`}
          hint={`Best streak: ${profile.bestStreak} days`}
        />
      </div>
      <div className="grid gap-4 lg:grid-cols-3">
        <ModuleCard title="Quiz Challenge" description="Pick a subject, beat the timer, and earn coins." href="/quiz" />
        <ModuleCard title="Typing Sprint" description="Increase WPM and accuracy with lesson-based practice." href="/typing" />
        <ModuleCard title="Puzzle Zone" description="Game-ready module structure prepared for Phase 2." href="/games" />
      </div>
      <div className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
        <Card className="space-y-4">
          <SectionTitle title="Daily challenge" description="Complete one quiz and one typing lesson to earn a streak bonus." />
          <div className="rounded-3xl bg-brand-blue p-5 text-white">
            <p className="text-sm text-white/80">Mission reward</p>
            <p className="mt-2 text-3xl font-black">+120 Coins</p>
            <p className="mt-2 text-sm text-white/80">Ends tonight at 11:59 PM</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {dashboard.latestBadges.length > 0 ? dashboard.latestBadges.map((studentBadge) => (
              <Badge key={studentBadge.badge.slug} label={studentBadge.badge.title} tone="orange" />
            )) : (
              <Badge label="No badges yet" tone="gray" />
            )}
          </div>
        </Card>
        <LeaderboardList
          title="Leaderboard Preview"
          entries={dashboard.leaderboardPreview.map((entry) => ({
            rank: entry.rank,
            name: entry.name,
            points: `${formatNumber(entry.score)} XP`,
            highlight: entry.highlight
          }))}
        />
      </div>
      <section className="space-y-4">
        <SectionTitle title="Reward shop" description="Redeem your coins for fun and motivating rewards." />
        <div className="grid gap-4 md:grid-cols-3">
          {dashboard.rewards.map((reward) => (
            <RewardCard
              key={reward.slug}
              title={reward.title}
              coins={reward.coinCost}
              stock={reward.stock ?? 999}
              premium={!reward.requiresApproval}
            />
          ))}
          {dashboard.rewards.length === 0 ? (
            <Card className="md:col-span-3">
              <p className="text-sm text-slate-500">Rewards will appear here once published.</p>
            </Card>
          ) : null}
        </div>
      </section>
    </div>
  );
}
