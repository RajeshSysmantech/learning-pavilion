import { AttemptStatus, WalletDirection, WalletEntryType, WalletReason } from "@prisma/client";
import { prisma } from "@/server/db/prisma";
import { createLedgerEntry } from "@/server/services/wallet-service";
import { evaluateBadgeRules } from "@/server/services/badge-service";
import { recordMeaningfulActivity } from "@/server/services/activity-service";
import { scoreQuizAttempt } from "@/server/services/quiz-rules";

export async function startQuizAttempt(studentUserId: bigint, quizSetId: bigint) {
  const quizSet = await prisma.quizSet.findUnique({
    where: { id: quizSetId },
    include: { questions: true }
  });

  if (!quizSet || !quizSet.isPublished) {
    throw new Error("Quiz set not found");
  }

  return prisma.quizAttempt.create({
    data: {
      studentUserId,
      quizSetId,
      totalQuestions: quizSet.questions.length
    }
  });
}

export async function getQuizSetBySlug(slug: string) {
  return prisma.quizSet.findUnique({
    where: { slug },
    include: {
      subject: true,
      category: true,
      difficultyLevel: true,
      questions: {
        include: { options: { orderBy: { sortOrder: "asc" } } },
        orderBy: { sortOrder: "asc" }
      }
    }
  });
}

export async function answerQuizQuestion(
  attemptId: bigint,
  questionId: bigint,
  selectedOptionId: bigint
) {
  const option = await prisma.quizQuestionOption.findUnique({
    where: { id: selectedOptionId }
  });

  if (!option) throw new Error("Selected option not found");

  return prisma.quizAttemptAnswer.upsert({
    where: {
      attemptId_questionId: {
        attemptId,
        questionId
      }
    },
    update: {
      selectedOptionId,
      isCorrect: option.isCorrect,
      answeredAt: new Date()
    },
    create: {
      attemptId,
      questionId,
      selectedOptionId,
      isCorrect: option.isCorrect
    }
  });
}

export async function submitQuizAttempt(attemptId: bigint) {
  const attempt = await prisma.quizAttempt.findUnique({
    where: { id: attemptId },
    include: {
      answers: true,
      quizSet: true,
      student: { include: { studentProfile: true } }
    }
  });

  if (!attempt) throw new Error("Quiz attempt not found");

  const correctAnswers = attempt.answers.filter((answer) => answer.isCorrect).length;
  const { accuracy, score } = scoreQuizAttempt(attempt.totalQuestions, correctAnswers);

  const updatedAttempt = await prisma.quizAttempt.update({
    where: { id: attemptId },
    data: {
      status: AttemptStatus.SUBMITTED,
      submittedAt: new Date(),
      correctAnswers,
      accuracy,
      score
    }
  });

  await createLedgerEntry({
    userId: attempt.studentUserId,
    entryType: WalletEntryType.COIN,
    direction: WalletDirection.CREDIT,
    reason: WalletReason.QUIZ_REWARD,
    amount: attempt.quizSet.coinReward,
    relatedType: "quiz_attempt",
    relatedId: attempt.id
  });

  await createLedgerEntry({
    userId: attempt.studentUserId,
    entryType: WalletEntryType.XP,
    direction: WalletDirection.CREDIT,
    reason: WalletReason.QUIZ_REWARD,
    amount: attempt.quizSet.xpReward,
    relatedType: "quiz_attempt",
    relatedId: attempt.id
  });

  const quizCount = await prisma.quizAttempt.count({
    where: {
      studentUserId: attempt.studentUserId,
      status: AttemptStatus.SUBMITTED
    }
  });

  const badgeSlugs = evaluateBadgeRules({
    quizCount
  });

  await recordMeaningfulActivity(attempt.studentUserId, "QUIZ");

  return { attempt: updatedAttempt, badgeSlugs };
}
