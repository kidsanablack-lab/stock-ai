import { SCOPE_DISCLAIMER, type BusinessModelDetail } from "./types";

export const defenseAerospaceDetail: BusinessModelDetail = {
  slug: "defense-aerospace",

  headline: "How Defense & Aerospace Businesses Make Money",

  description:
    "Defense and aerospace businesses design, manufacture, and support complex products such as aircraft, engines, defense systems, satellites, and specialized equipment. They may earn money from government contracts, commercial product sales, replacement parts, and long-term maintenance services. Their financial results depend on contract terms, engineering execution, production costs, customer demand, and regulatory requirements.",

  characteristics: {
    tags: [
      "Complex Engineering",
      "Long Development Cycles",
      "Government Contracts",
      "High R&D Costs",
      "Long-Term Services",
    ],
    note:
      "Defense and aerospace is an industry, not one uniform business model. A defense contractor, commercial aircraft manufacturer, engine supplier, satellite developer, and maintenance provider can have very different customers, costs, and financial risks.",
  },

  whatIsIt: {
    sub: "Understand the different businesses within the industry.",
    paragraphs: [
      "Defense and aerospace businesses build products and provide services for military, government, commercial aviation, and space customers. Depending on the company, this may include aircraft, engines, sensors, communications equipment, defense systems, satellites, and technical support.",
      "Some businesses earn revenue by winning contracts and delivering products or services over time. Others sell equipment to airlines or manufacturers, develop space technology, or provide spare parts and maintenance for products already in use.",
      "Large engineering programs can require substantial research, testing, specialist employees, equipment, and supplier coordination before a product is ready. A company must manage these costs while meeting technical, safety, quality, and contractual requirements.",
      "Winning a contract does not automatically mean a company has earned the full contract value, received all the cash, or made a profit. Revenue recognition depends on the applicable accounting rules and contract terms. Actual profitability also depends on execution costs, changes in project estimates, and other business expenses.",
    ],
  },

  flow: {
    sub: "Follow the process from customer needs to revenue and cash flow.",
    steps: [
      {
        title: "Identify a customer need",
        text:
          "A government agency, airline, aircraft manufacturer, or other customer identifies a need for a product, system, or service.",
        icon: "ti-target",
        examples: [
          "A government seeks a defense system",
          "An airline needs aircraft or engine support",
          "An operator needs satellite-related services",
        ],
      },
      {
        title: "Design and develop the solution",
        text:
          "The supplier develops a product or service that meets the customer's technical, safety, performance, and contractual requirements.",
        icon: "ti-bulb",
        examples: [
          "Engineering and testing a new system",
          "Developing aircraft components",
          "Designing satellite equipment",
        ],
      },
      {
        title: "Win an order or contract",
        text:
          "The company competes for an order, negotiates contract terms, or sells products and services through an established commercial relationship.",
        icon: "ti-file-check",
        examples: [
          "Winning a government procurement contract",
          "Supplying engines to an aircraft manufacturer",
          "Agreeing on a maintenance service contract",
        ],
      },
      {
        title: "Manufacture and deliver",
        text:
          "The company coordinates suppliers, production, quality assurance, testing, and delivery. Complex programs may take years to complete.",
        icon: "ti-settings",
        examples: [
          "Manufacturing specialized equipment",
          "Testing components before delivery",
          "Delivering products under contract milestones",
        ],
      },
      {
        title: "Recognize revenue and collect cash",
        text:
          "Revenue is recognized under the applicable accounting rules and contract terms. Cash collection follows the customer's payment arrangements and may occur at different times.",
        icon: "ti-cash",
        examples: [
          "Recognizing revenue as qualifying work is performed",
          "Receiving payment after an agreed milestone",
          "Collecting payment for delivered products",
        ],
      },
      {
        title: "Support products over time",
        text:
          "Some suppliers continue earning revenue by providing replacement parts, repairs, inspections, upgrades, and technical support after the original sale.",
        icon: "ti-tool",
        examples: [
          "Supplying replacement components",
          "Repairing aircraft equipment",
          "Providing long-term technical support",
        ],
      },
    ],
  },

  howItWorks: {
    sub: "Four business models explain much of the industry's different economics.",
    intro:
      "Companies can participate in several of these activities at once. The examples below describe different ways businesses earn revenue; they are not mutually exclusive categories.",

    chain: [
      {
        title: "Defense systems and government contracting",
        text:
          "Companies develop, manufacture, or support products for government customers. Revenue may be recognized as work is performed or when other contractual requirements are met. Contract type, project execution, and customer funding can affect financial outcomes.",
        tag: "Government contracts",
      },
      {
        title: "Aerospace manufacturing",
        text:
          "Companies manufacture aircraft, engines, avionics, and specialized components for commercial or government customers. Their economics depend on production efficiency, product quality, supplier performance, pricing, and delivery schedules.",
        tag: "Product sales",
      },
      {
        title: "Space and advanced technology",
        text:
          "Companies design and supply satellites, spacecraft components, sensors, and related systems or services. Some projects depend on long development cycles, technical milestones, and specialized customer requirements.",
        tag: "Technology and systems",
      },
      {
        title: "Maintenance, repair, and sustainment",
        text:
          "Companies provide spare parts, repairs, inspections, upgrades, and ongoing technical support for equipment already in service. Revenue depends on the installed product base, customer requirements, contract terms, and service execution.",
        tag: "Aftermarket services",
      },
    ],

    outro:
      "For example, Lockheed Martin illustrates defense contracting, while RTX participates in both defense and commercial aerospace. Boeing has commercial aircraft, defense and space, and services businesses. These companies are useful case studies, but none should be treated as representative of every business in the industry.",
  },

  whoPays: {
    sub: "Customers vary depending on the product, service, and end market.",
    items: [
      {
        title: "Government agencies",
        text:
          "Government customers may procure defense systems, aircraft, equipment, research, and support services. Orders, funding, delivery requirements, and payment terms depend on the relevant procurement and contract arrangements.",
        icon: "ti-building-bank",
      },
      {
        title: "Airlines and aircraft operators",
        text:
          "Commercial operators may purchase aircraft-related products, engines, replacement parts, repairs, and maintenance services.",
        icon: "ti-plane",
      },
      {
        title: "Aircraft and equipment manufacturers",
        text:
          "Manufacturers may buy engines, electronics, materials, and other components to incorporate into larger products.",
        icon: "ti-settings",
      },
      {
        title: "Space and satellite customers",
        text:
          "Government and commercial customers may purchase satellite systems, components, engineering work, or related services.",
        icon: "ti-satellite",
      },
      {
        title: "Existing product operators",
        text:
          "Organizations operating equipment already in service may need inspections, upgrades, replacement parts, and technical support.",
        icon: "ti-tool",
      },
    ],
  },

  makeMoney: {
    sub: "Revenue comes from different activities, and each has different cost and risk drivers.",
    items: [
      {
        title: "Contract revenue",
        text:
          "Companies earn revenue by performing work under contracts. The contract value is not automatically the same as recognized revenue, cash collected, or profit. The timing and amount of revenue depend on the contract terms and applicable accounting rules.",
        icon: "ti-file-check",
      },
      {
        title: "Product sales",
        text:
          "Manufacturers earn revenue from selling aircraft, engines, equipment, components, and other products. Profitability depends on selling prices, production costs, delivery performance, and the cost of resolving product issues.",
        icon: "ti-plane",
      },
      {
        title: "Research and development programs",
        text:
          "Some customers fund development work or technical milestones for new products and systems. The financial treatment depends on the contract and accounting rules, while technical uncertainty can still create execution risk.",
        icon: "ti-bulb",
      },
      {
        title: "Spare parts",
        text:
          "Suppliers may sell replacement parts for products already in operation. Demand depends on the installed product base, usage, maintenance needs, product life cycles, and competition.",
        icon: "ti-package",
      },
      {
        title: "Maintenance and technical services",
        text:
          "Companies may earn revenue by repairing equipment, conducting inspections, providing upgrades, or supporting customers throughout a product's service life.",
        icon: "ti-tool",
      },
      {
        title: "Long-term support agreements",
        text:
          "Some customers purchase ongoing support under multi-period agreements. These arrangements may provide visibility into future work, but their actual economics depend on contract scope, costs, performance obligations, and customer requirements.",
        icon: "ti-calendar",
      },
    ],
  },

  moneyGoes: {
    sub: "Engineering revenue can require substantial spending before and after delivery.",
    items: [
      {
        title: "Research and development",
        text:
          "Specialist employees, engineering facilities, testing, prototypes, and technical development can require substantial investment. Development spending does not guarantee that a product will succeed commercially.",
        icon: "ti-flask",
      },
      {
        title: "Materials and components",
        text:
          "Manufacturers purchase metals, electronics, engines, specialist materials, and components from internal or external suppliers. Price changes, shortages, and supplier problems can affect costs and delivery schedules.",
        icon: "ti-package",
      },
      {
        title: "Manufacturing and labor",
        text:
          "Factories, machinery, skilled workers, quality controls, and production processes are essential to manufacturing complex products. Poor production execution can increase costs and delay delivery.",
        icon: "ti-settings",
      },
      {
        title: "Testing and quality assurance",
        text:
          "Products may require extensive testing, certification, inspection, and documentation. Quality problems can lead to rework, additional costs, delayed deliveries, or contractual consequences.",
        icon: "ti-shield-check",
      },
      {
        title: "Program management",
        text:
          "Large projects require coordination across engineering teams, suppliers, customer requirements, schedules, budgets, and contractual milestones.",
        icon: "ti-clipboard-check",
      },
      {
        title: "Warranty and product support",
        text:
          "Companies may need to repair defects, replace components, provide technical support, or meet other contractual obligations after delivery.",
        icon: "ti-tool",
      },
      {
        title: "Compliance and security",
        text:
          "Certain products and markets require export controls, security procedures, regulatory approvals, and specialized compliance processes. Requirements vary by jurisdiction and product.",
        icon: "ti-lock",
      },
      {
        title: "Facilities and capital investment",
        text:
          "Production equipment, factories, laboratories, and testing facilities can require significant capital spending. These investments may take time to support revenue and cash generation.",
        icon: "ti-building-factory",
      },
    ],
  },

  growth: {
    drivers: {
      title: "What can drive growth?",
      items: [
        "Winning new contracts or product orders can expand future work, subject to funding, contract terms, customer needs, and successful execution.",
        "Increasing production capacity may allow a manufacturer to deliver more products, provided demand and supply-chain capacity support the expansion.",
        "Growing the installed base of products can create additional demand for replacement parts, repairs, upgrades, and technical support.",
        "Developing new technologies may open new customer opportunities, although technical success and commercial adoption are not guaranteed.",
        "Expanding into additional customer groups or markets may diversify revenue, subject to certification, regulation, export controls, and competitive conditions.",
        "Improving production efficiency and project management may support profitability by reducing waste, delays, and avoidable rework.",
      ],
    },

    opportunities: {
      title: "Where can opportunities appear?",
      items: [
        "Government procurement programs may create demand for specific defense systems, but actual opportunities depend on budgets, procurement decisions, contract awards, and funding.",
        "Commercial aviation creates demand for aircraft, engines, components, maintenance, and other support services, influenced by airline activity and fleet needs.",
        "Products already in service may require continued maintenance, replacement parts, repairs, and upgrades throughout their operating lives.",
        "Space-related projects may create demand for satellites, components, communications equipment, and specialized engineering services.",
        "Suppliers with proven quality, technical expertise, and reliable delivery may be better positioned for programs that require demanding performance standards.",
      ],
    },

    callout:
      "Growth is not the same as value creation. A company can win large contracts or increase revenue while experiencing cost overruns, weak margins, delayed cash collection, or significant investment requirements. Evaluate the economics and execution of the actual business.",
  },

  strength: {
    title: "What can make a defense and aerospace business strong?",
    sub:
      "Competitive strength depends on capabilities that customers value and that the company can deliver economically over time.",
    items: [
      {
        title: "Engineering expertise",
        text:
          "Specialist engineering knowledge and experience with complex systems can help a company solve demanding technical problems. Expertise still needs to translate into reliable products and economically viable projects.",
        icon: "ti-bulb",
      },
      {
        title: "Reliable quality and safety",
        text:
          "Consistent manufacturing quality, testing, documentation, and compliance can support customer confidence and reduce costly product problems.",
        icon: "ti-shield-check",
      },
      {
        title: "Program execution",
        text:
          "The ability to manage schedules, budgets, suppliers, and changing requirements can help a company deliver complex projects with fewer costly surprises.",
        icon: "ti-clipboard-check",
      },
      {
        title: "Established customer relationships",
        text:
          "Experience with a customer's technical requirements, systems, and operating processes can support continued business, although future awards are never guaranteed.",
        icon: "ti-users",
      },
      {
        title: "Manufacturing and supply-chain capability",
        text:
          "Specialized facilities, qualified suppliers, and dependable production processes can help a company meet delivery and quality requirements.",
        icon: "ti-building-factory",
      },
      {
        title: "Installed product base and service capability",
        text:
          "A broad base of products in operation may create demand for parts, repairs, and support. The size of this opportunity depends on the products, contracts, competition, and customer needs.",
        icon: "ti-tool",
      },
      {
        title: "Financial discipline",
        text:
          "Managing project costs, capital spending, working capital, and contractual risks can help protect the business when development or production does not proceed as planned.",
        icon: "ti-calculator",
      },
    ],
  },

  competition: {
    compete: {
      title: "How do companies compete?",
      items: [
        "Defense contractors compete on technical performance, compliance, reliability, cost, delivery capability, and the requirements of specific procurement programs.",
        "Commercial aerospace suppliers compete on product performance, safety, quality, pricing, production capacity, and relationships with aircraft manufacturers and operators.",
        "Space technology businesses compete on technical capability, mission requirements, reliability, cost, and their ability to deliver within project constraints.",
        "Maintenance providers compete on service quality, turnaround time, technical expertise, parts availability, geographic coverage, and contractual terms.",
        "Companies may benefit from experience with complex certification and customer requirements, but they must continue to meet changing technical and commercial expectations.",
      ],
    },

    challenges: {
      title: "What makes the industry difficult?",
      items: [
        "Development programs can require substantial spending before the technical and commercial outcomes are clear.",
        "Long project timelines make it difficult to predict final costs and market conditions with certainty.",
        "Cost overruns can reduce or eliminate expected profit, especially when contract terms leave the supplier exposed to additional costs.",
        "Manufacturing defects, safety concerns, or missed delivery schedules can create additional costs and damage customer relationships.",
        "Companies may depend on a small number of large customers, programs, or government procurement decisions.",
        "Export controls and other regulations can limit which customers or markets a company may serve.",
        "Competition from established suppliers and alternative technologies can pressure pricing and future demand.",
      ],
    },
  },

  risks: {
    sub:
      "These risks vary by company, product, contract type, customer, and end market.",

    items: [
      {
        title: "Contract execution risk",
        text:
          "A project may take longer or cost more than expected because of engineering problems, supplier delays, design changes, or production difficulties. The financial impact depends on the contract terms and the company's ability to manage the work.",
        icon: "ti-file-alert",
      },
      {
        title: "Fixed-price contract risk",
        text:
          "Under a fixed-price arrangement, the supplier may have to absorb some or all cost increases that cannot be passed to the customer under the contract. The specific allocation of risk depends on the contract terms.",
        icon: "ti-calculator",
      },
      {
        title: "Research and development risk",
        text:
          "A product may fail to meet technical requirements, require additional development, or prove less commercially successful than expected. Development costs do not guarantee a successful product.",
        icon: "ti-flask",
      },
      {
        title: "Customer concentration",
        text:
          "Dependence on a small number of customers or major programs can make results sensitive to contract changes, delayed awards, budget decisions, or reduced demand.",
        icon: "ti-users",
      },
      {
        title: "Government budget and procurement risk",
        text:
          "Government priorities, budget approvals, procurement decisions, and funding arrangements can affect contract timing and demand. Not every proposed program becomes a funded contract.",
        icon: "ti-building-bank",
      },
      {
        title: "Supply-chain risk",
        text:
          "Shortages, supplier quality issues, price increases, or the failure of a critical supplier can disrupt production and delay delivery.",
        icon: "ti-truck",
      },
      {
        title: "Regulatory and export-control risk",
        text:
          "Products and technologies may be subject to export licenses, security requirements, certification rules, and other restrictions. Noncompliance can limit business activity and create legal or financial consequences.",
        icon: "ti-lock",
      },
      {
        title: "Product quality and safety risk",
        text:
          "Defects or failures in complex products can require repairs, redesigns, additional testing, or other corrective action. The impact depends on the nature of the issue and the company's obligations.",
        icon: "ti-shield-exclamation",
      },
      {
        title: "Cash-flow and working-capital risk",
        text:
          "The timing of customer payments, supplier payments, inventory spending, and project milestones can cause cash flow to differ substantially from reported profit.",
        icon: "ti-wallet",
      },
      {
        title: "Technology and competitive risk",
        text:
          "New technologies, changing customer requirements, or competing solutions can reduce demand for existing products or require further investment to remain competitive.",
        icon: "ti-cpu",
      },
    ],
  },

  metrics: {
    sub:
      "Use metrics together. Definitions may differ across companies, and a single metric cannot show the full economics of a complex engineering business.",

    items: [
      {
        label: "Backlog",
        fullName: "Backlog of Orders or Contract Work",
        text:
          "Backlog generally represents orders or contracted work that has not yet been completed or recognized as revenue, according to the company's definition. It helps indicate the amount of future work associated with existing orders. However, backlog is not revenue already earned, profit, or cash guaranteed to be collected. Check how the company treats cancellations, options, unfunded work, and contract changes.",
        icon: "ti-list-check",
      },
      {
        label: "Funded Backlog",
        fullName: "Funded Backlog",
        text:
          "This generally refers to the portion of backlog supported by funding under the company's reporting definition. It can help distinguish funded work from work that still depends on additional funding. Definitions vary, and funded status does not guarantee profitable execution, immediate cash collection, or freedom from contract changes.",
        icon: "ti-file-dollar",
      },
      {
        label: "Book-to-Bill",
        fullName: "Book-to-Bill Ratio",
        text:
          "This ratio compares new orders booked with sales or billings over a period, depending on the company's definition. A ratio above one can indicate that orders grew faster than the measured sales or billings during that period. It does not guarantee future revenue or profit. Verify the numerator, denominator, reporting period, and treatment of cancellations before comparing companies.",
        icon: "ti-chart-arrows",
      },
      {
        label: "Segment Operating Margin",
        fullName: "Segment Operating Profit Margin",
        text:
          "This measures a business segment's operating profit relative to its revenue. It helps show how much operating profit the segment reports for each unit of revenue. Segment definitions, corporate cost allocations, adjustments, and accounting policies can differ, so compare like-for-like segments and review the company's reconciliation.",
        icon: "ti-chart-pie",
      },
      {
        label: "R&D Spending",
        fullName: "Research and Development Expense",
        text:
          "Research and development spending shows the resources reported as being used for developing or improving products and technology. It can help explain the company's investment priorities, but higher spending does not automatically mean better innovation or future growth. Accounting treatment and the extent to which development costs are expensed or capitalized may differ.",
        icon: "ti-flask",
      },
      {
        label: "Operating Cash Flow",
        fullName: "Cash Flow from Operating Activities",
        text:
          "Operating cash flow measures the net cash generated or used by operating activities during a period. It helps reveal the cash impact of customer collections, supplier payments, payroll, and working-capital movements. It may differ from profit because of payment timing and non-cash accounting items. Review several periods and significant contract-related movements rather than relying on one year.",
        icon: "ti-cash",
      },
      {
        label: "Free Cash Flow",
        fullName: "Free Cash Flow",
        text:
          "A commonly used calculation subtracts capital expenditures from operating cash flow. It can help show cash remaining after the selected capital spending, but companies may define or adjust this measure differently. It does not automatically account for every financing obligation or future investment need. Check the company's calculation and reconciliation.",
        icon: "ti-chart-line",
      },
      {
        label: "Program Cost Performance",
        fullName: "Program Cost Performance",
        text:
          "Companies may disclose estimated program losses, contract adjustments, cost growth, or changes in expected completion costs. These items help investors understand execution risk on complex projects. Reporting is not standardized across all companies, so examine the specific contract, accounting treatment, and explanation rather than assuming every disclosure is directly comparable.",
        icon: "ti-report-analytics",
      },
      {
        label: "Delivery Performance",
        fullName: "Delivery Performance",
        text:
          "Delivery performance tracks whether products or contracted work are delivered according to required schedules. It can indicate operational execution and customer reliability, but definitions may vary, and on-time delivery alone does not establish profitability or product quality.",
        icon: "ti-calendar-check",
      },
    ],

    callout:
      "Backlog and orders help explain future work, margins help explain reported profitability, and cash-flow measures help explain cash generation. None is sufficient alone. Always check the reporting period, business segment, contract terms, accounting policies, and any company-specific definition.",
  },

  companies: {
    sub:
      "Use company examples to understand specific business activities. A diversified company should not be treated as a pure-play defense and aerospace business.",

    items: [
      {
        slug: "berkshire-hathaway",
        role:
          "Berkshire Hathaway is a diversified holding company, not a pure-play defense and aerospace business. Its subsidiary Precision Castparts produces complex metal components and products for aerospace and other industrial markets. This is an example of an upstream supplier role, while Berkshire's consolidated results also reflect many unrelated businesses.",
      },
      {
        slug: "tsmc",
        role:
          "TSMC is primarily a semiconductor foundry, not a defense and aerospace company. Semiconductor technology can be used in many industries, including aerospace systems, but TSMC's overall business should not be classified as a defense and aerospace model. It is included only as a boundary example of an upstream technology supplier.",
      },
    ],
  },

  related: {
    sub:
      "Explore related models to understand the technologies, manufacturing processes, and infrastructure that can support aerospace and defense products.",
    slugs: ["semiconductors", "hardware", "manufacturing"],
  },

  disclaimer: SCOPE_DISCLAIMER,
};