"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { TypingBox } from "@/components/ui/typing-box";
import { StatCard } from "@/components/ui/stat-card";

type TypingLesson = {
  id: string;
  title: string;
  bodyText: string;
  coinReward: number;
  xpReward: number;
  targetWpm: number;
  targetAccuracy: number;
};

type TypingAttemptResult = {
  attempt: {
    wpm: number | null;
    accuracy: number | null;
    timeTakenSeconds: number | null;
    charactersTyped: number;
  };
  badgeSlugs: string[];
};

export function TypingPlayer({ lesson }: { lesson: TypingLesson }) {
  const [typedText, setTypedText] = useState("");
  const [attemptId, setAttemptId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<TypingAttemptResult | null>(null);

  const wordsTyped = useMemo(() => {
    const trimmed = typedText.trim();
    return trimmed ? trimmed.split(/\s+/).length : 0;
  }, [typedText]);

  const charactersTyped = typedText.length;

  const computedAccuracy = useMemo(() => {
    if (charactersTyped === 0) return 0;
    const promptChars = lesson.bodyText.slice(0, charactersTyped);
    let matches = 0;

    for (let index = 0; index < typedText.length; index += 1) {
      if (typedText[index] === promptChars[index]) matches += 1;
    }

    return Math.max(0, Math.min(100, (matches / charactersTyped) * 100));
  }, [charactersTyped, lesson.bodyText, typedText]);

  const estimatedSeconds = Math.max(1, Math.ceil(wordsTyped * 12));
  const computedWpm = Math.max(0, Math.round((wordsTyped / estimatedSeconds) * 60));

  async function ensureAttempt() {
    if (attemptId) return attemptId;

    const response = await fetch("/api/typing/attempts/start", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ lessonId: lesson.id })
    });

    const payload = await response.json();

    if (!response.ok || !payload.success) {
      throw new Error(payload.error?.message ?? "Could not start typing attempt");
    }

    setAttemptId(payload.data.attemptId);
    return payload.data.attemptId as string;
  }

  async function handleSubmit() {
    if (!typedText.trim()) {
      setError("Type the practice text before submitting.");
      return;
    }

    setError("");
    setIsSubmitting(true);

    try {
      const activeAttemptId = await ensureAttempt();
      const response = await fetch(`/api/typing/attempts/${activeAttemptId}/submit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          attemptId: activeAttemptId,
          wpm: computedWpm,
          accuracy: Number(computedAccuracy.toFixed(2)),
          charactersTyped,
          timeTakenSeconds: estimatedSeconds
        })
      });

      const payload = await response.json();

      if (!response.ok || !payload.success) {
        throw new Error(payload.error?.message ?? "Could not submit typing lesson");
      }

      setResult(payload.data as TypingAttemptResult);
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : "Unexpected error");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (result) {
    return (
      <div className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-3">
          <StatCard label="WPM" value={`${Math.round(result.attempt.wpm ?? 0)}`} />
          <StatCard label="Accuracy" value={`${Math.round(result.attempt.accuracy ?? 0)}%`} />
          <StatCard
            label="Time"
            value={`${Math.max(1, result.attempt.timeTakenSeconds ?? estimatedSeconds)} sec`}
          />
        </div>
        <Card className="space-y-4">
          <h3 className="text-xl font-bold text-brand-ink">Lesson complete</h3>
          <p className="text-sm text-slate-500">
            Rewards have been credited. Keep practicing to improve speed and consistency.
          </p>
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="space-y-1 bg-slate-50 shadow-none">
              <p className="text-sm text-slate-500">Coins earned</p>
              <p className="text-3xl font-black text-brand-ink">+{lesson.coinReward}</p>
            </Card>
            <Card className="space-y-1 bg-slate-50 shadow-none">
              <p className="text-sm text-slate-500">XP earned</p>
              <p className="text-3xl font-black text-brand-ink">+{lesson.xpReward}</p>
            </Card>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="WPM" value={`${computedWpm}`} />
        <StatCard label="Accuracy" value={`${Math.round(computedAccuracy)}%`} />
        <StatCard label="Characters" value={`${charactersTyped}`} />
      </div>
      <TypingBox
        prompt={lesson.bodyText}
        typedText={typedText}
        onChange={setTypedText}
      />
      <p className="text-sm text-slate-500">
        Type the lesson text as accurately as you can, then submit to record your score.
      </p>
      <Card className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="text-sm text-slate-500">
          Target: {lesson.targetWpm} WPM and {lesson.targetAccuracy}% accuracy
        </div>
        <Button onClick={handleSubmit} disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit lesson"}
        </Button>
      </Card>
      {error ? <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-600">{error}</p> : null}
    </div>
  );
}
