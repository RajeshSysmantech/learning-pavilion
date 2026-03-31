import { describe, expect, it } from "vitest";
import { canRedeemReward } from "@/server/services/reward-rules";

describe("reward redemption checks", () => {
  it("blocks when balance is too low", () => {
    expect(canRedeemReward({ coins: 100, coinCost: 200, stock: 5 })).toBe(false);
  });

  it("blocks when stock is gone", () => {
    expect(canRedeemReward({ coins: 500, coinCost: 200, stock: 0 })).toBe(false);
  });

  it("allows a valid redemption", () => {
    expect(canRedeemReward({ coins: 500, coinCost: 200, stock: 2 })).toBe(true);
  });
});
