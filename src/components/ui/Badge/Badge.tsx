import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/src/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-[var(--radius-full)] px-2.5 py-0.5 text-xs font-semibold",
  {
    variants: {
      variant: {
        default:
          "bg-[var(--color-brand-primary-light)] text-[var(--color-brand-primary)]",
        success:
          "bg-emerald-50 text-emerald-700",
        neutral:
          "bg-[var(--color-neutral-100)] text-[var(--color-neutral-700)]",
        accent:
          "bg-orange-50 text-orange-700",
      },
    },
    defaultVariants: { variant: "default" },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}
