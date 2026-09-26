import type { AdvantagesContent } from "@/content/types";
import { Container } from "@/components/ui/Container";
import { IconTile } from "@/components/ui/IconTile";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { StaggerList, StaggerListItem } from "@/components/motion/Stagger";

/** Numbered editorial list on navy: deliberately different from the service cards. */
export function AdvantagesSection({ advantages }: { advantages: AdvantagesContent }) {
  return (
    <Section id="preimushchestva" tone="navy" labelledBy="advantages-title">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <SectionHeader id="advantages-title" eyebrow={advantages.eyebrow} title={advantages.title} tone="dark" />
            </div>
          </div>
          <StaggerList className="grid gap-x-10 sm:grid-cols-2 lg:col-span-8">
            {advantages.items.map((advantage, index) => (
              <StaggerListItem key={advantage.id} className="border-t border-line-dark py-8 md:py-10">
                <div className="flex items-center justify-between gap-4">
                  <span className="font-display text-title text-teal-500 tabular-nums">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <IconTile icon={advantage.icon} tone="dark" />
                </div>
                <h3 className="mt-8 text-title font-semibold text-ivory">{advantage.title}</h3>
                <p className="mt-3 max-w-sm text-base leading-relaxed text-ivory/70">{advantage.description}</p>
              </StaggerListItem>
            ))}
          </StaggerList>
        </div>
      </Container>
    </Section>
  );
}
