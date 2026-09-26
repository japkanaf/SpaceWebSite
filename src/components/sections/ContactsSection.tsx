import { Clock, Mail, MapPin, Phone } from "lucide-react";
import type { ClinicInfo, ContactsContent } from "@/content/types";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { HoursList, InfoRow } from "@/components/ui/InfoList";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/motion/Reveal";
import { ContactsMap } from "./ContactsMap";

const iconClass = "size-5";
const linkClass = "transition-colors duration-200 hover:text-teal-600";

export function ContactsSection({ contacts, clinic }: { contacts: ContactsContent; clinic: ClinicInfo }) {
  return (
    <Section id="kontakty" tone="paper" labelledBy="contacts-title">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10 xl:gap-16">
          <div className="lg:col-span-5">
            <SectionHeader id="contacts-title" eyebrow={contacts.eyebrow} title={contacts.title} lead={contacts.lead} />
            <Reveal delay={0.1} className="mt-10">
              <ul className="divide-y divide-line border-y border-line">
                <InfoRow icon={<MapPin strokeWidth={1.75} className={iconClass} />} label={contacts.labels.address}>
                  <p>{clinic.address}</p>
                  <p className="mt-1 text-sm font-normal text-muted">{clinic.metro}</p>
                </InfoRow>
                <InfoRow icon={<Phone strokeWidth={1.75} className={iconClass} />} label={contacts.labels.phone}>
                  <a href={clinic.phoneHref} className={`text-lg font-semibold whitespace-nowrap ${linkClass}`}>
                    {clinic.phoneDisplay}
                  </a>
                </InfoRow>
                <InfoRow icon={<Mail strokeWidth={1.75} className={iconClass} />} label={contacts.labels.email}>
                  <a href={`mailto:${clinic.email}`} className={`break-all ${linkClass}`}>
                    {clinic.email}
                  </a>
                </InfoRow>
                <InfoRow icon={<Clock strokeWidth={1.75} className={iconClass} />} label={contacts.labels.hours}>
                  <HoursList hours={clinic.hours} />
                </InfoRow>
              </ul>
              <ButtonLink
                href={clinic.mapLinkUrl}
                target="_blank"
                rel="noopener noreferrer"
                variant="secondary"
                size="lg"
                icon="arrow-up-right"
                className="mt-8 w-full sm:w-auto"
              >
                {contacts.mapLinkLabel}
              </ButtonLink>
            </Reveal>
          </div>

          <Reveal delay={0.15} amount={0.15} className="lg:col-span-7">
            <ContactsMap
              embedUrl={clinic.mapEmbedUrl}
              title={contacts.mapTitle}
              loadingText={contacts.mapLoading}
              fallbackText={contacts.mapFallback}
              linkUrl={clinic.mapLinkUrl}
              linkLabel={contacts.mapLinkLabel}
            />
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
