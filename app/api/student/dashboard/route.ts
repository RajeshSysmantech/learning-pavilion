import { fail, ok } from "@/server/http";
import { getServerSession } from "@/server/auth/session";
import { getStudentDashboard } from "@/server/services/dashboard-service";

export async function GET() {
  const session = await getServerSession();
  if (!session) return fail("Unauthorized", 401);
  if (session.role !== "STUDENT") return fail("Forbidden", 403);

  const data = await getStudentDashboard(BigInt(session.sub));
  return ok(data);
}
