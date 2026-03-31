import type { ReactNode } from "react";
import { PublicShell } from "@/components/layouts/public-shell";

export default function PublicLayout({
  children
}: {
  children: ReactNode;
}) {
  return <PublicShell>{children}</PublicShell>;
}
