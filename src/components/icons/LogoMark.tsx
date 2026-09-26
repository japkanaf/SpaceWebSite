import { TOOTH_PATH } from "./DentalIcons";

/** Small tooth mark used in the logo, favicon and image fallbacks. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <circle cx="16" cy="16" r="16" fill="currentColor" opacity="0.12" />
      <path
        d={TOOTH_PATH}
        transform="translate(5.8 5.6) scale(0.85)"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
