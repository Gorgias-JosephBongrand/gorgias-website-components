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

  // ── Per-plan CTA (label + link + baked automation rate) ──
  // Links carry automationRate (0 when AI Agent is off) + planSelected,
  // plus any incoming attribution params (ref, ref-position, …).
  starterCtaLabel?: string;
  starterCtaHref?: LinkValue;
  starterAutomationRate?: number;

  basicCtaLabel?: string;
  basicCtaHref?: LinkValue;
  basicAutomationRate?: number;

  proCtaLabel?: string;
  proCtaHref?: LinkValue;
  proAutomationRate?: number;

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
}

export function PricingPlans({
  plansJson = "",
  defaultBilling = "annual",
  defaultAiOn = true,
  monthlyLabel = "Monthly",
  annualLabel = "Annual",
  aiToggleLabel = "Add AI Agent",

  starterCtaLabel = "Start free trial",
  starterCtaHref,
  starterAutomationRate,

  basicCtaLabel = "Start free trial",
  basicCtaHref,
  basicAutomationRate,

  proCtaLabel = "Start free trial",
  proCtaHref,
  proAutomationRate,

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
              ctaLabel={cfg.label || plan.cta}
              ctaHref={{ href }}
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
