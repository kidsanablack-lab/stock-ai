import type { ReactNode } from "react";

/** The "how to read" line under every visual. */
export function HowToRead({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p className={`mt-3 text-caption text-ink-muted ${className}`}>
      <span className="font-semibold">How to read: </span>
      {children}
    </p>
  );
}

/** The source line at the bottom of a section. */
export function SourceLine({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p className={`border-t border-border pt-4 text-caption text-ink-muted ${className}`}>
      {children}
    </p>
  );
}
