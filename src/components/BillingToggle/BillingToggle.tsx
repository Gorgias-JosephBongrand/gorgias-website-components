"use client";

import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export type BillingCycle = "monthly" | "annual";

/**
 * Cross-component sync: every BillingToggle on the page (each in its own
 * shadow root) listens for this window event, so the hero toggle and the
 * add-ons toggle always agree. Sections that need the value can either
 * pass onChange to their own toggle or subscribe to the event directly.
 */
export const BILLING_EVENT = "gorgias:billing-change";

export function dispatchBilling(value: BillingCycle) {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent<BillingCycle>(BILLING_EVENT, { detail: value }));
  }
}

export interface BillingToggleProps {
  defaultValue?: BillingCycle;
  monthlyLabel?: string;
  annualLabel?: string;
  onChange?: (value: BillingCycle) => void;
}

export function BillingToggle({
  defaultValue = "annual",
  monthlyLabel = "Monthly",
  annualLabel = "Annual",
  onChange,
}: BillingToggleProps) {
  const [value, setValue] = useState<BillingCycle>(defaultValue);

  // Stay in sync with other toggles on the page
  useEffect(() => {
    const handler = (e: Event) => {
      const next = (e as CustomEvent<BillingCycle>).detail;
      setValue((current) => {
        if (next !== current) {
          onChange?.(next);
          return next;
        }
        return current;
      });
    };
    window.addEventListener(BILLING_EVENT, handler);
    return () => window.removeEventListener(BILLING_EVENT, handler);
  }, [onChange]);

  const select = (next: BillingCycle) => {
    if (next === value) return;
    setValue(next);
    onChange?.(next);
    dispatchBilling(next);
  };

  const optionClass = (active: boolean) =>
    cn(
      "inline-flex cursor-pointer items-center gap-1.5 whitespace-nowrap rounded-full border-0 bg-transparent px-6 py-2 font-sans text-base leading-normal text-ink transition-colors",
      active && "bg-white"
    );

  return (
    <div
      className="inline-flex rounded-full bg-line p-1 font-sans text-base antialiased"
      role="group"
      aria-label="Billing cycle"
    >
      <button
        type="button"
        className={optionClass(value === "monthly")}
        aria-pressed={value === "monthly"}
        onClick={() => select("monthly")}
      >
        {monthlyLabel}
      </button>
      <button
        type="button"
        className={optionClass(value === "annual")}
        aria-pressed={value === "annual"}
        onClick={() => select("annual")}
      >
        {annualLabel}
      </button>
    </div>
  );
}
