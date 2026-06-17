"use client";

import React, { useEffect, useMemo, useState } from "react";
import { BillingToggle, type BillingCycle } from "../BillingToggle/BillingToggle";
import { AiAgentToggle } from "../AiAgentToggle/AiAgentToggle";
import { ADDON_EVENT, type AddonSelectionDetail } from "../AddonCard/AddonCard";
import { PricingCard } from "../PricingCard/PricingCard";
import { PricingCardEnterprise } from "../PricingCardEnterprise/PricingCardEnterprise";
import { buildCtaHref, buildJsonLd, computeCardProps, parsePlans } from "./plans";
import { hrefOf, type LinkValue } from "../../lib/link";

/** Per-plan CTA override; blank fields fall back to the plan's own data. */
interface PlanCtaConfig {
  label?: string;
  href?: LinkValue;
  automationRate?: number;
}

export interface PricingPlansProps {
  /** Plan data as JSON — edit in Webflow to change prices/copy. Empty = built-in defaults. */
  plansJson?: string;
  defaultBilling?: BillingCycle;
  defaultAiOn?: boolean;

  // Toggle labels
  monthlyLabel?: string;
  annualLabel?: string;
  aiToggleLabel?: string;

  // ── Per-plan copy + CTA ──
  starterAudience?: string;
  starterCtaLabel?: string;
  starterCtaHref?: LinkValue;
  starterAutomationRate?: number;

  basicAudience?: string;
  basicCtaLabel?: string;
  basicCtaHref?: LinkValue;
  basicAutomationRate?: number;

  proAudience?: string;
  proCtaLabel?: string;
  proCtaHref?: LinkValue;
  proAutomationRate?: number;

  advancedAudience?: string;
  advancedCtaLabel?: string;
  advancedCtaHref?: LinkValue;
  advancedAutomationRate?: number;

  // Enterprise card
  showEnterprise?: boolean;
  enterpriseTitle?: string;
  enterpriseDescription?: string;
  enterpriseCtaLabel?: string;
  enterpriseCtaHref?: LinkValue;

  // JSON-LD structured data (SEO)
  emitJsonLd?: boolean;
  productName?: string;
  productUrl?: string;

  /** Shared "Compare all features" link shown at the bottom of every card */
  compareLinkLabel?: string;
  compareLinkHref?: LinkValue;

  /** Text-hierarchy treatment passed to each card (prototype A/B) */
  hierarchy?: "v1" | "v2";
}

export function PricingPlans({
  plansJson = "",
  defaultBilling = "annual",
  defaultAiOn = true,
  monthlyLabel = "Monthly",
  annualLabel = "Annual",
  aiToggleLabel = "Add AI Agent",

  starterAudience = "For smaller brands getting started on one platform.",
  starterCtaLabel = "Start free trial",
  starterCtaHref,
  starterAutomationRate,

  basicAudience = "For growing brands whose support volume is outpacing their team.",
  basicCtaLabel = "Start free trial",
  basicCtaHref,
  basicAutomationRate,

  proAudience = "For scaling brands that let AI resolve and sell, with revenue analytics.",
  proCtaLabel = "Start free trial",
  proCtaHref,
  proAutomationRate,

  advancedAudience = "For high-volume brands that need peak-ready automation and a dedicated team.",
  advancedCtaLabel = "Talk to sales",
  advancedCtaHref,
  advancedAutomationRate,

  showEnterprise = true,
  enterpriseTitle = "Need a fully custom plan?",
  enterpriseDescription = "For teams over 5,000 conversations a month with complex security, compliance, or integration needs.",
  enterpriseCtaLabel = "Talk to sales",
  enterpriseCtaHref,
  emitJsonLd = true,
  productName = "Gorgias",
  productUrl = "https://www.gorgias.com/pricing",
  compareLinkLabel = "Compare all features ↓",
  compareLinkHref,
  hierarchy = "v2",
}: PricingPlansProps) {
  const [billing, setBilling] = useState<BillingCycle>(defaultBilling);
  const [aiOn, setAiOn] = useState(defaultAiOn);

  // Capture incoming attribution params (ref, ref-position, …) after mount
  // so CTAs forward them. SSR renders hrefs without them (crawler-safe).
  const [search, setSearch] = useState("");
  useEffect(() => {
    setSearch(window.location.search);
  }, []);

  // Track add-on volume selections broadcast by AddonCard(s) on the page,
  // so plan CTAs forward the chosen Voice/SMS volume. Updates live.
  const [addonTickets, setAddonTickets] = useState<{ voice?: number; sms?: number }>({});
  useEffect(() => {
    const handler = (e: Event) => {
      const { kind, tickets } = (e as CustomEvent<AddonSelectionDetail>).detail;
      setAddonTickets((prev) => {
        const next = { ...prev };
        if (tickets && tickets > 0) next[kind] = tickets;
        else delete next[kind];
        return next;
      });
    };
    window.addEventListener(ADDON_EVENT, handler);
    return () => window.removeEventListener(ADDON_EVENT, handler);
  }, []);

  const plans = useMemo(() => parsePlans(plansJson), [plansJson]);

  const ctaByKey: Record<string, PlanCtaConfig> = {
    starter: { label: starterCtaLabel, href: starterCtaHref, automationRate: starterAutomationRate },
    basic: { label: basicCtaLabel, href: basicCtaHref, automationRate: basicAutomationRate },
    pro: { label: proCtaLabel, href: proCtaHref, automationRate: proAutomationRate },
    advanced: { label: advancedCtaLabel, href: advancedCtaHref, automationRate: advancedAutomationRate },
  };

  const audienceByKey: Record<string, string> = {
    starter: starterAudience,
    basic: basicAudience,
    pro: proAudience,
    advanced: advancedAudience,
  };

  const jsonLd = useMemo(
    () => (emitJsonLd ? JSON.stringify(buildJsonLd(plans, productName, productUrl)) : null),
    [emitJsonLd, plans, productName, productUrl]
  );

  return (
    <section className="font-sans antialiased">
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd }}
        />
      )}

      {/* Plan switcher */}
      <div className="mb-10 flex flex-wrap items-center justify-center gap-6">
        <BillingToggle
          defaultValue={defaultBilling}
          monthlyLabel={monthlyLabel}
          annualLabel={annualLabel}
          onChange={setBilling}
        />
        <AiAgentToggle
          defaultOn={defaultAiOn}
          label={aiToggleLabel}
          onChange={setAiOn}
        />
      </div>

      {/* Plan cards */}
      <div className="mx-auto mb-4 grid w-full max-w-[1240px] grid-cols-1 items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {plans.map((plan) => {
          const cfg = ctaByKey[plan.key] ?? {};
          // AI on → plan's baked automation rate; AI off → 0
          const rate = aiOn ? cfg.automationRate ?? plan.automationRate ?? 0 : 0;
          // Link prop (or string) → base path; empty falls back to plan default
          const base = hrefOf(cfg.href) || plan.ctaHref;
          const href = buildCtaHref(
            base,
            {
              automationRate: rate,
              planSelected: plan.key,
              voiceTickets: addonTickets.voice,
              smsTickets: addonTickets.sms,
            },
            search
          );
          return (
            <PricingCard
              key={plan.key}
              {...computeCardProps(plan, billing, aiOn)}
              audience={audienceByKey[plan.key]}
              ctaLabel={cfg.label || plan.cta}
              ctaHref={{ href }}
              compareLinkLabel={compareLinkLabel}
              compareLinkHref={hrefOf(compareLinkHref) || "#compare"}
              hierarchy={hierarchy}
            />
          );
        })}
      </div>

      {/* Enterprise card */}
      {showEnterprise && (
        <div className="mx-auto w-full max-w-[1240px]">
          <PricingCardEnterprise
            title={enterpriseTitle}
            description={enterpriseDescription}
            ctaLabel={enterpriseCtaLabel}
            ctaHref={{ href: buildCtaHref(hrefOf(enterpriseCtaHref) || "/demo", {}, search) }}
          />
        </div>
      )}
    </section>
  );
}
