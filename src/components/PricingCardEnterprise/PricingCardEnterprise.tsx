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
  eyebrow?: string;
  title?: string;
  description?: string;
  ctaLabel?: string;
  ctaHref?: string;
  /** Newline-separated feature strings, or pass as an array prop via webflow.tsx */
  features?: string[];
}

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
      <path d="M11.5 3.5L5.25 9.75L2.5 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function PricingCardEnterprise({
  eyebrow = "Enterprise",
  title = "Need a fully custom plan?",
  description = "Get a tailored package with dedicated support, custom integrations, and enterprise-grade security built around your team.",
  ctaLabel = "Talk to Sales",
  ctaHref = "#",
  features = DEFAULT_FEATURES,
}: PricingCardEnterpriseProps) {
  return (
    <article className={styles.card}>
      {/* Left: heading + description + CTA */}
      <div className={styles.left}>
        {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
        <a href={ctaHref} className={styles.btn}>
          {ctaLabel}
        </a>
      </div>

      {/* Right: feature list */}
      <div className={styles.right}>
        {features.map((feat, i) => (
          <div key={i} className={styles.featureItem}>
            <span className={styles.checkIcon}>
              <CheckIcon />
            </span>
            <span className={styles.featureText}>{feat}</span>
          </div>
        ))}
      </div>
    </article>
  );
}
