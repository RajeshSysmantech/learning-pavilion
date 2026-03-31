type BadgeRuleInput = {
  quizCount?: number;
  streakDays?: number;
  typingAccuracy?: number;
  rewardRedemptionCount?: number;
};

export function evaluateBadgeRules(progress: BadgeRuleInput) {
  const unlocked = new Set<string>();

  if ((progress.quizCount ?? 0) >= 1) unlocked.add("first-quiz-champion");
  if ((progress.quizCount ?? 0) >= 10) unlocked.add("10-quizzes-completed");
  if ((progress.streakDays ?? 0) >= 5) unlocked.add("5-day-streak");
  if ((progress.typingAccuracy ?? 0) >= 95) unlocked.add("typing-accuracy-ace");
  if ((progress.rewardRedemptionCount ?? 0) >= 1) unlocked.add("first-reward-redeemed");

  return [...unlocked];
}
