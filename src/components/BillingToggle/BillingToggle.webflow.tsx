import { BillingToggle } from "./BillingToggle";

const BillingToggleWebflow = declareComponent(BillingToggle, {
  name: "BillingToggle",
  description: "Monthly / Yearly billing segmented control. Wire onChange to pricing cards via Webflow interactions.",
  group: "Pricing",
  props: {
    defaultValue: attribute.enum("Default", {
      options: ["monthly", "annual"],
      defaultValue: "annual",
    }),
    monthlyLabel: attribute.text("Monthly label", { defaultValue: "Monthly" }),
    annualLabel: attribute.text("Annual label", { defaultValue: "Yearly" }),
    savingsBadge: attribute.text("Savings badge", { defaultValue: "Save 17%" }),
  },
  ssr: false,
});

export default BillingToggleWebflow;
