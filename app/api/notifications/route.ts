import { getServerSession } from "@/server/auth/session";
import { prisma } from "@/server/db/prisma";
import { fail, ok } from "@/server/http";

export async function GET() {
  const session = await getServerSession();
  if (!session) return fail("Unauthorized", 401);

  const notifications = await prisma.notification.findMany({
    where: { userId: BigInt(session.sub) },
    orderBy: { createdAt: "desc" },
    take: 25
  });

  return ok(notifications);
}
