import { SCOPE_DISCLAIMER, type BusinessModelDetail } from "./types";

export const logisticsDetail: BusinessModelDetail = {
  slug: "logistics",

  headline: "How goods move from businesses to customers",

  description:
    "Logistics businesses coordinate the transportation, storage, handling, and delivery of goods. They earn money by moving products, managing warehouses, fulfilling orders, or coordinating shipments. Revenue depends on the service provided, while profitability depends on pricing, operating efficiency, network utilization, and the cost of delivering each shipment.",

  characteristics: {
    tags: [
      "Transportation",
      "Warehousing",
      "Supply Chains",
      "Operational Efficiency",
      "Asset-Intensive or Asset-Light",
    ],
    note:
      "Logistics is a broad business model, not just parcel delivery. Some companies own vehicles, warehouses, and distribution facilities, while others mainly coordinate shipments through third-party providers. Their costs, capital needs, and profit drivers can therefore differ substantially.",
  },

  whatIsIt: {
    sub: "Understand how logistics businesses create value",
    paragraphs: [
      "Logistics businesses help move goods from where they are produced or stored to where they are needed. Their customers may include manufacturers, retailers, online sellers, wholesalers, and other businesses that depend on reliable deliveries.",
      "Services can include transportation, parcel delivery, warehousing, order fulfillment, freight forwarding, and freight brokerage. A company may specialize in one service or combine several services into an integrated offering.",
      "The business model varies by company. A carrier may earn fees for transporting shipments, a warehouse operator may charge for storage and handling, and a freight broker may coordinate transportation between customers and carriers.",
      "A large logistics network does not automatically create strong profits. Companies must earn enough from their services to cover labor, transportation, facilities, technology, and other operating costs. The right measures depend on the company's specific activities.",
    ],
  },

  flow: {
    sub: "From a customer's shipping need to a completed delivery",
    steps: [
      {
        title: "Receive the Goods",
        text:
          "A business or seller asks the logistics provider to move, store, or process its goods.",
        icon: "ti-package",
        examples: [
          "A retailer sends inventory to a warehouse.",
          "An online seller prepares an order for fulfillment.",
        ],
      },
      {
        title: "Plan the Shipment",
        text:
          "The provider determines how the goods should be handled, routed, stored, or transported.",
        icon: "ti-route",
        examples: [
          "A carrier plans a delivery route.",
          "A freight forwarder coordinates an international shipment.",
        ],
      },
      {
        title: "Move or Store the Goods",
        text:
          "Vehicles, warehouses, sorting facilities, and service partners help move goods through the network.",
        icon: "ti-truck",
        examples: [
          "A parcel moves through a sorting facility.",
          "Inventory remains in storage until an order arrives.",
        ],
      },
      {
        title: "Deliver or Fulfill the Order",
        text:
          "The provider completes the agreed service and records the shipment or order outcome.",
        icon: "ti-building-store",
        examples: [
          "A parcel is delivered to its recipient.",
          "A warehouse picks and packs an online order.",
        ],
      },
      {
        title: "Collect Payment and Improve Operations",
        text:
          "The provider bills the customer according to the agreement and reviews operating performance.",
        icon: "ti-chart-line",
        examples: [
          "A business customer pays an agreed shipping fee.",
          "An operator reviews delivery delays and cost per shipment.",
        ],
      },
    ],
  },

  howItWorks: {
    sub: "How the different participants work together",
    intro:
      "A logistics transaction can involve several businesses. The company that coordinates a shipment does not necessarily own every vehicle or facility used to complete it.",
    chain: [
      {
        title: "Shipper",
        text:
          "The business or seller that needs goods transported, stored, or delivered.",
        tag: "Creates the need",
      },
      {
        title: "Logistics Provider",
        text:
          "The company responsible for providing or coordinating the agreed logistics service.",
        tag: "Organizes the service",
      },
      {
        title: "Carriers and Facilities",
        text:
          "Transport operators, warehouses, sorting centers, and service partners perform the required activities.",
        tag: "Handle the goods",
      },
      {
        title: "Recipient",
        text:
          "The customer, store, distributor, or business location that receives the goods.",
        tag: "Receives the delivery",
      },
      {
        title: "Payment and Performance Review",
        text:
          "The provider bills the appropriate customer under the contract and evaluates service quality and costs.",
        tag: "Measures the outcome",
      },
    ],
    outro:
      "The exact arrangement depends on the contract. A company may perform the transportation itself, hire outside carriers, act as an intermediary, or combine several roles. Its reported revenue also depends on its contractual role and applicable accounting rules.",
  },

  whoPays: {
    sub: "Customers that need goods to move reliably",
    items: [
      {
        title: "Manufacturers and Wholesalers",
        text:
          "Pay to move raw materials, components, and finished products between suppliers, factories, warehouses, and customers.",
        icon: "ti-building-factory",
      },
      {
        title: "Retailers",
        text:
          "Use transportation and storage services to replenish stores and move inventory through distribution networks.",
        icon: "ti-building-store",
      },
      {
        title: "Online Sellers",
        text:
          "May pay for warehousing, order processing, packaging, shipping, and returns handling.",
        icon: "ti-shopping-cart",
      },
      {
        title: "Business Customers",
        text:
          "Pay for scheduled deliveries, specialized transportation, freight coordination, or other services required by their operations.",
        icon: "ti-building",
      },
      {
        title: "Individuals",
        text:
          "Pay for parcel delivery or other consumer-facing shipping services when these are offered directly.",
        icon: "ti-user",
      },
    ],
  },

  makeMoney: {
    sub: "Different services create different sources of revenue",
    items: [
      {
        title: "Transportation and Delivery Fees",
        text:
          "Carriers may charge for moving parcels or freight. Pricing can depend on shipment size, weight, distance, speed, route, service level, and contract terms.",
        icon: "ti-truck",
      },
      {
        title: "Warehousing and Storage",
        text:
          "Warehouse operators may charge customers to store inventory. The pricing arrangement can depend on space, duration, handling requirements, and the service agreement.",
        icon: "ti-building-warehouse",
      },
      {
        title: "Order Fulfillment",
        text:
          "Providers may charge for activities such as receiving inventory, picking products, packing orders, processing shipments, and handling returns.",
        icon: "ti-package",
      },
      {
        title: "Freight Brokerage",
        text:
          "A broker coordinates transportation between a shipper and a carrier. Its economics depend on the customer's price, the amount paid to the carrier, and other costs. Reported revenue depends on the company's role in the transaction and the applicable accounting treatment.",
        icon: "ti-arrows-exchange",
      },
      {
        title: "Freight Forwarding",
        text:
          "Forwarders coordinate shipments, often across borders, and may arrange transportation, documentation, customs-related services, and other logistics activities. The services and billing structure depend on the agreement.",
        icon: "ti-world",
      },
      {
        title: "Integrated Logistics Services",
        text:
          "Some providers combine transportation, storage, fulfillment, and supply chain coordination under a broader customer agreement. Bundling can create opportunities to serve more customer needs, but the provider must still manage the cost and quality of each service.",
        icon: "ti-network",
      },
    ],
  },

  moneyGoes: {
    sub: "What logistics providers may need to pay for",
    items: [
      {
        title: "Transportation",
        text:
          "Fuel, payments to outside carriers, vehicle leasing, tolls, and other costs associated with moving goods.",
        icon: "ti-truck",
      },
      {
        title: "Labor",
        text:
          "Wages and related costs for drivers, warehouse staff, dispatchers, customer support teams, and other employees.",
        icon: "ti-users",
      },
      {
        title: "Warehouses and Facilities",
        text:
          "Facility leases, utilities, handling equipment, sorting operations, and the costs of maintaining distribution locations.",
        icon: "ti-building-warehouse",
      },
      {
        title: "Vehicles and Equipment",
        text:
          "Purchasing or leasing vehicles and equipment, maintaining them, and replacing assets when needed. The burden varies with the company's operating model.",
        icon: "ti-tool",
      },
      {
        title: "Technology and Systems",
        text:
          "Software and systems for route planning, shipment tracking, warehouse management, dispatch, billing, and operational reporting.",
        icon: "ti-device-laptop",
      },
      {
        title: "Claims, Insurance, and Compliance",
        text:
          "Insurance and other costs associated with cargo damage, loss, accidents, contractual obligations, and applicable regulations.",
        icon: "ti-shield-check",
      },
      {
        title: "Network and Capacity",
        text:
          "Costs of operating and maintaining the network needed to serve customers. Expanding capacity before demand arrives can put pressure on profitability and cash flow.",
        icon: "ti-chart-line",
      },
    ],
  },

  growth: {
    drivers: {
      title: "What Can Drive Growth?",
      items: [
        "Higher shipment volumes from existing customers can increase revenue when pricing and service costs remain economically attractive.",
        "Winning new customers or entering additional service areas can expand the addressable business, although expansion may require additional capacity.",
        "Offering storage, fulfillment, or other related services may allow a provider to serve more of an existing customer's logistics needs.",
        "Improving routing, warehouse processes, and asset utilization may help the company handle more work with its existing resources.",
        "Reliable service and useful shipment visibility can support customer retention, but retention still depends on price, quality, and the customer's alternatives.",
      ],
    },
    opportunities: {
      title: "Where Opportunities May Exist",
      items: [
        "Businesses that need dependable delivery may value providers with suitable geographic coverage and consistent service quality.",
        "Customers with complex shipping requirements may need several services coordinated through one provider.",
        "Better planning and information systems may help reduce avoidable delays, empty capacity, and operational errors.",
        "A denser network in an area may improve the use of vehicles and facilities when sufficient demand exists.",
        "Longer-term customer relationships may provide more predictable demand when contract terms and customer needs remain stable.",
      ],
    },
    callout:
      "Growth in shipment volume is not the same as growth in profit. A provider can move more goods but earn less if prices fall, costs rise faster than revenue, or additional capacity is used inefficiently.",
  },

  strength: {
    title: "Potential Competitive Advantages",
    sub:
      "Logistics advantages depend on execution, network economics, and customer requirements. None is guaranteed simply because a company is large.",
    items: [
      {
        title: "Network Density",
        text:
          "A concentrated flow of shipments in a service area may help a provider use vehicles, facilities, and labor more efficiently. Low shipment density can make the same network expensive to operate.",
        icon: "ti-route",
      },
      {
        title: "Reliable Operations",
        text:
          "Consistent delivery performance, accurate tracking, and effective problem resolution can make a provider more useful to customers that depend on predictable shipments.",
        icon: "ti-shield-check",
      },
      {
        title: "Operational Expertise",
        text:
          "Experience with routing, handling requirements, customs processes, or complex supply chains may help a provider serve particular customers or shipment types.",
        icon: "ti-bulb",
      },
      {
        title: "Technology and Visibility",
        text:
          "Systems that help customers track shipments and help operators plan work may improve coordination. Their value depends on whether they produce measurable operating or service benefits.",
        icon: "ti-device-laptop",
      },
      {
        title: "Customer Relationships",
        text:
          "Established processes, service integration, and knowledge of a customer's needs may support retention. Customers can still switch providers when service, price, or requirements change.",
        icon: "ti-users",
      },
    ],
  },

  competition: {
    compete: {
      title: "How Logistics Providers Compete",
      items: [
        "Price and total cost of service, including any additional handling or delivery charges.",
        "Delivery speed, reliability, geographic coverage, and the ability to handle the required shipment type.",
        "Shipment visibility, customer support, and the ability to resolve problems.",
        "Network capacity and the ability to handle changing demand without excessive delays or cost.",
        "Specialized expertise or integrated services that reduce coordination work for the customer.",
      ],
    },
    challenges: {
      title: "What Makes Competition Difficult?",
      items: [
        "Transportation services may face price pressure when customers can compare providers or switch between alternatives.",
        "Fuel, wages, subcontractor rates, and facility expenses can rise faster than the provider can adjust customer prices.",
        "A large network can require significant spending and may become inefficient if shipment volume is too low.",
        "Service failures can create claims, extra costs, customer dissatisfaction, and reputational damage.",
        "Different logistics services have different economics, so a strategy that works for a warehouse operator may not work for a parcel carrier or freight broker.",
      ],
    },
  },

  risks: {
    sub: "Important limitations and risks to understand",
    items: [
      {
        title: "Fuel and Labor Cost Changes",
        text:
          "Higher fuel prices, wages, or subcontractor rates can pressure margins when customer contracts do not allow costs to be passed through quickly or fully.",
        icon: "ti-trending-up",
      },
      {
        title: "Underused Capacity",
        text:
          "Vehicles, warehouses, and facilities can be expensive to maintain when shipment volumes are insufficient. Expanding capacity too early can increase costs without generating enough revenue.",
        icon: "ti-building-warehouse",
      },
      {
        title: "Price Competition",
        text:
          "Customers may negotiate aggressively or move shipments to alternatives. Lower prices can increase volume while still weakening the economics of the business.",
        icon: "ti-arrows-exchange",
      },
      {
        title: "Service Disruptions",
        text:
          "Severe weather, accidents, infrastructure problems, labor disruptions, or other events can delay shipments and increase operating costs.",
        icon: "ti-alert-triangle",
      },
      {
        title: "Customer Concentration",
        text:
          "A provider that depends heavily on a small number of customers may be exposed if one customer reduces shipments, renegotiates prices, or changes providers.",
        icon: "ti-users",
      },
      {
        title: "Capital Requirements",
        text:
          "Some operating models require substantial investment in vehicles, warehouses, sorting facilities, or technology. The timing of investment and cash receipts can affect cash flow.",
        icon: "ti-cash",
      },
      {
        title: "Technology and Security",
        text:
          "Operational systems and shipment data may be exposed to outages, errors, or cybersecurity incidents that disrupt service or require costly remediation.",
        icon: "ti-shield-check",
      },
      {
        title: "Regulation and Cross-Border Complexity",
        text:
          "International shipments may require customs documentation and compliance with rules that vary by jurisdiction. Changes or errors can cause delays and additional costs.",
        icon: "ti-world",
      },
      {
        title: "Revenue and Accounting Differences",
        text:
          "A company coordinating transportation may not report revenue in the same way as a company directly providing the full service. Comparing reported revenue without understanding the company's contractual role can be misleading.",
        icon: "ti-report-analytics",
      },
    ],
  },

  metrics: {
    sub:
      "Use several measures together. Definitions, service mixes, and reporting methods can differ between logistics companies.",
    items: [
      {
        label: "Revenue Growth",
        fullName: "Year-over-Year Revenue Growth",
        text:
          "Measures how reported revenue changes over time. It helps show whether the business is expanding, but changes may reflect shipment volume, pricing, service mix, acquisitions, or foreign exchange rather than volume growth alone.",
        icon: "ti-trending-up",
      },
      {
        label: "Operating Margin",
        fullName: "Operating Income as a Percentage of Revenue",
        text:
          "Shows how much operating income a company earns for each unit of reported revenue. It helps assess operating profitability, but cost classifications, service mix, and whether revenue is reported gross or net can affect comparisons.",
        icon: "ti-chart-line",
      },
      {
        label: "Shipment Volume",
        fullName: "Shipments or Freight Volume Handled",
        text:
          "Measures activity using a company-defined unit, such as parcels, packages, freight weight, or other shipment measures. It helps distinguish changes in activity from changes in price, but units and coverage may differ between companies.",
        icon: "ti-package",
      },
      {
        label: "Revenue per Shipment",
        fullName: "Average Revenue per Shipment",
        text:
          "Divides a defined revenue measure by a defined shipment count. It can help explain pricing and service-mix changes, but it is not profit per shipment and should not be compared without checking which revenues and shipments are included.",
        icon: "ti-calculator",
      },
      {
        label: "On-Time Delivery",
        fullName: "On-Time Delivery Rate",
        text:
          "Measures the share of deliveries completed within a defined delivery window. It helps assess service reliability, but the time window, eligible shipments, exclusions, and reporting method must be checked before comparing providers.",
        icon: "ti-clock",
      },
      {
        label: "Capacity Utilization",
        fullName: "Use of Available Operating Capacity",
        text:
          "Measures how much of a defined capacity is being used. It can help identify underused assets or facilities, but the denominator and measurement period vary by operation. Higher utilization is not always better if it harms flexibility or service quality.",
        icon: "ti-chart-bar",
      },
      {
        label: "Capital Expenditure",
        fullName: "Investment in Long-Lived Assets",
        text:
          "Measures spending on qualifying long-lived assets, such as vehicles, facilities, or equipment. It helps show investment needs, but should be considered alongside depreciation, asset condition, growth plans, and cash generated by operations.",
        icon: "ti-building-factory",
      },
      {
        label: "Operating Cash Flow",
        fullName: "Net Cash Provided by Operating Activities",
        text:
          "Measures net cash generated or used by operating activities under the company's cash flow statement. It is not the same as net income, revenue, or total customer payments, and it can change with working capital and payment timing.",
        icon: "ti-cash",
      },
    ],
    callout:
      "No single metric explains the whole business. Revenue can grow while margins weaken; average revenue per shipment can rise while cost per shipment rises faster; and operating cash flow can differ from accounting profit. Check the company's definitions and read the metrics together.",
  },

  companies: {
    sub:
      "These companies illustrate different connections to logistics. Neither should be treated as a pure-play logistics company based on these examples alone.",
    items: [
      {
        slug: "amazon",
        role:
          "Amazon provides an example of logistics within a much broader commerce and technology business. Fulfillment by Amazon allows eligible sellers to use Amazon's fulfillment services. Amazon also reports several separate revenue categories, so its total revenue or all third-party seller services revenue should not be described as logistics revenue alone.",
      },
      {
        slug: "uber",
        role:
          "Uber Freight illustrates freight transportation coordination within a company that also operates Mobility and Delivery businesses. Uber's overall revenue and Gross Bookings cover multiple activities and should not be used as measures of Freight alone.",
      },
    ],
  },

  related: {
    sub:
      "Logistics connects with online commerce, marketplaces, and the movement of goods through supply chains.",
    slugs: ["e-commerce", "marketplace", "manufacturing"],
  },

  disclaimer: SCOPE_DISCLAIMER,
};