import { getServerSession } from "@/server/auth/session";
import { fail, ok } from "@/server/http";
import { parseBody } from "@/server/validation/common";
import { startQuizAttemptSchema } from "@/server/validation/quiz";
import { startQuizAttempt } from "@/server/services/quiz-service";

export async function POST(request: Request) {
  const session = await getServerSession();
  if (!session) return fail("Unauthorized", 401);

  try {
    const data = await parseBody(request, startQuizAttemptSchema);
    const attempt = await startQuizAttempt(BigInt(session.sub), data.quizSetId);
    return ok({
      attemptId: attempt.id.toString(),
      status: attempt.status,
      totalQuestions: attempt.totalQuestions
    });
  } catch (error) {
    return fail(error instanceof Error ? error.message : "Failed to start attempt");
  }
}
