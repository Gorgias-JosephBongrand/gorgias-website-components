import { PricingHero } from "./PricingHero";

declareComponent({
  component: PricingHero,
  displayName: "Pricing Hero",
  ssr: true,
  props: {
    eyebrow: attribute({
      type: "PlainText",
      displayName: "Eyebrow",
      defaultValue: "Pricing",
    }),
    headline: attribute({
      type: "PlainText",
      displayName: "Headline",
      defaultValue: "Simple, transparent pricing",
    }),
    subtext: attribute({
      type: "PlainText",
      displayName: "Subtext",
      defaultValue: "Start free. Scale as you grow. No hidden fees.",
    }),
  },
});
