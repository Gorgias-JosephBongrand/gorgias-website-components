import { declareComponent } from "@webflow/react";
import { props } from "@webflow/data-types";
import { BillingToggle } from "./BillingToggle";

export default declareComponent(BillingToggle, {
  name: "BillingToggle",
  description: "Monthly / Annual billing segmented control.",
  group: "Pricing",
  props: {
    defaultValue: props.Variant({
      name: "Default",
      options: ["monthly", "annual"],
      defaultValue: "annual",
    }),
    monthlyLabel: props.Text({ name: "Monthly label", defaultValue: "Monthly" }),
    annualLabel: props.Text({ name: "Annual label", defaultValue: "Annual" }),
  },
  options: {
    ssr: false,
  },
});
