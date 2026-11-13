import type { ReactNode } from "react";

/** Text-link look, shared by links and link-style buttons. */
export const actionClass =
  "inline-flex min-h-10 items-center gap-1.5 text-note font-semibold text-primary hover:underline hover:underline-offset-4";

type ActionLinkProps = {
  href: string;
  children: ReactNode;
  icon?: string;
  className?: string;
};

/** In-page or plain link with a trailing icon. For next/link, use actionClass. */
export default function ActionLink({
  href,
  children,
  icon = "ti-arrow-right",
  className = "",
}: ActionLinkProps) {
  return (
    <a href={href} className={`${actionClass} ${className}`}>
      {children}
      <i className={`ti ${icon}`} aria-hidden="true" />
    </a>
  );
}
