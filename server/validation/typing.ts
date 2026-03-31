import { z } from "zod";

export const startTypingAttemptSchema = z.object({
  lessonId: z.coerce.bigint()
});

export const submitTypingSchema = z.object({
  attemptId: z.coerce.bigint(),
  wpm: z.number().min(0),
  accuracy: z.number().min(0).max(100),
  charactersTyped: z.number().min(0),
  timeTakenSeconds: z.number().min(1)
});
