import {
  SCOPE_DISCLAIMER,
  type BusinessModelDetail,
} from "./types";

export const paymentsDetail: BusinessModelDetail = {
  slug: "payments",

  headline:
    "Moving Money Between People and Businesses",

  description:
    "Payments companies help people and businesses move money, accept payments, and process transactions. Some operate payment networks, while others provide payment processing, merchant services, digital payment platforms, or supporting technology. Their revenue, costs, and risks depend on the role they play in the payment process.",

  characteristics: {
    tags: [
      "Transaction-driven revenue",
      "Digital infrastructure",
      "Network effects",
      "Security and trust",
      "Regulated industry",
      "Multiple business models",
    ],
    note:
      "A payment transaction can involve several companies, each performing a different role and earning revenue differently. Payment volume is not the same as company revenue, and more transactions do not automatically mean higher profits.",
  },

  whatIsIt: {
    sub:
      "Understand how payment businesses help money move through the economy.",

    paragraphs: [
      "The payments industry includes businesses that help consumers pay, merchants accept money, and financial institutions exchange transaction information. These businesses make it easier to pay in stores, shop online, transfer money, and operate across different payment systems.",

      "A payment network connects participants and provides rules and technology that help transactions move between them. A payment processor handles transaction information and related processing services. A merchant acquirer helps businesses accept payments and receive funds. A digital payment platform gives users or merchants another way to send, receive, or manage payments.",

      "These roles can overlap. One company may provide several payment services, while another focuses on a narrower part of the transaction. The business model determines which customers pay, what services generate revenue, and which costs or risks the company must manage.",

      "For example, when a customer buys something online using a card, the transaction may involve the merchant, a payment gateway or processor, the merchant's payment provider, the card network, and the cardholder's bank. The exact arrangement depends on the payment method, providers, and countries involved.",

      "Payment businesses may earn money through network fees, processing fees, merchant services, cross-border services, security products, or other technology services. Some providers also handle additional financial activities that introduce risks beyond basic payment processing.",

      "The central business question is how a company turns its role in the payment process into sustainable revenue while maintaining reliability, security, competitive pricing, and the trust of customers and partners.",
    ],
  },

  flow: {
    sub:
      "Follow a typical card payment from the customer's purchase to the merchant receiving funds. The exact process varies by provider and payment method.",

    steps: [
      {
        title: "Customer Starts a Payment",
        text:
          "A customer chooses to pay for a product or service using a card or another supported payment method.",
        icon: "ti-shopping-cart",
        examples: [
          "Pay at a physical store",
          "Buy something through an online checkout",
          "Pay for a digital service",
        ],
      },
      {
        title: "Payment Information Is Submitted",
        text:
          "The merchant or its payment provider sends transaction information through the relevant payment systems.",
        icon: "ti-device-mobile",
        examples: [
          "Submit card details securely",
          "Send transaction amount and merchant information",
          "Use a payment gateway or processor when required",
        ],
      },
      {
        title: "The Transaction Is Authorized",
        text:
          "The authorization request reaches the relevant financial institution through the payment system. The issuer or responsible provider evaluates the transaction and returns an approval or decline.",
        icon: "ti-shield-check",
        examples: [
          "Check account or credit availability",
          "Apply fraud and security controls",
          "Return an approval or decline",
        ],
      },
      {
        title: "Transaction Information Is Processed",
        text:
          "The relevant providers exchange transaction information and prepare the transaction for clearing and settlement under their arrangements.",
        icon: "ti-arrows-exchange",
        examples: [
          "Transmit transaction records",
          "Calculate amounts owed between participants",
          "Prepare transactions for settlement",
        ],
      },
      {
        title: "Funds Are Settled",
        text:
          "Financial institutions and payment providers settle obligations according to the applicable system and agreements. The merchant receives funds according to its provider's settlement terms.",
        icon: "ti-building-bank",
        examples: [
          "Settle obligations between participants",
          "Apply applicable fees and adjustments",
          "Credit the merchant according to agreed terms",
        ],
      },
      {
        title: "Payment Providers Earn Revenue",
        text:
          "Different providers may recognize fees for their respective services. Their revenue depends on their contracts, transaction activity, service mix, and accounting policies.",
        icon: "ti-chart-line",
        examples: [
          "Earn network service fees",
          "Charge for processing or merchant services",
          "Sell security and other value-added services",
        ],
      },
    ],
  },

  howItWorks: {
    sub:
      "The payment ecosystem divides a transaction into different services, and each service can have a different source of revenue.",

    intro:
      "Consider an online purchase paid for with a card. The merchant wants to accept the payment, the customer wants a reliable checkout, and the financial institutions need to verify and settle the transaction. Payment companies provide technology, connections, rules, and services that help these activities work together.",

    chain: [
      {
        title: "Connect the Participants",
        text:
          "Payment networks and payment providers establish the technology, relationships, and operating rules needed to connect relevant participants.",
        tag: "Connectivity",
      },
      {
        title: "Transmit and Process Information",
        text:
          "Processors and other technology providers handle transaction messages and related services. Processing information is not the same as moving or holding all the money involved.",
        tag: "Processing",
      },
      {
        title: "Authorize the Transaction",
        text:
          "The relevant issuer or responsible provider decides whether to approve or decline the transaction under its controls and arrangements.",
        tag: "Authorization",
      },
      {
        title: "Clear and Settle",
        text:
          "The relevant participants reconcile transaction obligations and settle funds according to the payment system and contractual arrangements.",
        tag: "Settlement",
      },
      {
        title: "Charge for Services",
        text:
          "Each provider may earn fees for its own role. The amount it retains depends on pricing, partner arrangements, service costs, and the applicable accounting treatment.",
        tag: "Revenue",
      },
    ],

    outro:
      "Authorization, processing, clearing, and settlement are related but distinct activities. A company that provides payment network services does not necessarily issue credit cards, lend money, or bear the same financial risks as a bank or payment provider.",
  },

  whoPays: {
    sub:
      "The user, the merchant, and the organization paying for a payment service may be different parties.",

    items: [
      {
        title: "Merchants",
        text:
          "Businesses may pay merchant service fees to accept payments. The total cost can depend on the payment method, provider, transaction characteristics, and contract.",
        icon: "ti-building-store",
      },
      {
        title: "Banks and Financial Institutions",
        text:
          "Financial institutions may pay for network access, transaction processing, technology, and other services under their agreements with payment providers.",
        icon: "ti-building-bank",
      },
      {
        title: "Businesses Using Payment Technology",
        text:
          "Companies may pay for payment gateways, payment APIs, recurring billing tools, fraud prevention, reconciliation, or other payment infrastructure.",
        icon: "ti-code",
      },
      {
        title: "Digital Payment Users",
        text:
          "Some platforms charge users for particular services, such as certain transfers or currency conversions. Other consumer payment activities may be free to the user because another participant pays the fee.",
        icon: "ti-user",
      },
      {
        title: "Cross-border Customers and Businesses",
        text:
          "International payment services may involve additional fees or foreign-exchange charges. The amount charged and the party bearing the cost depend on the provider and transaction arrangement.",
        icon: "ti-world",
      },
    ],
  },

  makeMoney: {
    sub:
      "Payment companies can earn revenue from transaction activity, merchant relationships, technology, and services that help make payments safer or easier.",

    items: [
      {
        title: "Payment Network Fees",
        text:
          "Network operators may earn fees for services that support payment transactions. Depending on the service, fees can relate to payment value, transaction activity, or other network services. Network fees should not be confused with the total fee paid by a merchant.",
        icon: "ti-arrows-exchange",
      },
      {
        title: "Payment Processing Fees",
        text:
          "Processors charge for handling transaction information and related processing services. Pricing may be based on transaction count, transaction value, a contract, or a combination of methods.",
        icon: "ti-server",
      },
      {
        title: "Merchant Services",
        text:
          "Providers may earn revenue by helping merchants accept payments, manage transactions, reconcile payments, or access related services. The provider's responsibilities and costs depend on its role in the arrangement.",
        icon: "ti-building-store",
      },
      {
        title: "Cross-border Payment Services",
        text:
          "Providers may earn fees from services that facilitate payments across countries. Foreign-exchange-related revenue may also be relevant for some businesses, but its treatment and economic contribution differ by provider.",
        icon: "ti-world",
      },
      {
        title: "Digital Payment Platform Services",
        text:
          "Digital platforms may charge fees for certain transfers, merchant transactions, business services, or other payment-related activities. A platform's total revenue may also include activities outside basic payment processing.",
        icon: "ti-device-mobile",
      },
      {
        title: "Security and Value-added Services",
        text:
          "Companies may sell fraud prevention, identity verification, authentication, data, analytics, and other services to financial institutions or businesses. These services can create revenue beyond basic transaction processing.",
        icon: "ti-shield-check",
      },
      {
        title: "Payment Infrastructure and Software",
        text:
          "Some providers charge for payment gateways, APIs, software, integration, or infrastructure that helps businesses connect to payment systems. Pricing can be transaction-based, subscription-based, contract-based, or a combination.",
        icon: "ti-code",
      },
    ],
  },

  moneyGoes: {
    sub:
      "Payment companies must fund reliable technology, security, customer support, and the relationships that allow their services to operate.",

    items: [
      {
        title: "Technology and Infrastructure",
        text:
          "Companies invest in software, data centers or cloud services, network capacity, systems maintenance, and technical staff to process transactions reliably.",
        icon: "ti-server",
      },
      {
        title: "Cybersecurity and Fraud Prevention",
        text:
          "Security systems, monitoring, authentication, and fraud prevention help protect customers and the payment ecosystem. The necessary spending depends on the company's role and risk exposure.",
        icon: "ti-shield-check",
      },
      {
        title: "Partner and Network Costs",
        text:
          "Some providers pay financial institutions, processing partners, network participants, or other service providers. The size and accounting treatment of these costs depend on the business model.",
        icon: "ti-handshake",
      },
      {
        title: "Sales and Customer Support",
        text:
          "Companies may spend on acquiring merchants, supporting business customers, maintaining partnerships, and helping users resolve payment problems.",
        icon: "ti-headset",
      },
      {
        title: "Compliance and Regulation",
        text:
          "Payment businesses may need to fund legal, compliance, monitoring, reporting, and risk-management activities. Requirements vary across countries and business activities.",
        icon: "ti-scale",
      },
      {
        title: "Operations and Reliability",
        text:
          "Monitoring systems, resolving failed transactions, managing disputes, and maintaining service availability require people and operational processes.",
        icon: "ti-settings",
      },
      {
        title: "Transaction and Credit-related Losses",
        text:
          "Some businesses may face losses from fraud, disputes, guarantees, or credit exposure. These risks should not be assumed to apply equally to every payment network or processor.",
        icon: "ti-alert-triangle",
      },
    ],
  },

  growth: {
    drivers: {
      title: "What Can Drive Growth?",
      items: [
        "More electronic payment transactions across stores, websites, and digital services.",
        "Higher payment value flowing through a provider's services, where its revenue model benefits from transaction value.",
        "Expansion into additional countries, customer groups, merchants, or payment methods.",
        "Greater use of online checkout, digital wallets, and integrated business payment tools.",
        "Selling additional security, analytics, and payment technology services to existing customers.",
        "Improving payment acceptance and reducing friction for merchants and users.",
        "Growing cross-border commerce and international payment activity.",
      ],
    },

    opportunities: {
      title: "Where Can Opportunities Come From?",
      items: [
        "Businesses that need easier ways to accept payments across multiple channels.",
        "Companies seeking to simplify payment integration and transaction management.",
        "Demand for fraud prevention, authentication, and secure payment experiences.",
        "New payment methods and improvements to existing payment infrastructure.",
        "International businesses that need payment services across different markets.",
        "Additional services that help merchants manage billing, reconciliation, or payment data.",
      ],
    },

    callout:
      "Growth in payment volume does not automatically translate into equal revenue growth or higher profits. Pricing, transaction mix, competition, partner costs, foreign exchange, fraud losses, and investment in infrastructure can all affect financial results.",
  },

  strength: {
    title: "Potential Competitive Advantages",
    sub:
      "Payment businesses may build advantages through trust, acceptance, technology, and relationships. The strength of these advantages depends on the company's actual role and market position.",

    items: [
      {
        title: "Network Acceptance",
        text:
          "A network accepted by many merchants and supported by many financial institutions can become more useful to participants. The strength of this effect depends on acceptance, alternatives, and the needs of each market.",
        icon: "ti-network",
      },
      {
        title: "Reliability and Trust",
        text:
          "Consistent service, accurate processing, and secure transactions help protect customer confidence. Reliability must be maintained as transaction volumes and system complexity grow.",
        icon: "ti-shield-check",
      },
      {
        title: "Integration with Customers",
        text:
          "Payment systems integrated into a merchant's checkout, accounting, or operating systems may be costly or inconvenient to replace. Switching costs vary and do not prevent customers from leaving in every situation.",
        icon: "ti-plug-connected",
      },
      {
        title: "Scale and Operating Efficiency",
        text:
          "A provider that processes large transaction volumes may be able to spread some technology and operating costs across more activity. This benefit depends on pricing, infrastructure costs, and the company's operating model.",
        icon: "ti-chart-bar",
      },
      {
        title: "Security and Risk Expertise",
        text:
          "Experience in fraud detection, authentication, and risk controls may help a company protect transactions and meet customer requirements. Security capabilities must keep improving as threats change.",
        icon: "ti-lock",
      },
      {
        title: "Broad Service Offering",
        text:
          "Providers that combine payments with useful services such as analytics, fraud tools, or reconciliation may serve more customer needs. Additional products only create an advantage when customers value them and the economics are attractive.",
        icon: "ti-layers",
      },
    ],
  },

  competition: {
    compete: {
      title: "How Do Payments Companies Compete?",
      items: [
        "Transaction reliability, processing speed, and service availability.",
        "Pricing and the total cost of accepting or processing payments.",
        "Merchant acceptance and connectivity with relevant financial institutions.",
        "Security, fraud controls, and the ability to handle disputes.",
        "Ease of integration with websites, applications, and business systems.",
        "Support for different payment methods, currencies, and markets.",
        "Additional services that solve customer problems beyond basic payments.",
      ],
    },

    challenges: {
      title: "Why Can Competition Be Difficult?",
      items: [
        "Providers may lower prices to win merchants or retain large customers.",
        "Banks, technology companies, local payment systems, and new providers can compete for different parts of the transaction.",
        "A new payment method may reduce the relevance of an existing service in some markets.",
        "Large merchants may negotiate pricing or build parts of their own payment infrastructure.",
        "Providers depend on reliable systems and relationships with partners.",
        "Security incidents or extended outages can damage trust and increase costs.",
        "Regulation may change how fees are charged or how payment services operate.",
      ],
    },
  },

  risks: {
    sub:
      "Payments can be a high-volume business, but companies still face competitive, technical, regulatory, and operational risks.",

    items: [
      {
        title: "Price Competition",
        text:
          "Merchants and financial institutions may negotiate lower fees or move to alternative providers. Transaction growth can therefore coexist with pressure on revenue per transaction or margins.",
        icon: "ti-currency-dollar",
      },
      {
        title: "Cybersecurity and Fraud",
        text:
          "Criminal activity, account compromise, data theft, or weaknesses in security controls can cause financial losses, service disruption, legal exposure, or damage to customer trust.",
        icon: "ti-shield-exclamation",
      },
      {
        title: "System Outages",
        text:
          "A technical failure may prevent customers from paying or merchants from accepting transactions. Reliability is critical because customers may quickly seek alternatives when payments fail.",
        icon: "ti-server-off",
      },
      {
        title: "Regulatory Changes",
        text:
          "Rules governing fees, data, consumer protection, licensing, security, and cross-border payments can change. Their effects depend on the company's activities and the jurisdictions in which it operates.",
        icon: "ti-scale",
      },
      {
        title: "Alternative Payment Systems",
        text:
          "Account-to-account transfers, domestic payment systems, digital wallets, and other methods may compete with existing payment services. The effect varies by market and use case.",
        icon: "ti-arrows-left-right",
      },
      {
        title: "Partner Dependence",
        text:
          "A provider may rely on banks, networks, processors, cloud infrastructure, or other partners. Changes in commercial relationships or service availability can affect its business.",
        icon: "ti-link",
      },
      {
        title: "Fraud, Disputes, and Financial Liability",
        text:
          "Some payment providers bear costs associated with chargebacks, refunds, fraud, or guarantees. The exact exposure depends on contractual responsibilities and whether the provider also takes credit or settlement risk.",
        icon: "ti-alert-triangle",
      },
      {
        title: "Cross-border and Foreign Exchange Exposure",
        text:
          "International payments may be affected by foreign-exchange movements, local regulations, settlement arrangements, and country-specific operating requirements. Not every payment company has the same exposure.",
        icon: "ti-world",
      },
      {
        title: "Customer Concentration",
        text:
          "A provider that depends heavily on a small number of merchants or business customers may be vulnerable if a major customer leaves, renegotiates fees, or reduces transaction activity.",
        icon: "ti-users",
      },
    ],
  },

  metrics: {
    sub:
      "Study transaction activity, revenue, profitability, and risk together. Definitions differ across payment companies, so compare like with like.",

    items: [
      {
        label: "Revenue",
        fullName: "Revenue Recognized During the Period",
        text:
          "Measures revenue recognized under the company's accounting policies. It helps show the scale and growth of the business, but total revenue may include several payment and non-payment services. Compare business segments and revenue recognition practices before comparing companies.",
        icon: "ti-chart-line",
      },
      {
        label: "Payment Volume",
        fullName: "Payment Volume or Payments Volume",
        text:
          "Measures the value of payments covered by a company's reported definition. It helps show the scale of payment activity, but it is not the company's revenue or profit. Companies may define eligible transactions and included services differently.",
        icon: "ti-cash",
      },
      {
        label: "Transactions Processed",
        fullName: "Number of Transactions Processed",
        text:
          "Measures the number of transactions processed under the company's definition. It can help indicate usage and system activity, but transactions may differ in size, complexity, and revenue contribution. Check what the company includes in the count.",
        icon: "ti-arrows-exchange",
      },
      {
        label: "Revenue Growth",
        fullName: "Year-over-year or Period-over-period Revenue Growth",
        text:
          "Measures the percentage change in revenue over a comparable period. It helps show whether the business is expanding, but growth can reflect volume, pricing, foreign exchange, acquisitions, or changes in service mix. Reported and constant-currency growth may differ.",
        icon: "ti-trending-up",
      },
      {
        label: "Operating Margin",
        fullName: "Operating Income as a Percentage of Revenue",
        text:
          "Usually calculated as operating income divided by revenue. It helps assess how much recognized revenue remains after operating expenses. Differences in business mix, cost classification, and unusual items can make comparisons misleading.",
        icon: "ti-percentage",
      },
      {
        label: "Free Cash Flow",
        fullName: "Free Cash Flow",
        text:
          "Often calculated as operating cash flow minus capital expenditures, although company definitions can differ. It helps assess cash remaining after investment in long-lived assets, but it is not the same as profit and does not mean all remaining cash is available for shareholders.",
        icon: "ti-coins",
      },
      {
        label: "Cross-border Volume",
        fullName: "Cross-border Payment Volume",
        text:
          "Measures cross-border payment activity according to the company's definition. It can help assess international activity, but currency movements, travel, commerce patterns, and the company's treatment of cross-border transactions affect interpretation.",
        icon: "ti-world",
      },
      {
        label: "Value-added Services Revenue",
        fullName: "Revenue from Additional Services",
        text:
          "Measures revenue from services such as security, analytics, consulting, or other technology offerings when separately disclosed. It helps assess revenue beyond basic payment activity, but companies may classify and report these services differently.",
        icon: "ti-layers",
      },
      {
        label: "Fraud and Loss Indicators",
        fullName: "Company-reported Fraud or Loss Measures",
        text:
          "Some providers disclose fraud rates, losses, chargebacks, or other risk measures. These can help assess risk, but the definitions, coverage, and financial responsibility differ by provider. Do not compare percentages unless the underlying definitions are compatible.",
        icon: "ti-shield-check",
      },
    ],

    callout:
      "Important: Payment volume is not revenue. Revenue is not profit, and profit is not cash flow. A company may process a large value of payments while recognizing only a portion as revenue. Always check the company's definitions, business segments, and financial statements before comparing results.",
  },

  companies: {
    sub:
      "Explore real companies in Scope to see how different payment businesses earn revenue. These examples represent distinct roles rather than one identical business model.",

    items: [
      {
        slug: "visa",
        role:
          "Payment network example. Visa provides a network and related payment services connecting participants in electronic payments. Its payment volume is not the same as Visa's revenue, and Visa should not be treated as the card-issuing bank in a typical card transaction.",
      },
      {
        slug: "mastercard",
        role:
          "Payment network and value-added services example. Mastercard earns revenue from payment network activities and additional services. Its reported service mix should be examined separately rather than treating all revenue as basic transaction processing.",
      },
      {
        slug: "paypal",
        role:
          "Digital payment platform example. PayPal provides digital payment services to consumers and businesses. Its total reported revenue should not automatically be treated as revenue from one single payment service because its business includes different products and activities.",
      },
    ],
  },

  related: {
    sub:
      "Explore related business models to understand other services that may connect to payments.",

    slugs: [
      "banking",
      "e-commerce",
      "marketplace",
    ],
  },

  disclaimer: SCOPE_DISCLAIMER,
};

export default paymentsDetail;