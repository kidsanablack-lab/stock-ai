import {
  SCOPE_DISCLAIMER,
  type BusinessModelDetail,
} from "./types";

/**
 * Manufacturing Business Model
 *
 * Scope content principles:
 * - Explain the business model, not investment recommendations.
 * - Distinguish general industry mechanics from company-specific examples.
 * - Do not assume that higher production volume always means higher profit.
 * - Revenue, profit, and cash flow are different measures.
 *
 * Research references for company-specific context:
 * - Apple, FY2025 Form 10-K:
 *   https://www.sec.gov/Archives/edgar/data/320193/000032019325000079/aapl-20250927.htm
 * - TSMC, 2025 Form 20-F:
 *   https://www.sec.gov/Archives/edgar/data/1046179/000162828026025362/tsm-20251231.htm
 * - AMD, FY2025 Form 10-K:
 *   https://www.sec.gov/Archives/edgar/data/2488/000000248826000012/amd-20251227.htm
 *
 * Company examples illustrate different roles in manufacturing and the
 * semiconductor supply chain. They should not be treated as representative
 * of every manufacturing industry.
 */

export const MANUFACTURING_DETAIL: BusinessModelDetail = {
  slug: "manufacturing",

  headline:
    "Turning materials, components, and production know-how into products customers will pay for.",

  description:
    "Manufacturing businesses create value by making or assembling physical products. They may sell finished goods under their own brands, produce components for other businesses, or manufacture products to a customer's specifications. Success depends on more than producing at scale: companies must control costs, maintain quality, match production to demand, and turn sales into cash.",

  characteristics: {
    tags: [
      "Physical products",
      "Production processes",
      "Equipment and labor",
      "Inventory management",
      "Quality control",
      "Capital investment",
    ],
    note:
      "Manufacturing covers many different businesses. Some own brands and sell finished products, while others make components or manufacture products for customers. Their costs, capital needs, pricing power, and risks can differ substantially.",
  },

  whatIsIt: {
    sub:
      "Manufacturing creates products by transforming materials and components through labor, equipment, technology, and repeatable production processes.",

    paragraphs: [
      "A manufacturing business takes inputs such as raw materials, purchased components, energy, and labor and uses them to make a product. The product may be sold directly to consumers, supplied to retailers, or sold to another business that uses it in a larger product.",

      "Manufacturers do not all operate the same way. A company may design, manufacture, and sell its own branded products. Another may manufacture products designed by a customer. A component supplier may make only one part of a product, while a specialized manufacturer may provide a production process that its customers cannot easily perform themselves.",

      "Manufacturing also does not always mean that a company owns and operates every factory involved. Some brand owners outsource much of their production to external manufacturing partners. In that case, product design, supplier relationships, manufacturing execution, and brand ownership may sit with different companies.",

      "The central business challenge is to produce goods that customers want at a price that can cover the full cost of serving those customers and provide an adequate return on the resources invested in the business.",
    ],
  },

  flow: {
    sub:
      "The typical journey from product requirements to a delivered product and eventual payment.",

    steps: [
      {
        title: "Design or receive specifications",
        text:
          "The manufacturer designs a product or receives requirements from a customer. These requirements influence materials, production methods, quality standards, and cost.",
        icon: "ti-pencil-cog",
        examples: [
          "Designing a household appliance",
          "Receiving specifications for an electronic component",
        ],
      },
      {
        title: "Source materials and components",
        text:
          "The business purchases the inputs needed for production. Supplier availability, prices, lead times, and quality can affect its ability to manufacture on schedule.",
        icon: "ti-truck-delivery",
        examples: [
          "Buying metal and plastic for a finished product",
          "Purchasing electronic components from suppliers",
        ],
      },
      {
        title: "Manufacture or assemble",
        text:
          "Workers, machines, and production systems transform the inputs into finished products or components. Productivity, waste, downtime, and defects influence the cost of production.",
        icon: "ti-building-factory",
        examples: [
          "Assembling a vehicle",
          "Processing silicon wafers into semiconductor chips",
        ],
      },
      {
        title: "Inspect and test",
        text:
          "The manufacturer checks whether products meet the required specifications. Defects may require repair, replacement, additional work, or disposal.",
        icon: "ti-shield-check",
        examples: [
          "Testing an electronic device",
          "Inspecting a component before shipment",
        ],
      },
      {
        title: "Deliver the product",
        text:
          "Finished products are packaged, stored, and delivered to customers or distribution partners. Shipping costs, delivery timing, and inventory management affect the economics of the business.",
        icon: "ti-package",
        examples: [
          "Shipping finished goods to retailers",
          "Delivering components to another manufacturer's factory",
        ],
      },
      {
        title: "Recognize revenue and collect payment",
        text:
          "Revenue is recognized according to the applicable accounting rules and the terms of the sale. Cash may arrive before, at, or after revenue is recognized, depending on the contract and payment arrangements.",
        icon: "ti-cash",
        examples: [
          "Receiving payment after delivering an order",
          "Collecting an outstanding customer invoice",
        ],
      },
    ],
  },

  howItWorks: {
    sub:
      "Manufacturers earn revenue by selling products or providing production services. Profit depends on the selling price, volume, production costs, and other business expenses.",

    intro:
      "Imagine a factory that sells 100 units for $10 each. If all 100 units are sold at that price, revenue is $1,000. If the cost of the units sold is $700, gross profit is $300. These are hypothetical figures used only to explain the mechanics; they are not results reported by a real company.",

    chain: [
      {
        title: "Sell products or production services",
        text:
          "The business earns revenue when it sells finished goods, components, or qualifying manufacturing services to customers.",
        tag: "Revenue",
      },
      {
        title: "Cover the cost of goods sold",
        text:
          "The cost of goods sold includes the costs assigned to the products sold under the company's accounting policies. Depending on the business, these can include materials, production labor, and factory overhead.",
        tag: "Production costs",
      },
      {
        title: "Generate gross profit",
        text:
          "Revenue minus cost of goods sold equals gross profit. Gross profit must still cover operating expenses and other costs before the business can report a net profit.",
        tag: "Gross profit",
      },
      {
        title: "Pay operating expenses and fund investment",
        text:
          "The company may also incur selling, administrative, research, financing, tax, maintenance, and capital investment costs. Their accounting treatment differs, so they should not all be treated as expenses in the same period.",
        tag: "Business costs",
      },
      {
        title: "Convert sales into cash",
        text:
          "Cash generation depends not only on profit but also on payment timing, inventory, supplier credit, capital spending, and other cash flows.",
        tag: "Cash flow",
      },
    ],

    outro:
      "Higher production volume can spread certain fixed costs across more units, but only when demand supports the additional output and the savings are not offset by other costs. Producing more than customers need can tie up cash in inventory and create losses. A successful manufacturer must balance demand, price, quality, cost, capacity, and cash flow.",
  },

  whoPays: {
    sub:
      "The paying customer depends on what the manufacturer makes and how the product reaches its end user.",

    items: [
      {
        title: "Consumers",
        text:
          "People may buy finished products such as appliances, vehicles, or electronic devices. Demand can be influenced by price, product quality, brand, features, and household budgets.",
        icon: "ti-users",
      },
      {
        title: "Retailers and distributors",
        text:
          "Manufacturers may sell products in bulk to businesses that resell them. The manufacturer may have to account for wholesale pricing, order sizes, delivery terms, and the buyer's negotiating power.",
        icon: "ti-building-store",
      },
      {
        title: "Other manufacturers",
        text:
          "Businesses may buy components, materials, or subassemblies that become part of a larger product. Their purchasing decisions can depend on technical specifications, reliability, cost, and supplier qualification.",
        icon: "ti-building-factory",
      },
      {
        title: "Contract customers",
        text:
          "A customer may pay a manufacturer to make a product to specified requirements. The agreement determines the manufacturer's responsibilities, pricing, quality obligations, and other commercial terms.",
        icon: "ti-file-description",
      },
    ],
  },

  makeMoney: {
    sub:
      "A manufacturer can use one or more revenue models. The exact mix depends on its products, customers, and place in the supply chain.",

    items: [
      {
        title: "Sell finished products",
        text:
          "The company makes and sells completed goods under its own brand or through other sellers. Its economics depend on selling prices, unit costs, sales volume, product mix, and the cost of reaching customers.",
        icon: "ti-package",
      },
      {
        title: "Sell components",
        text:
          "The company supplies parts or subassemblies to other businesses. Revenue may depend on the number of components purchased, the price per unit, customer production volumes, and the manufacturer's position in the supply chain.",
        icon: "ti-cpu",
      },
      {
        title: "Manufacture for customers",
        text:
          "The company produces goods based on a customer's design or specifications. Depending on the contract, it may be paid per unit, for production services, or under another agreed pricing structure.",
        icon: "ti-building-factory",
      },
      {
        title: "Provide specialized production capabilities",
        text:
          "A manufacturer may earn business by offering specialized processes, technical expertise, production quality, or capacity that customers cannot readily obtain elsewhere. Whether this creates pricing power depends on available alternatives and customer needs.",
        icon: "ti-settings",
      },
    ],
  },

  moneyGoes: {
    sub:
      "Manufacturing businesses must pay for production inputs and the broader systems needed to operate, deliver, and improve their products.",

    items: [
      {
        title: "Materials and purchased components",
        text:
          "Raw materials and purchased parts can be major production costs. Changes in input prices, availability, quality, or supplier terms can affect margins and production schedules.",
        icon: "ti-box",
      },
      {
        title: "Production labor",
        text:
          "Employees may operate equipment, assemble products, inspect quality, maintain production lines, or support factory operations. Labor requirements vary with the product and level of automation.",
        icon: "ti-users",
      },
      {
        title: "Factory overhead",
        text:
          "Factory overhead can include equipment depreciation, factory utilities, maintenance, and other production-related costs. Some costs remain even when production volume falls.",
        icon: "ti-building-factory",
      },
      {
        title: "Quality and waste",
        text:
          "Testing, rework, scrap, warranty claims, and defective products can consume resources. Better process control may reduce some of these costs, but quality systems also require investment.",
        icon: "ti-shield-check",
      },
      {
        title: "Logistics and inventory",
        text:
          "Warehousing, packaging, transportation, and inventory management support the movement of materials and products. Inventory also ties up working capital until products are sold and cash is collected.",
        icon: "ti-truck-delivery",
      },
      {
        title: "Research and development",
        text:
          "Some manufacturers spend on product design, engineering, testing, and process improvement. The amount and accounting treatment depend on the business and the applicable accounting rules.",
        icon: "ti-flask",
      },
      {
        title: "Selling and administration",
        text:
          "Sales teams, customer service, management, and corporate functions help run the business. These expenses are generally separate from the direct production costs included in cost of goods sold.",
        icon: "ti-briefcase",
      },
    ],
  },

  growth: {
    drivers: {
      title: "What can drive growth?",
      items: [
        "Higher sales volume when customer demand supports additional production.",
        "New products that meet customer needs or open additional markets.",
        "Improved production efficiency that reduces waste, downtime, or cost per unit.",
        "Additional capacity when expected demand and economics justify the investment.",
        "New customers or industries that reduce dependence on a narrow customer base.",
        "More reliable sourcing and delivery that help the company fulfill customer orders.",
      ],
    },

    opportunities: {
      title: "Where can opportunities emerge?",
      items: [
        "Automation may improve consistency or productivity in suitable production processes, but requires investment and effective implementation.",
        "Process improvements may reduce material waste, rework, and unplanned downtime.",
        "Specialized production capabilities may help a manufacturer win customers with demanding technical or quality requirements.",
        "Long-term customer relationships may support repeat orders when the manufacturer consistently meets requirements.",
        "Product and process innovation may allow a company to serve new needs, although commercial success is not guaranteed.",
      ],
    },

    callout:
      "Growth creates value only when additional sales and production generate adequate returns after considering costs, working capital, capital expenditure, and execution risk. A larger factory is not automatically a more profitable business.",
  },

  strength: {
    title: "Potential competitive advantages",
    sub:
      "A manufacturing business may become more competitive when it produces the right products reliably, at an attractive cost, and in a way that is difficult for customers to replace.",

    items: [
      {
        title: "Economies of scale",
        text:
          "When fixed production costs are spread across more units, average cost may fall. This advantage depends on sufficient demand, efficient operations, and the ability to avoid excess capacity or rising complexity.",
        icon: "ti-chart-line",
      },
      {
        title: "Process expertise",
        text:
          "Experience with production methods, engineering, quality control, and yield improvement can help a company manufacture consistently. Competitors may need time and investment to develop comparable capabilities.",
        icon: "ti-settings",
      },
      {
        title: "Product quality and reliability",
        text:
          "Consistent quality and dependable delivery can make a manufacturer more attractive to customers, particularly when a defect could disrupt a customer's own operations.",
        icon: "ti-shield-check",
      },
      {
        title: "Customer qualification and relationships",
        text:
          "In some industries, customers must test and approve a supplier before buying its products. A qualified supplier with a reliable track record may be harder to replace quickly, although this does not prevent customers from switching.",
        icon: "ti-users",
      },
      {
        title: "Supply-chain capabilities",
        text:
          "Strong supplier relationships, sourcing options, planning, and logistics can help a company manage disruptions and deliver products on time. These capabilities can reduce risk but cannot eliminate it.",
        icon: "ti-truck-delivery",
      },
      {
        title: "Specialized equipment and technical capabilities",
        text:
          "Some products require expensive equipment, specialized processes, or extensive technical knowledge. These requirements may limit entry, but the investment must still earn an adequate return.",
        icon: "ti-building-factory",
      },
    ],
  },

  competition: {
    compete: {
      title: "How manufacturers compete",
      items: [
        "Price and total cost to the customer.",
        "Product performance, quality, and reliability.",
        "Delivery speed and ability to meet production schedules.",
        "Technical capabilities and the ability to meet specific requirements.",
        "Production flexibility and responsiveness to changes in demand.",
        "Customer service, supplier reliability, and long-term relationships.",
      ],
    },

    challenges: {
      title: "Why competition can be difficult",
      items: [
        "Customers may negotiate aggressively when products are similar or alternative suppliers are available.",
        "Competitors may expand capacity or improve processes, putting pressure on selling prices and margins.",
        "Large investments in equipment can become difficult to recover if demand falls or technology changes.",
        "A manufacturer may depend heavily on a small number of customers or suppliers.",
        "Higher production volume can increase inventory and cash needs before the company receives payment.",
        "New production technology may require expensive upgrades, employee training, or changes to existing processes.",
      ],
    },
  },

  risks: {
    sub:
      "Manufacturing results depend on both market demand and the company's ability to produce goods efficiently and reliably.",

    items: [
      {
        title: "Demand and excess capacity",
        text:
          "If customer demand falls below expectations, the manufacturer may operate factories below their intended level, carry excess inventory, or struggle to recover fixed costs. Expanding capacity before demand is established can increase this exposure.",
        icon: "ti-trending-down",
      },
      {
        title: "Input costs and supply disruption",
        text:
          "Changes in the price or availability of materials, components, energy, or transportation can increase costs or interrupt production. The ability to pass higher costs to customers varies by contract and competitive conditions.",
        icon: "ti-truck-delivery",
      },
      {
        title: "Capital intensity",
        text:
          "Factories and specialized equipment may require substantial upfront investment. These assets can be costly to maintain or replace, and investment may not generate the expected return if utilization or demand is lower than planned.",
        icon: "ti-building-factory",
      },
      {
        title: "Defects and product liability",
        text:
          "Quality failures may lead to rework, returns, recalls, contractual claims, or reputational damage. The financial impact depends on the product, the failure, and the relevant legal and contractual obligations.",
        icon: "ti-shield-x",
      },
      {
        title: "Inventory and working capital",
        text:
          "Materials and finished goods may remain unsold longer than expected. This ties up cash and can lead to markdowns or write-downs if inventory becomes obsolete or loses value.",
        icon: "ti-box",
      },
      {
        title: "Technology and product changes",
        text:
          "Changes in customer requirements or production technology can make existing equipment, processes, or products less competitive. The speed and cost of adapting vary across industries.",
        icon: "ti-cpu",
      },
      {
        title: "Customer and supplier concentration",
        text:
          "Dependence on a few large customers or critical suppliers can increase exposure to order changes, renegotiated prices, financial distress, or operational disruptions.",
        icon: "ti-building-store",
      },
      {
        title: "Execution and operational disruption",
        text:
          "Factory outages, equipment failures, labor constraints, implementation delays, or unsuccessful capacity expansions may prevent a company from producing and delivering as planned.",
        icon: "ti-alert-triangle",
      },
    ],
  },

  metrics: {
    sub:
      "These measures help explain demand, production efficiency, profitability, investment needs, and cash generation. Definitions can differ between companies, so comparisons require care.",

    items: [
      {
        label: "Revenue Growth",
        fullName: "Revenue Growth Rate",
        text:
          "Measures how revenue changes between periods. It helps show whether sales are expanding, but growth may come from higher prices, higher unit volumes, acquisitions, or changes in product mix. Revenue growth alone does not show whether the company is becoming more profitable or collecting cash faster.",
        icon: "ti-chart-line",
      },
      {
        label: "Gross Margin",
        fullName: "Gross Profit Margin",
        text:
          "Calculated as gross profit divided by revenue. It shows how much revenue remains after the costs included in cost of goods sold. It does not include every operating expense. Companies may classify production-related costs differently, so comparisons should account for their accounting policies and product mix.",
        icon: "ti-percentage",
      },
      {
        label: "Operating Margin",
        fullName: "Operating Profit Margin",
        text:
          "Calculated as operating income divided by revenue, using the company's reported operating income. It indicates how much revenue remains after operating expenses included in that measure. Comparisons can be affected by accounting classifications, restructuring, acquisitions, and other company-specific items.",
        icon: "ti-chart-bar",
      },
      {
        label: "Capacity Utilization",
        fullName: "Production Capacity Utilization",
        text:
          "Measures actual production relative to a defined production-capacity measure. It can help explain whether a factory is using its available capacity efficiently. Companies may define practical, rated, or available capacity differently, so the figures are not always directly comparable. High utilization is not automatically good if demand is weak or operations become constrained.",
        icon: "ti-building-factory",
      },
      {
        label: "Inventory Turnover",
        fullName: "Inventory Turnover Ratio",
        text:
          "Often calculated as cost of goods sold divided by average inventory for a period. It indicates how quickly inventory is used or sold relative to the cost of goods sold. A low figure may indicate slow-moving stock, while a very high figure may reflect efficient operations or insufficient inventory. Seasonality, product type, and calculation methods affect comparisons.",
        icon: "ti-box",
      },
      {
        label: "Capital Expenditure",
        fullName: "Capital Expenditure (CapEx)",
        text:
          "Measures spending on long-lived assets such as factories, production equipment, and machinery, according to the reporting definition used. It helps investors understand the resources required to maintain or expand operations. High spending may support growth, replace aging assets, or reflect an investment cycle; the figure alone does not establish whether the spending is productive.",
        icon: "ti-building-factory",
      },
      {
        label: "Free Cash Flow",
        fullName: "Free Cash Flow (FCF)",
        text:
          "A commonly used definition is operating cash flow minus capital expenditure, although company and analyst definitions may differ. It helps show the cash remaining after operating activities and capital investment under that definition. It can fluctuate because of inventory, customer payments, supplier terms, and investment cycles. It should be assessed over time and not treated as interchangeable with net income.",
        icon: "ti-cash",
      },
      {
        label: "Return on Invested Capital",
        fullName: "Return on Invested Capital (ROIC)",
        text:
          "Estimates how effectively a business generates operating returns from the capital invested in it. Analysts commonly compare after-tax operating profit with an invested-capital measure, but the precise formulas vary. Asset-intensive manufacturers may have large investments in factories and equipment, so the measure should be interpreted alongside asset age, investment cycles, and the calculation method.",
        icon: "ti-chart-dots",
      },
      {
        label: "Cash Conversion Cycle",
        fullName: "Cash Conversion Cycle (CCC)",
        text:
          "Estimates how long cash is tied up in inventory and customer receivables after considering the time taken to pay suppliers. A common calculation combines days inventory outstanding and days sales outstanding, then subtracts days payable outstanding. The measure depends on the business model, seasonality, and calculation choices; it is not equally informative for every manufacturer.",
        icon: "ti-clock",
      },
    ],

    callout:
      "Read these metrics together. Revenue growth does not guarantee profit growth; gross profit is not net profit; accounting profit is not the same as cash flow; and a factory's production capacity is not the same as customer demand. Check each company's definitions before comparing reported figures.",
  },

  companies: {
    sub:
      "These Scope companies illustrate different roles in manufacturing and the semiconductor supply chain. None should be treated as representative of all manufacturers.",

    items: [
      {
        slug: "apple",
        role:
          "Brand owner and product designer that relies on external manufacturing partners for much of its hardware production. Apple illustrates how a company can design and sell physical products without manufacturing every component or assembling every product itself. Its other businesses, including services, must be distinguished from its hardware activities.",
      },
      {
        slug: "tsmc",
        role:
          "Semiconductor foundry that manufactures chips designed by customers. It illustrates specialized manufacturing in which process technology, production capability, quality, and capital investment are important. Its business is distinct from the business models of companies that design and sell their own branded chips.",
      },
      {
        slug: "amd",
        role:
          "Semiconductor company that designs processors and other chips while relying on external manufacturing partners for wafer fabrication. AMD illustrates that designing a physical product and manufacturing it are separate activities. Its revenue should not be described as if AMD itself operates every stage of chip production.",
      },
    ],
  },

  related: {
    sub:
      "Manufacturing connects to specialized production industries and businesses that depend on physical products, equipment, and energy.",

    slugs: ["hardware", "semiconductors", "energy"],
  },

  disclaimer: SCOPE_DISCLAIMER,
};