import { z } from "zod";

export const registerSchema = z.object({
  fullName: z.string().min(2),
  displayName: z.string().min(2).optional(),
  email: z.string().email(),
  mobile: z.string().min(8).optional(),
  role: z.enum(["STUDENT", "PARENT"]),
  password: z
    .string()
    .min(8)
    .regex(/[A-Z]/, "Password must include an uppercase letter")
    .regex(/[a-z]/, "Password must include a lowercase letter")
    .regex(/[0-9]/, "Password must include a number")
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});
