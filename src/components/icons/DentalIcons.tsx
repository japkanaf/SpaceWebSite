import type { ReactNode } from "react";

export interface DentalIconProps {
  className?: string;
  strokeWidth?: number;
}

export const TOOTH_PATH =
  "M7.6 3C5.1 3 3.5 5 3.5 7.7c0 2.1.8 3.5 1.4 5.2.7 2 .9 4.2 1.4 6.4.3 1.5.9 2.7 1.8 2.7 1.2 0 1.5-1.5 1.8-3.2.3-1.6.7-3.1 2.1-3.1s1.8 1.5 2.1 3.1c.3 1.7.6 3.2 1.8 3.2.9 0 1.5-1.2 1.8-2.7.5-2.2.7-4.4 1.4-6.4.6-1.7 1.4-3.1 1.4-5.2C20.5 5 18.9 3 16.4 3c-1.9 0-2.9 1.1-4.4 1.1S9.5 3 7.6 3z";

function IconBase({
  className,
  strokeWidth = 1.5,
  children,
}: DentalIconProps & { children: ReactNode }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      {children}
    </svg>
  );
}

export function ToothIcon(props: DentalIconProps) {
  return (
    <IconBase {...props}>
      <path d={TOOTH_PATH} />
    </IconBase>
  );
}

export function ImplantIcon(props: DentalIconProps) {
  return (
    <IconBase {...props}>
      <path d="M8.2 2.5h7.6c1.6 0 2.7 1.1 2.7 2.6 0 2-1.4 3.6-3.3 3.6H8.8c-1.9 0-3.3-1.6-3.3-3.6 0-1.5 1.1-2.6 2.7-2.6z" />
      <path d="M10 8.7V11h4V8.7" />
      <path d="M9 11h6l-.9 10.5H9.9z" />
      <path d="M8.6 14.2h6.8" />
      <path d="M8.9 17.4h6.2" />
    </IconBase>
  );
}

export function AlignerIcon(props: DentalIconProps) {
  return (
    <IconBase {...props}>
      <path d="M4 8.5c0 5.5 3.6 9.5 8 9.5s8-4 8-9.5" />
      <path d="M7.5 8.5c0 3.6 2 6.2 4.5 6.2s4.5-2.6 4.5-6.2" />
      <path d="M4 8.5h3.5" />
      <path d="M16.5 8.5H20" />
    </IconBase>
  );
}
