import type { Doctor } from "@/content/types";
import { SiteImageView } from "@/components/media/SiteImageView";

/** Doctor profile with a 4:5 portrait. All information is visible without hover. */
export function DoctorCard({ doctor, sizes }: { doctor: Doctor; sizes: string }) {
  return (
    <article className="group flex h-full flex-col">
      <div className="relative aspect-4/5 overflow-hidden rounded-card bg-sand">
        <SiteImageView
          image={doctor.portrait}
          fillParent
          sizes={sizes}
          imageClassName="transition-transform duration-700 ease-premium group-hover:scale-103"
        />
      </div>
      <div className="flex flex-1 flex-col pt-6">
        <h3 className="text-title font-semibold text-navy-900">{doctor.name}</h3>
        <p className="mt-1 text-sm font-medium text-navy-700">{doctor.role}</p>
        <p className="mt-4 inline-flex self-start rounded-pill bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-600">
          {doctor.experience}
        </p>
        <p className="mt-4 text-base leading-relaxed text-muted">{doctor.bio}</p>
      </div>
    </article>
  );
}
