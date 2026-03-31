import { z } from "zod";

export const startQuizAttemptSchema = z.object({
  quizSetId: z.coerce.bigint()
});

export const answerQuizSchema = z.object({
  questionId: z.coerce.bigint(),
  selectedOptionId: z.coerce.bigint()
});

export const submitQuizSchema = z.object({
  attemptId: z.coerce.bigint()
});
