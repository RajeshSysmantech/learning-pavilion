import type { Route } from "next";
import { APP_NAME, APP_TAGLINE } from "@/lib/constants";

export const siteConfig = {
  name: APP_NAME,
  tagline: APP_TAGLINE,
  description:
    "A premium gamified learning platform for kids with quizzes, typing, rewards, streaks, leaderboards, and trusted parent-friendly progress tracking.",
  nav: [
    { href: "/", label: "Home" },
    { href: "/features", label: "Features" },
    { href: "/pricing", label: "Pricing" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" }
  ] satisfies Array<{ href: Route; label: string }>
};
