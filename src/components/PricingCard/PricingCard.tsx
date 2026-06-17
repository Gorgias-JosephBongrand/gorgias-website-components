"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { CheckIcon } from "../../lib/icons";
import { hrefOf, targetOf, type LinkValue } from "../../lib/link";

export type PricingCardState = "default" | "featured" | "disabled";
export type PricingCardCtaVariant = "dark" | "ghost";

export interface PricingCardProps {
  /** Controls opacity/pointer-events (disabled) and tag strip content (featured) */
  state?: PricingCardState;
  /** Tag strip text — shown for both "featured" and "disabled" states */
  tagText?: string;

  // Plan identity
  planName?: string;
  audience?: string;

  // Pricing — pass pre-formatted strings (e.g. "$345", "$414")
  originalPrice?: string;
  currentPrice?: string;
  pricePeriod?: string;
  billingNote?: string;

  // Feature rows
  ticketLabel?: string;
  helpdeskPrice?: string;
  helpdeskNote?: string;
  /** AI Agent resolved-conversation allowance, shown in the Included list */
  aiResolvedLabel?: string;
  /** Whether the AI Agent row is shown at all (removed when not included) */
  showAiAgent?: boolean;
  aiAgentDisplayValue?: string;
  aiAgentNote?: string;
  /** Tooltip body shown on the (i) info dot. Leave empty to hide the dot. */
  aiAgentTooltip?: string;

  // CTA
  ctaVariant?: PricingCardCtaVariant;
  ctaLabel?: string;
  /** String (computed/preview) or a Webflow Link object */
  ctaHref?: LinkValue;
  /** Supporting text under the CTA (constraints / reassurance) */
  ctaNote?: string;
  ctaTrackingId?: string;

  // Compare link (in-page anchor)
  compareLinkLabel?: string;
  compareLinkHref?: string;

  /** "v2" applies the stronger text-hierarchy treatment (prototype) */
  hierarchy?: "v1" | "v2";
}

function InfoDot({ tooltip }: { tooltip: string }) {
  const [open, setOpen] = useState(false);
  return (
    <span
      className="relative inline-flex"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        aria-label="More info"
        onClick={(e) => {
          e.preventDefault();
          setOpen((o) => !o);
        }}
        className="inline-flex size-4 shrink-0 cursor-pointer items-center justify-center rounded-full border border-ink/40 bg-transparent p-0 font-sans text-[10px] font-semibold not-italic leading-none text-ink/75"
      >
        i
      </button>
      {open && (
        <span
          role="tooltip"
          className="pointer-events-none absolute bottom-[calc(100%+8px)] left-[-8px] z-30 w-[250px] rounded-lg bg-ink px-3 py-2.5 text-[11.5px] font-normal leading-normal text-white [box-shadow:0_8px_20px_-8px_rgba(0,0,0,0.32)]"
        >
          {tooltip}
          <span className="absolute -bottom-1 left-3 size-2 rotate-45 bg-ink" />
        </span>
      )}
    </span>
  );
}

function PlanRow({
  label,
  labelBold,
  info,
  value,
  v2,
}: {
  label: string;
  labelBold?: boolean;
  info?: React.ReactNode;
  value?: string;
  v2?: boolean;
}) {
  return (
    <div className="flex min-h-6 items-center justify-between gap-3">
      <span className="inline-flex min-w-0 items-center gap-1">
        <span className="inline-flex shrink-0 pr-1 text-ink">
          <CheckIcon />
        </span>
        <span
          className={cn(
            "whitespace-nowrap text-sm leading-normal tracking-[0.01em]",
            labelBold
              ? v2
                ? "font-semibold text-ink"
                : "font-bold text-ink"
              : v2
              ? "font-normal text-ink/60"
              : "font-normal text-ink/75"
          )}
        >
          {label}
        </span>
        {info}
      </span>
      {value && (
        <span
          className={cn(
            "whitespace-nowrap text-right text-sm leading-normal text-ink",
            // v2: de-bold the $ values so the allowances lead the block
            v2 ? "font-medium" : "font-bold"
          )}
        >
          {value}
        </span>
      )}
    </div>
  );
}

export function PricingCard({
  state = "default",
  tagText,
  planName = "Basic",
  audience = "For growing stores handling up to 300 tickets/month",
  originalPrice = "$90",
  currentPrice = "$77",
  pricePeriod = "/mo",
  billingNote = "$924 billed annually",
  ticketLabel = "300 tickets / month",
  helpdeskPrice = "$50/mo",
  helpdeskNote = "Then a $0.40 per-ticket fee past your limit.",
  aiResolvedLabel = "30 automated interactions",
  showAiAgent = true,
  aiAgentDisplayValue = "$27/mo",
  aiAgentNote = "Then a $1.50 per automated interaction fee past your limit.",
  aiAgentTooltip = "An automated interaction is when AI Agent fully resolves a ticket with no human in 72 hours, and also counts as one helpdesk ticket. This tier includes 30 at $0.90 each; beyond it, $1.50 per interaction.",
  ctaVariant = "dark",
  ctaLabel = "Start free trial",
  ctaHref,
  ctaNote = "No credit card required",
  ctaTrackingId,
  compareLinkLabel = "Compare all features ↓",
  compareLinkHref = "#compare",
  hierarchy = "v2",
}: PricingCardProps) {
  const v2 = hierarchy === "v2";
  const isDisabled = state === "disabled";
  const isFeatured = state === "featured";
  // Banner reserved for the featured promo only; constraints go under the CTA.
  const showTag = !!tagText && isFeatured;
  const ctaUrl = hrefOf(ctaHref);
  const ctaTarget = targetOf(ctaHref);

  const handleCta = () => {
    const id = ctaTrackingId ?? `pricing-${planName?.toLowerCase().replace(/\s+/g, "-")}-cta`;
    if (typeof window !== "undefined") {
      const dl = (window as unknown as { dataLayer?: unknown[] }).dataLayer;
      if (Array.isArray(dl)) dl.push({ event: "cta_click", cta_id: id });
    }
  };

  return (
    <article
      className={cn(
        "relative flex w-full flex-col gap-8 rounded-2xl bg-white px-6 pb-6 pt-10 font-sans text-base leading-normal text-ink antialiased [box-shadow:inset_0_0_0_1px_var(--color-line)] transition-opacity",
        v2 && "gap-9",
        isDisabled && "pointer-events-none opacity-35"
      )}
    >
      {/* Tag strip */}
      {showTag && (
        <div className="absolute inset-x-0 top-0 flex h-8 items-center justify-center rounded-t-2xl border border-line bg-fog">
          <span className="text-[13px] font-medium leading-none text-ink">{tagText}</span>
        </div>
      )}

      {/* Header: name + audience + price */}
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h3
            className={cn(
              "m-0 leading-normal text-ink",
              v2 ? "text-xl font-semibold" : "text-lg font-medium"
            )}
          >
            {planName}
          </h3>
          <p
            className={cn(
              "m-0 min-h-[42px] text-sm leading-normal tracking-[0.01em]",
              v2 ? "text-ink/60" : "text-ink/75"
            )}
          >
            {audience}
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-end gap-2">
            {originalPrice && (
              <span className="pb-2.5 text-base font-medium leading-normal text-ink/45 line-through">
                {originalPrice}
              </span>
            )}
            <span className="text-5xl font-medium leading-[1.2] tracking-[-0.01em] text-ink">
              {currentPrice}
            </span>
            <span className="pb-[5px] text-lg font-medium leading-normal text-ink">
              {pricePeriod}
            </span>
          </div>
          <p
            className={cn(
              "m-0 leading-normal",
              v2 ? "text-sm text-ink/45" : "text-base text-ink/75"
            )}
          >
            {billingNote}
          </p>
        </div>
      </div>

      {/* Included feature list */}
      <div className="flex flex-col gap-1">
        <span
          className={cn(
            "leading-normal",
            v2
              ? "text-[11px] font-semibold uppercase tracking-wider text-ink/45"
              : "text-sm tracking-[0.01em] text-ink/75"
          )}
        >
          Included
        </span>
        <div className="flex flex-col gap-2 pt-1">
          <PlanRow label={ticketLabel} labelBold v2={v2} />
          {aiResolvedLabel && <PlanRow label={aiResolvedLabel} labelBold v2={v2} />}
          <div className="h-px bg-line" />
          <div className="flex flex-col gap-1">
            <PlanRow label="Helpdesk" value={helpdeskPrice} v2={v2} />
            {helpdeskNote && (
              <span
                className={cn(
                  "text-xs leading-normal tracking-[0.01em]",
                  v2 ? "text-ink/45" : "text-ink/55"
                )}
              >
                {helpdeskNote}
              </span>
            )}
          </div>
          {showAiAgent && (
            <>
              <div className="h-px bg-line" />
              <div className="flex flex-col gap-1">
                <PlanRow
                  label="AI Agent"
                  info={aiAgentTooltip ? <InfoDot tooltip={aiAgentTooltip} /> : undefined}
                  value={aiAgentDisplayValue}
                  v2={v2}
                />
                {aiAgentNote && (
                  <span
                    className={cn(
                      "text-xs leading-normal tracking-[0.01em]",
                      v2 ? "text-ink/45" : "text-ink/55"
                    )}
                  >
                    {aiAgentNote}
                  </span>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      {/* CTA */}
      <div className="mt-auto flex flex-col items-center gap-4">
        <div className="flex w-full flex-col items-center gap-1.5">
          <Button
            variant={ctaVariant === "ghost" ? "brand-ghost" : "brand-dark"}
            size="xl"
            className="w-full"
            nativeButton={false}
            aria-disabled={isDisabled}
            render={
              <a
                href={isDisabled ? undefined : ctaUrl || undefined}
                target={ctaTarget}
                onClick={!isDisabled ? handleCta : undefined}
              />
            }
          >
            {ctaLabel}
          </Button>
          {ctaNote && (
            <span className={cn("text-xs leading-normal", v2 ? "text-ink/45" : "text-ink/55")}>
              {ctaNote}
            </span>
          )}
        </div>
        {compareLinkLabel && (
          <a
            href={compareLinkHref}
            className={cn(
              "inline-flex cursor-pointer items-center gap-1 font-medium no-underline hover:text-ink",
              v2 ? "text-sm text-ink/45" : "text-base text-ink/75"
            )}
          >
            {compareLinkLabel}
          </a>
        )}
      </div>
    </article>
  );
}
