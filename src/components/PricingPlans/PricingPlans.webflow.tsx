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
    // ── Starter ──
    starterAudience: props.Text({
      name: "Starter · Subtext",
      defaultValue: "For smaller brands getting started on one platform.",
    }),
    starterCtaLabel: props.Text({ name: "Starter · CTA label", defaultValue: "Start free trial" }),
    starterCtaHref: props.Link({ name: "Starter · CTA link" }),
    starterAutomationRate: props.Number({ name: "Starter · Automation rate", defaultValue: 10 }),

    // ── Basic ──
    basicAudience: props.Text({
      name: "Basic · Subtext",
      defaultValue: "For growing brands whose support volume is outpacing their team.",
    }),
    basicCtaLabel: props.Text({ name: "Basic · CTA label", defaultValue: "Start free trial" }),
    basicCtaHref: props.Link({ name: "Basic · CTA link" }),
    basicAutomationRate: props.Number({ name: "Basic · Automation rate", defaultValue: 20 }),

    // ── Pro ──
    proAudience: props.Text({
      name: "Pro · Subtext",
      defaultValue: "For scaling brands that let AI resolve and sell, with revenue analytics.",
    }),
    proCtaLabel: props.Text({ name: "Pro · CTA label", defaultValue: "Start free trial" }),
    proCtaHref: props.Link({ name: "Pro · CTA link" }),
    proAutomationRate: props.Number({ name: "Pro · Automation rate", defaultValue: 30 }),

    // ── Advanced ──
    advancedAudience: props.Text({
      name: "Advanced · Subtext",
      defaultValue: "For high-volume brands that need peak-ready automation and a dedicated team.",
    }),
    advancedCtaLabel: props.Text({ name: "Advanced · CTA label", defaultValue: "Talk to sales" }),
    advancedCtaHref: props.Link({ name: "Advanced · CTA link" }),
    advancedAutomationRate: props.Number({ name: "Advanced · Automation rate", defaultValue: 30 }),

    // ── Enterprise ──
    showEnterprise: props.Boolean({ name: "Enterprise · Show card", defaultValue: true }),
    enterpriseTitle: props.Text({
      name: "Enterprise · Title",
      defaultValue: "Need a fully custom plan?",
    }),
    enterpriseDescription: props.Text({
      name: "Enterprise · Description",
      defaultValue:
        "For teams over 5,000 conversations a month with complex security, compliance, or integration needs.",
    }),
    enterpriseCtaLabel: props.Text({ name: "Enterprise · CTA label", defaultValue: "Talk to sales" }),
    enterpriseCtaHref: props.Link({ name: "Enterprise · CTA link" }),

    // ── General ──
    defaultBilling: props.Variant({
      name: "Default billing",
      options: ["monthly", "annual"],
      defaultValue: "annual",
    }),
    defaultAiOn: props.Boolean({ name: "AI Agent on by default", defaultValue: true }),
    monthlyLabel: props.Text({ name: "Monthly label", defaultValue: "Monthly" }),
    annualLabel: props.Text({ name: "Annual label", defaultValue: "Annual" }),
    aiToggleLabel: props.Text({ name: "AI toggle label", defaultValue: "Add AI Agent" }),
    compareLinkLabel: props.Text({
      name: "Compare link label",
      defaultValue: "Compare all features ↓",
    }),
    compareLinkHref: props.Link({ name: "Compare link" }),
    emitJsonLd: props.Boolean({ name: "Emit JSON-LD", defaultValue: true }),
    productName: props.Text({ name: "Product name (SEO)", defaultValue: "Gorgias" }),
    productUrl: props.Text({
      name: "Product URL (SEO)",
      defaultValue: "https://www.gorgias.com/pricing",
    }),
    plansJson: props.Text({
      name: "Plans JSON (advanced)",
      defaultValue: JSON.stringify(DEFAULT_PLANS),
    }),
  },
  options: {
    ssr: true,
  },
});
