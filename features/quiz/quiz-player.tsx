"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { QuestionCard } from "@/components/ui/question-card";
import { Badge } from "@/components/ui/badge";

type QuizOption = {
  id: string;
  text: string;
};

type QuizQuestion = {
  id: string;
  prompt: string;
  explanation: string | null;
  options: QuizOption[];
};

type QuizSet = {
  id: string;
  title: string;
  description: string | null;
  coinReward: number;
  xpReward: number;
  timeLimitSeconds: number | null;
  questions: QuizQuestion[];
};

type QuizPlayerProps = {
  quizSet: QuizSet;
};

type SubmitResult = {
  attempt: {
    score: number | null;
    accuracy: number | null;
    correctAnswers: number;
    totalQuestions: number;
  };
  badgeSlugs: string[];
};

export function QuizPlayer({ quizSet }: QuizPlayerProps) {
  const [attemptId, setAttemptId] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<SubmitResult | null>(null);

  const currentQuestion = quizSet.questions[currentIndex];
  const isLastQuestion = currentIndex === quizSet.questions.length - 1;
  const answeredCount = Object.keys(answers).length;

  const resultBadges = useMemo(
    () => result?.badgeSlugs.map((slug) => slug.replaceAll("-", " ")) ?? [],
    [result]
  );

  async function ensureAttempt() {
    if (attemptId) return attemptId;

    const response = await fetch("/api/quiz/attempts/start", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ quizSetId: quizSet.id })
    });

    const payload = await response.json();

    if (!response.ok || !payload.success) {
      throw new Error(payload.error?.message ?? "Could not start quiz attempt");
    }

    setAttemptId(payload.data.attemptId);
    return payload.data.attemptId as string;
  }

  async function handleAnswerSubmit() {
    if (!selectedOptionId) {
      setError("Choose an answer before continuing.");
      return;
    }

    setError("");
    setIsSubmitting(true);

    try {
      const activeAttemptId = await ensureAttempt();
      const response = await fetch(`/api/quiz/attempts/${activeAttemptId}/answer`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          questionId: currentQuestion.id,
          selectedOptionId
        })
      });

      const payload = await response.json();

      if (!response.ok || !payload.success) {
        throw new Error(payload.error?.message ?? "Could not save your answer");
      }

      setAnswers((current) => ({
        ...current,
        [currentQuestion.id]: selectedOptionId
      }));

      if (isLastQuestion) {
        const submitResponse = await fetch(`/api/quiz/attempts/${activeAttemptId}/submit`, {
          method: "POST"
        });
        const submitPayload = await submitResponse.json();

        if (!submitResponse.ok || !submitPayload.success) {
          throw new Error(submitPayload.error?.message ?? "Could not submit quiz");
        }

        setResult(submitPayload.data as SubmitResult);
      } else {
        const nextIndex = currentIndex + 1;
        setCurrentIndex(nextIndex);
        const nextQuestion = quizSet.questions[nextIndex];
        setSelectedOptionId(answers[nextQuestion?.id] ?? null);
      }
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : "Unexpected error");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (result) {
    return (
      <div className="space-y-6">
        <Card className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-orange">
            Results
          </p>
          <h2 className="text-3xl font-black text-brand-ink">Quiz completed</h2>
          <p className="text-sm text-slate-500">
            Nice work. Your rewards and streak progress have been recorded.
          </p>
        </Card>
        <div className="grid gap-4 md:grid-cols-4">
          <Card className="space-y-1">
            <p className="text-sm text-slate-500">Score</p>
            <p className="text-3xl font-black text-brand-ink">{result.attempt.score ?? 0}</p>
          </Card>
          <Card className="space-y-1">
            <p className="text-sm text-slate-500">Accuracy</p>
            <p className="text-3xl font-black text-brand-ink">
              {Math.round(result.attempt.accuracy ?? 0)}%
            </p>
          </Card>
          <Card className="space-y-1">
            <p className="text-sm text-slate-500">Coins earned</p>
            <p className="text-3xl font-black text-brand-ink">+{quizSet.coinReward}</p>
          </Card>
          <Card className="space-y-1">
            <p className="text-sm text-slate-500">XP earned</p>
            <p className="text-3xl font-black text-brand-ink">+{quizSet.xpReward}</p>
          </Card>
        </div>
        <Card className="space-y-4">
          <h3 className="text-xl font-bold text-brand-ink">Explanation review</h3>
          <div className="space-y-3">
            {quizSet.questions.map((question) => (
              <div key={question.id} className="rounded-2xl bg-slate-50 p-4">
                <p className="font-semibold text-brand-ink">{question.prompt}</p>
                <p className="mt-2 text-sm text-slate-500">
                  {question.explanation || "Explanation will be available soon."}
                </p>
              </div>
            ))}
          </div>
          {resultBadges.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {resultBadges.map((badge) => (
                <Badge key={badge} label={badge} tone="green" />
              ))}
            </div>
          ) : null}
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <QuestionCard
        current={currentIndex + 1}
        total={quizSet.questions.length}
        question={currentQuestion.prompt}
        options={currentQuestion.options.map((option) => ({
          id: option.id,
          label: option.text
        }))}
        selectedOptionId={selectedOptionId}
        onSelect={setSelectedOptionId}
      />
      <Card className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="text-sm text-slate-500">
          Answered {answeredCount} of {quizSet.questions.length} questions
        </div>
        <div className="flex gap-3">
          <Button
            variant="ghost"
            onClick={() => {
              if (currentIndex === 0) return;
              const previousIndex = currentIndex - 1;
              const previousQuestion = quizSet.questions[previousIndex];
              setCurrentIndex(previousIndex);
              setSelectedOptionId(answers[previousQuestion.id] ?? null);
              setError("");
            }}
            disabled={currentIndex === 0 || isSubmitting}
          >
            Previous
          </Button>
          <Button onClick={handleAnswerSubmit} disabled={isSubmitting}>
            {isSubmitting
              ? "Saving..."
              : isLastQuestion
                ? "Submit quiz"
                : "Save and continue"}
          </Button>
        </div>
      </Card>
      {error ? <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-600">{error}</p> : null}
    </div>
  );
}
