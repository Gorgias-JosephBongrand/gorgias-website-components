import React from "react";
import { Button } from "@/components/ui/button";

const DEFAULT_FEATURES = [
  "SSO (SAML), audit logs, SCIM provisioning",
  "Unlimited Help Centers, API 4 req/sec",
  "Custom DPA/MSA + security review support",
  "Dedicated CSM + solutions architect",
  "New Actions / deeper integrations & custom automations",
  "Knowledge-gap and knowledge-conflict opportunities",
];

export interface PricingCardEnterpriseProps {
  title?: string;
  description?: string;
  ctaLabel?: string;
  ctaHref?: string;
  features?: string[];
}

function CheckIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
      <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function PricingCardEnterprise({
  title = "Need a fully custom plan?",
  description = "For teams over 5,000 conversations/month with complex security, compliance, or integration needs.",
  ctaLabel = "Talk to Sales",
  ctaHref = "#",
  features = DEFAULT_FEATURES,
}: PricingCardEnterpriseProps) {
  return (
    <article className="grid w-full grid-cols-2 gap-12 rounded-2xl bg-white p-6 font-sans text-ink antialiased shadow-[inset_0_0_0_1px_var(--color-line)]">
      <div className="flex flex-col items-start justify-between gap-6">
        <div className="flex flex-col gap-2">
          <h3 className="m-0 text-lg font-medium leading-normal text-ink">{title}</h3>
          <p className="m-0 max-w-[480px] text-base leading-normal text-ink/75">{description}</p>
        </div>
        <Button variant="brand-ghost" size="xl" render={<a href={ctaHref} />}>
          {ctaLabel}
        </Button>
      </div>

      <div className="flex flex-col gap-3 pt-1">
        {features.map((feat, i) => (
          <div
            key={i}
            className="flex items-start gap-2 text-sm leading-normal tracking-[0.01em] text-ink/75"
          >
            <span className="inline-flex shrink-0 pt-[3px] text-green">
              <CheckIcon />
            </span>
            <span>{feat}</span>
          </div>
        ))}
      </div>
    </article>
  );
}
