import {
  forwardRef,
  type InputHTMLAttributes,
  type ReactNode,
  type SelectHTMLAttributes,
  type TextareaHTMLAttributes,
} from "react";
import { ChevronDown, CircleAlert } from "lucide-react";
import { cn } from "@/lib/cn";

export function FormField({
  id,
  label,
  required = false,
  error,
  counter,
  className,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  counter?: ReactNode;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <div className="flex items-baseline justify-between gap-3">
        <label htmlFor={id} className="text-sm font-semibold text-navy-900">
          {label}
          {required ? (
            <span aria-hidden="true" className="ml-0.5 text-teal-600">
              *
            </span>
          ) : null}
        </label>
        {counter}
      </div>
      {children}
      <p
        id={`${id}-error`}
        aria-live="polite"
        className={cn("flex items-start gap-1.5 text-sm leading-snug text-danger", !error && "sr-only")}
      >
        {error ? (
          <>
            <CircleAlert aria-hidden="true" strokeWidth={1.75} className="mt-px size-4 shrink-0" />
            <span>{error}</span>
          </>
        ) : null}
      </p>
    </div>
  );
}

const controlBase =
  "block w-full rounded-control border border-line bg-paper px-4 text-base transition duration-200 ease-premium placeholder:text-muted/70 hover:border-navy-700/35 focus:border-teal-600 focus:outline-none focus:ring-4 focus:ring-teal-600/10 aria-invalid:border-danger aria-invalid:focus:ring-danger/10 disabled:cursor-not-allowed disabled:opacity-60";

export const TextInput = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  function TextInput({ className, ...props }, ref) {
    return <input ref={ref} className={cn(controlBase, "h-13 text-ink", className)} {...props} />;
  },
);

export const SelectInput = forwardRef<
  HTMLSelectElement,
  SelectHTMLAttributes<HTMLSelectElement> & { empty?: boolean }
>(function SelectInput({ className, children, empty = false, ...props }, ref) {
  return (
    <div className="relative">
      <select
        ref={ref}
        className={cn(controlBase, "h-13 appearance-none pr-11", empty ? "text-muted" : "text-ink", className)}
        {...props}
      >
        {children}
      </select>
      <ChevronDown
        aria-hidden="true"
        strokeWidth={1.75}
        className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-muted"
      />
    </div>
  );
});

export const TextArea = forwardRef<HTMLTextAreaElement, TextareaHTMLAttributes<HTMLTextAreaElement>>(
  function TextArea({ className, ...props }, ref) {
    return (
      <textarea
        ref={ref}
        className={cn(controlBase, "min-h-32 resize-y py-3.5 leading-relaxed text-ink", className)}
        {...props}
      />
    );
  },
);
