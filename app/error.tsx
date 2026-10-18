"use client";

import { useEffect } from "react";
import Link from "next/link";
import Container from "@/components/ui/Container";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="py-16 lg:py-[72px]">
      <Container>
        <div className="mx-auto flex min-h-[50vh] max-w-[560px] flex-col items-center justify-center text-center">
          <span className="mb-6 grid h-14 w-14 place-items-center rounded-2xl bg-primary-soft text-primary-ink">
            <i className="ti ti-alert-circle text-[26px]" aria-hidden="true" />
          </span>

          <h1 className="font-serif text-[clamp(30px,4vw,44px)] font-normal leading-[1.08] tracking-[-0.02em] text-ink">
            Something went wrong
          </h1>

          <p className="mt-4 text-[17px] leading-relaxed text-ink-muted">
            We couldn&apos;t load this page. Please try again.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => reset()}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-primary px-[22px] text-[15px] font-semibold text-white transition-colors hover:bg-primary-hover"
            >
              Try again
            </button>

            <Link
              href="/"
              className="inline-flex h-12 items-center justify-center rounded-xl border border-border bg-white px-[22px] text-[15px] font-semibold text-ink transition-colors hover:border-primary hover:text-primary"
            >
              Go to homepage
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}