import type { ServicesContent } from "@/content/types";
import { cn } from "@/lib/cn";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { StaggerList, StaggerListItem } from "@/components/motion/Stagger";
import { ServiceCard, type ServiceCardVariant } from "./ServiceCard";

/** Editorial grid: two wide cards (one dark) break the rhythm of a uniform 3×2 grid. */
function variantFor(index: number, total: number): ServiceCardVariant {
  if (index === 0) return "featured";
  if (index === total - 1) return "wide";
  return "default";
}

export function ServicesSection({ services }: { services: ServicesContent }) {
  const total = services.items.length;
  return (
    <Section id="uslugi" tone="paper" labelledBy="services-title">
      <Container>
        <SectionHeader id="services-title" eyebrow={services.eyebrow} title={services.title} lead={services.lead} />
        <StaggerList className="mt-12 grid gap-4 md:mt-16 md:grid-cols-2 md:gap-5 lg:grid-cols-4">
          {services.items.map((service, index) => {
            const variant = variantFor(index, total);
            return (
              <StaggerListItem key={service.id} className={cn(variant !== "default" && "md:col-span-2")}>
                <ServiceCard service={service} actionLabel={services.actionLabel} variant={variant} />
              </StaggerListItem>
            );
          })}
        </StaggerList>
      </Container>
    </Section>
  );
}
