import type { BusinessModelDetail } from "./types";
import { SCOPE_DISCLAIMER } from "./types";

export const SAAS_DETAIL: BusinessModelDetail = {
  slug: "saas",

  headline:
    "Software that customers use online and often pay for through recurring subscriptions.",

  description:
    "Learn how Software as a Service (SaaS) companies deliver software, earn recurring revenue, manage costs, and measure business performance.",

  characteristics: {
    tags: [
      "Recurring Revenue",
      "Cloud-Delivered Software",
      "Subscription Pricing",
      "Business & Consumer Customers",
    ],
    note: "Not every SaaS company uses subscriptions alone. Some combine subscriptions with usage-based fees, services, or other revenue streams.",
  },

  whatIsIt: {
    sub: "Software delivered as an ongoing service rather than simply sold as a one-time product.",
    paragraphs: [
      "Software as a Service (SaaS) lets customers use software hosted and maintained by a provider, usually through a web browser or app. The provider handles the underlying infrastructure, updates, and ongoing operation.",
      "Examples include tools for managing customer relationships, creating digital content, collaborating with teams, and handling business operations.",
      "Customers may pay monthly, annually, per user, or according to how much they use the service. SaaS is a delivery and business model, not a guarantee of profitability or recurring revenue growth.",
    ],
  },

  flow: {
    sub: "A simple example of how a SaaS business serves customers and earns money.",
    steps: [
      {
        title: "Build the Software",
        text: "Create a product that solves a specific customer problem.",
        icon: "ti-code",
        examples: [
          "Customer relationship management",
          "Design and document tools",
        ],
      },
      {
        title: "Host and Maintain It",
        text: "Operate the service, protect customer data, and deliver updates.",
        icon: "ti-server",
        examples: [
          "Cloud infrastructure",
          "Security and software updates",
        ],
      },
      {
        title: "Acquire Customers",
        text: "Help potential customers discover, try, and adopt the product.",
        icon: "ti-users",
        examples: [
          "Free trials",
          "Sales teams and online marketing",
        ],
      },
      {
        title: "Charge for Access",
        text: "Collect subscription fees or charge for measured usage.",
        icon: "ti-credit-card",
        examples: [
          "Monthly subscriptions",
          "Usage-based billing",
        ],
      },
      {
        title: "Retain and Expand",
        text: "Keep customers satisfied and offer more value as their needs grow.",
        icon: "ti-refresh",
        examples: [
          "Better product features",
          "Additional users or plan upgrades",
        ],
      },
    ],
  },

    howItWorks: {
    sub: "From solving a problem to building an ongoing customer relationship.",
    intro:
      "Unlike a traditional one-time software sale, many SaaS businesses continue operating the product and serving customers throughout their subscriptions.",
    chain: [
      { title: "Find the problem", text: "Identify a problem customers need to solve", tag: "Problem" },
      { title: "Build and run it", text: "Develop and operate the software", tag: "Product" },
      { title: "Win customers", text: "Attract customers and help them get started", tag: "Customers" },
      { title: "Set the pricing", text: "Charge for subscriptions, usage, or additional features", tag: "Pricing" },
      { title: "Keep improving", text: "Maintain the service and improve the product", tag: "Operations" },
      { title: "Earn repeat revenue", text: "Earn repeat revenue when customers continue paying", tag: "Revenue" },
    ],
    outro:
      "The model works best when customers receive enough ongoing value to justify the cost. A subscription alone does not guarantee that they will renew.",
  },

  whoPays: {
    sub: "Customers pay when the software helps them accomplish something valuable.",
    items: [
      {
        title: "Businesses",
        text: "Companies purchase software to manage sales, accounting, marketing, operations, or other workflows.",
        icon: "ti-building",
      },
      {
        title: "Individual Professionals",
        text: "Freelancers, designers, developers, and other professionals pay for tools that help them work more effectively.",
        icon: "ti-user",
      },
      {
        title: "Consumers",
        text: "Individuals may subscribe to software for personal productivity, creative work, or other needs.",
        icon: "ti-device-laptop",
      },
      {
        title: "Large Organizations",
        text: "Enterprise customers may negotiate contracts covering many users, security requirements, support, and service commitments.",
        icon: "ti-building-skyscraper",
      },
    ],
  },

  makeMoney: {
    sub: "SaaS companies can combine several pricing methods. The right mix depends on the product and its customers.",
    items: [
      {
        title: "Subscription Revenue",
        text: "Customers pay a recurring fee for access to the software. Monthly and annual plans are common, although contract terms vary.",
        icon: "ti-calendar-repeat",
      },
      {
        title: "Pricing Tiers",
        text: "Different plans offer different features, usage limits, or levels of support. Customers may pay more when they need additional capabilities.",
        icon: "ti-layers",
      },
      {
        title: "Usage-Based Pricing",
        text: "Customers pay according to measured consumption, such as transactions processed, data used, or API requests. Revenue may fluctuate with usage.",
        icon: "ti-chart-bar",
      },
      {
        title: "Enterprise Contracts",
        text: "Larger customers may sign negotiated agreements with specific terms, service commitments, or minimum spending requirements.",
        icon: "ti-file-text",
      },
      {
        title: "Add-ons and Services",
        text: "Some providers earn additional revenue from premium features, implementation, training, or other services alongside their software.",
        icon: "ti-puzzle",
      },
    ],
  },

  moneyGoes: {
    sub: "Recurring revenue must cover the cost of building, delivering, and selling the service.",
    items: [
      {
        title: "Hosting and Infrastructure",
        text: "Servers, cloud services, storage, networking, and data processing support the software. Costs may increase as usage grows.",
        icon: "ti-server",
      },
      {
        title: "Product Development",
        text: "Engineers, designers, and product teams build new features, maintain existing software, and fix problems.",
        icon: "ti-code",
      },
      {
        title: "Customer Acquisition",
        text: "Marketing, advertising, sales teams, and sales commissions help attract new customers. Enterprise sales can be particularly resource-intensive.",
        icon: "ti-speakerphone",
      },
      {
        title: "Customer Support",
        text: "Support staff, onboarding, training, and account management help customers use the product and resolve issues.",
        icon: "ti-headset",
      },
      {
        title: "Security and Operations",
        text: "Companies may spend on data protection, compliance, reliability, administration, and other operating requirements.",
        icon: "ti-shield-check",
      },
    ],
  },

  growth: {
    drivers: {
      title: "What Can Drive Growth?",
      items: [
        "More businesses adopting software to digitize existing workflows.",
        "A product that becomes useful enough for customers to keep renewing.",
        "Expansion within existing customers as they add users or adopt more features.",
        "New products, customer segments, or geographic markets.",
        "Pricing that captures additional value as customer needs grow.",
      ],
    },
    opportunities: {
      title: "Where Can Opportunities Appear?",
      items: [
        "Solving a specific problem for an underserved customer group.",
        "Replacing manual processes or fragmented software tools.",
        "Connecting with other products to become part of an important workflow.",
        "Serving specialized industries with distinct requirements.",
        "Using automation or AI to improve an existing product, when it creates genuine customer value.",
      ],
    },
    callout:
      "Growth depends on the product, market, competition, customer retention, and operating costs. A large market or a subscription model alone does not guarantee success.",
  },

  strength: {
    title: "Potential Strengths",
    sub: "Features of the model that can help some SaaS businesses build durable customer relationships.",
    items: [
      {
        title: "Repeat Revenue",
        text: "Ongoing contracts or subscriptions can make future revenue easier to estimate, provided customers continue paying.",
        icon: "ti-calendar-repeat",
      },
      {
        title: "Scalable Distribution",
        text: "Software can often serve additional customers without rebuilding the entire product for each customer, although infrastructure and support costs still matter.",
        icon: "ti-trending-up",
      },
      {
        title: "Continuous Improvement",
        text: "A provider can update its software and deliver improvements to customers over time.",
        icon: "ti-refresh",
      },
      {
        title: "Customer Expansion",
        text: "A product may earn more from existing customers as their usage, team size, or feature requirements increase.",
        icon: "ti-users",
      },
    ],
  },

  competition: {
    compete: {
      title: "How Do SaaS Companies Compete?",
      items: [
        "Solve a customer problem better or more simply than alternatives.",
        "Offer reliable performance, security, and a good user experience.",
        "Integrate with the other tools customers already use.",
        "Provide suitable pricing, onboarding, and customer support.",
        "Build trust and fit into workflows that customers depend on.",
      ],
    },
    challenges: {
      title: "Common Challenges",
      items: [
        "Customers can cancel or switch when they no longer see enough value.",
        "Competition may force companies to improve products or reduce prices.",
        "Enterprise sales can take time and require significant resources.",
        "Growing customer usage can increase hosting, support, and infrastructure costs.",
        "Rapid product changes can require continued investment in engineering and security.",
      ],
    },
  },

  risks: {
    sub: "SaaS businesses face different risks depending on their product, customers, contracts, and cost structure.",
    items: [
      {
        title: "Customer Churn",
        text: "Customers may cancel subscriptions, downgrade plans, or move to competitors. Acquiring replacement customers can be expensive.",
        icon: "ti-user-minus",
      },
      {
        title: "High Acquisition Costs",
        text: "Marketing and sales spending may grow faster than the revenue generated by new customers.",
        icon: "ti-currency-dollar",
      },
      {
        title: "Infrastructure Costs",
        text: "Heavy usage, data processing, or expensive computing requirements can put pressure on margins.",
        icon: "ti-server",
      },
      {
        title: "Security and Reliability",
        text: "Data breaches, outages, or failures to meet customer requirements can damage trust and create financial or legal consequences.",
        icon: "ti-shield-exclamation",
      },
      {
        title: "Product Obsolescence",
        text: "Technology changes or new competitors can reduce the value of a product unless the company adapts.",
        icon: "ti-refresh",
      },
      {
        title: "Revenue Concentration",
        text: "A provider that depends heavily on a small number of large customers may be vulnerable if one reduces spending or leaves.",
        icon: "ti-chart-pie",
      },
    ],
  },

  metrics: {
    sub: "These metrics help explain revenue, customer retention, and operating efficiency. Definitions and calculation methods can vary, so comparisons require consistent measurement.",

    items: [
      {
        label: "MRR",
        fullName: "Monthly Recurring Revenue",
        text: "The normalized monthly value of active recurring subscriptions. It helps track the recurring revenue base, but it is not the same as cash collected or profit.",
        icon: "ti-calendar",
      },
      {
        label: "ARR",
        fullName: "Annual Recurring Revenue",
        text: "The annualized value of recurring revenue under a company's chosen methodology. It is useful for understanding the scale of recurring business, but is not automatically the same as recognized annual revenue.",
        icon: "ti-calendar-stats",
      },
      {
        label: "Churn Rate",
        text: "The share of customers or recurring revenue lost during a period. Customer churn and revenue churn measure different things, so the definition should always be clear.",
        icon: "ti-user-minus",
      },
      {
        label: "CAC",
        fullName: "Customer Acquisition Cost",
        text: "The cost of acquiring a new customer. Companies commonly compare sales and marketing costs with the number of customers acquired over a consistent period.",
        icon: "ti-user-plus",
      },
      {
        label: "Gross Margin",
        text: "Revenue remaining after subtracting the direct costs of delivering the service, expressed as a percentage of revenue. Hosting, support, and other delivery costs can affect it.",
        icon: "ti-percentage",
      },
      {
        label: "LTV",
        fullName: "Customer Lifetime Value",
        text: "An estimate of the value a customer generates over the relationship. A useful economic estimate considers gross profit and retention, not just total revenue, and depends on assumptions.",
        icon: "ti-users",
      },
      {
        label: "NRR",
        fullName: "Net Revenue Retention",
        text: "Measures recurring revenue retained from an existing customer group, including expansion and subtracting downgrades and cancellations, while excluding new customers. Above 100% means expansion exceeded losses for that group; it does not mean the company is profitable.",
        icon: "ti-trending-up",
      },
    ],

    callout:
      "No single metric tells the whole story. Read these measures together and consider the company's customer mix, contract structure, growth stage, and accounting definitions.",
  },

  companies: {
    sub: "These companies offer subscription-based software products. Each also has its own product mix and business activities, so none should be treated as a pure SaaS business without further context.",
    items: [
      {
        slug: "salesforce",
        role: "Provides cloud-based customer relationship management (CRM) software and related business applications. Its subscription and support business is central to how it earns revenue.",
      },
      {
        slug: "adobe",
        role: "Offers subscription-based software such as Creative Cloud and Acrobat, along with digital experience products. Adobe also reports other revenue categories, so its entire business should not be described as SaaS alone.",
      },
      {
        slug: "oracle",
        role: "Provides cloud-based business applications, including enterprise resource planning and human resources software. Oracle also operates a broader database and cloud infrastructure business.",
      },
    ],
  },

  related: {
    sub: "SaaS can overlap with other business models, depending on the product and how it is delivered.",
    slugs: ["ai"],
  },

  disclaimer: SCOPE_DISCLAIMER,
};