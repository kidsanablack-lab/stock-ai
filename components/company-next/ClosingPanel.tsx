// Section 21: Closing panel. The one navy (bg-ink) panel allowed on the page.
// Server Component.
import Link from "next/link";

export type ClosingPanelData = {
  title: string[]; // one entry per line of the headline
  buttonLabel: string;
  href: string; // must be a real route
  note: string;
};

export default function ClosingPanel({ data }: { data: ClosingPanelData }) {
  return (
    <section className="bg-white py-16 lg:py-[72px]">
      <div className="mx-auto w-full max-w-[1120px] px-5 sm:px-6">
        <div className="rounded-[28px] bg-ink px-6 py-14 text-center sm:px-10 sm:py-20">
          <h2 className="mx-auto max-w-[760px] font-serif text-[clamp(34px,5vw,58px)] font-normal leading-[1.08] tracking-[-0.02em] text-white">
            {data.title.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h2>
          <Link
            href={data.href}
            className="mt-9 inline-flex h-12 items-center justify-center rounded-xl bg-white px-[22px] text-[15px] font-semibold text-ink transition-colors hover:bg-primary-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            {data.buttonLabel}
          </Link>
          <p className="mx-auto mt-9 max-w-[620px] text-[14px] leading-relaxed text-white/70">{data.note}</p>
        </div>
      </div>
    </section>
  );
}