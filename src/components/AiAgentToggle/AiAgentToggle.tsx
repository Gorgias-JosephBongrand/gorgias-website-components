"use client";

import React, { useState } from "react";
import styles from "./AiAgentToggle.module.css";

export interface AiAgentToggleProps {
  defaultOn?: boolean;
  label?: string;
  sublabel?: string;
  onChange?: (on: boolean) => void;
}

export function AiAgentToggle({
  defaultOn = true,
  label = "AI Agent",
  sublabel = "Add AI automation to your plan",
  onChange,
}: AiAgentToggleProps) {
  const [on, setOn] = useState(defaultOn);

  const toggle = () => {
    const next = !on;
    setOn(next);
    onChange?.(next);
  };

  return (
    <label className={styles.root} onClick={toggle}>
      <div className={styles.label}>
        <span className={styles.labelMain}>{label}</span>
        {sublabel && <span className={styles.labelSub}>{sublabel}</span>}
      </div>
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
    </label>
  );
}
