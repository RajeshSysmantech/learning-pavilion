"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

type RegisterRole = "STUDENT" | "PARENT";

type AuthResponse = {
  success: boolean;
  data?: {
    id: string;
    role: "STUDENT" | "PARENT" | "ADMIN" | "SUPER_ADMIN";
    redirectTo: string;
  };
  error?: {
    message: string;
    fieldErrors?: Record<string, string[]>;
  };
};

export function RegisterForm() {
  const router = useRouter();
  const [form, setForm] = useState({
    fullName: "",
    displayName: "",
    email: "",
    mobile: "",
    role: "STUDENT" as RegisterRole,
    password: ""
  });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      const result = (await response.json()) as AuthResponse;

      if (!response.ok || !result.success || !result.data) {
        setError(result.error?.message ?? "Unable to create account right now.");
        return;
      }

      router.push(result.data.redirectTo);
      router.refresh();
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-lg items-center px-4 py-10">
      <Card className="w-full space-y-5">
        <div className="space-y-1">
          <h1 className="text-3xl font-black text-brand-ink">Create your account</h1>
          <p className="text-sm text-slate-500">
            Student and parent onboarding begins here.
          </p>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="grid gap-3 md:grid-cols-2">
            <input
              className="rounded-2xl border border-slate-200 px-4 py-3"
              placeholder="Full name"
              value={form.fullName}
              onChange={(event) => setForm((current) => ({ ...current, fullName: event.target.value }))}
              required
            />
            <input
              className="rounded-2xl border border-slate-200 px-4 py-3"
              placeholder="Display name"
              value={form.displayName}
              onChange={(event) => setForm((current) => ({ ...current, displayName: event.target.value }))}
            />
            <input
              className="rounded-2xl border border-slate-200 px-4 py-3"
              placeholder="Email address"
              type="email"
              value={form.email}
              onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
              required
            />
            <input
              className="rounded-2xl border border-slate-200 px-4 py-3"
              placeholder="Mobile number"
              value={form.mobile}
              onChange={(event) => setForm((current) => ({ ...current, mobile: event.target.value }))}
            />
            <select
              className="rounded-2xl border border-slate-200 px-4 py-3 md:col-span-2"
              value={form.role}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  role: event.target.value as RegisterRole
                }))
              }
            >
              <option value="STUDENT">Student</option>
              <option value="PARENT">Parent</option>
            </select>
            <input
              type="password"
              className="rounded-2xl border border-slate-200 px-4 py-3 md:col-span-2"
              placeholder="Password"
              value={form.password}
              onChange={(event) => setForm((current) => ({ ...current, password: event.target.value }))}
              required
            />
          </div>
          {error ? (
            <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-600">{error}</p>
          ) : null}
          <Button className="w-full" disabled={isSubmitting} type="submit">
            {isSubmitting ? "Creating account..." : "Register now"}
          </Button>
        </form>
        <div className="text-sm text-slate-500">
          Already have an account? <Link href="/login" className="font-semibold text-brand-blue">Login</Link>
        </div>
      </Card>
    </div>
  );
}
