import { getServerSession } from "@/server/auth/session";
import { fail, ok } from "@/server/http";
import { redeemReward } from "@/server/services/rewards-service";

export async function POST(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession();
  if (!session) return fail("Unauthorized", 401);

  try {
    const { id } = await params;
    const result = await redeemReward(BigInt(session.sub), BigInt(id));
    return ok(result);
  } catch (error) {
    return fail(error instanceof Error ? error.message : "Failed to redeem reward");
  }
}
