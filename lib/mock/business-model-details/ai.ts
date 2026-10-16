import type { BusinessModelDetail } from "./types";

export const AI_DETAIL: BusinessModelDetail = {
  slug: "ai",

  headline:
    "Turning Artificial Intelligence into Useful Products and Services",

  description:
    "Artificial intelligence businesses develop AI models, provide AI infrastructure and services, or build products that use AI to solve customer problems. They generate revenue through subscriptions, usage-based pricing, enterprise contracts, licensing, and AI-powered software. Their economics depend on customer demand, computing costs, product value, competition, and their ability to deliver useful results reliably.",

  characteristics: {
    tags: [
      "High Computing Costs",
      "Multiple Revenue Models",
      "Rapid Innovation",
      "Data and Talent Intensive",
      "Uncertain Monetization",
    ],

    note:
      "AI is a technology that supports several different business models. A company that develops large AI models may have very different costs and revenue sources from a software company that uses an existing model to improve its products. Technical capability alone does not guarantee customer demand or profitability.",
  },

  whatIsIt: {
    sub:
      "Artificial intelligence is technology that enables computer systems to perform tasks such as recognizing patterns, analyzing information, generating content, and assisting with decisions.",

    paragraphs: [
      "AI can help computers perform tasks that often require human judgment or interpretation. Examples include summarizing documents, recognizing objects in images, translating languages, identifying patterns in data, and generating text or code. Different AI systems are designed for different types of tasks, and their capabilities and limitations vary.",

      "An AI business turns this technology into something customers can use. Some companies develop AI models that power other products. Others provide access to models through applications or APIs, which allow developers to connect AI to their own software. Another group builds AI-powered products for specific tasks, such as analyzing business data or assisting with customer support.",

      "AI businesses can occupy different parts of the technology ecosystem. Model developers create the underlying technology. AI service providers make models available to customers. Semiconductor companies supply processors and related technology used to train and run many AI systems. Software companies may integrate AI into products that already serve their customers. These roles can overlap, but they are not the same business model.",

      "Customers pay when an AI product provides enough practical value to justify its price. For example, a business may pay for a tool that helps employees search documents, draft content, or process customer requests. Whether the tool is worthwhile depends on its accuracy, reliability, total cost, and the importance of the problem it solves.",

      "AI systems can make mistakes, produce misleading answers, or perform poorly when information is incomplete or a task falls outside their capabilities. Businesses therefore need to evaluate outputs, protect sensitive information, and decide where human review is necessary. The commercial value of AI depends not only on what a model can do, but also on how safely and effectively it works in real situations.",
    ],
  },

  flow: {
    sub:
      "An AI business turns technology into a useful product, delivers it to customers, and earns revenue when customers are willing to pay for the value they receive.",

    steps: [
      {
        title: "Develop AI Technology",
        text:
          "The company develops an AI model, builds AI-related infrastructure, or selects existing technology that can solve a customer problem.",

        icon: "ti-brain",

        examples: [
          "Training or improving an AI model",
          "Developing tools for AI applications",
          "Integrating an existing AI model",
        ],
      },

      {
        title: "Build a Useful Product",
        text:
          "The company turns the technology into an application, API, platform, or specialized solution that customers can use.",

        icon: "ti-device-laptop",

        examples: [
          "An AI writing assistant",
          "An API for developers",
          "Software that analyzes business documents",
        ],
      },

      {
        title: "Solve Customer Problems",
        text:
          "Customers use the product to help complete tasks, process information, improve workflows, or support decisions.",

        icon: "ti-target",

        examples: [
          "Summarizing documents",
          "Assisting customer support",
          "Searching internal business information",
        ],
      },

      {
        title: "Generate Revenue",
        text:
          "The company charges for access, usage, subscriptions, enterprise agreements, or products that include AI capabilities.",

        icon: "ti-receipt",

        examples: [
          "Monthly subscriptions",
          "Usage-based API charges",
          "Enterprise software contracts",
        ],
      },

      {
        title: "Improve and Scale",
        text:
          "The company improves product quality, manages operating costs, and expands its customer base while maintaining reliable service.",

        icon: "ti-chart-arrows-vertical",

        examples: [
          "Improving model performance",
          "Reducing the cost of serving requests",
          "Expanding to additional customer use cases",
        ],
      },
    ],
  },

  howItWorks: {
    sub:
      "Consider a company that needs to search and summarize thousands of business documents. AI can help, but the business must deliver a result that customers find useful and worth paying for.",

    intro:
      "A business has employees spending significant time finding information in reports, contracts, and internal documents. It considers an AI-powered tool that can search those documents and produce summaries.",

    chain: [
  {
    title: "Build the technology",
    text: "The AI provider or software company develops or integrates technology that can process and summarize documents.",
    tag: "AI provider",
  },
  {
    title: "Connect the documents",
    text: "The business connects the tool to relevant documents, subject to its security and access requirements.",
    tag: "Business",
  },
  {
    title: "Ask and summarize",
    text: "Employees ask questions or request summaries, and the AI system generates responses based on the available information.",
    tag: "Employees",
  },
  {
    title: "Review the results",
    text: "The company evaluates the results and uses human review for important decisions or information that requires verification.",
    tag: "Company",
  },
  {
    title: "Pay for the value",
    text: "The customer pays through a subscription, usage-based pricing, or an enterprise agreement if the product provides enough value for its cost.",
    tag: "Customer",
  },
],

    outro:
      "The customer is paying for a useful outcome, not simply for the presence of AI. If the tool saves time, improves a workflow, or solves a problem more effectively than available alternatives, it may justify its price. However, inaccurate answers, integration work, review requirements, and usage costs can reduce the value the customer receives.",
  },

  whoPays: {
    sub:
      "AI customers range from individuals to large organizations. Each group may pay for different capabilities and use different pricing arrangements.",

    items: [
      {
        title: "Individuals and Professionals",

        text:
          "People pay for AI assistants and productivity tools that help with writing, learning, research, coding, or other personal and professional tasks. They may choose subscriptions when the features provide enough ongoing value.",

        icon: "ti-user",
      },

      {
        title: "Small and Medium Businesses",

        text:
          "Smaller businesses may use AI to assist with customer support, content creation, document processing, or repetitive administrative work. Their willingness to pay depends on the usefulness of the product and the total cost of adopting it.",

        icon: "ti-building-store",
      },

      {
        title: "Large Enterprises",

        text:
          "Large organizations may purchase AI platforms, enterprise software, or customized solutions for internal workflows. They often need to consider security, access controls, integration, reliability, and governance alongside model capabilities.",

        icon: "ti-building-skyscraper",
      },

      {
        title: "Developers and Software Companies",

        text:
          "Developers use AI APIs and related services to add capabilities to their own applications. Depending on the provider, they may pay according to usage, selected models, processing requirements, or service agreements.",

        icon: "ti-code",
      },

      {
        title: "Specialized Industries",

        text:
          "Organizations in areas such as manufacturing, healthcare, finance, and logistics may use AI for specific analytical or operational tasks. These applications often require domain expertise, suitable data, testing, and additional safeguards.",

        icon: "ti-building-factory",
      },
    ],
  },

  makeMoney: {
    sub:
      "AI companies can earn revenue in several ways. The right model depends on what they sell, who their customers are, and how those customers use the product.",

    items: [
      {
        title: "Subscriptions",

        text:
          "Customers pay recurring fees, often monthly or annually, for access to an AI application or a set of features. This model can support recurring revenue when customers continue to find the product useful, but retention and service costs still matter.",

        icon: "ti-refresh",
      },

      {
        title: "API and Usage-Based Pricing",

        text:
          "Developers and businesses pay according to how much they use an AI service. Depending on the provider, charges may be based on input and output tokens, requests, processing time, generated media, or other defined usage units. Revenue can grow with usage, but the cost of serving that usage can also increase.",

        icon: "ti-api",
      },

      {
        title: "Enterprise Contracts",

        text:
          "Companies sell AI services or platforms to organizations under commercial agreements. Contracts may include access to software, deployment support, security features, integrations, service commitments, or other negotiated terms. Contract value and duration vary by customer and provider.",

        icon: "ti-file-invoice",
      },

      {
        title: "AI-Powered Software and Products",

        text:
          "A software company can incorporate AI into an existing product and earn revenue through its main subscription, premium features, or a broader software agreement. In these cases, AI may help attract or retain customers without being reported as a separate revenue category.",

        icon: "ti-apps",
      },

      {
        title: "Licensing and Specialized Solutions",

        text:
          "Some companies license models, technology, or software under defined terms. Others develop AI solutions for particular industries or business needs. The commercial arrangement may involve licensing fees, service fees, usage charges, or a combination, depending on the offering.",

        icon: "ti-license",
      },
    ],
  },

  moneyGoes: {
    sub:
      "AI companies must pay for the people, technology, infrastructure, and operations needed to develop and deliver useful services. The cost structure varies substantially by business model.",

    items: [
      {
        title: "Computing Infrastructure",

        text:
          "Training and running AI systems may require GPUs or other processors, servers, networking, storage, electricity, and cooling. Companies may operate their own infrastructure or purchase computing capacity from cloud and infrastructure providers.",

        icon: "ti-server",
      },

      {
        title: "Research and Model Development",

        text:
          "Companies that develop AI models may spend on research, experimentation, model training, evaluation, and continued improvements. The scale of these costs depends on the technology, the company's approach, and the capabilities it is trying to build.",

        icon: "ti-brain",
      },

      {
        title: "Data and Evaluation",

        text:
          "AI systems need suitable data and testing to assess whether their outputs are useful and reliable. Related work may include data preparation, annotation, quality checks, model evaluation, and testing for errors or harmful behavior.",

        icon: "ti-database",
      },

      {
        title: "People and Operations",

        text:
          "Companies may employ researchers, engineers, product designers, security specialists, sales teams, and customer support staff. Business-to-business products can also require specialists who help customers integrate and operate the technology.",

        icon: "ti-users",
      },

      {
        title: "Deployment, Security, and Compliance",

        text:
          "AI services require software maintenance, monitoring, access controls, security measures, and customer support. Depending on the product and market, companies may also need to address privacy, regulatory, contractual, and industry-specific requirements.",

        icon: "ti-shield-check",
      },
    ],
  },

  growth: {
    drivers: {
      title: "What Drives Demand?",

      items: [
        "Business automation: organizations may adopt AI to assist with repetitive tasks, information processing, and selected workflows when the results justify the cost.",

        "Wider AI adoption: as businesses gain experience with AI, some may move from experiments to regular use in products and internal operations.",

        "Demand for specialized applications: customers may seek AI tools tailored to particular tasks, industries, languages, or existing software systems.",

        "Developer ecosystems: APIs and AI platforms allow developers to build new applications without necessarily developing their own foundational models.",

        "Advances in performance and efficiency: improvements in capability, reliability, and operating cost may make additional applications commercially practical.",
      ],
    },

    opportunities: {
      title: "Where Can AI Businesses Grow?",

      items: [
        "Expand existing customer relationships by offering additional features, higher service tiers, or more AI-enabled workflows.",

        "Develop specialized products that solve clear problems for particular customer groups rather than relying only on general-purpose AI tools.",

        "Improve inference efficiency, which means the resources needed to generate model outputs, so services can become more economical to operate.",

        "Integrate AI into existing software and business systems where customers already work, reducing the friction of adopting a separate product.",

        "Provide enterprise capabilities such as access controls, monitoring, evaluations, and workflow integration for organizations that need more than a basic AI assistant.",
      ],
    },

    callout:
      "Growing interest in AI creates opportunities, not guaranteed revenue or profit. A company still needs customers who will pay, a product that solves a real problem, manageable computing and operating costs, and a way to compete as technology changes.",
  },

  strength: {
    title: "Why This Business Model Can Be Powerful",

    sub:
      "AI can create valuable products and services, but the strength of a business depends on how effectively it turns technical capabilities into customer value.",

    items: [
      {
        title: "Broad Range of Use Cases",

        text:
          "AI technology can support tasks across many industries, including information processing, software development, customer support, and selected analytical workflows. Companies that solve a specific customer problem may find a clear reason for customers to pay.",

        icon: "ti-apps",
      },

      {
        title: "Scalable Digital Products",

        text:
          "Some AI software products can serve additional customers through shared software and infrastructure rather than rebuilding the entire product for every customer. However, more usage may still require additional computing capacity, support, and operating spending.",

        icon: "ti-arrows-maximize",
      },

      {
        title: "Recurring Revenue Potential",

        text:
          "Subscription services and enterprise agreements can generate recurring revenue when customers continue to use the product. This benefit depends on retention, contract terms, competition, and whether customers continue to see sufficient value.",

        icon: "ti-refresh",
      },

      {
        title: "Integration into Workflows",

        text:
          "When an AI product becomes part of a customer's daily workflow, replacing it may require retraining, integration work, and changes to existing processes. This can support retention, although customers may still switch providers or use multiple models.",

        icon: "ti-puzzle",
      },

      {
        title: "Continuous Product Improvement",

        text:
          "Companies can improve models, software, interfaces, and supporting tools over time. Better performance or lower operating costs may improve customer value, but technical improvements must translate into benefits that customers recognize and are willing to pay for.",

        icon: "ti-trending-up",
      },
    ],
  },

  competition: {
    compete: {
      title: "How AI Businesses Compete",

      items: [
        "Quality and reliability: how accurately, consistently, and appropriately a product performs the tasks customers need.",

        "Price and efficiency: the cost of using the service, the resources required to deliver it, and the value customers receive for their spending.",

        "Product experience: how easily customers can use the technology and fit it into their existing work.",

        "Distribution and integration: access to customers through software platforms, developer tools, business applications, and established commercial relationships.",

        "Trust and security: how well a provider handles customer data, access permissions, system reliability, and relevant security requirements.",

        "Specialization and differentiation: the ability to serve a particular industry, workflow, language, or use case better than available alternatives.",
      ],
    },

    challenges: {
      title: "What Makes Competition Difficult?",

      items: [
        "New models and techniques can reduce the advantage of existing products, forcing companies to improve their offerings continuously.",

        "Customers may compare different models, switch providers, use open models, or combine several services rather than relying on one vendor.",

        "A technically impressive model does not automatically become a successful product. Companies must also solve distribution, pricing, usability, and customer-retention problems.",

        "Infrastructure and model-development costs can be substantial, while customers may expect better performance at lower prices over time.",

        "AI providers must manage reliability, privacy, security, and the risk of incorrect outputs while competing on speed, quality, and price.",
      ],
    },
  },

  risks: {
    sub:
      "AI businesses face financial, technical, operational, and competitive risks. The importance of each risk depends on whether a company develops models, operates AI services, or builds products using existing technology.",

    items: [
      {
        title: "High Computing Costs",

        text:
          "Training and serving certain AI models can require substantial computing resources. If usage grows faster than expected, or prices fall faster than costs, a provider may struggle to maintain attractive margins.",

        icon: "ti-server",
      },

      {
        title: "Intense Competition",

        text:
          "Competing providers may offer better performance, lower prices, different capabilities, or easier integration. Customers may switch products or combine several providers, making it difficult to maintain differentiation.",

        icon: "ti-users",
      },

      {
        title: "Uncertain Monetization",

        text:
          "High usage, strong public interest, or a large number of users does not automatically produce sustainable revenue. Customers must be willing to pay enough to cover the costs of developing, delivering, and supporting the product.",

        icon: "ti-currency-dollar",
      },

      {
        title: "Accuracy and Reliability",

        text:
          "AI systems can generate incorrect, incomplete, or misleading outputs. Products used in important workflows may need evaluations, safeguards, human review, and clear limits on what the system should be trusted to do.",

        icon: "ti-shield-exclamation",
      },

      {
        title: "Data, Privacy, and Regulation",

        text:
          "AI products may process sensitive or proprietary information and may be subject to privacy, intellectual property, security, or sector-specific requirements. Failure to manage these issues can lead to legal exposure, customer losses, or reputational damage.",

        icon: "ti-lock",
      },

      {
        title: "Technology and Supplier Dependence",

        text:
          "Some AI companies depend on external model providers, cloud platforms, processors, or other suppliers. Changes in availability, pricing, technical capabilities, or contract terms can affect product costs and service quality.",

        icon: "ti-network",
      },
    ],
  },

  metrics: {
    sub:
      "These metrics can help explain an AI business's revenue, customer relationships, and operating economics. Companies disclose different information, so not every metric will be available or comparable across providers.",

    items: [
      {
        label: "AI Revenue Growth",

        fullName: "Year-over-Year Revenue Growth from AI Products or Services",

        text:
          "Shows how revenue from a defined AI business or product category changes over time, when the company reports it separately. Some companies combine AI revenue with broader software, cloud, advertising, or other business categories, so total company revenue should not be treated as AI revenue.",

        icon: "ti-chart-line",
      },

      {
        label: "Recurring Revenue",

        fullName: "Revenue from Subscriptions and Ongoing Contracts",

        text:
          "Helps explain revenue generated from subscriptions or recurring customer agreements. Definitions vary: annual recurring revenue is a commonly used operating metric, but it is not the same as recognized revenue under financial accounting rules. Check how the company defines and reports the measure.",

        icon: "ti-refresh",
      },

      {
        label: "Gross Margin",

        fullName: "Revenue Less Cost of Revenue, as a Percentage of Revenue",

        text:
          "Shows the proportion of revenue remaining after the costs classified as cost of revenue are deducted. For AI businesses, these costs may include computing and service delivery expenses, depending on the company's accounting policies. Gross margin does not include every operating expense, such as all research, sales, and administrative costs.",

        icon: "ti-chart-bar",
      },

      {
        label: "Customer Retention",

        fullName: "The Rate at Which Customers Continue Using a Product",

        text:
          "Helps indicate whether customers continue paying for or using a service over time. Companies may report customer retention, renewal rates, churn, or other related measures. These metrics are not interchangeable, and many companies do not disclose them in a directly comparable form.",

        icon: "ti-users",
      },

      {
        label: "Usage and Revenue per Customer",

        fullName: "Customer Usage and Average Revenue per Customer",

        text:
          "Usage measures can help explain how frequently customers use an AI service, while revenue per customer can provide context about monetization. The definitions vary by product. More usage may increase revenue, but it may also increase computing and support costs.",

        icon: "ti-activity",
      },

      {
        label: "Computing Cost and Efficiency",

        fullName: "The Cost and Resources Required to Deliver AI Services",

        text:
          "Helps explain how much computing capacity and operating resources are required to serve a given workload. Some companies disclose selected efficiency or infrastructure measures, while others do not. There is no single standardized public metric that allows every AI provider to be compared directly.",

        icon: "ti-cpu",
      },
    ],

    callout:
      "Read metrics together and check each company's definitions. Revenue growth does not guarantee profit, recurring revenue does not guarantee customer retention, and increasing AI usage does not guarantee improving margins if service costs rise at the same time.",
  },

  companies: {
    sub:
      "These Scope companies participate in different parts of the AI ecosystem. Some develop AI technology, some provide platforms or infrastructure, and others integrate AI into broader software products. Their total company revenue should not automatically be treated as AI revenue.",

    items: [
      {
        slug: "google",

        role:
          "Alphabet's Google develops AI models and integrates AI capabilities into products and services across its business, including Google Cloud. Google also operates major businesses outside AI, including advertising and other consumer services. Its total revenue is therefore not equivalent to revenue generated specifically by AI.",
      },

      {
        slug: "microsoft",

        role:
          "Microsoft integrates AI into software and services and provides AI-related capabilities through Azure and other offerings for developers and organizations. Its business spans productivity software, cloud services, operating systems, and other products, so its total company revenue should not be treated as AI-only revenue.",
      },

      {
        slug: "amazon",

        role:
          "Amazon provides AI-related infrastructure, tools, and services through Amazon Web Services (AWS), helping customers build and operate AI applications. Amazon also operates e-commerce, advertising, and other businesses. AWS is an important part of the cloud and AI ecosystem, but Amazon's total revenue is not the same as AI revenue.",
      },

      {
        slug: "nvidia",

        role:
          "NVIDIA supplies GPUs, accelerated-computing systems, networking technologies, and software that support the training and operation of many AI systems. It plays an important role in the AI infrastructure supply chain, but supplying computing technology is different from operating a general-purpose AI model service or consumer AI application.",
      },

      {
        slug: "meta",

        role:
          "Meta develops AI models and uses AI across its products and platforms, including systems that support content recommendations, advertising, and other experiences. Meta's business also relies heavily on advertising, so the presence of AI across its products does not mean that all of its revenue is directly generated by selling AI services.",
      },

      {
        slug: "palantir",

        role:
          "Palantir provides software platforms that help organizations integrate data, manage operations, and build AI-enabled workflows. Its Artificial Intelligence Platform connects organizations with AI models and supports the development and operation of AI applications. Its role is primarily focused on enterprise software and deployment rather than being only a foundational-model developer.",
      },
    ],
  },

  related: {
    sub:
      "AI connects closely with cloud computing, semiconductor technology, and software subscriptions. These business models support one another but represent different ways of creating and selling value.",

    slugs: ["cloud", "semiconductors", "saas"],
  },

  disclaimer:
    "Scope is built for understanding businesses and industries, not for investment advice.",
};