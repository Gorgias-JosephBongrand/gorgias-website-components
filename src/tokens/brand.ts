/**
 * TypeScript mirror of brand.css tokens.
 * Use this for:
 *   - dataLayer event payloads that reference brand values
 *   - scripting the Webflow Variables API mirror
 *   - any JS context that needs token values at runtime
 *
 * Keep in sync with src/tokens/brand.css.
 */

export const colors = {
  brand: {
    primary: "#5b4fcf",
    primaryHover: "#4a3fb8",
    primaryLight: "#ede9ff",
    secondary: "#1a1a2e",
    accent: "#f97316",
  },
  neutral: {
    0: "#ffffff",
    50: "#f9fafb",
    100: "#f3f4f6",
    200: "#e5e7eb",
    300: "#d1d5db",
    500: "#6b7280",
    700: "#374151",
    900: "#111827",
  },
  semantic: {
    success: "#22c55e",
    warning: "#f59e0b",
    error: "#ef4444",
  },
} as const;

export const typography = {
  fontFamily: {
    sans: '"Inter", ui-sans-serif, system-ui, sans-serif',
    mono: '"JetBrains Mono", ui-monospace, monospace',
  },
} as const;

/** Flat map of CSS variable name → value, ready to POST to the Webflow Variables API */
export const webflowVariables = Object.entries({
  "color-brand-primary": colors.brand.primary,
  "color-brand-primary-hover": colors.brand.primaryHover,
  "color-brand-primary-light": colors.brand.primaryLight,
  "color-brand-secondary": colors.brand.secondary,
  "color-brand-accent": colors.brand.accent,
  "color-neutral-0": colors.neutral[0],
  "color-neutral-50": colors.neutral[50],
  "color-neutral-100": colors.neutral[100],
  "color-neutral-200": colors.neutral[200],
  "color-neutral-900": colors.neutral[900],
}).map(([name, value]) => ({ name, value }));
