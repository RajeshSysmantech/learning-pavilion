import { describe, expect, it } from "vitest";
import { evaluateBadgeRules } from "@/server/services/badge-service";

describe("badge rules", () => {
  it("unlocks multiple matching badges", () => {
    expect(
      evaluateBadgeRules({
        quizCount: 10,
        streakDays: 5,
        typingAccuracy: 96,
        rewardRedemptionCount: 1
      })
    ).toEqual([
      "first-quiz-champion",
      "10-quizzes-completed",
      "5-day-streak",
      "typing-accuracy-ace",
      "first-reward-redeemed"
    ]);
  });
});
