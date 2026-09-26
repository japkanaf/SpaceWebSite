"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { DURATION, EASE } from "./tokens";

/**
 * One step of the first-load sequence. Delays are chosen by the caller so the
 * whole intro finishes within 1.2 s. Runs once per page load and never blocks input.
 */
export function PageIntroItem({
  children,
  className,
  delay = 0,
  distance = 16,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  distance?: number;
}) {
  return (
    <motion.div
      data-reveal=""
      className={className}
      initial={{ opacity: 0, y: distance }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: DURATION.base, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

/** Settles the hero image from a slight zoom without hiding it, so it stays the LCP element. */
export function PageIntroImage({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ scale: 1.05 }}
      animate={{ scale: 1 }}
      transition={{ duration: 1.1, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}
