"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { DURATION, EASE } from "./tokens";

/** Wipes large photography into view from the bottom with a slight settle. Used once per section. */
export function ImageReveal({ children, className }: { children: ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      data-reveal=""
      className={cn("overflow-hidden", className)}
      initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: reduce ? 0 : DURATION.slow, ease: EASE }}
    >
      <motion.div
        className="relative h-full w-full"
        initial={{ scale: 1.04 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: reduce ? 0 : DURATION.slow + 0.3, ease: EASE }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
