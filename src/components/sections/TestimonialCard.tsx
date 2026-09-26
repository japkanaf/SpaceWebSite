import { Quote } from "lucide-react";
import type { Testimonial } from "@/content/types";
import { MonogramAvatar } from "@/components/ui/MonogramAvatar";
import { RatingStars } from "@/components/ui/RatingStars";

export function TestimonialCard({ testimonial, ratingLabel }: { testimonial: Testimonial; ratingLabel: string }) {
  return (
    <figure className="flex h-full flex-col rounded-card border border-line bg-paper p-7 md:p-8">
      <div className="flex items-center justify-between gap-4">
        <RatingStars rating={testimonial.rating} label={ratingLabel} />
        <Quote aria-hidden="true" strokeWidth={1.5} className="size-6 text-teal-500/40" />
      </div>
      <blockquote className="mt-6 flex-1 text-base leading-relaxed text-ink">{testimonial.text}</blockquote>
      <figcaption className="mt-8 flex items-center gap-4 border-t border-line pt-6">
        <MonogramAvatar name={testimonial.name} />
        <div className="min-w-0">
          <p className="font-semibold text-navy-900">{testimonial.name}</p>
          <p className="text-sm text-muted">{testimonial.treatment}</p>
        </div>
      </figcaption>
    </figure>
  );
}
