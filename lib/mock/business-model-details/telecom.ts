import { SCOPE_DISCLAIMER, type BusinessModelDetail } from "./types";

export const TELECOM_DETAIL: BusinessModelDetail = {
  slug: "telecom",

  headline: "How Telecom Companies Make Money",

  description:
    "Telecom companies connect people, homes, devices, and organizations through wireless and wired networks. Many earn recurring revenue from service plans and connectivity contracts, but maintaining competitive networks requires substantial investment, ongoing operating costs, and careful customer management.",

  characteristics: {
    tags: [
      "Recurring Revenue",
      "Capital Intensive",
      "Network Infrastructure",
      "Customer Retention",
      "Scale",
      "Price Competition",
    ],
    note:
      "Telecom is not one uniform business model. Mobile operators, broadband providers, enterprise network providers, and virtual operators can have different assets, costs, and revenue structures. A company's profitability depends on its specific business mix, competitive position, investment needs, and execution.",
  },

  whatIsIt: {
    sub: "A business built around connecting customers",

    paragraphs: [
      "Telecommunications companies provide the networks and services that allow people and organizations to communicate and access the internet. Depending on the company, this can include mobile phone service, home broadband, business connectivity, and network access sold to other service providers.",

      "Many telecom providers collect recurring payments. For example, a customer may pay a monthly fee for a mobile plan or home internet connection. Businesses may also sign contracts for connectivity, managed networks, or other communications services. Revenue can therefore come from individual customers, organizations, and other telecom operators.",

      "However, recurring revenue does not automatically mean high profit. Companies must pay to operate and maintain their networks, serve customers, compete on price, and invest in infrastructure. The economics also differ between operators that build and operate their own networks and virtual operators that purchase network access from other providers.",
    ],
  },

  flow: {
    sub: "From network investment to customer revenue",

    steps: [
      {
        title: "Build or Access a Network",
        text:
          "A provider invests in or obtains access to the infrastructure needed to deliver connectivity. Depending on the model, this may involve spectrum rights, radio equipment, fiber, transmission systems, or wholesale network agreements.",
        icon: "ti-building-broadcast-tower",
        examples: [
          "Mobile network infrastructure",
          "Fiber broadband networks",
          "Wholesale network access agreements",
        ],
      },
      {
        title: "Connect Customers",
        text:
          "The provider sells connectivity to consumers, households, businesses, or other operators. The services and pricing depend on the customer's needs and the provider's network capabilities.",
        icon: "ti-devices",
        examples: [
          "Mobile service plans",
          "Home internet subscriptions",
          "Business connectivity contracts",
        ],
      },
      {
        title: "Collect Service Revenue",
        text:
          "Customers pay recurring fees, usage-based charges, or contracted service fees. Some providers also earn revenue from equipment sales and other services, which should be distinguished from connectivity revenue.",
        icon: "ti-receipt",
        examples: [
          "Monthly mobile bills",
          "Broadband subscription fees",
          "Enterprise network service contracts",
        ],
      },
      {
        title: "Operate and Upgrade",
        text:
          "The provider maintains service quality, supports customers, manages network capacity, and invests in upgrades. These activities affect costs, customer retention, and the cash available for other uses.",
        icon: "ti-settings",
        examples: [
          "Network maintenance",
          "Capacity upgrades",
          "Customer support and service reliability",
        ],
      },
    ],
  },

  howItWorks: {
    sub: "The economics behind a connectivity business",

    intro:
      "Telecom economics depend on how much customers pay, how costly they are to serve, and how efficiently the network and other assets are used.",

    chain: [
      {
        title: "Invest in Infrastructure",
        text:
          "Build, acquire, lease, or obtain access to the network assets needed to provide service. The amount of investment varies by technology, geography, and business model.",
        tag: "Infrastructure",
      },
      {
        title: "Acquire and Connect Customers",
        text:
          "Attract households, individuals, and organizations with suitable coverage, service quality, pricing, and support.",
        tag: "Customer Growth",
      },
      {
        title: "Earn Service Revenue",
        text:
          "Collect subscription fees, contracted payments, usage-based charges, or wholesale network fees, depending on the service.",
        tag: "Revenue",
      },
      {
        title: "Pay Operating Costs",
        text:
          "Cover network operations, maintenance, energy, staff, customer service, marketing, and other costs required to deliver the service.",
        tag: "Operating Costs",
      },
      {
        title: "Fund Future Investment",
        text:
          "Use available funding and cash flow to maintain, expand, or upgrade infrastructure while managing debt and other financial commitments.",
        tag: "Capital Allocation",
      },
    ],

    outro:
      "A large subscriber base can help a company spread certain network costs across more customers. However, the benefit depends on pricing, customer usage, network capacity, operating efficiency, and the investment needed to serve those customers. Growth can create value, but it can also increase costs without producing attractive returns.",
  },

  whoPays: {
    sub: "Telecom providers serve several types of customers",

    items: [
      {
        title: "Consumers",
        text:
          "Individuals pay for mobile connectivity, voice services, data allowances, and other features included in their plans.",
        icon: "ti-user",
      },
      {
        title: "Households",
        text:
          "Households pay for fixed broadband or other home connectivity services. The available technology may include fiber, cable, or fixed wireless, depending on the provider and location.",
        icon: "ti-home",
      },
      {
        title: "Businesses and Organizations",
        text:
          "Organizations purchase connectivity, business internet, private network services, and other communications solutions. Contract size and service requirements can differ substantially from consumer plans.",
        icon: "ti-building",
      },
      {
        title: "Other Network Operators",
        text:
          "Some providers sell network access, capacity, or related services to other operators. Those customers may then use the service to support their own customers.",
        icon: "ti-network",
      },
    ],
  },

  makeMoney: {
    sub: "Revenue sources depend on the provider's business model",

    items: [
      {
        title: "Mobile Service Plans",
        text:
          "Customers pay for access to a mobile network under prepaid, postpaid, or other plan structures. Revenue depends on customer numbers, plan pricing, service mix, and the company's accounting policies.",
        icon: "ti-device-mobile",
      },
      {
        title: "Fixed Broadband",
        text:
          "Providers charge households and businesses for internet access through available fixed or wireless technologies. Pricing, service availability, and customer demand influence revenue.",
        icon: "ti-wifi",
      },
      {
        title: "Enterprise Connectivity",
        text:
          "Businesses may pay for dedicated connectivity, networking, managed services, and other communications solutions. The services offered vary by provider.",
        icon: "ti-building-network",
      },
      {
        title: "Wholesale Network Access",
        text:
          "A network operator may sell access or capacity to another provider, including a mobile virtual network operator. The revenue and costs depend on the agreement between the parties.",
        icon: "ti-arrows-exchange",
      },
      {
        title: "Equipment and Additional Services",
        text:
          "Some providers also sell devices, device-related services, protection plans, or other products. These revenues should be examined separately where possible because their margins and economics can differ from connectivity services.",
        icon: "ti-device-mobile-dollar",
      },
    ],
  },

  moneyGoes: {
    sub: "Major costs and financial commitments",

    items: [
      {
        title: "Network Operations and Maintenance",
        text:
          "Providers must keep networks functioning, maintain equipment, manage capacity, and repair faults. The cost structure depends on network design, scale, geography, and operating efficiency.",
        icon: "ti-tool",
      },
      {
        title: "Infrastructure and Capital Expenditure",
        text:
          "Building or upgrading networks can require significant investment in equipment, fiber, radio systems, and other long-lived assets. Capital expenditure is not the same as an operating expense recorded in the same period.",
        icon: "ti-building-broadcast-tower",
      },
      {
        title: "Spectrum and Regulatory Costs",
        text:
          "Mobile operators may incur costs to acquire or renew spectrum rights and comply with applicable licenses and regulations. The structure and timing of these costs differ across jurisdictions and companies.",
        icon: "ti-license",
      },
      {
        title: "Energy, Sites, and Network Access",
        text:
          "Operating network equipment uses electricity. Providers may also pay for sites, towers, leased lines, fiber access, or wholesale capacity, depending on which infrastructure they own and which they obtain from others.",
        icon: "ti-bolt",
      },
      {
        title: "Customer Acquisition and Support",
        text:
          "Marketing, retail distribution, commissions, customer service, and promotional offers can all affect the cost of acquiring and retaining customers.",
        icon: "ti-headset",
      },
      {
        title: "Depreciation and Financing",
        text:
          "Network assets are generally depreciated over their estimated useful lives under applicable accounting rules. Borrowing can also create interest costs. These items affect reported earnings and financial risk in different ways.",
        icon: "ti-chart-line",
      },
    ],
  },

  growth: {
    drivers: {
      title: "What Can Drive Growth?",
      items: [
        "Adding customers in markets where the provider can serve them competitively.",
        "Increasing revenue per customer through service tiers, additional features, or suitable bundled services.",
        "Expanding broadband availability or improving network capacity where customer demand supports the investment.",
        "Winning enterprise and wholesale contracts that fit the provider's network capabilities.",
        "Improving customer retention, network utilization, and operating efficiency.",
      ],
    },

    opportunities: {
      title: "Where Can Opportunities Come From?",
      items: [
        "Growing demand for reliable connectivity among households and organizations.",
        "Replacing or upgrading older network infrastructure where the expected benefits justify the cost.",
        "Serving locations or customer groups that are insufficiently served by existing providers.",
        "Offering business connectivity and related services that address specific customer requirements.",
        "Using existing infrastructure more efficiently instead of relying only on expensive network expansion.",
      ],
    },

    callout:
      "Growth is not automatically profitable. New customers may require discounts, device subsidies, additional capacity, or infrastructure investment. The important question is whether the additional revenue and cash flow justify the incremental costs and capital employed.",
  },

  strength: {
    title: "Potential Competitive Advantages",
    sub: "What may help a telecom provider compete effectively",

    items: [
      {
        title: "Network Coverage and Reliability",
        text:
          "Broad coverage, reliable service, and adequate capacity can make a provider more attractive to customers. These advantages must be assessed against competitors and the locations that matter to the target market.",
        icon: "ti-world",
      },
      {
        title: "Scale and Network Utilization",
        text:
          "A larger customer base may allow some network costs to be spread across more users. However, scale is valuable only when pricing, capacity, and operating costs support attractive economics.",
        icon: "ti-chart-bar",
      },
      {
        title: "Spectrum and Infrastructure Access",
        text:
          "Access to suitable spectrum, fiber, sites, and other infrastructure can influence service quality, capacity, cost, and the ability to compete. Rights and infrastructure advantages are market-specific.",
        icon: "ti-broadcast",
      },
      {
        title: "Customer Relationships",
        text:
          "Trust, service reliability, convenient support, and plans that fit customer needs may help reduce cancellations. High switching costs should not be assumed without evidence.",
        icon: "ti-users",
      },
      {
        title: "Enterprise Relationships and Contracts",
        text:
          "Experience serving organizations and the ability to meet specific service requirements may support longer-term commercial relationships. Contract duration alone does not guarantee high profitability.",
        icon: "ti-briefcase",
      },
    ],
  },

  competition: {
    compete: {
      title: "How Telecom Providers Compete",
      items: [
        "Price, plan structure, and the value customers receive.",
        "Coverage, network performance, reliability, and service availability.",
        "Customer experience, support quality, and ease of managing a service.",
        "Enterprise service capabilities and the ability to meet contract requirements.",
        "The efficiency with which infrastructure and network capacity are used.",
      ],
    },

    challenges: {
      title: "Why the Model Can Be Difficult",
      items: [
        "Competitors may cut prices or offer promotions, reducing revenue per customer.",
        "Network upgrades can require large investments before the expected benefits are realized.",
        "Technology changes can make some infrastructure less competitive or require additional spending.",
        "Regulatory requirements and spectrum rules can limit business flexibility or add costs.",
        "Customer growth may be weak if the market is mature or customers are unwilling to pay more.",
      ],
    },
  },

  risks: {
    sub: "Important risks and limitations to understand",

    items: [
      {
        title: "Price Competition",
        text:
          "Aggressive pricing and promotions may attract customers but reduce revenue per customer and margins. Subscriber growth should therefore be assessed alongside pricing and profitability.",
        icon: "ti-tags",
      },
      {
        title: "High Capital Requirements",
        text:
          "Networks require ongoing maintenance and upgrades. If the cost of investment rises or expected customer demand fails to materialize, returns on invested capital may disappoint.",
        icon: "ti-building",
      },
      {
        title: "Technology and Capacity Changes",
        text:
          "Changes in technology, customer usage, and capacity needs can require new investment. A network that performs well today may need further spending to remain competitive.",
        icon: "ti-cpu",
      },
      {
        title: "Customer Churn",
        text:
          "Customers may leave because of pricing, service quality, competitor offers, or changing needs. High churn can increase acquisition costs and weaken the value of a customer base.",
        icon: "ti-user-minus",
      },
      {
        title: "Regulation and Spectrum",
        text:
          "Telecom providers operate under country-specific rules and may depend on licenses, spectrum rights, and regulatory approvals. Changes can affect costs, operations, or competition.",
        icon: "ti-scale",
      },
      {
        title: "Debt and Financing",
        text:
          "Large infrastructure commitments may be funded partly with debt. Interest expense, refinancing needs, and other obligations can limit financial flexibility, especially when operating performance weakens.",
        icon: "ti-credit-card",
      },
      {
        title: "Service Disruption and Security",
        text:
          "Network outages, cyber incidents, equipment failures, and other disruptions can harm customers and create financial, operational, or reputational consequences.",
        icon: "ti-shield-exclamation",
      },
    ],
  },

  metrics: {
    sub:
      "These metrics help explain customer economics, operating performance, and investment needs. Definitions can differ between companies, so compare the underlying methodology before drawing conclusions.",

    items: [
      {
        label: "Service Revenue",
        fullName: "Revenue from Telecommunications Services",
        text:
          "Measures revenue recognized from services such as mobile connectivity, broadband, and enterprise communications. It helps distinguish the recurring service business from equipment sales and other activities where the company provides a breakdown. Revenue does not measure profit or cash collected, and classifications can vary between companies.",
        icon: "ti-receipt",
      },
      {
        label: "ARPU",
        fullName: "Average Revenue Per User",
        text:
          "Measures average revenue per user, account, or connection over a defined period, depending on the company's methodology. It can help assess pricing and customer mix. Companies may use different customer definitions, revenue categories, and averaging methods, so ARPU figures are not always directly comparable.",
        icon: "ti-user-dollar",
      },
      {
        label: "Subscriber Growth",
        fullName: "Growth in Subscribers or Connections",
        text:
          "Tracks how the number of subscribers or connections changes over time. It helps show whether the provider is expanding its customer base. Companies may count phone lines, accounts, devices, or other connections differently; growth can also be driven by low-priced customers or promotional offers.",
        icon: "ti-users",
      },
      {
        label: "Churn Rate",
        fullName: "Customer or Subscriber Churn",
        text:
          "Measures the proportion of customers or connections lost during a period under the company's definition. It helps assess retention, but the result depends on the time period and whether the company counts accounts, subscribers, or connections. Churn should be considered alongside customer acquisition and revenue per customer.",
        icon: "ti-user-minus",
      },
      {
        label: "Operating Margin",
        fullName: "Operating Income as a Percentage of Revenue",
        text:
          "Shows how much operating income a company earns for each unit of revenue, before items such as interest and income taxes. It helps assess operating profitability, but can be affected by depreciation, business mix, and accounting classifications. Compare companies with similar business models and accounting treatment.",
        icon: "ti-chart-bar",
      },
      {
        label: "EBITDA",
        fullName: "Earnings Before Interest, Taxes, Depreciation, and Amortization",
        text:
          "Provides a view of operating performance before interest, taxes, depreciation, and amortization. Companies may also report adjusted EBITDA using their own adjustments. EBITDA is not cash flow because it does not fully reflect capital expenditure, working capital movements, taxes, or interest payments.",
        icon: "ti-chart-line",
      },
      {
        label: "Capital Expenditure",
        fullName: "Capital Expenditure (CapEx)",
        text:
          "Measures spending on long-lived assets such as network equipment and infrastructure. It helps show the investment required to maintain or expand the network. High CapEx is not automatically good or bad: assess it relative to network needs, business scale, expected returns, and the company's accounting and reporting practices.",
        icon: "ti-building-broadcast-tower",
      },
      {
        label: "Free Cash Flow",
        fullName: "Free Cash Flow (FCF)",
        text:
          "Often refers to operating cash flow less capital expenditure, although company-defined versions can differ. It helps assess how much cash remains after selected operating and investment needs. It is not the same as accounting profit or cash collected from customers, and comparisons require consistent definitions and periods.",
        icon: "ti-cash",
      },
    ],

    callout:
      "No single metric explains a telecom business. Read subscriber growth and ARPU alongside churn, operating profitability, capital expenditure, debt, and free cash flow. Also check whether the company owns its network, leases infrastructure, or purchases wholesale access, because these choices affect costs and comparability.",
  },

  companies: {
    sub:
      "Scope's current company database does not include a direct telecom service provider. The example below is an adjacent infrastructure supplier, not a telecom operator. It is included to clarify the boundary between telecom services and the technology supply chain.",

    items: [
      {
        slug: "broadcom",
        role:
          "Adjacent infrastructure supplier, not a telecom service provider. Broadcom develops semiconductor and infrastructure technology used across multiple markets. Its business can help illustrate the supplier side of network technology, but its revenue should not be treated as revenue from operating a telecom network.",
      },
    ],
  },

  related: {
    sub:
      "Explore related business models across the technology supply chain.",

    slugs: ["cloud", "semiconductors"],
  },

  disclaimer: SCOPE_DISCLAIMER,
};