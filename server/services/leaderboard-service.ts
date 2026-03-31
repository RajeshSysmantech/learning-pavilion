import { endOfDay, endOfMonth, endOfWeek, startOfDay, startOfMonth, startOfWeek } from "date-fns";
import { LeaderboardModule, LeaderboardWindow } from "@prisma/client";

export function getLeaderboardPeriod(window: LeaderboardWindow, now = new Date()) {
  switch (window) {
    case "DAILY":
      return { start: startOfDay(now), end: endOfDay(now) };
    case "WEEKLY":
      return { start: startOfWeek(now), end: endOfWeek(now) };
    case "MONTHLY":
      return { start: startOfMonth(now), end: endOfMonth(now) };
    case "ALL_TIME":
      return { start: new Date("2000-01-01T00:00:00.000Z"), end: now };
  }
}

export function getLeaderboardCacheKey(module: LeaderboardModule, window: LeaderboardWindow, now = new Date()) {
  const { start } = getLeaderboardPeriod(window, now);
  return `leaderboard:${module}:${window}:${start.toISOString()}`;
}

export function rankLeaderboardEntries<T extends { score: number }>(entries: T[]) {
  return [...entries]
    .sort((a, b) => b.score - a.score)
    .map((entry, index) => ({ ...entry, rank: index + 1 }));
}
