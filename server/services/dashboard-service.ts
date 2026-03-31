import { prisma } from "@/server/db/prisma";

export async function getStudentDashboard(studentUserId: bigint) {
  const [profile, latestBadges, rewards, notifications, leaderboardProfiles] = await Promise.all([
    prisma.studentProfile.findUnique({
      where: { userId: studentUserId },
      include: { user: true }
    }),
    prisma.studentBadge.findMany({
      where: { studentProfile: { userId: studentUserId } },
      include: { badge: true },
      take: 4,
      orderBy: { awardedAt: "desc" }
    }),
    prisma.reward.findMany({
      where: { isPublished: true },
      take: 3,
      orderBy: { createdAt: "desc" }
    }),
    prisma.notification.findMany({
      where: { userId: studentUserId },
      take: 5,
      orderBy: { createdAt: "desc" }
    }),
    prisma.studentProfile.findMany({
      include: { user: true },
      orderBy: [{ totalXp: "desc" }, { totalCoins: "desc" }],
      take: 4
    })
  ]);

  const leaderboardPreview = leaderboardProfiles.map((studentProfile, index) => ({
    rank: index + 1,
    name: studentProfile.user.displayName || studentProfile.user.fullName.split(" ")[0],
    score: studentProfile.totalXp,
    highlight: studentProfile.userId === studentUserId
  }));

  if (profile && !leaderboardPreview.some((entry) => entry.highlight)) {
    const totalHigherProfiles = await prisma.studentProfile.count({
      where: {
        OR: [
          { totalXp: { gt: profile.totalXp } },
          {
            totalXp: profile.totalXp,
            totalCoins: { gt: profile.totalCoins }
          }
        ]
      }
    });

    leaderboardPreview.push({
      rank: totalHigherProfiles + 1,
      name: profile.user.displayName || profile.user.fullName.split(" ")[0],
      score: profile.totalXp,
      highlight: true
    });
  }

  return {
    profile,
    latestBadges,
    rewards,
    notifications,
    leaderboardPreview
  };
}
