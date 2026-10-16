import {
  SCOPE_DISCLAIMER,
  type BusinessModelDetail,
} from "./types";

export const advertisingDetail: BusinessModelDetail = {
  slug: "advertising",

  headline: "Turn Audience Attention into Advertising Revenue",

  description:
    "Advertising businesses connect advertisers with audiences and earn revenue by selling opportunities to reach people, influence decisions, or generate measurable actions.",

  characteristics: {
    tags: [
      "Audience Reach",
      "Ad Targeting",
      "Performance Measurement",
      "Digital Platforms",
      "Advertiser-Funded",
    ],
    note:
      "An advertising business does not necessarily earn money every time someone buys a product. Depending on the arrangement, advertisers may pay for impressions, clicks, actions, or agreed advertising placements.",
  },

  whatIsIt: {
    sub: "How advertising businesses create value",

    paragraphs: [
      "An advertising business helps companies communicate with potential customers. It may provide search advertising, social media ads, online video ads, display advertising, or sponsored placements in shopping environments.",

      "The advertiser pays to access an audience or achieve a marketing objective. The platform or publisher provides the advertising opportunity, while the advertiser hopes to gain awareness, website visits, leads, sales, or another business outcome.",

      "Digital advertising platforms can use audience signals, contextual information, and campaign performance data to help advertisers reach relevant people. The available targeting and measurement capabilities depend on the platform, privacy rules, and applicable technology.",

      "Advertising is a business model, not a guarantee of profitability. Results depend on the value of the audience, advertiser demand, pricing, operating costs, competition, and the platform's ability to demonstrate useful results.",
    ],
  },

  flow: {
    sub: "From an advertiser's budget to a measurable campaign",

    steps: [
      {
        title: "Advertiser",
        text:
          "A company allocates a budget to reach potential customers or achieve a marketing objective.",
        icon: "ti-building-store",
        examples: [
          "A retailer promoting a product",
          "A software company generating leads",
          "A brand building awareness",
        ],
      },
      {
        title: "Advertising Platform",
        text:
          "A platform or publisher offers access to an audience through search results, social feeds, videos, websites, or sponsored product placements.",
        icon: "ti-device-desktop",
        examples: [
          "Search advertising",
          "Social media advertising",
          "Sponsored shopping placements",
        ],
      },
      {
        title: "Ad Delivery",
        text:
          "The advertising system selects and delivers an ad according to campaign settings, available inventory, and its delivery or auction rules.",
        icon: "ti-target-arrow",
        examples: [
          "An ad appears in search results",
          "A video ad plays before a video",
          "A sponsored product appears in a shopping search",
        ],
      },
      {
        title: "Measurement",
        text:
          "The advertiser and platform evaluate available campaign data, such as impressions, clicks, conversions, and spending.",
        icon: "ti-chart-bar",
        examples: [
          "Impressions and reach",
          "Website visits and clicks",
          "Reported conversions and sales",
        ],
      },
      {
        title: "Revenue",
        text:
          "The advertising business recognizes revenue according to the applicable pricing arrangement and accounting rules.",
        icon: "ti-report-money",
        examples: [
          "Payment based on impressions",
          "Payment based on clicks",
          "Fees for agreed advertising placements",
        ],
      },
    ],
  },

  howItWorks: {
    sub: "The basic economics of an advertising campaign",

    intro:
      "Advertising platforms bring together advertisers that want results and audiences that may be valuable to those advertisers. The platform's revenue depends on the commercial arrangement, while the advertiser evaluates whether the campaign justifies its cost.",

    chain: [
      {
        title: "Advertiser Sets a Goal",
        text:
          "The advertiser chooses an objective, such as awareness, website traffic, lead generation, or sales.",
        tag: "Campaign Objective",
      },
      {
        title: "Budget and Pricing",
        text:
          "The advertiser sets a budget and bids or agrees to a pricing arrangement, depending on how the advertising product works.",
        tag: "Ad Spending",
      },
      {
        title: "Platform Delivers Ads",
        text:
          "The platform uses its advertising system to place ads in eligible opportunities and report available performance data.",
        tag: "Ad Delivery",
      },
      {
        title: "Results Are Measured",
        text:
          "The advertiser evaluates campaign results using relevant metrics, recognizing that attribution and measurement may be imperfect.",
        tag: "Measurement",
      },
    ],

    outro:
      "A campaign can generate revenue for the advertising platform even when the advertiser does not achieve its desired return. Over time, however, poor advertiser results may weaken demand, reduce budgets, or encourage customers to move their spending elsewhere.",
  },

  whoPays: {
    sub: "Who provides the money?",

    items: [
      {
        title: "Brands and Consumer Businesses",
        text:
          "Companies pay to introduce products, build brand awareness, influence purchase decisions, or support product launches.",
        icon: "ti-building-store",
      },
      {
        title: "Online and Offline Retailers",
        text:
          "Retailers advertise to attract shoppers, promote offers, and increase product sales. Some retailers also sell sponsored placements to other brands.",
        icon: "ti-shopping-cart",
      },
      {
        title: "Business-to-Business Companies",
        text:
          "Software, professional services, and other business suppliers may pay for qualified leads, website traffic, or awareness among business customers.",
        icon: "ti-briefcase",
      },
      {
        title: "Small Businesses and Individual Sellers",
        text:
          "Smaller advertisers may use self-service advertising tools to reach audiences without negotiating a large advertising contract.",
        icon: "ti-users",
      },
      {
        title: "Agencies and Marketing Partners",
        text:
          "Advertising agencies may plan and manage campaigns for clients. The advertiser's budget may pass through an agency, but the agency and the advertising platform are separate businesses.",
        icon: "ti-chart-dots",
      },
    ],
  },

  makeMoney: {
    sub: "How advertising businesses generate revenue",

    items: [
      {
        title: "Cost Per Click (CPC)",
        text:
          "The advertiser pays according to eligible clicks. This is common in search advertising and other performance-oriented campaigns. A click does not necessarily produce a sale.",
        icon: "ti-click",
      },
      {
        title: "Cost Per Thousand Impressions (CPM)",
        text:
          "The advertiser pays based on a thousand ad impressions under the applicable measurement rules. An impression represents ad delivery, not proof that a person paid attention.",
        icon: "ti-eye",
      },
      {
        title: "Action-Based Pricing",
        text:
          "Some arrangements charge or optimize around a defined action, such as a lead or conversion. The exact payment terms and attribution rules vary by product and contract.",
        icon: "ti-target",
      },
      {
        title: "Sponsored Placements",
        text:
          "A platform or publisher may sell sponsored positions, promoted listings, or agreed advertising placements. Retail media is one example of advertising within a shopping environment.",
        icon: "ti-ad",
      },
      {
        title: "Video and Other Advertising Formats",
        text:
          "Platforms may monetize video, display, audio, and other advertising inventory using different pricing and delivery arrangements.",
        icon: "ti-device-tv",
      },
    ],
  },

  moneyGoes: {
    sub: "What advertising revenue must help pay for",

    items: [
      {
        title: "Technology and Infrastructure",
        text:
          "Ad delivery, auctions, measurement systems, data processing, reliability, and large-scale computing require ongoing investment.",
        icon: "ti-server",
      },
      {
        title: "People and Product Development",
        text:
          "Engineering, sales, customer support, policy, security, and product teams help operate and improve advertising services.",
        icon: "ti-users",
      },
      {
        title: "Publisher and Partner Payments",
        text:
          "Some advertising businesses share revenue with content publishers, website owners, app developers, or other distribution partners. The arrangement depends on the business model.",
        icon: "ti-share",
      },
      {
        title: "Sales and Customer Acquisition",
        text:
          "Advertising businesses may spend money to attract advertisers, support large accounts, and help customers create or manage campaigns.",
        icon: "ti-speakerphone",
      },
      {
        title: "Trust, Safety, and Compliance",
        text:
          "Fraud prevention, content moderation, privacy protection, policy enforcement, and regulatory compliance can create significant operating costs.",
        icon: "ti-shield-check",
      },
    ],
  },

  growth: {
    drivers: {
      title: "What Can Drive Growth?",
      items: [
        "More advertisers using the platform and larger advertising budgets.",
        "Growth in the audience, engagement, or number of advertising opportunities.",
        "Better ad relevance and campaign performance that encourage advertisers to continue spending.",
        "New formats, such as video advertising or sponsored shopping placements.",
        "Improved monetization, when pricing increases without causing a disproportionate decline in demand.",
        "Expansion into new markets, customer groups, or advertising products.",
      ],
    },

    opportunities: {
      title: "Where Opportunities May Exist",
      items: [
        "Retail media can let retailers monetize shopping-related advertising opportunities using their own customer relationships and shopping environments.",
        "Video and creator-related advertising may provide additional ways to reach audiences, although competition for attention is intense.",
        "Improvements in measurement and campaign automation may help advertisers manage spending more effectively.",
        "New digital products and platforms can create additional advertising inventory when they attract valuable audiences.",
      ],
    },

    callout:
      "Growth in advertising revenue does not automatically mean growth in profit. A business must also consider infrastructure costs, partner payments, sales expenses, regulation, and the possibility that higher ad loads or prices could reduce user or advertiser satisfaction.",
  },

  strength: {
    title: "Potential Strengths",
    sub: "Why this model can become attractive when executed well",

    items: [
      {
        title: "Scalable Distribution",
        text:
          "A digital platform can potentially serve additional advertisers and campaigns without increasing every operating cost in direct proportion to revenue.",
        icon: "ti-world",
      },
      {
        title: "Recurring Advertiser Demand",
        text:
          "Businesses may continue advertising when campaigns provide useful results. However, advertising budgets can change quickly with business conditions and performance.",
        icon: "ti-refresh",
      },
      {
        title: "Measurement and Optimization",
        text:
          "Campaign data can help advertisers compare performance, test creative approaches, and adjust budgets. Measurement quality and attribution limitations still matter.",
        icon: "ti-chart-line",
      },
      {
        title: "Audience and Distribution Advantages",
        text:
          "Platforms with substantial audience reach or high-intent usage may offer valuable advertising opportunities that are difficult for smaller competitors to replicate.",
        icon: "ti-users",
      },
      {
        title: "Multiple Advertising Formats",
        text:
          "A platform may offer several formats and campaign objectives, allowing advertisers to use different products for awareness, consideration, and conversion.",
        icon: "ti-layout-grid",
      },
    ],
  },

  competition: {
    compete: {
      title: "How Advertising Businesses Compete",
      items: [
        "Audience size, engagement, and the relevance of the audience to advertisers.",
        "Advertiser return on spending and confidence in campaign measurement.",
        "Ad targeting, delivery technology, and campaign optimization tools.",
        "Available inventory, pricing, brand safety, and advertiser support.",
        "Integration with shopping, search, social, video, or other customer journeys.",
      ],
    },

    challenges: {
      title: "Structural Challenges",
      items: [
        "Advertisers can move budgets between platforms or reduce spending when business conditions weaken.",
        "A platform can lose advertiser trust if measurement is unreliable or campaigns produce disappointing results.",
        "Changes in privacy rules, operating systems, browsers, or regulation can affect targeting and measurement.",
        "Too many ads can damage the user experience and reduce engagement.",
        "Large platforms compete with each other and with traditional media for limited advertising budgets.",
        "Ad fraud, invalid traffic, and misleading content can reduce campaign quality and increase operating costs.",
      ],
    },
  },

  risks: {
    sub: "What can weaken the economics of advertising?",

    items: [
      {
        title: "Dependence on Advertising Budgets",
        text:
          "Advertising spending can be sensitive to economic conditions, business confidence, and the financial health of advertisers. Revenue may slow when customers reduce marketing budgets.",
        icon: "ti-trending-down",
      },
      {
        title: "Privacy and Regulation",
        text:
          "Privacy laws, consent requirements, platform policies, and regulatory decisions can restrict data collection or change how advertising is targeted and measured.",
        icon: "ti-scale",
      },
      {
        title: "Measurement and Attribution",
        text:
          "A platform may report that an ad contributed to a conversion, but measuring the ad's true incremental effect can be difficult. Advertisers may question reported results.",
        icon: "ti-chart-bar",
      },
      {
        title: "Platform and Audience Concentration",
        text:
          "A business that depends on a small number of platforms, publishers, or advertiser categories may be vulnerable to changes in their policies, pricing, or demand.",
        icon: "ti-network",
      },
      {
        title: "User Experience",
        text:
          "Increasing the number or prominence of ads may generate more short-term inventory but can frustrate users and reduce long-term engagement.",
        icon: "ti-mood-sad",
      },
      {
        title: "Competition and Pricing Pressure",
        text:
          "Competing platforms may bid for the same budgets, while advertisers can demand better results or shift spending to channels they consider more effective.",
        icon: "ti-arrows-exchange",
      },
      {
        title: "Fraud and Brand Safety",
        text:
          "Invalid traffic, fake engagement, unsafe placements, or misleading content can damage advertiser confidence and require additional monitoring and controls.",
        icon: "ti-shield-exclamation",
      },
    ],
  },

  metrics: {
    sub: "Metrics that help explain advertising performance",

    items: [
      {
        label: "Advertising Revenue",
        fullName: "Advertising Revenue",
        text:
          "Revenue recognized from advertising activities during a reporting period. Always check what the company includes in this figure and whether it reports advertising separately from other businesses.",
        icon: "ti-report-money",
      },
      {
        label: "Ad Impressions",
        fullName: "Advertising Impressions",
        text:
          "The number of times ads are counted as displayed under the platform's measurement rules. Impressions do not necessarily represent unique people or prove that an ad was noticed.",
        icon: "ti-eye",
      },
      {
        label: "CPC",
        fullName: "Cost Per Click",
        text:
          "The average advertising cost per eligible click. It can be useful for performance campaigns, but a lower CPC does not necessarily mean better business results.",
        icon: "ti-click",
      },
      {
        label: "CPM",
        fullName: "Cost Per Thousand Impressions",
        text:
          "The advertising cost per thousand impressions. CPM helps describe impression-based pricing, but comparisons require consistent definitions and comparable ad formats.",
        icon: "ti-chart-bar",
      },
      {
        label: "CTR",
        fullName: "Click-Through Rate",
        text:
          "The proportion of measured impressions that result in clicks, commonly calculated as clicks divided by impressions. A higher CTR does not automatically mean more sales or profit.",
        icon: "ti-pointer",
      },
      {
        label: "Conversion Rate",
        fullName: "Conversion Rate",
        text:
          "The proportion of a defined set of visits or interactions that complete a specified action. The denominator and conversion definition must be stated before comparing results.",
        icon: "ti-target",
      },
      {
        label: "ROAS",
        fullName: "Return on Ad Spend",
        text:
          "Attributed revenue divided by advertising spend under a stated measurement method. ROAS is not the same as profit or investment return because it may exclude product costs, operating expenses, and other factors.",
        icon: "ti-chart-pie",
      },
      {
        label: "Average Price per Ad",
        fullName: "Average Price per Ad",
        text:
          "A company-specific measure of the average price advertisers pay for ads. Definitions differ across platforms, so it should be interpreted alongside ad volume and the company's own reporting notes.",
        icon: "ti-currency-dollar",
      },
    ],

    callout:
      "Use these metrics together. Revenue can rise because the platform delivers more ads, charges higher prices, or changes its mix of advertising products. No single metric explains the full economics, and company-reported definitions may differ.",
  },

  companies: {
    sub: "Examples of companies that use advertising as a business model",

    items: [
      {
        slug: "google",
        role:
          "Google offers search, video, and network advertising products. Alphabet reports advertising revenue across categories such as Google Search & other, YouTube ads, and Google Network. Alphabet also earns revenue from non-advertising businesses, so total Alphabet revenue should not be treated as advertising revenue.",
      },
      {
        slug: "meta",
        role:
          "Meta monetizes services including Facebook and Instagram primarily through advertising. Its advertising business is influenced by ad impressions, average ad prices, user engagement, advertiser demand, and changes in privacy and measurement.",
      },
      {
        slug: "amazon",
        role:
          "Amazon operates an advertising business alongside its retail, subscription, and cloud activities. Advertising can connect brands and sellers with shoppers, including through sponsored placements. Amazon's total revenue includes many businesses and should not be used as a proxy for advertising revenue.",
      },
    ],
  },

  related: {
    sub: "Explore related business models",

    slugs: ["e-commerce", "marketplace", "ai"],
  },

  disclaimer: SCOPE_DISCLAIMER,
};