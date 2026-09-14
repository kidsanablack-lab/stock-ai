import type { CompanyProfile } from "@/types/company";

export const amazonProfile: CompanyProfile = {
  identity: {
    name: "Amazon.com, Inc.",
    ticker: "AMZN",
    exchange: "NASDAQ",
    industry: "Technology",
    logoInitial: "A",
    logo: "/logos/amazon-color-svgrepo-com.svg",
    tagline:
      "Builds the global infrastructure for shopping, cloud computing, digital services, advertising, and AI.",
  },

  scopeScore: {
    score: 9.5,
    label: "Excellent",
  },

  overview: {
    whatItDoes:
      "Amazon operates a global ecosystem spanning e-commerce, cloud computing, digital subscriptions, advertising, logistics, and AI infrastructure through Amazon Web Services.",
    founded: "1994",
    headquarters: "Seattle, Washington",
    ceo: "Andy Jassy",
    ceoSince: "2021",
    marketCap: {
  value: 2.75,
  unit: "T",
},
marketCapRank: "#6 in the world",
revenue: {
  value: 716.9,
  unit: "B",
},
revenueYoY: {
  value: 12,
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
      rating: { kind: "bars", value: 4, outOf: 5 },
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
      rating: { kind: "badge", label: "Medium-High" },
    },
    {
      label: "Valuation",
      icon: "scale",
      tone: "neutral",
      rating: { kind: "badge", label: "Fair" },
    },
  ],

  thirtySecondSummary: {
    subtitle: "A plain-English explanation of Amazon's business model",
    content:
      "Amazon makes money by connecting consumers, sellers, businesses, advertisers, and developers through a massive digital and physical infrastructure. Its retail marketplace drives enormous customer traffic, while AWS provides high-margin cloud computing, advertising monetizes shopping intent, Prime creates recurring customer relationships, and logistics infrastructure makes the ecosystem harder to replicate. Amazon is increasingly using AI as another layer across AWS, advertising, shopping, robotics, and its custom chips.",
  },

  businessSegments: {
    totalRevenue: {
  value: 716.9,
  unit: "B",
},
    fiscalYearLabel: "FY25 revenue",
    segments: [
      {
        name: "North America",
        amount: {
      value: 426.3,
      unit: "B",
      },
        percentage: 59.4,
        yoyChange: {
  value: 10,
},
        color: "#FF9900",
      },
      {
  name: "International",
  amount: {
    value: 161.9,
    unit: "B",
  },
  percentage: 22.6,
  yoyChange: {
    value: 13,
  },
  color: "#146EB4",
},
{
  name: "AWS",
  amount: {
    value: 128.7,
    unit: "B",
  },
  percentage: 18.0,
  yoyChange: {
    value: 20,
  },
  color: "#232F3E",
},
    ],
    insight:
      "Amazon's retail businesses still generate the majority of revenue, but AWS is disproportionately important to profitability and long-term growth. The combination of retail scale, cloud infrastructure, advertising, and logistics gives Amazon multiple engines for monetization.",
    footnote:
      "Fiscal year 2025, ended December 31, 2025. Amazon's three reportable segments are North America, International, and AWS.",
  },

  businessModel: {
    stages: [
      {
        title: "Attract Customers",
        icon: "users",
        color: "#FF9900",
        backgroundTint: "#fff7eb",
        tagTextColor: "#b45309",
        tags: [
          { label: "Marketplace", icon: "building-store" },
          { label: "Prime", icon: "crown" },
          { label: "Selection", icon: "list" },
          { label: "Low Prices", icon: "tag" },
        ],
      },
      {
        title: "Monetize the Ecosystem",
        icon: "shopping-cart",
        color: "#146EB4",
        backgroundTint: "#eff6ff",
        tagTextColor: "#1d4ed8",
        tags: [
          { label: "Retail", icon: "shopping-cart" },
          { label: "Seller Fees", icon: "receipt" },
          { label: "Advertising", icon: "speakerphone" },
          { label: "Subscriptions", icon: "calendar-repeat" },
        ],
      },
      {
        title: "Power the Infrastructure",
        icon: "cloud",
        color: "#232F3E",
        backgroundTint: "#f1f3f5",
        tagTextColor: "#334155",
        tags: [
          { label: "AWS", icon: "cloud" },
          { label: "AI", icon: "brain" },
          { label: "Logistics", icon: "truck" },
          { label: "Custom Chips", icon: "cpu" },
        ],
      },
    ],
    repeatNote: "More customers create more sellers, data, advertising demand, and infrastructure utilization",
    insight:
      "Amazon's flywheel is unusually powerful: more customers attract more sellers and products, which improve selection and convenience, driving more purchases. That scale creates more advertising opportunities and increases demand for AWS and logistics infrastructure, while Prime strengthens customer retention.",
  },

  strengthsAndRisks: {
    strengths: [
      {
        icon: "world",
        title: "Global Customer Scale",
        description: "Serves hundreds of millions of customers through a massive global shopping and digital ecosystem",
      },
      {
        icon: "cloud",
        title: "AWS",
        description: "AWS provides a powerful cloud business with deep relationships across enterprises, startups, governments, and developers",
      },
      {
        icon: "truck",
        title: "Logistics Infrastructure",
        description: "A massive fulfillment and delivery network creates speed, convenience, and infrastructure advantages that are difficult to replicate",
      },
      {
        icon: "speakerphone",
        title: "Advertising Engine",
        description: "Amazon monetizes high-intent shopping traffic through a rapidly growing advertising business",
      },
      {
        icon: "recycle",
        title: "Ecosystem Flywheel",
        description: "Customers, sellers, Prime, advertising, logistics, AWS, and AI reinforce one another and increase the value of the overall platform",
      },
    ],
    risks: [
      {
        icon: "cash",
        title: "Massive Capital Spending",
        description: "AI and data-center expansion require enormous capital investment, putting pressure on free cash flow",
      },
      {
        icon: "gavel",
        title: "Regulatory Pressure",
        description: "Amazon faces ongoing antitrust and regulatory scrutiny across its marketplace, advertising, and Prime businesses",
      },
      {
        icon: "report-money",
        title: "Retail Margins",
        description: "The retail business operates at much lower margins than AWS and requires significant fulfillment and logistics spending",
      },
      {
        icon: "swords",
        title: "Cloud Competition",
        description: "AWS competes intensely with Microsoft Azure and Google Cloud while customers increasingly consider multi-cloud and alternative infrastructure",
      },
      {
        icon: "cpu",
        title: "AI Investment Risk",
        description: "Amazon is spending heavily on AI infrastructure and custom chips, creating the risk that demand or returns fail to justify the scale of investment",
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
    value: 716.9,
    unit: "B",
  },
  change: {
    value: 12,
  },
  sublabel: "FY25",
},
      {
        label: "Net Income",
        icon: "coin",
        value: {
          value: 77.7,
          unit: "B",
        },
        change: {
          value: 31,
        },
        sublabel: "FY25",
      },
      {
  label: "Free Cash Flow",
  icon: "droplet",
  value: {
    value: 11.2,
    unit: "B",
  },
  change: {
    value: -71,
  },
  sublabel: "FY25",
},
    ],
    insight:
      "Amazon's profitability improved sharply in 2025, but free cash flow fell as the company dramatically increased infrastructure investment. The central story is a trade-off between near-term cash generation and long-term spending on AWS, AI, logistics, and data centers.",
  },

  financialHistory: {
    rangeLabel: "5-year trend, fiscal years 2021–2025",
    panels: [
      {
        label: "Revenue",
        icon: "report-money",
        color: "#fdba74",
        highlightColor: "#c1502f",
        years: ["'21", "'22", "'23", "'24", "'25"],
        values: [469.8, 514.0, 574.8, 638.0, 716.9],
        unit: "B",
        currentValueLabel: "$716.9B",
        changeNote: "+52.6% since FY21",
      },
      {
        label: "Net Income",
        icon: "coin",
        color: "#5eead4",
        highlightColor: "#0f766e",
        years: ["'21", "'22", "'23", "'24", "'25"],
        values: [33.4, -2.7, 30.4, 59.2, 77.7],
        unit: "B",
        currentValueLabel: "$77.7B",
        changeNote: "Recovered strongly since FY22",
      },
      {
        label: "Free Cash Flow",
        icon: "droplet",
        color: "#fcd34d",
        highlightColor: "#b45309",
        years: ["'21", "'22", "'23", "'24", "'25"],
        values: [-9.1, -11.6, 36.8, 38.2, 11.2],
        unit: "B",
        currentValueLabel: "$11.2B",
        changeNote: "Positive, but down sharply from FY24",
      },
    ],
  },

  ecosystem: {
  partners: [
      {
        name: "NVIDIA",
        description: "Provides GPUs and accelerated computing platforms used across AWS AI infrastructure",
        icon: "cpu",
        color: "#76B900",
        backgroundTint: "#f0f9e8",
      },
      {
        name: "Anthropic",
        description: "Provides advanced AI models that strengthen Amazon Bedrock and AWS's generative AI ecosystem",
        icon: "brain",
        color: "#8b5cf6",
        backgroundTint: "#f5f3ff",
      },
      {
        name: "TSMC",
        description: "A key semiconductor manufacturing partner within the broader supply chain supporting Amazon's custom silicon and advanced computing ecosystem",
        icon: "building-factory",
        color: "#1d3557",
        backgroundTint: "#e7edf5",
      },
    ],
    centerLabel: "Amazon",
    centerSublabel: "The global ecosystem",
    output: {
      name: "Customers & Businesses",
      description: "Consumers, sellers, developers, enterprises, advertisers, and governments use Amazon's ecosystem",
      icon: "users",
      color: "#FF9900",
      backgroundTint: "#fff7eb",
    },
    flowInLabel: "← Technology, chips & infrastructure flow in",
    flowOutLabel: "Commerce, cloud & AI services flow out →",
    insight:
      "Amazon sits at the center of a two-sided ecosystem: consumers and businesses create demand, while technology partners, sellers, developers, and infrastructure providers expand the platform's capabilities. AWS and AI increasingly connect the retail ecosystem to a much broader technology infrastructure business.",
  },

  competitors: {
    contextNote:
      "Companies that compete with Amazon across retail, e-commerce, cloud computing, advertising, and AI infrastructure. Market caps are approximate current snapshots.",
    competitors: [
      {
        name: "Walmart",
        icon: "building-store",
        color: "#146EB4",
        backgroundTint: "#eff6ff",
        tagTextColor: "#1d4ed8",
        marketCap: {
          value: 1.0,
          unit: "T"
        },
        relativeSize: 36,
        tag: "Retail & E-commerce",
        relationship: "Direct retail competitor — competes with Amazon on price, selection, fulfillment, grocery, and omnichannel commerce",
      },
      {
        name: "Microsoft",
        icon: "brand-windows",
        color: "#e76f51",
        backgroundTint: "#fbe9e5",
        tagTextColor: "#c1502f",
        marketCap: {
          value: 2.89,
          unit: "T"
        },
        relativeSize: 100,
        tag: "Cloud & AI",
        relationship: "Direct AWS competitor — Azure competes with AWS for enterprise cloud, AI infrastructure, developers, and large workloads",
      },
      {
        name: "Alphabet",
        icon: "brand-google",
        color: "#2a9d8f",
        backgroundTint: "#e6f5f3",
        tagTextColor: "#0f766e",
        marketCap: {
          value: 4.2,
          unit: "T"
        },
        relativeSize: 100,
        tag: "Cloud & AI",
        relationship: "Cloud and AI competitor — Google Cloud competes with AWS while Google's advertising and AI businesses overlap with Amazon's advertising and cloud ecosystem",
      },
      {
        name: "Alibaba",
        icon: "world",
        color: "#8b5cf6",
        backgroundTint: "#f5f3ff",
        tagTextColor: "#6d28d9",
        marketCap: {
          value:350,
          unit: "B"
        },
        relativeSize: 13,
        tag: "E-commerce & Cloud",
        relationship: "Global commerce and cloud competitor — Alibaba competes with Amazon across international e-commerce and cloud infrastructure, particularly in China and emerging markets",
      },
    ],
    insight:
      "Amazon is unusual because no single competitor matches its entire ecosystem. Walmart challenges retail, Microsoft and Google challenge AWS, and Alibaba competes in commerce and cloud. Amazon's moat comes partly from combining these businesses into one interconnected platform.",
  },
};