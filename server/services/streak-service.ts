import { differenceInCalendarDays } from "date-fns";

export type StreakState = {
  currentStreak: number;
  bestStreak: number;
  lastActivityDate?: Date | null;
};

export function computeNextStreak(state: StreakState, activityDate: Date) {
  const last = state.lastActivityDate;
  if (!last) {
    return { currentStreak: 1, bestStreak: Math.max(state.bestStreak, 1) };
  }

  const difference = differenceInCalendarDays(activityDate, last);

  if (difference <= 0) {
    return {
      currentStreak: state.currentStreak,
      bestStreak: state.bestStreak
    };
  }

  const currentStreak = difference === 1 ? state.currentStreak + 1 : 1;

  return {
    currentStreak,
    bestStreak: Math.max(state.bestStreak, currentStreak)
  };
}
