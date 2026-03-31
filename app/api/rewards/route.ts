import { prisma } from "@/server/db/prisma";
import { ok } from "@/server/http";

export async function GET() {
  const rewards = await prisma.reward.findMany({
    where: { isPublished: true, deletedAt: null },
    orderBy: { createdAt: "desc" }
  });

  return ok(rewards);
}
