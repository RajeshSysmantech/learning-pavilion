import Image from "next/image";
import Link from "next/link";
import { ShieldCheck, Sparkles, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SectionTitle } from "@/components/ui/section-title";

export default function HomePage() {
  return (
    <div className="mx-auto max-w-7xl space-y-16 px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <section className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6">
          <div className="inline-flex rounded-full bg-brand-orange/10 px-4 py-2 text-sm font-semibold text-brand-orange">
            Free 1 Year with HP Laptop
          </div>
          <div className="space-y-4">
            <h1 className="max-w-3xl text-5xl font-black leading-tight text-brand-ink md:text-6xl">
              Learn like a game. Grow with every challenge.
            </h1>
            <p className="max-w-2xl text-lg text-slate-600">
              Learning Pavilion blends quizzes, typing, rewards, streaks, and trusted parent insights into a premium kids learning experience.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link href="/register">
              <Button className="w-full sm:w-auto">Start Learning</Button>
            </Link>
            <Link href="/features">
              <Button variant="secondary" className="w-full sm:w-auto">
                Try Demo
              </Button>
            </Link>
          </div>
        </div>
        <Card className="overflow-hidden bg-brand-blue p-0 text-white">
          <div className="grid gap-6 p-6 md:grid-cols-[0.9fr_1.1fr]">
            <div className="space-y-4">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-orange">
                LEARN. PLAY. GROW.
              </p>
              <h2 className="text-3xl font-black">Game-home dashboard for curious kids</h2>
              <div className="grid gap-3">
                <div className="rounded-2xl bg-white/10 p-4">Daily challenge missions</div>
                <div className="rounded-2xl bg-white/10 p-4">Coins, XP, streaks, badges</div>
                <div className="rounded-2xl bg-white/10 p-4">Leaderboards and reward redemption</div>
              </div>
            </div>
            <div className="flex items-center justify-center rounded-[2rem] bg-white/10 p-6">
              <Image
                src="/logo-with-tagline.svg"
                alt="Learning Pavilion logo"
                width={420}
                height={420}
                className="h-auto w-full max-w-xs rounded-[2rem]"
              />
            </div>
          </div>
        </Card>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        {[
          {
            icon: <Sparkles className="h-6 w-6 text-brand-orange" />,
            title: "Premium game feel",
            text: "Mobile-first dashboards, touch-friendly actions, and progress loops kids enjoy returning to."
          },
          {
            icon: <Trophy className="h-6 w-6 text-brand-blue" />,
            title: "Real gamification",
            text: "Coins, XP, streaks, badges, redemptions, and multi-window leaderboards keep motivation high."
          },
          {
            icon: <ShieldCheck className="h-6 w-6 text-brand-green" />,
            title: "Parent trust built in",
            text: "Secure role-based access, clear learning outcomes, and a roadmap for parent and admin oversight."
          }
        ].map((item) => (
          <Card key={item.title} className="space-y-3">
            {item.icon}
            <h3 className="text-xl font-bold text-brand-ink">{item.title}</h3>
            <p className="text-sm text-slate-500">{item.text}</p>
          </Card>
        ))}
      </section>

      <section className="space-y-6">
        <SectionTitle
          title="Everything needed for the MVP"
          description="Quiz, typing tutor, puzzle-ready structure, rewards, subscriptions, and strong admin controls."
        />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {[
            "Quiz journeys with explanations",
            "Typing tutor with WPM and accuracy",
            "Rewards, badges, and redemption flow",
            "Leaderboards across daily to all-time",
            "Admin CRUD and moderation tools",
            "Notifications and announcements",
            "Subscription and coupon abstraction",
            "Parent dashboard-ready schema"
          ].map((item) => (
            <Card key={item} className="py-6">
              <p className="font-semibold text-brand-ink">{item}</p>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
