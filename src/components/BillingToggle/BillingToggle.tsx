"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

export type BillingCycle = "monthly" | "annual";

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

  const select = (next: BillingCycle) => {
    setValue(next);
    onChange?.(next);
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
