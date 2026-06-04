// The 24-vertical registry for vertical-specific market maps.
// Only verticals with deep, hand-curated coverage are marked `live`.
// The rest render as "coming soon" so the framework's reach is visible
// without faking density.

import type { Vertical } from "./marketMap";

export interface VerticalEntry {
  /** URL slug — /market-map/<slug> */
  slug: string;
  /** Display name for the sidebar + page H1. */
  label: string;
  /** One-line description of what the vertical covers. */
  blurb: string;
  /** Maps to an existing MAP_COMPANIES vertical bucket, if any. */
  mapsTo?: Vertical;
  /** Whether the vertical-specific map is published. */
  status: "live" | "coming-soon";
}

export const VERTICAL_REGISTRY: VerticalEntry[] = [
  { slug: "legal", label: "Legal", blurb: "AI for law firms, in-house counsel, and contracting.", mapsTo: "legal", status: "live" },
  { slug: "wealth", label: "WealthTech", blurb: "AI-native wealth management, advisor copilots, planning, estate, RIA compliance.", mapsTo: "finance", status: "live" },
  { slug: "healthcare", label: "Healthcare", blurb: "Clinical documentation, diagnostics, payer/provider workflows.", mapsTo: "health", status: "coming-soon" },
  { slug: "financial-services", label: "Financial Services (broad)", blurb: "Banking, capital markets, payments. (WealthTech split out above.)", mapsTo: "finance", status: "coming-soon" },
  { slug: "customer-experience", label: "Customer Experience", blurb: "Voice, chat, and post-sale resolution agents.", mapsTo: "cx", status: "coming-soon" },
  { slug: "sales-gtm", label: "Sales & GTM", blurb: "Prospecting, enrichment, outbound, RevOps.", mapsTo: "sales", status: "coming-soon" },
  { slug: "code-devtools", label: "Code & Developer Tools", blurb: "IDEs, copilots, agents, code review.", mapsTo: "code", status: "coming-soon" },
  { slug: "creative-media", label: "Creative & Media", blurb: "Image, video, audio, design, editorial.", mapsTo: "creative", status: "coming-soon" },
  { slug: "education", label: "Education", blurb: "K-12, higher-ed, workforce learning, tutoring.", mapsTo: "edu", status: "coming-soon" },
  { slug: "marketing-advertising", label: "Marketing & Advertising", blurb: "Brand, performance, content, AEO.", status: "coming-soon" },
  { slug: "hr-recruiting", label: "HR & Recruiting", blurb: "Sourcing, screening, interviewing, people ops.", status: "coming-soon" },
  { slug: "cybersecurity", label: "Cybersecurity", blurb: "SOC, detection, response, fraud, compliance.", status: "coming-soon" },
  { slug: "insurance", label: "Insurance", blurb: "Underwriting, claims, broker workflows.", status: "coming-soon" },
  { slug: "real-estate", label: "Real Estate", blurb: "CRE, residential, leasing, property ops.", status: "coming-soon" },
  { slug: "government-defense", label: "Government & Defense", blurb: "Civilian agencies, defense primes, intelligence.", status: "coming-soon" },
  { slug: "logistics", label: "Logistics & Supply Chain", blurb: "Freight, fulfillment, planning, ops.", status: "coming-soon" },
  { slug: "retail-ecommerce", label: "Retail & E-commerce", blurb: "Storefronts, merchandising, post-purchase.", status: "coming-soon" },
  { slug: "manufacturing", label: "Manufacturing", blurb: "Industrial ops, quality, MES, supply.", status: "coming-soon" },
  { slug: "energy-utilities", label: "Energy & Utilities", blurb: "Grid, generation, trading, field ops.", status: "coming-soon" },
  { slug: "agriculture", label: "Agriculture", blurb: "Precision ag, agronomy, supply.", status: "coming-soon" },
  { slug: "pharma-biotech", label: "Pharma & Biotech", blurb: "Discovery, trials, regulatory, commercial.", status: "coming-soon" },
  { slug: "consulting-services", label: "Consulting & Services", blurb: "Strategy, audit, accounting, advisory.", status: "coming-soon" },
  { slug: "travel-hospitality", label: "Travel & Hospitality", blurb: "Booking, ops, loyalty, in-stay.", status: "coming-soon" },
  { slug: "construction-aec", label: "Construction & AEC", blurb: "Design, estimating, field, project controls.", status: "coming-soon" },
  { slug: "telecom-media", label: "Telecom & Media", blurb: "Carriers, publishers, networks, distribution.", status: "coming-soon" },
];

export const getVertical = (slug: string) =>
  VERTICAL_REGISTRY.find((v) => v.slug === slug);
