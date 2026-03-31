import { LeaderboardModule, LeaderboardWindow } from "@prisma/client";
import { prisma } from "@/server/db/prisma";
import { ok } from "@/server/http";
import { getLeaderboardPeriod } from "@/server/services/leaderboard-service";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const leaderboardModule =
    (searchParams.get("module") as LeaderboardModule | null) ?? LeaderboardModule.OVERALL;
  const window =
    (searchParams.get("window") as LeaderboardWindow | null) ?? LeaderboardWindow.DAILY;
  const { start } = getLeaderboardPeriod(window);

  const leaderboard = await prisma.leaderboard.findFirst({
    where: { module: leaderboardModule, window, periodStart: start },
    include: {
      entries: {
        include: {
          studentProfile: {
            include: { user: true }
          }
        },
        orderBy: { rank: "asc" },
        take: 100
      }
    }
  });

  return ok(leaderboard);
}
