import type { PricingCardProps } from "../PricingCard/PricingCard";
import type { BillingCycle } from "../BillingToggle/BillingToggle";
import { fmtMoney as fmt, fmtVol } from "../../lib/format";
import { parseJsonArray } from "../../lib/parse";

/*
 * Plan data model — single source of truth for the dynamic pricing section.
 * Raw numbers in, display strings out: the component computes prices per
 * billing cycle / AI state, and the same data feeds the JSON-LD generator.
 * Mirrors V2_PLANS from the design source (v2-shared.jsx).
 */
export interface Plan {
  key: string;
  name: string;
  audience: string;
  /** Helpdesk monthly base when billed annually */
  helpdeskAnnual: number;
  /** Helpdesk monthly base when billed monthly */
  helpdeskMonthly: number;
  /** AI Agent monthly base when billed annually (0 = no base) */
  aiAnnual: number;
  /** AI Agent monthly base when billed monthly */
  aiMonthly: number;
  /** Automated interactions covered by the AI base */
  aiIncluded: number;
  tickets: string;
  cta: string;
  ctaVariant: "dark" | "ghost";
  ctaHref: string;
  /** Baked automation rate (%) applied when AI Agent is on; 0 when off. */
  automationRate: number;
  /** Starter: monthly billing only, no AI base */
  starterOnly?: boolean;
  featured?: boolean;
  badge?: string;
}

export const DEFAULT_PLANS: Plan[] = [
  {
    key: "starter",
    name: "Starter",
    audience: "For smaller brands getting started on one platform.",
    helpdeskAnnual: 10,
    helpdeskMonthly: 10,
    aiAnnual: 0,
    aiMonthly: 0,
    aiIncluded: 0,
    tickets: "50 tickets / month",
    cta: "Start free trial",
    ctaVariant: "ghost",
    ctaHref: "/signup",
    automationRate: 0,
    starterOnly: true,
  },
  {
    key: "basic",
    name: "Basic",
    audience: "For growing brands whose support volume is outpacing their team.",
    helpdeskAnnual: 50,
    helpdeskMonthly: 60,
    aiAnnual: 7,
    aiMonthly: 9,
    aiIncluded: 45,
    tickets: "300 tickets / month",
    cta: "Start free trial",
    ctaVariant: "ghost",
    ctaHref: "/signup",
    automationRate: 15,
  },
  {
    key: "pro",
    name: "Pro",
    audience: "For scaling brands that let AI resolve and sell, with revenue analytics.",
    helpdeskAnnual: 300,
    helpdeskMonthly: 360,
    aiAnnual: 45,
    aiMonthly: 54,
    aiIncluded: 300,
    tickets: "2,000 tickets / month",
    cta: "Start free trial",
    ctaVariant: "dark",
    ctaHref: "/signup",
    automationRate: 15,
    featured: true,
    badge: "Most popular · 12,400+ brands",
  },
  {
    key: "advanced",
    name: "Advanced",
    audience: "For high-volume brands that need peak-ready automation and a dedicated team.",
    helpdeskAnnual: 750,
    helpdeskMonthly: 900,
    aiAnnual: 112,
    aiMonthly: 135,
    aiIncluded: 750,
    tickets: "5,000 tickets / month",
    cta: "Talk to sales",
    ctaVariant: "ghost",
    ctaHref: "/demo",
    automationRate: 15,
  },
];

/** Mirrors PlanCard pricing logic from v2-plancard.jsx */
export function computeCardProps(
  plan: Plan,
  billing: BillingCycle,
  aiOn: boolean
): PricingCardProps {
  const isAnnual = billing === "annual";
  const isStarter = !!plan.starterOnly;
  const disabled = isStarter && isAnnual;

  const helpdesk = isAnnual ? plan.helpdeskAnnual : plan.helpdeskMonthly;
  const aiBase = aiOn && !isStarter ? (isAnnual ? plan.aiAnnual : plan.aiMonthly) : 0;
  const aiBaseMonthlyContract = aiOn && !isStarter ? plan.aiMonthly : 0;

  const price = helpdesk + aiBase;
  const strikeFull = plan.helpdeskMonthly + aiBaseMonthlyContract;
  const showStrike = isAnnual && !isStarter && strikeFull > price;
  const yearlyBilled = price * 12;

  // AI Agent is a paid add-on on top of the ticket fee — never a standalone
  // "pay-as-you-go" plan, never "no monthly base" (per PMM billing review).
  // AI Agent is available on every plan. When it isn't included in the base,
  // keep the row and turn it into an invite to add it (designer feedback).
  const aiActive = aiOn && !isStarter;

  // Included allowance surfaced in the "Included" list (like the ticket count).
  const aiResolvedLabel = aiActive ? `${fmtVol(plan.aiIncluded)} resolved conversations` : "";
  const aiAgentDisplayValue = aiActive ? `${fmt(aiBase)}/mo` : "";
  const aiAgentNote = aiActive
    ? "Then a per-automated interaction fee."
    : "Include AI Agent to start automating your support tickets.";

  const aiAgentTooltip = aiActive
    ? `An automated interaction is when AI Agent fully resolves a ticket with no human in 72 hours, and also counts as one helpdesk ticket. Your plan includes ${fmtVol(plan.aiIncluded)} (15% of tickets); beyond that, a per-automated interaction fee applies.`
    : "";

  // Helpdesk overage line, mirroring the AI Agent note for symmetry.
  const helpdeskNote = "Then a per-ticket fee past your limit.";

  // The top banner is reserved for the featured promo only. Constraints and
  // reassurances live as supporting text below the CTA (designer feedback).
  const isTrial = /trial/i.test(plan.cta);
  const ctaNote = disabled
    ? "Monthly billing only"
    : isTrial
    ? "No credit card required"
    : "Book a 30-minute call";

  return {
    state: disabled ? "disabled" : plan.featured ? "featured" : "default",
    tagText: plan.featured ? plan.badge ?? "" : "",
    ctaNote,
    planName: plan.name,
    audience: plan.audience,
    originalPrice: showStrike ? fmt(strikeFull) : "",
    currentPrice: fmt(price),
    pricePeriod: "/mo",
    billingNote:
      isStarter || !isAnnual
        ? "Billed monthly · cancel anytime"
        : `${fmt(yearlyBilled)} billed annually`,
    ticketLabel: plan.tickets,
    helpdeskPrice: `${fmt(helpdesk)}/mo`,
    helpdeskNote,
    aiResolvedLabel,
    aiAgentDisplayValue,
    aiAgentNote,
    aiAgentTooltip,
    ctaVariant: plan.ctaVariant,
    ctaLabel: plan.cta,
    ctaHref: { href: plan.ctaHref },
    compareLinkLabel: "Compare all features ↓",
    compareLinkHref: "#compare",
  };
}

/** Parse the Webflow-editable JSON prop; fall back to defaults on any error. */
export const parsePlans = (json?: string): Plan[] => parseJsonArray(json, DEFAULT_PLANS);

/**
 * Build a CTA href that preserves incoming attribution params (ref,
 * ref-position, etc. already on the page URL) and layers in the
 * pricing params. Empty values are skipped. SSR-safe: when no current
 * search is available, just the base + supplied params are emitted.
 */
export function buildCtaHref(
  base: string,
  params: Record<string, string | number | undefined>,
  currentSearch = ""
): string {
  const [path, baseQuery = ""] = base.split("?");
  const sp = new URLSearchParams(currentSearch);
  // base may carry its own query — merge it in
  new URLSearchParams(baseQuery).forEach((v, k) => sp.set(k, v));
  for (const [k, v] of Object.entries(params)) {
    if (v === undefined || v === "") continue;
    sp.set(k, String(v));
  }
  const qs = sp.toString();
  return qs ? `${path}?${qs}` : path;
}

/**
 * schema.org Product + Offer markup from the same plan data.
 * Rendered inline by the component AND available for the page <head>
 * via Webflow page settings (more reliable for non-Google crawlers).
 */
export function buildJsonLd(plans: Plan[], productName: string, productUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: productName,
    url: productUrl,
    offers: plans.map((p) => ({
      "@type": "Offer",
      name: p.name,
      description: p.audience,
      price: String(p.helpdeskAnnual + (p.starterOnly ? 0 : p.aiAnnual)),
      priceCurrency: "USD",
      url: p.ctaHref !== "#" ? p.ctaHref : productUrl,
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: String(p.helpdeskAnnual + (p.starterOnly ? 0 : p.aiAnnual)),
        priceCurrency: "USD",
        unitText: "MONTH",
      },
    })),
  };
}
