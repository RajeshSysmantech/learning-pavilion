import { fail, ok } from "@/server/http";
import { parseBody } from "@/server/validation/common";
import { answerQuizSchema } from "@/server/validation/quiz";
import { answerQuizQuestion } from "@/server/services/quiz-service";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const payload = await parseBody(request, answerQuizSchema);
    const { id } = await params;
    const answer = await answerQuizQuestion(
      BigInt(id),
      payload.questionId,
      payload.selectedOptionId
    );

    return ok({
      answerId: answer.id.toString(),
      isCorrect: answer.isCorrect
    });
  } catch (error) {
    return fail(error instanceof Error ? error.message : "Failed to save answer");
  }
}
