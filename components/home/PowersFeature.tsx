import Link from "next/link";
import Container from "@/components/ui/Container";
import TextLink from "@/components/ui/TextLink";
import { POWERS } from "@/lib/seven-powers/powers";

export default function PowersFeature() {
  return (
    <section className="py-16 lg:py-[72px]">
      <Container>
        <div className="grid items-center gap-10 rounded-[28px] bg-ink px-6 py-10 text-white sm:px-12 sm:py-14 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="max-w-[12em] font-serif text-[clamp(32px,4.4vw,48px)] font-normal leading-[1.06] tracking-[-0.02em]">
              Why are some businesses hard to beat?
            </h2>
            <p className="mt-4 max-w-[26em] text-[17px] leading-relaxed text-white/75">
              Seven sources of lasting advantage, explained with simple visuals
              and real business examples.
            </p>
            <TextLink href="/7-powers" tone="light" className="mt-7">
              Explore the 7 Powers
            </TextLink>
            <p className="mt-4 text-[13px] text-white/60">
              Framework by Hamilton Helmer
            </p>
          </div>

          <ol className="border-t border-white/15">
            {POWERS.map((power) => (
              <li key={power.slug} className="border-b border-white/15">
                <Link
                  href={`/7-powers#${power.slug}`}
                  aria-label={`Power ${power.number}: ${power.name}`}
                  className="group flex items-center gap-4 py-3.5"
                >
                  <span
                    aria-hidden="true"
                    className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white/10 text-[13px] font-semibold"
                  >
                    {power.number}
                  </span>
                  <span className="flex-1 text-[17px]">{power.name}</span>
                  <i
                    className="ti ti-arrow-right text-white/60 transition-transform group-hover:translate-x-1 group-hover:text-white"
                    aria-hidden="true"
                  />
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
