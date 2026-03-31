import { WalletDirection, WalletEntryType, WalletReason } from "@prisma/client";
import { prisma } from "@/server/db/prisma";
import { computeNextStreak } from "@/server/services/streak-service";
import { createLedgerEntryTx } from "@/server/services/wallet-service";

export async function recordMeaningfulActivity(userId: bigint, sourceModule: "QUIZ" | "TYPING" | "GAME") {
  const profile = await prisma.studentProfile.findUnique({
    where: { userId }
  });

  if (!profile) throw new Error("Student profile not found");

  const today = new Date();
  const activityDate = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate()));

  return prisma.$transaction(async (tx) => {
    const existingLog = await tx.streakLog.findUnique({
      where: {
        studentProfileId_activityDate: {
          studentProfileId: profile.id,
          activityDate
        }
      }
    });

    if (existingLog) {
      return existingLog;
    }

    const latestLog = await tx.streakLog.findFirst({
      where: { studentProfileId: profile.id },
      orderBy: { activityDate: "desc" }
    });

    const next = computeNextStreak(
      {
        currentStreak: profile.currentStreak,
        bestStreak: profile.bestStreak,
        lastActivityDate: latestLog?.activityDate
      },
      activityDate
    );

    const log = await tx.streakLog.create({
      data: {
        studentProfileId: profile.id,
        activityDate,
        sourceModules: [sourceModule]
      }
    });

    await tx.studentProfile.update({
      where: { id: profile.id },
      data: {
        currentStreak: next.currentStreak,
        bestStreak: next.bestStreak
      }
    });

    await createLedgerEntryTx(tx, {
      userId,
      entryType: WalletEntryType.COIN,
      direction: WalletDirection.CREDIT,
      reason: WalletReason.STREAK_BONUS,
      amount: 25,
      relatedType: "streak_log",
      relatedId: log.id,
      metadata: { sourceModule }
    });

    return log;
  });
}
