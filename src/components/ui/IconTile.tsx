import type { IconKey } from "@/content/types";
import { cn } from "@/lib/cn";
import { SiteIcon } from "@/components/icons/SiteIcon";

export function IconTile({
  icon,
  tone = "light",
  className,
}: {
  icon: IconKey;
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-grid size-12 shrink-0 place-items-center rounded-control",
        tone === "dark"
          ? "bg-white/5 text-teal-500 ring-1 ring-inset ring-white/10"
          : "bg-teal-50 text-teal-600",
        className,
      )}
    >
      <SiteIcon name={icon} className="size-5.5" />
    </span>
  );
}
