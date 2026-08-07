type SectionHeadingProps = {
  title: string;
  description?: string;
};

export function SectionHeading({ title, description }: SectionHeadingProps) {
  return (
    <div className="mb-8 sm:mb-10">
      <h2 className="text-xl font-semibold tracking-tight text-zinc-950 sm:text-2xl">
        {title}
      </h2>
      {description && (
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-zinc-500 sm:text-base">
          {description}
        </p>
      )}
    </div>
  );
}
