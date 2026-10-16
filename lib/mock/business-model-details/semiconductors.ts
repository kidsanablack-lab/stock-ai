import {
  SCOPE_DISCLAIMER,
  type BusinessModelDetail,
} from "./types";

export const SEMICONDUCTORS_DETAIL: BusinessModelDetail = {
  slug: "semiconductors",

  headline:
    "The technology behind the devices and infrastructure we use every day.",

  description:
    "Learn how semiconductor businesses design, manufacture, and sell the chips that power computers, smartphones, vehicles, and AI data centers—and understand why different semiconductor companies have very different business models.",

  characteristics: {
    tags: [
      "Technology & Engineering",
      "High R&D Requirements",
      "Global Supply Chains",
      "Cyclical Demand",
      "Capital Intensive for Manufacturers",
    ],
    note:
      "Semiconductors are an industry, not one single business model. A company that designs chips without manufacturing them operates differently from a company that manufactures chips for other businesses.",
  },

  whatIsIt: {
    sub: "The industry behind modern electronics",
    paragraphs: [
      "Semiconductors are materials used to make integrated circuits, commonly called chips. These chips process information, store data, control electrical systems, and connect devices. They are essential components in products ranging from smartphones and computers to cars, industrial equipment, and AI data centers.",
      "Semiconductor businesses create value by designing chips, manufacturing them, licensing chip technology, or providing related products and services. Some companies focus on one part of this process, while others operate across several stages.",
      "The distinction matters because different business models have different costs, capital requirements, risks, and financial metrics. A chip designer may depend heavily on external manufacturers, while a foundry must invest heavily in factories and manufacturing equipment.",
    ],
  },

  flow: {
    sub: "From an idea to a chip used in a product",
    steps: [
      {
        title: "Research & Design",
        text:
          "Engineers develop chip architectures, circuit designs, and intellectual property to solve specific computing or electronic problems.",
        icon: "ti-cpu",
        examples: [
          "CPU and GPU designs",
          "Networking chips",
          "Power-management chips",
        ],
      },
      {
        title: "Manufacturing",
        text:
          "A chip manufacturer fabricates circuits on silicon wafers using complex processes and specialized equipment. Depending on the business model, this stage may be performed internally or by a third-party foundry.",
        icon: "ti-building-factory-2",
        examples: [
          "Wafer fabrication",
          "Advanced process technology",
          "Manufacturing equipment",
        ],
      },
      {
        title: "Testing & Packaging",
        text:
          "Chips are tested and prepared for integration into electronic products. Packaging protects the chip and provides the electrical connections needed for it to operate.",
        icon: "ti-package",
        examples: [
          "Chip testing",
          "Advanced packaging",
          "Quality control",
        ],
      },
      {
        title: "Sales & Integration",
        text:
          "Chip suppliers sell products or provide technology to customers such as device manufacturers, cloud providers, automotive companies, and electronics businesses.",
        icon: "ti-truck-delivery",
        examples: [
          "Servers and AI systems",
          "Consumer electronics",
          "Automotive electronics",
        ],
      },
    ],
  },

  howItWorks: {
    sub: "Four common business models",
    intro:
      "Companies can participate in different parts of the semiconductor value chain. These categories are useful starting points, although real companies may combine activities or operate across multiple product categories.",
    chain: [
      {
        title: "Fabless — Design Without Owning Major Fabrication Plants",
        text:
          "Fabless companies design and sell chips but outsource much of their wafer manufacturing to foundries. They still need engineering teams, research and development, product validation, and supply-chain management.",
        tag: "Examples: NVIDIA and AMD",
      },
      {
        title: "Foundry — Manufacturing Chips for Customers",
        text:
          "Foundries manufacture chips designed by other companies. Their economics depend on manufacturing technology, customer demand, factory utilization, production yields, and the ability to manage large capital investments.",
        tag: "Example: TSMC",
      },
      {
        title: "Integrated Device Manufacturer — A More Integrated Model",
        text:
          "An integrated device manufacturer, or IDM, combines chip design and manufacturing to varying degrees. The balance between internal production and external manufacturing differs by company and product.",
        tag: "A distinct model with company-specific variations",
      },
      {
        title: "Other Semiconductor Businesses",
        text:
          "Some companies specialize in memory, semiconductor equipment, materials, chip-design software, or intellectual-property licensing. These businesses serve different parts of the industry and have different revenue and cost structures.",
        tag: "Specialized business models",
      },
    ],
    outro:
      "Do not assume every semiconductor company follows the same model. For example, NVIDIA and AMD are primarily chip designers that rely on external manufacturing partners, while TSMC operates a foundry business. Broadcom develops semiconductor solutions but also has a substantial infrastructure software business.",
  },

  whoPays: {
    sub: "Who buys semiconductor products and services?",
    items: [
      {
        title: "Technology & Electronics Companies",
        text:
          "Manufacturers buy chips or related components for computers, smartphones, networking equipment, storage devices, and other electronic products.",
        icon: "ti-device-laptop",
      },
      {
        title: "Cloud & AI Infrastructure Providers",
        text:
          "Large computing infrastructure operators purchase processors, accelerators, networking components, and other chips for data centers. Demand depends on their infrastructure plans, workloads, and investment priorities.",
        icon: "ti-cloud-computing",
      },
      {
        title: "Automotive & Industrial Businesses",
        text:
          "Vehicle manufacturers and industrial equipment suppliers use chips for control systems, connectivity, power management, sensing, and automation.",
        icon: "ti-car",
      },
      {
        title: "Other Chip Designers",
        text:
          "Fabless companies and other chip designers pay foundries to manufacture their designs. Depending on the arrangement, customers may also purchase packaging, testing, or related services.",
        icon: "ti-circuit-resistor",
      },
      {
        title: "Businesses Licensing Semiconductor IP",
        text:
          "Some companies pay licensing fees or royalties to use chip-design intellectual property. This is a different revenue model from selling finished chips or manufacturing wafers.",
        icon: "ti-license",
      },
    ],
  },

  makeMoney: {
    sub: "How semiconductor businesses generate revenue",
    items: [
      {
        title: "Chip Sales",
        text:
          "Design-focused companies earn revenue by selling processors, accelerators, memory, networking chips, or other semiconductor products. Revenue depends on units sold, product mix, and selling prices.",
        icon: "ti-cpu",
      },
      {
        title: "Wafer Manufacturing Services",
        text:
          "Foundries earn revenue by manufacturing wafers and providing related production services. Customer demand, process technology, manufacturing capacity, and product complexity can influence revenue and profitability.",
        icon: "ti-building-factory-2",
      },
      {
        title: "Intellectual Property Licensing",
        text:
          "Some businesses license chip designs, technologies, or related intellectual property. Depending on the agreement, revenue may come from licensing fees, royalties, or other contractual payments.",
        icon: "ti-certificate",
      },
      {
        title: "Specialized Products & Solutions",
        text:
          "Certain companies sell broader semiconductor-based solutions, including networking components, modules, subsystems, or integrated products. Reported revenue may therefore represent more than sales of individual chips.",
        icon: "ti-packages",
      },
    ],
  },

  moneyGoes: {
    sub: "Where the money goes",
    items: [
      {
        title: "Research & Development",
        text:
          "Companies invest in chip architecture, engineering talent, design tools, verification, software support, and future product development. R&D is especially important in markets where products must improve rapidly.",
        icon: "ti-flask",
      },
      {
        title: "Manufacturing & Production",
        text:
          "Manufacturing businesses incur costs related to factory operations, equipment depreciation, materials, electricity, maintenance, labor, and production processes. Fabless companies instead pay external partners to manufacture and package their chips.",
        icon: "ti-building-factory-2",
      },
      {
        title: "Packaging, Testing & Quality",
        text:
          "Products must be packaged, tested, and qualified for their intended use. More complex products may require specialized processes and additional manufacturing steps.",
        icon: "ti-test-pipe",
      },
      {
        title: "Equipment & Capacity",
        text:
          "Foundries and other manufacturers may need substantial capital investment to build, upgrade, and equip production facilities. These investments can create long-term capacity but also increase financial and execution risks.",
        icon: "ti-settings",
      },
      {
        title: "Sales, Support & Operations",
        text:
          "Companies also spend on customer support, distribution, technical collaboration, administration, and other activities needed to develop and deliver products.",
        icon: "ti-users",
      },
    ],
  },

  growth: {
    drivers: {
      title: "What can drive growth?",
      items: [
        "Demand for computing and data-center infrastructure can increase demand for processors, accelerators, memory, and networking chips.",
        "New product generations may create opportunities when customers need better performance, energy efficiency, connectivity, or specialized functionality.",
        "Growth in vehicles, industrial automation, communications, and connected devices can create demand for different categories of semiconductors.",
        "Advanced manufacturing and packaging capabilities may help suppliers serve products with increasingly demanding technical requirements.",
        "Long-term customer relationships, design wins, and successful product roadmaps can support recurring demand across product generations.",
      ],
    },

    opportunities: {
      title: "Where opportunities may emerge",
      items: [
        "AI computing: specialized chips and networking products may benefit as organizations build and upgrade AI infrastructure. Actual demand and supplier economics can change.",
        "Advanced manufacturing: foundries that successfully develop competitive manufacturing processes may attract customers whose products require those capabilities.",
        "Automotive and industrial electronics: increasing electronic content can create opportunities, although qualification cycles and end-market demand vary.",
        "Advanced packaging: complex computing systems may require new ways to combine and connect chips, creating opportunities for specialized capabilities.",
        "Power efficiency and connectivity: customers may seek chips that improve energy use, data movement, and system performance.",
      ],
    },

    callout:
      "These are potential demand drivers, not guarantees of revenue growth or profitability. A growing market can still produce disappointing results for individual companies if competition intensifies, costs rise, customers reduce spending, or a company cannot execute its product roadmap.",
  },

  strength: {
    title: "What can create a competitive advantage?",
    sub: "Advantages often take years to develop and can be difficult to reproduce.",
    items: [
      {
        title: "Engineering & Intellectual Property",
        text:
          "Specialized engineering expertise, chip architecture, design knowledge, and intellectual property can help companies create products that meet demanding customer requirements.",
        icon: "ti-brain",
      },
      {
        title: "Manufacturing Capability",
        text:
          "Advanced process technology, production consistency, manufacturing yields, and operational execution can differentiate foundries and other manufacturers.",
        icon: "ti-building-factory-2",
      },
      {
        title: "Customer Relationships & Design Wins",
        text:
          "When a chip is integrated into a customer's product, switching to another supplier may require redesign, testing, and qualification. This can support relationships, but it does not guarantee that customers will stay.",
        icon: "ti-handshake",
      },
      {
        title: "Scale & Specialized Investment",
        text:
          "Large-scale operations, accumulated expertise, and access to capital can support investment in complex technologies. However, scale alone does not guarantee superior returns.",
        icon: "ti-chart-arrows-vertical",
      },
      {
        title: "Reliable Execution",
        text:
          "Delivering products on time, meeting specifications, managing supply, and supporting customers can be as important as technical performance.",
        icon: "ti-checklist",
      },
    ],
  },

  competition: {
    compete: {
      title: "How do semiconductor companies compete?",
      items: [
        "Performance, power efficiency, functionality, and total system cost.",
        "Manufacturing process capabilities, yields, production consistency, and delivery reliability.",
        "Product roadmaps, engineering support, software ecosystems, and compatibility with customer systems.",
        "Price, availability, product quality, and long-term customer relationships.",
        "The ability to invest in new technologies while maintaining financial and operational discipline.",
      ],
    },

    challenges: {
      title: "Why can competition be difficult?",
      items: [
        "Developing competitive chips can require years of engineering work and substantial research and development spending.",
        "Manufacturing facilities and advanced equipment can be extremely expensive, and investments may take years to become productive.",
        "Product development is technically complex. Delays, design errors, or weak manufacturing yields can affect costs and customer relationships.",
        "Technology transitions can change which products and suppliers are competitive, making past success an unreliable guide to future performance.",
        "Customers may develop alternatives, change suppliers, negotiate lower prices, or reduce purchases when demand weakens.",
      ],
    },
  },

  risks: {
    sub: "Important risks to understand",
    items: [
      {
        title: "Cyclical Demand",
        text:
          "Semiconductor demand can rise and fall with economic conditions, customer inventory adjustments, end-market demand, and spending cycles. Strong periods can be followed by slower demand.",
        icon: "ti-chart-line",
      },
      {
        title: "Technology & Product Risk",
        text:
          "A company may invest heavily in a product or process that arrives late, underperforms, loses customer interest, or becomes less competitive than expected.",
        icon: "ti-cpu",
      },
      {
        title: "Supply-Chain Concentration",
        text:
          "Some companies depend on a limited number of foundries, packaging providers, or other suppliers. Disruptions can affect production schedules and product availability.",
        icon: "ti-link",
      },
      {
        title: "High Capital Requirements",
        text:
          "Manufacturers that invest heavily in factories and equipment can face substantial fixed costs. If demand or utilization is lower than expected, profitability may suffer.",
        icon: "ti-building-factory-2",
      },
      {
        title: "Inventory & Forecasting",
        text:
          "Companies and their customers must estimate future demand. Excess inventory can lead to reduced orders, discounts, write-downs, or lower production.",
        icon: "ti-box",
      },
      {
        title: "Geopolitical & Operational Disruptions",
        text:
          "Trade restrictions, regional tensions, natural disasters, utility shortages, and other disruptions can affect semiconductor supply chains and manufacturing operations.",
        icon: "ti-world",
      },
      {
        title: "Customer Concentration",
        text:
          "A company that depends on a small number of major customers may be vulnerable if one customer reduces orders, changes suppliers, or develops an alternative solution.",
        icon: "ti-users",
      },
    ],
  },

  metrics: {
    sub: "Metrics to understand semiconductor businesses",
    items: [
      {
        label: "Revenue Growth",
        fullName: "Year-over-Year Revenue Growth",
        text:
          "Measures how revenue changes compared with the same period in the previous year. It helps show business momentum, but growth can reflect pricing, product mix, acquisitions, or cyclical demand—not just higher unit sales.",
        icon: "ti-trending-up",
      },
      {
        label: "Gross Margin",
        fullName: "Gross Profit as a Percentage of Revenue",
        text:
          "Shows how much revenue remains after the costs included in cost of revenue. It can reflect product mix, pricing, manufacturing costs, and production efficiency. Comparisons between fabless designers and foundries require care because their cost structures differ.",
        icon: "ti-chart-pie",
      },
      {
        label: "Operating Margin",
        fullName: "Operating Income as a Percentage of Revenue",
        text:
          "Shows the proportion of revenue remaining after operating expenses under the company's reporting definitions. It helps assess operating profitability, but company-specific accounting items and business mix can affect comparisons.",
        icon: "ti-percentage",
      },
      {
        label: "R&D Intensity",
        fullName: "Research & Development as a Percentage of Revenue",
        text:
          "Shows how much revenue a company spends on research and development. It helps indicate the resources devoted to future products, but higher spending does not automatically produce successful innovation.",
        icon: "ti-microscope",
      },
      {
        label: "Capital Expenditure",
        fullName: "Capital Expenditures (CapEx)",
        text:
          "Measures spending on long-lived assets such as manufacturing facilities and equipment. It is especially important for foundries and integrated manufacturers. High CapEx may support future capacity but can also pressure cash flow.",
        icon: "ti-building-factory-2",
      },
      {
        label: "Inventory Trends",
        fullName: "Inventory Levels and Inventory Changes",
        text:
          "Inventory data can help reveal whether products are accumulating faster than they are being sold or consumed. Interpret it alongside revenue, demand conditions, product launches, and customer inventory because inventory can rise for legitimate reasons too.",
        icon: "ti-box",
      },
      {
        label: "Capacity Utilization",
        fullName: "Manufacturing Capacity Utilization",
        text:
          "Indicates how much available production capacity is being used. It is particularly relevant to manufacturers with large fixed costs. Higher utilization can improve cost absorption, but definitions and disclosure practices vary.",
        icon: "ti-gauge",
      },
      {
        label: "Manufacturing Yield",
        fullName: "Production Yield",
        text:
          "Measures the proportion of units or production output meeting required specifications, using the company's defined method. Yield can affect manufacturing costs and usable output, but public disclosure and definitions are not consistent across companies.",
        icon: "ti-check",
      },
    ],

    callout:
      "Choose metrics that fit the business model. CapEx, capacity utilization, and manufacturing yield are especially relevant to manufacturers, while product mix, R&D, and gross margin can be central to chip designers. Always check the company's definitions, reporting period, segment disclosures, and accounting policies before comparing results.",
  },

  companies: {
    sub: "Examples from companies covered by Scope",
    items: [
      {
        slug: "nvidia",
        role:
          "Primarily a fabless chip designer and supplier of accelerated computing and networking products. It relies on external manufacturing partners for wafer fabrication and other production stages. Its total company revenue should not be treated as semiconductor revenue alone without checking its reported business and product disclosures.",
      },
      {
        slug: "amd",
        role:
          "A fabless semiconductor company that designs CPUs, GPUs, and adaptive computing products while relying on external manufacturing partners for important production stages. Its results are affected by product mix and demand across its end markets.",
      },
      {
        slug: "tsmc",
        role:
          "A semiconductor foundry that manufactures chips for customers. Its business economics are closely linked to manufacturing technology, capacity, customer demand, capital investment, and production execution.",
      },
      {
        slug: "broadcom",
        role:
          "Designs and supplies semiconductor and semiconductor-based solutions, including networking products used in data centers. Broadcom also operates a separate infrastructure software segment, so its total company results are not purely semiconductor results.",
      },
    ],
  },

  related: {
    sub: "Explore related business models",
    slugs: ["ai", "hardware", "cloud"],
  },

  disclaimer: SCOPE_DISCLAIMER,
};