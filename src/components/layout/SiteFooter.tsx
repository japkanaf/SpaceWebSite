import { ArrowUp } from "lucide-react";
import type { ClinicInfo, FooterContent, NavigationContent, Service } from "@/content/types";
import { Container } from "@/components/ui/Container";
import { HoursList } from "@/components/ui/InfoList";
import { Logo } from "@/components/ui/Logo";
import { SocialIcon } from "@/components/icons/SocialIcons";

const linkClass = "text-ivory/70 transition-colors duration-200 hover:text-ivory";
const headingClass = "text-eyebrow font-semibold text-ivory uppercase";

export function SiteFooter({
  clinic,
  footer,
  navigation,
  services,
}: {
  clinic: ClinicInfo;
  footer: FooterContent;
  navigation: NavigationContent;
  services: Service[];
}) {
  return (
    <footer className="bg-navy-950 text-ivory/70">
      <Container className="py-16 md:py-20 lg:py-24">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-12 lg:gap-10">
          <div className="sm:col-span-2 lg:col-span-4">
            <a href="#top" className="inline-block rounded-control">
              <Logo primary={clinic.brandPrimary} secondary={clinic.brandSecondary} tone="dark" />
            </a>
            <p className="mt-6 max-w-xs text-base leading-relaxed">{footer.descriptor}</p>
            {clinic.social.length > 0 ? (
              <ul className="mt-8 flex gap-3">
                {clinic.social.map((link) => (
                  <li key={link.network}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={link.label}
                      className="grid size-11 place-items-center rounded-full border border-white/15 text-ivory transition duration-200 ease-premium hover:border-white/40 hover:bg-white/5"
                    >
                      <SocialIcon network={link.network} className="size-5" />
                    </a>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>

          <nav aria-label={footer.columns.navigation} className="lg:col-span-2">
            <p className={headingClass}>{footer.columns.navigation}</p>
            <ul className="mt-6 flex flex-col gap-3">
              {navigation.items.map((item) => (
                <li key={item.id}>
                  <a href={`#${item.id}`} className={linkClass}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {services.length > 0 ? (
            <div className="lg:col-span-3">
              <p className={headingClass}>{footer.columns.services}</p>
              <ul className="mt-6 flex flex-col gap-3">
                {services.map((service) => (
                  <li key={service.id}>
                    <a href={`#usluga-${service.id}`} className={linkClass}>
                      {service.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          <div className="sm:col-span-2 lg:col-span-3">
            <p className={headingClass}>{footer.columns.contacts}</p>
            <address className="mt-6 flex flex-col gap-3 not-italic">
              <span className="break-words">{clinic.address}</span>
              <a href={clinic.phoneHref} className="font-semibold whitespace-nowrap text-ivory transition-colors hover:text-teal-500">
                {clinic.phoneDisplay}
              </a>
              <a href={`mailto:${clinic.email}`} className={`${linkClass} break-all`}>
                {clinic.email}
              </a>
            </address>
            <HoursList hours={clinic.hours} tone="dark" className="mt-5 text-sm" />
          </div>
        </div>

        <div className="mt-16 border-t border-line-dark pt-10 lg:mt-20">
          <p className="max-w-3xl font-display text-title text-ivory/90 md:text-display-md">{footer.medicalNotice}</p>
          <div className="mt-10 flex flex-col gap-6 text-sm md:flex-row md:items-end md:justify-between">
            <div className="flex flex-col gap-1.5">
              <p className="break-words">{footer.legalLine}</p>
              <p>{footer.copyright}</p>
            </div>
            <a
              href="#top"
              aria-label={footer.backToTopLabel}
              className="grid size-11 shrink-0 place-items-center rounded-full border border-white/15 text-ivory transition duration-200 ease-premium hover:border-white/40 hover:bg-white/5"
            >
              <ArrowUp aria-hidden="true" strokeWidth={1.75} className="size-5" />
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
