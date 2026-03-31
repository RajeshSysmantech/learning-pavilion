import { PageHeader } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";

export function AdminHero({
  title,
  description
}: {
  title: string;
  description: string;
}) {
  return (
    <PageHeader
      eyebrow="Control Center"
      title={title}
      description={description}
      action={<Button>Create new</Button>}
    />
  );
}
