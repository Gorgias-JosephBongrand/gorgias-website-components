"use client";

import React, { useState } from "react";
import styles from "./BillingToggle.module.css";

export type BillingCycle = "monthly" | "annual";

export interface BillingToggleProps {
  defaultValue?: BillingCycle;
  monthlyLabel?: string;
  annualLabel?: string;
  savingsBadge?: string;
  onChange?: (value: BillingCycle) => void;
}

export function BillingToggle({
  defaultValue = "annual",
  monthlyLabel = "Monthly",
  annualLabel = "Yearly",
  savingsBadge = "Save 17%",
  onChange,
}: BillingToggleProps) {
  const [value, setValue] = useState<BillingCycle>(defaultValue);

  const select = (next: BillingCycle) => {
    setValue(next);
    onChange?.(next);
  };

  return (
    <div className={styles.root}>
      <div className={styles.track} role="group" aria-label="Billing cycle">
        <button
          type="button"
          className={`${styles.option}${value === "monthly" ? ` ${styles.active}` : ""}`}
          aria-pressed={value === "monthly"}
          onClick={() => select("monthly")}
        >
          {monthlyLabel}
        </button>
        <button
          type="button"
          className={`${styles.option}${value === "annual" ? ` ${styles.active}` : ""}`}
          aria-pressed={value === "annual"}
          onClick={() => select("annual")}
        >
          {annualLabel}
          {savingsBadge && <span className={styles.badge}>{savingsBadge}</span>}
        </button>
      </div>
    </div>
  );
}
