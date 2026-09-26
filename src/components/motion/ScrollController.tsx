"use client";

import { useEffect } from "react";

function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Current header height, written by SiteHeader into --header-height. */
export function getHeaderOffset(): number {
  const raw = getComputedStyle(document.documentElement).getPropertyValue("--header-height");
  const value = Number.parseFloat(raw);
  return Number.isFinite(value) ? value : 72;
}

export function scrollToTop(): void {
  if (typeof window === "undefined") return;
  window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? "auto" : "smooth" });
  window.history.replaceState(null, "", window.location.pathname + window.location.search);
}

/**
 * Smooth-scrolls to a section below the sticky header, updates the hash without a
 * history entry, and moves keyboard focus to the section heading.
 */
export function scrollToSection(id: string): void {
  if (typeof window === "undefined") return;
  const section = document.getElementById(id);
  if (!section) return;

  const top = section.getBoundingClientRect().top + window.scrollY - getHeaderOffset();
  window.scrollTo({ top: Math.max(0, top), behavior: prefersReducedMotion() ? "auto" : "smooth" });
  window.history.replaceState(null, "", `#${id}`);

  const heading = section.querySelector<HTMLElement>("h1, h2") ?? section;
  if (!heading.hasAttribute("tabindex")) heading.setAttribute("tabindex", "-1");
  heading.focus({ preventScroll: true });
}

/** Intercepts same-page anchor clicks so every link gets the controlled scroll. */
export function ScrollController() {
  useEffect(() => {
    function onClick(event: MouseEvent) {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const target = event.target instanceof Element ? event.target : null;
      const anchor = target?.closest<HTMLAnchorElement>("a[href^='#']");
      if (!anchor) return;

      const id = decodeURIComponent((anchor.getAttribute("href") ?? "").slice(1));
      if (id === "" || id === "top") {
        event.preventDefault();
        scrollToTop();
        return;
      }
      if (!document.getElementById(id)) return;
      event.preventDefault();
      scrollToSection(id);
    }

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
