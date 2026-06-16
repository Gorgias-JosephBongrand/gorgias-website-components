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
    originalPrice: props.Text({ name: "Original price", defaultValue: "$69" }),
    currentPrice: props.Text({ name: "Current price", defaultValue: "$57" }),
    pricePeriod: props.Text({ name: "Price period", defaultValue: "/mo" }),
    billingNote: props.Text({
      name: "Billing note",
      defaultValue: "$684 billed annually",
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
    aiAgentDisplayValue: props.Text({
      name: "AI Agent value",
      defaultValue: "$7/mo",
    }),
    aiAgentNote: props.Text({
      name: "AI Agent note",
      defaultValue: "Includes 45 resolved conversations, then a per-conversation fee.",
    }),
    aiAgentTooltip: props.Text({
      name: "AI Agent tooltip",
      defaultValue:
        "A resolved conversation is what billing calls an automated interaction: one AI Agent fully handles with no human within 72 hours. The included count assumes a 15% automation rate. Past that, you pay a per-conversation fee.",
    }),
    ctaVariant: props.Variant({
      name: "CTA variant",
      options: ["dark", "ghost"],
      defaultValue: "dark",
    }),
    ctaLabel: props.Text({ name: "CTA label", defaultValue: "Start free trial" }),
    ctaHref: props.Link({ name: "CTA link" }),
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
