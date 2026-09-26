"use client";

import Image from "next/image";
import { useState } from "react";
import type { SiteImage } from "@/content/types";
import { cn } from "@/lib/cn";
import { LogoMark } from "@/components/icons/LogoMark";

export interface SiteImageViewProps {
  image: SiteImage;
  /** Responsive sizes string for next/image. */
  sizes: string;
  priority?: boolean;
  decorative?: boolean;
  /** When true the frame fills its positioned parent. Otherwise className must give it a size. */
  fillParent?: boolean;
  className?: string;
  imageClassName?: string;
}

/** The only way sections render photography: consistent sizing, placeholder and failure fallback. */
export function SiteImageView({
  image,
  sizes,
  priority = false,
  decorative = false,
  fillParent = false,
  className,
  imageClassName,
}: SiteImageViewProps) {
  const [failed, setFailed] = useState(false);
  const alt = decorative ? "" : image.alt;

  return (
    <div className={cn(fillParent ? "absolute inset-0" : "relative", "overflow-hidden bg-sand", className)}>
      {failed ? (
        <div
          role={decorative ? undefined : "img"}
          aria-label={decorative ? undefined : alt}
          className="absolute inset-0 grid place-items-center bg-sand"
        >
          <LogoMark className="size-12 text-navy-900/25" />
        </div>
      ) : (
        <Image
          src={image.src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className={cn("object-cover", imageClassName)}
          style={image.position ? { objectPosition: image.position } : undefined}
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
}
