import {
  SCOPE_DISCLAIMER,
  type BusinessModelDetail,
} from "./types";

export const ecommerceDetail: BusinessModelDetail = {
  slug: "e-commerce",

  headline: "Sell Products Online and Turn Convenience into Value",

  description:
    "E-commerce allows businesses to sell products and services through digital channels. Success depends not only on generating sales, but also on managing product costs, customer acquisition, fulfillment, and the overall economics of each order.",

  characteristics: {
    tags: [
      "Online Retail",
      "Product Sales",
      "Customer Experience",
      "Inventory Management",
      "Order Fulfillment",
    ],

    note:
      "E-commerce describes commercial activity conducted through electronic networks. This page focuses on the economics of online retail, while recognizing that businesses may also sell through physical stores or third-party marketplaces. Not every e-commerce business owns the products it sells.",
  },

  whatIsIt: {
    sub: "Understanding how online commerce creates value",

    paragraphs: [
      "E-commerce is the buying and selling of goods or services through electronic networks, such as websites and mobile applications. Customers can discover products, compare prices, place orders, and arrange payment without necessarily visiting a physical store.",

      "One common model is online retail. A retailer purchases products from suppliers and sells them to customers. The difference between the selling price and the cost of the products sold contributes to gross profit, before other expenses are considered.",

      "Another model is direct-to-consumer commerce, often called DTC. A brand sells directly to customers through its own digital channels rather than relying exclusively on traditional retailers. This can give the brand more control over the customer experience, but it also has to manage customer acquisition, fulfillment, and customer service.",

      "Some retailers combine online stores with physical locations. Customers may order online, collect products from a store, or receive deliveries fulfilled through a network of stores and distribution facilities. This approach can improve convenience, although its economics depend on the cost and efficiency of the entire operation.",

      "E-commerce is broader than the marketplace business model. A retailer can sell products it owns, while a marketplace generally connects buyers with independent sellers. A single company may operate both models, so its reported revenue must be interpreted according to the activities that generate it.",
    ],
  },

  flow: {
    sub: "From customer demand to a completed order",

    steps: [
      {
        title: "Attract Customers",
        text:
          "Help potential customers discover the store and understand why its products are worth buying.",
        icon: "ti-speakerphone",
        examples: [
          "Search results and product pages",
          "Advertising and promotions",
          "Brand awareness and customer referrals",
        ],
      },
      {
        title: "Present Products",
        text:
          "Make products easy to find, compare, understand, and purchase.",
        icon: "ti-shopping-cart",
        examples: [
          "Product descriptions and images",
          "Clear prices and delivery estimates",
          "Reviews and product recommendations",
        ],
      },
      {
        title: "Complete the Order",
        text:
          "Process the order, confirm payment, and communicate the expected delivery or service date.",
        icon: "ti-credit-card",
        examples: [
          "Checkout and payment processing",
          "Order confirmation",
          "Inventory availability checks",
        ],
      },
      {
        title: "Fulfill the Order",
        text:
          "Prepare the product and arrange delivery, collection, or another agreed method of fulfillment.",
        icon: "ti-truck",
        examples: [
          "Picking and packing products",
          "Shipping and delivery",
          "Store pickup or local fulfillment",
        ],
      },
      {
        title: "Retain the Customer",
        text:
          "Deliver a reliable experience that encourages customers to return when they have another need.",
        icon: "ti-refresh",
        examples: [
          "Customer support",
          "Returns and refunds",
          "Relevant follow-up offers",
        ],
      },
    ],
  },

  howItWorks: {
    sub: "How online retail turns demand into business results",

    intro:
      "An online order creates value only when the business can deliver what the customer wants at an acceptable total cost. The website is one part of a larger operating system.",

    chain: [
      {
        title: "Source",
        text:
          "Purchase products from suppliers or manufacture them, while managing quality, availability, and purchase costs.",
        tag: "Supply",
      },
      {
        title: "Merchandise",
        text:
          "Choose the right product range, set prices, maintain accurate product information, and make products discoverable.",
        tag: "Selection",
      },
      {
        title: "Sell",
        text:
          "Convert customer interest into completed orders through a convenient buying experience and suitable payment options.",
        tag: "Demand",
      },
      {
        title: "Deliver",
        text:
          "Prepare orders, coordinate shipping or collection, and manage the costs of getting products to customers.",
        tag: "Fulfillment",
      },
      {
        title: "Improve",
        text:
          "Use operating results and customer feedback to improve product selection, service quality, repeat purchases, and cost efficiency.",
        tag: "Learning",
      },
    ],

    outro:
      "Revenue is generated when the relevant accounting requirements for recognizing a sale are met. Gross profit is revenue less the applicable cost of goods sold. Operating profit and cash flow are different measures because the business must also account for operating expenses, investment, working capital, and other cash movements.",
  },

  whoPays: {
    sub: "Who buys, and where the transaction takes place",

    items: [
      {
        title: "Individual Consumers",
        text:
          "People buy products for personal or household use. Examples include clothing, electronics, groceries, and household goods.",
        icon: "ti-users",
      },
      {
        title: "Business Customers",
        text:
          "Businesses may order supplies, equipment, or other products online. Their purchasing needs and order sizes can differ from those of individual consumers.",
        icon: "ti-building-store",
      },
      {
        title: "Direct Customers",
        text:
          "A brand may sell through its own website or application. It manages the digital storefront and the customer relationship, while arranging payment and fulfillment directly or through service providers.",
        icon: "ti-world",
      },
      {
        title: "Customers Using Third-Party Platforms",
        text:
          "Customers may purchase from a retailer or independent seller through an external marketplace. The seller, platform, and fulfillment provider may each perform different roles in the transaction.",
        icon: "ti-arrows-left-right",
      },
      {
        title: "Members and Subscribers",
        text:
          "Some retailers offer paid membership programs alongside product sales. Membership fees and product revenue should be distinguished when analyzing how the company earns money.",
        icon: "ti-receipt",
      },
    ],
  },

  makeMoney: {
    sub: "How e-commerce businesses generate revenue",

    items: [
      {
        title: "Product Sales",
        text:
          "A retailer buys or manufactures products and sells them to customers. For a retailer acting as the principal in a transaction, revenue is generally recorded for the sale of the product, subject to the applicable accounting requirements. The cost of the product sold reduces gross profit.",
        icon: "ti-shopping-cart",
      },
      {
        title: "Direct-to-Consumer Sales",
        text:
          "A brand sells through its own digital channels. Direct selling can give the brand greater control over product presentation and customer relationships, but it must also fund the activities needed to attract customers, process orders, and deliver products.",
        icon: "ti-world",
      },
      {
        title: "Subscription and Membership Fees",
        text:
          "A retailer may charge customers recurring fees for benefits such as delivery offers or access to additional services. Membership revenue is separate from product sales and is recognized according to the services promised and the applicable accounting rules.",
        icon: "ti-receipt",
      },
      {
        title: "Third-Party Seller Services",
        text:
          "A retailer may allow independent sellers to use its storefront, payment processing, or fulfillment services. Depending on the arrangement, the company may earn commissions or service fees rather than recording the entire product selling price as its own retail revenue.",
        icon: "ti-building-store",
      },
      {
        title: "Advertising and Sponsored Listings",
        text:
          "Some retailers sell advertising placements to brands and sellers. This can create a separate revenue stream, but it should not be confused with revenue earned from selling the retailer's own products.",
        icon: "ti-speakerphone",
      },
      {
        title: "Additional Commerce Services",
        text:
          "Businesses may charge for services such as shipping, handling, or other customer and seller services. Whether these amounts are recorded separately, included in another revenue category, or treated differently depends on the contractual arrangement and accounting policies.",
        icon: "ti-package",
      },
    ],
  },

  moneyGoes: {
    sub: "The major costs behind an online order",

    items: [
      {
        title: "Cost of Goods Sold",
        text:
          "For a retailer that owns the products it sells, this commonly includes the cost of acquiring or producing the goods sold. Shipping costs and other items may also be included depending on the company's accounting policies. Gross profit is calculated after the applicable cost of goods sold is deducted from revenue.",
        icon: "ti-report-money",
      },
      {
        title: "Fulfillment and Warehousing",
        text:
          "Businesses may incur costs to receive, inspect, store, pick, pack, and prepare orders. Facility expenses, labor, equipment, and operational systems can all contribute to fulfillment costs.",
        icon: "ti-building-store",
      },
      {
        title: "Shipping and Delivery",
        text:
          "Moving products to customers can involve carriers, transportation networks, packaging, and delivery operations. The economics vary with product size, weight, delivery distance, service speed, and the amount charged to customers.",
        icon: "ti-truck",
      },
      {
        title: "Customer Acquisition",
        text:
          "Advertising, promotions, and other marketing activities help attract buyers. Sales can grow while profitability deteriorates if the additional revenue does not justify the cost of acquiring and serving those customers.",
        icon: "ti-speakerphone",
      },
      {
        title: "Returns and Customer Support",
        text:
          "Returned products can create shipping, inspection, handling, refund, and resale costs. Customer service also requires staff, systems, and processes to resolve order and product issues.",
        icon: "ti-refresh",
      },
      {
        title: "Technology and Operations",
        text:
          "An online retailer must maintain its storefront, order-management systems, inventory information, security, and payment integrations. The company may also incur technology, administration, and other operating expenses that are not included in gross profit.",
        icon: "ti-settings",
      },
    ],
  },

  growth: {
    drivers: {
      title: "Growth Drivers",

      items: [
        "Customer reach: attract new customers through suitable channels and enter additional markets when the economics support expansion.",
        "Conversion rate: make product discovery, checkout, and payment easier so a greater share of relevant visitors complete purchases.",
        "Average order value: encourage appropriate multi-item purchases or higher-value orders without relying on discounts that destroy margins.",
        "Repeat purchases: deliver consistent quality and convenience so customers return when they need the products again.",
        "Product assortment: offer the right selection while managing the costs and risks of holding inventory.",
        "Fulfillment efficiency: improve inventory placement, picking, packing, and delivery processes to reduce avoidable cost and delays.",
        "Omnichannel integration: connect online ordering with physical stores or local fulfillment where this improves customer convenience and operating economics.",
      ],
    },

    opportunities: {
      title: "Where Growth Opportunities May Come From",

      items: [
        "Underserved customer needs: provide products or services that are difficult to find through existing channels.",
        "Better shopping experiences: improve search, product information, checkout, and delivery visibility to reduce friction.",
        "Customer retention: build repeat purchasing through reliability, product quality, and useful service rather than relying only on promotions.",
        "Operational improvements: reduce avoidable fulfillment costs, inventory errors, and returns while maintaining service quality.",
        "Channel integration: use physical locations, digital storefronts, and suitable delivery options to serve customers more effectively.",
        "Data-informed decisions: use reliable sales and inventory information to improve product selection, pricing, and demand planning.",
      ],
    },

    callout:
      "Growth in revenue does not automatically mean stronger economics. A retailer may increase sales while spending more on discounts, advertising, inventory, and delivery. Evaluate whether additional sales create sufficient gross profit and operating cash flow after the costs needed to generate and fulfill them.",
  },

  strength: {
    title: "Competitive Advantages",

    sub:
      "What may help an e-commerce business compete over time",

    items: [
      {
        title: "Brand and Customer Trust",
        text:
          "Customers may prefer a retailer they trust for product quality, accurate descriptions, dependable delivery, and fair handling of returns. Trust must be maintained through consistent execution.",
        icon: "ti-shield-check",
      },
      {
        title: "Convenience",
        text:
          "Easy product discovery, clear information, reliable checkout, suitable delivery choices, and effective customer support can make a retailer more attractive to customers.",
        icon: "ti-shopping-cart",
      },
      {
        title: "Cost Efficiency",
        text:
          "A retailer that sources products effectively and fulfills orders efficiently may be able to offer competitive prices while retaining more gross profit. Low costs must be demonstrated rather than assumed from company size.",
        icon: "ti-chart-line",
      },
      {
        title: "Customer Relationships",
        text:
          "Useful service, relevant product selection, and reliable experiences can encourage repeat purchases. However, customer loyalty may weaken if competitors offer better value or service.",
        icon: "ti-users",
      },
      {
        title: "Fulfillment Capabilities",
        text:
          "Well-managed stores, warehouses, supplier relationships, and delivery arrangements may support product availability and reliable service. These capabilities also require investment and can become a cost burden if capacity is poorly utilized.",
        icon: "ti-truck",
      },
      {
        title: "Merchandising and Inventory Management",
        text:
          "Choosing products customers want and maintaining suitable stock levels can improve availability and reduce missed sales. Poor forecasts can instead create excess inventory, markdowns, or shortages.",
        icon: "ti-package",
      },
    ],
  },

  competition: {
    compete: {
      title: "How E-commerce Businesses Compete",

      items: [
        "Price and value: offer a compelling combination of product quality, price, and total purchase cost.",
        "Product selection: make relevant products available with accurate descriptions and dependable stock information.",
        "Shopping experience: provide easy discovery, clear checkout, suitable payment options, and transparent delivery expectations.",
        "Delivery and service: fulfill orders reliably and resolve customer problems effectively.",
        "Brand differentiation: give customers a reason to choose the retailer beyond temporary discounts.",
        "Operational discipline: manage inventory, fulfillment, and marketing spending so that growth can contribute to sustainable profitability.",
      ],
    },

    challenges: {
      title: "Why Competition Can Be Difficult",

      items: [
        "Price transparency makes it easier for customers to compare similar products across retailers.",
        "Marketing costs can rise when many businesses compete for the same customers.",
        "Fast or inexpensive delivery may require substantial infrastructure, third-party services, or ongoing subsidies.",
        "Inventory mistakes can lead to markdowns, unavailable products, or excess working capital tied up in unsold goods.",
        "Large retailers may benefit from scale, but they must also manage complex operations and the cost of maintaining their networks.",
        "Retailers that depend heavily on external marketplaces may have limited control over platform fees, policies, and access to customers.",
      ],
    },
  },

  risks: {
    sub:
      "Important risks that can weaken e-commerce business economics",

    items: [
      {
        title: "Price Competition",
        text:
          "Customers can often compare prices quickly. Repeated discounting may increase order volume but reduce gross profit per order, especially when competitors can match the offers.",
        icon: "ti-trending-down",
      },
      {
        title: "Customer Acquisition Costs",
        text:
          "Paid advertising and promotions can become expensive. If the cost of acquiring customers exceeds the economic value of the resulting purchases, additional sales may not improve profitability.",
        icon: "ti-speakerphone",
      },
      {
        title: "Inventory Risk",
        text:
          "Products may remain unsold, become outdated, or require markdowns. Excess inventory ties up working capital, while insufficient inventory can lead to missed sales.",
        icon: "ti-package",
      },
      {
        title: "Fulfillment Complexity",
        text:
          "Delivery delays, inaccurate inventory, inefficient warehouses, and rising shipping costs can damage customer experience and reduce margins.",
        icon: "ti-truck",
      },
      {
        title: "Returns and Refunds",
        text:
          "Returns can generate reverse-shipping, inspection, handling, and refund costs. Their impact depends on product category, return policies, and the ability to resell returned goods.",
        icon: "ti-refresh",
      },
      {
        title: "Platform Dependence",
        text:
          "Businesses selling through third-party platforms may be exposed to fee changes, policy changes, ranking changes, or restrictions on their access to customers.",
        icon: "ti-world",
      },
      {
        title: "Fraud and Cybersecurity",
        text:
          "Payment fraud, account compromise, and data-security incidents can create financial losses, operational disruption, and damage to customer trust.",
        icon: "ti-shield-exclamation",
      },
      {
        title: "Regulatory and Consumer Protection Requirements",
        text:
          "Businesses may need to comply with applicable rules covering consumer rights, privacy, taxes, product safety, and cross-border commerce. Requirements differ by jurisdiction and business activity.",
        icon: "ti-shield-check",
      },
    ],
  },

  metrics: {
    sub:
      "Measures that help explain sales quality, operating efficiency, and profitability",

    items: [
      {
        label: "E-commerce Net Sales",
        fullName: "Net Sales from E-commerce Activities",
        text:
          "Measures sales recognized from the relevant online commerce activities within the company's reporting scope. It helps track sales trends, but companies may define online sales and channel attribution differently. Consolidated revenue should not automatically be treated as e-commerce revenue.",
        icon: "ti-report-money",
      },
      {
        label: "Gross Margin",
        fullName: "Gross Profit Margin",
        text:
          "Calculated as gross profit divided by revenue. It indicates how much revenue remains after the costs included in cost of goods sold. Comparisons require attention to product mix, accounting classifications, and whether companies act as principal retailers or agents in their transactions.",
        icon: "ti-chart-line",
      },
      {
        label: "Average Order Value",
        fullName: "Average Order Value (AOV)",
        text:
          "Measures the average value of an order under the company's chosen definition. It can help explain changes in customer purchasing behavior, but may be affected by product mix, discounts, shipping charges, cancellations, and differences in how orders are counted.",
        icon: "ti-shopping-cart",
      },
      {
        label: "Conversion Rate",
        fullName: "E-commerce Conversion Rate",
        text:
          "Measures the share of a defined group of visitors or sessions that complete a purchase. It helps evaluate the shopping experience, but the denominator and treatment of repeat visits differ across companies and analytics systems.",
        icon: "ti-percentage",
      },
      {
        label: "Repeat Purchase Rate",
        fullName: "Repeat Purchase Rate",
        text:
          "Measures how many customers purchase again within a defined period. It can provide insight into customer retention, but results depend on the observation window, customer definition, and natural purchase frequency of the products sold.",
        icon: "ti-refresh",
      },
      {
        label: "Customer Acquisition Cost",
        fullName: "Customer Acquisition Cost (CAC)",
        text:
          "Estimates the cost of acquiring a new customer under a defined methodology. It helps evaluate marketing efficiency, but the included costs, attribution methods, and definition of a new customer can vary substantially.",
        icon: "ti-users",
      },
      {
        label: "Inventory Turnover",
        fullName: "Inventory Turnover Ratio",
        text:
          "Commonly calculated as cost of goods sold divided by average inventory over a period. It indicates how quickly inventory is sold and replaced. Comparisons require similar accounting periods and caution across different product categories, business models, and inventory accounting methods.",
        icon: "ti-package",
      },
      {
        label: "Fulfillment Cost per Order",
        fullName: "Average Fulfillment Cost per Order",
        text:
          "Measures defined fulfillment costs divided by the corresponding number of fulfilled orders. It helps assess operating efficiency, but companies may include different costs, such as warehousing, picking, packing, shipping, payment processing, or returns. The scope must be checked before comparing results.",
        icon: "ti-truck",
      },
    ],

    callout:
      "No single metric explains whether an e-commerce business is performing well. Read revenue, gross profit, operating expenses, inventory, and cash flow together. Revenue is not profit, and cash collected from customers is not automatically equal to recognized revenue or free cash flow. Use company-reported definitions where available, and do not invent missing figures.",
  },

  companies: {
    sub:
      "Examples from Scope's company database. Both companies operate multiple business activities, so the examples below focus on the parts relevant to e-commerce.",

    items: [
      {
        slug: "amazon",
        role:
          "Amazon sells products to consumers through its online stores and also operates physical stores. Its 2025 Form 10-K distinguishes retail sales from third-party seller services, advertising, subscriptions, and AWS. Product sales and marketplace-related services must therefore be analyzed separately rather than treating all Amazon revenue as e-commerce retail sales.",
      },
      {
        slug: "walmart",
        role:
          "Walmart combines online commerce with a large physical retail network. Its fiscal 2025 annual report describes an omnichannel approach that integrates stores with e-commerce, including pickup and delivery. Walmart also has other activities, so consolidated company results should not be used as a direct measure of online commerce alone.",
      },
    ],
  },

  related: {
    sub:
      "Explore business models that often overlap with online retail but work differently.",

    slugs: ["marketplace", "payments", "advertising"],
  },

  disclaimer: SCOPE_DISCLAIMER,
};