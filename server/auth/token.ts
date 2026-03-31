import { SignJWT, jwtVerify } from "jose";
import { env } from "@/lib/env";
import type { UserRole } from "@/types/domain";

export const SESSION_COOKIE = "lp_session";
const key = new TextEncoder().encode(env.NEXTAUTH_SECRET || env.AUTH_SECRET);

export type SessionPayload = {
  sub: string;
  role: UserRole;
  email?: string;
  fullName: string;
};

export async function signSession(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(key);
}

export async function verifySession(token: string) {
  const result = await jwtVerify<SessionPayload>(token, key);
  return result.payload;
}
