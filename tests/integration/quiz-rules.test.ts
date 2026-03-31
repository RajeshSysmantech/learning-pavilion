import { describe, expect, it } from "vitest";
import { scoreQuizAttempt } from "@/server/services/quiz-rules";

describe("quiz submission scoring", () => {
  it("calculates score and accuracy", () => {
    expect(scoreQuizAttempt(10, 8)).toEqual({ score: 80, accuracy: 80 });
  });
});
