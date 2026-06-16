import React from "react";
import { Button } from "@/components/ui/button";
import { CheckIcon } from "../../lib/icons";
import { splitList } from "../../lib/parse";
import { hrefOf, targetOf, type LinkValue } from "../../lib/link";

const DEFAULT_FEATURES = [
  "SSO (SAML), audit logs, SCIM provisioning",
  "Unlimited Help Centers, API at 4 requests per second",
  "Custom DPA or MSA, plus security review support",
  "Dedicated CSM and solutions architect",
  "New Actions, deeper integrations, and custom automations",
  "Proactive knowledge-gap detection that keeps AI answers accurate",
];

export interface PricingCardEnterpriseProps {
  title?: string;
  description?: string;
  ctaLabel?: string;
  /** String (computed/preview) or a Webflow Link object */
  ctaHref?: LinkValue;
  /** Array, or string separated by | ; or newline (Webflow text prop) */
  features?: string[] | string;
}

export function PricingCardEnterprise({
  title = "Need a fully custom plan?",
  description = "For teams over 5,000 conversations a month with complex security, compliance, or integration needs.",
  ctaLabel = "Talk to sales",
  ctaHref,
  features = DEFAULT_FEATURES,
}: PricingCardEnterpriseProps) {
  const featureList = typeof features === "string" ? splitList(features) : features;
  const ctaUrl = hrefOf(ctaHref);
  const ctaTarget = targetOf(ctaHref);
  return (
    <article className="grid w-full grid-cols-1 gap-8 rounded-2xl bg-white p-6 font-sans text-ink antialiased [box-shadow:inset_0_0_0_1px_var(--color-line)] md:grid-cols-2 md:gap-12">
      <div className="flex flex-col items-start justify-between gap-6">
        <div className="flex flex-col gap-2">
          <h3 className="m-0 text-lg font-medium leading-normal text-ink">{title}</h3>
          <p className="m-0 max-w-[480px] text-base leading-normal text-ink/75">{description}</p>
        </div>
        <Button variant="brand-ghost" size="xl" nativeButton={false} render={<a href={ctaUrl || undefined} target={ctaTarget} />}>
          {ctaLabel}
        </Button>
      </div>

      <div className="flex flex-col gap-4 pt-1">
        {featureList.map((feat, i) => (
          <div
            key={i}
            className="flex items-center gap-3 text-sm leading-normal tracking-[0.01em] text-ink/75"
          >
            <span className="inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-coral-soft text-ink">
              <CheckIcon />
            </span>
            <span>{feat}</span>
          </div>
        ))}
      </div>
    </article>
  );
}
