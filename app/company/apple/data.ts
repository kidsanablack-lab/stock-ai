export const appleProfile = {
  hero: {
    logo: "🍎",
    name: "Apple Inc.",
    exchange: "NASDAQ",
    ticker: "AAPL",
    industry: "Consumer Electronics & Technology",
    founded: "1976",
    ceo: "Tim Cook",
    headquarters: "Cupertino, California, USA",
    marketCap: "$3.42T",
    revenue: "$391.0B",
    businessDescription:
      "Apple designs premium hardware, software, and services that work together as one of the world’s most loyal technology ecosystems.",
    aiQualityScore: 92,
    aiScore: "9.5/10",
  },
  metrics: [
    { label: "Market Cap", value: "$3.42T", change: "+18.4% YoY", positive: true },
    { label: "Revenue", value: "$391.0B", change: "+2.0% YoY", positive: true },
    { label: "Net Income", value: "$97.0B", change: "+3.9% YoY", positive: true },
    { label: "P/E Ratio", value: "32.4x", change: "vs. sector 28.1x" },
  ],
  overview:
    "Apple designs, manufactures, and markets smartphones, personal computers, tablets, wearables, and accessories worldwide. Its integrated hardware-software-services ecosystem creates exceptional customer loyalty and recurring revenue. With over 2 billion active devices and a rapidly growing services business, Apple remains one of the most valuable and profitable companies in the world.",
  revenueBreakdown: [
    { label: "iPhone", value: 52, amount: "$203.5B", color: "bg-zinc-900" },
    { label: "Services", value: 24, amount: "$94.0B", color: "bg-blue-600" },
    { label: "Mac", value: 8, amount: "$31.3B", color: "bg-zinc-600" },
    { label: "iPad", value: 7, amount: "$27.4B", color: "bg-zinc-500" },
    {
      label: "Wearables & Other",
      value: 9,
      amount: "$35.2B",
      color: "bg-emerald-600",
    },
  ],
  products: [
    {
      name: "iPhone",
      description:
        "Flagship smartphone line driving the majority of revenue with premium positioning and annual upgrade cycles.",
      tag: "Hardware",
      accent: "from-zinc-50 to-white",
    },
    {
      name: "Mac",
      description:
        "Personal computers powered by Apple Silicon, targeting professionals and creative users.",
      tag: "Hardware",
      accent: "from-slate-50 to-white",
    },
    {
      name: "iPad",
      description:
        "Tablet portfolio spanning entry-level to Pro models for productivity and entertainment.",
      tag: "Hardware",
      accent: "from-sky-50 to-white",
    },
    {
      name: "Apple Watch",
      description:
        "Leading smartwatch with health monitoring, fitness tracking, and ecosystem integration.",
      tag: "Wearable",
      accent: "from-rose-50 to-white",
    },
    {
      name: "AirPods",
      description:
        "Wireless audio products with seamless device pairing and strong brand affinity.",
      tag: "Accessory",
      accent: "from-zinc-50 to-white",
    },
  ],
  services: [
    {
      name: "App Store",
      description:
        "Digital marketplace generating commission revenue from app and in-app purchases.",
      tag: "Platform",
      accent: "from-blue-50 to-white",
    },
    {
      name: "Apple Music",
      description:
        "Subscription streaming service competing in the global music market.",
      tag: "Subscription",
      accent: "from-pink-50 to-white",
    },
    {
      name: "iCloud",
      description:
        "Cloud storage and sync service deeply integrated across all Apple devices.",
      tag: "Subscription",
      accent: "from-sky-50 to-white",
    },
    {
      name: "Apple TV+",
      description:
        "Original content streaming platform bundled within Apple One subscriptions.",
      tag: "Entertainment",
      accent: "from-amber-50 to-white",
    },
    {
      name: "Apple Pay",
      description:
        "Contactless payments and digital wallet expanding into financial services.",
      tag: "Fintech",
      accent: "from-emerald-50 to-white",
    },
  ],
  financialHighlights: [
    {
      metric: "Total Revenue",
      fy2022: "$394.3B",
      fy2023: "$383.3B",
      fy2024: "$391.0B",
    },
    {
      metric: "Net Income",
      fy2022: "$99.8B",
      fy2023: "$97.0B",
      fy2024: "$97.0B",
    },
    {
      metric: "Gross Margin",
      fy2022: "43.3%",
      fy2023: "44.1%",
      fy2024: "46.2%",
    },
    {
      metric: "EPS (Diluted)",
      fy2022: "$6.11",
      fy2023: "$6.13",
      fy2024: "$6.42",
    },
    {
      metric: "Free Cash Flow",
      fy2022: "$111.4B",
      fy2023: "$99.6B",
      fy2024: "$108.8B",
    },
  ],
  analysis: [
    {
      title: "Strengths",
      items: [
        "Unmatched brand loyalty and premium pricing power across product lines",
        "Sticky ecosystem with 2B+ active devices driving recurring services revenue",
        "Industry-leading margins and $160B+ in cash and marketable securities",
        "Apple Silicon delivers performance and efficiency advantages in Mac and iPad",
      ],
      accent: "bg-emerald-500",
      border: "border-emerald-100",
    },
    {
      title: "Weaknesses",
      items: [
        "Heavy revenue dependence on iPhone upgrade cycles",
        "Limited presence in cloud infrastructure compared to hyperscale peers",
        "Slower AI product rollout relative to Microsoft and Google",
        "Premium pricing limits addressable market in emerging economies",
      ],
      accent: "bg-amber-500",
      border: "border-amber-100",
    },
    {
      title: "Risks",
      items: [
        "Regulatory pressure on App Store fees and antitrust scrutiny globally",
        "Geopolitical exposure with significant manufacturing in China",
        "Intensifying smartphone competition in key growth markets",
        "Supply chain disruptions affecting product availability and margins",
      ],
      accent: "bg-rose-500",
      border: "border-rose-100",
    },
    {
      title: "Opportunities",
      items: [
        "Apple Intelligence could reignite iPhone upgrade supercycle",
        "Services revenue growing faster than hardware with higher margins",
        "Expansion in India and Southeast Asia as new manufacturing hubs",
        "Health, fintech, and spatial computing as long-term growth vectors",
      ],
      accent: "bg-blue-500",
      border: "border-blue-100",
    },
  ],
  competitors: [
    {
      name: "Microsoft",
      description:
        "Enterprise software and cloud leader competing in productivity and AI.",
      tag: "MSFT",
      accent: "from-sky-50 to-white",
    },
    {
      name: "Google",
      description:
        "Dominant in search, mobile OS, and AI with Android ecosystem scale.",
      tag: "GOOGL",
      accent: "from-blue-50 to-white",
    },
    {
      name: "Samsung",
      description:
        "Global smartphone and display rival with vertically integrated hardware.",
      tag: "005930",
      accent: "from-indigo-50 to-white",
    },
    {
      name: "Amazon",
      description:
        "Competes in streaming, cloud, and voice assistants across consumer tech.",
      tag: "AMZN",
      accent: "from-amber-50 to-white",
    },
  ],
  businessSummary: {
  title: "What does Apple do?",
  description:
    "Apple designs and sells consumer electronics, software, and digital services. Its products work together as one integrated ecosystem.",
},
revenueSources: [
  {
    title: "iPhone",
    description:
      "Apple's largest revenue source. Premium smartphones sold worldwide.",
    percentage: "52%",
  },
  {
    title: "Services",
    description:
      "App Store, iCloud, Apple Music, Apple TV+, AppleCare, and subscriptions.",
    percentage: "24%",
  },
  {
    title: "Mac",
    description:
      "MacBook, iMac, and Mac mini for professionals, students, and businesses.",
    percentage: "8%",
  },
  {
    title: "iPad",
    description:
      "Tablets for education, creativity, entertainment, and business.",
    percentage: "7%",
  },
  {
    title: "Wearables",
    description:
      "Apple Watch, AirPods, and accessories.",
    percentage: "9%",
  },
],
customers: [
  {
    icon: "👨‍👩‍👧‍👦",
    title: "Consumers",
  },
  {
    icon: "🏢",
    title: "Businesses",
  },
  {
    icon: "🎓",
    title: "Education",
  },
  {
    icon: "👨‍💻",
    title: "Developers",
  },
],

strengths: [
  {
    icon: "🍎",
    title: "Strong Brand",
    description: "One of the world's most valuable and recognizable brands.",
  },
  {
    icon: "🔄",
    title: "Integrated Ecosystem",
    description: "Hardware, software, and services work seamlessly together.",
  },
  {
    icon: "❤️",
    title: "Customer Loyalty",
    description: "High retention and repeat purchases across product lines.",
  },
  {
    icon: "💰",
    title: "High Margins",
    description: "Premium pricing supports strong profitability.",
  },
],

risks: [
  {
    icon: "📱",
    title: "iPhone Dependence",
    description:
      "A large portion of Apple's revenue still comes from the iPhone.",
  },
  {
    icon: "🇨🇳",
    title: "China Market",
    description:
      "Apple faces increasing competition and geopolitical risks in China.",
  },
  {
    icon: "⚖️",
    title: "Regulation",
    description:
      "Governments continue to scrutinize App Store policies and fees.",
  },
  {
    icon: "🏭",
    title: "Supply Chain",
    description:
      "Manufacturing depends on a complex global supply chain.",
  },
],

thirtySecondSummary: {
  title: "30-second Summary",
  subtitle: "If you only remember one thing...",
  content:
    "Apple generates most of its revenue from the iPhone while rapidly expanding high-margin services such as the App Store, iCloud, Apple Music, and Apple TV+. Its biggest competitive advantage is its integrated ecosystem, which keeps customers loyal and drives repeat purchases.",
  }
};