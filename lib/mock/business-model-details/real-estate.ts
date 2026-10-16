import { SCOPE_DISCLAIMER, type BusinessModelDetail } from "./types";

export const realEstateDetail: BusinessModelDetail = {
  slug: "real-estate",

  headline: "How Real Estate Businesses Make Money",
  description:
    "Real estate businesses earn money by owning and renting properties, developing buildings, selling properties, or providing services such as brokerage and property management. Their results depend on location, property demand, financing, operating costs, and the real estate cycle.",

  characteristics: {
    tags: [
      "Property Ownership",
      "Rental Income",
      "Property Development",
      "Asset-Heavy",
      "Interest-Rate Sensitive",
    ],
    note:
      "Real estate is not one single business model. A landlord, a property developer, a real estate agent, and a property manager can all work in the same industry but earn money in very different ways.",
  },

  whatIsIt: {
    sub: "The same industry can contain several different business models.",
    paragraphs: [
      "Real estate businesses work with land and buildings. Some own properties and collect rent. Others develop properties and sell them. Some earn commissions by helping people buy or sell property, while others charge fees to manage properties for owners.",
      "Property ownership can require substantial upfront capital. A business may need to buy land, finance a building, maintain the property, and cover costs even when a unit is vacant. Service businesses such as brokerage and property management may need less capital tied up in property, but their revenue depends more directly on transactions, clients, and fees.",
      "A property can increase in market value, but that does not automatically mean the owner has earned cash. To understand the business, separate rental or service revenue, operating expenses, financing costs, cash flow, and changes in property value.",
    ],
  },

  flow: {
    sub: "Follow the path from a property or service to revenue.",
    steps: [
      {
        title: "Acquire or access property",
        text:
          "A business may buy land or buildings, develop new properties, or work with properties owned by other people.",
        icon: "ti-building",
        examples: [
          "Buying an apartment building",
          "Developing a warehouse",
          "Representing a property owner as an agent",
        ],
      },
      {
        title: "Create value or provide a service",
        text:
          "The business prepares space for tenants, develops a property, finds buyers and sellers, or handles day-to-day property operations.",
        icon: "ti-tools",
        examples: [
          "Maintaining rental units",
          "Constructing a residential development",
          "Marketing a property for sale",
        ],
      },
      {
        title: "Earn revenue",
        text:
          "Revenue may come from rent, property sales, commissions, or fees for managing properties.",
        icon: "ti-cash",
        examples: [
          "Monthly rental payments",
          "Revenue from selling completed homes",
          "Property management fees",
        ],
      },
      {
        title: "Pay costs and manage capital",
        text:
          "The business pays operating expenses and may also need to cover construction costs, debt interest, loan repayments, and future property improvements.",
        icon: "ti-calculator",
        examples: [
          "Repairs and maintenance",
          "Construction and development costs",
          "Mortgage interest and principal payments",
        ],
      },
      {
        title: "Reinvest or return capital",
        text:
          "Depending on its strategy and financial position, the business may acquire more properties, develop new projects, reduce debt, or distribute cash to owners.",
        icon: "ti-chart-line",
        examples: [
          "Buying another rental property",
          "Funding a new development",
          "Reducing outstanding debt",
        ],
      },
    ],
  },

  howItWorks: {
    sub: "Different real estate businesses earn money in different ways.",
    intro:
      "To understand a real estate company, first identify what it actually does. Owning a building, building a property, selling a home, and managing a building are not the same activity.",

    chain: [
      {
        title: "Property ownership and leasing",
        text:
          "The business owns or controls property and rents space to tenants. It generally earns recurring rental revenue while paying property operating costs.",
        tag: "Rental income",
      },
      {
        title: "Property development",
        text:
          "The business acquires land or existing property, develops or improves it, and may sell the finished property or retain it to generate rent.",
        tag: "Development and sales",
      },
      {
        title: "Brokerage",
        text:
          "Agents help clients buy, sell, or lease properties. The business may earn commissions or other transaction-related fees under its agreements.",
        tag: "Commissions",
      },
      {
        title: "Property management",
        text:
          "The business manages properties on behalf of owners. Services may include tenant communication, rent collection, maintenance coordination, and reporting.",
        tag: "Service fees",
      },
    ],

    outro:
      "Some companies combine several activities. For example, a property owner may also develop buildings or provide management services. Always examine the company's actual revenue sources instead of assuming that every real estate business earns most of its money from rent.",
  },

  whoPays: {
    sub: "The customer depends on the business model.",
    items: [
      {
        title: "Tenants",
        text:
          "Individuals and businesses pay rent to use apartments, offices, warehouses, shops, or other property.",
        icon: "ti-users",
      },
      {
        title: "Property buyers",
        text:
          "Homebuyers, investors, and businesses pay for properties sold by developers or other property owners.",
        icon: "ti-home",
      },
      {
        title: "Buyers, sellers, and landlords",
        text:
          "Clients may pay brokerage commissions or agreed transaction fees when an agent helps them buy, sell, or lease a property.",
        icon: "ti-handshake",
      },
      {
        title: "Property owners",
        text:
          "Owners pay management companies to handle property operations and related services.",
        icon: "ti-briefcase",
      },
    ],
  },

  makeMoney: {
    sub: "Revenue is the money earned before subtracting expenses.",
    items: [
      {
        title: "Rental income",
        text:
          "Property owners collect rent from tenants. The amount collected depends on occupied space, rental rates, lease terms, and whether tenants pay as agreed.",
        icon: "ti-calendar-dollar",
      },
      {
        title: "Property sales",
        text:
          "Developers or property owners earn sales revenue when properties are sold. Revenue is not the same as profit because land, construction, financing, and selling costs must also be considered.",
        icon: "ti-building-estate",
      },
      {
        title: "Brokerage commissions",
        text:
          "Real estate agents may receive a commission when a transaction is completed. Commission arrangements vary by market, contract, and transaction type.",
        icon: "ti-percentage",
      },
      {
        title: "Property management fees",
        text:
          "Management companies charge fees for operating properties for their clients. Fees may be based on rent collected, a fixed amount, or another agreed arrangement.",
        icon: "ti-clipboard-check",
      },
      {
        title: "Other property-related income",
        text:
          "Depending on the property and contract, revenue may also include parking, storage, service charges, or other tenant-related fees. The details vary by business and jurisdiction.",
        icon: "ti-receipt",
      },
    ],
  },

  moneyGoes: {
    sub: "Revenue does not show how much money the business keeps.",
    items: [
      {
        title: "Property operating expenses",
        text:
          "Owners may pay for repairs, maintenance, insurance, property taxes, utilities for shared areas, security, and property management.",
        icon: "ti-tool",
      },
      {
        title: "Land and construction",
        text:
          "Developers may spend significant amounts on land, materials, labor, permits, contractors, and other project costs before selling a property.",
        icon: "ti-building-community",
      },
      {
        title: "Financing costs",
        text:
          "Borrowing can help a business acquire or develop property, but interest expense and refinancing needs can pressure profits and cash flow.",
        icon: "ti-building-bank",
      },
      {
        title: "Vacancies and tenant turnover",
        text:
          "Empty units can reduce rental income while some costs continue. Preparing a unit for a new tenant may also require repairs, marketing, or other spending.",
        icon: "ti-door-enter",
      },
      {
        title: "Capital expenditures",
        text:
          "Owners may need to replace major equipment, renovate buildings, improve energy efficiency, or make other investments to maintain a property's condition and competitiveness.",
        icon: "ti-hammer",
      },
      {
        title: "Selling and administrative costs",
        text:
          "Brokerage and management businesses may pay employee compensation, marketing expenses, office costs, technology costs, and other operating expenses.",
        icon: "ti-file-dollar",
      },
    ],
  },

  growth: {
    drivers: {
      title: "What can drive growth?",
      items: [
        "Higher occupancy or more space leased to tenants can increase rental revenue, assuming other factors remain similar.",
        "Higher rental rates may increase revenue when market conditions and lease agreements allow increases.",
        "Developing or acquiring additional properties can expand the portfolio, but only creates value if the projects earn adequate returns relative to their costs and risks.",
        "Improving property quality, tenant service, and operating efficiency can support retention and reduce avoidable expenses.",
        "Brokerage businesses can grow by serving more clients, completing more transactions, or expanding into new markets.",
        "Property management businesses can grow by managing more properties or offering additional services to existing clients.",
      ],
    },

    opportunities: {
      title: "Where can opportunities appear?",
      items: [
        "Growing populations or employment may support demand for certain types of housing and commercial space, depending on the local market.",
        "Changes in shopping, logistics, manufacturing, and working patterns can alter demand for warehouses, retail space, offices, and other property types.",
        "Renovating or repurposing existing buildings may create opportunities when the cost of improvement is justified by expected demand.",
        "Professional property management may help owners improve tenant experience, maintain buildings, and control operating costs.",
        "A property portfolio spread across different tenants, locations, or property types may reduce some concentration risks, although diversification does not eliminate real estate risk.",
      ],
    },

    callout:
      "Growth is not automatically value creation. A company can increase its property portfolio or sales revenue while earning weak returns, taking on too much debt, or consuming more cash than it generates.",
  },

  strength: {
    title: "What can make a real estate business strong?",
    sub:
      "Long-term performance depends on the assets, the business model, and the quality of execution.",
    items: [
      {
        title: "Good locations and useful properties",
        text:
          "Properties that meet local demand and offer convenient access, suitable facilities, or other valuable features may be better positioned to attract tenants or buyers.",
        icon: "ti-map-pin",
      },
      {
        title: "Reliable tenant relationships",
        text:
          "Keeping suitable tenants can support occupancy and reduce the cost and disruption associated with frequent turnover.",
        icon: "ti-users",
      },
      {
        title: "Disciplined financing",
        text:
          "Managing debt maturities, borrowing costs, and available liquidity can help a business withstand weaker property markets or higher interest rates.",
        icon: "ti-shield-check",
      },
      {
        title: "Development and project management",
        text:
          "Accurate cost estimates, timely construction, appropriate project selection, and effective execution can help developers control risk.",
        icon: "ti-building",
      },
      {
        title: "Operating efficiency",
        text:
          "Effective maintenance, tenant service, cost control, and property management can support the economics of owned or managed properties.",
        icon: "ti-settings",
      },
      {
        title: "Local market knowledge",
        text:
          "Understanding local regulations, demand, competing properties, and tenant needs can help a business make better acquisition, pricing, and development decisions.",
        icon: "ti-world",
      },
    ],
  },

  competition: {
    compete: {
      title: "How do real estate businesses compete?",
      items: [
        "Property owners compete on location, price, building quality, amenities, lease terms, and tenant service.",
        "Developers compete through site selection, project design, construction execution, financing, and the ability to deliver properties that buyers or tenants want.",
        "Brokerage firms compete for clients through local expertise, relationships, marketing, service quality, and the ability to complete transactions.",
        "Property management firms compete through reliability, cost control, communication, reporting, and the quality of property operations.",
        "Access to capital and the ability to manage debt can influence which businesses are able to acquire or develop properties through different market conditions.",
      ],
    },

    challenges: {
      title: "What makes the business difficult?",
      items: [
        "Properties are location-specific and may be difficult to sell quickly without accepting a lower price.",
        "Large purchases and development projects can require substantial upfront capital.",
        "Construction delays, cost overruns, and permitting problems can damage project economics.",
        "Real estate markets can be cyclical, and demand can weaken when economic conditions deteriorate.",
        "Competition may pressure rents, property prices, commissions, and management fees.",
        "A property that performs well in one location or market period may not perform equally well in another.",
      ],
    },
  },

  risks: {
    sub: "A real estate business can face several risks at the same time.",
    items: [
      {
        title: "Interest-rate and refinancing risk",
        text:
          "Higher borrowing costs can reduce profitability, make acquisitions less attractive, and increase the cost of refinancing debt. Businesses with substantial debt may be particularly sensitive to changes in financing conditions.",
        icon: "ti-trending-up",
      },
      {
        title: "Vacancy and tenant risk",
        text:
          "A tenant may leave, fail to pay, or negotiate lower rent. Concentration in a small number of tenants can make the loss of one major tenant especially damaging.",
        icon: "ti-door",
      },
      {
        title: "Property-value risk",
        text:
          "Market values can decline because of changes in interest rates, local demand, competing supply, property condition, or broader economic conditions.",
        icon: "ti-chart-arrows",
      },
      {
        title: "Development and construction risk",
        text:
          "Projects can face delays, cost increases, contractor problems, approval issues, or weaker-than-expected demand when the property is ready for sale or lease.",
        icon: "ti-hard-hat",
      },
      {
        title: "Liquidity risk",
        text:
          "Buildings cannot always be sold quickly at a fair price. A business may struggle to meet near-term obligations if its cash reserves and financing access are insufficient.",
        icon: "ti-wallet",
      },
      {
        title: "Regulatory and tax risk",
        text:
          "Zoning rules, building standards, rent regulations, property taxes, environmental requirements, and other local laws can affect costs and operating flexibility.",
        icon: "ti-scale",
      },
      {
        title: "Economic and demand risk",
        text:
          "Weak employment, reduced consumer spending, business closures, or demographic changes can reduce demand for particular property types in particular locations.",
        icon: "ti-world",
      },
      {
        title: "Brokerage transaction risk",
        text:
          "Brokerage revenue can fall when property transactions slow. Because commissions are often linked to completed transactions, income may fluctuate with market activity.",
        icon: "ti-arrows-exchange",
      },
    ],
  },

  metrics: {
    sub:
      "These metrics help explain real estate businesses, but no single metric is enough to judge the quality of a company or property.",

    items: [
      {
        label: "Occupancy Rate",
        fullName: "Occupancy Rate",
        text:
          "Measures the share of available space or units that is occupied under the company's chosen definition. Higher occupancy can support rental revenue, but it does not guarantee profitability. Check whether the figure is based on units, area, or another measure.",
        icon: "ti-home-check",
      },
      {
        label: "NOI",
        fullName: "Net Operating Income",
        text:
          "Measures property operating income after the operating expenses included in the company's calculation. It generally excludes financing costs and income taxes, but exact definitions and adjustments can differ. NOI does not represent the cash left after debt payments or all capital spending.",
        icon: "ti-calculator",
      },
      {
        label: "Cap Rate",
        fullName: "Capitalization Rate",
        text:
          "A property's net operating income divided by its value or purchase price. It is a way to compare property income relative to asset value. It is not a guaranteed return and does not automatically account for financing, future capital spending, taxes, or changes in property value.",
        icon: "ti-percentage",
      },
      {
        label: "FFO",
        fullName: "Funds From Operations",
        text:
          "A supplemental performance measure commonly used by real estate investment trusts (REITs). Under the commonly used Nareit definition, FFO adjusts net income for certain real-estate-related depreciation and gains or losses on property sales. Check the company's reconciliation because reported measures and adjustments matter. FFO is not the same as cash flow available for distribution.",
        icon: "ti-report-money",
      },
      {
        label: "AFFO",
        fullName: "Adjusted Funds From Operations",
        text:
          "A supplemental measure some REITs use to adjust FFO for items such as recurring capital expenditures or other company-specific adjustments. There is no single universally consistent definition of AFFO, so comparisons require checking how each company calculates it. AFFO should not automatically be treated as cash available to shareholders.",
        icon: "ti-chart-bar",
      },
      {
        label: "LTV",
        fullName: "Loan-to-Value Ratio",
        text:
          "Measures debt secured by a property or portfolio relative to its value, according to the company's definition. A higher LTV generally means more leverage and may increase sensitivity to falling property values or refinancing conditions. Check which debt and property values are included.",
        icon: "ti-building-bank",
      },
      {
        label: "Development Margin",
        fullName: "Development Profit Margin",
        text:
          "For a developer, this compares profit on property development or sales with the relevant revenue. The result depends on which costs the company includes and when it recognizes revenue and expenses. Review project costs, unsold inventory, and cash flow alongside the margin.",
        icon: "ti-chart-line",
      },
      {
        label: "Transaction Volume",
        fullName: "Real Estate Transaction Volume",
        text:
          "For brokerage businesses, this measures the value or number of property transactions handled. Higher transaction volume can support commission revenue, but the effect depends on commission rates, transaction mix, and operating costs.",
        icon: "ti-arrows-exchange",
      },
      {
        label: "Operating Margin",
        fullName: "Operating Profit Margin",
        text:
          "Measures operating profit relative to revenue. It can help assess the efficiency of brokerage or property management businesses, but comparisons should account for differences in services, accounting, and business mix.",
        icon: "ti-chart-pie",
      },
      {
        label: "Cash Flow",
        fullName: "Cash Flow from Operations and Investing",
        text:
          "Shows how cash moves through the business. Rental income and accounting profit do not reveal the full cash impact of debt principal payments, development spending, property purchases, or major repairs. Read the cash flow statement alongside earnings and debt disclosures.",
        icon: "ti-cash",
      },
    ],

    callout:
      "Always check the definition, reporting period, property type, and company accounting. REITs, developers, landlords, brokerages, and management firms have different economics, so some metrics are more useful for one model than another.",
  },

  companies: {
    sub:
      "Examples help illustrate the industry, but the business mix of each company matters.",

    items: [
      {
        slug: "berkshire-hathaway",
        role:
          "A diversified holding company whose businesses have included residential real estate brokerage through HomeServices of America. It is not a pure-play real estate company, so its overall results reflect many other businesses as well.",
      },
    ],
  },

  related: {
    sub:
      "Explore other business models that connect to real estate through financing, construction, and property operations.",
    slugs: ["banking", "insurance", "manufacturing"],
  },

  disclaimer: SCOPE_DISCLAIMER,
};