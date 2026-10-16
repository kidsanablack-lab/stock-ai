import {
  SCOPE_DISCLAIMER,
  type BusinessModelDetail,
} from "./types";

export const HARDWARE_DETAIL: BusinessModelDetail = {
  slug: "hardware",

  headline: "How Hardware Companies Turn Physical Products into Revenue",

  description:
    "Hardware companies design, develop, manufacture, or sell physical products such as computers, smartphones, electronic devices, and computing systems. Their business performance depends on product demand, pricing, production costs, inventory management, and their ability to deliver products customers value.",

  characteristics: {
    tags: [
      "Physical Products",
      "Product Design",
      "Manufacturing",
      "Supply Chain",
      "Inventory Management",
    ],
    note:
      "Hardware companies do not all operate the same way. Some design products and outsource manufacturing, while others own production facilities or specialize in components. Their costs, capital requirements, and profit potential depend on their products, production methods, suppliers, and customer markets.",
  },

  whatIsIt: {
    sub:
      "Hardware companies create and sell physical products that customers use, operate, or incorporate into other products.",

    paragraphs: [
      "A hardware business earns revenue by selling physical products. These products may include smartphones, computers, gaming devices, servers, electronic components, or equipment used by other businesses. Customers pay for the product's functionality, performance, reliability, design, or ability to solve a particular problem.",

      "Some companies design products but rely on external manufacturers to produce them. Others manufacture products themselves, while component suppliers sell parts that other companies incorporate into finished products. These operating models can have very different cost structures and capital requirements.",

      "The basic economics involve selling products for more than the costs associated with producing and delivering them. However, the difference between selling price and manufacturing cost is not the same as final profit. Research and development, marketing, distribution, administration, warranty claims, and other expenses also affect profitability.",

      "Hardware companies may also earn revenue from accessories, maintenance, extended warranties, or related services. These revenue sources should be distinguished from physical product sales when the company's disclosures provide enough detail. For example, Apple sells devices as well as services, while Microsoft's business includes hardware alongside substantial software and cloud operations.",

      "Hardware is a broad business category rather than a single standardized business model. A consumer-device company, a server-system provider, and a semiconductor designer may all sell physical technology products, but their customers, production economics, competitive advantages, and financial metrics can differ substantially.",
    ],
  },

  flow: {
    sub:
      "From understanding customer needs to delivering a product and supporting it after the sale.",

    steps: [
      {
        title: "Identify Customer Needs",
        text:
          "Understand what customers need the product to do, which features matter, and what they are willing to pay.",
        icon: "ti-bulb",
        examples: [
          "Consumers need a computer for work, study, or entertainment.",
          "A business needs computing equipment for its operations.",
        ],
      },
      {
        title: "Design and Develop",
        text:
          "Create the product's design, specifications, engineering, and supporting technology. Development costs may be incurred well before the product generates revenue.",
        icon: "ti-settings",
        examples: [
          "Design a new computer with improved performance.",
          "Develop a device that meets customer reliability requirements.",
        ],
      },
      {
        title: "Source and Manufacture",
        text:
          "Obtain components and materials, then manufacture and assemble the product internally or through external production partners.",
        icon: "ti-building-factory",
        examples: [
          "Purchase electronic components from suppliers.",
          "Contract an external manufacturer to assemble devices.",
        ],
      },
      {
        title: "Sell and Deliver",
        text:
          "Sell through direct channels, online stores, distributors, retailers, or business sales teams, then deliver products to customers.",
        icon: "ti-truck-delivery",
        examples: [
          "Sell a laptop through an online store.",
          "Supply computing systems to an enterprise customer.",
        ],
      },
      {
        title: "Support and Improve",
        text:
          "Handle warranty claims, provide customer support, evaluate product performance, and develop future versions based on customer needs.",
        icon: "ti-shield-check",
        examples: [
          "Repair or replace a defective device under warranty.",
          "Develop a successor product with improved capabilities.",
        ],
      },
    ],
  },

  howItWorks: {
    sub:
      "The economics depend on what customers pay, what it costs to deliver each product, and the expenses required to run the business.",

    intro:
      "A hardware company must turn product demand into profitable sales while managing development costs, manufacturing capacity, inventory, and delivery.",

    chain: [
      {
        title: "Develop",
        text:
          "Invest in product design, engineering, testing, and development before or during the product's commercial life.",
        tag: "Product development",
      },
      {
        title: "Produce",
        text:
          "Source components and manufacture enough products to meet expected demand without creating excessive inventory.",
        tag: "Production",
      },
      {
        title: "Sell",
        text:
          "Set prices and use appropriate distribution channels to reach consumers, businesses, or other manufacturers.",
        tag: "Product sales",
      },
      {
        title: "Deliver",
        text:
          "Manage shipping, distribution, installation when needed, and customer support while controlling related costs.",
        tag: "Fulfillment",
      },
      {
        title: "Improve",
        text:
          "Use customer feedback and product performance to improve future products, operations, and the customer experience.",
        tag: "Continuous improvement",
      },
    ],

    outro:
      "More sales do not automatically produce more profit or cash. A company may sell products at low margins, spend heavily on development, build inventory ahead of demand, or wait for customers to pay. Revenue, profit, cash collected, and cash flow must therefore be evaluated separately.",
  },

  whoPays: {
    sub:
      "The customer depends on the product: it may be an individual consumer, a business, or another manufacturer.",

    items: [
      {
        title: "Consumers",
        text:
          "Individuals purchase devices such as smartphones, computers, gaming hardware, and accessories for personal use.",
        icon: "ti-users",
      },
      {
        title: "Businesses",
        text:
          "Organizations purchase computers, servers, networking equipment, and other hardware to support their operations.",
        icon: "ti-building",
      },
      {
        title: "Manufacturers and System Integrators",
        text:
          "Companies purchase components or equipment that they incorporate into finished products or larger systems.",
        icon: "ti-building-factory",
      },
      {
        title: "Retailers and Distributors",
        text:
          "Channel partners purchase or distribute products for resale. Depending on the commercial arrangement and accounting rules, the manufacturer's revenue recognition may differ from the final consumer's purchase date.",
        icon: "ti-truck-delivery",
      },
    ],
  },

  makeMoney: {
    sub:
      "Product sales are usually central, while additional revenue sources depend on the company's products and operating model.",

    items: [
      {
        title: "Finished Product Sales",
        text:
          "Sell complete products such as computers, smartphones, servers, or gaming devices. Revenue depends on the quantity sold, selling prices, product mix, and applicable revenue-recognition rules.",
        icon: "ti-device-laptop",
      },
      {
        title: "Component Sales",
        text:
          "Sell individual components or subsystems to manufacturers and other business customers. The economics depend on product complexity, supplier costs, pricing, and competition.",
        icon: "ti-cpu",
      },
      {
        title: "Accessories and Add-ons",
        text:
          "Sell complementary products such as peripherals, cables, controllers, or compatible accessories. The contribution to revenue and profit varies by company and product category.",
        icon: "ti-device-mobile",
      },
      {
        title: "Maintenance and Support",
        text:
          "Some hardware businesses charge for maintenance, technical support, extended warranties, or other services. These services are distinct from the initial sale of a physical product.",
        icon: "ti-tool",
      },
      {
        title: "Integrated Ecosystem",
        text:
          "Hardware may help a company sell related software, subscriptions, content, or services. These related revenues should be analyzed separately when possible rather than automatically attributed to hardware sales.",
        icon: "ti-apps",
      },
    ],
  },

  moneyGoes: {
    sub:
      "A hardware company's expenses depend on how its products are designed, sourced, manufactured, sold, and supported.",

    items: [
      {
        title: "Components and Materials",
        text:
          "Pay suppliers for electronic components, raw materials, processors, displays, memory, batteries, and other inputs required by the product.",
        icon: "ti-packages",
      },
      {
        title: "Manufacturing and Assembly",
        text:
          "Cover production labor, factory overhead, contract manufacturing, testing, and assembly. The cost structure differs between companies that manufacture internally and those that outsource production.",
        icon: "ti-building-factory",
      },
      {
        title: "Research and Development",
        text:
          "Fund engineers, product designers, prototypes, testing, and technology development. Some development costs may be expensed immediately, while certain costs may be capitalized when accounting requirements are met.",
        icon: "ti-bulb",
      },
      {
        title: "Inventory and Logistics",
        text:
          "Pay for warehousing, transportation, handling, and inventory management. Products that become outdated or remain unsold may require discounts or inventory write-downs.",
        icon: "ti-truck-delivery",
      },
      {
        title: "Sales and Marketing",
        text:
          "Spend on advertising, product launches, sales teams, channel relationships, and other activities needed to attract customers and generate demand.",
        icon: "ti-speakerphone",
      },
      {
        title: "Warranty and Customer Support",
        text:
          "Cover repairs, replacements, technical support, and other obligations associated with products sold to customers.",
        icon: "ti-shield-check",
      },
      {
        title: "Capital Expenditure",
        text:
          "Companies that own manufacturing facilities or other long-lived equipment may need substantial investment in factories, machinery, and production infrastructure. This cash spending is different from the depreciation expense recognized over time.",
        icon: "ti-building",
      },
    ],
  },

  growth: {
    drivers: {
      title: "What Drives Growth?",
      items: [
        "Unit sales: selling more products to existing or new customers.",
        "Average selling price: increasing prices when customer value, product positioning, or market conditions support it.",
        "Product mix: selling a greater proportion of higher-priced products, which may change revenue and margins.",
        "Product innovation: developing products that address new needs or offer meaningful improvements.",
        "Replacement demand: customers replacing older devices as they age or become less suitable for current needs.",
        "Distribution expansion: reaching additional customers through retailers, online channels, partners, or enterprise sales.",
        "Business investment: organizations purchasing additional computing equipment or upgrading existing infrastructure.",
      ],
    },

    opportunities: {
      title: "Where Opportunities Can Come From",
      items: [
        "New product categories may allow companies to reach customers with different needs.",
        "Better product design or reliability may improve customer satisfaction and repeat purchases.",
        "Operational improvements may reduce manufacturing, logistics, or warranty costs.",
        "A strong distribution network may improve product availability and market reach.",
        "Complementary services and accessories may create additional revenue opportunities where customers value them.",
        "Enterprise relationships may support repeat orders when products meet performance, reliability, and service requirements.",
      ],
    },

    callout:
      "Revenue growth alone does not prove that a hardware business is becoming more profitable. Growth can require additional inventory, research and development, marketing, production capacity, and working capital. If prices fall or costs rise faster than selling prices, higher sales may still produce weaker margins or cash flow.",
  },

  strength: {
    title: "Potential Competitive Advantages",

    sub:
      "Hardware companies may compete through product quality, engineering, cost efficiency, customer relationships, and execution. These advantages must be evaluated using evidence rather than assumed from a company's size or reputation.",

    items: [
      {
        title: "Product Differentiation",
        text:
          "Distinctive performance, reliability, design, usability, or features may give customers reasons to choose a product over alternatives.",
        icon: "ti-bulb",
      },
      {
        title: "Engineering and Design",
        text:
          "Strong engineering capabilities may help a company develop products that meet demanding technical requirements or deliver a better customer experience.",
        icon: "ti-settings",
      },
      {
        title: "Brand and Customer Trust",
        text:
          "A trusted brand may reduce customer uncertainty and support repeat purchases, but reputation must be maintained through product quality and service.",
        icon: "ti-award",
      },
      {
        title: "Cost Efficiency",
        text:
          "Effective sourcing, manufacturing, logistics, and product design may reduce costs per unit. Cost advantages depend on the product, production scale, supplier relationships, and execution.",
        icon: "ti-chart-bar",
      },
      {
        title: "Distribution and Ecosystem",
        text:
          "Retail access, enterprise relationships, compatible products, and complementary services may make a company's products easier to purchase and use.",
        icon: "ti-network",
      },
      {
        title: "Supply Chain Execution",
        text:
          "Reliable access to components and effective coordination with manufacturing partners can help a company manage delivery times, production quality, and inventory.",
        icon: "ti-truck-delivery",
      },
    ],
  },

  competition: {
    compete: {
      title: "How Hardware Companies Compete",
      items: [
        "Price: offer products at prices customers consider reasonable relative to alternatives.",
        "Performance: deliver the computing power, speed, durability, or capabilities customers need.",
        "Quality and reliability: reduce defects and deliver consistent product performance.",
        "Design and usability: make products easier or more enjoyable to use.",
        "Availability: keep products available when customers want to purchase them.",
        "Support and compatibility: provide dependable support and ensure products work with relevant systems and accessories.",
        "Innovation: release improvements that customers consider meaningful enough to justify a purchase or upgrade.",
      ],
    },

    challenges: {
      title: "Why Competition Can Be Difficult",
      items: [
        "Products may become less attractive when competitors introduce better features or lower prices.",
        "Components and manufacturing capacity may be constrained, increasing costs or limiting deliveries.",
        "Large research and development spending may not produce commercially successful products.",
        "Retailers, distributors, and enterprise customers may negotiate aggressively on price.",
        "Demand may shift quickly between product generations, making inventory planning difficult.",
        "Hardware products may face substitution from competing technologies or alternative ways of solving the same problem.",
      ],
    },
  },

  risks: {
    sub:
      "Hardware businesses face risks from changing technology, product demand, production costs, and the need to coordinate complex supply chains.",

    items: [
      {
        title: "Intense Competition",
        text:
          "Competitors may offer similar products at lower prices or introduce superior features. This can reduce market share, selling prices, and profit margins.",
        icon: "ti-users",
      },
      {
        title: "Product Obsolescence",
        text:
          "Technology and customer preferences can change quickly. Products or components may lose commercial value before a company has sold all its inventory.",
        icon: "ti-device-laptop",
      },
      {
        title: "Inventory Risk",
        text:
          "Producing or purchasing more inventory than customers demand can tie up cash, increase storage costs, and lead to discounts or write-downs.",
        icon: "ti-packages",
      },
      {
        title: "Supply Chain Disruption",
        text:
          "Component shortages, supplier failures, transportation problems, or geopolitical events may interrupt production or increase costs.",
        icon: "ti-truck-delivery",
      },
      {
        title: "Margin Pressure",
        text:
          "Higher input costs, lower selling prices, unfavorable product mix, or greater manufacturing expenses may reduce gross margin.",
        icon: "ti-chart-line",
      },
      {
        title: "Quality and Warranty Costs",
        text:
          "Defects or product failures may lead to repair expenses, replacements, warranty claims, recalls, reputational damage, or legal obligations.",
        icon: "ti-shield-check",
      },
      {
        title: "Research and Development Risk",
        text:
          "Product development can consume substantial resources without guaranteeing customer adoption, technical success, or a profitable return.",
        icon: "ti-bulb",
      },
      {
        title: "Capital Intensity",
        text:
          "Businesses that own factories or specialized production equipment may need significant investment before generating sales. Capacity that is underused can reduce returns on that investment.",
        icon: "ti-building",
      },
      {
        title: "Customer Concentration",
        text:
          "A company that depends heavily on a small number of large customers may be vulnerable if a major customer reduces orders, changes suppliers, or negotiates lower prices.",
        icon: "ti-building",
      },
    ],
  },

  metrics: {
    sub:
      "These metrics help explain product demand, profitability, operating efficiency, and cash generation. Their definitions and usefulness vary by company and product category.",

    items: [
      {
        label: "Revenue Growth",
        fullName: "Year-over-Year or Period Revenue Growth",
        text:
          "Measures how revenue changes between periods. Growth can come from higher unit sales, higher selling prices, product mix, acquisitions, or currency effects. Revenue growth alone does not show whether a company is earning more profit or generating more cash.",
        icon: "ti-chart-line",
      },
      {
        label: "Units Sold or Shipped",
        fullName: "Product Unit Volume",
        text:
          "Measures the number of products sold or shipped during a period, when the company reports this information. Sold and shipped units may differ because of distribution arrangements, timing, returns, and reporting definitions. Different products may also vary greatly in price and complexity.",
        icon: "ti-packages",
      },
      {
        label: "Average Selling Price",
        fullName: "Average Selling Price (ASP)",
        text:
          "Represents average revenue per unit for a defined product category or period, when sufficient unit and revenue data are available. ASP can change because of price changes or because customers buy a different mix of products. Companies may define the product scope and unit measure differently, so comparisons require care.",
        icon: "ti-cash",
      },
      {
        label: "Gross Margin",
        fullName: "Gross Profit Margin",
        text:
          "Generally calculated as revenue minus cost of revenue, divided by revenue. It indicates how much revenue remains after the costs included in cost of revenue. It does not include every operating expense, and companies may classify certain costs differently. Product mix, manufacturing methods, and business models can make cross-company comparisons difficult.",
        icon: "ti-chart-pie",
      },
      {
        label: "Operating Margin",
        fullName: "Operating Profit Margin",
        text:
          "Generally calculated as operating income divided by revenue. It reflects profitability after operating expenses included in the company's operating income measure. Research and development, marketing, administration, and other costs can affect this metric. Accounting classifications and unusual items may limit comparability.",
        icon: "ti-chart-bar",
      },
      {
        label: "Inventory Turnover",
        fullName: "Inventory Turnover Ratio",
        text:
          "Commonly calculated as cost of goods sold divided by average inventory over a period. It helps assess how quickly inventory is used or sold relative to its cost. A higher ratio is not always better: unusually low inventory can create shortages, while the appropriate level depends on product lead times, seasonality, and supply chain requirements.",
        icon: "ti-refresh",
      },
      {
        label: "R&D Intensity",
        fullName: "Research and Development as a Percentage of Revenue",
        text:
          "Calculated as reported research and development expense divided by revenue, when the company reports both measures consistently. It indicates the scale of reported R&D spending relative to the business. A higher percentage does not prove that innovation is more effective, and accounting treatment or business maturity may affect comparisons.",
        icon: "ti-bulb",
      },
      {
        label: "Operating Cash Flow",
        fullName: "Net Cash Provided by Operating Activities",
        text:
          "Measures net cash generated or used by operating activities during a period under the company's cash flow statement. It can be affected by customer collections, supplier payments, inventory changes, and other working-capital movements. Strong operating cash flow in one period may not be sustainable, so it should be considered alongside profitability and cash flow over time.",
        icon: "ti-report-money",
      },
    ],

    callout:
      "No single metric explains the quality of a hardware business. Consider revenue growth alongside margins, inventory, research and development, and operating cash flow. Also check whether companies report comparable product categories, unit measures, cost classifications, and accounting definitions before drawing conclusions.",
  },

  companies: {
    sub:
      "These Scope companies illustrate different ways hardware-related products fit into broader technology businesses. None should automatically be treated as a pure-play hardware company.",

    items: [
      {
        slug: "apple",
        role:
          "Apple designs and sells physical products including iPhone, Mac, iPad, and wearable devices. These products are examples of consumer hardware. Apple also operates a Services business, so its total revenue should not be treated as hardware revenue.",
      },
      {
        slug: "microsoft",
        role:
          "Microsoft sells hardware products including Surface devices and Xbox consoles. These products operate alongside Windows, Xbox content and services, Microsoft 365, Azure, and other businesses. Microsoft is therefore a diversified technology company rather than a pure-play hardware manufacturer.",
      },
      {
        slug: "nvidia",
        role:
          "NVIDIA develops GPUs, computing systems, networking products, and related technologies used in areas such as accelerated computing and AI. Its products illustrate specialized computing hardware, but its business also includes software and a broader technology platform. It is closely related to the Semiconductors model as well.",
      },
      {
        slug: "amd",
        role:
          "AMD develops processors, graphics products, and other computing technologies for consumer, enterprise, and data center markets. It is a useful example of the overlap between hardware products and semiconductor design. Its business should be examined separately from companies that primarily sell finished consumer devices.",
      },
    ],
  },

  related: {
    sub:
      "Explore related business models to understand the technology, infrastructure, and services that may connect with physical hardware products.",

    slugs: ["semiconductors", "ai", "cloud"],
  },

  disclaimer: SCOPE_DISCLAIMER,
};