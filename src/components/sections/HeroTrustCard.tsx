import type { TrustStat } from "@/content/types";
import { StatFigure } from "@/components/ui/StatFigure";

/** Floating trust figure over the hero photo (desktop). */
export function HeroTrustCard({ stat }: { stat: TrustStat }) {
  return (
    <div className="rounded-card bg-paper/85 px-6 py-5 shadow-float ring-1 ring-line backdrop-blur-md">
      <StatFigure value={stat.value} caption={stat.caption} size="lg" />
    </div>
  );
}
