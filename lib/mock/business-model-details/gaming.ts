import {
  SCOPE_DISCLAIMER,
  type BusinessModelDetail,
} from "./types";

export const gamingDetail: BusinessModelDetail = {
  slug: "gaming",

  headline: "Understand How the Gaming Industry Makes Money",

  description:
    "Gaming businesses create and distribute interactive entertainment through game sales, in-game purchases, subscriptions, advertising, and digital platforms. Each model has different revenue drivers, costs, competitive advantages, and risks.",

  characteristics: {
    tags: [
      "Digital Entertainment",
      "Intellectual Property",
      "Player Engagement",
      "Multiple Revenue Models",
      "Hit-Driven Risk",
    ],
    note:
      "Gaming is an industry with several business models, not one uniform model. Game developers, publishers, platform operators, hardware manufacturers, and service providers can participate in the same ecosystem while earning revenue in different ways.",
  },

  whatIsIt: {
    sub: "Understanding the businesses behind video games",
    paragraphs: [
      "The gaming industry includes companies that develop games, publish them, distribute them, operate gaming platforms, and manufacture hardware. Some companies focus on creating games, while others provide the technology or services that help players access them.",

      "A premium game typically earns revenue when customers purchase the game. A free-to-play game may generate revenue from optional in-game purchases or advertising. A subscription service may charge customers regularly for access to a library of games or other benefits.",

      "Gaming platforms can also earn revenue from game sales, digital distribution, subscriptions, or related services. The exact arrangement depends on the platform, the agreements with developers and publishers, and the products being sold.",

      "The cost structure varies substantially. A game developer may spend years creating a title before launch. An online game may also require ongoing updates, server infrastructure, customer support, and security. A platform operator may have additional hardware, distribution, and content-related costs.",

      "Successful games can attract large audiences and sometimes generate revenue over many years. However, demand is difficult to predict. A game can fail to attract enough players, development costs can exceed expectations, and player interest can decline. Strong revenue does not automatically mean strong profit or cash flow.",
    ],
  },

  flow: {
    sub: "From game development to customer spending",
    steps: [
      {
        title: "Create the Game",
        text:
          "A development team designs the gameplay, builds the software, creates visual and audio content, and tests the experience. Development time and costs depend on the game's scope and complexity.",
        icon: "ti-device-gamepad-2",
        examples: [
          "Designing gameplay and game mechanics.",
          "Creating characters, environments, and sound.",
          "Testing performance and fixing software problems.",
        ],
      },
      {
        title: "Publish and Distribute",
        text:
          "The game reaches players through a publisher, digital storefront, console ecosystem, mobile app store, or another distribution channel.",
        icon: "ti-world",
        examples: [
          "Launching a premium game on a digital storefront.",
          "Releasing a mobile game through an app store.",
          "Publishing a game on a console platform.",
        ],
      },
      {
        title: "Attract Players",
        text:
          "The company attempts to reach its intended audience through marketing, community building, reviews, partnerships, and other distribution activities.",
        icon: "ti-users",
        examples: [
          "Promoting a new game before launch.",
          "Building a community around a game franchise.",
          "Using updates to encourage players to return.",
        ],
      },
      {
        title: "Generate Revenue",
        text:
          "Depending on the business model, players may buy the game, purchase optional content, pay for subscriptions, or view advertisements.",
        icon: "ti-cash",
        examples: [
          "Selling a premium game.",
          "Offering optional cosmetic items.",
          "Charging a recurring subscription fee.",
        ],
      },
      {
        title: "Maintain and Improve",
        text:
          "Some games require continuing updates, customer support, online infrastructure, and new content to maintain engagement and support future revenue.",
        icon: "ti-refresh",
        examples: [
          "Releasing new gameplay content.",
          "Fixing bugs and addressing security problems.",
          "Improving online services and player support.",
        ],
      },
    ],
  },

  howItWorks: {
    sub: "How the gaming business ecosystem connects",
    intro:
      "A gaming transaction may involve several parties. The company that develops a game is not necessarily the company that distributes it, operates the platform, or receives the entire amount paid by the customer.",
    chain: [
      {
        title: "Developers",
        text:
          "Create the game's software, mechanics, visual content, audio, and other intellectual property. Development may be performed internally or under contract.",
        tag: "Creation",
      },
      {
        title: "Publishers",
        text:
          "Depending on the agreement, publishers may fund development, coordinate marketing, manage distribution, and support a game's commercial launch.",
        tag: "Publishing",
      },
      {
        title: "Platforms and Stores",
        text:
          "Digital storefronts and gaming platforms help players discover, purchase, download, or access games. Commercial arrangements determine how transactions and revenue are shared.",
        tag: "Distribution",
      },
      {
        title: "Players",
        text:
          "Players may purchase a game, pay for optional content, subscribe to a service, or use an ad-supported game without making a direct purchase.",
        tag: "Customers",
      },
      {
        title: "Ongoing Operations",
        text:
          "For games that continue operating after launch, companies may provide new content, technical support, moderation, security, and other services.",
        tag: "Retention",
      },
    ],
    outro:
      "These roles can overlap. One company may develop, publish, and distribute its own games, while another may specialize in only one part of the value chain. Revenue-sharing arrangements also vary by contract.",
  },

  whoPays: {
    sub: "Gaming businesses can earn money from players and other commercial customers.",
    items: [
      {
        title: "Game Buyers",
        text:
          "Customers pay to purchase a premium game or another product that grants access to specified game content. The purchase price is not the same as the developer's profit.",
        icon: "ti-device-gamepad-2",
      },
      {
        title: "In-Game Purchasers",
        text:
          "Some players spend additional money on optional content, virtual currency, cosmetic items, expansions, or other digital goods. Spending depends on the game and its purchasing design.",
        icon: "ti-shopping-cart",
      },
      {
        title: "Subscribers",
        text:
          "Customers pay recurring fees for access to a gaming service, game library, or other benefits according to the subscription terms.",
        icon: "ti-calendar-repeat",
      },
      {
        title: "Advertisers",
        text:
          "In games that support advertising, advertisers pay to reach audiences. The publisher's actual revenue depends on the advertising arrangement and the way advertisements are delivered.",
        icon: "ti-ad",
      },
      {
        title: "Platform Customers and Business Partners",
        text:
          "Depending on the business, platforms may earn money from transactions, distribution services, hardware, subscriptions, or commercial agreements with other companies.",
        icon: "ti-building-store",
      },
    ],
  },

  makeMoney: {
    sub: "Different gaming models monetize different parts of the player experience.",
    items: [
      {
        title: "Premium Game Sales",
        text:
          "Players pay to purchase a game. Revenue depends on factors such as units sold, selling prices, discounts, refunds, and the company's distribution arrangements. Development and marketing costs can be substantial even when a game sells well.",
        icon: "ti-device-gamepad-2",
      },
      {
        title: "Free-to-Play and In-Game Purchases",
        text:
          "Players can access a game without paying an initial purchase price, while some choose to buy optional digital items, virtual currency, expansions, or other content. A large player base does not guarantee high spending or profitability.",
        icon: "ti-shopping-cart",
      },
      {
        title: "Gaming Subscriptions",
        text:
          "Customers pay recurring fees for access to a service or collection of games. The economics depend on subscription pricing, customer retention, acquisition costs, content expenses, and the terms of access.",
        icon: "ti-calendar-repeat",
      },
      {
        title: "Digital Distribution and Platforms",
        text:
          "A platform operator may earn revenue from game transactions, digital distribution, hardware, subscriptions, or other services. The revenue retained from a transaction depends on the specific commercial arrangement.",
        icon: "ti-world",
      },
      {
        title: "In-Game Advertising",
        text:
          "Some games generate revenue by displaying advertisements or integrating advertising into the experience. Revenue depends on factors such as audience activity, advertising demand, placement, and the applicable payment arrangement.",
        icon: "ti-ad",
      },
      {
        title: "Licensing and Other Commercial Arrangements",
        text:
          "Some gaming businesses earn money through intellectual-property licensing, partnerships, or other agreements. These arrangements differ by company and should not automatically be treated as recurring revenue.",
        icon: "ti-file-contract",
      },
    ],
  },

  moneyGoes: {
    sub: "Gaming costs depend on whether a company develops games, publishes them, or operates a platform.",
    items: [
      {
        title: "Game Development",
        text:
          "Development costs may include salaries for programmers, designers, artists, producers, writers, and other specialists, as well as external development services and production tools.",
        icon: "ti-code",
      },
      {
        title: "Marketing and Player Acquisition",
        text:
          "Companies may spend on advertising, promotional campaigns, partnerships, events, and other activities to attract players. Spending does not guarantee that a game will become successful.",
        icon: "ti-speakerphone",
      },
      {
        title: "Content and Live Operations",
        text:
          "Games that continue operating after launch may require new content, updates, balancing, customer support, moderation, and technical maintenance.",
        icon: "ti-refresh",
      },
      {
        title: "Servers and Infrastructure",
        text:
          "Online games and gaming services may incur costs for hosting, networking, storage, software infrastructure, reliability, and security. Requirements differ across game types.",
        icon: "ti-server",
      },
      {
        title: "Distribution and Platform Fees",
        text:
          "Depending on contracts and sales channels, publishers may share transaction revenue with platforms, distributors, licensors, or other commercial partners.",
        icon: "ti-receipt",
      },
      {
        title: "Hardware and Research",
        text:
          "Companies that manufacture gaming hardware or develop related technology may face additional engineering, manufacturing, inventory, logistics, and product-development costs.",
        icon: "ti-device-desktop",
      },
    ],
  },

  growth: {
    drivers: {
      title: "What Can Drive Growth?",
      items: [
        "Launching games that attract a sufficiently large audience and deliver an experience players want.",
        "Expanding distribution to additional platforms, regions, or customer groups when the economics support doing so.",
        "Creating additional revenue opportunities through expansions, optional purchases, subscriptions, or advertising where appropriate.",
        "Maintaining player engagement through updates, new content, and reliable service in games designed for ongoing operation.",
        "Developing recognizable intellectual property that can support additional games or related products, provided future releases meet customer expectations.",
        "Improving the efficiency of development, marketing, distribution, and live operations without undermining product quality.",
      ],
    },
    opportunities: {
      title: "Where Can Opportunities Come From?",
      items: [
        "Reaching new audiences through additional platforms or distribution channels.",
        "Extending the useful commercial life of successful games through meaningful updates or expansions.",
        "Developing new intellectual property instead of relying entirely on established franchises.",
        "Improving the player experience to support engagement and repeat purchases.",
        "Using technology to improve development workflows, performance, accessibility, or online services.",
        "Building commercial partnerships that help a game reach its intended audience.",
      ],
    },
    callout:
      "Growth depends on the specific game, audience, monetization model, and cost structure. More players or higher revenue do not automatically translate into higher profit or stronger cash flow.",
  },

  strength: {
    title: "What Can Create a Competitive Advantage?",
    sub:
      "Potential advantages in gaming often depend on a company's creative capabilities, intellectual property, distribution, and ability to maintain a player community.",
    items: [
      {
        title: "Recognizable Intellectual Property",
        text:
          "A well-known game or franchise may help attract an audience and create demand for future releases. However, past success does not guarantee that a sequel or new title will perform well.",
        icon: "ti-award",
      },
      {
        title: "Development Expertise",
        text:
          "Experienced teams, effective production processes, and specialized technical capabilities may help a company create high-quality games. These capabilities still require investment and do not remove creative risk.",
        icon: "ti-code",
      },
      {
        title: "Player Community",
        text:
          "An engaged community may help sustain interest, provide feedback, and support ongoing activity. The value of a community depends on the game, player preferences, and the quality of continued support.",
        icon: "ti-users",
      },
      {
        title: "Distribution and Platform Access",
        text:
          "Established distribution relationships and access to relevant platforms may help games reach customers. Access can still depend on platform rules, commercial agreements, and competition.",
        icon: "ti-world",
      },
      {
        title: "Live-Service Capabilities",
        text:
          "For games designed for ongoing operation, effective updates, technical support, moderation, and content delivery may help maintain the player experience.",
        icon: "ti-refresh",
      },
      {
        title: "Portfolio Diversification",
        text:
          "A portfolio of games may reduce dependence on a single release, although it also requires resources to develop and support multiple products. Diversification cannot eliminate the risk of disappointing results.",
        icon: "ti-layers",
      },
    ],
  },

  competition: {
    compete: {
      title: "How Do Gaming Businesses Compete?",
      items: [
        "Gameplay quality, originality, usability, and the overall player experience.",
        "Brand recognition, intellectual property, and the ability to create memorable games.",
        "Price, content value, and the suitability of a game's monetization model.",
        "Distribution access, platform compatibility, and discoverability.",
        "Reliable online services, relevant updates, and effective player support.",
        "Efficient development, marketing, and operation relative to the revenue a game can generate.",
      ],
    },
    challenges: {
      title: "Why Can Competition Be Difficult?",
      items: [
        "Players have many entertainment choices and can move to other games when their interests change.",
        "A game may require substantial development spending before the company knows whether customers will respond positively.",
        "Marketing costs can rise while attracting players becomes more difficult.",
        "Established franchises compete with new releases for players' time and spending.",
        "Platform owners and distribution partners may influence access, commercial terms, and the economics of selling a game.",
        "A company can release a technically polished game that still fails to attract enough demand.",
      ],
    },
  },

  risks: {
    sub:
      "Gaming businesses face creative, commercial, technical, and financial risks that vary by business model.",
    items: [
      {
        title: "Game Launch Risk",
        text:
          "A new game may attract fewer players or generate less spending than expected. Development and marketing costs may already have been incurred before demand becomes clear.",
        icon: "ti-alert-triangle",
      },
      {
        title: "Development Delays and Cost Overruns",
        text:
          "Complex projects may take longer or cost more than planned because of technical difficulties, changing requirements, staffing challenges, or production problems.",
        icon: "ti-clock",
      },
      {
        title: "Dependence on Major Releases",
        text:
          "Companies that rely heavily on a small number of games may be vulnerable when a release is delayed, underperforms, or loses player interest.",
        icon: "ti-target",
      },
      {
        title: "Player Retention and Engagement",
        text:
          "Players may stop playing as preferences change or competitors release more attractive games. Lower engagement can affect in-game purchases, subscriptions, and advertising opportunities.",
        icon: "ti-users",
      },
      {
        title: "Platform and Distribution Risk",
        text:
          "Changes in platform policies, distribution access, technical requirements, or commercial terms may affect how a company reaches players and earns revenue.",
        icon: "ti-world",
      },
      {
        title: "Monetization Risk",
        text:
          "A game's pricing or monetization design may not match player expectations. Excessive or poorly designed monetization can harm the player experience and damage long-term demand.",
        icon: "ti-cash",
      },
      {
        title: "Technology and Security",
        text:
          "Online games may face outages, cheating, account theft, data-security incidents, and other technical problems that disrupt service or damage trust.",
        icon: "ti-shield-check",
      },
      {
        title: "Changing Player Preferences",
        text:
          "Genres, platforms, and player expectations can change. A company may struggle if its products fail to adapt or if it invests heavily in a market that does not develop as expected.",
        icon: "ti-arrows-exchange",
      },
    ],
  },

  metrics: {
    sub:
      "Gaming metrics vary by company and business model. Read each company's definitions before comparing its results with competitors.",
    items: [
      {
        label: "Revenue Growth",
        fullName: "Change in Revenue Over Time",
        text:
          "Measures how reported revenue changes over a period. It helps show whether a business is expanding, but does not explain whether growth comes from game sales, subscriptions, in-game spending, acquisitions, or another source. Revenue growth does not establish profitability.",
        icon: "ti-chart-line",
      },
      {
        label: "Gross Margin",
        fullName: "Gross Profit as a Percentage of Revenue",
        text:
          "Shows how much revenue remains after the costs included in cost of revenue. It can help assess the economics of a business, but cost classifications vary. A developer, platform operator, and hardware manufacturer may have very different cost structures.",
        icon: "ti-chart-pie",
      },
      {
        label: "Bookings",
        fullName: "A Company-Defined Sales or Transaction Measure",
        text:
          "Some gaming companies report bookings as an operating measure. Depending on the company's definition, it may reflect amounts sold or transactions made during a period, including items that are recognized as revenue at a different time. It is not a universal accounting measure, so always read the company's definition and reconciliation.",
        icon: "ti-receipt",
      },
      {
        label: "Daily Active Users",
        fullName: "DAU — Daily Active Users",
        text:
          "Measures the number of users who meet a company's definition of active during a day. It can help describe audience activity, but definitions differ and a user count does not reveal how much users spend or whether the game is profitable.",
        icon: "ti-users",
      },
      {
        label: "Monthly Active Users",
        fullName: "MAU — Monthly Active Users",
        text:
          "Measures users who meet a company's definition of active during a month. It can indicate the reach of a game or service, but the time window differs from DAU and reported figures may not be comparable across companies.",
        icon: "ti-calendar",
      },
      {
        label: "Player Retention",
        fullName: "The Share of Players Who Return",
        text:
          "Measures how many players return after a defined period, such as the day or week after starting a game. It can help assess engagement, but the result depends on the starting group, measurement window, and definition of an active player.",
        icon: "ti-refresh",
      },
      {
        label: "Customer Acquisition Cost",
        fullName: "CAC — Cost to Acquire a Customer",
        text:
          "Estimates the cost of acquiring a customer under a stated methodology. It can help assess marketing efficiency, but calculations vary. In free-to-play games, acquiring a player is not the same as acquiring a paying customer, so the denominator must be clear.",
        icon: "ti-speakerphone",
      },
      {
        label: "Operating Cash Flow",
        fullName: "Cash Flow from Operating Activities",
        text:
          "Measures the net cash generated or used by operating activities during a period. It helps assess cash generation, but can be affected by payment timing, working capital, and other factors. It is not the same as revenue, bookings, or accounting profit.",
        icon: "ti-cash",
      },
    ],
    callout:
      "DAU, MAU, retention, and CAC are not defined identically across every company. Use company-reported definitions and comparable periods. A larger audience or higher bookings figure does not automatically mean a more profitable business.",
  },

  companies: {
    sub:
      "These companies illustrate different parts of the gaming ecosystem. Neither should be treated as a pure-play video game developer.",
    items: [
      {
        slug: "microsoft",
        role:
          "Microsoft participates in gaming through Xbox, including gaming content and services as well as hardware. Its broader business also includes cloud services, productivity software, and other activities. When studying gaming performance, separate Xbox-related disclosures from Microsoft's total company results and distinguish content and services from hardware where the reports permit.",
      },
      {
        slug: "nvidia",
        role:
          "NVIDIA participates in the gaming ecosystem through graphics processing units and related technology used in gaming PCs and other products. It is primarily a semiconductor and computing-platform company, not a video game publisher. Its overall financial results include businesses beyond gaming, so total company revenue should not be presented as gaming revenue.",
      },
    ],
  },

  related: {
    sub:
      "Explore business models that overlap with gaming through recurring access, advertising, and digital distribution.",
    slugs: [
      "saas",
      "advertising",
      "marketplace",
    ],
  },

  disclaimer: SCOPE_DISCLAIMER,
};