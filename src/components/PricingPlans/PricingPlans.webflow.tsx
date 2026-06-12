import { declareComponent } from "@webflow/react";
import { props } from "@webflow/data-types";
import { PricingPlans } from "./PricingPlans";
import { DEFAULT_PLANS } from "./plans";

export default declareComponent(PricingPlans, {
  name: "PricingPlans",
  description:
    "Dynamic pricing section: billing + AI toggles drive the four plan cards. SSR renders the default state for crawlers; plan data is editable as JSON. Emits schema.org Product/Offer JSON-LD.",
  group: "Pricing",
  props: {
    plansJson: props.Text({
      name: "Plans JSON",
      defaultValue: JSON.stringify(DEFAULT_PLANS),
    }),
    defaultBilling: props.Variant({
      name: "Default billing",
      options: ["monthly", "annual"],
      defaultValue: "annual",
    }),
    defaultAiOn: props.Boolean({
      name: "AI Agent on by default",
      defaultValue: true,
    }),
    monthlyLabel: props.Text({ name: "Monthly label", defaultValue: "Monthly" }),
    annualLabel: props.Text({ name: "Annual label", defaultValue: "Annual" }),
    aiToggleLabel: props.Text({
      name: "AI toggle label",
      defaultValue: "Include AI Agent",
    }),
    showEnterprise: props.Boolean({
      name: "Show enterprise card",
      defaultValue: true,
    }),
    enterpriseTitle: props.Text({
      name: "Enterprise title",
      defaultValue: "Need a fully custom plan?",
    }),
    enterpriseDescription: props.Text({
      name: "Enterprise description",
      defaultValue:
        "For teams over 5,000 conversations/month with complex security, compliance, or integration needs.",
    }),
    enterpriseCtaLabel: props.Text({
      name: "Enterprise CTA label",
      defaultValue: "Talk to Sales",
    }),
    enterpriseCtaHref: props.Text({
      name: "Enterprise CTA href",
      defaultValue: "#",
    }),
    emitJsonLd: props.Boolean({ name: "Emit JSON-LD", defaultValue: true }),
    productName: props.Text({
      name: "Product name (SEO)",
      defaultValue: "Gorgias",
    }),
    productUrl: props.Text({
      name: "Product URL (SEO)",
      defaultValue: "https://www.gorgias.com/pricing",
    }),
  },
  options: {
    ssr: true,
  },
});
