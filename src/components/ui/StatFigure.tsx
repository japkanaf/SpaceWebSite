import { cn } from "@/lib/cn";

export function StatFigure({
  value,
  caption,
  tone = "light",
  size = "md",
  className,
}: {
  value: string;
  caption: string;
  tone?: "light" | "dark";
  size?: "md" | "lg";
  className?: string;
}) {
  const dark = tone === "dark";
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <span
        className={cn(
          "font-display leading-none whitespace-nowrap",
          size === "lg" ? "text-display-md" : "text-title",
          dark ? "text-ivory" : "text-navy-900",
        )}
      >
        {value}
      </span>
      <span className={cn("text-sm leading-snug", dark ? "text-ivory/65" : "text-muted")}>{caption}</span>
    </div>
  );
}
