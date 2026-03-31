import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string().default("postgresql://postgres:postgres@localhost:5432/learning_pavilion"),
  NEXTAUTH_SECRET: z.string().optional(),
  AUTH_SECRET: z.string().default("learning-pavilion-dev-secret"),
  NEXT_PUBLIC_APP_URL: z.string().default("http://localhost:3000"),
  REDIS_URL: z.string().optional(),
  STORAGE_BUCKET: z.string().optional(),
  STORAGE_ACCESS_KEY: z.string().optional(),
  STORAGE_SECRET_KEY: z.string().optional(),
  PAYMENT_PROVIDER_KEY: z.string().optional(),
  PAYMENT_PROVIDER_SECRET: z.string().optional()
});

export const env = envSchema.parse({
  DATABASE_URL: process.env.DATABASE_URL,
  NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
  AUTH_SECRET: process.env.AUTH_SECRET,
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  REDIS_URL: process.env.REDIS_URL,
  STORAGE_BUCKET: process.env.STORAGE_BUCKET,
  STORAGE_ACCESS_KEY: process.env.STORAGE_ACCESS_KEY,
  STORAGE_SECRET_KEY: process.env.STORAGE_SECRET_KEY,
  PAYMENT_PROVIDER_KEY: process.env.PAYMENT_PROVIDER_KEY,
  PAYMENT_PROVIDER_SECRET: process.env.PAYMENT_PROVIDER_SECRET
});
