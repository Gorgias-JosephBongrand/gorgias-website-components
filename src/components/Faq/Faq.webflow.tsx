import { declareComponent } from "@webflow/react";
import { props } from "@webflow/data-types";
import { Faq } from "./Faq";
import { FAQ_CATEGORIES, FAQ_ITEMS } from "./faq-data";

export default declareComponent(Faq, {
  name: "Faq",
  description:
    "Pricing FAQ: category nav on the left, accordion of questions on the right (filtered by category). Content editable as JSON.",
  group: "Pricing",
  props: {
    categories: props.Text({
      name: "Categories, separated by |",
      defaultValue: FAQ_CATEGORIES.join(" | "),
    }),
    itemsJson: props.Text({
      name: "Items JSON (blank = defaults)",
      defaultValue: JSON.stringify(FAQ_ITEMS),
    }),
  },
  options: {
    ssr: true,
  },
});
