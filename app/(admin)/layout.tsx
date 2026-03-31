import type { ReactNode } from "react";
import { AppShell } from "@/components/layouts/app-shell";

const nav = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/users", label: "Users" },
  { href: "/admin/students", label: "Students" },
  { href: "/admin/parents", label: "Parents" },
  { href: "/admin/subjects", label: "Subjects" },
  { href: "/admin/categories", label: "Categories" },
  { href: "/admin/difficulty-levels", label: "Difficulty" },
  { href: "/admin/quiz-sets", label: "Quiz Sets" },
  { href: "/admin/quiz-questions", label: "Questions" },
  { href: "/admin/typing-lessons", label: "Typing" },
  { href: "/admin/games", label: "Games" },
  { href: "/admin/rewards", label: "Rewards" },
  { href: "/admin/redemptions", label: "Redemptions" },
  { href: "/admin/leaderboards", label: "Leaderboards" },
  { href: "/admin/badges", label: "Badges" },
  { href: "/admin/notifications", label: "Notifications" },
  { href: "/admin/announcements", label: "Announcements" },
  { href: "/admin/plans", label: "Plans" },
  { href: "/admin/coupons", label: "Coupons" },
  { href: "/admin/reports", label: "Reports" },
  { href: "/admin/settings", label: "Settings" },
  { href: "/admin/media", label: "Media" }
];

export default function AdminLayout({
  children
}: {
  children: ReactNode;
}) {
  return <AppShell title="Admin Panel" nav={nav}>{children}</AppShell>;
}
