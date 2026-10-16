import { SCOPE_DISCLAIMER } from "./types";
import type { BusinessModelDetail } from "./types";

export const consumerBrandsDetail: BusinessModelDetail = {
  slug: "consumer-brands",

  headline:
    "How consumer brands turn products into customer demand and repeat sales",

  description:
    "Consumer brand businesses create, market, and sell products under recognizable brands. Their results depend on more than brand awareness: product value, pricing, distribution, production costs, inventory management, and customer demand all influence whether sales translate into sustainable profits.",

  characteristics: {
    tags: [
      "Brand Recognition",
      "Physical Products",
      "Customer Demand",
      "Distribution Channels",
      "Repeat Purchases",
      "Inventory Risk",
    ],
    note:
      "Consumer brands use brand identity and product value to influence purchasing decisions. Companies may manufacture products themselves, use external manufacturers, sell directly to consumers, or distribute through retailers. These choices create different cost structures and risks, so not every consumer brand operates in the same way.",
  },

  whatIsIt: {
    sub:
      "A consumer brand business sells products whose identity, perceived quality, design, or reputation helps distinguish them from alternatives.",

    paragraphs: [
      "A brand is more than a product name or logo. It represents the identity and expectations that customers associate with a product. When customers believe a product offers value that alternatives do not provide as well, they may choose it repeatedly or accept a different price. However, brand awareness alone does not prove that customers will buy or remain loyal.",

      "Consumer brands operate across many categories, including sportswear, beverages, personal care, household products, and packaged goods. The economics differ by category. Some products are purchased frequently, while others last for years. Some compete mainly on price, while others depend more on design, performance, convenience, or customer perception.",

      "Companies also use different operating structures. A brand owner might manufacture products internally, contract an external manufacturer, sell through retailers, or operate its own stores and websites. Some companies earn licensing income by allowing partners to use their intellectual property. These activities can coexist within one business, but they do not have identical revenue and cost structures.",
    ],
  },

  flow: {
    sub:
      "A consumer brand must turn a customer need into a product that people want to buy, then deliver that product at an economically sustainable cost.",

    steps: [
      {
        title: "Understand Customer Needs",
        text:
          "Identify a customer problem, preference, or use case that a product can address.",
        icon: "ti-users",
        examples: [
          "Sportswear designed for particular activities",
          "Beverages developed for different occasions",
          "Household products intended to make everyday tasks easier",
        ],
      },
      {
        title: "Develop the Product",
        text:
          "Design, test, source, or manufacture products that meet the intended customer need.",
        icon: "ti-package",
        examples: [
          "Product design and material selection",
          "Formulation and quality testing",
          "Supplier selection and production planning",
        ],
      },
      {
        title: "Build Brand Awareness",
        text:
          "Use product experience, marketing, packaging, and communication to help customers recognize and understand the brand.",
        icon: "ti-bulb",
        examples: [
          "Advertising and product demonstrations",
          "Packaging and brand identity",
          "Customer reviews and word of mouth",
        ],
      },
      {
        title: "Distribute and Sell",
        text:
          "Make products available through suitable channels and collect revenue from completed sales.",
        icon: "ti-shopping-cart",
        examples: [
          "Selling to retailers and distributors",
          "Selling through company-owned stores",
          "Selling through an official online store",
        ],
      },
      {
        title: "Learn and Improve",
        text:
          "Use customer feedback, sales information, and inventory data to improve products and future decisions.",
        icon: "ti-chart-line",
        examples: [
          "Adjusting product designs",
          "Reviewing demand by product and channel",
          "Reducing slow-moving inventory",
        ],
      },
    ],
  },

  howItWorks: {
    sub:
      "Brand ownership, manufacturing, distribution, and retail are different activities. A company may control several of them or rely on outside partners.",

    intro:
      "The following is a simplified example of how a branded product can reach a customer. Actual arrangements vary by company and product category.",

    chain: [
      {
        title: "Brand Owner",
        text:
          "Defines the product, brand positioning, target customer, and commercial strategy. The brand owner may also manage design, marketing, and product standards.",
        tag: "Brand strategy",
      },
      {
        title: "Manufacturer or Supplier",
        text:
          "Produces the product or supplies the materials and components. Manufacturing may happen inside the company or through an external partner.",
        tag: "Product supply",
      },
      {
        title: "Distributor or Retailer",
        text:
          "Purchases or distributes products and makes them available to customers. The channel may include independent retailers, wholesalers, or company-owned stores.",
        tag: "Distribution",
      },
      {
        title: "Consumer",
        text:
          "Chooses whether to buy the product based on factors such as price, quality, convenience, design, reputation, and available alternatives.",
        tag: "Customer demand",
      },
      {
        title: "Repeat Purchase and Feedback",
        text:
          "Customer experience and product performance may influence future purchases. Repeat demand is possible, but it is never guaranteed by brand recognition alone.",
        tag: "Customer relationship",
      },
    ],

    outro:
      "The brand owner does not necessarily receive the full retail price paid by the final consumer. In a wholesale arrangement, the brand owner generally records its sale to the retailer or distributor, while the retailer records its own sale to the consumer. These are separate transactions.",
  },

  whoPays: {
    sub:
      "The direct buyer depends on how the product is sold. The consumer who ultimately uses a product is not always the company’s immediate customer.",

    items: [
      {
        title: "Individual Consumers",
        text:
          "Consumers pay for products through company-owned stores, official websites, or other direct sales channels. The company must account for the costs of serving those customers.",
        icon: "ti-user",
      },
      {
        title: "Retailers",
        text:
          "Retailers buy products from brand owners or their distributors and resell them to consumers. The retailer's purchase price is not the same as the final shelf price.",
        icon: "ti-building-store",
      },
      {
        title: "Wholesalers and Distributors",
        text:
          "These businesses purchase or distribute products to serve other commercial customers or retail locations. Contract terms and channel arrangements affect the economics of each sale.",
        icon: "ti-truck-delivery",
      },
      {
        title: "Business Partners and Licensees",
        text:
          "In some arrangements, a partner pays to use a brand or related intellectual property. Licensing income depends on the agreement and should not be assumed to be material for every brand.",
        icon: "ti-file-text",
      },
    ],
  },

  makeMoney: {
    sub:
      "Consumer brands usually earn revenue by selling products, but the price received and costs incurred depend on the product, sales channel, and commercial agreement.",

    items: [
      {
        title: "Branded Product Sales",
        text:
          "The company sells products under its brand to consumers, retailers, distributors, or other customers. Revenue is generally recognized under the applicable accounting rules when the relevant recognition requirements are met, not simply whenever cash is received.",
        icon: "ti-package",
      },
      {
        title: "Wholesale Sales",
        text:
          "The brand owner sells products to retailers or distributors, usually at a different price from the final consumer price. Wholesale revenue and the retailer's later revenue are separate amounts earned by different businesses.",
        icon: "ti-truck-delivery",
      },
      {
        title: "Direct-to-Consumer Sales",
        text:
          "The company sells through channels it operates, such as its own stores or website. This can give the company more direct customer interaction, but it may also require spending on retail operations, fulfillment, customer service, and technology.",
        icon: "ti-shopping-cart",
      },
      {
        title: "Private-Label Products",
        text:
          "A retailer or other business sells products under a brand it owns or controls. The retailer may work with external manufacturers, but the specific responsibilities for design, sourcing, quality, and production vary by arrangement.",
        icon: "ti-tag",
      },
      {
        title: "Licensing and Royalties",
        text:
          "A brand owner may allow another business to use its brand or intellectual property under agreed conditions and receive licensing fees or royalties. This is a separate source of income from selling the underlying products directly.",
        icon: "ti-certificate",
      },
      {
        title: "Product and Market Expansion",
        text:
          "Companies may introduce new products, product variations, or enter new markets to serve additional customer needs. Expansion can create new sales opportunities, but it also requires investment and may weaken results if demand is overestimated.",
        icon: "ti-world",
      },
    ],
  },

  moneyGoes: {
    sub:
      "The cost structure depends on what the company controls, what it outsources, and how it reaches customers. More revenue does not automatically mean more profit.",

    items: [
      {
        title: "Product Costs",
        text:
          "Materials, components, manufacturing, packaging, and other costs associated with producing or acquiring goods. Their classification in the financial statements depends on the company's accounting policies and business structure.",
        icon: "ti-package",
      },
      {
        title: "Product Development",
        text:
          "Design, testing, research, prototypes, and product improvements. These costs may be particularly important when products need frequent innovation or strict quality controls.",
        icon: "ti-flask",
      },
      {
        title: "Marketing and Advertising",
        text:
          "Spending intended to create awareness, communicate product value, attract customers, and support demand. Marketing expenditure does not guarantee additional sales or customer loyalty.",
        icon: "ti-speakerphone",
      },
      {
        title: "Distribution and Fulfillment",
        text:
          "Transportation, warehousing, order processing, delivery, and related logistics. The cost structure differs between wholesale distribution and direct delivery to individual consumers.",
        icon: "ti-truck-delivery",
      },
      {
        title: "Retail and Customer Service",
        text:
          "Store operations, staff, rent, payment processing, returns, and customer support may be important for companies operating their own sales channels.",
        icon: "ti-building-store",
      },
      {
        title: "Inventory and Markdown Costs",
        text:
          "Products may remain unsold, become outdated, require discounts, or need to be written down. Poor demand forecasting can tie up cash and reduce profitability.",
        icon: "ti-box",
      },
      {
        title: "People, Technology, and Administration",
        text:
          "Employees, information systems, finance, legal support, and general administration help operate the business. Their importance depends on the company's size and operating model.",
        icon: "ti-settings",
      },
    ],
  },

  growth: {
    drivers: {
      title: "What Can Drive Growth?",
      items: [
        "Acquiring new customers who see a clear reason to choose the product.",
        "Encouraging repeat purchases through consistent product value and customer experience.",
        "Increasing sales volume when customer demand supports the additional supply.",
        "Introducing new products that fit the brand and meet identifiable customer needs.",
        "Expanding into new geographic markets or distribution channels.",
        "Changing prices when the customer value proposition and competitive conditions support the change.",
        "Improving product availability and reducing missed sales caused by supply or distribution problems.",
      ],
    },

    opportunities: {
      title: "Where Can Opportunities Come From?",
      items: [
        "A recognizable brand may help customers identify a product among competing alternatives.",
        "A trusted product experience may support repeat purchases, although loyalty varies by category and customer.",
        "Direct sales channels can give a company more direct interaction with customers and their purchasing behavior.",
        "An effective distribution network can make products available in more places and at more convenient times.",
        "Product innovation may create additional reasons for existing or new customers to buy.",
        "Better demand forecasting and inventory management may reduce avoidable markdowns and stock shortages.",
      ],
    },

    callout:
      "Growth should be evaluated alongside margins, inventory, and cash flow. A company can increase sales while earning less profit if discounts, production costs, marketing expenditure, returns, or operating costs rise faster than revenue.",
  },

  strength: {
    title: "Potential Competitive Advantages",
    sub:
      "A consumer brand can build advantages when customers consistently recognize and value meaningful differences. Those advantages must be supported by actual customer behavior and business results.",

    items: [
      {
        title: "Brand Recognition and Trust",
        text:
          "Customers who recognize a brand may find it easier to consider its products. Trust can support demand when it reflects a positive and consistent experience, but reputation can weaken if product quality or company behavior disappoints customers.",
        icon: "ti-award",
      },
      {
        title: "Product Differentiation",
        text:
          "Differences in performance, design, convenience, taste, quality, or other valued attributes can help a product stand apart. The difference matters commercially only when customers care about it enough to influence their purchasing decisions.",
        icon: "ti-bulb",
      },
      {
        title: "Distribution Reach",
        text:
          "Strong relationships with retailers, distributors, and sales partners can improve product availability. Distribution access may be harder to reproduce in some markets, but it does not eliminate competition or guarantee sales.",
        icon: "ti-world",
      },
      {
        title: "Customer Relationships",
        text:
          "Consistent product quality, service, and relevant communication may encourage repeat purchases. Customer retention should be assessed using available evidence rather than assuming every well-known brand has loyal customers.",
        icon: "ti-heart",
      },
      {
        title: "Scale and Sourcing",
        text:
          "A company with sufficient scale may have opportunities to improve purchasing terms, production planning, or distribution efficiency. The actual benefit depends on supplier relationships, utilization, product complexity, and the company's ability to manage costs.",
        icon: "ti-chart-bar",
      },
    ],
  },

  competition: {
    compete: {
      title: "How Do Consumer Brands Compete?",
      items: [
        "Offer products that customers perceive as useful, distinctive, reliable, or appealing.",
        "Set prices that reflect customer value while remaining competitive and economically sustainable.",
        "Maintain product quality and availability across relevant sales channels.",
        "Use marketing to communicate real product differences rather than relying on awareness alone.",
        "Develop effective relationships with retailers, distributors, suppliers, and customers.",
        "Manage product launches and inventory carefully to respond to changing demand.",
      ],
    },

    challenges: {
      title: "Why Can Competition Be Difficult?",
      items: [
        "Customers may switch to cheaper products or alternatives that offer better value.",
        "Competitors can imitate visible product features, designs, or marketing approaches.",
        "Retailers and distributors may have bargaining power over price, shelf space, and commercial terms.",
        "Digital channels can make it easier for new brands to reach customers, while also increasing competition for attention.",
        "A brand can lose relevance if customer preferences change faster than its products and strategy.",
        "Expanding into too many product categories can increase complexity, costs, and the risk of confusing the brand's positioning.",
      ],
    },
  },

  risks: {
    sub:
      "Brand strength does not remove operating, financial, or competitive risk. Results depend on whether customers continue to value the products and whether the business can supply them profitably.",

    items: [
      {
        title: "Changing Customer Preferences",
        text:
          "Products can lose relevance as tastes, lifestyles, demographics, or purchasing habits change. A previously successful brand may need to adapt its products and positioning, and those changes may not work.",
        icon: "ti-refresh",
      },
      {
        title: "Pricing and Competitive Pressure",
        text:
          "Competitors may lower prices or offer products that customers perceive as better value. A brand may need to accept lower margins, spend more on marketing, or improve its offering to defend demand.",
        icon: "ti-trending-down",
      },
      {
        title: "Manufacturing and Supplier Disruption",
        text:
          "Production delays, quality problems, supplier concentration, or shortages of key materials can limit product availability and increase costs. Outsourcing production does not remove the brand owner's responsibility for managing these risks.",
        icon: "ti-alert-triangle",
      },
      {
        title: "Excess Inventory",
        text:
          "If a company produces or purchases more inventory than customers want, it may need to discount products or recognize inventory write-downs. Cash can remain tied up in goods that have not yet been sold.",
        icon: "ti-box",
      },
      {
        title: "Reputation and Product Quality",
        text:
          "Defects, misleading claims, safety concerns, or poor customer experiences can damage trust and lead to returns, recalls, legal costs, or reduced demand.",
        icon: "ti-shield-exclamation",
      },
      {
        title: "Distribution Dependence",
        text:
          "A company that relies heavily on particular retailers, distributors, or online platforms may be exposed to changes in their commercial terms, visibility, or willingness to carry its products.",
        icon: "ti-truck-delivery",
      },
      {
        title: "Expansion and Product Launches",
        text:
          "New products and markets require spending and management attention before demand is fully known. Expansion can fail if the company misunderstands local preferences, misprices products, or cannot achieve sufficient sales volume.",
        icon: "ti-world",
      },
      {
        title: "Brand Dilution",
        text:
          "Too many unrelated products, inconsistent quality, or licensing arrangements that weaken control may make a brand less distinctive. The consequences depend on the brand, customers, and execution.",
        icon: "ti-alert-circle",
      },
    ],
  },

  metrics: {
    sub:
      "These metrics help explain demand, profitability, and operating efficiency. Companies may define or disclose them differently, so comparisons require consistent periods, accounting definitions, and business context.",

    items: [
      {
        label: "Revenue Growth",
        fullName: "Year-over-Year Revenue Growth",
        text:
          "Measures how revenue changes between comparable periods. It helps show whether the business is expanding, but growth can reflect price changes, sales volume, foreign exchange, acquisitions, or changes in product mix. Compare companies over similar periods and separate organic growth from acquisition-related growth when reliable disclosures are available.",
        icon: "ti-chart-line",
      },
      {
        label: "Gross Margin",
        fullName: "Gross Profit as a Percentage of Revenue",
        text:
          "Gross margin is generally calculated as (Revenue minus Cost of Goods Sold) divided by Revenue. It shows how much revenue remains after the costs included in cost of goods sold, before operating expenses not included there. Accounting classifications and channel mix can differ, so gross margins should not be compared without checking what each company includes in its costs.",
        icon: "ti-percentage",
      },
      {
        label: "Operating Margin",
        fullName: "Operating Income as a Percentage of Revenue",
        text:
          "Operating margin is generally calculated as Operating Income divided by Revenue. It helps assess how much revenue remains after recognized operating costs. It can be affected by marketing, administration, store operations, restructuring, and accounting classifications. A higher margin does not by itself show stronger future growth or better investment value.",
        icon: "ti-chart-bar",
      },
      {
        label: "Inventory Turnover",
        fullName: "Cost of Goods Sold Relative to Average Inventory",
        text:
          "A common calculation divides Cost of Goods Sold by Average Inventory for the period. It helps indicate how quickly inventory is sold and replenished. Different product lifecycles, seasonal demand, and business models affect what is normal. Very high turnover can reflect efficient operations, but it can also accompany insufficient inventory and missed sales.",
        icon: "ti-box",
      },
      {
        label: "Sell-Through Rate",
        fullName: "Units Sold Relative to Units Available for Sale",
        text:
          "Sell-through is often used to assess how much available inventory sells over a specified period, but its exact calculation and denominator can vary. It can help reveal product demand and inventory risk. Companies may not disclose comparable figures, and retailer sell-through data should not be confused with the brand owner's recognized revenue.",
        icon: "ti-shopping-cart",
      },
      {
        label: "Repeat Purchase Rate",
        fullName: "Share of Customers Who Buy Again",
        text:
          "Measures the proportion of customers who make another purchase within a defined period, when the company has suitable customer data. It can help assess customer retention, but the calculation depends on how customers, repeat purchases, and the observation period are defined. It is not publicly disclosed or consistently measured by every company.",
        icon: "ti-refresh",
      },
      {
        label: "Direct-to-Consumer Mix",
        fullName: "Direct Sales as a Share of Revenue",
        text:
          "Where disclosed, this measures the proportion of revenue generated through direct channels such as company-operated stores or websites. It helps explain channel strategy, but it does not prove that direct sales are more profitable. Retail costs, fulfillment, returns, customer acquisition, and the treatment of wholesale revenue must also be considered.",
        icon: "ti-building-store",
      },
      {
        label: "Operating Cash Flow",
        fullName: "Net Cash Provided by Operating Activities",
        text:
          "Reports the net cash generated or used by operating activities under the applicable accounting rules. It helps show whether the business converts its operations into cash, but working-capital changes, supplier payment timing, customer collections, and inventory movements can cause cash flow to differ from profit in a given period. Compare multiple periods and understand material timing effects.",
        icon: "ti-cash",
      },
    ],

    callout:
      "Revenue, profit, and cash flow are different measures. A product sale may be recognized as revenue before the customer pays, while inventory purchases and supplier payments affect cash at different times. No single metric fully describes a consumer brand's business quality, and operating performance alone does not determine whether its shares are attractively valued.",
  },

  companies: {
    sub:
      "These companies illustrate different ways branded products can fit within broader businesses. None should be treated as a pure-play consumer brand company based solely on the examples below.",

    items: [
      {
        slug: "nike",
        role:
          "Nike designs, markets, and sells athletic footwear, apparel, equipment, and related products. It illustrates how a sports brand uses product design, marketing, and wholesale and direct sales channels. Its wider business and channel economics must be considered separately when assessing company-wide results.",
      },
      {
        slug: "coca-cola",
        role:
          "The Coca-Cola Company owns beverage brands and earns revenue through activities that include selling beverage concentrates and syrups to bottling partners as well as selling certain finished products. Its brand economics should be distinguished from the separate economics of bottling, distribution, and retail.",
      },
      {
        slug: "walmart",
        role:
          "Walmart sells many third-party products and also offers private-label products such as Great Value and Equate. It illustrates how retailer-owned brands can operate alongside a much broader retail business. Walmart's total revenue should not be treated as revenue from its private-label products alone.",
      },
      {
        slug: "costco",
        role:
          "Costco offers products under its Kirkland Signature private label alongside a broad range of other merchandise. It illustrates the relationship between a retailer's own brand, product sourcing, and a membership-based retail channel. Costco's overall business also includes membership and retail activities that should not be attributed solely to Kirkland Signature.",
      },
    ],
  },

  related: {
    sub:
      "Consumer brands connect with other business models through product creation, distribution, and customer acquisition. The connection does not mean the models are interchangeable.",

    slugs: [
      "e-commerce",
      "manufacturing",
      "advertising",
    ],
  },

  disclaimer: SCOPE_DISCLAIMER,
};