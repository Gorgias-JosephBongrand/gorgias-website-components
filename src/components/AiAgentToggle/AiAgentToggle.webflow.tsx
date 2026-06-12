import { declareComponent } from "@webflow/react";
import { props } from "@webflow/data-types";
import { AiAgentToggle } from "./AiAgentToggle";

export default declareComponent(AiAgentToggle, {
  name: "AiAgentToggle",
  description: "Include AI Agent on/off switch.",
  group: "Pricing",
  props: {
    defaultOn: props.Boolean({ name: "Default on", defaultValue: true }),
    label: props.Text({ name: "Label", defaultValue: "Include AI Agent" }),
  },
  options: {
    ssr: false,
  },
});
