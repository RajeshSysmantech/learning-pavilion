export function canRedeemReward(input: {
  coins: number;
  coinCost: number;
  stock?: number | null;
}) {
  if (typeof input.stock === "number" && input.stock <= 0) return false;
  return input.coins >= input.coinCost;
}
