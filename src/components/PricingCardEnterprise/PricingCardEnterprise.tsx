"use client";

import React from "react";
import styles from "./PricingCardEnterprise.module.css";

export interface PricingCardEnterpriseProps {
  planName?: string;
  description?: string;

  originalPrice?: string;
  currentPrice?: string;
  pricePeriod?: string;
  annualNote?: string;

  ticketCount?: string;
  helpdeskPrice?: string;
  aiAgentPrice?: string;
  aiAgentNote?: string;
  showAiAgentInfoIcon?: boolean;

  ctaLabel?: string;
  ctaHref?: string;
  ctaTrackingId?: string;

  compareLinkLabel?: string;
  compareLinkHref?: string;
}

function CheckIcon() {
  return (
    <svg
      className={styles.checkIcon}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden
    >
      <path
        d="M3 8l3.5 3.5L13 4.5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function PricingCardEnterprise({
  planName = "Advanced",
  description = "High-volume AI scaling, with white-glove onboarding & analytics.",
  originalPrice = "$1035",
  currentPrice = "$862",
  pricePeriod = "/mo",
  annualNote = "$10,344 billed annually",
  ticketCount = "5,000 tickets / month",
  helpdeskPrice = "$750/mo",
  aiAgentPrice = "$112/mo",
  aiAgentNote = "~750 automated interactions · at $0.90 per interaction",
  showAiAgentInfoIcon = true,
  ctaLabel = "Talk to sales",
  ctaHref = "#",
  ctaTrackingId,
  compareLinkLabel = "Compare all features ↓",
  compareLinkHref = "#",
}: PricingCardEnterpriseProps) {
  const handleCtaClick = () => {
    const id = ctaTrackingId ?? `pricing-${planName?.toLowerCase().replace(/\s+/g, "-")}-cta`;
    if (typeof window !== "undefined" && Array.isArray((window as any).dataLayer)) {
      (window as any).dataLayer.push({ event: "cta_click", cta_id: id });
    }
  };

  return (
    <article className={styles.card}>
      <h3 className={styles.planName}>{planName}</h3>
      <p className={styles.description}>{description}</p>

      <div className={styles.priceBlock}>
        {originalPrice && (
          <span className={styles.originalPrice}>{originalPrice}</span>
        )}
        <span className={styles.currentPrice}>{currentPrice}</span>
        <span className={styles.pricePeriod}>{pricePeriod}</span>
      </div>
      {annualNote && <p className={styles.annualNote}>{annualNote}</p>}

      <p className={styles.featuresLabel}>Included</p>
      <ul className={styles.featureList}>
        <li className={styles.featureItem}>
          <CheckIcon />
          <div className={styles.featureContent}>
            <span className={styles.featureName}>{ticketCount}</span>
          </div>
        </li>

        <li className={styles.featureItem}>
          <CheckIcon />
          <div className={styles.featureContent}>
            <span className={styles.featureNameNormal}>Helpdesk</span>
            <span className={styles.featurePrice}>{helpdeskPrice}</span>
          </div>
        </li>

        <li className={styles.featureItem}>
          <CheckIcon />
          <div>
            <div className={styles.featureContent}>
              <span className={styles.featureNameNormal}>
                AI Agent
                {showAiAgentInfoIcon && (
                  <i className={styles.infoIcon} title="Charged per resolved ticket">
                    i
                  </i>
                )}
              </span>
              <span className={styles.featurePrice}>{aiAgentPrice}</span>
            </div>
            {aiAgentNote && (
              <p className={styles.featureNote}>{aiAgentNote}</p>
            )}
          </div>
        </li>
      </ul>

      <div className={styles.spacer} />

      <a href={ctaHref} className={styles.cta} onClick={handleCtaClick}>
        {ctaLabel}
      </a>

      {compareLinkLabel && (
        <a href={compareLinkHref} className={styles.compareLink}>
          {compareLinkLabel}
        </a>
      )}
    </article>
  );
}
