import React from "react";
import styles from "./PricingCardEnterprise.module.css";

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
    <article className={styles.card}>
      <div className={styles.left}>
        <div className={styles.textBlock}>
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.description}>{description}</p>
        </div>
        <a href={ctaHref} className={styles.btn}>
          {ctaLabel}
        </a>
      </div>

      <div className={styles.right}>
        {features.map((feat, i) => (
          <div key={i} className={styles.featureItem}>
            <span className={styles.checkIcon}>
              <CheckIcon />
            </span>
            <span>{feat}</span>
          </div>
        ))}
      </div>
    </article>
  );
}
