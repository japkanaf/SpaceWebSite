"use client";

import {
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { ChevronLeft, ChevronRight, Info } from "lucide-react";
import type { BeforeAfterCase, BeforeAfterContent } from "@/content/types";
import { cn } from "@/lib/cn";
import { SiteImageView } from "@/components/media/SiteImageView";

function clamp(value: number): number {
  return Math.round(Math.min(100, Math.max(0, value)) * 10) / 10;
}

function BeforeAfterSlider({
  item,
  beforeLabel,
  afterLabel,
  sliderLabel,
}: {
  item: BeforeAfterCase;
  beforeLabel: string;
  afterLabel: string;
  sliderLabel: string;
}) {
  const frameRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const moved = useRef(false);
  const [position, setPosition] = useState(50);

  function updateFrom(clientX: number) {
    const frame = frameRef.current;
    if (!frame) return;
    const rect = frame.getBoundingClientRect();
    if (rect.width === 0) return;
    setPosition(clamp(((clientX - rect.left) / rect.width) * 100));
  }

  function onPointerDown(event: ReactPointerEvent<HTMLDivElement>) {
    dragging.current = true;
    moved.current = false;
    if (event.pointerType === "mouse") {
      event.currentTarget.setPointerCapture(event.pointerId);
      updateFrom(event.clientX);
    }
  }

  function onPointerMove(event: ReactPointerEvent<HTMLDivElement>) {
    if (!dragging.current) return;
    if (event.pointerType !== "mouse" && !moved.current) {
      event.currentTarget.setPointerCapture(event.pointerId);
    }
    moved.current = true;
    updateFrom(event.clientX);
  }

  function onPointerUp(event: ReactPointerEvent<HTMLDivElement>) {
    // A touch tap without movement positions the divider where it was tapped.
    if (dragging.current && event.pointerType !== "mouse" && !moved.current) updateFrom(event.clientX);
    dragging.current = false;
  }

  function onKeyDown(event: ReactKeyboardEvent<HTMLDivElement>) {
    const step = event.shiftKey ? 10 : 2;
    let next: number | null = null;
    switch (event.key) {
      case "ArrowLeft":
      case "ArrowDown":
        next = position - step;
        break;
      case "ArrowRight":
      case "ArrowUp":
        next = position + step;
        break;
      case "PageDown":
        next = position - 10;
        break;
      case "PageUp":
        next = position + 10;
        break;
      case "Home":
        next = 0;
        break;
      case "End":
        next = 100;
        break;
      default:
        break;
    }
    if (next === null) return;
    event.preventDefault();
    setPosition(clamp(next));
  }

  const rounded = Math.round(position);
  const sizes = "(min-width: 1024px) 60vw, 100vw";

  return (
    <div
      ref={frameRef}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={() => {
        dragging.current = false;
      }}
      className="relative aspect-square w-full cursor-ew-resize touch-pan-y overflow-hidden rounded-media bg-sand select-none sm:aspect-4/3"
    >
      <SiteImageView image={item.image} fillParent sizes={sizes} />
      <div aria-hidden="true" className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}>
        <SiteImageView image={item.image} fillParent decorative sizes={sizes} imageClassName="before-tone" />
      </div>

      <span
        aria-hidden="true"
        className="pointer-events-none absolute top-4 left-4 rounded-pill bg-navy-950/55 px-3 py-1.5 text-xs font-semibold text-ivory backdrop-blur-sm"
      >
        {beforeLabel}
      </span>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute top-4 right-4 rounded-pill bg-paper/85 px-3 py-1.5 text-xs font-semibold text-navy-900 backdrop-blur-sm"
      >
        {afterLabel}
      </span>

      <div aria-hidden="true" className="pointer-events-none absolute inset-y-0" style={{ left: `${position}%` }}>
        <div className="absolute inset-y-0 -left-px w-0.5 bg-ivory/90 shadow-soft" />
      </div>

      <div
        role="slider"
        tabIndex={0}
        aria-label={sliderLabel}
        aria-orientation="horizontal"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={rounded}
        aria-valuetext={`${beforeLabel} ${rounded} %, ${afterLabel} ${100 - rounded} %`}
        onKeyDown={onKeyDown}
        style={{ left: `${position}%` }}
        className="absolute top-1/2 grid size-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-ivory text-navy-900 shadow-float ring-1 ring-line"
      >
        <span className="flex items-center">
          <ChevronLeft aria-hidden="true" strokeWidth={2} className="-mr-1 size-4" />
          <ChevronRight aria-hidden="true" strokeWidth={2} className="-ml-1 size-4" />
        </span>
      </div>
    </div>
  );
}

export function BeforeAfterGallery({ content }: { content: BeforeAfterContent }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = content.items[activeIndex] ?? content.items[0];
  if (!active) return null;

  return (
    <div className="grid gap-6 lg:grid-cols-12 lg:gap-x-10 lg:gap-y-8">
      <div
        role="group"
        aria-label={content.casesLabel}
        className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 scrollbar-none lg:col-span-4 lg:row-start-1 lg:mx-0 lg:flex-col lg:gap-0 lg:overflow-visible lg:border-t lg:border-line lg:px-0 lg:pb-0"
      >
        {content.items.map((item, index) => {
          const selected = index === activeIndex;
          return (
            <button
              key={item.id}
              type="button"
              aria-pressed={selected}
              onClick={() => setActiveIndex(index)}
              className={cn(
                "shrink-0 rounded-pill border px-4 py-2.5 text-sm font-semibold transition-colors duration-200 ease-premium lg:rounded-none lg:border-0 lg:border-b lg:border-line lg:bg-transparent lg:px-0 lg:py-6 lg:text-left",
                selected
                  ? "border-navy-900 bg-navy-900 text-ivory lg:text-navy-900"
                  : "border-line bg-paper text-navy-700 hover:border-navy-900/30 lg:hover:text-navy-900",
              )}
            >
              <span className="flex items-center justify-between gap-4">
                <span className="lg:text-title">{item.title}</span>
                <span
                  aria-hidden="true"
                  className={cn("hidden size-2 shrink-0 rounded-full lg:block", selected ? "bg-teal-500" : "bg-line")}
                />
              </span>
              <span className="mt-2 hidden text-sm font-normal text-muted lg:block">
                {item.treatment} · {item.duration}
              </span>
            </button>
          );
        })}
      </div>

      <div className="lg:col-span-8 lg:col-start-5 lg:row-span-2 lg:row-start-1">
        <BeforeAfterSlider
          key={active.id}
          item={active}
          beforeLabel={content.beforeLabel}
          afterLabel={content.afterLabel}
          sliderLabel={content.sliderLabel}
        />
      </div>

      <div className="flex flex-col gap-4 lg:col-span-4 lg:row-start-2 lg:self-end">
        <p aria-live="polite" className="text-base text-navy-900 lg:hidden">
          <span className="font-semibold">{active.treatment}</span> · {active.duration}
        </p>
        <p className="flex gap-3 text-sm leading-relaxed text-muted">
          <Info aria-hidden="true" strokeWidth={1.75} className="mt-0.5 size-4 shrink-0 text-teal-600" />
          <span>{content.notice}</span>
        </p>
      </div>
    </div>
  );
}
