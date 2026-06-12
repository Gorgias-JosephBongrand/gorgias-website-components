"use client";

import React, { useState } from "react";
import { cn } from "@/src/lib/utils";

export interface PricingToggleProps {
  savingsLabel?: string;
  onBillingChange?: (billing: "monthly" | "annual") => void;
  className?: string;
}

export function PricingToggle({
  savingsLabel = "Save 20%",
  onBillingChange,
  className,
}: PricingToggleProps) {
  const [billing, setBilling] = useState<"monthly" | "annual">("monthly");

  const toggle = (next: "monthly" | "annual") => {
    setBilling(next);
    onBillingChange?.(next);
    if (typeof window !== "undefined" && Array.isArray((window as Window & { dataLayer?: unknown[] }).dataLayer)) {
      (window as Window & { dataLayer: unknown[] }).dataLayer.push({
        event: "pricing_billing_toggle",
        billing_period: next,
      });
    }
  };

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <button
        onClick={() => toggle("monthly")}
        className={cn(
          "text-sm font-medium transition-colors",
          billing === "monthly"
            ? "text-[var(--color-neutral-900)]"
            : "text-[var(--color-neutral-500)] hover:text-[var(--color-neutral-700)]"
        )}
      >
        Monthly
      </button>

      {/* Toggle pill */}
      <button
        role="switch"
        aria-checked={billing === "annual"}
        onClick={() => toggle(billing === "monthly" ? "annual" : "monthly")}
        className={cn(
          "relative h-6 w-11 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-primary)] focus-visible:ring-offset-2",
          billing === "annual"
            ? "bg-[var(--color-brand-primary)]"
            : "bg-[var(--color-neutral-200)]"
        )}
      >
        <span
          className={cn(
            "absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform",
            billing === "annual" && "translate-x-5"
          )}
        />
      </button>

      <div className="flex items-center gap-2">
        <button
          onClick={() => toggle("annual")}
          className={cn(
            "text-sm font-medium transition-colors",
            billing === "annual"
              ? "text-[var(--color-neutral-900)]"
              : "text-[var(--color-neutral-500)] hover:text-[var(--color-neutral-700)]"
          )}
        >
          Annual
        </button>
        {savingsLabel && (
          <span className="rounded-[var(--radius-full)] bg-[var(--color-brand-primary-light)] px-2 py-0.5 text-xs font-semibold text-[var(--color-brand-primary)]">
            {savingsLabel}
          </span>
        )}
      </div>
    </div>
  );
}
