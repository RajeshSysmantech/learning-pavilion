"use client";

import type { ReactNode } from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cn } from "@/lib/utils";

export function Tabs({
  children,
  defaultValue
}: {
  children: ReactNode;
  defaultValue: string;
}) {
  return <TabsPrimitive.Root defaultValue={defaultValue}>{children}</TabsPrimitive.Root>;
}

export function TabsList({ children }: { children: ReactNode }) {
  return (
    <TabsPrimitive.List className="inline-flex rounded-2xl bg-white p-1 shadow-soft">
      {children}
    </TabsPrimitive.List>
  );
}

export function TabsTrigger({
  children,
  value
}: {
  children: ReactNode;
  value: string;
}) {
  return (
    <TabsPrimitive.Trigger
      value={value}
      className={cn(
        "rounded-2xl px-4 py-2 text-sm font-semibold text-slate-500 transition data-[state=active]:bg-brand-blue data-[state=active]:text-white"
      )}
    >
      {children}
    </TabsPrimitive.Trigger>
  );
}

export function TabsContent({
  children,
  value
}: {
  children: ReactNode;
  value: string;
}) {
  return <TabsPrimitive.Content value={value} className="mt-5">{children}</TabsPrimitive.Content>;
}
