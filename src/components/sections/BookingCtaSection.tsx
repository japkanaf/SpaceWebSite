import type { BookingCtaContent, ClinicInfo } from "@/content/types";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SiteImageView } from "@/components/media/SiteImageView";
import { Reveal } from "@/components/motion/Reveal";

export function BookingCtaSection({ content, clinic }: { content: BookingCtaContent; clinic: ClinicInfo }) {
  return (
    <section aria-labelledby="booking-cta-title" className="bg-paper py-16 md:py-20 lg:py-24">
      <Container>
        <Reveal amount={0.2}>
          <div className="relative isolate grid overflow-hidden rounded-media bg-navy-900 bg-cta-tint text-ivory md:grid-cols-12">
            <div className="flex flex-col justify-center px-6 py-14 sm:px-10 md:col-span-7 md:py-16 lg:px-16 lg:py-24">
              <h2 id="booking-cta-title" className="font-display text-display-lg text-ivory">
                {content.title}
              </h2>
              <p className="mt-6 max-w-lg text-lead text-ivory/70">{content.lead}</p>
              <div className="mt-10 flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-8">
                <ButtonLink href="#zapis" variant="onDark" size="lg" icon="arrow">
                  {content.cta}
                </ButtonLink>
                <p className="text-base text-ivory/70">
                  {content.phoneLead}{" "}
                  <a
                    href={clinic.phoneHref}
                    className="font-semibold whitespace-nowrap text-ivory underline decoration-white/30 underline-offset-4 transition-colors duration-200 hover:decoration-white"
                  >
                    {clinic.phoneDisplay}
                  </a>
                </p>
              </div>
            </div>
            <div className="relative hidden md:col-span-5 md:block">
              <SiteImageView image={content.image} fillParent sizes="(min-width: 1024px) 34vw, 40vw" />
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
