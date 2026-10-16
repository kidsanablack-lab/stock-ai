import type { PowerSlug } from "./powers";

// Detailed explanations. All wording is Scope's own.
// Company facts were checked against the sources listed in each example.

export type ExamplePoint = {
  icon: string; // Tabler icon class
  title: string;
  text: string;
};

export type Source = {
  label: string;
  url: string;
};

export type ExtraBlock = {
  title: string;
  items: ExamplePoint[];
};

export type PowerDetail = {
  slug: PowerSlug;
  headline: string;
  simple: string;
  how: { title: string; text?: string }[];
  howNote: string;
  loops?: boolean; // shows a "this can repeat" hint under the steps
  extra?: ExtraBlock; // optional block between the diagram and the example
  example: {
    company: string;
    intro: string;
    points: ExamplePoint[];
    caution?: string;
    sources: Source[];
  };
  why: string[];
  limits: string[];
};

export const POWER_DETAILS: PowerDetail[] = [
  /* ------------------------------------------------------------------
     01 — SCALE ECONOMIES
  ------------------------------------------------------------------ */
  {
    slug: "scale-economies",
    headline: "The Advantage of Being Big",
    simple:
      "When a business spreads certain costs across more products or customers, the cost per unit can fall.",
    how: [
      {
        title: "A business has fixed costs",
        text: "These are costs it pays whether it makes a little or a lot, such as a factory or a software platform.",
      },
      {
        title: "It produces or sells more",
        text: "More units, more customers, or more orders pass through the same setup.",
      },
      {
        title: "Each unit carries a smaller share",
        text: "The same fixed cost is divided across more units.",
      },
      {
        title: "It may be able to compete on price",
        text: "Lower unit costs can leave room to charge less or keep more of each sale.",
      },
    ],
    howNote:
      "The example on the right is hypothetical. It was made up to show the idea, not taken from a real company.",
    example: {
      company: "Walmart",
      intro:
        "Walmart is a common way to picture scale economies in retail: a very large buyer and distributor with a stated focus on keeping costs low.",
      points: [
        {
          icon: "ti-shopping-cart",
          title: "Buying scale",
          text: "Walmart's annual report says its supplier relationships reflect the volume and certainty it brings, which helps it offer low prices.",
        },
        {
          icon: "ti-truck",
          title: "Distribution",
          text: "It runs a network of distribution facilities across the U.S., and most store merchandise bought by Walmart U.S. is shipped through them.",
        },
        {
          icon: "ti-building-warehouse",
          title: "Operating at scale",
          text: 'It describes "everyday low cost" as a commitment to control expenses so savings can be passed on to customers.',
        },
        {
          icon: "ti-info-circle",
          title: "A cautious reading",
          text: "Outsiders cannot see Walmart's internal costs. These points show how scale may help, not exactly how much it saves.",
        },
      ],
      sources: [
        {
          label: "Walmart Inc., Form 10-K (SEC)",
          url: "https://www.sec.gov/Archives/edgar/data/104169/000010416925000021/wmt-20250131.htm",
        },
      ],
    },
    why: [
      "May support lower unit costs.",
      "Can help a business compete on price.",
      "May make it harder for smaller competitors to match its cost structure.",
    ],
    limits: [
      "Bigger does not always mean more efficient.",
      "Complex operations can introduce additional costs.",
      "Scale alone does not prove the existence of a durable competitive advantage.",
    ],
  },

  /* ------------------------------------------------------------------
     02 — NETWORK ECONOMIES
  ------------------------------------------------------------------ */
  {
    slug: "network-economies",
    headline: "The Advantage of a Growing Network",
    simple:
      "A network can become more useful when additional participants increase the value available to existing users.",
    how: [
      { title: "More Participants" },
      { title: "More Useful Connections or Acceptance" },
      { title: "Greater Value for Participants" },
      { title: "Potentially More Participants" },
    ],
    howNote:
      "This is a loop that can happen, not a result that is guaranteed.",
    loops: true,
    example: {
      company: "Visa",
      intro:
        "Visa runs a payments network that links the groups involved in a card payment. The more cards and merchants that join, the more useful the network can be to everyone on it.",
      points: [
        {
          icon: "ti-user",
          title: "Cardholders",
          text: "A card is more useful when many merchants accept it.",
        },
        {
          icon: "ti-building-store",
          title: "Merchants",
          text: "Accepting the card gives access to the many customers who carry it.",
        },
        {
          icon: "ti-building-bank",
          title: "Issuing banks",
          text: "Banks that issue cards can offer a product that works in many places.",
        },
        {
          icon: "ti-credit-card",
          title: "Acquirers",
          text: "Banks and processors that serve merchants can offer acceptance that many customers use.",
        },
      ],
      caution:
        "Visa itself does not issue cards, lend money, or set the fees that account holders pay. Banks manage those relationships. Visa runs the network that authorizes, clears, and settles the payments between the parties.",
      sources: [
        {
          label: "Visa Inc., Form 10-K (SEC)",
          url: "https://www.sec.gov/Archives/edgar/data/1403161/000140316125000089/v-20250930.htm",
        },
      ],
    },
    why: [
      "A large, widely accepted network can be more useful to participants.",
      "New participants may increase the usefulness of the network.",
      "Building a competing network can be difficult.",
    ],
    limits: [
      "A large user base does not automatically create strong network effects.",
      "Network value depends on how participants interact.",
      "Competing networks, regulation, or new technologies can weaken an advantage.",
    ],
  },

  /* ------------------------------------------------------------------
     03 — COUNTER-POSITIONING
  ------------------------------------------------------------------ */
  {
    slug: "counter-positioning",
    headline: "The Advantage of a Different Business Model",
    simple:
      "A new business can challenge established competitors with a model they find difficult to adopt without undermining their existing business.",
    how: [
      { title: "Established Business Model" },
      { title: "New Business Model Emerges" },
      { title: "Copying It May Hurt the Existing Business" },
      { title: "The New Entrant May Gain an Opportunity" },
    ],
    howNote:
      "The key is the established company's incentives and the conflict copying would create, not simply the fact that a new product exists.",
    example: {
      company: "Netflix and Blockbuster",
      intro:
        "Netflix is often cited as a counter-positioning example. It entered movie rental with a model that the largest rental chain found hard to copy without damaging its own stores.",
      points: [
        {
          icon: "ti-mail",
          title: "A different model",
          text: "Netflix began renting DVDs by mail for a flat monthly fee, with no late fees.",
        },
        {
          icon: "ti-building-store",
          title: "A conflict for the leader",
          text: "Blockbuster's store business relied on per-rental charges and, by many accounts, a significant amount of late-fee revenue.",
        },
        {
          icon: "ti-scale",
          title: "Copying had a cost",
          text: "Blockbuster later dropped late fees and launched an online rental service, including a plan that let subscribers swap discs in its stores. At the time, one analyst said the plan did not make money by itself.",
        },
        {
          icon: "ti-info-circle",
          title: "One lens, not the whole story",
          text: "Blockbuster's decline also involved heavy debt, the move to streaming, and other factors. Netflix's later growth relied on other advantages too.",
        },
      ],
      sources: [
        {
          label: "NPR, “Blockbuster Targets Netflix with ‘Total Access’” (2007)",
          url: "https://www.npr.org/2007/03/27/9151791/blockbuster-targets-netflix-with-total-access",
        },
      ],
    },
    why: [
      "Established companies may face conflicting incentives.",
      "A new entrant may exploit the incumbent's hesitation.",
      "Competitive advantage can emerge from differences in business models and incentives.",
    ],
    limits: [
      "Established companies can adapt.",
      "A new business model may fail for other reasons.",
      "Counter-positioning is not guaranteed to defeat incumbents.",
    ],
  },

  /* ------------------------------------------------------------------
     04 — SWITCHING COSTS
  ------------------------------------------------------------------ */
  {
    slug: "switching-costs",
    headline: "The Advantage of Keeping Customers",
    simple:
      "Customers may find it costly to change providers because moving requires time, money, effort, or operational adjustments.",
    how: [
      {
        title: "Adopting a System",
        text: "A company starts using a provider's product for daily work.",
      },
      {
        title: "Data and Workflows Become Connected",
        text: "Files, accounts, and routines grow around that product.",
      },
      {
        title: "Moving Requires Migration and Training",
        text: "Leaving means moving data and teaching people something new.",
      },
      {
        title: "Switching Becomes More Costly",
        text: "The longer it is used, the more there is to move and rebuild.",
      },
    ],
    howNote:
      "The cost may be money, time, training, data migration, or the risk of disruption. It is not the same as customers simply being happy or loyal.",
    example: {
      company: "Microsoft",
      intro:
        "Microsoft sells a connected set of workplace tools, which makes it a useful way to picture how switching costs can build up in business software, without assuming every customer is locked in.",
      points: [
        {
          icon: "ti-user-check",
          title: "One system for accounts",
          text: "Microsoft says Microsoft 365 uses Microsoft Entra ID to manage user identities, so accounts and access can be tied to one system.",
        },
        {
          icon: "ti-plug-connected",
          title: "Connected apps",
          text: "Entra ID can also manage integrated apps, so more of a company's daily tools can end up connected to the same setup.",
        },
        {
          icon: "ti-arrows-exchange",
          title: "What switching could involve",
          text: "Moving away could mean moving email and files, rebuilding accounts and permissions, reconnecting other apps, and retraining staff. This is a general illustration, not a Microsoft figure.",
        },
        {
          icon: "ti-info-circle",
          title: "Not every customer is locked in",
          text: "How costly switching is depends on how deeply a company has built its work around the tools. Rival products exist, and migration tools can make moving easier.",
        },
      ],
      sources: [
        {
          label: "Microsoft Learn: Azure integration with Microsoft 365",
          url: "https://learn.microsoft.com/en-us/microsoft-365/enterprise/azure-integration",
        },
      ],
    },
    why: [
      "Switching costs may help retain customers.",
      "Migration complexity can discourage switching.",
      "A business may benefit when its product is deeply integrated into customer workflows.",
    ],
    limits: [
      "Customers may still switch if alternatives are substantially better.",
      "High switching costs can create customer frustration.",
      "New technologies can make migration easier.",
    ],
  },

  /* ------------------------------------------------------------------
     05 — BRANDING
  ------------------------------------------------------------------ */
  {
    slug: "branding",
    headline: "The Advantage of Being Different in Customers' Minds",
    simple:
      "A strong brand can create customer preference that allows a business to stand apart from alternatives.",
    how: [
      {
        title: "Consistent Product and Experience",
        text: "Customers get a similar, dependable experience over time.",
      },
      {
        title: "Customer Recognition and Trust",
        text: "People come to know the brand and expect it to deliver.",
      },
      {
        title: "Distinctive Brand Meaning",
        text: "The name stands for something specific in customers' minds.",
      },
      {
        title: "Customer Preference",
        text: "Customers choose it over comparable alternatives.",
      },
    ],
    howNote:
      "Being well known is not enough. A brand creates an advantage when it changes how customers see and choose a product. That is about perception and preference, not recognition alone.",
    example: {
      company: "Apple",
      intro:
        "Apple is a common example of a brand that shapes how customers choose. This page does not claim that Apple's brand alone explains its results.",
      points: [
        {
          icon: "ti-list-details",
          title: "What the annual report lists",
          text: "Apple's annual report names design, product quality and reliability, and corporate reputation among the factors important to competing, alongside price and features.",
        },
        {
          icon: "ti-currency-dollar",
          title: "Competing beyond price",
          text: "The report also says many competitors compete mainly through aggressive pricing and very low cost structures. A brand matters most where customers value more than price alone.",
        },
        {
          icon: "ti-layers-intersect",
          title: "Hard to separate",
          text: "Apple designs nearly the entire solution itself, from hardware to software and services. Preference may come from the brand, the product, and the ecosystem together, and outsiders cannot tell how much is the brand alone.",
        },
        {
          icon: "ti-info-circle",
          title: "A strong brand is not dominance",
          text: "Apple says it holds a minority share in the global smartphone, personal computer, tablet, and wearables markets. Branding is also a different power from Switching Costs, which is about the cost of leaving.",
        },
      ],
      sources: [
        {
          label: "Apple Inc., Form 10-K, fiscal 2025 (SEC)",
          url: "https://www.sec.gov/Archives/edgar/data/320193/000032019325000079/aapl-20250927.htm",
        },
      ],
    },
    why: [
      "A brand can differentiate a business from alternatives.",
      "Customers may develop a preference for a brand.",
      "Strong brand associations can take considerable time to build.",
    ],
    limits: [
      "Brand reputation can deteriorate.",
      "Recognition alone does not prove pricing power.",
      "Customer preferences can change.",
    ],
  },

  /* ------------------------------------------------------------------
     06 — CORNERED RESOURCE
  ------------------------------------------------------------------ */
  {
    slug: "cornered-resource",
    headline: "The Advantage of Having Something Others Cannot Easily Get",
    simple:
      "A business may gain an advantage by controlling a valuable resource that competitors cannot easily access or reproduce.",
    how: [
      {
        title: "Access to a Valuable Resource",
        text: "A business gets hold of something that improves what it can do.",
      },
      {
        title: "Limited Availability to Competitors",
        text: "Rivals cannot easily get the same thing, or not on the same terms.",
      },
      {
        title: "Distinctive Business Capability",
        text: "The resource lets the business do something others cannot match.",
      },
      {
        title: "Potential Competitive Advantage",
        text: "That gap may last for as long as the resource stays valuable.",
      },
    ],
    howNote:
      "A resource only counts if rivals truly cannot match it. If a business has to pay a price that captures all the benefit, there is little advantage left.",
    extra: {
      title: "What can a cornered resource look like?",
      items: [
        {
          icon: "ti-key",
          title: "Exclusive access to a valuable asset",
          text: "Valuable because only the holder can use it. Hard to get because access has already been given exclusively.",
        },
        {
          icon: "ti-file-certificate",
          title: "Important intellectual property",
          text: "Valuable because it can protect a product or method. Hard to get because someone else legally holds it. A patent alone does not prove a cornered resource.",
        },
        {
          icon: "ti-users-group",
          title: "Scarce talent or specialized expertise",
          text: "Valuable because skilled people can create what others cannot. Hard to get because such people are rare, choose where to work, and can leave.",
        },
        {
          icon: "ti-box",
          title: "Other hard-to-get resources",
          text: "For example, a favorable supply relationship or rare data. Valuable only if it truly improves results, and hard to get only if others cannot match the terms.",
        },
      ],
    },
    example: {
      company: "Pixar (a case Helmer discusses)",
      intro:
        "Helmer's own opening example for this power is a film studio. It shows that a cornered resource can be people, not only land or patents. It is also a debated case.",
      points: [
        {
          icon: "ti-bulb",
          title: "Why Helmer uses it",
          text: "Helmer opens his chapter on this power with Pixar's creative leadership group, often called the Brain Trust, as something other studios could not simply copy.",
        },
        {
          icon: "ti-key",
          title: "The idea in theory",
          text: "A small group of exceptional storytellers improved Pixar's films in a way rivals could not easily hire or replicate.",
        },
        {
          icon: "ti-help-circle",
          title: "Why it is debated",
          text: "Some analysts argue that Pixar's results came more from its ways of working than from individual talent, which would make it Process Power instead.",
        },
        {
          icon: "ti-info-circle",
          title: "A cautious reading",
          text: "Cornered resources are hard to spot. Talent can leave, and paying a price that captures all the benefit can cancel the advantage.",
        },
      ],
      sources: [
        {
          label: "Commoncog: Cornered Resource",
          url: "https://commoncog.com/c/concepts/cornered-resource/",
        },
        {
          label: "David Phelps: Pixar and the Myth of the Cornered Resource",
          url: "https://davidphelps.substack.com/p/pixar-and-the-myth-of-the-cornered",
        },
      ],
    },
    why: [
      "Some resources cannot be acquired immediately.",
      "Competitors may struggle to obtain equivalent resources.",
      "The advantage may persist while the resource remains valuable and difficult to access.",
    ],
    limits: [
      "Resource value can decline.",
      "Competitors may find alternative solutions.",
      "A scarce resource does not guarantee a profitable business.",
    ],
  },

  /* ------------------------------------------------------------------
     07 — PROCESS POWER
  ------------------------------------------------------------------ */
  {
    slug: "process-power",
    headline: "The Advantage of Doing Things Better",
    simple:
      "Distinctive ways of working can become difficult to replicate when they are deeply embedded in an organization's experience and operations.",
    how: [
      {
        title: "Repeated Practice and Learning",
        text: "Teams try, measure, and improve the way work gets done.",
      },
      {
        title: "Improved Operating Processes",
        text: "What works is kept and refined over time.",
      },
      {
        title: "Accumulated Knowledge and Coordination",
        text: "Many people and steps learn to work smoothly together.",
      },
      {
        title: "Difficult-to-Replicate Capabilities",
        text: "The result is a way of working that is hard to copy quickly.",
      },
    ],
    howNote:
      "Process Power is not just having an efficient process. It is a capability embedded in the organization that took years to build and is hard for others to reproduce.",
    example: {
      company: "Toyota",
      intro:
        "The Toyota Production System is the classic example used to illustrate this power. The facts below come from Toyota's own description of its system.",
      points: [
        {
          icon: "ti-hourglass",
          title: "Built over years",
          text: "Toyota says its production system took shape through trial and error in the late 1940s and early 1950s, spread across its Honsha plant in the late 1950s, and began at all its plants in 1960.",
        },
        {
          icon: "ti-columns",
          title: "Two main ideas",
          text: "It rests on Just-in-Time (making only what is needed, when it is needed) and jidoka (spotting problems and stopping to fix them).",
        },
        {
          icon: "ti-refresh",
          title: "Always improving",
          text: "Toyota says its employees apply small daily improvements, known as kaizen, so the system keeps evolving.",
        },
        {
          icon: "ti-info-circle",
          title: "Why it is hard to copy",
          text: "Toyota's system is widely studied, yet knowing the ideas is different from running them across a whole organization. How fully a rival could match it is hard for outsiders to judge.",
        },
      ],
      sources: [
        {
          label: "Toyota Motor Corporation: Production System",
          url: "https://global.toyota/en/company/vision-and-philosophy/production-system/",
        },
        {
          label: "Toyota: History of the production system",
          url: "https://www.toyota-global.com/company/history_of_toyota/75years/data/automotive_business/production/system/change.html",
        },
      ],
    },
    why: [
      "Experience can improve operational performance.",
      "Interconnected routines can be difficult to reproduce.",
      "Advantages may emerge from the way multiple activities work together.",
    ],
    limits: [
      "Competitors can learn and improve.",
      "New technology can change what works best.",
      "Efficient processes do not automatically constitute Process Power.",
    ],
  },
];