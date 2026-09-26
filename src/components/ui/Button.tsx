import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { ArrowRight, ArrowUpRight, LoaderCircle } from "lucide-react";
import { cn } from "@/lib/cn";

export type ButtonVariant = "primary" | "secondary" | "onDark" | "outlineDark" | "link";
export type ButtonSize = "md" | "lg";
export type ButtonIcon = "arrow" | "arrow-up-right" | "none";

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-navy-900 text-ivory hover:bg-navy-950 hover:shadow-soft",
  secondary: "border border-navy-900/15 bg-paper/60 text-navy-900 hover:border-navy-900/30 hover:bg-paper",
  onDark: "bg-ivory text-navy-950 hover:bg-paper hover:shadow-float",
  outlineDark: "border border-white/20 text-ivory hover:border-white/40 hover:bg-white/5",
  link: "text-navy-900 underline decoration-navy-900/25 underline-offset-4 hover:decoration-navy-900",
};

const sizeClasses: Record<ButtonSize, string> = {
  md: "min-h-11 px-5 text-sm",
  lg: "min-h-13 px-7 text-base",
};

export function buttonClasses({
  variant = "primary",
  size = "md",
  fullWidth = false,
  className,
}: {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  className?: string;
} = {}): string {
  return cn(
    "group inline-flex items-center justify-center gap-2.5 font-semibold leading-none select-none transition duration-200 ease-premium",
    variant === "link" ? "rounded-control" : cn("rounded-pill active:scale-98", sizeClasses[size]),
    variantClasses[variant],
    fullWidth && "w-full",
    "disabled:pointer-events-none disabled:opacity-60 aria-busy:cursor-progress",
    className,
  );
}

function ButtonContent({
  children,
  icon,
  loading,
}: {
  children: ReactNode;
  icon: ButtonIcon;
  loading: boolean;
}) {
  return (
    <>
      {loading ? <LoaderCircle aria-hidden="true" className="size-4 animate-spin" /> : null}
      <span>{children}</span>
      {!loading && icon === "arrow" ? (
        <ArrowRight
          aria-hidden="true"
          strokeWidth={1.75}
          className="size-4 transition-transform duration-200 ease-premium group-hover:translate-x-0.5"
        />
      ) : null}
      {!loading && icon === "arrow-up-right" ? (
        <ArrowUpRight
          aria-hidden="true"
          strokeWidth={1.75}
          className="size-4 transition-transform duration-200 ease-premium group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      ) : null}
    </>
  );
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: ButtonIcon;
  loading?: boolean;
  fullWidth?: boolean;
}

export function Button({
  variant,
  size,
  icon = "none",
  loading = false,
  fullWidth,
  className,
  children,
  type = "button",
  disabled,
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={buttonClasses({ variant, size, fullWidth, className })}
      {...rest}
    >
      <ButtonContent icon={icon} loading={loading}>
        {children}
      </ButtonContent>
    </button>
  );
}

export interface ButtonLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: ButtonIcon;
  fullWidth?: boolean;
}

export function ButtonLink({
  variant,
  size,
  icon = "none",
  fullWidth,
  className,
  children,
  ...rest
}: ButtonLinkProps) {
  return (
    <a className={buttonClasses({ variant, size, fullWidth, className })} {...rest}>
      <ButtonContent icon={icon} loading={false}>
        {children}
      </ButtonContent>
    </a>
  );
}
