"use client";

import { Children, useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/cn";

/**
 * Horizontal, touch-friendly rail for phones: native scroll snapping, a visible
 * peek of the next item, previous/next buttons and a position counter.
 */
export function SnapRail({
  children,
  label,
  previousLabel,
  nextLabel,
  positionTemplate,
  itemClassName,
}: {
  children: ReactNode;
  label: string;
  previousLabel: string;
  nextLabel: string;
  positionTemplate: string;
  itemClassName?: string;
}) {
  const listRef = useRef<HTMLUListElement>(null);
  const frame = useRef(0);
  const items = Children.toArray(children);
  const total = items.length;
  const [index, setIndex] = useState(0);

  const measure = useCallback(() => {
    frame.current = 0;
    const list = listRef.current;
    if (!list) return;
    const elements = Array.from(list.children) as HTMLElement[];
    if (elements.length === 0) return;
    if (list.scrollLeft + list.clientWidth >= list.scrollWidth - 4) {
      setIndex(elements.length - 1);
      return;
    }
    const base = elements[0].offsetLeft;
    let closest = 0;
    let best = Number.POSITIVE_INFINITY;
    elements.forEach((element, position) => {
      const distance = Math.abs(element.offsetLeft - base - list.scrollLeft);
      if (distance < best) {
        best = distance;
        closest = position;
      }
    });
    setIndex(closest);
  }, []);

  useEffect(
    () => () => {
      if (frame.current) window.cancelAnimationFrame(frame.current);
    },
    [],
  );

  function onScroll() {
    if (!frame.current) frame.current = window.requestAnimationFrame(measure);
  }

  function goTo(target: number) {
    const list = listRef.current;
    if (!list) return;
    const elements = Array.from(list.children) as HTMLElement[];
    const element = elements[Math.max(0, Math.min(target, elements.length - 1))];
    if (!element) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    list.scrollTo({ left: element.offsetLeft - elements[0].offsetLeft, behavior: reduce ? "auto" : "smooth" });
  }

  const position = positionTemplate.replace("{current}", String(index + 1)).replace("{total}", String(total));
  const controlClass =
    "grid size-11 place-items-center rounded-full border border-navy-900/15 bg-paper text-navy-900 transition duration-200 ease-premium hover:border-navy-900/35 disabled:pointer-events-none disabled:opacity-35";

  return (
    <div>
      <ul
        ref={listRef}
        onScroll={onScroll}
        aria-label={label}
        className="relative -mx-5 flex snap-x snap-mandatory scroll-px-5 gap-4 overflow-x-auto px-5 pb-2 scrollbar-none"
      >
        {items.map((item, position) => (
          <li key={position} className={cn("w-4/5 shrink-0 snap-start sm:w-3/5", itemClassName)}>
            {item}
          </li>
        ))}
      </ul>
      <div className="mt-6 flex items-center justify-between gap-4">
        <p aria-live="polite" className="text-sm font-medium text-muted tabular-nums">
          {position}
        </p>
        <div className="flex gap-2">
          <button
            type="button"
            aria-label={previousLabel}
            disabled={index === 0}
            onClick={() => goTo(index - 1)}
            className={controlClass}
          >
            <ChevronLeft aria-hidden="true" strokeWidth={1.75} className="size-5" />
          </button>
          <button
            type="button"
            aria-label={nextLabel}
            disabled={index >= total - 1}
            onClick={() => goTo(index + 1)}
            className={controlClass}
          >
            <ChevronRight aria-hidden="true" strokeWidth={1.75} className="size-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
