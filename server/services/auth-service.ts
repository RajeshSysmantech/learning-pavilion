import { UserRole, UserStatus } from "@prisma/client";
import { prisma } from "@/server/db/prisma";
import { hashPassword, verifyPassword } from "@/server/auth/password";
import { createSessionCookie } from "@/server/auth/session";
import { getRedirectPathForRole } from "@/lib/auth-redirect";
import { loginSchema, registerSchema } from "@/server/validation/auth";

export async function registerUser(input: unknown) {
  const data = registerSchema.parse(input);
  const passwordHash = await hashPassword(data.password);

  const existingUser = await prisma.user.findFirst({
    where: {
      OR: [{ email: data.email }, ...(data.mobile ? [{ mobile: data.mobile }] : [])]
    }
  });

  if (existingUser) {
    throw new Error("An account with this email or mobile number already exists");
  }

  const user = await prisma.user.create({
    data: {
      fullName: data.fullName,
      displayName: data.displayName,
      email: data.email,
      mobile: data.mobile,
      passwordHash,
      role: data.role as UserRole,
      status: UserStatus.ACTIVE,
      ...(data.role === "STUDENT" && {
        studentProfile: {
          create: {
            onboardingDone: false
          }
        }
      }),
      ...(data.role === "PARENT" && {
        parentProfile: {
          create: {}
        }
      })
    }
  });

  await createSessionCookie({
    sub: String(user.id),
    role: user.role,
    email: user.email ?? undefined,
    fullName: user.fullName
  });

  return {
    user,
    redirectTo: getRedirectPathForRole(user.role)
  };
}

export async function loginUser(input: unknown) {
  const data = loginSchema.parse(input);
  const user = await prisma.user.findUnique({ where: { email: data.email } });

  if (!user) {
    throw new Error("Invalid email or password");
  }

  const passwordMatches = await verifyPassword(data.password, user.passwordHash);

  if (!passwordMatches) {
    throw new Error("Invalid email or password");
  }

  await createSessionCookie({
    sub: String(user.id),
    role: user.role,
    email: user.email ?? undefined,
    fullName: user.fullName
  });

  await prisma.user.update({
    where: { id: user.id },
    data: { lastLoginAt: new Date() }
  });

  return {
    user,
    redirectTo: getRedirectPathForRole(user.role)
  };
}
