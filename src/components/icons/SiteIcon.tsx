import {
  Armchair,
  Award,
  Droplets,
  Gem,
  HeartHandshake,
  Microscope,
  ScanLine,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import type { IconKey } from "@/content/types";
import { AlignerIcon, ImplantIcon, ToothIcon } from "./DentalIcons";

/** Resolves an IconKey from content to a Lucide or custom dental icon. */
export function SiteIcon({ name, className }: { name: IconKey; className?: string }) {
  const lucide = { className, strokeWidth: 1.5, "aria-hidden": true } as const;

  switch (name) {
    case "tooth":
      return <ToothIcon className={className} />;
    case "implant":
      return <ImplantIcon className={className} />;
    case "aligner":
      return <AlignerIcon className={className} />;
    case "gem":
      return <Gem {...lucide} />;
    case "sparkles":
      return <Sparkles {...lucide} />;
    case "droplets":
      return <Droplets {...lucide} />;
    case "microscope":
      return <Microscope {...lucide} />;
    case "award":
      return <Award {...lucide} />;
    case "heart-handshake":
      return <HeartHandshake {...lucide} />;
    case "armchair":
      return <Armchair {...lucide} />;
    case "shield-check":
      return <ShieldCheck {...lucide} />;
    case "scan-line":
      return <ScanLine {...lucide} />;
    default:
      return null;
  }
}
