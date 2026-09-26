import { cn } from "@/lib/cn";

const tints = ["bg-teal-50 text-teal-600", "bg-sand text-navy-700", "bg-navy-900 text-ivory"];

function initialsOf(name: string): string {
  return name
    .split(/\s+/)
    .map((part) => part.charAt(0))
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function tintOf(name: string): string {
  let hash = 0;
  for (const char of name) {
    hash = (hash * 31 + char.charCodeAt(0)) >>> 0;
  }
  return tints[hash % tints.length];
}

/** Initials avatar. Decorative: the name is always shown next to it. */
export function MonogramAvatar({ name, className }: { name: string; className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "inline-grid size-12 shrink-0 place-items-center rounded-full font-display text-lg",
        tintOf(name),
        className,
      )}
    >
      {initialsOf(name)}
    </span>
  );
}
