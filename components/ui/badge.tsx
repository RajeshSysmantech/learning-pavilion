import { cn } from "@/lib/utils";

export function Badge({
  label,
  tone = "blue"
}: {
  label: string;
  tone?: "blue" | "green" | "orange" | "gray";
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold",
        tone === "blue" && "bg-brand-blue/10 text-brand-blue",
        tone === "green" && "bg-brand-green/10 text-brand-green",
        tone === "orange" && "bg-brand-orange/10 text-brand-orange",
        tone === "gray" && "bg-slate-100 text-slate-600"
      )}
    >
      {label}
    </span>
  );
}
