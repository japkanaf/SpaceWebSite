"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import { useMediaQuery } from "@/lib/useMediaQuery";

/**
 * Moves its content by a few percent while the frame scrolls through the viewport.
 * The frame keeps its size, so parallax never shifts layout. Off on phones and under reduced motion.
 */
export function ParallaxImage({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const desktop = useMediaQuery("(min-width: 768px)");
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);
  const enabled = desktop && !reduce;

  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      <motion.div className={cn("absolute inset-0", enabled && "scale-112")} style={enabled ? { y } : undefined}>
        {children}
      </motion.div>
    </div>
  );
}
