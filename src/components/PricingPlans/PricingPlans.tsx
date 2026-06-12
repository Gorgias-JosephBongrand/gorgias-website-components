"use client";

import React, { useMemo, useState } from "react";
import { BillingToggle, type BillingCycle } from "../BillingToggle/BillingToggle";
import { AiAgentToggle } from "../AiAgentToggle/AiAgentToggle";
import { PricingCard } from "../PricingCard/PricingCard";
import { PricingCardEnterprise } from "../PricingCardEnterprise/PricingCardEnterprise";
import { buildJsonLd, computeCardProps, parsePlans } from "./plans";

export interface PricingPlansProps {
  /** Plan data as JSON — edit in Webflow to change prices/copy. Empty = built-in defaults. */
  plansJson?: string;
  defaultBilling?: BillingCycle;
  defaultAiOn?: boolean;

  // Toggle labels
  monthlyLabel?: string;
  annualLabel?: string;
  aiToggleLabel?: string;

  // Enterprise card
  showEnterprise?: boolean;
  enterpriseTitle?: string;
  enterpriseDescription?: string;
  enterpriseCtaLabel?: string;
  enterpriseCtaHref?: string;

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
  aiToggleLabel = "Include AI Agent",
  showEnterprise = true,
  enterpriseTitle = "Need a fully custom plan?",
  enterpriseDescription = "For teams over 5,000 conversations/month with complex security, compliance, or integration needs.",
  enterpriseCtaLabel = "Talk to Sales",
  enterpriseCtaHref = "#",
  emitJsonLd = true,
  productName = "Gorgias",
  productUrl = "https://www.gorgias.com/pricing",
}: PricingPlansProps) {
  const [billing, setBilling] = useState<BillingCycle>(defaultBilling);
  const [aiOn, setAiOn] = useState(defaultAiOn);

  const plans = useMemo(() => parsePlans(plansJson), [plansJson]);
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
      <div className="mx-auto mb-4 grid w-full max-w-[1240px] grid-cols-1 items-stretch gap-4 md:grid-cols-2 xl:grid-cols-4">
        {plans.map((plan) => (
          <PricingCard key={plan.key} {...computeCardProps(plan, billing, aiOn)} />
        ))}
      </div>

      {/* Enterprise card */}
      {showEnterprise && (
        <div className="mx-auto w-full max-w-[1240px]">
          <PricingCardEnterprise
            title={enterpriseTitle}
            description={enterpriseDescription}
            ctaLabel={enterpriseCtaLabel}
            ctaHref={enterpriseCtaHref}
          />
        </div>
      )}
    </section>
  );
}
