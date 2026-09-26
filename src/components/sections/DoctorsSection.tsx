import type { Doctor, DoctorsContent } from "@/content/types";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SnapRail } from "@/components/ui/SnapRail";
import { SiteImageView } from "@/components/media/SiteImageView";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerList, StaggerListItem } from "@/components/motion/Stagger";
import { DoctorCard } from "./DoctorCard";

function FeaturedDoctor({ doctor }: { doctor: Doctor }) {
  return (
    <Reveal>
      <article className="grid overflow-hidden rounded-card border border-line bg-ivory md:grid-cols-12">
        <div className="relative aspect-4/5 md:col-span-5 lg:col-span-4">
          <SiteImageView image={doctor.portrait} fillParent sizes="(min-width: 1024px) 30vw, 40vw" />
        </div>
        <div className="flex flex-col justify-between gap-10 p-8 md:col-span-7 lg:col-span-8 lg:p-14">
          <p className="text-eyebrow font-semibold text-teal-600 uppercase">{doctor.role}</p>
          <div>
            <h3 className="font-display text-display-lg text-navy-900">{doctor.name}</h3>
            <p className="mt-6 max-w-xl text-lead text-muted">{doctor.bio}</p>
            <p className="mt-8 inline-flex rounded-pill bg-teal-50 px-4 py-1.5 text-sm font-semibold text-teal-600">
              {doctor.experience}
            </p>
          </div>
        </div>
      </article>
    </Reveal>
  );
}

export function DoctorsSection({ doctors }: { doctors: DoctorsContent }) {
  const [featured, ...others] = doctors.items;
  return (
    <Section id="vrachi" tone="paper" labelledBy="doctors-title">
      <Container>
        <SectionHeader id="doctors-title" eyebrow={doctors.eyebrow} title={doctors.title} lead={doctors.lead} />

        <div className="mt-14 hidden md:block lg:mt-20">
          {featured ? <FeaturedDoctor doctor={featured} /> : null}
          <StaggerList className="mt-12 grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4">
            {others.map((doctor) => (
              <StaggerListItem key={doctor.id}>
                <DoctorCard doctor={doctor} sizes="(min-width: 1024px) 22vw, 45vw" />
              </StaggerListItem>
            ))}
          </StaggerList>
        </div>

        <div className="mt-12 md:hidden">
          <SnapRail
            label={doctors.rail.label}
            previousLabel={doctors.rail.previous}
            nextLabel={doctors.rail.next}
            positionTemplate={doctors.rail.position}
          >
            {doctors.items.map((doctor) => (
              <DoctorCard key={doctor.id} doctor={doctor} sizes="80vw" />
            ))}
          </SnapRail>
        </div>
      </Container>
    </Section>
  );
}
