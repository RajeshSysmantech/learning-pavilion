import type { ReactNode } from "react";
import { AppShell } from "@/components/layouts/app-shell";

const nav = [
  { href: "/children", label: "Children" },
  { href: "/children/child-1", label: "Performance" }
];

export default function ParentLayout({
  children
}: {
  children: ReactNode;
}) {
  return <AppShell title="Parent App" nav={nav}>{children}</AppShell>;
}
