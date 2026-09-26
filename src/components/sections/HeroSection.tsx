import type { HeroContent } from "@/content/types";
import { cn } from "@/lib/cn";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { StatFigure } from "@/components/ui/StatFigure";
import { SiteImageView } from "@/components/media/SiteImageView";
import { PageIntroImage, PageIntroItem } from "@/components/motion/PageIntro";
import { ParallaxImage } from "@/components/motion/ParallaxImage";
import { HeroTrustCard } from "./HeroTrustCard";

const cardPositions = ["top-14 -left-8 xl:-left-12", "bottom-24 -left-8 xl:-left-12", "-bottom-6 right-8"];

export function HeroSection({ hero }: { hero: HeroContent }) {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden bg-ivory bg-hero-tint pt-28 pb-18 md:pt-36 md:pb-24 lg:pt-40 lg:pb-32"
    >
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-6 xl:col-span-5">
            <PageIntroItem>
              <Eyebrow>{hero.eyebrow}</Eyebrow>
            </PageIntroItem>
            <PageIntroItem delay={0.08}>
              <h1 id="hero-title" className="mt-6 font-display text-display-xl text-navy-900">
                {hero.title}
              </h1>
            </PageIntroItem>
            <PageIntroItem delay={0.16}>
              <p className="mt-6 max-w-xl text-lead text-muted">{hero.lead}</p>
            </PageIntroItem>
            <PageIntroItem delay={0.26} className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
              <ButtonLink href="#zapis" size="lg" icon="arrow">
                {hero.primaryCta}
              </ButtonLink>
              <ButtonLink href="#uslugi" size="lg" variant="secondary">
                {hero.secondaryCta}
              </ButtonLink>
            </PageIntroItem>
          </div>

          <div className="relative lg:col-span-6 xl:col-span-7">
            <div className="relative overflow-hidden rounded-media">
              <PageIntroImage>
                <ParallaxImage className="aspect-4/5 sm:aspect-5/4 lg:aspect-auto lg:h-160 xl:h-176">
                  <SiteImageView
                    image={hero.image}
                    fillParent
                    priority
                    sizes="(min-width: 1280px) 56vw, (min-width: 1024px) 48vw, 100vw"
                  />
                </ParallaxImage>
              </PageIntroImage>
            </div>

            <div className="hidden lg:block">
              {hero.trustCards.map((stat, index) => (
                <PageIntroItem
                  key={stat.value}
                  delay={0.45 + index * 0.07}
                  className={cn("absolute", cardPositions[index])}
                >
                  <HeroTrustCard stat={stat} />
                </PageIntroItem>
              ))}
            </div>

            <PageIntroItem delay={0.45} className="relative z-10 mx-3 -mt-10 sm:mx-8 lg:hidden">
              <div className="grid grid-cols-3 divide-x divide-line rounded-card bg-paper/90 shadow-float ring-1 ring-line backdrop-blur-md">
                {hero.trustCards.map((stat) => (
                  <div key={stat.value} className="flex justify-center px-2 py-4 text-center sm:px-6 sm:py-5">
                    <StatFigure value={stat.value} caption={stat.caption} className="items-center" />
                  </div>
                ))}
              </div>
            </PageIntroItem>
          </div>
        </div>
      </Container>
    </section>
  );
}
