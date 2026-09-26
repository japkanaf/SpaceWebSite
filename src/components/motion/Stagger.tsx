"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import type { ReactNode } from "react";
import { DURATION, EASE, REVEAL_DISTANCE, STAGGER_STEP } from "./tokens";

const itemVariants: Variants = {
  hidden: { opacity: 0, y: REVEAL_DISTANCE },
  show: { opacity: 1, y: 0, transition: { duration: DURATION.base, ease: EASE } },
};

function useGroupVariants(): Variants {
  const reduce = useReducedMotion();
  return {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : STAGGER_STEP } },
  };
}

interface GroupProps {
  children: ReactNode;
  className?: string;
  amount?: number;
}

/** Reveals its StaggerItem children one after another. */
export function StaggerGroup({ children, className, amount = 0.15 }: GroupProps) {
  const variants = useGroupVariants();
  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div data-reveal="" className={className} variants={itemVariants}>
      {children}
    </motion.div>
  );
}

/** List variant of StaggerGroup for semantic <ul> markup. */
export function StaggerList({ children, className, amount = 0.15 }: GroupProps) {
  const variants = useGroupVariants();
  return (
    <motion.ul
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
    >
      {children}
    </motion.ul>
  );
}

export function StaggerListItem({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.li data-reveal="" className={className} variants={itemVariants}>
      {children}
    </motion.li>
  );
}
