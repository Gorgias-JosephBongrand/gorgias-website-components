"use client";

import React, { useState } from "react";
import styles from "./AiAgentToggle.module.css";

export interface AiAgentToggleProps {
  defaultOn?: boolean;
  label?: string;
  onChange?: (on: boolean) => void;
}

export function AiAgentToggle({
  defaultOn = true,
  label = "Include AI Agent",
  onChange,
}: AiAgentToggleProps) {
  const [on, setOn] = useState(defaultOn);

  const toggle = () => {
    const next = !on;
    setOn(next);
    onChange?.(next);
  };

  return (
    <div className={styles.root} onClick={toggle}>
      <span className={styles.label}>{label}</span>
      <button
        type="button"
        role="switch"
        aria-checked={on}
        aria-label={label}
        className={`${styles.track}${on ? ` ${styles.on}` : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        <span className={styles.thumb} />
      </button>
    </div>
  );
}
