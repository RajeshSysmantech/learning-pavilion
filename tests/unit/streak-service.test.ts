import { describe, expect, it } from "vitest";
import { computeNextStreak } from "@/server/services/streak-service";

describe("streak progression", () => {
  it("starts first streak at one", () => {
    expect(computeNextStreak({ currentStreak: 0, bestStreak: 0 }, new Date("2026-03-31"))).toEqual({
      currentStreak: 1,
      bestStreak: 1
    });
  });

  it("continues a consecutive streak", () => {
    expect(
      computeNextStreak(
        {
          currentStreak: 4,
          bestStreak: 4,
          lastActivityDate: new Date("2026-03-30")
        },
        new Date("2026-03-31")
      )
    ).toEqual({
      currentStreak: 5,
      bestStreak: 5
    });
  });

  it("resets after a gap", () => {
    expect(
      computeNextStreak(
        {
          currentStreak: 4,
          bestStreak: 8,
          lastActivityDate: new Date("2026-03-28")
        },
        new Date("2026-03-31")
      )
    ).toEqual({
      currentStreak: 1,
      bestStreak: 8
    });
  });
});
