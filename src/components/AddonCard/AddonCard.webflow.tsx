import { declareComponent } from "@webflow/react";
import { props } from "@webflow/data-types";
import { AddonCard } from "./AddonCard";

export default declareComponent(AddonCard, {
  name: "AddonCard",
  description:
    "Voice/SMS add-on card with volume-tier dropdown. Billing syncs automatically with any BillingToggle on the page.",
  group: "Pricing",
  props: {
    kind: props.Variant({
      name: "Kind",
      options: ["voice", "sms"],
      defaultValue: "voice",
    }),
    title: props.Text({ name: "Title", defaultValue: "Voice" }),
    tagline: props.Text({
      name: "Tagline",
      defaultValue: "Phone support, inside your helpdesk",
    }),
    counted: props.Text({
      name: "How it's counted",
      defaultValue:
        "A conversation becomes a Voice ticket the moment a call connects. Unlimited follow-up calls on that ticket at no extra charge.",
    }),
    tags: props.Text({
      name: "Tags (one per line)",
      defaultValue:
        "US & International\nCall recording & transcripts\nIVR & routing\nAI Agent voice handoff",
    }),
    unit: props.Text({ name: "Unit", defaultValue: "calls" }),
    defaultBilling: props.Variant({
      name: "Default billing",
      options: ["monthly", "annual"],
      defaultValue: "annual",
    }),
    defaultTierIndex: props.Number({
      name: "Default tier index",
      defaultValue: 4,
    }),
    tiersJson: props.Text({
      name: "Tiers JSON (override)",
      defaultValue: "",
    }),
  },
  options: {
    ssr: false,
  },
});
