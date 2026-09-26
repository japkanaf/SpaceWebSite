import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Eyebrow({
  children,
  tone = "light",
  className,
}: {
  children: ReactNode;
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <p
      className={cn(
        "inline-flex items-center gap-3 font-sans text-eyebrow font-semibold uppercase",
        tone === "dark" ? "text-teal-500" : "text-teal-600",
        className,
      )}
    >
      <span aria-hidden="true" className="h-px w-6 bg-current" />
      {children}
    </p>
  );
}
