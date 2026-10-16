import {
  SCOPE_DISCLAIMER,
  type BusinessModelDetail,
} from "./types";

export const CYBERSECURITY_DETAIL: BusinessModelDetail = {
  slug: "cybersecurity",

  headline:
    "Protecting the digital systems, data, and services that businesses depend on.",

  description:
    "Learn how cybersecurity companies help protect organizations from digital threats, how they generate revenue, what drives demand, and why recurring revenue does not automatically mean a profitable or successful business.",

  characteristics: {
    tags: [
      "Technology & Security",
      "Recurring Revenue Potential",
      "Continuous Innovation",
      "Enterprise Customers",
      "Evolving Threats",
    ],
    note:
      "Cybersecurity is a broad industry rather than one single business model. Companies may sell software, hardware, subscriptions, managed security services, or consulting. Their costs and financial performance can therefore differ significantly.",
  },

  whatIsIt: {
    sub: "Helping customers protect their digital operations",
    paragraphs: [
      "Cybersecurity is the practice of protecting computer systems, networks, applications, and data from unauthorized access, attacks, disruption, and misuse. Cybersecurity businesses develop products and services that help customers prevent attacks, detect suspicious activity, and respond to security incidents.",
      "Customers include businesses, governments, healthcare providers, financial institutions, and individuals. Their needs vary depending on the information they protect, the systems they use, the threats they face, and the requirements they must meet.",
      "Some cybersecurity companies focus on a specific problem, such as identity protection or endpoint security. Others offer multiple products that work together across networks, devices, applications, and cloud environments.",
      "The business model matters because a company selling physical security appliances may have different costs and revenue patterns from a company delivering cloud-based security software or human-led incident response services.",
    ],
  },

  flow: {
    sub: "From identifying threats to protecting customers",
    steps: [
      {
        title: "Develop Security Technology",
        text:
          "Teams research threats and develop software, hardware, detection methods, and security tools to address customer problems.",
        icon: "ti-code",
        examples: [
          "Malware detection",
          "Identity protection",
          "Network security software",
        ],
      },
      {
        title: "Deliver the Product or Service",
        text:
          "The company provides security capabilities through installed software, physical appliances, cloud platforms, or specialist teams.",
        icon: "ti-shield-check",
        examples: [
          "Endpoint security",
          "Cloud security",
          "Managed security services",
        ],
      },
      {
        title: "Sell to Customers",
        text:
          "Customers purchase products, subscribe to services, or sign contracts for ongoing security and support.",
        icon: "ti-users",
        examples: [
          "Annual subscriptions",
          "Enterprise contracts",
          "Security consulting",
        ],
      },
      {
        title: "Maintain and Improve Protection",
        text:
          "Providers update their products, respond to emerging threats, support customers, and develop additional capabilities.",
        icon: "ti-refresh",
        examples: [
          "Security updates",
          "Threat monitoring",
          "Incident response",
        ],
      },
    ],
  },

  howItWorks: {
    sub: "Common ways cybersecurity businesses operate",
    intro:
      "Cybersecurity companies can combine several business models. These categories describe common approaches, not mutually exclusive classifications.",

    chain: [
      {
        title: "Subscription Software",
        text:
          "Customers pay recurring fees to use security software or access continuously updated protection. Pricing may depend on users, devices, workloads, features, or other contract terms.",
        tag: "Recurring subscription revenue",
      },
      {
        title: "Hardware and Software Products",
        text:
          "Companies sell physical security appliances, software licenses, or other products. They may also earn additional revenue from subscriptions, maintenance, and support.",
        tag: "Product sales and related services",
      },
      {
        title: "Managed Security Services",
        text:
          "Customers pay a provider to monitor systems, investigate suspicious activity, or help manage security operations. These services require people, processes, and supporting technology.",
        tag: "Ongoing service contracts",
      },
      {
        title: "Consulting and Incident Response",
        text:
          "Specialists assess security weaknesses, investigate incidents, advise organizations, or help them respond to attacks. Revenue depends on the engagement and contractual arrangement.",
        tag: "Professional services",
      },
    ],

    outro:
      "A company can combine these approaches. For example, a provider may sell a security appliance, charge for ongoing threat-prevention subscriptions, and offer incident-response services. Each revenue stream has different cost drivers and recognition rules.",
  },

  whoPays: {
    sub: "Who buys cybersecurity products and services?",
    items: [
      {
        title: "Large Enterprises",
        text:
          "Organizations with complex systems may purchase multiple security products, centralized monitoring, identity protection, and ongoing support.",
        icon: "ti-building",
      },
      {
        title: "Small and Medium-Sized Businesses",
        text:
          "Smaller organizations may purchase packaged software, cloud-delivered protection, or managed services when they lack the resources to operate their own security teams.",
        icon: "ti-briefcase",
      },
      {
        title: "Cloud and Technology Companies",
        text:
          "Organizations using cloud platforms, applications, and connected infrastructure may need tools that protect workloads, access, data, and networks.",
        icon: "ti-cloud",
      },
      {
        title: "Financial and Healthcare Institutions",
        text:
          "These organizations may need security controls to protect sensitive information and maintain reliable operations. Their exact obligations depend on applicable laws and regulations.",
        icon: "ti-lock",
      },
      {
        title: "Governments and Public Organizations",
        text:
          "Public institutions may purchase security products, specialist services, and monitoring capabilities to protect systems and information.",
        icon: "ti-building-community",
      },
    ],
  },

  makeMoney: {
    sub: "How cybersecurity companies generate revenue",
    items: [
      {
        title: "Subscriptions",
        text:
          "Customers pay recurring fees for access to security software, threat intelligence, or cloud-delivered protection. Contracts may be priced per user, device, workload, or capacity. Revenue recognition depends on the contract and accounting rules.",
        icon: "ti-calendar-repeat",
      },
      {
        title: "Product Sales",
        text:
          "Companies sell physical appliances, software licenses, or other products. Revenue recognition depends on the terms of the sale and when the relevant performance obligations are satisfied.",
        icon: "ti-device-desktop",
      },
      {
        title: "Support and Maintenance",
        text:
          "Customers may pay for technical assistance, product updates, repairs, and continued support. Some support arrangements are sold alongside products or subscriptions.",
        icon: "ti-tool",
      },
      {
        title: "Managed Security Services",
        text:
          "Customers pay providers to monitor systems, investigate threats, or operate parts of their security program. These services require ongoing operational resources.",
        icon: "ti-eye",
      },
      {
        title: "Consulting and Incident Response",
        text:
          "Specialists earn fees for security assessments, digital investigations, incident response, and related professional services. Revenue may vary with project timing and customer demand.",
        icon: "ti-report-search",
      },
    ],
  },

  moneyGoes: {
    sub: "Where the money goes",
    items: [
      {
        title: "Research and Development",
        text:
          "Companies invest in engineering, threat research, detection technology, product development, and testing. Continuous development can be important because attack methods and customer requirements change over time.",
        icon: "ti-flask",
      },
      {
        title: "Security Experts and Operations",
        text:
          "Managed services and incident-response businesses need qualified personnel to monitor systems, investigate incidents, and support customers. Labor requirements can limit how quickly some services scale.",
        icon: "ti-users",
      },
      {
        title: "Cloud Infrastructure",
        text:
          "Cloud-delivered security services may incur hosting, computing, storage, networking, and data-processing costs. The cost structure depends on the service and its usage.",
        icon: "ti-cloud-computing",
      },
      {
        title: "Sales and Marketing",
        text:
          "Companies spend on sales teams, marketing, channel partners, and customer acquisition. Enterprise sales may require demonstrations, technical evaluations, and lengthy purchasing processes.",
        icon: "ti-speakerphone",
      },
      {
        title: "Customer Support",
        text:
          "Providers may need to help customers configure products, resolve issues, deploy updates, and maintain protection. Support costs can grow as the customer base expands.",
        icon: "ti-headset",
      },
      {
        title: "Hardware and Product Delivery",
        text:
          "Companies selling physical appliances may incur manufacturing, component, logistics, inventory, and warranty costs. These costs differ from those of software-focused businesses.",
        icon: "ti-package",
      },
    ],
  },

  growth: {
    drivers: {
      title: "What can drive growth?",
      items: [
        "Organizations may increase spending when they need to protect more users, devices, applications, and data.",
        "Adoption of cloud services and connected systems can create demand for security products designed for those environments.",
        "New threats and changing attack methods can lead customers to update existing tools or purchase additional capabilities.",
        "Selling more products to existing customers can expand revenue when customers adopt additional services or features.",
        "Renewals can support recurring revenue when customers continue using a provider's products and services.",
        "Managed security services can serve organizations that lack the personnel or expertise to operate every security function internally.",
      ],
    },

    opportunities: {
      title: "Where opportunities may emerge",
      items: [
        "Cloud security: organizations may need protection for cloud workloads, identities, applications, and data as their systems evolve.",
        "Identity security: companies may invest in controlling access to systems and reducing risks associated with compromised credentials.",
        "Security operations: organizations may seek better ways to collect alerts, investigate suspicious activity, and coordinate responses.",
        "AI-related security: the use of AI systems can create additional security requirements, although the commercial opportunity varies by product and customer need.",
        "Platform integration: customers may value products that work together and reduce operational complexity, but a broader platform must still demonstrate effectiveness and value.",
      ],
    },

    callout:
      "These are potential demand drivers, not guarantees of business success. Revenue growth and profitability depend on factors such as product effectiveness, pricing, competition, customer retention, operating costs, and the company's ability to execute.",
  },

  strength: {
    title: "What can create a competitive advantage?",
    sub:
      "Cybersecurity advantages depend on a provider's actual capabilities and customer results, not simply the number of products it sells.",

    items: [
      {
        title: "Detection and Response Capabilities",
        text:
          "A product that helps customers identify and respond to threats effectively may become valuable to security teams. Performance must be assessed in context rather than assumed from marketing claims.",
        icon: "ti-shield-check",
      },
      {
        title: "Threat Intelligence",
        text:
          "Knowledge of attack methods, indicators, and emerging threats can help improve detection and response. Its value depends on the quality, relevance, and application of that information.",
        icon: "ti-radar",
      },
      {
        title: "Integration and Usability",
        text:
          "Products that integrate with customer systems and fit existing workflows may be easier to deploy and operate. Poor integration can increase complexity and reduce their practical value.",
        icon: "ti-puzzle",
      },
      {
        title: "Customer Trust",
        text:
          "Customers must trust a provider with sensitive systems and information. Reliability, product quality, support, and the provider's own security practices can affect that trust.",
        icon: "ti-lock",
      },
      {
        title: "Switching Costs",
        text:
          "Replacing security tools may require migration, staff training, system integration, and testing. These costs can encourage retention, but customers may still switch when products underperform or alternatives offer better value.",
        icon: "ti-arrows-exchange",
      },
    ],
  },

  competition: {
    compete: {
      title: "How do cybersecurity companies compete?",
      items: [
        "Product effectiveness, detection quality, and the ability to respond to relevant threats.",
        "Price, total cost of ownership, and the value customers receive.",
        "Ease of deployment and integration with existing systems.",
        "Product reliability, customer support, and trust.",
        "Breadth of capabilities and the ability to address customer needs without creating excessive complexity.",
        "Continuous innovation as technology, threats, and customer requirements change.",
      ],
    },

    challenges: {
      title: "Why can competition be difficult?",
      items: [
        "Established technology companies may bundle security capabilities with other products, increasing pricing pressure on specialist providers.",
        "Customers may reduce the number of vendors they use to simplify operations, creating opportunities for integrated platforms but challenges for narrower products.",
        "Developing and maintaining effective products requires sustained engineering and security expertise.",
        "Enterprise sales can involve technical assessments, procurement requirements, and long decision-making cycles.",
        "Customers may not renew contracts if products fail to meet expectations, budgets change, or competing offerings provide better value.",
      ],
    },
  },

  risks: {
    sub: "Important risks to understand",
    items: [
      {
        title: "Changing Threats",
        text:
          "Attack methods and vulnerabilities evolve. A company must continually improve its products to remain useful, and no security product can guarantee complete protection.",
        icon: "ti-bug",
      },
      {
        title: "Product or Security Failure",
        text:
          "A security product may fail to detect a threat, create operational problems, or itself contain a vulnerability. Such events can damage customer trust and create financial or legal consequences.",
        icon: "ti-alert-triangle",
      },
      {
        title: "Intense Competition",
        text:
          "Specialist vendors compete with one another and with larger technology platforms. Competition can pressure pricing, raise customer acquisition costs, and reduce retention.",
        icon: "ti-swords",
      },
      {
        title: "Customer Churn",
        text:
          "Customers may cancel or decline to renew contracts because of price, product performance, budget constraints, or a decision to use another provider. Recurring revenue is not guaranteed revenue.",
        icon: "ti-user-minus",
      },
      {
        title: "High Operating Costs",
        text:
          "Research, engineering, cloud infrastructure, customer support, and sales can require substantial spending. Revenue growth does not guarantee that costs will grow more slowly.",
        icon: "ti-cash",
      },
      {
        title: "Long Sales Cycles",
        text:
          "Enterprise purchases may take time because customers must evaluate technical performance, security, integration, procurement, and compliance requirements.",
        icon: "ti-clock",
      },
      {
        title: "Reputation and Liability",
        text:
          "A major incident involving a provider or its products may harm customer confidence and lead to investigations, legal claims, or additional remediation costs. The consequences depend on the circumstances.",
        icon: "ti-scale",
      },
    ],
  },

  metrics: {
    sub: "Metrics to understand cybersecurity businesses",
    items: [
      {
        label: "Revenue Growth",
        fullName: "Year-over-Year Revenue Growth",
        text:
          "Measures the change in reported revenue compared with the same period in the previous year. It helps show business momentum, but growth can come from acquisitions, pricing, product mix, or organic customer demand. Compare reporting periods and accounting definitions carefully.",
        icon: "ti-trending-up",
      },
      {
        label: "Recurring Revenue / ARR",
        fullName: "Annual Recurring Revenue",
        text:
          "ARR is a company-defined measure intended to represent the annualized value of recurring customer contracts. It can help investors understand the scale of a subscription business, but it is not the same as recognized revenue or cash collected. Definitions may differ between companies.",
        icon: "ti-calendar-repeat",
      },
      {
        label: "Gross Margin",
        fullName: "Gross Profit as a Percentage of Revenue",
        text:
          "Measures the proportion of revenue remaining after the costs included in cost of revenue. It helps show the economics of delivering products and services. Comparisons can be misleading when companies have different mixes of software, hardware, cloud services, and human-led services.",
        icon: "ti-chart-pie",
      },
      {
        label: "Operating Margin",
        fullName: "Operating Income as a Percentage of Revenue",
        text:
          "Measures operating income relative to revenue and helps show how much revenue remains after operating expenses under the company's accounting definitions. Research, sales, marketing, and support spending can affect this metric. Review the reporting period and any significant unusual items.",
        icon: "ti-percentage",
      },
      {
        label: "Customer Retention / Churn",
        fullName: "Customer Retention and Customer Churn",
        text:
          "These measures help show whether customers continue using or renewing a company's products. Retention may be measured by customer count or revenue, while churn may use different definitions. Check whether the metric includes contract value changes, upgrades, downgrades, or only lost customers.",
        icon: "ti-users",
      },
      {
        label: "Remaining Performance Obligations",
        fullName: "RPO",
        text:
          "RPO represents contracted consideration allocated to performance obligations that have not yet been satisfied, subject to applicable accounting rules and disclosure policies. It can provide information about contracted future business, but it is not the same as cash on hand, and the timing of revenue recognition varies.",
        icon: "ti-file-description",
      },
      {
        label: "R&D Intensity",
        fullName: "Research and Development as a Percentage of Revenue",
        text:
          "Shows the proportion of revenue spent on research and development. It helps indicate how much a company invests in developing products and technology, but higher spending does not automatically mean better products or stronger future performance.",
        icon: "ti-microscope",
      },
    ],

    callout:
      "Use several metrics together. ARR and retention can help explain subscription economics, while gross margin and operating margin help assess profitability. Always check company-specific definitions, reporting periods, acquisitions, and business mix before comparing results.",
  },

  companies: {
    sub: "Examples from companies covered by Scope",
    items: [
      {
        slug: "microsoft",
        role:
          "Microsoft offers security products and services, including Microsoft Defender and identity-related security capabilities. Cybersecurity is part of a much broader business that also includes software, cloud services, and other products. Its total company revenue should not be treated as cybersecurity revenue.",
      },
      {
        slug: "amazon",
        role:
          "Amazon Web Services provides cloud services that include security-related capabilities. Amazon also operates e-commerce, advertising, and other businesses, so its consolidated revenue is not a measure of cybersecurity revenue.",
      },
      {
        slug: "google",
        role:
          "Google Cloud offers security-related products and services. Alphabet also earns revenue from other activities, including advertising and consumer technology. Its total company revenue should not be attributed to cybersecurity.",
      },
    ],
  },

  related: {
    sub: "Explore related business models",
    slugs: ["saas", "cloud", "ai"],
  },

  disclaimer: SCOPE_DISCLAIMER,
};