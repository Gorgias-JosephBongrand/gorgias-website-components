import React from "react";

/**
 * Small check mark, inherits color via currentColor.
 * Shared by PricingCard, AddonCard, and PricingCardEnterprise.
 * (CompareTable uses its own badged variant — a self-contained
 * rounded-rect icon with a baked fill — so it stays local there.)
 */
export function CheckIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
      <path
        d="M10 3L4.5 8.5L2 6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
