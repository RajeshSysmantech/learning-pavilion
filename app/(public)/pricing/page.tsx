import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";

export default function PricingPage() {
  const plans = [
    { name: "Free", price: "INR 0", perks: ["Core quizzes", "Basic typing", "Starter rewards"], badge: "Start free" },
    { name: "Monthly", price: "INR 299", perks: ["Full content access", "Premium rewards", "Advanced progress"], badge: "Most popular" },
    { name: "Yearly", price: "INR 2,999", perks: ["Best value", "Priority support", "Exclusive competitions"], badge: "Save more" }
  ];

  return (
    <div className="mx-auto max-w-6xl space-y-8 px-4 py-10 sm:px-6 lg:px-8">
      <PageHeader
        eyebrow="Pricing"
        title="Flexible plans for every learning journey"
        description="Plans are wired through a payment-provider abstraction so Stripe or Razorpay can be enabled cleanly."
      />
      <div className="grid gap-4 md:grid-cols-3">
        {plans.map((plan) => (
          <Card key={plan.name} className="space-y-4">
            <Badge label={plan.badge} tone={plan.name === "Monthly" ? "orange" : "blue"} />
            <div>
              <h3 className="text-2xl font-bold text-brand-ink">{plan.name}</h3>
              <p className="mt-2 text-4xl font-black text-brand-blue">{plan.price}</p>
            </div>
            <div className="space-y-2 text-sm text-slate-500">
              {plan.perks.map((perk) => (
                <p key={perk}>{perk}</p>
              ))}
            </div>
            <Button className="w-full">{plan.name === "Free" ? "Get started" : "Choose plan"}</Button>
          </Card>
        ))}
      </div>
    </div>
  );
}
