"use client";

import React from "react";
import styles from "./PricingCard.module.css";

export type PricingCardState = "default" | "featured" | "disabled";

export interface PricingCardProps {
  // Card state
  state?: PricingCardState;

  // Top labels
  topBannerText?: string;   // e.g. "Most popular · 12,600 brands" (featured only)
  topNoteText?: string;     // e.g. "Monthly billing only" (disabled only)

  // Plan identity
  planName?: string;
  description?: string;

  // Pricing
  originalPrice?: string;   // e.g. "$69" — shown with strikethrough; omit to hide
  currentPrice?: string;    // e.g. "$57"
  pricePeriod?: string;     // e.g. "/mo"
  annualNote?: string;      // e.g. "$684 billed annually"

  // Features
  ticketCount?: string;     // e.g. "300 tickets / month"
  helpdeskPrice?: string;   // e.g. "$50/mo"
  aiAgentPrice?: string;    // e.g. "$7/mo" — if empty, shows "$0.90 / interaction" style
  aiAgentNote?: string;     // e.g. "~45 automated interactions · at $0.90 per interaction"
  showAiAgentInfoIcon?: boolean;

  // CTA
  ctaLabel?: string;
  ctaHref?: string;
  ctaTrackingId?: string;

  // Compare link
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

export function PricingCard({
  state = "default",
  topBannerText = "Most popular · 12,600 brands",
  topNoteText = "Monthly billing only",
  planName = "Basic",
  description = "For growing stores handling up to 300 tickets/month",
  originalPrice = "$69",
  currentPrice = "$57",
  pricePeriod = "/mo",
  annualNote = "$684 billed annually",
  ticketCount = "300 tickets / month",
  helpdeskPrice = "$50/mo",
  aiAgentPrice = "$7/mo",
  aiAgentNote = "~45 automated interactions · at $0.90 per interaction",
  showAiAgentInfoIcon = true,
  ctaLabel = "Start free trial",
  ctaHref = "#",
  ctaTrackingId,
  compareLinkLabel = "Compare all features ↓",
  compareLinkHref = "#",
}: PricingCardProps) {
  const isFeatured = state === "featured";
  const isDisabled = state === "disabled";

  const cardClass = [
    styles.card,
    isFeatured ? styles.featured : "",
    isDisabled ? styles.disabled : "",
    isFeatured ? styles.hasBanner : "",
  ]
    .filter(Boolean)
    .join(" ");

  const handleCtaClick = () => {
    const id = ctaTrackingId ?? `pricing-${planName?.toLowerCase().replace(/\s+/g, "-")}-cta`;
    if (typeof window !== "undefined" && Array.isArray((window as any).dataLayer)) {
      (window as any).dataLayer.push({ event: "cta_click", cta_id: id });
    }
  };

  return (
    <article className={cardClass}>
      {/* Featured banner */}
      {isFeatured && topBannerText && (
        <div className={styles.topBanner}>{topBannerText}</div>
      )}

      {/* Disabled top note */}
      {isDisabled && topNoteText && (
        <p className={styles.topNote}>{topNoteText}</p>
      )}

      {/* Plan name + description */}
      <h3 className={styles.planName}>{planName}</h3>
      <p className={styles.description}>{description}</p>

      {/* Price */}
      <div className={styles.priceBlock}>
        {originalPrice && (
          <span className={styles.originalPrice}>{originalPrice}</span>
        )}
        <span className={styles.currentPrice}>{currentPrice}</span>
        <span className={styles.pricePeriod}>{pricePeriod}</span>
      </div>
      {annualNote && <p className={styles.annualNote}>{annualNote}</p>}

      {/* Feature list */}
      <p className={styles.featuresLabel}>Included</p>
      <ul className={styles.featureList}>
        {/* Tickets */}
        <li className={styles.featureItem}>
          <CheckIcon />
          <div className={styles.featureContent}>
            <span className={styles.featureName}>{ticketCount}</span>
          </div>
        </li>

        {/* Helpdesk */}
        <li className={styles.featureItem}>
          <CheckIcon />
          <div className={styles.featureContent}>
            <span className={styles.featureNameNormal}>Helpdesk</span>
            <span className={styles.featurePrice}>{helpdeskPrice}</span>
          </div>
        </li>

        {/* AI Agent */}
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

      {/* CTA */}
      <a
        href={isDisabled ? undefined : ctaHref}
        className={`${styles.cta} ${isDisabled ? styles.ctaOutlined : styles.ctaFilled}`}
        onClick={!isDisabled ? handleCtaClick : undefined}
        aria-disabled={isDisabled}
      >
        {ctaLabel}
      </a>

      {/* Compare link */}
      {compareLinkLabel && (
        <a href={compareLinkHref} className={styles.compareLink}>
          {compareLinkLabel}
        </a>
      )}
    </article>
  );
}
