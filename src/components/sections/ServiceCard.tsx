"use client";

import { ArrowRight } from "lucide-react";
import type { Service } from "@/content/types";
import { cn } from "@/lib/cn";
import { IconTile } from "@/components/ui/IconTile";
import { useBooking } from "@/components/booking/BookingProvider";

export type ServiceCardVariant = "featured" | "wide" | "default";

/**
 * The whole card is one link to the booking form. With JavaScript it also
 * preselects the service; without JavaScript it simply jumps to the form.
 */
export function ServiceCard({
  service,
  actionLabel,
  variant = "default",
}: {
  service: Service;
  actionLabel: string;
  variant?: ServiceCardVariant;
}) {
  const { preselectService } = useBooking();
  const dark = variant === "featured";
  const large = variant !== "default";
  const titleId = `usluga-${service.id}-title`;
  const actionId = `usluga-${service.id}-action`;
  const descriptionId = `usluga-${service.id}-description`;

  return (
    <a
      id={`usluga-${service.id}`}
      href="#zapis"
      onClick={(event) => {
        event.preventDefault();
        preselectService(service.id);
      }}
      aria-labelledby={`${titleId} ${actionId}`}
      aria-describedby={descriptionId}
      className={cn(
        "group relative flex h-full min-h-64 flex-col rounded-card border p-6 transition duration-300 ease-premium hover:-translate-y-1 hover:shadow-lift md:p-8",
        large && "lg:min-h-72",
        dark
          ? "border-navy-900 bg-navy-900 text-ivory"
          : "border-line bg-ivory text-ink hover:border-navy-900/15",
      )}
    >
      <IconTile icon={service.icon} tone={dark ? "dark" : "light"} />
      <div className="mt-auto pt-10">
        <h3
          id={titleId}
          className={cn(
            large ? "font-display text-display-md" : "text-title font-semibold",
            dark ? "text-ivory" : "text-navy-900",
          )}
        >
          {service.title}
        </h3>
        <p
          id={descriptionId}
          className={cn("mt-3 max-w-md text-base leading-relaxed", dark ? "text-ivory/70" : "text-muted")}
        >
          {service.description}
        </p>
        <span
          id={actionId}
          className={cn(
            "mt-6 inline-flex items-center gap-2 text-sm font-semibold",
            dark ? "text-teal-500" : "text-teal-600",
          )}
        >
          {actionLabel}
          <ArrowRight
            aria-hidden="true"
            strokeWidth={1.75}
            className="size-4 transition-transform duration-200 ease-premium group-hover:translate-x-1"
          />
        </span>
      </div>
    </a>
  );
}
