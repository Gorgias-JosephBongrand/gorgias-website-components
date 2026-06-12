import { declareComponent } from "@webflow/react";
import { props } from "@webflow/data-types";
import { CompareTable, DEFAULT_SECTIONS } from "./CompareTable";

export default declareComponent(CompareTable, {
  name: "CompareTable",
  description:
    "Plan comparison table with section headers, check/dash cells, and a highlighted featured column. Content editable as JSON.",
  group: "Pricing",
  props: {
    planNames: props.Text({
      name: "Plan names, separated by |",
      defaultValue: "Starter | Basic | Pro | Advanced",
    }),
    featuredIndex: props.Number({
      name: "Featured column (0-based, -1 = none)",
      defaultValue: 2,
    }),
    featuredBadge: props.Text({
      name: "Featured badge",
      defaultValue: "Most popular",
    }),
    sectionsJson: props.Text({
      name: "Sections JSON (blank = defaults)",
      defaultValue: JSON.stringify(DEFAULT_SECTIONS),
    }),
  },
  options: {
    ssr: true,
  },
});
