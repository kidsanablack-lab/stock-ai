import type { BusinessModelDetail } from "./types";

export const CLOUD_DETAIL: BusinessModelDetail = {
  slug: "cloud",

  headline:
    "Renting the Technology That Powers Modern Businesses",

  description:
    "Cloud computing providers offer computing power, storage, databases, networking, and managed services over the internet. Customers use these resources without owning all the underlying infrastructure. Providers generate revenue through usage-based pricing, subscriptions, and contractual commitments while managing substantial infrastructure, energy, and operating costs.",

  characteristics: {
    tags: [
      "Recurring Demand",
      "Scalable Infrastructure",
      "Usage-Based Pricing",
      "Capital Intensive",
      "Multiple Revenue Streams",
    ],
    note:
      "Cloud providers combine physical infrastructure with digital services. Many customers need these services continuously, but revenue, pricing models, capital requirements, and profitability vary across providers.",
  },

  whatIsIt: {
    sub:
      "Cloud computing lets businesses use computing resources over the internet instead of owning and operating every part of the underlying technology themselves.",

    paragraphs: [
      "Imagine opening an online store. You need computing power to run the website, storage for product images, and a database for customer orders. Instead of buying and maintaining all the necessary servers yourself, you can rent these resources from a cloud provider.",
      "Cloud computing includes more than servers and storage. Providers also offer databases, networking, security tools, analytics, developer platforms, and AI-related services.",
      "Three common service models are Infrastructure as a Service (IaaS), Platform as a Service (PaaS), and Software as a Service (SaaS). IaaS provides fundamental computing resources, PaaS provides managed environments for building and running applications, and SaaS delivers ready-to-use software. These models overlap in practice, and a single provider may offer several of them.",
      "Cloud services still depend on physical data centers, servers, networking equipment, electricity, and people who operate the systems. The cloud provider manages some or much of this infrastructure, depending on the service, while customers retain responsibilities that vary by service model.",
    ],
  },

  flow: {
    sub:
      "The basic business model connects infrastructure investment, customer usage, and service payments.",

    steps: [
      {
        title: "Build Infrastructure",
        text:
          "The provider invests in data centers, servers, storage, networking, power, and cooling systems.",
        icon: "ti-building",
        examples: [
          "Data centers",
          "Servers and GPUs",
          "Networking equipment",
        ],
      },
      {
        title: "Offer Cloud Services",
        text:
          "The provider makes computing resources and technology services available to customers.",
        icon: "ti-cloud-computing",
        examples: [
          "Virtual machines",
          "Cloud databases",
          "Managed application platforms",
        ],
      },
      {
        title: "Customers Use Resources",
        text:
          "Businesses and developers use the services to run applications, store information, and process workloads.",
        icon: "ti-device-laptop",
        examples: [
          "Online stores",
          "Business applications",
          "AI workloads",
        ],
      },
      {
        title: "Customers Pay",
        text:
          "Customers pay according to usage, subscriptions, service plans, or contractual commitments.",
        icon: "ti-receipt",
        examples: [
          "Usage-based charges",
          "Recurring subscriptions",
          "Committed service agreements",
        ],
      },
      {
        title: "Operate and Expand",
        text:
          "The provider covers operating costs, maintains infrastructure, develops services, and may invest in additional capacity.",
        icon: "ti-chart-arrows-vertical",
        examples: [
          "Infrastructure maintenance",
          "Engineering and security",
          "Capacity expansion",
        ],
      },
    ],
  },

  howItWorks: {
    sub:
      "An online store shows how customer needs can turn into cloud usage and revenue.",

    intro:
      "Imagine an online store preparing for a major shopping event. Visitor numbers increase, and the store needs more computing power to keep its website responsive.",

    chain: [
  { title: "Spot the need", text: "The store needs computing power, storage, and a database.", tag: "Online store" },
  { title: "Rent the services", text: "It rents the necessary services from a cloud provider.", tag: "Online store" },
  { title: "Scale with demand", text: "The store adjusts its resources as demand changes, where the services allow it.", tag: "Online store" },
  { title: "Charge for usage", text: "The provider charges according to the services and pricing terms the store uses.", tag: "Cloud provider" },
  { title: "Spending grows", text: "If the store grows or adopts additional services, its cloud spending may increase.", tag: "Online store" },
],

    outro:
      "The provider earns revenue by supplying useful services, but higher customer usage does not automatically mean higher profit. The provider must manage infrastructure costs, while the customer must monitor usage, security, and its cloud bill.",
  },

  whoPays: {
    sub:
      "Cloud customers range from small teams to large organizations that need reliable technology resources.",

    items: [
      {
        title: "Startups and Small Businesses",
        text:
          "Use cloud services to launch websites and applications without building and operating their own data centers.",
        icon: "ti-rocket",
      },
      {
        title: "Large Enterprises",
        text:
          "Use infrastructure, databases, analytics, security, and other services to support business operations.",
        icon: "ti-building-skyscraper",
      },
      {
        title: "Developers and Software Companies",
        text:
          "Rent computing resources and development platforms to build, test, deploy, and operate applications.",
        icon: "ti-code",
      },
      {
        title: "AI and Data Teams",
        text:
          "Use computing capacity, storage, specialized hardware, and data services for certain AI and data-intensive workloads.",
        icon: "ti-brain",
      },
      {
        title: "Government and Other Organizations",
        text:
          "Use cloud services for digital services, data management, and internal systems, subject to their security and regulatory requirements.",
        icon: "ti-world",
      },
    ],
  },

  makeMoney: {
    sub:
      "Cloud providers earn revenue from a range of services and pricing arrangements. The mix differs by company.",

    items: [
      {
        title: "Computing Services",
        text:
          "Customers pay to use computing capacity, such as virtual machines and other processing resources. Pricing may depend on usage, capacity, time, or the selected service plan.",
        icon: "ti-cpu",
      },
      {
        title: "Storage and Databases",
        text:
          "Providers charge for storing data, operating databases, and related capabilities. Pricing may depend on stored capacity, requests, processing, data transfer, or other service-specific factors.",
        icon: "ti-database",
      },
      {
        title: "Managed and Specialized Services",
        text:
          "Providers offer managed databases, application platforms, analytics, security, and AI-related tools. Customers pay for capabilities that can reduce the amount of infrastructure they must manage themselves.",
        icon: "ti-settings-cog",
      },
      {
        title: "Subscriptions and Contracts",
        text:
          "Some services use recurring subscriptions or longer-term agreements. Certain customers commit to usage or capacity in exchange for pricing terms or other benefits specified by the provider.",
        icon: "ti-file-invoice",
      },
      {
        title: "Networking and Support",
        text:
          "Depending on the service and contract, customers may also pay for data transfer, networking capabilities, technical support, and additional services.",
        icon: "ti-arrows-transfer-up",
      },
    ],
  },

  moneyGoes: {
    sub:
      "Running a cloud platform requires substantial infrastructure investment and ongoing operating expenses.",

    items: [
      {
        title: "Data Centers and Facilities",
        text:
          "Providers spend on facilities, land, power infrastructure, cooling systems, physical security, and the buildings that house computing equipment.",
        icon: "ti-building-factory",
      },
      {
        title: "Servers, Storage, and Networking",
        text:
          "Servers, processors, accelerators, storage devices, and networking equipment require investment, maintenance, replacement, and upgrades.",
        icon: "ti-server",
      },
      {
        title: "Energy and Operations",
        text:
          "Electricity, cooling, maintenance, and network operations are necessary to keep cloud services running.",
        icon: "ti-bolt",
      },
      {
        title: "Engineering and Customer Support",
        text:
          "Providers employ engineers, security specialists, operations teams, and support staff to develop, maintain, and improve their services.",
        icon: "ti-users",
      },
      {
        title: "Research and Expansion",
        text:
          "Providers invest in new technologies, additional capacity, infrastructure efficiency, and services designed to meet changing customer needs.",
        icon: "ti-trending-up",
      },
    ],
  },

  growth: {
    drivers: {
      title: "What Drives Demand?",
      items: [
        "Digital transformation: businesses move more applications and processes online, creating demand for computing and managed services.",
        "Growing data needs: organizations generate and process more information, increasing potential demand for storage, databases, and analytics.",
        "AI and high-performance computing: certain workloads require substantial computing capacity, specialized accelerators, storage, and networking.",
        "Managed services: organizations may prefer services that reduce the amount of infrastructure they must operate directly.",
      ],
    },

    opportunities: {
      title: "Where Can Providers Grow?",
      items: [
        "Expand existing customer relationships by supplying additional cloud services as customers' needs change.",
        "Offer specialized services for databases, analytics, security, and AI workloads.",
        "Improve infrastructure efficiency and service performance to compete for new customers and workloads.",
        "Expand capacity and geographic availability where customer demand and business conditions justify the investment.",
      ],
    },

    callout:
      "Growing demand creates opportunities, not guaranteed profits. Providers must balance customer demand with infrastructure costs, capacity constraints, competition, and the returns expected from new investment.",
  },

  strength: {
    title: "Why This Business Model Can Be Powerful",
    sub:
      "Cloud providers can benefit from continuous customer needs and a broad portfolio of technology services.",

    items: [
      {
        title: "Ongoing Customer Needs",
        text:
          "Many digital services require computing resources every day, creating opportunities for repeat revenue when customers continue using the provider's services.",
        icon: "ti-refresh",
      },
      {
        title: "Ability to Scale",
        text:
          "Large infrastructure platforms can serve customers with different sizes and workloads. Efficient use of shared infrastructure can support economies of scale.",
        icon: "ti-arrows-maximize",
      },
      {
        title: "Multiple Revenue Opportunities",
        text:
          "Providers can sell computing, storage, databases, security, analytics, AI tools, and support services rather than relying on one product.",
        icon: "ti-layers-intersect",
      },
      {
        title: "Deep Integration",
        text:
          "When customers build important systems around a provider's services, switching may require time, engineering work, testing, and application changes. This can support retention, but does not make switching impossible.",
        icon: "ti-puzzle",
      },
      {
        title: "Infrastructure and Engineering Capabilities",
        text:
          "Providers with extensive infrastructure and technical expertise may be able to serve complex workloads across multiple regions and service categories.",
        icon: "ti-network",
      },
    ],
  },

  competition: {
    compete: {
      title: "How Providers Compete",
      items: [
        "Price and performance: the cost, speed, capacity, and efficiency of their services.",
        "Reliability: service availability, recovery capabilities, and operational performance.",
        "Service breadth: the range of infrastructure, databases, developer tools, analytics, security, and AI-related services.",
        "Security and compliance: the ability to support customers' security and regulatory requirements.",
        "Ecosystem: compatibility with existing software, developer skills, business systems, and partner networks.",
      ],
    },

    challenges: {
      title: "What Makes Competition Difficult?",
      items: [
        "Large providers compete with one another, while specialized providers may compete in particular services or customer segments.",
        "Customers may compare total workload costs rather than a single advertised price.",
        "Providers must continually improve technology and infrastructure while maintaining reliable services.",
        "Customer needs, regulation, and workload requirements vary, so no single provider is automatically the best choice for every customer.",
      ],
    },
  },

  risks: {
    sub:
      "Cloud businesses face financial, operational, technological, and competitive risks.",

    items: [
      {
        title: "High Capital Requirements",
        text:
          "Building and expanding data centers requires substantial spending on facilities, servers, networking, and power infrastructure. Investments may take time to generate sufficient returns.",
        icon: "ti-building-factory",
      },
      {
        title: "Intense Competition",
        text:
          "Competition over price, performance, technology, and customer relationships can put pressure on pricing and profitability.",
        icon: "ti-users",
      },
      {
        title: "Security Incidents and Outages",
        text:
          "Service interruptions or security incidents can disrupt customers, increase costs, and damage trust. Security responsibilities depend on the service and are shared between providers and customers.",
        icon: "ti-shield-exclamation",
      },
      {
        title: "Customer Cost Optimization",
        text:
          "Customers may reduce or optimize usage when cloud bills become too high. Revenue can therefore be affected even when a customer continues using cloud services.",
        icon: "ti-chart-bar",
      },
      {
        title: "Rapid Technology Change",
        text:
          "Hardware, software, and workload requirements evolve. Providers must improve their services while managing the risk that some investments become less competitive or useful.",
        icon: "ti-cpu",
      },
      {
        title: "Energy and Capacity Constraints",
        text:
          "Expansion can depend on electricity availability, construction, equipment supply, and local requirements. Constraints may increase costs or delay new capacity.",
        icon: "ti-bolt",
      },
    ],
  },

  metrics: {
    sub:
      "These indicators can help explain the size, growth, profitability, and investment needs of a cloud business. Companies may define and disclose them differently.",

    items: [
      {
        label: "Cloud Revenue Growth",
        fullName: "Year-over-Year Cloud Revenue Growth",
        text:
          "Measures how reported cloud revenue changes compared with the same period in the previous year. Check each company's segment definition because reported cloud categories may include different services.",
        icon: "ti-chart-line",
      },
      {
        label: "Cloud Revenue",
        fullName: "Reported Cloud Revenue",
        text:
          "Shows revenue reported for a cloud business or category. Do not substitute total company revenue for cloud revenue, and check which services are included in the reported category.",
        icon: "ti-currency-dollar",
      },
      {
        label: "Operating Margin",
        fullName: "Operating Income as a Percentage of Revenue",
        text:
          "Shows operating income relative to revenue under the company's reporting definitions. It helps explain operating profitability, but segment-level figures may not be available or directly comparable across providers.",
        icon: "ti-chart-bar",
      },
      {
        label: "Capital Expenditure",
        fullName: "Capital Expenditures (CapEx)",
        text:
          "Measures spending on long-lived assets such as data centers, servers, networking equipment, and other infrastructure. High spending can support future capacity but also requires substantial cash and careful investment decisions.",
        icon: "ti-building",
      },
      {
        label: "Remaining Performance Obligations",
        fullName: "Remaining Performance Obligations (RPO)",
        text:
          "Represents contracted revenue that has not yet been recognized under the company's accounting rules. It can provide information about contracted business ahead, but is not the same as cash already received, guaranteed profit, or revenue that will be recognized immediately.",
        icon: "ti-file-text",
      },
      {
        label: "Customer Usage",
        fullName: "Cloud Resource Consumption and Utilization",
        text:
          "Usage indicators can help explain demand for computing, storage, databases, and other services. Companies disclose different measures, so there is no single standardized usage figure that can be compared across every provider.",
        icon: "ti-activity",
      },
    ],

    callout:
      "Read these metrics together. Revenue growth does not guarantee higher profit, and capital expenditure should be considered alongside future demand, operating performance, and the company's own reporting definitions.",
  },

  companies: {
    sub:
      "These companies participate in the cloud ecosystem in different ways. Their overall businesses are not exclusively cloud computing.",

    items: [
      {
        slug: "amazon",
        role:
          "Amazon Web Services (AWS) provides cloud infrastructure and a broad portfolio of computing, storage, database, networking, security, analytics, and AI-related services. AWS is a distinct business segment within Amazon, so Amazon's total company revenue should not be treated as AWS revenue.",
      },
      {
        slug: "microsoft",
        role:
          "Microsoft Azure provides cloud infrastructure and platform services for businesses, developers, and other customers. Microsoft also sells cloud-based software and other products, so Microsoft's total revenue and broader cloud-related reporting categories should not automatically be treated as Azure-only revenue.",
      },
      {
        slug: "google",
        role:
          "Google Cloud provides infrastructure, data, analytics, AI, security, and other cloud services. Alphabet also earns revenue from businesses such as Google advertising, so Google Cloud revenue must be distinguished from Alphabet's total revenue.",
      },
      {
        slug: "oracle",
        role:
          "Oracle provides cloud infrastructure and cloud-based business applications, including database-related services. Its business also includes software and other offerings, so Oracle should not be described as a cloud-only company.",
      },
      {
        slug: "nvidia",
        role:
          "NVIDIA supplies GPUs, accelerated-computing platforms, and networking technologies used in many data centers and AI systems. It is an important supplier to the cloud ecosystem, but selling these technologies is different from operating a general-purpose cloud platform such as AWS, Azure, or Google Cloud.",
      },
    ],
  },

  related: {
    sub:
      "Cloud computing connects with several other business models, but these models are not interchangeable.",

    slugs: ["ai", "saas", "semiconductors"],
  },

  disclaimer:
    "Scope is built for understanding businesses and industries, not for investment advice.",
};