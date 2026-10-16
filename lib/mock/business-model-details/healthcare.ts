import {
  SCOPE_DISCLAIMER,
  type BusinessModelDetail,
} from "./types";

export const healthcareDetail: BusinessModelDetail = {
  slug: "healthcare",

  headline: "Understand How the Healthcare Industry Creates Value",

  description:
    "Healthcare includes businesses that provide medical care, develop medicines, manufacture medical devices, manage health insurance, and support healthcare delivery. Each business type has different customers, costs, revenue sources, and risks.",

  characteristics: {
    tags: [
      "Essential Services",
      "Medical Innovation",
      "Regulation",
      "Multiple Payers",
      "Specialized Expertise",
    ],
    note:
      "Healthcare is an industry, not one single business model. Hospitals, insurers, pharmaceutical companies, medical-device manufacturers, and healthcare service providers operate differently. Their economics depend on what they provide, who pays, how costs are managed, and which regulations apply.",
  },

  whatIsIt: {
    sub: "Understanding the businesses behind healthcare",
    paragraphs: [
      "Healthcare includes the products, services, and systems used to prevent illness, diagnose medical conditions, treat patients, and support recovery. Businesses in this industry range from hospitals and health insurers to pharmaceutical companies and medical-device manufacturers.",

      "Different healthcare businesses solve different problems. A hospital provides medical services. A health insurer helps pay for covered healthcare costs under an insurance arrangement. A pharmaceutical company develops and sells medicines. A medical-technology company supplies devices and equipment used in diagnosis or treatment.",

      "The person receiving a healthcare service is not always the person paying for it. Depending on the healthcare system and contract, payment may come from patients, private insurers, employers, governments, or other healthcare organizations.",

      "Healthcare companies also face different cost structures. A hospital may spend heavily on staff and facilities, an insurer must manage medical claims and administrative costs, and a pharmaceutical company may invest heavily in research, clinical trials, and manufacturing.",

      "Healthcare demand can be important to society, but that does not guarantee that every healthcare business will be profitable. Prices, reimbursement rules, competition, operating efficiency, research outcomes, and regulation can all affect financial results.",
    ],
  },

  flow: {
    sub: "How healthcare products and services reach the people who need them",
    steps: [
      {
        title: "Identify a Health Need",
        text:
          "A patient, healthcare professional, or healthcare system identifies a need for prevention, diagnosis, treatment, or ongoing care.",
        icon: "ti-heart",
        examples: [
          "A patient needs a medical examination.",
          "A physician identifies a need for a medicine.",
          "A healthcare system needs diagnostic equipment.",
        ],
      },
      {
        title: "Develop or Provide a Solution",
        text:
          "A business develops a medicine or device, provides medical care, or creates a service that supports healthcare delivery.",
        icon: "ti-flask",
        examples: [
          "A pharmaceutical company develops a medicine.",
          "A hospital provides treatment.",
          "A medical-technology company manufactures a diagnostic device.",
        ],
      },
      {
        title: "Arrange Payment",
        text:
          "The cost may be paid directly by the patient or covered partly or fully by an insurer, employer, government program, or another organization.",
        icon: "ti-credit-card",
        examples: [
          "A patient pays for a consultation.",
          "An insurer pays an eligible medical claim.",
          "A hospital purchases equipment from a supplier.",
        ],
      },
      {
        title: "Deliver the Product or Service",
        text:
          "The medicine, device, treatment, or support service reaches the patient or healthcare organization under the applicable arrangements.",
        icon: "ti-truck",
        examples: [
          "A pharmacy dispenses prescribed medicine.",
          "A clinician uses medical equipment.",
          "A healthcare provider delivers a treatment.",
        ],
      },
      {
        title: "Measure Outcomes and Costs",
        text:
          "Businesses and healthcare systems assess service quality, patient outcomes, costs, and financial performance using measures appropriate to their activities.",
        icon: "ti-chart-line",
        examples: [
          "A hospital monitors operating costs and patient outcomes.",
          "An insurer reviews medical claims and expenses.",
          "A pharmaceutical company tracks product sales and research spending.",
        ],
      },
    ],
  },

  howItWorks: {
    sub: "How the different parts of healthcare fit together",
    intro:
      "Healthcare often involves several organizations rather than a simple transaction between one customer and one seller. The exact arrangement depends on the country, the service, the insurance contract, and the type of healthcare business.",
    chain: [
      {
        title: "Patient or Healthcare Need",
        text:
          "A person or healthcare organization needs a product, treatment, diagnosis, or other health-related service.",
        tag: "Demand",
      },
      {
        title: "Provider or Product Company",
        text:
          "A hospital, clinician, pharmaceutical company, or medical-device manufacturer supplies the relevant product or service.",
        tag: "Supply",
      },
      {
        title: "Payer or Purchasing Organization",
        text:
          "The patient, insurer, employer, government program, or healthcare institution pays according to the applicable arrangement.",
        tag: "Payment",
      },
      {
        title: "Delivery and Administration",
        text:
          "Healthcare services are delivered, products are distributed, and relevant administrative processes are completed.",
        tag: "Operations",
      },
      {
        title: "Costs and Outcomes",
        text:
          "The parties manage costs and assess the quality, effectiveness, and financial results relevant to their roles.",
        tag: "Results",
      },
    ],
    outro:
      "This is a simplified overview, not a universal sequence. Some healthcare businesses perform several roles, while others focus on only one part of the system.",
  },

  whoPays: {
    sub: "The user of a healthcare service and the payer may be different parties.",
    items: [
      {
        title: "Patients",
        text:
          "Patients may pay directly for consultations, treatments, medicines, devices, or the portion of a bill not covered by another payer.",
        icon: "ti-user",
      },
      {
        title: "Private Health Insurers",
        text:
          "Insurers collect premiums and pay eligible healthcare claims according to their coverage terms. Premium revenue must be considered alongside medical claims and operating expenses.",
        icon: "ti-shield-check",
      },
      {
        title: "Employers",
        text:
          "Employers may purchase health benefits or insurance for employees. The employer's role and payment arrangement depend on the plan.",
        icon: "ti-briefcase",
      },
      {
        title: "Governments and Public Programs",
        text:
          "Public programs may finance or reimburse eligible healthcare services. The rules, coverage, and payment methods vary across countries and programs.",
        icon: "ti-building",
      },
      {
        title: "Healthcare Organizations",
        text:
          "Hospitals, clinics, laboratories, and other healthcare organizations may purchase medicines, devices, equipment, software, and support services from suppliers.",
        icon: "ti-building-hospital",
      },
    ],
  },

  makeMoney: {
    sub: "Healthcare businesses earn revenue in different ways",
    items: [
      {
        title: "Medical Services",
        text:
          "Hospitals, clinics, and other providers may earn revenue from consultations, procedures, diagnostics, inpatient care, and other services. Payment may come from patients or third-party payers.",
        icon: "ti-stethoscope",
      },
      {
        title: "Insurance Premiums",
        text:
          "Health insurers collect premiums under insurance arrangements. Premium revenue is not profit because the insurer must also cover eligible medical claims and operating expenses.",
        icon: "ti-shield-check",
      },
      {
        title: "Medicine Sales",
        text:
          "Pharmaceutical companies earn revenue by selling medicines through distribution channels and commercial arrangements. Revenue depends on factors such as product demand, pricing, access, and competition.",
        icon: "ti-pill",
      },
      {
        title: "Medical Devices and Equipment",
        text:
          "Medical-technology companies may sell devices, equipment, instruments, and consumable products used in diagnosis, monitoring, or treatment.",
        icon: "ti-device-desktop",
      },
      {
        title: "Healthcare Services and Administration",
        text:
          "Some companies earn fees for pharmacy services, claims administration, healthcare technology, data services, or other support activities. The exact revenue model depends on the service contract.",
        icon: "ti-settings",
      },
      {
        title: "Licensing and Business Agreements",
        text:
          "Some healthcare companies receive licensing income, collaboration payments, or other contractual revenue. These arrangements vary and should not be assumed to be recurring or equivalent to product sales.",
        icon: "ti-file-contract",
      },
    ],
  },

  moneyGoes: {
    sub: "Major costs depend on the type of healthcare business",
    items: [
      {
        title: "Clinical Staff and Service Delivery",
        text:
          "Healthcare providers may spend on clinicians, nurses, technicians, facilities, medical supplies, equipment, and the day-to-day delivery of care.",
        icon: "ti-users",
      },
      {
        title: "Medical Claims",
        text:
          "Health insurers pay covered medical claims and manage related administrative activities. Higher claim costs relative to premium revenue can pressure underwriting results.",
        icon: "ti-report-money",
      },
      {
        title: "Research and Development",
        text:
          "Pharmaceutical and medical-technology companies may spend on research, product development, testing, clinical studies, and regulatory submissions. Some projects may never become commercially successful products.",
        icon: "ti-flask",
      },
      {
        title: "Manufacturing and Quality Control",
        text:
          "Product companies incur costs to manufacture medicines and devices, maintain quality standards, manage suppliers, and comply with applicable requirements.",
        icon: "ti-settings",
      },
      {
        title: "Sales, Distribution, and Market Access",
        text:
          "Companies may incur costs to distribute products, support customers, educate healthcare professionals, negotiate purchasing arrangements, and obtain access to healthcare markets.",
        icon: "ti-truck",
      },
      {
        title: "Compliance, Technology, and Administration",
        text:
          "Healthcare businesses may need to fund regulatory compliance, data security, billing systems, customer support, legal work, and other administrative functions.",
        icon: "ti-shield-check",
      },
    ],
  },

  growth: {
    drivers: {
      title: "What Can Drive Growth?",
      items: [
        "Demand for prevention, diagnosis, treatment, and ongoing care may support activity, but the effect on revenue and profit depends on prices, costs, access, and payment arrangements.",
        "New medicines, devices, and treatment methods may create additional revenue opportunities when they meet real medical needs and gain appropriate regulatory approval.",
        "Expansion into new patient groups, regions, or healthcare systems can increase the addressable market, but may require substantial investment and regulatory work.",
        "Improved operational efficiency may help providers and service companies manage resources, reduce avoidable costs, and serve patients more effectively.",
        "More effective distribution, partnerships, and access to healthcare purchasers may help products and services reach additional customers.",
        "For insurers and healthcare service providers, changes in membership, customer relationships, service mix, and contract terms may affect business performance.",
      ],
    },
    opportunities: {
      title: "Where Can Opportunities Come From?",
      items: [
        "Developing products that address unmet medical needs.",
        "Improving access to diagnosis, treatment, and healthcare services.",
        "Using technology to support clinical workflows, administration, or coordination of care.",
        "Expanding manufacturing or service capacity when demand and economics justify the investment.",
        "Improving quality and operational efficiency without compromising patient safety.",
        "Building durable relationships with patients, healthcare professionals, purchasers, and distribution partners.",
      ],
    },
    callout:
      "Healthcare demand alone does not guarantee business growth or profitability. Outcomes depend on the specific business model, product performance, reimbursement, regulation, competition, and cost control.",
  },

  strength: {
    title: "What Can Create a Competitive Advantage?",
    sub:
      "Potential advantages differ across insurers, healthcare providers, pharmaceutical companies, and medical-technology businesses.",
    items: [
      {
        title: "Clinical Evidence and Product Quality",
        text:
          "Reliable evidence, safety, product quality, and demonstrated performance may support adoption. The relevance of each factor depends on the product or service.",
        icon: "ti-shield-check",
      },
      {
        title: "Specialized Expertise",
        text:
          "Scientific knowledge, clinical experience, technical skills, and regulatory expertise can be difficult to build quickly, especially in specialized fields.",
        icon: "ti-flask",
      },
      {
        title: "Distribution and Market Access",
        text:
          "Established distribution, purchasing relationships, and access to healthcare organizations may help a company deliver products and services efficiently.",
        icon: "ti-truck",
      },
      {
        title: "Operational Efficiency",
        text:
          "Effective scheduling, manufacturing, claims processing, inventory management, and resource allocation may improve cost control and service reliability.",
        icon: "ti-settings",
      },
      {
        title: "Trust and Reputation",
        text:
          "Patients, clinicians, and healthcare purchasers may consider reliability, service quality, safety, and reputation when choosing products or providers.",
        icon: "ti-award",
      },
      {
        title: "Scale and Specialized Infrastructure",
        text:
          "Scale may support purchasing, distribution, research, or technology investment. However, a larger company is not automatically more efficient or more profitable.",
        icon: "ti-building",
      },
    ],
  },

  competition: {
    compete: {
      title: "How Do Healthcare Businesses Compete?",
      items: [
        "Product quality, clinical evidence, safety, and suitability for the intended use.",
        "Price, reimbursement terms, and the total cost of providing care.",
        "Access to patients, clinicians, hospitals, insurers, and other purchasers.",
        "Reliability, service quality, distribution, and operational efficiency.",
        "Research capabilities, product development, and the ability to meet regulatory requirements.",
        "Customer relationships and the ability to deliver measurable value within the relevant healthcare system.",
      ],
    },
    challenges: {
      title: "Why Can Competition Be Difficult?",
      items: [
        "Healthcare products and services may require specialized knowledge, significant investment, and regulatory approval.",
        "Purchasers may have substantial negotiating power, particularly when choosing among comparable products or services.",
        "Established products can face new competitors, alternative treatments, changing purchasing preferences, or changes in reimbursement.",
        "Companies must balance financial performance with patient safety, quality standards, and applicable legal obligations.",
        "A product with strong demand may still face manufacturing constraints, high costs, or limited access to customers.",
      ],
    },
  },

  risks: {
    sub: "Healthcare businesses face different risks depending on what they provide and how they are paid.",
    items: [
      {
        title: "Regulatory and Approval Risk",
        text:
          "Changes in laws, reimbursement rules, or regulatory decisions can affect the ability to develop, market, manufacture, or provide healthcare products and services.",
        icon: "ti-scale",
      },
      {
        title: "Research and Development Risk",
        text:
          "A medicine or medical technology may fail during development, fail to demonstrate the expected benefits, or not receive the required approval. Research spending does not guarantee a successful product.",
        icon: "ti-flask",
      },
      {
        title: "Pricing and Reimbursement Pressure",
        text:
          "Insurers, governments, and other purchasers may change payment terms or negotiate lower prices, affecting revenue or margins.",
        icon: "ti-report-money",
      },
      {
        title: "Medical Cost Risk",
        text:
          "For health insurers, medical claims that rise faster than premium revenue can put pressure on financial results. The impact depends on pricing, membership, contracts, and other factors.",
        icon: "ti-trending-up",
      },
      {
        title: "Product Safety and Liability",
        text:
          "Product defects, adverse events, quality problems, or failures to meet applicable standards may lead to recalls, legal claims, regulatory action, or reputational damage.",
        icon: "ti-shield-exclamation",
      },
      {
        title: "Competition and Product Substitution",
        text:
          "New treatments, competing products, generic medicines, alternative technologies, or changes in purchasing decisions may reduce demand or pricing power.",
        icon: "ti-target",
      },
      {
        title: "Workforce and Capacity Constraints",
        text:
          "A shortage of qualified staff, manufacturing capacity, essential materials, or specialized facilities may limit service delivery and increase costs.",
        icon: "ti-users",
      },
      {
        title: "Cybersecurity and Data Privacy",
        text:
          "Healthcare businesses may handle sensitive data. Security incidents or failures to meet privacy requirements can disrupt operations and create financial or legal consequences.",
        icon: "ti-lock",
      },
    ],
  },

  metrics: {
    sub:
      "No single metric describes every healthcare business. Select measures that match the company's activities and compare definitions before drawing conclusions.",
    items: [
      {
        label: "Revenue Growth",
        fullName: "Revenue Growth Rate",
        text:
          "Measures how revenue changes over a period. It helps show whether a business is expanding, but does not explain the source or quality of growth. Review product mix, pricing, acquisitions, and the relevant business segment.",
        icon: "ti-chart-line",
      },
      {
        label: "Operating Margin",
        fullName: "Operating Income as a Percentage of Revenue",
        text:
          "Shows how much operating income a company generates from each unit of revenue. It helps assess operating profitability, but comparisons can be misleading when business mixes, accounting policies, or cost structures differ.",
        icon: "ti-percentage",
      },
      {
        label: "Medical Care Ratio",
        fullName: "Medical Costs Relative to Premium Revenue",
        text:
          "For health insurers, this generally measures medical costs as a proportion of relevant premium revenue. A higher ratio may indicate that more revenue is being used for medical care, but definitions and included costs can differ by company and reporting context.",
        icon: "ti-report-money",
      },
      {
        label: "R&D Intensity",
        fullName: "Research and Development Expense as a Percentage of Revenue",
        text:
          "Shows how much a company spends on research and development relative to revenue. It helps describe research investment, but does not measure research quality or guarantee future product success. Comparisons should consider product portfolios and development stages.",
        icon: "ti-flask",
      },
      {
        label: "Product Sales Growth",
        fullName: "Growth in Sales of a Specific Product or Product Group",
        text:
          "Tracks changes in sales for a product or product group. It can reveal product-level performance, but price changes, sales volume, competition, currency effects, and reporting definitions may influence the result.",
        icon: "ti-pill",
      },
      {
        label: "Gross Margin",
        fullName: "Gross Profit as a Percentage of Revenue",
        text:
          "Shows the share of revenue remaining after the costs included in cost of revenue. It helps assess product or service economics, but companies may have very different cost structures and classifications, so cross-industry comparisons need caution.",
        icon: "ti-chart-pie",
      },
      {
        label: "Patient Volume or Utilization",
        fullName: "Use of Healthcare Services",
        text:
          "Measures activity such as patient visits, procedures, admissions, or service utilization. It helps describe demand and capacity use, but higher volume does not necessarily mean higher profit if reimbursement or costs are unfavorable.",
        icon: "ti-users",
      },
      {
        label: "Operating Cash Flow",
        fullName: "Cash Flow from Operating Activities",
        text:
          "Measures net cash generated or used by operating activities during a period. It provides information about cash generation, but can be affected by payment timing, working capital, and other factors. It is not the same as revenue or accounting profit.",
        icon: "ti-cash",
      },
    ],
    callout:
      "Use company-reported definitions wherever possible. Metrics such as medical care ratio, patient volume, and product sales are not equally relevant to every healthcare business, and similarly named measures may not be calculated identically.",
  },

  companies: {
    sub:
      "These Scope companies illustrate different parts of healthcare. None should be treated as a pure-play example of every healthcare business type.",
    items: [
      {
        slug: "unitedhealth-group",
        role:
          "UnitedHealth Group operates through UnitedHealthcare and Optum, spanning health benefits and a range of healthcare services. Use its segment disclosures to distinguish insurance-related activities from other services; do not treat all company revenue as health insurance revenue.",
      },
      {
        slug: "eli-lilly",
        role:
          "Eli Lilly is a pharmaceutical company that develops, manufactures, and sells medicines. It illustrates product development, research spending, regulatory requirements, and medicine sales, but its results should not be generalized to all pharmaceutical companies.",
      },
      {
        slug: "johnson-johnson",
        role:
          "Johnson & Johnson reports Innovative Medicine and MedTech businesses. It can illustrate both pharmaceutical products and medical technology, but those segments have different products, customers, costs, and competitive dynamics.",
      },
    ],
  },

  related: {
    sub:
      "Explore business models that overlap with healthcare through insurance, scientific research, and specialized services.",
    slugs: [
      "insurance",
      "biotechnology-pharmaceuticals",
      "financial-services",
    ],
  },

  disclaimer: SCOPE_DISCLAIMER,
};