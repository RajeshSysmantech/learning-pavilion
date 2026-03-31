import { prisma } from "@/server/db/prisma";
import { ok } from "@/server/http";

export async function GET() {
  const data = await prisma.quizSet.findMany({
    where: { isPublished: true, deletedAt: null },
    include: { subject: true, difficultyLevel: true, category: true },
    orderBy: { createdAt: "desc" }
  });

  return ok(data);
}
