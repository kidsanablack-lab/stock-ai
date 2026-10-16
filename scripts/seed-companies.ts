import { supabaseAdmin } from "@/lib/supabase-admin";

type SeedCompany = {
  company: Record<string, unknown>;
  segments: Record<string, unknown>[];
  competitors: Record<string, unknown>[];
};
const adobeCompany = {
  slug: "adobe",
  name: "Adobe Inc.",
  brand_name: "Adobe",
  ticker: "ADBE",
  exchange: "NASDAQ",
  industry: "Technology",
  logo_initial: "A",
  logo: "/logos/adobe-svgrepo-com.svg",
  tagline:
    "Builds creative, document, productivity, and digital experience software used by creators, businesses, and consumers worldwide.",
  what_it_does:
    "Adobe builds the software people and businesses use to create content, work with digital documents, and deliver personalized digital experiences. Its ecosystem includes Creative Cloud, Acrobat, Adobe Express, Firefly, and Adobe Experience Cloud.",
  founded: "1982",
  headquarters: "San Jose, California",
  ceo: "Shantanu Narayen",
  ceo_since: "2007",
  scope_score: 8.8,
  scope_score_label: "Excellent",

  snapshot: [
    {
      icon: "shield-check",
      tone: "good",
      label: "Quality",
      rating: {
        kind: "stars",
        outOf: 5,
        value: 5,
      },
    },
    {
      icon: "shield-lock",
      tone: "good",
      label: "Moat",
      rating: {
        kind: "stars",
        outOf: 5,
        value: 4,
      },
    },
    {
      icon: "coin",
      tone: "good",
      label: "Profitability",
      rating: {
        kind: "bars",
        outOf: 5,
        value: 5,
      },
    },
    {
      icon: "trending-up",
      tone: "good",
      label: "Revenue growth",
      rating: {
        kind: "arrow",
        label: "Growing",
      },
    },
    {
      icon: "alert-triangle",
      tone: "risk",
      label: "Risk",
      rating: {
        kind: "badge",
        label: "Medium",
      },
    },
    {
      icon: "scale",
      tone: "neutral",
      label: "Valuation",
      rating: {
        kind: "badge",
        label: "Moderate",
      },
    },
  ],

  thirty_second_summary: {
    subtitle: "A plain-English explanation of Adobe's business model",
    content:
      "Adobe makes money primarily by selling subscriptions to software used for creativity, digital documents, productivity, and digital marketing. Creative Cloud includes products such as Photoshop, Illustrator, and Premiere Pro, while Acrobat focuses on digital documents and Adobe Experience Cloud helps businesses manage and personalize customer experiences. Adobe is also adding AI through Firefly and AI features embedded across its products.",
  },

  business_model: {
    stages: [
      {
        icon: "palette",
        tags: [
          {
            icon: "palette",
            label: "Photoshop",
          },
          {
            icon: "bulb",
            label: "Illustrator",
          },
          {
            icon: "video",
            label: "Premiere Pro",
          },
          {
            icon: "sparkles",
            label: "Firefly",
          },
        ],
        color: "#E60000",
        title: "Create Digital Content",
        tagTextColor: "#b91c1c",
        backgroundTint: "#fef2f2",
      },
      {
        icon: "file-text",
        tags: [
          {
            icon: "file-text",
            label: "Acrobat",
          },
          {
            icon: "edit",
            label: "PDF",
          },
          {
            icon: "bulb",
            label: "Sign",
          },
          {
            icon: "sparkles",
            label: "AI Assistant",
          },
        ],
        color: "#2563eb",
        title: "Work With Documents",
        tagTextColor: "#1d4ed8",
        backgroundTint: "#eff6ff",
      },
      {
        icon: "users",
        tags: [
          {
            icon: "database",
            label: "Experience Platform",
          },
          {
            icon: "building-store",
            label: "GenStudio",
          },
          {
            icon: "target",
            label: "Personalization",
          },
          {
            icon: "chart-bar",
            label: "Analytics",
          },
        ],
        color: "#8b5cf6",
        title: "Run Digital Experiences",
        tagTextColor: "#6d28d9",
        backgroundTint: "#f5f3ff",
      },
    ],
    insight:
      "Adobe's model is built around recurring software subscriptions. Customers often use multiple products together, creating an integrated workflow from creating content and documents to delivering and measuring digital experiences.",
    repeatNote:
      "Subscriptions create recurring revenue as customers continue using Adobe's software ecosystem",
  },

  strengths_and_risks: {
    strengths: [
      {
        icon: "palette",
        title: "Creative Software Leadership",
        description:
          "Photoshop, Illustrator, Premiere Pro and other Creative Cloud products are deeply embedded in professional creative workflows",
      },
      {
        icon: "apps",
        title: "Integrated Ecosystem",
        description:
          "Creative, document, productivity, and customer-experience products can work together across a broad digital workflow",
      },
      {
        icon: "repeat",
        title: "Recurring Subscription Revenue",
        description:
          "The shift toward subscriptions gives Adobe a large recurring revenue base and ongoing customer relationships",
      },
      {
        icon: "file-text",
        title: "PDF & Document Platform",
        description:
          "Acrobat gives Adobe a major position in digital documents, signing, editing, collaboration, and document productivity",
      },
      {
        icon: "sparkles",
        title: "AI Integration",
        description:
          "Firefly and embedded AI features extend Adobe's existing creative, productivity, and marketing workflows",
      },
    ],
    risks: [
      {
        icon: "swords",
        title: "AI Competition",
        description:
          "Generative AI is lowering barriers to content creation and introducing new competitors across creative and productivity software",
      },
      {
        icon: "users",
        title: "Customer Switching",
        description:
          "Creative professionals and businesses have more alternatives across design, collaboration, productivity, and AI tools",
      },
      {
        icon: "building",
        title: "Enterprise Competition",
        description:
          "Adobe competes with large software companies and specialized vendors across digital experience and marketing technology",
      },
      {
        icon: "gavel",
        title: "Regulatory & Legal Risk",
        description:
          "Adobe faces ongoing regulatory, legal, privacy, and intellectual-property risks associated with software, AI, and digital services",
      },
      {
        icon: "trending-down",
        title: "Growth Expectations",
        description:
          "Adobe's large revenue base means maintaining strong growth requires continued adoption of new products, AI features, and customer workflows",
      },
    ],
  },

  financial_overview: {
    insight:
      "Adobe generated $23.8B of revenue in FY25, with subscription revenue accounting for the vast majority of sales. Revenue grew 11% year over year while net income reached $7.13B and operating cash flow reached $10.03B.",
    metrics: [
      {
        icon: "report-money",
        label: "Revenue",
        value: {
          unit: "B",
          value: 23.769,
        },
        change: {
          value: 11,
        },
        sublabel: "FY25",
      },
      {
        icon: "coin",
        label: "Net Income",
        value: {
          unit: "B",
          value: 7.13,
        },
        change: {
          value: 28.2,
        },
        sublabel: "FY25",
      },
      {
        icon: "droplet",
        label: "Free Cash Flow",
        value: {
          unit: "B",
          value: 9.852,
        },
        change: {
          value: 25.1,
        },
        sublabel: "FY25",
      },
    ],
    fiscalYearLabel: "Fiscal year 2025 (ended Nov 28, 2025)",
  },

  financial_history: {
    panels: [
      {
        icon: "report-money",
        unit: "B",
        color: "#fca5a5",
        label: "Revenue",
        years: ["'21", "'22", "'23", "'24", "'25"],
        values: [15.785, 17.606, 19.409, 21.505, 23.769],
        changeNote: "+51% since FY21",
        highlightColor: "#b91c1c",
        currentValueLabel: "$23.8B",
      },
      {
        icon: "coin",
        unit: "B",
        color: "#93c5fd",
        label: "Net Income",
        years: ["'21", "'22", "'23", "'24", "'25"],
        values: [4.756, 4.756, 5.428, 5.56, 7.13],
        changeNote: "+50% since FY21",
        highlightColor: "#1d4ed8",
        currentValueLabel: "$7.1B",
      },
      {
        icon: "droplet",
        unit: "B",
        color: "#c4b5fd",
        label: "Free Cash Flow",
        years: ["'21", "'22", "'23", "'24", "'25"],
        values: [7.091, 7.634, 6.942, 7.873, 9.852],
        changeNote: "+39% since FY21",
        highlightColor: "#7c3aed",
        currentValueLabel: "$9.9B",
      },
    ],
    rangeLabel: "5-year trend, fiscal years 2021–2025",
  },

  ecosystem: {
    output: {
      icon: "users",
      name: "Creative & Business Customers",
      color: "#E60000",
      description:
        "Creators, creative professionals, businesses, marketers, students, and consumers use Adobe's software across digital workflows",
      backgroundTint: "#fef2f2",
    },
    insight:
      "Adobe sits at the center of a digital-content ecosystem connecting creators, businesses, marketers, document workflows, digital experiences, and AI-powered content generation.",
    partners: [
      {
        icon: "cloud",
        name: "Microsoft",
        color: "#2563eb",
        description:
          "Adobe integrates with Microsoft products and cloud technologies across creative, document, productivity, and enterprise workflows",
        backgroundTint: "#eff6ff",
      },
      {
        icon: "cloud",
        name: "Google Cloud",
        color: "#4285f4",
        description:
          "Adobe and Google Cloud collaborate across customer experience, data, AI, and enterprise workflows",
        backgroundTint: "#eff6ff",
      },
      {
        icon: "shopping-bag",
        name: "Amazon Web Services",
        color: "#f59e0b",
        description:
          "AWS provides cloud infrastructure used across Adobe's digital experience and enterprise ecosystem",
        backgroundTint: "#fffbeb",
      },
    ],
    centerLabel: "Adobe",
    flowInLabel: "← Customers, data & creative workflows flow in",
    flowOutLabel: "Digital content & experiences flow out →",
    centerSublabel: "The digital experience platform",
  },

  overview: {
    ceo: "Shantanu Narayen",
    founded: "1982",
    revenue: {
      unit: "B",
      value: 23.769,
    },
    ceoSince: "2007",
    marketCap: {
      unit: "B",
      value: 93.38,
    },
    revenueYoY: {
      value: 11,
    },
    whatItDoes:
      "Adobe builds software for creating content, working with digital documents, and delivering personalized digital experiences. Its major product ecosystems include Creative Cloud, Acrobat, Adobe Express, Firefly, and Adobe Experience Cloud.",
    headquarters: "San Jose, California",
    marketCapRank: "#183 in the world",
    revenueFiscalYear: "FY25",
  },

  business_segments_insight:
    "Digital Media generates roughly three-quarters of Adobe's revenue and includes the company's major creative and document products. Digital Experience adds enterprise marketing and customer-experience software, while Publishing and Advertising is now a small part of the business.",

  business_segments_footnote:
    "Fiscal year 2025 (ended Nov 28, 2025). Adobe reports three reportable segments: Digital Media, Digital Experience, and Publishing and Advertising.",

  competitors_context_note:
    "Companies and platforms that compete with Adobe across creative software, design, productivity, digital documents, marketing technology, and AI-powered content creation. Market cap shown relative to Adobe's ~$93.4B September 30, 2026 snapshot.",

  competitors_insight:
    "Adobe competes across several different software markets. Canva and Figma are important competitors in creative and collaborative design, while Salesforce and Microsoft overlap with Adobe in enterprise workflows, marketing, productivity, and customer experience.",
};

const adobeSegments = [
  {
    name: "Digital Media",
    amount_value: 17.649,
    amount_unit: "B",
    percentage: 74.3,
    yoy_change: 11,
    color: "#E60000",
    sort_order: 0,
  },
  {
    name: "Digital Experience",
    amount_value: 5.864,
    amount_unit: "B",
    percentage: 24.7,
    yoy_change: 9,
    color: "#2563EB",
    sort_order: 1,
  },
  {
    name: "Publishing & Advertising",
    amount_value: 0.256,
    amount_unit: "B",
    percentage: 1.0,
    yoy_change: -7,
    color: "#8B5CF6",
    sort_order: 2,
  },
];

const adobeCompetitors = [
  {
    name: "Canva",
    icon: "palette",
    color: "#00C4CC",
    background_tint: "#e6fbfc",
    tag_text_color: "#087f83",
    market_cap_value: 42,
    market_cap_unit: "B",
    relative_size: 45,
    tag: "Design & Content Creation",
    relationship:
      "Creative competitor — Canva targets a broader audience with easier-to-use design and content creation tools",
    sort_order: 0,
  },
  {
    name: "Figma",
    icon: "figma",
    color: "#F24E1E",
    background_tint: "#fff0eb",
    tag_text_color: "#c2410c",
    market_cap_value: 19,
    market_cap_unit: "B",
    relative_size: 20,
    tag: "Collaborative Design",
    relationship:
      "Creative competitor — Figma competes with Adobe in collaborative interface design, prototyping, and digital product workflows",
    sort_order: 1,
  },
  {
    name: "Salesforce",
    icon: "cloud",
    color: "#0EA5E9",
    background_tint: "#eaf8ff",
    tag_text_color: "#0369a1",
    market_cap_value: 192.6,
    market_cap_unit: "B",
    relative_size: 206,
    tag: "Customer Experience & Marketing",
    relationship:
      "Enterprise competitor — Salesforce overlaps with Adobe in customer data, marketing, personalization, and digital experience workflows",
    sort_order: 2,
  },
  {
    name: "Microsoft",
    icon: "windows",
    color: "#2563EB",
    background_tint: "#eff6ff",
    tag_text_color: "#1d4ed8",
    market_cap_value: 4800,
    market_cap_unit: "B",
    relative_size: 5143,
    tag: "Productivity & AI",
    relationship:
      "Broad competitor — Microsoft competes with Adobe across productivity, collaboration, AI, design-adjacent workflows, and document software",
    sort_order: 3,
  },
];
const adobeSeed: SeedCompany = {
  company: adobeCompany,
  segments: adobeSegments,
  competitors: adobeCompetitors,
};

const salesforceCompany = {
  slug: "salesforce",
  name: "Salesforce, Inc.",
  brand_name: "Salesforce",
  ticker: "CRM",
  exchange: "NYSE",
  industry: "Technology",
  logo_initial: "S",
  logo: "/logos/salesforce-2-logo-svgrepo-com.svg",
  tagline:
    "Builds cloud software that helps businesses manage customer relationships, sales, service, marketing, commerce, data, and AI-powered workflows.",
  what_it_does:
    "Salesforce provides cloud software that brings customer data, business applications, and AI-powered agents together on one platform. Its products span sales, customer service, marketing, commerce, collaboration, data management, analytics, and integration.",
  founded: "1999",
  headquarters: "San Francisco, California",
  ceo: "Marc Benioff",
  ceo_since: "2001",
  scope_score: 8.7,
  scope_score_label: "Strong",

  snapshot: [
    {
      icon: "shield-check",
      tone: "good",
      label: "Quality",
      rating: {
        kind: "stars",
        outOf: 5,
        value: 5,
      },
    },
    {
      icon: "shield-lock",
      tone: "good",
      label: "Moat",
      rating: {
        kind: "stars",
        outOf: 5,
        value: 4,
      },
    },
    {
      icon: "coin",
      tone: "good",
      label: "Profitability",
      rating: {
        kind: "bars",
        outOf: 5,
        value: 5,
      },
    },
    {
      icon: "trending-up",
      tone: "good",
      label: "Revenue growth",
      rating: {
        kind: "arrow",
        label: "Growing",
      },
    },
    {
      icon: "alert-triangle",
      tone: "risk",
      label: "Risk",
      rating: {
        kind: "badge",
        label: "Medium",
      },
    },
    {
      icon: "scale",
      tone: "neutral",
      label: "Valuation",
      rating: {
        kind: "badge",
        label: "Moderate",
      },
    },
  ],

  thirty_second_summary: {
    subtitle: "A plain-English explanation of Salesforce's business model",
    content:
      "Salesforce makes money primarily by selling subscriptions to cloud software used by businesses to manage customer relationships and business operations. Its platform covers sales, service, marketing, commerce, collaboration, data, analytics, and integration. Salesforce is also adding AI agents through Agentforce, designed to automate work across business functions.",
  },

  business_model: {
    stages: [
      {
        icon: "users",
        tags: [
          {
            icon: "briefcase",
            label: "Sales Cloud",
          },
          {
            icon: "headphones",
            label: "Service Cloud",
          },
          {
            icon: "building-store",
            label: "Marketing",
          },
          {
            icon: "shopping-cart",
            label: "Commerce",
          },
        ],
        color: "#0EA5E9",
        title: "Manage Customer Relationships",
        tagTextColor: "#0369a1",
        backgroundTint: "#eaf8ff",
      },
      {
        icon: "database",
        tags: [
          {
            icon: "database",
            label: "Data Cloud",
          },
          {
            icon: "chart-bar",
            label: "Analytics",
          },
          {
            icon: "cloud",
            label: "Integration",
          },
          {
            icon: "message-circle",
            label: "Slack",
          },
        ],
        color: "#6366F1",
        title: "Connect Data & Workflows",
        tagTextColor: "#4338ca",
        backgroundTint: "#eef2ff",
      },
      {
        icon: "sparkles",
        tags: [
          {
            icon: "sparkles",
            label: "Agentforce",
          },
          {
            icon: "users",
            label: "AI Agents",
          },
          {
            icon: "bulb",
            label: "Automation",
          },
          {
            icon: "shield-check",
            label: "Trusted Data",
          },
        ],
        color: "#8B5CF6",
        title: "Automate Work With AI",
        tagTextColor: "#6D28D9",
        backgroundTint: "#F5F3FF",
      },
    ],
    insight:
      "Salesforce's model is built around recurring subscriptions to cloud software. Customers can adopt individual products and expand into additional applications, data, integration, analytics, collaboration, and AI capabilities.",
    repeatNote:
      "Subscription contracts create recurring revenue as businesses continue using Salesforce's cloud platform",
  },

  strengths_and_risks: {
    strengths: [
      {
        icon: "users",
        title: "Large Customer Platform",
        description:
          "Salesforce connects sales, service, marketing, commerce, data, analytics, and other business workflows across a broad enterprise software ecosystem",
      },
      {
        icon: "repeat",
        title: "Recurring Subscription Revenue",
        description:
          "Subscription and support revenue represented about 95% of Salesforce's fiscal 2026 revenue",
      },
      {
        icon: "database",
        title: "Customer Data & Integration",
        description:
          "Data Cloud, MuleSoft, and related technologies help connect customer information across applications and systems",
      },
      {
        icon: "sparkles",
        title: "AI Platform Expansion",
        description:
          "Agentforce adds AI agents and automation capabilities on top of Salesforce's existing enterprise software and data platform",
      },
      {
        icon: "apps",
        title: "Broad Product Ecosystem",
        description:
          "Salesforce has expanded from CRM into service, marketing, commerce, analytics, collaboration, integration, and industry-specific software",
      },
    ],
    risks: [
      {
        icon: "swords",
        title: "Enterprise Competition",
        description:
          "Salesforce competes with large software companies and specialized vendors across CRM, productivity, marketing, data, analytics, and AI",
      },
      {
        icon: "sparkles",
        title: "AI Disruption",
        description:
          "AI-native products and automated workflows could change how businesses buy and use traditional enterprise software",
      },
      {
        icon: "users",
        title: "Complex Product Portfolio",
        description:
          "A broad collection of products and acquisitions can increase integration complexity for customers and the company",
      },
      {
        icon: "building",
        title: "Enterprise Spending",
        description:
          "Large customers can delay or reduce software purchases when technology budgets or business conditions become more constrained",
      },
      {
        icon: "gavel",
        title: "Regulatory & Data Risk",
        description:
          "Salesforce handles large amounts of business and customer data, creating ongoing privacy, security, regulatory, and compliance requirements",
      },
    ],
  },

  financial_overview: {
    insight:
      "Salesforce generated $41.5B of revenue in FY26, with subscription and support revenue accounting for about 95% of total revenue. Net income reached $7.46B while free cash flow reached approximately $14.4B.",
    metrics: [
      {
        icon: "report-money",
        label: "Revenue",
        value: {
          unit: "B",
          value: 41.525,
        },
        change: {
          value: 10,
        },
        sublabel: "FY26",
      },
      {
        icon: "coin",
        label: "Net Income",
        value: {
          unit: "B",
          value: 7.457,
        },
        change: {
          value: 20.3,
        },
        sublabel: "FY26",
      },
      {
        icon: "droplet",
        label: "Free Cash Flow",
        value: {
          unit: "B",
          value: 14.4,
        },
        change: {
          value: 16,
        },
        sublabel: "FY26",
      },
    ],
    fiscalYearLabel: "Fiscal year 2026 (ended Jan 31, 2026)",
  },

  financial_history: {
    panels: [
      {
        icon: "report-money",
        unit: "B",
        color: "#93c5fd",
        label: "Revenue",
        years: ["'22", "'23", "'24", "'25", "'26"],
        values: [26.49, 31.352, 34.857, 37.895, 41.525],
        changeNote: "+57% since FY22",
        highlightColor: "#1d4ed8",
        currentValueLabel: "$41.5B",
      },
      {
        icon: "coin",
        unit: "B",
        color: "#86efac",
        label: "Net Income",
        years: ["'22", "'23", "'24", "'25", "'26"],
        values: [1.444, 0.208, 4.136, 6.197, 7.457],
        changeNote: "+417% since FY22",
        highlightColor: "#15803d",
        currentValueLabel: "$7.5B",
      },
      {
        icon: "droplet",
        unit: "B",
        color: "#c4b5fd",
        label: "Free Cash Flow",
        years: ["'22", "'23", "'24", "'25", "'26"],
        values: [5.283, 6.313, 9.498, 12.434, 14.4],
        changeNote: "+173% since FY22",
        highlightColor: "#7c3aed",
        currentValueLabel: "$14.4B",
      },
    ],
    rangeLabel: "5-year trend, fiscal years 2022–2026",
  },

  ecosystem: {
    output: {
      icon: "users",
      name: "Business Customers",
      color: "#0EA5E9",
      description:
        "Businesses use Salesforce across sales, service, marketing, commerce, data, analytics, collaboration, integration, and AI workflows",
      backgroundTint: "#eaf8ff",
    },
    insight:
      "Salesforce sits at the center of an enterprise software ecosystem connecting customer data, business applications, employees, partners, and AI-powered automation.",
    partners: [
      {
        icon: "cloud",
        name: "AWS",
        color: "#f59e0b",
        description:
          "Salesforce and AWS integrate cloud infrastructure, data, AI, and business applications across enterprise workflows",
        backgroundTint: "#fffbeb",
      },
      {
        icon: "cloud",
        name: "Google Cloud",
        color: "#4285f4",
        description:
          "Salesforce and Google Cloud integrate data, AI, analytics, and cloud technologies for enterprise customers",
        backgroundTint: "#eff6ff",
      },
      {
        icon: "cloud",
        name: "Microsoft",
        color: "#2563eb",
        description:
          "Salesforce integrates with Microsoft technologies including Teams, Outlook, and Azure-related enterprise workflows",
        backgroundTint: "#eff6ff",
      },
    ],
    centerLabel: "Salesforce",
    flowInLabel: "← Customer data & business workflows flow in",
    flowOutLabel: "Automated customer experiences flow out →",
    centerSublabel: "The enterprise CRM platform",
  },

  overview: {
    ceo: "Marc Benioff",
    founded: "1999",
    revenue: {
      unit: "B",
      value: 41.525,
    },
    ceoSince: "2001",
    marketCap: {
      unit: "B",
      value: 188.94,
    },
    revenueYoY: {
      value: 10,
    },
    whatItDoes:
      "Salesforce provides cloud software that helps businesses manage customer relationships, sales, service, marketing, commerce, data, analytics, integration, collaboration, and AI-powered workflows.",
    headquarters: "San Francisco, California",
    marketCapRank: "#103 in the world",
    revenueFiscalYear: "FY26",
  },

  business_segments_insight:
    "Salesforce reports as one operating segment rather than separate financial segments. The business is organized around a broad portfolio of cloud applications and platform capabilities spanning sales, service, marketing, commerce, data, analytics, integration, collaboration, and AI.",

  business_segments_footnote:
    "Fiscal year 2026 ended Jan 31, 2026. Salesforce reports one operating segment; the sections below are a simplified product-based view rather than reported financial segments.",

  competitors_context_note:
    "Companies and platforms that compete with Salesforce across customer relationship management, enterprise software, productivity, marketing, data, analytics, and AI workflows. Market cap shown relative to Salesforce's ~$189B September 30, 2026 snapshot.",

  competitors_insight:
    "Salesforce competes with Microsoft, Oracle, SAP, Adobe, and other enterprise software providers across different parts of the customer-management and business-application stack.",
};

const salesforceSegments = [
  {
    name: "Sales & Service",
    amount_value: 20.763,
    amount_unit: "B",
    percentage: 50.0,
    yoy_change: 10,
    color: "#0EA5E9",
    sort_order: 0,
  },
  {
    name: "Platform & Other",
    amount_value: 11.227,
    amount_unit: "B",
    percentage: 27.0,
    yoy_change: 11,
    color: "#6366F1",
    sort_order: 1,
  },
  {
    name: "Marketing & Commerce",
    amount_value: 6.228,
    amount_unit: "B",
    percentage: 15.0,
    yoy_change: 9,
    color: "#8B5CF6",
    sort_order: 2,
  },
  {
    name: "Integration & Analytics",
    amount_value: 3.307,
    amount_unit: "B",
    percentage: 8.0,
    yoy_change: 12,
    color: "#14B8A6",
    sort_order: 3,
  },
];

const salesforceCompetitors = [
  {
    name: "Microsoft",
    icon: "windows",
    color: "#2563EB",
    background_tint: "#eff6ff",
    tag_text_color: "#1d4ed8",
    market_cap_value: 3807,
    market_cap_unit: "B",
    relative_size: 2015,
    tag: "Business Software & AI",
    relationship:
      "Broad competitor — Microsoft overlaps with Salesforce across productivity, business applications, data, collaboration, cloud, and AI",
    sort_order: 0,
  },
  {
    name: "Oracle",
    icon: "database",
    color: "#EA580C",
    background_tint: "#fff1eb",
    tag_text_color: "#c2410c",
    market_cap_value: 418.55,
    market_cap_unit: "B",
    relative_size: 222,
    tag: "Enterprise Applications",
    relationship:
      "Enterprise competitor — Oracle competes with Salesforce in customer experience, enterprise applications, data, and cloud infrastructure",
    sort_order: 1,
  },
  {
    name: "SAP",
    icon: "database",
    color: "#0F4C81",
    background_tint: "#edf5fb",
    tag_text_color: "#0f4c81",
    market_cap_value: 243.29,
    market_cap_unit: "B",
    relative_size: 129,
    tag: "Enterprise Software",
    relationship:
      "Enterprise competitor — SAP overlaps with Salesforce in customer experience, business applications, data, and enterprise workflows",
    sort_order: 2,
  },
  {
    name: "Adobe",
    icon: "palette",
    color: "#E60000",
    background_tint: "#fef2f2",
    tag_text_color: "#b91c1c",
    market_cap_value: 95.9,
    market_cap_unit: "B",
    relative_size: 51,
    tag: "Marketing & Experience",
    relationship:
      "Adjacent competitor — Adobe overlaps with Salesforce in marketing, customer data, personalization, analytics, and digital experience",
    sort_order: 3,
  },
];
const salesforceSeed: SeedCompany = {
  company: salesforceCompany,
  segments: salesforceSegments,
  competitors: salesforceCompetitors,
};

const oracleCompany = {
  slug: "oracle",
  name: "Oracle Corporation",
  brand_name: "Oracle",
  ticker: "ORCL",
  exchange: "NYSE",
  industry: "Technology",
  logo_initial: "O",
  logo: "/logos/oracle-svgrepo-com.svg",
  tagline:
    "Provides cloud infrastructure, enterprise software, databases, and business applications used by organizations worldwide.",
  what_it_does:
    "Oracle provides cloud infrastructure and enterprise software that businesses use to run databases, applications, data systems, and critical operations. Its business spans Oracle Cloud Infrastructure, cloud applications, databases, software, hardware, and services.",
  founded: "1977",
  headquarters: "Austin, Texas",
  ceo: "Safra Catz",
  ceo_since: "2014",
  scope_score: 8.6,
  scope_score_label: "Strong",

  snapshot: [
    {
      icon: "shield-check",
      tone: "good",
      label: "Quality",
      rating: { kind: "stars", outOf: 5, value: 5 },
    },
    {
      icon: "shield-lock",
      tone: "good",
      label: "Moat",
      rating: { kind: "stars", outOf: 5, value: 5 },
    },
    {
      icon: "coin",
      tone: "good",
      label: "Profitability",
      rating: { kind: "stars", outOf: 5, value: 5 },
    },
    {
      icon: "trending-up",
      tone: "good",
      label: "Revenue growth",
      rating: { kind: "arrow", label: "Growing" },
    },
    {
      icon: "alert-triangle",
      tone: "risk",
      label: "Risk",
      rating: { kind: "badge", label: "Medium" },
    },
    {
      icon: "scale",
      tone: "neutral",
      label: "Valuation",
      rating: { kind: "badge", label: "Moderate" },
    },
  ],

  thirty_second_summary: {
    subtitle: "A plain-English explanation of Oracle's business model",
    content:
      "Oracle makes money by selling cloud infrastructure, enterprise software, databases, hardware, and related services. Its cloud business includes Oracle Cloud Infrastructure and cloud applications such as ERP, human resources, supply chain, healthcare, and other enterprise software.",
  },

  business_model: {
    stages: [
      {
        icon: "cloud",
        tags: [
          { icon: "cloud", label: "OCI" },
          { icon: "database", label: "Cloud Database" },
          { icon: "server", label: "Infrastructure" },
          { icon: "apps", label: "AI Compute" },
        ],
        color: "#F97316",
        title: "Provide Cloud Infrastructure",
        tagTextColor: "#C2410C",
        backgroundTint: "#FFF7ED",
      },
      {
        icon: "briefcase",
        tags: [
          { icon: "briefcase", label: "ERP" },
          { icon: "users", label: "HCM" },
          { icon: "shopping-cart", label: "SCM" },
          { icon: "heart", label: "Oracle Health" },
        ],
        color: "#EF4444",
        title: "Run Business Applications",
        tagTextColor: "#B91C1C",
        backgroundTint: "#FEF2F2",
      },
      {
        icon: "database",
        tags: [
          { icon: "database", label: "Oracle Database" },
          { icon: "server", label: "Hardware" },
          { icon: "settings", label: "Support" },
          { icon: "users", label: "Services" },
        ],
        color: "#7C3AED",
        title: "Manage Data & Enterprise Systems",
        tagTextColor: "#6D28D9",
        backgroundTint: "#F5F3FF",
      },
    ],
    insight:
      "Oracle combines cloud infrastructure, databases, enterprise applications, hardware, and services into a broad technology platform for organizations.",
    repeatNote:
      "Customers pay Oracle for cloud capacity, software subscriptions and licenses, hardware, and related services",
  },

  strengths_and_risks: {
    strengths: [
      {
        icon: "database",
        title: "Database Leadership",
        description:
          "Oracle has a large installed base of database technology that supports critical enterprise workloads",
      },
      {
        icon: "cloud",
        title: "Cloud Infrastructure Growth",
        description:
          "Oracle Cloud Infrastructure has become a major growth engine, with FY2026 IaaS revenue increasing 77%",
      },
      {
        icon: "briefcase",
        title: "Enterprise Applications",
        description:
          "Oracle provides business applications covering ERP, HCM, supply chain, healthcare, and other enterprise workflows",
      },
      {
        icon: "apps",
        title: "Integrated Technology Stack",
        description:
          "Oracle combines infrastructure, databases, applications, hardware, and services across the enterprise technology stack",
      },
      {
        icon: "sparkles",
        title: "AI Infrastructure Demand",
        description:
          "Oracle is expanding cloud infrastructure capacity to serve growing demand for AI workloads",
      },
    ],
    risks: [
      {
        icon: "cloud",
        title: "Heavy Cloud Investment",
        description:
          "Oracle is investing heavily in data centers and cloud infrastructure, which can require substantial capital spending",
      },
      {
        icon: "swords",
        title: "Cloud Competition",
        description:
          "Oracle competes with large cloud providers and enterprise software companies across infrastructure, databases, and applications",
      },
      {
        icon: "database",
        title: "Technology Transition",
        description:
          "Customers continue moving from traditional on-premise software toward cloud-based systems",
      },
      {
        icon: "building",
        title: "Enterprise Spending",
        description:
          "Large organizations can delay technology purchases when budgets or economic conditions become more constrained",
      },
      {
        icon: "gavel",
        title: "Regulatory & Data Risk",
        description:
          "Oracle handles large amounts of enterprise and sensitive data, creating ongoing security, privacy, and compliance requirements",
      },
    ],
  },

  financial_overview: {
    insight:
      "Oracle generated $67.4B of revenue in FY2026. Cloud revenue reached $34.0B, while net income was $17.1B. Free cash flow was negative $23.7B as Oracle invested heavily in cloud infrastructure.",
    metrics: [
      {
        icon: "report-money",
        label: "Revenue",
        value: { unit: "B", value: 67.357 },
        change: { value: 17.4 },
        sublabel: "FY26",
      },
      {
        icon: "coin",
        label: "Net Income",
        value: { unit: "B", value: 17.087 },
        change: { value: 37.3 },
        sublabel: "FY26",
      },
      {
        icon: "droplet",
        label: "Free Cash Flow",
        value: { unit: "B", value: -23.686 },
        change: { value: -5911.7 },
        sublabel: "FY26",
      },
    ],
    fiscalYearLabel: "Fiscal year 2026 (ended May 31, 2026)",
  },

  financial_history: {
    panels: [
      {
        icon: "report-money",
        unit: "B",
        color: "#93c5fd",
        label: "Revenue",
        years: ["'22", "'23", "'24", "'25", "'26"],
        values: [42.44, 49.954, 52.961, 57.399, 67.357],
        changeNote: "+59% since FY22",
        highlightColor: "#1d4ed8",
        currentValueLabel: "$67.4B",
      },
      {
        icon: "coin",
        unit: "B",
        color: "#86efac",
        label: "Net Income",
        years: ["'22", "'23", "'24", "'25", "'26"],
        values: [6.717, 8.503, 10.467, 12.443, 17.087],
        changeNote: "+154% since FY22",
        highlightColor: "#15803d",
        currentValueLabel: "$17.1B",
      },
      {
        icon: "droplet",
        unit: "B",
        color: "#c4b5fd",
        label: "Free Cash Flow",
        years: ["'22", "'23", "'24", "'25", "'26"],
        values: [5.028, 8.47, 11.807, -0.394, -23.686],
        changeNote: "Heavy cloud investment in FY26",
        highlightColor: "#7c3aed",
        currentValueLabel: "-$23.7B",
      },
    ],
    rangeLabel: "5-year trend, fiscal years 2022–2026",
  },

  ecosystem: {
    output: {
      icon: "building",
      name: "Enterprise Customers",
      color: "#F97316",
      description:
        "Organizations use Oracle across cloud infrastructure, databases, enterprise applications, hardware, and business operations",
      backgroundTint: "#FFF7ED",
    },
    insight:
      "Oracle sits across multiple layers of enterprise technology, connecting cloud infrastructure, databases, applications, data, and business workflows.",
    partners: [
      {
        icon: "cpu",
        name: "AMD",
        color: "#ED1C24",
        description:
          "Oracle uses AMD processors across parts of its cloud infrastructure and works with AMD on cloud computing capabilities",
        backgroundTint: "#FEF2F2",
      },
      {
        icon: "sparkles",
        name: "NVIDIA",
        color: "#76B900",
        description:
          "Oracle Cloud Infrastructure provides NVIDIA GPU-based infrastructure for AI and accelerated computing workloads",
        backgroundTint: "#F7FEE7",
      },
      {
        icon: "cloud",
        name: "Microsoft",
        color: "#2563EB",
        description:
          "Oracle and Microsoft provide integrated cloud capabilities through Oracle Database@Azure",
        backgroundTint: "#EFF6FF",
      },
    ],
    centerLabel: "Oracle",
    flowInLabel: "← Enterprise workloads & data flow in",
    flowOutLabel: "Cloud services & business systems flow out →",
    centerSublabel: "The enterprise technology platform",
  },

  overview: {
    ceo: "Safra Catz",
    founded: "1977",
    revenue: { unit: "B", value: 67.357 },
    ceoSince: "2014",
    marketCap: { unit: "B", value: 418.56 },
    revenueYoY: { value: 17.4 },
    whatItDoes:
      "Oracle provides cloud infrastructure, databases, enterprise applications, hardware, and services that help organizations run critical technology and business operations.",
    headquarters: "Austin, Texas",
    marketCapRank: "#29 in the world",
    revenueFiscalYear: "FY26",
  },

  business_segments_insight:
    "Oracle reports revenue across Cloud, Software, Hardware, and Services. Cloud includes Oracle Cloud Infrastructure and cloud applications, while Software includes on-premise and other software revenue.",

  business_segments_footnote:
    "Fiscal year 2026 ended May 31, 2026. Segment values below use Oracle's reported revenue categories.",

  competitors_context_note:
    "Companies and platforms that compete with Oracle across cloud infrastructure, databases, enterprise applications, and business software. Market cap shown relative to Oracle's ~$419B October 1, 2026 snapshot.",

  competitors_insight:
    "Oracle competes across several layers of enterprise technology with companies including Microsoft, Amazon, SAP, and Salesforce.",
};

const oracleSegments = [
  {
    name: "Cloud",
    amount_value: 33.989,
    amount_unit: "B",
    percentage: 50.5,
    yoy_change: 38.7,
    color: "#F97316",
    sort_order: 0,
  },
  {
    name: "Software",
    amount_value: 24.541,
    amount_unit: "B",
    percentage: 36.4,
    yoy_change: -0.7,
    color: "#EF4444",
    sort_order: 1,
  },
  {
    name: "Services",
    amount_value: 5.743,
    amount_unit: "B",
    percentage: 8.5,
    yoy_change: 9.7,
    color: "#7C3AED",
    sort_order: 2,
  },
  {
    name: "Hardware",
    amount_value: 3.084,
    amount_unit: "B",
    percentage: 4.6,
    yoy_change: 5,
    color: "#14B8A6",
    sort_order: 3,
  },
];

const oracleCompetitors = [
  {
    name: "Microsoft",
    icon: "windows",
    color: "#2563EB",
    background_tint: "#EFF6FF",
    tag_text_color: "#1D4ED8",
    market_cap_value: 3807,
    market_cap_unit: "B",
    relative_size: 910,
    tag: "Cloud & Enterprise Software",
    relationship:
      "Broad competitor — Microsoft overlaps with Oracle across cloud infrastructure, databases, enterprise applications, productivity, and AI",
    sort_order: 0,
  },
  {
    name: "Amazon",
    icon: "shopping-cart",
    color: "#FF9900",
    background_tint: "#FFF7ED",
    tag_text_color: "#C2410C",
    market_cap_value: 2500,
    market_cap_unit: "B",
    relative_size: 597,
    tag: "Cloud Infrastructure",
    relationship:
      "Cloud competitor — Amazon Web Services competes with Oracle Cloud Infrastructure across enterprise cloud infrastructure",
    sort_order: 1,
  },
  {
    name: "SAP",
    icon: "database",
    color: "#0F4C81",
    background_tint: "#EDF5FB",
    tag_text_color: "#0F4C81",
    market_cap_value: 243.29,
    market_cap_unit: "B",
    relative_size: 58,
    tag: "Enterprise Applications",
    relationship:
      "Enterprise software competitor — SAP overlaps with Oracle across ERP, business applications, data, and enterprise workflows",
    sort_order: 2,
  },
  {
    name: "Salesforce",
    icon: "cloud",
    color: "#0EA5E9",
    background_tint: "#EAF8FF",
    tag_text_color: "#0369A1",
    market_cap_value: 189,
    market_cap_unit: "B",
    relative_size: 45,
    tag: "Business Software",
    relationship:
      "Adjacent competitor — Salesforce overlaps with Oracle in enterprise applications, data, analytics, and customer-facing business software",
    sort_order: 3,
  },
];

const oracleSeed: SeedCompany = {
  company: oracleCompany,
  segments: oracleSegments,
  competitors: oracleCompetitors,
};
const broadcomCompany = {
  slug: "broadcom",
  name: "Broadcom Inc.",
  brand_name: "Broadcom",
  ticker: "AVGO",
  exchange: "NASDAQ",
  industry: "Technology",
  logo_initial: "B",
  logo: "/logos/Broadcom_Inc-_idmEg5oBfL_0.svg",
  tagline:
    "Designs semiconductor solutions and infrastructure software that power data centers, networks, and enterprise IT systems.",
  what_it_does:
    "Broadcom designs and supplies semiconductor solutions used in networking, AI data centers, connectivity, and communications. It also provides infrastructure software, including VMware Cloud Foundation, cybersecurity, mainframe, and enterprise software.",
  founded: "1961",
  headquarters: "Palo Alto, California",
  ceo: "Hock Tan",
  ceo_since: "2006",
  scope_score: 8.8,
  scope_score_label: "Strong",

  snapshot: [
    {
      icon: "shield-check",
      tone: "good",
      label: "Quality",
      rating: { kind: "stars", outOf: 5, value: 5 },
    },
    {
      icon: "shield-lock",
      tone: "good",
      label: "Moat",
      rating: { kind: "stars", outOf: 5, value: 5 },
    },
    {
      icon: "coin",
      tone: "good",
      label: "Profitability",
      rating: { kind: "stars", outOf: 5, value: 5 },
    },
    {
      icon: "trending-up",
      tone: "good",
      label: "Revenue growth",
      rating: { kind: "arrow", label: "Growing" },
    },
    {
      icon: "alert-triangle",
      tone: "risk",
      label: "Risk",
      rating: { kind: "badge", label: "Medium" },
    },
    {
      icon: "scale",
      tone: "neutral",
      label: "Valuation",
      rating: { kind: "badge", label: "Moderate" },
    },
  ],

  thirty_second_summary: {
    subtitle: "A plain-English explanation of Broadcom's business model",
    content:
      "Broadcom makes money from two major areas: semiconductor solutions and infrastructure software. Its chips are used in AI data centers, networking, connectivity, and communications, while its software business includes VMware Cloud Foundation, cybersecurity, mainframe, and enterprise software.",
  },

  business_model: {
    stages: [
      {
        icon: "cpu",
        tags: [
          { icon: "cpu", label: "Custom AI Chips" },
          { icon: "network", label: "Networking" },
          { icon: "wifi", label: "Connectivity" },
          { icon: "server", label: "Data Centers" },
        ],
        color: "#EF4444",
        title: "Design Semiconductor Solutions",
        tagTextColor: "#B91C1C",
        backgroundTint: "#FEF2F2",
      },
      {
        icon: "cloud",
        tags: [
          { icon: "cloud", label: "VMware Cloud Foundation" },
          { icon: "shield-check", label: "Cybersecurity" },
          { icon: "server", label: "Mainframe" },
          { icon: "briefcase", label: "Enterprise Software" },
        ],
        color: "#7C3AED",
        title: "Provide Infrastructure Software",
        tagTextColor: "#6D28D9",
        backgroundTint: "#F5F3FF",
      },
      {
        icon: "building",
        tags: [
          { icon: "server", label: "Data Centers" },
          { icon: "network", label: "Networks" },
          { icon: "cloud", label: "Private Cloud" },
          { icon: "briefcase", label: "Enterprise IT" },
        ],
        color: "#2563EB",
        title: "Power Enterprise Infrastructure",
        tagTextColor: "#1D4ED8",
        backgroundTint: "#EFF6FF",
      },
    ],
    insight:
      "Broadcom combines semiconductor technology with infrastructure software, allowing it to serve critical parts of modern data centers, networks, and enterprise IT environments.",
    repeatNote:
      "Customers pay Broadcom for semiconductor products, software subscriptions and licenses, and related infrastructure solutions.",
  },

  strengths_and_risks: {
    strengths: [
      {
        icon: "cpu",
        title: "AI Semiconductor Demand",
        description:
          "Broadcom supplies custom AI accelerators and AI networking solutions used in large-scale data center infrastructure",
      },
      {
        icon: "network",
        title: "Networking Technology",
        description:
          "Broadcom provides networking chips, switches, connectivity, and related semiconductor products used across data center and communications infrastructure",
      },
      {
        icon: "cloud",
        title: "VMware Software Platform",
        description:
          "Broadcom's infrastructure software portfolio includes VMware Cloud Foundation for private and hybrid cloud environments",
      },
      {
        icon: "layers",
        title: "Diversified Infrastructure Portfolio",
        description:
          "Broadcom combines semiconductor products with software spanning cloud, networking, security, mainframe, and enterprise IT",
      },
      {
        icon: "apps",
        title: "Mission-Critical Software",
        description:
          "Its software products support important enterprise workloads across private cloud, hybrid cloud, edge, mainframe, and security environments",
      },
    ],
    risks: [
      {
        icon: "cpu",
        title: "Semiconductor Cycles",
        description:
          "Demand for semiconductor products can fluctuate with technology cycles, customer spending, and broader economic conditions",
      },
      {
        icon: "swords",
        title: "Intense Competition",
        description:
          "Broadcom competes with semiconductor and infrastructure software companies across networking, AI, connectivity, cloud, and enterprise technology",
      },
      {
        icon: "building",
        title: "Customer Concentration",
        description:
          "Large technology customers account for meaningful portions of Broadcom's revenue, creating exposure to changes in major customer demand",
      },
      {
        icon: "cloud",
        title: "Software Transition",
        description:
          "Broadcom continues transitioning VMware customers toward subscription-based software models, which can affect revenue timing and customer decisions",
      },
      {
        icon: "gavel",
        title: "Regulatory Risk",
        description:
          "Broadcom operates across global semiconductor and software markets where acquisitions, competition, trade, and technology regulations can affect the business",
      },
    ],
  },

  financial_overview: {
    insight:
      "Broadcom generated $63.9B of revenue in FY2025. Semiconductor solutions generated $36.9B and infrastructure software generated $27.0B. Net income was $23.1B and free cash flow was $26.9B. FY2026 is still in progress, with Q3 revenue reaching $29.6B.",
    metrics: [
      {
        icon: "report-money",
        label: "Revenue",
        value: { unit: "B", value: 63.887 },
        change: { value: 24 },
        sublabel: "FY25",
      },
      {
        icon: "coin",
        label: "Net Income",
        value: { unit: "B", value: 23.126 },
        change: { value: 292 },
        sublabel: "FY25",
      },
      {
        icon: "droplet",
        label: "Free Cash Flow",
        value: { unit: "B", value: 26.914 },
        change: { value: 39 },
        sublabel: "FY25",
      },
    ],
    fiscalYearLabel: "Fiscal year 2025 (ended November 2, 2025)",
  },

  financial_history: {
    panels: [
      {
        icon: "report-money",
        unit: "B",
        color: "#93c5fd",
        label: "Revenue",
        years: ["'21", "'22", "'23", "'24", "'25"],
        values: [27.45, 33.203, 35.819, 51.574, 63.887],
        changeNote: "+133% since FY21",
        highlightColor: "#1d4ed8",
        currentValueLabel: "$63.9B",
      },
      {
        icon: "coin",
        unit: "B",
        color: "#86efac",
        label: "Net Income",
        years: ["'21", "'22", "'23", "'24", "'25"],
        values: [5.93, 14.081, 14.082, 5.895, 23.126],
        changeNote: "FY25 benefited from higher operating income",
        highlightColor: "#15803d",
        currentValueLabel: "$23.1B",
      },
      {
        icon: "droplet",
        unit: "B",
        color: "#c4b5fd",
        label: "Free Cash Flow",
        years: ["'21", "'22", "'23", "'24", "'25"],
        values: [12.26, 16.4, 14.6, 19.414, 26.914],
        changeNote: "+119% since FY21",
        highlightColor: "#7c3aed",
        currentValueLabel: "$26.9B",
      },
    ],
    rangeLabel: "5-year trend, fiscal years 2021–2025",
  },

  ecosystem: {
    output: {
      icon: "building",
      name: "Data Centers & Enterprise IT",
      color: "#EF4444",
      description:
        "Organizations use Broadcom's semiconductors and infrastructure software across AI data centers, networking, private cloud, security, and enterprise systems",
      backgroundTint: "#FEF2F2",
    },
    insight:
      "Broadcom sits across important layers of digital infrastructure, connecting semiconductor components with networking, AI computing, private cloud, security, and enterprise software.",
    partners: [
      {
        icon: "cpu",
        name: "NVIDIA",
        color: "#76B900",
        description:
          "Broadcom and NVIDIA operate in adjacent parts of AI infrastructure, including networking, accelerated computing, and data center technologies",
        backgroundTint: "#F7FEE7",
      },
      {
        icon: "cpu",
        name: "AMD",
        color: "#ED1C24",
        description:
          "Broadcom and AMD participate in semiconductor and data center infrastructure markets, including networking and AI-related computing ecosystems",
        backgroundTint: "#FEF2F2",
      },
      {
        icon: "cloud",
        name: "Google",
        color: "#4285F4",
        description:
          "Broadcom supplies custom semiconductor solutions for large technology companies and works with major cloud and AI infrastructure providers",
        backgroundTint: "#EFF6FF",
      },
    ],
    centerLabel: "Broadcom",
    flowInLabel: "← Data center & enterprise demand flows in",
    flowOutLabel: "Semiconductors & software flow out →",
    centerSublabel: "The infrastructure technology platform",
  },

  overview: {
    ceo: "Hock Tan",
    founded: "1961",
    revenue: { unit: "B", value: 63.887 },
    ceoSince: "2006",
    marketCap: { unit: "T", value: 1.64 },
    revenueYoY: { value: 24 },
    whatItDoes:
      "Broadcom provides semiconductor solutions and infrastructure software used in AI data centers, networking, connectivity, private cloud, security, and enterprise IT.",
    headquarters: "Palo Alto, California",
    marketCapRank: "#10 in the world",
    revenueFiscalYear: "FY25",
  },

  business_segments_insight:
    "Broadcom reports revenue across two segments: Semiconductor Solutions and Infrastructure Software. Semiconductor Solutions includes networking, custom accelerators, connectivity, and other semiconductor products, while Infrastructure Software includes VMware and other enterprise infrastructure software.",
  business_segments_footnote:
    "Fiscal year 2025 ended November 2, 2025. Segment values use Broadcom's reported revenue categories.",
  competitors_context_note:
    "Companies and platforms that compete with Broadcom across semiconductors, networking, AI infrastructure, cloud infrastructure, and enterprise software. Market cap shown relative to Broadcom's ~$1.64T October 1, 2026 snapshot.",
  competitors_insight:
    "Broadcom competes across semiconductor and infrastructure software markets with companies including NVIDIA, AMD, Cisco, and Oracle.",
};

const broadcomSegments = [
  {
    name: "Semiconductor Solutions",
    amount_value: 36.858,
    amount_unit: "B",
    percentage: 57.7,
    yoy_change: 22,
    color: "#EF4444",
    sort_order: 0,
  },
  {
    name: "Infrastructure Software",
    amount_value: 27.029,
    amount_unit: "B",
    percentage: 42.3,
    yoy_change: 26,
    color: "#7C3AED",
    sort_order: 1,
  },
];

const broadcomCompetitors = [
  {
    name: "NVIDIA",
    icon: "nvidia",
    color: "#76B900",
    background_tint: "#F7FEE7",
    tag_text_color: "#4D7C0F",
    market_cap_value: 5560,
    market_cap_unit: "B",
    relative_size: 339,
    tag: "AI & Data Center",
    relationship:
      "Semiconductor competitor — NVIDIA overlaps with Broadcom in AI infrastructure, networking, and data center technologies",
    sort_order: 0,
  },
  {
    name: "AMD",
    icon: "amd",
    color: "#ED1C24",
    background_tint: "#FEF2F2",
    tag_text_color: "#B91C1C",
    market_cap_value: 2930,
    market_cap_unit: "B",
    relative_size: 179,
    tag: "AI & Semiconductors",
    relationship:
      "Semiconductor competitor — AMD competes across data center computing, AI accelerators, and related infrastructure",
    sort_order: 1,
  },
  {
    name: "Cisco",
    icon: "network",
    color: "#049FD9",
    background_tint: "#EFF6FF",
    tag_text_color: "#0369A1",
    market_cap_value: 280,
    market_cap_unit: "B",
    relative_size: 17,
    tag: "Networking",
    relationship:
      "Infrastructure competitor — Cisco overlaps with Broadcom in networking infrastructure, connectivity, and enterprise technology",
    sort_order: 2,
  },
  {
    name: "Oracle",
    icon: "database",
    color: "#C74634",
    background_tint: "#FEF2F2",
    tag_text_color: "#B91C1C",
    market_cap_value: 419,
    market_cap_unit: "B",
    relative_size: 26,
    tag: "Cloud & Enterprise Software",
    relationship:
      "Software and infrastructure competitor — Oracle overlaps with Broadcom through cloud infrastructure, enterprise software, and data center technology",
    sort_order: 3,
  },
];

const broadcomSeed: SeedCompany = {
  company: broadcomCompany,
  segments: broadcomSegments,
  competitors: broadcomCompetitors,
};
const amdCompany = {
  slug: "amd",
  name: "Advanced Micro Devices, Inc.",
  brand_name: "AMD",
  ticker: "AMD",
  exchange: "NASDAQ",
  industry: "Technology",
  logo_initial: "A",
  logo: "/logos/amd-svgrepo-com.svg",

  tagline:
    "Designs high-performance processors, graphics chips, and adaptive computing products for data centers, PCs, gaming, and embedded systems.",

  what_it_does:
    "AMD designs high-performance computing and semiconductor products used in data centers, artificial intelligence, personal computers, gaming consoles, and embedded systems. Its products include EPYC server processors, Instinct AI accelerators, Ryzen processors, Radeon graphics, and adaptive computing products.",

  founded: "1969",
  headquarters: "Santa Clara, California",
  ceo: "Lisa Su",
  ceo_since: "2014",

  // Editorial Scope score for Scope — not an external financial metric.
  scope_score: 8.8,
  scope_score_label: "Strong",

  snapshot: [
    {
      icon: "shield-check",
      tone: "good",
      label: "Quality",
      rating: { kind: "stars", outOf: 5, value: 5 },
    },
    {
      icon: "shield-lock",
      tone: "good",
      label: "Moat",
      rating: { kind: "stars", outOf: 5, value: 4 },
    },
    {
      icon: "coin",
      tone: "good",
      label: "Profitability",
      rating: { kind: "stars", outOf: 4, value: 4 },
    },
    {
      icon: "trending-up",
      tone: "good",
      label: "Revenue growth",
      rating: { kind: "arrow", label: "Growing" },
    },
    {
      icon: "alert-triangle",
      tone: "risk",
      label: "Risk",
      rating: { kind: "badge", label: "Medium" },
    },
    {
      icon: "scale",
      tone: "neutral",
      label: "Valuation",
      rating: { kind: "badge", label: "Moderate" },
    },
  ],

  thirty_second_summary: {
    subtitle: "A plain-English explanation of AMD's business model",
    content:
      "AMD makes money by designing and selling high-performance computing chips and adaptive computing products. Its major businesses serve data centers and AI, personal computers and gaming, and embedded systems. AMD designs the products while relying on third-party manufacturing partners to produce its semiconductor wafers.",
  },

  business_model: {
    stages: [
      {
        icon: "server",
        tags: [
          { icon: "server", label: "EPYC CPUs" },
          { icon: "sparkles", label: "Instinct GPUs" },
          { icon: "network", label: "AI Infrastructure" },
          { icon: "cloud", label: "Data Centers" },
        ],
        color: "#EF4444",
        title: "Power Data Centers & AI",
        tagTextColor: "#B91C1C",
        backgroundTint: "#FEF2F2",
      },
      {
        icon: "cpu",
        tags: [
          { icon: "cpu", label: "Ryzen CPUs" },
          { icon: "apps", label: "Radeon GPUs" },
          { icon: "apps", label: "Gaming" },
          { icon: "apps", label: "PCs" },
        ],
        color: "#2563EB",
        title: "Power PCs & Gaming",
        tagTextColor: "#1D4ED8",
        backgroundTint: "#EFF6FF",
      },
      {
        icon: "settings",
        tags: [
          { icon: "settings", label: "Adaptive Computing" },
          { icon: "cpu", label: "Embedded Chips" },
          { icon: "network", label: "Communications" },
          { icon: "car", label: "Automotive" },
        ],
        color: "#7C3AED",
        title: "Serve Embedded Systems",
        tagTextColor: "#6D28D9",
        backgroundTint: "#F5F3FF",
      },
    ],
    insight:
      "AMD combines CPUs, GPUs, AI accelerators, and adaptive computing products across data centers, PCs, gaming, and embedded markets.",
    repeatNote:
      "Customers pay AMD for processors, graphics products, AI accelerators, adaptive computing products, and related semiconductor solutions.",
  },

  strengths_and_risks: {
    strengths: [
      {
        icon: "server",
        title: "Data Center Growth",
        description:
          "AMD's Data Center revenue reached $16.6B in FY2025, increasing 32% year over year, driven by EPYC processors and Instinct GPUs",
      },
      {
        icon: "sparkles",
        title: "AI Computing",
        description:
          "AMD is expanding its Instinct accelerator portfolio and AI infrastructure solutions for large-scale computing workloads",
      },
      {
        icon: "cpu",
        title: "Broad Product Portfolio",
        description:
          "AMD serves data centers, PCs, gaming, and embedded markets through CPUs, GPUs, accelerators, and adaptive computing products",
      },
      {
        icon: "apps", 
        title: "High-Performance Computing",
        description:
          "AMD develops multiple computing architectures and product families that address different performance and workload requirements",
      },
      {
        icon: "cloud",
        title: "Cloud & Enterprise Adoption",
        description:
          "AMD EPYC processors and Instinct accelerators are used across cloud and enterprise data center environments",
      },
    ],

    risks: [
      {
        icon: "swords",
        title: "Intense Competition",
        description:
          "AMD competes with NVIDIA and Intel across important data center, GPU, CPU, PC, and AI markets",
      },
      {
        icon: "trending-up",
        title: "Semiconductor Cycles",
        description:
          "AMD states that the semiconductor industry is highly cyclical and can experience significant changes in supply, demand, pricing, and inventory",
      },
      {
        icon: "building",
        title: "Manufacturing Dependence",
        description:
          "AMD relies on third-party foundries to manufacture its semiconductor products, including TSMC for products using advanced process nodes",
      },
      {
        icon: "users",
        title: "Customer Concentration",
        description:
          "The loss or reduced demand from significant customers can materially affect AMD's revenue and operating results",
      },
      {
        icon: "bulb", 
        title: "Rapid Technology Changes",
        description:
          "AMD operates in markets where product generations, computing architectures, AI workloads, and customer requirements change rapidly",
      },
    ],
  },

  financial_overview: {
    insight:
      "AMD generated $34.6B of revenue in FY2025, up 34% from FY2024. Net income was $4.3B and free cash flow was $6.7B. The latest reported quarter, Q2 2026, generated record revenue of $11.5B, including $6.7B from Data Center.",
    metrics: [
      {
        icon: "report-money",
        label: "Revenue",
        value: { unit: "B", value: 34.639 },
        change: { value: 34.3 },
        sublabel: "FY25",
      },
      {
        icon: "coin",
        label: "Net Income",
        value: { unit: "B", value: 4.335 },
        change: { value: 164.2 },
        sublabel: "FY25",
      },
      {
        icon: "droplet",
        label: "Free Cash Flow",
        value: { unit: "B", value: 6.735 },
        change: { value: 180 },
        sublabel: "FY25",
      },
    ],
    fiscalYearLabel: "Fiscal year 2025 (ended December 27, 2025)",
  },

  financial_history: {
    panels: [
      {
        icon: "report-money",
        unit: "B",
        color: "#93c5fd",
        label: "Revenue",
        years: ["'21", "'22", "'23", "'24", "'25"],
        values: [16.434, 23.601, 22.68, 25.785, 34.639],
        changeNote: "+111% since FY21",
        highlightColor: "#1d4ed8",
        currentValueLabel: "$34.6B",
      },
      {
        icon: "coin",
        unit: "B",
        color: "#86efac",
        label: "Net Income",
        years: ["'21", "'22", "'23", "'24", "'25"],
        values: [3.162, 1.32, 0.854, 1.641, 4.335],
        changeNote: "+37% since FY21",
        highlightColor: "#15803d",
        currentValueLabel: "$4.3B",
      },
      {
        icon: "droplet",
        unit: "B",
        color: "#c4b5fd",
        label: "Free Cash Flow",
        years: ["'21", "'22", "'23", "'24", "'25"],
        values: [3.22, 3.115, 1.121, 2.405, 6.735],
        changeNote: "+109% since FY21",
        highlightColor: "#7c3aed",
        currentValueLabel: "$6.7B",
      },
    ],
    rangeLabel: "5-year trend, fiscal years 2021–2025",
  },

  ecosystem: {
    output: {
      icon: "server",
      name: "Computing Ecosystem",
      color: "#EF4444",
      description:
        "AMD products connect data centers, AI systems, PCs, gaming platforms, and embedded computing environments",
      backgroundTint: "#FEF2F2",
    },

    insight:
      "AMD sits across several layers of the computing ecosystem, from CPUs and GPUs to AI accelerators and adaptive computing products.",

    partners: [
      {
        icon: "building",
        name: "TSMC",
        color: "#E67E22",
        description:
          "AMD relies on TSMC to manufacture wafers for microprocessor and GPU products using advanced process nodes",
        backgroundTint: "#FFF7ED",
      },
      {
        icon: "cloud",
        name: "Microsoft",
        color: "#2563EB",
        description:
          "AMD computing products are used across cloud and enterprise environments, including Microsoft platforms",
        backgroundTint: "#EFF6FF",
      },
      {
        icon: "sparkles",
        name: "OpenAI",
        color: "#111827",
        description:
          "AMD announced an agreement with OpenAI to deploy up to 6 gigawatts of next-generation AMD Instinct GPU infrastructure",
        backgroundTint: "#F3F4F6",
      },
    ],

    centerLabel: "AMD",
    flowInLabel: "← Computing workloads & demand flow in",
    flowOutLabel: "Processors & accelerators flow out →",
    centerSublabel: "The high-performance computing platform",
  },

  overview: {
    ceo: "Lisa Su",
    founded: "1969",
    revenue: { unit: "B", value: 34.639 },
    ceoSince: "2014",
    marketCap: { unit: "T", value: 1.005 },
    revenueYoY: { value: 34.3 },
    whatItDoes:
      "AMD designs processors, graphics products, AI accelerators, and adaptive computing solutions used in data centers, PCs, gaming, and embedded systems.",
    headquarters: "Santa Clara, California",
    marketCapRank: "#16 in the world",
    revenueFiscalYear: "FY25",
  },

  business_segments_insight:
    "AMD reports three segments: Data Center, Client and Gaming, and Embedded. Data Center includes server CPUs, GPUs, and related data center products; Client and Gaming includes Ryzen processors, Radeon graphics, and semi-custom gaming products; Embedded includes adaptive computing and embedded products.",

  business_segments_footnote:
    "Fiscal year 2025 ended December 27, 2025. Segment values use AMD's reported revenue categories.",

  competitors_context_note:
    "Companies that compete with AMD across CPUs, GPUs, AI accelerators, data center infrastructure, and embedded semiconductors. Market cap shown relative to AMD's approximately $1.005T October 2026 snapshot.",

  competitors_insight:
    "AMD competes across several semiconductor markets with companies including NVIDIA, Intel, Broadcom, and Qualcomm.",
};

const amdSegments = [
  {
    name: "Data Center",
    amount_value: 16.635,
    amount_unit: "B",
    percentage: 48,
    yoy_change: 32,
    color: "#EF4444",
    sort_order: 0,
  },
  {
    name: "Client & Gaming",
    amount_value: 14.55,
    amount_unit: "B",
    percentage: 42,
    yoy_change: 51,
    color: "#2563EB",
    sort_order: 1,
  },
  {
    name: "Embedded",
    amount_value: 3.454,
    amount_unit: "B",
    percentage: 10,
    yoy_change: -3,
    color: "#7C3AED",
    sort_order: 2,
  },
];

const amdCompetitors = [
  {
    name: "NVIDIA",
    icon: "nvidia",
    color: "#76B900",
    background_tint: "#F7FEE7",
    tag_text_color: "#4D7C0F",
    market_cap_value: 5574,
    market_cap_unit: "B",
    relative_size: 555,
    tag: "AI & Data Center",
    relationship:
      "Direct competitor — NVIDIA competes with AMD across data center GPUs, AI accelerators, and accelerated computing",
    sort_order: 0,
  },
  {
    name: "Intel",
    icon: "cpu",
    color: "#0071C5",
    background_tint: "#EFF6FF",
    tag_text_color: "#0369A1",
    market_cap_value: 634.33,
    market_cap_unit: "B",
    relative_size: 63,
    tag: "CPUs & Data Center",
    relationship:
      "Direct competitor — Intel competes with AMD across server CPUs, PC processors, and data center computing",
    sort_order: 1,
  },
  {
    name: "Broadcom",
    icon: "server",
    color: "#E31837",
    background_tint: "#FEF2F2",
    tag_text_color: "#B91C1C",
    market_cap_value: 1640,
    market_cap_unit: "B",
    relative_size: 163,
    tag: "Semiconductors",
    relationship:
      "Semiconductor competitor — Broadcom overlaps with AMD in data center infrastructure, networking, and embedded semiconductor markets",
    sort_order: 2,
  },
  {
    name: "Qualcomm",
    icon: "wifi",
    color: "#3253DC",
    background_tint: "#EEF2FF",
    tag_text_color: "#3730A3",
    market_cap_value: 194.48,
    market_cap_unit: "B",
    relative_size: 19,
    tag: "Semiconductors",
    relationship:
      "Embedded semiconductor competitor — Qualcomm competes with AMD in parts of the embedded and semiconductor markets",
    sort_order: 3,
  },
];

const amdSeed: SeedCompany = {
  company: amdCompany,
  segments: amdSegments,
  competitors: amdCompetitors,
};
const walmartCompany = {
  slug: "walmart",
  name: "Walmart Inc.",
  brand_name: "Walmart",
  ticker: "WMT",
  exchange: "NASDAQ",
  industry: "Consumer",
  logo_initial: "W",
  logo: "/logos/walmart-logo-svgrepo-com.svg",

  tagline:
    "Operates a global retail and membership business through stores, eCommerce, and digital services.",

  what_it_does:
    "Walmart operates a large-scale retail business selling groceries, general merchandise, health and wellness products, and other consumer goods through physical stores and eCommerce. Its business is organized into Walmart U.S., Walmart International, and Sam's Club U.S.",

  founded: "1962",
  headquarters: "Bentonville, Arkansas",
  ceo: "John Furner",
  ceo_since: "2026",

  // Editorial Scope score for Scope — not an external financial metric.
  scope_score: 8.6,
  scope_score_label: "Strong",

  snapshot: [
    {
      icon: "shield-check",
      tone: "good",
      label: "Quality",
      rating: { kind: "stars", outOf: 5, value: 5 },
    },
    {
      icon: "shield-lock",
      tone: "good",
      label: "Moat",
      rating: { kind: "stars", outOf: 5, value: 5 },
    },
    {
      icon: "coin",
      tone: "good",
      label: "Profitability",
      rating: { kind: "stars", outOf: 4, value: 4 },
    },
    {
      icon: "trending-up",
      tone: "good",
      label: "Revenue growth",
      rating: { kind: "arrow", label: "Growing" },
    },
    {
      icon: "alert-triangle",
      tone: "risk",
      label: "Risk",
      rating: { kind: "badge", label: "Medium" },
    },
    {
      icon: "scale",
      tone: "neutral",
      label: "Valuation",
      rating: { kind: "badge", label: "Moderate" },
    },
  ],

  thirty_second_summary: {
    subtitle: "A plain-English explanation of Walmart's business model",
    content:
      "Walmart makes money primarily by selling products through its stores and eCommerce platforms. Its three main businesses are Walmart U.S., Walmart International, and Sam's Club U.S. It also earns income from memberships and other services, while its large scale helps it offer everyday low prices and operate a broad retail network.",
  },

  business_model: {
    stages: [
      {
        icon: "building-store",
        tags: [
          { icon: "building-store", label: "Retail Stores" },
          { icon: "shopping-cart", label: "Everyday Low Prices" },
          { icon: "basket", label: "Groceries" },
          { icon: "package", label: "General Merchandise" },
        ],
        color: "#2563EB",
        title: "Sell Products at Scale",
        tagTextColor: "#1D4ED8",
        backgroundTint: "#EFF6FF",
      },
      {
        icon: "world",
        tags: [
          { icon: "building", label: "Walmart U.S." },
          { icon: "world", label: "International" },
          { icon: "shopping-bag", label: "eCommerce" },
          { icon: "device-mobile", label: "Digital Services" },
        ],
        color: "#0EA5E9",
        title: "Reach Customers Globally",
        tagTextColor: "#0369A1",
        backgroundTint: "#F0F9FF",
      },
      {
        icon: "users",
        tags: [
          { icon: "users", label: "Sam's Club" },
          { icon: "credit-card", label: "Memberships" },
          { icon: "truck-delivery", label: "Delivery" },
          { icon: "shopping-cart", label: "Omnichannel" },
        ],
        color: "#7C3AED",
        title: "Add Membership & Services",
        tagTextColor: "#6D28D9",
        backgroundTint: "#F5F3FF",
      },
    ],
    insight:
      "Walmart combines physical retail, eCommerce, international operations, and membership-based retail to serve customers across multiple shopping channels.",
    repeatNote:
      "Customers pay Walmart primarily for merchandise, while the company also earns membership and other income from services and related activities.",
  },

  strengths_and_risks: {
    strengths: [
      {
        icon: "building-store",
        title: "Massive Retail Scale",
        description:
          "Walmart operates one of the world's largest retail networks, with 10,955 retail units at the end of fiscal 2026",
      },
      {
        icon: "coin",
        title: "Everyday Low Prices",
        description:
          "Walmart uses its everyday low price philosophy to attract customers with consistently low prices across a broad assortment",
      },
      {
        icon: "shopping-cart",
        title: "Omnichannel Retail",
        description:
          "Walmart combines physical stores, eCommerce, pickup, delivery, and digital services across its retail ecosystem",
      },
      {
        icon: "world",
        title: "Global Reach",
        description:
          "Walmart International operated across 18 countries as of January 31, 2026",
      },
      {
        icon: "users",
        title: "Membership Business",
        description:
          "Sam's Club U.S. provides a membership-based warehouse retail model alongside Walmart's broader retail operations",
      },
    ],

    risks: [
      {
        icon: "swords",
        title: "Intense Retail Competition",
        description:
          "Walmart competes with major retailers and eCommerce companies across grocery, general merchandise, membership retail, and online shopping",
      },
      {
        icon: "trending-down",
        title: "Low-Margin Business",
        description:
          "Retail operates with relatively thin operating margins, making cost control and efficient operations important to profitability",
      },
      {
        icon: "building",
        title: "Large Operating Footprint",
        description:
          "Operating thousands of stores and facilities creates significant costs related to labor, property, logistics, technology, and maintenance",
      },
      {
        icon: "world",
        title: "International Exposure",
        description:
          "Walmart operates across multiple international markets and is exposed to currency movements, local economic conditions, and regulatory environments",
      },
      {
        icon: "shopping-cart",
        title: "Consumer Demand",
        description:
          "Changes in consumer spending, inflation, employment, and purchasing behavior can affect retail sales and operating performance",
      },
    ],
  },

  financial_overview: {
    insight:
      "Walmart generated $713.2B of revenue in fiscal 2026, up 4.7% from fiscal 2025. Net income attributable to Walmart was $21.9B and free cash flow was $14.9B.",
    metrics: [
      {
        icon: "report-money",
        label: "Revenue",
        value: { unit: "B", value: 713.163 },
        change: { value: 4.7 },
        sublabel: "FY26",
      },
      {
        icon: "coin",
        label: "Net Income",
        value: { unit: "B", value: 21.893 },
        change: { value: 12.6 },
        sublabel: "FY26",
      },
      {
        icon: "droplet",
        label: "Free Cash Flow",
        value: { unit: "B", value: 14.923 },
        change: { value: 17.9 },
        sublabel: "FY26",
      },
    ],
    fiscalYearLabel: "Fiscal year 2026 (ended January 31, 2026)",
  },

  financial_history: {
    panels: [
      {
        icon: "report-money",
        unit: "B",
        color: "#93c5fd",
        label: "Revenue",
        years: ["'22", "'23", "'24", "'25", "'26"],
        values: [572.754, 611.289, 648.125, 680.985, 713.163],
        changeNote: "+24% since FY22",
        highlightColor: "#1d4ed8",
        currentValueLabel: "$713.2B",
      },
      {
        icon: "coin",
        unit: "B",
        color: "#86efac",
        label: "Net Income",
        years: ["'22", "'23", "'24", "'25", "'26"],
        values: [13.673, 11.68, 15.511, 19.436, 21.893],
        changeNote: "+60% since FY22",
        highlightColor: "#15803d",
        currentValueLabel: "$21.9B",
      },
      {
        icon: "droplet",
        unit: "B",
        color: "#c4b5fd",
        label: "Free Cash Flow",
        years: ["'22", "'23", "'24", "'25", "'26"],
        values: [11.075, 11.984, 15.12, 12.66, 14.923],
        changeNote: "+35% since FY22",
        highlightColor: "#7c3aed",
        currentValueLabel: "$14.9B",
      },
    ],
    rangeLabel: "5-year trend, fiscal years 2022–2026",
  },

  ecosystem: {
    output: {
      icon: "building-store",
      name: "Retail Ecosystem",
      color: "#2563EB",
      description:
        "Walmart connects suppliers, stores, eCommerce platforms, logistics, memberships, and customers across its retail ecosystem",
      backgroundTint: "#EFF6FF",
    },

    insight:
      "Walmart operates across the retail value chain, connecting suppliers and brands with customers through stores, eCommerce, logistics, and membership platforms.",

    partners: [
      {
        icon: "building",
        name: "Suppliers",
        color: "#2563EB",
        description:
          "Walmart works with suppliers and brands to provide merchandise across its stores and digital channels",
        backgroundTint: "#EFF6FF",
      },
      {
        icon: "truck-delivery",
        name: "Logistics",
        color: "#0EA5E9",
        description:
          "Walmart's distribution and fulfillment network moves products across stores, warehouses, and customer delivery channels",
        backgroundTint: "#F0F9FF",
      },
      {
        icon: "world",
        name: "eCommerce",
        color: "#7C3AED",
        description:
          "Walmart's digital platforms connect customers with merchandise, pickup, delivery, and other services",
        backgroundTint: "#F5F3FF",
      },
    ],

    centerLabel: "Walmart",
    flowInLabel: "← Products & supply flow in",
    flowOutLabel: "Retail products & services flow out →",
    centerSublabel: "The global retail platform",
  },

  overview: {
    ceo: "John Furner",
    founded: "1962",
    revenue: { unit: "B", value: 713.163 },
    ceoSince: "2026",
    marketCap: { unit: "B", value: 827.68 },
    revenueYoY: { value: 4.7 },
    whatItDoes:
      "Walmart operates stores and eCommerce platforms selling groceries, general merchandise, health and wellness products, and other consumer goods.",
    headquarters: "Bentonville, Arkansas",
    marketCapRank: "#19 in the world",
    revenueFiscalYear: "FY26",
  },

  business_segments_insight:
    "Walmart reports three operating segments: Walmart U.S., Walmart International, and Sam's Club U.S. These segments cover its domestic retail operations, international businesses, and membership-based warehouse retail business.",

  business_segments_footnote:
    "Fiscal year 2026 ended January 31, 2026. Segment values use Walmart's reported net sales.",

  competitors_context_note:
    "Companies that compete with Walmart across retail, eCommerce, grocery, and membership-based shopping. Market cap shown relative to Walmart's approximately $827.68B October 2026 snapshot.",

  competitors_insight:
    "Walmart competes with major retailers and eCommerce companies including Amazon, Costco, Target, and Kroger across different parts of the retail market.",
};

const walmartSegments = [
  {
    name: "Walmart U.S.",
    amount_value: 485.599,
    amount_unit: "B",
    percentage: 68,
    yoy_change: 4.4,
    color: "#2563EB",
    sort_order: 0,
  },
  {
    name: "Walmart International",
    amount_value: 131.988,
    amount_unit: "B",
    percentage: 19,
    yoy_change: 7,
    color: "#0EA5E9",
    sort_order: 1,
  },
  {
    name: "Sam's Club U.S.",
    amount_value: 95.54,
    amount_unit: "B",
    percentage: 13,
    yoy_change: 3.2,
    color: "#7C3AED",
    sort_order: 2,
  },
  {
    name: "Corporate & Support",
    amount_value: 0.036,
    amount_unit: "B",
    percentage: 0,
    yoy_change: -30.8,
    color: "#6B7280",
    sort_order: 3,
  },
];

const walmartCompetitors = [
  {
    name: "Amazon",
    icon: "shopping-cart",
    color: "#FF9900",
    background_tint: "#FFF7ED",
    tag_text_color: "#C2410C",
    market_cap_value: 2674,
    market_cap_unit: "B",
    relative_size: 323,
    tag: "eCommerce & Retail",
    relationship:
      "Direct competitor — Amazon competes with Walmart across eCommerce, grocery, general merchandise, and consumer retail",
    sort_order: 0,
  },
  {
    name: "Costco",
    icon: "building",
    color: "#E31837",
    background_tint: "#FEF2F2",
    tag_text_color: "#B91C1C",
    market_cap_value: 405.51,
    market_cap_unit: "B",
    relative_size: 49,
    tag: "Membership Retail",
    relationship:
      "Direct competitor — Costco competes with Walmart in grocery, general merchandise, and membership-based retail",
    sort_order: 1,
  },
  {
    name: "Target",
    icon: "target",
    color: "#CC0000",
    background_tint: "#FEF2F2",
    tag_text_color: "#B91C1C",
    market_cap_value: 70.79,
    market_cap_unit: "B",
    relative_size: 9,
    tag: "General Merchandise",
    relationship:
      "Direct competitor — Target competes with Walmart across general merchandise, grocery, household products, and eCommerce",
    sort_order: 2,
  },
  {
    name: "Kroger",
    icon: "shopping-bag",
    color: "#0053A0",
    background_tint: "#EFF6FF",
    tag_text_color: "#1D4ED8",
    market_cap_value: 36.2,
    market_cap_unit: "B",
    relative_size: 4,
    tag: "Grocery Retail",
    relationship:
      "Retail competitor — Kroger competes with Walmart primarily in grocery and supermarket retail",
    sort_order: 3,
  },
];

const walmartSeed: SeedCompany = {
  company: walmartCompany,
  segments: walmartSegments,
  competitors: walmartCompetitors,
};
const netflixCompany = {
  slug: "netflix",
  name: "Netflix, Inc.",
  brand_name: "Netflix",
  ticker: "NFLX",
  exchange: "NASDAQ",
  industry: "Entertainment",
  logo_initial: "N",
  logo: "/logos/netflix-icon-svgrepo-com.svg",

  tagline:
    "Provides a global entertainment service offering TV series, films, games, and live programming.",

  what_it_does:
    "Netflix operates a global entertainment streaming service where members pay for access to TV series, films, games, and live programming. The company primarily generates revenue from membership fees and also generates advertising revenue through its ad-supported plan.",

  founded: "1997",
  headquarters: "Los Gatos, California",
  ceo: "Ted Sarandos & Greg Peters",
  ceo_since: "2023",

  // Editorial Scope score for Scope — not an external financial metric.
  scope_score: 8.8,
  scope_score_label: "Strong",

  // Editorial ratings for Scope — not external financial metrics.
  snapshot: [
    {
      icon: "shield-check",
      tone: "good",
      label: "Quality",
      rating: { kind: "stars", outOf: 5, value: 5 },
    },
    {
      icon: "shield-lock",
      tone: "good",
      label: "Moat",
      rating: { kind: "stars", outOf: 5, value: 4 },
    },
    {
      icon: "coin",
      tone: "good",
      label: "Profitability",
      rating: { kind: "stars", outOf: 4, value: 4 },
    },
    {
      icon: "trending-up",
      tone: "good",
      label: "Revenue growth",
      rating: { kind: "arrow", label: "Growing" },
    },
    {
      icon: "alert-triangle",
      tone: "risk",
      label: "Risk",
      rating: { kind: "badge", label: "Medium" },
    },
    {
      icon: "scale",
      tone: "neutral",
      label: "Valuation",
      rating: { kind: "badge", label: "Moderate" },
    },
  ],

  thirty_second_summary: {
    subtitle: "A plain-English explanation of Netflix's business model",
    content:
      "Netflix makes money primarily by charging members recurring subscription fees to access its entertainment service. It also generates advertising revenue from its ad-supported plan. The company invests heavily in licensed and original content and distributes that content globally through its streaming platform.",
  },

  business_model: {
    stages: [
      {
        icon: "device-tv",
        tags: [
          { icon: "device-tv", label: "Streaming" },
          { icon: "movie", label: "Films & Series" },
          { icon: "device-gamepad", label: "Games" },
          { icon: "live-photo", label: "Live Programming" },
        ],
        color: "#E50914",
        title: "Create & License Entertainment",
        tagTextColor: "#B91C1C",
        backgroundTint: "#FEF2F2",
      },
      {
        icon: "users",
        tags: [
          { icon: "users", label: "Members" },
          { icon: "world", label: "190+ Countries" },
          { icon: "device-tv", label: "Multiple Screens" },
          { icon: "language", label: "Global Content" },
        ],
        color: "#7C3AED",
        title: "Reach a Global Audience",
        tagTextColor: "#6D28D9",
        backgroundTint: "#F5F3FF",
      },
      {
        icon: "credit-card",
        tags: [
          { icon: "credit-card", label: "Subscriptions" },
          { icon: "ad", label: "Advertising" },
          { icon: "device-mobile", label: "Digital Service" },
          { icon: "repeat", label: "Recurring Revenue" },
        ],
        color: "#2563EB",
        title: "Monetize Members & Advertising",
        tagTextColor: "#1D4ED8",
        backgroundTint: "#EFF6FF",
      },
    ],

    insight:
      "Netflix combines recurring subscription revenue with advertising revenue while using a global streaming platform to distribute entertainment content at scale.",

    repeatNote:
      "Customers primarily pay Netflix through recurring membership fees, while the company also earns advertising revenue from its ad-supported plan.",
  },

  strengths_and_risks: {
    strengths: [
      {
        icon: "world",
        title: "Global Distribution",
        description:
          "Netflix operates its entertainment service across more than 190 countries and territories",
      },
      {
        icon: "movie",
        title: "Large Content Library",
        description:
          "Netflix combines licensed and original TV series, films, games, and live programming",
      },
      {
        icon: "users",
        title: "Recurring Subscription Model",
        description:
          "Membership fees provide recurring revenue from customers who subscribe to the service",
      },
      {
        icon: "device-tv",
        title: "Multi-Device Platform",
        description:
          "Members can access Netflix across connected TVs, mobile devices, computers, and other supported screens",
      },
      {
        icon: "ad",
        title: "Advertising Revenue",
        description:
          "Netflix has expanded monetization through its ad-supported subscription offering",
      },
    ],

    risks: [
      {
        icon: "swords",
        title: "Intense Entertainment Competition",
        description:
          "Netflix competes for consumer leisure time against streaming services, traditional television, gaming, social media, and other entertainment",
      },
      {
        icon: "movie",
        title: "High Content Costs",
        description:
          "Netflix commits significant amounts of cash to acquiring, licensing, and producing entertainment content",
      },
      {
        icon: "users",
        title: "Member Retention",
        description:
          "Customer cancellations and changes in consumer preferences can affect revenue and growth",
      },
      {
        icon: "world",
        title: "Global Exposure",
        description:
          "Operating internationally exposes Netflix to foreign exchange movements, regulation, taxation, and local market conditions",
      },
      {
        icon: "currency-dollar",
        title: "Currency Movements",
        description:
          "Netflix generates revenue in multiple currencies while reporting its financial results in U.S. dollars",
      },
    ],
  },

  financial_overview: {
    insight:
      "Netflix generated $45.2B of revenue in fiscal 2025, up 15.9% from fiscal 2024. Net income was $11.0B and free cash flow was $9.5B.",

    metrics: [
      {
        icon: "report-money",
        label: "Revenue",
        value: { unit: "B", value: 45.183 },
        change: { value: 15.9 },
        sublabel: "FY25",
      },
      {
        icon: "coin",
        label: "Net Income",
        value: { unit: "B", value: 10.981 },
        change: { value: 26.0 },
        sublabel: "FY25",
      },
      {
        icon: "droplet",
        label: "Free Cash Flow",
        value: { unit: "B", value: 9.461 },
        change: { value: 36.7 },
        sublabel: "FY25",
      },
    ],

    fiscalYearLabel: "Fiscal year 2025 (ended December 31, 2025)",
  },

  financial_history: {
    panels: [
      {
        icon: "report-money",
        unit: "B",
        color: "#93c5fd",
        label: "Revenue",
        years: ["'21", "'22", "'23", "'24", "'25"],
        values: [29.698, 31.616, 33.723, 39.001, 45.183],
        changeNote: "+52% since FY21",
        highlightColor: "#1d4ed8",
        currentValueLabel: "$45.2B",
      },
      {
        icon: "coin",
        unit: "B",
        color: "#86efac",
        label: "Net Income",
        years: ["'21", "'22", "'23", "'24", "'25"],
        values: [5.116, 4.492, 5.408, 8.712, 10.981],
        changeNote: "+115% since FY21",
        highlightColor: "#15803d",
        currentValueLabel: "$11.0B",
      },
      {
        icon: "droplet",
        unit: "B",
        color: "#c4b5fd",
        label: "Free Cash Flow",
        years: ["'21", "'22", "'23", "'24", "'25"],
        values: [-0.159, 1.619, 6.926, 6.922, 9.461],
        changeNote: "From -$0.2B to $9.5B",
        highlightColor: "#7c3aed",
        currentValueLabel: "$9.5B",
      },
    ],

    rangeLabel: "5-year trend, fiscal years 2021–2025",
  },

  ecosystem: {
    output: {
      icon: "device-tv",
      name: "Entertainment Platform",
      color: "#E50914",
      description:
        "Netflix connects content creators, studios, technology, advertisers, and members through its global entertainment platform",
      backgroundTint: "#FEF2F2",
    },

    insight:
      "Netflix connects content creation and licensing with a global digital distribution platform, allowing members to access entertainment across multiple devices.",

    partners: [
      {
        icon: "movie",
        name: "Content Creators",
        color: "#E50914",
        description:
          "Netflix works with creators, studios, producers, and other rights holders to develop and license entertainment content",
        backgroundTint: "#FEF2F2",
      },
      {
        icon: "server",
        name: "Technology & Distribution",
        color: "#2563EB",
        description:
          "Netflix uses technology and content delivery infrastructure to distribute entertainment to members globally",
        backgroundTint: "#EFF6FF",
      },
      {
        icon: "ad",
        name: "Advertisers",
        color: "#7C3AED",
        description:
          "Advertisers purchase advertising opportunities through Netflix's ad-supported offering",
        backgroundTint: "#F5F3FF",
      },
    ],

    centerLabel: "Netflix",
    flowInLabel: "← Content & advertising partnerships",
    flowOutLabel: "Entertainment service →",
    centerSublabel: "The global entertainment platform",
  },

  overview: {
    ceo: "Ted Sarandos & Greg Peters",
    founded: "1997",
    revenue: { unit: "B", value: 45.183 },
    ceoSince: "2023",
    marketCap: { unit: "B", value: 282.52 },
    revenueYoY: { value: 15.9 },
    whatItDoes:
      "Netflix operates a global streaming entertainment service offering TV series, films, games, and live programming.",
    headquarters: "Los Gatos, California",
    marketCapRank: "#51 in the world",
    revenueFiscalYear: "FY25",
  },

  business_segments_insight:
    "Netflix reports one operating segment. For Scope's business visualization, revenue is shown by Netflix's four reported geographic streaming revenue regions: UCAN, EMEA, LATAM, and APAC.",

  business_segments_footnote:
    "Fiscal year 2025 ended December 31, 2025. These values represent Netflix's reported streaming revenue by geographic region, not separate operating segments.",

  competitors_context_note:
    "Companies that compete with Netflix for consumer entertainment time across streaming, television, digital media, and other forms of entertainment. Market caps use an October 1, 2026 snapshot.",

  competitors_insight:
    "Netflix competes for consumer leisure time with streaming services, media companies, technology platforms, television providers, gaming, and social media.",
};

const netflixSegments = [
  {
    name: "UCAN",
    amount_value: 19.957,
    amount_unit: "B",
    percentage: 44,
    yoy_change: 15,
    color: "#E50914",
    sort_order: 0,
  },
  {
    name: "EMEA",
    amount_value: 14.515,
    amount_unit: "B",
    percentage: 32,
    yoy_change: 17,
    color: "#7C3AED",
    sort_order: 1,
  },
  {
    name: "LATAM",
    amount_value: 5.358,
    amount_unit: "B",
    percentage: 12,
    yoy_change: 11,
    color: "#2563EB",
    sort_order: 2,
  },
  {
    name: "APAC",
    amount_value: 5.354,
    amount_unit: "B",
    percentage: 12,
    yoy_change: 21,
    color: "#0EA5E9",
    sort_order: 3,
  },
];

const netflixCompetitors = [
  {
    name: "Amazon",
    icon: "shopping-cart",
    color: "#FF9900",
    background_tint: "#FFF7ED",
    tag_text_color: "#C2410C",
    market_cap_value: 2677,
    market_cap_unit: "B",
    relative_size: 948,
    tag: "Streaming & Technology",
    relationship:
      "Entertainment competitor — Amazon competes for consumer leisure time through Prime Video, streaming content, and other digital entertainment",
    sort_order: 0,
  },
  {
    name: "Disney",
    icon: "brand-disney",
    color: "#2563EB",
    background_tint: "#EFF6FF",
    tag_text_color: "#1D4ED8",
    market_cap_value: 174.97,
    market_cap_unit: "B",
    relative_size: 62,
    tag: "Entertainment & Streaming",
    relationship:
      "Direct entertainment competitor — Disney competes with Netflix through Disney+, Hulu, films, television, and other entertainment businesses",
    sort_order: 1,
  },
  {
    name: "Warner Bros. Discovery",
    icon: "movie",
    color: "#0EA5E9",
    background_tint: "#F0F9FF",
    tag_text_color: "#0369A1",
    market_cap_value: 77.71,
    market_cap_unit: "B",
    relative_size: 28,
    tag: "Entertainment & Streaming",
    relationship:
      "Entertainment competitor — Warner Bros. Discovery competes through streaming, television networks, films, and other media properties",
    sort_order: 2,
  },
  {
    name: "Comcast",
    icon: "device-tv",
    color: "#F97316",
    background_tint: "#FFF7ED",
    tag_text_color: "#C2410C",
    market_cap_value: 77.01,
    market_cap_unit: "B",
    relative_size: 27,
    tag: "Media & Entertainment",
    relationship:
      "Entertainment competitor — Comcast competes across streaming, television, film, and other media and entertainment activities",
    sort_order: 3,
  },
];

const netflixSeed: SeedCompany = {
  company: netflixCompany,
  segments: netflixSegments,
  competitors: netflixCompetitors,
};
const visaCompany = {
  slug: "visa",
  name: "Visa Inc.",
  brand_name: "Visa",
  ticker: "V",
  exchange: "NYSE",
  industry: "Financial Services",
  logo_initial: "V",
  logo: "/logos/visa-3-svgrepo-com.svg",

  tagline:
    "Operates a global payments technology network connecting consumers, businesses, financial institutions, and governments.",

  what_it_does:
    "Visa operates a global payments technology network that facilitates electronic payments and money movement between consumers, businesses, financial institutions, and governments. Visa provides transaction processing through its VisaNet network and earns revenue primarily from payments volume, transaction processing, and related services.",

  founded: "1958",
  headquarters: "San Francisco, California",
  ceo: "Ryan McInerney",
  ceo_since: "2023",

  // Editorial Scope score — intentionally left for Scope's editorial criteria.
scope_score: 8.9,
scope_score_label: "Strong",

  snapshot: [
    {
      icon: "shield-check",
      tone: "good",
      label: "Quality",
      rating: { kind: "stars", outOf: 5, value: 5 },
    },
    {
      icon: "shield-lock",
      tone: "good",
      label: "Moat",
      rating: { kind: "stars", outOf: 5, value: 5 },
    },
    {
      icon: "coin",
      tone: "good",
      label: "Profitability",
      rating: { kind: "stars", outOf: 4, value: 4 },
    },
    {
      icon: "trending-up",
      tone: "good",
      label: "Revenue growth",
      rating: { kind: "arrow", label: "Growing" },
    },
    {
      icon: "alert-triangle",
      tone: "risk",
      label: "Risk",
      rating: { kind: "badge", label: "Medium" },
    },
    {
      icon: "scale",
      tone: "neutral",
      label: "Valuation",
      rating: { kind: "badge", label: "Moderate" },
    },
  ],

  thirty_second_summary: {
    subtitle: "A plain-English explanation of Visa's business model",
    content:
      "Visa makes money by operating a global payments network used to authorize, process, and facilitate electronic payments. Banks and other financial institutions connect to Visa's network, while consumers and businesses use Visa-enabled payment products to make purchases. Visa primarily earns revenue from payment volume, transaction processing, international transactions, and related services.",
  },

  business_model: {
    stages: [
      {
        icon: "credit-card",
        tags: [
          { icon: "credit-card", label: "Digital Payments" },
          { icon: "building-bank", label: "Banks & Financial Institutions" },
          { icon: "shopping-cart", label: "Merchants" },
          { icon: "users", label: "Consumers" },
        ],
        color: "#1A1F71",
        title: "Connect Payment Participants",
        tagTextColor: "#1A1F71",
        backgroundTint: "#EEF2FF",
      },
      {
        icon: "network",
        tags: [
          { icon: "network", label: "VisaNet" },
          { icon: "shield-check", label: "Authorization" },
          { icon: "arrows-exchange", label: "Clearing & Settlement" },
          { icon: "world", label: "Global Network" },
        ],
        color: "#2563EB",
        title: "Process Transactions",
        tagTextColor: "#1D4ED8",
        backgroundTint: "#EFF6FF",
      },
      {
        icon: "coin",
        tags: [
          { icon: "chart-line", label: "Payment Volume" },
          { icon: "database", label: "Data Processing" },
          { icon: "world", label: "International Transactions" },
          { icon: "briefcase", label: "Value-Added Services" },
        ],
        color: "#7C3AED",
        title: "Earn From Payment Activity",
        tagTextColor: "#6D28D9",
        backgroundTint: "#F5F3FF",
      },
    ],

    insight:
      "Visa operates a network rather than acting as a traditional bank. Its business benefits from payment activity flowing through the network between financial institutions, merchants, and consumers.",

    repeatNote:
      "Visa primarily earns revenue from payment volume and transaction processing, along with international transaction revenue and other services.",
  },

  strengths_and_risks: {
    strengths: [
      {
        icon: "world",
        title: "Global Payment Network",
        description:
          "Visa operates a global payments technology network serving more than 200 countries and territories",
      },
      {
        icon: "arrows-exchange",
        title: "Large Transaction Network",
        description:
          "Visa processed approximately 257.5 billion transactions during fiscal 2025",
      },
      {
        icon: "shield-check",
        title: "Network Infrastructure",
        description:
          "VisaNet provides transaction processing capabilities including authorization, clearing, and settlement",
      },
      {
        icon: "users",
        title: "Large Ecosystem",
        description:
          "Visa connects consumers, merchants, issuing financial institutions, acquiring institutions, and governments",
      },
      {
        icon: "chart-line",
        title: "Recurring Payment Activity",
        description:
          "Visa generates revenue as payment activity and transaction processing occur across its network",
      },
    ],

    risks: [
      {
        icon: "swords",
        title: "Payment Competition",
        description:
          "Visa competes with other payment networks, payment processors, digital payment systems, and emerging payment technologies",
      },
      {
        icon: "scale",
        title: "Regulatory Exposure",
        description:
          "Visa operates in a highly regulated payments industry and is subject to competition, interchange, privacy, and financial regulation",
      },
      {
        icon: "shield-x",
        title: "Cybersecurity Risk",
        description:
          "A global payment network must protect transaction systems and data against cybersecurity threats and operational disruptions",
      },
      {
        icon: "building-bank",
        title: "Financial Institution Dependence",
        description:
          "Visa's ecosystem depends on relationships with issuing and acquiring financial institutions and other network participants",
      },
      {
        icon: "world",
        title: "International Exposure",
        description:
          "Visa operates globally and is exposed to foreign exchange movements, local regulations, economic conditions, and geopolitical factors",
      },
    ],
  },

  financial_overview: {
    insight:
      "Visa generated $40.0B of net revenue in fiscal 2025. GAAP net income was $20.1B and free cash flow was $21.6B.",

    metrics: [
      {
        icon: "report-money",
        label: "Revenue",
        value: { unit: "B", value: 40.0 },
        change: { value: 11.3 },
        sublabel: "FY25",
      },
      {
        icon: "coin",
        label: "Net Income",
        value: { unit: "B", value: 20.058 },
        change: { value: 1.6 },
        sublabel: "FY25",
      },
      {
        icon: "droplet",
        label: "Free Cash Flow",
        value: { unit: "B", value: 21.577 },
        change: { value: 15.4 },
        sublabel: "FY25",
      },
    ],

    fiscalYearLabel: "Fiscal year 2025 (ended September 30, 2025)",
  },

  financial_history: {
    panels: [
      {
        icon: "report-money",
        unit: "B",
        color: "#93c5fd",
        label: "Revenue",
        years: ["'21", "'22", "'23", "'24", "'25"],
        values: [24.105, 29.31, 32.653, 35.926, 40.0],
        changeNote: "+66% since FY21",
        highlightColor: "#1d4ed8",
        currentValueLabel: "$40.0B",
      },
      {
        icon: "coin",
        unit: "B",
        color: "#86efac",
        label: "Net Income",
        years: ["'21", "'22", "'23", "'24", "'25"],
        values: [12.311, 14.957, 17.273, 19.743, 20.058],
        changeNote: "+63% since FY21",
        highlightColor: "#15803d",
        currentValueLabel: "$20.1B",
      },
      {
        icon: "droplet",
        unit: "B",
        color: "#c4b5fd",
        label: "Free Cash Flow",
        years: ["'21", "'22", "'23", "'24", "'25"],
        values: [14.522, 17.879, 19.696, 18.693, 21.577],
        changeNote: "+49% since FY21",
        highlightColor: "#7c3aed",
        currentValueLabel: "$21.6B",
      },
    ],

    rangeLabel: "5-year trend, fiscal years 2021–2025",
  },

  ecosystem: {
    output: {
      icon: "network",
      name: "Payment Network",
      color: "#1A1F71",
      description:
        "Visa connects consumers, merchants, financial institutions, governments, and payment infrastructure through its global network",
      backgroundTint: "#EEF2FF",
    },

    insight:
      "Visa sits in the middle of a large payment ecosystem, providing the network infrastructure used to move payment information between participants.",

    partners: [
      {
        icon: "building-bank",
        name: "Financial Institutions",
        color: "#1A1F71",
        description:
          "Banks and other financial institutions issue Visa products and connect to the Visa payment network",
        backgroundTint: "#EEF2FF",
      },
      {
        icon: "building-store",
        name: "Merchants",
        color: "#2563EB",
        description:
          "Merchants accept Visa-enabled payments through acquiring institutions and payment acceptance infrastructure",
        backgroundTint: "#EFF6FF",
      },
      {
        icon: "users",
        name: "Consumers",
        color: "#7C3AED",
        description:
          "Consumers use Visa-enabled payment products to make purchases and other electronic payments",
        backgroundTint: "#F5F3FF",
      },
    ],

    centerLabel: "Visa",
    flowInLabel: "← Payment activity & network participants",
    flowOutLabel: "Payment processing →",
    centerSublabel: "The global payment network",
  },

  overview: {
    ceo: "Ryan McInerney",
    founded: "1958",
    revenue: { unit: "B", value: 40.0 },
    ceoSince: "2023",
    marketCap: { unit: "B", value: 672.36 },
    revenueYoY: { value: 11.3 },
    whatItDoes:
      "Visa operates a global payments technology network that facilitates electronic payments and transaction processing.",
    headquarters: "San Francisco, California",
    marketCapRank: "#21 in the world",
    revenueFiscalYear: "FY25",
  },

  business_segments_insight:
    "Visa reports one operating segment, Payment Services. For Scope's visualization, revenue is shown by the geographic markets disclosed by Visa: U.S. and International.",

  business_segments_footnote:
    "Fiscal year 2025 ended September 30, 2025. U.S. and International are geographic revenue categories, not separate operating segments.",

  competitors_context_note:
    "Companies that compete with Visa across payment networks, digital payments, and transaction processing. Market caps use an October 1, 2026 snapshot.",

  competitors_insight:
    "Visa competes with other payment networks and digital payment companies for transaction volume, financial institution relationships, merchant acceptance, and consumer payment activity.",
};

const visaSegments = [
  {
    name: "U.S.",
    amount_value: 15.633,
    amount_unit: "B",
    percentage: 39,
    yoy_change: 6,
    color: "#1A1F71",
    sort_order: 0,
  },
  {
    name: "International",
    amount_value: 24.367,
    amount_unit: "B",
    percentage: 61,
    yoy_change: 15,
    color: "#2563EB",
    sort_order: 1,
  },
];

const visaCompetitors = [
  {
    name: "Mastercard",
    icon: "credit-card",
    color: "#EB001B",
    background_tint: "#FEF2F2",
    tag_text_color: "#B91C1C",
    market_cap_value: 482.9,
    market_cap_unit: "B",
    relative_size: 72,
    tag: "Payment Network",
    relationship:
      "Direct payment-network competitor — Mastercard operates a global payments network serving consumers, merchants, and financial institutions",
    sort_order: 0,
  },
  {
    name: "American Express",
    icon: "credit-card",
    color: "#2563EB",
    background_tint: "#EFF6FF",
    tag_text_color: "#1D4ED8",
    market_cap_value: 204.0,
    market_cap_unit: "B",
    relative_size: 30,
    tag: "Payments & Financial Services",
    relationship:
      "Payments competitor — American Express operates a global payments network and financial services business",
    sort_order: 1,
  },
  {
    name: "PayPal",
    icon: "wallet",
    color: "#003087",
    background_tint: "#EFF6FF",
    tag_text_color: "#1D4ED8",
    market_cap_value: 45.39,
    market_cap_unit: "B",
    relative_size: 7,
    tag: "Digital Payments",
    relationship:
      "Digital payments competitor — PayPal provides digital payment and money movement services to consumers and businesses",
    sort_order: 2,
  },
  {
    name: "Capital One",
    icon: "building-bank",
    color: "#D71920",
    background_tint: "#FEF2F2",
    tag_text_color: "#B91C1C",
    market_cap_value: 119.31,
    market_cap_unit: "B",
    relative_size: 18,
    tag: "Payments & Financial Services",
    relationship:
      "Payments competitor — Capital One operates credit card and payment businesses and owns the Discover network following its 2025 acquisition of Discover Financial Services",
    sort_order: 3,
  },
];

const visaSeed: SeedCompany = {
  company: visaCompany,
  segments: visaSegments,
  competitors: visaCompetitors,
};
const mastercardCompany = {
  slug: "mastercard",
  name: "Mastercard Incorporated",
  brand_name: "Mastercard",
  ticker: "MA",
  exchange: "NYSE",
  industry: "Financial Services",
  logo_initial: "M",
  logo: "/logos/mastercard-svgrepo-com.svg",

  tagline:
    "Operates a global payments technology network that connects consumers, businesses, financial institutions, and governments.",

  what_it_does:
    "Mastercard operates a global payments technology network that enables electronic payments between consumers, merchants, financial institutions, businesses, governments, and other organizations. Mastercard authorizes, clears, and settles payment transactions through its network and also provides value-added services such as cybersecurity, fraud prevention, data analytics, and digital payment solutions.",

  founded: "1966",
  headquarters: "Purchase, New York",
  ceo: "Michael Miebach",
  ceo_since: "2021",

  scope_score: 9.0,
  scope_score_label: "Excellent",

  snapshot: [
    {
      icon: "shield-check",
      tone: "good",
      label: "Quality",
      rating: { kind: "stars", outOf: 5, value: 5 },
    },
    {
      icon: "shield-lock",
      tone: "good",
      label: "Moat",
      rating: { kind: "stars", outOf: 5, value: 5 },
    },
    {
      icon: "coin",
      tone: "good",
      label: "Profitability",
      rating: { kind: "stars", outOf: 4, value: 4 },
    },
    {
      icon: "trending-up",
      tone: "good",
      label: "Revenue growth",
      rating: { kind: "arrow", label: "Growing" },
    },
    {
      icon: "alert-triangle",
      tone: "risk",
      label: "Risk",
      rating: { kind: "badge", label: "Medium" },
    },
    {
      icon: "scale",
      tone: "neutral",
      label: "Valuation",
      rating: { kind: "badge", label: "Moderate" },
    },
  ],

  thirty_second_summary: {
    subtitle: "A plain-English explanation of Mastercard's business model",
    content:
      "Mastercard makes money by operating a global payments network that connects financial institutions, merchants, businesses, governments, and consumers. Mastercard earns revenue from payment network activity and from value-added services such as cybersecurity, fraud prevention, data analytics, digital authentication, and other payment solutions.",
  },

  business_model: {
    stages: [
      {
        icon: "credit-card",
        tags: [
          { icon: "credit-card", label: "Digital Payments" },
          { icon: "building-bank", label: "Banks & Financial Institutions" },
          { icon: "building-store", label: "Merchants" },
          { icon: "users", label: "Consumers" },
        ],
        color: "#EB001B",
        title: "Connect Payment Participants",
        tagTextColor: "#B91C1C",
        backgroundTint: "#FEF2F2",
      },
      {
        icon: "network",
        tags: [
          { icon: "network", label: "Mastercard Network" },
          { icon: "shield-check", label: "Authorization" },
          { icon: "arrows-exchange", label: "Clearing & Settlement" },
          { icon: "world", label: "Global Network" },
        ],
        color: "#2563EB",
        title: "Process Transactions",
        tagTextColor: "#1D4ED8",
        backgroundTint: "#EFF6FF",
      },
      {
        icon: "coin",
        tags: [
          { icon: "chart-line", label: "Payment Volume" },
          { icon: "database", label: "Data Processing" },
          { icon: "shield-lock", label: "Security Services" },
          { icon: "briefcase", label: "Value-Added Services" },
        ],
        color: "#7C3AED",
        title: "Earn From Payment Activity",
        tagTextColor: "#6D28D9",
        backgroundTint: "#F5F3FF",
      },
    ],

    insight:
      "Mastercard operates a global payments network rather than acting as a traditional bank. Its network connects payment participants and processes transactions, while its services business adds security, data, fraud prevention, and other solutions around payment activity.",

    repeatNote:
      "Mastercard primarily earns revenue from its payment network and from value-added services and solutions, including security, data analytics, digital authentication, processing, and other payment-related services.",
  },

  strengths_and_risks: {
    strengths: [
      {
        icon: "world",
        title: "Global Payment Network",
        description:
          "Mastercard operates a global payments network connecting consumers, merchants, financial institutions, businesses, governments, and digital partners",
      },
      {
        icon: "arrows-exchange",
        title: "Large Transaction Network",
        description:
          "Mastercard processed more than 175 billion transactions during 2025",
      },
      {
        icon: "shield-check",
        title: "Payment Infrastructure",
        description:
          "Mastercard provides authorization, clearing, and settlement through its proprietary global payments network",
      },
      {
        icon: "shield-lock",
        title: "Security & Data Services",
        description:
          "Mastercard provides cybersecurity, fraud prevention, digital authentication, data analytics, and related services",
      },
      {
        icon: "chart-line",
        title: "Multiple Revenue Streams",
        description:
          "Mastercard generates revenue from payment network activity as well as value-added services and solutions",
      },
    ],

    risks: [
      {
        icon: "swords",
        title: "Payment Competition",
        description:
          "Mastercard competes with other payment networks, digital payment platforms, alternative payment methods, and technology providers",
      },
      {
        icon: "scale",
        title: "Regulatory Exposure",
        description:
          "Mastercard operates in a highly regulated payments industry and faces competition, payments regulation, and legal requirements across multiple markets",
      },
      {
        icon: "shield-x",
        title: "Cybersecurity Risk",
        description:
          "A global payment network must protect transaction systems, data, and infrastructure against cybersecurity threats and operational disruptions",
      },
      {
        icon: "building-bank",
        title: "Financial Institution Dependence",
        description:
          "Mastercard's network depends on relationships with issuing and acquiring financial institutions and other ecosystem participants",
      },
      {
        icon: "world",
        title: "Global Exposure",
        description:
          "Mastercard operates internationally and is exposed to foreign exchange movements, local regulations, economic conditions, and geopolitical factors",
      },
    ],
  },

  financial_overview: {
    insight:
      "Mastercard generated $32.8B of net revenue in fiscal 2025. GAAP net income was $15.0B and free cash flow was $17.2B.",

    metrics: [
      {
        icon: "report-money",
        label: "Revenue",
        value: { unit: "B", value: 32.791 },
        change: { value: 16.4 },
        sublabel: "FY25",
      },
      {
        icon: "coin",
        label: "Net Income",
        value: { unit: "B", value: 14.968 },
        change: { value: 16.3 },
        sublabel: "FY25",
      },
      {
        icon: "droplet",
        label: "Free Cash Flow",
        value: { unit: "B", value: 17.159 },
        change: { value: 19.9 },
        sublabel: "FY25",
      },
    ],

    fiscalYearLabel: "Fiscal year 2025 (ended December 31, 2025)",
  },

  financial_history: {
    panels: [
      {
        icon: "report-money",
        unit: "B",
        color: "#93c5fd",
        label: "Revenue",
        years: ["'21", "'22", "'23", "'24", "'25"],
        values: [18.884, 22.237, 25.098, 28.167, 32.791],
        changeNote: "+74% since FY21",
        highlightColor: "#1d4ed8",
        currentValueLabel: "$32.8B",
      },
      {
        icon: "coin",
        unit: "B",
        color: "#86efac",
        label: "Net Income",
        years: ["'21", "'22", "'23", "'24", "'25"],
        values: [8.687, 9.93, 11.195, 12.874, 14.968],
        changeNote: "+72% since FY21",
        highlightColor: "#15803d",
        currentValueLabel: "$15.0B",
      },
      {
        icon: "droplet",
        unit: "B",
        color: "#c4b5fd",
        label: "Free Cash Flow",
        years: ["'21", "'22", "'23", "'24", "'25"],
        values: [9.056, 10.753, 11.609, 14.306, 17.159],
        changeNote: "+89% since FY21",
        highlightColor: "#7c3aed",
        currentValueLabel: "$17.2B",
      },
    ],

    rangeLabel: "5-year trend, fiscal years 2021–2025",
  },

  ecosystem: {
    output: {
      icon: "network",
      name: "Payment Network",
      color: "#EB001B",
      description:
        "Mastercard connects consumers, merchants, financial institutions, governments, businesses, and digital partners through its global payment network",
      backgroundTint: "#FEF2F2",
    },

    insight:
      "Mastercard sits in the middle of a global payment ecosystem, providing network infrastructure that enables payment transactions between financial institutions, merchants, consumers, businesses, governments, and other participants.",

    partners: [
      {
        icon: "building-bank",
        name: "Financial Institutions",
        color: "#EB001B",
        description:
          "Banks and other financial institutions issue Mastercard products and connect to the Mastercard payment network",
        backgroundTint: "#FEF2F2",
      },
      {
        icon: "building-store",
        name: "Merchants",
        color: "#2563EB",
        description:
          "Merchants accept Mastercard-enabled payments through acquiring institutions and payment acceptance infrastructure",
        backgroundTint: "#EFF6FF",
      },
      {
        icon: "users",
        name: "Consumers",
        color: "#7C3AED",
        description:
          "Consumers use Mastercard-enabled payment products to make purchases and other electronic payments",
        backgroundTint: "#F5F3FF",
      },
    ],

    centerLabel: "Mastercard",
    flowInLabel: "← Payment activity & network participants",
    flowOutLabel: "Payment processing →",
    centerSublabel: "The global payment network",
  },

  overview: {
    ceo: "Michael Miebach",
    founded: "1966",
    revenue: { unit: "B", value: 32.791 },
    ceoSince: "2021",
    marketCap: { unit: "B", value: 481.81 },
    revenueYoY: { value: 16.4 },
    whatItDoes:
      "Mastercard operates a global payments technology network that enables electronic payments and transaction processing.",
    headquarters: "Purchase, New York",
    marketCapRank: "#27 in the world",
    revenueFiscalYear: "FY25",
  },

  business_segments_insight:
    "Mastercard operates as a single global payments business. For Scope's visualization, revenue is shown by the geographic regions disclosed by Mastercard: Americas and Asia Pacific, Europe, Middle East and Africa.",

  business_segments_footnote:
    "Fiscal year 2025 ended December 31, 2025. Americas and Asia Pacific, Europe, Middle East and Africa are geographic revenue categories, not separate operating segments.",

  competitors_context_note:
    "Companies that compete with Mastercard across payment networks, digital payments, and transaction processing. Market caps use an October 1, 2026 snapshot.",

  competitors_insight:
    "Mastercard competes with other payment networks and digital payment companies for transaction volume, financial institution relationships, merchant acceptance, and consumer payment activity.",
};

const mastercardSegments = [
  {
    name: "Americas",
    amount_value: 14.044,
    amount_unit: "B",
    percentage: 43,
    yoy_change: 13,
    color: "#EB001B",
    sort_order: 0,
  },
  {
    name: "APMEA",
    amount_value: 18.747,
    amount_unit: "B",
    percentage: 57,
    yoy_change: 19,
    color: "#2563EB",
    sort_order: 1,
  },
];

const mastercardCompetitors = [
  {
    name: "Visa",
    icon: "credit-card",
    color: "#1A1F71",
    background_tint: "#EEF2FF",
    tag_text_color: "#1D4ED8",
    market_cap_value: 660.54,
    market_cap_unit: "B",
    relative_size: 100,
    tag: "Payment Network",
    relationship:
      "Direct payment-network competitor — Visa operates a global payments technology network connecting consumers, merchants, and financial institutions",
    sort_order: 0,
  },
  {
    name: "American Express",
    icon: "credit-card",
    color: "#2563EB",
    background_tint: "#EFF6FF",
    tag_text_color: "#1D4ED8",
    market_cap_value: 204.0,
    market_cap_unit: "B",
    relative_size: 31,
    tag: "Payments & Financial Services",
    relationship:
      "Payments competitor — American Express operates a global payments network and financial services business",
    sort_order: 1,
  },
  {
    name: "PayPal",
    icon: "wallet",
    color: "#003087",
    background_tint: "#EFF6FF",
    tag_text_color: "#1D4ED8",
    market_cap_value: 45.39,
    market_cap_unit: "B",
    relative_size: 7,
    tag: "Digital Payments",
    relationship:
      "Digital payments competitor — PayPal provides digital payment and money movement services to consumers and businesses",
    sort_order: 2,
  },
  {
    name: "Block",
    icon: "square",
    color: "#111827",
    background_tint: "#F3F4F6",
    tag_text_color: "#374151",
    market_cap_value: 44.76,
    market_cap_unit: "B",
    relative_size: 7,
    tag: "Digital Payments",
    relationship:
      "Digital payments competitor — Block provides payment and financial technology products for businesses and consumers",
    sort_order: 3,
  },
];

const mastercardSeed: SeedCompany = {
  company: mastercardCompany,
  segments: mastercardSegments,
  competitors: mastercardCompetitors,
};
const paypalCompany = {
  slug: "paypal",
  name: "PayPal Holdings, Inc.",
  brand_name: "PayPal",
  ticker: "PYPL",
  exchange: "NASDAQ",
  industry: "Financial Services",
  logo_initial: "P",
  logo: "/logos/paypal-color-svgrepo-com.svg",

  tagline:
    "Operates a global digital payments platform that connects consumers and businesses for payments, money movement, and commerce.",

  what_it_does:
    "PayPal operates a global two-sided digital payments platform that connects consumers and merchants. Its products include PayPal, Venmo, Braintree, Xoom, PayPal Pay Later, and other payment and commerce services that help people pay, send and receive money, and help businesses accept payments and manage commerce.",

  founded: "1998",
  headquarters: "San Jose, California",
  ceo: "Enrique Lores",
  ceo_since: "2026",

  scope_score: 8.5,
  scope_score_label: "Strong",

  snapshot: [
    {
      icon: "shield-check",
      tone: "good",
      label: "Quality",
      rating: { kind: "stars", outOf: 5, value: 4 },
    },
    {
      icon: "network",
      tone: "good",
      label: "Network",
      rating: { kind: "stars", outOf: 5, value: 5 },
    },
    {
      icon: "coin",
      tone: "good",
      label: "Profitability",
      rating: { kind: "stars", outOf: 4, value: 4 },
    },
    {
      icon: "trending-up",
      tone: "good",
      label: "Revenue growth",
      rating: { kind: "arrow", label: "Growing" },
    },
    {
      icon: "alert-triangle",
      tone: "risk",
      label: "Risk",
      rating: { kind: "badge", label: "Medium" },
    },
    {
      icon: "scale",
      tone: "neutral",
      label: "Valuation",
      rating: { kind: "badge", label: "Moderate" },
    },
  ],

  thirty_second_summary: {
    subtitle: "A plain-English explanation of PayPal's business model",
    content:
      "PayPal makes money by processing digital payments between consumers and businesses. It earns transaction revenue from payment activity and also generates revenue from services such as partnerships, subscriptions, gateway services, currency conversion, consumer and merchant credit, and other value-added services.",
  },

  business_model: {
    stages: [
      {
        icon: "users",
        tags: [
          { icon: "users", label: "Consumers" },
          { icon: "building-store", label: "Merchants" },
          { icon: "wallet", label: "Digital Wallets" },
          { icon: "credit-card", label: "Digital Payments" },
        ],
        color: "#0070BA",
        title: "Connect Consumers & Merchants",
        tagTextColor: "#0369A1",
        backgroundTint: "#EFF6FF",
      },
      {
        icon: "network",
        tags: [
          { icon: "network", label: "PayPal Network" },
          { icon: "arrows-exchange", label: "Payment Processing" },
          { icon: "shield-check", label: "Risk Management" },
          { icon: "world", label: "Global Platform" },
        ],
        color: "#2563EB",
        title: "Process Digital Payments",
        tagTextColor: "#1D4ED8",
        backgroundTint: "#EFF6FF",
      },
      {
        icon: "coin",
        tags: [
          { icon: "credit-card", label: "Transaction Fees" },
          { icon: "briefcase", label: "Merchant Services" },
          { icon: "shield-lock", label: "Risk Tools" },
          { icon: "chart-line", label: "Value-Added Services" },
        ],
        color: "#7C3AED",
        title: "Earn From Payment Activity",
        tagTextColor: "#6D28D9",
        backgroundTint: "#F5F3FF",
      },
    ],

    insight:
      "PayPal operates a two-sided digital payments platform connecting consumers and merchants. It processes payment activity through PayPal, Venmo, Braintree and other products, while also providing additional commerce, risk, credit, and value-added services.",

    repeatNote:
      "PayPal primarily earns revenue from transaction activity on its payments platform and from value-added services, including partnerships, gateway services, subscriptions, currency conversion, and consumer and merchant credit products.",
  },

  strengths_and_risks: {
    strengths: [
      {
        icon: "world",
        title: "Global Payments Platform",
        description:
          "PayPal operates a global two-sided network connecting consumers and merchants across approximately 200 markets.",
      },
      {
        icon: "users",
        title: "Large User Network",
        description:
          "PayPal had 439 million active accounts at the end of 2025.",
      },
      {
        icon: "arrows-exchange",
        title: "Large Payment Volume",
        description:
          "PayPal processed approximately $1.79 trillion of total payment volume during 2025.",
      },
      {
        icon: "wallet",
        title: "Multiple Payment Products",
        description:
          "The platform includes PayPal, Venmo, Braintree, Xoom, PayPal Pay Later and other payment and commerce services.",
      },
      {
        icon: "briefcase",
        title: "Multiple Revenue Streams",
        description:
          "PayPal generates transaction revenue as well as revenue from value-added services, partnerships, gateway services, subscriptions, and credit products.",
      },
    ],

    risks: [
      {
        icon: "swords",
        title: "Payment Competition",
        description:
          "PayPal competes with payment networks, digital wallets, payment processors, banks, technology companies, and other digital payment platforms.",
      },
      {
        icon: "scale",
        title: "Regulatory Exposure",
        description:
          "PayPal operates across many markets and is subject to financial services, payments, consumer protection, privacy, and other regulations.",
      },
      {
        icon: "shield-x",
        title: "Cybersecurity Risk",
        description:
          "PayPal relies on technology infrastructure and sensitive financial and personal data that must be protected against security threats and operational disruptions.",
      },
      {
        icon: "building-store",
        title: "Merchant Dependence",
        description:
          "The platform depends on maintaining relationships with merchants, payment partners, financial institutions, and other ecosystem participants.",
      },
      {
        icon: "world",
        title: "Global Exposure",
        description:
          "PayPal operates internationally and is exposed to foreign exchange movements, local regulations, economic conditions, and geopolitical risks.",
      },
    ],
  },

  financial_overview: {
    insight:
      "PayPal generated $33.2B of net revenue in fiscal 2025. GAAP net income was $5.2B and free cash flow was $5.6B.",

    metrics: [
      {
        icon: "report-money",
        label: "Revenue",
        value: { unit: "B", value: 33.172 },
        change: { value: 4.3 },
        sublabel: "FY25",
      },
      {
        icon: "coin",
        label: "Net Income",
        value: { unit: "B", value: 5.233 },
        change: { value: 26.2 },
        sublabel: "FY25",
      },
      {
        icon: "droplet",
        label: "Free Cash Flow",
        value: { unit: "B", value: 5.564 },
        change: { value: -17.8 },
        sublabel: "FY25",
      },
    ],

    fiscalYearLabel: "Fiscal year 2025 (ended December 31, 2025)",
  },

  financial_history: {
    panels: [
      {
        icon: "report-money",
        unit: "B",
        color: "#93c5fd",
        label: "Revenue",
        years: ["'21", "'22", "'23", "'24", "'25"],
        values: [25.371, 27.518, 29.771, 31.797, 33.172],
        changeNote: "+31% since FY21",
        highlightColor: "#1d4ed8",
        currentValueLabel: "$33.2B",
      },
      {
        icon: "coin",
        unit: "B",
        color: "#86efac",
        label: "Net Income",
        years: ["'21", "'22", "'23", "'24", "'25"],
        values: [4.169, 2.419, 4.246, 4.147, 5.233],
        changeNote: "+26% since FY21",
        highlightColor: "#15803d",
        currentValueLabel: "$5.2B",
      },
      {
        icon: "droplet",
        unit: "B",
        color: "#c4b5fd",
        label: "Free Cash Flow",
        years: ["'21", "'22", "'23", "'24", "'25"],
        values: [4.889, 5.107, 4.220, 6.767, 5.564],
        changeNote: "+14% since FY21",
        highlightColor: "#7c3aed",
        currentValueLabel: "$5.6B",
      },
    ],

    rangeLabel: "5-year trend, fiscal years 2021–2025",
  },

  ecosystem: {
    output: {
      icon: "network",
      name: "Digital Payments Platform",
      color: "#0070BA",
      description:
        "PayPal connects consumers, merchants, financial institutions, and technology partners through its digital payments and commerce platform.",
      backgroundTint: "#EFF6FF",
    },

    insight:
      "PayPal sits between consumers and merchants, providing digital payment infrastructure, wallets, payment processing, risk tools, credit products, and other commerce services.",

    partners: [
      {
        icon: "building-store",
        name: "Merchants",
        color: "#0070BA",
        description:
          "Businesses use PayPal and its payment processing products to accept digital payments and support commerce.",
        backgroundTint: "#EFF6FF",
      },
      {
        icon: "users",
        name: "Consumers",
        color: "#7C3AED",
        description:
          "Consumers use PayPal and Venmo to pay, send and receive money, manage payment methods, and access related financial services.",
        backgroundTint: "#F5F3FF",
      },
      {
        icon: "building-bank",
        name: "Financial Institutions",
        color: "#2563EB",
        description:
          "Banks and financial institutions participate in the payment ecosystem through funding sources, payment processing, and other financial relationships.",
        backgroundTint: "#EFF6FF",
      },
    ],

    centerLabel: "PayPal",
    flowInLabel: "← Consumers & merchants",
    flowOutLabel: "Digital payments →",
    centerSublabel: "Global digital payments platform",
  },

  overview: {
    ceo: "Enrique Lores",
    founded: "1998",
    revenue: { unit: "B", value: 33.172 },
    ceoSince: "2026",
    marketCap: { unit: "B", value: 45.39 },
    revenueYoY: { value: 4.3 },
    whatItDoes:
      "PayPal operates a global digital payments platform connecting consumers and businesses.",
    headquarters: "San Jose, California",
    marketCapRank: "#360 in the world",
    revenueFiscalYear: "FY25",
  },

  business_segments_insight:
    "PayPal does not disclose revenue amounts for its current three-business operating model in the FY2025 financial statements. For Scope's visualization, revenue is shown using the geographic categories disclosed by PayPal: U.S. and Other Countries.",

  business_segments_footnote:
    "Fiscal year 2025 ended December 31, 2025. U.S. and Other Countries are geographic revenue categories, not separate operating segments. PayPal announced a three-business operating model in April 2026.",

  competitors_context_note:
    "Companies that compete with PayPal across digital payments, payment networks, merchant services, and financial technology. Market caps use an October 1, 2026 snapshot.",

  competitors_insight:
    "PayPal competes across digital payments, merchant checkout, payment processing, digital wallets, and related financial services.", 
};

const paypalSegments = [
  {
    name: "U.S.",
    amount_value: 18.868,
    amount_unit: "B",
    percentage: 57,
    yoy_change: 3,
    color: "#0070BA",
    sort_order: 0,
  },
  {
    name: "Other Countries",
    amount_value: 14.304,
    amount_unit: "B",
    percentage: 43,
    yoy_change: 6,
    color: "#2563EB",
    sort_order: 1,
  },
];

const paypalCompetitors = [
  {
    name: "Visa",
    icon: "credit-card",
    color: "#1A1F71",
    background_tint: "#EEF2FF",
    tag_text_color: "#1D4ED8",
    market_cap_value: 660.54,
    market_cap_unit: "B",
    relative_size: 100,
    tag: "Payment Network",
    relationship:
      "Payments competitor — Visa operates a global payments technology network connecting consumers, merchants, and financial institutions.",
    sort_order: 0,
  },
  {
    name: "Mastercard",
    icon: "credit-card",
    color: "#EB001B",
    background_tint: "#FEF2F2",
    tag_text_color: "#B91C1C",
    market_cap_value: 481.81,
    market_cap_unit: "B",
    relative_size: 73,
    tag: "Payment Network",
    relationship:
      "Payments competitor — Mastercard operates a global payments technology network connecting consumers, merchants, and financial institutions.",
    sort_order: 1,
  },
  {
    name: "American Express",
    icon: "credit-card",
    color: "#2563EB",
    background_tint: "#EFF6FF",
    tag_text_color: "#1D4ED8",
    market_cap_value: 204.0,
    market_cap_unit: "B",
    relative_size: 31,
    tag: "Payments & Financial Services",
    relationship:
      "Payments competitor — American Express operates a global payments network and financial services business.",
    sort_order: 2,
  },
  {
    name: "Block",
    icon: "square",
    color: "#111827",
    background_tint: "#F3F4F6",
    tag_text_color: "#374151",
    market_cap_value: 44.76,
    market_cap_unit: "B",
    relative_size: 7,
    tag: "Digital Payments",
    relationship:
      "Digital payments competitor — Block provides payment and financial technology products for businesses and consumers.",
    sort_order: 3,
  },
];

const paypalSeed: SeedCompany = {
  company: paypalCompany,
  segments: paypalSegments,
  competitors: paypalCompetitors,
};
const jpmorganCompany = {
  slug: "jpmorgan-chase",
  name: "JPMorgan Chase & Co.",
  brand_name: "JPMorgan Chase",
  ticker: "JPM",
  exchange: "NYSE",
  industry: "Financial Services",
  revenue_basis: "managed",
  logo_initial: "J",
  logo: "/logos/jpmorgan-1.svg",

  tagline:
    "Operates a global financial services firm serving consumers, businesses, governments, and institutional clients.",

  what_it_does:
    "JPMorgan Chase operates a global financial services business that provides consumer banking, commercial banking, investment banking, payments, asset management, wealth management, lending, and other financial services to individuals, businesses, governments, and institutional clients.",

  founded: "1799",
  headquarters: "New York City",
  ceo: "Jamie Dimon",
  ceo_since: "2005",

  scope_score: 9.0,
  scope_score_label: "Excellent",

  snapshot: [
    {
      icon: "shield-check",
      tone: "good",
      label: "Quality",
      rating: { kind: "stars", outOf: 5, value: 5 },
    },
    {
      icon: "building-bank",
      tone: "good",
      label: "Scale",
      rating: { kind: "stars", outOf: 5, value: 5 },
    },
    {
      icon: "coin",
      tone: "good",
      label: "Profitability",
      rating: { kind: "stars", outOf: 4, value: 4 },
    },
    {
      icon: "trending-up",
      tone: "good",
      label: "Revenue growth",
      rating: { kind: "arrow", label: "Growing" },
    },
    {
      icon: "alert-triangle",
      tone: "risk",
      label: "Risk",
      rating: { kind: "badge", label: "Medium" },
    },
    {
      icon: "scale",
      tone: "neutral",
      label: "Valuation",
      rating: { kind: "badge", label: "Moderate" },
    },
  ],

  thirty_second_summary: {
    subtitle: "A plain-English explanation of JPMorgan Chase's business model",
    content:
      "JPMorgan Chase makes money by providing banking and financial services to consumers, businesses, governments, and institutional clients. Its businesses generate revenue from interest on loans, fees from payments and investment banking, asset and wealth management fees, trading, and other financial services.",
  },

  business_model: {
    stages: [
      {
        icon: "building-bank",
        tags: [
          { icon: "users", label: "Consumers" },
          { icon: "building-store", label: "Businesses" },
          { icon: "building-bank", label: "Financial Institutions" },
          { icon: "world", label: "Governments" },
        ],
        color: "#126BC5",
        title: "Serve Financial Clients",
        tagTextColor: "#1D4ED8",
        backgroundTint: "#EFF6FF",
      },
      {
        icon: "arrows-exchange",
        tags: [
          { icon: "coin", label: "Lending" },
          { icon: "credit-card", label: "Payments" },
          { icon: "chart-line", label: "Markets" },
          { icon: "briefcase", label: "Investment Banking" },
        ],
        color: "#2563EB",
        title: "Provide Financial Services",
        tagTextColor: "#1D4ED8",
        backgroundTint: "#EFF6FF",
      },
      {
        icon: "coin",
        tags: [
          { icon: "coin", label: "Interest Income" },
          { icon: "briefcase", label: "Fees" },
          { icon: "chart-line", label: "Trading" },
          { icon: "database", label: "Asset Management" },
        ],
        color: "#7C3AED",
        title: "Earn From Financial Activity",
        tagTextColor: "#6D28D9",
        backgroundTint: "#F5F3FF",
      },
    ],

    insight:
      "JPMorgan Chase operates a diversified financial services model rather than relying on one source of revenue. Its businesses combine lending and deposit activity with payments, investment banking, markets, asset management, and wealth management.",

    repeatNote:
      "JPMorgan Chase generates revenue from net interest income and from noninterest businesses such as payments, investment banking, markets, asset management, wealth management, and other financial services.",
  },

  strengths_and_risks: {
    strengths: [
      {
        icon: "world",
        title: "Global Financial Platform",
        description:
          "JPMorgan Chase serves consumers, businesses, governments, and institutional clients across more than 100 global markets.",
      },
      {
        icon: "building-bank",
        title: "Diversified Banking Businesses",
        description:
          "The company operates Consumer & Community Banking, Commercial & Investment Bank, and Asset & Wealth Management businesses.",
      },
      {
        icon: "arrows-exchange",
        title: "Large Payments Network",
        description:
          "JPMorgan Chase operates large-scale payment and transaction-processing businesses for consumers, merchants, corporations, and institutions.",
      },
      {
        icon: "briefcase",
        title: "Investment Banking Platform",
        description:
          "The Commercial & Investment Bank provides investment banking, markets, commercial banking, and payments services to institutional and business clients.",
      },
      {
        icon: "database",
        title: "Asset & Wealth Management",
        description:
          "JPMorgan Chase provides asset management, private banking, and wealth management services to individuals and institutions.",
      },
    ],

    risks: [
      {
        icon: "scale",
        title: "Banking Regulation",
        description:
          "JPMorgan Chase operates under extensive banking, capital, liquidity, consumer protection, and financial-market regulation.",
      },
      {
        icon: "alert-triangle",
        title: "Credit Risk",
        description:
          "Lending activities expose JPMorgan Chase to potential losses when borrowers or counterparties cannot meet their financial obligations.",
      },
      {
        icon: "chart-line",
        title: "Market Risk",
        description:
          "Trading and investment activities expose the firm to changes in interest rates, equity markets, credit markets, currencies, and other financial variables.",
      },
      {
        icon: "shield-x",
        title: "Cybersecurity & Operational Risk",
        description:
          "A global financial institution depends on resilient technology, data, cybersecurity, and operational systems.",
      },
      {
        icon: "world",
        title: "Global Exposure",
        description:
          "JPMorgan Chase operates internationally and is exposed to economic conditions, regulation, currencies, and geopolitical developments across multiple markets.",
      },
    ],
  },

  financial_overview: {
    insight:
      "JPMorgan Chase generated $182.4B of total net revenue in fiscal 2025 and $57.0B of net income.",

    metrics: [
      {
        icon: "report-money",
        label: "Revenue",
        value: { unit: "B", value: 182.447 },
        change: { value: 2.8 },
        sublabel: "FY25",
      },
      {
        icon: "coin",
        label: "Net Income",
        value: { unit: "B", value: 57.048 },
        change: { value: -2.4 },
        sublabel: "FY25",
      },
      {
        icon: "droplet",
        label: "Free Cash Flow",
        value: { unit: "B", value: -147.782 },
        change: { value: -251.8 },
        sublabel: "FY25",
      },
    ],

    fiscalYearLabel: "Fiscal year 2025 (ended December 31, 2025)",
  },

  financial_history: {
    panels: [
      {
        icon: "report-money",
        unit: "B",
        color: "#93c5fd",
        label: "Revenue",
        years: ["'21", "'22", "'23", "'24", "'25"],
        values: [121.649, 128.695, 158.104, 177.556, 182.447],
        changeNote: "+50% since FY21",
        highlightColor: "#1d4ed8",
        currentValueLabel: "$182.4B",
      },
      {
        icon: "coin",
        unit: "B",
        color: "#86efac",
        label: "Net Income",
        years: ["'21", "'22", "'23", "'24", "'25"],
        values: [48.334, 37.676, 49.552, 58.471, 57.048],
        changeNote: "+18% since FY21",
        highlightColor: "#15803d",
        currentValueLabel: "$57.0B",
      },
      {
        icon: "droplet",
        unit: "B",
        color: "#c4b5fd",
        label: "Free Cash Flow",
        years: ["'21", "'22", "'23", "'24", "'25"],
        values: [78.084, 107.119, 12.974, -42.012, -147.782],
        changeNote: "Not a primary bank metric",
        highlightColor: "#7c3aed",
        currentValueLabel: "-$147.8B",
      },
    ],

    rangeLabel: "5-year trend, fiscal years 2021–2025",
  },

  ecosystem: {
    output: {
      icon: "building-bank",
      name: "Financial Services Platform",
      color: "#126BC5",
      description:
        "JPMorgan Chase connects consumers, businesses, governments, and institutional clients with banking, payments, lending, markets, and wealth management services.",
      backgroundTint: "#EFF6FF",
    },

    insight:
      "JPMorgan Chase sits across multiple parts of the financial system, providing banking, payments, lending, capital markets, investment banking, asset management, and wealth management services.",

    partners: [
      {
        icon: "users",
        name: "Consumers",
        color: "#126BC5",
        description:
          "Consumers use Chase for deposits, credit cards, mortgages, lending, payments, and other financial services.",
        backgroundTint: "#EFF6FF",
      },
      {
        icon: "building-store",
        name: "Businesses",
        color: "#2563EB",
        description:
          "Businesses use JPMorgan Chase for commercial banking, payments, lending, treasury services, and investment banking.",
        backgroundTint: "#EFF6FF",
      },
      {
        icon: "building-bank",
        name: "Institutions & Governments",
        color: "#7C3AED",
        description:
          "Institutional and government clients use JPMorgan Chase for markets, custody, payments, financing, investment banking, and asset management services.",
        backgroundTint: "#F5F3FF",
      },
    ],

    centerLabel: "JPMorgan Chase",
    flowInLabel: "← Financial clients & capital",
    flowOutLabel: "Financial services →",
    centerSublabel: "Global financial services platform",
  },

  overview: {
    ceo: "Jamie Dimon",
    founded: "1799",
    revenue: { unit: "B", value: 182.447 },
    ceoSince: "2005",
    marketCap: { unit: "B", value: 882.63 },
    revenueYoY: { value: 2.8 },
    whatItDoes:
      "JPMorgan Chase operates a global financial services business serving consumers, businesses, governments, and institutional clients.",
    headquarters: "New York City",
    marketCapRank: "#18 in the world",
    revenueFiscalYear: "FY25",
  },

  business_segments_insight:
    "JPMorgan Chase reports three primary business segments: Consumer & Community Banking, Commercial & Investment Bank, and Asset & Wealth Management. The visualization also includes Corporate so the displayed managed-basis revenue reconciles to the firmwide managed revenue.",

  business_segments_footnote:
    "Fiscal year 2025 ended December 31, 2025. Consumer & Community Banking, Commercial & Investment Bank, and Asset & Wealth Management are JPMorgan Chase's primary business segments. Corporate is shown separately in the visualization.",

  competitors_context_note:
    "Companies that compete with JPMorgan Chase across consumer banking, commercial banking, investment banking, markets, payments, and wealth management. Market caps use an October 2026 snapshot.",

  competitors_insight:
    "JPMorgan Chase competes with large diversified banks and financial institutions across consumer banking, commercial banking, investment banking, markets, payments, and wealth management.",
};

const jpmorganSegments = [
  {
    name: "Consumer & Community Banking",
    amount_value: 76.029,
    amount_unit: "B",
    percentage: 41,
    yoy_change: 6,
    color: "#126BC5",
    sort_order: 0,
  },
  {
    name: "Commercial & Investment Bank",
    amount_value: 78.454,
    amount_unit: "B",
    percentage: 42,
    yoy_change: 12,
    color: "#2563EB",
    sort_order: 1,
  },
  {
    name: "Asset & Wealth Management",
    amount_value: 24.073,
    amount_unit: "B",
    percentage: 13,
    yoy_change: 12,
    color: "#7C3AED",
    sort_order: 2,
  },
  {
    name: "Corporate",
    amount_value: 7.025,
    amount_unit: "B",
    percentage: 4,
    yoy_change: -60,
    color: "#6B7280",
    sort_order: 3,
  },
];

const jpmorganCompetitors = [
  {
    name: "Bank of America",
    icon: "building-bank",
    color: "#E31837",
    background_tint: "#FEF2F2",
    tag_text_color: "#B91C1C",
    market_cap_value: 375.72,
    market_cap_unit: "B",
    relative_size: 42,
    tag: "Diversified Bank",
    relationship:
      "Direct banking competitor — Bank of America provides consumer, commercial, investment banking, and wealth management services.",
    sort_order: 0,
  },
  {
    name: "Morgan Stanley",
    icon: "chart-line",
    color: "#1D4ED8",
    background_tint: "#EFF6FF",
    tag_text_color: "#1D4ED8",
    market_cap_value: 295.28,
    market_cap_unit: "B",
    relative_size: 33,
    tag: "Investment & Wealth Management",
    relationship:
      "Financial services competitor — Morgan Stanley competes with JPMorgan Chase across investment banking, markets, and wealth management.",
    sort_order: 1,
  },
  {
    name: "Wells Fargo",
    icon: "building-bank",
    color: "#D71E28",
    background_tint: "#FEF2F2",
    tag_text_color: "#B91C1C",
    market_cap_value: 242.67,
    market_cap_unit: "B",
    relative_size: 27,
    tag: "Diversified Bank",
    relationship:
      "Banking competitor — Wells Fargo provides consumer, commercial, lending, payments, and wealth management services.",
    sort_order: 2,
  },
  {
    name: "Goldman Sachs",
    icon: "chart-line",
    color: "#1F4E79",
    background_tint: "#EFF6FF",
    tag_text_color: "#1D4ED8",
    market_cap_value: 262.15,
    market_cap_unit: "B",
    relative_size: 30,
    tag: "Investment Banking",
    relationship:
      "Financial services competitor — Goldman Sachs competes with JPMorgan Chase in investment banking, markets, asset management, and related institutional services.",
    sort_order: 3,
  },
];

const jpmorganSeed: SeedCompany = {
  company: jpmorganCompany,
  segments: jpmorganSegments,
  competitors: jpmorganCompetitors,
};
const cocaColaCompany = {
  slug: "coca-cola",
  name: "The Coca-Cola Company",
  brand_name: "Coca-Cola",
  ticker: "KO",
  exchange: "NYSE",
  industry: "Consumer Defensive",
  revenue_basis: "segment",
  logo_initial: "C",
  logo: "/logos/coca-cola-2021.svg",

  tagline:
    "Operates a global beverage company with a portfolio of sparkling soft drinks, water, sports, coffee, tea, juice, dairy, and emerging beverage brands.",

  what_it_does:
    "The Coca-Cola Company develops, markets, and sells a broad portfolio of beverages through a global network of bottling partners, distributors, wholesalers, retailers, and its own bottling operations.",

  founded: "1886",
  headquarters: "Atlanta, Georgia",
  ceo: "Henrique Braun",
  ceo_since: "2026",

  scope_score: 9.0,
  scope_score_label: "Excellent",

  snapshot: [
    {
      icon: "shield-check",
      tone: "good",
      label: "Quality",
      rating: { kind: "stars", outOf: 5, value: 5 },
    },
    {
      icon: "building-store",
      tone: "good",
      label: "Scale",
      rating: { kind: "stars", outOf: 5, value: 5 },
    },
    {
      icon: "coin",
      tone: "good",
      label: "Profitability",
      rating: { kind: "stars", outOf: 4, value: 4 },
    },
    {
      icon: "trending-up",
      tone: "good",
      label: "Revenue growth",
      rating: { kind: "arrow", label: "Growing" },
    },
    {
      icon: "alert-triangle",
      tone: "risk",
      label: "Risk",
      rating: { kind: "badge", label: "Medium" },
    },
    {
      icon: "scale",
      tone: "neutral",
      label: "Valuation",
      rating: { kind: "badge", label: "Moderate" },
    },
  ],

  thirty_second_summary: {
    subtitle: "A plain-English explanation of Coca-Cola's business model",
    content:
      "Coca-Cola makes money by developing beverage brands and selling concentrates, syrups, finished beverages, and other products through a global distribution and bottling network. Its portfolio spans sparkling soft drinks, water, sports drinks, coffee, tea, juice, dairy, and other beverages.",
  },

  business_model: {
    stages: [
      {
        icon: "building-store",
        tags: [
          { icon: "users", label: "Consumers" },
          { icon: "building-store", label: "Retailers" },
          { icon: "truck", label: "Bottlers" },
          { icon: "world", label: "Global Markets" },
        ],
        color: "#D71920",
        title: "Reach Beverage Consumers",
        tagTextColor: "#B91C1C",
        backgroundTint: "#FEF2F2",
      },
      {
        icon: "package",
        tags: [
          { icon: "bottle", label: "Beverages" },
          { icon: "droplet", label: "Concentrates" },
          { icon: "building-store", label: "Brands" },
          { icon: "truck", label: "Distribution" },
        ],
        color: "#EF5350",
        title: "Develop & Distribute Brands",
        tagTextColor: "#B91C1C",
        backgroundTint: "#FEF2F2",
      },
      {
        icon: "coin",
        tags: [
          { icon: "coin", label: "Product Sales" },
          { icon: "building-store", label: "Retail Channels" },
          { icon: "world", label: "Global Scale" },
          { icon: "chart-line", label: "Brand Growth" },
        ],
        color: "#991B1B",
        title: "Earn From Beverage Sales",
        tagTextColor: "#991B1B",
        backgroundTint: "#FEF2F2",
      },
    ],

    insight:
      "Coca-Cola combines a large brand portfolio with a global bottling and distribution system. Revenue comes from selling concentrates, syrups, finished beverages, and products from consolidated bottling operations.",

    repeatNote:
      "Coca-Cola generates revenue through beverage concentrate and finished-product sales, supported by a global network of bottling partners and distribution channels.",
  },

  strengths_and_risks: {
    strengths: [
      {
        icon: "world",
        title: "Global Beverage Platform",
        description:
          "Coca-Cola sells beverages across more than 200 countries and territories through a large global distribution system.",
      },
      {
        icon: "building-store",
        title: "Iconic Brand Portfolio",
        description:
          "The company owns and markets a broad portfolio of globally recognized beverage brands.",
      },
      {
        icon: "building-store",
        title: "Large Distribution Network",
        description:
          "Coca-Cola reaches consumers through bottlers, distributors, wholesalers, retailers, and other channels.",
      },
      {
        icon: "package",
        title: "Diversified Beverage Categories",
        description:
          "Its portfolio spans sparkling soft drinks, water, sports drinks, coffee, tea, juice, dairy, and other beverages.",
      },
      {
        icon: "chart-line",
        title: "Global Scale",
        description:
          "The company benefits from operating at large scale across multiple geographic markets and beverage categories.",
      },
    ],

    risks: [
      {
        icon: "alert-triangle",
        title: "Consumer Preferences",
        description:
          "Changes in consumer preferences toward health, nutrition, sugar content, and alternative beverages can affect demand.",
      },
      {
        icon: "scale",
        title: "Regulation & Taxes",
        description:
          "Beverage companies face regulations and taxes related to sugar, packaging, labeling, advertising, and health concerns.",
      },
      {
        icon: "world",
        title: "Global Exposure",
        description:
          "Coca-Cola operates internationally and is exposed to currencies, economic conditions, geopolitical developments, and local regulations.",
      },
      {
        icon: "coin",
        title: "Commodity Costs",
        description:
          "The business is exposed to changes in the cost of ingredients, packaging materials, energy, and other inputs.",
      },
      {
        icon: "building-store",
        title: "Competitive Beverage Market",
        description:
          "Coca-Cola competes across many beverage categories with global and regional brands.",
      },
    ],
  },

  financial_overview: {
    insight:
      "The Coca-Cola Company generated $47.9B of net operating revenue and $13.1B of net income in fiscal 2025.",

    metrics: [
      {
        icon: "report-money",
        label: "Revenue",
        value: { unit: "B", value: 47.941 },
        change: { value: 1.9 },
        sublabel: "FY25",
      },
      {
        icon: "coin",
        label: "Net Income",
        value: { unit: "B", value: 13.137 },
        change: { value: 23.4 },
        sublabel: "FY25",
      },
      {
        icon: "droplet",
        label: "Free Cash Flow",
        value: { unit: "B", value: 5.296 },
        change: { value: 11.7 },
        sublabel: "FY25",
      },
    ],

    fiscalYearLabel: "Fiscal year 2025 (ended December 31, 2025)",
  },

  financial_history: {
    panels: [
      {
        icon: "report-money",
        unit: "B",
        color: "#fca5a5",
        label: "Revenue",
        years: ["'21", "'22", "'23", "'24", "'25"],
        values: [38.655, 43.004, 45.754, 47.061, 47.941],
        changeNote: "+24% since FY21",
        highlightColor: "#b91c1c",
        currentValueLabel: "$47.9B",
      },
      {
        icon: "coin",
        unit: "B",
        color: "#86efac",
        label: "Net Income",
        years: ["'21", "'22", "'23", "'24", "'25"],
        values: [9.804, 9.571, 10.703, 10.649, 13.137],
        changeNote: "+34% since FY21",
        highlightColor: "#15803d",
        currentValueLabel: "$13.1B",
      },
      {
        icon: "droplet",
        unit: "B",
        color: "#c4b5fd",
        label: "Free Cash Flow",
        years: ["'21", "'22", "'23", "'24", "'25"],
        values: [11.258, 9.534, 9.747, 4.741, 5.296],
        changeNote: "-53% since FY21",
        highlightColor: "#7c3aed",
        currentValueLabel: "$5.3B",
      },
    ],

    rangeLabel: "5-year trend, fiscal years 2021–2025",
  },

  ecosystem: {
    output: {
      icon: "building-store",
      name: "Global Beverage Platform",
      color: "#D71920",
      description:
        "Coca-Cola connects beverage brands with consumers through bottlers, distributors, retailers, wholesalers, and other commercial partners.",
      backgroundTint: "#FEF2F2",
    },

    insight:
      "Coca-Cola sits across a global beverage ecosystem connecting brands, bottling partners, distributors, retailers, and consumers.",

    partners: [
      {
        icon: "truck",
        name: "Bottlers",
        color: "#D71920",
        description:
          "Bottling partners produce, package, distribute, and sell Coca-Cola beverages in markets around the world.",
        backgroundTint: "#FEF2F2",
      },
      {
        icon: "building-store",
        name: "Retailers",
        color: "#EF4444",
        description:
          "Retailers and foodservice customers provide channels through which Coca-Cola beverages reach consumers.",
        backgroundTint: "#FEF2F2",
      },
      {
        icon: "users",
        name: "Consumers",
        color: "#991B1B",
        description:
          "Consumers purchase Coca-Cola products across grocery, convenience, foodservice, vending, and other channels.",
        backgroundTint: "#FEF2F2",
      },
    ],

    centerLabel: "Coca-Cola",
    flowInLabel: "← Brands & distribution",
    flowOutLabel: "Beverages →",
    centerSublabel: "Global beverage platform",
  },

  overview: {
    ceo: "Henrique Braun",
    founded: "1886",
    revenue: { unit: "B", value: 47.941 },
    ceoSince: "2026",
    marketCap: { unit: "B", value: 368.513 },
    revenueYoY: { value: 1.9 },
    whatItDoes:
      "The Coca-Cola Company develops, markets, and sells a broad portfolio of beverages through a global bottling and distribution network.",
    headquarters: "Atlanta, Georgia",
    marketCapRank: "N/A",
    revenueFiscalYear: "FY25",
  },

  business_segments_insight:
    "Coca-Cola reports four geographic operating segments—North America, EMEA, Latin America, and Asia Pacific—plus Bottling Investments, which contains consolidated bottling operations regardless of geography.",

  business_segments_footnote:
    "Fiscal year 2025 ended December 31, 2025. Segment revenue totals $48.806B before Corporate and intersegment eliminations; consolidated net operating revenue was $47.941B.",

  competitors_context_note:
    "Companies that compete with Coca-Cola across global beverages and related consumer beverage categories. Market caps use an October 2026 snapshot.",

  competitors_insight:
    "Coca-Cola competes with global beverage companies across sparkling soft drinks, energy drinks, water, coffee, and other beverage categories.",
};

const cocaColaSegments = [
  {
    name: "North America",
    amount_value: 19.586,
    amount_unit: "B",
    percentage: 40,
    yoy_change: 4,
    color: "#D71920",
    sort_order: 0,
  },
  {
    name: "EMEA",
    amount_value: 11.513,
    amount_unit: "B",
    percentage: 24,
    yoy_change: 5,
    color: "#EF5350",
    sort_order: 1,
  },
  {
    name: "Latin America",
    amount_value: 6.334,
    amount_unit: "B",
    percentage: 13,
    yoy_change: -2,
    color: "#F97316",
    sort_order: 2,
  },
  {
    name: "Bottling Investments",
    amount_value: 5.735,
    amount_unit: "B",
    percentage: 12,
    yoy_change: -8,
    color: "#991B1B",
    sort_order: 3,
  },
  {
    name: "Asia Pacific",
    amount_value: 5.638,
    amount_unit: "B",
    percentage: 11,
    yoy_change: 1,
    color: "#DC2626",
    sort_order: 4,
  },
];

const cocaColaCompetitors = [
  {
    name: "PepsiCo",
    icon: "building-store",
    color: "#2563EB",
    background_tint: "#EFF6FF",
    tag_text_color: "#1D4ED8",
    market_cap_value: 172.96,
    market_cap_unit: "B",
    relative_size: 47,
    tag: "Global Beverage & Food",
    relationship:
      "Direct consumer beverage competitor across soft drinks, sports drinks, juices, and other beverage categories.",
    sort_order: 0,
  },
  {
    name: "Monster Beverage",
    icon: "bolt",
    color: "#111827",
    background_tint: "#F3F4F6",
    tag_text_color: "#374151",
    market_cap_value: 84.12,
    market_cap_unit: "B",
    relative_size: 23,
    tag: "Energy Drinks",
    relationship:
      "Beverage competitor focused on energy drinks, including brands distributed through the Coca-Cola system.",
    sort_order: 1,
  },
  {
    name: "Keurig Dr Pepper",
    icon: "coffee",
    color: "#7C3AED",
    background_tint: "#F5F3FF",
    tag_text_color: "#6D28D9",
    market_cap_value: 41.29,
    market_cap_unit: "B",
    relative_size: 11,
    tag: "Beverages",
    relationship:
      "Beverage competitor with carbonated soft drinks, coffee, and other beverage brands in North America.",
    sort_order: 2,
  },
  {
    name: "Diageo",
    icon: "glass-full",
    color: "#374151",
    background_tint: "#F3F4F6",
    tag_text_color: "#374151",
    market_cap_value: 47.13,
    market_cap_unit: "B",
    relative_size: 13,
    tag: "Global Beverages",
    relationship:
      "Global beverage competitor with a broad portfolio of beverage brands across international markets.",
    sort_order: 3,
  },
];
const cocaColaSeed: SeedCompany = {
  company: cocaColaCompany,
  segments: cocaColaSegments,
  competitors: cocaColaCompetitors,
};
const mcdonaldsCompany = {
  slug: "mcdonald-s",
  name: "McDonald's Corporation",
  brand_name: "McDonald's",
  ticker: "MCD",
  exchange: "NYSE",
  industry: "Consumer Cyclical",
  revenue_basis: "reported",
  logo_initial: "M",
  logo: "/logos/mcdonald-s-7-logo-svgrepo-com.svg",

  tagline:
    "Operates a global restaurant business through a large network of franchised and company-operated restaurants serving food and beverages across more than 100 countries.",

  what_it_does:
    "McDonald's operates and franchises restaurants around the world, generating revenue from franchise royalties, rent and fees as well as sales from company-owned and operated restaurants.",

  founded: "1940",
  headquarters: "Chicago, Illinois",
  ceo: "Chris Kempczinski",
  ceo_since: "2019",

  scope_score: 9.0,
  scope_score_label: "Excellent",

  snapshot: [
    {
      icon: "shield-check",
      tone: "good",
      label: "Quality",
      rating: { kind: "stars", outOf: 5, value: 5 },
    },
    {
      icon: "building-store",
      tone: "good",
      label: "Scale",
      rating: { kind: "stars", outOf: 5, value: 5 },
    },
    {
      icon: "coin",
      tone: "good",
      label: "Profitability",
      rating: { kind: "stars", outOf: 4, value: 4 },
    },
    {
      icon: "trending-up",
      tone: "good",
      label: "Revenue growth",
      rating: { kind: "arrow", label: "Growing" },
    },
    {
      icon: "alert-triangle",
      tone: "risk",
      label: "Risk",
      rating: { kind: "badge", label: "Medium" },
    },
    {
      icon: "scale",
      tone: "neutral",
      label: "Valuation",
      rating: { kind: "badge", label: "Moderate" },
    },
  ],

  thirty_second_summary: {
    subtitle: "A plain-English explanation of McDonald's business model",
    content:
      "McDonald's makes money through a predominantly franchised restaurant system. It collects rent, royalties, and fees from franchisees while also earning revenue from company-operated restaurants. The model allows McDonald's to scale its global restaurant brand while franchisees operate most locations.",
  },

  business_model: {
    stages: [
      {
        icon: "building-store",
        tags: [
          { icon: "users", label: "Customers" },
          { icon: "building-store", label: "Restaurants" },
          { icon: "users", label: "Franchisees" },
          { icon: "world", label: "Global Markets" },
        ],
        color: "#DA291C",
        title: "Reach Global Restaurant Customers",
        tagTextColor: "#B91C1C",
        backgroundTint: "#FEF2F2",
      },
      {
        icon: "building-store",
        tags: [
          { icon: "building-store", label: "Restaurants" },
          { icon: "users", label: "Franchisees" },
          { icon: "package", label: "Food & Beverages" },
          { icon: "world", label: "Brand System" },
        ],
        color: "#EF4444",
        title: "Operate & Franchise Restaurants",
        tagTextColor: "#B91C1C",
        backgroundTint: "#FEF2F2",
      },
      {
        icon: "coin",
        tags: [
          { icon: "coin", label: "Royalties" },
          { icon: "building-store", label: "Rent & Fees" },
          { icon: "package", label: "Restaurant Sales" },
          { icon: "chart-line", label: "Global Scale" },
        ],
        color: "#991B1B",
        title: "Earn From Restaurants",
        tagTextColor: "#991B1B",
        backgroundTint: "#FEF2F2",
      },
    ],

    insight:
      "McDonald's combines franchising with company-operated restaurants. Most restaurants are operated by franchisees, while McDonald's earns revenue through franchise royalties, rent and fees, along with sales from company-operated restaurants.",

    repeatNote:
      "McDonald's generates revenue primarily through its global franchise system, supported by franchise royalties, rent and fees, while also earning sales from company-operated restaurants.",
  },

  strengths_and_risks: {
    strengths: [
      {
        icon: "world",
        title: "Global Restaurant Network",
        description:
          "McDonald's operates a global restaurant system spanning more than 100 countries with more than 44,000 locations.",
      },
      {
        icon: "users",
        title: "Franchise-Led Model",
        description:
          "Approximately 95% of McDonald's restaurants worldwide are franchised, allowing the company to operate a large network with significant participation from local business owners.",
      },
      {
        icon: "building-store",
        title: "Powerful Global Brand",
        description:
          "McDonald's has one of the world's most recognizable restaurant brands, supporting customer awareness across international markets.",
      },
      {
        icon: "building-store",
        title: "Large Restaurant Footprint",
        description:
          "A large network of restaurants provides broad access to customers across drive-thru, dine-in, delivery, digital ordering, and other channels.",
      },
      {
        icon: "coin",
        title: "Recurring Franchise Economics",
        description:
          "The franchise model generates recurring revenue through royalties, rent, and fees as franchisees operate restaurants under the McDonald's system.",
      },
    ],

    risks: [
      {
        icon: "users",
        title: "Consumer Demand",
        description:
          "Changes in consumer preferences, restaurant traffic, pricing sensitivity, and spending patterns can affect restaurant sales.",
      },
      {
        icon: "coin",
        title: "Food & Operating Costs",
        description:
          "Restaurants and franchisees are exposed to changes in food, labor, occupancy, energy, and other operating costs.",
      },
      {
        icon: "building-store",
        title: "Franchisee Execution",
        description:
          "The performance and customer experience of a highly franchised system depend partly on the ability of franchisees to operate restaurants effectively.",
      },
      {
        icon: "world",
        title: "Global Exposure",
        description:
          "McDonald's operates internationally and is exposed to foreign exchange movements, economic conditions, geopolitical events, and local regulations.",
      },
      {
        icon: "alert-triangle",
        title: "Competitive Restaurant Market",
        description:
          "McDonald's competes with global, regional, and local restaurant brands across burgers, quick-service food, coffee, chicken, and other categories.",
      },
    ],
  },

  financial_overview: {
    insight:
      "McDonald's generated $26.9B of consolidated revenue and $8.6B of net income in fiscal 2025, while free cash flow was $7.2B.",

    metrics: [
      {
        icon: "report-money",
        label: "Revenue",
        value: { unit: "B", value: 26.885 },
        change: { value: 3.7 },
        sublabel: "FY25",
      },
      {
        icon: "coin",
        label: "Net Income",
        value: { unit: "B", value: 8.563 },
        change: { value: 4.1 },
        sublabel: "FY25",
      },
      {
        icon: "droplet",
        label: "Free Cash Flow",
        value: { unit: "B", value: 7.186 },
        change: { value: 7.7 },
        sublabel: "FY25",
      },
    ],

    fiscalYearLabel: "Fiscal year 2025 (ended December 31, 2025)",
  },

  financial_history: {
    panels: [
      {
        icon: "report-money",
        unit: "B",
        color: "#fca5a5",
        label: "Revenue",
        years: ["'21", "'22", "'23", "'24", "'25"],
        values: [23.223, 23.183, 25.494, 25.920, 26.885],
        changeNote: "+16% since FY21",
        highlightColor: "#b91c1c",
        currentValueLabel: "$26.9B",
      },
      {
        icon: "coin",
        unit: "B",
        color: "#86efac",
        label: "Net Income",
        years: ["'21", "'22", "'23", "'24", "'25"],
        values: [7.545, 6.177, 8.469, 8.223, 8.563],
        changeNote: "+14% since FY21",
        highlightColor: "#15803d",
        currentValueLabel: "$8.6B",
      },
      {
        icon: "droplet",
        unit: "B",
        color: "#c4b5fd",
        label: "Free Cash Flow",
        years: ["'21", "'22", "'23", "'24", "'25"],
        values: [7.102, 5.488, 7.255, 6.672, 7.186],
        changeNote: "+1% since FY21",
        highlightColor: "#7c3aed",
        currentValueLabel: "$7.2B",
      },
    ],

    rangeLabel: "5-year trend, fiscal years 2021–2025",
  },

  ecosystem: {
    output: {
      icon: "building-store",
      name: "Global Restaurant Franchise Platform",
      color: "#DA291C",
      description:
        "McDonald's connects its global restaurant brand with customers through franchisees, company-operated restaurants, suppliers, delivery platforms, and other commercial partners.",
      backgroundTint: "#FEF2F2",
    },

    insight:
      "McDonald's sits at the center of a global restaurant ecosystem connecting its brand, franchisees, company-operated restaurants, suppliers, technology platforms, and customers.",

    partners: [
      {
        icon: "users",
        name: "Franchisees",
        color: "#DA291C",
        description:
          "Independent local business owners operate most McDonald's restaurants under the company's brand, systems, and franchise agreements.",
        backgroundTint: "#FEF2F2",
      },
      {
        icon: "truck",
        name: "Suppliers",
        color: "#EF4444",
        description:
          "Suppliers provide food, packaging, equipment, technology, and other products and services required across the restaurant system.",
        backgroundTint: "#FEF2F2",
      },
      {
        icon: "users",
        name: "Customers",
        color: "#991B1B",
        description:
          "Customers purchase McDonald's food and beverages through restaurants, drive-thru, delivery, digital ordering, and other channels.",
        backgroundTint: "#FEF2F2",
      },
    ],

    centerLabel: "McDonald's",
    flowInLabel: "← Brand & restaurant system",
    flowOutLabel: "Food & services →",
    centerSublabel: "Global restaurant platform",
  },

  overview: {
    ceo: "Chris Kempczinski",
    founded: "1940",
    revenue: { unit: "B", value: 26.885 },
    ceoSince: "2019",
    marketCap: { unit: "B", value: 164.09 },
    revenueYoY: { value: 3.7 },
    whatItDoes:
      "McDonald's operates and franchises restaurants around the world, generating revenue from franchise royalties, rent and fees as well as sales from company-owned and operated restaurants.",
    headquarters: "Chicago, Illinois",
    marketCapRank: "N/A",
    revenueFiscalYear: "FY25",
  },

  business_segments_insight:
    "McDonald's reports three global operating segments: U.S., International Operated Markets, and International Developmental Licensed Markets & Corporate.",

  business_segments_footnote:
    "Fiscal year 2025 ended December 31, 2025. Segment revenues total $26.885B, matching consolidated reported revenue.",

  competitors_context_note:
    "Companies that compete with McDonald's across global quick-service restaurants, fast-casual dining, coffee, burgers, chicken, and other restaurant categories. Market caps use an October 2026 snapshot.",

  competitors_insight:
    "McDonald's competes with large global restaurant groups and specialized restaurant chains across burgers, coffee, chicken, Mexican food, and other quick-service categories.",
};

const mcdonaldsSegments = [
  {
    name: "International Operated Markets",
    amount_value: 13.633,
    amount_unit: "B",
    percentage: 51,
    yoy_change: 8,
    color: "#DA291C",
    sort_order: 0,
  },
  {
    name: "U.S.",
    amount_value: 10.825,
    amount_unit: "B",
    percentage: 40,
    yoy_change: 2,
    color: "#EF4444",
    sort_order: 1,
  },
  {
    name: "International Developmental Licensed Markets & Corporate",
    amount_value: 2.427,
    amount_unit: "B",
    percentage: 9,
    yoy_change: -9,
    color: "#991B1B",
    sort_order: 2,
  },
];

const mcdonaldsCompetitors = [
  {
    name: "Starbucks",
    icon: "coffee",
    color: "#166534",
    background_tint: "#F0FDF4",
    tag_text_color: "#15803D",
    market_cap_value: 107.96,
    market_cap_unit: "B",
    relative_size: 66,
    tag: "Global Coffee & Restaurants",
    relationship:
      "Global restaurant and beverage competitor with a large international store network and significant franchise and licensed operations.",
    sort_order: 0,
  },
  {
    name: "Chipotle Mexican Grill",
    icon: "building-store",
    color: "#B91C1C",
    background_tint: "#FEF2F2",
    tag_text_color: "#991B1B",
    market_cap_value: 40.94,
    market_cap_unit: "B",
    relative_size: 25,
    tag: "Fast Casual",
    relationship:
      "Fast-casual restaurant competitor serving Mexican-inspired food across a large company-operated restaurant network.",
    sort_order: 1,
  },
  {
    name: "Yum! Brands",
    icon: "building-store",
    color: "#2563EB",
    background_tint: "#EFF6FF",
    tag_text_color: "#1D4ED8",
    market_cap_value: 37.14,
    market_cap_unit: "B",
    relative_size: 23,
    tag: "Global QSR",
    relationship:
      "Global quick-service restaurant group operating brands including KFC, Taco Bell, and Pizza Hut across international markets.",
    sort_order: 2,
  },
  {
    name: "Restaurant Brands International",
    icon: "building-store",
    color: "#7C3AED",
    background_tint: "#F5F3FF",
    tag_text_color: "#6D28D9",
    market_cap_value: 32.02,
    market_cap_unit: "B",
    relative_size: 20,
    tag: "Global QSR",
    relationship:
      "Global quick-service restaurant group whose portfolio includes Burger King, Tim Hortons, and Popeyes.",
    sort_order: 3,
  },
];

const mcdonaldsSeed: SeedCompany = {
  company: mcdonaldsCompany,
  segments: mcdonaldsSegments,
  competitors: mcdonaldsCompetitors,
};
const nikeCompany = {
  slug: "nike",
  name: "NIKE, Inc.",
  brand_name: "Nike",
  ticker: "NKE",
  exchange: "NYSE",
  industry: "Consumer Cyclical",
  revenue_basis: "managed",
  logo_initial: "N",
  logo: "/logos/nike-4-logo-svgrepo-com.svg",

  tagline:
    "Designs, markets, and sells athletic footwear, apparel, equipment, accessories, and related products through wholesale and direct-to-consumer channels worldwide.",

  what_it_does:
    "NIKE designs, develops, markets, and sells athletic footwear, apparel, equipment, accessories, and related products through wholesale partners, NIKE Direct stores, digital channels, and other direct-to-consumer channels.",

  founded: "1964",
  headquarters: "Beaverton, Oregon",
  ceo: "Elliott Hill",
  ceo_since: "2024",

  scope_score: 8.0,
  scope_score_label: "Strong",

  snapshot: [
    {
      icon: "shield-check",
      tone: "good",
      label: "Quality",
      rating: { kind: "stars", outOf: 5, value: 5 },
    },
    {
      icon: "building-store",
      tone: "good",
      label: "Scale",
      rating: { kind: "stars", outOf: 5, value: 5 },
    },
    {
      icon: "coin",
      tone: "good",
      label: "Profitability",
      rating: { kind: "stars", outOf: 4, value: 3 },
    },
    {
      icon: "trending-up",
      tone: "risk",
      label: "Revenue growth",
      rating: { kind: "arrow", label: "Declining" },
    },
    {
      icon: "alert-triangle",
      tone: "risk",
      label: "Risk",
      rating: { kind: "badge", label: "Medium-High" },
    },
    {
      icon: "scale",
      tone: "neutral",
      label: "Valuation",
      rating: { kind: "badge", label: "Moderate" },
    },
  ],

  thirty_second_summary: {
    subtitle: "A plain-English explanation of Nike's business model",
    content:
      "Nike makes money by designing and selling athletic footwear, apparel, equipment, and accessories. Products are sold through wholesale partners such as retailers as well as NIKE Direct stores and digital channels. Nike also operates Jordan Brand and Converse, giving the company multiple sports and lifestyle brands.",
  },

  business_model: {
    stages: [
      {
        icon: "package",
        tags: [
          { icon: "users", label: "Athletes" },
          { icon: "chart-line", label: "Product Design" },
          { icon: "package", label: "Footwear & Apparel" },
          { icon: "world", label: "Global Brands" },
        ],
        color: "#111111",
        title: "Design Products & Build Brands",
        tagTextColor: "#111111",
        backgroundTint: "#F3F4F6",
      },
      {
        icon: "building-store",
        tags: [
          { icon: "building-store", label: "Retailers" },
          { icon: "world", label: "Wholesale" },
          { icon: "users", label: "Consumers" },
          { icon: "package", label: "NIKE Direct" },
        ],
        color: "#374151",
        title: "Sell Through Global Channels",
        tagTextColor: "#374151",
        backgroundTint: "#F3F4F6",
      },
      {
        icon: "coin",
        tags: [
          { icon: "package", label: "Product Sales" },
          { icon: "building-store", label: "Wholesale" },
          { icon: "users", label: "Direct Sales" },
          { icon: "chart-line", label: "Brand Demand" },
        ],
        color: "#000000",
        title: "Earn From Product Sales",
        tagTextColor: "#111111",
        backgroundTint: "#F3F4F6",
      },
    ],

    insight:
      "Nike combines product design and global brand marketing with a large distribution system. Revenue primarily comes from selling footwear, apparel, equipment, and accessories through wholesale customers and NIKE Direct channels.",

    repeatNote:
      "Nike generates revenue primarily from selling athletic footwear, apparel, equipment, and accessories through wholesale and direct-to-consumer channels.",
  },

  strengths_and_risks: {
    strengths: [
      {
        icon: "world",
        title: "Global Sports Brand",
        description:
          "Nike operates a globally recognized sports brand with products sold across major geographic markets.",
      },
      {
        icon: "package",
        title: "Strong Product Portfolio",
        description:
          "The company offers athletic footwear, apparel, equipment, and accessories across multiple sports and consumer categories.",
      },
      {
        icon: "building-store",
        title: "Multiple Sales Channels",
        description:
          "Nike reaches consumers through wholesale partners, NIKE-owned stores, digital platforms, and other direct channels.",
      },
      {
        icon: "users",
        title: "Jordan & Converse",
        description:
          "Jordan Brand and Converse extend Nike's portfolio into additional athletic, lifestyle, footwear, and apparel categories.",
      },
      {
        icon: "chart-line",
        title: "Global Scale",
        description:
          "Nike operates across four major geographic NIKE Brand markets and serves consumers through a broad global commercial network.",
      },
    ],

    risks: [
      {
        icon: "trending-up",
        title: "Slower Revenue Growth",
        description:
          "Fiscal 2026 revenue was broadly flat on a reported basis, while currency-neutral revenue declined 2%, showing continued pressure on the business.",
      },
      {
        icon: "world",
        title: "Greater China Pressure",
        description:
          "Greater China revenue declined 11% in fiscal 2026, making the region an important challenge for Nike's turnaround.",
      },
      {
        icon: "building-store",
        title: "Competitive Sportswear Market",
        description:
          "Nike competes with global and regional athletic footwear, apparel, and sportswear brands across many product categories.",
      },
      {
        icon: "coin",
        title: "Product & Inventory Pressure",
        description:
          "Product demand, discounts, inventory levels, and changes in product mix can affect revenue and gross margins.",
      },
      {
        icon: "world",
        title: "Global Exposure",
        description:
          "Nike operates internationally and is exposed to foreign exchange movements, tariffs, economic conditions, trade policies, and local market conditions.",
      },
    ],
  },

  financial_overview: {
    insight:
      "NIKE, Inc. generated $46.4B of revenue and $3.1B of net income in fiscal 2026. Free cash flow was approximately $2.2B, calculated from operating cash flow of $2.868B less capital expenditures of $0.684B.",

    metrics: [
      {
        icon: "report-money",
        label: "Revenue",
        value: { unit: "B", value: 46.398 },
        change: { value: 0.2 },
        sublabel: "FY26",
      },
      {
        icon: "coin",
        label: "Net Income",
        value: { unit: "B", value: 3.108 },
        change: { value: -3.4 },
        sublabel: "FY26",
      },
      {
        icon: "droplet",
        label: "Free Cash Flow",
        value: { unit: "B", value: 2.184 },
        change: { value: -33.2 },
        sublabel: "FY26",
      },
    ],

    fiscalYearLabel: "Fiscal year 2026 (ended May 31, 2026)",
  },

  financial_history: {
    panels: [
      {
        icon: "report-money",
        unit: "B",
        color: "#d1d5db",
        label: "Revenue",
        years: ["'22", "'23", "'24", "'25", "'26"],
        values: [46.710, 51.217, 51.362, 46.309, 46.398],
        changeNote: "-1% since FY22",
        highlightColor: "#111111",
        currentValueLabel: "$46.4B",
      },
      {
        icon: "coin",
        unit: "B",
        color: "#86efac",
        label: "Net Income",
        years: ["'22", "'23", "'24", "'25", "'26"],
        values: [6.046, 5.070, 5.700, 3.219, 3.108],
        changeNote: "-49% since FY22",
        highlightColor: "#15803d",
        currentValueLabel: "$3.1B",
      },
      {
        icon: "droplet",
        unit: "B",
        color: "#c4b5fd",
        label: "Free Cash Flow",
        years: ["'22", "'23", "'24", "'25", "'26"],
        values: [4.430, 4.872, 6.617, 3.268, 2.184],
        changeNote: "-51% since FY22",
        highlightColor: "#7c3aed",
        currentValueLabel: "$2.2B",
      },
    ],

    rangeLabel: "5-year trend, fiscal years 2022–2026",
  },

  ecosystem: {
    output: {
      icon: "building-store",
      name: "Global Sports Brand Platform",
      color: "#111111",
      description:
        "Nike connects sports brands and products with consumers through athletes, retail partners, wholesale customers, digital channels, suppliers, and NIKE-owned stores.",
      backgroundTint: "#F3F4F6",
    },

    insight:
      "Nike sits at the center of a global sports ecosystem connecting athletes, product designers, suppliers, retailers, digital channels, and consumers.",

    partners: [
      {
        icon: "users",
        name: "Athletes",
        color: "#111111",
        description:
          "Athletes and sports partnerships help Nike develop products, build credibility, and connect its brands with sports communities and consumers.",
        backgroundTint: "#F3F4F6",
      },
      {
        icon: "building-store",
        name: "Retail Partners",
        color: "#374151",
        description:
          "Wholesale customers and retail partners provide important channels through which Nike products reach consumers around the world.",
        backgroundTint: "#F3F4F6",
      },
      {
        icon: "users",
        name: "Consumers",
        color: "#000000",
        description:
          "Consumers purchase Nike, Jordan, and Converse products through wholesale retailers, NIKE-owned stores, digital platforms, and other channels.",
        backgroundTint: "#F3F4F6",
      },
    ],

    centerLabel: "Nike",
    flowInLabel: "← Brands & products",
    flowOutLabel: "Sports products →",
    centerSublabel: "Global sports brand platform",
  },

  overview: {
    ceo: "Elliott Hill",
    founded: "1964",
    revenue: { unit: "B", value: 46.398 },
    ceoSince: "2024",
    marketCap: { unit: "B", value: 50.24 },
    revenueYoY: { value: 0.2 },
    whatItDoes:
      "NIKE designs, develops, markets, and sells athletic footwear, apparel, equipment, accessories, and related products through wholesale and direct-to-consumer channels.",
    headquarters: "Beaverton, Oregon",
    marketCapRank: "N/A",
    revenueFiscalYear: "FY26",
  },

  business_segments_insight:
    "Nike's NIKE Brand reports four geographic operating segments: North America, Europe, Middle East & Africa, Greater China, and Asia Pacific & Latin America.",

  business_segments_footnote:
    "Fiscal year 2026 ended May 31, 2026. The four geographic segments below represent NIKE Brand geographic revenue and exclude Converse, Corporate, and Global Brand Divisions revenue.",

  competitors_context_note:
    "Companies that compete with Nike across athletic footwear, apparel, sportswear, and related consumer categories. Market caps use an October 2026 snapshot and can change daily.",

  competitors_insight:
    "Nike competes with global sportswear and athletic footwear companies across footwear, apparel, equipment, and lifestyle categories.",
};

const nikeSegments = [
  {
    name: "North America",
    amount_value: 20.511,
    amount_unit: "B",
    percentage: 45,
    yoy_change: 5,
    color: "#111111",
    sort_order: 0,
  },
  {
    name: "Europe, Middle East & Africa",
    amount_value: 12.572,
    amount_unit: "B",
    percentage: 28,
    yoy_change: 3,
    color: "#374151",
    sort_order: 1,
  },
  {
    name: "Greater China",
    amount_value: 5.847,
    amount_unit: "B",
    percentage: 13,
    yoy_change: -11,
    color: "#6B7280",
    sort_order: 2,
  },
  {
    name: "Asia Pacific & Latin America",
    amount_value: 6.243,
    amount_unit: "B",
    percentage: 14,
    yoy_change: 0,
    color: "#9CA3AF",
    sort_order: 3,
  },
];

const nikeCompetitors = [
  {
    name: "Adidas",
    icon: "building-store",
    color: "#111827",
    background_tint: "#F3F4F6",
    tag_text_color: "#111827",
    market_cap_value: 29.01,
    market_cap_unit: "B",
    relative_size: 58,
    tag: "Global Sportswear",
    relationship:
      "Global sportswear competitor across athletic footwear, apparel, equipment, and lifestyle products.",
    sort_order: 0,
  },
  {
    name: "Deckers Brands",
    icon: "building-store",
    color: "#7C3AED",
    background_tint: "#F5F3FF",
    tag_text_color: "#6D28D9",
    market_cap_value: 10.87,
    market_cap_unit: "B",
    relative_size: 22,
    tag: "Footwear",
    relationship:
      "Footwear company whose portfolio includes brands such as HOKA and UGG across performance and lifestyle footwear categories.",
    sort_order: 1,
  },
  {
    name: "Lululemon",
    icon: "building-store",
    color: "#374151",
    background_tint: "#F3F4F6",
    tag_text_color: "#374151",
    market_cap_value: 10.31,
    market_cap_unit: "B",
    relative_size: 21,
    tag: "Athletic Apparel",
    relationship:
      "Athletic apparel and sportswear company competing with Nike across performance apparel and lifestyle products.",
    sort_order: 2,
  },
  {
    name: "Under Armour",
    icon: "bolt",
    color: "#2563EB",
    background_tint: "#EFF6FF",
    tag_text_color: "#1D4ED8",
    market_cap_value: 1.96,
    market_cap_unit: "B",
    relative_size: 4,
    tag: "Sportswear",
    relationship:
      "Sportswear and athletic footwear competitor serving consumers across performance apparel, footwear, and accessories.",
    sort_order: 3,
  },
];

const nikeSeed: SeedCompany = {
  company: nikeCompany,
  segments: nikeSegments,
  competitors: nikeCompetitors,
};
const berkshireHathawayCompany = {
  slug: "berkshire-hathaway",
  name: "Berkshire Hathaway Inc.",
  brand_name: "Berkshire Hathaway",
  ticker: "BRK.B",
  exchange: "NYSE",
  industry: "Financial Services",
  revenue_basis: "segment",
  logo_initial: "B",
  logo: "/logos/BRK-B.svg",

  tagline:
    "Operates as a diversified holding company with businesses spanning insurance, rail transportation, utilities and energy, manufacturing, services, retailing, and investments.",

  what_it_does:
    "Berkshire Hathaway owns and operates a diverse group of businesses, including insurance companies, BNSF Railway, Berkshire Hathaway Energy, manufacturing businesses, service and retail companies, and other investments.",

  founded: "1839",
  headquarters: "Omaha, Nebraska",
  ceo: "Gregory E. Abel",
  ceo_since: "2026",

  scope_score: 9.0,
  scope_score_label: "Excellent",

  snapshot: [
    {
      icon: "shield-check",
      tone: "good",
      label: "Quality",
      rating: { kind: "stars", outOf: 5, value: 5 },
    },
    {
      icon: "building-store",
      tone: "good",
      label: "Scale",
      rating: { kind: "stars", outOf: 5, value: 5 },
    },
    {
      icon: "coin",
      tone: "good",
      label: "Profitability",
      rating: { kind: "stars", outOf: 4, value: 4 },
    },
    {
      icon: "trending-up",
      tone: "good",
      label: "Revenue growth",
      rating: { kind: "arrow", label: "Stable" },
    },
    {
      icon: "alert-triangle",
      tone: "risk",
      label: "Risk",
      rating: { kind: "badge", label: "Medium" },
    },
    {
      icon: "scale",
      tone: "neutral",
      label: "Valuation",
      rating: { kind: "badge", label: "Moderate" },
    },
  ],

  thirty_second_summary: {
    subtitle: "A plain-English explanation of Berkshire Hathaway's business model",
    content:
      "Berkshire Hathaway is a diversified holding company. Instead of relying on one business, it owns many companies across insurance, railroads, energy, manufacturing, services, and retailing. Berkshire earns money from the operating businesses it owns, insurance activities, investment income, and the long-term performance of its investments.",
  },

  business_model: {
    stages: [
      {
        icon: "building-store",
        tags: [
          { icon: "shield-check", label: "Insurance" },
          { icon: "truck", label: "Railroads" },
          { icon: "bolt", label: "Energy" },
          { icon: "building-store", label: "Businesses" },
        ],
        color: "#8B5A2B",
        title: "Own Diverse Businesses",
        tagTextColor: "#7C4A21",
        backgroundTint: "#F7F1E8",
      },
      {
        icon: "package",
        tags: [
          { icon: "shield-check", label: "Insurance Float" },
          { icon: "building-store", label: "Operating Companies" },
          { icon: "chart-line", label: "Investments" },
          { icon: "coin", label: "Cash Generation" },
        ],
        color: "#A16207",
        title: "Generate Cash & Capital",
        tagTextColor: "#854D0E",
        backgroundTint: "#FEFCE8",
      },
      {
        icon: "coin",
        tags: [
          { icon: "coin", label: "Operating Earnings" },
          { icon: "chart-line", label: "Investment Income" },
          { icon: "building-store", label: "Acquisitions" },
          { icon: "world", label: "Long-Term Growth" },
        ],
        color: "#57534E",
        title: "Compound Capital",
        tagTextColor: "#44403C",
        backgroundTint: "#F5F5F4",
      },
    ],

    insight:
      "Berkshire's model is based on owning a diversified collection of businesses and allocating the cash they generate. Insurance provides a major source of capital through premiums and float, while operating subsidiaries generate earnings and investments provide additional income and gains.",

    repeatNote:
      "Berkshire Hathaway generates value by owning businesses across multiple industries, collecting insurance premiums and investment income, and allocating capital across its operating companies and investments.",
  },

  strengths_and_risks: {
    strengths: [
      {
        icon: "building-store",
        title: "Highly Diversified Business Base",
        description:
          "Berkshire owns businesses across insurance, rail transportation, utilities and energy, manufacturing, services, and retailing.",
      },
      {
        icon: "coin",
        title: "Large Capital Base",
        description:
          "Berkshire has a very large capital base and substantial liquidity, giving it significant financial flexibility.",
      },
      {
        icon: "shield-check",
        title: "Insurance Float",
        description:
          "Its insurance businesses generate float that Berkshire can invest while the related insurance obligations remain outstanding.",
      },
      {
        icon: "chart-line",
        title: "Multiple Sources of Cash Flow",
        description:
          "Cash is generated by insurance operations, railroads, energy businesses, manufacturing, services, retailing, and other operating companies.",
      },
      {
        icon: "building-store",
        title: "Decentralized Operating Model",
        description:
          "Berkshire allows many subsidiaries to operate with substantial autonomy under experienced local management.",
      },
    ],

    risks: [
      {
        icon: "users",
        title: "Key-Person Dependence",
        description:
          "Major investment and capital-allocation decisions depend on a small number of senior leaders, making leadership succession an important consideration.",
      },
      {
        icon: "shield-check",
        title: "Insurance Risk",
        description:
          "Insurance operations are exposed to underwriting losses, catastrophe events, claims inflation, reserve uncertainty, and reinsurance risks.",
      },
      {
        icon: "chart-line",
        title: "Investment Volatility",
        description:
          "Changes in the market value of Berkshire's investment portfolio can create significant swings in reported earnings even when operating businesses perform differently.",
      },
      {
        icon: "bolt",
        title: "Capital-Intensive Businesses",
        description:
          "Railroads and utilities require substantial ongoing investment in infrastructure and equipment.",
      },
      {
        icon: "building-store",
        title: "Conglomerate Complexity",
        description:
          "Berkshire owns businesses across many industries, making its overall financial performance more complex to understand than a focused single-industry company.",
      },
    ],
  },

  financial_overview: {
    insight:
      "Berkshire Hathaway generated $371.4B of consolidated revenue and $67.0B of net income attributable to Berkshire shareholders in fiscal 2025. Free cash flow was approximately $25.0B, calculated as operating cash flow of $45.969B less capital expenditures of $20.927B.",

    metrics: [
      {
        icon: "report-money",
        label: "Revenue",
        value: { unit: "B", value: 371.444 },
        change: { value: 0.0 },
        sublabel: "FY25",
      },
      {
        icon: "coin",
        label: "Net Income",
        value: { unit: "B", value: 66.968 },
        change: { value: -24.8 },
        sublabel: "FY25",
      },
      {
        icon: "droplet",
        label: "Free Cash Flow",
        value: { unit: "B", value: 25.042 },
        change: { value: 115.5 },
        sublabel: "FY25",
      },
    ],

    fiscalYearLabel: "Fiscal year 2025 (ended December 31, 2025)",
  },

  financial_history: {
    panels: [
      {
        icon: "report-money",
        unit: "B",
        color: "#d6b98c",
        label: "Revenue",
        years: ["'21", "'22", "'23", "'24", "'25"],
        values: [276.185, 302.020, 364.482, 371.433, 371.444],
        changeNote: "+34% since FY21",
        highlightColor: "#8B5A2B",
        currentValueLabel: "$371.4B",
      },
      {
        icon: "coin",
        unit: "B",
        color: "#86efac",
        label: "Net Income",
        years: ["'21", "'22", "'23", "'24", "'25"],
        values: [89.795, -22.819, 96.223, 88.995, 66.968],
        changeNote: "-25% since FY21",
        highlightColor: "#15803d",
        currentValueLabel: "$67.0B",
      },
      {
        icon: "droplet",
        unit: "B",
        color: "#c4b5fd",
        label: "Free Cash Flow",
        years: ["'21", "'22", "'23", "'24", "'25"],
        values: [26.151, 21.886, 29.787, 11.616, 25.042],
        changeNote: "-4% since FY21",
        highlightColor: "#7c3aed",
        currentValueLabel: "$25.0B",
      },
    ],

    rangeLabel: "5-year trend, fiscal years 2021–2025",
  },

  ecosystem: {
    output: {
      icon: "building-store",
      name: "Diversified Holding Company",
      color: "#8B5A2B",
      description:
        "Berkshire Hathaway sits above a broad collection of operating businesses, insurance companies, infrastructure businesses, and investments that collectively generate cash and capital for the holding company.",
      backgroundTint: "#F7F1E8",
    },

    insight:
      "Berkshire connects insurance, infrastructure, operating companies, investment assets, and capital allocation under one diversified holding-company structure.",

    partners: [
      {
        icon: "shield-check",
        name: "Insurance Businesses",
        color: "#8B5A2B",
        description:
          "Insurance subsidiaries such as GEICO and Berkshire Hathaway Reinsurance Group collect premiums and provide insurance and reinsurance coverage.",
        backgroundTint: "#F7F1E8",
      },
      {
        icon: "building-store",
        name: "Operating Companies",
        color: "#A16207",
        description:
          "Berkshire owns companies across manufacturing, services, retailing, rail transportation, utilities, and energy.",
        backgroundTint: "#FEFCE8",
      },
      {
        icon: "coin",
        name: "Investments",
        color: "#57534E",
        description:
          "Berkshire invests capital in publicly traded securities, fixed-income assets, and other businesses as part of its long-term capital-allocation strategy.",
        backgroundTint: "#F5F5F4",
      },
    ],

    centerLabel: "Berkshire Hathaway",
    flowInLabel: "← Businesses & capital",
    flowOutLabel: "Cash & investments →",
    centerSublabel: "Diversified holding company",
  },

  overview: {
    ceo: "Gregory E. Abel",
    founded: "1839",
    revenue: { unit: "B", value: 371.444 },
    ceoSince: "2026",
    marketCap: { unit: "T", value: 1.079 },
    revenueYoY: { value: 0.0 },
    whatItDoes:
      "Berkshire Hathaway owns and operates a diversified group of businesses spanning insurance, rail transportation, utilities and energy, manufacturing, services, retailing, and investments.",
    headquarters: "Omaha, Nebraska",
    marketCapRank: "14",
    revenueFiscalYear: "FY25",
  },

  business_segments_insight:
    "Berkshire's FY2025 revenue can be viewed across major revenue sources disclosed in its financial statements: BNSF, Berkshire Hathaway Energy, Manufacturing, Service and Retailing, Pilot, McLane, and Insurance, Corporate and other.",

  business_segments_footnote:
    "Fiscal year 2025 ended December 31, 2025. The seven revenue categories below are based on Berkshire's disclosed 2025 revenue-by-business-source table and sum to consolidated revenue of $371.444B. They are used here to make Berkshire's diversified business model easier to understand and are not all separate reportable segments.",

  competitors_context_note:
    "Companies used as broad comparison references for Berkshire's diversified financial and investment characteristics. Berkshire is unusually diversified, so no single company is a direct one-to-one competitor. Market caps use an October 2026 snapshot.",

  competitors_insight:
    "Berkshire Hathaway is difficult to compare directly with a single company because its businesses span insurance, infrastructure, operating companies, and investments. The comparison set therefore focuses on large financial and investment-oriented companies.",
};

const berkshireHathawaySegments = [
  {
    name: "Insurance, Corporate & Other",
    amount_value: 108.390,
    amount_unit: "B",
    percentage: 29,
    yoy_change: 0,
    color: "#8B5A2B",
    sort_order: 0,
  },
  {
    name: "Manufacturing",
    amount_value: 78.390,
    amount_unit: "B",
    percentage: 21,
    yoy_change: 0,
    color: "#A16207",
    sort_order: 1,
  },
  {
    name: "McLane",
    amount_value: 50.215,
    amount_unit: "B",
    percentage: 14,
    yoy_change: 0,
    color: "#57534E",
    sort_order: 2,
  },
  {
    name: "Service & Retailing",
    amount_value: 42.560,
    amount_unit: "B",
    percentage: 12,
    yoy_change: 0,
    color: "#78716C",
    sort_order: 3,
  },
  {
    name: "Pilot",
    amount_value: 42.166,
    amount_unit: "B",
    percentage: 11,
    yoy_change: 0,
    color: "#92400E",
    sort_order: 4,
  },
  {
    name: "Berkshire Hathaway Energy",
    amount_value: 26.282,
    amount_unit: "B",
    percentage: 7,
    yoy_change: 0,
    color: "#CA8A04",
    sort_order: 5,
  },
  {
    name: "BNSF Railway",
    amount_value: 23.441,
    amount_unit: "B",
    percentage: 6,
    yoy_change: 0,
    color: "#44403C",
    sort_order: 6,
  },
];

const berkshireHathawayCompetitors = [
  {
    name: "JPMorgan Chase",
    icon: "building-store",
    color: "#2563EB",
    background_tint: "#EFF6FF",
    tag_text_color: "#1D4ED8",
    market_cap_value: 883.52,
    market_cap_unit: "B",
    relative_size: 82,
    tag: "Financial Services",
    relationship:
      "One of the world's largest financial institutions, providing a broad comparison for Berkshire's financial scale and diversified financial activities.",
    sort_order: 0,
  },
  {
    name: "BlackRock",
    icon: "chart-line",
    color: "#111827",
    background_tint: "#F3F4F6",
    tag_text_color: "#111827",
    market_cap_value: 173.27,
    market_cap_unit: "B",
    relative_size: 16,
    tag: "Asset Management",
    relationship:
      "Global investment-management company that provides a comparison for Berkshire's large investment and capital-allocation activities.",
    sort_order: 1,
  },
  {
    name: "Blackstone",
    icon: "building-store",
    color: "#374151",
    background_tint: "#F3F4F6",
    tag_text_color: "#374151",
    market_cap_value: 133.45,
    market_cap_unit: "B",
    relative_size: 12,
    tag: "Alternative Investments",
    relationship:
      "Large alternative-asset manager with broad investments across real estate, private equity, credit, and infrastructure.",
    sort_order: 2,
  },
  {
    name: "Brookfield Asset Management",
    icon: "building-store",
    color: "#166534",
    background_tint: "#F0FDF4",
    tag_text_color: "#15803D",
    market_cap_value: 71.44,
    market_cap_unit: "B",
    relative_size: 7,
    tag: "Asset Management",
    relationship:
      "Global investment-management company focused on infrastructure, real estate, renewable power, and other real assets.",
    sort_order: 3,
  },
];

const berkshireHathawaySeed: SeedCompany = {
  company: berkshireHathawayCompany,
  segments: berkshireHathawaySegments,
  competitors: berkshireHathawayCompetitors,
};
const costcoCompany = {
  slug: "costco",
  name: "Costco Wholesale Corporation",
  brand_name: "Costco",
  ticker: "COST",
  exchange: "NASDAQ",
  industry: "Consumer Defensive",
  revenue_basis: "segment",
  logo_initial: "C",
  logo: "/logos/costco-ar21.svg",

  tagline:
    "Operates membership warehouses and e-commerce sites that offer a limited selection of products at low prices and generate high sales volumes.",

  what_it_does:
    "Costco operates membership warehouses and e-commerce sites that sell groceries, household products, electronics, appliances, fresh foods, apparel, and other merchandise at low prices. It also earns recurring membership fees from customers who pay for access to its warehouses and services.",

  founded: "1983",
  headquarters: "Issaquah, Washington",
  ceo: "Ron Vachris",
  ceo_since: "2024",

  scope_score: 9.0,
  scope_score_label: "Excellent",

  snapshot: [
    {
      icon: "shield-check",
      tone: "good",
      label: "Quality",
      rating: { kind: "stars", outOf: 5, value: 5 },
    },
    {
      icon: "building-store",
      tone: "good",
      label: "Scale",
      rating: { kind: "stars", outOf: 5, value: 5 },
    },
    {
      icon: "coin",
      tone: "good",
      label: "Profitability",
      rating: { kind: "stars", outOf: 4, value: 4 },
    },
    {
      icon: "trending-up",
      tone: "good",
      label: "Revenue growth",
      rating: { kind: "arrow", label: "Strong" },
    },
    {
      icon: "alert-triangle",
      tone: "risk",
      label: "Risk",
      rating: { kind: "badge", label: "Medium" },
    },
    {
      icon: "scale",
      tone: "neutral",
      label: "Valuation",
      rating: { kind: "badge", label: "Premium" },
    },
  ],

  thirty_second_summary: {
    subtitle: "A plain-English explanation of Costco's business model",
    content:
      "Costco is a membership-based warehouse retailer. Customers pay a recurring membership fee to shop at Costco, while Costco makes most of its revenue by selling a large volume of merchandise at relatively low prices. The membership model helps build recurring revenue and customer loyalty, while high sales volumes and efficient operations support the business.",
  },

  business_model: {
    stages: [
      {
        icon: "users",
        tags: [
          { icon: "users", label: "Members" },
          { icon: "coin", label: "Membership Fees" },
          { icon: "building-store", label: "Warehouses" },
          { icon: "world", label: "E-commerce" },
        ],
        color: "#2563EB",
        title: "Build Membership",
        tagTextColor: "#1D4ED8",
        backgroundTint: "#EFF6FF",
      },
      {
        icon: "package",
        tags: [
          { icon: "package", label: "Merchandise" },
          { icon: "truck", label: "Bulk Purchasing" },
          { icon: "building-store", label: "Warehouse Sales" },
          { icon: "shopping-cart", label: "E-commerce" },
        ],
        color: "#0891B2",
        title: "Sell at Low Prices",
        tagTextColor: "#0E7490",
        backgroundTint: "#ECFEFF",
      },
      {
        icon: "coin",
        tags: [
          { icon: "trending-up", label: "High Volume" },
          { icon: "shield-check", label: "Member Loyalty" },
          { icon: "coin", label: "Membership Income" },
          { icon: "building-store", label: "New Warehouses" },
        ],
        color: "#15803D",
        title: "Grow the Membership Flywheel",
        tagTextColor: "#166534",
        backgroundTint: "#F0FDF4",
      },
    ],

    insight:
      "Costco's model combines recurring membership fees with high-volume merchandise sales. The company keeps product selection relatively limited and uses purchasing scale, efficient distribution, and no-frills warehouse operations to support low prices and high inventory turnover.",

    repeatNote:
      "Costco generates value by attracting and retaining paying members, selling large volumes of merchandise at low prices, collecting recurring membership fees, and reinvesting cash into additional warehouses and its e-commerce business.",
  },

  strengths_and_risks: {
    strengths: [
      {
        icon: "users",
        title: "Strong Membership Model",
        description:
          "Costco earns recurring membership fees from customers who pay for access to its warehouse and e-commerce offerings.",
      },
      {
        icon: "building-store",
        title: "Large Operating Scale",
        description:
          "Costco operates hundreds of warehouses across multiple countries, giving it significant purchasing and distribution scale.",
      },
      {
        icon: "coin",
        title: "High Sales Volume",
        description:
          "The company focuses on a limited product selection and high inventory turnover, allowing it to sell large volumes while maintaining relatively low merchandise margins.",
      },
      {
        icon: "shield-check",
        title: "Customer Loyalty",
        description:
          "Membership renewal rates and the recurring nature of membership create a strong customer-retention component in the business model.",
      },
      {
        icon: "trending-up",
        title: "Multiple Growth Channels",
        description:
          "Costco can grow through new warehouses, increased sales at existing locations, membership growth, higher membership income, and digitally-enabled sales.",
      },
    ],

    risks: [
      {
        icon: "building-store",
        title: "Retail Competition",
        description:
          "Costco competes with large retailers, warehouse clubs, supermarkets, e-commerce companies, and other businesses for consumer spending.",
      },
      {
        icon: "coin",
        title: "Low-Margin Model",
        description:
          "Costco intentionally operates with relatively low merchandise margins, making efficient operations and high sales volumes important to profitability.",
      },
      {
        icon: "users",
        title: "Membership Dependence",
        description:
          "The business relies on attracting and retaining members, so changes in renewal rates, membership growth, or customer behavior can affect results.",
      },
      {
        icon: "truck",
        title: "Supply Chain and Cost Risk",
        description:
          "Merchandise costs, transportation, tariffs, commodity prices, wages, and other operating costs can affect Costco's margins.",
      },
      {
        icon: "building-store",
        title: "Capital-Intensive Expansion",
        description:
          "Opening and remodeling warehouses requires substantial investment in land, buildings, equipment, technology, and distribution infrastructure.",
      },
    ],
  },

  financial_overview: {
    insight:
      "Costco generated $303.154B of total revenue and $9.226B of net income in fiscal 2026. Operating cash flow was $15.825B and capital expenditures were $6.435B, producing approximately $9.390B of calculated free cash flow.",

    metrics: [
      {
        icon: "report-money",
        label: "Revenue",
        value: { unit: "B", value: 303.154 },
        change: { value: 10.1 },
        sublabel: "FY26",
      },
      {
        icon: "coin",
        label: "Net Income",
        value: { unit: "B", value: 9.226 },
        change: { value: 13.9 },
        sublabel: "FY26",
      },
      {
        icon: "droplet",
        label: "Free Cash Flow",
        value: { unit: "B", value: 9.390 },
        change: { value: 19.8 },
        sublabel: "FY26",
      },
    ],

    fiscalYearLabel: "Fiscal year 2026 (ended August 30, 2026)",
  },

  financial_history: {
    panels: [
      {
        icon: "report-money",
        unit: "B",
        color: "#93C5FD",
        label: "Revenue",
        years: ["'22", "'23", "'24", "'25", "'26"],
        values: [226.954, 242.290, 254.453, 275.235, 303.154],
        changeNote: "+34% since FY22",
        highlightColor: "#2563EB",
        currentValueLabel: "$303.2B",
      },
      {
        icon: "coin",
        unit: "B",
        color: "#86EFAC",
        label: "Net Income",
        years: ["'22", "'23", "'24", "'25", "'26"],
        values: [5.844, 6.292, 7.367, 8.099, 9.226],
        changeNote: "+58% since FY22",
        highlightColor: "#15803D",
        currentValueLabel: "$9.2B",
      },
      {
        icon: "droplet",
        unit: "B",
        color: "#C4B5FD",
        label: "Free Cash Flow",
        years: ["'22", "'23", "'24", "'25", "'26"],
        values: [3.501, 6.745, 6.629, 7.837, 9.390],
        changeNote: "+168% since FY22",
        highlightColor: "#7C3AED",
        currentValueLabel: "$9.4B",
      },
    ],

    rangeLabel: "5-year trend, fiscal years 2022–2026",
  },

  ecosystem: {
    output: {
      icon: "building-store",
      name: "Membership Warehouse Retailer",
      color: "#2563EB",
      description:
        "Costco sits at the center of a membership-based retail ecosystem connecting members, suppliers, warehouses, distribution operations, e-commerce channels, and ancillary services.",
      backgroundTint: "#EFF6FF",
    },

    insight:
      "Costco connects membership revenue with a large physical warehouse network, e-commerce sites, global suppliers, distribution infrastructure, and high-volume merchandise sales.",

    partners: [
      {
        icon: "users",
        name: "Members",
        color: "#2563EB",
        description:
          "Members pay recurring fees and purchase merchandise through Costco warehouses and e-commerce sites.",
        backgroundTint: "#EFF6FF",
      },
      {
        icon: "package",
        name: "Suppliers",
        color: "#0891B2",
        description:
          "Manufacturers, brands, and other suppliers provide the merchandise Costco purchases and sells through its warehouse and digital channels.",
        backgroundTint: "#ECFEFF",
      },
      {
        icon: "truck",
        name: "Distribution Network",
        color: "#15803D",
        description:
          "Distribution facilities, transportation operations, and warehouse infrastructure support Costco's high-volume inventory model.",
        backgroundTint: "#F0FDF4",
      },
    ],

    centerLabel: "Costco",
    flowInLabel: "← Products & members",
    flowOutLabel: "Sales & cash →",
    centerSublabel: "Membership warehouse retailer",
  },

  overview: {
    ceo: "Ron Vachris",
    founded: "1983",
    revenue: { unit: "B", value: 303.154 },
    ceoSince: "2024",
    marketCap: { unit: "B", value: 414.75 },
    revenueYoY: { value: 10.1 },
    whatItDoes:
      "Costco operates membership warehouses and e-commerce sites that sell a broad range of merchandise at low prices while earning recurring membership fees.",
    headquarters: "Issaquah, Washington",
    marketCapRank: "35",
    revenueFiscalYear: "FY26",
  },

  business_segments_insight:
    "Costco's fiscal 2026 revenue is primarily generated by merchandise sales through its warehouse and e-commerce business, with a smaller but recurring contribution from membership fees.",

  business_segments_footnote:
    "Fiscal year 2026 ended August 30, 2026. Costco does not report these two revenue sources as separate operating segments. They are shown here as major revenue sources reported in Costco's consolidated financial statements. Percentages are calculated against total fiscal 2026 revenue of $303.154B.",

  competitors_context_note:
    "Companies used as broad comparison references for Costco's warehouse-club and large-scale retail model. Costco has a distinctive membership-based model, so no single company is a perfect one-to-one competitor. Market caps use an October 2026 snapshot.",

  competitors_insight:
    "Costco competes with large retailers and warehouse clubs for consumer spending. Walmart is substantially larger by market capitalization, while Target, Kroger, and BJ's Wholesale Club provide comparisons across mass retail, grocery, and warehouse-club formats.",
};

const costcoSegments = [
  {
    name: "Warehouse Club Sales",
    amount_value: 297.247,
    amount_unit: "B",
    percentage: 98,
    yoy_change: 10.1,
    color: "#2563EB",
    sort_order: 0,
  },
  {
    name: "Membership Fees",
    amount_value: 5.907,
    amount_unit: "B",
    percentage: 2,
    yoy_change: 11.0,
    color: "#0891B2",
    sort_order: 1,
  },
];

const costcoCompetitors = [
  {
    name: "Walmart",
    icon: "building-store",
    color: "#2563EB",
    background_tint: "#EFF6FF",
    tag_text_color: "#1D4ED8",
    market_cap_value: 850.50,
    market_cap_unit: "B",
    relative_size: 205,
    tag: "Mass Retail",
    relationship:
      "One of the world's largest retailers and a major competitor for everyday consumer spending across physical stores and e-commerce.",
    sort_order: 0,
  },
  {
    name: "Target",
    icon: "building-store",
    color: "#DC2626",
    background_tint: "#FEF2F2",
    tag_text_color: "#B91C1C",
    market_cap_value: 70.11,
    market_cap_unit: "B",
    relative_size: 17,
    tag: "Mass Retail",
    relationship:
      "Large U.S. retailer competing with Costco for consumer spending across groceries, household products, electronics, apparel, and other merchandise.",
    sort_order: 1,
  },
  {
    name: "Kroger",
    icon: "building-store",
    color: "#2563EB",
    background_tint: "#EFF6FF",
    tag_text_color: "#1D4ED8",
    market_cap_value: 34.50,
    market_cap_unit: "B",
    relative_size: 8,
    tag: "Grocery Retail",
    relationship:
      "Large grocery retailer that provides a comparison for Costco's food, grocery, and everyday-consumer retail exposure.",
    sort_order: 2,
  },
  {
    name: "BJ's Wholesale Club",
    icon: "building-store",
    color: "#15803D",
    background_tint: "#F0FDF4",
    tag_text_color: "#166534",
    market_cap_value: 12.08,
    market_cap_unit: "B",
    relative_size: 3,
    tag: "Warehouse Club",
    relationship:
      "Membership warehouse retailer with a business model that is more directly comparable to Costco's warehouse-club format.",
    sort_order: 3,
  },
];

const costcoSeed: SeedCompany = {
  company: costcoCompany,
  segments: costcoSegments,
  competitors: costcoCompetitors,
};
const eliLillyCompany = {
  slug: "eli-lilly",
  name: "Eli Lilly and Company",
  brand_name: "Eli Lilly",
  ticker: "LLY",
  exchange: "NYSE",
  industry: "Healthcare",
  revenue_basis: "segment",
  logo_initial: "L",
  logo: "/logos/eli-lilly-and-company.svg",

  tagline:
    "Discovers, develops, manufactures, and markets medicines for major health conditions including diabetes, obesity, cancer, immunological diseases, and neurological disorders.",

  what_it_does:
    "Eli Lilly is a pharmaceutical company that researches, develops, manufactures, and sells medicines around the world. Its products address areas such as diabetes and obesity, cancer, immune diseases, and neurological conditions. Lilly invests heavily in research and development to create new medicines and expand existing treatments.",

  founded: "1876",
  headquarters: "Indianapolis, Indiana",
  ceo: "David A. Ricks",
  ceo_since: "2017",

  scope_score: 9.0,
  scope_score_label: "Excellent",

  snapshot: [
    {
      icon: "shield-check",
      tone: "good",
      label: "Quality",
      rating: { kind: "stars", outOf: 5, value: 5 },
    },
    {
      icon: "building-store",
      tone: "good",
      label: "Scale",
      rating: { kind: "stars", outOf: 5, value: 5 },
    },
    {
      icon: "coin",
      tone: "good",
      label: "Profitability",
      rating: { kind: "stars", outOf: 4, value: 4 },
    },
    {
      icon: "trending-up",
      tone: "good",
      label: "Revenue growth",
      rating: { kind: "arrow", label: "Strong" },
    },
    {
      icon: "alert-triangle",
      tone: "risk",
      label: "Risk",
      rating: { kind: "badge", label: "High" },
    },
    {
      icon: "scale",
      tone: "neutral",
      label: "Valuation",
      rating: { kind: "badge", label: "Premium" },
    },
  ],

  thirty_second_summary: {
    subtitle: "A plain-English explanation of Eli Lilly's business model",
    content:
      "Eli Lilly develops medicines and then earns revenue when healthcare systems, pharmacies, patients, and other customers purchase those medicines. The company invests heavily in research and development to discover new treatments, while successful medicines can generate significant revenue for many years. Today, Lilly's business is strongly influenced by its cardiometabolic medicines, including Mounjaro and Zepbound, alongside products in oncology, immunology, and neuroscience.",
  },

  business_model: {
    stages: [
      {
        icon: "flask",
        tags: [
          { icon: "flask", label: "Research" },
          { icon: "users", label: "Clinical Trials" },
          { icon: "chart-line", label: "Drug Development" },
          { icon: "shield-check", label: "Regulatory Approval" },
        ],
        color: "#7C3AED",
        title: "Discover New Medicines",
        tagTextColor: "#6D28D9",
        backgroundTint: "#F5F3FF",
      },
      {
        icon: "package",
        tags: [
          { icon: "building-store", label: "Manufacturing" },
          { icon: "package", label: "Medicines" },
          { icon: "truck", label: "Distribution" },
          { icon: "world", label: "Global Markets" },
        ],
        color: "#2563EB",
        title: "Manufacture & Deliver",
        tagTextColor: "#1D4ED8",
        backgroundTint: "#EFF6FF",
      },
      {
        icon: "coin",
        tags: [
          { icon: "coin", label: "Medicine Sales" },
          { icon: "chart-line", label: "Product Growth" },
          { icon: "flask", label: "New Treatments" },
          { icon: "trending-up", label: "Reinvest in R&D" },
        ],
        color: "#15803D",
        title: "Generate Revenue & Reinvest",
        tagTextColor: "#166534",
        backgroundTint: "#F0FDF4",
      },
    ],

    insight:
      "Lilly's pharmaceutical model requires large upfront investment in research, clinical development, manufacturing, and regulatory approval. When a medicine succeeds, Lilly can generate revenue from sales and use that cash to fund manufacturing expansion, new clinical programs, acquisitions, and additional research.",

    repeatNote:
      "Eli Lilly creates value by discovering and developing medicines, gaining regulatory approval, manufacturing them at scale, selling them globally, and reinvesting the resulting cash into its next generation of treatments.",
  },

  strengths_and_risks: {
    strengths: [
      {
        icon: "flask",
        title: "Strong Research Pipeline",
        description:
          "Lilly invests heavily in research and development and maintains a broad pipeline of medicines across multiple therapeutic areas.",
      },
      {
        icon: "trending-up",
        title: "Fast-Growing Cardiometabolic Portfolio",
        description:
          "Mounjaro and Zepbound have become major sources of revenue growth, driven by strong demand for diabetes and obesity treatments.",
      },
      {
        icon: "building-store",
        title: "Global Commercial Scale",
        description:
          "Lilly markets medicines across many international markets and operates manufacturing and research facilities around the world.",
      },
      {
        icon: "shield-check",
        title: "Established Medicine Portfolio",
        description:
          "The company has a portfolio spanning cardiometabolic health, oncology, immunology, neuroscience, and other therapeutic areas.",
      },
      {
        icon: "coin",
        title: "Strong Cash Generation",
        description:
          "Rapid revenue growth has significantly increased operating cash flow, giving Lilly more resources to invest in manufacturing capacity and research.",
      },
    ],

    risks: [
      {
        icon: "flask",
        title: "Drug Development Risk",
        description:
          "Potential medicines can fail during clinical development or fail to receive regulatory approval after substantial research investment.",
      },
      {
        icon: "shield-check",
        title: "Patent & Competition Risk",
        description:
          "Revenue from medicines can be affected by patent expiration, generic or biosimilar competition, and competing therapies.",
      },
      {
        icon: "users",
        title: "Pricing & Reimbursement Pressure",
        description:
          "Government programs, insurers, pharmacy benefit managers, and healthcare systems can influence medicine pricing and access.",
      },
      {
        icon: "building-store",
        title: "Manufacturing Capacity",
        description:
          "Rapid demand growth requires large investments in manufacturing capacity, and supply constraints can limit the ability to meet demand.",
      },
      {
        icon: "chart-line",
        title: "Product Concentration",
        description:
          "A significant portion of recent growth has come from the cardiometabolic portfolio, increasing the importance of products such as Mounjaro and Zepbound.",
      },
    ],
  },

  financial_overview: {
    insight:
      "Eli Lilly generated $65.179B of revenue and $20.640B of net income in fiscal 2025. Operating cash flow was $16.813B and capital expenditures were $7.841B, producing approximately $8.972B of calculated free cash flow.",

    metrics: [
      {
        icon: "report-money",
        label: "Revenue",
        value: { unit: "B", value: 65.179 },
        change: { value: 44.7 },
        sublabel: "FY25",
      },
      {
        icon: "coin",
        label: "Net Income",
        value: { unit: "B", value: 20.640 },
        change: { value: 94.9 },
        sublabel: "FY25",
      },
      {
        icon: "droplet",
        label: "Free Cash Flow",
        value: { unit: "B", value: 8.972 },
        change: { value: 138.6 },
        sublabel: "FY25",
      },
    ],

    fiscalYearLabel: "Fiscal year 2025 (ended December 31, 2025)",
  },

  financial_history: {
    panels: [
      {
        icon: "report-money",
        unit: "B",
        color: "#C4B5FD",
        label: "Revenue",
        years: ["'21", "'22", "'23", "'24", "'25"],
        values: [28.318, 28.541, 34.124, 45.043, 65.179],
        changeNote: "+130% since FY21",
        highlightColor: "#7C3AED",
        currentValueLabel: "$65.2B",
      },
      {
        icon: "coin",
        unit: "B",
        color: "#86EFAC",
        label: "Net Income",
        years: ["'21", "'22", "'23", "'24", "'25"],
        values: [5.582, 6.245, 5.240, 10.590, 20.640],
        changeNote: "+270% since FY21",
        highlightColor: "#15803D",
        currentValueLabel: "$20.6B",
      },
      {
        icon: "droplet",
        unit: "B",
        color: "#93C5FD",
        label: "Free Cash Flow",
        years: ["'21", "'22", "'23", "'24", "'25"],
        values: [6.056, 5.731, 0.792, 3.760, 8.972],
        changeNote: "+48% since FY21",
        highlightColor: "#2563EB",
        currentValueLabel: "$9.0B",
      },
    ],

    rangeLabel: "5-year trend, fiscal years 2021–2025",
  },

  ecosystem: {
    output: {
      icon: "flask",
      name: "Pharmaceutical Company",
      color: "#7C3AED",
      description:
        "Eli Lilly sits at the center of an ecosystem connecting scientific research, clinical trials, regulators, manufacturing facilities, healthcare providers, patients, distributors, insurers, and pharmaceutical partners.",
      backgroundTint: "#F5F3FF",
    },

    insight:
      "Lilly's pharmaceutical ecosystem connects drug discovery and clinical research with regulatory approval, manufacturing, distribution, healthcare providers, insurers, and patients.",

    partners: [
      {
        icon: "flask",
        name: "Research & Clinical Partners",
        color: "#7C3AED",
        description:
          "Universities, researchers, clinical investigators, biotechnology companies, and research organizations contribute to medicine discovery and development.",
        backgroundTint: "#F5F3FF",
      },
      {
        icon: "shield-check",
        name: "Healthcare System",
        color: "#2563EB",
        description:
          "Healthcare providers, pharmacies, insurers, government programs, and other healthcare organizations influence how Lilly medicines reach patients.",
        backgroundTint: "#EFF6FF",
      },
      {
        icon: "building-store",
        name: "Manufacturing & Distribution",
        color: "#15803D",
        description:
          "Manufacturing facilities, suppliers, distributors, and logistics networks support production and delivery of medicines to global markets.",
        backgroundTint: "#F0FDF4",
      },
    ],

    centerLabel: "Eli Lilly",
    flowInLabel: "← Research & capital",
    flowOutLabel: "Medicines & revenue →",
    centerSublabel: "Global pharmaceutical company",
  },

  overview: {
    ceo: "David A. Ricks",
    founded: "1876",
    revenue: { unit: "B", value: 65.179 },
    ceoSince: "2017",
    marketCap: { unit: "T", value: 1.032 },
    revenueYoY: { value: 44.7 },
    whatItDoes:
      "Eli Lilly discovers, develops, manufactures, and markets medicines for conditions including diabetes, obesity, cancer, immunological diseases, and neurological disorders.",
    headquarters: "Indianapolis, Indiana",
    marketCapRank: "16",
    revenueFiscalYear: "FY25",
  },

  business_segments_insight:
    "Eli Lilly reports one consolidated reportable segment, but its 2025 revenue can be broken down into major therapeutic-area categories disclosed in its financial statements: cardiometabolic health, oncology, immunology, neuroscience, and other.",

  business_segments_footnote:
    "Fiscal year 2025 ended December 31, 2025. Eli Lilly reports a single operating/reportable segment. The categories below are revenue groupings based on product therapeutic areas disclosed by Lilly and are used here to make the company's business easier to understand. Due to rounding, the category amounts total $65.178B versus consolidated revenue of $65.179B.",

  competitors_context_note:
    "Companies used as broad comparison references for large pharmaceutical businesses. Eli Lilly has a diversified medicine portfolio, while each comparison company has different therapeutic strengths and business structures. Market caps use an October 6, 2026 snapshot.",

  competitors_insight:
    "Eli Lilly competes with large pharmaceutical companies across multiple therapeutic areas. Johnson & Johnson, AbbVie, Merck, and Novo Nordisk provide useful comparisons across large-scale pharmaceuticals, immunology, oncology, and cardiometabolic medicines.",
};

const eliLillySegments = [
  {
    name: "Cardiometabolic Health",
    amount_value: 48.221,
    amount_unit: "B",
    percentage: 74,
    yoy_change: 120.0,
    color: "#7C3AED",
    sort_order: 0,
  },
  {
    name: "Oncology",
    amount_value: 9.376,
    amount_unit: "B",
    percentage: 14,
    yoy_change: 5.7,
    color: "#2563EB",
    sort_order: 1,
  },
  {
    name: "Immunology",
    amount_value: 5.247,
    amount_unit: "B",
    percentage: 8,
    yoy_change: 0.4,
    color: "#15803D",
    sort_order: 2,
  },
  {
    name: "Neuroscience",
    amount_value: 1.391,
    amount_unit: "B",
    percentage: 2,
    yoy_change: -5.5,
    color: "#CA8A04",
    sort_order: 3,
  },
  {
    name: "Other",
    amount_value: 0.943,
    amount_unit: "B",
    percentage: 2,
    yoy_change: 3.4,
    color: "#78716C",
    sort_order: 4,
  },
];

const eliLillyCompetitors = [
  {
    name: "Johnson & Johnson",
    icon: "building-store",
    color: "#2563EB",
    background_tint: "#EFF6FF",
    tag_text_color: "#1D4ED8",
    market_cap_value: 609.54,
    market_cap_unit: "B",
    relative_size: 59,
    tag: "Pharmaceuticals",
    relationship:
      "One of the world's largest healthcare companies, providing a broad comparison for Lilly's pharmaceutical scale and global healthcare presence.",
    sort_order: 0,
  },
  {
    name: "AbbVie",
    icon: "shield-check",
    color: "#7C3AED",
    background_tint: "#F5F3FF",
    tag_text_color: "#6D28D9",
    market_cap_value: 471.27,
    market_cap_unit: "B",
    relative_size: 46,
    tag: "Biopharmaceuticals",
    relationship:
      "Large research-based biopharmaceutical company with major businesses in immunology, oncology, neuroscience, and other specialty medicines.",
    sort_order: 1,
  },
  {
    name: "Merck & Co.",
    icon: "flask",
    color: "#0891B2",
    background_tint: "#ECFEFF",
    tag_text_color: "#0E7490",
    market_cap_value: 344.27,
    market_cap_unit: "B",
    relative_size: 33,
    tag: "Pharmaceuticals",
    relationship:
      "Major pharmaceutical company with significant oncology, infectious disease, and other medicine franchises, making it a useful scale and portfolio comparison.",
    sort_order: 2,
  },
  {
    name: "Novo Nordisk",
    icon: "coin",
    color: "#15803D",
    background_tint: "#F0FDF4",
    tag_text_color: "#166534",
    market_cap_value: 163.67,
    market_cap_unit: "B",
    relative_size: 16,
    tag: "Diabetes & Obesity",
    relationship:
      "Pharmaceutical company with a strong focus on diabetes and obesity medicines, making it a particularly relevant comparison for Lilly's cardiometabolic portfolio.",
    sort_order: 3,
  },
];

const eliLillySeed: SeedCompany = {
  company: eliLillyCompany,
  segments: eliLillySegments,
  competitors: eliLillyCompetitors,
};
const johnsonJohnsonCompany = {
  slug: "johnson-johnson",
  name: "Johnson & Johnson",
  brand_name: "Johnson & Johnson",
  ticker: "JNJ",
  exchange: "NYSE",
  industry: "Healthcare",
  revenue_basis: "segment",
  logo_initial: "J",
  logo: "/logos/Johnson___Johnson_Icon_6.png",

  tagline:
    "A global healthcare company focused on innovative medicines and medical technologies that address major health needs.",

  what_it_does:
    "Johnson & Johnson develops and sells prescription medicines and medical technologies used to prevent, diagnose, and treat diseases. Its businesses span Innovative Medicine and MedTech, with major areas including oncology, immunology, neuroscience, cardiovascular care, surgery, orthopaedics, and vision.",

  founded: "1886",
  headquarters: "New Brunswick, New Jersey",
  ceo: "Joaquin Duato",
  ceo_since: "2022",

  scope_score: 9.0,
  scope_score_label: "Excellent",

  snapshot: [
    {
      icon: "shield-check",
      tone: "good",
      label: "Quality",
      rating: { kind: "stars", outOf: 5, value: 5 },
    },
    {
      icon: "building-store",
      tone: "good",
      label: "Scale",
      rating: { kind: "stars", outOf: 5, value: 5 },
    },
    {
      icon: "coin",
      tone: "good",
      label: "Profitability",
      rating: { kind: "stars", outOf: 4, value: 4 },
    },
    {
      icon: "trending-up",
      tone: "good",
      label: "Revenue growth",
      rating: { kind: "arrow", label: "Stable" },
    },
    {
      icon: "alert-triangle",
      tone: "risk",
      label: "Risk",
      rating: { kind: "badge", label: "Medium" },
    },
    {
      icon: "scale",
      tone: "neutral",
      label: "Valuation",
      rating: { kind: "badge", label: "Moderate" },
    },
  ],

  thirty_second_summary: {
    subtitle: "A plain-English explanation of Johnson & Johnson's business model",
    content:
      "Johnson & Johnson operates two major healthcare businesses: Innovative Medicine and MedTech. Innovative Medicine develops and sells prescription medicines, while MedTech develops devices and technologies used in areas such as surgery, cardiovascular care, orthopaedics, and vision. The company earns revenue by selling these medicines and medical technologies to healthcare systems, providers, distributors, and other customers around the world.",
  },

  business_model: {
    stages: [
      {
        icon: "flask",
        tags: [
          { icon: "flask", label: "Research" },
          { icon: "shield-check", label: "Medicines" },
          { icon: "users", label: "Clinical Science" },
          { icon: "chart-line", label: "Innovation" },
        ],
        color: "#2563EB",
        title: "Develop Healthcare Solutions",
        tagTextColor: "#1D4ED8",
        backgroundTint: "#EFF6FF",
      },
      {
        icon: "package",
        tags: [
          { icon: "coin", label: "Pharmaceuticals" },
          { icon: "building-store", label: "Medical Devices" },
          { icon: "truck", label: "Distribution" },
          { icon: "world", label: "Global Markets" },
        ],
        color: "#0891B2",
        title: "Manufacture & Deliver",
        tagTextColor: "#0E7490",
        backgroundTint: "#ECFEFF",
      },
      {
        icon: "coin",
        tags: [
          { icon: "coin", label: "Product Sales" },
          { icon: "chart-line", label: "New Products" },
          { icon: "flask", label: "R&D" },
          { icon: "trending-up", label: "Portfolio Growth" },
        ],
        color: "#15803D",
        title: "Generate Revenue & Reinvest",
        tagTextColor: "#166534",
        backgroundTint: "#F0FDF4",
      },
    ],

    insight:
      "Johnson & Johnson combines a pharmaceutical business with a medical-technology business. It invests in scientific research and product development, commercializes successful medicines and technologies, and uses the resulting revenue and cash flow to fund research, manufacturing capacity, acquisitions, and new products.",

    repeatNote:
      "Johnson & Johnson creates value by developing medicines and medical technologies, bringing them through regulatory and commercial processes, selling them globally, and reinvesting cash into its healthcare portfolio.",
  },

  strengths_and_risks: {
    strengths: [
      {
        icon: "building-store",
        title: "Diversified Healthcare Business",
        description:
          "Johnson & Johnson combines Innovative Medicine and MedTech, giving the company exposure to both pharmaceutical products and medical technologies.",
      },
      {
        icon: "flask",
        title: "Large Research Platform",
        description:
          "The company invests heavily in research and development across multiple areas of significant medical need.",
      },
      {
        icon: "shield-check",
        title: "Strong Medicine Portfolio",
        description:
          "Innovative Medicine has major franchises across oncology, immunology, neuroscience, and other therapeutic areas.",
      },
      {
        icon: "building-store",
        title: "Global MedTech Scale",
        description:
          "J&J MedTech provides technologies across cardiovascular care, orthopaedics, surgery, and vision.",
      },
      {
        icon: "coin",
        title: "Strong Cash Generation",
        description:
          "The company generated $24.530B of operating cash flow in FY2025 and approximately $19.698B of calculated free cash flow.",
      },
    ],

    risks: [
      {
        icon: "flask",
        title: "Drug Development Risk",
        description:
          "Potential medicines can fail during clinical development or face regulatory setbacks after substantial research investment.",
      },
      {
        icon: "shield-check",
        title: "Patent & Competition Risk",
        description:
          "Pharmaceutical revenue can be affected by patent expiration, generic competition, biosimilars, and competing treatments.",
      },
      {
        icon: "users",
        title: "Pricing & Reimbursement Pressure",
        description:
          "Governments, insurers, healthcare systems, and other payers can influence medicine pricing, reimbursement, and patient access.",
      },
      {
        icon: "building-store",
        title: "MedTech Competition",
        description:
          "Medical technology markets are highly competitive and require continued innovation, regulatory approvals, and investment.",
      },
      {
        icon: "chart-line",
        title: "Product Concentration",
        description:
          "Large individual products and franchises can have a meaningful effect on results when facing competition, patent changes, or shifts in treatment standards.",
      },
    ],
  },

  financial_overview: {
    insight:
      "Johnson & Johnson generated $94.193B of reported sales and $26.804B of net earnings in fiscal 2025. Operating cash flow was $24.530B and additions to property, plant and equipment were $4.832B, producing approximately $19.698B of free cash flow.",

    metrics: [
      {
        icon: "report-money",
        label: "Revenue",
        value: { unit: "B", value: 94.193 },
        change: { value: 6.0 },
        sublabel: "FY25",
      },
      {
        icon: "coin",
        label: "Net Income",
        value: { unit: "B", value: 26.804 },
        change: { value: 90.6 },
        sublabel: "FY25",
      },
      {
        icon: "droplet",
        label: "Free Cash Flow",
        value: { unit: "B", value: 19.698 },
        change: { value: -0.7 },
        sublabel: "FY25",
      },
    ],

    fiscalYearLabel: "Fiscal year 2025 (ended December 28, 2025)",
  },

  financial_history: {
    panels: [
      {
        icon: "report-money",
        unit: "B",
        color: "#93C5FD",
        label: "Revenue",
        years: ["'21", "'22", "'23", "'24", "'25"],
        values: [93.775, 94.943, 85.159, 88.821, 94.193],
        changeNote: "About flat since FY21; 2023 reflects the Kenvue separation",
        highlightColor: "#2563EB",
        currentValueLabel: "$94.2B",
      },
      {
        icon: "coin",
        unit: "B",
        color: "#86EFAC",
        label: "Net Income",
        years: ["'21", "'22", "'23", "'24", "'25"],
        values: [20.878, 17.941, 35.153, 14.066, 26.804],
        changeNote: "+28% since FY21; affected by separation-related and other special items",
        highlightColor: "#15803D",
        currentValueLabel: "$26.8B",
      },
      {
        icon: "droplet",
        unit: "B",
        color: "#C4B5FD",
        label: "Free Cash Flow",
        years: ["'21", "'22", "'23", "'24", "'25"],
        values: [19.758, 17.185, 18.248, 19.842, 19.698],
        changeNote: "About flat since FY21",
        highlightColor: "#7C3AED",
        currentValueLabel: "$19.7B",
      },
    ],

    rangeLabel:
      "5-year reported trend, fiscal years 2021–2025; 2023 reflects the Kenvue separation period",
  },

  ecosystem: {
    output: {
      icon: "building-store",
      name: "Global Healthcare Company",
      color: "#2563EB",
      description:
        "Johnson & Johnson sits at the center of a healthcare ecosystem connecting pharmaceutical research, medical technology, manufacturing, healthcare providers, hospitals, distributors, insurers, and patients.",
      backgroundTint: "#EFF6FF",
    },

    insight:
      "Johnson & Johnson connects scientific research and product development with pharmaceutical medicines, medical technologies, healthcare providers, hospitals, distributors, and patients around the world.",

    partners: [
      {
        icon: "flask",
        name: "Research & Clinical Partners",
        color: "#7C3AED",
        description:
          "Researchers, universities, clinical investigators, and scientific organizations contribute to medicine and medical-technology development.",
        backgroundTint: "#F5F3FF",
      },
      {
        icon: "shield-check",
        name: "Healthcare Providers",
        color: "#2563EB",
        description:
          "Hospitals, physicians, surgeons, clinics, and other healthcare professionals use J&J medicines and medical technologies in patient care.",
        backgroundTint: "#EFF6FF",
      },
      {
        icon: "truck",
        name: "Manufacturing & Distribution",
        color: "#15803D",
        description:
          "Manufacturing facilities, suppliers, distributors, and logistics networks help deliver medicines and medical technologies to global markets.",
        backgroundTint: "#F0FDF4",
      },
    ],

    centerLabel: "Johnson & Johnson",
    flowInLabel: "← Research & capital",
    flowOutLabel: "Medicines & technology →",
    centerSublabel: "Global healthcare company",
  },

  overview: {
    ceo: "Joaquin Duato",
    founded: "1886",
    revenue: { unit: "B", value: 94.193 },
    ceoSince: "2022",
    marketCap: { unit: "B", value: 613.99 },
    revenueYoY: { value: 6.0 },
    whatItDoes:
      "Johnson & Johnson develops and sells innovative medicines and medical technologies across major healthcare areas including oncology, immunology, neuroscience, cardiovascular care, surgery, orthopaedics, and vision.",
    headquarters: "New Brunswick, New Jersey",
    marketCapRank: "24",
    revenueFiscalYear: "FY25",
  },

  business_segments_insight:
    "Johnson & Johnson operates through two major reportable segments: Innovative Medicine and MedTech. Together they generated $94.193B of worldwide sales in fiscal 2025.",

  business_segments_footnote:
    "Fiscal year 2025 ended December 28, 2025. Innovative Medicine generated $60.401B and MedTech generated $33.792B of worldwide sales. Percentages below are calculated against total reported sales of $94.193B.",

  competitors_context_note:
    "Companies used as broad comparison references for Johnson & Johnson's pharmaceutical and medical-technology businesses. Because J&J combines both areas, no single company is a perfect one-to-one competitor. Market caps use an October 6, 2026 snapshot.",

  competitors_insight:
    "Johnson & Johnson competes with large pharmaceutical companies and medical-technology companies. Merck and Pfizer provide pharmaceutical comparisons, while Abbott and Medtronic provide useful comparisons for medical technology and diversified healthcare products.",
};

const johnsonJohnsonSegments = [
  {
    name: "Innovative Medicine",
    amount_value: 60.401,
    amount_unit: "B",
    percentage: 64,
    yoy_change: 6.0,
    color: "#2563EB",
    sort_order: 0,
  },
  {
    name: "MedTech",
    amount_value: 33.792,
    amount_unit: "B",
    percentage: 36,
    yoy_change: 6.1,
    color: "#0891B2",
    sort_order: 1,
  },
];

const johnsonJohnsonCompetitors = [
  {
    name: "Merck & Co.",
    icon: "flask",
    color: "#7C3AED",
    background_tint: "#F5F3FF",
    tag_text_color: "#6D28D9",
    market_cap_value: 350.19,
    market_cap_unit: "B",
    relative_size: 57,
    tag: "Pharmaceuticals",
    relationship:
      "Large pharmaceutical company with major businesses in oncology and other therapeutic areas, providing a useful comparison for J&J's Innovative Medicine business.",
    sort_order: 0,
  },
  {
    name: "Pfizer",
    icon: "flask",
    color: "#2563EB",
    background_tint: "#EFF6FF",
    tag_text_color: "#1D4ED8",
    market_cap_value: 156.74,
    market_cap_unit: "B",
    relative_size: 26,
    tag: "Pharmaceuticals",
    relationship:
      "Global pharmaceutical company with a broad portfolio of prescription medicines and vaccines, providing a comparison for J&J's medicine business.",
    sort_order: 1,
  },
  {
    name: "Abbott Laboratories",
    icon: "building-store",
    color: "#15803D",
    background_tint: "#F0FDF4",
    tag_text_color: "#166534",
    market_cap_value: 169.85,
    market_cap_unit: "B",
    relative_size: 28,
    tag: "Healthcare & MedTech",
    relationship:
      "Diversified healthcare company with medical devices, diagnostics, nutrition, and established pharmaceutical products, making it a useful comparison for J&J's diversified healthcare model.",
    sort_order: 2,
  },
  {
    name: "Medtronic",
    icon: "building-store",
    color: "#0891B2",
    background_tint: "#ECFEFF",
    tag_text_color: "#0E7490",
    market_cap_value: 111.40,
    market_cap_unit: "B",
    relative_size: 18,
    tag: "Medical Technology",
    relationship:
      "Large medical-technology company focused on device-based therapies, providing a direct comparison for J&J MedTech.",
    sort_order: 3,
  },
];

const johnsonJohnsonSeed: SeedCompany = {
  company: johnsonJohnsonCompany,
  segments: johnsonJohnsonSegments,
  competitors: johnsonJohnsonCompetitors,
};
const unitedHealthGroupCompany = {
  slug: "unitedhealth-group",
  name: "UnitedHealth Group Incorporated",
  brand_name: "UnitedHealth Group",
  ticker: "UNH",
  exchange: "NYSE",
  industry: "Healthcare",
  revenue_basis: "segment",
  logo_initial: "U",
  logo: "/logos/unitedhealthgroup-icon.svg",

  tagline:
    "A diversified healthcare company combining health insurance with healthcare services, pharmacy, technology, and data solutions.",

  what_it_does:
    "UnitedHealth Group provides health insurance and a broad range of healthcare services through two major businesses: UnitedHealthcare and Optum. UnitedHealthcare provides health benefit plans and services, while Optum provides healthcare delivery, pharmacy services, healthcare technology, data, analytics, and related services.",

  founded: "1977",
  headquarters: "Eden Prairie, Minnesota",
  ceo: "Stephen J. Hemsley",
  ceo_since: "2025",

  scope_score: 8.5,
  scope_score_label: "Strong",

  snapshot: [
    {
      icon: "shield-check",
      tone: "good",
      label: "Quality",
      rating: { kind: "stars", outOf: 5, value: 4 },
    },
    {
      icon: "building-store",
      tone: "good",
      label: "Scale",
      rating: { kind: "stars", outOf: 5, value: 5 },
    },
    {
      icon: "coin",
      tone: "good",
      label: "Profitability",
      rating: { kind: "stars", outOf: 4, value: 3 },
    },
    {
      icon: "trending-up",
      tone: "neutral",
      label: "Revenue growth",
      rating: { kind: "arrow", label: "Moderate" },
    },
    {
      icon: "alert-triangle",
      tone: "risk",
      label: "Risk",
      rating: { kind: "badge", label: "High" },
    },
    {
      icon: "scale",
      tone: "neutral",
      label: "Valuation",
      rating: { kind: "badge", label: "Moderate" },
    },
  ],

  thirty_second_summary: {
    subtitle: "A plain-English explanation of UnitedHealth Group's business model",
    content:
      "UnitedHealth Group combines health insurance with healthcare services. UnitedHealthcare provides health benefit plans for employers, individuals, Medicare and Medicaid beneficiaries, while Optum provides healthcare delivery, pharmacy services, healthcare technology, data, analytics, and related services. The company earns revenue primarily from insurance premiums and from products and services provided across its Optum businesses.",
  },

  business_model: {
    stages: [
      {
        icon: "shield-check",
        tags: [
          { icon: "shield-check", label: "Health Insurance" },
          { icon: "users", label: "Members" },
          { icon: "building-store", label: "Employers" },
          { icon: "building-store", label: "Government Programs" },
        ],
        color: "#2563EB",
        title: "Provide Health Coverage",
        tagTextColor: "#1D4ED8",
        backgroundTint: "#EFF6FF",
      },
      {
  icon: "user",
  tags: [
    { icon: "user", label: "Care Delivery" },
    { icon: "pill", label: "Pharmacy" },
    { icon: "chart-line", label: "Data & Analytics" },
    { icon: "bulb", label: "Healthcare Technology" },
  ],
        color: "#0891B2",
        title: "Deliver Healthcare Services",
        tagTextColor: "#0E7490",
        backgroundTint: "#ECFEFF",
      },
      {
        icon: "coin",
        tags: [
          { icon: "coin", label: "Premiums" },
          { icon: "building-store", label: "Healthcare Services" },
          { icon: "pill", label: "Pharmacy Services" },
          { icon: "chart-line", label: "Reinvestment" },
        ],
        color: "#15803D",
        title: "Generate Revenue & Reinvest",
        tagTextColor: "#166534",
        backgroundTint: "#F0FDF4",
      },
    ],

    insight:
      "UnitedHealth Group combines an insurance business with a large healthcare-services platform. UnitedHealthcare collects premiums and manages health benefits, while Optum provides care delivery, pharmacy services, healthcare technology, data, and analytics. The combination allows the company to participate in multiple parts of the healthcare system and use information and operational capabilities across its businesses.",

    repeatNote:
      "UnitedHealth Group creates value by providing health coverage, delivering and coordinating healthcare services, managing pharmacy services, and using technology and data to support patients, providers, employers, and other healthcare organizations.",
  },

  strengths_and_risks: {
    strengths: [
      {
        icon: "building-store",
        title: "Massive Healthcare Scale",
        description:
          "UnitedHealth Group operates one of the largest healthcare businesses in the United States, combining insurance coverage with healthcare services across a large customer and provider ecosystem.",
      },
      {
        icon: "shield-check",
        title: "Diversified Business Model",
        description:
          "The company combines UnitedHealthcare with Optum businesses spanning care delivery, pharmacy services, technology, data, and analytics.",
      },
      {
        icon: "users",
        title: "Large Customer Base",
        description:
          "UnitedHealthcare served approximately 49.8 million people in 2025, providing significant scale across employer, individual, Medicare, and other healthcare markets.",
      },
      {
        icon: "chart-line",
        title: "Healthcare Data & Technology",
        description:
          "Optum Insight provides healthcare information, technology, analytics, and related services that support providers, payers, and other organizations across the healthcare system.",
      },
      {
        icon: "coin",
        title: "Strong Cash Generation",
        description:
          "UnitedHealth Group generated $19.697B of operating cash flow in FY2025 and approximately $16.075B of calculated free cash flow.",
      },
    ],

    risks: [
      {
        icon: "heart-pulse",
        title: "Medical Cost Pressure",
        description:
          "Higher medical utilization and healthcare costs can pressure margins when medical expenses rise faster than pricing and reimbursement.",
      },
      {
        icon: "building-store",
        title: "Government Reimbursement Risk",
        description:
          "UnitedHealthcare participates heavily in Medicare, Medicaid, and other government-supported healthcare programs, making reimbursement and policy changes important to its financial performance.",
      },
      {
        icon: "alert-triangle",
        title: "Regulatory Complexity",
        description:
          "Health insurance, pharmacy services, healthcare delivery, and data businesses operate under extensive regulation across multiple jurisdictions.",
      },
      {
        icon: "shield-check",
        title: "Cybersecurity & Data Risk",
        description:
          "The company's large healthcare technology and data infrastructure creates exposure to cybersecurity incidents, operational disruption, and data-related risks.",
      },
      {
        icon: "chart-line",
        title: "Profitability Volatility",
        description:
          "Operating earnings can change significantly when medical costs, reimbursement rates, business exits, restructuring, or other major operating factors shift.",
      },
    ],
  },

  financial_overview: {
    insight:
      "UnitedHealth Group generated $447.567B of revenue and $12.056B of net earnings attributable to UnitedHealth Group common shareholders in fiscal 2025. Operating cash flow was $19.697B and purchases of property, equipment and capitalized software were $3.622B, producing approximately $16.075B of calculated free cash flow.",

    metrics: [
      {
        icon: "report-money",
        label: "Revenue",
        value: { unit: "B", value: 447.567 },
        change: { value: 11.8 },
        sublabel: "FY25",
      },
      {
        icon: "coin",
        label: "Net Income",
        value: { unit: "B", value: 12.056 },
        change: { value: -16.3 },
        sublabel: "FY25",
      },
      {
        icon: "droplet",
        label: "Free Cash Flow",
        value: { unit: "B", value: 16.075 },
        change: { value: -22.4 },
        sublabel: "FY25",
      },
    ],

    fiscalYearLabel: "Fiscal year 2025 (ended December 31, 2025)",
  },

  financial_history: {
    panels: [
      {
        icon: "report-money",
        unit: "B",
        color: "#93C5FD",
        label: "Revenue",
        years: ["'21", "'22", "'23", "'24", "'25"],
        values: [287.597, 324.162, 371.622, 400.278, 447.567],
        changeNote: "+56% since FY21",
        highlightColor: "#2563EB",
        currentValueLabel: "$447.6B",
      },
      {
        icon: "coin",
        unit: "B",
        color: "#86EFAC",
        label: "Net Income",
        years: ["'21", "'22", "'23", "'24", "'25"],
        values: [17.285, 20.120, 22.381, 14.405, 12.056],
        changeNote: "-30% since FY21; FY25 earnings were affected by special charges",
        highlightColor: "#15803D",
        currentValueLabel: "$12.1B",
      },
      {
        icon: "droplet",
        unit: "B",
        color: "#C4B5FD",
        label: "Free Cash Flow",
        years: ["'21", "'22", "'23", "'24", "'25"],
        values: [19.889, 23.404, 25.682, 20.705, 16.075],
        changeNote: "-19% since FY21",
        highlightColor: "#7C3AED",
        currentValueLabel: "$16.1B",
      },
    ],

    rangeLabel:
      "5-year reported trend, fiscal years 2021–2025; free cash flow is calculated as operating cash flow less purchases of property, equipment and capitalized software",
  },

  ecosystem: {
    output: {
      icon: "building-store",
      name: "Integrated Healthcare Platform",
      color: "#2563EB",
      description:
        "UnitedHealth Group connects health insurance, healthcare providers, pharmacies, employers, government programs, technology, data, and patients across a large healthcare ecosystem.",
      backgroundTint: "#EFF6FF",
    },

    insight:
      "UnitedHealth Group sits across multiple parts of the healthcare system, connecting insurance coverage with care delivery, pharmacy services, healthcare technology, data, providers, employers, government programs, and consumers.",

    partners: [
      {
        icon: "building-store",
        name: "Healthcare Providers",
        color: "#2563EB",
        description:
          "Doctors, hospitals, clinics, and other healthcare providers deliver care to people covered by UnitedHealthcare and supported by Optum services.",
        backgroundTint: "#EFF6FF",
      },
      {
        icon: "pill",
        name: "Pharmacy Network",
        color: "#7C3AED",
        description:
          "Pharmacies, pharmaceutical manufacturers, and healthcare organizations interact with Optum Rx across prescription drug services and pharmacy benefit management.",
        backgroundTint: "#F5F3FF",
      },
      {
        icon: "building-store",
        name: "Employers & Organizations",
        color: "#15803D",
        description:
          "Employers and other organizations purchase health benefit products and services and use healthcare solutions provided across UnitedHealth Group.",
        backgroundTint: "#F0FDF4",
      },
    ],

    centerLabel: "UnitedHealth Group",
    flowInLabel: "← Premiums, data & healthcare demand",
    flowOutLabel: "Healthcare coverage & services →",
    centerSublabel: "Integrated healthcare platform",
  },

  overview: {
    ceo: "Stephen J. Hemsley",
    founded: "1977",
    revenue: { unit: "B", value: 447.567 },
    ceoSince: "2025",
    marketCap: { unit: "B", value: 337.78 },
    revenueYoY: { value: 11.8 },
    whatItDoes:
      "UnitedHealth Group provides health insurance and healthcare services through UnitedHealthcare and Optum, covering health benefits, care delivery, pharmacy services, healthcare technology, data, analytics, and related services.",
    headquarters: "Eden Prairie, Minnesota",
    marketCapRank: "41",
    revenueFiscalYear: "FY25",
  },

  business_segments_insight:
    "UnitedHealth Group has four reportable segments: UnitedHealthcare, Optum Health, Optum Insight, and Optum Rx. These businesses generated $621.003B of combined segment revenue in FY2025 before internal eliminations.",

  business_segments_footnote:
    "Fiscal year 2025 ended December 31, 2025. Segment percentages below are calculated against the sum of the four reportable segment revenues ($621.003B), before intersegment eliminations. Consolidated revenue was $447.567B.",

  competitors_context_note:
    "Companies used as broad comparison references for UnitedHealth Group's health insurance and healthcare-services businesses. Because UnitedHealth Group combines insurance, pharmacy, care delivery, technology, and data businesses, no single company is a perfect one-to-one competitor. Market caps use an October 6, 2026 snapshot where available.",

  competitors_insight:
    "UnitedHealth Group competes with large health insurance and healthcare-services companies. Elevance Health, CVS Health, and The Cigna Group provide broad comparisons across health benefits and healthcare services, while Humana provides a more focused comparison in government-sponsored and senior healthcare markets.",
};

const unitedHealthGroupSegments = [
  {
    name: "UnitedHealthcare",
    amount_value: 344.903,
    amount_unit: "B",
    percentage: 56,
    yoy_change: 16.0,
    color: "#2563EB",
    sort_order: 0,
  },
  {
    name: "Optum Health",
    amount_value: 101.957,
    amount_unit: "B",
    percentage: 16,
    yoy_change: -3.0,
    color: "#0891B2",
    sort_order: 1,
  },
  {
    name: "Optum Insight",
    amount_value: 19.417,
    amount_unit: "B",
    percentage: 3,
    yoy_change: 4.0,
    color: "#7C3AED",
    sort_order: 2,
  },
  {
    name: "Optum Rx",
    amount_value: 154.726,
    amount_unit: "B",
    percentage: 25,
    yoy_change: 16.0,
    color: "#15803D",
    sort_order: 3,
  },
];

const unitedHealthGroupCompetitors = [
  {
    name: "Elevance Health",
    icon: "shield-check",
    color: "#7C3AED",
    background_tint: "#F5F3FF",
    tag_text_color: "#6D28D9",
    market_cap_value: 86.77,
    market_cap_unit: "B",
    relative_size: 26,
    tag: "Health Insurance",
    relationship:
      "Large U.S. health benefits company with commercial, Medicare, Medicaid, pharmacy, and healthcare-services businesses, providing a broad comparison for UnitedHealthcare.",
    sort_order: 0,
  },
  {
    name: "CVS Health",
    icon: "pill",
    color: "#2563EB",
    background_tint: "#EFF6FF",
    tag_text_color: "#1D4ED8",
    market_cap_value: 111.28,
    market_cap_unit: "B",
    relative_size: 33,
    tag: "Healthcare & Pharmacy",
    relationship:
      "Diversified healthcare company combining Aetna health insurance, pharmacy services, and healthcare delivery, making it a useful comparison for UnitedHealth Group's integrated model.",
    sort_order: 1,
  },
  {
    name: "The Cigna Group",
    icon: "shield-check",
    color: "#15803D",
    background_tint: "#F0FDF4",
    tag_text_color: "#166534",
    market_cap_value: 71.69,
    market_cap_unit: "B",
    relative_size: 21,
    tag: "Health Services",
    relationship:
      "Healthcare services company with insurance and pharmacy-related businesses, providing a comparison for UnitedHealth Group's health benefits and pharmacy operations.",
    sort_order: 2,
  },
  {
    name: "Humana",
    icon: "users",
    color: "#0891B2",
    background_tint: "#ECFEFF",
    tag_text_color: "#0E7490",
    market_cap_value: 48.52,
    market_cap_unit: "B",
    relative_size: 14,
    tag: "Medicare & Healthcare",
    relationship:
      "Healthcare company with a strong focus on Medicare and senior-focused healthcare services, making it a useful comparison for UnitedHealthcare's government-sponsored business.",
    sort_order: 3,
  },
];

const unitedHealthGroupSeed: SeedCompany = {
  company: unitedHealthGroupCompany,
  segments: unitedHealthGroupSegments,
  competitors: unitedHealthGroupCompetitors,
};
const exxonMobilCompany = {
  slug: "exxon-mobil",
  name: "Exxon Mobil Corporation",
  brand_name: "ExxonMobil",
  ticker: "XOM",
  exchange: "NYSE",
  industry: "Energy",
  revenue_basis: "segment",
  logo_initial: "E",
  logo: "/logos/exxon-5.svg",

  tagline:
    "A global integrated energy and petrochemical company involved in oil and gas production, fuels, chemicals, specialty products, and lower-emission technologies.",

  what_it_does:
    "ExxonMobil explores for and produces crude oil and natural gas, refines and sells fuels and other petroleum products, manufactures chemicals and specialty products, and develops lower-emission technologies and businesses such as carbon capture, hydrogen, ammonia, and lithium.",

  founded: "1870",
  headquarters: "Spring, Texas",
  ceo: "Darren Woods",
  ceo_since: "2017",

  scope_score: 8.5,
  scope_score_label: "Strong",

  snapshot: [
    {
      icon: "shield-check",
      tone: "good",
      label: "Quality",
      rating: { kind: "stars", outOf: 5, value: 4 },
    },
    {
      icon: "building-store",
      tone: "good",
      label: "Scale",
      rating: { kind: "stars", outOf: 5, value: 5 },
    },
    {
      icon: "coin",
      tone: "good",
      label: "Profitability",
      rating: { kind: "stars", outOf: 4, value: 4 },
    },
    {
      icon: "trending-up",
      tone: "neutral",
      label: "Revenue growth",
      rating: { kind: "arrow", label: "Cyclical" },
    },
    {
      icon: "alert-triangle",
      tone: "risk",
      label: "Risk",
      rating: { kind: "badge", label: "High" },
    },
    {
      icon: "scale",
      tone: "neutral",
      label: "Valuation",
      rating: { kind: "badge", label: "Moderate" },
    },
  ],

  thirty_second_summary: {
    subtitle: "A plain-English explanation of ExxonMobil's business model",
    content:
      "ExxonMobil is an integrated energy company. It finds and produces oil and natural gas, processes energy commodities into fuels and other products, and manufactures chemicals and specialty products. The company earns revenue by selling these products around the world and reinvests cash into production, refining, chemical facilities, technology, and new energy opportunities.",
  },

  business_model: {
    stages: [
      {
        icon: "search",
        tags: [
          { icon: "search", label: "Exploration" },
          { icon: "droplet", label: "Oil & Gas" },
          { icon: "globe", label: "Global Assets" },
          { icon: "chart-line", label: "Production" },
        ],
        color: "#2563EB",
        title: "Find & Produce Energy",
        tagTextColor: "#1D4ED8",
        backgroundTint: "#EFF6FF",
      },
      {
        icon: "building-store",
        tags: [
          { icon: "building-store", label: "Refining" },
          { icon: "building-store", label: "Fuels" },
          { icon: "flask", label: "Chemicals" },
          { icon: "package", label: "Specialty Products" },
        ],
        color: "#0891B2",
        title: "Process & Manufacture",
        tagTextColor: "#0E7490",
        backgroundTint: "#ECFEFF",
      },
      {
        icon: "coin",
        tags: [
          { icon: "coin", label: "Product Sales" },
          { icon: "globe", label: "Global Markets" },
          { icon: "chart-line", label: "Cash Flow" },
          { icon: "trending-up", label: "Reinvestment" },
        ],
        color: "#15803D",
        title: "Sell Products & Reinvest",
        tagTextColor: "#166534",
        backgroundTint: "#F0FDF4",
      },
    ],

    insight:
      "ExxonMobil's integrated model connects upstream oil and gas production with refining, fuels, chemicals, and specialty products. This allows the company to participate in multiple stages of the energy value chain and direct capital toward the businesses and projects with the strongest economics.",

    repeatNote:
      "ExxonMobil creates value by finding and producing energy resources, processing them into fuels and other products, selling those products globally, and reinvesting cash into new production, manufacturing capacity, technology, and lower-emission opportunities.",
  },

  strengths_and_risks: {
    strengths: [
      {
        icon: "building-store",
        title: "Massive Global Scale",
        description:
          "ExxonMobil operates across the energy and petrochemical value chain with a large global production, refining, chemical, and specialty-products footprint.",
      },
      {
        icon: "link",
        title: "Integrated Business Model",
        description:
          "The company combines oil and gas production with refining, fuels, chemicals, and specialty products, allowing multiple businesses to operate across the energy value chain.",
      },
      {
        icon: "droplet",
        title: "Advantaged Production Assets",
        description:
          "ExxonMobil has major production positions in areas including the Permian Basin and Guyana, which contributed to record production in 2025.",
      },
      {
        icon: "building-store",
        title: "Diversified Product Portfolio",
        description:
          "Beyond crude oil and natural gas, ExxonMobil produces fuels, lubricants, chemicals, polymers, specialty products, and other materials used throughout the economy.",
      },
      {
        icon: "coin",
        title: "Strong Cash Generation",
        description:
          "ExxonMobil generated $51.970B of operating cash flow in FY2025 and approximately $23.612B of calculated free cash flow using operating cash flow less cash capital expenditures.",
      },
    ],

    risks: [
      {
        icon: "droplet",
        title: "Commodity Price Volatility",
        description:
          "Oil and natural gas prices can change significantly, directly affecting upstream earnings and overall financial performance.",
      },
      {
        icon: "building-store",
        title: "Refining & Chemical Cycles",
        description:
          "Refining margins and chemical-market conditions can fluctuate substantially with changes in supply, demand, inventories, and industry capacity.",
      },
      {
        icon: "alert-triangle",
        title: "High Capital Requirements",
        description:
          "Large oil, gas, refining, LNG, and chemical projects require significant capital and often take several years before generating production and cash flow.",
      },
      {
        icon: "globe",
        title: "Geopolitical & Regulatory Risk",
        description:
          "ExxonMobil operates globally and is exposed to changing regulations, geopolitical events, trade restrictions, fiscal terms, and operating conditions across different countries.",
      },
      {
        icon: "leaf",
        title: "Energy Transition Pressure",
        description:
          "Changes in energy demand, emissions policy, technology, and lower-carbon alternatives could affect the long-term economics of traditional oil and gas businesses.",
      },
    ],
  },

  financial_overview: {
    insight:
      "ExxonMobil generated $323.905B of sales and other operating revenue and $28.844B of net income attributable to ExxonMobil in fiscal 2025. Operating cash flow was $51.970B. Using cash capital expenditures of approximately $29.0B, the company's calculated free cash flow was approximately $23.0B; ExxonMobil separately reported $26.1B of free cash flow under its non-GAAP definition that includes cash flow from asset sales.",

    metrics: [
      {
        icon: "report-money",
        label: "Revenue",
        value: { unit: "B", value: 323.905 },
        change: { value: -4.5 },
        sublabel: "FY25",
      },
      {
        icon: "coin",
        label: "Net Income",
        value: { unit: "B", value: 28.844 },
        change: { value: -14.4 },
        sublabel: "FY25",
      },
      {
        icon: "droplet",
        label: "Free Cash Flow",
        value: { unit: "B", value: 23.612 },
        change: { value: -23.1 },
        sublabel: "FY25",
      },
    ],

    fiscalYearLabel: "Fiscal year 2025 (ended December 31, 2025)",
  },

  financial_history: {
    panels: [
      {
        icon: "report-money",
        unit: "B",
        color: "#93C5FD",
        label: "Revenue",
        years: ["'21", "'22", "'23", "'24", "'25"],
        values: [285.640, 413.680, 334.697, 339.247, 323.905],
        changeNote: "+13% since FY21",
        highlightColor: "#2563EB",
        currentValueLabel: "$323.9B",
      },
      {
        icon: "coin",
        unit: "B",
        color: "#86EFAC",
        label: "Net Income",
        years: ["'21", "'22", "'23", "'24", "'25"],
        values: [23.040, 55.740, 36.010, 33.680, 28.844],
        changeNote: "+25% since FY21",
        highlightColor: "#15803D",
        currentValueLabel: "$28.8B",
      },
      {
        icon: "droplet",
        unit: "B",
        color: "#C4B5FD",
        label: "Free Cash Flow",
        years: ["'21", "'22", "'23", "'24", "'25"],
        values: [36.053, 58.390, 33.450, 30.716, 23.612],
        changeNote: "-35% since FY21; calculated as operating cash flow less capital expenditures",
        highlightColor: "#7C3AED",
        currentValueLabel: "$23.6B",
      },
    ],

    rangeLabel:
      "5-year reported trend, fiscal years 2021–2025; free cash flow is calculated as operating cash flow less capital expenditures",
  },

  ecosystem: {
    output: {
      icon: "building-store",
      name: "Integrated Energy & Petrochemical Company",
      color: "#2563EB",
      description:
        "ExxonMobil connects natural resources, energy production, refining, chemicals, specialty products, industrial customers, transportation, and consumers across a global energy ecosystem.",
      backgroundTint: "#EFF6FF",
    },

    insight:
      "ExxonMobil operates across a broad energy and industrial ecosystem connecting resource development, production, transportation, refining, chemicals, manufacturing, distributors, businesses, and consumers.",

    partners: [
      {
        icon: "droplet",
        name: "Oil & Gas Suppliers",
        color: "#2563EB",
        description:
          "Oil and gas resources, joint ventures, service providers, and infrastructure support ExxonMobil's upstream exploration and production activities.",
        backgroundTint: "#EFF6FF",
      },
      {
        icon: "truck",
        name: "Transportation & Distribution",
        color: "#7C3AED",
        description:
          "Pipelines, shipping, terminals, distributors, and other logistics networks help move crude oil, natural gas, fuels, chemicals, and specialty products around the world.",
        backgroundTint: "#F5F3FF",
      },
      {
        icon: "building-store",
        name: "Industrial & Consumer Customers",
        color: "#15803D",
        description:
          "Airlines, transportation companies, manufacturers, chemical producers, retailers, and consumers purchase ExxonMobil's fuels, lubricants, chemicals, and specialty products.",
        backgroundTint: "#F0FDF4",
      },
    ],

    centerLabel: "ExxonMobil",
    flowInLabel: "← Resources & capital",
    flowOutLabel: "Energy & products →",
    centerSublabel: "Integrated energy company",
  },

  overview: {
    ceo: "Darren Woods",
    founded: "1870",
    revenue: { unit: "B", value: 323.905 },
    ceoSince: "2017",
    marketCap: { unit: "B", value: 676.18 },
    revenueYoY: { value: -4.5 },
    whatItDoes:
      "ExxonMobil explores for and produces oil and natural gas and manufactures and sells fuels, chemicals, lubricants, and specialty products, while also developing lower-emission technologies and businesses.",
    headquarters: "Spring, Texas",
    marketCapRank: "22",
    revenueFiscalYear: "FY25",
  },

  business_segments_insight:
    "ExxonMobil reports four major business segments: Upstream, Energy Products, Chemical Products, and Specialty Products. Their reported sales and other operating revenue were approximately $39.389B, $244.451B, $22.209B, and $17.771B respectively in FY2025.",

  business_segments_footnote:
    "Fiscal year 2025 ended December 31, 2025. Percentages below are calculated from the sum of segment sales and other operating revenue of approximately $323.820B. This is very close to consolidated sales and other operating revenue of $323.905B because the segment sales figures exclude certain other consolidated revenue items.",

  competitors_context_note:
    "Companies used as broad comparison references for ExxonMobil's integrated energy business. Because ExxonMobil combines upstream production, refining, fuels, chemicals, and specialty products, no single company is a perfect one-to-one competitor. Market caps use an October 7, 2026 snapshot.",

  competitors_insight:
    "ExxonMobil competes with other large integrated energy companies across oil and gas production, refining, fuels, LNG, chemicals, and related energy products. Chevron, Shell, TotalEnergies, and BP provide useful broad comparisons for its global integrated-energy model.",
};

const exxonMobilSegments = [
  {
    name: "Upstream",
    amount_value: 39.389,
    amount_unit: "B",
    percentage: 12,
    yoy_change: 6.1,
    color: "#2563EB",
    sort_order: 0,
  },
  {
    name: "Energy Products",
    amount_value: 244.451,
    amount_unit: "B",
    percentage: 76,
    yoy_change: -6.3,
    color: "#0891B2",
    sort_order: 1,
  },
  {
    name: "Chemical Products",
    amount_value: 22.209,
    amount_unit: "B",
    percentage: 7,
    yoy_change: -3.0,
    color: "#7C3AED",
    sort_order: 2,
  },
  {
    name: "Specialty Products",
    amount_value: 17.771,
    amount_unit: "B",
    percentage: 5,
    yoy_change: -2.6,
    color: "#15803D",
    sort_order: 3,
  },
];

const exxonMobilCompetitors = [
  {
    name: "Chevron",
    icon: "droplet",
    color: "#2563EB",
    background_tint: "#EFF6FF",
    tag_text_color: "#1D4ED8",
    market_cap_value: 402.42,
    market_cap_unit: "B",
    relative_size: 60,
    tag: "Integrated Energy",
    relationship:
      "Large U.S.-based integrated energy company operating across oil and gas production, refining, chemicals, and related energy businesses.",
    sort_order: 0,
  },
  {
    name: "Shell",
    icon: "droplet",
    color: "#7C3AED",
    background_tint: "#F5F3FF",
    tag_text_color: "#6D28D9",
    market_cap_value: 275.01,
    market_cap_unit: "B",
    relative_size: 41,
    tag: "Integrated Energy",
    relationship:
      "Global integrated energy company with upstream, LNG, refining, marketing, chemicals, and energy-transition businesses.",
    sort_order: 1,
  },
  {
    name: "TotalEnergies",
    icon: "droplet",
    color: "#15803D",
    background_tint: "#F0FDF4",
    tag_text_color: "#166534",
    market_cap_value: 188.50,
    market_cap_unit: "B",
    relative_size: 28,
    tag: "Integrated Energy",
    relationship:
      "Global integrated energy company operating across oil and gas, LNG, refining, fuels, chemicals, and electricity.",
    sort_order: 2,
  },
  {
    name: "BP",
    icon: "droplet",
    color: "#0891B2",
    background_tint: "#ECFEFF",
    tag_text_color: "#0E7490",
    market_cap_value: 113.81,
    market_cap_unit: "B",
    relative_size: 17,
    tag: "Integrated Energy",
    relationship:
      "Global integrated energy company with upstream, refining, fuels, trading, and other energy businesses, providing another broad comparison for ExxonMobil.",
    sort_order: 3,
  },
];

const exxonMobilSeed: SeedCompany = {
  company: exxonMobilCompany,
  segments: exxonMobilSegments,
  competitors: exxonMobilCompetitors,
};
const chevronCompany = {
  slug: "chevron",
  name: "Chevron Corporation",
  brand_name: "Chevron",
  ticker: "CVX",
  exchange: "NYSE",
  industry: "Energy",
  revenue_basis: "segment",
  logo_initial: "C",
  logo: "/logos/chevron-4.svg",

  tagline:
    "A global integrated energy company involved in oil and gas production, refining, fuels, chemicals, and lower-carbon energy solutions.",

  what_it_does:
    "Chevron explores for and produces crude oil and natural gas, transports and processes energy resources, refines crude oil into fuels and other petroleum products, markets fuels and lubricants, and develops lower-carbon businesses including renewable fuels, carbon capture, and other new energy solutions.",

  founded: "1879",
  headquarters: "Houston, Texas",
  ceo: "Mike Wirth",
  ceo_since: "2018",

  scope_score: 8.5,
  scope_score_label: "Strong",

  snapshot: [
    {
      icon: "shield-check",
      tone: "good",
      label: "Quality",
      rating: { kind: "stars", outOf: 5, value: 4 },
    },
    {
      icon: "building-store",
      tone: "good",
      label: "Scale",
      rating: { kind: "stars", outOf: 5, value: 5 },
    },
    {
      icon: "coin",
      tone: "good",
      label: "Profitability",
      rating: { kind: "stars", outOf: 4, value: 4 },
    },
    {
      icon: "trending-up",
      tone: "neutral",
      label: "Revenue growth",
      rating: { kind: "arrow", label: "Cyclical" },
    },
    {
      icon: "alert-triangle",
      tone: "risk",
      label: "Risk",
      rating: { kind: "badge", label: "High" },
    },
    {
      icon: "scale",
      tone: "neutral",
      label: "Valuation",
      rating: { kind: "badge", label: "Moderate" },
    },
  ],

  thirty_second_summary: {
    subtitle: "A plain-English explanation of Chevron's business model",
    content:
      "Chevron is an integrated energy company. It finds and produces oil and natural gas, transports and processes those resources, and turns crude oil into fuels and other products through its downstream business. The company earns revenue by selling energy, fuels, lubricants, chemicals, and related products to customers around the world.",
  },

  business_model: {
    stages: [
      {
        icon: "search",
        tags: [
          { icon: "search", label: "Exploration" },
          { icon: "droplet", label: "Oil & Gas" },
          { icon: "globe", label: "Global Assets" },
          { icon: "chart-line", label: "Production" },
        ],
        color: "#2563EB",
        title: "Find & Produce Energy",
        tagTextColor: "#1D4ED8",
        backgroundTint: "#EFF6FF",
      },
      {
        icon: "building-store",
        tags: [
          { icon: "building-store", label: "Refining" },
          { icon: "building-store", label: "Fuels" },
          { icon: "truck", label: "Transportation" },
          { icon: "package", label: "Marketing" },
        ],
        color: "#0891B2",
        title: "Process & Deliver",
        tagTextColor: "#0E7490",
        backgroundTint: "#ECFEFF",
      },
      {
        icon: "coin",
        tags: [
          { icon: "coin", label: "Product Sales" },
          { icon: "globe", label: "Global Markets" },
          { icon: "chart-line", label: "Cash Flow" },
          { icon: "trending-up", label: "Reinvestment" },
        ],
        color: "#15803D",
        title: "Sell Products & Reinvest",
        tagTextColor: "#166534",
        backgroundTint: "#F0FDF4",
      },
    ],

    insight:
      "Chevron's integrated model connects oil and gas production with refining, marketing, transportation, and other energy businesses. This allows the company to participate in multiple parts of the energy value chain and allocate capital across upstream and downstream opportunities.",

    repeatNote:
      "Chevron creates value by finding and producing oil and natural gas, processing and transporting energy products, selling fuels and other products globally, and reinvesting cash into production, infrastructure, technology, and new energy opportunities.",
  },

  strengths_and_risks: {
    strengths: [
      {
        icon: "building-store",
        title: "Global Energy Scale",
        description:
          "Chevron operates across major parts of the global energy value chain with large upstream production, refining, marketing, transportation, and energy infrastructure operations.",
      },
      {
        icon: "link",
        title: "Integrated Business Model",
        description:
          "The company combines upstream oil and gas production with downstream refining, fuels, lubricants, transportation, and marketing activities.",
      },
      {
        icon: "droplet",
        title: "Record Production",
        description:
          "Chevron reported record worldwide and U.S. net oil-equivalent production in 2025, with the Hess acquisition contributing additional production.",
      },
      {
        icon: "globe",
        title: "Diversified Asset Base",
        description:
          "Chevron has major positions across the United States and international markets, including the Permian Basin, Kazakhstan, Australia, and Guyana.",
      },
      {
        icon: "coin",
        title: "Strong Cash Generation",
        description:
          "Chevron generated $33.939B of operating cash flow in FY2025 and $16.592B of free cash flow based on operating cash flow less capital expenditures.",
      },
    ],

    risks: [
      {
        icon: "droplet",
        title: "Commodity Price Volatility",
        description:
          "Oil, natural gas, and NGL prices can move significantly and have a direct effect on Chevron's upstream earnings and overall financial performance.",
      },
      {
        icon: "building-store",
        title: "Refining Cycle Risk",
        description:
          "Refining margins and demand for petroleum products can fluctuate with changes in supply, demand, inventories, and industry capacity.",
      },
      {
        icon: "alert-triangle",
        title: "High Capital Requirements",
        description:
          "Large upstream, LNG, refining, and infrastructure projects require substantial capital and can take years to develop and generate returns.",
      },
      {
        icon: "globe",
        title: "Geopolitical Risk",
        description:
          "Chevron operates internationally and is exposed to geopolitical events, government actions, regulatory changes, sanctions, fiscal terms, and operating disruptions.",
      },
      {
        icon: "leaf",
        title: "Energy Transition Pressure",
        description:
          "Changes in energy demand, emissions policies, technology, and lower-carbon alternatives could affect the long-term economics of traditional oil and gas operations.",
      },
    ],
  },

  financial_overview: {
    insight:
      "Chevron generated $184.432B of sales and other operating revenues and $12.299B of net income attributable to Chevron Corporation in fiscal 2025. Operating cash flow was $33.939B and capital expenditures were $17.347B, producing $16.592B of free cash flow under Chevron's standard operating-cash-flow-less-capex calculation.",

    metrics: [
      {
        icon: "report-money",
        label: "Revenue",
        value: { unit: "B", value: 184.432 },
        change: { value: -4.6 },
        sublabel: "FY25",
      },
      {
        icon: "coin",
        label: "Net Income",
        value: { unit: "B", value: 12.299 },
        change: { value: -30.4 },
        sublabel: "FY25",
      },
      {
        icon: "droplet",
        label: "Free Cash Flow",
        value: { unit: "B", value: 16.592 },
        change: { value: 10.3 },
        sublabel: "FY25",
      },
    ],

    fiscalYearLabel: "Fiscal year 2025 (ended December 31, 2025)",
  },

   financial_history: {
    panels: [
      {
        icon: "report-money",
        unit: "B",
       color: "#93C5FD",
        label: "Revenue",
        years: ["'21", "'22", "'23", "'24", "'25"],
        values: [155.606, 235.717, 196.913, 193.414, 184.432],
        changeNote: "+19% since FY21",
        highlightColor: "#2563EB",
        currentValueLabel: "$184.4B",
      },
      {
        icon: "coin",
        unit: "B",
        color: "#86EFAC",
        label: "Net Income",
        years: ["'21", "'22", "'23", "'24", "'25"],
        values: [15.625, 35.465, 21.369, 17.661, 12.299],
        changeNote: "-21% since FY21",
        highlightColor: "#15803D",
        currentValueLabel: "$12.3B",
      },
      {
        icon: "droplet",
        unit: "B",
        color: "#C4B5FD",
        label: "Free Cash Flow",
        years: ["'21", "'22", "'23", "'24", "'25"],
        values: [21.131, 37.628, 19.780, 15.044, 16.592],
        changeNote: "-21% since FY21; calculated as operating cash flow less capital expenditures",
        highlightColor: "#7C3AED",
        currentValueLabel: "$16.6B",
      },
    ],

    rangeLabel:
      "5-year reported trend, fiscal years 2021–2025; free cash flow is calculated as operating cash flow less capital expenditures",
  },

  ecosystem: {
    output: {
      icon: "building-store",
      name: "Integrated Energy Company",
      color: "#2563EB",
      description:
        "Chevron connects natural resources, energy production, transportation, refining, fuels, chemicals, industrial customers, distributors, and consumers across a global energy ecosystem.",
      backgroundTint: "#EFF6FF",
    },

    insight:
      "Chevron operates across a broad energy ecosystem connecting resource development, production, transportation, refining, fuel marketing, industrial customers, distributors, and consumers.",

    partners: [
      {
        icon: "droplet",
        name: "Oil & Gas Partners",
        color: "#2563EB",
        description:
          "Joint ventures, resource owners, oilfield service providers, and infrastructure partners support Chevron's exploration and production activities.",
        backgroundTint: "#EFF6FF",
      },
      {
        icon: "truck",
        name: "Transportation & Distribution",
        color: "#7C3AED",
        description:
          "Pipelines, shipping, terminals, distributors, and logistics networks move crude oil, natural gas, fuels, lubricants, and other energy products to markets.",
        backgroundTint: "#F5F3FF",
      },
      {
        icon: "building-store",
        name: "Industrial & Consumer Customers",
        color: "#15803D",
        description:
          "Transportation companies, manufacturers, retailers, businesses, and consumers purchase Chevron fuels, lubricants, chemicals, and other energy products.",
        backgroundTint: "#F0FDF4",
      },
    ],

    centerLabel: "Chevron",
    flowInLabel: "← Resources & capital",
    flowOutLabel: "Energy & products →",
    centerSublabel: "Integrated energy company",
  },

  overview: {
    ceo: "Mike Wirth",
    founded: "1879",
    revenue: { unit: "B", value: 184.432 },
    ceoSince: "2018",
    marketCap: { unit: "B", value: 402.42 },
    revenueYoY: { value: -4.6 },
    whatItDoes:
      "Chevron explores for and produces oil and natural gas and manufactures, transports, refines, markets, and sells fuels, lubricants, chemicals, and other energy products.",
    headquarters: "Houston, Texas",
    marketCapRank: "36",
    revenueFiscalYear: "FY25",
  },

  business_segments_insight:
    "Chevron has two reportable business segments: Upstream and Downstream. In fiscal 2025, Upstream generated $53.452B of sales and other operating revenues and Downstream generated $130.876B.",

  business_segments_footnote:
    "Fiscal year 2025 ended December 31, 2025. Segment percentages below are calculated from the combined reportable-segment sales and other operating revenues of $184.328B. Consolidated sales and other operating revenues were $184.432B after including $104M of All Other revenue.",

  competitors_context_note:
    "Companies used as broad comparison references for Chevron's integrated energy business. Because Chevron combines upstream production, refining, fuels, transportation, and related businesses, no single company is a perfect one-to-one competitor. Market caps use an October 7, 2026 snapshot.",

  competitors_insight:
    "Chevron competes with other large integrated energy companies across oil and gas production, refining, fuels, LNG, chemicals, and related energy products. ExxonMobil, Shell, TotalEnergies, and BP provide useful broad comparisons for its global integrated-energy model.",
};

const chevronSegments = [
  {
    name: "Upstream",
    amount_value: 53.452,
    amount_unit: "B",
    percentage: 29,
    yoy_change: 14.1,
    color: "#2563EB",
    sort_order: 0,
  },
  {
    name: "Downstream",
    amount_value: 130.876,
    amount_unit: "B",
    percentage: 71,
    yoy_change: -10.6,
    color: "#0891B2",
    sort_order: 1,
  },
];

const chevronCompetitors = [
  {
    name: "ExxonMobil",
    icon: "droplet",
    color: "#2563EB",
    background_tint: "#EFF6FF",
    tag_text_color: "#1D4ED8",
    market_cap_value: 678.75,
    market_cap_unit: "B",
    relative_size: 100,
    tag: "Integrated Energy",
    relationship:
      "The largest U.S.-based integrated energy company, operating across upstream production, refining, fuels, chemicals, and specialty products.",
    sort_order: 0,
  },
  {
    name: "Shell",
    icon: "droplet",
    color: "#7C3AED",
    background_tint: "#F5F3FF",
    tag_text_color: "#6D28D9",
    market_cap_value: 275.03,
    market_cap_unit: "B",
    relative_size: 68,
    tag: "Integrated Energy",
    relationship:
      "Global integrated energy company with upstream, LNG, refining, marketing, chemicals, and other energy businesses.",
    sort_order: 1,
  },
  {
    name: "TotalEnergies",
    icon: "droplet",
    color: "#15803D",
    background_tint: "#F0FDF4",
    tag_text_color: "#166534",
    market_cap_value: 188.86,
    market_cap_unit: "B",
    relative_size: 47,
    tag: "Integrated Energy",
    relationship:
      "Global integrated energy company operating across oil and gas, LNG, refining, fuels, chemicals, and electricity.",
    sort_order: 2,
  },
  {
    name: "BP",
    icon: "droplet",
    color: "#0891B2",
    background_tint: "#ECFEFF",
    tag_text_color: "#0E7490",
    market_cap_value: 115.07,
    market_cap_unit: "B",
    relative_size: 29,
    tag: "Integrated Energy",
    relationship:
      "Global integrated energy company with upstream, refining, fuels, trading, and other energy businesses, providing another broad comparison for Chevron.",
    sort_order: 3,
  },
];

const chevronSeed: SeedCompany = {
  company: chevronCompany,
  segments: chevronSegments,
  competitors: chevronCompetitors,
};
const nexteraEnergyCompany = {
  slug: "nextera-energy",
  name: "NextEra Energy, Inc.",
  brand_name: "NextEra Energy",
  ticker: "NEE",
  exchange: "NYSE",
  industry: "Utilities",
  revenue_basis: "segment",
  logo_initial: "N",
  logo: "/logos/nextera-energy-1.svg",

  tagline:
    "A major North American energy company combining a large regulated electric utility with one of the world's leading renewable energy platforms.",

  what_it_does:
    "NextEra Energy provides electricity through Florida Power & Light and develops, owns, and operates energy infrastructure through NextEra Energy Resources. Its businesses include regulated electricity generation, transmission and distribution, renewable energy, battery storage, nuclear generation, natural gas generation, and long-term contracted energy infrastructure.",

  founded: "1925",
  headquarters: "Juno Beach, Florida",
  ceo: "John W. Ketchum",
  ceo_since: "2022",

  scope_score: 8.5,
  scope_score_label: "Strong",

  snapshot: [
    {
      icon: "shield-check",
      tone: "good",
      label: "Quality",
      rating: { kind: "stars", outOf: 5, value: 4 },
    },
    {
      icon: "building-store",
      tone: "good",
      label: "Scale",
      rating: { kind: "stars", outOf: 5, value: 5 },
    },
    {
      icon: "coin",
      tone: "good",
      label: "Profitability",
      rating: { kind: "stars", outOf: 4, value: 4 },
    },
    {
      icon: "trending-up",
      tone: "good",
      label: "Revenue growth",
      rating: { kind: "arrow", label: "Moderate" },
    },
    {
      icon: "alert-triangle",
      tone: "risk",
      label: "Risk",
      rating: { kind: "badge", label: "High" },
    },
    {
      icon: "scale",
      tone: "neutral",
      label: "Valuation",
      rating: { kind: "badge", label: "Moderate" },
    },
  ],

  thirty_second_summary: {
    subtitle: "A plain-English explanation of NextEra Energy's business model",
    content:
      "NextEra Energy operates two major businesses. Florida Power & Light provides regulated electricity to customers in Florida, while NextEra Energy Resources develops and operates renewable energy, battery storage, nuclear, natural gas, transmission, and other energy infrastructure. The company earns revenue primarily by selling electricity and providing energy and infrastructure services under regulated rates and long-term contracts.",
  },

  business_model: {
    stages: [
      {
        icon: "building-store",
        tags: [
          { icon: "building-store", label: "Power Generation" },
          { icon: "droplet", label: "Natural Gas" },
          { icon: "building-store", label: "Nuclear" },
          { icon: "chart-line", label: "Grid Infrastructure" },
        ],
        color: "#2563EB",
        title: "Generate & Deliver Electricity",
        tagTextColor: "#1D4ED8",
        backgroundTint: "#EFF6FF",
      },
      {
        icon: "globe",
        tags: [
          { icon: "globe", label: "Wind" },
          { icon: "chart-line", label: "Solar" },
          { icon: "battery", label: "Battery Storage" },
          { icon: "truck", label: "Transmission" },
        ],
        color: "#0891B2",
        title: "Build Energy Infrastructure",
        tagTextColor: "#0E7490",
        backgroundTint: "#ECFEFF",
      },
      {
        icon: "coin",
        tags: [
          { icon: "coin", label: "Electricity Sales" },
          { icon: "shield-check", label: "Regulated Rates" },
          { icon: "chart-line", label: "Long-Term Contracts" },
          { icon: "trending-up", label: "Reinvestment" },
        ],
        color: "#15803D",
        title: "Generate Revenue & Reinvest",
        tagTextColor: "#166534",
        backgroundTint: "#F0FDF4",
      },
    ],

    insight:
      "NextEra Energy combines a regulated utility with a large competitive energy infrastructure platform. FPL earns revenue from providing electricity under regulated rates, while NextEra Energy Resources develops long-term contracted generation and transmission assets, particularly renewable energy, storage, nuclear, and other infrastructure.",

    repeatNote:
      "NextEra Energy creates value by building and operating power-generation and grid infrastructure, selling electricity through regulated and contracted arrangements, and reinvesting capital into new generation, transmission, storage, and other energy projects.",
  },

  strengths_and_risks: {
    strengths: [
      {
        icon: "building-store",
        title: "Large Utility Platform",
        description:
          "Florida Power & Light is one of the largest electric utilities in the United States and serves more than six million customer accounts.",
      },
      {
        icon: "globe",
        title: "Renewable Energy Scale",
        description:
          "NextEra Energy Resources is one of the world's largest generators of renewable energy from wind and solar and is also a major battery-storage developer.",
      },
      {
        icon: "link",
        title: "Diversified Energy Model",
        description:
          "The company combines regulated utility operations with competitive and long-term contracted energy infrastructure, providing different sources of revenue and cash flow.",
      },
      {
        icon: "chart-line",
        title: "Long-Term Infrastructure Growth",
        description:
          "NextEra invests heavily in generation, transmission, distribution, storage, and other infrastructure that can support long-term electricity demand.",
      },
      {
        icon: "shield-check",
        title: "Regulated Utility Stability",
        description:
          "FPL operates under a regulated rate framework designed to recover the cost of providing electricity and provide a return on invested capital, subject to regulatory approval.",
      },
    ],

    risks: [
      {
        icon: "coin",
        title: "High Capital Requirements",
        description:
          "Electric generation, transmission, distribution, renewable projects, storage, and nuclear facilities require very large and continuous capital investment.",
      },
      {
        icon: "alert-triangle",
        title: "High Leverage & Financing Needs",
        description:
          "The capital-intensive nature of utility and infrastructure development requires significant debt, equity, and other sources of financing.",
      },
      {
        icon: "building-store",
        title: "Regulatory Risk",
        description:
          "FPL's rates, investment recovery, and allowed returns depend on decisions by state and federal regulators.",
      },
      {
        icon: "globe",
        title: "Project & Construction Risk",
        description:
          "Large energy projects can face permitting, construction, supply-chain, financing, technology, and cost-overrun risks.",
      },
      {
        icon: "battery",
        title: "Energy Market & Technology Risk",
        description:
          "Changes in electricity demand, power prices, renewable technology, storage economics, natural gas prices, and energy policy can affect project economics.",
      },
    ],
  },

  financial_overview: {
    insight:
      "NextEra Energy generated $27.412B of operating revenue and $6.835B of net income attributable to NextEra Energy in fiscal 2025. Operating cash flow was $12.485B, while capital expenditures, independent power investments and nuclear fuel purchases totaled $24.606B, resulting in approximately $12.121B of negative calculated free cash flow.",

    metrics: [
      {
        icon: "report-money",
        label: "Revenue",
        value: { unit: "B", value: 27.412 },
        change: { value: 10.7 },
        sublabel: "FY25",
      },
      {
        icon: "coin",
        label: "Net Income",
        value: { unit: "B", value: 6.835 },
        change: { value: -1.6 },
        sublabel: "FY25",
      },
      {
        icon: "droplet",
        label: "Free Cash Flow",
        value: { unit: "B", value: -12.121 },
        change: { value: -5.7 },
        sublabel: "FY25",
      },
    ],

    fiscalYearLabel: "Fiscal year 2025 (ended December 31, 2025)",
  },

  financial_history: {
    panels: [
      {
        icon: "report-money",
        unit: "B",
        color: "#93C5FD",
        label: "Revenue",
        years: ["'21", "'22", "'23", "'24", "'25"],
        values: [17.069, 20.956, 28.114, 24.753, 27.412],
        changeNote: "+61% since FY21",
        highlightColor: "#2563EB",
        currentValueLabel: "$27.4B",
      },
      {
        icon: "coin",
        unit: "B",
        color: "#86EFAC",
        label: "Net Income",
        years: ["'21", "'22", "'23", "'24", "'25"],
        values: [3.573, 4.147, 7.310, 6.946, 6.835],
        changeNote: "+91% since FY21",
        highlightColor: "#15803D",
        currentValueLabel: "$6.8B",
      },
      {
        icon: "droplet",
        unit: "B",
        color: "#C4B5FD",
        label: "Free Cash Flow",
        years: ["'21", "'22", "'23", "'24", "'25"],
        values: [-8.524, -11.021, -13.812, -11.469, -12.121],
        changeNote: "FCF deficit widened 42% since FY21",
        highlightColor: "#7C3AED",
        currentValueLabel: "-$12.1B",
      },
    ],

    rangeLabel:
      "5-year reported trend, fiscal years 2021–2025; free cash flow is calculated as operating cash flow less capital expenditures, independent power investments and nuclear fuel purchases",
  },

  ecosystem: {
    output: {
      icon: "building-store",
      name: "Electric Power & Energy Infrastructure Platform",
      color: "#2563EB",
      description:
        "NextEra Energy connects electricity generation, transmission, distribution, renewable energy, storage, utilities, large energy customers, regulators, and communities across the North American energy system.",
      backgroundTint: "#EFF6FF",
    },

    insight:
      "NextEra Energy operates across multiple parts of the electricity ecosystem, connecting regulated utility customers with generation and grid infrastructure while also developing long-term contracted renewable and other energy projects.",

    partners: [
      {
        icon: "building-store",
        name: "Electricity Customers",
        color: "#2563EB",
        description:
          "Residential, commercial, and industrial customers purchase electricity from FPL and other NextEra-related energy businesses.",
        backgroundTint: "#EFF6FF",
      },
      {
        icon: "globe",
        name: "Renewable & Infrastructure Partners",
        color: "#15803D",
        description:
          "Developers, equipment suppliers, utilities, project partners, and long-term energy customers support NextEra's renewable generation, storage, transmission, and other infrastructure projects.",
        backgroundTint: "#F0FDF4",
      },
      {
        icon: "building-store",
        name: "Regulators & Grid Organizations",
        color: "#7C3AED",
        description:
          "State and federal regulators, grid operators, and other public organizations influence rates, project approvals, transmission development, and energy-market operations.",
        backgroundTint: "#F5F3FF",
      },
    ],

    centerLabel: "NextEra Energy",
    flowInLabel: "← Capital & energy resources",
    flowOutLabel: "Electricity & infrastructure →",
    centerSublabel: "Energy infrastructure company",
  },

  overview: {
    ceo: "John W. Ketchum",
    founded: "1925",
    revenue: { unit: "B", value: 27.412 },
    ceoSince: "2022",
    marketCap: { unit: "B", value: 160.75 },
    revenueYoY: { value: 10.7 },
    whatItDoes:
      "NextEra Energy provides regulated electricity through Florida Power & Light and develops renewable energy, storage, nuclear, natural gas, transmission, and other energy infrastructure through NextEra Energy Resources.",
    headquarters: "Juno Beach, Florida",
    marketCapRank: "131",
    revenueFiscalYear: "FY25",
  },

  business_segments_insight:
    "NextEra Energy has two reportable business segments: Florida Power & Light (FPL), a rate-regulated electric utility, and NextEra Energy Resources (NEER), which includes competitive energy and regulated transmission businesses.",

  business_segments_footnote:
    "Fiscal year 2025 ended December 31, 2025. FPL generated $18.262B of operating revenue and NEER generated $8.760B. Percentages below are calculated against total reportable-segment operating revenue of $27.022B; consolidated operating revenue was $27.412B after Corporate and Other.",

  competitors_context_note:
    "Companies used as broad comparison references for NextEra Energy's regulated electric utility and energy-infrastructure businesses. Because NextEra combines a large Florida utility with a major renewable and infrastructure platform, no single company is a perfect one-to-one competitor. Market caps use October 7, 2026 snapshots where available.",

  competitors_insight:
    "NextEra Energy competes with large U.S. electric utilities and energy infrastructure companies. Duke Energy, Southern Company, American Electric Power, and Dominion Energy provide useful comparisons across regulated electricity generation, transmission, distribution, and energy infrastructure.",
};

const nexteraEnergySegments = [
  {
    name: "Florida Power & Light",
    amount_value: 18.262,
    amount_unit: "B",
    percentage: 68,
    yoy_change: 7.3,
    color: "#2563EB",
    sort_order: 0,
  },
  {
    name: "NextEra Energy Resources",
    amount_value: 8.760,
    amount_unit: "B",
    percentage: 32,
    yoy_change: 16.2,
    color: "#15803D",
    sort_order: 1,
  },
];

const nexteraEnergyCompetitors = [
  {
    name: "The Southern Company",
    icon: "building-store",
    color: "#7C3AED",
    background_tint: "#F5F3FF",
    tag_text_color: "#6D28D9",
    market_cap_value: 98.82,
    market_cap_unit: "B",
    relative_size: 61,
    tag: "Electric Utility",
    relationship:
      "Large U.S. utility company operating regulated electric and gas businesses, providing a broad comparison for NextEra Energy's utility operations.",
    sort_order: 0,
  },
  {
    name: "Duke Energy",
    icon: "building-store",
    color: "#2563EB",
    background_tint: "#EFF6FF",
    tag_text_color: "#1D4ED8",
    market_cap_value: 90.38,
    market_cap_unit: "B",
    relative_size: 56,
    tag: "Electric Utility",
    relationship:
      "Major U.S. electric utility with regulated generation, transmission, and distribution businesses across multiple states.",
    sort_order: 1,
  },
  {
    name: "American Electric Power",
    icon: "building-store",
    color: "#0891B2",
    background_tint: "#ECFEFF",
    tag_text_color: "#0E7490",
    market_cap_value: 66.46,
    market_cap_unit: "B",
    relative_size: 41,
    tag: "Electric Utility",
    relationship:
      "Large U.S. electric utility with extensive generation, transmission, and distribution infrastructure, making it a useful comparison for NextEra's regulated operations.",
    sort_order: 2,
  },
  {
    name: "Dominion Energy",
    icon: "building-store",
    color: "#15803D",
    background_tint: "#F0FDF4",
    tag_text_color: "#166534",
    market_cap_value: 54.53,
    market_cap_unit: "B",
    relative_size: 34,
    tag: "Electric Utility",
    relationship:
      "Large U.S. regulated utility operating electricity and natural gas businesses. Dominion is also the subject of a proposed combination with NextEra Energy, which has not yet closed.",
    sort_order: 3,
  },
];

const nexteraEnergySeed: SeedCompany = {
  company: nexteraEnergyCompany,
  segments: nexteraEnergySegments,
  competitors: nexteraEnergyCompetitors,
};
const palantirCompany = {
  slug: "palantir",
  name: "Palantir Technologies Inc.",
  brand_name: "Palantir",
  ticker: "PLTR",
  exchange: "NASDAQ",
  industry: "Technology",
  revenue_basis: "segment",
  logo_initial: "P",
  logo: "/logos/palantir-svgrepo-com.svg",

  tagline:
    "A software company that helps governments and businesses integrate data, make decisions, and operate complex systems using AI and analytics.",

  what_it_does:
    "Palantir builds software platforms that help organizations integrate large amounts of data, understand complex situations, make decisions, and coordinate operations. Its major platforms include Gotham, Foundry, Apollo, and the Artificial Intelligence Platform (AIP), serving both government and commercial customers.",

  founded: "2003",
  headquarters: "Aventura, Florida",
  ceo: "Alexander C. Karp",
  ceo_since: "2005",

  scope_score: 9.0,
  scope_score_label: "Excellent",

  snapshot: [
    {
      icon: "shield-check",
      tone: "good",
      label: "Quality",
      rating: { kind: "stars", outOf: 5, value: 5 },
    },
    {
      icon: "building-store",
      tone: "good",
      label: "Scale",
      rating: { kind: "stars", outOf: 5, value: 5 },
    },
    {
      icon: "coin",
      tone: "good",
      label: "Profitability",
      rating: { kind: "stars", outOf: 4, value: 4 },
    },
    {
      icon: "trending-up",
      tone: "good",
      label: "Revenue growth",
      rating: { kind: "arrow", label: "Very Strong" },
    },
    {
      icon: "alert-triangle",
      tone: "risk",
      label: "Risk",
      rating: { kind: "badge", label: "High" },
    },
    {
      icon: "scale",
      tone: "neutral",
      label: "Valuation",
      rating: { kind: "badge", label: "High" },
    },
  ],

  thirty_second_summary: {
    subtitle: "A plain-English explanation of Palantir's business model",
    content:
      "Palantir sells software that helps organizations bring together data from different systems, understand what is happening, and turn that information into decisions and operational actions. Government customers use Palantir for areas such as defense, intelligence, and public-sector operations, while commercial customers use its platforms across industries including manufacturing, healthcare, energy, finance, and other complex operations. Palantir increasingly uses artificial intelligence through AIP to help organizations build AI-powered workflows and applications on top of their data.",
  },

  business_model: {
    stages: [
      {
        icon: "chart-line",
        tags: [
          { icon: "chart-line", label: "Data Integration" },
          { icon: "shield-check", label: "Secure Data" },
          { icon: "users", label: "Organizations" },
          { icon: "globe", label: "Complex Operations" },
        ],
        color: "#2563EB",
        title: "Integrate Data & Operations",
        tagTextColor: "#1D4ED8",
        backgroundTint: "#EFF6FF",
      },
      {
        icon: "building-store",
        tags: [
          { icon: "chart-line", label: "Analytics" },
          { icon: "shield-check", label: "Gotham" },
          { icon: "users", label: "Foundry" },
          { icon: "globe", label: "AIP" },
        ],
        color: "#0891B2",
        title: "Deploy Software & AI",
        tagTextColor: "#0E7490",
        backgroundTint: "#ECFEFF",
      },
      {
        icon: "coin",
        tags: [
          { icon: "coin", label: "Software Contracts" },
          { icon: "users", label: "Customers" },
          { icon: "chart-line", label: "Expansion" },
          { icon: "trending-up", label: "Reinvestment" },
        ],
        color: "#15803D",
        title: "Generate Revenue & Expand",
        tagTextColor: "#166534",
        backgroundTint: "#F0FDF4",
      },
    ],

    insight:
      "Palantir creates value by helping organizations turn fragmented data into operational software. Customers pay to use Palantir's platforms, generally through multi-year software contracts. Once a platform becomes embedded in an organization's workflows, Palantir can expand usage across additional teams, business functions, and use cases. AIP adds an AI layer that allows customers to build AI-powered applications and workflows on top of their operational data.",

    repeatNote:
      "Palantir's business model is based on selling software platforms that connect data, decisions, and operations. It earns recurring and contract-based revenue from government and commercial customers, then expands those relationships by deploying additional software, users, and AI capabilities.",
  },

  strengths_and_risks: {
    strengths: [
      {
        icon: "chart-line",
        title: "Exceptional Growth",
        description:
          "Palantir generated $4.475B of revenue in FY2025, up 56% from FY2024, while 2026 results continued to show very strong growth.",
      },
      {
        icon: "shield-check",
        title: "Deep Government Relationships",
        description:
          "Palantir has built long-term relationships with government organizations and develops software for complex defense, intelligence, and public-sector operations.",
      },
      {
        icon: "globe",
        title: "Growing Commercial Business",
        description:
          "Commercial revenue has become a major part of the business, expanding Palantir's opportunity beyond government customers.",
      },
      {
        icon: "chart-line",
        title: "AI Platform Advantage",
        description:
          "AIP allows organizations to connect modern AI models and AI-powered workflows with their operational data and existing Palantir platforms.",
      },
      {
        icon: "coin",
        title: "Strong Cash Generation",
        description:
          "Palantir generated $2.134B of operating cash flow in FY2025 and approximately $2.101B of calculated free cash flow.",
      },
    ],

    risks: [
      {
        icon: "scale",
        title: "High Valuation",
        description:
          "Palantir's market value is extremely high relative to its current revenue and earnings, creating significant valuation risk if growth expectations fall.",
      },
      {
        icon: "building-store",
        title: "Government Concentration",
        description:
          "Government customers remain an important part of the business, exposing Palantir to government budgets, procurement cycles, policy changes, and contract timing.",
      },
      {
        icon: "users",
        title: "Customer Concentration",
        description:
          "Large contracts can have a meaningful effect on revenue and results, particularly when customers expand, reduce, or terminate contracts.",
      },
      {
        icon: "globe",
        title: "Intense Competition",
        description:
          "Palantir competes with large technology companies, data platforms, analytics providers, AI companies, and specialized software vendors.",
      },
      {
        icon: "alert-triangle",
        title: "AI Market Uncertainty",
        description:
          "Rapid changes in AI models, cloud platforms, open-source software, and competing AI products could change the economics and competitive landscape of the market.",
      },
    ],
  },

  financial_overview: {
    insight:
      "Palantir generated $4.475B of revenue and $1.635B of net income in fiscal 2025. Operating cash flow was $2.134B, while purchases of property and equipment were $33.882M, producing approximately $2.101B of calculated free cash flow.",

    metrics: [
      {
        icon: "report-money",
        label: "Revenue",
        value: { unit: "B", value: 4.475 },
        change: { value: 56.2 },
        sublabel: "FY25",
      },
      {
        icon: "coin",
        label: "Net Income",
        value: { unit: "B", value: 1.635 },
        change: { value: 249.3 },
        sublabel: "FY25",
      },
      {
        icon: "droplet",
        label: "Free Cash Flow",
        value: { unit: "B", value: 2.101 },
        change: { value: 84.1 },
        sublabel: "FY25",
      },
    ],

    fiscalYearLabel: "Fiscal year 2025 (ended December 31, 2025)",
  },

  financial_history: {
    panels: [
      {
        icon: "report-money",
        unit: "B",
        color: "#93C5FD",
        label: "Revenue",
        years: ["'21", "'22", "'23", "'24", "'25"],
        values: [1.542, 1.906, 2.225, 2.866, 4.475],
        changeNote: "+190% since FY21",
        highlightColor: "#2563EB",
        currentValueLabel: "$4.5B",
      },
      {
        icon: "coin",
        unit: "B",
        color: "#86EFAC",
        label: "Net Income",
        years: ["'21", "'22", "'23", "'24", "'25"],
        values: [-0.520, -0.371, 0.217, 0.468, 1.635],
        changeNote: "Turned profitable after reporting GAAP net losses in FY21 and FY22",
        highlightColor: "#15803D",
        currentValueLabel: "$1.6B",
      },
      {
        icon: "droplet",
        unit: "B",
        color: "#C4B5FD",
        label: "Free Cash Flow",
        years: ["'21", "'22", "'23", "'24", "'25"],
        values: [0.321, 0.184, 0.697, 1.141, 2.101],
        changeNote: "+554% since FY21",
        highlightColor: "#7C3AED",
        currentValueLabel: "$2.1B",
      },
    ],

    rangeLabel:
      "5-year reported trend, fiscal years 2021–2025; free cash flow is calculated as operating cash flow less purchases of property and equipment",
  },

  ecosystem: {
    output: {
      icon: "chart-line",
      name: "Data & AI Operating Platform",
      color: "#2563EB",
      description:
        "Palantir sits between organizations, their data, AI models, software systems, and real-world operations, helping customers turn complex information into decisions and actions.",
      backgroundTint: "#EFF6FF",
    },

    insight:
      "Palantir connects government agencies and commercial organizations with their operational data, software systems, AI models, and users. Its platforms are designed to become part of the workflows through which organizations analyze information and operate their businesses.",

    partners: [
      {
        icon: "building-store",
        name: "Government Organizations",
        color: "#7C3AED",
        description:
          "Defense, intelligence, and other government agencies use Palantir software for complex data, analysis, planning, and operational workflows.",
        backgroundTint: "#F5F3FF",
      },
      {
        icon: "building-store",
        name: "Commercial Enterprises",
        color: "#2563EB",
        description:
          "Companies across industries use Palantir platforms to connect operational data, improve decision-making, and build software-driven workflows.",
        backgroundTint: "#EFF6FF",
      },
      {
        icon: "globe",
        name: "AI & Technology Ecosystem",
        color: "#15803D",
        description:
          "Cloud providers, AI model providers, technology partners, and other infrastructure companies can connect with Palantir's platforms and customer workflows.",
        backgroundTint: "#F0FDF4",
      },
    ],

    centerLabel: "Palantir",
    flowInLabel: "← Data & AI models",
    flowOutLabel: "Decisions & operations →",
    centerSublabel: "Data & AI software company",
  },

  overview: {
    ceo: "Alexander C. Karp",
    founded: "2003",
    revenue: { unit: "B", value: 4.475 },
    ceoSince: "2005",
    marketCap: { unit: "B", value: 466.48 },
    revenueYoY: { value: 56.2 },
    whatItDoes:
      "Palantir develops software platforms that integrate data, analytics, AI, and operational workflows for government agencies and commercial organizations.",
    headquarters: "Aventura, Florida",
    marketCapRank: "29",
    revenueFiscalYear: "FY25",
  },

  business_segments_insight:
    "Palantir operates through two reportable segments: Government and Commercial. Government serves U.S. and non-U.S. government agencies, while Commercial primarily serves organizations in non-government industries.",

  business_segments_footnote:
    "Fiscal year 2025 ended December 31, 2025. Government generated $2.402B of revenue and Commercial generated $2.073B. Percentages below are calculated against total reported revenue of $4.475B.",

  competitors_context_note:
    "Companies used as broad comparison references for Palantir's data, analytics, AI, cybersecurity, and enterprise software businesses. Because Palantir combines government software, commercial data platforms, and AI applications, no single company is a perfect one-to-one competitor. Market caps use October 7, 2026 snapshots.",

  competitors_insight:
    "Palantir competes across several overlapping software markets rather than one narrow category. CrowdStrike provides a comparison for large-scale AI-enabled enterprise software and security, ServiceNow for enterprise workflow platforms, Snowflake for data platforms, and Datadog for cloud-based data and analytics software.",
};

const palantirSegments = [
  {
    name: "Government",
    amount_value: 2.402,
    amount_unit: "B",
    percentage: 54,
    yoy_change: 53.0,
    color: "#7C3AED",
    sort_order: 0,
  },
  {
    name: "Commercial",
    amount_value: 2.073,
    amount_unit: "B",
    percentage: 46,
    yoy_change: 60.0,
    color: "#2563EB",
    sort_order: 1,
  },
];

const palantirCompetitors = [
  {
    name: "CrowdStrike",
    icon: "shield-check",
    color: "#7C3AED",
    background_tint: "#F5F3FF",
    tag_text_color: "#6D28D9",
    market_cap_value: 272.38,
    market_cap_unit: "B",
    relative_size: 58,
    tag: "AI & Cybersecurity",
    relationship:
      "Large AI-enabled software company focused on cybersecurity and cloud security, providing a useful comparison for Palantir's enterprise software and AI positioning.",
    sort_order: 0,
  },
  {
    name: "ServiceNow",
    icon: "building-store",
    color: "#2563EB",
    background_tint: "#EFF6FF",
    tag_text_color: "#1D4ED8",
    market_cap_value: 142.54,
    market_cap_unit: "B",
    relative_size: 31,
    tag: "Enterprise Software",
    relationship:
      "Large enterprise software platform that helps organizations manage complex workflows and operations, providing a useful comparison for Palantir's operational software model.",
    sort_order: 1,
  },
  {
    name: "Snowflake",
    icon: "chart-line",
    color: "#0891B2",
    background_tint: "#ECFEFF",
    tag_text_color: "#0E7490",
    market_cap_value: 117.31,
    market_cap_unit: "B",
    relative_size: 25,
    tag: "Data Platform",
    relationship:
      "Cloud data platform that helps organizations centralize, analyze, and use data, making it a useful comparison for Palantir's data-integration and analytics business.",
    sort_order: 2,
  },
  {
    name: "Datadog",
    icon: "chart-line",
    color: "#15803D",
    background_tint: "#F0FDF4",
    tag_text_color: "#166534",
    market_cap_value: 97.68,
    market_cap_unit: "B",
    relative_size: 21,
    tag: "Data & Analytics",
    relationship:
      "Cloud-based monitoring and analytics platform that processes large volumes of operational data, providing a useful comparison for Palantir's data and software capabilities.",
    sort_order: 3,
  },
];

const palantirSeed: SeedCompany = {
  company: palantirCompany,
  segments: palantirSegments,
  competitors: palantirCompetitors,
};
const appleCompany = {
  slug: "apple",
  name: "Apple Inc.",
  brand_name: "Apple",
  ticker: "AAPL",
  exchange: "NASDAQ",
  industry: "Technology",
  revenue_basis: "segment",
  logo_initial: "A",
  logo: "/logos/apple-logo-svgrepo-com.svg",

  tagline:
    "A global technology company that combines premium devices, software, and digital services into a tightly integrated ecosystem.",

  what_it_does:
    "Apple designs, develops, and sells consumer technology products including iPhone, Mac, iPad, Apple Watch, AirPods, and other devices. It also operates a large services business that includes the App Store, cloud services, advertising, Apple Music, Apple TV, Apple Pay, and other digital services. Apple's products, software, silicon, and services are designed to work together as an integrated ecosystem.",

  founded: "1976",
  headquarters: "Cupertino, California",
  ceo: "John Ternus",
  ceo_since: "2026",

  scope_score: 9.5,
  scope_score_label: "Excellent",

  snapshot: [
    {
      icon: "shield-check",
      tone: "good",
      label: "Quality",
      rating: { kind: "stars", outOf: 5, value: 5 },
    },
    {
      icon: "building-store",
      tone: "good",
      label: "Scale",
      rating: { kind: "stars", outOf: 5, value: 5 },
    },
    {
      icon: "coin",
      tone: "good",
      label: "Profitability",
      rating: { kind: "stars", outOf: 4, value: 4 },
    },
    {
      icon: "trending-up",
      tone: "good",
      label: "Revenue growth",
      rating: { kind: "arrow", label: "Moderate" },
    },
    {
      icon: "alert-triangle",
      tone: "risk",
      label: "Risk",
      rating: { kind: "badge", label: "Medium" },
    },
    {
      icon: "scale",
      tone: "neutral",
      label: "Valuation",
      rating: { kind: "badge", label: "High" },
    },
  ],

  thirty_second_summary: {
    subtitle: "A plain-English explanation of Apple's business model",
    content:
      "Apple makes money primarily by selling hardware such as iPhone, Mac, iPad, Apple Watch, and AirPods, while also earning recurring revenue from services such as the App Store, cloud services, advertising, subscriptions, and payment services. The company connects these products through its own operating systems, chips, software, retail stores, and services, creating an ecosystem that encourages customers to continue using multiple Apple products and services together.",
  },

  business_model: {
    stages: [
      {
        icon: "building-store",
        tags: [
          { icon: "building-store", label: "iPhone" },
          { icon: "building-store", label: "Mac & iPad" },
          { icon: "shield-check", label: "Apple Silicon" },
          { icon: "globe", label: "Global Supply Chain" },
        ],
        color: "#2563EB",
        title: "Design & Build Products",
        tagTextColor: "#1D4ED8",
        backgroundTint: "#EFF6FF",
      },
      {
        icon: "globe",
        tags: [
          { icon: "users", label: "App Store" },
          { icon: "coin", label: "Subscriptions" },
          { icon: "chart-line", label: "Advertising" },
          { icon: "shield-check", label: "Apple Pay" },
        ],
        color: "#0891B2",
        title: "Build the Ecosystem",
        tagTextColor: "#0E7490",
        backgroundTint: "#ECFEFF",
      },
      {
        icon: "coin",
        tags: [
          { icon: "coin", label: "Product Sales" },
          { icon: "coin", label: "Services Revenue" },
          { icon: "users", label: "Customer Loyalty" },
          { icon: "trending-up", label: "Reinvestment" },
        ],
        color: "#15803D",
        title: "Generate Revenue & Reinvest",
        tagTextColor: "#166534",
        backgroundTint: "#F0FDF4",
      },
    ],

    insight:
      "Apple combines high-value hardware sales with a growing services business. Hardware brings customers into the Apple ecosystem, while software, subscriptions, digital services, and accessories increase the value of that installed customer base over time. Apple also designs key components such as its own chips and operating systems, giving it greater control over the product experience.",

    repeatNote:
      "Apple creates value by designing integrated hardware and software, selling devices at scale, and then generating additional revenue through services and accessories connected to its installed base of customers.",
  },

  strengths_and_risks: {
    strengths: [
      {
        icon: "building-store",
        title: "Massive Global Ecosystem",
        description:
          "Apple has an installed base of more than 2.5 billion active devices, creating a large ecosystem of customers who can use multiple Apple products and services together.",
      },
      {
        icon: "shield-check",
        title: "Vertical Integration",
        description:
          "Apple controls important parts of its product experience through custom silicon, operating systems, software, services, and hardware design.",
      },
      {
        icon: "coin",
        title: "Large Services Business",
        description:
          "Services generated $109.158B of revenue in FY2025 and has become a major source of recurring and high-margin revenue for Apple.",
      },
      {
        icon: "globe",
        title: "Global Brand & Distribution",
        description:
          "Apple sells products and services across more than 200 countries and territories through retail stores, online channels, carriers, distributors, and other partners.",
      },
      {
        icon: "chart-line",
        title: "Exceptional Cash Generation",
        description:
          "Apple generated $111.482B of operating cash flow in FY2025 and approximately $98.767B of calculated free cash flow.",
      },
    ],

    risks: [
      {
        icon: "building-store",
        title: "iPhone Dependence",
        description:
          "iPhone generated $209.586B of FY2025 revenue, meaning the company's results remain heavily influenced by demand for its flagship smartphone.",
      },
      {
        icon: "globe",
        title: "Supply Chain & Geopolitical Risk",
        description:
          "Apple relies on a complex global supply chain and manufacturing ecosystem, exposing the company to tariffs, trade restrictions, geopolitical tensions, and production disruptions.",
      },
      {
        icon: "users",
        title: "Regulatory & App Store Pressure",
        description:
          "Apple faces regulatory scrutiny around its App Store, payment systems, platform rules, competition, privacy, and relationships with developers.",
      },
      {
        icon: "chart-line",
        title: "Innovation & AI Competition",
        description:
          "Apple must continue improving its products and artificial intelligence capabilities while competing with companies across smartphones, cloud services, AI, software, and consumer technology.",
      },
      {
        icon: "scale",
        title: "High Valuation",
        description:
          "Apple's market capitalization is extremely large, so future performance depends on the company continuing to generate substantial earnings and cash flow while maintaining customer demand.",
      },
    ],
  },

  financial_overview: {
    insight:
      "Apple generated $416.161B of revenue and $112.010B of net income in fiscal 2025. Operating cash flow was $111.482B, while payments for property, plant and equipment were $12.715B, producing approximately $98.767B of calculated free cash flow.",

    metrics: [
      {
        icon: "report-money",
        label: "Revenue",
        value: { unit: "B", value: 416.161 },
        change: { value: 6.4 },
        sublabel: "FY25",
      },
      {
        icon: "coin",
        label: "Net Income",
        value: { unit: "B", value: 112.010 },
        change: { value: 19.5 },
        sublabel: "FY25",
      },
      {
        icon: "droplet",
        label: "Free Cash Flow",
        value: { unit: "B", value: 98.767 },
        change: { value: -9.2 },
        sublabel: "FY25",
      },
    ],

    fiscalYearLabel: "Fiscal year 2025 (ended September 27, 2025)",
  },

  financial_history: {
    panels: [
      {
        icon: "report-money",
        unit: "B",
        color: "#93C5FD",
        label: "Revenue",
        years: ["'21", "'22", "'23", "'24", "'25"],
        values: [365.817, 394.328, 383.285, 391.035, 416.161],
        changeNote: "+14% since FY21",
        highlightColor: "#2563EB",
        currentValueLabel: "$416.2B",
      },
      {
        icon: "coin",
        unit: "B",
        color: "#86EFAC",
        label: "Net Income",
        years: ["'21", "'22", "'23", "'24", "'25"],
        values: [94.680, 99.803, 96.995, 93.736, 112.010],
        changeNote: "+18% since FY21",
        highlightColor: "#15803D",
        currentValueLabel: "$112.0B",
      },
      {
        icon: "droplet",
        unit: "B",
        color: "#C4B5FD",
        label: "Free Cash Flow",
        years: ["'21", "'22", "'23", "'24", "'25"],
        values: [92.953, 111.443, 99.584, 108.807, 98.767],
        changeNote: "+6% since FY21",
        highlightColor: "#7C3AED",
        currentValueLabel: "$98.8B",
      },
    ],

    rangeLabel:
      "5-year reported trend, fiscal years 2021–2025; free cash flow is calculated as operating cash flow less capital expenditures",
  },

  ecosystem: {
    output: {
      icon: "building-store",
      name: "Integrated Consumer Technology Ecosystem",
      color: "#2563EB",
      description:
        "Apple connects hardware, software, digital services, developers, content providers, payment systems, retail channels, suppliers, and customers into one integrated technology ecosystem.",
      backgroundTint: "#EFF6FF",
    },

    insight:
      "Apple sits at the center of an ecosystem connecting customers with devices, operating systems, applications, digital content, subscriptions, payments, developers, and a global supply chain.",

    partners: [
      {
        icon: "building-store",
        name: "Manufacturing & Supply Chain",
        color: "#2563EB",
        description:
          "Manufacturers, component suppliers, logistics providers, and other partners help Apple produce and distribute its hardware products around the world.",
        backgroundTint: "#EFF6FF",
      },
      {
        icon: "users",
        name: "Developers & Content Partners",
        color: "#7C3AED",
        description:
          "Developers and content providers create applications, games, media, and other services that increase the usefulness of Apple's platforms.",
        backgroundTint: "#F5F3FF",
      },
      {
        icon: "globe",
        name: "Customers & Distribution",
        color: "#15803D",
        description:
          "Consumers, businesses, carriers, retailers, and Apple's own stores form the distribution and customer ecosystem for Apple products and services.",
        backgroundTint: "#F0FDF4",
      },
    ],

    centerLabel: "Apple",
    flowInLabel: "← Components, software & content",
    flowOutLabel: "Devices & services →",
    centerSublabel: "Global technology ecosystem",
  },

  overview: {
    ceo: "John Ternus",
    founded: "1976",
    revenue: { unit: "B", value: 416.161 },
    ceoSince: "2026",
    marketCap: { unit: "B", value: 4910.00 },
    revenueYoY: { value: 6.4 },
    whatItDoes:
      "Apple designs and sells consumer technology products including iPhone, Mac, iPad, Apple Watch, AirPods, and other devices while operating a large services ecosystem spanning the App Store, subscriptions, cloud services, advertising, payments, and other digital services.",
    headquarters: "Cupertino, California",
    marketCapRank: "2",
    revenueFiscalYear: "FY25",
  },

  business_segments_insight:
    "Apple's major revenue categories are iPhone, Services, Mac, iPad, and Wearables, Home and Accessories. These categories show where Apple generates revenue from its hardware and services ecosystem.",

  business_segments_footnote:
    "Fiscal year 2025 ended September 27, 2025. iPhone generated $209.586B, Services $109.158B, Wearables, Home and Accessories $35.686B, Mac $33.708B, and iPad $28.023B. Percentages below are calculated against total reported net sales of $416.161B.",

  competitors_context_note:
    "Companies used as broad comparison references for Apple's consumer technology, devices, software, chips, and digital ecosystem businesses. Because Apple operates across several technology markets, no single company is a perfect one-to-one competitor. Market caps use October 7, 2026 snapshots, except Samsung's USD market-cap index snapshot.",

  competitors_insight:
    "Apple competes across smartphones, personal computers, tablets, wearables, digital services, software platforms, and custom silicon. Microsoft provides a comparison for software and personal computing, Alphabet for consumer technology and digital services, Samsung for smartphones and consumer electronics, and Sony for consumer electronics and entertainment.",
};

const appleSegments = [
  {
    name: "iPhone",
    amount_value: 209.586,
    amount_unit: "B",
    percentage: 50,
    yoy_change: 4.0,
    color: "#2563EB",
    sort_order: 0,
  },
  {
    name: "Services",
    amount_value: 109.158,
    amount_unit: "B",
    percentage: 26,
    yoy_change: 14.0,
    color: "#7C3AED",
    sort_order: 1,
  },
  {
    name: "Wearables, Home & Accessories",
    amount_value: 35.686,
    amount_unit: "B",
    percentage: 9,
    yoy_change: -4.0,
    color: "#0891B2",
    sort_order: 2,
  },
  {
    name: "Mac",
    amount_value: 33.708,
    amount_unit: "B",
    percentage: 8,
    yoy_change: 12.0,
    color: "#15803D",
    sort_order: 3,
  },
  {
    name: "iPad",
    amount_value: 28.023,
    amount_unit: "B",
    percentage: 7,
    yoy_change: 5.0,
    color: "#EA580C",
    sort_order: 4,
  },
];

const appleCompetitors = [
  {
    name: "Microsoft",
    icon: "building-store",
    color: "#7C3AED",
    background_tint: "#F5F3FF",
    tag_text_color: "#6D28D9",
    market_cap_value: 3930.00,
    market_cap_unit: "B",
    relative_size: 80,
    tag: "Technology",
    relationship:
      "Global technology company competing with Apple across personal computing, software, cloud services, AI, and enterprise technology.",
    sort_order: 0,
  },
  {
    name: "Alphabet",
    icon: "globe",
    color: "#2563EB",
    background_tint: "#EFF6FF",
    tag_text_color: "#1D4ED8",
    market_cap_value: 4290.00,
    market_cap_unit: "B",
    relative_size: 87,
    tag: "Technology & Services",
    relationship:
      "Technology company operating major consumer platforms, digital advertising, cloud services, AI products, and the Android ecosystem.",
    sort_order: 1,
  },
  {
    name: "Samsung Electronics",
    icon: "building-store",
    color: "#0891B2",
    background_tint: "#ECFEFF",
    tag_text_color: "#0E7490",
    market_cap_value: 1156.20,
    market_cap_unit: "B",
    relative_size: 24,
    tag: "Consumer Electronics",
    relationship:
      "Major global electronics company competing directly with Apple in smartphones, tablets, wearables, consumer electronics, and semiconductor technology.",
    sort_order: 2,
  },
  {
    name: "Sony Group",
    icon: "building-store",
    color: "#15803D",
    background_tint: "#F0FDF4",
    tag_text_color: "#166534",
    market_cap_value: 138.98,
    market_cap_unit: "B",
    relative_size: 3,
    tag: "Consumer Electronics",
    relationship:
      "Diversified consumer technology and entertainment company providing a useful comparison for Apple's hardware, entertainment, gaming, and digital ecosystem businesses.",
    sort_order: 3,
  },
];

const appleSeed: SeedCompany = {
  company: appleCompany,
  segments: appleSegments,
  competitors: appleCompetitors,
};
const tsmcCompany = {
  slug: "tsmc",
  name: "Taiwan Semiconductor Manufacturing Company Limited",
  brand_name: "TSMC",
  ticker: "TSM",
  exchange: "NYSE",
  industry: "Technology",
  revenue_basis: "segment",
  logo_initial: "T",
  logo: "/logos/tsmc-1.svg",

  tagline:
    "The world's leading dedicated semiconductor foundry, manufacturing advanced chips for technology companies around the world.",

  what_it_does:
    "TSMC manufactures semiconductor chips designed by other companies. Its customers include businesses that develop processors, smartphone chips, AI accelerators, networking chips, and automotive semiconductors. Rather than primarily selling its own branded chips, TSMC specializes in manufacturing customers' designs using advanced semiconductor process technologies.",

  founded: "1987",
  headquarters: "Hsinchu Science Park, Hsinchu, Taiwan",
  ceo: "C. C. Wei",
  ceo_since: "2018",

  scope_score: 9.5,
  scope_score_label: "Excellent",

  snapshot: [
    {
      icon: "shield-check",
      tone: "good",
      label: "Quality",
      rating: { kind: "stars", outOf: 5, value: 5 },
    },
    {
      icon: "building-store",
      tone: "good",
      label: "Scale",
      rating: { kind: "stars", outOf: 5, value: 5 },
    },
    {
      icon: "coin",
      tone: "good",
      label: "Profitability",
      rating: { kind: "stars", outOf: 4, value: 4 },
    },
    {
      icon: "trending-up",
      tone: "good",
      label: "Revenue growth",
      rating: { kind: "arrow", label: "Very Strong" },
    },
    {
      icon: "alert-triangle",
      tone: "risk",
      label: "Risk",
      rating: { kind: "badge", label: "High" },
    },
    {
      icon: "scale",
      tone: "neutral",
      label: "Valuation",
      rating: { kind: "badge", label: "Moderate" },
    },
  ],

  thirty_second_summary: {
    subtitle: "A plain-English explanation of TSMC's business model",
    content:
      "TSMC manufactures chips for other technology companies. Customers design their own processors and other semiconductors, then rely on TSMC to manufacture them using specialized factories and production processes. TSMC earns revenue by producing and selling these chips to customers. Its advanced manufacturing capabilities, manufacturing scale, and expertise make it an important supplier to industries including AI, data centers, smartphones, networking, automotive technology, and consumer electronics.",
  },

  business_model: {
    stages: [
      {
        icon: "chart-line",
        tags: [
          { icon: "users", label: "Chip Designers" },
          { icon: "globe", label: "Customer Designs" },
          { icon: "shield-check", label: "Process Technology" },
          { icon: "building-store", label: "Wafer Planning" },
        ],
        color: "#2563EB",
        title: "Receive Chip Designs",
        tagTextColor: "#1D4ED8",
        backgroundTint: "#EFF6FF",
      },
      {
        icon: "building-store",
        tags: [
          { icon: "building-store", label: "Semiconductor Fabs" },
          { icon: "chart-line", label: "Advanced Nodes" },
          { icon: "shield-check", label: "Quality Control" },
          { icon: "globe", label: "Manufacturing Scale" },
        ],
        color: "#0891B2",
        title: "Manufacture Chips",
        tagTextColor: "#0E7490",
        backgroundTint: "#ECFEFF",
      },
      {
        icon: "coin",
        tags: [
          { icon: "coin", label: "Wafer Revenue" },
          { icon: "users", label: "Global Customers" },
          { icon: "chart-line", label: "Capacity Expansion" },
          { icon: "trending-up", label: "R&D Investment" },
        ],
        color: "#15803D",
        title: "Generate Revenue & Reinvest",
        tagTextColor: "#166534",
        backgroundTint: "#F0FDF4",
      },
    ],

    insight:
      "TSMC focuses on semiconductor manufacturing rather than primarily designing and selling its own branded processors. Customers pay TSMC to manufacture their chip designs. Its scale, production expertise, process technology, and manufacturing yields help it serve demanding customers while investing heavily in the next generation of semiconductor production.",

    repeatNote:
      "TSMC creates value by manufacturing complex semiconductor designs at scale. It earns revenue from producing chips for customers, then reinvests substantial capital into factories, equipment, process technology, and research and development.",
  },

  strengths_and_risks: {
    strengths: [
      {
        icon: "building-store",
        title: "Advanced Manufacturing Expertise",
        description:
          "TSMC has extensive experience manufacturing complex semiconductors and developing advanced process technologies for demanding customers.",
      },
      {
        icon: "globe",
        title: "Critical Industry Position",
        description:
          "TSMC is a major manufacturing partner for companies producing processors and other chips used in AI, smartphones, data centers, and consumer electronics.",
      },
      {
        icon: "building-store",
        title: "Large Customer Ecosystem",
        description:
          "TSMC serves customers across several semiconductor markets, including high-performance computing, smartphones, automotive, and Internet of Things applications.",
      },
      {
        icon: "chart-line",
        title: "Strong Profitability",
        description:
          "TSMC reported a 59.9% gross profit margin and a 50.8% operating profit margin for 2025, reflecting strong manufacturing economics and demand for its technologies.",
      },
      {
        icon: "shield-check",
        title: "Manufacturing Scale",
        description:
          "Semiconductor production requires specialized facilities, equipment, process knowledge, and sustained investment, creating substantial barriers to entry.",
      },
    ],

    risks: [
      {
        icon: "alert-triangle",
        title: "Geopolitical Concentration",
        description:
          "TSMC's manufacturing footprint in Taiwan exposes the business to geopolitical tensions and potential disruption to semiconductor supply chains.",
      },
      {
        icon: "coin",
        title: "Very High Capital Requirements",
        description:
          "Building and equipping semiconductor fabrication plants requires substantial investment, and new facilities may take years to reach efficient production.",
      },
      {
        icon: "chart-line",
        title: "Semiconductor Cyclicality",
        description:
          "Demand for chips can fluctuate with customer inventories, consumer electronics demand, enterprise spending, and broader economic conditions.",
      },
      {
        icon: "building-store",
        title: "Technology Execution Risk",
        description:
          "Maintaining leadership requires continuous investment in new manufacturing processes, equipment, production yields, and engineering capabilities.",
      },
      {
        icon: "globe",
        title: "Customer & Industry Concentration",
        description:
          "A substantial portion of demand comes from advanced computing and smartphone applications, exposing TSMC to changes in customer demand and technology cycles.",
      },
    ],
  },

  financial_overview: {
    insight:
      "TSMC generated approximately $122.42B in revenue and $55.21B in net income in fiscal 2025. Its revenue increased 35.9% in US dollar terms compared with 2024, while net income increased 51.2%. The company continues to invest heavily in semiconductor manufacturing capacity and advanced process technologies.",

    metrics: [
      {
        icon: "report-money",
        label: "Revenue",
        value: { unit: "B", value: 122.42 },
        change: { value: 35.9 },
        sublabel: "FY25",
      },
      {
        icon: "coin",
        label: "Net Income",
        value: { unit: "B", value: 55.21 },
        change: { value: 51.2 },
        sublabel: "FY25",
      },
      {
        icon: "droplet",
        label: "Free Cash Flow",
        value: { unit: "B", value: 32.0 },
        change: { value: 12.0 },
        sublabel: "FY25",
      },
    ],

    fiscalYearLabel: "Fiscal year 2025 (ended December 31, 2025)",
  },

  financial_history: {
  panels: [
    {
      icon: "report-money",
      unit: "B",
      color: "#93C5FD",
      label: "Revenue",
      years: ["'21", "'22", "'23", "'24", "'25"],
      values: [57.0, 75.88, 69.3, 90.08, 122.42],
      changeNote: "+115% since FY21",
      highlightColor: "#2563EB",
      currentValueLabel: "$122.4B",
    },
    {
      icon: "coin",
      unit: "B",
      color: "#86EFAC",
      label: "Net Income",
      years: ["'21", "'22", "'23", "'24", "'25"],
      values: [21.4, 34.07, 26.88, 36.52, 55.21],
      changeNote: "+158% since FY21",
      highlightColor: "#15803D",
      currentValueLabel: "$55.2B",
    },
    {
      icon: "droplet",
      unit: "B",
      color: "#C4B5FD",
      label: "Free Cash Flow",
      years: ["'21", "'22", "'23", "'24", "'25"],
      values: [9.80, 17.70, 9.37, 27.08, 32.20],
      changeNote: "+229% since FY21",
      highlightColor: "#7C3AED",
      currentValueLabel: "$32.2B",
    },
  ],

  rangeLabel:
    "5-year trend, fiscal years 2021–2025; revenue and net income are reported in USD, while free cash flow is converted from reported NT$ amounts using each year's revenue exchange ratio.",
},

  ecosystem: {
    output: {
      icon: "building-store",
      name: "Semiconductor Manufacturing Platform",
      color: "#2563EB",
      description:
        "TSMC connects chip designers, semiconductor equipment suppliers, materials providers, manufacturing facilities, packaging partners, and global technology customers.",
      backgroundTint: "#EFF6FF",
    },

    insight:
      "TSMC sits between semiconductor designers and the companies that use finished chips in products. Its manufacturing infrastructure allows customers to turn chip designs into physical semiconductors without having to build and operate their own leading-edge fabrication facilities.",

    partners: [
      {
        icon: "chart-line",
        name: "Chip Designers",
        color: "#2563EB",
        description:
          "Semiconductor companies design processors, AI accelerators, networking chips, and other products that TSMC manufactures.",
        backgroundTint: "#EFF6FF",
      },
      {
        icon: "building-store",
        name: "Equipment & Materials Suppliers",
        color: "#7C3AED",
        description:
          "Specialized equipment manufacturers and materials suppliers provide the machinery, chemicals, silicon wafers, and other inputs needed for semiconductor production.",
        backgroundTint: "#F5F3FF",
      },
      {
        icon: "globe",
        name: "Technology Markets",
        color: "#15803D",
        description:
          "Finished semiconductors are used in AI infrastructure, data centers, smartphones, automotive systems, networking equipment, and consumer electronics.",
        backgroundTint: "#F0FDF4",
      },
    ],

    centerLabel: "TSMC",
    flowInLabel: "← Designs & materials",
    flowOutLabel: "Manufactured chips →",
    centerSublabel: "Dedicated semiconductor foundry",
  },

  overview: {
    ceo: "C. C. Wei",
    founded: "1987",
    revenue: { unit: "B", value: 122.42 },
    ceoSince: "2018",
    marketCap: { unit: "B", value: 2300 },
    revenueYoY: { value: 35.9 },
    whatItDoes:
      "TSMC manufactures semiconductors for customers across AI, high-performance computing, smartphones, automotive systems, and other technology markets.",
    headquarters: "Hsinchu Science Park, Hsinchu, Taiwan",
    marketCapRank: "",
    revenueFiscalYear: "FY25",
  },

  business_segments_insight:
    "TSMC reports revenue by platform, including High Performance Computing, Smartphone, Internet of Things, Automotive, Digital Consumer Electronics, and Other applications. These categories show the end markets that drive demand for its manufacturing services.",

  business_segments_footnote:
    "Fiscal year 2025 platform revenue is reported in the company's annual report. Before inserting segment records, verify each amount and percentage directly against the FY2025 platform revenue table so the segment totals and percentages match Scope's validator.",

  competitors_context_note:
    "Companies used as broad comparison references for TSMC's semiconductor manufacturing business. These companies operate in different parts of the semiconductor value chain, so they should not be interpreted as direct one-to-one competitors. Market capitalization values must use a consistent snapshot date.",

  competitors_insight:
    "TSMC's competitive position is shaped by its manufacturing scale and process technology. Samsung Electronics and Intel have semiconductor manufacturing operations, while GlobalFoundries provides a comparison for the dedicated foundry business. ASML is an important equipment supplier to the industry rather than a direct foundry competitor.",
};

const tsmcSegments = [
  {
    name: "High Performance Computing",
    amount_value: 70.2,
    amount_unit: "B",
    percentage: 57,
    yoy_change: 48.5,
    color: "#2563EB",
    sort_order: 0,
  },
  {
    name: "Smartphone",
    amount_value: 35.6,
    amount_unit: "B",
    percentage: 29,
    yoy_change: 10.5,
    color: "#7C3AED",
    sort_order: 1,
  },
  {
    name: "Internet of Things",
    amount_value: 6.1,
    amount_unit: "B",
    percentage: 5,
    yoy_change: 15.4,
    color: "#0891B2",
    sort_order: 2,
  },
  {
    name: "Automotive",
    amount_value: 6.0,
    amount_unit: "B",
    percentage: 5,
    yoy_change: 34.0,
    color: "#15803D",
    sort_order: 3,
  },
  {
    name: "Digital Consumer Electronics",
    amount_value: 1.5,
    amount_unit: "B",
    percentage: 1,
    yoy_change: 0.1,
    color: "#EA580C",
    sort_order: 4,
  },
  {
    name: "Others",
    amount_value: 3.0,
    amount_unit: "B",
    percentage: 3,
    yoy_change: 33.8,
    color: "#64748B",
    sort_order: 5,
  },
];

const tsmcCompetitors = [
  {
    name: "Samsung Electronics",
    icon: "building-store",
    color: "#2563EB",
    background_tint: "#EFF6FF",
    tag_text_color: "#1D4ED8",
    market_cap_value: 1156.2,
    market_cap_unit: "B",
    relative_size: 50,
    tag: "Semiconductors",
    relationship:
      "Samsung operates semiconductor manufacturing facilities and competes in selected foundry markets while also designing and selling its own chips and electronics.",
    sort_order: 0,
  },
  {
    name: "Intel",
    icon: "building-store",
    color: "#0891B2",
    background_tint: "#ECFEFF",
    tag_text_color: "#0E7490",
    market_cap_value: 535.7,
    market_cap_unit: "B",
    relative_size: 23,
    tag: "Semiconductors",
    relationship:
      "Intel designs processors and operates semiconductor manufacturing facilities, making it a relevant comparison for advanced chip production, though its business model differs from TSMC's pure-play foundry model.",
    sort_order: 1,
  },
  {
    name: "GlobalFoundries",
    icon: "building-store",
    color: "#15803D",
    background_tint: "#F0FDF4",
    tag_text_color: "#166534",
    market_cap_value: 0,
    market_cap_unit: "B",
    relative_size: 0,
    tag: "Foundry",
    relationship:
      "GlobalFoundries is a dedicated semiconductor foundry serving customers across automotive, communications, industrial, and other markets. Its market capitalization must be verified before seeding.",
    sort_order: 2,
  },
  {
    name: "ASML",
    icon: "building-store",
    color: "#7C3AED",
    background_tint: "#F5F3FF",
    tag_text_color: "#6D28D9",
    market_cap_value: 689.8,
    market_cap_unit: "B",
    relative_size: 30,
    tag: "Semiconductor Equipment",
    relationship:
      "ASML supplies advanced lithography equipment used by semiconductor manufacturers. It is an important industry partner and comparison company, but it is not a direct foundry competitor.",
    sort_order: 3,
  },
];

const tsmcSeed: SeedCompany = {
  company: tsmcCompany,
  segments: tsmcSegments,
  competitors: tsmcCompetitors,
};
const companySeeds: SeedCompany[] = [
  adobeSeed,
  salesforceSeed,
  oracleSeed,
  broadcomSeed,
  amdSeed,
  walmartSeed,
  netflixSeed,
  visaSeed,
  mastercardSeed,
  paypalSeed,
  jpmorganSeed,
  cocaColaSeed,
  mcdonaldsSeed,
  nikeSeed,
  berkshireHathawaySeed,
  costcoSeed,
  eliLillySeed,
  johnsonJohnsonSeed,
  unitedHealthGroupSeed,
  exxonMobilSeed,
  chevronSeed,
  nexteraEnergySeed,
  palantirSeed,
  appleSeed,
  tsmcSeed,
];
async function main() {
  for (const seed of companySeeds) {
    const { data: existingCompany, error: existingCompanyError } =
      await supabaseAdmin
        .from("companies")
        .select("id, slug, ticker")
        .eq("slug", seed.company.slug)
        .maybeSingle();

    if (existingCompanyError) {
      throw new Error(
        `${seed.company.name} lookup failed: ${existingCompanyError.message}`,
      );
    }

    let companyId: string;

    if (existingCompany) {
      const { error: companyUpdateError } = await supabaseAdmin
        .from("companies")
        .update(seed.company)
        .eq("id", existingCompany.id);

      if (companyUpdateError) {
        throw new Error(
          `${seed.company.name} update failed: ${companyUpdateError.message}`,
        );
      }

      companyId = existingCompany.id;

      console.log(
        `Company updated: ${existingCompany.slug} (${existingCompany.ticker})`,
      );
    } else {
      const { data: company, error: companyError } = await supabaseAdmin
        .from("companies")
        .insert(seed.company)
        .select("id, slug, ticker")
        .single();

      if (companyError) {
        throw new Error(
          `${seed.company.name} insert failed: ${companyError.message}`,
        );
      }

      companyId = company.id;

      console.log(
        `Company inserted: ${company.slug} (${company.ticker})`,
      );
    }

    const { error: deleteSegmentsError } = await supabaseAdmin
      .from("business_segments")
      .delete()
      .eq("company_id", companyId);

    if (deleteSegmentsError) {
      throw new Error(
        `${seed.company.name} segments delete failed: ${deleteSegmentsError.message}`,
      );
    }

    const segments = seed.segments.map((segment) => ({
      ...segment,
      company_id: companyId,
    }));

    const { error: segmentsError } = await supabaseAdmin
      .from("business_segments")
      .insert(segments);

    if (segmentsError) {
      throw new Error(
        `${seed.company.name} segments insert failed: ${segmentsError.message}`,
      );
    }

    console.log(`Segments synced: ${segments.length}`);

    const { error: deleteCompetitorsError } = await supabaseAdmin
      .from("competitors")
      .delete()
      .eq("company_id", companyId);

    if (deleteCompetitorsError) {
      throw new Error(
        `${seed.company.name} competitors delete failed: ${deleteCompetitorsError.message}`,
      );
    }

    const competitors = seed.competitors.map((competitor) => ({
      ...competitor,
      company_id: companyId,
    }));

    const { error: competitorsError } = await supabaseAdmin
      .from("competitors")
      .insert(competitors);

    if (competitorsError) {
      throw new Error(
        `${seed.company.name} competitors insert failed: ${competitorsError.message}`,
      );
    }

    console.log(`Competitors synced: ${competitors.length}`);
    console.log(`Seed completed: ${seed.company.slug}`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});