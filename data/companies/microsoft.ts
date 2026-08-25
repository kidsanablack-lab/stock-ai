import type { CompanyProfile } from "@/types/company";

export const microsoftProfile: CompanyProfile = {
  identity: {
    name: "Microsoft Corporation",
    ticker: "MSFT",
    exchange: "NASDAQ",
    industry: "Technology",
    logoInitial: "M",
    tagline:
      "Builds the cloud, AI, and productivity platforms that businesses run on — from Windows and Microsoft 365 to Azure and Copilot.",
  },

  scopeScore: {
    score: 9.3,
    label: "Excellent",
  },

  overview: {
    whatItDoes:
      "Microsoft builds the cloud, AI, and productivity platforms that businesses run on — from Windows and Microsoft 365 to Azure and Copilot.",
    founded: "1975",
    headquarters: "Redmond, Washington",
    ceo: "Satya Nadella",
    ceoSince: "2014",
    marketCap: "$3.58T",
    marketCapRank: "#4 in the world",
    revenue: "$281.7B",
    revenueYoY: "+15% YoY",
    revenueFiscalYear: "FY25",
  },

  snapshot: [
    {
      label: "Quality",
      icon: "shield-check",
      tone: "good",
      rating: { kind: "stars", value: 5, outOf: 5 },
    },
    {
      label: "Moat",
      icon: "shield-lock",
      tone: "good",
      rating: { kind: "stars", value: 5, outOf: 5 },
    },
    {
      label: "Profitability",
      icon: "coin",
      tone: "good",
      rating: { kind: "bars", value: 5, outOf: 5 },
    },
    {
      label: "Revenue growth",
      icon: "trending-up",
      tone: "good",
      rating: { kind: "arrow", label: "Growing" },
    },
    {
      label: "Risk",
      icon: "alert-triangle",
      tone: "risk",
      rating: { kind: "badge", label: "Moderate" },
    },
    {
      label: "Valuation",
      icon: "scale",
      tone: "neutral",
      rating: { kind: "badge", label: "Rich" },
    },
  ],

  thirtySecondSummary: {
    subtitle: "A plain-English explanation of Microsoft's business model",
    content:
      "Microsoft earns most of its money from subscriptions and cloud consumption rather than one-time software sales — led by Azure, Microsoft 365, and a fast-growing AI business built around Copilot and its partnership with OpenAI. Its biggest advantage is how deeply its software is already embedded in how businesses operate, which makes switching providers slow, expensive, and disruptive.",
  },

  businessSegments: {
    totalRevenue: "$281.7B",
    fiscalYearLabel: "FY25 revenue",
    segments: [
      {
        name: "Productivity and Business Processes",
        amount: "$120.8B",
        percentage: 42.9,
        yoyChange: "+13% YoY",
        yoyTrend: "up",
        color: "#2a9d8f",
      },
      {
        name: "Intelligent Cloud",
        amount: "$106.3B",
        percentage: 37.7,
        yoyChange: "+21% YoY",
        yoyTrend: "up",
        color: "#1d3557",
      },
      {
        name: "More Personal Computing",
        amount: "$54.6B",
        percentage: 19.4,
        yoyChange: "+7.5% YoY",
        yoyTrend: "up",
        color: "#f4a261",
      },
    ],
    insight:
      "Intelligent Cloud is growing more than 1.5x faster than Productivity and Business Processes, driven mainly by Azure — and it's steadily closing the gap on becoming Microsoft's largest segment.",
    footnote:
      "Fiscal year 2025 (ended June 30, 2025). Intelligent Cloud includes Azure, server products, and enterprise services; More Personal Computing includes Windows, Gaming, Surface, and Search advertising. In August 2024 Microsoft restructured its segments, moving commercial Microsoft 365 into Productivity and Business Processes.",
  },

  businessModel: {
    stages: [
      {
        title: "License & Subscribe",
        icon: "key",
        color: "#3b82f6",
        backgroundTint: "#eff6ff",
        tagTextColor: "#1d4ed8",
        tags: [
          { label: "Windows", icon: "device-desktop" },
          { label: "Microsoft 365", icon: "apps" },
          { label: "Azure", icon: "cloud" },
          { label: "GitHub", icon: "brand-github" },
        ],
      },
      {
        title: "Use Cloud, Data & AI",
        icon: "cloud",
        color: "#14b8a6",
        backgroundTint: "#f0fdfa",
        tagTextColor: "#0f766e",
        tags: [
          { label: "Copilot", icon: "sparkles" },
          { label: "Power Platform", icon: "bolt" },
          { label: "Teams", icon: "users" },
          { label: "Dynamics 365", icon: "building-bank" },
        ],
      },
      {
        title: "Locked Into the Platform",
        icon: "lock",
        color: "#f59e0b",
        backgroundTint: "#fffbeb",
        tagTextColor: "#b45309",
        tags: [
          { label: "Data", icon: "database" },
          { label: "Identity", icon: "fingerprint" },
          { label: "Compliance", icon: "shield-check" },
        ],
      },
    ],
    repeatNote: "Recurring revenue renews with every subscription cycle",
    insight:
      "Each layer — the license, the cloud usage, and the integrated data and workflows built on top — adds another reason switching providers would mean rebuilding a business's operations from scratch, which is why more of Microsoft's revenue is recurring rather than one-time.",
  },

  strengthsAndRisks: {
    strengths: [
      {
        icon: "building-bank",
        title: "Enterprise entrenchment",
        description: "Deeply embedded in how large organizations already operate",
      },
      {
        icon: "apps",
        title: "Bundled ecosystem",
        description: "Windows, Microsoft 365, Azure, and Teams reinforce each other",
      },
      {
        icon: "cloud",
        title: "Cloud scale",
        description: "Azure is one of the world's largest cloud infrastructure platforms",
      },
      {
        icon: "refresh",
        title: "Recurring revenue",
        description: "Subscriptions and cloud consumption replace one-time software sales",
      },
      {
        icon: "cash",
        title: "Balance sheet strength",
        description: "Strong cash generation funds AI investment, buybacks, and dividends",
      },
    ],
    risks: [
      {
        icon: "trending-down",
        title: "Falling free cash flow",
        description: "AI infrastructure spending is outpacing cash-flow growth",
      },
      {
        icon: "server",
        title: "Capex intensity",
        description: "Data center and chip spending is rising faster than revenue",
      },
      {
        icon: "gavel",
        title: "Regulatory scrutiny",
        description: "Antitrust and competition regulators are watching cloud and AI bundling",
      },
      {
        icon: "swords",
        title: "AI competition",
        description: "Google, Amazon, and other frontier labs are racing on the same ground",
      },
      {
        icon: "link",
        title: "OpenAI dependency",
        description: "A large share of Microsoft's AI roadmap runs through a single partner",
      },
    ],
  },

  financialOverview: {
    fiscalYearLabel: "Fiscal year 2025 (ended June 30, 2025)",
    metrics: [
      {
        label: "Revenue",
        icon: "report-money",
        value: "$281.7B",
        changeLabel: "+15% YoY",
        changeTrend: "up",
        sublabel: "vs. $245.1B in FY24",
      },
      {
        label: "Net Income",
        icon: "coin",
        value: "$101.8B",
        changeLabel: "+16% YoY",
        changeTrend: "up",
        sublabel: "36.1% margin",
      },
      {
        label: "Free Cash Flow",
        icon: "droplet",
        value: "$71.6B",
        changeLabel: "-3.4% YoY",
        changeTrend: "down",
        sublabel: "25.4% margin",
      },
    ],
    insight:
      "Free cash flow slipped even as revenue and net income grew — capital expenditures on AI infrastructure have nearly tripled since FY2022, and that gap is the number to watch if the AI buildout doesn't pay off as fast as the spending is growing.",
  },

  financialHistory: {
    rangeLabel: "5-year trend, fiscal years 2021–2025",
    panels: [
      {
        label: "Revenue",
        icon: "report-money",
        color: "#93c5fd",
        highlightColor: "#1d4ed8",
        years: ["'21", "'22", "'23", "'24", "'25"],
        values: [168.1, 198.3, 211.9, 245.1, 281.7],
        currentValueLabel: "$281.7B",
        changeNote: "+67.6% since FY21",
        changeTrend: "up",
      },
      {
        label: "Net Income",
        icon: "coin",
        color: "#5eead4",
        highlightColor: "#0f766e",
        years: ["'21", "'22", "'23", "'24", "'25"],
        values: [61.3, 72.7, 72.4, 88.1, 101.8],
        currentValueLabel: "$101.8B",
        changeNote: "+66.1% since FY21",
        changeTrend: "up",
      },
      {
        label: "Free Cash Flow",
        icon: "droplet",
        color: "#fcd34d",
        highlightColor: "#b45309",
        years: ["'21", "'22", "'23", "'24", "'25"],
        values: [56.1, 65.1, 59.5, 74.1, 71.6],
        currentValueLabel: "$71.6B",
        changeNote: "+27.6% since FY21, down from FY24 peak",
        changeTrend: "down",
      },
    ],
  },

  ecosystem: {
    suppliers: [
      {
        name: "NVIDIA",
        description: "Primary GPU supplier powering Azure's AI infrastructure",
        icon: "cpu",
        color: "#5a8f00",
        backgroundTint: "#eafbe0",
      },
      {
        name: "AMD",
        description: "Supplies CPUs and AI accelerators for Microsoft's datacenters",
        icon: "server",
        color: "#c8102e",
        backgroundTint: "#fde8e8",
      },
      {
        name: "OpenAI",
        description:
          "Strategic AI partner, not a vendor — Microsoft holds roughly a 27% stake (~$135B) and exclusive rights to OpenAI's models for products through 2032",
        icon: "sparkles",
        color: "#10a37f",
        backgroundTint: "#e6f7f2",
      },
    ],
    centerLabel: "Microsoft",
    centerSublabel: "The platform",
    output: {
      name: "Enterprises & Developers",
      description: "Millions of organizations and developers build on Azure, Microsoft 365, and GitHub",
      icon: "code",
      color: "#2a9d8f",
      backgroundTint: "#e6f5f3",
    },
    flowInLabel: "← Compute & AI models flow in",
    flowOutLabel: "Software & cloud value flows out →",
    insight:
      "Microsoft's stake in OpenAI is now worth roughly $135 billion — but as of an April 2026 amendment, OpenAI is no longer required to run exclusively on Azure, so Microsoft's edge is shifting from lock-in toward integration and distribution.",
  },

  competitors: {
    contextNote:
      "Companies that compete with Microsoft across cloud infrastructure, productivity software, and AI. Market cap shown relative to Microsoft's $3.58T.",
    competitors: [
      {
        name: "Amazon",
        icon: "brand-amazon",
        color: "#FF9900",
        backgroundTint: "#fff4e0",
        tagTextColor: "#a15c00",
        marketCap: "$2.99T",
        relativeSize: 84,
        tag: "Cloud Infrastructure (AWS)",
        relationship: "Direct rival — AWS remains the largest cloud provider and competes head-on with Azure for enterprise workloads",
      },
      {
        name: "Alphabet",
        icon: "brand-google",
        color: "#2a9d8f",
        backgroundTint: "#e6f5f3",
        tagTextColor: "#0f766e",
        marketCap: "$4.55T",
        relativeSize: 100,
        tag: "Cloud, AI & Search",
        relationship:
          "Closest rival — competes directly in cloud (Google Cloud vs Azure), productivity (Workspace vs Microsoft 365), and frontier AI (Gemini vs Copilot)",
      },
      {
        name: "Apple",
        icon: "brand-apple",
        color: "#1a1a18",
        backgroundTint: "#ececea",
        tagTextColor: "#4b4b47",
        marketCap: "$4.50T",
        relativeSize: 100,
        tag: "Devices & Consumer Software",
        relationship: "Different arena — minimal overlap, since Microsoft has almost no consumer hardware business",
      },
      {
        name: "Meta",
        icon: "brand-meta",
        color: "#6c63d9",
        backgroundTint: "#efefff",
        tagTextColor: "#5650ad",
        marketCap: "$1.90T",
        relativeSize: 53,
        tag: "AI & Social Platforms",
        relationship:
          "Partial overlap — competes in AI research and enterprise collaboration tools, but not in cloud infrastructure or productivity software",
      },
    ],
    insight:
      "Alphabet is Microsoft's most direct competitor today — the two now compete head-to-head in cloud, productivity, and frontier AI at once, a three-front rivalry that barely existed before generative AI.",
  },
};