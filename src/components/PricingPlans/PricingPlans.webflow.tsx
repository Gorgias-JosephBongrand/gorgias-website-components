import { PricingPlans } from "./PricingPlans";
import { DEFAULT_PLANS } from "./plans";

const PricingPlansWebflow = declareComponent(PricingPlans, {
  name: "PricingPlans",
  description:
    "Dynamic pricing section: billing + AI toggles drive the four plan cards. SSR renders the default state for crawlers; plan data is editable as JSON. Emits schema.org Product/Offer JSON-LD.",
  group: "Pricing",
  props: {
    plansJson: attribute.text("Plans JSON", {
      defaultValue: JSON.stringify(DEFAULT_PLANS, null, 2),
    }),
    defaultBilling: attribute.enum("Default billing", {
      options: ["monthly", "annual"],
      defaultValue: "annual",
    }),
    defaultAiOn: attribute.boolean("AI Agent on by default", {
      defaultValue: true,
    }),
    monthlyLabel: attribute.text("Monthly label", { defaultValue: "Monthly" }),
    annualLabel: attribute.text("Annual label", { defaultValue: "Annual" }),
    aiToggleLabel: attribute.text("AI toggle label", {
      defaultValue: "Include AI Agent",
    }),
    showEnterprise: attribute.boolean("Show enterprise card", {
      defaultValue: true,
    }),
    enterpriseTitle: attribute.text("Enterprise title", {
      defaultValue: "Need a fully custom plan?",
    }),
    enterpriseDescription: attribute.text("Enterprise description", {
      defaultValue:
        "For teams over 5,000 conversations/month with complex security, compliance, or integration needs.",
    }),
    enterpriseCtaLabel: attribute.text("Enterprise CTA label", {
      defaultValue: "Talk to Sales",
    }),
    enterpriseCtaHref: attribute.text("Enterprise CTA href", {
      defaultValue: "#",
    }),
    emitJsonLd: attribute.boolean("Emit JSON-LD", { defaultValue: true }),
    productName: attribute.text("Product name (SEO)", {
      defaultValue: "Gorgias",
    }),
    productUrl: attribute.text("Product URL (SEO)", {
      defaultValue: "https://www.gorgias.com/pricing",
    }),
  },
  ssr: true,
});

export default PricingPlansWebflow;
