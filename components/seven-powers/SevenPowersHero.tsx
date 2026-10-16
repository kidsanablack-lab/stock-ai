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
      className="sp-diagram"
    >
      <circle
        cx={CX}
        cy={CY}
        r={RING}
        fill="none"
        stroke="rgba(255,255,255,0.16)"
        strokeWidth="1"
      />

      {NODES.map(({ power, x, y }) => (
        <line
          key={`spoke-${power.slug}`}
          x1={CX}
          y1={CY}
          x2={x}
          y2={y}
          stroke="rgba(255,255,255,0.12)"
          strokeWidth="1"
        />
      ))}

      <circle
        cx={CX}
        cy={CY}
        r={66}
        fill="rgba(255,255,255,0.07)"
        stroke="rgba(255,255,255,0.22)"
        strokeWidth="1"
      />

      <text
        x={CX}
        y={CY - 4}
        textAnchor="middle"
        fill="#F3F5EE"
        fontSize="17"
        style={{ fontFamily: "var(--sp-serif, Georgia, serif)" }}
      >
        Durable
      </text>
      <text
        x={CX}
        y={CY + 17}
        textAnchor="middle"
        fill="#F3F5EE"
        fontSize="17"
        style={{ fontFamily: "var(--sp-serif, Georgia, serif)" }}
      >
        advantage
      </text>

      {NODES.map(({ power, x, y }) => (
        <g key={power.slug}>
          <circle cx={x} cy={y} r={28} fill={power.tint} />
          <text
            x={x}
            y={y + 5}
            textAnchor="middle"
            fill={power.ink}
            fontSize="14"
            fontWeight="600"
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
    <header className="sp-hero">
      <div className="sp-hero-copy">
        <p className="sp-eyebrow">Business Strategy</p>

        <h1>
          Why Are Some Businesses <em>Hard to Beat?</em>
        </h1>

        <p className="sp-hero-lead">
          Discover the seven sources of enduring competitive advantage,
          explained through simple concepts, clear visuals, and real-world
          business examples.
        </p>

        <div className="sp-hero-actions">
          <a
            href={`#${SECTION_IDS.explore}`}
            className="sp-btn sp-btn-primary"
          >
            Explore the 7 Powers
            <i className="ti ti-arrow-down" />
          </a>

          <a
            href={`#${SECTION_IDS.bigPicture}`}
            className="sp-btn sp-btn-ghost"
          >
            Understand the Framework
          </a>
        </div>

        <p className="sp-credit">
          Based on the 7 Powers framework by Hamilton Helmer. The
          explanations and examples on this page are written by Scope.
        </p>
      </div>

      <div className="sp-hero-visual">
        <PowersDiagram />
      </div>
    </header>
  );
}