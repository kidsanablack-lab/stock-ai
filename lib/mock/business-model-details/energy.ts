import { SCOPE_DISCLAIMER, type BusinessModelDetail } from "./types";

export const ENERGY_DETAIL: BusinessModelDetail = {
  slug: "energy",

  headline: "How Energy Companies Make Money",

  description:
    "Energy companies produce, process, transport, and sell the energy that powers homes, businesses, and industries. Their business models range from oil and gas production to fuel refining, electricity generation, and renewable energy. Understanding how each business earns money requires looking at its assets, costs, contracts, and exposure to energy prices.",

  characteristics: {
    tags: [
      "Energy Production",
      "Commodity Prices",
      "Capital Intensive",
      "Infrastructure",
      "Energy Demand",
      "Operational Risk",
    ],
    note:
      "Energy is a broad industry, not a single business model. Oil producers, fuel refiners, electricity generators, and renewable energy operators have different revenue sources, cost structures, and risk profiles.",
  },

  whatIsIt: {
    sub: "Understanding the energy business model",
    paragraphs: [
      "Energy companies provide the resources, fuels, electricity, and infrastructure that households and businesses depend on. Some extract natural resources such as crude oil and natural gas. Others refine fuels, generate electricity, or develop renewable energy projects.",
      "The way an energy company makes money depends on what it produces, who buys it, how prices are determined, and how much it costs to develop and operate its assets.",
      "Many energy businesses require substantial upfront investment. A company may spend years exploring for resources or developing a power project before the asset begins generating revenue.",
      "Energy companies should not be treated as interchangeable. A company that produces oil faces different economic drivers from a company that operates a regulated electricity utility or owns wind and solar projects.",
    ],
  },

  flow: {
    sub: "How an energy business turns resources into revenue",
    steps: [
      {
        title: "Develop Energy Assets",
        text:
          "The company invests in resources, equipment, infrastructure, or projects needed to produce or deliver energy.",
        icon: "ti-building-factory",
        examples: [
          "Oil and gas fields",
          "Refineries",
          "Power plants",
          "Wind and solar projects",
        ],
      },
      {
        title: "Produce or Process Energy",
        text:
          "The company extracts resources, converts fuels into products, or generates electricity using its assets and operating capabilities.",
        icon: "ti-settings",
        examples: [
          "Crude oil production",
          "Fuel refining",
          "Electricity generation",
          "Renewable power production",
        ],
      },
      {
        title: "Sell Energy or Services",
        text:
          "The company sells energy products, electricity, or related services to customers, utilities, industrial users, and other market participants.",
        icon: "ti-arrows-exchange",
        examples: [
          "Crude oil sales",
          "Fuel sales",
          "Electricity sales",
          "Long-term power contracts",
        ],
      },
      {
        title: "Manage Costs and Investment",
        text:
          "The company pays operating costs, maintains its assets, funds necessary capital spending, and manages risks that affect its financial results.",
        icon: "ti-chart-line",
        examples: [
          "Production costs",
          "Equipment maintenance",
          "Capital expenditure",
          "Environmental compliance",
        ],
      },
    ],
  },

  howItWorks: {
    sub: "The economics behind the energy industry",
    intro:
      "Energy companies earn money by producing or delivering something customers need. However, the amount they earn depends on the business model, the price received, the volume sold, operating costs, and the capital required to maintain or expand their assets.",
    chain: [
      {
        title: "Invest in assets",
        text:
          "Spend money developing resources, facilities, equipment, or infrastructure needed to produce and deliver energy.",
        tag: "Investment",
      },
      {
        title: "Produce energy",
        text:
          "Extract resources, refine fuels, or generate electricity using the company's assets and operating capabilities.",
        tag: "Production",
      },
      {
        title: "Sell products or power",
        text:
          "Sell energy products or electricity at market-linked prices, contract prices, or other agreed pricing arrangements.",
        tag: "Revenue",
      },
      {
        title: "Pay operating costs",
        text:
          "Cover costs such as labor, maintenance, fuel, transportation, and other expenses required to operate the business.",
        tag: "Costs",
      },
      {
        title: "Fund the business",
        text:
          "Use available cash to support necessary investment, meet financial obligations, and maintain the assets needed for future operations.",
        tag: "Cash Flow",
      },
    ],
    outro:
      "Revenue is not the same as profit, and profit is not the same as cash flow. An energy company can report substantial revenue while facing weak margins, heavy investment needs, or limited cash available after capital expenditure.",
  },

  whoPays: {
    sub: "Who buys energy and energy-related services?",
    items: [
      {
        title: "Energy Traders and Commodity Buyers",
        text:
          "Oil and gas producers may sell resources to refiners, utilities, trading firms, and other buyers. Pricing depends on the product, location, quality, market conditions, and contract terms.",
        icon: "ti-arrows-exchange",
      },
      {
        title: "Fuel Distributors and Businesses",
        text:
          "Refiners and fuel suppliers sell gasoline, diesel, jet fuel, lubricants, and other products to distributors, retailers, transport operators, and industrial customers.",
        icon: "ti-truck",
      },
      {
        title: "Utilities and Electricity Buyers",
        text:
          "Electricity generators may sell power to utilities, wholesale markets, businesses, or other buyers under market-based arrangements or contracts.",
        icon: "ti-bolt",
      },
      {
        title: "Households and Commercial Customers",
        text:
          "Customers pay for electricity, natural gas, heating, and other energy services. In some markets, customers buy from regulated utilities; in others, different suppliers or market arrangements may apply.",
        icon: "ti-users",
      },
      {
        title: "Industrial Customers",
        text:
          "Factories and other energy-intensive businesses buy fuels, electricity, natural gas, and related products needed to operate their facilities.",
        icon: "ti-building-factory",
      },
    ],
  },

  makeMoney: {
    sub: "The main ways energy companies generate revenue",
    items: [
      {
        title: "Oil and Gas Production",
        text:
          "Producers earn revenue by selling crude oil, natural gas, and related liquids. Revenue depends on the volume sold and the realized selling price. Profitability also depends on production costs, royalties, taxes, transportation, and other expenses.",
        icon: "ti-droplet",
      },
      {
        title: "Fuel Refining and Marketing",
        text:
          "Refiners purchase crude oil and process it into products such as gasoline, diesel, and jet fuel. Their economics depend partly on the value of the products produced relative to crude oil and other processing costs. Higher crude oil prices do not automatically mean higher refining profits.",
        icon: "ti-building-factory",
      },
      {
        title: "Electricity Generation",
        text:
          "Power generators sell electricity to customers, utilities, or wholesale markets. Revenue and profitability depend on electricity prices, the amount of power generated, operating costs, plant availability, and the terms of any contracts.",
        icon: "ti-bolt",
      },
      {
        title: "Renewable Energy Projects",
        text:
          "Wind and solar project owners may earn revenue by selling electricity under long-term power purchase agreements or through market-based arrangements. Project economics depend on construction costs, financing, electricity output, contract terms, and operating expenses.",
        icon: "ti-sun",
      },
      {
        title: "Energy Infrastructure and Services",
        text:
          "Some companies earn revenue by transporting, storing, processing, or managing energy products. Depending on the business, revenue may be based on service fees, throughput, contracted capacity, or other commercial arrangements.",
        icon: "ti-network",
      },
      {
        title: "Chemicals and Other Products",
        text:
          "Integrated energy companies may also manufacture petrochemicals, lubricants, specialty products, and other materials. These businesses have their own demand, pricing, and cost drivers and should not automatically be treated as oil and gas production revenue.",
        icon: "ti-flask",
      },
    ],
  },

  moneyGoes: {
    sub: "Where an energy company's money goes",
    items: [
      {
        title: "Production and Operating Costs",
        text:
          "Costs associated with extracting resources, operating power plants, running facilities, paying employees, and maintaining production equipment.",
        icon: "ti-settings",
      },
      {
        title: "Raw Materials and Fuel",
        text:
          "Refiners and some electricity generators must purchase crude oil, natural gas, or other fuels. Changes in input prices can affect margins, although the impact depends on selling prices and contracts.",
        icon: "ti-droplet",
      },
      {
        title: "Capital Expenditure",
        text:
          "Money spent developing new assets, expanding capacity, replacing equipment, or maintaining long-lived facilities. Capital expenditure can be substantial and uneven across years.",
        icon: "ti-building-factory",
      },
      {
        title: "Transportation and Infrastructure",
        text:
          "Costs associated with pipelines, shipping, storage, grid connections, logistics, and other infrastructure needed to move energy from producers to customers.",
        icon: "ti-truck",
      },
      {
        title: "Depreciation and Asset Depletion",
        text:
          "Accounting expenses that allocate the cost of long-lived assets or resource-related investments over time. These expenses affect reported profit but are not necessarily cash payments made during the current period.",
        icon: "ti-chart-line",
      },
      {
        title: "Environmental and Regulatory Obligations",
        text:
          "Costs related to permits, safety, environmental protection, emissions requirements, remediation, and other applicable legal obligations.",
        icon: "ti-shield-check",
      },
      {
        title: "Financing Costs",
        text:
          "Interest and other financing costs associated with debt and funding arrangements. Heavy borrowing can increase financial risk, particularly when cash flow or energy prices weaken.",
        icon: "ti-wallet",
      },
    ],
  },

  growth: {
    drivers: {
      title: "What Can Drive Growth?",
      items: [
        "Energy demand: economic activity, industrial production, transportation, and electricity consumption can influence demand for different forms of energy.",
        "Production growth: oil and gas producers may increase output by developing new fields, improving existing operations, or bringing new projects online.",
        "Capacity expansion: electricity generators may increase the amount of power they can produce by building new facilities or improving existing assets.",
        "Project execution: completing projects on time and within budget can help companies bring assets into operation and begin generating revenue.",
        "Contracted sales: long-term customer agreements may provide greater revenue visibility for certain projects, although the actual economics depend on contract terms and counterparty risk.",
        "Operational efficiency: reducing downtime, improving equipment reliability, and controlling costs may improve profitability without requiring equivalent growth in sales.",
      ],
    },
    opportunities: {
      title: "Where Can Opportunities Come From?",
      items: [
        "Developing resources or projects that can produce energy at competitive costs.",
        "Expanding electricity generation or infrastructure where demand and market arrangements support viable projects.",
        "Improving existing assets to increase output, reliability, or operating efficiency.",
        "Developing renewable energy and other lower-emission businesses where technology, contracts, financing, and market conditions support commercial returns.",
        "Using integration across parts of the energy value chain to improve flexibility or capture value from different activities.",
      ],
    },
    callout:
      "Energy demand and investment opportunities do not guarantee attractive returns. A project can increase production or capacity while destroying value if construction costs, financing, operating expenses, or selling prices are unfavorable.",
  },

  strength: {
    title: "What Can Make an Energy Company Competitive?",
    sub:
      "Potential advantages depend on the company's specific business model, asset quality, operating capabilities, and financial discipline.",
    items: [
      {
        title: "Low-Cost Assets",
        text:
          "Assets that can produce or deliver energy at competitive costs may remain more resilient when market prices fall. Cost comparisons must account for differences in resource quality, location, taxes, and operating conditions.",
        icon: "ti-chart-line",
      },
      {
        title: "High-Quality Resources",
        text:
          "For resource producers, the quality, accessibility, and development cost of reserves can influence long-term economics. Reported reserves are estimates subject to technical, economic, and regulatory assumptions.",
        icon: "ti-droplet",
      },
      {
        title: "Operational Excellence",
        text:
          "Reliable equipment, efficient processes, safety practices, and effective maintenance can help reduce downtime and avoid unnecessary costs.",
        icon: "ti-settings",
      },
      {
        title: "Scale and Integration",
        text:
          "Companies operating across multiple parts of the energy value chain may gain operational flexibility or share certain capabilities. Integration can also add complexity and does not eliminate exposure to market risks.",
        icon: "ti-network",
      },
      {
        title: "Long-Term Customer Relationships",
        text:
          "Established commercial relationships and well-structured contracts may support customer retention or provide greater visibility into future sales. Contract terms and customer credit quality remain important.",
        icon: "ti-handshake",
      },
      {
        title: "Capital Allocation",
        text:
          "Choosing projects carefully, managing debt, and balancing growth investment with the needs of existing assets can help a company avoid committing too much capital to unattractive opportunities.",
        icon: "ti-chart-pie",
      },
    ],
  },

  competition: {
    compete: {
      title: "How Energy Companies Compete",
      items: [
        "Production and operating costs relative to the prices customers are willing to pay.",
        "Access to attractive resources, locations, infrastructure, and distribution channels.",
        "Reliability and availability of facilities and equipment.",
        "Ability to develop projects and deliver energy within budget and on schedule.",
        "Commercial contracts, customer relationships, and the ability to manage price exposure.",
        "Technology, operating expertise, and the ability to meet changing customer and regulatory requirements.",
      ],
    },
    challenges: {
      title: "Competitive Challenges",
      items: [
        "Commodity prices may be determined by wider markets, limiting an individual producer's control over selling prices.",
        "New supply, changes in demand, or competing energy sources can put pressure on prices and margins.",
        "Large projects may require substantial upfront investment and long development periods.",
        "Construction delays, equipment failures, or cost overruns can reduce project returns.",
        "Energy businesses may face competition from companies with different cost structures, technologies, or access to capital.",
        "Regulatory changes and evolving environmental requirements can affect costs, project approvals, and the commercial viability of certain assets.",
      ],
    },
  },

  risks: {
    sub:
      "Energy companies face market, operational, financial, environmental, and project-related risks. Their exposure varies significantly by business model.",
    items: [
      {
        title: "Commodity Price Risk",
        text:
          "Oil, natural gas, refined products, and electricity prices can change with supply, demand, inventories, weather, geopolitics, and other market conditions. Price movements can increase or reduce earnings depending on the company's activities and contracts.",
        icon: "ti-chart-candle",
      },
      {
        title: "Demand Risk",
        text:
          "Economic slowdowns, changes in customer behavior, efficiency improvements, or substitution by other energy sources can affect demand for particular products or services.",
        icon: "ti-trending-down",
      },
      {
        title: "Capital Intensity",
        text:
          "Developing fields, refineries, pipelines, and power projects can require substantial upfront investment. Poor project economics or unexpected costs may make it difficult to recover the invested capital.",
        icon: "ti-building-factory",
      },
      {
        title: "Project Execution Risk",
        text:
          "Projects can face delays, cost overruns, supply constraints, permitting problems, or technical difficulties. Delays may postpone revenue while financing and construction costs continue.",
        icon: "ti-clock",
      },
      {
        title: "Operational and Safety Risk",
        text:
          "Equipment failures, accidents, production interruptions, and infrastructure damage can lead to lost output, repair costs, legal liabilities, and harm to workers or the environment.",
        icon: "ti-alert-triangle",
      },
      {
        title: "Financial and Debt Risk",
        text:
          "High debt and financing commitments can place pressure on a company when cash flow declines. Large investment programs may also compete with debt repayment and other financial obligations.",
        icon: "ti-wallet",
      },
      {
        title: "Regulatory and Environmental Risk",
        text:
          "Changes in permits, environmental rules, emissions requirements, taxes, or other regulations can affect operating costs and the viability of existing or planned assets.",
        icon: "ti-shield-check",
      },
      {
        title: "Technology and Energy Transition",
        text:
          "Changes in energy technology, customer preferences, infrastructure, and public policy may affect the long-term competitiveness of certain assets. The impact differs across oil and gas, electricity, and renewable energy businesses.",
        icon: "ti-sun",
      },
      {
        title: "Contract and Counterparty Risk",
        text:
          "A customer or commercial partner may fail to meet its obligations. Long-term contracts can provide revenue visibility but may also expose a company to unfavorable pricing terms or counterparty problems.",
        icon: "ti-file-text",
      },
    ],
  },

  metrics: {
    sub:
      "Use metrics that match the company's business model. A metric that is useful for an oil producer may not be equally useful for an electricity generator.",
    items: [
      {
        label: "Revenue",
        fullName: "Revenue from Sales and Services",
        text:
          "What it measures: the income reported from selling products and services under the applicable accounting rules. Why it matters: it shows the scale of a company's sales. Limitation: revenue can rise because of higher selling prices even when volumes decline, and higher revenue does not necessarily mean higher profit or cash flow.",
        icon: "ti-report-money",
      },
      {
        label: "Operating Margin",
        fullName: "Operating Income as a Percentage of Revenue",
        text:
          "What it measures: operating income relative to revenue, using the company's reported operating income definition. Why it matters: it helps show how much operating profit remains from sales before certain non-operating items. Limitation: business mix, accounting classifications, and unusual items can affect comparisons between companies.",
        icon: "ti-chart-bar",
      },
      {
        label: "Free Cash Flow",
        fullName: "Cash Flow After Capital Expenditure",
        text:
          "What it measures: commonly, operating cash flow minus capital expenditure, although definitions may vary. Why it matters: it helps show how much cash remains after investment spending under that definition. Limitation: it can fluctuate with commodity prices, working capital, and project timing. Always check the company's calculation and whether it includes asset sales or other adjustments.",
        icon: "ti-coins",
      },
      {
        label: "ROCE",
        fullName: "Return on Capital Employed",
        text:
          "What it measures: a return measure comparing operating profit with capital employed, using the company's stated formula. Why it matters: energy businesses often invest substantial capital in long-lived assets, so returns on that capital are important. Limitation: definitions of profit and capital employed vary, and asset age, impairment charges, and commodity cycles can affect comparisons.",
        icon: "ti-chart-pie",
      },
      {
        label: "Production Volume",
        fullName: "Oil and Gas Production",
        text:
          "What it measures: the quantity of oil, natural gas, or equivalent energy produced during a period. Why it matters: production volume helps explain the operating scale of an upstream producer. Limitation: units, product mix, ownership interests, and reporting methods can differ. Higher production does not automatically mean higher profitability if costs rise or selling prices fall.",
        icon: "ti-droplet",
      },
      {
        label: "Proved Reserves",
        fullName: "Proved Oil and Gas Reserves",
        text:
          "What it measures: quantities of oil and gas estimated to be recoverable under the applicable technical, economic, and regulatory criteria. Why it matters: reserves help provide context for the potential future production base of an upstream company. Limitation: reserves are estimates, not guaranteed future production or cash flow. Comparisons should consider reserve definitions, development costs, and the economic assumptions used.",
        icon: "ti-database",
      },
      {
        label: "Refining Margin",
        fullName: "Margin from Refining Crude Oil into Products",
        text:
          "What it measures: the difference between the value of refined products and the relevant crude oil and processing costs under a specified calculation. Why it matters: it helps explain the economics of refining. Limitation: actual margins depend on crude quality, product mix, location, energy costs, and other operating expenses. Industry benchmark margins are not the same as a company's realized profit.",
        icon: "ti-chart-line",
      },
      {
        label: "Generation Capacity",
        fullName: "Electricity Generation Capacity",
        text:
          "What it measures: the rated ability of a power plant or portfolio to generate electricity, usually expressed in units such as megawatts. Why it matters: it indicates the potential scale of generation assets. Limitation: installed capacity does not show how much electricity is actually produced, sold, or profitably delivered.",
        icon: "ti-bolt",
      },
      {
        label: "Capacity Factor",
        fullName: "Actual Electricity Generation Relative to Potential Generation",
        text:
          "What it measures: actual electricity produced over a period compared with the amount that could have been produced at full capacity over that period. Why it matters: it helps explain how intensively a generation asset is used. Limitation: appropriate comparisons depend on technology, weather, maintenance, fuel availability, and grid constraints. A higher capacity factor does not automatically imply higher profit.",
        icon: "ti-gauge",
      },
      {
        label: "Net Debt",
        fullName: "Debt Less Cash and Cash Equivalents, Under the Company's Definition",
        text:
          "What it measures: a company's debt after subtracting specified cash balances, with the precise definition depending on the company. Why it matters: it provides context for financial leverage and the burden of debt relative to cash resources. Limitation: companies may exclude certain cash, debt, or other items, so verify the calculation before comparing companies.",
        icon: "ti-wallet",
      },
    ],
    callout:
      "Energy companies operate different types of assets and face different market conditions. Compare companies with similar business models, use consistent reporting periods, and review the definitions behind each metric. No single metric can establish whether a business is financially strong or whether its shares are attractively priced.",
  },

  companies: {
    sub:
      "Examples from Scope's company database. Each company has multiple activities, so these examples focus on the parts relevant to the Energy business model.",
    items: [
      {
        slug: "chevron",
        role:
          "Chevron is an integrated energy company. Its upstream activities include exploring for and producing crude oil and natural gas. Its downstream activities include refining, marketing fuels and lubricants, transportation, and certain chemical and renewable fuel activities. These different operations have different revenue sources and economic drivers, so Chevron's total company revenue should not be attributed to one Energy activity.",
      },
      {
        slug: "exxon-mobil",
        role:
          "ExxonMobil operates across oil and gas production, energy products, chemicals, and specialty products, while also pursuing selected lower-emission businesses. Its upstream operations depend on resource production and realized prices, while its product businesses have their own refining, manufacturing, and market drivers. Its total financial results reflect a diversified set of activities rather than oil and gas production alone.",
      },
      {
        slug: "nextera-energy",
        role:
          "NextEra Energy provides an example of an energy business that includes regulated electric utility operations and other energy-related activities, including renewable generation. Regulated utility economics differ from the economics of power generation sold under market-based or contractual arrangements. The company should therefore not be described as a pure-play renewable energy business.",
      },
    ],
  },

  related: {
    sub:
      "Explore related business models that operate in adjacent parts of the economy.",
    slugs: ["manufacturing", "logistics"],
  },

  disclaimer: SCOPE_DISCLAIMER,
};