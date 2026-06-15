import { declareComponent } from "@webflow/react";
import { props } from "@webflow/data-types";
import { AddonCard } from "./AddonCard";

export default declareComponent(AddonCard, {
  name: "AddonCard",
  description:
    "Voice/SMS add-on card with volume-tier dropdown. Kind drives the icon, title, tagline, copy, tags, unit, and tier table. Billing syncs with any BillingToggle on the page.",
  group: "Pricing",
  props: {
    kind: props.Variant({
      name: "Kind",
      options: ["voice", "sms"],
      defaultValue: "voice",
    }),
    defaultBilling: props.Variant({
      name: "Default billing",
      options: ["monthly", "annual"],
      defaultValue: "annual",
    }),
    defaultTierIndex: props.Number({
      name: "Default tier index (-1 = none)",
      defaultValue: -1,
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
