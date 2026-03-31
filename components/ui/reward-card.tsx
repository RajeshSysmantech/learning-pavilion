import { Gift, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function RewardCard({
  title,
  coins,
  stock,
  premium = false
}: {
  title: string;
  coins: number;
  stock: number;
  premium?: boolean;
}) {
  return (
    <Card className="space-y-4">
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Gift className="h-5 w-5 text-brand-orange" />
            <h3 className="text-lg font-bold text-brand-ink">{title}</h3>
          </div>
          <p className="text-sm text-slate-500">{coins} coins required</p>
        </div>
        {premium ? <Badge label="Premium" tone="blue" /> : <Sparkles className="h-5 w-5 text-brand-green" />}
      </div>
      <div className="flex items-center justify-between text-sm">
        <span className="text-slate-500">Stock left: {stock}</span>
        <Button variant="secondary">Redeem</Button>
      </div>
    </Card>
  );
}
