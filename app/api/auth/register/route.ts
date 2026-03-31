import { registerUser } from "@/server/services/auth-service";
import { ok, fail } from "@/server/http";
import { enforceRateLimit } from "@/server/rate-limit";

export async function POST(request: Request) {
  const clientKey = request.headers.get("x-forwarded-for") ?? "register-local";
  if (!enforceRateLimit(`register:${clientKey}`, 10, 60_000)) {
    return fail("Too many registration attempts", 429);
  }

  try {
    const result = await registerUser(await request.json());
    return ok({
      id: String(result.user.id),
      role: result.user.role,
      redirectTo: result.redirectTo
    });
  } catch (error) {
    return fail(error instanceof Error ? error.message : "Registration failed");
  }
}
