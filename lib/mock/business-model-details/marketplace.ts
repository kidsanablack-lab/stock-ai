import {
  SCOPE_DISCLAIMER,
  type BusinessModelDetail,
} from "./types";

export const marketplaceDetail: BusinessModelDetail = {
  slug: "marketplace",

  headline: "Connect Buyers and Sellers to Create Transaction Value",

  description:
    "A marketplace connects two or more groups of users and helps them discover, evaluate, and complete transactions. It earns money by making those interactions more useful, convenient, and trustworthy.",

  characteristics: {
    tags: [
      "Multi-Sided Platform",
      "Transaction Fees",
      "Network Effects",
      "Trust and Safety",
      "Transaction Volume",
    ],
    note:
      "A marketplace does not necessarily own the products or services traded on its platform. Its economics depend on how it connects users, what services it provides, how it charges for them, and how much it costs to facilitate transactions.",
  },

  whatIsIt: {
    sub: "Understanding the marketplace business model",

    paragraphs: [
      "A marketplace is a platform that connects people or businesses who want to buy with people or businesses who want to sell. It can focus on physical products, digital goods, accommodation, transportation, professional services, or other transactions.",

      "Instead of earning money only by selling products it owns, a marketplace can earn fees by helping independent sellers reach customers and complete transactions. Some platforms also provide payments, advertising, logistics, seller tools, or other paid services.",

      "Marketplaces often serve multiple groups at once. Buyers want useful choices, competitive prices, and reliable service. Sellers want access to customers, successful transactions, and reasonable costs. The platform must create enough value for both sides to keep them participating.",

      "Not every marketplace works the same way. Some facilitate transactions without controlling fulfillment, while others manage payments, delivery, bookings, or customer support. These differences affect costs, risks, and the way revenue is recognized.",

      "A marketplace can grow its transaction activity without becoming profitable. It may spend heavily on promotions, customer acquisition, technology, and trust and safety. Investors therefore need to understand both transaction growth and the economics of serving each transaction.",
    ],
  },

  flow: {
    sub: "How a marketplace turns connections into business activity",

    steps: [
      {
        title: "Sellers or Service Providers",
        text:
          "Businesses or individuals offer products or services through the platform to reach potential customers.",
        icon: "ti-building-store",
        examples: [
          "Independent merchants listing products",
          "Drivers offering rides",
          "Restaurants listing meals for delivery",
        ],
      },
      {
        title: "Marketplace Platform",
        text:
          "The platform organizes listings, search, discovery, matching, and other tools that help users find suitable offers.",
        icon: "ti-world",
        examples: [
          "Product search and filters",
          "Seller profiles and reviews",
          "Matching a rider with a driver",
        ],
      },
      {
        title: "Buyers or Customers",
        text:
          "Customers compare available options, evaluate prices and trust signals, and choose a product or service.",
        icon: "ti-users",
        examples: [
          "Comparing products from several sellers",
          "Selecting a ride",
          "Choosing a restaurant for delivery",
        ],
      },
      {
        title: "Transaction and Support",
        text:
          "Depending on the platform, the marketplace may facilitate payment, order tracking, communication, dispute resolution, or fulfillment.",
        icon: "ti-arrows-exchange",
        examples: [
          "Order confirmation",
          "Payment processing",
          "Delivery or service coordination",
        ],
      },
      {
        title: "Marketplace Revenue",
        text:
          "The platform earns revenue according to its business arrangements, such as commissions, subscriptions, advertising, or service fees.",
        icon: "ti-report-money",
        examples: [
          "A commission on a completed transaction",
          "A seller subscription",
          "A sponsored product placement",
        ],
      },
    ],
  },

  howItWorks: {
    sub: "The economics behind a marketplace",

    intro:
      "A marketplace creates value by reducing the effort required for buyers and sellers to find one another and transact. Its financial results depend on transaction activity, monetization, service costs, and the ability to retain both sides of the platform.",

    chain: [
      {
        title: "Attract Both Sides",
        text:
          "The platform recruits sellers or service providers while giving buyers a reason to visit. Building enough activity on both sides is often a major early challenge.",
        tag: "Supply and Demand",
      },
      {
        title: "Create Successful Matches",
        text:
          "Search, recommendations, availability, pricing, and trust features help users find relevant offers and complete transactions.",
        tag: "Matching",
      },
      {
        title: "Facilitate Transactions",
        text:
          "The platform may support payments, communication, delivery, bookings, or dispute resolution, depending on its operating model.",
        tag: "Transaction",
      },
      {
        title: "Monetize the Activity",
        text:
          "The marketplace earns applicable fees or other revenue. The amount recognized as revenue may be much smaller than the total value traded through the platform.",
        tag: "Monetization",
      },
      {
        title: "Improve Retention and Economics",
        text:
          "The business seeks repeat transactions, efficient customer acquisition, reliable service, and sufficient contribution from transactions to support operating costs.",
        tag: "Retention and Profitability",
      },
    ],

    outro:
      "A growing marketplace is not automatically a profitable one. The important question is whether the value generated by repeat, successful transactions can cover the costs of attracting users, operating the platform, processing transactions, and maintaining trust.",
  },

  whoPays: {
    sub: "Who pays a marketplace?",

    items: [
      {
        title: "Sellers and Merchants",
        text:
          "Sellers may pay commissions, listing fees, subscriptions, or service charges in exchange for access to customers and tools that support selling.",
        icon: "ti-building-store",
      },
      {
        title: "Buyers and Customers",
        text:
          "Some marketplaces charge customers service fees, booking fees, delivery fees, or other disclosed charges. Other platforms charge primarily on the seller side.",
        icon: "ti-users",
      },
      {
        title: "Advertisers",
        text:
          "Sellers or brands may pay for sponsored listings and other advertising products that improve product visibility. Advertising revenue is related to, but distinct from, transaction-fee revenue.",
        icon: "ti-ad",
      },
      {
        title: "Professional or Business Users",
        text:
          "Some platforms offer paid subscriptions, premium tools, or business services to merchants and service providers who need additional functionality.",
        icon: "ti-briefcase",
      },
      {
        title: "Transaction and Service Partners",
        text:
          "Depending on the arrangement, the marketplace may charge for additional services such as fulfillment, shipping coordination, or other seller support. The specific payer and revenue treatment depend on the contract.",
        icon: "ti-package",
      },
    ],
  },

  makeMoney: {
    sub: "Common marketplace revenue streams",

    items: [
      {
        title: "Transaction Commissions",
        text:
          "The marketplace takes a fee from eligible transactions, often calculated as a percentage of a defined transaction value. The applicable rate, exclusions, refunds, and fee base depend on the platform's terms.",
        icon: "ti-percentage",
      },
      {
        title: "Listing Fees",
        text:
          "Sellers pay to list products, services, or other offers. This can generate revenue even when a listing does not result in a completed sale, depending on the fee arrangement.",
        icon: "ti-list-details",
      },
      {
        title: "Subscriptions",
        text:
          "Merchants or professional users pay recurring fees for tools, account features, or service packages. Subscription revenue is separate from transaction commissions.",
        icon: "ti-refresh",
      },
      {
        title: "Advertising and Sponsored Listings",
        text:
          "Sellers or brands pay for promotional placement or advertising opportunities. This revenue depends on advertiser demand and the platform's advertising products, not only on completed transactions.",
        icon: "ti-speakerphone",
      },
      {
        title: "Fulfillment and Other Services",
        text:
          "A marketplace may charge for services such as order fulfillment, shipping-related services, payment processing, or seller tools. These services can add revenue but also introduce additional costs and operational responsibilities.",
        icon: "ti-package",
      },
      {
        title: "Customer or Booking Fees",
        text:
          "Some platforms charge buyers or customers fees for using the service, making a booking, or completing a transaction. The fee structure depends on the type of marketplace and the value provided.",
        icon: "ti-receipt",
      },
    ],
  },

  moneyGoes: {
    sub: "What a marketplace needs to spend money on",

    items: [
      {
        title: "Technology and Infrastructure",
        text:
          "The platform must maintain search, listings, matching, account systems, data infrastructure, reliability, and security as activity grows.",
        icon: "ti-server",
      },
      {
        title: "Customer and Seller Acquisition",
        text:
          "Marketing, promotions, incentives, and sales efforts help attract buyers and sellers. Excessive spending can make growth expensive and delay profitability.",
        icon: "ti-speakerphone",
      },
      {
        title: "Payments and Transaction Processing",
        text:
          "Payment processing, refunds, chargebacks, and related operational work can create costs that vary with transaction volume and risk.",
        icon: "ti-credit-card",
      },
      {
        title: "Trust, Safety, and Dispute Resolution",
        text:
          "Fraud prevention, identity checks, moderation, reviews, complaints, and dispute handling help protect users and maintain confidence in the platform.",
        icon: "ti-shield-check",
      },
      {
        title: "Customer Support and Operations",
        text:
          "The marketplace may need support teams and operational systems to handle order problems, seller issues, cancellations, and other service failures.",
        icon: "ti-headset",
      },
      {
        title: "Fulfillment and Partner Costs",
        text:
          "Marketplaces that coordinate delivery, warehousing, or other physical services may incur additional logistics costs or payments to partners.",
        icon: "ti-truck",
      },
    ],
  },

  growth: {
    drivers: {
      title: "What Can Drive Growth?",
      items: [
        "Attracting more relevant buyers and qualified sellers to the platform.",
        "Improving the chance that buyers find suitable offers and complete transactions.",
        "Increasing repeat transactions and retaining users on both sides.",
        "Expanding into new product categories, locations, or customer groups where the model can work economically.",
        "Adding useful services, such as seller tools or fulfillment, that customers are willing to pay for.",
        "Increasing monetization per transaction when the added fees provide enough value and do not drive users away.",
        "Improving trust, search quality, availability, and convenience so users have good reasons to return.",
      ],
    },

    opportunities: {
      title: "Where Opportunities May Exist",
      items: [
        "Network effects may make a marketplace more useful when additional relevant buyers attract sellers and additional relevant sellers attract buyers.",
        "Better search and matching can help users find what they need with less effort.",
        "A trusted platform may reduce uncertainty through reviews, payment protections, clear policies, and dispute resolution.",
        "Additional seller services can create new revenue streams when they solve real operational problems.",
        "Repeat usage and more efficient acquisition can improve unit economics if the cost of serving users remains controlled.",
      ],
    },

    callout:
      "Growth quality matters more than headline activity alone. More users or higher GMV may not create sustainable profit if the platform must continually subsidize transactions, pay high acquisition costs, or absorb rising service and trust-related expenses.",
  },

  strength: {
    title: "Potential Competitive Strengths",
    sub: "Why some marketplaces become more useful over time",

    items: [
      {
        title: "Network Effects",
        text:
          "More relevant participants on one side can make the platform more valuable to participants on the other side. This advantage depends on real matching and transaction activity, not just account counts.",
        icon: "ti-network",
      },
      {
        title: "Liquidity and Matching Quality",
        text:
          "A marketplace with suitable supply and active demand can help users find relevant offers and complete transactions efficiently. Liquidity differs by location, category, and time.",
        icon: "ti-arrows-exchange",
      },
      {
        title: "Trust and Reputation",
        text:
          "Reliable reviews, seller standards, dispute resolution, and transaction protections can encourage users to transact through the platform rather than through unfamiliar alternatives.",
        icon: "ti-shield-check",
      },
      {
        title: "Convenience and Discovery",
        text:
          "Search, comparison, payment, and transaction tools can reduce the effort required to find and purchase products or services.",
        icon: "ti-search",
      },
      {
        title: "Repeat Usage and Relationships",
        text:
          "When buyers and sellers consistently find value, repeat activity may reduce dependence on acquiring new users for every transaction. Retention must be measured rather than assumed.",
        icon: "ti-refresh",
      },
      {
        title: "Operational Scale",
        text:
          "A larger transaction base may allow some technology and operational costs to be spread across more activity. However, customer support, fraud, fulfillment, and other costs can also rise with scale.",
        icon: "ti-chart-line",
      },
    ],
  },

  competition: {
    compete: {
      title: "How Marketplaces Compete",
      items: [
        "The relevance and quality of the buyers and sellers they attract.",
        "The availability, variety, and competitiveness of products or services.",
        "The likelihood that users can find a match and complete a transaction.",
        "Trust, payment protection, dispute resolution, and service reliability.",
        "Total cost to buyers and sellers, including fees and indirect costs.",
        "Search quality, ease of use, transaction speed, and customer support.",
        "Specialization in a category, customer group, or geographic market.",
      ],
    },

    challenges: {
      title: "Structural Challenges",
      items: [
        "A new marketplace may struggle to attract buyers and sellers at the same time.",
        "Users may multi-home by using several competing platforms, making loyalty harder to maintain.",
        "High commissions can encourage sellers to raise prices or move transactions off-platform.",
        "Competition may force the platform to spend heavily on incentives and promotions.",
        "Poor-quality listings, fraud, or unreliable sellers can weaken trust and reduce repeat usage.",
        "The economics may vary significantly across cities, categories, and transaction types.",
        "Expanding into fulfillment or other services can add complexity and capital requirements.",
      ],
    },
  },

  risks: {
    sub: "What can weaken marketplace economics?",

    items: [
      {
        title: "The Chicken-and-Egg Problem",
        text:
          "Buyers may avoid a platform with too few relevant offers, while sellers may avoid a platform with too little demand. Building sufficient activity on both sides can require time and spending.",
        icon: "ti-arrows-exchange",
      },
      {
        title: "Customer Acquisition Costs",
        text:
          "A marketplace may rely on advertising, discounts, or incentives to attract users. If the cost of acquiring and retaining users exceeds the economic value they generate, growth may destroy value.",
        icon: "ti-currency-dollar",
      },
      {
        title: "Disintermediation",
        text:
          "Buyers and sellers who meet through the platform may try to transact directly to avoid fees. The risk depends on whether the marketplace continues to provide enough value and protection.",
        icon: "ti-external-link",
      },
      {
        title: "Fraud and Trust Failures",
        text:
          "Fake listings, counterfeit products, payment disputes, or unsafe transactions can damage the platform's reputation and increase support and prevention costs.",
        icon: "ti-shield-exclamation",
      },
      {
        title: "Competition and Fee Pressure",
        text:
          "Users may move to competing platforms or transact elsewhere if fees, prices, service quality, or available choices become less attractive.",
        icon: "ti-arrows-left-right",
      },
      {
        title: "Regulatory and Legal Exposure",
        text:
          "Depending on the market and jurisdiction, platforms may face obligations involving consumer protection, privacy, taxation, payments, product safety, employment classification, or competition.",
        icon: "ti-scale",
      },
      {
        title: "Uneconomic Growth",
        text:
          "GMV and user numbers can rise while losses persist if transaction margins are weak, incentives remain high, or the platform must continually spend to maintain activity.",
        icon: "ti-trending-down",
      },
      {
        title: "Operational Complexity",
        text:
          "Marketplaces that manage physical delivery, bookings, payments, or other complex services may face higher costs, service failures, and additional operational risks.",
        icon: "ti-settings",
      },
    ],
  },

  metrics: {
    sub: "Key metrics for understanding marketplace performance",

    items: [
      {
        label: "GMV",
        fullName: "Gross Merchandise Volume",
        text:
          "The total value of eligible transactions facilitated through a marketplace during a stated period, based on the company's definition. GMV helps indicate transaction activity, but it is not the same as recognized revenue, profit, or cash collected. Companies may differ in their treatment of cancellations, refunds, taxes, and other items.",
        icon: "ti-shopping-cart",
      },
      {
        label: "Revenue",
        fullName: "Recognized Revenue",
        text:
          "The revenue the company recognizes under its accounting policies for a reporting period. A marketplace acting as an agent may recognize only its fee or commission rather than the full transaction value. Check the company's accounting disclosures and revenue categories before comparing businesses.",
        icon: "ti-report-money",
      },
      {
        label: "Take Rate",
        fullName: "Revenue as a Percentage of GMV",
        text:
          "Often calculated as a defined revenue measure divided by GMV. It helps describe how much revenue the platform generates relative to transaction value. The result depends on which revenue and GMV categories are included, and a higher take rate is not automatically better if it discourages participation.",
        icon: "ti-percentage",
      },
      {
        label: "Active Buyers and Sellers",
        fullName: "Active Marketplace Participants",
        text:
          "The number of buyers or sellers who meet the company's activity criteria over a stated period. This helps indicate the size of the active network, but definitions and measurement windows vary. More accounts do not necessarily mean more successful transactions.",
        icon: "ti-users",
      },
      {
        label: "Transaction Volume",
        fullName: "Number of Transactions",
        text:
          "The number of eligible transactions completed during a stated period. It helps show marketplace usage and frequency, but does not reveal average transaction value, revenue per transaction, cancellations, or profitability on its own.",
        icon: "ti-receipt",
      },
      {
        label: "Repeat Purchase Rate",
        fullName: "Repeat Transaction Rate",
        text:
          "The proportion of a defined customer group that makes another purchase or transaction within a specified period. It can help assess retention, but comparisons require consistent definitions of a repeat user, the observation period, and the transaction being counted.",
        icon: "ti-refresh",
      },
      {
        label: "CAC",
        fullName: "Customer Acquisition Cost",
        text:
          "The cost of acquiring a customer under the company's chosen methodology. It can help assess how expensive growth is, but calculations differ in which marketing, sales, incentive, and overhead costs are included. Buyer and seller acquisition costs may also differ substantially.",
        icon: "ti-currency-dollar",
      },
      {
        label: "Contribution Margin",
        fullName: "Contribution After Relevant Variable Costs",
        text:
          "Revenue remaining after the variable costs included in a company's chosen calculation. It helps indicate whether transactions contribute toward fixed costs and operating profit. The cost categories included may differ, so compare definitions before comparing companies.",
        icon: "ti-chart-line",
      },
    ],

    callout:
      "Read marketplace metrics together. GMV measures transaction value under a company's definition; revenue measures recognized sales; profit deducts expenses; and cash flow reflects cash movements. A higher GMV or take rate alone does not prove that a marketplace has attractive economics.",
  },

  companies: {
    sub: "Examples from companies in Scope's company database",

    items: [
      {
        slug: "amazon",
        role:
          "Amazon operates a marketplace where third-party sellers offer products to customers. Its reported Third-party seller services revenue includes commissions and certain related seller services. Amazon also sells products directly and operates advertising, subscription, cloud, and other businesses, so its total revenue should not be treated as marketplace revenue.",
      },
      {
        slug: "uber",
        role:
          "Uber's platform connects users with independent drivers and, through Delivery, with merchants and delivery services. Its marketplace-related activity spans different service categories with different economics. Uber also reports multiple business areas, so its total revenue and operating costs should not be assumed to represent a single uniform marketplace model.",
      },
    ],
  },

  related: {
    sub: "Explore business models that often work alongside marketplaces",

    slugs: ["e-commerce", "payments", "advertising"],
  },

  disclaimer: SCOPE_DISCLAIMER,
};