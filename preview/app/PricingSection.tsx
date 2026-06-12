"use client";

import React, { useState } from "react";
import { BillingToggle, type BillingCycle } from "../../src/components/BillingToggle/BillingToggle";
import { AiAgentToggle } from "../../src/components/AiAgentToggle/AiAgentToggle";
import { PricingCard, type PricingCardProps } from "../../src/components/PricingCard/PricingCard";
import { PricingCardEnterprise } from "../../src/components/PricingCardEnterprise/PricingCardEnterprise";

/* ── Plan data (mirrors v2-shared.jsx V2_PLANS) ── */
const PLANS = [
  {
    key: "starter",
    name: "Starter",
    audience: "For small stores getting started with customer support",
    helpdesk_a: 10,   // annual price (same as monthly for Starter)
    helpdesk_m: 10,
    ai_a: 0,
    ai_m: 0,
    ai_included: 0,
    tickets: "50 tickets / month",
    cta: "Start free trial",
    ctaVariant: "ghost" as const,
    ctaHref: "#",
    starterOnly: true,
    featured: false,
    badge: "",
  },
  {
    key: "basic",
    name: "Basic",
    audience: "For growing stores handling up to 300 tickets/month",
    helpdesk_a: 50,
    helpdesk_m: 60,
    ai_a: 7,
    ai_m: 9,
    ai_included: 45,
    tickets: "300 tickets / month",
    cta: "Start free trial",
    ctaVariant: "dark" as const,
    ctaHref: "#",
    starterOnly: false,
    featured: false,
    badge: "",
  },
  {
    key: "pro",
    name: "Pro",
    audience: "AI Agent on the front line, with revenue analytics behind it.",
    helpdesk_a: 300,
    helpdesk_m: 360,
    ai_a: 45,
    ai_m: 54,
    ai_included: 300,
    tickets: "2,000 tickets / month",
    cta: "Start free trial",
    ctaVariant: "dark" as const,
    ctaHref: "#",
    starterOnly: false,
    featured: true,
    badge: "Most popular · 12,600 brands",
  },
  {
    key: "advanced",
    name: "Advanced",
    audience: "High-volume AI scaling, with white-glove onboarding & analytics.",
    helpdesk_a: 750,
    helpdesk_m: 900,
    ai_a: 112,
    ai_m: 135,
    ai_included: 750,
    tickets: "5,000 tickets / month",
    cta: "Talk to sales",
    ctaVariant: "ghost" as const,
    ctaHref: "#",
    starterOnly: false,
    featured: false,
    badge: "",
  },
] as const;

function fmt(n: number) {
  return "$" + n.toLocaleString("en-US");
}

function computeCardProps(
  plan: typeof PLANS[number],
  billing: BillingCycle,
  aiOn: boolean
): PricingCardProps {
  const isAnnual = billing === "annual";
  const isStarter = plan.starterOnly;
  const disabled = isStarter && isAnnual;

  const helpdesk = isAnnual ? plan.helpdesk_a : plan.helpdesk_m;
  const aiBase = aiOn && !isStarter ? (isAnnual ? plan.ai_a : plan.ai_m) : 0;
  const aiBaseMonthlyContract = aiOn && !isStarter ? plan.ai_m : 0;

  const price = helpdesk + aiBase;
  const strikeFull = plan.helpdesk_m + aiBaseMonthlyContract;
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
    ? `~${plan.ai_included.toLocaleString("en-US")} automated interactions · at ${aiRate} per interaction`
    : "Optional — pay per resolved conversation. Add it anytime.";

  const aiAgentTooltip =
    isStarter || !aiOn
      ? ""
      : `A conversation counts as one automated interaction when AI Agent fully resolves it with no human needed within 72 hours. Your plan's base covers ~${plan.ai_included.toLocaleString("en-US")} a month, then ${aiRate} each.`;

  return {
    state: disabled ? "disabled" : plan.featured ? "featured" : "default",
    tagText: disabled ? "Monthly billing only" : plan.featured ? plan.badge : "",
    planName: plan.name,
    audience: plan.audience,
    originalPrice: showStrike ? fmt(strikeFull) : "",
    currentPrice: fmt(price),
    pricePeriod: "/mo",
    billingNote: isStarter || !isAnnual
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

export function PricingSection() {
  const [billing, setBilling] = useState<BillingCycle>("annual");
  const [aiOn, setAiOn] = useState(true);

  return (
    <section>
      {/* Controls */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 24,
          marginBottom: 40,
          flexWrap: "wrap",
        }}
      >
        <BillingToggle onChange={setBilling} defaultValue="annual" />
        <AiAgentToggle onChange={setAiOn} defaultOn={true} />
      </div>

      {/* Plan cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 20,
          maxWidth: 1240,
          margin: "0 auto 32px",
        }}
      >
        {PLANS.map((plan) => (
          <PricingCard key={plan.key} {...computeCardProps(plan, billing, aiOn)} />
        ))}
      </div>

      {/* Enterprise card */}
      <div style={{ maxWidth: 1240, margin: "0 auto" }}>
        <PricingCardEnterprise />
      </div>
    </section>
  );
}
