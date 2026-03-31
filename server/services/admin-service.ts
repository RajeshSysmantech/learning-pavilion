import { startOfDay } from "date-fns";
import { prisma } from "@/server/db/prisma";

export async function getAdminStats() {
  const today = startOfDay(new Date());

  const [
    totalUsers,
    totalStudents,
    totalParents,
    activeUsersToday,
    totalQuizAttemptsToday,
    totalTypingAttemptsToday,
    pendingRedemptions
  ] = await Promise.all([
    prisma.user.count(),
    prisma.user.count({ where: { role: "STUDENT" } }),
    prisma.user.count({ where: { role: "PARENT" } }),
    prisma.user.count({ where: { lastLoginAt: { gte: today } } }),
    prisma.quizAttempt.count({ where: { startedAt: { gte: today } } }),
    prisma.typingAttempt.count({ where: { startedAt: { gte: today } } }),
    prisma.rewardRedemption.count({ where: { status: "PENDING" } })
  ]);

  return {
    totalUsers,
    totalStudents,
    totalParents,
    activeUsersToday,
    totalQuizAttemptsToday,
    totalTypingAttemptsToday,
    pendingRedemptions
  };
}
