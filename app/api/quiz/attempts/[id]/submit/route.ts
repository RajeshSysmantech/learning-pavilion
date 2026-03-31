import { fail, ok } from "@/server/http";
import { submitQuizAttempt } from "@/server/services/quiz-service";

export async function POST(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const result = await submitQuizAttempt(BigInt(id));
    return ok({
      attempt: {
        id: result.attempt.id.toString(),
        score: result.attempt.score ? Number(result.attempt.score) : null,
        accuracy: result.attempt.accuracy ? Number(result.attempt.accuracy) : null,
        correctAnswers: result.attempt.correctAnswers,
        totalQuestions: result.attempt.totalQuestions
      },
      badgeSlugs: result.badgeSlugs
    });
  } catch (error) {
    return fail(error instanceof Error ? error.message : "Failed to submit quiz");
  }
}
