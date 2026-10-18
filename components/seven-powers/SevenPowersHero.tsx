import { POWERS, SECTION_IDS } from "@/lib/seven-powers/powers";

const CX = 200;
const CY = 200;
const RING = 140;

const round = (value: number) => Math.round(value * 10) / 10;

// Seven nodes evenly spaced around a ring, starting at the top.
const NODES = POWERS.map((power, index) => {
  const angle = ((-90 + (360 / POWERS.length) * index) * Math.PI) / 180;

  return {
    power,
    x: round(CX + RING * Math.cos(angle)),
    y: round(CY + RING * Math.sin(angle)),
  };
});

function PowersDiagram() {
  return (
    <svg
      viewBox="0 0 400 400"
      role="img"
      aria-label="Diagram: seven different sources of advantage arranged around a center labeled durable advantage"
      className="block h-auto w-full"
    >
      <circle
        cx={CX}
        cy={CY}
        r={RING}
        fill="none"
        className="stroke-white/25"
        strokeWidth="1.5"
      />

      {NODES.map(({ power, x, y }) => (
        <line
          key={`spoke-${power.slug}`}
          x1={CX}
          y1={CY}
          x2={x}
          y2={y}
          className="stroke-white/20"
          strokeWidth="1"
        />
      ))}

      <circle
        cx={CX}
        cy={CY}
        r={66}
        className="fill-primary stroke-white/30"
        strokeWidth="1.5"
      />

      <text
        x={CX}
        y={CY - 2}
        textAnchor="middle"
        fontSize="20"
        className="fill-white font-serif"
      >
        Durable
      </text>
      <text
        x={CX}
        y={CY + 22}
        textAnchor="middle"
        fontSize="20"
        className="fill-white font-serif"
      >
        advantage
      </text>

      {NODES.map(({ power, x, y }) => (
        <g key={power.slug}>
          <circle cx={x} cy={y} r={30} className="fill-white" />
          <text
            x={x}
            y={y + 6}
            textAnchor="middle"
            fontSize="16"
            fontWeight="600"
            className="fill-primary-ink"
          >
            {power.number}
          </text>
        </g>
      ))}
    </svg>
  );
}

export default function SevenPowersHero() {
  return (
    <header className="grid items-center gap-10 rounded-[28px] bg-ink px-6 py-12 sm:px-10 sm:py-14 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-14 lg:px-14 lg:py-16">
      <div>
        <p className="mb-4 text-[12.5px] font-semibold uppercase tracking-[0.14em] text-primary-soft">
          Business Strategy
        </p>

        <h1 className="font-serif text-[clamp(40px,5.8vw,66px)] font-normal leading-[1.03] tracking-[-0.02em] text-white">
          Why Are Some Businesses{" "}
          <em className="italic text-primary-soft">Hard to Beat?</em>
        </h1>

        <p className="mt-6 max-w-[520px] text-[17px] leading-relaxed text-white/75">
          Discover the seven sources of enduring competitive advantage,
          explained through simple concepts, clear visuals, and real-world
          business examples.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a
            href={`#${SECTION_IDS.explore}`}
            className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-white px-[22px] text-[15px] font-semibold text-ink transition-colors hover:bg-primary-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:w-auto"
          >
            Explore the 7 Powers
            <i className="ti ti-arrow-down" aria-hidden="true" />
          </a>

          <a
            href={`#${SECTION_IDS.bigPicture}`}
            className="inline-flex h-12 w-full items-center justify-center rounded-xl border border-white/30 px-[22px] text-[15px] font-semibold text-white transition-colors hover:border-white hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:w-auto"
          >
            Understand the Framework
          </a>
        </div>

        <p className="mt-8 max-w-[460px] text-[13px] leading-relaxed text-white/70">
          Based on the 7 Powers framework by Hamilton Helmer. The
          explanations and examples on this page are written by Scope.
        </p>
      </div>

      <div className="mx-auto w-full max-w-[420px]">
        <PowersDiagram />
      </div>
    </header>
  );
}