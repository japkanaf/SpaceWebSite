import type { AboutContent } from "@/content/types";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { StatFigure } from "@/components/ui/StatFigure";
import { SiteImageView } from "@/components/media/SiteImageView";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { ParallaxImage } from "@/components/motion/ParallaxImage";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerList, StaggerListItem } from "@/components/motion/Stagger";

export function AboutSection({ about }: { about: AboutContent }) {
  const [first, ...rest] = about.paragraphs;
  return (
    <Section id="o-klinike" tone="ivory" labelledBy="about-title">
      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="order-2 lg:order-2 lg:col-span-6 xl:col-span-5 xl:col-start-8">
            <SectionHeader id="about-title" eyebrow={about.eyebrow} title={about.title} />
            <Reveal delay={0.1} className="mt-8">
              {first ? <p className="text-lead text-ink">{first}</p> : null}
              {rest.map((paragraph) => (
                <p key={paragraph} className="mt-5 text-base leading-relaxed text-muted">
                  {paragraph}
                </p>
              ))}
            </Reveal>
            <Reveal delay={0.15}>
              <figure className="mt-10 border-l-2 border-teal-500 pl-6">
                <blockquote className="font-display text-title leading-snug text-navy-900 md:text-2xl">
                  {about.quote.text}
                </blockquote>
                <figcaption className="mt-4 text-sm font-medium text-muted">{about.quote.author}</figcaption>
              </figure>
            </Reveal>
            <StaggerList className="mt-12 grid grid-cols-3 gap-4 border-t border-line pt-8 sm:gap-8">
              {about.stats.map((stat) => (
                <StaggerListItem key={stat.value}>
                  <StatFigure value={stat.value} caption={stat.caption} size="lg" />
                </StaggerListItem>
              ))}
            </StaggerList>
          </div>

          <div className="relative order-1 pb-14 sm:pb-16 lg:order-1 lg:col-span-6 lg:row-start-1 lg:pb-0">
            <ImageReveal className="rounded-media">
              <ParallaxImage className="aspect-4/5 rounded-media sm:aspect-5/4 lg:aspect-4/5">
                <SiteImageView image={about.mainImage} fillParent sizes="(min-width: 1024px) 45vw, 100vw" />
              </ParallaxImage>
            </ImageReveal>
            <Reveal
              delay={0.25}
              className="absolute right-3 bottom-0 w-5/12 sm:right-6 lg:-right-8 lg:-bottom-12 xl:-right-14"
            >
              <div className="relative aspect-square overflow-hidden rounded-card border-6 border-ivory shadow-lift">
                <SiteImageView image={about.supportImage} fillParent sizes="(min-width: 1024px) 20vw, 40vw" />
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}
