import type { ReactNode } from "react";
import type { Route } from "next";
import { AppNav } from "@/components/layouts/app-nav";
import { LogoutButton } from "@/features/auth/logout-button";
import { getServerSession } from "@/server/auth/session";

type NavItem = {
  href: Route;
  label: string;
};

export async function AppShell({
  title,
  nav,
  children
}: {
  title: string;
  nav: NavItem[];
  children: ReactNode;
}) {
  const session = await getServerSession();

  return (
    <div className="min-h-screen bg-brand-surface">
      <div className="mx-auto grid min-h-screen max-w-7xl gap-6 px-4 py-5 sm:px-6 lg:grid-cols-[280px_1fr] lg:px-8">
        <aside className="rounded-[2rem] bg-brand-blue p-5 text-white shadow-soft">
          <div className="mb-8">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-brand-orange">
              Learning Pavilion
            </p>
            <h2 className="mt-2 text-2xl font-black">{title}</h2>
          </div>
          {session ? (
            <div className="mb-6 rounded-3xl bg-white/10 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-orange">
                Signed In
              </p>
              <p className="mt-2 text-lg font-bold text-white">{session.fullName}</p>
              <p className="text-sm text-white/75">{session.role.toLowerCase()}</p>
            </div>
          ) : null}
          <AppNav nav={nav} />
          <div className="mt-8 border-t border-white/10 pt-6">
            <LogoutButton />
          </div>
        </aside>
        <div className="space-y-6">{children}</div>
      </div>
    </div>
  );
}
