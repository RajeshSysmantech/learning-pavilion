import * as React from "react";
import { cn } from "@/lib/utils";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost" | "danger";
};

export function Button({
  className,
  variant = "primary",
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex min-h-11 items-center justify-center rounded-2xl px-5 py-3 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/30 disabled:pointer-events-none disabled:opacity-50",
        variant === "primary" &&
          "bg-brand-blue text-white shadow-soft hover:bg-brand-blue/90",
        variant === "secondary" &&
          "bg-brand-orange text-white shadow-game hover:bg-brand-orange/90",
        variant === "ghost" &&
          "bg-white text-brand-ink ring-1 ring-slate-200 hover:bg-slate-50",
        variant === "danger" && "bg-brand-danger text-white hover:bg-brand-danger/90",
        className
      )}
      {...props}
    />
  );
}
