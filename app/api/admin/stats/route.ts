import { getServerSession } from "@/server/auth/session";
import { fail, ok } from "@/server/http";
import { getAdminStats } from "@/server/services/admin-service";

export async function GET() {
  const session = await getServerSession();
  if (!session) return fail("Unauthorized", 401);
  if (!["ADMIN", "SUPER_ADMIN"].includes(session.role)) return fail("Forbidden", 403);

  return ok(await getAdminStats());
}
