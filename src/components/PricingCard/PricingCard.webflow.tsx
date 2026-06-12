// Filename is a stable identifier — do not rename after sharing to a Library.
// Renaming creates a new component and breaks all existing canvas instances.

import { PricingCard } from "./PricingCard";
import "./PricingCard.module.css";

declareComponent({
  component: PricingCard,
  displayName: "Pricing Card",
  ssr: true,
  props: {
    state: attribute({
      type: "Enum",
      displayName: "State",
      options: [
        { value: "default", displayName: "Default" },
        { value: "featured", displayName: "Featured (highlighted)" },
        { value: "disabled", displayName: "Disabled (greyed out)" },
      ],
      defaultValue: "default",
    }),
    topBannerText: attribute({
      type: "PlainText",
      displayName: "Top banner text",
      defaultValue: "Most popular · 12,600 brands",
    }),
    topNoteText: attribute({
      type: "PlainText",
      displayName: "Top note text",
      defaultValue: "Monthly billing only",
    }),
    planName: attribute({
      type: "PlainText",
      displayName: "Plan name",
      defaultValue: "Basic",
    }),
    description: attribute({
      type: "PlainText",
      displayName: "Description",
      defaultValue: "For growing stores handling up to 300 tickets/month",
    }),
    originalPrice: attribute({
      type: "PlainText",
      displayName: "Original price (strikethrough, leave empty to hide)",
      defaultValue: "$69",
    }),
    currentPrice: attribute({
      type: "PlainText",
      displayName: "Current price",
      defaultValue: "$57",
    }),
    pricePeriod: attribute({
      type: "PlainText",
      displayName: "Price period",
      defaultValue: "/mo",
    }),
    annualNote: attribute({
      type: "PlainText",
      displayName: "Annual billing note",
      defaultValue: "$684 billed annually",
    }),
    ticketCount: attribute({
      type: "PlainText",
      displayName: "Ticket count",
      defaultValue: "300 tickets / month",
    }),
    helpdeskPrice: attribute({
      type: "PlainText",
      displayName: "Helpdesk price",
      defaultValue: "$50/mo",
    }),
    aiAgentPrice: attribute({
      type: "PlainText",
      displayName: "AI Agent price",
      defaultValue: "$7/mo",
    }),
    aiAgentNote: attribute({
      type: "PlainText",
      displayName: "AI Agent sub-note",
      defaultValue: "~45 automated interactions · at $0.90 per interaction",
    }),
    showAiAgentInfoIcon: attribute({
      type: "Boolean",
      displayName: "Show AI Agent info icon",
      defaultValue: true,
    }),
    ctaLabel: attribute({
      type: "PlainText",
      displayName: "CTA label",
      defaultValue: "Start free trial",
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
