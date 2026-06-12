import React from "react";
import { cn } from "@/src/lib/utils";

export interface PricingHeroProps {
  eyebrow?: string;
  headline?: string;
  subtext?: string;
  className?: string;
}

export function PricingHero({
  eyebrow = "Pricing",
  headline = "Simple, transparent pricing",
  subtext = "Start free. Scale as you grow. No hidden fees.",
  className,
}: PricingHeroProps) {
  return (
    <section
      className={cn(
        "flex flex-col items-center gap-4 py-16 px-6 text-center",
        className
      )}
    >
      {eyebrow && (
        <p className="text-sm font-semibold uppercase tracking-widest text-[var(--color-brand-primary)]">
          {eyebrow}
        </p>
      )}
      <h1 className="max-w-2xl text-5xl font-bold leading-tight text-[var(--color-neutral-900)]">
        {headline}
      </h1>
      {subtext && (
        <p className="max-w-xl text-lg text-[var(--color-neutral-500)] leading-relaxed">
          {subtext}
        </p>
      )}
    </section>
  );
}
