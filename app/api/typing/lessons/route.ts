import { prisma } from "@/server/db/prisma";
import { ok } from "@/server/http";

export async function GET() {
  const lessons = await prisma.typingLesson.findMany({
    where: { isPublished: true },
    include: { difficultyLevel: true },
    orderBy: { createdAt: "desc" }
  });

  return ok(
    lessons.map((lesson) => ({
      id: lesson.id.toString(),
      slug: lesson.slug,
      title: lesson.title,
      targetWpm: lesson.targetWpm,
      targetAccuracy: lesson.targetAccuracy,
      difficultyLevel: lesson.difficultyLevel?.name ?? null
    }))
  );
}
