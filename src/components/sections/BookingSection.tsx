import { Clock, MapPin, Phone } from "lucide-react";
import type { BookingFormCopy, ClinicInfo, ContactsContent } from "@/content/types";
import { Container } from "@/components/ui/Container";
import { HoursList, InfoRow } from "@/components/ui/InfoList";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/motion/Reveal";
import { BookingForm } from "@/components/booking/BookingForm";

const iconClass = "size-5";

export function BookingSection({
  form,
  clinic,
  labels,
}: {
  form: BookingFormCopy;
  clinic: ClinicInfo;
  labels: ContactsContent["labels"];
}) {
  return (
    <Section id="zapis" tone="ivory" labelledBy="booking-title">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10 xl:gap-16">
          <div className="lg:col-span-5">
            <SectionHeader id="booking-title" eyebrow={form.eyebrow} title={form.title} lead={form.lead} />
            <Reveal delay={0.1} className="mt-12 hidden lg:block">
              <ul className="divide-y divide-line border-y border-line">
                <InfoRow icon={<Phone strokeWidth={1.75} className={iconClass} />} label={labels.phone}>
                  <a
                    href={clinic.phoneHref}
                    className="font-display text-title whitespace-nowrap text-navy-900 transition-colors duration-200 hover:text-teal-600"
                  >
                    {clinic.phoneDisplay}
                  </a>
                </InfoRow>
                <InfoRow icon={<Clock strokeWidth={1.75} className={iconClass} />} label={labels.hours}>
                  <HoursList hours={clinic.hours} />
                </InfoRow>
                <InfoRow icon={<MapPin strokeWidth={1.75} className={iconClass} />} label={labels.address}>
                  {clinic.address}
                </InfoRow>
              </ul>
            </Reveal>
          </div>
          <div className="lg:col-span-7">
            <BookingForm copy={form} />
          </div>
        </div>
      </Container>
    </Section>
  );
}
