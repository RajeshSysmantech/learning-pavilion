import { PageHeader } from "@/components/ui/page-header";
import { RewardCard } from "@/components/ui/reward-card";
import { rewardsPreview } from "@/lib/demo-content";

export default function RewardsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Rewards"
        title="Redeem the coins you earn"
        description="Reward redemption validates stock, checks balance, debits the ledger, and supports admin approval flows."
      />
      <div className="grid gap-4 md:grid-cols-3">
        {rewardsPreview.map((reward) => (
          <RewardCard key={reward.title} {...reward} />
        ))}
      </div>
    </div>
  );
}
