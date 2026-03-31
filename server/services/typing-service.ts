import { AttemptStatus, WalletDirection, WalletEntryType, WalletReason } from "@prisma/client";
import { prisma } from "@/server/db/prisma";
import { evaluateBadgeRules } from "@/server/services/badge-service";
import { recordMeaningfulActivity } from "@/server/services/activity-service";
import { createLedgerEntry } from "@/server/services/wallet-service";

export async function startTypingAttempt(studentUserId: bigint, lessonId: bigint) {
  return prisma.typingAttempt.create({
    data: {
      studentUserId,
      lessonId
    }
  });
}

export async function getTypingLessonBySlug(slug: string) {
  return prisma.typingLesson.findUnique({
    where: { slug },
    include: {
      difficultyLevel: true
    }
  });
}

export async function submitTypingAttempt(
  attemptId: bigint,
  metrics: { wpm: number; accuracy: number; charactersTyped: number; timeTakenSeconds: number }
) {
  const attempt = await prisma.typingAttempt.findUnique({
    where: { id: attemptId },
    include: { lesson: true }
  });

  if (!attempt) throw new Error("Typing attempt not found");

  const updatedAttempt = await prisma.typingAttempt.update({
    where: { id: attemptId },
    data: {
      status: AttemptStatus.SUBMITTED,
      submittedAt: new Date(),
      ...metrics
    }
  });

  await createLedgerEntry({
    userId: attempt.studentUserId,
    entryType: WalletEntryType.COIN,
    direction: WalletDirection.CREDIT,
    reason: WalletReason.TYPING_REWARD,
    amount: attempt.lesson.coinReward,
    relatedType: "typing_attempt",
    relatedId: attempt.id
  });

  await createLedgerEntry({
    userId: attempt.studentUserId,
    entryType: WalletEntryType.XP,
    direction: WalletDirection.CREDIT,
    reason: WalletReason.TYPING_REWARD,
    amount: attempt.lesson.xpReward,
    relatedType: "typing_attempt",
    relatedId: attempt.id
  });

  await recordMeaningfulActivity(attempt.studentUserId, "TYPING");

  return {
    attempt: updatedAttempt,
    badgeSlugs: evaluateBadgeRules({ typingAccuracy: metrics.accuracy })
  };
}
