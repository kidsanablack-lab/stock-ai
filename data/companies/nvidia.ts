import type { CompanyProfile } from "@/types/company";

export const nvidiaProfile: CompanyProfile = {
  identity: {
    name: "NVIDIA Corporation",
    ticker: "NVDA",
    exchange: "NASDAQ",
    industry: "Technology",
    logoInitial: "N",
    logo: "/logos/nvidia-svgrepo-com.svg",
    tagline:
      "Designs the GPUs, networking systems, and software that power modern AI, accelerated computing, gaming, and autonomous machines.",
  },

  scopeScore: {
    score: 9.6,
    label: "Excellent",
  },

  overview: {
    whatItDoes:
      "NVIDIA designs the computing platforms that power modern AI — combining GPUs, CPUs, networking, and software such as CUDA into full-stack systems used by cloud providers, AI companies, enterprises, and developers.",
    founded: "1993",
    headquarters: "Santa Clara, California",
    ceo: "Jensen Huang",
    ceoSince: "1993",
    marketCap: {
  value: 5.25,
  unit: "T",
},
marketCapRank: "#1 in the world",
revenue: {
  value: 215.9,
  unit: "B",
},
revenueYoY: {
  value: 65,
},
revenueFiscalYear: "FY26",

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
      rating: { kind: "badge", label: "High" },
    },
    {
      label: "Valuation",
      icon: "scale",
      tone: "neutral",
      rating: { kind: "badge", label: "Rich" },
    },
  ],

  thirtySecondSummary: {
    subtitle: "A plain-English explanation of NVIDIA's business model",
    content:
      "NVIDIA makes money by selling the computing infrastructure behind the AI boom. Its GPUs, networking systems, and CUDA software are used by cloud providers, AI labs, enterprises, and governments to train and run AI models at massive scale. The company's biggest advantage is not just the chip itself, but the full ecosystem around CUDA, networking, systems, and software — which makes NVIDIA difficult to replace once customers build their AI infrastructure around it.",
  },

  businessSegments: {
    totalRevenue: {
  value: 215.9,
  unit: "B",
},
    fiscalYearLabel: "FY26 revenue",
    segments: [
      {
        name: "Data Center",
        amount: {
      value: 193.7,
      unit: "B",
      },
        percentage: 89.7,
        yoyChange: {
        value:68,
      },
        color: "#76B900",
      },
      {
        name: "Gaming",
        amount: {
          value: 16.0,
          unit: "B",
        },
        percentage: 7.4,
        yoyChange: {
          value: 41,
        },
        color: "#3B82F6",
      },
      {
        name: "Professional Visualization",
        amount: {
          value: 3.2,
          unit: "B",
        },
        percentage: 1.5,
        yoyChange: {
          value: 70,
        },
        color: "#8B5CF6",
      },
      {
        name: "Automotive",
        amount: {
          value: 2.3,
          unit: "B",
        },
        percentage: 1.1,
        yoyChange: {
          value: 39,
        },
        color: "#F59E0B",
      },
      {
        name: "OEM & Other",
        amount: {
          value: 0.6,
          unit: "B",
        },
        percentage: 0.3,
        yoyChange: {
          value: 59,
        },
        color: "#94A3B8",
      },
    ],
    insight:
      "Data Center now generates nearly 90% of NVIDIA's revenue — making the company one of the clearest financial bets on continued AI infrastructure spending. Gaming remains important, but NVIDIA has effectively transformed from a graphics-chip company into an AI infrastructure company.",
    footnote:
      "Fiscal year 2026 (ended Jan 25, 2026). NVIDIA reports two formal operating segments — Compute & Networking and Graphics — but the Scope breakdown above uses NVIDIA's market-platform revenue categories because they better explain where the company's revenue actually comes from.",
  },

  businessModel: {
    stages: [
      {
        title: "Design the Platform",
        icon: "cpu",
        color: "#76B900",
        backgroundTint: "#f0f9e8",
        tagTextColor: "#4d7a00",
        tags: [
          { label: "GPUs", icon: "cpu" },
          { label: "CPUs", icon: "server" },
          { label: "Networking", icon: "network" },
          { label: "Systems", icon: "box" },
        ],
      },
      {
        title: "Build AI Infrastructure",
        icon: "server",
        color: "#3b82f6",
        backgroundTint: "#eff6ff",
        tagTextColor: "#1d4ed8",
        tags: [
          { label: "Blackwell", icon: "cpu" },
          { label: "NVLink", icon: "link" },
          { label: "InfiniBand", icon: "route" },
          { label: "CUDA", icon: "code" },
          { label: "AI Enterprise", icon: "building" },
        ],
      },
      {
        title: "Scale AI Workloads",
        icon: "cloud",
        color: "#8b5cf6",
        backgroundTint: "#f5f3ff",
        tagTextColor: "#6d28d9",
        tags: [
          { label: "Training", icon: "brain" },
          { label: "Inference", icon: "bulb" },
          { label: "Cloud", icon: "cloud" },
          { label: "Robotics", icon: "robot" },
        ],
      },
    ],
    repeatNote: "New architectures trigger recurring infrastructure upgrade cycles",
    insight:
      "NVIDIA's business compounds because each new generation is more than a faster GPU — it is a new platform of chips, networking, systems, and software that customers deploy at data-center scale. Once developers and infrastructure teams build around CUDA and NVIDIA's ecosystem, replacing the platform becomes much harder than simply swapping one chip for another.",
  },

  strengthsAndRisks: {
    strengths: [
      {
        icon: "cpu",
        title: "AI Platform Leadership",
        description: "Leads the accelerated-computing infrastructure used to train and run modern AI models",
      },
      {
        icon: "code",
        title: "CUDA Ecosystem",
        description: "CUDA and its software stack create a deep developer and application ecosystem around NVIDIA GPUs",
      },
      {
        icon: "layers",
        title: "Full-Stack Advantage",
        description: "Combines GPUs, CPUs, networking, systems, and software instead of selling chips in isolation",
      },
      {
        icon: "tag",
        title: "Pricing Power",
        description: "Exceptional demand and differentiated performance support unusually high gross margins",
      },
      {
        icon: "cloud",
        title: "AI Infrastructure Scale",
        description: "Its platforms are deployed by hyperscalers, AI labs, enterprises, governments, and startups worldwide",
      },
    ],
    risks: [
      {
        icon: "server",
        title: "Data Center Concentration",
        description: "Nearly 90% of revenue now depends on Data Center demand",
      },
      {
        icon: "users",
        title: "Customer Concentration",
        description: "Two direct customers represented 22% and 14% of FY26 revenue",
      },
      {
        icon: "world",
        title: "Export Controls",
        description: "US-China restrictions can limit NVIDIA's ability to sell advanced AI products into China",
      },
      {
        icon: "swords",
        title: "Custom AI Chips",
        description: "Hyperscalers are increasingly developing their own chips to reduce dependence on NVIDIA",
      },
      {
        icon: "building-factory",
        title: "Supply Chain",
        description: "Relies on a concentrated ecosystem of advanced foundries, memory suppliers, and packaging partners",
      },
    ],
  },

  financialOverview: {
    fiscalYearLabel: "Fiscal year 2026 (ended Jan 25, 2026)",
    metrics: [
      {
        label: "Revenue",
        icon: "report-money",
        value: {
          value: 215.9,
          unit: "B"
        },
        change:{
          value:65,
        },
        sublabel: "FY26",
      },
      {
        label: "Net Income",
        icon: "coin",
        value: {
          value: 120.1,
          unit: "B"
        },
        change: {
          value: 65
        },
        sublabel: "FY26",
      },
      {
        label: "Free Cash Flow",
        icon: "droplet",
        value:{ value: 96.7, unit: "B" },
        change: { value: 58.9 },
        sublabel: "FY26",
      },
    ],
    insight:
      "NVIDIA is converting the AI boom into extraordinary profits: revenue grew 65% in FY26 while net income reached $120.1B. The bigger question is no longer whether NVIDIA can grow — it is how long AI infrastructure spending can sustain growth at this scale.",
  },

  financialHistory: {
    rangeLabel: "5-year trend, fiscal years 2022–2026",
    panels: [
      {
        label: "Revenue",
        icon: "report-money",
        color: "#bef264",
        highlightColor: "#4d7a00",
        years: ["'22", "'23", "'24", "'25", "'26"],
        values: [26.9, 27.0, 60.9, 130.5, 215.9],
        unit: "B",
        currentValueLabel: "$215.9B",
        changeNote: "+702% since FY22",
      },
      {
        label: "Net Income",
        icon: "coin",
        color: "#5eead4",
        highlightColor: "#0f766e",
        years: ["'22", "'23", "'24", "'25", "'26"],
        values: [9.8, 4.4, 29.8, 72.9, 120.1],
        unit: "B",
        currentValueLabel: "$120.1B",
        changeNote: "+1,130% since FY22",
      },
      {
        label: "Free Cash Flow",
        icon: "droplet",
        color: "#fcd34d",
        highlightColor: "#b45309",
        years: ["'22", "'23", "'24", "'25", "'26"],
        values: [8.1, 3.8, 27.0, 60.9, 96.7],
        unit: "B",
        currentValueLabel: "$96.7B",
        changeNote: "+1,089% since FY22",
      },
    ],
  },

  ecosystem: {
  partners: [
      {
        name: "TSMC",
        description: "Manufactures NVIDIA's advanced GPUs and processors at leading-edge nodes",
        icon: "cpu",
        color: "#1d3557",
        backgroundTint: "#e7edf5",
      },
      {
        name: "SK hynix",
        description: "Supplies and co-develops high-bandwidth memory critical to NVIDIA's AI platforms",
        icon: "database",
        color: "#8b5cf6",
        backgroundTint: "#f5f3ff",
      },
      {
        name: "Micron",
        description: "Provides high-bandwidth memory used in NVIDIA's AI computing platforms",
        icon: "database",
        color: "#f59e0b",
        backgroundTint: "#fffbeb",
      },
    ],
    centerLabel: "NVIDIA",
    centerSublabel: "The AI platform",
    output: {
      name: "AI Infrastructure Customers",
      description: "Cloud providers, AI labs, enterprises, governments, and developers build AI systems on NVIDIA's platform",
      icon: "users",
      color: "#76B900",
      backgroundTint: "#f0f9e8",
    },
    flowInLabel: "← Chips, memory & manufacturing flow in",
    flowOutLabel: "AI computing infrastructure flows out →",
    insight:
      "NVIDIA sits in the middle of a massive AI infrastructure ecosystem: advanced chips and memory flow in, while cloud providers, AI labs, enterprises, and governments use NVIDIA's platform to build the computing infrastructure behind AI.",
  },

  competitors: {
    contextNote:
      "Companies that compete with NVIDIA across AI accelerators, custom silicon, cloud infrastructure, and networking. Market cap shown relative to NVIDIA's ~$5.25T (September 2026 snapshot).",
    competitors: [
      {
        name: "AMD",
        icon: "cpu",
        color: "#1d3557",
        backgroundTint: "#e7edf5",
        tagTextColor: "#1d3557",
        marketCap:{
          value:760, 
          unit:"B" 
        }, 
        relativeSize: 15,
        tag: "AI Accelerators & CPUs",
        relationship: "Direct rival — competes with NVIDIA's GPUs and AI accelerators in data centers and high-performance computing",
      },
      {
        name: "Broadcom",
        icon: "network",
        color: "#e76f51",
        backgroundTint: "#fbe9e5",
        tagTextColor: "#c1502f",
        marketCap: {
          value: 1.75,
          unit: "T"
        },
        relativeSize: 34,
        tag: "Custom AI Chips & Networking",
        relationship: "Strategic competitor — helps hyperscalers build custom AI accelerators that can reduce reliance on NVIDIA GPUs",
      },
      {
        name: "Alphabet",
        icon: "brand-google",
        color: "#2a9d8f",
        backgroundTint: "#e6f5f3",
        tagTextColor: "#0f766e",
        marketCap:{ 
          value: 4.2,
           unit: "T"
           },
        relativeSize: 80,
        tag: "Custom TPUs & AI Infrastructure",
        relationship: "Vertical competitor — Google's custom TPU ecosystem gives it an alternative to NVIDIA GPUs for its own AI workloads and Google Cloud",
      },
      {
        name: "Amazon",
        icon: "brand-amazon",
        color: "#f59e0b",
        backgroundTint: "#fffbeb",
        tagTextColor: "#b45309",
        marketCap: {
          value: 2.8,
          unit: "T"
        },
        relativeSize: 53,
        tag: "Cloud & Custom AI Chips",
        relationship: "Customer and competitor — AWS buys NVIDIA systems at scale while developing its own Trainium and Inferentia accelerators",
      },
    ],
    insight:
      "AMD is NVIDIA's clearest direct chip rival, but the bigger long-term threat may come from customers building their own AI accelerators. NVIDIA is competing not only against other chip designers, but against the decision to build an alternative computing stack altogether.",
  },
};