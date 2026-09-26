export type SectionId =
  | "uslugi"
  | "o-klinike"
  | "vrachi"
  | "preimushchestva"
  | "do-i-posle"
  | "otzyvy"
  | "zapis"
  | "kontakty";

export type SocialNetwork = "telegram" | "vk" | "whatsapp";

export type IconKey =
  | "tooth"
  | "implant"
  | "aligner"
  | "gem"
  | "sparkles"
  | "droplets"
  | "microscope"
  | "award"
  | "heart-handshake"
  | "armchair"
  | "shield-check"
  | "scan-line";

export type ServiceId = "treatment" | "implants" | "aesthetic" | "whitening" | "orthodontics" | "hygiene";
export type BookingServiceValue = ServiceId | "consultation";
export type BookingField = "name" | "phone" | "service" | "date" | "comment";
export type BookingErrorCode =
  | "nameRequired"
  | "nameTooShort"
  | "nameInvalidCharacters"
  | "nameTooLong"
  | "phoneRequired"
  | "phoneInvalid"
  | "serviceRequired"
  | "dateRequired"
  | "datePast"
  | "dateTooFar"
  | "dateSunday"
  | "commentTooLong";

export interface ImageCredit {
  author: string;
  source: "Unsplash" | "Pexels";
  url: string;
}

export interface SiteImage {
  src: string;
  alt: string;
  /** CSS object-position used to keep the subject in frame. */
  position?: string;
  credit: ImageCredit;
}

export interface NavItem {
  id: SectionId;
  label: string;
}

export interface TrustStat {
  value: string;
  caption: string;
}

export interface OpeningHours {
  days: string;
  time: string;
  closed?: boolean;
}

export interface SocialLink {
  network: SocialNetwork;
  label: string;
  href: string;
}

export interface ClinicInfo {
  name: string;
  brandPrimary: string;
  brandSecondary: string;
  descriptor: string;
  legalName: string;
  licence: string;
  city: string;
  street: string;
  address: string;
  metro: string;
  phoneDisplay: string;
  phoneHref: string;
  email: string;
  hours: OpeningHours[];
  social: SocialLink[];
  mapEmbedUrl: string;
  mapLinkUrl: string;
}

export interface MetaContent {
  title: string;
  description: string;
  ogImage: string;
  ogImageAlt: string;
}

export interface NavigationContent {
  ariaLabel: string;
  items: NavItem[];
  cta: string;
  openMenuLabel: string;
  closeMenuLabel: string;
}

export interface HeroContent {
  eyebrow: string;
  title: string;
  lead: string;
  primaryCta: string;
  secondaryCta: string;
  image: SiteImage;
  trustCards: TrustStat[];
}

export interface Service {
  id: ServiceId;
  title: string;
  description: string;
  icon: IconKey;
}

export interface ServicesContent {
  eyebrow: string;
  title: string;
  lead: string;
  actionLabel: string;
  items: Service[];
}

export interface AboutContent {
  eyebrow: string;
  title: string;
  paragraphs: string[];
  quote: { text: string; author: string };
  stats: TrustStat[];
  mainImage: SiteImage;
  supportImage: SiteImage;
}

export interface RailCopy {
  label: string;
  previous: string;
  next: string;
  /** Template with {current} and {total}. */
  position: string;
}

export interface Doctor {
  id: string;
  name: string;
  role: string;
  experience: string;
  bio: string;
  portrait: SiteImage;
}

export interface DoctorsContent {
  eyebrow: string;
  title: string;
  lead: string;
  items: Doctor[];
  rail: RailCopy;
}

export interface Advantage {
  id: string;
  title: string;
  description: string;
  icon: IconKey;
}

export interface AdvantagesContent {
  eyebrow: string;
  title: string;
  items: Advantage[];
}

export interface BeforeAfterCase {
  id: string;
  title: string;
  treatment: string;
  duration: string;
  /** The "after" photo. The demonstration "before" view is derived from it by a tone filter. */
  image: SiteImage;
}

export interface BeforeAfterContent {
  eyebrow: string;
  title: string;
  lead: string;
  beforeLabel: string;
  afterLabel: string;
  sliderLabel: string;
  casesLabel: string;
  notice: string;
  items: BeforeAfterCase[];
}

export interface Testimonial {
  id: string;
  name: string;
  treatment: string;
  rating: 1 | 2 | 3 | 4 | 5;
  text: string;
}

export interface TestimonialsContent {
  eyebrow: string;
  title: string;
  lead: string;
  /** Template with {N}. */
  ratingLabel: string;
  items: Testimonial[];
  rail: RailCopy;
}

export interface BookingCtaContent {
  title: string;
  lead: string;
  cta: string;
  phoneLead: string;
  image: SiteImage;
}

export interface FieldCopy {
  label: string;
  placeholder: string;
}

export interface BookingServiceOption {
  value: BookingServiceValue;
  label: string;
}

export interface BookingFormCopy {
  eyebrow: string;
  title: string;
  lead: string;
  fields: Record<BookingField, FieldCopy>;
  serviceOptions: BookingServiceOption[];
  submit: string;
  submitting: string;
  consent: string;
  errors: Record<BookingErrorCode, string>;
  submitError: string;
  successTitle: string;
  successText: string;
  successAction: string;
}

export interface ContactsContent {
  eyebrow: string;
  title: string;
  lead: string;
  labels: { address: string; phone: string; email: string; hours: string };
  mapTitle: string;
  mapLinkLabel: string;
  mapLoading: string;
  mapFallback: string;
}

export interface FooterContent {
  descriptor: string;
  columns: { navigation: string; services: string; contacts: string };
  medicalNotice: string;
  legalLine: string;
  copyright: string;
  backToTopLabel: string;
}

export interface SystemContent {
  skipLink: string;
  notFoundTitle: string;
  notFoundText: string;
  notFoundAction: string;
}

export interface SiteContent {
  meta: MetaContent;
  clinic: ClinicInfo;
  navigation: NavigationContent;
  hero: HeroContent;
  services: ServicesContent;
  about: AboutContent;
  doctors: DoctorsContent;
  advantages: AdvantagesContent;
  beforeAfter: BeforeAfterContent;
  testimonials: TestimonialsContent;
  bookingCta: BookingCtaContent;
  bookingForm: BookingFormCopy;
  contacts: ContactsContent;
  footer: FooterContent;
  system: SystemContent;
}
