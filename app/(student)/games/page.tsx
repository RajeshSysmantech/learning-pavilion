import { EmptyState } from "@/components/ui/empty-state";
import { PageHeader } from "@/components/ui/page-header";

export default function GamesPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Games"
        title="Puzzle games are ready for Phase 2"
        description="The architecture, schema, and navigation are prepared so game levels and attempts can be added cleanly."
      />
      <EmptyState
        title="Puzzle zone coming next"
        description="This surface is intentionally scaffolded for Phase 2 while the MVP focuses on quiz, typing, rewards, and admin operations."
      />
    </div>
  );
}
