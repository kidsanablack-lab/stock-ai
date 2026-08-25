import type { CompanyProfile } from "@/types/company";

export const googleProfile: CompanyProfile = {
  identity: {
    name: "Alphabet Inc.",
    ticker: "GOOGL",
    exchange: "NASDAQ",
    industry: "Technology",
    logoInitial: "G",
    tagline:
      "Runs the world's dominant search engine, YouTube, and Android, monetized primarily through advertising alongside a fast-growing Cloud business.",
  },

  scopeScore: {
    score: 9.4,
    label: "Excellent",
  },

  overview: {
    whatItDoes:
      "Alphabet is the parent company of Google, running the world's dominant search engine, YouTube, and Android, monetized primarily through search and video advertising, with fast-growing revenue from Google Cloud and subscriptions.",
    founded: "1998",
    headquarters: "Mountain View, California",
    ceo: "Sundar Pichai",
    ceoSince: "2019",
    marketCap: "$4.2T",
    marketCapRank: "#3 in the world",
    revenue: "$402.8B",
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
      rating: { kind: "badge", label: "Attractive" },
    },
  ],

  thirtySecondSummary: {
    subtitle: "A plain-English explanation of Alphabet/Google's business model",
    content:
      "Alphabet earns most of its money from advertising on Search and YouTube, which are free products used by billions of people every day. That scale generates the data and attention Google monetizes through ads, while Google Cloud and subscriptions like YouTube Premium and Google One are growing much faster than the core ad business. Its biggest edge is owning the full AI stack — custom TPU chips, the Gemini models, and DeepMind's research — letting it improve products and ad targeting without depending on another company's AI.",
  },

  businessSegments: {
    totalRevenue: "$402.8B",
    fiscalYearLabel: "FY25 revenue",
    segments: [
      {
        name: "Google Services",
        amount: "$342.7B",
        percentage: 85.0,
        yoyChange: "+12% YoY",
        yoyTrend: "up",
        color: "#4285F4",
      },
      {
        name: "Google Cloud",
        amount: "$58.7B",
        percentage: 14.6,
        yoyChange: "+36% YoY",
        yoyTrend: "up",
        color: "#34A853",
      },
      {
        name: "Other Bets",
        amount: "$1.5B",
        percentage: 0.4,
        yoyChange: "-7% YoY",
        yoyTrend: "down",
        color: "#FBBC05",
      },
    ],
    insight:
      "Google Cloud is now growing three times faster than Google Services — and while it's still under a fifth of revenue, that gap is exactly why AI infrastructure spending has become the company's top priority.",
    footnote:
      "Fiscal year 2025 (ended Dec 31, 2025). Google Services includes Search, YouTube, Android, Chrome, Google Play, Maps, and devices; Google Cloud includes Google Cloud Platform and Google Workspace; Other Bets includes Waymo, Verily, and other early-stage ventures. Total revenue also includes a small hedging loss (-$127M) that isn't allocated to any segment, which is why segment amounts sum to slightly more than the reported total.",
  },

  businessModel: {
    stages: [
      {
        title: "Use Free Products",
        icon: "apps",
        color: "#4285F4",
        backgroundTint: "#eaf1fe",
        tagTextColor: "#1a56c4",
        tags: [
          { label: "Search", icon: "search" },
          { label: "YouTube", icon: "brand-youtube" },
          { label: "Android", icon: "brand-android" },
          { label: "Maps", icon: "map" },
        ],
      },
      {
        title: "Generate Data & Attention",
        icon: "target",
        color: "#34A853",
        backgroundTint: "#e8f8ee",
        tagTextColor: "#1e7e40",
        tags: [
          { label: "Search queries", icon: "search" },
          { label: "Watch time", icon: "player-play" },
          { label: "App usage", icon: "device-mobile" },
          { label: "Location signals", icon: "map-pin" },
        ],
      },
      {
        title: "Monetize via Ads, Cloud & Subscriptions",
        icon: "coin",
        color: "#f59e0b",
        backgroundTint: "#fffbeb",
        tagTextColor: "#b45309",
        tags: [
          { label: "Search Ads", icon: "ad" },
          { label: "YouTube Ads", icon: "brand-youtube" },
          { label: "Google Cloud", icon: "cloud" },
          { label: "Subscriptions", icon: "calendar-repeat" },
        ],
      },
    ],
    repeatNote: "Cycle repeats with every search, video, and app open",
    insight:
      "Search, YouTube, and Android all feed the same pool of data and AI models — so growth in any one product sharpens ad targeting and Cloud's AI infrastructure for all the others, which is what keeps usage climbing.",
  },

  strengthsAndRisks: {
    strengths: [
      {
        icon: "search",
        title: "Search dominance",
        description: "Default search engine across most of the world's smartphones and browsers",
      },
      {
        icon: "database",
        title: "Data & scale",
        description: "Unmatched first-party data across Search, YouTube, Android, and Maps",
      },
      {
        icon: "cpu",
        title: "Full AI stack",
        description: "Owns custom TPU chips, the Gemini models, and DeepMind research end to end",
      },
      {
        icon: "brand-youtube",
        title: "YouTube leadership",
        description: "Largest platform for streaming watch time, ahead of every other video service",
      },
      {
        icon: "cash",
        title: "Cash generation",
        description: "Massive free cash flow funds AI infrastructure without heavy reliance on debt",
      },
    ],
    risks: [
      {
        icon: "gavel",
        title: "Antitrust rulings",
        description: "US and EU antitrust decisions threaten default-placement deals and ad-tech practices",
      },
      {
        icon: "robot",
        title: "AI search disruption",
        description: "ChatGPT and other AI answer engines could divert query volume over time",
      },
      {
        icon: "link",
        title: "Distribution costs",
        description: "Pays billions annually to Apple and others to remain the default search engine",
      },
      {
        icon: "server",
        title: "Capex intensity",
        description: "Guided 2026 capex of $175-185B for AI infrastructure pressures free cash flow",
      },
      {
        icon: "flask",
        title: "Other Bets losses",
        description: "Waymo and other early-stage ventures post growing operating losses",
      },
    ],
  },

  financialOverview: {
    fiscalYearLabel: "Fiscal year 2025 (ended Dec 31, 2025)",
    metrics: [
      {
        label: "Revenue",
        icon: "report-money",
        value: "$402.8B",
        changeLabel: "+15% YoY",
        changeTrend: "up",
        sublabel: "vs. $350.0B in FY24",
      },
      {
        label: "Net Income",
        icon: "coin",
        value: "$132.2B",
        changeLabel: "+32% YoY",
        changeTrend: "up",
        sublabel: "32.8% margin",
      },
      {
        label: "Free Cash Flow",
        icon: "droplet",
        value: "$73.3B",
        changeLabel: "+1% YoY",
        changeTrend: "up",
        sublabel: "18.2% margin",
      },
    ],
    insight:
      "Free cash flow barely moved even as net income jumped 32% — Alphabet is funneling most of its incremental cash straight into AI infrastructure, with 2026 capex guided to $175-185B.",
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
        values: [257.6, 282.8, 307.4, 350.0, 402.8],
        currentValueLabel: "$402.8B",
        changeNote: "+56.4% since FY21",
        changeTrend: "up",
      },
      {
        label: "Net Income",
        icon: "coin",
        color: "#5eead4",
        highlightColor: "#0f766e",
        years: ["'21", "'22", "'23", "'24", "'25"],
        values: [76.0, 60.0, 73.8, 100.1, 132.2],
        currentValueLabel: "$132.2B",
        changeNote: "+73.9% since FY21, despite a FY22 dip",
        changeTrend: "up",
      },
      {
        label: "Free Cash Flow",
        icon: "droplet",
        color: "#fcd34d",
        highlightColor: "#b45309",
        years: ["'21", "'22", "'23", "'24", "'25"],
        values: [67.0, 60.0, 69.5, 72.8, 73.3],
        currentValueLabel: "$73.3B",
        changeNote: "+9.4% since FY21, nearly flat the last two years",
        changeTrend: "up",
      },
    ],
  },

  ecosystem: {
    suppliers: [
      {
        name: "Broadcom",
        description: "Co-designs Google's custom Tensor Processing Unit (TPU) AI chips",
        icon: "cpu",
        color: "#cc0000",
        backgroundTint: "#fbe7e7",
      },
      {
        name: "TSMC",
        description: "Manufactures Google's custom TPU and Axion silicon",
        icon: "building-factory",
        color: "#1d3557",
        backgroundTint: "#e7edf5",
      },
      {
        name: "NVIDIA",
        description: "Supplies GPUs that complement Google's custom chips in Cloud data centers",
        icon: "cpu",
        color: "#5a8f00",
        backgroundTint: "#eafbe0",
      },
    ],
    centerLabel: "Google",
    centerSublabel: "The network",
    output: {
      name: "Users, Advertisers & Developers",
      description:
        "Billions of users, millions of advertisers, and developers building on Search, Android, and Google Cloud",
      icon: "users",
      color: "#4285F4",
      backgroundTint: "#eaf1fe",
    },
    flowInLabel: "← Compute & chips flow in",
    flowOutLabel: "Products, ads & cloud value flow out →",
    insight:
      "Google's custom TPU chips, co-designed with Broadcom and built by TSMC, give it a cost advantage that NVIDIA-dependent rivals don't have — while it still buys NVIDIA GPUs to meet surging Cloud AI demand.",
  },

  competitors: {
    contextNote:
      "Companies that compete with Alphabet/Google across cloud, AI, advertising, social media, and mobile platforms. Market cap shown relative to Alphabet's $4.2T (Aug 2026 snapshot).",
    competitors: [
      {
        name: "Microsoft",
        icon: "brand-windows",
        color: "#00a4ef",
        backgroundTint: "#e6f4fd",
        tagTextColor: "#0369a1",
        marketCap: "$3.62T",
        relativeSize: 86,
        tag: "Cloud, AI & Productivity",
        relationship:
          "Closest rival — competes head-on in cloud (Azure vs Google Cloud), productivity (Microsoft 365 vs Workspace), and frontier AI (Copilot vs Gemini)",
      },
      {
        name: "Amazon",
        icon: "brand-amazon",
        color: "#FF9900",
        backgroundTint: "#fff4e0",
        tagTextColor: "#a15c00",
        marketCap: "$3.0T",
        relativeSize: 71,
        tag: "Cloud Infrastructure (AWS)",
        relationship:
          "Direct cloud rival — AWS remains the largest cloud provider and competes with Google Cloud for the same enterprise workloads",
      },
      {
        name: "Meta",
        icon: "brand-meta",
        color: "#6c63d9",
        backgroundTint: "#efefff",
        tagTextColor: "#5650ad",
        marketCap: "$1.40T",
        relativeSize: 33,
        tag: "Social & Digital Advertising",
        relationship:
          "Ad-dollar rival — competes for the same advertiser budgets across social and display, though there's little overlap in search or cloud",
      },
      {
        name: "Apple",
        icon: "brand-apple",
        color: "#1a1a18",
        backgroundTint: "#ececea",
        tagTextColor: "#4b4b47",
        marketCap: "$4.51T",
        relativeSize: 100,
        tag: "Mobile Platforms & AI",
        relationship:
          "Frenemy — Android's biggest rival in mobile, but Google also pays Apple billions annually to remain Safari's default search engine",
      },
    ],
    insight:
      "Apple is technically larger by market cap, but the deeper rivalry is with Microsoft and Amazon — Alphabet is now fighting a three-front war in cloud, AI, and productivity that barely existed before generative AI.",
  },
};