import { Star } from "lucide-react";
import { cn } from "@/lib/cn";

export function RatingStars({
  rating,
  label,
  className,
}: {
  rating: number;
  label: string;
  className?: string;
}) {
  return (
    <div role="img" aria-label={label} className={cn("flex items-center gap-0.5", className)}>
      {[1, 2, 3, 4, 5].map((index) => (
        <Star
          key={index}
          aria-hidden="true"
          strokeWidth={1.5}
          className={cn(
            "size-4",
            index <= rating ? "fill-teal-500 text-teal-500" : "fill-transparent text-navy-900/20",
          )}
        />
      ))}
    </div>
  );
}
