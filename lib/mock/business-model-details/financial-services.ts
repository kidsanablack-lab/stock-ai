import {
  SCOPE_DISCLAIMER,
  type BusinessModelDetail,
} from "./types";

export const financialServicesDetail: BusinessModelDetail = {
  slug: "financial-services",

  headline: "Turning Financial Expertise into Business Value",

  description:
    "Financial services companies help individuals, businesses, and institutions manage assets, raise capital, trade financial instruments, and make financial decisions. Depending on their activities, they may earn advisory fees, asset management fees, transaction commissions, or other service revenue. Their economics depend on the services they provide, the customers they serve, and the risks they take.",

  characteristics: {
    tags: [
      "Fee-based revenue",
      "Financial expertise",
      "Client relationships",
      "Capital markets",
      "Regulated activities",
      "Multiple revenue streams",
    ],
    note:
      "Financial services is a broad category rather than one uniform business model. An asset manager, investment bank, and financial adviser can have very different revenue sources, cost structures, and risks. Analyze each company's actual activities instead of assuming that all its revenue comes from the same model.",
  },

  whatIsIt: {
    sub:
      "Understand how financial services companies help customers make decisions, manage assets, and access financial markets.",

    paragraphs: [
      "Financial services companies provide expertise, technology, and services that help people and organizations manage money and financial activities. Depending on the company, customers may need investment management, financial advice, securities trading, help raising capital, or support with complex financial transactions.",

      "An investment bank may advise a company that wants to acquire another business or raise money by issuing shares or bonds. An asset manager invests money on behalf of clients according to an agreed strategy. A wealth manager may help individuals plan their finances, manage investments, and coordinate other financial needs. These businesses serve different customer problems even though they all operate in financial services.",

      "Many financial services businesses earn fees for expertise or ongoing services. For example, an asset manager may charge a fee based on the assets it manages, while an investment bank may earn fees for completing a transaction. A brokerage business may earn commissions or other revenue from customer trading activity, depending on its pricing model.",

      "The customer paying for a service is not always the person whose money is being managed. An investment fund may pay a management company to manage its portfolio, while individual investors own interests in the fund. Similarly, a company seeking advice on a transaction may pay an investment bank for its work.",

      "Financial services companies may also earn revenue from activities that involve market exposure, financing, or other financial risks. Those activities should be distinguished from fee-based services because they can have different economic drivers and may produce more volatile results.",

      "The central business question is whether a company can attract and retain customers, provide services they value, earn sufficient revenue to cover its costs, and manage the risks associated with its particular activities. A respected financial services business is not automatically a good investment at every share price.",
    ],
  },

  flow: {
    sub:
      "Follow a simplified example of how a financial services company provides a service and earns revenue. The actual process depends on the type of service.",

    steps: [
      {
        title: "A Customer Has a Financial Need",
        text:
          "An individual, business, or institution needs help managing assets, raising capital, trading securities, or completing a financial transaction.",
        icon: "ti-user",
        examples: [
          "An individual seeks help managing investments",
          "A company plans to raise capital",
          "An institution needs a portfolio managed",
        ],
      },
      {
        title: "The Provider Offers a Service",
        text:
          "The financial services company agrees to provide a defined service, such as investment management, transaction advice, or brokerage access.",
        icon: "ti-briefcase",
        examples: [
          "Manage a client's investment portfolio",
          "Advise on a potential acquisition",
          "Provide access to securities trading",
        ],
      },
      {
        title: "The Service Creates Customer Value",
        text:
          "The provider applies its expertise, systems, relationships, and processes to help the customer address the agreed financial need. The outcome is not guaranteed.",
        icon: "ti-bulb",
        examples: [
          "Research investments and manage a portfolio",
          "Analyze a proposed business transaction",
          "Execute a securities order",
        ],
      },
      {
        title: "The Company Earns Revenue",
        text:
          "The provider receives fees, commissions, or other contractually agreed revenue. The amount and timing depend on the service and the terms of the agreement.",
        icon: "ti-receipt",
        examples: [
          "Charge an asset management fee",
          "Earn an advisory fee for a transaction",
          "Receive a brokerage commission where applicable",
        ],
      },
      {
        title: "The Company Pays Its Operating Costs",
        text:
          "The provider pays employees, technology expenses, compliance costs, and other expenses required to deliver the service. Some businesses also face market, credit, or financing risks.",
        icon: "ti-settings",
        examples: [
          "Pay investment professionals and support staff",
          "Maintain technology and research systems",
          "Fund compliance and risk management",
        ],
      },
      {
        title: "The Company Measures Its Results",
        text:
          "Management evaluates revenue, expenses, profitability, customer relationships, and risk measures appropriate to the business.",
        icon: "ti-chart-line",
        examples: [
          "Track fee revenue and operating margins",
          "Monitor assets under management",
          "Review capital, liquidity, or risk measures when relevant",
        ],
      },
    ],
  },

  howItWorks: {
    sub:
      "Financial services companies connect customer needs with specialized expertise, financial products, and access to markets.",

    intro:
      "Imagine a business that wants to acquire a competitor. It may need advice on valuation, financing options, transaction structure, and negotiations. An investment bank may provide some of these services under an agreed engagement and earn a fee. This is one example of financial services; asset management and wealth management work through different customer relationships and revenue arrangements.",

    chain: [
      {
        title: "Identify the Customer's Need",
        text:
          "The provider determines what the customer needs and whether its services and expertise are appropriate for that task.",
        tag: "Customer Need",
      },
      {
        title: "Agree on the Service",
        text:
          "The parties establish the scope of work, responsibilities, pricing, and other contractual terms. Some services are ongoing, while others relate to a specific transaction.",
        tag: "Engagement",
      },
      {
        title: "Deliver Expertise or Access",
        text:
          "The company uses its people, research, systems, relationships, and processes to deliver the agreed service.",
        tag: "Service Delivery",
      },
      {
        title: "Recognize Revenue",
        text:
          "Revenue is recognized according to the applicable accounting rules and contract. Cash may be collected at a different time, and not every engagement results in a completed transaction.",
        tag: "Revenue",
      },
      {
        title: "Manage Costs and Risk",
        text:
          "The company pays the costs of serving customers and manages the operational, regulatory, reputational, and financial risks relevant to its activities.",
        tag: "Economics",
      },
    ],

    outro:
      "A fee-based service does not necessarily eliminate financial risk. Revenue can fall when customer assets decline, transaction activity slows, or customers reduce spending. Some financial services businesses also undertake activities that expose them directly to market, credit, or funding risks.",
  },

  whoPays: {
    sub:
      "The paying customer depends on the service being provided and the contractual arrangement.",

    items: [
      {
        title: "Individuals and Families",
        text:
          "Individuals may pay for financial planning, investment advice, wealth management, brokerage, or related services. Pricing may be based on a fixed fee, an ongoing arrangement, assets managed, or transactions, depending on the provider.",
        icon: "ti-user",
      },
      {
        title: "Institutional Investors",
        text:
          "Pension funds, investment funds, foundations, and other institutions may pay asset managers or specialist advisers to manage assets or provide financial expertise. The mandate determines the service and fee structure.",
        icon: "ti-building-bank",
      },
      {
        title: "Businesses and Corporations",
        text:
          "Companies may pay financial advisers and investment banks for services related to mergers and acquisitions, capital raising, restructuring, or other financial transactions. Fees and payment timing depend on the engagement.",
        icon: "ti-building",
      },
      {
        title: "Investment Funds",
        text:
          "An investment fund may pay a management company to manage its portfolio. The management fee is governed by the fund's arrangements and may depend on assets managed or other agreed terms.",
        icon: "ti-chart-pie",
      },
      {
        title: "Trading and Brokerage Customers",
        text:
          "Customers may pay commissions, account fees, or other charges for brokerage services. Some providers use different pricing arrangements, so the presence and size of commissions must be checked rather than assumed.",
        icon: "ti-arrows-exchange",
      },
      {
        title: "Financial Institutions and Other Organizations",
        text:
          "Banks, insurers, asset owners, and other institutions may purchase research, advisory, administration, or specialist financial services. The exact customer and revenue source vary by provider.",
        icon: "ti-briefcase",
      },
    ],
  },

  makeMoney: {
    sub:
      "Financial services companies can earn revenue by managing assets, advising on transactions, facilitating trading, and providing specialized expertise.",

    items: [
      {
        title: "Asset Management Fees",
        text:
          "An asset manager may charge a fee for managing investments on behalf of clients. The fee may be calculated using assets under management, a contractual rate, or another agreed basis. Revenue can change when asset values, client flows, or fee rates change.",
        icon: "ti-chart-pie",
      },
      {
        title: "Wealth Management Fees",
        text:
          "Wealth managers may earn fees for investment management, financial planning, advisory services, or other services offered to clients. The revenue mix depends on the provider's services and customer agreements.",
        icon: "ti-users",
      },
      {
        title: "Investment Banking Advisory Fees",
        text:
          "Investment banks may advise on mergers, acquisitions, divestitures, and other corporate transactions. Fees may depend on the agreed engagement and may be linked to milestones or transaction completion. A proposed deal does not guarantee that a fee will be earned.",
        icon: "ti-handshake",
      },
      {
        title: "Capital Markets Fees",
        text:
          "Companies raising money through equity or debt issuance may hire financial institutions to arrange or support the transaction. Providers may earn underwriting, placement, or related fees, subject to the transaction structure and contractual terms.",
        icon: "ti-building-bank",
      },
      {
        title: "Brokerage Commissions and Trading Services",
        text:
          "A brokerage business may earn commissions or other fees for facilitating securities transactions and related services. Pricing varies across providers and markets, and transaction-based revenue can be affected by customer activity and competitive pricing.",
        icon: "ti-arrows-exchange",
      },
      {
        title: "Performance-related Fees",
        text:
          "Some investment managers receive additional compensation when an investment strategy meets specified contractual conditions. These arrangements vary and may include hurdles, high-water marks, or other terms. Performance-related revenue can be uneven and should not be assumed for every asset manager.",
        icon: "ti-trending-up",
      },
      {
        title: "Research, Administration, and Other Services",
        text:
          "Some firms earn revenue from financial research, reporting, custody-related services, fund administration, technology, or specialist advisory work. Whether these services are material depends on the company's actual business mix and disclosures.",
        icon: "ti-file-text",
      },
      {
        title: "Market-related and Other Financial Revenue",
        text:
          "Some financial institutions earn revenue from trading, financing, or other activities involving financial instruments. Such revenue can depend on market conditions, client demand, risk exposure, and accounting treatment. It should be analyzed separately from recurring service fees where disclosures permit.",
        icon: "ti-chart-line",
      },
    ],
  },

  moneyGoes: {
    sub:
      "The main costs depend on whether a company primarily sells expertise, manages assets, facilitates transactions, or takes financial risk.",

    items: [
      {
        title: "Employee Compensation",
        text:
          "Financial services firms often need skilled professionals, including advisers, portfolio managers, analysts, traders, engineers, compliance specialists, and support staff. Compensation may be a significant operating expense, and some roles may include variable pay.",
        icon: "ti-users",
      },
      {
        title: "Technology and Data",
        text:
          "Companies may invest in trading systems, portfolio tools, financial data, cybersecurity, analytics, communications, and customer platforms. Technology costs vary with service complexity, scale, and the firm's operating model.",
        icon: "ti-server",
      },
      {
        title: "Research and Market Information",
        text:
          "Some businesses spend on financial data, economic research, company analysis, market information, and specialist tools. These expenses may support decision-making or customer services, but the level of spending differs by business.",
        icon: "ti-search",
      },
      {
        title: "Compliance and Regulation",
        text:
          "Financial services firms may need systems and personnel for licensing, reporting, client verification, recordkeeping, supervision, and other regulatory obligations. Requirements depend on the activities and jurisdictions involved.",
        icon: "ti-scale",
      },
      {
        title: "Sales and Client Relationships",
        text:
          "Firms may spend on client acquisition, relationship management, business development, and customer support. Maintaining trust and retaining customers can require ongoing investment in service quality.",
        icon: "ti-handshake",
      },
      {
        title: "Premises and Operations",
        text:
          "Office space, administration, communications, professional services, and other operating expenses support daily activities. The cost structure varies between firms with extensive physical operations and those using more digital delivery.",
        icon: "ti-building",
      },
      {
        title: "Financing and Market-related Costs",
        text:
          "Some businesses incur financing costs or expenses related to trading, hedging, and other financial activities. These costs are especially relevant when the company uses its balance sheet or undertakes market-facing activities, but they should not be assumed to apply equally to every adviser or asset manager.",
        icon: "ti-currency-dollar",
      },
      {
        title: "Risk Management and Losses",
        text:
          "Depending on the business, firms may incur costs or losses from operational failures, litigation, fraud, counterparty problems, credit exposure, or market movements. The scale and nature of these risks depend on the services provided and the responsibilities the firm accepts.",
        icon: "ti-shield-check",
      },
    ],
  },

  growth: {
    drivers: {
      title: "What Can Drive Growth?",
      items: [
        "Attracting additional clients who need investment management, financial advice, or transaction expertise.",
        "Increasing assets under management through net client inflows, investment performance, or changes in asset values.",
        "Expanding relationships with existing clients and providing additional services where there is genuine demand.",
        "Winning more advisory or capital markets mandates when companies undertake transactions or raise capital.",
        "Entering new customer segments or geographic markets when the firm has the expertise and permissions required.",
        "Improving technology and operating processes to deliver services more efficiently or improve the customer experience.",
        "Building specialist capabilities that address complex financial needs and can be delivered at attractive economics.",
      ],
    },

    opportunities: {
      title: "Where Can Opportunities Come From?",
      items: [
        "Growing demand for professional investment management and financial planning.",
        "Businesses seeking advice on mergers, acquisitions, restructuring, or capital raising.",
        "Institutions looking for specialist investment strategies or portfolio services.",
        "Clients seeking better digital access, reporting, analytics, or financial tools.",
        "Cross-selling relevant services to existing clients while maintaining suitable service standards.",
        "Operating improvements that reduce avoidable costs without weakening controls or customer service.",
      ],
    },

    callout:
      "Growth is not the same as improved profitability. Assets under management can rise because markets increase in value, while net client inflows remain weak. Advisory revenue can be cyclical, and expanding into new services may increase costs, complexity, or risk before it generates attractive returns.",
  },

  strength: {
    title: "Potential Competitive Advantages",
    sub:
      "Financial services firms may build advantages through expertise, trust, distribution, and client relationships. These advantages must be assessed using evidence about the specific company.",

    items: [
      {
        title: "Trust and Reputation",
        text:
          "Clients may be more willing to entrust sensitive financial decisions to a provider with a strong record of reliability and professional conduct. Reputation can take years to build and may be damaged by poor performance, misconduct, or conflicts of interest.",
        icon: "ti-shield-check",
      },
      {
        title: "Specialized Expertise",
        text:
          "Deep knowledge of particular industries, markets, investment strategies, or transaction types can help a firm solve difficult customer problems. Expertise is valuable only when customers recognize it and the firm can consistently deliver quality work.",
        icon: "ti-bulb",
      },
      {
        title: "Long-term Client Relationships",
        text:
          "Ongoing relationships can support repeat business and help providers understand customer needs. However, clients can still leave because of fees, service quality, performance, conflicts, or changes in their circumstances.",
        icon: "ti-users",
      },
      {
        title: "Distribution and Access",
        text:
          "Established relationships with corporations, investors, institutions, or financial intermediaries may help a firm reach customers and compete for mandates. The strength of this advantage depends on the durability and breadth of those relationships.",
        icon: "ti-network",
      },
      {
        title: "Scale and Operating Efficiency",
        text:
          "A larger firm may spread some technology, data, compliance, and administrative costs across a broader business. Scale does not guarantee better margins because larger firms may also face higher complexity, compensation, and control costs.",
        icon: "ti-chart-bar",
      },
      {
        title: "Integrated Services",
        text:
          "A firm that can provide several relevant services may be convenient for customers with complex needs. Integration can support retention, but only when the combined offering creates real value and does not introduce unacceptable conflicts or complexity.",
        icon: "ti-layers",
      },
      {
        title: "Data and Technology Capabilities",
        text:
          "Useful analytical tools, reliable systems, and effective client platforms can improve service delivery and operating efficiency. Technology is not automatically a durable advantage because competitors can invest in similar capabilities.",
        icon: "ti-device-desktop",
      },
    ],
  },

  competition: {
    compete: {
      title: "How Do Financial Services Firms Compete?",
      items: [
        "Quality and relevance of advice, investment management, or transaction expertise.",
        "Fees, pricing transparency, and the value delivered for the cost.",
        "Trust, professional standards, and the quality of client relationships.",
        "Investment processes, research capabilities, and service consistency where relevant.",
        "Access to customers, distribution channels, and specialist financial markets.",
        "Technology, reporting, execution quality, and ease of working with the provider.",
        "Ability to manage conflicts of interest and maintain effective risk controls.",
      ],
    },

    challenges: {
      title: "Why Can Competition Be Difficult?",
      items: [
        "Customers may compare fees closely and move to lower-cost alternatives.",
        "Investment performance can vary, and customers may leave after disappointing results.",
        "Advisory and capital markets activity can depend on broader economic and market conditions.",
        "Established firms compete with specialist providers and digital platforms.",
        "Experienced employees may be expensive to recruit and retain.",
        "Regulatory requirements and control systems can increase costs and operational complexity.",
        "Conflicts of interest or reputational damage can undermine customer trust.",
        "Technology changes can reduce the value of some traditional services or lower barriers to entry in particular activities.",
      ],
    },
  },

  risks: {
    sub:
      "Financial services companies face different risks depending on whether they manage client assets, advise on transactions, facilitate trading, or take financial exposure themselves.",

    items: [
      {
        title: "Market and Asset-value Risk",
        text:
          "Changes in financial markets can reduce client asset values, affect assets under management, and weaken some forms of revenue. Firms with direct market exposure may also face losses on their own positions. These effects differ by business model.",
        icon: "ti-chart-line",
      },
      {
        title: "Cyclical Transaction Activity",
        text:
          "Mergers, acquisitions, securities issuance, and trading activity can slow when economic conditions or market confidence weaken. Firms that rely heavily on transaction-related fees may experience uneven revenue across periods.",
        icon: "ti-trending-down",
      },
      {
        title: "Fee Pressure",
        text:
          "Customers may negotiate lower fees or choose lower-cost alternatives. If prices fall faster than operating costs, profitability can weaken even when the firm continues to serve many clients.",
        icon: "ti-currency-dollar",
      },
      {
        title: "Client Retention and Outflows",
        text:
          "Clients may withdraw assets, transfer accounts, or end advisory relationships because of performance, fees, service issues, or changing needs. For asset managers, outflows can reduce the assets on which fees are calculated.",
        icon: "ti-users",
      },
      {
        title: "Regulatory and Legal Risk",
        text:
          "Changes in regulation, licensing requirements, reporting obligations, or legal interpretations can increase costs or limit activities. Failures to meet applicable obligations may lead to penalties, litigation, or restrictions.",
        icon: "ti-scale",
      },
      {
        title: "Conflicts of Interest",
        text:
          "A firm may face conflicts between its own incentives and a customer's interests. Weak management of conflicts can harm customers, damage trust, create legal exposure, and undermine the firm's reputation.",
        icon: "ti-alert-triangle",
      },
      {
        title: "Operational and Cybersecurity Risk",
        text:
          "System outages, data breaches, fraud, inaccurate records, or process failures can disrupt services and cause financial or reputational damage. Strong controls are important, but they cannot eliminate every risk.",
        icon: "ti-shield-check",
      },
      {
        title: "Key-person and Talent Risk",
        text:
          "Some firms depend on experienced advisers, portfolio managers, research teams, or relationship managers. Losing key employees can affect customer relationships, service quality, and the ability to generate new business.",
        icon: "ti-user",
      },
      {
        title: "Credit, Counterparty, and Funding Risk",
        text:
          "Financial services firms that lend, finance transactions, trade derivatives, or rely on counterparties may face losses if another party fails to meet its obligations. Funding and liquidity risks are particularly relevant to businesses with balance-sheet exposures and should not be generalized to every advisory firm.",
        icon: "ti-building-bank",
      },
      {
        title: "Technology and Business-model Change",
        text:
          "Automation, digital platforms, new competitors, and changes in customer expectations may reduce demand for some traditional services. Firms may need to invest in new capabilities, and those investments may not generate the expected returns.",
        icon: "ti-device-desktop",
      },
    ],
  },

  metrics: {
    sub:
      "Choose metrics that match the company's actual business activities. Definitions, accounting treatment, and reporting scope can differ, so comparisons require care.",

    items: [
      {
        label: "Revenue",
        fullName: "Revenue Recognized During the Period",
        text:
          "Measures revenue recognized under the company's accounting policies. It helps assess business scale and growth, but revenue may combine advisory fees, asset management fees, commissions, trading-related income, and other activities. Review segment disclosures to understand the sources of growth.",
        icon: "ti-chart-line",
      },
      {
        label: "Assets Under Management",
        fullName: "Assets Under Management (AUM)",
        text:
          "Measures the value of assets a firm manages according to its reported definition. AUM can help indicate the scale of an asset management business and may influence fee revenue. It is not company revenue or company-owned assets. Market movements, client inflows, withdrawals, and reporting definitions can affect comparisons.",
        icon: "ti-chart-pie",
      },
      {
        label: "Net New Assets",
        fullName: "Net New Assets",
        text:
          "Measures the net assets clients add to or withdraw from a business over a period, based on the company's definition. It can help distinguish customer flows from changes caused by market performance. Companies may differ in which accounts, asset types, and movements they include.",
        icon: "ti-trending-up",
      },
      {
        label: "Fee Revenue",
        fullName: "Revenue from Fees and Commissions",
        text:
          "Measures revenue earned from fees and commissions under the company's reporting categories. It can help assess the contribution of service-based activities, but definitions vary. Some companies report fee revenue separately, while others combine it with other revenue sources.",
        icon: "ti-receipt",
      },
      {
        label: "Operating Margin",
        fullName: "Operating Income as a Percentage of Revenue",
        text:
          "Usually calculated as operating income divided by revenue. It helps show how much recognized revenue remains after operating expenses. Comparisons can be misleading when firms have different business mixes, compensation structures, accounting classifications, or unusual expenses.",
        icon: "ti-percentage",
      },
      {
        label: "Return on Equity",
        fullName: "Return on Equity (ROE)",
        text:
          "Generally measures net income relative to average shareholders' equity. It helps assess the profit generated from the equity base, but results can be affected by leverage, capital structure, buybacks, and unusual items. ROE is not directly comparable across all financial services business models.",
        icon: "ti-chart-bar",
      },
      {
        label: "Return on Tangible Common Equity",
        fullName: "Return on Tangible Common Equity (ROTCE)",
        text:
          "Measures a company's earnings relative to tangible common equity under its chosen calculation. Some financial institutions use it as a supplemental performance measure. Definitions may differ and the measure may be non-GAAP, so check the company's reconciliation and methodology before comparing results.",
        icon: "ti-calculator",
      },
      {
        label: "Assets Under Administration",
        fullName: "Assets Under Administration",
        text:
          "Measures the value of assets for which a firm provides administrative or related services under its definition. The firm may not make investment decisions for all those assets. Do not treat assets under administration as equivalent to AUM or as revenue.",
        icon: "ti-folders",
      },
      {
        label: "Compensation Ratio",
        fullName: "Compensation and Benefits as a Percentage of Revenue",
        text:
          "Measures compensation expense relative to revenue when the company reports the relevant figures. It can help assess an important cost driver in people-intensive businesses. Definitions and the treatment of variable compensation differ, and a lower ratio does not automatically mean better service or stronger long-term performance.",
        icon: "ti-users",
      },
      {
        label: "Capital and Liquidity Measures",
        fullName: "Relevant Regulatory Capital and Liquidity Measures",
        text:
          "Capital and liquidity measures help assess a firm's capacity to absorb losses or meet obligations when applicable to its activities. The correct ratios depend on the institution, regulatory regime, and business model. Do not apply bank-specific measures indiscriminately to asset managers or advisory firms.",
        icon: "ti-shield-check",
      },
    ],

    callout:
      "Important: Revenue is not profit, profit is not cash flow, and assets under management are not company revenue. Financial services firms also differ in how they report fees, trading-related income, assets, and profitability. Read the company's segment disclosures and definitions before making comparisons.",
  },

  companies: {
    sub:
      "Explore companies in Scope that have relevant financial services activities. Each example represents only part of a broader business, so review the company's reported segments rather than assuming it follows a single business model.",

    items: [
      {
        slug: "jpmorgan-chase",
        role:
          "Diversified financial services example. JPMorgan Chase provides investment banking, asset management, and other financial services alongside its substantial banking activities. Its total company revenue should not be treated as revenue from fee-based financial services alone. Use its segment disclosures to distinguish advisory, asset management, banking, and other activities.",
      },
      {
        slug: "berkshire-hathaway",
        role:
          "Diversified holding company with major insurance and investment activities. Berkshire Hathaway can illustrate selected financial activities, but it also owns businesses across other industries. Its consolidated revenue is not a measure of a pure financial services business, and its insurance operations should be distinguished from asset management and investment activities.",
      },
      {
        slug: "visa",
        role:
          "Related payments business rather than a core example of investment management or financial advisory services. Visa operates a payment network and earns revenue from payment-related services. It is included here only as a neighboring business model for comparison; its network activities should be studied primarily under Payments.",
      },
      {
        slug: "mastercard",
        role:
          "Related payments business with network and additional service activities. Mastercard can help readers compare payment infrastructure with other financial services, but its payment network economics should not be confused with asset management or investment banking. Payments is the more appropriate primary model for its network business.",
      },
    ],
  },

  related: {
    sub:
      "Explore neighboring models to understand how financial services connect with banking, payments, insurance, and investment activities.",

    slugs: [
      "banking",
      "payments",
      "insurance",
    ],
  },

  disclaimer: SCOPE_DISCLAIMER,
};

export default financialServicesDetail;