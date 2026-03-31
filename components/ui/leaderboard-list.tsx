import { Crown, Medal, Trophy } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

type Entry = {
  rank: number;
  name: string;
  points: string;
  highlight?: boolean;
};

const rankIcon = (rank: number) => {
  if (rank === 1) return <Crown className="h-4 w-4 text-brand-orange" />;
  if (rank === 2) return <Trophy className="h-4 w-4 text-brand-blue" />;
  if (rank === 3) return <Medal className="h-4 w-4 text-brand-green" />;
  return <span className="text-sm font-semibold text-slate-500">#{rank}</span>;
};

export function LeaderboardList({
  title,
  entries
}: {
  title: string;
  entries: Entry[];
}) {
  return (
    <Card className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-brand-ink">{title}</h3>
        <Badge label="Live" tone="green" />
      </div>
      <div className="space-y-3">
        {entries.map((entry) => (
          <div
            key={`${entry.rank}-${entry.name}`}
            className={`flex items-center justify-between rounded-2xl px-4 py-3 ${
              entry.highlight ? "bg-brand-blue text-white" : "bg-slate-50"
            }`}
          >
            <div className="flex items-center gap-3">
              {rankIcon(entry.rank)}
              <span className="font-semibold">{entry.name}</span>
            </div>
            <span className="text-sm font-bold">{entry.points}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}
