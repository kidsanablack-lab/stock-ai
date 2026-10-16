import {
  SCOPE_DISCLAIMER,
  type BusinessModelDetail,
} from "./types";

export const INSURANCE_DETAIL: BusinessModelDetail = {
  slug: "insurance",

  headline:
    "How Insurance Companies Turn Risk Protection into a Business",

  description:
    "Insurance companies collect premiums in exchange for taking on defined financial risks. They aim to price those risks accurately, pay legitimate claims, control operating costs, and earn investment income while maintaining enough capital to meet future obligations.",

  characteristics: {
    tags: [
      "Risk pooling",
      "Premiums",
      "Claims",
      "Underwriting",
      "Investment income",
    ],
    note:
      "Insurance is not one uniform business model. Property and casualty, life, health, and reinsurance businesses have different contracts, cost structures, and financial metrics. Their common challenge is estimating uncertain future obligations while remaining financially strong enough to pay them.",
  },

  whatIsIt: {
    sub: "Customers pay for financial protection against specified risks.",

    paragraphs: [
      "An insurance company agrees to provide financial protection under the terms of an insurance policy. In exchange, the policyholder pays a premium. If a covered event occurs, the insurer may need to pay a claim or provide a benefit, subject to the policy's conditions, exclusions, limits, and deductibles.",

      "The insurer must estimate how likely claims are to occur, how expensive they may become, and when the money will be needed. This process is called underwriting. Setting premiums too low can lead to losses; setting them too high can make the insurer less competitive.",

      "Insurers may also invest money they hold, subject to their obligations and applicable rules. Investment income can contribute to earnings, but it does not eliminate the need to price insurance risk properly or maintain sufficient capital.",

      "Different insurance businesses operate differently. Property and casualty insurance commonly covers risks such as car accidents and property damage. Life insurance provides benefits associated with a covered person's death or other specified events. Health insurance helps cover eligible healthcare costs. Reinsurance allows one insurer to transfer part of its risk to another insurer.",
    ],
  },

  flow: {
    sub: "From assessing risk to paying claims and managing financial obligations.",

    steps: [
      {
        title: "Assess the risk",
        text:
          "Evaluate the applicant, the type of coverage requested, the likelihood of a claim, and the potential cost of that claim.",
        icon: "ti-shield-check",
        examples: [
          "An auto insurer evaluates driving and vehicle risk.",
          "A life insurer assesses factors relevant to mortality risk.",
        ],
      },
      {
        title: "Price the policy",
        text:
          "Set a premium intended to cover expected claims, operating expenses, risk uncertainty, and an appropriate return while remaining competitive.",
        icon: "ti-calculator",
        examples: [
          "Higher expected claim costs may require higher premiums.",
          "Policy deductibles and coverage limits affect the insurer's exposure.",
        ],
      },
      {
        title: "Collect premiums",
        text:
          "Receive payments according to the policy's terms. Premium cash received is not automatically the same as revenue earned during that period.",
        icon: "ti-cash",
        examples: [
          "A customer pays for auto coverage.",
          "A business pays for property or liability coverage.",
        ],
      },
      {
        title: "Handle claims and obligations",
        text:
          "Investigate claims, determine coverage, pay eligible claims or benefits, and estimate amounts that remain payable in the future.",
        icon: "ti-file-invoice",
        examples: [
          "An insurer pays for covered vehicle damage.",
          "A life insurer pays a death benefit when policy conditions are satisfied.",
        ],
      },
      {
        title: "Manage capital and investments",
        text:
          "Invest assets while considering the timing and uncertainty of future claims, liquidity needs, investment risks, and regulatory requirements.",
        icon: "ti-chart-line",
        examples: [
          "An insurer holds liquid assets for expected claim payments.",
          "Investment portfolios are managed in light of future obligations.",
        ],
      },
    ],
  },

  howItWorks: {
    sub: "The economics depend on pricing risk, controlling claims, and managing obligations over time.",

    intro:
      "Insurance companies make promises about uncertain future events. Their financial performance depends on how accurately they estimate those events and how well they manage the resulting obligations.",

    chain: [
      {
        title: "Estimate",
        text:
          "Use historical experience, relevant data, actuarial models, and other information to estimate future claims and expenses.",
        tag: "Risk analysis",
      },
      {
        title: "Price",
        text:
          "Set premiums that reflect expected claims, expenses, uncertainty, and competitive conditions.",
        tag: "Premiums",
      },
      {
        title: "Underwrite",
        text:
          "Choose which risks to accept and under what policy terms, coverage limits, and pricing.",
        tag: "Risk selection",
      },
      {
        title: "Manage",
        text:
          "Handle claims, control expenses, establish appropriate reserves, and use reinsurance where suitable.",
        tag: "Operations",
      },
      {
        title: "Evaluate",
        text:
          "Assess underwriting results, investment performance, capital strength, and the ability to meet future obligations.",
        tag: "Financial health",
      },
    ],

    outro:
      "Good results in one period do not guarantee future profitability. Claims can emerge later than expected, severe events can create unusually large losses, and investment values can change.",
  },

  whoPays: {
    sub: "Insurance customers pay premiums in exchange for protection under defined policy terms.",

    items: [
      {
        title: "Individuals and families",
        text:
          "Buy products such as auto, home, life, health, and other personal insurance policies.",
        icon: "ti-users",
      },
      {
        title: "Businesses",
        text:
          "Purchase property, liability, workers' compensation, commercial auto, and other coverage to manage business risks.",
        icon: "ti-building",
      },
      {
        title: "Organizations and institutions",
        text:
          "Arrange coverage for specific operational, property, employee, or liability exposures.",
        icon: "ti-building-community",
      },
      {
        title: "Other insurance companies",
        text:
          "Purchase reinsurance to transfer an agreed portion of their insurance risk to another insurer or reinsurer.",
        icon: "ti-arrows-exchange",
      },
    ],
  },

  makeMoney: {
    sub: "Underwriting results and investment income are separate sources of financial performance.",

    items: [
      {
        title: "Underwriting profit",
        text:
          "An insurer may earn an underwriting profit when the premiums earned from its policies exceed the claims and underwriting expenses associated with those policies. Underwriting can also produce a loss.",
        icon: "ti-chart-bar",
      },
      {
        title: "Investment income",
        text:
          "Insurers invest assets in accordance with their obligations and applicable requirements. Interest, dividends, and other investment returns may contribute to earnings, although investment performance is uncertain.",
        icon: "ti-chart-line",
      },
      {
        title: "Risk selection and pricing",
        text:
          "Better risk assessment and appropriately priced policies can improve underwriting results. However, models are imperfect, competitors affect pricing, and actual claims may differ from estimates.",
        icon: "ti-target",
      },
      {
        title: "Operational efficiency",
        text:
          "Efficient policy administration, distribution, fraud detection, and claims handling can reduce expenses without necessarily compromising service or legitimate claim payments.",
        icon: "ti-settings",
      },
    ],
  },

  moneyGoes: {
    sub: "Premiums help fund claims, operating costs, and the insurer's ability to meet future obligations.",

    items: [
      {
        title: "Claims and policy benefits",
        text:
          "Payments for covered losses, medical expenses, property damage, death benefits, and other obligations defined by insurance contracts.",
        icon: "ti-file-invoice",
      },
      {
        title: "Claims administration",
        text:
          "Costs of investigating claims, assessing damages, processing payments, detecting fraud, and resolving disputes.",
        icon: "ti-search",
      },
      {
        title: "Distribution and acquisition",
        text:
          "Commissions, marketing, and other costs associated with attracting customers and issuing policies.",
        icon: "ti-speakerphone",
      },
      {
        title: "Operating expenses",
        text:
          "Employee compensation, technology, customer service, compliance, facilities, and other costs of running the business.",
        icon: "ti-building",
      },
      {
        title: "Reinsurance costs",
        text:
          "Premiums paid to reinsurers in exchange for transferring an agreed portion of insurance risk. Reinsurance can reduce exposure but does not remove every risk.",
        icon: "ti-shield-check",
      },
      {
        title: "Capital and liquidity",
        text:
          "Assets and capital needed to support insurance obligations, absorb unexpected losses, satisfy applicable requirements, and pay claims when due.",
        icon: "ti-lock",
      },
    ],
  },

  growth: {
    drivers: {
      title: "What Drives Growth?",
      items: [
        "Policy growth: attracting more customers or expanding coverage among existing customers.",
        "Premium pricing: adjusting prices to reflect changes in expected claims, expenses, and risk.",
        "Customer retention: keeping customers through competitive products and reliable service.",
        "Distribution: reaching customers through agents, brokers, partnerships, or digital channels.",
        "Risk selection: identifying and pricing risks more accurately.",
        "Operational efficiency: improving policy administration and claims handling.",
        "Investment management: managing assets in a way that fits the insurer's obligations and risk tolerance.",
      ],
    },

    opportunities: {
      title: "Where Opportunities Can Come From",
      items: [
        "Insurance needs may increase as economies grow and more assets, businesses, and activities require protection.",
        "New products can address risks that are underserved or changing.",
        "Better data and technology may improve pricing, customer service, and fraud detection.",
        "Digital distribution can make certain products easier to access and administer.",
        "Specialized underwriting knowledge may help insurers serve particular customer groups or risk categories.",
        "Reinsurance can help insurers manage concentrations of risk and support selected growth opportunities.",
      ],
    },

    callout:
      "Growth in premiums does not automatically mean growth in profit. An insurer can expand rapidly while accepting underpriced risks, increasing expenses, or creating future claim obligations that exceed expectations.",
  },

  strength: {
    title: "Potential Competitive Advantages",
    sub:
      "An insurer's competitive position depends on its ability to assess risk, serve customers, and remain financially resilient.",

    items: [
      {
        title: "Underwriting expertise",
        text:
          "A strong understanding of particular risks may help an insurer select policies and set prices more accurately than competitors.",
        icon: "ti-brain",
      },
      {
        title: "Claims management",
        text:
          "Reliable, efficient claims handling can improve customer experience and control avoidable costs while honoring valid policy obligations.",
        icon: "ti-clipboard-check",
      },
      {
        title: "Distribution network",
        text:
          "Established agents, brokers, partnerships, or direct channels can help an insurer reach customers and renew policies.",
        icon: "ti-network",
      },
      {
        title: "Data and experience",
        text:
          "Relevant historical data and disciplined analysis may improve risk estimates, although past experience cannot predict every future event.",
        icon: "ti-database",
      },
      {
        title: "Scale and efficiency",
        text:
          "A larger operation may spread some technology, administration, and compliance costs across more policies. Scale alone does not guarantee better underwriting.",
        icon: "ti-chart-bar",
      },
      {
        title: "Capital and reinsurance access",
        text:
          "Financial strength and access to suitable reinsurance may help an insurer absorb losses and manage exposure to unusually severe events.",
        icon: "ti-shield-check",
      },
    ],
  },

  competition: {
    compete: {
      title: "How Insurance Companies Compete",
      items: [
        "Price and policy terms: offer competitive premiums, deductibles, coverage limits, and exclusions.",
        "Service quality: make it easier to obtain coverage, renew policies, and receive help with claims.",
        "Distribution: build effective agent, broker, partner, or direct-sales channels.",
        "Risk expertise: specialize in customer groups or exposures that the insurer understands well.",
        "Trust and reputation: demonstrate reliability when policyholders need the protection they purchased.",
        "Financial strength: maintain the ability to meet obligations through difficult periods.",
      ],
    },

    challenges: {
      title: "Why Competition Can Be Difficult",
      items: [
        "Lower premiums can attract customers but may be inadequate if expected claims are underestimated.",
        "Claims experience can deteriorate after policies are priced and sold.",
        "Customers may compare prices easily, putting pressure on margins in some markets.",
        "Established distribution relationships, regulatory requirements, and capital needs can create barriers to entry.",
        "A competitor's growth or pricing strategy may not be sustainable, even if it initially gains market share.",
      ],
    },
  },

  risks: {
    sub: "Insurance companies must manage uncertainty in both their liabilities and their assets.",

    items: [
      {
        title: "Underpricing risk",
        text:
          "If premiums are insufficient to cover eventual claims and expenses, the insurer may generate underwriting losses. Strong sales can hide weak pricing discipline.",
        icon: "ti-trending-down",
      },
      {
        title: "Catastrophe risk",
        text:
          "Events such as hurricanes, wildfires, floods, and other disasters can cause large losses across many policies at the same time. The exposure depends on the insurer's products and geographic concentration.",
        icon: "ti-cloud-storm",
      },
      {
        title: "Claims inflation",
        text:
          "Repair costs, medical expenses, legal costs, wages, and replacement prices can rise faster than expected, increasing the cost of claims.",
        icon: "ti-chart-line",
      },
      {
        title: "Reserve estimation risk",
        text:
          "Insurers estimate the cost of claims that have occurred but have not yet been fully paid or settled. If the estimates prove too low, later adjustments can reduce earnings.",
        icon: "ti-calculator",
      },
      {
        title: "Investment risk",
        text:
          "Changes in interest rates, credit quality, market prices, and other investment conditions can affect asset values and income. The impact depends on the portfolio and the insurer's obligations.",
        icon: "ti-chart-bar",
      },
      {
        title: "Regulatory and capital risk",
        text:
          "Insurers operate under rules governing areas such as capital, reserves, products, and customer protection. Changes in requirements or a deterioration in financial strength may constrain operations.",
        icon: "ti-scale",
      },
      {
        title: "Reinsurance and counterparty risk",
        text:
          "An insurer that transfers risk to a reinsurer may still face exposure if the reinsurer cannot pay, coverage disputes arise, or the contract does not cover the loss as expected.",
        icon: "ti-arrows-exchange",
      },
      {
        title: "Competition and retention risk",
        text:
          "Competitors may offer lower prices or better terms, making it harder to retain customers. Matching those offers without sound risk pricing can damage profitability.",
        icon: "ti-users",
      },
    ],
  },

  metrics: {
    sub:
      "These metrics help explain insurance economics, but definitions and usefulness differ by insurance type and company reporting practices.",

    items: [
      {
        label: "Premiums Written",
        fullName: "Gross or Net Premiums Written",
        text:
          "The premiums associated with policies issued or renewed during a period. Gross premiums are measured before certain reinsurance effects; net premiums written reflect the relevant reinsurance adjustments. This measures insurance business produced, not necessarily revenue earned during the same period or cash collected.",
        icon: "ti-file-invoice",
      },
      {
        label: "Premiums Earned",
        fullName: "Earned Premiums",
        text:
          "The portion of premiums recognized as relating to insurance coverage provided during a period. Premiums may be collected before all the related coverage has been provided, so premiums earned and cash received are not the same measure.",
        icon: "ti-calendar",
      },
      {
        label: "Loss Ratio",
        fullName: "Loss Ratio",
        text:
          "Generally, incurred claims and related loss-adjustment expenses divided by earned premiums, subject to the company's definition. A lower ratio can indicate better claims experience relative to premiums, but it should be interpreted alongside pricing, reserve development, and coverage mix.",
        icon: "ti-chart-pie",
      },
      {
        label: "Expense Ratio",
        fullName: "Expense Ratio",
        text:
          "Generally, underwriting or operating expenses associated with acquiring and servicing policies divided by a specified premium measure. Definitions vary, so comparisons require checking whether companies use the same expense categories and premium denominator.",
        icon: "ti-receipt",
      },
      {
        label: "Combined Ratio",
        fullName: "Combined Ratio",
        text:
          "For property and casualty insurance, the combined ratio generally combines the loss ratio and expense ratio. Below 100% usually indicates an underwriting profit; above 100% usually indicates an underwriting loss, under the relevant definitions. It does not include investment income and is not a universal performance measure for every type of insurer.",
        icon: "ti-chart-bar",
      },
      {
        label: "Underwriting Profit",
        fullName: "Underwriting Result",
        text:
          "The result from insurance operations before investment results and other items excluded by the company's definition. It helps distinguish the economics of accepting insurance risk from returns earned on invested assets.",
        icon: "ti-report-money",
      },
      {
        label: "Investment Income",
        fullName: "Investment Income and Returns",
        text:
          "Income or returns generated by invested assets, depending on the reported measure. Interest and dividends are different from realized or unrealized investment gains and losses, so the exact definition matters when comparing companies.",
        icon: "ti-chart-line",
      },
      {
        label: "Claims Reserves",
        fullName: "Claims Liabilities and Reserves",
        text:
          "Estimates of amounts needed to settle claims and related obligations. These estimates are uncertain and may change as more information becomes available. A large reserve balance is not automatically a sign of weakness; it must be assessed relative to the insurer's business, claims exposure, and assumptions.",
        icon: "ti-building-bank",
      },
    ],

    callout:
      "Do not compare insurance companies using one metric alone. Product mix, accounting definitions, reinsurance arrangements, reserve assumptions, and investment portfolios can materially affect reported results. The combined ratio is especially useful for many property and casualty insurers, but it should not be treated as a universal measure across life, health, and reinsurance businesses.",
  },

  companies: {
    sub:
      "Berkshire Hathaway illustrates how a large diversified group can operate several different insurance businesses alongside non-insurance businesses.",

    items: [
      {
        slug: "berkshire-hathaway",
        role:
          "Diversified holding company with major insurance operations, including GEICO, Berkshire Hathaway Primary Group, and Berkshire Hathaway Reinsurance Group. GEICO primarily provides private passenger auto insurance; the other groups operate across additional insurance and reinsurance markets. Berkshire also has substantial non-insurance businesses and investment activities, so its overall financial results should not be interpreted as the results of a pure-play insurer.",
      },
    ],
  },

  related: {
    sub:
      "Explore another financial business model and compare how its economics differ from insurance.",

    slugs: ["banking"],
  },

  disclaimer: SCOPE_DISCLAIMER,
};