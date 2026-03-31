import { fail, ok } from "@/server/http";
import { parseBody } from "@/server/validation/common";
import { submitTypingSchema } from "@/server/validation/typing";
import { submitTypingAttempt } from "@/server/services/typing-service";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const payload = await parseBody(request, submitTypingSchema);
    const { id } = await params;
    const result = await submitTypingAttempt(BigInt(id), payload);
    return ok({
      attempt: {
        id: result.attempt.id.toString(),
        wpm: result.attempt.wpm ? Number(result.attempt.wpm) : null,
        accuracy: result.attempt.accuracy ? Number(result.attempt.accuracy) : null,
        timeTakenSeconds: result.attempt.timeTakenSeconds,
        charactersTyped: result.attempt.charactersTyped
      },
      badgeSlugs: result.badgeSlugs
    });
  } catch (error) {
    return fail(error instanceof Error ? error.message : "Failed to submit typing");
  }
}
