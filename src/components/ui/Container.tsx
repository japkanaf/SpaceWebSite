import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Container({
  children,
  className,
  wide = false,
}: {
  children: ReactNode;
  className?: string;
  wide?: boolean;
}) {
  return (
    <div className={cn("mx-auto w-full px-5 md:px-8 lg:px-12", wide ? "max-w-wide" : "max-w-page", className)}>
      {children}
    </div>
  );
}
