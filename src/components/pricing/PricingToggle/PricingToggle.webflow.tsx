import { PricingToggle } from "./PricingToggle";

// PricingToggle is client-side only (stateful toggle) — ssr: false
declareComponent({
  component: PricingToggle,
  displayName: "Pricing Billing Toggle",
  ssr: false,
  props: {
    savingsLabel: attribute({
      type: "PlainText",
      displayName: "Savings badge label",
      defaultValue: "Save 20%",
    }),
  },
});
