"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

export interface AiAgentToggleProps {
  defaultOn?: boolean;
  label?: string;
  onChange?: (on: boolean) => void;
}

export function AiAgentToggle({
  defaultOn = true,
  label = "Add AI Agent",
  onChange,
}: AiAgentToggleProps) {
  const [on, setOn] = useState(defaultOn);

  const toggle = () => {
    const next = !on;
    setOn(next);
    onChange?.(next);
  };

  return (
    <div
      className="inline-flex cursor-pointer items-center gap-2.5 p-1 font-sans antialiased"
      onClick={toggle}
    >
      <span className="select-none text-base leading-normal text-ink">{label}</span>
      <button
        type="button"
        role="switch"
        aria-checked={on}
        aria-label={label}
        onClick={(e) => {
          e.stopPropagation();
          toggle();
        }}
        className={cn(
          "relative h-[18px] w-[32px] shrink-0 cursor-pointer rounded-full border-0 p-0 transition-colors",
          on ? "bg-coral" : "bg-line"
        )}
      >
        <span
          className={cn(
            "absolute top-[2px] size-[14px] rounded-full bg-[#fbfbfb] [box-shadow:0_1px_2px_rgba(0,0,0,0.18)] transition-all",
            on ? "left-[16px]" : "left-[2px]"
          )}
        />
      </button>
    </div>
  );
}
