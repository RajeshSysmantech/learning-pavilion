import { loginUser } from "@/server/services/auth-service";
import { ok, fail } from "@/server/http";
import { enforceRateLimit } from "@/server/rate-limit";

export async function POST(request: Request) {
  const clientKey = request.headers.get("x-forwarded-for") ?? "login-local";
  if (!enforceRateLimit(`login:${clientKey}`, 10, 60_000)) {
    return fail("Too many login attempts", 429);
  }

  try {
    const result = await loginUser(await request.json());
    return ok({
      id: String(result.user.id),
      role: result.user.role,
      redirectTo: result.redirectTo
    });
  } catch (error) {
    return fail(error instanceof Error ? error.message : "Login failed", 401);
  }
}
