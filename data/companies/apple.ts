import type { CompanyProfile } from "@/types/company";

export const appleProfile: CompanyProfile = {
  identity: {
    name: "Apple Inc.",
    ticker: "AAPL",
    exchange: "NASDAQ",
    industry: "Technology",
    logoInitial: "A",
    logo: "/logos/apple-logo-svgrepo-com.svg",
    tagline:
      "Designs premium hardware, software and services that work together as one of the world's most loyal technology ecosystems.",
  },

  scopeScore: {
    score: 9.5,
    label: "Excellent",
  },

  overview: {
    whatItDoes:
      "Apple designs premium hardware, software and services that work together as one of the world's most loyal technology ecosystems.",
    founded: "1976",
    headquarters: "Cupertino, California",
    ceo: "Tim Cook",
    ceoSince: "2011",
    marketCap: "$4.75T",
    marketCapRank: "#2 in the world",
    revenue: "$416.2B",
    revenueYoY: "+6.4% YoY",
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
      rating: { kind: "badge", label: "Fair" },
    },
  ],

  thirtySecondSummary: {
    subtitle: "A plain-English explanation of Apple's business model",
    content:
      "Apple generates most of its revenue from the iPhone while rapidly expanding high-margin services such as the App Store, iCloud, Apple Music, and Apple TV+. Its biggest competitive advantage is its integrated ecosystem, which keeps customers loyal and drives repeat purchases.",
  },

  businessSegments: {
    totalRevenue: "$416.2B",
    fiscalYearLabel: "FY25 revenue",
    segments: [
      {
        name: "iPhone",
        amount: "$209.6B",
        percentage: 50.4,
        yoyChange: "+4% YoY",
        yoyTrend: "up",
        color: "#1d3557",
      },
      {
        name: "Services",
        amount: "$109.2B",
        percentage: 26.2,
        yoyChange: "+14% YoY",
        yoyTrend: "up",
        color: "#2a9d8f",
      },
      {
        name: "Wearables, Home & Accessories",
        amount: "$35.7B",
        percentage: 8.6,
        yoyChange: "-4% YoY",
        yoyTrend: "down",
        color: "#e76f51",
      },
      {
        name: "Mac",
        amount: "$33.7B",
        percentage: 8.1,
        yoyChange: "+12% YoY",
        yoyTrend: "up",
        color: "#f4a261",
      },
      {
        name: "iPad",
        amount: "$28.0B",
        percentage: 6.7,
        yoyChange: "+5% YoY",
        yoyTrend: "up",
        color: "#8d99ae",
      },
    ],
    insight:
      "iPhone still drives half of Apple's revenue — but Services is now growing over 3x faster, and has become the company's second-largest segment.",
    footnote:
      "Fiscal year 2025 (ended Sept 27, 2025). Services includes App Store, iCloud, Apple Music, AppleCare, Apple Pay, and advertising revenue — Apple does not break these out individually.",
  },

  businessModel: {
    stages: [
      {
        title: "Buy hardware",
        icon: "device-mobile",
        color: "#3b82f6",
        backgroundTint: "#eff6ff",
        tagTextColor: "#1d4ed8",
        tags: [
          { label: "iPhone", icon: "device-mobile" },
          { label: "Mac", icon: "device-laptop" },
          { label: "iPad", icon: "device-tablet" },
          { label: "Watch", icon: "device-watch" },
        ],
      },
      {
        title: "Use ecosystem services",
        icon: "apps",
        color: "#14b8a6",
        backgroundTint: "#f0fdfa",
        tagTextColor: "#0f766e",
        tags: [
          { label: "App Store", icon: "download" },
          { label: "iCloud", icon: "cloud" },
          { label: "Music", icon: "music" },
          { label: "Pay", icon: "wallet" },
          { label: "Intelligence", icon: "sparkles" },
        ],
      },
      {
        title: "Locked into ecosystem",
        icon: "lock",
        color: "#f59e0b",
        backgroundTint: "#fffbeb",
        tagTextColor: "#b45309",
        tags: [
          { label: "Data", icon: "database" },
          { label: "Subscriptions", icon: "calendar-repeat" },
          { label: "Habits", icon: "heart" },
        ],
      },
    ],
    repeatNote: "Repeats with every new device cycle",
    insight:
      "The services stage isn't sequential — App Store, iCloud, Music, Pay, and Apple Intelligence all run in parallel once you own an Apple device, and each one makes switching brands a little harder.",
  },

  strengthsAndRisks: {
    strengths: [
      {
        icon: "award",
        title: "Brand",
        description: "One of the strongest premium brands in the world",
      },
      {
        icon: "apps",
        title: "Ecosystem",
        description: "Devices and services locked tightly together",
      },
      {
        icon: "tag",
        title: "Pricing power",
        description: "Can charge more than rivals without losing customers",
      },
      {
        icon: "heart",
        title: "Loyalty",
        description: "High repeat-purchase and satisfaction rates",
      },
      {
        icon: "cash",
        title: "Cash & balance sheet",
        description: "Massive cash reserves fund buybacks and dividends",
      },
    ],
    risks: [
      {
        icon: "map-pin",
        title: "China",
        description: "Heavy reliance on Chinese market and supply chain",
      },
      {
        icon: "device-mobile",
        title: "iPhone concentration",
        description: "Half of revenue tied to a single product",
      },
      {
        icon: "gavel",
        title: "Regulation",
        description: "Antitrust and App Store scrutiny worldwide",
      },
      {
        icon: "bulb-off",
        title: "Innovation slowdown",
        description: "No major new category since Apple Watch (2015)",
      },
      {
        icon: "swords",
        title: "Competition",
        description: "Android and AI-native devices closing the gap",
      },
    ],
  },

  financialOverview: {
    fiscalYearLabel: "Fiscal year 2025 (ended Sept 27, 2025)",
    metrics: [
      {
        label: "Revenue",
        icon: "report-money",
        value: "$416.2B",
        changeLabel: "+6.4% YoY",
        changeTrend: "up",
        sublabel: "vs. $391.0B in FY24",
      },
      {
        label: "Net Income",
        icon: "coin",
        value: "$112.0B",
        changeLabel: "+19.5% YoY",
        changeTrend: "up",
        sublabel: "26.9% margin",
      },
      {
        label: "Free Cash Flow",
        icon: "droplet",
        value: "$98.8B",
        changeLabel: "-9.2% YoY",
        changeTrend: "down",
        sublabel: "23.7% margin",
      },
    ],
    insight:
      "FCF fell even as revenue and net income grew — a gap worth watching, since it's the cash Apple actually has on hand for buybacks and dividends.",
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
        values: [365.8, 394.3, 383.3, 391.0, 416.2],
        currentValueLabel: "$416.2B",
        changeNote: "+13.9% since FY21",
        changeTrend: "up",
      },
      {
        label: "Net Income",
        icon: "coin",
        color: "#5eead4",
        highlightColor: "#0f766e",
        years: ["'21", "'22", "'23", "'24", "'25"],
        values: [94.7, 99.8, 97.0, 93.7, 112.0],
        currentValueLabel: "$112.0B",
        changeNote: "+18.3% since FY21",
        changeTrend: "up",
      },
      {
        label: "Free Cash Flow",
        icon: "droplet",
        color: "#fcd34d",
        highlightColor: "#b45309",
        years: ["'21", "'22", "'23", "'24", "'25"],
        values: [93.0, 111.4, 99.6, 108.8, 98.8],
        currentValueLabel: "$98.8B",
        changeNote: "+6.2% since FY21, down from FY22 peak",
        changeTrend: "down",
      },
    ],
  },

  ecosystem: {
    suppliers: [
      {
        name: "TSMC",
        description: "Manufactures all A-series and M-series chips",
        icon: "cpu",
        color: "#1d3557",
        backgroundTint: "#e7edf5",
      },
      {
        name: "Foxconn",
        description: "Assembles most iPhones worldwide",
        icon: "tools",
        color: "#e76f51",
        backgroundTint: "#fbe9e5",
      },
      {
        name: "Samsung Display",
        description: "Key supplier of OLED screens",
        icon: "device-mobile",
        color: "#f4a261",
        backgroundTint: "#fdf1e5",
      },
    ],
    centerLabel: "Apple",
    centerSublabel: "The hub",
    output: {
      name: "App Developers",
      description: "60M+ developers build on Apple's platforms",
      icon: "code",
      color: "#2a9d8f",
      backgroundTint: "#e6f5f3",
    },
    flowInLabel: "← Hardware flows in",
    flowOutLabel: "Software value flows out →",
    insight:
      "The App Store ecosystem generated $1.4 trillion in developer billings in 2025 — over 90% of it kept by developers, with no Apple commission at all.",
  },

  competitors: {
    contextNote:
      "Companies that compete with Apple across hardware, software, AI, and digital services. Market cap shown relative to Apple's $4.75T.",
    competitors: [
      {
        name: "Samsung",
        icon: "device-mobile",
        color: "#1d3557",
        backgroundTint: "#e7edf5",
        tagTextColor: "#1d3557",
        marketCap: "$1.14T",
        relativeSize: 24,
        tag: "Smartphones & Displays",
        relationship: "Direct rival — sells competing phones to the same customers",
      },
      {
        name: "Google",
        icon: "brand-google",
        color: "#2a9d8f",
        backgroundTint: "#e6f5f3",
        tagTextColor: "#0f766e",
        marketCap: "$4.0T",
        relativeSize: 84,
        tag: "AI, Search & Android",
        relationship:
          "Frenemy — rival in AI/Android, but also pays Apple billions to stay Safari's default search",
      },
      {
        name: "Microsoft",
        icon: "brand-windows",
        color: "#e76f51",
        backgroundTint: "#fbe9e5",
        tagTextColor: "#c1502f",
        marketCap: "$2.89T",
        relativeSize: 61,
        tag: "Cloud, AI & Enterprise",
        relationship:
          "Different arena — barely overlaps, since Apple has almost no cloud/enterprise business",
      },
      {
        name: "Meta",
        icon: "brand-meta",
        color: "#6c63d9",
        backgroundTint: "#efefff",
        tagTextColor: "#5650ad",
        marketCap: "$1.8T",
        relativeSize: 38,
        tag: "Social, AI & Reality",
        relationship:
          "Platform rival — competes with Apple for user attention, AI, and the next generation of computing",
      },
    ],
    insight:
      "Google is Apple's closest rival by size — but the two rarely compete head-on for the same customer, since Google's business is ads and AI, not hardware.",
  },
};