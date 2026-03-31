import type { ReactNode } from "react";
import { AppShell } from "@/components/layouts/app-shell";

const nav = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/quiz", label: "Quiz" },
  { href: "/typing", label: "Typing Tutor" },
  { href: "/games", label: "Games" },
  { href: "/rewards", label: "Rewards" },
  { href: "/leaderboard", label: "Leaderboard" },
  { href: "/profile", label: "Profile" },
  { href: "/notifications", label: "Notifications" },
  { href: "/subscription", label: "Subscription" },
  { href: "/settings", label: "Settings" }
];

export default function StudentLayout({
  children
}: {
  children: ReactNode;
}) {
  return <AppShell title="Student App" nav={nav}>{children}</AppShell>;
}
