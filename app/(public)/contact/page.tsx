import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-8 px-4 py-10 sm:px-6 lg:px-8">
      <PageHeader
        eyebrow="Contact"
        title="Talk to the Learning Pavilion team"
        description="Use this page to collect product demos, school partnerships, or parent support inquiries."
      />
      <Card className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <input className="rounded-2xl border border-slate-200 px-4 py-3" placeholder="Your name" />
          <input className="rounded-2xl border border-slate-200 px-4 py-3" placeholder="Email address" />
        </div>
        <textarea className="min-h-40 w-full rounded-2xl border border-slate-200 px-4 py-3" placeholder="How can we help?" />
        <Button>Send message</Button>
      </Card>
    </div>
  );
}
