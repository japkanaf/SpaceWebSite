"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, LoaderCircle, MapPin } from "lucide-react";
import { cn } from "@/lib/cn";

type MapState = "idle" | "loading" | "loaded" | "failed";

const LOAD_TIMEOUT_MS = 15000;

/**
 * Google map that loads only when the section approaches the viewport.
 * Google's embed uses cooperative gestures on touch screens, so one-finger
 * swipes keep scrolling the page.
 */
export function ContactsMap({
  embedUrl,
  title,
  loadingText,
  fallbackText,
  linkUrl,
  linkLabel,
}: {
  embedUrl: string;
  title: string;
  loadingText: string;
  fallbackText: string;
  linkUrl: string;
  linkLabel: string;
}) {
  const frameRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [state, setState] = useState<MapState>("idle");

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;
    if (typeof IntersectionObserver === "undefined") {
      setShouldLoad(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "400px 0px" },
    );
    observer.observe(frame);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!shouldLoad) return;
    if (typeof navigator !== "undefined" && navigator.onLine === false) {
      setState("failed");
      return;
    }
    setState((current) => (current === "loaded" ? current : "loading"));
    const timer = window.setTimeout(() => {
      setState((current) => (current === "loaded" ? current : "failed"));
    }, LOAD_TIMEOUT_MS);
    return () => window.clearTimeout(timer);
  }, [shouldLoad]);

  return (
    <div
      ref={frameRef}
      className="relative aspect-4/3 w-full overflow-hidden rounded-media border border-line bg-sand lg:aspect-auto lg:h-full lg:min-h-120"
    >
      {shouldLoad && state !== "failed" ? (
        <iframe
          src={embedUrl}
          title={title}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
          onLoad={() => setState("loaded")}
          className={cn(
            "map-tone absolute inset-0 size-full border-0 transition-opacity duration-500",
            state === "loaded" ? "opacity-100" : "opacity-0",
          )}
        />
      ) : null}

      {state === "idle" || state === "loading" ? (
        <div className="absolute inset-0 grid place-items-center">
          <p className="flex items-center gap-3 text-sm font-medium text-muted">
            <LoaderCircle aria-hidden="true" strokeWidth={1.75} className="size-5 animate-spin text-teal-600" />
            {loadingText}
          </p>
        </div>
      ) : null}

      {state === "failed" ? (
        <div role="status" className="absolute inset-0 flex flex-col items-center justify-center gap-5 p-8 text-center">
          <span className="grid size-12 place-items-center rounded-full bg-paper text-teal-600 shadow-soft">
            <MapPin aria-hidden="true" strokeWidth={1.75} className="size-5" />
          </span>
          <p className="max-w-xs text-base text-navy-900">{fallbackText}</p>
          <a
            href={linkUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-teal-600 underline decoration-teal-600/30 underline-offset-4 hover:decoration-teal-600"
          >
            {linkLabel}
            <ArrowUpRight aria-hidden="true" strokeWidth={1.75} className="size-4" />
          </a>
        </div>
      ) : null}
    </div>
  );
}
