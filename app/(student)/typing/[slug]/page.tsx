import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { CoinPill } from "@/components/ui/coin-pill";
import { TypingPlayer } from "@/features/typing/typing-player";
import { getTypingLessonBySlug } from "@/server/services/typing-service";

export default async function TypingLessonPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const lesson = await getTypingLessonBySlug(slug);

  if (!lesson || !lesson.isPublished) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 rounded-3xl bg-white p-5 shadow-soft md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-orange">Typing session</p>
          <div className="mb-2 flex flex-wrap items-center gap-2">
            {lesson.difficultyLevel ? <Badge label={lesson.difficultyLevel.name} tone="orange" /> : null}
            <Badge label={`${lesson.targetWpm} WPM target`} tone="blue" />
          </div>
          <h1 className="text-3xl font-black text-brand-ink">{lesson.title}</h1>
        </div>
        <CoinPill value={lesson.coinReward} />
      </div>
      <TypingPlayer
        lesson={{
          id: lesson.id.toString(),
          title: lesson.title,
          bodyText: lesson.bodyText,
          coinReward: lesson.coinReward,
          xpReward: lesson.xpReward,
          targetWpm: lesson.targetWpm,
          targetAccuracy: lesson.targetAccuracy
        }}
      />
    </div>
  );
}
