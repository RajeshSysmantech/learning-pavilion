import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";
import { prisma } from "@/server/db/prisma";

export default async function QuizPage() {
  const quizSets = await prisma.quizSet.findMany({
    where: { isPublished: true, deletedAt: null },
    include: {
      subject: true,
      difficultyLevel: true,
      questions: true
    },
    orderBy: { createdAt: "desc" }
  });
  const playableQuizSets = quizSets.filter((quiz) => quiz.questions.length > 0);
  const upcomingQuizSets = quizSets.filter((quiz) => quiz.questions.length === 0);

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Quiz Module"
        title="Pick your next challenge"
        description="Browse quiz sets by subject, category, and difficulty to keep progress moving."
      />
      <div className="grid gap-4 md:grid-cols-3">
        {playableQuizSets.map((quiz) => (
          <Card key={quiz.id.toString()} className="space-y-4">
            <div className="flex items-center justify-between">
              <Badge label={quiz.subject.name} tone="blue" />
              <Badge label={quiz.difficultyLevel.name} tone="orange" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-brand-ink">{quiz.title}</h3>
              <p className="mt-2 text-sm text-slate-500">
                {quiz.questions.length} questions with timer and explanations.
              </p>
            </div>
            <Link href={`/quiz/${quiz.slug}`}>
              <Button className="w-full">Start attempt</Button>
            </Link>
          </Card>
        ))}
        {playableQuizSets.length === 0 ? (
          <Card className="md:col-span-3">
            <p className="text-sm text-slate-500">No playable quiz sets are published yet.</p>
          </Card>
        ) : null}
      </div>
      {upcomingQuizSets.length > 0 ? (
        <div className="space-y-4">
          <PageHeader
            eyebrow="Coming Soon"
            title="More quiz sets are on the way"
            description="These sets are published in the catalog but still being prepared with full questions and explanations."
          />
          <div className="grid gap-4 md:grid-cols-3">
            {upcomingQuizSets.map((quiz) => (
              <Card key={quiz.id.toString()} className="space-y-4 border-dashed">
                <div className="flex items-center justify-between">
                  <Badge label={quiz.subject.name} tone="blue" />
                  <Badge label="Coming soon" tone="gray" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-brand-ink">{quiz.title}</h3>
                  <p className="mt-2 text-sm text-slate-500">
                    Questions are being added before this quiz becomes playable.
                  </p>
                </div>
                <Button className="w-full" variant="ghost" disabled>
                  Not ready yet
                </Button>
              </Card>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
