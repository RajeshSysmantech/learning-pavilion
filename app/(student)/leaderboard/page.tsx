import { LeaderboardList } from "@/components/ui/leaderboard-list";
import { PageHeader } from "@/components/ui/page-header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { leaderboardPreview } from "@/lib/demo-content";

export default function LeaderboardPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Leaderboard"
        title="See where you stand"
        description="Leaderboard windows support daily, weekly, monthly, and all-time rankings across modules."
      />
      <Tabs defaultValue="daily">
        <TabsList>
          <TabsTrigger value="daily">Daily</TabsTrigger>
          <TabsTrigger value="weekly">Weekly</TabsTrigger>
          <TabsTrigger value="monthly">Monthly</TabsTrigger>
          <TabsTrigger value="all">All-time</TabsTrigger>
        </TabsList>
        <TabsContent value="daily">
          <LeaderboardList title="Daily Quiz Leaders" entries={leaderboardPreview} />
        </TabsContent>
        <TabsContent value="weekly">
          <LeaderboardList title="Weekly Typing Leaders" entries={leaderboardPreview} />
        </TabsContent>
        <TabsContent value="monthly">
          <LeaderboardList title="Monthly Overall Leaders" entries={leaderboardPreview} />
        </TabsContent>
        <TabsContent value="all">
          <LeaderboardList title="All-Time Champions" entries={leaderboardPreview} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
