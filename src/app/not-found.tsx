import { siteContent } from "@/content/site";
import { ButtonLink } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";

export default function NotFound() {
  const { system, clinic } = siteContent;
  return (
    <main id="main" className="grid min-h-dvh place-items-center bg-ivory bg-hero-tint px-5 py-24">
      <div className="flex max-w-md flex-col items-center text-center">
        <a href="/" className="rounded-control">
          <Logo primary={clinic.brandPrimary} secondary={clinic.brandSecondary} />
        </a>
        <h1 className="mt-12 font-display text-display-lg text-navy-900">{system.notFoundTitle}</h1>
        <p className="mt-5 text-lead text-muted">{system.notFoundText}</p>
        <ButtonLink href="/" size="lg" icon="arrow" className="mt-10">
          {system.notFoundAction}
        </ButtonLink>
      </div>
    </main>
  );
}
