import Link from "next/link";

type TextLinkProps = {
  href: string;
  children: React.ReactNode;
  tone?: "primary" | "light";
  className?: string;
};

/** Inline call-to-action link with an arrow. */
export default function TextLink({
  href,
  children,
  tone = "primary",
  className = "",
}: TextLinkProps) {
  const color = tone === "light" ? "text-white" : "text-primary";

  return (
    <Link
      href={href}
      className={`inline-flex items-center gap-1.5 text-[14.5px] font-semibold hover:underline hover:underline-offset-4 ${color} ${className}`}
    >
      {children}
      <i className="ti ti-arrow-right" aria-hidden="true" />
    </Link>
  );
}
