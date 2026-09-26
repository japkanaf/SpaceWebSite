import type { TestimonialsContent } from "@/content/types";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SnapRail } from "@/components/ui/SnapRail";
import { StaggerList, StaggerListItem } from "@/components/motion/Stagger";
import { TestimonialCard } from "./TestimonialCard";

export function TestimonialsSection({ content }: { content: TestimonialsContent }) {
  const labelFor = (rating: number) => content.ratingLabel.replace("{N}", String(rating));
  return (
    <Section id="otzyvy" tone="sand" labelledBy="testimonials-title">
      <Container>
        <SectionHeader id="testimonials-title" eyebrow={content.eyebrow} title={content.title} lead={content.lead} />

        <StaggerList className="mt-14 hidden columns-2 gap-5 md:block lg:mt-20 lg:columns-3 lg:gap-6">
          {content.items.map((testimonial) => (
            <StaggerListItem key={testimonial.id} className="mb-5 break-inside-avoid lg:mb-6">
              <TestimonialCard testimonial={testimonial} ratingLabel={labelFor(testimonial.rating)} />
            </StaggerListItem>
          ))}
        </StaggerList>

        <div className="mt-12 md:hidden">
          <SnapRail
            label={content.rail.label}
            previousLabel={content.rail.previous}
            nextLabel={content.rail.next}
            positionTemplate={content.rail.position}
            itemClassName="w-5/6"
          >
            {content.items.map((testimonial) => (
              <TestimonialCard
                key={testimonial.id}
                testimonial={testimonial}
                ratingLabel={labelFor(testimonial.rating)}
              />
            ))}
          </SnapRail>
        </div>
      </Container>
    </Section>
  );
}
