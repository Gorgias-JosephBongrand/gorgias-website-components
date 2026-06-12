import { PricingCard } from "./PricingCard";

const PricingCardWebflow = declareComponent(PricingCard, {
  name: "PricingCard",
  description: "Pricing plan card with disabled/default/featured states, AI Agent row, info tooltip, and GTM tracking.",
  group: "Pricing",
  props: {
    state: attribute.enum("State", {
      options: ["default", "featured", "disabled"],
      defaultValue: "default",
    }),
    tagText: attribute.text("Tag text", {
      defaultValue: "Most popular · 12,600 brands",
    }),
    planName: attribute.text("Plan name", { defaultValue: "Basic" }),
    audience: attribute.text("Audience", {
      defaultValue: "For growing stores handling up to 300 tickets/month",
    }),
    originalPrice: attribute.text("Original price", { defaultValue: "$69" }),
    currentPrice: attribute.text("Current price", { defaultValue: "$57" }),
    pricePeriod: attribute.text("Price period", { defaultValue: "/mo" }),
    billingNote: attribute.text("Billing note", {
      defaultValue: "$684 billed annually",
    }),
    ticketLabel: attribute.text("Ticket label", {
      defaultValue: "300 tickets / month",
    }),
    helpdeskPrice: attribute.text("Helpdesk price", {
      defaultValue: "$50/mo",
    }),
    aiAgentDisplayValue: attribute.text("AI Agent value", {
      defaultValue: "$7/mo",
    }),
    aiAgentNote: attribute.text("AI Agent note", {
      defaultValue: "~45 automated interactions · at $0.90 per interaction",
    }),
    aiAgentTooltip: attribute.text("AI Agent tooltip", {
      defaultValue:
        "A conversation counts as one automated interaction when AI Agent fully resolves it with no human needed within 72 hours.",
    }),
    ctaVariant: attribute.enum("CTA variant", {
      options: ["dark", "ghost"],
      defaultValue: "dark",
    }),
    ctaLabel: attribute.text("CTA label", { defaultValue: "Start free trial" }),
    ctaHref: attribute.text("CTA href", { defaultValue: "#" }),
    ctaTrackingId: attribute.text("CTA tracking ID", { defaultValue: "" }),
    compareLinkLabel: attribute.text("Compare link label", {
      defaultValue: "Compare all features ↓",
    }),
    compareLinkHref: attribute.text("Compare link href", {
      defaultValue: "#compare",
    }),
  },
  ssr: false,
});

export default PricingCardWebflow;
