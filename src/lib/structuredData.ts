import type { ClinicInfo, MetaContent } from "@/content/types";
import { siteUrl } from "./siteUrl";

/** schema.org Dentist description of the clinic for search engines. */
export function buildDentistJsonLd(clinic: ClinicInfo, meta: MetaContent) {
  return {
    "@context": "https://schema.org",
    "@type": "Dentist",
    name: clinic.name,
    description: meta.description,
    url: siteUrl,
    image: meta.ogImage,
    telephone: clinic.phoneHref.replace("tel:", ""),
    email: clinic.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: clinic.street,
      addressLocality: clinic.city,
      addressCountry: "RU",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "20:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "10:00",
        closes: "16:00",
      },
    ],
    sameAs: clinic.social.map((link) => link.href),
  };
}
