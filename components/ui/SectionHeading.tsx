type SectionHeadingProps = {
  title: React.ReactNode;
  description?: string;
  className?: string;
  as?: "h1" | "h2";
};

/** Serif section title with an optional one-line description. */
export default function SectionHeading({
  title,
  description,
  className = "",
  as: Heading = "h2",
}: SectionHeadingProps) {
  return (
    <div className={`mb-10 max-w-[620px] ${className}`}>
      <Heading className="font-serif text-[clamp(30px,4vw,44px)] font-normal leading-[1.08] tracking-[-0.02em] text-ink">
        {title}
      </Heading>
      {description && (
        <p className="mt-3.5 text-[17px] leading-relaxed text-ink-muted">
          {description}
        </p>
      )}
    </div>
  );
}