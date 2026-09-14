import type { CompanyProfile } from "@/types/company";

export const metaProfile: CompanyProfile = {
  identity: {
    name: "Meta Platforms, Inc.",
    brandName: "Meta",
    ticker: "META",
    exchange: "NASDAQ",
    industry: "Technology / Social Media & Digital Advertising",
    logoInitial: "M",
    logo: "/logos/meta-color.svg",
    tagline:
      "Connects billions of people through Facebook, Instagram, WhatsApp and Messenger, and monetizes that attention primarily through digital advertising.",
  },

  scopeScore: {
    score: 9.2,
    label: "Excellent",
  },

  overview: {
    whatItDoes:
      "Meta builds social media, messaging, AI and immersive technology products — including Facebook, Instagram, Messenger, WhatsApp, Threads, Meta AI, Meta Quest, and Ray-Ban Meta / Oakley Meta smart glasses — that connect billions of people while generating most of its revenue from digital advertising.",
    founded: "2004",
    headquarters: "Menlo Park, California",
    ceo: "Mark Zuckerberg",
    ceoSince: "2004",
    marketCap: {
      value: 1.57,
      unit: "T",
    },
    marketCapRank: "#10 in the world",
    revenue: {
      value: 200.966,
      unit: "B",
    },
    revenueYoY: {
      value: 22,
    },
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
      rating: { kind: "arrow", label: "Strong" },
    },
    {
      label: "Risk",
      icon: "alert-triangle",
      tone: "risk",
      rating: { kind: "badge", label: "Medium-High" },
    },
    {
      label: "Valuation",
      icon: "scale",
      tone: "neutral",
      rating: { kind: "badge", label: "Moderate" },
    },
  ],

  thirtySecondSummary: {
    subtitle:
      "A global social and technology platform powered primarily by digital advertising.",
    content:
      "Meta connects billions of people through Facebook, Instagram, WhatsApp, Messenger and other platforms. Its core business is digital advertising: businesses pay Meta to reach users with targeted ads. Meta then reinvests those profits into AI, data centers, messaging, smart glasses and immersive technologies such as Reality Labs.",
  },

  businessSegments: {
    totalRevenue: {
      value: 200.966,
      unit: "B",
    },
    fiscalYearLabel: "FY25 revenue",
    segments: [
      {
        name: "Family of Apps",
        amount: {
          value: 198.759,
          unit: "B",
        },
        percentage: 98.9,
        yoyChange: {
          value: 22,
        },
        color: "#0866FF",
      },
      {
        name: "Reality Labs",
        amount: {
          value: 2.207,
          unit: "B",
        },
        percentage: 1.1,
        yoyChange: {
          value: 3,
        },
        color: "#8b5cf6",
      },
    ],
    insight:
      "Family of Apps is nearly the entire business — within it, digital advertising alone brought in about $196.2B, roughly 97.6% of Meta's total revenue. Reality Labs is still a rounding error on the top line, even as it absorbs billions in investment.",
    footnote:
      "Fiscal year 2025 (ended Dec 31, 2025). Family of Apps includes Facebook, Instagram, Messenger, WhatsApp, and Threads; Reality Labs includes Meta Quest, Ray-Ban Meta / Oakley Meta smart glasses, and related AR/VR hardware and software. These are Meta's two official reportable segments — Meta does not report Facebook, Instagram, or WhatsApp as separate financial segments.",
  },

  businessModel: {
    stages: [
      {
        title: "Attract Users",
        icon: "users",
        color: "#0866FF",
        backgroundTint: "#eef4ff",
        tagTextColor: "#0a4bc4",
        tags: [
          { label: "Facebook", icon: "brand-facebook" },
          { label: "Instagram", icon: "brand-instagram" },
          { label: "WhatsApp", icon: "brand-whatsapp" },
          { label: "Messenger", icon: "message-circle" },
          { label: "Threads", icon: "at" },
        ],
      },
      {
        title: "Generate Engagement",
        icon: "heart",
        color: "#e1306c",
        backgroundTint: "#fdf0f4",
        tagTextColor: "#b1224f",
        tags: [
          { label: "Feed", icon: "layout-list" },
          { label: "Reels", icon: "video" },
          { label: "Stories", icon: "circle-dot" },
          { label: "Groups", icon: "users-group" },
        ],
      },
      {
        title: "Monetize Attention",
        icon: "report-money",
        color: "#14b8a6",
        backgroundTint: "#f0fdfa",
        tagTextColor: "#0f766e",
        tags: [
          { label: "Ads Manager", icon: "target" },
          { label: "Businesses", icon: "building-store" },
          { label: "Marketplace", icon: "shopping-cart" },
        ],
      },
      {
        title: "Improve Targeting",
        icon: "sparkles",
        color: "#f59e0b",
        backgroundTint: "#fffbeb",
        tagTextColor: "#b45309",
        tags: [
          { label: "Meta AI", icon: "brain" },
          { label: "Ad Ranking", icon: "chart-line" },
          { label: "Data Signals", icon: "database" },
        ],
      },
      {
        title: "Reinvest",
        icon: "refresh",
        color: "#6c63d9",
        backgroundTint: "#efefff",
        tagTextColor: "#5650ad",
        tags: [
          { label: "AI Infrastructure", icon: "cpu" },
          { label: "Data Centers", icon: "server" },
          { label: "Reality Labs", icon: "device-vr" },
        ],
      },
    ],
    repeatNote: "The cycle repeats with every scroll, message, and ad impression",
    insight:
      "This is a flywheel, not a straight line: more users create more engagement, more engagement creates more advertising value, more revenue funds more investment in AI and infrastructure, and better products bring in more users and engagement — each turn of the loop reinforces the next.",
  },

  strengthsAndRisks: {
    strengths: [
      {
        icon: "users",
        title: "Massive global network",
        description: "About 3.58B Family daily active people as of December 2025",
      },
      {
        icon: "report-money",
        title: "Advertising engine",
        description: "One of the two dominant digital ad platforms in the world",
      },
      {
        icon: "apps",
        title: "Multiple major platforms",
        description: "Facebook, Instagram, WhatsApp, and Messenger each command huge audiences",
      },
      {
        icon: "brain",
        title: "AI capabilities",
        description: "Heavy investment in Meta AI and ad-ranking models across every app",
      },
      {
        icon: "cash",
        title: "Cash generation",
        description: "Advertising throws off enormous free cash flow despite heavy capex",
      },
    ],
    risks: [
      {
        icon: "report-money",
        title: "Advertising dependence",
        description: "Nearly all revenue relies on a single, cyclical revenue stream",
      },
      {
        icon: "gavel",
        title: "Regulatory & privacy pressure",
        description: "Antitrust, data-privacy, and content-moderation scrutiny worldwide",
      },
      {
        icon: "server",
        title: "AI infrastructure spending",
        description: "Capital expenditures on AI and data centers are rising sharply",
      },
      {
        icon: "trending-down",
        title: "Reality Labs losses",
        description: "Reality Labs generated $2.207B in revenue but lost $19.193B in FY25",
      },
      {
        icon: "swords",
        title: "Competition",
        description: "TikTok, YouTube, and Snap all compete for the same time and ad dollars",
      },
    ],
  },

  financialOverview: {
    fiscalYearLabel: "Fiscal year 2025 (ended Dec 31, 2025)",
    metrics: [
      {
        label: "Revenue",
        icon: "report-money",
        value: {
          value: 200.966,
          unit: "B",
        },
        change: {
          value: 22,
        },
        sublabel: "vs. $164.5B in FY24",
      },
      {
        label: "Net Income",
        icon: "coin",
        value: {
          value: 60.458,
          unit: "B",
        },
        change: {
          value: -3.1,
        },
        sublabel: "30.1% margin",
      },
      {
        label: "Free Cash Flow",
        icon: "droplet",
        value: {
          value: 43.585,
          unit: "B",
        },
        change: {
          value: -16.3,
        },
        sublabel: "21.7% margin",
      },
    ],
    insight:
      "Revenue grew 22% and stayed comfortably ahead of costs, but net income and free cash flow both slipped from FY24 as AI infrastructure spending and Reality Labs losses ate into the bottom line — worth watching if that gap widens further.",
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
        values: [117.929, 116.609, 134.902, 164.501, 200.966],
        unit: "B",
        currentValueLabel: "$200.966B",
        changeNote: "+70.4% since FY21",
      },
      {
        label: "Net Income",
        icon: "coin",
        color: "#5eead4",
        highlightColor: "#0f766e",
        years: ["'21", "'22", "'23", "'24", "'25"],
        values: [39.370, 23.200, 39.098, 62.360, 60.458],
        unit: "B",
        currentValueLabel: "$60.458B",
        changeNote: "+53.6% since FY21, down slightly from FY24 peak",
      },
      {
        label: "Free Cash Flow",
        icon: "droplet",
        color: "#fcd34d",
        highlightColor: "#b45309",
        years: ["'21", "'22", "'23", "'24", "'25"],
        values: [38.439, 18.439, 43.010, 52.103, 43.585],
        unit: "B",
        currentValueLabel: "$43.585B",
        changeNote: "+13.4% since FY21, down from FY24 peak",
      },
    ],
  },

  ecosystem: {
    partners: [
      {
        name: "NVIDIA",
        description: "Primary supplier of AI GPUs powering Meta's AI infrastructure",
        icon: "cpu",
        color: "#5a8f00",
        backgroundTint: "#eafbe0",
      },
      {
        name: "AMD",
        description: "Supplies AI accelerators for Meta's data centers",
        icon: "server",
        color: "#c8102e",
        backgroundTint: "#fde8e8",
      },
      {
        name: "AWS",
        description: "Provides supplemental cloud and compute capacity",
        icon: "cloud",
        color: "#FF9900",
        backgroundTint: "#fff4e0",
      },
          {
            
      name: "Arm",
      description: "Licenses CPU architecture used in Meta's custom data-center silicon",
      icon: "cpu",
      color: "#1d3557",
      backgroundTint: "#e7edf5",
    },

    {
      name: "Broadcom",
      description: "Co-develops Meta's custom AI training and inference chips",
      icon: "server",
      color: "#e76f51",
      backgroundTint: "#fbe9e5",
    },

    {
      name: "EssilorLuxottica",
      description: "Manufacturing partner for Ray-Ban Meta and Oakley Meta smart glasses",
      icon: "eye",
      color: "#8d99ae",
      backgroundTint: "#eef0f3",
    },
    ],
    centerLabel: "Meta",
    centerSublabel: "The network",
    output: {
      name: "Advertisers & Businesses",
      description: "Millions of businesses pay to reach Meta's global user base with targeted ads",
      icon: "target",
      color: "#2a9d8f",
      backgroundTint: "#e6f5f3",
    },
    flowInLabel: "← Compute & AI infrastructure flows in",
    flowOutLabel: "Advertising reach flows out →",
    insight:
      "Meta doesn't design its own chips end-to-end — it leans on NVIDIA, AMD, Arm, and Broadcom for AI compute, which is why capital spending has climbed so fast as the AI buildout accelerates.",
  },

  competitors: {
    contextNote:
      "Companies that compete with Meta across digital advertising, social media, and AI. Market cap shown relative to Meta's $1.57T. ByteDance (TikTok's parent) is one of Meta's most direct competitors for attention and ad spend but is privately held, so it isn't included here.",
    competitors: [
      {
        name: "Alphabet",
        icon: "brand-google",
        color: "#2a9d8f",
        backgroundTint: "#e6f5f3",
        tagTextColor: "#0f766e",
        marketCap: {
          value: 4.2,
          unit: "T",
        },
        relativeSize: 100,
        tag: "Digital Advertising & AI",
        relationship:
          "Major competitor in digital advertising, AI, and consumer internet services",
      },
      {
        name: "Amazon",
        icon: "brand-amazon",
        color: "#FF9900",
        backgroundTint: "#fff4e0",
        tagTextColor: "#a15c00",
        marketCap: {
          value: 2.75,
          unit: "T",
        },
        relativeSize: 100,
        tag: "Advertising & Cloud",
        relationship:
          "Competes for digital advertising budgets while also operating major AI and cloud infrastructure",
      },
      {
        name: "Snap",
        icon: "brand-snapchat",
        color: "#FFFC00",
        backgroundTint: "#fffde7",
        tagTextColor: "#7c7c00",
        marketCap: {
          value: 9.25,
          unit: "B",
        },
        relativeSize: 1,
        tag: "Social & Messaging",
        relationship:
          "Direct social-media and advertising competitor, particularly among younger audiences and visual communication",
      },
      {
        name: "Pinterest",
        icon: "brand-pinterest",
        color: "#e60023",
        backgroundTint: "#fde8e8",
        tagTextColor: "#b91c1c",
        marketCap: {
          value: 11.55,
          unit: "B",
        },
        relativeSize: 1,
        tag: "Visual Discovery & Commerce",
        relationship:
          "Competes for digital advertising and user attention, particularly around visual discovery and commerce",
      },
    ],
    insight:
      "Alphabet and Amazon dwarf Meta in market cap and compete with far more diversified businesses behind their ad platforms, while Snap and Pinterest are much smaller, narrower rivals fighting for the same attention and ad dollars.",
  },
};