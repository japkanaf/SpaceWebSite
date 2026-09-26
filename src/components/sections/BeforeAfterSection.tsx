import type { BeforeAfterContent } from "@/content/types";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/motion/Reveal";
import { BeforeAfterGallery } from "./BeforeAfterGallery";

export function BeforeAfterSection({ content }: { content: BeforeAfterContent }) {
  return (
    <Section id="do-i-posle" tone="ivory" labelledBy="before-after-title">
      <Container>
        <SectionHeader id="before-after-title" eyebrow={content.eyebrow} title={content.title} lead={content.lead} />
        <Reveal delay={0.1} amount={0.15} className="mt-12 lg:mt-16">
          <BeforeAfterGallery content={content} />
        </Reveal>
      </Container>
    </Section>
  );
}
