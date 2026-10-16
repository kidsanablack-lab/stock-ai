// MOCKUP DATA ONLY — static, not connected to Supabase or any API.

export type BusinessModelTone = { bg: string; accent: string };

export type MockBusinessModel = {
  slug: string;
  emoji: string;
  icon: string;
  name: string;
  description: string;
  companyCount: number; // mock number
  tone: BusinessModelTone;
};

// Reuses the pastel pairs already used in BrowseByCategory / WhyScope
const BLUE = { bg: "#E6F1FB", accent: "#185FA5" };
const CLAY = { bg: "#FAECE7", accent: "#993C1D" };
const SAND = { bg: "#F1EFE8", accent: "#5F5E5A" };
const ROSE = { bg: "#FBEAF0", accent: "#993556" };
const AMBER = { bg: "#FAEEDA", accent: "#854F0B" };
const TEAL = { bg: "#E6F5F1", accent: "#0F6E56" };
const VIOLET = { bg: "#F1EFFB", accent: "#7c3aed" };

export const MOCK_BUSINESS_MODELS: MockBusinessModel[] = [
  {
    slug: "ai",
    emoji: "🤖",
    icon: "ti-robot",
    name: "AI",
    description:
      "Businesses that use artificial intelligence to build products, services, or technology.",
    companyCount: 12,
    tone: VIOLET,
  },
  {
    slug: "saas",
    emoji: "💻",
    icon: "ti-code",
    name: "SaaS",
    description:
      "Software that customers use online and pay for regularly instead of buying once.",
    companyCount: 24,
    tone: BLUE,
  },
  {
    slug: "cloud",
    emoji: "☁️",
    icon: "ti-cloud",
    name: "Cloud",
    description:
      "Provides computing, storage, databases, and technology infrastructure over the internet.",
    companyCount: 9,
    tone: TEAL,
  },
  {
    slug: "semiconductors",
    emoji: "🧠",
    icon: "ti-cpu",
    name: "Semiconductors",
    description:
      "Designs or manufactures chips that power computers, phones, cars, AI systems, and other devices.",
    companyCount: 0,
    tone: VIOLET,
  },
  {
    slug: "hardware",
    emoji: "🖥️",
    icon: "ti-device-desktop",
    name: "Hardware",
    description:
      "Designs and sells physical products, devices, or equipment that customers use.",
    companyCount: 0,
    tone: SAND,
  },
  {
    slug: "cybersecurity",
    emoji: "🛡️",
    icon: "ti-shield-lock",
    name: "Cybersecurity",
    description:
      "Protects computers, networks, software, and data from cyberattacks and unauthorized access.",
    companyCount: 0,
    tone: TEAL,
  },
  {
    slug: "banking",
    emoji: "🏦",
    icon: "ti-building-bank",
    name: "Banking",
    description:
      "Takes deposits, provides loans, and offers financial services to individuals and businesses.",
    companyCount: 15,
    tone: SAND,
  },
  {
    slug: "payments",
    emoji: "💳",
    icon: "ti-credit-card",
    name: "Payments",
    description:
      "Helps people and businesses send, receive, and process payments.",
    companyCount: 8,
    tone: ROSE,
  },
  {
    slug: "financial-services",
    emoji: "📈",
    icon: "ti-chart-line",
    name: "Financial Services",
    description:
      "Provides services such as investing, asset management, lending, and financial advice.",
    companyCount: 0,
    tone: BLUE,
  },
  {
    slug: "advertising",
    emoji: "📢",
    icon: "ti-speakerphone",
    name: "Advertising",
    description:
      "Connects businesses with audiences and earns money by selling access to their attention.",
    companyCount: 11,
    tone: CLAY,
  },
  {
    slug: "e-commerce",
    emoji: "🛒",
    icon: "ti-shopping-cart",
    name: "E-commerce",
    description:
      "Sells products to customers through online stores and digital channels.",
    companyCount: 10,
    tone: AMBER,
  },
  {
    slug: "marketplace",
    emoji: "🏪",
    icon: "ti-building-store",
    name: "Marketplace",
    description:
      "Connects buyers and sellers and helps them complete transactions through a platform.",
    companyCount: 7,
    tone: AMBER,
  },
  {
    slug: "manufacturing",
    emoji: "🏭",
    icon: "ti-building-factory-2",
    name: "Manufacturing",
    description:
      "Produces physical goods at scale and sells them to customers or other businesses.",
    companyCount: 21,
    tone: SAND,
  },
  {
    slug: "energy",
    emoji: "⚡",
    icon: "ti-bolt",
    name: "Energy",
    description:
      "Produces, generates, stores, or supplies energy to homes, businesses, and other customers.",
    companyCount: 14,
    tone: AMBER,
  },
  {
    slug: "healthcare",
    emoji: "💊",
    icon: "ti-heartbeat",
    name: "Healthcare",
    description:
      "Provides medical products, treatments, services, or technology that help people receive care.",
    companyCount: 18,
    tone: ROSE,
  },
  {
    slug: "telecom",
    emoji: "📡",
    icon: "ti-antenna-bars-5",
    name: "Telecom",
    description:
      "Provides networks and connectivity that allow people and businesses to communicate and access the internet.",
    companyCount: 6,
    tone: BLUE,
  },
  {
    slug: "gaming",
    emoji: "🎮",
    icon: "ti-device-gamepad-2",
    name: "Gaming",
    description:
      "Creates interactive games and earns money from players through digital and physical products.",
    companyCount: 7,
    tone: VIOLET,
  },
  {
    slug: "real-estate",
    emoji: "🏠",
    icon: "ti-home",
    name: "Real Estate",
    description:
      "Develops, owns, manages, rents, or sells properties such as homes and commercial buildings.",
    companyCount: 9,
    tone: TEAL,
  },
  {
    slug: "consumer-brands",
    emoji: "🛍️",
    icon: "ti-shopping-bag",
    name: "Consumer Brands",
    description:
      "Creates branded products that are designed, marketed, and sold to consumers.",
    companyCount: 22,
    tone: CLAY,
  },
  {
    slug: "logistics",
    emoji: "🚚",
    icon: "ti-truck",
    name: "Logistics",
    description:
      "Moves, stores, and manages goods as they travel from suppliers to businesses and customers.",
    companyCount: 8,
    tone: AMBER,
  },
  {
    slug: "professional-services",
    emoji: "💼",
    icon: "ti-briefcase",
    name: "Professional Services",
    description:
      "Sells specialized knowledge and expertise to help businesses and individuals solve problems.",
    companyCount: 6,
    tone: SAND,
  },
  {
    slug: "insurance",
    emoji: "🛡️",
    icon: "ti-shield-check",
    name: "Insurance",
    description:
      "Collects premiums and helps customers manage the financial risk of unexpected events.",
    companyCount: 8,
    tone: ROSE,
  },
  {
    slug: "defense-aerospace",
    emoji: "🛰️",
    icon: "ti-rocket",
    name: "Defense & Aerospace",
    description:
      "Builds aircraft, spacecraft, defense systems, and technology for governments and commercial customers.",
    companyCount: 0,
    tone: BLUE,
  },
  {
    slug: "biotech-pharma",
    emoji: "🧪",
    icon: "ti-flask",
    name: "Biotechnology & Pharmaceuticals",
    description:
      "Develops medicines, treatments, and biological technologies to prevent or treat diseases.",
    companyCount: 0,
    tone: ROSE,
  },
];

