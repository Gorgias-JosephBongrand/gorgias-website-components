import { declareComponent } from "@webflow/react";
import { props } from "@webflow/data-types";
import { AddonCard } from "./AddonCard";

export default declareComponent(AddonCard, {
  name: "AddonCard",
  description:
    "Voice/SMS add-on card with volume-tier dropdown. Kind drives the icon, title, tagline, copy, tags, unit, and tier table — override any field by filling it in. Billing syncs with any BillingToggle on the page.",
  group: "Pricing",
  props: {
    kind: props.Variant({
      name: "Kind",
      options: ["voice", "sms"],
      defaultValue: "voice",
    }),
    title: props.Text({
      name: "Title (blank = from Kind)",
      defaultValue: "",
    }),
    tagline: props.Text({
      name: "Tagline (blank = from Kind)",
      defaultValue: "",
    }),
    counted: props.Text({
      name: "How it's counted (blank = from Kind)",
      defaultValue: "",
    }),
    tags: props.Text({
      name: "Tags, separated by | (blank = from Kind)",
      defaultValue: "",
    }),
    unit: props.Text({
      name: "Unit (blank = from Kind)",
      defaultValue: "",
    }),
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
