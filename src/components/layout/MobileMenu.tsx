"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef } from "react";
import { Phone, X } from "lucide-react";
import type { ClinicInfo, NavigationContent } from "@/content/types";
import { cn } from "@/lib/cn";
import { useMediaQuery } from "@/lib/useMediaQuery";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { HoursList } from "@/components/ui/InfoList";
import { Logo } from "@/components/ui/Logo";
import { EASE } from "@/components/motion/tokens";

const FOCUSABLE = "a[href], button:not([disabled])";

export function MobileMenu({
  open,
  onClose,
  clinic,
  navigation,
  active,
}: {
  open: boolean;
  onClose: (restoreFocus: boolean) => void;
  clinic: ClinicInfo;
  navigation: NavigationContent;
  active: string | null;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const desktop = useMediaQuery("(min-width: 1024px)");

  useEffect(() => {
    if (open && desktop) onClose(false);
  }, [open, desktop, onClose]);

  useEffect(() => {
    if (!open) return;
    const { body } = document;
    const previousOverflow = body.style.overflow;
    body.style.overflow = "hidden";

    const focusable = () => Array.from(panelRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE) ?? []);
    const frame = window.requestAnimationFrame(() => focusable()[0]?.focus());

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose(true);
        return;
      }
      if (event.key !== "Tab") return;
      const elements = focusable();
      if (elements.length === 0) return;
      const first = elements[0];
      const last = elements[elements.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      window.cancelAnimationFrame(frame);
      body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          key="mobile-menu"
          ref={panelRef}
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label={navigation.ariaLabel}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: EASE }}
          className="fixed inset-0 z-60 flex flex-col overflow-y-auto bg-ivory lg:hidden"
        >
          <Container className="flex h-18 shrink-0 items-center justify-between gap-4">
            <a href="#top" onClick={() => onClose(false)} className="rounded-control">
              <Logo primary={clinic.brandPrimary} secondary={clinic.brandSecondary} />
            </a>
            <button
              type="button"
              aria-label={navigation.closeMenuLabel}
              onClick={() => onClose(true)}
              className="grid size-11 place-items-center rounded-pill border border-navy-900/15 bg-paper text-navy-900 transition-colors duration-200 hover:border-navy-900/35"
            >
              <X aria-hidden="true" strokeWidth={1.75} className="size-5" />
            </button>
          </Container>

          <Container className="flex flex-1 flex-col pt-4 pb-10">
            <nav aria-label={navigation.ariaLabel}>
              <ul className="flex flex-col">
                {navigation.items.map((item, index) => {
                  const current = active === item.id;
                  return (
                    <motion.li
                      key={item.id}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, ease: EASE, delay: 0.05 + index * 0.04 }}
                      className="border-b border-line"
                    >
                      <a
                        href={`#${item.id}`}
                        onClick={() => onClose(false)}
                        aria-current={current ? "location" : undefined}
                        className="flex items-center justify-between gap-4 py-4 font-display text-display-md text-navy-900"
                      >
                        {item.label}
                        <span
                          aria-hidden="true"
                          className={cn("size-2 rounded-full", current ? "bg-teal-500" : "bg-transparent")}
                        />
                      </a>
                    </motion.li>
                  );
                })}
              </ul>
            </nav>

            <div className="mt-auto flex flex-col gap-6 pt-10">
              <ButtonLink href="#zapis" size="lg" icon="arrow" fullWidth onClick={() => onClose(false)}>
                {navigation.cta}
              </ButtonLink>
              <a
                href={clinic.phoneHref}
                className="inline-flex items-center gap-3 self-start text-lg font-semibold text-navy-900"
              >
                <Phone aria-hidden="true" strokeWidth={1.75} className="size-5 text-teal-600" />
                {clinic.phoneDisplay}
              </a>
              <HoursList hours={clinic.hours} className="text-sm text-muted" />
            </div>
          </Container>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
