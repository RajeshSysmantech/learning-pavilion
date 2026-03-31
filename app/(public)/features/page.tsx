import { Card } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";

export default function FeaturesPage() {
  const features = [
    ["Quiz module", "Subject-based quizzes with difficulty levels, scoring, explanations, and leaderboard updates."],
    ["Typing tutor", "Lesson flows with live typing feedback, WPM, accuracy, time tracking, and rewards."],
    ["Gamification", "Coins, XP wallet ledger, streak engine, automatic badges, and reward catalog."],
    ["Admin operations", "Searchable CRUD for content, rewards, plans, announcements, reports, and settings."],
    ["Platform core", "Role-based auth, validation, Prisma schema, Redis-ready caching, and subscription abstraction."]
  ];

  return (
    <div className="mx-auto max-w-6xl space-y-8 px-4 py-10 sm:px-6 lg:px-8">
      <PageHeader
        eyebrow="Platform Features"
        title="Built to feel delightful for kids and dependable for adults"
        description="This MVP architecture is optimized for mobile-first learning, operational visibility, and clean modular growth."
      />
      <div className="grid gap-4 md:grid-cols-2">
        {features.map(([title, text]) => (
          <Card key={title} className="space-y-2">
            <h3 className="text-xl font-bold text-brand-ink">{title}</h3>
            <p className="text-sm text-slate-500">{text}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
