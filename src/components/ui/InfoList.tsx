import type { ReactNode } from "react";
import type { OpeningHours } from "@/content/types";
import { cn } from "@/lib/cn";

/** One labelled contact fact with an icon. Used in booking and contacts sections. */
export function InfoRow({ icon, label, children }: { icon: ReactNode; label: string; children: ReactNode }) {
  return (
    <li className="flex gap-5 py-6">
      <span
        aria-hidden="true"
        className="grid size-11 shrink-0 place-items-center rounded-full bg-teal-50 text-teal-600"
      >
        {icon}
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-sm text-muted">{label}</p>
        <div className="mt-1.5 text-base font-medium break-words text-navy-900">{children}</div>
      </div>
    </li>
  );
}

export function HoursList({
  hours,
  tone = "light",
  className,
}: {
  hours: OpeningHours[];
  tone?: "light" | "dark";
  className?: string;
}) {
  const dark = tone === "dark";
  return (
    <ul className={cn("flex max-w-xs flex-col gap-1", className)}>
      {hours.map((row) => (
        <li
          key={row.days}
          className={cn(
            "flex justify-between gap-6",
            row.closed && (dark ? "text-ivory/50" : "font-normal text-muted"),
          )}
        >
          <span>{row.days}:</span>
          <span className="tabular-nums">{row.time}</span>
        </li>
      ))}
    </ul>
  );
}
