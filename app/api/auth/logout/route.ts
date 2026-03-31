import { ok } from "@/server/http";
import { clearSessionCookie } from "@/server/auth/session";

export async function POST() {
  await clearSessionCookie();
  return ok({ loggedOut: true });
}
