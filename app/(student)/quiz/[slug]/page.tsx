import { notFound } from "next/navigation";
import { QuizPlayer } from "@/features/quiz/quiz-player";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { getQuizSetBySlug } from "@/server/services/quiz-service";

export default async function QuizDetailPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const quizSet = await getQuizSetBySlug(slug);

  if (!quizSet || !quizSet.isPublished || quizSet.deletedAt) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <Card className="space-y-2">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-orange">Quiz attempt</p>
        <div className="flex flex-wrap items-center gap-2">
          <Badge label={quizSet.subject.name} tone="blue" />
          <Badge label={quizSet.difficultyLevel.name} tone="orange" />
          {quizSet.category ? <Badge label={quizSet.category.name} tone="green" /> : null}
        </div>
        <h1 className="text-3xl font-black text-brand-ink">{quizSet.title}</h1>
        <p className="text-sm text-slate-500">
          {quizSet.description ||
            "Timed quiz flow with answer locking, explanations, scoring, and leaderboard updates."}
        </p>
        <p className="text-sm text-slate-500">
          {quizSet.questions.length} questions • +{quizSet.coinReward} coins • +{quizSet.xpReward} XP
          {quizSet.timeLimitSeconds ? ` • ${Math.ceil(quizSet.timeLimitSeconds / 60)} min` : ""}
        </p>
      </Card>
      <QuizPlayer
        quizSet={{
          id: quizSet.id.toString(),
          title: quizSet.title,
          description: quizSet.description,
          coinReward: quizSet.coinReward,
          xpReward: quizSet.xpReward,
          timeLimitSeconds: quizSet.timeLimitSeconds,
          questions: quizSet.questions.map((question) => ({
            id: question.id.toString(),
            prompt: question.prompt,
            explanation: question.explanation,
            options: question.options.map((option) => ({
              id: option.id.toString(),
              text: option.text
            }))
          }))
        }}
      />
    </div>
  );
}
