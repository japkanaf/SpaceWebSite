import { siteContent as content } from "@/content/site";
import { BookingProvider } from "@/components/booking/BookingProvider";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { AboutSection } from "@/components/sections/AboutSection";
import { AdvantagesSection } from "@/components/sections/AdvantagesSection";
import { BeforeAfterSection } from "@/components/sections/BeforeAfterSection";
import { BookingCtaSection } from "@/components/sections/BookingCtaSection";
import { BookingSection } from "@/components/sections/BookingSection";
import { ContactsSection } from "@/components/sections/ContactsSection";
import { DoctorsSection } from "@/components/sections/DoctorsSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";

export const dynamic = "force-static";

export default function HomePage() {
  const allowedServices = content.bookingForm.serviceOptions.map((option) => option.value);

  return (
    <>
      <SiteHeader clinic={content.clinic} navigation={content.navigation} />
      <BookingProvider allowedServices={allowedServices}>
        <main id="main">
          <HeroSection hero={content.hero} />
          <ServicesSection services={content.services} />
          <AboutSection about={content.about} />
          <DoctorsSection doctors={content.doctors} />
          <AdvantagesSection advantages={content.advantages} />
          <BeforeAfterSection content={content.beforeAfter} />
          <TestimonialsSection content={content.testimonials} />
          <BookingCtaSection content={content.bookingCta} clinic={content.clinic} />
          <BookingSection form={content.bookingForm} clinic={content.clinic} labels={content.contacts.labels} />
          <ContactsSection contacts={content.contacts} clinic={content.clinic} />
        </main>
      </BookingProvider>
      <SiteFooter
        clinic={content.clinic}
        footer={content.footer}
        navigation={content.navigation}
        services={content.services.items}
      />
    </>
  );
}
