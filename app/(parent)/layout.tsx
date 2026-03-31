import type { ReactNode } from "react";
import type { Route } from "next";
import { AppShell } from "@/components/layouts/app-shell";

const nav = [
  { href: "/children", label: "Children" },
  { href: "/children/child-1" as Route, label: "Performance" }
] satisfies Array<{ href: Route; label: string }>;

export default function ParentLayout({
  children
}: {
  children: ReactNode;
}) {
  return <AppShell title="Parent App" nav={nav}>{children}</AppShell>;
}
