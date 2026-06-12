"use client";

import React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/src/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-[var(--radius-md)] font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-primary)] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-[var(--color-brand-primary)] text-white hover:bg-[var(--color-brand-primary-hover)]",
        secondary:
          "border border-[var(--color-neutral-200)] bg-white text-[var(--color-neutral-900)] hover:bg-[var(--color-neutral-50)]",
        ghost:
          "text-[var(--color-brand-primary)] hover:bg-[var(--color-brand-primary-light)]",
        destructive:
          "bg-[var(--color-error)] text-white hover:opacity-90",
      },
      size: {
        sm: "h-8 px-3 text-sm",
        md: "h-10 px-5 text-base",
        lg: "h-12 px-7 text-lg",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  /** Tracking identifier emitted in the dataLayer click event */
  ctaId?: string;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ctaId, onClick, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (ctaId && typeof window !== "undefined" && Array.isArray((window as Window & { dataLayer?: unknown[] }).dataLayer)) {
        (window as Window & { dataLayer: unknown[] }).dataLayer.push({
          event: "cta_click",
          cta_id: ctaId,
        });
      }
      onClick?.(e);
    };

    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        onClick={handleClick}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";
