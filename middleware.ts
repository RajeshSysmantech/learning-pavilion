import { NextRequest, NextResponse } from "next/server";
import { SESSION_COOKIE, verifySession } from "@/server/auth/token";

const protectedPrefixes = [
  "/dashboard",
  "/quiz",
  "/typing",
  "/games",
  "/rewards",
  "/leaderboard",
  "/profile",
  "/notifications",
  "/subscription",
  "/settings",
  "/children",
  "/admin"
];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const requiresAuth = protectedPrefixes.some((prefix) => pathname.startsWith(prefix));

  if (!requiresAuth) return NextResponse.next();

  const token = request.cookies.get(SESSION_COOKIE)?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    const session = await verifySession(token);

    if (pathname.startsWith("/admin") && !["ADMIN", "SUPER_ADMIN"].includes(session.role)) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    if (pathname.startsWith("/children") && session.role !== "PARENT") {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    if (
      ["/dashboard", "/quiz", "/typing", "/games", "/rewards", "/leaderboard", "/profile", "/notifications", "/subscription", "/settings"].some((prefix) =>
        pathname.startsWith(prefix)
      ) &&
      session.role !== "STUDENT"
    ) {
      return NextResponse.redirect(
        new URL(session.role === "PARENT" ? "/children" : "/admin", request.url)
      );
    }

    return NextResponse.next();
  } catch {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"]
};
