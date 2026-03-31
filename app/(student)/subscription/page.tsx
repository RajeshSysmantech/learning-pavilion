import { Card } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";

export default function SubscriptionPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Subscription"
        title="Manage your plan"
        description="Plans, coupons, billing, and provider-specific checkout are abstracted for Razorpay or Stripe."
      />
      <Card className="space-y-2">
        <p className="text-sm text-slate-500">Current plan</p>
        <p className="text-2xl font-bold text-brand-ink">Free Plan</p>
        <p className="text-sm text-slate-500">Upgrade to unlock premium content, rewards, and advanced reports.</p>
      </Card>
    </div>
  );
}
