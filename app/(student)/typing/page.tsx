import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";
import { Badge } from "@/components/ui/badge";
import { prisma } from "@/server/db/prisma";

export default async function TypingPage() {
  const lessons = await prisma.typingLesson.findMany({
    where: { isPublished: true },
    include: { difficultyLevel: true },
    orderBy: { createdAt: "desc" }
  });

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Typing Tutor"
        title="Build speed with confidence"
        description="Lesson-based typing practice with live WPM, accuracy tracking, and reward progression."
      />
      <div className="grid gap-4 md:grid-cols-3">
        {lessons.map((lesson) => (
          <Card key={lesson.id.toString()} className="space-y-4">
            <div>
              {lesson.difficultyLevel ? (
                <Badge label={lesson.difficultyLevel.name} tone="orange" />
              ) : null}
              <h3 className="text-xl font-bold text-brand-ink">{lesson.title}</h3>
              <p className="mt-2 text-sm text-slate-500">
                Target {lesson.targetWpm} WPM and {lesson.targetAccuracy}% accuracy.
              </p>
            </div>
            <Link href={`/typing/${lesson.slug}`}>
              <Button className="w-full">Begin lesson</Button>
            </Link>
          </Card>
        ))}
        {lessons.length === 0 ? (
          <Card className="md:col-span-3">
            <p className="text-sm text-slate-500">No typing lessons are published yet.</p>
          </Card>
        ) : null}
      </div>
    </div>
  );
}
