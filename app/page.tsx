const popularCompanies = [
  {
    name: "Apple",
    ticker: "AAPL",
    description: "Consumer technology & services",
    accent: "from-zinc-100 to-zinc-50",
  },
  {
    name: "Microsoft",
    ticker: "MSFT",
    description: "Cloud, software & enterprise",
    accent: "from-sky-50 to-blue-50",
  },
  {
    name: "NVIDIA",
    ticker: "NVDA",
    description: "AI chips & accelerated computing",
    accent: "from-emerald-50 to-green-50",
  },
  {
    name: "Amazon",
    ticker: "AMZN",
    description: "E-commerce, cloud & logistics",
    accent: "from-amber-50 to-orange-50",
  },
];

export default function Home() {
  return (
    <div className="min-h-full bg-white text-zinc-900">
      <main className="mx-auto flex min-h-full max-w-6xl flex-col px-6 pb-24 pt-20 sm:px-10 sm:pt-28 lg:pt-32">
        {/* Hero */}
        <section className="mx-auto flex w-full max-w-3xl flex-col items-center text-center">
          <p className="mb-6 text-sm font-medium tracking-wide text-zinc-400 uppercase">
            Stock AI
          </p>

          <h1 className="text-4xl font-semibold tracking-tight text-balance text-zinc-950 sm:text-5xl md:text-6xl lg:text-[3.5rem] lg:leading-[1.1]">
            Understand Any Company Before You Invest.
          </h1>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-zinc-500 sm:text-lg">
            AI-powered research platform for long-term investors.
          </p>

          <form className="mt-12 w-full">
            <div className="group relative flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Search by company name or ticker..."
                  className="h-14 w-full rounded-2xl border border-zinc-200 bg-white px-5 text-base text-zinc-900 shadow-sm outline-none transition-all duration-300 placeholder:text-zinc-400 focus:border-zinc-400 focus:shadow-md"
                />
              </div>
              <button
                type="submit"
                className="h-14 shrink-0 rounded-2xl bg-zinc-900 px-8 text-base font-medium text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-zinc-800 hover:shadow-lg active:translate-y-0 sm:w-auto"
              >
                Search
              </button>
            </div>
          </form>
        </section>

        {/* Popular Companies */}
        <section className="mx-auto mt-24 w-full max-w-5xl sm:mt-32">
          <div className="mb-8 flex flex-col items-center text-center sm:mb-10">
            <h2 className="text-lg font-medium tracking-tight text-zinc-900 sm:text-xl">
              Popular Companies
            </h2>
            <p className="mt-2 text-sm text-zinc-500">
              Start with a company investors know well
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:gap-5">
            {popularCompanies.map((company) => (
              <button
                key={company.ticker}
                type="button"
                className="group relative overflow-hidden rounded-2xl border border-zinc-200 bg-white p-6 text-left shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:border-zinc-300 hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2 sm:p-7"
              >
                <div
                  className={`absolute inset-0 bg-linear-to-br ${company.accent} opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
                />

                <div className="relative flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-medium tracking-wider text-zinc-400 uppercase transition-colors duration-300 group-hover:text-zinc-500">
                      {company.ticker}
                    </p>
                    <h3 className="mt-2 text-2xl font-semibold tracking-tight text-zinc-950 transition-transform duration-300 group-hover:translate-x-0.5">
                      {company.name}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-zinc-500 transition-colors duration-300 group-hover:text-zinc-600">
                      {company.description}
                    </p>
                  </div>

                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-400 transition-all duration-300 group-hover:border-zinc-300 group-hover:bg-zinc-900 group-hover:text-white">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                </div>
              </button>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
