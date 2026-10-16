import {
  SCOPE_DISCLAIMER,
  type BusinessModelDetail,
} from "./types";

export const biotechnologyPharmaceuticalsDetail: BusinessModelDetail = {
  slug: "biotech-pharma",

  headline:
    "Turning Scientific Discoveries into Medicines That Improve Lives",

  description:
    "Biotechnology and pharmaceutical companies develop medicines to prevent, manage, or treat diseases. They invest in research, test potential treatments, obtain regulatory approval, and sell medicines or license their discoveries. The business can create significant value, but scientific uncertainty, long development timelines, regulation, and patent expiry make future results difficult to predict.",

  characteristics: {
    tags: [
      "Research-intensive",
      "Regulated industry",
      "Long development cycles",
      "Patent protection",
      "Scientific uncertainty",
      "Product launch risk",
    ],
    note:
      "A medicine can create substantial value when it solves an important medical problem. However, research spending does not guarantee a successful product, regulatory approval does not guarantee commercial success, and strong sales today do not guarantee that a medicine will remain profitable indefinitely.",
  },

  whatIsIt: {
    sub:
      "Understand how scientific research becomes a commercial healthcare business.",

    paragraphs: [
      "Biotechnology and pharmaceutical businesses use scientific research to discover, develop, manufacture, and commercialize medicines. Some companies focus on small-molecule drugs, while others develop biologic medicines made using living systems. Their products may treat common chronic conditions, infectious diseases, cancer, or rare diseases.",

      "Innovative pharmaceutical companies seek to develop medicines that offer meaningful benefits to patients. If a medicine is approved and adopted by healthcare providers, its sales may support the cost of development and fund future research. But a candidate medicine can fail during testing, receive a negative regulatory decision, or reach the market without attracting enough demand.",

      "Biotechnology companies often use biological knowledge and technologies to develop treatments. Some discover and sell their own products; others license discoveries to larger pharmaceutical companies or collaborate with partners. A company may therefore earn revenue from product sales, licensing, milestone payments, royalties, or research services.",

      "Generic drug manufacturers compete by selling versions of medicines after the relevant legal and regulatory requirements are met. Biosimilar manufacturers develop products that are highly similar to an approved biological medicine, with no clinically meaningful differences in safety, purity, and potency. These businesses can have different economics from companies selling newly developed medicines.",

      "Contract research and development organizations provide services such as clinical-trial management, laboratory testing, and drug-development support. They are part of the wider industry, but their economics differ from those of a company that owns a successful medicine and earns revenue from its sales.",

      "The central business question is not simply whether a company has promising science. It is whether that science can become a safe, effective, approved, accessible, and commercially sustainable product or service.",
    ],
  },

  flow: {
    sub:
      "Follow the journey from scientific idea to revenue, while remembering that not every candidate reaches the market.",

    steps: [
      {
        title: "Discover a Potential Treatment",
        text:
          "Researchers investigate diseases and identify a biological target, compound, or treatment approach that may help patients.",
        icon: "ti-microscope",
        examples: [
          "Study a disease mechanism",
          "Identify a potential drug target",
          "Screen or engineer candidate treatments",
        ],
      },
      {
        title: "Test the Candidate",
        text:
          "The company evaluates a candidate in laboratory and preclinical studies before progressing to human clinical trials when the necessary requirements are met.",
        icon: "ti-test-pipe",
        examples: [
          "Evaluate biological activity",
          "Study potential safety concerns",
          "Prepare evidence for human testing",
        ],
      },
      {
        title: "Run Clinical Trials",
        text:
          "Studies in people gather evidence about safety, dosage, and whether the treatment provides meaningful benefits for its intended use.",
        icon: "ti-users",
        examples: [
          "Assess safety and dosage",
          "Study preliminary effectiveness",
          "Confirm benefits and risks in larger studies",
        ],
      },
      {
        title: "Seek Regulatory Approval",
        text:
          "The company submits evidence for review. Regulators assess whether the medicine's benefits outweigh its known and potential risks for the proposed use.",
        icon: "ti-file-check",
        examples: [
          "Submit clinical and manufacturing information",
          "Respond to regulatory questions",
          "Receive an approval or another regulatory decision",
        ],
      },
      {
        title: "Manufacture and Reach Patients",
        text:
          "If the medicine is approved, the company must manufacture it to the required standards and work with healthcare providers, distributors, and payers to reach patients.",
        icon: "ti-building-factory",
        examples: [
          "Maintain product quality",
          "Build distribution and market access",
          "Monitor product safety after launch",
        ],
      },
      {
        title: "Generate Revenue and Reinvest",
        text:
          "Sales, licensing, royalties, or service fees may generate revenue. The company must cover operating costs and decide how much to reinvest in future products.",
        icon: "ti-chart-line",
        examples: [
          "Earn revenue from approved products",
          "Fund future research and development",
          "Develop new products to support future growth",
        ],
      },
    ],
  },

  howItWorks: {
    sub:
      "The commercial model connects scientific evidence, regulatory decisions, patient access, and financial outcomes.",

    intro:
      "A pharmaceutical company typically invests in research before it knows whether a candidate will become a successful product. If development succeeds, the company still needs to manufacture reliably, demonstrate value, obtain appropriate market access, and compete with other treatments.",

    chain: [
      {
        title: "Invest in Research",
        text:
          "Scientists and development teams investigate potential medicines, often before there is any product revenue.",
        tag: "Research",
      },
      {
        title: "Reduce Scientific Uncertainty",
        text:
          "Preclinical work and clinical trials build evidence, but they cannot eliminate every scientific or commercial uncertainty.",
        tag: "Evidence",
      },
      {
        title: "Obtain Regulatory Authorization",
        text:
          "Regulators evaluate the evidence for a proposed use. A candidate may be delayed, rejected, or approved with specific conditions.",
        tag: "Approval",
      },
      {
        title: "Establish Patient Access",
        text:
          "Healthcare professionals, patients, insurers, government programs, and other payers influence whether an approved medicine is used and paid for.",
        tag: "Market access",
      },
      {
        title: "Convert Sales into Sustainable Economics",
        text:
          "Revenue must support manufacturing, distribution, commercial operations, research, and other costs. The remaining profit and cash flow depend on the company's economics.",
        tag: "Financial results",
      },
    ],

    outro:
      "A successful medicine may support years of revenue, but the outcome depends on factors such as clinical evidence, competition, pricing, access, manufacturing, and the duration of meaningful market protection. The development process and its timing vary by product and regulatory pathway.",
  },

  whoPays: {
    sub:
      "The person using a medicine is not always the person or organization paying for it.",

    items: [
      {
        title: "Patients",
        text:
          "Patients may pay directly for medicines or contribute through deductibles, copayments, or other out-of-pocket arrangements, depending on the healthcare system.",
        icon: "ti-user",
      },
      {
        title: "Private Insurers",
        text:
          "Health insurers may pay for covered medicines according to their benefit designs, negotiated arrangements, and coverage rules.",
        icon: "ti-shield-check",
      },
      {
        title: "Government Healthcare Programs",
        text:
          "Public healthcare programs may purchase or reimburse medicines under country-specific rules, eligibility requirements, and pricing arrangements.",
        icon: "ti-building",
      },
      {
        title: "Hospitals and Healthcare Providers",
        text:
          "Hospitals or healthcare providers may purchase certain medicines for administration or use in their facilities, depending on the treatment and payment system.",
        icon: "ti-hospital",
      },
      {
        title: "Pharmaceutical Partners",
        text:
          "Companies may pay for research services, license rights, or collaborate on development. These payments can create revenue even before a partnered product reaches the market.",
        icon: "ti-handshake",
      },
    ],
  },

  makeMoney: {
    sub:
      "Companies in the same industry can earn revenue through different commercial arrangements.",

    items: [
      {
        title: "Prescription Medicine Sales",
        text:
          "Companies sell approved medicines through distribution channels. Revenue depends on factors such as demand, treatment duration, pricing, competition, and market access.",
        icon: "ti-pill",
      },
      {
        title: "Biologic Medicine Sales",
        text:
          "Companies may sell complex medicines produced using biological systems. Development and manufacturing can require specialized expertise and quality controls.",
        icon: "ti-dna",
      },
      {
        title: "Licensing Fees and Royalties",
        text:
          "A company may license a compound, technology, or commercial right to a partner. It may receive an upfront payment, development or sales milestones, royalties, or a combination of these.",
        icon: "ti-file-dollar",
      },
      {
        title: "Collaboration Payments",
        text:
          "Partners may share development costs and make payments when agreed research, development, regulatory, or commercial milestones are achieved. These payments are not necessarily recurring.",
        icon: "ti-handshake",
      },
      {
        title: "Generic Medicines and Biosimilars",
        text:
          "Manufacturers sell products that compete with established medicines after satisfying applicable legal and regulatory requirements. Price competition can place pressure on revenue and margins.",
        icon: "ti-packages",
      },
      {
        title: "Research and Development Services",
        text:
          "Contract research organizations and other service providers charge customers for work such as clinical-trial operations, testing, and development support. Their revenue is generally tied to service contracts rather than ownership of a successful medicine.",
        icon: "ti-flask",
      },
    ],
  },

  moneyGoes: {
    sub:
      "Revenue is only the starting point. Companies must fund the people, facilities, evidence, and operations needed to develop and deliver medicines.",

    items: [
      {
        title: "Research and Development",
        text:
          "Scientists, laboratories, clinical trials, research partners, and development programs consume resources. Spending may continue for years before a candidate generates product revenue.",
        icon: "ti-microscope",
      },
      {
        title: "Clinical Trials",
        text:
          "Clinical studies require planning, qualified investigators, participant recruitment, data collection, monitoring, and analysis. Costs and timelines vary significantly by study.",
        icon: "ti-clipboard-check",
      },
      {
        title: "Manufacturing and Quality",
        text:
          "Facilities, equipment, raw materials, specialized processes, testing, and quality systems help ensure that products meet applicable requirements.",
        icon: "ti-building-factory",
      },
      {
        title: "Regulatory and Safety Monitoring",
        text:
          "Companies prepare regulatory submissions, maintain compliance, and monitor product safety. These responsibilities can continue after a medicine enters the market.",
        icon: "ti-shield-check",
      },
      {
        title: "Sales, Marketing, and Market Access",
        text:
          "Companies may spend on medical education, commercial teams, distribution, and activities that support appropriate use and access to their products.",
        icon: "ti-speakerphone",
      },
      {
        title: "Acquisitions and Partnerships",
        text:
          "Companies may acquire research programs, license technologies, or enter collaborations to expand their pipelines. These transactions can require substantial cash and may not produce the expected returns.",
        icon: "ti-arrows-exchange",
      },
    ],
  },

  growth: {
    drivers: {
      title: "What Can Drive Growth?",
      items: [
        "Launch a medicine that provides meaningful benefits for an important medical need.",
        "Expand an approved medicine into additional patient populations or uses when supported by evidence and regulatory authorization.",
        "Improve manufacturing capacity and product availability as demand grows.",
        "Develop a portfolio of medicines so that the business is not dependent on one product.",
        "Use licensing and partnerships to access research, technologies, markets, or development capabilities.",
        "Improve market access when healthcare providers and payers recognize a product's clinical and economic value.",
        "Replace revenue from products facing stronger competition or loss of market protection with successful new products.",
      ],
    },

    opportunities: {
      title: "Where Can Opportunities Come From?",
      items: [
        "Unmet medical needs where existing treatments are limited or inadequate.",
        "Scientific advances that make new treatment approaches possible.",
        "Biologic medicines and other technologies that may address diseases in new ways.",
        "Generic drugs and biosimilars that expand treatment options after relevant requirements are met.",
        "Research partnerships that allow companies to share expertise, costs, or development responsibilities.",
        "Improved diagnosis and access to healthcare that may increase the number of patients who can receive appropriate treatment.",
      ],
    },

    callout:
      "Growth is not guaranteed by a large research pipeline or a promising scientific idea. Each opportunity must be assessed in terms of evidence, development stage, regulatory requirements, competitive treatments, patient access, manufacturing, and the economics of bringing the product to market.",
  },

  strength: {
    title: "Potential Competitive Advantages",
    sub:
      "The strongest advantages usually combine scientific capability with evidence, execution, access, and commercial discipline.",

    items: [
      {
        title: "Scientific and Research Expertise",
        text:
          "Deep knowledge, specialized teams, and accumulated research capabilities can help a company identify and develop promising treatments. Scientific expertise alone does not guarantee successful outcomes.",
        icon: "ti-microscope",
      },
      {
        title: "Differentiated Clinical Evidence",
        text:
          "A medicine with meaningful benefits, an appropriate safety profile, or advantages for a specific patient group may be better positioned than competing treatments.",
        icon: "ti-report-medical",
      },
      {
        title: "Intellectual Property and Market Protection",
        text:
          "Patents and applicable regulatory protections may help protect a product from certain forms of competition for a period of time. Their scope, timing, and practical value vary by product and jurisdiction.",
        icon: "ti-certificate",
      },
      {
        title: "Manufacturing and Quality Capabilities",
        text:
          "Reliable production, specialized processes, and strong quality systems can matter greatly, particularly for complex biologic products.",
        icon: "ti-building-factory",
      },
      {
        title: "Commercial Reach and Market Access",
        text:
          "Established relationships, distribution capabilities, regulatory experience, and knowledge of healthcare systems can help a company bring approved products to patients.",
        icon: "ti-world",
      },
      {
        title: "A Balanced Product Portfolio",
        text:
          "Multiple successful products at different stages may reduce dependence on any single medicine. Diversification does not eliminate research, competitive, or financial risk.",
        icon: "ti-layout-grid",
      },
    ],
  },

  competition: {
    compete: {
      title: "How Do Companies Compete?",
      items: [
        "Clinical benefit and safety compared with available treatments.",
        "The ability to develop and launch useful medicines successfully.",
        "Pricing, reimbursement, and access for patients and healthcare providers.",
        "Evidence from clinical studies and the quality of the supporting data.",
        "Manufacturing reliability, product quality, and supply availability.",
        "Research productivity and the ability to replace products that lose exclusivity.",
        "Partnerships, licensing arrangements, and expertise in selected disease areas.",
      ],
    },

    challenges: {
      title: "Why Can Competition Be Difficult?",
      items: [
        "A candidate can fail even after substantial research spending.",
        "A competing medicine may offer better clinical results, easier use, or stronger market access.",
        "Generic and biosimilar competition may put pressure on products after relevant protections expire or competition otherwise becomes possible.",
        "Healthcare payers may limit coverage or negotiate lower prices.",
        "A product may be approved but still struggle to gain adoption.",
        "Manufacturing problems or supply interruptions may affect sales and trust.",
        "Companies may need to invest heavily in new research to sustain future growth.",
      ],
    },
  },

  risks: {
    sub:
      "The industry combines scientific uncertainty with commercial, legal, manufacturing, and financial risks.",

    items: [
      {
        title: "Clinical Trial Failure",
        text:
          "A candidate may fail to demonstrate sufficient benefit, reveal unacceptable safety concerns, or produce results that do not support further development. Money already spent may not be recoverable.",
        icon: "ti-alert-triangle",
      },
      {
        title: "Regulatory Uncertainty",
        text:
          "Regulators may request additional evidence, restrict a proposed use, delay a decision, or decline to approve a product. Approval requirements depend on the product and jurisdiction.",
        icon: "ti-file-alert",
      },
      {
        title: "Patent Expiry and Competition",
        text:
          "When meaningful market protection weakens or expires, competing products may reduce sales or pricing power. The timing and commercial impact vary by product and country.",
        icon: "ti-scale",
      },
      {
        title: "Product Concentration",
        text:
          "A company that depends heavily on a small number of medicines may be vulnerable if a leading product loses market share, faces new safety information, or encounters stronger competition.",
        icon: "ti-chart-pie",
      },
      {
        title: "Pricing and Reimbursement Pressure",
        text:
          "Insurers, governments, and other payers may restrict coverage or seek lower prices. A medicine's clinical value does not guarantee that the company can charge any price it chooses.",
        icon: "ti-currency-dollar",
      },
      {
        title: "Safety and Product Liability",
        text:
          "New safety information can lead to label changes, additional monitoring, restrictions, legal claims, or product withdrawal. Post-market monitoring remains important after approval.",
        icon: "ti-shield-exclamation",
      },
      {
        title: "Manufacturing and Supply Problems",
        text:
          "Production failures, quality issues, shortages, or interruptions in the supply chain may prevent a company from delivering products consistently.",
        icon: "ti-truck-delivery",
      },
      {
        title: "High Costs and Uncertain Returns",
        text:
          "Research, clinical development, manufacturing, and commercialization can require significant resources. A company may spend heavily without generating enough future revenue or cash flow to justify the investment.",
        icon: "ti-report-money",
      },
      {
        title: "Partnership and Acquisition Risk",
        text:
          "Licensed programs, collaborations, and acquisitions may fail to deliver expected scientific or commercial results. Upfront payments and acquisition costs can be difficult to recover.",
        icon: "ti-arrows-exchange",
      },
    ],
  },

  metrics: {
    sub:
      "Use financial measures alongside product, research, and competitive evidence. No single metric can explain the quality of a pharmaceutical business.",

    items: [
      {
        label: "Revenue",
        fullName: "Total Revenue",
        text:
          "Measures the value of products and services recognized as revenue during a period. Review which products and business activities generate it, whether growth is concentrated, and whether reported revenue is recurring or affected by one-time events.",
        icon: "ti-chart-line",
      },
      {
        label: "Gross Margin",
        fullName: "Gross Profit Margin",
        text:
          "Usually calculated as (Revenue − Cost of Sales) ÷ Revenue. It helps show how much revenue remains after recognized cost of sales, but accounting classifications differ and it does not include every research, selling, or administrative cost.",
        icon: "ti-percentage",
      },
      {
        label: "R&D Expense",
        fullName: "Research and Development Expense",
        text:
          "Shows the research and development costs recognized as expense during a period. Compare spending with the company's size, product portfolio, development stages, and results. Higher spending does not automatically mean better science or a higher chance of success.",
        icon: "ti-microscope",
      },
      {
        label: "Operating Margin",
        fullName: "Operating Profit Margin",
        text:
          "Usually calculated as Operating Income ÷ Revenue. It helps assess operating profitability after operating expenses, including costs such as research and commercial operations when classified there. Check the company's reporting definitions and unusual items.",
        icon: "ti-chart-bar",
      },
      {
        label: "Pipeline Quality",
        fullName: "Research and Development Pipeline",
        text:
          "Review the number and stage of candidates, the diseases they target, available evidence, expected development milestones, and differentiation from existing treatments. Pipeline counts are not standardized and cannot be treated as a direct forecast of future revenue.",
        icon: "ti-git-branch",
      },
      {
        label: "Product Concentration",
        fullName: "Revenue Concentration by Product",
        text:
          "Examines how much revenue depends on leading medicines or therapeutic areas. High concentration can increase exposure to competition, safety changes, reimbursement pressure, or the loss of market protection.",
        icon: "ti-chart-pie",
      },
      {
        label: "Patent and Exclusivity Exposure",
        fullName: "Product Protection and Competition Timeline",
        text:
          "Review important patent expirations, applicable regulatory exclusivities, litigation, and the potential entry of competing products. A single patent date does not always indicate the exact date when competition will begin.",
        icon: "ti-calendar-time",
      },
      {
        label: "Operating Cash Flow",
        fullName: "Net Cash from Operating Activities",
        text:
          "Measures cash generated or used by operating activities under the company's cash flow statement. Compare it with reported profit and consider working capital, collaboration payments, taxes, and other timing effects.",
        icon: "ti-cash",
      },
      {
        label: "Free Cash Flow",
        fullName: "Free Cash Flow",
        text:
          "Often estimated as operating cash flow minus capital expenditures, but definitions vary. It helps assess cash remaining after investment in long-lived assets; it does not mean all remaining cash is available for shareholders or that research spending has been fully captured in capital expenditures.",
        icon: "ti-coins",
      },
      {
        label: "Licensing and Collaboration Income",
        fullName: "Partnering Revenue and Payments",
        text:
          "Review licensing revenue, royalties, upfront payments, and milestone payments where disclosed. Some payments depend on specific events and may be irregular, so they should not automatically be treated as stable recurring revenue.",
        icon: "ti-handshake",
      },
    ],

    callout:
      "Important: Revenue is not profit, profit is not cash flow, and a pipeline is not a promise of future sales. Read the financial statements and management's explanations together, and distinguish recurring performance from one-time collaboration payments, acquisitions, impairments, and other unusual items.",
  },

  companies: {
    sub:
      "Use these Scope company pages to connect the business model with real company disclosures.",

    items: [
      {
        slug: "eli-lilly",
        role:
          "Primary example: a pharmaceutical company involved in discovering, developing, manufacturing, marketing, and selling medicines. Its annual report illustrates how product revenue, cost of sales, research spending, and the need for future innovation fit together.",
      },
      {
        slug: "johnson-johnson",
        role:
          "Secondary example: a diversified healthcare company with Innovative Medicine and MedTech businesses. Use its Innovative Medicine business when studying pharmaceuticals, rather than treating all consolidated company revenue as pharmaceutical revenue.",
      },
    ],
  },

  related: {
    sub:
      "Explore adjacent business models to understand the wider healthcare and manufacturing ecosystem.",

    slugs: [
      "healthcare",
      "manufacturing",
      "insurance",
    ],
  },

  disclaimer: SCOPE_DISCLAIMER,
};

export default biotechnologyPharmaceuticalsDetail;