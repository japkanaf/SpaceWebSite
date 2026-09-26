"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { CalendarCheck, Menu, Phone } from "lucide-react";
import type { ClinicInfo, NavigationContent } from "@/content/types";
import { cn } from "@/lib/cn";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { useActiveSection } from "@/components/motion/useActiveSection";
import { useScrolled } from "@/components/motion/useScrolled";
import { MobileMenu } from "./MobileMenu";

export function SiteHeader({ clinic, navigation }: { clinic: ClinicInfo; navigation: NavigationContent }) {
  const headerRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const scrolled = useScrolled(24);
  const active = useActiveSection(navigation.items.map((item) => item.id));

  // Publish the live header height so anchored scrolling lands below it.
  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;
    const root = document.documentElement;
    const write = () => root.style.setProperty("--header-height", `${header.offsetHeight}px`);
    write();
    if (typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver(write);
    observer.observe(header);
    return () => observer.disconnect();
  }, []);

  const closeMenu = useCallback((restoreFocus: boolean) => {
    setMenuOpen(false);
    if (restoreFocus) window.requestAnimationFrame(() => toggleRef.current?.focus());
  }, []);

  return (
    <>
      <header
        ref={headerRef}
        className={cn(
          "fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,box-shadow] duration-300 ease-premium",
          scrolled ? "border-line bg-ivory/85 shadow-soft backdrop-blur-xl" : "border-transparent bg-transparent",
        )}
      >
        <Container
          className={cn(
            "flex items-center justify-between gap-2 transition-[height] duration-300 ease-premium sm:gap-6",
            scrolled ? "h-16" : "h-18 lg:h-20",
          )}
        >
          <a href="#top" className="shrink-0 rounded-control">
            <Logo primary={clinic.brandPrimary} secondary={clinic.brandSecondary} />
          </a>

          <nav aria-label={navigation.ariaLabel} className="hidden lg:block">
            <ul className="flex items-center gap-1 xl:gap-2">
              {navigation.items.map((item) => {
                const current = active === item.id;
                return (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      aria-current={current ? "location" : undefined}
                      className={cn(
                        "relative inline-flex min-h-11 items-center rounded-pill px-4 text-sm font-medium transition-colors duration-200",
                        current ? "text-navy-900" : "text-navy-700 hover:text-navy-900",
                      )}
                    >
                      {item.label}
                      <span
                        aria-hidden="true"
                        className={cn(
                          "absolute bottom-1.5 left-1/2 size-1 -translate-x-1/2 rounded-full bg-teal-500 transition-opacity duration-200",
                          current ? "opacity-100" : "opacity-0",
                        )}
                      />
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href={clinic.phoneHref}
              className="hidden items-center gap-2 rounded-control px-2 text-sm font-semibold whitespace-nowrap text-navy-900 transition-colors duration-200 hover:text-teal-600 xl:inline-flex"
            >
              <Phone aria-hidden="true" strokeWidth={1.75} className="size-4 text-teal-600" />
              {clinic.phoneDisplay}
            </a>
            <div className="hidden sm:block">
              <ButtonLink href="#zapis">{navigation.cta}</ButtonLink>
            </div>
            <a
              href="#zapis"
              aria-label={navigation.cta}
              className="grid size-11 place-items-center rounded-pill bg-navy-900 text-ivory transition duration-200 ease-premium active:scale-98 sm:hidden"
            >
              <CalendarCheck aria-hidden="true" strokeWidth={1.75} className="size-5" />
            </a>
            <button
              ref={toggleRef}
              type="button"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? navigation.closeMenuLabel : navigation.openMenuLabel}
              onClick={() => setMenuOpen(true)}
              className="grid size-11 place-items-center rounded-pill border border-navy-900/15 bg-paper/60 text-navy-900 transition-colors duration-200 hover:border-navy-900/35 lg:hidden"
            >
              <Menu aria-hidden="true" strokeWidth={1.75} className="size-5" />
            </button>
          </div>
        </Container>
      </header>

      <MobileMenu open={menuOpen} onClose={closeMenu} clinic={clinic} navigation={navigation} active={active} />
    </>
  );
}
