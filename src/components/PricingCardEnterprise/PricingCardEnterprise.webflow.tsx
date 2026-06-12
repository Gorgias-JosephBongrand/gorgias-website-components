// Filename is a stable identifier — do not rename after sharing to a Library.

import { PricingCardEnterprise } from "./PricingCardEnterprise";
import "./PricingCardEnterprise.module.css";

declareComponent({
  component: PricingCardEnterprise,
  displayName: "Pricing Card — Enterprise",
  ssr: true,
  props: {
    planName: attribute({
      type: "PlainText",
      displayName: "Plan name",
      defaultValue: "Advanced",
    }),
    description: attribute({
      type: "PlainText",
      displayName: "Description",
      defaultValue: "High-volume AI scaling, with white-glove onboarding & analytics.",
    }),
    originalPrice: attribute({
      type: "PlainText",
      displayName: "Original price (strikethrough, leave empty to hide)",
      defaultValue: "$1035",
    }),
    currentPrice: attribute({
      type: "PlainText",
      displayName: "Current price",
      defaultValue: "$862",
    }),
    pricePeriod: attribute({
      type: "PlainText",
      displayName: "Price period",
      defaultValue: "/mo",
    }),
    annualNote: attribute({
      type: "PlainText",
      displayName: "Annual billing note",
      defaultValue: "$10,344 billed annually",
    }),
    ticketCount: attribute({
      type: "PlainText",
      displayName: "Ticket count",
      defaultValue: "5,000 tickets / month",
    }),
    helpdeskPrice: attribute({
      type: "PlainText",
      displayName: "Helpdesk price",
      defaultValue: "$750/mo",
    }),
    aiAgentPrice: attribute({
      type: "PlainText",
      displayName: "AI Agent price",
      defaultValue: "$112/mo",
    }),
    aiAgentNote: attribute({
      type: "PlainText",
      displayName: "AI Agent sub-note",
      defaultValue: "~750 automated interactions · at $0.90 per interaction",
    }),
    showAiAgentInfoIcon: attribute({
      type: "Boolean",
      displayName: "Show AI Agent info icon",
      defaultValue: true,
    }),
    ctaLabel: attribute({
      type: "PlainText",
      displayName: "CTA label",
      defaultValue: "Talk to sales",
    }),
    ctaHref: attribute({
      type: "PlainText",
      displayName: "CTA URL",
      defaultValue: "#",
    }),
    ctaTrackingId: attribute({
      type: "PlainText",
      displayName: "CTA tracking ID (dataLayer)",
      defaultValue: "",
    }),
    compareLinkLabel: attribute({
      type: "PlainText",
      displayName: "Compare link label",
      defaultValue: "Compare all features ↓",
    }),
    compareLinkHref: attribute({
      type: "PlainText",
      displayName: "Compare link URL",
      defaultValue: "#",
    }),
  },
});
