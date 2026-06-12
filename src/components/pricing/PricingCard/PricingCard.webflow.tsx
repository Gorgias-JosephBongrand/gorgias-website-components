import { PricingCard } from "./PricingCard";

// Filename is a stable identifier — do not rename without a migration plan.

declareComponent({
  component: PricingCard,
  displayName: "Pricing Card",
  ssr: true,
  props: {
    planName: attribute({
      type: "PlainText",
      displayName: "Plan name",
      defaultValue: "Starter",
    }),
    badge: attribute({
      type: "PlainText",
      displayName: "Badge label",
      defaultValue: "",
    }),
    price: attribute({
      type: "PlainText",
      displayName: "Price",
      defaultValue: "$10",
    }),
    priceSuffix: attribute({
      type: "PlainText",
      displayName: "Price suffix",
      defaultValue: "/ month",
    }),
    description: attribute({
      type: "PlainText",
      displayName: "Description",
      defaultValue: "Everything you need to get started.",
    }),
    features: attribute({
      type: "PlainText",
      displayName: "Features (one per line)",
      defaultValue: "Unlimited tickets\n3 support agents\nEmail & chat support",
    }),
    ctaLabel: attribute({
      type: "PlainText",
      displayName: "CTA label",
      defaultValue: "Get started",
    }),
    ctaHref: attribute({
      type: "PlainText",
      displayName: "CTA URL",
      defaultValue: "#",
    }),
    ctaId: attribute({
      type: "PlainText",
      displayName: "CTA tracking ID",
      defaultValue: "",
    }),
    featured: attribute({
      type: "Boolean",
      displayName: "Featured (highlighted)",
      defaultValue: false,
    }),
  },
});
