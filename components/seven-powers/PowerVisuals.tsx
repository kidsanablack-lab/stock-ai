/* Diagrams for the 7 Powers detail sections.
   Built with plain HTML/CSS/SVG — no chart libraries. */

/* ------------------------------------------------------------------
   01 — Scale Economies: two hypothetical factories
------------------------------------------------------------------ */
const FACTORIES = [
  {
    name: "Factory A",
    units: "1,000",
    fixed: "$100,000",
    perUnit: "$100",
    width: 100,
  },
  {
    name: "Factory B",
    units: "10,000",
    fixed: "$100,000",
    perUnit: "$10",
    width: 10,
  },
];

export function ScaleVisual() {
  return (
    <figure className="sp-vis">
      <figcaption className="sp-vis-caption">
        <span className="sp-tag">Hypothetical example</span>
        Two factories with the same fixed costs
      </figcaption>

      <div className="sp-bars">
        {FACTORIES.map((factory) => (
          <div key={factory.name} className="sp-bar-row">
            <div className="sp-bar-label">
              <strong>{factory.name}</strong>
              <span>{factory.units} units</span>
            </div>

            <div className="sp-bar-track" aria-hidden="true">
              <div
                className="sp-bar-fill"
                style={{ width: `${factory.width}%` }}
              />
            </div>

            <div className="sp-bar-value">{factory.perUnit}</div>
          </div>
        ))}
        <p className="sp-bar-axis">Fixed cost per unit</p>
      </div>

      <table className="sp-table">
        <caption className="sp-sr-only">
          Hypothetical comparison of two factories
        </caption>
        <thead>
          <tr>
            <th scope="col">Metric</th>
            <th scope="col">Factory A</th>
            <th scope="col">Factory B</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">Units Produced</th>
            <td>{FACTORIES[0].units}</td>
            <td>{FACTORIES[1].units}</td>
          </tr>
          <tr>
            <th scope="row">Total Fixed Costs</th>
            <td>{FACTORIES[0].fixed}</td>
            <td>{FACTORIES[1].fixed}</td>
          </tr>
          <tr>
            <th scope="row">Fixed Cost per Unit</th>
            <td>{FACTORIES[0].perUnit}</td>
            <td>{FACTORIES[1].perUnit}</td>
          </tr>
        </tbody>
      </table>

      <p className="sp-fine">
        This shows fixed cost per unit only. It is not the total cost per
        unit, which also includes costs that rise with every unit made.
      </p>
    </figure>
  );
}

/* ------------------------------------------------------------------
   02 — Network Economies: a small network vs a larger one
------------------------------------------------------------------ */
function round(value: number) {
  return Math.round(value * 10) / 10;
}

function NetworkGraph({ nodes }: { nodes: number }) {
  const size = 160;
  const center = size / 2;
  const radius = 58;

  const points = Array.from({ length: nodes }, (_, index) => {
    const angle = ((-90 + (360 / nodes) * index) * Math.PI) / 180;

    return {
      x: round(center + radius * Math.cos(angle)),
      y: round(center + radius * Math.sin(angle)),
    };
  });

  const lines: { x1: number; y1: number; x2: number; y2: number }[] = [];

  for (let a = 0; a < nodes; a += 1) {
    for (let b = a + 1; b < nodes; b += 1) {
      lines.push({
        x1: points[a].x,
        y1: points[a].y,
        x2: points[b].x,
        y2: points[b].y,
      });
    }
  }

  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      className="sp-graph"
      aria-hidden="true"
    >
      {lines.map((line, index) => (
        <line
          key={index}
          {...line}
          stroke="var(--sp-accent)"
          strokeOpacity="0.35"
          strokeWidth="1"
        />
      ))}

      {points.map((point, index) => (
        <circle
          key={index}
          cx={point.x}
          cy={point.y}
          r={7}
          fill="var(--sp-accent)"
        />
      ))}
    </svg>
  );
}

export function NetworkVisual() {
  const small = 4;
  const large = 8;

  const connections = (n: number) => (n * (n - 1)) / 2;

  return (
    <figure className="sp-vis">
      <figcaption className="sp-vis-caption">
        Each dot is a participant. Each line is a possible connection.
      </figcaption>

      <div className="sp-graphs">
        <div className="sp-graph-card">
          <NetworkGraph nodes={small} />
          <p className="sp-graph-title">{small} participants</p>
          <p className="sp-graph-sub">
            Up to {connections(small)} connections
          </p>
        </div>

        <i className="ti ti-arrow-right sp-graph-arrow" aria-hidden="true" />

        <div className="sp-graph-card">
          <NetworkGraph nodes={large} />
          <p className="sp-graph-title">{large} participants</p>
          <p className="sp-graph-sub">
            Up to {connections(large)} connections
          </p>
        </div>
      </div>

      <p className="sp-fine">
        Doubling the participants can much more than double the possible
        connections. Whether those connections create real value depends on
        the network.
      </p>
    </figure>
  );
}

/* ------------------------------------------------------------------
   02 — Visa example: who is involved in a card payment
------------------------------------------------------------------ */
const PARTICIPANTS = [
  { icon: "ti-user", label: "Cardholders", hub: false },
  { icon: "ti-building-bank", label: "Issuing banks", hub: false },
  { icon: "ti-network", label: "Visa network", hub: true },
  { icon: "ti-building", label: "Acquirers", hub: false },
  { icon: "ti-building-store", label: "Merchants", hub: false },
];

export function VisaParticipants() {
  return (
    <ol className="sp-participants" aria-label="Who is involved in a card payment">
      {PARTICIPANTS.map((item, index) => (
        <li
          key={item.label}
          className={`sp-participant${item.hub ? " is-hub" : ""}`}
        >
          <span className="sp-participant-icon" aria-hidden="true">
            <i className={`ti ${item.icon}`} />
          </span>
          <span className="sp-participant-label">{item.label}</span>

          {index < PARTICIPANTS.length - 1 && (
            <i
              className="ti ti-arrows-left-right sp-participant-link"
              aria-hidden="true"
            />
          )}
        </li>
      ))}
    </ol>
  );
}

/* ------------------------------------------------------------------
   03 — Counter-Positioning: two models and the conflict between them
------------------------------------------------------------------ */
const MODEL_ROWS = [
  {
    topic: "How it makes money",
    established: "Revenue from the model it has always used, such as per-item fees.",
    entrant: "Revenue from a different model, such as a flat subscription.",
  },
  {
    topic: "What it depends on",
    established: "Existing assets, customers, and habits.",
    entrant: "A fresh setup built around the new model.",
  },
  {
    topic: "What copying would mean",
    established:
      "Giving up some current revenue and straining the existing business.",
    entrant: "Nothing to give up. It started this way.",
  },
];

export function CounterPositioningVisual() {
  return (
    <figure className="sp-vis">
      <figcaption className="sp-vis-caption">
        Two business models, and why copying one can be costly
      </figcaption>

      <div className="sp-models">
        <div className="sp-models-head" aria-hidden="true">
          <span />
          <span className="sp-model-name">Established model</span>
          <span className="sp-model-name is-new">New model</span>
        </div>

        {MODEL_ROWS.map((row) => (
          <div key={row.topic} className="sp-model-row">
            <p className="sp-model-topic">{row.topic}</p>

            <p className="sp-model-cell">
              <span className="sp-model-mobile-label">Established</span>
              {row.established}
            </p>

            <p className="sp-model-cell is-new">
              <span className="sp-model-mobile-label">New</span>
              {row.entrant}
            </p>
          </div>
        ))}
      </div>

      <div className="sp-conflict">
        <i className="ti ti-bolt" aria-hidden="true" />
        <p>
          <strong>The conflict:</strong> the established company would have
          to weaken what already works for it in order to copy the new
          model.
        </p>
      </div>
    </figure>
  );
}

/* ------------------------------------------------------------------
   04 — Switching Costs: the path from one provider to another
------------------------------------------------------------------ */
const SWITCH_STOPS = [
  {
    icon: "ti-database-export",
    title: "Data Migration",
    text: "Moving files, email, and records takes time and can risk errors.",
    cost: "Time and risk",
  },
  {
    icon: "ti-school",
    title: "Employee Training",
    text: "People have to learn new tools, which costs time and money.",
    cost: "Time and money",
  },
  {
    icon: "ti-git-branch",
    title: "Workflow Changes",
    text: "Habits and processes built around the old tool must be rebuilt.",
    cost: "Effort",
  },
  {
    icon: "ti-plug-connected",
    title: "System Integration",
    text: "Other tools connected to the old system may need reconnecting.",
    cost: "Effort and risk",
  },
];

export function SwitchingVisual() {
  return (
    <figure className="sp-vis">
      <figcaption className="sp-vis-caption">
        What it can take to change providers
      </figcaption>

      <ol className="sp-path">
        <li className="sp-path-end">
          <span className="sp-path-dot" aria-hidden="true">
            <i className="ti ti-building-store" />
          </span>
          <strong>Current provider</strong>
        </li>

        {SWITCH_STOPS.map((stop) => (
          <li key={stop.title} className="sp-path-stop">
            <span className="sp-path-dot" aria-hidden="true">
              <i className={`ti ${stop.icon}`} />
            </span>

            <div>
              <p className="sp-path-title">
                {stop.title}
                <span className="sp-path-cost">{stop.cost}</span>
              </p>
              <p className="sp-path-text">{stop.text}</p>
            </div>
          </li>
        ))}

        <li className="sp-path-end is-goal">
          <span className="sp-path-dot" aria-hidden="true">
            <i className="ti ti-flag" />
          </span>
          <strong>New provider</strong>
        </li>
      </ol>

      <p className="sp-fine">
        Each stop adds time, money, effort, or risk. Together they can make
        staying easier than leaving.
      </p>
    </figure>
  );
}

/* ------------------------------------------------------------------
   05 — Branding: same features, different perception
------------------------------------------------------------------ */
export function BrandingVisual() {
  return (
    <figure className="sp-vis">
      <figcaption className="sp-vis-caption">
        <span className="sp-tag">Hypothetical example</span>
        Two products with the same features
      </figcaption>

      <div className="sp-brand">
        <div className="sp-brand-head" aria-hidden="true">
          <span />
          <span className="sp-brand-name is-pref">Product A</span>
          <span className="sp-brand-name">Product B</span>
        </div>

        <div className="sp-brand-row">
          <p className="sp-brand-topic">Product features</p>
          <p className="sp-brand-cell">
            <span className="sp-brand-mobile">Product A</span>
            Same
          </p>
          <p className="sp-brand-cell">
            <span className="sp-brand-mobile">Product B</span>
            Same
          </p>
        </div>

        <div className="sp-brand-row">
          <p className="sp-brand-topic">What customers associate with it</p>
          <p className="sp-brand-cell is-pref">
            <span className="sp-brand-mobile">Product A</span>
            Trusted, distinctive, familiar
          </p>
          <p className="sp-brand-cell">
            <span className="sp-brand-mobile">Product B</span>
            Unfamiliar, no clear meaning
          </p>
        </div>

        <div className="sp-brand-row">
          <p className="sp-brand-topic">Customer preference</p>
          <p className="sp-brand-cell is-pref">
            <span className="sp-brand-mobile">Product A</span>
            <i className="ti ti-heart-filled" aria-hidden="true" />
            Preferred
          </p>
          <p className="sp-brand-cell">
            <span className="sp-brand-mobile">Product B</span>
            Considered
          </p>
        </div>
      </div>

      <p className="sp-fine">
        The features are identical, so the difference sits in customers'
        minds. In real life, brand preference is hard to measure and can
        change.
      </p>
    </figure>
  );
}

/* ------------------------------------------------------------------
   06 — Cornered Resource: access for one, a closed door for the rest
------------------------------------------------------------------ */
export function CorneredVisual() {
  const rivals = [34, 100, 166];

  return (
    <figure className="sp-vis">
      <figcaption className="sp-vis-caption">
        One business can reach the resource. Its rivals cannot.
      </figcaption>

      <svg
        viewBox="0 0 360 200"
        className="sp-access"
        role="img"
        aria-label="Diagram: a business has a direct connection to a valuable resource, while three competitors are blocked from reaching it"
      >
        {/* competitors: dashed, blocked */}
        {rivals.map((y) => (
          <g key={y}>
            <line
              x1="296"
              y1={y}
              x2="212"
              y2="100"
              stroke="#9a9a96"
              strokeWidth="1.5"
              strokeDasharray="5 5"
            />
            <circle cx="236" cy={Math.round(100 + (y - 100) * 0.286)} r="9" fill="#ffffff" stroke="#9a9a96" />
            <path
              d={`M${232} ${Math.round(100 + (y - 100) * 0.286) - 4} L${240} ${Math.round(100 + (y - 100) * 0.286) + 4} M${240} ${Math.round(100 + (y - 100) * 0.286) - 4} L${232} ${Math.round(100 + (y - 100) * 0.286) + 4}`}
              stroke="#9a9a96"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
            <rect x="296" y={y - 16} width="58" height="32" rx="10" fill="#f1efe8" />
            <text x="325" y={y + 4} textAnchor="middle" fontSize="11" fill="#5f5e5a">
              Rival
            </text>
          </g>
        ))}

        {/* the business: solid connection */}
        <line x1="86" y1="100" x2="160" y2="100" stroke="var(--sp-accent)" strokeWidth="2.5" />

        <rect x="6" y="76" width="84" height="48" rx="14" fill="var(--sp-accent)" />
        <text x="48" y="105" textAnchor="middle" fontSize="13" fontWeight="600" fill="#ffffff">
          Business
        </text>

        {/* the resource */}
        <circle cx="186" cy="100" r="28" fill="var(--sp-tint)" stroke="var(--sp-accent)" strokeWidth="2" />
        <path
          d="M176 96 L181 90 H191 L196 96 L186 112 Z"
          fill="none"
          stroke="var(--sp-accent)"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <text x="186" y="146" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--sp-ink)">
          Valuable resource
        </text>
      </svg>

      <p className="sp-fine">
        The advantage depends on the resource staying valuable and on rivals
        staying unable to match the access.
      </p>
    </figure>
  );
}

/* ------------------------------------------------------------------
   07 — Process Power: from trying things to an embedded capability
------------------------------------------------------------------ */
const STAIRS = [
  { label: "Try", text: "Teams experiment with ways of working.", height: 74 },
  {
    label: "Learn",
    text: "Successes and mistakes are studied and shared.",
    height: 112,
  },
  {
    label: "Standardize",
    text: "What works becomes the normal way to do the job.",
    height: 150,
  },
  {
    label: "Embed",
    text: "Skills and habits spread across the whole organization.",
    height: 188,
  },
];

export function ProcessVisual() {
  return (
    <figure className="sp-vis">
      <figcaption className="sp-vis-caption">
        How a way of working can become a capability
      </figcaption>

      <ol className="sp-stairs">
        {STAIRS.map((step, index) => (
          <li
            key={step.label}
            className={`sp-stair${
              index === STAIRS.length - 1 ? " is-top" : ""
            }`}
            style={{ minHeight: step.height }}
          >
            <span className="sp-stair-num" aria-hidden="true">
              {index + 1}
            </span>
            <p className="sp-stair-label">{step.label}</p>
            <p className="sp-stair-text">{step.text}</p>
          </li>
        ))}
      </ol>

      <p className="sp-stairs-axis">
        <i className="ti ti-arrow-right" aria-hidden="true" />
        Years of repetition and learning
      </p>

      <p className="sp-fine">
        Real systems take years to build, and not every efficient process
        becomes hard to copy.
      </p>
    </figure>
  );
}