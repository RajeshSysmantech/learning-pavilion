import { prisma } from "@/server/db/prisma";
import { fail, ok } from "@/server/http";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const quizSet = await prisma.quizSet.findUnique({
    where: { id: BigInt(id) },
    include: {
      subject: true,
      category: true,
      difficultyLevel: true,
      questions: {
        include: { options: true },
        orderBy: { sortOrder: "asc" }
      }
    }
  });

  if (!quizSet) return fail("Quiz set not found", 404);
  return ok(quizSet);
}
