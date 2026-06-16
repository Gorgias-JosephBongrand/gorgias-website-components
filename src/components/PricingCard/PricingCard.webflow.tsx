import { declareComponent } from "@webflow/react";
import { props } from "@webflow/data-types";
import { PricingCard } from "./PricingCard";

export default declareComponent(PricingCard, {
  name: "PricingCard",
  description:
    "Pricing plan card with disabled/default/featured states, AI Agent row, info tooltip, and GTM tracking.",
  group: "Pricing",
  props: {
    state: props.Variant({
      name: "State",
      options: ["default", "featured", "disabled"],
      defaultValue: "default",
    }),
    tagText: props.Text({
      name: "Tag text",
      defaultValue: "Most popular · 12,600 brands",
    }),
    planName: props.Text({ name: "Plan name", defaultValue: "Basic" }),
    audience: props.Text({
      name: "Audience",
      defaultValue: "For growing stores handling up to 300 tickets/month",
    }),
    originalPrice: props.Text({ name: "Original price", defaultValue: "$90" }),
    pricePrefix: props.Text({ name: "Price prefix", defaultValue: "from" }),
    currentPrice: props.Text({ name: "Current price", defaultValue: "$77" }),
    pricePeriod: props.Text({ name: "Price period", defaultValue: "/mo" }),
    billingNote: props.Text({
      name: "Billing note",
      defaultValue: "$924 billed annually",
    }),
    ticketLabel: props.Text({
      name: "Ticket label",
      defaultValue: "300 tickets / month",
    }),
    helpdeskPrice: props.Text({ name: "Helpdesk price", defaultValue: "$50/mo" }),
    helpdeskNote: props.Text({
      name: "Helpdesk note",
      defaultValue: "Then a per-ticket fee past your limit.",
    }),
    aiResolvedLabel: props.Text({
      name: "AI interactions label",
      defaultValue: "30 automated interactions",
    }),
    showAiAgent: props.Boolean({ name: "Show AI Agent row", defaultValue: true }),
    aiAgentDisplayValue: props.Text({
      name: "AI Agent value",
      defaultValue: "$27/mo",
    }),
    aiAgentNote: props.Text({
      name: "AI Agent note",
      defaultValue: "$0.90 per automated interaction, then $1.50 over your tier.",
    }),
    aiAgentTooltip: props.Text({
      name: "AI Agent tooltip",
      defaultValue:
        "An automated interaction is when AI Agent fully resolves a ticket with no human in 72 hours, and also counts as one helpdesk ticket. This tier includes 30 at $0.90 each; beyond it, $1.50 per interaction.",
    }),
    ctaVariant: props.Variant({
      name: "CTA variant",
      options: ["dark", "ghost"],
      defaultValue: "dark",
    }),
    ctaLabel: props.Text({ name: "CTA label", defaultValue: "Start free trial" }),
    ctaHref: props.Link({ name: "CTA link" }),
    ctaNote: props.Text({ name: "CTA note", defaultValue: "No credit card required" }),
    ctaTrackingId: props.Text({ name: "CTA tracking ID", defaultValue: "" }),
    compareLinkLabel: props.Text({
      name: "Compare link label",
      defaultValue: "Compare all features ↓",
    }),
    compareLinkHref: props.Text({
      name: "Compare link href",
      defaultValue: "#compare",
    }),
  },
  options: {
    ssr: false,
  },
});
