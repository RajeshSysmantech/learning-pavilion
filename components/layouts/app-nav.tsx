"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

type NavItem = {
  href: string;
  label: string;
};

export function AppNav({ nav }: { nav: NavItem[] }) {
  const pathname = usePathname();

  return (
    <nav className="grid gap-2">
      {nav.map((item) => {
        const isActive =
          pathname === item.href ||
          (item.href !== "/" && pathname.startsWith(`${item.href}/`));

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "rounded-2xl px-4 py-3 text-sm font-medium text-white/80 transition hover:bg-white/10 hover:text-white",
              isActive && "bg-white/12 text-white"
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
