import { getServerSession } from "@/server/auth/session";
import { fail, ok } from "@/server/http";
import { parseBody } from "@/server/validation/common";
import { startTypingAttemptSchema } from "@/server/validation/typing";
import { startTypingAttempt } from "@/server/services/typing-service";

export async function POST(request: Request) {
  const session = await getServerSession();
  if (!session) return fail("Unauthorized", 401);

  try {
    const data = await parseBody(request, startTypingAttemptSchema);
    const attempt = await startTypingAttempt(BigInt(session.sub), data.lessonId);
    return ok({
      attemptId: attempt.id.toString(),
      status: attempt.status
    });
  } catch (error) {
    return fail(error instanceof Error ? error.message : "Failed to start typing");
  }
}
