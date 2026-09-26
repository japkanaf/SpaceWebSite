import { cn } from "@/lib/cn";
import { LogoMark } from "@/components/icons/LogoMark";

export function Logo({
  primary,
  secondary,
  tone = "light",
  className,
}: {
  primary: string;
  secondary: string;
  tone?: "light" | "dark";
  className?: string;
}) {
  const dark = tone === "dark";
  return (
    <span className={cn("inline-flex items-center gap-2 sm:gap-2.5", className)}>
      <LogoMark className={cn("size-7 shrink-0 sm:size-8", dark ? "text-teal-500" : "text-teal-600")} />
      <span className={cn("flex items-baseline leading-none", dark ? "text-ivory" : "text-navy-900")}>
        <span className="font-display text-lg tracking-tight sm:text-xl">{primary}</span>
        <span className="ml-0.5 font-sans text-xs font-bold tracking-widest">{secondary}</span>
      </span>
    </span>
  );
}
