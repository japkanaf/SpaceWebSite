"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { DURATION, EASE, REVEAL_DISTANCE } from "./tokens";

/** Fades and lifts content once when it first enters the viewport. */
export function Reveal({
  children,
  className,
  delay = 0,
  amount = 0.3,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  amount?: number;
}) {
  return (
    <motion.div
      data-reveal=""
      className={className}
      initial={{ opacity: 0, y: REVEAL_DISTANCE }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: DURATION.base, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}
