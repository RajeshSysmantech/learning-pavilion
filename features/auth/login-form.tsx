"use client";

import type { Route } from "next";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

type AuthResponse = {
  success: boolean;
  data?: {
    id: string;
    role: "STUDENT" | "PARENT" | "ADMIN" | "SUPER_ADMIN";
    redirectTo: string;
  };
  error?: {
    message: string;
  };
};

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      const result = (await response.json()) as AuthResponse;

      if (!response.ok || !result.success || !result.data) {
        setError(result.error?.message ?? "Unable to login right now.");
        return;
      }

      router.push(result.data.redirectTo as Route);
      router.refresh();
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-md items-center px-4 py-10">
      <Card className="w-full space-y-5">
        <div className="space-y-1">
          <h1 className="text-3xl font-black text-brand-ink">Welcome back</h1>
          <p className="text-sm text-slate-500">
            Sign in to continue learning, tracking, or managing the platform.
          </p>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-3">
            <input
              className="w-full rounded-2xl border border-slate-200 px-4 py-3"
              placeholder="Email address"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
            <input
              type="password"
              className="w-full rounded-2xl border border-slate-200 px-4 py-3"
              placeholder="Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </div>
          {error ? (
            <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-600">{error}</p>
          ) : null}
          <Button className="w-full" disabled={isSubmitting} type="submit">
            {isSubmitting ? "Logging in..." : "Login"}
          </Button>
        </form>
        <div className="rounded-2xl bg-slate-50 px-4 py-3 text-xs text-slate-500">
          Demo student: <span className="font-semibold">student@learningpavilion.app</span> /{" "}
          <span className="font-semibold">Student@123</span>
        </div>
        <div className="flex items-center justify-between text-sm text-slate-500">
          <Link href="/forgot-password">Forgot password?</Link>
          <Link href="/register">Create account</Link>
        </div>
      </Card>
    </div>
  );
}
