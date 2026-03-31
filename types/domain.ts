export type UserRole = "STUDENT" | "PARENT" | "ADMIN" | "SUPER_ADMIN";
export type WalletEntryType = "COIN" | "XP";
export type WalletReason =
  | "QUIZ_REWARD"
  | "TYPING_REWARD"
  | "GAME_REWARD"
  | "STREAK_BONUS"
  | "REWARD_REDEMPTION"
  | "ADMIN_ADJUSTMENT";

export type LeaderboardWindow = "DAILY" | "WEEKLY" | "MONTHLY" | "ALL_TIME";
export type LeaderboardModule = "QUIZ" | "TYPING" | "GAME" | "OVERALL";
