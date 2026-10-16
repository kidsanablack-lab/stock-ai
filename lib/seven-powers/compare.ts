import type { PowerSlug } from "./powers";

// Four pairs of powers that are easy to confuse.
// All wording is Scope's own.

export type CompareSide = {
  slug: PowerSlug;
  focus: string; // short label: what this power is about
  text: string;
};

export type Comparison = {
  id: string;
  left: CompareSide;
  right: CompareSide;
  summary: string;
  note?: string;
};

export const COMPARISONS: Comparison[] = [
  {
    id: "scale-vs-network",
    left: {
      slug: "scale-economies",
      focus: "Cost and efficiency from size",
      text: "The cost per unit can fall as output grows.",
    },
    right: {
      slug: "network-economies",
      focus: "Value from connecting participants",
      text: "The network can become more valuable as participants join and interact.",
    },
    summary:
      "Scale is about the economics of producing or delivering more. Network economies are about the value created by a growing network.",
  },
  {
    id: "branding-vs-switching",
    left: {
      slug: "branding",
      focus: "Customer preference",
      text: "Customers prefer the business because of what the brand represents to them.",
    },
    right: {
      slug: "switching-costs",
      focus: "The cost of leaving",
      text: "Customers may remain because changing providers requires time, money, or effort.",
    },
    summary: "One is about preference. The other is about the cost of changing.",
    note: "A business can have both at the same time. Customers may prefer a brand and also find it costly to leave.",
  },
  {
    id: "cornered-vs-process",
    left: {
      slug: "cornered-resource",
      focus: "What a business can access",
      text: "The advantage comes from access to a valuable resource that others cannot easily obtain.",
    },
    right: {
      slug: "process-power",
      focus: "How an organization operates",
      text: "The advantage comes from distinctive ways of working that others cannot easily replicate.",
    },
    summary:
      "One is about what a business can access. The other is about how the organization operates.",
  },
  {
    id: "scale-vs-counter",
    left: {
      slug: "scale-economies",
      focus: "Cost economics of size",
      text: "The advantage comes from cost economics associated with scale.",
    },
    right: {
      slug: "counter-positioning",
      focus: "The difficulty of copying a different model",
      text: "The advantage comes from a new business model that established competitors may struggle to adopt.",
    },
    summary:
      "One is about the economics of scale. The other is about the strategic difficulty of copying a different model.",
  },
];

export const TAKEAWAYS = [
  {
    number: "01",
    title: "Size Alone Is Not Enough",
    text: "A large business does not automatically have a durable competitive advantage.",
  },
  {
    number: "02",
    title: "Different Advantages Work in Different Ways",
    text: "Each Power represents a different mechanism that can help a business defend its position.",
  },
  {
    number: "03",
    title: "Advantages Are Not Guarantees",
    text: "Even businesses with strong advantages can face disruption, competition, and changing market conditions.",
  },
];