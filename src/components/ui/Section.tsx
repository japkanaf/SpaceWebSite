import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export type SectionTone = "ivory" | "paper" | "sand" | "navy";

const toneClasses: Record<SectionTone, string> = {
  ivory: "bg-ivory text-ink",
  paper: "bg-paper text-ink",
  sand: "bg-sand text-ink",
  navy: "bg-navy-900 text-ivory",
};

export function Section({
  id,
  tone = "ivory",
  labelledBy,
  spacing = "default",
  className,
  children,
}: {
  id?: string;
  tone?: SectionTone;
  labelledBy?: string;
  spacing?: "default" | "none";
  className?: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn(
        "relative isolate",
        spacing === "default" && "py-18 md:py-26 lg:py-36",
        toneClasses[tone],
        className,
      )}
    >
      {children}
    </section>
  );
}
