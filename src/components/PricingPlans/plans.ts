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
  /** Starter: monthly billing only, no AI base */
  starterOnly?: boolean;
  featured?: boolean;
  badge?: string;
}

export const DEFAULT_PLANS: Plan[] = [
  {
    key: "starter",
    name: "Starter",
    audience: "For small stores getting started with customer support",
    helpdeskAnnual: 10,
    helpdeskMonthly: 10,
    aiAnnual: 0,
    aiMonthly: 0,
    aiIncluded: 0,
    tickets: "50 tickets / month",
    cta: "Start free trial",
    ctaVariant: "ghost",
    ctaHref: "#",
    starterOnly: true,
  },
  {
    key: "basic",
    name: "Basic",
    audience: "For growing stores handling up to 300 tickets/month",
    helpdeskAnnual: 50,
    helpdeskMonthly: 60,
    aiAnnual: 7,
    aiMonthly: 9,
    aiIncluded: 45,
    tickets: "300 tickets / month",
    cta: "Start free trial",
    ctaVariant: "dark",
    ctaHref: "#",
  },
  {
    key: "pro",
    name: "Pro",
    audience: "AI Agent on the front line, with revenue analytics behind it.",
    helpdeskAnnual: 300,
    helpdeskMonthly: 360,
    aiAnnual: 45,
    aiMonthly: 54,
    aiIncluded: 300,
    tickets: "2,000 tickets / month",
    cta: "Start free trial",
    ctaVariant: "dark",
    ctaHref: "#",
    featured: true,
    badge: "Most popular · 12,600 brands",
  },
  {
    key: "advanced",
    name: "Advanced",
    audience: "High-volume AI scaling, with white-glove onboarding & analytics.",
    helpdeskAnnual: 750,
    helpdeskMonthly: 900,
    aiAnnual: 112,
    aiMonthly: 135,
    aiIncluded: 750,
    tickets: "5,000 tickets / month",
    cta: "Talk to sales",
    ctaVariant: "ghost",
    ctaHref: "#",
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
  const aiRate = isAnnual && !isStarter ? "$0.90" : "$1.00";

  const aiAgentDisplayValue = isStarter
    ? "$1.00 / interaction"
    : aiOn
    ? `${fmt(aiBase)}/mo`
    : `${aiRate} / interaction`;

  const aiAgentNote = isStarter
    ? "Pay only when AI resolves a ticket. No monthly base."
    : aiOn
    ? `~${fmtVol(plan.aiIncluded)} automated interactions · at ${aiRate} per interaction`
    : "Optional — pay per resolved conversation. Add it anytime.";

  const aiAgentTooltip =
    isStarter || !aiOn
      ? ""
      : `A conversation counts as one automated interaction when AI Agent fully resolves it with no human needed within 72 hours. Your plan's base covers ~${fmtVol(plan.aiIncluded)} a month, then ${aiRate} each.`;

  return {
    state: disabled ? "disabled" : plan.featured ? "featured" : "default",
    tagText: disabled ? "Monthly billing only" : plan.featured ? plan.badge : "",
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
    aiAgentDisplayValue,
    aiAgentNote,
    aiAgentTooltip,
    ctaVariant: plan.ctaVariant,
    ctaLabel: plan.cta,
    ctaHref: plan.ctaHref,
    compareLinkLabel: "Compare all features ↓",
    compareLinkHref: "#compare",
  };
}

/** Parse the Webflow-editable JSON prop; fall back to defaults on any error. */
export const parsePlans = (json?: string): Plan[] => parseJsonArray(json, DEFAULT_PLANS);

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
