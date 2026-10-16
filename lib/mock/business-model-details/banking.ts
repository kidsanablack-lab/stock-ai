import { SCOPE_DISCLAIMER, type BusinessModelDetail } from "./types";

export const BANKING_DETAIL: BusinessModelDetail = {
  slug: "banking",

  headline: "How Banks Make Money",

  description:
    "Banks connect people and businesses that have money with people and businesses that need money. They earn income primarily by lending and investing funds, while also generating fees from financial services. Understanding a bank requires looking at both its earnings and the risks on its balance sheet.",

  characteristics: {
    tags: [
      "Interest income",
      "Customer deposits",
      "Lending",
      "Financial services",
      "Credit risk",
      "Capital management",
    ],
    note:
      "Banks earn money by managing funding, lending, investments, and financial services. Their profitability depends on funding costs, credit quality, operating expenses, and risk management.",
  },

  whatIsIt: {
    sub: "Understanding the banking business model",
    paragraphs: [
      "A bank accepts deposits, provides loans, processes payments, and offers other financial services. It earns interest from loans and investments while paying interest on certain deposits and other funding.",
      "Banks can also generate fees from cards, payments, account services, wealth management, and investment banking. The importance of each revenue source varies by institution.",
      "A bank's total revenue is not the same as its profit. It must account for funding costs, operating expenses, credit losses, taxes, and other items.",
    ],
  },

  flow: {
    sub: "How money moves through a bank",
    steps: [
      {
        title: "Gather Funding",
        text:
          "A bank obtains funding through customer deposits and other sources. Deposits can be an important funding source, but attracting and retaining them may involve interest costs.",
        icon: "ti-building-bank",
        examples: [
          "Checking accounts",
          "Savings accounts",
          "Certificates of deposit",
        ],
      },
      {
        title: "Provide Loans and Services",
        text:
          "The bank uses funding and capital to support loans, investments, payments, and other financial services. Lending decisions require assessing borrowers' ability to repay.",
        icon: "ti-arrows-exchange",
        examples: [
          "Mortgages",
          "Business loans",
          "Credit cards",
        ],
      },
      {
        title: "Earn Interest and Fees",
        text:
          "The bank earns interest from loans and investments and may collect fees from payments, cards, account services, and other financial activities.",
        icon: "ti-coins",
        examples: [
          "Loan interest",
          "Card-related fees",
          "Service fees",
        ],
      },
      {
        title: "Cover Costs and Manage Risk",
        text:
          "The bank pays funding and operating costs, accounts for expected credit losses, and maintains sufficient capital and liquidity to support its obligations.",
        icon: "ti-shield-check",
        examples: [
          "Interest expense",
          "Credit loss provisions",
          "Technology and compliance costs",
        ],
      },
    ],
  },

  howItWorks: {
    sub: "The economics behind banking",
    intro:
      "A bank's earnings depend on how effectively it manages funding, lending, fees, expenses, and risk. Growing its loan book does not automatically mean the bank will become more profitable.",
    chain: [
      {
        title: "Attract funding",
        text:
          "Obtain customer deposits and other sources of funding to support the bank's activities.",
        tag: "Funding",
      },
      {
        title: "Make loans and investments",
        text:
          "Use funding and capital to support loans and investments while assessing potential returns and risks.",
        tag: "Assets",
      },
      {
        title: "Generate income",
        text:
          "Earn interest and fees from customers, borrowers, and financial activities.",
        tag: "Revenue",
      },
      {
        title: "Pay funding costs",
        text:
          "Pay interest on deposits and other borrowings, as well as the costs of operating the bank.",
        tag: "Expenses",
      },
      {
        title: "Account for losses",
        text:
          "Recognize credit losses and other expenses to determine how much profit remains.",
        tag: "Profit",
      },
    ],
    outro:
      "Banks must also maintain enough liquidity to meet withdrawals and other payment obligations. Deposits and loans are not simply interchangeable pools of cash, so banks must carefully manage the timing and risk of their assets and liabilities.",
  },

  whoPays: {
    sub: "Who generates revenue for a bank?",
    items: [
      {
        title: "Individual Customers",
        text:
          "People may pay interest on mortgages, personal loans, and credit card balances. Depending on the product and account, they may also pay account or transaction fees.",
        icon: "ti-user",
      },
      {
        title: "Businesses",
        text:
          "Companies borrow to fund operations and expansion, maintain accounts, process payments, and use services such as cash management and trade finance.",
        icon: "ti-building",
      },
      {
        title: "Cardholders and Merchants",
        text:
          "Card-related activities can generate fees for banks and other participants in the payments ecosystem. The amount and recipient of each fee depend on the product and transaction.",
        icon: "ti-credit-card",
      },
      {
        title: "Financial Market Participants",
        text:
          "Some banks earn revenue by providing investment banking, trading, securities, and other financial services. These activities are more significant at some banks than others.",
        icon: "ti-chart-line",
      },
    ],
  },

  makeMoney: {
    sub: "The main sources of banking revenue",
    items: [
      {
        title: "Net Interest Income",
        text:
          "Net interest income equals interest income minus interest expense. A bank earns interest on loans and investments while paying interest on certain deposits and borrowings. This is an important earnings source, but it is not the same as net profit.",
        icon: "ti-coins",
      },
      {
        title: "Net Interest Margin (NIM)",
        text:
          "NIM measures net interest income relative to average earning assets. It helps explain how effectively a bank generates net interest income from interest-earning assets. A higher NIM is not automatically better if it comes with excessive risk or high credit losses.",
        icon: "ti-chart-bar",
      },
      {
        title: "Noninterest Income",
        text:
          "Banks may earn fees from cards, payment processing, account services, wealth management, investment banking, and other activities. The mix varies considerably by institution.",
        icon: "ti-receipt",
      },
      {
        title: "Trading and Other Income",
        text:
          "Depending on its business mix, a bank may also report trading-related revenue or gains and losses on financial instruments. These results can fluctuate and may be less predictable than recurring customer fees.",
        icon: "ti-chart-candle",
      },
    ],
  },

  moneyGoes: {
    sub: "Where a bank's money goes",
    items: [
      {
        title: "Interest Expense",
        text:
          "Payments on interest-bearing deposits and other funding. Funding costs can rise when market rates increase or customers move money to accounts offering better rates.",
        icon: "ti-wallet",
      },
      {
        title: "Credit Losses",
        text:
          "Banks estimate potential losses on loans and certain other exposures. Provision expense reflects changes in estimated credit losses; it is not necessarily cash paid out immediately.",
        icon: "ti-alert-triangle",
      },
      {
        title: "Operating Expenses",
        text:
          "Employee compensation, branches, technology, cybersecurity, payment infrastructure, and day-to-day operations.",
        icon: "ti-building",
      },
      {
        title: "Compliance and Risk Management",
        text:
          "Spending on regulatory compliance, fraud prevention, internal controls, legal requirements, and risk oversight.",
        icon: "ti-shield-check",
      },
      {
        title: "Capital and Liquidity",
        text:
          "Banks must maintain appropriate capital and liquid resources to support their obligations and absorb losses. These are important balance-sheet considerations, not simply ordinary operating expenses.",
        icon: "ti-scale",
      },
    ],
  },

  growth: {
    drivers: {
      title: "What Can Drive Growth?",
      items: [
        "Loan growth: lending to creditworthy households and businesses can increase interest income, provided returns justify the risks and costs.",
        "Deposit relationships: attracting and retaining customer deposits can support funding, but the bank must consider how much those deposits cost.",
        "Net interest margin: changes in loan yields, investment returns, and funding costs can affect net interest income.",
        "Fee-based services: expanding payments, cards, wealth management, and business services can diversify revenue.",
        "Customer relationships: strong service, useful digital products, and a broad range of financial services can help retain customers.",
      ],
    },
    opportunities: {
      title: "Where Can Opportunities Come From?",
      items: [
        "Digital banking can make everyday services more convenient and improve how banks serve customers.",
        "Growing businesses may need more loans, payment services, and cash-management solutions.",
        "Customers may use more services from a bank they already trust, creating opportunities for additional fee income.",
        "Better risk assessment and fraud detection may improve decision-making and reduce avoidable losses.",
      ],
    },
    callout:
      "Growth is not guaranteed to create value. A bank can increase lending and revenue while also taking on more credit risk, paying more for funding, or incurring higher operating costs.",
  },

  strength: {
    title: "What Can Make a Bank Competitive?",
    sub:
      "Potential advantages depend on how consistently the bank serves customers while managing risk.",
    items: [
      {
        title: "Low-Cost, Stable Funding",
        text:
          "A strong base of customer deposits may give a bank a funding advantage, although deposit stability and cost can change with market conditions.",
        icon: "ti-building-bank",
      },
      {
        title: "Credit Underwriting",
        text:
          "The ability to evaluate borrowers and price loans appropriately can help a bank earn returns that compensate for expected and unexpected losses.",
        icon: "ti-checkup-list",
      },
      {
        title: "Customer Relationships",
        text:
          "Trusted relationships with individuals and businesses can support retention and the use of multiple banking services.",
        icon: "ti-users",
      },
      {
        title: "Scale and Infrastructure",
        text:
          "Technology, payment networks, data, and operational infrastructure can support a large customer base, although maintaining them also costs money.",
        icon: "ti-network",
      },
      {
        title: "Risk Management",
        text:
          "Disciplined management of credit, interest rates, liquidity, and capital can help a bank remain resilient through changing economic conditions.",
        icon: "ti-shield-check",
      },
    ],
  },

  competition: {
    compete: {
      title: "How Banks Compete",
      items: [
        "Deposit rates and the cost of attracting funding.",
        "Loan pricing and the ability to assess borrower risk.",
        "Customer service, convenience, and digital banking experiences.",
        "Breadth of services for individuals and businesses.",
        "Trust, established relationships, and operational reliability.",
      ],
    },
    challenges: {
      title: "Competitive Challenges",
      items: [
        "Competition can pressure loan yields and increase the cost of attracting deposits.",
        "Banks compete with credit unions, specialist lenders, payment companies, and financial technology firms.",
        "Technology and cybersecurity require ongoing investment.",
        "Different institutions have different funding structures, regulatory obligations, and risk profiles, so their economics are not always directly comparable.",
      ],
    },
  },

  risks: {
    sub: "Banking can be profitable, but its balance sheet creates important risks.",
    items: [
      {
        title: "Credit Risk",
        text:
          "Borrowers may miss payments or default. Losses can rise when households or businesses face financial pressure or when collateral values decline.",
        icon: "ti-alert-triangle",
      },
      {
        title: "Interest Rate Risk",
        text:
          "Changes in market interest rates can affect loan income, deposit costs, the value of securities, and the relationship between a bank's assets and liabilities.",
        icon: "ti-chart-candle",
      },
      {
        title: "Liquidity Risk",
        text:
          "A bank may face pressure if customers withdraw deposits or other funding sources become unavailable faster than the bank can obtain cash without significant losses.",
        icon: "ti-droplet",
      },
      {
        title: "Funding Competition",
        text:
          "Customers may move deposits to competitors or higher-yielding alternatives. A bank may need to pay more to retain funding, reducing its net interest income.",
        icon: "ti-wallet",
      },
      {
        title: "Economic Downturns",
        text:
          "Weak economic conditions can reduce demand for some services and increase defaults, delinquencies, and credit loss provisions.",
        icon: "ti-trending-down",
      },
      {
        title: "Regulation and Capital Requirements",
        text:
          "Banks operate under extensive rules governing capital, liquidity, consumer protection, and risk management. Changes in requirements can affect costs and business decisions.",
        icon: "ti-scale",
      },
      {
        title: "Operational and Cybersecurity Risk",
        text:
          "Fraud, cyberattacks, system failures, and internal control weaknesses can cause financial losses, service disruption, and damage to customer trust.",
        icon: "ti-lock",
      },
      {
        title: "Business Mix and Market Exposure",
        text:
          "Banks with substantial trading, investment banking, or wealth-management activities may face additional market-related or cyclical risks beyond traditional deposits and lending.",
        icon: "ti-chart-bar",
      },
    ],
  },

  metrics: {
    sub:
      "Metrics that help explain a bank's performance. No single metric tells the whole story.",
    items: [
      {
        label: "Net Interest Income",
        fullName: "Interest Income Minus Interest Expense",
        text:
          "What it measures: interest income minus interest expense. Why it matters: it shows the net income generated from interest-bearing activities. Limitation: it does not include all revenue or expenses, and changes in the size of a bank can affect the total.",
        icon: "ti-coins",
      },
      {
        label: "NIM",
        fullName: "Net Interest Margin",
        text:
          "What it measures: net interest income relative to average earning assets. Why it matters: it helps explain the economics of lending and funding. Limitation: calculation methods and business mixes may differ, and a higher NIM alone does not establish better risk-adjusted performance.",
        icon: "ti-chart-bar",
      },
      {
        label: "ROA",
        fullName: "Return on Assets",
        text:
          "What it measures: net income relative to average assets. Why it matters: it indicates how effectively the bank generates profit from its asset base. Limitation: it can be affected by unusual items, leverage, and differences in business mix.",
        icon: "ti-chart-pie",
      },
      {
        label: "ROE",
        fullName: "Return on Equity",
        text:
          "What it measures: net income relative to average shareholders' equity. Why it matters: it shows the return generated on accounting equity. Limitation: leverage and changes in equity can raise or lower ROE, so a higher result does not automatically mean a safer or stronger bank.",
        icon: "ti-trending-up",
      },
      {
        label: "Efficiency Ratio",
        text:
          "What it measures: operating expenses relative to operating revenue, with the precise calculation depending on the reporting convention. Why it matters: it helps show how much revenue is absorbed by overhead. Limitation: definitions and exclusions may differ, so check how each bank calculates it. Under commonly used conventions, a lower ratio generally indicates greater efficiency.",
        icon: "ti-gauge",
      },
      {
        label: "NPLs",
        fullName: "Nonperforming Loans",
        text:
          "What it measures: loans classified as nonperforming under the institution's reporting definitions. Why it matters: it can indicate deterioration in credit quality. Limitation: definitions and thresholds vary, and NPLs alone do not capture every expected or potential credit loss.",
        icon: "ti-alert-triangle",
      },
      {
        label: "Provision for Credit Losses",
        text:
          "What it measures: the expense recorded for estimated credit losses during a reporting period. Why it matters: increases can signal that expected losses are rising. Limitation: it is an accounting estimate that can change with economic forecasts, portfolio composition, and accounting rules; it is not identical to actual charge-offs or immediate cash outflows.",
        icon: "ti-report-money",
      },
      {
        label: "Capital Ratios",
        text:
          "What they measure: regulatory capital relative to risk-weighted assets or other specified measures. Why they matter: capital provides a buffer against losses and supports resilience. Limitation: the relevant ratios depend on regulatory definitions, risk weights, and the bank's activities. Compare equivalent measures and consider liquidity as well.",
        icon: "ti-shield-check",
      },
    ],
    callout:
      "Compare banks with similar business mixes and use consistent reporting periods and definitions. A retail-focused bank, a global investment bank, and a bank with substantial trading activities can have very different financial profiles.",
  },

  companies: {
    sub: "An example from Scope's company database",
    items: [
      {
        slug: "jpmorgan-chase",
        role:
          "JPMorgan Chase is a diversified financial institution with consumer and business banking, lending, cards, payments, and other financial businesses. It illustrates how a large bank can combine traditional banking with other financial services. Its total revenue should not be treated as revenue from traditional deposits and lending alone.",
      },
    ],
  },

  related: {
    sub: "Explore related business models",
    slugs: ["payments", "financial-services"],
  },

  disclaimer: SCOPE_DISCLAIMER,
};