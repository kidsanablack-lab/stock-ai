import type { ElementType, HTMLAttributes, ReactNode } from "react";

type CardProps = HTMLAttributes<HTMLElement> & {
  children: ReactNode;
  /** An inner card (one level inside another card). */
  inner?: boolean;
  as?: ElementType;
};

/** DESIGN.md section 3: main card rounded-3xl p-5 sm:p-6, inner card rounded-2xl p-4. */
export default function Card({
  children,
  inner = false,
  as: Tag = "div",
  className = "",
  ...rest
}: CardProps) {
  const base = inner
    ? "rounded-2xl border border-border bg-white p-4"
    : "rounded-3xl border border-border bg-white p-5 sm:p-6";

  return (
    <Tag className={`${base} ${className}`} {...rest}>
      {children}
    </Tag>
  );
}
