import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Reveal } from "@/components/motion/Reveal";
import { Eyebrow } from "./Eyebrow";

export function SectionHeader({
  id,
  eyebrow,
  title,
  lead,
  align = "start",
  tone = "light",
  className,
  children,
}: {
  id: string;
  eyebrow?: string;
  title: string;
  lead?: string;
  align?: "start" | "center";
  tone?: "light" | "dark";
  className?: string;
  children?: ReactNode;
}) {
  const dark = tone === "dark";
  return (
    <Reveal
      className={cn(
        "flex max-w-2xl flex-col gap-5",
        align === "center" ? "mx-auto items-center text-center" : "items-start",
        className,
      )}
    >
      {eyebrow ? <Eyebrow tone={tone}>{eyebrow}</Eyebrow> : null}
      <h2
        id={id}
        className={cn("font-display text-display-lg font-normal", dark ? "text-ivory" : "text-navy-900")}
      >
        {title}
      </h2>
      {lead ? <p className={cn("text-lead", dark ? "text-ivory/70" : "text-muted")}>{lead}</p> : null}
      {children}
    </Reveal>
  );
}
