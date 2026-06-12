"use client";

import React, { useState } from "react";
import styles from "./PricingCard.module.css";

export type PricingCardState = "default" | "featured" | "disabled";
export type PricingCardCtaVariant = "dark" | "ghost";

export interface PricingCardProps {
  /** Controls opacity/pointer-events (disabled) and tag strip content (featured) */
  state?: PricingCardState;
  /** Tag strip text — shown for both "featured" and "disabled" states */
  tagText?: string;

  // Plan identity
  planName?: string;
  /** Audience / description line under the name */
  audience?: string;

  // Pricing — pass pre-formatted strings (e.g. "$345", "$414")
  /** Strikethrough price. Leave empty to hide. */
  originalPrice?: string;
  currentPrice?: string;
  pricePeriod?: string;
  /** e.g. "$4,140 billed annually" or "Billed monthly · cancel anytime" */
  billingNote?: string;

  // Feature rows — all text, set per billing/AI state from the Designer or MCP
  ticketLabel?: string;
  helpdeskPrice?: string;
  /** e.g. "$45/mo" (with base) or "$1.00 / interaction" (Starter/pay-per-use) */
  aiAgentDisplayValue?: string;
  /** Sub-note under AI Agent row */
  aiAgentNote?: string;
  /** Tooltip body shown on the (i) info dot. Leave empty to hide the dot. */
  aiAgentTooltip?: string;

  // CTA
  ctaVariant?: PricingCardCtaVariant;
  ctaLabel?: string;
  ctaHref?: string;
  ctaTrackingId?: string;

  // Compare link
  compareLinkLabel?: string;
  compareLinkHref?: string;
}

function CheckIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
      <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function InfoDot({ tooltip }: { tooltip: string }) {
  const [open, setOpen] = useState(false);
  return (
    <span
      className={styles.infoDotWrap}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        aria-label="More info"
        className={styles.infoDot}
        onClick={(e) => { e.preventDefault(); setOpen((o) => !o); }}
      >
        i
      </button>
      {open && (
        <span role="tooltip" className={styles.tooltip}>
          {tooltip}
          <span className={styles.tooltipArrow} />
        </span>
      )}
    </span>
  );
}

export function PricingCard({
  state = "default",
  tagText,
  planName = "Basic",
  audience = "For growing stores handling up to 300 tickets/month",
  originalPrice = "$69",
  currentPrice = "$57",
  pricePeriod = "/mo",
  billingNote = "$684 billed annually",
  ticketLabel = "300 tickets / month",
  helpdeskPrice = "$50/mo",
  aiAgentDisplayValue = "$7/mo",
  aiAgentNote = "~45 automated interactions · at $0.90 per interaction",
  aiAgentTooltip = "A conversation counts as one automated interaction when AI Agent fully resolves it with no human needed within 72 hours.",
  ctaVariant = "dark",
  ctaLabel = "Start free trial",
  ctaHref = "#",
  ctaTrackingId,
  compareLinkLabel = "Compare all features ↓",
  compareLinkHref = "#compare",
}: PricingCardProps) {
  const isDisabled = state === "disabled";
  const isFeatured = state === "featured";
  const showTag = !!tagText && (isFeatured || isDisabled);

  const handleCta = () => {
    const id = ctaTrackingId ?? `pricing-${planName?.toLowerCase().replace(/\s+/g, "-")}-cta`;
    if (typeof window !== "undefined") {
      ((window as unknown as { dataLayer?: unknown[] }).dataLayer ?? []);
      const dl = (window as unknown as { dataLayer: unknown[] }).dataLayer;
      if (Array.isArray(dl)) dl.push({ event: "cta_click", cta_id: id });
    }
  };

  return (
    <article className={`${styles.card}${isDisabled ? ` ${styles.disabled}` : ""}`}>
      {/* Tag strip */}
      {showTag && (
        <div className={styles.tagStrip}>
          <span className={styles.tagDot} />
          <span className={styles.tagText}>{tagText}</span>
        </div>
      )}

      {/* Header: name + audience + price */}
      <div className={styles.header}>
        <div className={styles.nameBlock}>
          <h3 className={styles.planName}>{planName}</h3>
          <p className={styles.audience}>{audience}</p>
        </div>

        <div className={styles.priceBlock}>
          <div className={styles.priceRow}>
            {originalPrice && (
              <span className={styles.priceStrike}>{originalPrice}</span>
            )}
            <span className={styles.priceCurrent}>{currentPrice}</span>
            <span className={styles.pricePeriod}>{pricePeriod}</span>
          </div>
          <p className={styles.billingNote}>{billingNote}</p>
        </div>
      </div>

      {/* Included feature list */}
      <div className={styles.features}>
        <span className={styles.featuresLabel}>Included</span>
        <div className={styles.featureRows}>
          {/* Tickets */}
          <div className={styles.planRow}>
            <span className={styles.planRowLeft}>
              <span className={styles.checkIcon}><CheckIcon /></span>
              <span className={styles.rowLabelBold}>{ticketLabel}</span>
            </span>
          </div>

          <div className={styles.divider} />

          {/* Helpdesk */}
          <div className={styles.planRow}>
            <span className={styles.planRowLeft}>
              <span className={styles.checkIcon}><CheckIcon /></span>
              <span className={styles.rowLabel}>Helpdesk</span>
            </span>
            <span className={styles.rowValue}>{helpdeskPrice}</span>
          </div>

          <div className={styles.divider} />

          {/* AI Agent */}
          <div className={styles.aiAgentGroup}>
            <div className={styles.planRow}>
              <span className={styles.planRowLeft}>
                <span className={styles.checkIcon}><CheckIcon /></span>
                <span className={styles.rowLabel}>AI Agent</span>
                {aiAgentTooltip && <InfoDot tooltip={aiAgentTooltip} />}
              </span>
              <span className={styles.rowValue}>{aiAgentDisplayValue}</span>
            </div>
            {aiAgentNote && (
              <span className={styles.aiNote}>{aiAgentNote}</span>
            )}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className={styles.ctaArea}>
        <a
          href={isDisabled ? undefined : ctaHref}
          className={`${styles.btn} ${ctaVariant === "ghost" ? styles.btnGhost : styles.btnDark}`}
          onClick={!isDisabled ? handleCta : undefined}
          aria-disabled={isDisabled}
        >
          {ctaLabel}
        </a>
        {compareLinkLabel && (
          <a href={compareLinkHref} className={styles.compareLink}>
            {compareLinkLabel}
          </a>
        )}
      </div>
    </article>
  );
}
