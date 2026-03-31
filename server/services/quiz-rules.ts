export function scoreQuizAttempt(totalQuestions: number, correctAnswers: number) {
  const accuracy = totalQuestions === 0 ? 0 : (correctAnswers / totalQuestions) * 100;
  const score = correctAnswers * 10;

  return { score, accuracy };
}
