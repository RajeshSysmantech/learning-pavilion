import { Coins } from "lucide-react";
import { cn, formatNumber } from "@/lib/utils";

export function CoinPill({
  value,
  tone = "orange"
}: {
  value: number;
  tone?: "orange" | "blue" | "green";
}) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold",
        tone === "orange" && "bg-brand-orange/10 text-brand-orange",
        tone === "blue" && "bg-brand-blue/10 text-brand-blue",
        tone === "green" && "bg-brand-green/10 text-brand-green"
      )}
    >
      <Coins className="h-4 w-4" />
      {formatNumber(value)}
    </div>
  );
}
