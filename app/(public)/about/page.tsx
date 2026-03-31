import { Card } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-5xl space-y-8 px-4 py-10 sm:px-6 lg:px-8">
      <PageHeader
        eyebrow="About Us"
        title="Learning Pavilion is built for joyful progress"
        description="We designed the platform to combine motivation, structure, and trust so kids keep showing up and adults can see meaningful growth."
      />
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <h3 className="text-xl font-bold text-brand-ink">Our vision</h3>
          <p className="mt-2 text-sm text-slate-500">
            A premium EdTech product where daily learning feels as exciting as unlocking the next level in a game.
          </p>
        </Card>
        <Card>
          <h3 className="text-xl font-bold text-brand-ink">Our principles</h3>
          <p className="mt-2 text-sm text-slate-500">
            Strong child safety, clean parent communication, measurable skill progress, and scalable SaaS foundations.
          </p>
        </Card>
      </div>
    </div>
  );
}
