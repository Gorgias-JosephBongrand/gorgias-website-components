import React from "react";
import { Check } from "lucide-react";
import { Button } from "@/src/components/ui/Button/Button";
import { Badge } from "@/src/components/ui/Badge/Badge";
import { cn } from "@/src/lib/utils";

export interface PricingCardProps {
  planName?: string;
  badge?: string;
  price?: string;
  priceSuffix?: string;
  description?: string;
  /** Newline-separated list of features */
  features?: string;
  ctaLabel?: string;
  ctaHref?: string;
  ctaId?: string;
  featured?: boolean;
  className?: string;
}

export function PricingCard({
  planName = "Starter",
  badge,
  price = "$10",
  priceSuffix = "/ month",
  description = "Everything you need to get started.",
  features = "Unlimited tickets\n3 support agents\nEmail & chat support\nBasic reporting",
  ctaLabel = "Get started",
  ctaHref = "#",
  ctaId,
  featured = false,
  className,
}: PricingCardProps) {
  const featureList = features
    .split("\n")
    .map((f) => f.trim())
    .filter(Boolean);

  return (
    <article
      className={cn(
        "flex flex-col gap-6 rounded-[var(--radius-xl)] border p-8",
        featured
          ? "border-[var(--color-brand-primary)] bg-[var(--color-brand-primary)] text-white shadow-[var(--shadow-xl)]"
          : "border-[var(--color-neutral-200)] bg-white shadow-[var(--shadow-sm)]",
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between gap-3">
        <h3
          className={cn(
            "text-xl font-bold",
            featured ? "text-white" : "text-[var(--color-neutral-900)]"
          )}
        >
          {planName}
        </h3>
        {badge && (
          <Badge variant={featured ? "neutral" : "default"}>{badge}</Badge>
        )}
      </div>

      {/* Price */}
      <div className="flex items-baseline gap-1">
        <span
          className={cn(
            "text-4xl font-bold",
            featured ? "text-white" : "text-[var(--color-neutral-900)]"
          )}
        >
          {price}
        </span>
        <span
          className={cn(
            "text-sm",
            featured
              ? "text-white/70"
              : "text-[var(--color-neutral-500)]"
          )}
        >
          {priceSuffix}
        </span>
      </div>

      {/* Description */}
      <p
        className={cn(
          "text-sm leading-relaxed",
          featured ? "text-white/80" : "text-[var(--color-neutral-500)]"
        )}
      >
        {description}
      </p>

      {/* CTA */}
      <a href={ctaHref} className="block w-full">
        <Button
          variant={featured ? "secondary" : "primary"}
          size="md"
          ctaId={ctaId ?? `pricing-${planName.toLowerCase().replace(/\s+/g, "-")}`}
          className="w-full"
        >
          {ctaLabel}
        </Button>
      </a>

      {/* Divider */}
      <hr
        className={cn(
          "border-t",
          featured
            ? "border-white/20"
            : "border-[var(--color-neutral-200)]"
        )}
      />

      {/* Features */}
      <ul className="flex flex-col gap-3">
        {featureList.map((feature) => (
          <li key={feature} className="flex items-start gap-3 text-sm">
            <Check
              className={cn(
                "mt-0.5 size-4 shrink-0",
                featured ? "text-white" : "text-[var(--color-brand-primary)]"
              )}
            />
            <span
              className={cn(
                featured ? "text-white/90" : "text-[var(--color-neutral-700)]"
              )}
            >
              {feature}
            </span>
          </li>
        ))}
      </ul>
    </article>
  );
}
