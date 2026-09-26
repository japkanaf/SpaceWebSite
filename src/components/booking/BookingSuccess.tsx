"use client";

import { motion } from "motion/react";
import { useEffect, useRef } from "react";
import { CircleCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { DURATION, EASE } from "@/components/motion/tokens";

export function BookingSuccess({
  title,
  text,
  action,
  onReset,
}: {
  title: string;
  text: string;
  action: string;
  onReset: () => void;
}) {
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: DURATION.base, ease: EASE }}
      className="flex flex-col items-start rounded-card border border-line bg-paper p-8 shadow-soft sm:p-10 lg:p-14"
    >
      <span className="grid size-14 place-items-center rounded-full bg-teal-50 text-teal-600">
        <CircleCheck aria-hidden="true" strokeWidth={1.5} className="size-7" />
      </span>
      <h3 ref={headingRef} tabIndex={-1} className="mt-8 font-display text-display-md text-navy-900">
        {title}
      </h3>
      <p className="mt-4 max-w-md text-lead text-muted">{text}</p>
      <Button variant="secondary" size="lg" className="mt-10" onClick={onReset}>
        {action}
      </Button>
    </motion.div>
  );
}
