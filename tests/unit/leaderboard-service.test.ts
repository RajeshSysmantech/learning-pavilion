import { describe, expect, it } from "vitest";
import { getLeaderboardCacheKey, rankLeaderboardEntries } from "@/server/services/leaderboard-service";

describe("leaderboard helpers", () => {
  it("ranks entries by score descending", () => {
    expect(
      rankLeaderboardEntries([
        { name: "B", score: 30 },
        { name: "A", score: 80 },
        { name: "C", score: 50 }
      ])
    ).toEqual([
      { name: "A", score: 80, rank: 1 },
      { name: "C", score: 50, rank: 2 },
      { name: "B", score: 30, rank: 3 }
    ]);
  });

  it("builds stable cache keys", () => {
    expect(getLeaderboardCacheKey("QUIZ", "DAILY", new Date("2026-03-31T12:00:00.000Z"))).toContain("leaderboard:QUIZ:DAILY");
  });
});
